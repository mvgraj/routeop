import React, { useState, useEffect } from 'react';
import { Card } from "@material-tailwind/react";
import { NavLink, Outlet, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';

export function Vehicle_Analysis() {
  const location = useLocation();
  const [vehicle, setVehicle] = useState(null);
const baseDashboard = location.pathname.includes('school-dashboard')
  ? '/school-dashboard'
  : '/user-dashboard';

  useEffect(() => {
    if (location.state?.vehicle) {
      setVehicle(location.state.vehicle);
    }
  }, [location.state]);

  if (!vehicle) {
    return <div>No vehicle data available</div>;
  }

  return (
    <div className='mt-5'>
      <Link to={`${baseDashboard}/fleet`} className='mb-3 ms-2 cursor-pointer flex items-center'>
        <ArrowBackIcon />
        <span className="ms-2 text-md">Go back</span>
      </Link>

      <Card className="p-4">
        <div className='flex items-center'>
          <img 
            src={vehicle.image || "/images/truck.jpg"} 
            alt='Truck' 
            className='h-12 w-12 rounded-md mr-4' 
          />
          <div>
            <div className='flex gap-3'>
              <h2 className='text-lg font-semibold mb-1'>{vehicle.vehicleNo || 'V001'}</h2>
              <p className={`p-0.5 font-semibold ${vehicle.status === 'Active' ? 'text-green-600' : vehicle.status === 'Maintenance' ? 'text-orange-600' : vehicle.status === 'Available' ? 'text-yellow-600' : ''}`}> · {vehicle.status || 'Active'}</p>
            </div>
            <div className='flex gap-2 text-sm text-gray-600 mb-1'>
              <p>{vehicle.TruckName}</p>
              <p> · {vehicle.year}</p>
              <p>{vehicle.manufacturer}</p>
              <p>· {vehicle.chassisNo}</p>
            </div>
            <div className='flex text-sm'>
              <p className='text-gray-600 mr-6'>95,284 Km </p>
              <p className='text-gray-600 mr-5'>{vehicle.location}</p>
            </div>
          </div>
        </div>
        <div className='mt-6 text-md'>
          <ul className='flex'>
            <li className='mr-10'>
              <NavLink 
                className={({ isActive }) => isActive 
                  ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
                  : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
                to='overview'
                state={{vehicle}}
              >
                Overview
              </NavLink>
            </li>
            <li className='mr-10'>
              <NavLink
                className={({ isActive }) => isActive 
                ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
                : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
                to='serviceHistory'
              >
                Service History
              </NavLink>
            </li>
            <li className='mr-10'>
              <NavLink
                className={({ isActive }) => isActive 
                ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
                : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
                to='fuelHistory'
              >
                Fuel History
              </NavLink>
            </li>
            <li className='mr-10'>
              <NavLink
                className={({ isActive }) => isActive 
                ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
                : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
               to='Emission'
              >
                Emissions
              </NavLink>
            </li>
          </ul>
        </div>
      </Card>
      <div className='mt-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default Vehicle_Analysis;
