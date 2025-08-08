from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN
from geopy.distance import geodesic
import requests
import os
from datetime import datetime, timedelta
import folium
import polyline
import json
from tqdm import tqdm
import time
import uuid

app = FastAPI(title="Smart School Routing API (No DB)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "data.json"

# Helper functions to load and save metadata
def load_metadata():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_metadata(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2, default=str)

def get_osrm_table_chunked(coord_list, max_chunk=50, retry=3):
    n = len(coord_list)
    matrix = np.full((n, n), 1e6)
    for i in tqdm(range(0, n, max_chunk), desc="Row chunks"):
        for j in range(0, n, max_chunk):
            row_idx = list(range(i, min(i + max_chunk, n)))
            col_idx = list(range(j, min(j + max_chunk, n)))
            combined_coords = [coord_list[k] for k in sorted(set(row_idx + col_idx))]
            coord_str = ";".join(combined_coords)
            src_indices = [sorted(set(row_idx + col_idx)).index(k) for k in row_idx]
            dst_indices = [sorted(set(row_idx + col_idx)).index(k) for k in col_idx]
            url = (
                f"http://13.202.84.210:3003/table/v1/driving/{coord_str}"
                f"?sources={';'.join(map(str, src_indices))}"
                f"&destinations={';'.join(map(str, dst_indices))}&annotations=distance"
            )
            for attempt in range(retry):
                try:
                    response = requests.get(url)
                    if response.status_code == 200:
                        dist = np.array(response.json()['distances'])
                        matrix[i:i+len(row_idx), j:j+len(col_idx)] = dist
                        break
                    time.sleep(1)
                except:
                    time.sleep(1)
            else:
                raise Exception("OSRM failed")
    return matrix

@app.post("/cluster_and_route")
async def cluster_and_route(
    file: UploadFile = File(...),
    eps: float = Form(50.0),
    min_samples: int = Form(1),
    max_chunk: int = 50,
    retry: int = 3,
    bus_capacities: str = Form("21,32,45"),
    min_fill_ratio: float = Form(0.8),
    max_allowed_dist_km: float = Form(2.0),
    avg_speed_kmph: float = Form(60.0),
    stop_time_per_student: int = Form(60),
    start_time: str = Form("07:00")
):
    print("\n🟩 Received data from frontend:")
    print("📄 File name:", file.filename)

    content = await file.read()
    file.file.seek(0)

    trip_id = f"trip_{uuid.uuid4().hex[:8]}"
    output_dir = f"output/{trip_id}"
    trips_dir = f"{output_dir}/trips"
    os.makedirs(trips_dir, exist_ok=True)

    df = pd.read_csv(file.file)
    df = df.dropna(subset=['Latitude', 'Longitude'])
    df = df[(df['Latitude'] != 0) & (df['Longitude'] != 0)].copy().reset_index(drop=True)

    coord_list = df.apply(lambda x: f"{x['Longitude']},{x['Latitude']}", axis=1).tolist()
    distance_matrix = get_osrm_table_chunked(coord_list, max_chunk=max_chunk, retry=retry)
    distance_matrix = np.nan_to_num(distance_matrix, nan=1e6, posinf=1e6, neginf=1e6)
    distance_matrix = np.maximum(distance_matrix, 0)

    db = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
    df['Cluster'] = db.fit_predict(distance_matrix)

    centroids = df.groupby('Cluster')[['Latitude', 'Longitude']].mean().reset_index()
    centroids['Pickup Label'] = centroids['Cluster'].apply(lambda x: f"Pickup-{x}")
    centroids['Student Count'] = centroids['Cluster'].map(df['Cluster'].value_counts())

    depot = [25.249305716884283, 55.461551555511086]
    centroids["Cluster"] = range(len(centroids))
    centroids_sorted = centroids.sort_values(by="Student Count", ascending=False).reset_index(drop=True)

    capacities = list(map(int, bus_capacities.split(',')))
    min_fills = [int(min_fill_ratio * cap) for cap in capacities]
    avg_speed_mps = avg_speed_kmph * 1000 / 3600

    assigned_routes, used = [], set()
    coords = list(zip(centroids_sorted['Latitude'], centroids_sorted['Longitude']))
    dist_matrix = np.array([[geodesic(a, b).km for b in coords] for a in coords])

    for i in range(len(centroids_sorted)):
        if i in used: continue
        group, total = [i], centroids_sorted.loc[i, "Student Count"]
        used.add(i)
        for j in np.argsort(dist_matrix[i]):
            if j in used or j == i: continue
            sc = centroids_sorted.loc[j, "Student Count"]
            if total + sc > max(capacities): continue
            if all(dist_matrix[j, k] <= max_allowed_dist_km for k in group):
                group.append(j)
                total += sc
                used.add(j)
        for cap, min_fill in zip(capacities, min_fills):
            if min_fill <= total <= cap:
                assigned_routes.append((group, total, cap))
                break

    route_data = []
    for idx, (group_indices, total_students, bus_size) in enumerate(assigned_routes):
        bus_id = f"bus_{uuid.uuid4().hex[:6]}"
        coord_strs = [f"{depot[1]},{depot[0]}"] + [
            f"{centroids_sorted.loc[i, 'Longitude']},{centroids_sorted.loc[i, 'Latitude']}" for i in group_indices
        ] + [f"{depot[1]},{depot[0]}"]
        url = f"http://13.202.84.210:3003/trip/v1/driving/{';'.join(coord_strs)}?source=first&destination=last"
        response = requests.get(url)
        if response.status_code != 200: continue

        trip = response.json()
        geometry = trip["trips"][0]["geometry"]
        distance = trip["trips"][0]["distance"]

        driving_time = distance / avg_speed_mps
        stop_time = len(group_indices) * stop_time_per_student
        total_time = driving_time + stop_time
        start_dt = datetime.strptime(start_time, "%H:%M")
        end_dt = start_dt + timedelta(seconds=total_time)

        route_info = {
            'Bus ID': bus_id,
            'Bus Number': idx+1,
            'Bus Capacity': bus_size,
            'Total Students': total_students,
            'Total Distance (km)': round(distance / 1000, 2),
            'Estimated Duration (min)': round(total_time / 60, 1),
            'Start Time': start_dt.strftime("%H:%M"),
            'End Time': end_dt.strftime("%H:%M"),
            'Pickup Order': " → ".join([f"Cluster {centroids_sorted.loc[i, 'Cluster']}" for i in group_indices]),
        }
        route_data.append(route_info)

        decoded_coords = polyline.decode(geometry)
        bus_map = folium.Map(location=depot, zoom_start=13)
        folium.PolyLine(decoded_coords, color="blue").add_to(bus_map)
        folium.Marker(location=decoded_coords[0], popup="Depot Start", icon=folium.Icon(color='green')).add_to(bus_map)
        folium.Marker(location=decoded_coords[-1], popup="Depot End", icon=folium.Icon(color='red')).add_to(bus_map)
        for cluster_idx in group_indices:
            lat = centroids_sorted.loc[cluster_idx, "Latitude"]
            lon = centroids_sorted.loc[cluster_idx, "Longitude"]
            folium.Marker([lat, lon], popup=f"Pickup-{centroids_sorted.loc[cluster_idx, 'Cluster']}", icon=folium.Icon(color='blue')).add_to(bus_map)

        bus_map.save(f"{trips_dir}/{bus_id}_route_map.html")
        pd.DataFrame([route_info]).to_csv(f"{trips_dir}/{bus_id}_summary.csv", index=False)

    pd.DataFrame(route_data).to_csv(f"{output_dir}/bus_routes_summary.csv", index=False)

    df.to_csv(f"{output_dir}/students_with_clusters.csv", index=False)
    centroids.to_csv(f"{output_dir}/pickup_points.csv", index=False)

    metadata = load_metadata()
    total_distance_km = sum([r['Total Distance (km)'] for r in route_data])
    total_duration_min = sum([r['Estimated Duration (min)'] for r in route_data])
    metadata[trip_id] = {
        "timestamp": datetime.now().isoformat(),
        "parameters": {
            "eps": eps, "min_samples": min_samples, "bus_capacities": bus_capacities,
            "min_fill_ratio": min_fill_ratio, "max_allowed_dist_km": max_allowed_dist_km,
            "avg_speed_kmph": avg_speed_kmph, "stop_time_per_student": stop_time_per_student,
            "start_time": start_time
        },
        "statistics": {
            "total_students": len(df),
            "total_clusters": len(centroids),
            "total_buses": len(assigned_routes),
            "total_distance_km": round(total_distance_km, 2),
            "total_duration_min": round(total_duration_min, 1)
        },
        "buses": route_data,
        "files": os.listdir(output_dir) + [f"trips/{f}" for f in os.listdir(trips_dir)]
    }
    save_metadata(metadata)

    return {
        "message": "Routing complete",
        "trip_id": trip_id,
        "files": metadata[trip_id]['files']
    }

@app.get("/download_file/{trip_id}/{filename}")
def download_file(trip_id: str, filename: str):
    file_path = f"output/{trip_id}/{filename}"
    if not os.path.exists(file_path):
        return JSONResponse(status_code=404, content={"message": "File not found"})
    if filename.endswith(".html"):
        return FileResponse(file_path, media_type="text/html", filename=filename, headers={"Content-Disposition": "inline"})
    elif filename.endswith(".csv"):
        return FileResponse(file_path, media_type="text/csv", filename=filename, headers={"Content-Disposition": "attachment"})
    else:
        return FileResponse(file_path)

@app.get("/routes")
def get_routes():
    return load_metadata()

@app.get("/routes/{trip_id}/buses")
def get_buses_for_trip(trip_id: str):
    metadata = load_metadata()
    if trip_id not in metadata:
        return JSONResponse(status_code=404, content={"message": "Trip ID not found"})
    return metadata[trip_id].get("buses", [])

@app.get("/routes/{trip_id}/buses/{bus_id}")
def get_bus_summary(trip_id: str, bus_id: str):
    summary_path = f"output/{trip_id}/trips/{bus_id}_summary.csv"
    map_path = f"output/{trip_id}/trips/{bus_id}_route_map.html"

    if not os.path.exists(summary_path):
        return JSONResponse(status_code=404, content={"message": "Bus summary not found"})

    summary = pd.read_csv(summary_path).to_dict(orient='records')[0]

    return {
        "summary": summary,
        "map_url": f"/download_file/{trip_id}/trips/{bus_id}_route_map.html"
    }
