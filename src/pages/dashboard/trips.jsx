import React, { useState } from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { TruckIcon, UserIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

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
      locationName: "Trip Location A",
      date: "20-04-2022",
      driverId: "D001",
      kmsTraveled: "150",
      time: "3 hours",
       tripId:"543"
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
      locationName: "Trip Location B",
      date: "20-04-2022",
      driverId: "D003",
      kmsTraveled: "120",
      time: "2 hours 30 minutes",
       tripId:"543"
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
      locationName: "Trip Location C",
      date: "20-04-2022",
      driverId: "D004",
      kmsTraveled: "300",
      time: "5 hours",
       tripId:"543"
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
      locationName: "Trip Location D",
      date: "20-04-2022",
      driverId: "D005",
      kmsTraveled: "180",
      time: "3 hours 15 minutes",
       tripId:"543"
    
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
              <CardBody className="overflow-scroll h-[704px]">
                  <Typography variant="h5" className="mb-2 flex items-center">
                    <TruckIcon className="h-6 w-6 mr-2" />
                    Vehicle Details
                  </Typography>
                  <div className="space-y-4">
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
                    <hr className="my-4 border-gray-300" />
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
                    <hr className="my-4 border-gray-300" />
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
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Freight and Log Cards */}
            <div className="lg:w-1/2 flex flex-col gap-6 ">
              <Card className="w-full">
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


  <Card className="w-full ">
  <CardBody className="overflow-scroll h-[458px]">
    <Typography variant="h5" className="mb-2 flex items-center">
      <WrenchScrewdriverIcon className="h-6 w-6 mr-2" />
      Log
    </Typography>
    {selectedTrip.log.length > 0 ? (
      selectedTrip.log.map(log => (
        <div key={log.id} className="mb-4 text-gray-700">
          <Typography variant="paragraph">
            <strong className="font-semibold ">Log {log.id}:</strong> {log.issue}
          </Typography>
          <Typography variant="paragraph">
            <strong className="font-semibold text-sm">Description:</strong> {log.description}
          </Typography>
        </div>
      ))
    ) : (
      <Typography variant="paragraph">No log details available.</Typography>
    )}
  </CardBody>
</Card>

  </div>
</div>
  <Card className="mt-4">
  <CardBody className="flex items-start flex-col space-x-6 p-6 shadow-lg rounded-lg bg-white w-full ">
    <Typography variant="h5" className="text-gray-800 font-medium mb-6">
      What If Analysis
    </Typography>
    <div className="flex gap-6">
    <img
      src="/img/truck4.webp"
      alt="Analysis"
      className="h-[200px] w-100 object-cover rounded-lg border border-gray-200"
    />
    <div className="flex flex-col space-y-4 text-gray-700 w-full max-w-lg">
      <Typography variant="body1">
        <strong>Reduced emissions by 60 percent.</strong>
      </Typography>
      <Typography variant="body1">
        <strong>Reduced fuel cost by 20 percent.</strong>
      </Typography>
      <Typography variant="body1">
        <strong>Reduced maintenance cost by 30 percent.</strong>
      </Typography>
      <Typography variant="body1">
        <strong>Reduction in downtime by 10 percent.</strong>
      </Typography>
      <Typography variant="body1">
        <strong>Resale Value of Old Vehicle</strong>
      </Typography>

    </div>
    </div>
   
  </CardBody>
</Card>

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