import React, { useState, useRef } from "react";
import { Typography, Card, CardBody, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import LorryImage from "./img/Ashok_LP.jpg";
import lorry2 from "./img/tata_ace.jpg"
import lorry3 from "./img/mahindra_dost.jpg"
import lorry4 from "./img/mahindra_dost.jpg"
import lorry5 from "./img/lorry.jpg"
import lorry6 from "./img/BharatBenz.jpg"
import lorry7 from "./img/Eicher_g.jpg"
import lorry8 from "./img/BharatBenz.jpg"
import lorry9 from "./img/SML_i.jpg"
import lorry10 from "./img/Force_m.webp"

import { CameraIcon } from '@heroicons/react/24/outline';

const VehicleData = [
  {
    id: 1,
    image: LorryImage,
    status: "Active",
    vehicleNo: "MH12 AB 1234",
    chassisNo: "MBL4D4BXYH123456",
    capacity: "20 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-07-01",
    RUL: "5000 km",
    TruckName:"Ashok Leyland Boss",
    year:'2010',
    manufacturer:'Ashok Leyland',
    location:"Maharashtra",
    location1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.9051038798!2d78.243236602612!3d17.412608636450027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1721726269423!5m2!1sen!2sin",   
  },
  {
    id: 2,
    image: lorry2,
    status: "Maintenance",
    vehicleNo: "KA03 MN 5678",
    chassisNo: "TMBK1D3BXYF123456",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Tata Ace",
    year:'2009',
    manufacturer:'Tata Motors',
    location:"Karnataka"
  },
  {
    id: 3,
    image: lorry3,
    status: "Available",
    vehicleNo: "TN22 XY 9012",
    chassisNo: "MA1TZS4SML123456",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Mahindra Bolero Pik-Up",
    year:'2015',
    manufacturer:'Mahindra',
    location:"Tamil Nadu"
  },
  {
    id: 4,
    image: lorry4,
    status: "Active",
    vehicleNo: "TS22 XY 8012",
    chassisNo: "RCL4D4BXYH123456",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Ashok Leyland Dost",
    year:'2010',
    manufacturer:'Ashok Leyland',
    location:"Telangana"
  },
  {
    id: 5,
    image: lorry5,
    status: "Maintenance",
    vehicleNo: "AP33 CT 7012",
    chassisNo: "MBL5D4BXYJ987654",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Ashok Leyland U-Truck",
    year:'2010',
    manufacturer:'Ashok Leyland',
    location:"Andhra Pradesh"
  },
  {
    id: 6,
    image: lorry6,
    status: "Active",
    vehicleNo: "TN75 ZY 9912",
    chassisNo: "MA1TZS4SML654321",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Mahindra Furio",
    year:'2010',
    manufacturer:'Mahindra',
    location:"Tamil Nadu"
  },
  {
    id: 7,
    image: lorry7,
    status: "Maintenance",
    vehicleNo: "AP27 HJ 6781",
    chassisNo: "VEK7D4BXYJ987654",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Eicher Gladiator",
    year:'2010',
    manufacturer:'Eicher Motors',
    location:"Andhra Pradesh"
  },
  {
    id: 8,
    image: lorry8,
    status: "Available",
    vehicleNo: "MH12 HG 1312",
    chassisNo: "DB2T4D5BXYF987654",
    capacity: "10 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-07-10",
    RUL: "7000 km",
    TruckName:"BharatBenz 3128",
    year:'2010',
    manufacturer:'BharatBenz',
    location:"Maharashtra"
  },
  {
    id: 9,
    image: lorry9,
    status: "Active",
    vehicleNo: "OD22 XC 7967",
    chassisNo: "SML6D4BXYH987654",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"SML Isuzu Supreme",
    year:'2010',
    manufacturer:'SML Isuzu',
    location:"Odisha",

  },
  {
    id: 10,
    image: lorry10,
    status: "Maintenance",
    vehicleNo: "MP98 ML 8567",
    chassisNo: "FOR5D4BXYJ654321",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Force Motors Trax",
    year:'2010',
    manufacturer:'Force Motors',
    location:"Madhya Pradesh"
  },
];

function Fleet() {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vehicleData, setVehicleData] = useState([
    {
      model: "",
      vehicleNo: "",
      chassisNo: "",
      manufacturer: "",
      odometer: "",
      capacity: "",
      fuel: "",
      lastMaintenanceDate: "",
      RUL: "",
     
    },
  ]);
  const [filter, setFilter] = useState("All");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setImageName(file.name); // Set the file name
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };


  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-600 text-white";
      case "Maintenance":
        return "bg-orange-600 text-white";
      case "Available":
        return "bg-yellow-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleInputChange = (e, index, field) => {
    const newVehicleData = [...vehicleData];
    newVehicleData[index][field] = e.target.value;
    setVehicleData(newVehicleData);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const navigateToAddVehicle = () => {
    
    setShowAddVehicle(true);
  };

  const navigateBack = () => {
    setShowAddVehicle(false);
  };

  const handleSaveVehicles = () => {
    // Handle saving vehicles here
  };

  const navigatetoheader = (vehicle) => {
    navigate("/dashboard/Vehicle_analysis",{state: {vehicle}});
    navigate("/dashboard/Vehicle_analysis/overview",{state: {vehicle}});

  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredVehicleData = () => {
    switch (filter) {
      case "On Trip":
        return VehicleData.filter(vehicle => vehicle.status === "Active");
      case "Under Maintenance":
        return VehicleData.filter(vehicle => vehicle.status === "Maintenance");
      case "Un-Assigned":
        return VehicleData.filter(vehicle => vehicle.status === "Available");
      default:
        return VehicleData;
    }
  };

  if (showAddVehicle) {
    return (
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-xlg">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={navigateBack}
              style={{ backgroundColor: "#41729F", color: "white" }}
            >
              Back
            </Button>
            <Button
              onClick={triggerFileInput}
              style={{ backgroundColor: "#41729F", color: "white" }}
            >
              + Add Multiple Vehicles (CSV)
            </Button>
          </div>
          <Typography variant="h6" className="mb-4">
            Add New Vehicle
          </Typography>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            ref={fileInputRef}
          />
          {vehicleData.map((vehicle, index) => (
             <div
             key={index}
             className="mb-6 p-6 bg-white border border-gray-300 rounded shadow-md grid grid-cols-1 xl:grid-cols-2"
           >
            <div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Vehicle Model"
                 value={vehicle.model}
                 onChange={(e) => handleInputChange(e, index, "model")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Vehicle No"
                 value={vehicle.vehicleNo}
                 onChange={(e) => handleInputChange(e, index, "vehicleNo")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Chassis No"
                 value={vehicle.chassisNo}
                 onChange={(e) => handleInputChange(e, index, "chassisNo")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Manufacturer"
                 value={vehicle.manufacturer}
                 onChange={(e) => handleInputChange(e, index, "manufacturer")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="number"
                 label="Odometer"
                 value={vehicle.odometer}
                 onChange={(e) => handleInputChange(e, index, "odometer")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Location"
                 value={vehicle.location}
                 onChange={(e) => handleInputChange(e, index, "location")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Capacity"
                 value={vehicle.capacity}
                 onChange={(e) => handleInputChange(e, index, "capacity")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="text"
                 label="Fuel"
                 value={vehicle.fuel}
                 onChange={(e) => handleInputChange (e, index, "fuel")}
                 fullWidth
               />
             </div>
             <div className="mb-4">
               <Input
                 type="date"
                 label="Last Maintenance Date"
                 value={vehicle.lastMaintenanceDate}
                 onChange={(e) => handleInputChange(e, index, "lastMaintenanceDate")}
                 fullWidth
               />
             </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-4 mb-4 ml-10" style={{ width: '100%' }}>
              <div
                className="h-60 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('fileInput').click()}
              >
                {image ? (
                  <img src={image} alt="Preview" className="object-cover w-[400px] h-full rounded-lg" />
                ) : (
                  <div className="text-center">
                    <CameraIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-500 mt-2">Drag & Drop your image here, or click to select one</p>
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 flex gap-2">
                <div>
                <span className="font-semibold">Vehicle Image:  </span>
                </div>
                {imageName && (
                  <p className="text-gray-700">{imageName}</p> // Display the image name
                )}
              </div>
            </div>
            <div>
            <Button
            onClick={handleSaveVehicles}
            style={{ backgroundColor: "#41729F", color: "white" }}
            className="mt-9 "
          >
            Save Vehicles
          </Button>
              </div>

           </div>
        
          ))}
          
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">Fleet</Typography>
        <Button
          onClick={navigateToAddVehicle}
          style={{ backgroundColor: "#41729F", color: "white" }}
        >
          + Add 
        </Button>
      </div>

      <div className="p-4">
        <div className="flex items-center mb-4 space-x-2">
          <Typography
            variant="button"
            className={`${
              filter === "All" ? "font-bold underline" : ""
            } cursor-pointer py-2 px-4 rounded`}
            onClick={() => handleFilterChange("All")}
          >
            All
          </Typography>
          <Typography
            variant="button"
            className={`${
              filter === "On Trip" ? "font-bold underline" : ""
            } cursor-pointer py-2 px-4 rounded`}
            onClick={() => handleFilterChange("On Trip")}
          >
            On Trip
          </Typography>
          <Typography
            variant="button"
            className={`${
              filter === "Under Maintenance" ? "font-bold underline" : ""
            } cursor-pointer py-2 px-4 rounded`}
            onClick={() => handleFilterChange("Under Maintenance")}
          >
            Under Maintenance
          </Typography>
          <Typography
            variant="button"
            className={`${
              filter === "Un-Assigned" ? "font-bold underline" : ""
            } cursor-pointer py-2 px-4 rounded`}
            onClick={() => handleFilterChange("Un-Assigned")}
          >
            Un-Assigned
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredVehicleData().map((vehicle) => (
          
          <Card key={vehicle.id} className="w-full max-w-sm cursor-pointer" onClick={() => navigatetoheader(vehicle)}>
            
            <CardBody className="flex flex-col">
              <div className="relative h-32 overflow-hidden rounded-t-lg">
                <img
                  src={vehicle.image}
                  alt={vehicle.vehicleNo}
                  className="h-full w-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-2 space-y-2">
                <div
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(vehicle.status)}`}
                >
                  {vehicle.status}
                </div>
                <Typography variant="body2" className="text-sm">
                  <strong className="font-semibold">Vehicle No:</strong> {vehicle.vehicleNo}
                </Typography>
                <Typography variant="body2" className="text-sm">
                  <strong className="font-semibold">Chassis No:</strong> {vehicle.chassisNo}
                </Typography>
                <Typography variant="body2" className="text-sm">
                  <strong className="font-semibold">Capacity:</strong> {vehicle.capacity}
                </Typography>
                <Typography variant="body2" className="text-sm">
                  <strong className="font-semibold">Fuel:</strong> {vehicle.fuel}
                </Typography>
                <Typography variant="body2" className="text-sm">
                  <strong className="font-semibold">Location:</strong> {vehicle.location}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Fleet;

