import React, { useState } from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { TruckIcon, UserIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import LorryImage from './img/lorry.jpg'

// Dummy data for trips
const tripDetails = [
    {
      vehicleId: "V001",
      chassisId: "C001",
      modelId: "M001",
      manufacturer: "Manufacturer A",
      fuel:"petrol",
      operatingCost: {
        fuel: "500",
        maintenance: "200",
        drivercost:"500",
        toll:"100",
        total: "700"
      },
      driverBehavior: {
        driverid:"D634",
        name:"Jeff",
        speed: "60",
        harshBraking: "2",
        idling: "10"
      },
      freight: [
        {
          id: "F001",
          status: "Delivered",
          load: "10 tons",
          goodsType: "Electronics",
          dimensions: "2x2x2m"
        }
      ],
      log: [
        {
          id: "L001",
          issue: "Engine Overheating",
          description: "Engine temperature exceeded normal levels due to a coolant leak."
        },
        {
          id: "L002",
          issue: "Flat Tire",
          description: "A tire lost air pressure, requiring immediate replacement."
        },
        {
          id: "L003",
          issue: "Brake Failure",
          description: "Braking system had issues with worn-out brake pads."
        },
        {
          id: "L004",
          issue: "Battery Issues",
          description: "The battery was dead, causing starting problems."
        },
        {
          id: "L005",
          issue: "Transmission Problems",
          description: "Transmission experienced slipping gears."
        },
        {
          id: "L005",
          issue: "Transmission Problems",
          description: "Transmission experienced slipping gears."
        },
 
      ],
      location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119064.9002775156!2d78.99010926876952!3d21.161225995055403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721724856740!5m2!1sen!2sin",
      locationName: "Nagpur",
      date: "20-04-2022",
      driverId: "DRV-20240203-102",
      kmsTraveled: "150",
      time: "3 hours",
       tripId:"TRIP20240808-001"
    },
    {
      vehicleId: "V002",
      chassisId: "C002",
      modelId: "M002",
      manufacturer: "Manufacturer B",
      fuel:"diesel",
      operatingCost: {
        fuel: "450",
        maintenance: "180",
        drivercost:"500",
        toll:"100",
        total: "630"
      },
      driverBehavior: {
        driverid:"D204",
        name:"John",
        speed: "65",
        harshBraking: "1",
        idling: "8"
      },
      freight: [
        {
          id: "F002",
          status: "In Transit",
          load: "12 tons",
          goodsType: "Textiles",
          dimensions: "4x3x3m"
        }
      ],
      log: [
        {
          id: "L006",
          issue: "Suspension Failure",
          description: "Worn-out shock absorbers led to poor handling."
        },
        {
          id: "L007",
          issue: "Fuel System Problems",
          description: "Clogged fuel filter affecting engine performance."
        },
        {
          id: "L008",
          issue: "Electrical System Failures",
          description: "Malfunctioning lights and sensors due to electrical issues."
        },
        {
          id: "L009",
          issue: "Cooling System Leaks",
          description: "Cracked radiator caused engine overheating."
        },
        {
          id: "L010",
          issue: "Power Steering Failure",
          description: "Fluid leak in power steering made steering difficult."
        }
      ],
      location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59491.8339050824!2d81.57787371713226!3d21.26198053410905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee1204ff9e240!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1721726202977!5m2!1sen!2sin",
      locationName: "Raipur",
      date: "20-04-2022",
      driverId: "DRV-20240303-104",
      kmsTraveled: "120",
      time: "2 hours 30 minutes",
       tripId:"TRIP20240808-002"
    },
    {
      vehicleId: "V003",
      chassisId: "C003",
      modelId: "M003",
      manufacturer: "Manufacturer C",
      fuel:"petrol",
      operatingCost: {
        fuel: "700",
        maintenance: "300",
        drivercost:"500",
        toll:"100",
        total: "1000"
      },
      driverBehavior: {
        driverid:"D236",
        name:"Ben",
        speed: "80",
        harshBraking: "4",
        idling: "15"
      },
      freight: [
        {
          id: "F003",
          status: "Pending",
          load: "10 tons",
          goodsType: "Machinery",
          dimensions: "5x3x3m"
        }
      ],
      log: [
        {
          id: "L011",
          issue: "Engine Overheating",
          description: "Engine temperature exceeded normal levels due to a coolant leak."
        },
        {
          id: "L012",
          issue: "Flat Tire",
          description: "A tire lost air pressure, requiring immediate replacement."
        },
        {
          id: "L013",
          issue: "Brake Failure",
          description: "Braking system had issues with worn-out brake pads."
        },
        {
          id: "L014",
          issue: "Battery Issues",
          description: "The battery was dead, causing starting problems."
        },
        {
          id: "L015",
          issue: "Transmission Problems",
          description: "Transmission experienced slipping gears."
        }
        
      ],
      location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113874.30006231663!2d75.7081570970491!3d26.88533996481472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1721726064550!5m2!1sen!2sin",
      locationName: "Jaipur",
      date: "20-04-2022",
      driverId: "DRV-20240703-106",
      kmsTraveled: "300",
      time: "5 hours",
       tripId:"TRIP20240808-003"
    },
    {
      vehicleId: "V004",
      chassisId: "C004",
      modelId: "M004",
      manufacturer: "Manufacturer D",
      fuel:"petrol",
      operatingCost: {
        fuel: "550",
        maintenance: "220",
        drivercost:"500",
        toll:"100",
        total: "770"
      },
      driverBehavior: {
        driverid:"D234",
        name:"Bond",
        speed: "75",
        harshBraking: "2",
        idling: "10"
      },
      freight: [
        {
          id: "F004",
          status: "Delivered",
          load: "6 tons",
          goodsType: "Electronics",
          dimensions: "2x2x2m"
        }
      ],
      log: [
        {
          id: "P001",
          issue: "Engine Overheating",
          description: "Engine temperature exceeded normal levels due to a coolant leak."
        },
        {
          id: "P002",
          issue: "Flat Tire",
          description: "A tire lost air pressure, requiring immediate replacement."
        },
        {
          id: "P003",
          issue: "Brake Failure",
          description: "Braking system had issues with worn-out brake pads."
        },
        {
          id: "P004",
          issue: "Battery Issues",
          description: "The battery was dead, causing starting problems."
        },
        {
          id: "P005",
          issue: "Transmission Problems",
          description: "Transmission experienced slipping gears."
        }
      ],
      location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.9051038798!2d78.243236602612!3d17.412608636450027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1721726269423!5m2!1sen!2sin",
      locationName: "Hyderabad",
      date: "20-04-2022",
      driverId: "DRV-20240503-107",
      kmsTraveled: "180",
      time: "3 hours 15 minutes",
       tripId:"TRIP20240803-004"
    
    },
    {
      "vehicleId": "V005",
      "chassisId": "C005",
      "modelId": "M005",
      "manufacturer": "Manufacturer E",
      "fuel": "diesel",
      "operatingCost": {
        "fuel": "600",
        "maintenance": "250",
        "drivercost": "550",
        "toll": "120",
        "total": "1020"
      },
      "driverBehavior": {
        "driverid": "D235",
        "name": "Smith",
        "speed": "70",
        "harshBraking": "1",
        "idling": "15"
      },
      "freight": [
        {
          "id": "F005",
          "status": "In Transit",
          "load": "8 tons",
          "goodsType": "Furniture",
          "dimensions": "3x3x2m"
        }
      ],
      "log": [
        {
          "id": "P006",
          "issue": "Oil Leak",
          "description": "Oil leak detected from the engine, affecting performance."
        },
        {
          "id": "P007",
          "issue": "Suspension Problems",
          "description": "Suspension system issues causing rough ride quality."
        }
      ],
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242379.08541423985!2d77.01988001470878!3d28.535517375272007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1cf68e7d3b57%3A0x3a15b8f7036bff6a!2sDelhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1721726269424!5m2!1sen!2sin",
      "locationName": "New Delhi",
      "date": "21-04-2022",
      "driverId": "DRV-20240803-109",
      "kmsTraveled": "220",
      "time": "4 hours 10 minutes",
      "tripId": "TRIP20240804-005"
    },{
      "vehicleId": "V006",
      "chassisId": "C006",
      "modelId": "M006",
      "manufacturer": "Manufacturer F",
      "fuel": "electric",
      "operatingCost": {
        "fuel": "300",
        "maintenance": "150",
        "drivercost": "400",
        "toll": "80",
        "total": "930"
      },
      "driverBehavior": {
        "driverid": "DRV-20240203-112",
        "name": "Jones",
        "speed": "65",
        "harshBraking": "0",
        "idling": "5"
      },
      "freight": [
        {
          "id": "F006",
          "status": "Delivered",
          "load": "4 tons",
          "goodsType": "Clothing",
          "dimensions": "2x2x1m"
        }
      ],
      "log": [
        {
          "id": "P008",
          "issue": "Charging Issue",
          "description": "Problem with the charging system, reduced range."
        },
        {
          "id": "P009",
          "issue": "Software Update Required",
          "description": "Software update needed for vehicle's navigation system."
        }
      ],
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244035.31999121172!2d77.5936945085704!3d12.971598735945403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae158baea6cd91%3A0x345b14dc24807d3!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1721726269425!5m2!1sen!2sin",
      "locationName": "Bangaluru",
      "date": "22-04-2022",
      "driverId": "DRV-20240703-110",
      "kmsTraveled": "150",
      "time": "2 hours 50 minutes",
      "tripId": "TRIP20240805-006"
    },
    {
      "vehicleId": "V007",
      "chassisId": "C007",
      "modelId": "M007",
      "manufacturer": "Manufacturer G",
      "fuel": "hybrid",
      "operatingCost": {
        "fuel": "450",
        "maintenance": "180",
        "drivercost": "470",
        "toll": "110",
        "total": "1210"
      },
      "driverBehavior": {
        "driverid": "DRV-20241103-110",
        "name": "Taylor",
        "speed": "80",
        "harshBraking": "3",
        "idling": "8"
      },
      "freight": [
        {
          "id": "F007",
          "status": "In Transit",
          "load": "5 tons",
          "goodsType": "Machinery",
          "dimensions": "3x3x3m"
        }
      ],
      "log": [
        {
          "id": "P010",
          "issue": "Power Steering Issue",
          "description": "Power steering system malfunction affecting maneuverability."
        },
        {
          "id": "P011",
          "issue": "Fuel System Leak",
          "description": "Leak in the fuel system, affecting efficiency and safety."
        }
      ],
      "location":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d492479.7587750481!2d73.67704857521709!3d15.349486382121666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba106336b741%3A0xeaf887ff62f34092!2sGoa!5e0!3m2!1sen!2sin!4v1722681409127!5m2!1sen!2sin",
      "locationName": "Goa",
      "date": "23-04-2022",
      "driverId": "DRV-20240903-108",
      "kmsTraveled": "200",
      "time": "4 hours",
      "tripId": "TRIP20240806-007"
    },
    {
      "vehicleId": "V008",
      "chassisId": "C008",
      "modelId": "M008",
      "manufacturer": "Manufacturer H",
      "fuel": "diesel",
      "operatingCost": {
        "fuel": "700",
        "maintenance": "300",
        "drivercost": "600",
        "toll": "150",
        "total": "1750"
      },
      "driverBehavior": {
        "driverid": "D238",
        "name": "Williams",
        "speed": "85",
        "harshBraking": "4",
        "idling": "12"
      },
      "freight": [
        {
          "id": "F008",
          "status": "Delivered",
          "load": "7 tons",
          "goodsType": "Pharmaceuticals",
          "dimensions": "2.5x2.5x2.5m"
        }
      ],
      "log": [
        {
          "id": "P012",
          "issue": "Overheating",
          "description": "Engine overheating due to coolant system failure."
        },
        {
          "id": "P013",
          "issue": "Fuel Pump Failure",
          "description": "Fuel pump malfunction, affecting vehicle performance."
        }
      ],
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.57633187535!2d85.66456205445041!3d20.300815140974244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1722681308560!5m2!1sen!2sin",
      "locationName": "Bhubaneswar",
      "date": "24-04-2022",
      "driverId": "DRV-20240203-112",
      "kmsTraveled": "210",
      "time": "4 hours 25 minutes",
      "tripId": "TRIP20240807-008"
    },{
      "vehicleId": "V009",
      "chassisId": "C009",
      "modelId": "M009",
      "manufacturer": "Manufacturer I",
      "fuel": "petrol",
      "operatingCost": {
        "fuel": "520",
        "maintenance": "270",
        "drivercost": "530",
        "toll": "140",
        "total": "1460"
      },
      "driverBehavior": {
        "driverid": "D239",
        "name": "Johnson",
        "speed": "78",
        "harshBraking": "3",
        "idling": "9"
      },
      "freight": [
        {
          "id": "F009",
          "status": "In Transit",
          "load": "5 tons",
          "goodsType": "Automotive Parts",
          "dimensions": "3x2x1.5m"
        }
      ],
      "log": [
        {
          "id": "P014",
          "issue": "Electrical System Fault",
          "description": "Fault in the electrical system, affecting lights and signals."
        },
        {
          "id": "P015",
          "issue": "Suspension Misalignment",
          "description": "Suspension misalignment causing steering issues."
        }
      ],
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243208.19691152088!2d83.09778269818275!3d17.7386034156062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9c20395498468!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1722681047417!5m2!1sen!2sin",
      "locationName": "Visakhapatnam",
      "date": "25-04-2022",
      "driverId": "DRV-20240103-111",
      "kmsTraveled": "190",
      "time": "3 hours 50 minutes",
      "tripId": "TRIP20240808-009"
    }
    
    
    
    
  ];
  


function Trip() {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const handleReportClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleBackClick = () => {
    setSelectedVehicleId(null);
  };

  // Find the selected trip details based on vehicleId
  const selectedTrip = tripDetails.find(trip => trip.vehicleId === selectedVehicleId) || {
    freight: [],
    log: []
  };

  return (
    <div className="p-4">
      {selectedVehicleId ? (
        <div className="flex flex-col ">
           <Button  style={{ backgroundColor: '#41729F', borderColor: '#41729F' }} className="mb-6 self-start" onClick={handleBackClick}>
            Back to Trip List
          </Button>
          <div className="flex flex-col lg:flex-row gap-6 flex-grow">
            {/* Vehicle Details Card */}
            <div className="lg:w-1/2 flex flex-col">
              <Card className="w-full">
              <CardBody className=" h-[520px]">
                  <Typography variant="h5" className="mb-2 flex items-center">
                    <TruckIcon className="h-6 w-6 mr-2" />
                    Vehicle Details
                  </Typography>
                  <div className="space-y-4">
                    <div className="space-y-2 grid grid-cols-1 xl:grid-cols-2 items-center">
                      <div className="space-y-2">
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Vehicle ID:</strong> <span className="text-sm">{selectedTrip.vehicleId}</span> 
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Chassis ID:</strong> <span className="text-sm">{selectedTrip.chassisId}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Model ID:</strong> <span className="text-sm"> {selectedTrip.modelId}</span>
                      </Typography>
                      <Typography variant="type">
                        <strong className="font-semibold text-sm">Fuel:</strong> <span className="text-sm">{selectedTrip.fuel}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Manufacturer:</strong> <span className="text-sm">{selectedTrip.manufacturer}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Location Name:</strong> <span className="text-sm">{selectedTrip.locationName}</span>
                      </Typography>
                      </div>
                      <div>
                        <img src={LorryImage} alt="image" className="rounded-xl shadow-lg w-[250px] ml-6"/>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                    
                    <div className="space-y-2">
                      <Typography variant="h6" className="text-lg font-semibold">
                        Driver Behavior
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Driver Id:</strong> <span className="text-sm"> {selectedTrip.driverBehavior.driverid}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Name:</strong>  <span className="text-sm">{selectedTrip.driverBehavior.name}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Speed:</strong>  <span className="text-sm">{selectedTrip.driverBehavior.speed}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Harsh Braking:</strong> <span className="text-sm"> {selectedTrip.driverBehavior.harshBraking}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Idling:</strong>  <span className="text-sm">{selectedTrip.driverBehavior.idling}</span>
                      </Typography>
                    </div>
                    <div className="space-y-2">
                      <Typography variant="h6" className="text-lg font-semibold">
                        Total Cost
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Fuel Cost:</strong>  <span className="text-sm">{selectedTrip.operatingCost.fuel}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Maintenance Cost:</strong>  <span className="text-sm">{selectedTrip.operatingCost.maintenance}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Driver Cost:</strong>  <span className="text-sm">{selectedTrip.operatingCost.drivercost}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Toll :</strong>  <span className="text-sm">{selectedTrip.operatingCost.toll}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Total Estimation:</strong> <span className="text-sm"> {selectedTrip.operatingCost.total}</span>
                      </Typography>
                    </div>
                    </div>
                    
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full mt-3">
                <CardBody>
                  <Typography variant="h6" className="mb-2 flex items-center">
                    <ShieldCheckIcon className="h-6 w-6 mr-2" />
                    Freight Details
                  </Typography>
                  {selectedTrip.freight.length > 0 ? (
                    selectedTrip.freight.map(freight => (
                      <div key={freight.id} className="mb-2">
                        <Typography variant="paragraph">
                          <strong className="font-semibold text-sm">Freight ID:</strong> <span className="text-sm">{freight.id}</span>
                        </Typography>
                        <Typography variant="paragraph">
                          <strong className="font-semibold text-sm">Status:</strong> <span className="text-sm">{freight.status}</span>
                        </Typography>
                        <Typography variant="paragraph">
                          <strong className="font-semibold text-sm">Load:</strong> <span className="text-sm">{freight.load || "N/A"}</span>
                        </Typography>
                        <Typography variant="paragraph">
                          <strong className="font-semibold text-sm">Type of Goods:</strong> <span className="text-sm">{freight.goodsType || "N/A"}</span>
                        </Typography>
                        <Typography variant="paragraph">
                          <strong className="font-semibold text-sm">Dimensions:</strong> <span className="text-sm">{freight.dimensions || "N/A"}</span>
                        </Typography>
                      </div>
                    ))
                  ) : (
                    <Typography variant="paragraph">No freight details available.</Typography>
                  )}
                </CardBody>
              </Card>
            </div>

            {/* Freight and Log Cards */}
            <div className="lg:w-1/2 flex flex-col gap-6 ">
              <Card className="w-full ">
              <CardBody className="overflow-y-scroll h-[458px]">
                <Typography variant="h5" className="mb-2 flex items-center">
                  <WrenchScrewdriverIcon className="h-6 w-6 mr-2" />
                  Log
                </Typography>
                {selectedTrip.log.length > 0 ? (
                  selectedTrip.log.map(log => (
                    <div key={log.id} className="mb-4 text-gray-700">
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm ">Log {log.id}:</strong> <span className="text-sm">{log.issue}</span>
                      </Typography>
                      <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Description:</strong> <span className="text-sm">{log.description}</span>
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="paragraph">No log details available.</Typography>
                )}
              </CardBody>
            </Card>
            <Card>
                <CardBody className="flex items-start flex-col space-x-6 p-6 rounded-lg bg-white w-full ">
                  <Typography variant="h5" className="text-gray-800 font-medium mb-3">
                    What If Analysis
                  </Typography>
                  <div className="flex gap-6">
                  <img
                    src="/img/truck4.webp"
                    alt="Analysis"
                    className="h-[170px] w-100 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex flex-col space-y-3 text-gray-700 w-full max-w-lg">
                    <Typography variant="body1">
                      <strong className="text-sm">Reduced emissions by 60 percent.</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong className="text-sm">Reduced fuel cost by 20 percent.</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong className="text-sm">Reduced maintenance cost by 30 percent.</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong className="text-sm">Reduction in downtime by 10 percent.</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong className="text-sm">Resale Value of Old Vehicle</strong>
                    </Typography>

                  </div>
                  </div>
                
                </CardBody>
              </Card>

          </div>
        </div>
        </div>
      ) : (

        <div>
          <Typography variant="h4" className="mb-6">
            Trip Details
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tripDetails.map((trip, index) => (
              <Card key={index} className="w-full max-w-xs">
                <CardBody className="flex flex-col">
                  <div className="relative h-32 mb-4">
                    <iframe
                      src={trip.location}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>

                  <div className="p-4 space-y-2">
                    <Typography variant="paragraph">
                        <strong className="font-semibold text-sm">Trip ID:</strong> <span className="text-sm">{trip.tripId}</span>
                      </Typography>
                    <Typography variant="paragraph">
                        <strong  className="font-semibold text-sm">Vehicle ID:</strong> <span className="text-sm">{trip.vehicleId}</span>
                      </Typography>
                      <Typography variant="paragraph" className="flex items-center">
                      {/* <UserIcon className="h-5 w-5 mr-2" /> */}
                      <strong className="font-semibold text-sm">Driver ID:</strong> <span className="text-sm">{trip.driverId}</span>
                    </Typography>
                    <Typography variant="paragraph">
                      <strong  className="font-semibold text-sm">Date:</strong> <span className="text-sm">{trip.date}</span>
                    </Typography>
                    <Typography variant="paragraph">
                      <strong  className="font-semibold text-sm">KM:</strong> <span className="text-sm">{trip.kmsTraveled}</span>
                    </Typography>
                    <Button  className="d-flex justify-content-end" style={{ backgroundColor: '#41729F', borderColor: '#41729F' }} onClick={() => handleReportClick(trip.vehicleId)}>
                    View Report
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Trip;