# from fastapi import FastAPI, UploadFile, File
# from fastapi.responses import HTMLResponse, JSONResponse
# from fastapi.middleware.cors import CORSMiddleware

# import pandas as pd
# import numpy as np
# from sklearn.cluster import DBSCAN
# from geopy.distance import geodesic
# import requests
# import os
# from datetime import datetime, timedelta
# import folium
# import polyline
# from tqdm import tqdm

# # ✅ Only define FastAPI once
# app = FastAPI(title="Smart School Routing API")

# # ✅ Add CORS middleware after defining `app`
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Or specify: ["http://localhost:5174"]
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # ---------------------- Utility Functions ----------------------

# def get_osrm_table_chunked(coord_list, max_chunk=50, retry=3):
#     n = len(coord_list)
#     matrix = np.full((n, n), 1e6)

#     for i in tqdm(range(0, n, max_chunk), desc="Row chunks"):
#         for j in range(0, n, max_chunk):
#             row_idx = list(range(i, min(i + max_chunk, n)))
#             col_idx = list(range(j, min(j + max_chunk, n)))

#             combined_coords = [coord_list[k] for k in sorted(set(row_idx + col_idx))]
#             coord_str = ";".join(combined_coords)

#             src_indices = [sorted(set(row_idx + col_idx)).index(k) for k in row_idx]
#             dst_indices = [sorted(set(row_idx + col_idx)).index(k) for k in col_idx]

#             url = (
#                 f"http://13.202.84.210:3003/table/v1/driving/{coord_str}"
#                 f"?sources={';'.join(map(str, src_indices))}"
#                 f"&destinations={';'.join(map(str, dst_indices))}&annotations=distance"
#             )

#             for attempt in range(retry):
#                 try:
#                     response = requests.get(url)
#                     if response.status_code == 200:
#                         dist = np.array(response.json()['distances'])
#                         matrix[i:i+len(row_idx), j:j+len(col_idx)] = dist
#                         break
#                     time.sleep(1)
#                 except:
#                     time.sleep(1)
#             else:
#                 raise Exception("OSRM failed")

#     return matrix

# @app.post("/cluster_and_route")
# async def cluster_and_route(
#     file: UploadFile = File(...),
#     eps: float = 50.0,
#     min_samples: int = 1,
#     max_chunk: int = 50,
#     retry: int = 3,
#     bus_capacities: str = "21,32,45",
#     min_fill_ratio: float = 0.8,
#     max_allowed_dist_km: float = 2.0,
#     avg_speed_kmph: float = 60.0,
#     stop_time_per_student: int = 60,
#     start_time: str = "07:00"
# ):
#     # ---------------------- STEP 1: Load and Clean ----------------------
#     df = pd.read_csv(file.file)
#     df = df.dropna(subset=['Latitude', 'Longitude'])
#     df = df[(df['Latitude'] != 0) & (df['Longitude'] != 0)].copy()
#     df = df.reset_index(drop=True)

#     os.makedirs("output", exist_ok=True)

#     # ---------------------- STEP 2: Raw Student Map ----------------------
#     center_lat = df['Latitude'].mean()
#     center_lon = df['Longitude'].mean()
#     student_map = folium.Map(location=[center_lat, center_lon], zoom_start=13)

#     for idx, row in df.iterrows():
#         folium.Marker(
#             location=[row['Latitude'], row['Longitude']],
#             popup=f"Student {idx+1}",
#             icon=folium.Icon(color="blue", icon="user")
#         ).add_to(student_map)

#     student_map.save("output/student_locations.html")

#     # ---------------------- STEP 3: DBSCAN Clustering ----------------------
#     coord_list = df.apply(lambda x: f"{x['Longitude']},{x['Latitude']}", axis=1).tolist()
#     distance_matrix = get_osrm_table_chunked(coord_list, max_chunk=max_chunk, retry=retry)
#     distance_matrix = np.where(np.isnan(distance_matrix), 1e6, distance_matrix)
#     distance_matrix = np.maximum(distance_matrix, 0)

#     db = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
#     labels = db.fit_predict(distance_matrix)
#     df['Cluster'] = labels

#     centroids = df.groupby('Cluster')[['Latitude', 'Longitude']].mean().reset_index()
#     centroids['Pickup Label'] = centroids['Cluster'].apply(lambda x: f"Pickup-{x}")
#     cluster_counts = df['Cluster'].value_counts().to_dict()
#     centroids['Student Count'] = centroids['Cluster'].map(cluster_counts)

#     df.to_csv("output/students_with_clusters.csv", index=False)
#     centroids.to_csv("output/pickup_points.csv", index=False)

#     # ---------------------- STEP 4: Cluster Map ----------------------
#     cluster_map = folium.Map(location=[center_lat, center_lon], zoom_start=13)
#     import matplotlib.cm as cm
#     import matplotlib.colors as colors

#     num_clusters = len(centroids)
#     colormap = cm.get_cmap('tab20', num_clusters)
#     color_list = [colors.to_hex(colormap(i)) for i in range(num_clusters)]
#     cluster_color_map = {label: color_list[i % len(color_list)] for i, label in enumerate(sorted(df['Cluster'].unique()))}

#     for idx, row in df.iterrows():
#         cluster_id = row['Cluster']
#         folium.CircleMarker(
#             location=[row['Latitude'], row['Longitude']],
#             radius=5,
#             color=cluster_color_map[cluster_id],
#             fill=True,
#             fill_opacity=0.8,
#             popup=f"Student {idx+1} - Cluster {cluster_id}"
#         ).add_to(cluster_map)

#     for idx, row in centroids.iterrows():
#         folium.Marker(
#             location=[row['Latitude'], row['Longitude']],
#             icon=folium.Icon(color="red", icon="flag"),
#             popup=f"Pickup-{row['Cluster']}<br>{row['Student Count']} students"
#         ).add_to(cluster_map)

#     cluster_map.save("output/student_clusters_map.html")

#     # ---------------------- STEP 5: Bus Assignment + Routing ----------------------
#     centroids["Cluster"] = range(len(centroids))
#     centroids_sorted = centroids.sort_values(by="Student Count", ascending=False).reset_index(drop=True)

#     capacities = list(map(int, bus_capacities.split(',')))
#     min_fills = [int(min_fill_ratio * cap) for cap in capacities]
#     avg_speed_mps = avg_speed_kmph * 1000 / 3600

#     assigned_routes = []
#     used = set()
#     n_points = len(centroids_sorted)
#     coords = list(zip(centroids_sorted['Latitude'], centroids_sorted['Longitude']))
#     dist_matrix = np.zeros((n_points, n_points))

#     for i in range(n_points):
#         for j in range(i + 1, n_points):
#             dist = geodesic(coords[i], coords[j]).km
#             dist_matrix[i, j] = dist
#             dist_matrix[j, i] = dist

#     for i in range(n_points):
#         if i in used:
#             continue
#         group = [i]
#         total_students = centroids_sorted.loc[i, "Student Count"]
#         used.add(i)
#         neighbor_indices = np.argsort(dist_matrix[i])
#         for j in neighbor_indices:
#             if j in used or j == i:
#                 continue
#             student_count = centroids_sorted.loc[j, "Student Count"]
#             new_total = total_students + student_count
#             if new_total > max(capacities):
#                 continue
#             if all(dist_matrix[j, k] <= max_allowed_dist_km for k in group):
#                 group.append(j)
#                 total_students = new_total
#                 used.add(j)
#         for cap, min_fill in zip(capacities, min_fills):
#             if min_fill <= total_students <= cap:
#                 assigned_routes.append((group, total_students, cap))
#                 break

#     depot = [25.249305716884283, 55.461551555511086]
#     combined_map = folium.Map(location=depot, zoom_start=13)
#     folium.Marker(location=depot, icon=folium.Icon(color="green"), popup="Depot").add_to(combined_map)

#     route_data = []
#     bus_colors = {21: 'blue', 32: 'purple', 45: 'orange'}

#     for idx, (group_indices, total_students, bus_size) in enumerate(assigned_routes):
#         coords_strs = [f"{depot[1]},{depot[0]}"]
#         for i in group_indices:
#             row = centroids_sorted.loc[i]
#             coords_strs.append(f"{row['Longitude']},{row['Latitude']}")
#         coords_strs.append(f"{depot[1]},{depot[0]}")
#         coord_str = ";".join(coords_strs)

#         url = f"http://13.202.84.210:3003/trip/v1/driving/{coord_str}?source=first&destination=last"
#         response = requests.get(url)
#         if response.status_code != 200:
#             print(f"❌ Error for bus {idx}: {response.text}")
#             continue

#         trip = response.json()
#         geometry = trip["trips"][0]["geometry"]
#         distance = trip["trips"][0]["distance"]

#         driving_time = distance / avg_speed_mps
#         stop_time = len(group_indices) * stop_time_per_student
#         total_time = driving_time + stop_time

#         start_dt = datetime.strptime(start_time, "%H:%M")
#         end_dt = start_dt + timedelta(seconds=total_time)

#         route_data.append({
#             'Bus Number': idx + 1,
#             'Bus Capacity': bus_size,
#             'Total Students': total_students,
#             'Total Distance (km)': round(distance / 1000, 2),
#             'Estimated Duration (min)': round(total_time / 60, 1),
#             'Start Time': start_dt.strftime("%H:%M"),
#             'End Time': end_dt.strftime("%H:%M"),
#             'Pickup Order': " → ".join([f"Cluster {centroids_sorted.loc[i, 'Cluster']}" for i in group_indices])
#         })

#         route_group = folium.FeatureGroup(name=f"Bus {idx+1} ({bus_size}-seater)")
#         color = bus_colors.get(bus_size, 'gray')

#         for i in group_indices:
#             row = centroids_sorted.loc[i]
#             folium.Marker(
#                 location=[row['Latitude'], row['Longitude']],
#                 popup=f"Bus {idx+1}: Pickup-{row['Cluster']} ({row['Student Count']} students)",
#                 icon=folium.Icon(color=color, icon="user")
#             ).add_to(route_group)

#         folium.PolyLine(
#             locations=polyline.decode(geometry),
#             color=color,
#             weight=3,
#             popup=f"Bus {idx+1}: {total_students} students"
#         ).add_to(route_group)

#         route_group.add_to(combined_map)

#     folium.LayerControl().add_to(combined_map)
#     pd.DataFrame(route_data).to_csv("output/bus_routes_summary.csv", index=False)
#     combined_map.save("output/all_bus_routes.html")

#     return {
#         "message": "Clustering + routing complete",
#         "clusters": len(centroids),
#         "student_map": "output/student_locations.html",
#         "cluster_map": "output/student_clusters_map.html",
#         "route_map": "output/all_bus_routes.html",
#         "route_csv": "output/bus_routes_summary.csv"
#     }


# # ---------------------- Home ----------------------

# @app.get("/")
# def home():
#     return HTMLResponse("""
#     <h2>Smart School Routing API</h2>
#     <ul>
#         <li>POST <code>/cluster_students</code> (Upload CSV and adjust clustering parameters)</li>
#         <li>GET <code>/assign_buses_and_route</code> (Adjust routing/bus assignment parameters)</li>
#     </ul>
#     """)

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from gridfs import GridFS
from bson import ObjectId
import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN
from geopy.distance import geodesic
import requests
import os
from datetime import datetime, timedelta
import folium
import polyline
from tqdm import tqdm
import time
import io

# MongoDB connection setup
MONGODB_URI = "mongodb+srv://intelliod:decarbo@decarbo.e48trgs.mongodb.net/"
DB_NAME = "decarbo"
COLLECTION_NAME = "school_routes"

# Initialize MongoDB client and GridFS
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]
fs = GridFS(db)  # GridFS for file storage

app = FastAPI(title="Smart School Routing API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- Utility Functions ----------------------

def save_file_to_gridfs(file_path: str, file_type: str) -> ObjectId:
    """Helper function to save a file to GridFS"""
    try:
        with open(file_path, 'rb') as file:
            file_id = fs.put(file, filename=os.path.basename(file_path), content_type=file_type)
            return file_id
    except Exception as e:
        print(f"Error saving file to GridFS: {e}")
        return None

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
                f"http://localhost:3003/table/v1/driving/{coord_str}"
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

def save_to_mongodb(data):
    """Helper function to save data to MongoDB"""
    try:
        result = collection.insert_one(data)
        return str(result.inserted_id)
    except Exception as e:
        print(f"Error saving to MongoDB: {e}")
        return None

@app.post("/cluster_and_route")
async def cluster_and_route(
    file: UploadFile = File(...),
    eps: float = 50.0,
    min_samples: int = 1,
    max_chunk: int = 50,
    retry: int = 3,
    bus_capacities: str = "21,32,45",
    min_fill_ratio: float = 0.8,
    max_allowed_dist_km: float = 2.0,
    avg_speed_kmph: float = 60.0,
    stop_time_per_student: int = 60,
    start_time: str = "07:00"
):
    # ---------------------- STEP 1: Load and Clean ----------------------
    df = pd.read_csv(file.file)
    df = df.dropna(subset=['Latitude', 'Longitude'])
    df = df[(df['Latitude'] != 0) & (df['Longitude'] != 0)].copy()
    df = df.reset_index(drop=True)

    os.makedirs("output", exist_ok=True)

    # ---------------------- STEP 2: Raw Student Map ----------------------
    center_lat = df['Latitude'].mean()
    center_lon = df['Longitude'].mean()
    student_map = folium.Map(location=[center_lat, center_lon], zoom_start=13)

    for idx, row in df.iterrows():
        folium.Marker(
            location=[row['Latitude'], row['Longitude']],
            popup=f"Student {idx+1}",
            icon=folium.Icon(color="blue", icon="user")
        ).add_to(student_map)

    student_map_path = "output/student_locations.html"
    student_map.save(student_map_path)

    # ---------------------- STEP 3: DBSCAN Clustering ----------------------
    coord_list = df.apply(lambda x: f"{x['Longitude']},{x['Latitude']}", axis=1).tolist()
    distance_matrix = get_osrm_table_chunked(coord_list, max_chunk=max_chunk, retry=retry)
    distance_matrix = np.where(np.isnan(distance_matrix), 1e6, distance_matrix)
    distance_matrix = np.maximum(distance_matrix, 0)

    db = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
    labels = db.fit_predict(distance_matrix)
    df['Cluster'] = labels

    centroids = df.groupby('Cluster')[['Latitude', 'Longitude']].mean().reset_index()
    centroids['Pickup Label'] = centroids['Cluster'].apply(lambda x: f"Pickup-{x}")
    cluster_counts = df['Cluster'].value_counts().to_dict()
    centroids['Student Count'] = centroids['Cluster'].map(cluster_counts)

    students_csv_path = "output/students_with_clusters.csv"
    df.to_csv(students_csv_path, index=False)
    
    pickup_csv_path = "output/pickup_points.csv"
    centroids.to_csv(pickup_csv_path, index=False)

    # ---------------------- STEP 4: Cluster Map ----------------------
    cluster_map = folium.Map(location=[center_lat, center_lon], zoom_start=13)
    import matplotlib.cm as cm
    import matplotlib.colors as colors

    num_clusters = len(centroids)
    colormap = cm.get_cmap('tab20', num_clusters)
    color_list = [colors.to_hex(colormap(i)) for i in range(num_clusters)]
    cluster_color_map = {label: color_list[i % len(color_list)] for i, label in enumerate(sorted(df['Cluster'].unique()))}

    for idx, row in df.iterrows():
        cluster_id = row['Cluster']
        folium.CircleMarker(
            location=[row['Latitude'], row['Longitude']],
            radius=5,
            color=cluster_color_map[cluster_id],
            fill=True,
            fill_opacity=0.8,
            popup=f"Student {idx+1} - Cluster {cluster_id}"
        ).add_to(cluster_map)

    for idx, row in centroids.iterrows():
        folium.Marker(
            location=[row['Latitude'], row['Longitude']],
            icon=folium.Icon(color="red", icon="flag"),
            popup=f"Pickup-{row['Cluster']}<br>{row['Student Count']} students"
        ).add_to(cluster_map)

    cluster_map_path = "output/student_clusters_map.html"
    cluster_map.save(cluster_map_path)

    # ---------------------- STEP 5: Bus Assignment + Routing ----------------------
    centroids["Cluster"] = range(len(centroids))
    centroids_sorted = centroids.sort_values(by="Student Count", ascending=False).reset_index(drop=True)

    capacities = list(map(int, bus_capacities.split(',')))
    min_fills = [int(min_fill_ratio * cap) for cap in capacities]
    avg_speed_mps = avg_speed_kmph * 1000 / 3600

    assigned_routes = []
    used = set()
    n_points = len(centroids_sorted)
    coords = list(zip(centroids_sorted['Latitude'], centroids_sorted['Longitude']))
    dist_matrix = np.zeros((n_points, n_points))

    for i in range(n_points):
        for j in range(i + 1, n_points):
            dist = geodesic(coords[i], coords[j]).km
            dist_matrix[i, j] = dist
            dist_matrix[j, i] = dist

    for i in range(n_points):
        if i in used:
            continue
        group = [i]
        total_students = centroids_sorted.loc[i, "Student Count"]
        used.add(i)
        neighbor_indices = np.argsort(dist_matrix[i])
        for j in neighbor_indices:
            if j in used or j == i:
                continue
            student_count = centroids_sorted.loc[j, "Student Count"]
            new_total = total_students + student_count
            if new_total > max(capacities):
                continue
            if all(dist_matrix[j, k] <= max_allowed_dist_km for k in group):
                group.append(j)
                total_students = new_total
                used.add(j)
        for cap, min_fill in zip(capacities, min_fills):
            if min_fill <= total_students <= cap:
                assigned_routes.append((group, total_students, cap))
                break

    depot = [25.249305716884283, 55.461551555511086]
    combined_map = folium.Map(location=depot, zoom_start=13)
    folium.Marker(location=depot, icon=folium.Icon(color="green"), popup="Depot").add_to(combined_map)

    route_data = []
    bus_colors = {21: 'blue', 32: 'purple', 45: 'orange'}

    for idx, (group_indices, total_students, bus_size) in enumerate(assigned_routes):
        coords_strs = [f"{depot[1]},{depot[0]}"]
        for i in group_indices:
            row = centroids_sorted.loc[i]
            coords_strs.append(f"{row['Longitude']},{row['Latitude']}")
        coords_strs.append(f"{depot[1]},{depot[0]}")
        coord_str = ";".join(coords_strs)

        url = f"http://localhost:3003/trip/v1/driving/{coord_str}?source=first&destination=last"
        response = requests.get(url)
        if response.status_code != 200:
            print(f"❌ Error for bus {idx}: {response.text}")
            continue

        trip = response.json()
        geometry = trip["trips"][0]["geometry"]
        distance = trip["trips"][0]["distance"]

        driving_time = distance / avg_speed_mps
        stop_time = len(group_indices) * stop_time_per_student
        total_time = driving_time + stop_time

        start_dt = datetime.strptime(start_time, "%H:%M")
        end_dt = start_dt + timedelta(seconds=total_time)

        route_info = {
            'Bus Number': idx + 1,
            'Bus Capacity': bus_size,
            'Total Students': total_students,
            'Total Distance (km)': round(distance / 1000, 2),
            'Estimated Duration (min)': round(total_time / 60, 1),
            'Start Time': start_dt.strftime("%H:%M"),
            'End Time': end_dt.strftime("%H:%M"),
            'Pickup Order': " → ".join([f"Cluster {centroids_sorted.loc[i, 'Cluster']}" for i in group_indices]),
            'Route Geometry': geometry,
            'Stops': [
                {
                    'Cluster': centroids_sorted.loc[i, 'Cluster'],
                    'Latitude': centroids_sorted.loc[i, 'Latitude'],
                    'Longitude': centroids_sorted.loc[i, 'Longitude'],
                    'Student Count': centroids_sorted.loc[i, 'Student Count']
                } 
                for i in group_indices
            ]
        }
        route_data.append(route_info)

        route_group = folium.FeatureGroup(name=f"Bus {idx+1} ({bus_size}-seater)")
        color = bus_colors.get(bus_size, 'gray')

        for i in group_indices:
            row = centroids_sorted.loc[i]
            folium.Marker(
                location=[row['Latitude'], row['Longitude']],
                popup=f"Bus {idx+1}: Pickup-{row['Cluster']} ({row['Student Count']} students)",
                icon=folium.Icon(color=color, icon="user")
            ).add_to(route_group)

        folium.PolyLine(
            locations=polyline.decode(geometry),
            color=color,
            weight=3,
            popup=f"Bus {idx+1}: {total_students} students"
        ).add_to(route_group)

        route_group.add_to(combined_map)

    folium.LayerControl().add_to(combined_map)
    routes_csv_path = "output/bus_routes_summary.csv"
    pd.DataFrame(route_data).to_csv(routes_csv_path, index=False)
    
    combined_map_path = "output/all_bus_routes.html"
    combined_map.save(combined_map_path)

    # Save all output files to GridFS
    student_map_id = save_file_to_gridfs(student_map_path, "text/html")
    cluster_map_id = save_file_to_gridfs(cluster_map_path, "text/html")
    combined_map_id = save_file_to_gridfs(combined_map_path, "text/html")
    students_csv_id = save_file_to_gridfs(students_csv_path, "text/csv")
    pickup_csv_id = save_file_to_gridfs(pickup_csv_path, "text/csv")
    routes_csv_id = save_file_to_gridfs(routes_csv_path, "text/csv")

    # Prepare data for MongoDB
    mongo_data = {
        'timestamp': datetime.now(),
        'parameters': {
            'eps': eps,
            'min_samples': min_samples,
            'bus_capacities': bus_capacities,
            'min_fill_ratio': min_fill_ratio,
            'max_allowed_dist_km': max_allowed_dist_km,
            'avg_speed_kmph': avg_speed_kmph,
            'stop_time_per_student': stop_time_per_student,
            'start_time': start_time
        },
        'statistics': {
            'total_students': len(df),
            'total_clusters': len(centroids),
            'total_buses': len(assigned_routes),
            'total_distance_km': sum(r['Total Distance (km)'] for r in route_data),
            'average_students_per_bus': sum(r['Total Students'] for r in route_data) / len(route_data)
        },
        'routes': route_data,
        'output_files': {
            'student_map': str(student_map_id),
            'cluster_map': str(cluster_map_id),
            'route_map': str(combined_map_id),
            'students_csv': str(students_csv_id),
            'pickup_csv': str(pickup_csv_id),
            'route_csv': str(routes_csv_id)
        }
    }

    # Save to MongoDB
    mongo_id = save_to_mongodb(mongo_data)

    return {
        "message": "Clustering + routing complete and saved to MongoDB",
        "clusters": len(centroids),
        "mongodb_id": mongo_id,
        "file_ids": {
            "student_map": str(student_map_id),
            "cluster_map": str(cluster_map_id),
            "route_map": str(combined_map_id),
            "students_csv": str(students_csv_id),
            "pickup_csv": str(pickup_csv_id),
            "route_csv": str(routes_csv_id)
        }
    }

@app.get("/download_file/{file_id}")
async def download_file(file_id: str):
    """Endpoint to download a file from GridFS by its ID"""
    try:
        grid_out = fs.get(ObjectId(file_id))
        file_content = grid_out.read()
        
        # Determine content type based on file extension or stored metadata
        filename = grid_out.filename
        if filename.endswith('.html'):
            media_type = "text/html"
        elif filename.endswith('.csv'):
            media_type = "text/csv"
        else:
            media_type = "application/octet-stream"
        
        return Response(
            content=file_content,
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=404,
            content={"message": f"File not found or error occurred: {str(e)}"}
        )

@app.get("/test_db_connection")
async def test_db_connection():
    try:
        # Test a simple operation (e.g., inserting and fetching a test document)
        test_doc = {
            "test": "connection_check",
            "timestamp": datetime.now()
        }
        
        # Insert the test document
        result = collection.insert_one(test_doc)
        inserted_id = str(result.inserted_id)
        
        # Fetch the test document
        fetched_doc = collection.find_one({"_id": ObjectId(inserted_id)})
        
        if fetched_doc:
            fetched_doc["_id"] = str(fetched_doc["_id"])  # Convert ObjectId to string
            return {
                "status": "success",
                "message": "Successfully connected to MongoDB",
                "inserted_id": inserted_id,
                "fetched_doc": fetched_doc
            }
        else:
            return {
                "status": "error",
                "message": "Could not fetch the test document from MongoDB"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to connect to MongoDB: {str(e)}"
        }
    

@app.get("/")
def home():
    return HTMLResponse("""
    <h2>Smart School Routing API</h2>
    <ul>
        <li>POST <code>/cluster_and_route</code> (Upload CSV with student locations and get optimized routes)</li>
        <li>GET <code>/download_file/{file_id}</code> (Download generated files by their ID)</li>
    </ul>
    """)

@app.get("/routes")
def get_routes():
    """Endpoint to retrieve all saved routes from MongoDB"""
    try:
        routes = list(collection.find({}, {'_id': 0}))
        return JSONResponse(content=routes)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Error retrieving routes: {str(e)}"}
        )

@app.get("/routes/{route_id}")
def get_route(route_id: str):
    """Endpoint to retrieve a specific route by ID"""
    try:
        route = collection.find_one({"_id": ObjectId(route_id)}, {'_id': 0})
        if route:
            return route
        return JSONResponse(
            status_code=404,
            content={"message": "Route not found"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Error retrieving route: {str(e)}"}
        )


# from fastapi import FastAPI, UploadFile, File, Response
# from fastapi.responses import HTMLResponse, JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# from gridfs import GridFS
# from bson import ObjectId
# import pandas as pd
# import numpy as np
# from sklearn.cluster import DBSCAN
# from geopy.distance import geodesic
# import requests
# import os
# from datetime import datetime, timedelta
# import folium
# import polyline
# from tqdm import tqdm
# import time
# import io

# # MongoDB connection setup
# MONGODB_URI = "mongodb+srv://intelliod:decarbo@decarbo.e48trgs.mongodb.net/"
# DB_NAME = "decarbo"
# COLLECTION_NAME = "school_routes"

# # Initialize MongoDB client and GridFS
# client = MongoClient(MONGODB_URI)
# db = client[DB_NAME]
# collection = db[COLLECTION_NAME]
# fs = GridFS(db)  # GridFS for file storage

# app = FastAPI(title="Smart School Routing API")

# # Add CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------------------- Utility Functions ----------------------

# def convert_numpy_types(obj):
#     """Recursively convert numpy types to native Python types for MongoDB compatibility"""
#     if isinstance(obj, np.generic):
#         return obj.item()
#     elif isinstance(obj, dict):
#         return {k: convert_numpy_types(v) for k, v in obj.items()}
#     elif isinstance(obj, list):
#         return [convert_numpy_types(v) for v in obj]
#     return obj

# def save_file_to_gridfs(file_path: str, file_type: str) -> ObjectId:
#     """Helper function to save a file to GridFS"""
#     try:
#         with open(file_path, 'rb') as file:
#             file_id = fs.put(file, filename=os.path.basename(file_path), content_type=file_type)
#             return file_id
#     except Exception as e:
#         print(f"Error saving file to GridFS: {e}")
#         return None

# def get_osrm_table_chunked(coord_list, max_chunk=50, retry=3):
#     n = len(coord_list)
#     matrix = np.full((n, n), 1e6)

#     for i in tqdm(range(0, n, max_chunk), desc="Row chunks"):
#         for j in range(0, n, max_chunk):
#             row_idx = list(range(i, min(i + max_chunk, n)))
#             col_idx = list(range(j, min(j + max_chunk, n)))

#             combined_coords = [coord_list[k] for k in sorted(set(row_idx + col_idx))]
#             coord_str = ";".join(combined_coords)

#             src_indices = [sorted(set(row_idx + col_idx)).index(k) for k in row_idx]
#             dst_indices = [sorted(set(row_idx + col_idx)).index(k) for k in col_idx]

#             url = (
#                 f"http://13.202.84.210:3003/table/v1/driving/{coord_str}"
#                 f"?sources={';'.join(map(str, src_indices))}"
#                 f"&destinations={';'.join(map(str, dst_indices))}&annotations=distance"
#             )

#             for attempt in range(retry):
#                 try:
#                     response = requests.get(url)
#                     if response.status_code == 200:
#                         dist = np.array(response.json()['distances'])
#                         matrix[i:i+len(row_idx), j:j+len(col_idx)] = dist
#                         break
#                     time.sleep(1)
#                 except:
#                     time.sleep(1)
#             else:
#                 raise Exception("OSRM failed")

#     return matrix

# def save_to_mongodb(data):
#     """Helper function to save data to MongoDB after converting numpy types"""
#     try:
#         # Convert numpy types before saving
#         data = convert_numpy_types(data)
#         result = collection.insert_one(data)
#         return str(result.inserted_id)
#     except Exception as e:
#         print(f"Error saving to MongoDB: {e}")
#         return None

# @app.post("/cluster_and_route")
# async def cluster_and_route(
#     file: UploadFile = File(...),
#     eps: float = 50.0,
#     min_samples: int = 1,
#     max_chunk: int = 50,
#     retry: int = 3,
#     bus_capacities: str = "21,32,45",
#     min_fill_ratio: float = 0.8,
#     max_allowed_dist_km: float = 2.0,
#     avg_speed_kmph: float = 60.0,
#     stop_time_per_student: int = 60,
#     start_time: str = "07:00"
# ):
#     # ---------------------- STEP 1: Load and Clean ----------------------
#     df = pd.read_csv(file.file)
#     df = df.dropna(subset=['Latitude', 'Longitude'])
#     df = df[(df['Latitude'] != 0) & (df['Longitude'] != 0)].copy()
#     df = df.reset_index(drop=True)

#     os.makedirs("output", exist_ok=True)

#     # ---------------------- STEP 2: Raw Student Map ----------------------
#     center_lat = df['Latitude'].mean()
#     center_lon = df['Longitude'].mean()
#     student_map = folium.Map(location=[center_lat, center_lon], zoom_start=13)

#     for idx, row in df.iterrows():
#         folium.Marker(
#             location=[row['Latitude'], row['Longitude']],
#             popup=f"Student {idx+1}",
#             icon=folium.Icon(color="blue", icon="user")
#         ).add_to(student_map)

#     student_map_path = "output/student_locations.html"
#     student_map.save(student_map_path)

#     # ---------------------- STEP 3: DBSCAN Clustering ----------------------
#     coord_list = df.apply(lambda x: f"{x['Longitude']},{x['Latitude']}", axis=1).tolist()
#     distance_matrix = get_osrm_table_chunked(coord_list, max_chunk=max_chunk, retry=retry)
#     distance_matrix = np.where(np.isnan(distance_matrix), 1e6, distance_matrix)
#     distance_matrix = np.maximum(distance_matrix, 0)

#     db = DBSCAN(eps=eps, min_samples=min_samples, metric='precomputed')
#     labels = db.fit_predict(distance_matrix)
#     df['Cluster'] = labels

#     centroids = df.groupby('Cluster')[['Latitude', 'Longitude']].mean().reset_index()
#     centroids['Pickup Label'] = centroids['Cluster'].apply(lambda x: f"Pickup-{x}")
#     cluster_counts = df['Cluster'].value_counts().to_dict()
#     centroids['Student Count'] = centroids['Cluster'].map(cluster_counts)

#     students_csv_path = "output/students_with_clusters.csv"
#     df.to_csv(students_csv_path, index=False)
    
#     pickup_csv_path = "output/pickup_points.csv"
#     centroids.to_csv(pickup_csv_path, index=False)

#     # ---------------------- STEP 4: Cluster Map ----------------------
#     cluster_map = folium.Map(location=[center_lat, center_lon], zoom_start=13)
#     import matplotlib.cm as cm
#     import matplotlib.colors as colors

#     num_clusters = len(centroids)
#     colormap = cm.get_cmap('tab20', num_clusters)
#     color_list = [colors.to_hex(colormap(i)) for i in range(num_clusters)]
#     cluster_color_map = {label: color_list[i % len(color_list)] for i, label in enumerate(sorted(df['Cluster'].unique()))}

#     for idx, row in df.iterrows():
#         cluster_id = row['Cluster']
#         folium.CircleMarker(
#             location=[row['Latitude'], row['Longitude']],
#             radius=5,
#             color=cluster_color_map[cluster_id],
#             fill=True,
#             fill_opacity=0.8,
#             popup=f"Student {idx+1} - Cluster {cluster_id}"
#         ).add_to(cluster_map)

#     for idx, row in centroids.iterrows():
#         folium.Marker(
#             location=[row['Latitude'], row['Longitude']],
#             icon=folium.Icon(color="red", icon="flag"),
#             popup=f"Pickup-{row['Cluster']}<br>{row['Student Count']} students"
#         ).add_to(cluster_map)

#     cluster_map_path = "output/student_clusters_map.html"
#     cluster_map.save(cluster_map_path)

#     # ---------------------- STEP 5: Bus Assignment + Routing ----------------------
#     centroids["Cluster"] = range(len(centroids))
#     centroids_sorted = centroids.sort_values(by="Student Count", ascending=False).reset_index(drop=True)

#     capacities = list(map(int, bus_capacities.split(',')))
#     min_fills = [int(min_fill_ratio * cap) for cap in capacities]
#     avg_speed_mps = avg_speed_kmph * 1000 / 3600

#     assigned_routes = []
#     used = set()
#     n_points = len(centroids_sorted)
#     coords = list(zip(centroids_sorted['Latitude'], centroids_sorted['Longitude']))
#     dist_matrix = np.zeros((n_points, n_points))

#     for i in range(n_points):
#         for j in range(i + 1, n_points):
#             dist = geodesic(coords[i], coords[j]).km
#             dist_matrix[i, j] = dist
#             dist_matrix[j, i] = dist

#     for i in range(n_points):
#         if i in used:
#             continue
#         group = [i]
#         total_students = centroids_sorted.loc[i, "Student Count"]
#         used.add(i)
#         neighbor_indices = np.argsort(dist_matrix[i])
#         for j in neighbor_indices:
#             if j in used or j == i:
#                 continue
#             student_count = centroids_sorted.loc[j, "Student Count"]
#             new_total = total_students + student_count
#             if new_total > max(capacities):
#                 continue
#             if all(dist_matrix[j, k] <= max_allowed_dist_km for k in group):
#                 group.append(j)
#                 total_students = new_total
#                 used.add(j)
#         for cap, min_fill in zip(capacities, min_fills):
#             if min_fill <= total_students <= cap:
#                 assigned_routes.append((group, total_students, cap))
#                 break

#     depot = [25.249305716884283, 55.461551555511086]
#     combined_map = folium.Map(location=depot, zoom_start=13)
#     folium.Marker(location=depot, icon=folium.Icon(color="green"), popup="Depot").add_to(combined_map)

#     route_data = []
#     bus_colors = {21: 'blue', 32: 'purple', 45: 'orange'}

#     for idx, (group_indices, total_students, bus_size) in enumerate(assigned_routes):
#         coords_strs = [f"{depot[1]},{depot[0]}"]
#         for i in group_indices:
#             row = centroids_sorted.loc[i]
#             coords_strs.append(f"{row['Longitude']},{row['Latitude']}")
#         coords_strs.append(f"{depot[1]},{depot[0]}")
#         coord_str = ";".join(coords_strs)

#         url = f"http://13.202.84.210:3003/trip/v1/driving/{coord_str}?source=first&destination=last"
#         response = requests.get(url)
#         if response.status_code != 200:
#             print(f"❌ Error for bus {idx}: {response.text}")
#             continue

#         trip = response.json()
#         geometry = trip["trips"][0]["geometry"]
#         distance = trip["trips"][0]["distance"]

#         driving_time = distance / avg_speed_mps
#         stop_time = len(group_indices) * stop_time_per_student
#         total_time = driving_time + stop_time

#         start_dt = datetime.strptime(start_time, "%H:%M")
#         end_dt = start_dt + timedelta(seconds=total_time)

#         route_info = {
#             'Bus Number': idx + 1,
#             'Bus Capacity': bus_size,
#             'Total Students': total_students,
#             'Total Distance (km)': round(distance / 1000, 2),
#             'Estimated Duration (min)': round(total_time / 60, 1),
#             'Start Time': start_dt.strftime("%H:%M"),
#             'End Time': end_dt.strftime("%H:%M"),
#             'Pickup Order': " → ".join([f"Cluster {centroids_sorted.loc[i, 'Cluster']}" for i in group_indices]),
#             'Route Geometry': geometry,
#             'Stops': [
#                 {
#                     'Cluster': centroids_sorted.loc[i, 'Cluster'],
#                     'Latitude': centroids_sorted.loc[i, 'Latitude'],
#                     'Longitude': centroids_sorted.loc[i, 'Longitude'],
#                     'Student Count': centroids_sorted.loc[i, 'Student Count']
#                 } 
#                 for i in group_indices
#             ]
#         }
#         route_data.append(route_info)

#         route_group = folium.FeatureGroup(name=f"Bus {idx+1} ({bus_size}-seater)")
#         color = bus_colors.get(bus_size, 'gray')

#         for i in group_indices:
#             row = centroids_sorted.loc[i]
#             folium.Marker(
#                 location=[row['Latitude'], row['Longitude']],
#                 popup=f"Bus {idx+1}: Pickup-{row['Cluster']} ({row['Student Count']} students)",
#                 icon=folium.Icon(color=color, icon="user")
#             ).add_to(route_group)

#         folium.PolyLine(
#             locations=polyline.decode(geometry),
#             color=color,
#             weight=3,
#             popup=f"Bus {idx+1}: {total_students} students"
#         ).add_to(route_group)

#         route_group.add_to(combined_map)

#     folium.LayerControl().add_to(combined_map)
#     routes_csv_path = "output/bus_routes_summary.csv"
#     pd.DataFrame(route_data).to_csv(routes_csv_path, index=False)
    
#     combined_map_path = "output/all_bus_routes.html"
#     combined_map.save(combined_map_path)

#     # Save all output files to GridFS
#     student_map_id = save_file_to_gridfs(student_map_path, "text/html")
#     cluster_map_id = save_file_to_gridfs(cluster_map_path, "text/html")
#     combined_map_id = save_file_to_gridfs(combined_map_path, "text/html")
#     students_csv_id = save_file_to_gridfs(students_csv_path, "text/csv")
#     pickup_csv_id = save_file_to_gridfs(pickup_csv_path, "text/csv")
#     routes_csv_id = save_file_to_gridfs(routes_csv_path, "text/csv")

#     # Prepare data for MongoDB
#     mongo_data = {
#         'timestamp': datetime.now(),
#         'parameters': {
#             'eps': eps,
#             'min_samples': min_samples,
#             'bus_capacities': bus_capacities,
#             'min_fill_ratio': min_fill_ratio,
#             'max_allowed_dist_km': max_allowed_dist_km,
#             'avg_speed_kmph': avg_speed_kmph,
#             'stop_time_per_student': stop_time_per_student,
#             'start_time': start_time
#         },
#         'statistics': {
#             'total_students': len(df),
#             'total_clusters': len(centroids),
#             'total_buses': len(assigned_routes),
#             'total_distance_km': sum(r['Total Distance (km)'] for r in route_data),
#             'average_students_per_bus': sum(r['Total Students'] for r in route_data) / len(route_data)
#         },
#         'routes': route_data,
#         'output_files': {
#             'student_map': str(student_map_id),
#             'cluster_map': str(cluster_map_id),
#             'route_map': str(combined_map_id),
#             'students_csv': str(students_csv_id),
#             'pickup_csv': str(pickup_csv_id),
#             'route_csv': str(routes_csv_id)
#         }
#     }

#     # Save to MongoDB
#     mongo_id = save_to_mongodb(mongo_data)

#     # Clean up temporary files
#     try:
#         os.remove(student_map_path)
#         os.remove(cluster_map_path)
#         os.remove(combined_map_path)
#         os.remove(students_csv_path)
#         os.remove(pickup_csv_path)
#         os.remove(routes_csv_path)
#     except Exception as e:
#         print(f"Error cleaning up files: {e}")

#     return {
#         "message": "Clustering + routing complete and saved to MongoDB",
#         "clusters": len(centroids),
#         "mongodb_id": mongo_id,
#         "file_ids": {
#             "student_map": str(student_map_id),
#             "cluster_map": str(cluster_map_id),
#             "route_map": str(combined_map_id),
#             "students_csv": str(students_csv_id),
#             "pickup_csv": str(pickup_csv_id),
#             "route_csv": str(routes_csv_id)
#         }
#     }
# @app.get("/get_all_routes", response_class=JSONResponse)
# async def get_all_routes():
#     """
#     Fetch all route data from MongoDB collection
#     Returns:
#         - List of all route documents with file references
#     """
#     try:
#         # Get all documents from the collection
#         routes = list(collection.find({}, {'_id': 0}))  # Exclude MongoDB _id field
        
#         # Convert ObjectId to string for any remaining references
#         for route in routes:
#             if 'output_files' in route:
#                 for file_type, file_id in route['output_files'].items():
#                     if isinstance(file_id, ObjectId):
#                         route['output_files'][file_type] = str(file_id)
        
#         return {
#             "status": "success",
#             "count": len(routes),
#             "data": routes
#         }
#     except Exception as e:
#         return JSONResponse(
#             status_code=500,
#             content={
#                 "status": "error",
#                 "message": f"Failed to fetch data: {str(e)}"
#             }
#         )
    
# @app.get("/get_route_files/{mongo_id}", response_class=JSONResponse)
# async def get_route_files(mongo_id: str):
#     """
#     Get specific visualization files and route summary for a given route ID
#     Returns:
#         - URLs to access the HTML maps and CSV download
#     """
#     try:
#         # Get the route document from MongoDB
#         route_doc = collection.find_one({"_id": ObjectId(mongo_id)})
        
#         if not route_doc:
#             return JSONResponse(
#                 status_code=404,
#                 content={"status": "error", "message": "Route not found"}
#             )
        
#         # Prepare file data
#         files = {
#             "student_map": None,
#             "cluster_map": None,
#             "route_map": None,
#             "route_summary": None
#         }
        
#         # Get file IDs from the document
#         file_refs = route_doc.get("output_files", {})
        
#         # Create temporary access URLs (or base64 encoded content)
#         for file_type in files.keys():
#             if file_type in file_refs:
#                 file_id = file_refs[file_type]
#                 files[file_type] = f"/download_file/{file_id}"
        
#         return {
#             "status": "success",
#             "files": files,
#             "metadata": {
#                 "timestamp": route_doc["timestamp"],
#                 "parameters": route_doc.get("parameters", {}),
#                 "statistics": route_doc.get("statistics", {})
#             }
#         }
    
#     except Exception as e:
#         return JSONResponse(
#             status_code=500,
#             content={"status": "error", "message": str(e)}
#         )
# @app.get("/download_route_file/{mongo_id}/{file_type}", response_class=Response)
# async def download_route_file(mongo_id: str, file_type: str):
#     """
#     Download a specific file type for a route
#     Parameters:
#         - mongo_id: The route ID
#         - file_type: One of ['student_map', 'cluster_map', 'route_map', 'route_summary']
#     """
#     valid_types = ['student_map', 'cluster_map', 'route_map', 'route_summary']
    
#     if file_type not in valid_types:
#         return JSONResponse(
#             status_code=400,
#             content={"error": f"Invalid file type. Must be one of {valid_types}"}
#         )
    
#     try:
#         # Get the route document
#         route_doc = collection.find_one({"_id": ObjectId(mongo_id)})
        
#         if not route_doc:
#             return JSONResponse(
#                 status_code=404,
#                 content={"error": "Route not found"}
#             )
        
#         # Get the file ID
#         file_id = route_doc.get("output_files", {}).get(file_type)
#         if not file_id:
#             return JSONResponse(
#                 status_code=404,
#                 content={"error": f"{file_type} not found for this route"}
#             )
        
#         # Get file from GridFS
#         grid_out = fs.get(ObjectId(file_id))
        
#         # Determine content type and disposition
#         if file_type == 'route_summary':
#             content_type = "text/csv"
#             disposition = f"attachment; filename=bus_routes_summary_{mongo_id}.csv"
#         else:  # HTML maps
#             content_type = "text/html"
#             disposition = f"inline; filename={file_type}_{mongo_id}.html"
        
#         return Response(
#             content=grid_out.read(),
#             media_type=content_type,
#             headers={"Content-Disposition": disposition}
#         )
    
#     except Exception as e:
#         return JSONResponse(
#             status_code=500,
#             content={"error": str(e)}
#         )
# @app.get("/download_file/{file_id}")
# async def download_file(file_id: str):
#     """Endpoint to download a file from GridFS by its ID"""
#     try:
#         grid_out = fs.get(ObjectId(file_id))
#         file_content = grid_out.read()
        
#         # Determine content type based on file extension or stored metadata
#         filename = grid_out.filename
#         if filename.endswith('.html'):
#             media_type = "text/html"
#         elif filename.endswith('.csv'):
#             media_type = "text/csv"
#         else:
#             media_type = "application/octet-stream"
        
#         return Response(
#             content=file_content,
#             media_type=media_type,
#             headers={"Content-Disposition": f"attachment; filename={filename}"}
#         )
#     except Exception as e:
#         return JSONResponse(
#             status_code=404,
#             content={"message": f"File not found or error occurred: {str(e)}"}
#         )

# @app.get("/test_db_connection")
# async def test_db_connection():
#     try:
#         # Test a simple operation (e.g., inserting and fetching a test document)
#         test_doc = {
#             "test": "connection_check",
#             "timestamp": datetime.now()
#         }
        
#         # Insert the test document
#         result = collection.insert_one(test_doc)
#         inserted_id = str(result.inserted_id)
        
#         # Fetch the test document
#         fetched_doc = collection.find_one({"_id": ObjectId(inserted_id)})
        
#         if fetched_doc:
#             fetched_doc["_id"] = str(fetched_doc["_id"])  # Convert ObjectId to string
#             return {
#                 "status": "success",
#                 "message": "Successfully connected to MongoDB",
#                 "inserted_id": inserted_id,
#                 "fetched_doc": fetched_doc
#             }
#         else:
#             return {
#                 "status": "error",
#                 "message": "Could not fetch the test document from MongoDB"
#             }
#     except Exception as e:
#         return {
#             "status": "error",
#             "message": f"Failed to connect to MongoDB: {str(e)}"
#         }
    

# @app.get("/")
# def home():
#     return HTMLResponse("""
#     <h2>Smart School Routing API</h2>
#     <ul>
#         <li>POST <code>/cluster_and_route</code> (Upload CSV with student locations and get optimized routes)</li>
#         <li>GET <code>/download_file/{file_id}</code> (Download generated files by their ID)</li>
#     </ul>
#     """)

# @app.get("/routes")
# def get_routes():
#     """Endpoint to retrieve all saved routes from MongoDB"""
#     try:
#         routes = list(collection.find({}, {'_id': 0}))
#         return JSONResponse(content=routes)
#     except Exception as e:
#         return JSONResponse(
#             status_code=500,
#             content={"message": f"Error retrieving routes: {str(e)}"}
#         )

# @app.get("/routes/{route_id}")
# def get_route(route_id: str):
#     """Endpoint to retrieve a specific route by ID"""
#     try:
#         route = collection.find_one({"_id": ObjectId(route_id)}, {'_id': 0})
#         if route:
#             return route
#         return JSONResponse(
#             status_code=404,
#             content={"message": "Route not found"}
#         )
#     except Exception as e:
#         return JSONResponse(
#             status_code=500,
#             content={"message": f"Error retrieving route: {str(e)}"}
#         )