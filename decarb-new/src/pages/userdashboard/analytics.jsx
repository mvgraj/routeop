import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";
import ProjectStastics_cost from "@/data/ProjectStastics_cost";
import ProjectStastics_service from "@/data/ProjectStastics_service";
import ProjectStastics from "@/data/ProjectStastics";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import LorryImage from "./img/Ashok_LP.jpg";
import lorry2 from "./img/tata_ace.jpg"
import lorry4 from "./img/mahindra_dost.jpg"
import lorry5 from "./img/lorry.jpg"
import lorry6 from "./img/lorry.jpg"
import lorry7 from "./img/lorry.jpg"
import lorry8 from "./img/BharatBenz.jpg"
// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const fuel = [
  {
    tripId:10101,
    date:"12-9-2022",
    speculativeCost:1200,
    actualCost:1000,
    savedCost:200,
    distance:"30Km"

  },
  {
    tripId:10102,
    date:"12-9-2022",
    speculativeCost:1200,
    actualCost:1000,
    savedCost:200,
    distance:"30Km"

  },
  {
    tripId:10103,
    date:"12-9-2022",
    speculativeCost:1200,
    actualCost:1000,
    savedCost:200,
    distance:"30Km"

  },
  {
    tripId:10104,
    date:"12-9-2022",
    speculativeCost:1200,
    actualCost:1000,
    savedCost:200,
    distance:"30Km"

  },
  {
    tripId:10105,
    date:"12-9-2022",
    speculativeCost:1200,
    actualCost:1000,
    savedCost:200,
    distance:"30Km"

  },
  {
    tripId:10106,
    date:"12-9-2022",
    speculativeCost:1200,
    actualCost:1000,
    savedCost:200,
    distance:"30Km"

  },
]

const emission=[
  {
    trip:'10101',
    fuel:'100',
    co2:"2,310",
    nox:"0.2",
    pm:'0.2',
    co:'2.3',
    hc:'0.05',
    so:'0.003'
  },
  {
    trip:'10102',
    fuel:'208',
    co2:"2,310",
    nox:"0.2",
    pm:'0.2',
    co:'2.3',
    hc:'0.05',
    so:'0.003'
  },
  {
    trip:'10103',
    fuel:'170',
    co2:"2,310",
    nox:"0.2",
    pm:'0.2',
    co:'2.3',
    hc:'0.05',
    so:'0.003'
  }
]

// Dummy data for vehicles
const vehicles = [
  {
    image: LorryImage,
    vehicleNo: "V001",
    recentTrips: "5",
    resaleValue: "15,000",
    lastMaintenance: "2024-06-15",
    emissions: "100",
    milage: "102",
    TruckName:"Ashok Leyland Boss",
    year:'2010',
    manufacturer:'Ashok Leyland',
    location:"Maharashtra",
    chassisNo: "MBL4D4BXYH123456",
  },
  {
    image: lorry2 ,
    vehicleNo: "V002",
    recentTrips: "8",
    resaleValue: "20,000",
    lastMaintenance: "2024-05-22",
    emissions: "100",
    milage: "102",
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
    image: lorry4 ,
    vehicleNo: "V004",
    recentTrips: "8",
    resaleValue: "20,000",
    lastMaintenance: "2024-05-22",
    emissions: "100",
    milage: "102",
    chassisNo: "MBL5D4BXYJ987654",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Ashok Leyland U-Truck",
    year:'2010',
    manufacturer:'Ashok Leyland',
    location:"Telangana"
  },
  {
    image: lorry5 ,
    vehicleNo: "V005",
    recentTrips: "5",
    resaleValue: "15,000",
    lastMaintenance: "2024-06-15",
    emissions: "100",
    milage: "102",
    chassisNo: "MA1TZS4SML654321",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Mahindra Furio",
    year:'2010',
    manufacturer:'Mahindra',
    location:"Andhra Pradesh"
  },
  {
    image: lorry6 ,
    vehicleNo: "V006",
    recentTrips: "8",
    resaleValue: "20,000",
    lastMaintenance: "2024-05-22",
    emissions: "100",
    milage: "102",
    chassisNo: "VEK7D4BXYJ987654",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"Eicher Gladiator",
    year:'2010',
    manufacturer:'Eicher Motors',
     location:"Tamil Nadu"
  },
  {
    image:lorry7 ,
    vehicleNo: "V007",
    recentTrips: "8",
    resaleValue: "20,000",
    lastMaintenance: "2024-05-22",
    emissions: "100",
    milage: "102",
    chassisNo: "DB2T4D5BXYF987654",
    capacity: "10 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-07-10",
    RUL: "7000 km",
    TruckName:"BharatBenz 3128",
    year:'2010',
    manufacturer:'BharatBenz',
    location:"Andhra Pradesh"
  },
  {
    image: lorry8 ,
    vehicleNo: "V008",
    recentTrips: "8",
    resaleValue: "20,000",
    lastMaintenance: "2024-05-22",
    emissions: "100",
    milage: "102",
    chassisNo: "SML6D4BXYH987654",
    capacity: "15 tons",
    fuel: "Diesel",
    lastMaintenanceDate: "2024-06-15",
    RUL: "3000 km",
    TruckName:"SML Isuzu Supreme",
    year:'2010',
    manufacturer:'SML Isuzu',
    location:"Maharashtra"
  },
  // Add more vehicles as needed
];

function Analytics() {
  const [activeTab, setActiveTab] = useState("vehicle");
  const [filter, setFilter] = useState("monthly");
  const [startDate, setStartDate] = useState(new Date()); // Initialize with default date
  const [endDate, setEndDate] = useState(new Date()); // Initialize with default date
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
 const navigatetoheader = (vehicle) => {
  navigate("/user-dashboard/Vehicle_analysis", { state: { vehicle } });
};


  const handleFilterChange = (option) => {
    setFilter(option);
  };

  // Dummy chart data
  const chartData = {
    labels: filter === "monthly" ? Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`) : ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Fuel Costs",
        data: filter === "monthly" ? Array(12).fill(100) : [1200, 1800, 1600, 2200],
        borderColor: "#4EC33D",
        backgroundColor: "rgba(78, 195, 61, 0.2)",
        fill: true,
      },
      {
        label: "Service Costs",
        data: filter === "monthly" ? Array(12).fill(50) : [600, 800, 700, 900],
        borderColor: "#1E90FF",
        backgroundColor: "rgba(30, 144, 255, 0.2)",
        fill: true,
      },
    ],
  };

  return  (
    <div className="p-4">
      <Typography variant="h4" className="mb-6">
        Reports
      </Typography>
      
      <div className="flex items-center mb-4 space-x-2">
        <Typography
          variant="button"
          className={`cursor-pointer py-2 px-4 rounded ${activeTab === "vehicle" ? "font-bold underline" : ""}`}
          onClick={() => handleTabChange("vehicle")}
        >
          Vehicle
        </Typography>
        <Typography
          variant="button"
          className={`cursor-pointer py-2 px-4 rounded ${activeTab === "cost" ? "font-bold underline" : ""}`}
          onClick={() => handleTabChange("cost")}
        >
          Cost
        </Typography>
        <Typography
          variant="button"
          className={`cursor-pointer py-2 px-4 rounded ${activeTab === "emission" ? "font-bold underline" : ""}`}
          onClick={() => handleTabChange("emission")}
        >
          Emission
        </Typography>
      </div>

      {activeTab === "vehicle" && (
        <div className=" rounded-xl bg-white p-3">
          <table className="min-w-full bg-white rounded-xl" >
            <thead className="text-left font-semibold text-gray-800 text-sm">
              <tr className="border-y">
                <th className="px-6 py-4" >Vehicle Id</th>
                <th className="px-1 py-3">Total Trips</th>
                <th className="px-6 py-3">Last Maintenance</th>
                <th className="px-6 py-3">Emission</th>
                <th className="px-6 py-3">Mileage</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {vehicles.map((vehicle, index) => (
                <tr className="text-sm text-gray-800 border-b" key={index}>
                  <td className="px-3 py-3 cursor-pointer">
                    <div className="flex items-center" onClick={() => navigatetoheader(vehicle)}>
                      <img src={vehicle.image} alt={vehicle.name} className="h-9 w-9 rounded-full object-cover mr-4" />
                      <td  className="text-sm text-gray-800" >{vehicle.vehicleNo}</td>
                    </div>
                  </td>
                  <td className="px-5 py-3 ">
                    {vehicle.recentTrips}
                  </td>
                  <td className="px-6 py-3 ">
                    {vehicle.lastMaintenance}
                  </td>
                  <td className="px-8 py-3">
                    <ul>
                      <li>{vehicle.emissions}</li>
                      <li className="text-xs text-gray-700">g/litre</li>
                    </ul>
                  </td>
                  <td className="px-8 py-3">
                    <ul>
                      <li>{vehicle.milage}</li>
                      <li className="text-xs text-gray-700">km/litre</li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "cost" && (
    <div class="relative">
   
   <div className="flex justify-end">
      <div className="flex items-center mb-3">
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-3 py-2.5 focus:ring-blue-500 focus:border-blue-500 block"
            placeholderText="Select start date"
            dateFormat="dd/MM/yyyy"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SlCalender className="w-4 h-4 text-gray-500" /> 
          </span>
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-3 py-2.5 focus:ring-blue-500 focus:border-blue-500 block"
            placeholderText="Select end date"
            dateFormat="dd/MM/yyyy"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SlCalender className="w-4 h-4 text-gray-500" /> 
          </span>
        </div>
      </div>
    </div>
         <div>
   
        <ProjectStastics_cost />
        <div className='bg-white p-3 rounded-xl mt-3 overflow-scroll mb-3 max-h-[350px]'>
              <table className='w-full text-sm '>
                <thead className=' text-left border-y text-gray-800'>
                  <tr className=''>
                    <th className='px-2 py-4'>TripId</th>
                    <th>Date of Trip</th>
                    <th>Speculative Cost</th>
                    <th>Actual Cost</th>
                    <th>Saved Cost</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                
                {
            fuel.map((fuel,index) => (
              <tbody className='text-left text-gray-800'   key={index}>
                  <tr className='border-y' >
                    <td className='px-2 py-4'>
                      {fuel.tripId}
                    </td>
                    <td className='px-2 py-4'>
                      {fuel.date}
                    </td >
                    <td className='px-2 py-4'>
                      {fuel.speculativeCost}
                    </td>
                    <td className='px-2 py-4'>
                      {fuel.actualCost}
                    </td>
                    <td className='px-2 py-4'>
                      {fuel.savedCost}
                    </td>
                    <td className='px-2 py-4'>
                      {fuel.distance}
                    </td>
                  </tr>
                  </tbody>
                    ))
                  }
              </table>
        </div>
            
            <ProjectStastics_service />
          </div>
          <div className='mt-4 grid md:grid-cols-3 gap-3'>
            <div className='bg-white p-6 rounded-xl shadow-xl'>
              <div className='flex gap-2 items-center'>
                <h1 className='text-gray-800 text-md font-semibold'>Service 1 </h1>
                <p className='text-sm items-center'> (19-10-2021)</p>
              </div>
              <div className='mt-3'>
                <table className='text-gray-800'>
                  <thead className='text-left text-sm'>
                    <tr className='border-b'>
                      <th className='px-2 py-2'></th>
                      <th className='px-2 py-2'>Components</th>
                      <th className='px-2 py-2'>Cost</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm border-b'>
                    <tr className='border-b'>
                      <td>1</td>
                      <td className='px-2 py-2'>Oil and Filter Changes</td>
                      <td className='px-2 '>2934</td>
                    </tr>
                    <tr className='border-b'>
                      <td>2</td>
                      <td className='px-2 py-2'>Tire Maintenance</td>
                      <td className='px-2 py-2'>10982</td>
                    </tr>
                  </tbody>
                </table>
                <div className='flex gap-3 text-sm mt-4'>
                  <h1 className='font-semibold text-gray-800'>Total Maintenance Time:</h1>
                  <p className='text-gray-800'>1day3hr20mins</p>
                </div>
                <div className='flex text-sm gap-2'>
                  <h1 className='font-semibold text-gray-800'>Total Service Cost:</h1>
                  <p className='text-gray-800'>8000</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-xl'>
              <div className='flex gap-2 items-center'>
                <h1 className='text-gray-800 text-md font-semibold'>Service 2</h1>
                <p className='text-sm items-center'> (19-10-2022)</p>
              </div>
              <div className='mt-3'>
                <table className='text-gray-800'>
                  <thead className='text-left text-sm'>
                    <tr className='border-b'>
                      <th className='px-2 py-2'></th>
                      <th className='px-2 py-2'>Components</th>
                      <th className='px-2 py-2'>Cost</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm border-b'>
                    <tr className='border-b'>
                      <td>1</td>
                      <td className='px-2 py-2'>Battery Change</td>
                      <td className='px-2'>2934</td>
                    </tr>
                    <tr className='border-b'>
                      <td>2</td>
                      <td className='px-2 py-2'>Wheel Alignment</td>
                      <td className='px-2 py-2'>10982</td>
                    </tr>
                  </tbody>
                </table>
                <div className='flex gap-3 text-sm mt-4'>
                  <h1 className='font-semibold text-gray-800'>Total Maintenance Time:</h1>
                  <p className='text-gray-800'>1day3hr20mins</p>
                </div>
                <div className='flex text-sm gap-2'>
                  <h1 className='font-semibold text-gray-800'>Total Service Cost:</h1>
                  <p className='text-gray-800'>8000</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-xl'>
              <div className='flex gap-2 items-center'>
                <h1 className='text-gray-800 text-md font-semibold'>Service 3</h1>
                <p className='text-sm items-center'> (19-10-2022)</p>
              </div>
              <div className='mt-3'>
                <table className='text-gray-800'>
                  <thead className='text-left text-sm'>
                    <tr className='border-b'>
                      <th className='px-2 py-2'></th>
                      <th className='px-2 py-2'>Components</th>
                      <th className='px-2 py-2'>Cost</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm border-b'>
                    <tr className='border-b'>
                      <td>1</td>
                      <td className='px-2 py-2'>Brake Replacement</td>
                      <td className='px-2'>2934</td>
                    </tr>
                    <tr className='border-b'>
                      <td>2</td>
                      <td className='px-2 py-2'>Suspension Check</td>
                      <td className='px-2 py-2'>10982</td>
                    </tr>
                  </tbody>
                </table>
                <div className='flex gap-3 text-sm mt-4'>
                  <h1 className='font-semibold text-gray-800'>Total Maintenance Time:</h1>
                  <p className='text-gray-800'>1day3hr20mins</p>
                </div>
                <div className='flex text-sm gap-2'>
                  <h1 className='font-semibold text-gray-800'>Total Service Cost:</h1>
                  <p className='text-gray-800'>8000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emission tab */}
      {activeTab === "emission" && (
 
    <div class="relative">
 
  <div className="flex justify-end">
      <div className="flex items-center mb-3">
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-3 py-2.5 focus:ring-blue-500 focus:border-blue-500 block"
            placeholderText="Select start date"
            dateFormat="dd/MM/yyyy"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SlCalender className="w-4 h-4 text-gray-500" /> {/* Heroicons calendar-days icon */}
          </span>
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-3 py-2.5 focus:ring-blue-500 focus:border-blue-500 block"
            placeholderText="Select end date"
            dateFormat="dd/MM/yyyy"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SlCalender className="w-4 h-4 text-gray-500" /> {/* Heroicons calendar-days icon */}
          </span>
        </div>
      </div>
    </div>
    <ProjectStastics/>

    
    <div className="mt-4 bg-white p-3 rounded-md">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-800 text-sm border-y">
            <th className="py-3 px-2">TripId</th>
            <th className="py-3 px-2">Fuel Consumed</th>
            <th className="py-3 px-2">CO2</th>
            <th className="py-3 px-2">NOx</th>
            <th className="py-3 px-2">PM</th>
            <th className="py-3 px-2">CO</th>
            <th className="py-3 px-2">HC/VOCs</th>
            <th className="py-3 px-2">SO2</th>
          </tr>
        </thead>
        <tbody>
          {emission.map((item, index) => (
            <tr className="text-sm text-gray-800 border-b" key={index}>
              <td className="py-3 px-2">{item.trip}</td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.fuel}</li>
                  <li className="text-xs text-gray-600">liters</li>
                </ul>
              </td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.co2}</li>
                  <li className="text-xs text-gray-600">g/liters</li>
                </ul>
              </td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.nox}</li>
                  <li className="text-xs text-gray-600">g/liters</li>
                </ul>
              </td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.pm}</li>
                  <li className="text-xs text-gray-600">g/liters</li>
                </ul>
              </td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.co}</li>
                  <li className="text-xs text-gray-600">g/liters</li>
                </ul>
              </td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.hc}</li>
                  <li className="text-xs text-gray-600">g/liters</li>
                </ul>
              </td>
              <td className="py-3 px-2">
                <ul className="list-none">
                  <li>{item.so}</li>
                  <li className="text-xs text-gray-600">g/liters</li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  )
}


export default Analytics;