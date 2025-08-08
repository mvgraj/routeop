import React from 'react';
import { useNavigate } from 'react-router-dom';
import schoolBus1 from "./img/Dubai-School-buse1.jpg";
import schoolBus2 from "./img/Dubai-School-buse3.webp"
import schoolBus3 from "./img/Dubai-School-buse2.jpg"

const VehicleData = [
  {
    id: 1,
    image: schoolBus1,
    typeName: "Ashok Leyland Sunshine",
    manufacturer: "Ashok Leyland",
    capacity: "45 students",
    fuelTypes: ["Petrol"],
    statusSummary: {
      Active: 2,
      Maintenance: 1,
      Available: 0
    },
    totalVehicles: 3,
    exampleVehicleNos: ["DUB-EDU-001", "DUB-EDU-004", "DUB-EDU-007"],
    location: "Dubai - Al Barsha",
    school: "GEMS Education",
    representativeChassis: "DUBSCHBUS001",
    averageRUL: "8200 km",
    lastMaintenance: "2024-06-30",
    mapLocation: "https://www.google.com/maps?q=Al+Barsha+Dubai",

    // New Fields
    averageMileage: "6.5 km/l",
    totalTrips: 120,
    totalDistanceCovered: "12,500 km",
    averageEmissions: "148 g/km",
    uptime: "88%",
    ageRange: "2017 – 2021"
  },
  {
    id: 2,
    image: schoolBus2,
    typeName: "Tata Starbus",
    manufacturer: "Tata Motors",
    capacity: "32 students",
    fuelTypes: ["Diesel"],
    statusSummary: {
      Active: 1,
      Maintenance: 2,
      Available: 2
    },
    totalVehicles: 5,
    exampleVehicleNos: ["DUB-EDU-002", "DUB-EDU-005", "DUB-EDU-006"],
    location: "Dubai - Al Barsha",
    school: "GEMS Education",
    representativeChassis: "DUBSCHBUS002",
    averageRUL: "5000 km",
    lastMaintenance: "2024-06-10",
    mapLocation: "https://www.google.com/maps?q=Al+Barsha+Dubai",

    // New Fields
    averageMileage: "6.2 km/l",
    totalTrips: 98,
    totalDistanceCovered: "10,100 km",
    averageEmissions: "155 g/km",
    uptime: "76%",
    ageRange: "2016 – 2020"
  },
  {
    id: 3,
    image: schoolBus3,
    typeName: "Mercedes-Benz School Bus",
    manufacturer: "Mercedes-Benz",
    capacity: "21 students",
    fuelTypes: ["Diesel"],
    statusSummary: {
      Active: 2,
      Maintenance: 1,
      Available: 1
    },
    totalVehicles: 4,
    exampleVehicleNos: ["DUB-EDU-003", "DUB-EDU-008", "DUB-EDU-009"],
    location: "Dubai - Al Barsha",
    school: "GEMS Education",
    representativeChassis: "DUBSCHBUS003",
    averageRUL: "9100 km",
    lastMaintenance: "2024-07-05",
    mapLocation: "https://www.google.com/maps?q=Al+Barsha+Dubai",

    // New Fields
    averageMileage: "6.9 km/l",
    totalTrips: 135,
    totalDistanceCovered: "13,800 km",
    averageEmissions: "140 g/km",
    uptime: "94%",
    ageRange: "2018 – 2022"
  }
];


function Fleet() {
  const navigate = useNavigate();

  const handleCardClick = (vehicle) => {
    navigate("/school-dashboard/fleet_overview", { state: vehicle });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {VehicleData.map((vehicle) => (
        <div
          key={vehicle.id}
          className="bg-white shadow-lg p-4 mt-6 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleCardClick(vehicle)}
        >
          <img
            src={vehicle.image}
            alt={`Vehicle ${vehicle.id}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-gray-700 text-center font-semibold">
              Capacity: {vehicle.capacity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Fleet;
