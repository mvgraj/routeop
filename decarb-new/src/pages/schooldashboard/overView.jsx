
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import tesla from './img/Dubai-School-buse5.jpg'

export function OverView() {
  
  const [vehicle, setVehicle] = useState(null)
  const location = useLocation();

  useEffect(() => {
    if (location.state?.vehicle){
      setVehicle(location.state.vehicle)
      console.log('overview ',location.state.vehicle)
    }
    console.log('from overview vehicle:',vehicle)
  }, [location.state])

  // Sample bus route data
const routes = [
  {
    routeName: "Route A",
    timing: "7:30 AM - 8:00 AM",
    waypoints: [
      { location: "Pickup-0 (25.24299, 55.43505)", time: "7:30 AM", students: 1 },
      { location: "Pickup-1 (25.24425, 55.43521)", time: "7:32 AM", students: 1 },
      { location: "Pickup-2 (25.24407, 55.43679)", time: "7:34 AM", students: 7 },
      { location: "Pickup-3 (25.24192, 55.43708)", time: "7:36 AM", students: 3 },
      { location: "Pickup-4 (25.24188, 55.43783)", time: "7:38 AM", students: 1 },
    ]
  },
];


  return (
    <div className='mt-5'>
        <div className='mt-3 overflow-y-scroll max-h-[660px] rounded-md'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Card className="p-4" style={{ height: '500px'}}>  
                <div className='flex flex-row justify-between'>
                  <Typography variant="h6">Bus Details</Typography>
                </div>
                <div className='mt-4 ms-3 p-3 border rounded flex grid grid-cols-2'>
                  <div className='ms-3 border-r'>
                    <Typography style={{ fontWeight: 500}}>Capacity</Typography>
                    <Typography variant="h5">{vehicle?.capacity || '50 students'}</Typography>
                  </div>
                  <div className='ml-7'>
                    <Typography style={{ fontWeight: 500}}>Current Mileage</Typography>
                    <Typography variant="h5">{vehicle?.milage || '6.2'} kmpl</Typography>
                  </div>
                </div>
                <div className='ml-7'>
                  <div className="flex flex-col space-y-4 text-gray-700 w-full max-w-lg mt-4">
                    <table className="min-w-full bg-white border-b">
                      <thead className='border-b text-left'>
                        <tr>
                          <th className="py-2 px-4">Detail</th>
                          <th className="py-2 px-4">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b'>
                          <td className="px-4 py-2">Bus Number</td>
                          <td className="px-4 py-2">{vehicle?.vehicleNo || 'DUB-GEMS-001'}</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">Chassis Number</td>
                          <td className="px-4 py-2">{vehicle?.chassisNo || 'ASHLEY-SUN-2018-001'}</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">Fuel Type</td>
                          <td className="px-4 py-2">{vehicle?.fuel || 'Petrol'}</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">Manufacturer</td>
                          <td className="px-4 py-2">{vehicle?.manufacturer || 'Ashok Leyland'}</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">Year</td>
                          <td className="px-4 py-2">{vehicle?.year || '2018'}</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">School</td>
                          <td className="px-4 py-2">{vehicle?.school || 'GEMS Education - Founders School'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
              
            <Card className="p-4 mt-4" style={{ height: '400px' }}>
              <Typography variant="h6">Bus Routes & Timings</Typography>
              <div className='overflow-y-auto h-[300px] mt-2'>
                {routes.map((route, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
                    <Typography variant="h6" className="text-blue-600">{route.routeName}</Typography>
                    <Typography className="text-gray-600 mb-2">{route.timing}</Typography>
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-1 px-2 text-left">Pickup Point</th>
                          <th className="py-1 px-2 text-left">Estimated Time</th>
                          <th className="py-1 px-2 text-left">Students</th>
                        </tr>
                      </thead>
                      <tbody>
                        {route.waypoints.map((waypoint, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="py-1 px-2">{waypoint.location}</td>
                            <td className="py-1 px-2">{waypoint.time}</td>
                            <td className="py-1 px-2">{waypoint.students}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </Card>

            </div>
            
            <div>
              <Card className="p-4" style={{ height: '483px'}}>
                <div className='flex justify-between'>
                  <Typography variant="h6">Bus Route</Typography>
                </div>
                <div className="flex justify-center items-center h-full mt-2">
                  <iframe
                  src="/all_bus_routes.html"
                    width="100%"
                    height="100%"
                    title="Student Road Map"
                    className="border border-gray-300 rounded"
                  />
                </div>
              </Card>
              
              <Card className="p-4 h-40 mt-4">
                <div className="flex justify-between">
                  <Typography variant="h6">Maintenance Status</Typography>
                </div>
                <div className='mt-4'>
                  <Typography>Last Maintenance: {vehicle?.lastMaintenance || '2024-06-30'}</Typography>
                  <Typography className="mt-2">Remaining Useful Life: {vehicle?.RUL || '8000 km'}</Typography>
                </div>
              </Card>
              
              <Card className="p-4 h-60 mt-4">
                <div className="flex justify-between">
                  <Typography variant="h6">Open Issues</Typography>
                </div>
                <div className='overflow-y-scroll h-[180px] mt-2'>
                  <div className='p-3 border-b'>
                    <p style={{ fontWeight: 500}}><span className='text-blue-600'>#1</span> - Engine Check Light</p>
                    <p className='text-gray-600'><span className='font-semibold'>Reported</span> 2 days ago by <span className='font-semibold'>Driver Raj</span></p>
                  </div>
                  <div className='p-3 border-b'>
                    <p style={{ fontWeight: 500}}><span className='text-blue-600'>#2</span> - AC Not Working</p>
                    <p className='text-gray-600'><span className='font-semibold'>Reported</span> 1 week ago by <span className='font-semibold'>Student Parent</span></p>
                  </div>
                  <div className='p-3 border-b'>
                    <p style={{ fontWeight: 500}}><span className='text-blue-600'>#3</span> - Seat Repair Needed</p>
                    <p className='text-gray-600'><span className='font-semibold'>Reported</span> 3 days ago by <span className='font-semibold'>Bus Attendant</span></p>
                  </div>
                </div>
              </Card>
              
              
            </div>
          </div>
          
          <Card className="mt-4 grid">
            <CardBody className="flex items-start flex-col space-x-6 p-6 shadow-lg rounded-lg bg-white w-full">
              <Typography variant="h5" className="font-medium mb-4">
                Bus Efficiency Analysis
              </Typography>
              <div className="flex gap-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div className='mt-5'>
                  <p className='font-semibold'>Current bus:</p>
                  <img
                    src={vehicle?.image || "/img/school-bus-default.jpg"}
                    alt="Current Bus"
                    className="h-[250px] w-100 object-cover rounded-lg border border-gray-200 mt-3"
                  />
                  <p className='mt-5'><span className='font-semibold'>Bus Name: </span>{vehicle?.TruckName || 'Ashok Leyland Sunshine'}</p>
                  <p className='text-md'><span className='font-semibold'>RUL: </span>{vehicle?.RUL || '8000 km'}</p>
                  <p className='text-md'><span className='font-semibold'>Resale Value: </span>{vehicle?.resaleValue || 'AED 65,000'}</p>
                </div>
                
                <div className='items-center'>
                  <p className='font-semibold mt-5'>Suggested upgrade: <span>Electric School Bus</span></p>
                  <img
                    src={tesla}
                    alt="Suggested Bus"
                    className="h-[250px] w-100 object-cover rounded-lg border border-gray-200 mt-3"
                  />
                  <div className="flex flex-col space-y-1 text-gray-700 w-full max-w-lg mt-4">
                    <Typography variant="body1">
                      <strong>Reduced emissions by 100% (Zero tailpipe emissions).</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Reduced fuel cost by 70%.</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Reduced maintenance cost by 50%.</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Quieter operation for better student comfort.</strong>
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 text-gray-700 w-full max-w-lg mt-4">
                  <Typography variant="h6" className="text-blue-600 mt-1 mb-5">
                    Total Cost of Ownership (TCO) Comparison
                  </Typography>
                  <table className="min-w-full bg-white border-y">
                    <thead className='border-y'>
                      <tr>
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4">Electric Bus</th>
                        <th className="py-2 px-4">Current Bus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b'>
                        <td className="px-4 py-2">Initial Purchase Cost</td>
                        <td className="px-4 py-2">AED 300,000</td>
                        <td className="px-4 py-2">AED 150,000</td>
                      </tr>
                      <tr className='border-b'>
                        <td className="px-4 py-2">5-year Energy/Fuel Cost</td>
                        <td className="px-4 py-2">AED 15,000</td>
                        <td className="px-4 py-2">AED 75,000</td>
                      </tr>
                      <tr className='border-b'>
                        <td className="px-4 py-2">5-year Maintenance Cost</td>
                        <td className="px-4 py-2">AED 20,000</td>
                        <td className="px-4 py-2">AED 40,000</td>
                      </tr>
                      <tr className='border-b'>
                        <td className="px-4 py-2">5-year Insurance Cost</td>
                        <td className="px-4 py-2">AED 25,000</td>
                        <td className="px-4 py-2">AED 30,000</td>
                      </tr>
                      <tr className='border-b'>
                        <td className="px-4 py-2">Resale Value (after 5 years)</td>
                        <td className="px-4 py-2">AED 180,000</td>
                        <td className="px-4 py-2">AED 65,000</td>
                      </tr>
                      <tr className='border-b'>
                        <td className="px-4 py-2 font-bold">Net TCO (5 years)</td>
                        <td className="px-4 py-2 font-bold">AED 180,000</td>
                        <td className="px-4 py-2 font-bold">AED 230,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
    </div>
  )
}

export default OverView