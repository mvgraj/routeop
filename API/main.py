import base64
import os
import urllib.parse
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# MongoDB Atlas connection string
username = urllib.parse.quote_plus('sruthi')
password = urllib.parse.quote_plus('mongodb@')
mongo_uri = f"mongodb+srv://{username}:{password}@shellcluster.jcrasby.mongodb.net/?retryWrites=true&w=majority&appName=shellcluster"
client = MongoClient(mongo_uri)
db = client.test # Replace 'test_db' with your actual database name

UPLOAD_FOLDER = "uploads"  # Ensure this folder exists or create it
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create folder if it doesn't exist

cost_profiles_df = pd.read_csv(r'datasets\cost_profiles.csv')
fuels_df = pd.read_csv(r'datasets\fuels.csv')
vehicles_df = pd.read_csv(r'datasets\vehicles.csv')
vehicles_fuels_df = pd.read_csv(r'datasets\vehicles_fuels.csv')
carbon_emissions_df = pd.read_csv(r'datasets\carbon_emissions.csv')



class Vehicle(BaseModel):
    model: str
    vehicleNo: str
    chassisNo: str
    manufacturer: str
    odometer: int
    location: str
    capacity: str
    fuel: str
    img: Optional[str] = None

class FreightData(BaseModel):
    type: str
    freight_req: str
    size: str
    from_location: str
    to_location: str
    dimensions: str
    refrigeration: Optional[str] = None
    delivery_date: str
    pickup_date: str
    freight_img: Optional[str] = None

class DriverData(BaseModel):
    name: str 
    date_of_birth: str 
    pan_id: str 
    aadhar_number: str 
    phone_number: str
    photo: Optional[str] = None
    driving_license: Optional[str] = None

@app.post("/vehicles")
async def add_vehicles(
    model: str = Form(...),
    vehicleNo: str = Form(...),
    chassisNo: str = Form(...),
    manufacturer: str = Form(...),
    odometer: int = Form(...),
    location: str = Form(...),
    capacity: str = Form(...),
    fuel: str = Form(...),
    images: UploadFile = File(None)
):
    try:
        vehicle_image_db = None

        if images:
            image_data = await images.read()
            vehicle_image_db = base64.b64encode(image_data).decode('utf-8')

            file_location = os.path.join(UPLOAD_FOLDER, images.filename)
            with open(file_location, "wb+") as file_object:
                file_object.write(image_data)

        vehicle_data = Vehicle(
            model=model,
            vehicleNo=vehicleNo,
            chassisNo=chassisNo,
            manufacturer=manufacturer,
            odometer=odometer,
            location=location,
            capacity=capacity,
            fuel=fuel,
            img=vehicle_image_db,
        )

        vehicles_collection = db.vehicles
        result = vehicles_collection.insert_one(vehicle_data.dict())
        
        return {
            "vehicle_data": vehicle_data.dict(),
            "mongodb_id": str(result.inserted_id)
        }
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print the stack trace
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")




@app.post("/api/assign_freight")
async def assign_freight(
    type: str = Form(...),
    freight_req: str = Form(...),
    size: str = Form(...),
    from_location: str = Form(...),
    to_location: str = Form(...),
    dimensions: str = Form(...),
    refrigeration: Optional[str] = Form(None),
    delivery_date: str = Form(...),
    pickup_date: str = Form(...),
    freight_img: UploadFile = File(None)  # Accept base64 string
):
    try:
        assign_image_db = None
        file_location = None

        if freight_img:
            # Decode base64 string
            image_data = await freight_img.read()
            assign_image_db = base64.b64encode(image_data).decode('utf-8')

            # Save the image to a file
            file_location = os.path.join(UPLOAD_FOLDER, "uploaded_image.png")
            with open(file_location, "wb+") as file_object:
                file_object.write(image_data)

        # Construct freight data
        freight_item = FreightData(
            type=type,
            freight_req=freight_req,
            size=size,
            from_location=from_location,
            to_location=to_location,
            dimensions=dimensions,
            refrigeration=refrigeration,
            delivery_date=delivery_date,
            pickup_date=pickup_date,
            freight_img=assign_image_db
        )
            

        # Insert data into MongoDB (example using pymongo)
        
        collection = db.assign_freight 
        result = collection.insert_one(freight_item.dict())

        return {
            "freight_data": freight_item,
            "base64_image": assign_image_db,
            "file_location": file_location,
            # "mongodb_id": str(result.inserted_id)
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


    
@app.post("/api/drivers")
async def add_driver(
    name: str = Form(...),
    date_of_birth: str = Form(...),
    pan_id: str = Form(...),
    aadhar_number: str = Form(...),
    phone_number: str = Form(...),
    photo: UploadFile = File(...),
    driving_license:UploadFile = File(...),
    Experience:str = Form(...)
):
    try:
        # Initialize variables to hold base64-encoded data
        photo_base64 = None
        driving_license_base64 = None

        # Save and convert photo if provided
        if photo:
            photo_data = await photo.read()
            photo_base64 = base64.b64encode(photo_data).decode('utf-8')
            photo_path = os.path.join(UPLOAD_FOLDER, photo.filename)
            with open(photo_path, "wb") as f:
                f.write(photo_data)

        # Save and convert driving license if provided
        if driving_license:
            license_data = await driving_license.read()
            driving_license_base64 = base64.b64encode(license_data).decode('utf-8')
            license_path = os.path.join(UPLOAD_FOLDER, driving_license.filename)
            with open(license_path, "wb") as f:
                f.write(license_data)

        driver_data = DriverData(
            name=name,
            date_of_birth=date_of_birth,
            pan_id=pan_id,
            aadhar_number=aadhar_number,
            phone_number=phone_number,
            photo=photo_base64,
            driving_license=driving_license_base64,
            Experience=Experience
        )

        # Insert data into MongoDB
        drivers_collection = db.drivers
        result = drivers_collection.insert_one(driver_data.dict())
        
        return JSONResponse(content={
            "message": "Driver added successfully",
            "photo_base64": photo_base64,
            "driving_license_base64": driving_license_base64,
            "mongodb_id": str(result.inserted_id)  # MongoDB document ID
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Define other endpoints and models here (e.g., for /dashboard_data, /vehicles, /fleet-options, etc.)


# Hardcoded values for distance and year
HARD_CODED_DISTANCE = 500  # in km
HARD_CODED_YEAR = 2023

@app.post("/api/recommend_top_vehicles")
async def recommend_top_vehicles(
    type: str = Form(...),
    size: str = Form(...),
    freight_req: str = Form(...),
    from_location: str = Form(...),
    to_location: str = Form(...),
    dimensions: str = Form(...),
    refrigeration: Optional[str] = Form(None),
    pickup_date: str = Form(...),
    delivery_date: str = Form(...),
    # payload: float = Form(...)  # in tons (now not used)

):
    
    try:
        # Use hardcoded year and distance
        year = HARD_CODED_YEAR
        distance = HARD_CODED_DISTANCE
        payload = size
        # Get carbon emission limit for the year
        carbon_limit = carbon_emissions_df[carbon_emissions_df['Year'] == year]['Carbon emission CO2/kg'].values[0]

        # Convert size to payload in tons
        # Assuming 'size' format is something like '2T' or '5T'
        payload = float(size[:-1])  # Remove the last character (assumed 'T') and convert to float

        # Filter vehicles that can handle the payload and are available in the specified year or earlier
        suitable_vehicles = vehicles_df[vehicles_df['Size'].apply(lambda x: float(x[1:]) >= payload)]
        available_vehicles = suitable_vehicles[suitable_vehicles['Year'] <= year]

        if available_vehicles.empty:
            raise ValueError("No suitable vehicle found for the given payload and year")

        # Calculate efficiency score for each suitable vehicle
        efficiency_scores = []
        for _, vehicle in available_vehicles.iterrows():
            vehicle_id = vehicle['ID']
            vehicle_range = vehicle['Yearly range (km)']
            vehicle_cost = vehicle['Cost ($)']
            vehicle_age = year - vehicle['Year']

            # Get fuel consumption for this vehicle
            fuel_consumption = vehicles_fuels_df[vehicles_fuels_df['ID'] == vehicle_id]['Consumption (unit_fuel/km)'].values[0]

            # Get fuel type, cost, and emissions for this vehicle
            fuel_type = vehicles_fuels_df[vehicles_fuels_df['ID'] == vehicle_id]['Fuel'].values[0]
            fuel_info = fuels_df[(fuels_df['Fuel'] == fuel_type) & (fuels_df['Year'] == year)].iloc[0]
            fuel_cost = fuel_info['Cost ($/unit_fuel)']
            fuel_emissions = fuel_info['Emissions (CO2/unit_fuel)']

            # Calculate total fuel cost and emissions for the trip
            total_fuel_cost = fuel_consumption * distance * fuel_cost
            total_emissions = fuel_consumption * distance * fuel_emissions

            # Calculate depreciation cost for this trip
            cost_percentages = get_cost_percentages(vehicle_age)
            resale_value = vehicle_cost * cost_percentages['resale_value']
            depreciation_cost = ((vehicle_cost - resale_value) / (365 * vehicle_range)) * distance

            # Calculate insurance and maintenance costs for this trip
            insurance_cost = vehicle_cost * cost_percentages['insurance'] * (distance / vehicle_range)
            maintenance_cost = vehicle_cost * cost_percentages['maintenance'] * (distance / vehicle_range)

            # Calculate total cost for the trip
            total_cost = total_fuel_cost + depreciation_cost + insurance_cost + maintenance_cost

            # Calculate efficiency score (lower is better)
            efficiency_score = total_cost / (payload * distance)

            # Check if emissions are within the limit
            if total_emissions <= carbon_limit:
                efficiency_scores.append({
                    'vehicle_id': vehicle_id,
                    'efficiency_score': efficiency_score,
                    'total_cost': total_cost,
                    'total_emissions': total_emissions,
                    'vehicle_cost': vehicle_cost
                })

        # Sort vehicles by efficiency score and select the top 3
        efficiency_scores.sort(key=lambda x: x['efficiency_score'])
        top_vehicles = efficiency_scores[:3]

        return {
            "top_vehicles": top_vehicles
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

def get_cost_percentages(year):
    """Returns the appropriate percentages based on vehicle age."""
    resale_values = dict(zip(cost_profiles_df['End of Year'], cost_profiles_df['Resale Value %'] / 100))
    insurance_costs = dict(zip(cost_profiles_df['End of Year'], cost_profiles_df['Insurance Cost %'] / 100))
    maintenance_costs = dict(zip(cost_profiles_df['End of Year'], cost_profiles_df['Maintenance Cost %'] / 100))
    
    return {
        'resale_value': resale_values.get(min(year, max(resale_values.keys())), 0),
        'insurance': insurance_costs.get(min(year, max(insurance_costs.keys())), 0),
        'maintenance': maintenance_costs.get(min(year, max(maintenance_costs.keys())), 0),
    }

# @app.post("/api/recommend_top_vehicles")
# async def recommend_top_vehicles(
#     type: str = Form(...),
#     size: str = Form(...),
#     freight_req: str = Form(...),
#     from_location: str = Form(...),
#     to_location: str = Form(...),
#     dimensions: str = Form(...),
#     refrigeration: Optional[str] = Form(None),
#     pickup_date:str = Form(...),
#     delivery_date:str=Form(...),
#     payload: float = Form(...),  # in tons
#     distance: float = Form(...),  # in km
#     year: int = Form(...),
# ):
#     try:
#         # Get carbon emission limit for the year
#         carbon_limit = carbon_emissions_df[carbon_emissions_df['Year'] == year]['Carbon emission CO2/kg'].values[0]

#         # Filter vehicles that can handle the payload and are available in the specified year or earlier
#         suitable_vehicles = vehicles_df[vehicles_df['Size'].apply(lambda x: float(x[1:]) >= payload)]
#         available_vehicles = suitable_vehicles[suitable_vehicles['Year'] <= year]

#         if available_vehicles.empty:
#             raise ValueError("No suitable vehicle found for the given payload and year")

#         # Calculate efficiency score for each suitable vehicle
#         efficiency_scores = []
#         for _, vehicle in available_vehicles.iterrows():
#             vehicle_id = vehicle['ID']
#             vehicle_range = vehicle['Yearly range (km)']
#             vehicle_cost = vehicle['Cost ($)']
#             vehicle_age = year - vehicle['Year']

#             # Get fuel consumption for this vehicle
#             fuel_consumption = vehicles_fuels_df[vehicles_fuels_df['ID'] == vehicle_id]['Consumption (unit_fuel/km)'].values[0]

#             # Get fuel type, cost, and emissions for this vehicle
#             fuel_type = vehicles_fuels_df[vehicles_fuels_df['ID'] == vehicle_id]['Fuel'].values[0]
#             fuel_info = fuels_df[(fuels_df['Fuel'] == fuel_type) & (fuels_df['Year'] == year)].iloc[0]
#             fuel_cost = fuel_info['Cost ($/unit_fuel)']
#             fuel_emissions = fuel_info['Emissions (CO2/unit_fuel)']

#             # Calculate total fuel cost and emissions for the trip
#             total_fuel_cost = fuel_consumption * distance * fuel_cost
#             total_emissions = fuel_consumption * distance * fuel_emissions

#             # Calculate depreciation cost for this trip
#             cost_percentages = get_cost_percentages(vehicle_age)
#             resale_value = vehicle_cost * cost_percentages['resale_value']
#             depreciation_cost = ((vehicle_cost - resale_value) / (365 * vehicle_range)) * distance

#             # Calculate insurance and maintenance costs for this trip
#             insurance_cost = vehicle_cost * cost_percentages['insurance'] * (distance / vehicle_range)
#             maintenance_cost = vehicle_cost * cost_percentages['maintenance'] * (distance / vehicle_range)

#             # Calculate total cost for the trip
#             total_cost = total_fuel_cost + depreciation_cost + insurance_cost + maintenance_cost

#             # Calculate efficiency score (lower is better)
#             efficiency_score = total_cost / (payload * distance)

#             # Check if emissions are within the limit
#             if total_emissions <= carbon_limit:
#                 efficiency_scores.append({
#                     'vehicle_id': vehicle_id,
#                     'efficiency_score': efficiency_score,
#                     'total_cost': total_cost,
#                     'total_emissions': total_emissions,
#                     'vehicle_cost': vehicle_cost
#                 })

#         # Sort vehicles by efficiency score and select the top 3
#         efficiency_scores.sort(key=lambda x: x['efficiency_score'])
#         top_vehicles = efficiency_scores[:3]

#         return {
#             "top_vehicles": top_vehicles
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# def get_cost_percentages(year):
#     """Returns the appropriate percentages based on vehicle age."""
#     resale_values = dict(zip(cost_profiles_df['End of Year'], cost_profiles_df['Resale Value %'] / 100))
#     insurance_costs = dict(zip(cost_profiles_df['End of Year'], cost_profiles_df['Insurance Cost %'] / 100))
#     maintenance_costs = dict(zip(cost_profiles_df['End of Year'], cost_profiles_df['Maintenance Cost %'] / 100))
    
#     return {
#         'resale_value': resale_values.get(min(year, max(resale_values.keys())), 0),
#         'insurance': insurance_costs.get(min(year, max(insurance_costs.keys())), 0),
#         'maintenance': maintenance_costs.get(min(year, max(maintenance_costs.keys())), 0),
#     }




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
