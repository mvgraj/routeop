
import { Card, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function Fleet_overview() {
  const { state: vehicle } = useLocation();
  const navigate = useNavigate();
   

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {/* Left: Bus Type Summary */}
  <Card className="p-6 h-auto col-span-1 shadow-md bg-gray-50">
  <Typography variant="h6" className="mb-3 text-blue-800">Vehicle Summary</Typography>

  {/* Capacity and Total Buses */}
  <div className='ms-3 p-3 border rounded flex grid grid-cols-2'>
    <div className='ms-3 border-r'>
      <Typography style={{ fontWeight: 500 }}>Capacity</Typography>
      <Typography variant="h5">{vehicle?.capacity || '50 students'}</Typography>
    </div>
    <div className='ml-7'>
      <Typography style={{ fontWeight: 500 }}>Total Buses</Typography>
      <Typography variant="h5">{vehicle?.totalVehicles || '6.2'}</Typography>
    </div>
  </div>

  {/* Status Section */}
  <div className="mb-4">
    <Typography variant="h6" className="mb-3 mt-3 text-blue-800">Status</Typography>
    <div className='ms-3 p-3 border rounded grid grid-cols-3 gap-4'>
      <div className='text-center border-r'>
                    <Typography style={{ fontWeight: 500 }}>Active</Typography>
            <Typography variant="h5">{vehicle.statusSummary.Active}</Typography>
          </div>
          <div className='text-center border-r'>
            <Typography style={{ fontWeight: 500 }}>Maintenance</Typography>
            <Typography variant="h5">{vehicle.statusSummary.Maintenance}</Typography>
          </div>
          <div className='text-center'>
            <Typography style={{ fontWeight: 500 }}>Available</Typography>
            <Typography variant="h5">{vehicle.statusSummary.Available}</Typography>
      </div>
    </div>
  </div>

<Typography variant="h6" className="mb-3 text-blue-800">Fleet</Typography>
  <div className='ms-3 p-3 border rounded grid grid-cols-2 gap-4'>

    <div>
      <Typography style={{ fontWeight: 500 }}>Fuel Type</Typography>
      <Typography variant="h6">{vehicle?.fuelType || 'Diesel'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Avg. Mileage</Typography>
      <Typography variant="h6">{vehicle?.averageMileage || '6.5 km/l'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Total Drivers</Typography>
      <Typography variant="h6">{vehicle?.totalDrivers || '5'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Avg. Emission</Typography>
      <Typography variant="h6">{vehicle?.emission || '1080 g/km'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Total Distance Covered</Typography>
      <Typography variant="h6">{vehicle?.totalDistance || '87,000 km'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Total Fuel Consumed</Typography>
      <Typography variant="h6">{vehicle?.totalFuel || '13,385 litres'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Avg. Age of Fleet</Typography>
      <Typography variant="h6">{vehicle?.averageAge || '4.2 years'}</Typography>
    </div>

    <div>
      <Typography style={{ fontWeight: 500 }}>Fleet Utilization</Typography>
      <Typography variant="h6">{vehicle?.utilization || '86%'}</Typography>
    </div>

  </div>
</Card>

      {/* Right: Bus Route Map */}
      <Card className="p-4 h-[683px] col-span-2">
        <div className="flex justify-between mb-2">
          <Typography variant="h6">Bus Routes</Typography>
        </div>
        <div className="flex justify-center items-center h-full">
          <iframe
            src="/students_road_map.html"
            width="100%"
            height="100%"
            title="Student Road Map"
            className="border border-gray-300 rounded"
          />
        </div>
      </Card>
</div>
    </div>
  );
}

export default Fleet_overview;
