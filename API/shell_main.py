import base64
import os
import urllib.parse
from fastapi import FastAPI, HTTPException, UploadFile, File, Form,Query
from pydantic import BaseModel
from typing import Optional,List,Dict
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from datetime import date
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# MongoDB Atlas connection string
username = urllib.parse.quote_plus('sruthi')
password = urllib.parse.quote_plus('mongodb@')
mongo_uri = f"mongodb+srv://{username}:{password}@shellcluster.jcrasby.mongodb.net/?retryWrites=true&w=majority&appName=shellcluster"



# {Home----------------------------------------------------------------------------------------------------------------------------}
# Sample data models
class Vehicle(BaseModel):
   outofservice:str
   Available:str
   Active:str

class Driver(BaseModel):
    offduty:str
    active:str
    InService:str

class ServiceReminder(BaseModel):
    vehicle: str
    overdue: int
    due_soon: int

class Emissions(BaseModel):
    CO2: int
    NOx: int

class WorkOrder(BaseModel):
    id: str
    vehicle_name: str
    type: str
    size: str
    from_location: str
    to_location: str
    delivery_date: str

class LogEntry(BaseModel):
    id: int
    name: str
    comment: str
    timestamp: str

# Sample data (replace with real data retrieval logic)
vehicles_home = [
    Vehicle(outofservice="10",Available="25",Active="50"),
    # Add more vehicle entries
]

drivers = [
    Driver(offduty="15", active="30",InService="20"),

    # Add more driver entries
]

service_reminders = ServiceReminder(vehicle="Model A", overdue=5, due_soon=10)

emissions = Emissions(CO2=1000, NOx=200)

work_orders = [
    WorkOrder(id="WO12345", vehicle_name="Truck A", type="Wood", size="5T", from_location="Bangalore", to_location="Vizag", delivery_date="2024-06-05"),
    WorkOrder(id="WO12346", vehicle_name="Truck B", type="Sand", size="5T", from_location="Vizag", to_location="Bangalore", delivery_date="2024-06-20"),
    # Add more work orders
]

logs = [
    LogEntry(id=1, name="John Doe", comment="Great job on the recent project! The new update is fantastic. Looking forward to the next release.", timestamp="2 hours ago"),
    LogEntry(id=2, name="Jane Smith", comment="The new update is fantastic. Looking forward to the next release.", timestamp="1 day ago"),
    LogEntry(id=3, name="Alice Johnson", comment="Looking forward to the next release.", timestamp="3 days ago"),
    # Add more log entries
]

@app.get("/api/dashboard_data")
async def get_dashboard_data():
    # Sample implementation
    data = {
        "vehicles": [vehicles_home],
        "drivers": [driver.dict() for driver in drivers],
        "service_reminders": [service_reminders],
        "emissions": [emissions],
        "work_orders": [wo.dict() for wo in work_orders],
        "logs": [log.dict() for log in logs],
        "graphs": {
            "fuel_cost": {"data": [1000, 2000, 3000], "labels": ["Q1", "Q2", "Q3"]},
            "service_cost": {"data": [500, 1000, 1500], "labels": ["Q1", "Q2", "Q3"]},
            "emissions": {"data": [1000, 1200, 1100], "labels": ["Q1", "Q2", "Q3"]},
        }
    }
    return data


#{Fleet------------------------------------------------------------------------------------------------------------------------}

# Sample vehicle data
vehicle_data = [
    {"id": 1, "status": "Active", "vehicleNo": "Vehicle 1", "chassisNo": "12345", "capacity": "20 tons", "fuel": "Diesel", "lastMaintenanceDate": "2024-07-01", "RUL": "5000 km", "location": "vizag"},
    {"id": 2, "status": "Maintenance", "vehicleNo": "Vehicle 2", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 3, "status": "Available", "vehicleNo": "Vehicle 3", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 4, "status": "Active", "vehicleNo": "Vehicle 4", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 5, "status": "Maintenance", "vehicleNo": "Vehicle 5", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 6, "status": "Active", "vehicleNo": "Vehicle 6", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 7, "status": "Maintenance", "vehicleNo": "Vehicle 7", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 8, "status": "Available", "vehicleNo": "Vehicle 8", "chassisNo": "11223", "capacity": "10 tons", "fuel": "Diesel", "lastMaintenanceDate": "2024-07-10", "RUL": "7000 km", "location": "vizag"},
    {"id": 9, "status": "Active", "vehicleNo": "Vehicle 9", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
    {"id": 10, "status": "Maintenance", "vehicleNo": "Vehicle 10", "chassisNo": "67890", "capacity": "15 tons", "fuel": "Petrol", "lastMaintenanceDate": "2024-06-15", "RUL": "3000 km", "location": "vizag"},
]

@app.get("/vehicles")
def get_vehicles(type: str = Query("All", description="Filter vehicles by type")):
    # Mapping the type to actual statuses
    type_to_status = {
        "All": ["Active", "Maintenance", "Available"],
        "On Trip": ["Active"],
        "Under Maintenance": ["Maintenance"],
        "Un-Assigned": ["Available"]
    }
    
    # Get the list of statuses for the requested type
    statuses = type_to_status.get(type, ["Active", "Maintenance", "Available"])

    # Filter vehicles based on statuses
    filtered_vehicles = [vehicle for vehicle in vehicle_data if vehicle["status"] in statuses]
    
    return filtered_vehicles

#overview------------------------

class Product(BaseModel):
    name: str
    details: str
    history: Optional[str] = None

class CostOfOwnership(BaseModel):
    total_costs: str
    cost_per_meter: str

class Issue(BaseModel):
    id: int
    description: str
    reported_time: str
    reporter: str
    details: str

class ServiceReminder(BaseModel):
    message: str

class WorkOrder(BaseModel):
    message: str

class WhatIfAnalysis(BaseModel):
    current_vehicle: dict
    suggested_vehicle: dict
    cost_comparison: List[dict]

@app.get("/overview")
def get_overview():
    products = [
        {"name": "Name", "details": "SR5"},
        {"name": "Meter", "details": "95,284 mi"},
        {"name": "Status", "details": "Active", "history": "history"},
        {"name": "Group", "details": "Austin", "history": "history"},
        {"name": "Operator", "details": "Lex Waters"},
        {"name": "Type", "details": "SUV"}
    ]

    cost_of_ownership = CostOfOwnership(
        total_costs="$372.22",
        cost_per_meter="$0.90 /ml"
    )

    issues = [
        Issue(id=1, description="Flat tyre", reported_time="32 minutes ago", reporter="Bri P", details="Nail in the back left tyre. Slow leak"),
        Issue(id=2, description="Flat tyre", reported_time="32 minutes ago", reporter="Bri P", details="Nail in the back left tyre. Slow leak"),
        Issue(id=3, description="Flat tyre", reported_time="32 minutes ago", reporter="Bri P", details="Nail in the back left tyre. Slow leak")
    ]

    service_reminder = ServiceReminder(message="There is no Service Reminders due soon for this Vehicle")
    work_order = WorkOrder(message="There is no Work Orders active for this Vehicle")

    what_if_analysis = WhatIfAnalysis(
        current_vehicle={
            "name": "Truck Name",
            "image": "/img/truck4.webp",
            "RUL": "80000KM",
            "resale_value": "30000"
        },
        suggested_vehicle={
            "name": "EV",
            "image": "/img/lorry.jpg",
            "details": [
                "Reduced emissions by 60 percent.",
                "Reduced fuel cost by 20 percent.",
                "Reduced maintenance cost by 30 percent.",
                "Reduction in downtime by 10 percent."
            ]
        },
        cost_comparison=[
            {"description": "Initial Purchase Cost", "ev_truck": "$80,000", "ice_truck": "$70,000"},
            {"description": "5-year Energy/Fuel Cost", "ev_truck": "$24,000", "ice_truck": "$58,335"},
            {"description": "5-year Maintenance Cost", "ev_truck": "$5,000", "ice_truck": "$15,000"},
            {"description": "5-year Insurance Cost", "ev_truck": "$10,000", "ice_truck": "$12,500"},
            {"description": "Resale Value (after 5 years)", "ev_truck": "$30,000", "ice_truck": "$20,000"},
            {"description": "Net TCO (5 years)", "ev_truck": "$89,000", "ice_truck": "$135,835"}
        ]
    )

    return {
        "products": products,
        "cost_of_ownership": cost_of_ownership,
        "issues": issues,
        "service_reminder": service_reminder,
        "work_order": work_order,
        "what_if_analysis": what_if_analysis
    }

#service history-----------------


class ServiceTask(BaseModel):
    description: str

class ServiceRecord(BaseModel):
    work_order: str
    completed: str
    meter: str
    service_tasks: List[ServiceTask]
    issues: Optional[str] = None
    vendor: Optional[str] = None
    labels: str
    total: str
    watchers: str

@app.get("/service-history")
def get_service_history():
    service_history = [
        ServiceRecord(
            work_order="-",
            completed="05/16/2022",
            meter="95,284 mi",
            service_tasks=[
                ServiceTask(description="Tire Rotation"),
                ServiceTask(description="Engine Oil & Filter Replacement"),
                ServiceTask(description="Brake Inspection"),
                ServiceTask(description="Windshield Washer Fluid Level Inspect"),
                ServiceTask(description="Cabin Air Filter Replacement"),
                ServiceTask(description="Engine Air Filter Replacement")
            ],
            issues="-",
            vendor="-",
            labels="Preventative Maintenance",
            total="$280.90",
            watchers="2 watchers"
        )
    ]
    return service_history

#fuel history--------------------


class FuelRecord(BaseModel):
    date: str
    vendor: Optional[str] = None
    meter_entry: str
    usage: dict
    volume: dict
    total: dict
    fuel_economy: dict
    cost_per_meter: dict

@app.get("/fuel-history")
def get_fuel_history():
    fuel_history = [
        FuelRecord(
            date="Sun, May 15, 2024 08:20am",
            vendor="-",
            meter_entry="95,129 mi",
            usage={"value": 117.0, "unit": "miles"},
            volume={"value": 13.517, "unit": "gallons"},
            total={"amount": "$57.33", "per_unit": "$4.24/gallon"},
            fuel_economy={"value": 8.66, "unit": "MOG (US)"},
            cost_per_meter={"amount": "$0.49", "unit": "/mile"}
        ),
        FuelRecord(
            date="Mon, May 16, 2024 08:20am",
            vendor="-",
            meter_entry="95,129 mi",
            usage={"value": 117.0, "unit": "miles"},
            volume={"value": 13.517, "unit": "gallons"},
            total={"amount": "$57.33", "per_unit": "$4.24/gallon"},
            fuel_economy={"value": 8.66, "unit": "MOG (US)"},
            cost_per_meter={"amount": "$0.49", "unit": "/mile"}
        ),
        FuelRecord(
            date="Tue, May 17, 2024 08:20am",
            vendor="-",
            meter_entry="95,129 mi",
            usage={"value": 117.0, "unit": "miles"},
            volume={"value": 13.517, "unit": "gallons"},
            total={"amount": "$57.33", "per_unit": "$4.24/gallon"},
            fuel_economy={"value": 8.66, "unit": "MOG (US)"},
            cost_per_meter={"amount": "$0.49", "unit": "/mile"}
        )
    ]
    return fuel_history

#workorders----------------------

class WorkOrder(BaseModel):
    type: str
    size: str
    from_location: str
    to_location: str
    dimensions: Optional[str] = None
    temperature_control: Optional[str] = None
    delivery_date: str

@app.get("/work-orders")
def get_work_orders():
    work_orders = [
        WorkOrder(
            type="Wood",
            size="5T",
            from_location="Bangalore",
            to_location="Vizag",
            dimensions="-",
            temperature_control="-",
            delivery_date="05/06/2024"
        ),
        WorkOrder(
            type="Sand",
            size="5T",
            from_location="Vizag",
            to_location="Bangalore",
            dimensions="-",
            temperature_control="-",
            delivery_date="20/06/2024"
        )
    ]
    return work_orders

#Cost----------------------------

# Model for Fuel Cost Data
class FuelCost(BaseModel):
    tripId: int
    date: str
    speculativeCost: float
    actualCost: float
    savedCost: float
    distance: str

# Model for Service Data
class ServiceComponent(BaseModel):
    component: str
    cost: float

class Service(BaseModel):
    serviceId: int
    serviceDate: str
    components: List[ServiceComponent]
    totalMaintenanceTime: str
    totalServiceCost: float

@app.get("/cost")
def get_cost_data():
    fuel_costs = [
        FuelCost(tripId=10101, date="12-9-2022", speculativeCost=1200, actualCost=1000, savedCost=200, distance="30Km"),
        FuelCost(tripId=10102, date="12-9-2022", speculativeCost=1200, actualCost=1000, savedCost=200, distance="30Km"),
        FuelCost(tripId=10103, date="12-9-2022", speculativeCost=1200, actualCost=1000, savedCost=200, distance="30Km"),
        FuelCost(tripId=10104, date="12-9-2022", speculativeCost=1200, actualCost=1000, savedCost=200, distance="30Km"),
        FuelCost(tripId=10105, date="12-9-2022", speculativeCost=1200, actualCost=1000, savedCost=200, distance="30Km"),
        FuelCost(tripId=10106, date="12-9-2022", speculativeCost=1200, actualCost=1000, savedCost=200, distance="30Km")
    ]
    return fuel_costs

@app.get("/services")
def get_service_data():
    services = [
        Service(
            serviceId=1,
            serviceDate="19-10-2021",
            components=[
                ServiceComponent(component="Oil and Filter Changes", cost=2934),
                ServiceComponent(component="Tire Maintenance", cost=10982)
            ],
            totalMaintenanceTime="1day 3hr 20mins",
            totalServiceCost=13872
        ),
        Service(
            serviceId=2,
            serviceDate="19-10-2021",
            components=[
                ServiceComponent(component="Oil and Filter Changes", cost=2934),
                ServiceComponent(component="Tire Maintenance", cost=10982)
            ],
            totalMaintenanceTime="1day 3hr 20mins",
            totalServiceCost=13872
        ),
        Service(
            serviceId=3,
            serviceDate="19-10-2021",
            components=[
                ServiceComponent(component="Oil and Filter Changes", cost=2934),
                ServiceComponent(component="Tire Maintenance", cost=10982)
            ],
            totalMaintenanceTime="1day 3hr 20mins",
            totalServiceCost=13872
        )
    ]
    return services

#Emission------------------------

# Model for Emission Data
class Emission(BaseModel):
    trip: str
    fuel: str
    co2: str
    nox: str
    pm: str
    co: str
    hc: str
    so: str

@app.get("/emissions")
def get_emission_data():
    emissions = [
        Emission(
            trip='10101',
            fuel='100',
            co2="2,310",
            nox="0.2",
            pm='0.2',
            co='2.3',
            hc='0.05',
            so='0.003'
        ),
        Emission(
            trip='10102',
            fuel='208',
            co2="2,310",
            nox="0.2",
            pm='0.2',
            co='2.3',
            hc='0.05',
            so='0.003'
        ),
        Emission(
            trip='10103',
            fuel='170',
            co2="2,310",
            nox="0.2",
            pm='0.2',
            co='2.3',
            hc='0.05',
            so='0.003'
        )
    ]
    return emissions

#{Assigned------------------------------------------------------------------------------------------------------------------------}

# Define data models
class FleetOption(BaseModel):
    id: int
    name: str
    description: str
    image_url: str
    

class Driver(BaseModel):
    driver_id: str
    name: str
    rating: float
    

# Sample data
fleet_options = [
    FleetOption(
        id=1,
        name="EcoTruck X1",
        description="Lowest carbon emission",
        image_url="path/to/eco_truck_x1_image.jpg",
        
    ),
    FleetOption(
        id=2,
        name="EconomyTruck Y2",
        description="Lowest cost with moderate emissions",
        image_url="path/to/economy_truck_y2_image.jpg",
       
    ),
    FleetOption(
        id=3,
        name="SpeedTruck Z3",
        description="Lowest time with higher emissions",
        image_url="path/to/speed_truck_z3_image.jpg",
        
    )
]

assigned_drivers = [
    Driver(driver_id="D123456", name="Roman Reigns", rating=5.0),
    Driver(driver_id="D233456", name="Logan Paul", rating=4.0),
    Driver(driver_id="D123321", name="John Cena", rating=3)
]

# Endpoints
@app.get("/fleet-options", response_model=List[FleetOption])
async def get_fleet_options():
    return fleet_options

@app.get("/assigned-drivers", response_model=List[Driver])
async def get_assigned_drivers():
    return assigned_drivers


#{reports-----------------------------------------------------------------------------------------------------------------}
#vehicle-----


# Define the response model
class Vehicle(BaseModel):
    image: str
    vehicleId: str
    totalTrips: str
    resaleValue: str
    lastMaintenance: str
    emissions: str
    mileage: str

# Sample data
vehicles = [
    {
        "image": "/img/truck4.webp",
        "vehicleId": "10108",
        "totalTrips": "8",
        "resaleValue": "20,000",
        "lastMaintenance": "2024-05-22",
        "emissions": "100",
        "mileage": "102",
    },
    {
        "image": "/img/truck4.webp",
        "vehicleId": "10108",
        "totalTrips": "8",
        "resaleValue": "20,000",
        "lastMaintenance": "2024-05-22",
        "emissions": "100",
        "mileage": "102",
    },
    {
        "image": "/img/truck4.webp",
        "vehicleId": "10108",
        "totalTrips": "8",
        "resaleValue": "20,000",
        "lastMaintenance": "2024-05-22",
        "emissions": "100",
        "mileage": "102",
    },
]

@app.get("/vehicle_report", response_model=List[Vehicle])
def get_vehicles():
    return vehicles

#cost & service--------

# Data model for cost records
class CostRecord(BaseModel):
    tripId: str
    date: date
    speculativeCost: float
    actualCost: float
    savedCost: float
    distance: float

# Data model for service records
class ServiceRecord(BaseModel):
    serviceName: str
    date: date
    components: List[dict]
    totalMaintenanceTime: str
    totalServiceCost: float

# Sample data
cost_records = [
    {
        "tripId": "T001",
        "date": "2024-01-01",
        "speculativeCost": 150.0,
        "actualCost": 120.0,
        "savedCost": 30.0,
        "distance": 100.0
    },
    # Add more cost records as needed
]

service_records = [
    {
        "serviceName": "Service 1",
        "date": "2024-01-10",
        "components": [
            {"component": "Oil and Filter Changes", "cost": 2934},
            {"component": "Tire Maintenance", "cost": 10982}
        ],
        "totalMaintenanceTime": "1 day 3 hr 20 mins",
        "totalServiceCost": 8000
    },
     {
        "serviceName": "Service 2",
        "date": "2024-01-10",
        "components": [
            {"component": "Oil and Filter Changes", "cost": 29},
            {"component": "Tire Maintenance", "cost": 10982}
        ],
        "totalMaintenanceTime": "1 day 3 hr 20 mins",
        "totalServiceCost": 10000
    },
    {
        "serviceName": "Service 3",
        "date": "2024-01-10",
        "components": [
            {"component": "Oil and Filter Changes", "cost": 29},
            {"component": "Tire Maintenance", "cost": 10982}
        ],
        "totalMaintenanceTime": "1 day 3 hr 20 mins",
        "totalServiceCost": 9000
    },
    # Add more service records as needed
]

@app.get("/api/costs", response_model=List[CostRecord])
def get_cost_records(start_date: Optional[date] = None, end_date: Optional[date] = None):
    # Filter records based on the date range if provided
    filtered_records = cost_records
    if start_date and end_date:
        filtered_records = [record for record in cost_records if start_date <= date.fromisoformat(record["date"]) <= end_date]
    return filtered_records

@app.get("/api/services", response_model=List[ServiceRecord])
def get_service_records(start_date: Optional[date] = None, end_date: Optional[date] = None):
    # Filter records based on the date range if provided
    filtered_records = service_records
    if start_date and end_date:
        filtered_records = [record for record in service_records if start_date <= date.fromisoformat(record["date"]) <= end_date]
    return filtered_records

#emissions-----

# Data model for emission records
class EmissionRecord(BaseModel):
    trip: str
    fuel: float
    co2: float
    nox: float
    pm: float
    co: float
    hc: float
    so: float

# Sample data
emission_records = [
    {
        "trip": "T001",
        "fuel": 50.0,
        "co2": 120.0,
        "nox": 10.0,
        "pm": 5.0,
        "co": 8.0,
        "hc": 6.0,
        "so": 2.0
    },
    # Add more records as needed
]

@app.get("/api/emissions", response_model=List[EmissionRecord])
def get_emission_records(start_date: date = None, end_date: date = None):
    # Filter records based on the date range if provided
    filtered_records = emission_records
    if start_date and end_date:
        # Implement date filtering logic here
        pass  # Replace with actual filtering logic if date range is used
    return filtered_records


#{Trips----------------------------------------------------------------------------------------------------------------------------}

class OperatingCost(BaseModel):
    fuel: str
    maintenance: str
    drivercost: str
    toll: str
    total: str

class DriverBehavior(BaseModel):
    driverid: str
    name: str
    speed: str
    harshBraking: str
    idling: str

class Freight(BaseModel):
    id: str
    status: str
    load: str
    goodsType: str
    dimensions: str

class Log(BaseModel):
    id: str
    issue: str
    description: str

class TripDetails(BaseModel):
    vehicleId: str
    chassisId: str
    modelId: str
    manufacturer: str
    locationName: str
    fuel: str
    operatingCost: OperatingCost
    driverBehavior: DriverBehavior
    freight: List[Freight]
    log: List[Log]
    # location: str

    date: str
    driverId: str
    kmsTraveled: str
    time: str
    tripId: str

@app.get("/trip-details", response_model=TripDetails)
async def get_trip_details():
    trip_details = {
        "vehicleId": "V001",
        "chassisId": "C001",
        "modelId": "M001",
        "manufacturer": "Manufacturer A",
        "locationName": "Trip Location A",
        "fuel": "petrol",
        "operatingCost": {
            "fuel": "500",
            "maintenance": "200",
            "drivercost": "500",
            "toll": "100",
            "total": "700"
        },
        "driverBehavior": {
            "driverid": "D634",
            "name": "Jeff",
            "speed": "60",
            "harshBraking": "2",
            "idling": "10"
        },
        "freight": [
            {
                "id": "F001",
                "status": "Delivered",
                "load": "10 tons",
                "goodsType": "Electronics",
                "dimensions": "2x2x2m"
            }
        ],
        "log": [
            {
                "id": "L001",
                "issue": "Engine Overheating",
                "description": "Engine temperature exceeded normal levels due to a coolant leak."
            },
            {
                "id": "L002",
                "issue": "Flat Tire",
                "description": "A tire lost air pressure, requiring immediate replacement."
            },
            {
                "id": "L003",
                "issue": "Brake Failure",
                "description": "Braking system had issues with worn-out brake pads."
            },
            {
                "id": "L004",
                "issue": "Battery Issues",
                "description": "The battery was dead, causing starting problems."
            },
            {
                "id": "L005",
                "issue": "Transmission Problems",
                "description": "Transmission experienced slipping gears."
            }
        ],
        # "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119064.9002775156!2d78.99010926876952!3d21.161225995055403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721724856740!5m2!1sen!2sin",
        "date": "20-04-2022",
        "driverId": "D001",
        "kmsTraveled": "150",
        "time": "3 hours",
        "tripId": "543"
    }
    return trip_details

#{Drivers--------------------------------------------------------------------------------------------------------------------}
# Define the driver profile model

class DriverProfile(BaseModel):
    image: str
    name: str
    driverId: str
    trips: str
    emissionsSaved: str
    rating: float
    experience: str

# Dummy data
driver_profiles = [
    { "image": "driver1.png", "name": "John Doe", "driverId": "driver1", "trips": "50", "emissionsSaved": "100", "rating": 4.5, "experience": "5 years" },
    { "image": "driver2.png", "name": "Jane Smith", "driverId": "driver2", "trips": "30", "emissionsSaved": "75", "rating": 5.0, "experience": "3 years" },
    { "image": "driver3.png", "name": "Mike Johnson", "driverId": "driver3", "trips": "20", "emissionsSaved": "50", "rating": 3.2, "experience": "2 years" },
    { "image": "driver4.png", "name": "Emily Davis", "driverId": "driver4", "trips": "10", "emissionsSaved": "25", "rating": 4.8, "experience": "4 years" }
    # Add more dummy data as needed
]







@app.get("/drivers", response_model=List[DriverProfile])
async def get_drivers():
    return driver_profiles
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
