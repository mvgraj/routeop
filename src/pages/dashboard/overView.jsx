import React from 'react'
import { Card, CardBody, Typography } from '@material-tailwind/react';

export function OverView() {
  

  const products = [
    {name:'Name', details:'SR5'},
    {name:'Meter', details:'95,284 mi'},
    {name:'Status', details:'Active',history: 'history'},
    {name:'Group', details:'Austin',history: 'history'},
    {name:'Operator', details:'Lex Waters'},
    {name:'Type', details:'SUV'}

  ]
  return (
    <div className='mt-5'>
        <div className='mt-3 overflow-y-scroll max-h-[660px] rounded-md'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
            <Card className="p-4 " style={{ height : '500px'}}>  
              <div className='flex flex-row justify-between'>
                <Typography variant="h6">Cost of Ownership</Typography>
                <Typography variant="h6" className="text-blue-600 hover:underline cursor-pointer">All Items</Typography>
              </div>
              <div className='mt-4 ms-3 p-3 border rounded flex grid grid-cols-2'>
                <div className='ms-3 border-r'>
                  <Typography style={{ fontWeight: 500}}>Total Costs</Typography>
                  <Typography variant="h5">$372.22</Typography>
                </div>
                <div className='ml-7'>
                  <Typography style={{ fontWeight: 500}}>Cost Per Meter</Typography>
                  <Typography variant="h5">$0.90 <span className='text-'>/ml</span></Typography>
                </div>
              </div>
              <div>
                <Project-cost/>
              </div>
            </Card>
            <Card className="p-4 mt-4" style={{ height : '400px'}}>
              <Typography variant="h6">Details</Typography>
              <div className='overflow-x-hidden'>
                <table className='w-full text-sm text-left text-gray-600'>
                  <thead className='text-lg text-gray-700 mb-5 '>
                    <tr>
                      <th>All Fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product,index) =>(
                      <tr key={index}
                      className='border-b '>
                        <th className='px-2 py-4'>{product.name}</th>
                        <th className='px-6 py-4'>{product.details}</th>
                        <th className='px-6 py-4 text-blue-600'>{product.history}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </Card>
            </div>
           <div>
            <Card className="p-4 h-60" style={{ height : "270px"}}>
              <div className='flex justify-between'>
                <Typography variant="h6">Open Issues</Typography>
                <div className="flex text-blue-600">
                  <Typography variant="h6" className='hover:underline cursor-pointer mr-4' >+ Add Issue</Typography>
                  <Typography variant="h6" className='hover:underline cursor-pointer'>View All</Typography>
                </div>
              </div>
              <div className='overflow-y-scroll h-[400px]'>
              <div className='p-3'>
                  <p style={{ fontWeight: 500}}><span className=' text-blue-600'>#1</span> - Flat tyre</p>
                  <p className='text-gray-600'><span className='font-semibold'>Reported</span> 32 minutes ago by <span className='font-semibold'>Bri P,</span> Nail in the back left tyre. Slow leak</p>
    
                </div>
                <div className='p-3'>
                  <p style={{ fontWeight: 500}}><span className=' text-blue-600'>#2</span> - Flat tyre</p>
                  <p className='text-gray-600'><span className='font-semibold'>Reported</span> 32 minutes ago by <span className='font-semibold'>Bri P,</span> Nail in the back left tyre. Slow leak</p>
    
                </div>
                <div className='p-3'>
                  <p style={{ fontWeight: 500}}><span className=' text-blue-600'>#3</span> - Flat tyre</p>
                  <p className='text-gray-600'><span className='font-semibold'>Reported</span> 32 minutes ago by <span className='font-semibold'>Bri P,</span> Nail in the back left tyre. Slow leak</p>
    
                </div>
                </div>
            </Card>
            <Card className="p-4 h-40 mt-4">
              <div className="flex justify-between">
              <Typography variant="h6">Service Reminders</Typography>
              <div className="flex gap-2 text-blue-600">
              <Typography variant="h6" className='hover:underline cursor-pointer'>+ Add Service Reminder</Typography>
              <Typography variant="h6" className='hover:underline cursor-pointer'>View All</Typography>
              </div>
              </div>
              <div className='flex mt-8 justify-center'>
                <p className='text-gray-600'>
                  There is no Service Reminders due soon for this Vehicle
                </p>
              </div>
            </Card>
            <Card className="p-4 h-60 mt-4">
            <div className="flex justify-center items-center h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.9051038798!2d78.243236602612!3d17.412608636450027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1721726269423!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Card>
            <Card className="p-4 h-[197px] mt-4">
              <div className="flex justify-between">
                <Typography variant="h6">Incomplete Work Orders</Typography>
                  <div className="flex gap-2  text-blue-600">
                    <Typography variant="h6" className='hover:underline cursor-pointer'>+ Add Word Order</Typography>
                    <Typography variant="h6" className='hover:underline cursor-pointer'>View All</Typography>
                  </div>
              </div>
              <div className='flex mt-8 justify-center'>
                <p className='text-gray-600'>
                  There is no Work Orders active for this Vehicle
                </p>
              </div>
              
            </Card>
           </div>
          </div>
          <Card className="mt-4 grid ">
            <CardBody className="flex items-start flex-col space-x-6 p-6 shadow-lg rounded-lg bg-white w-full ">
              <Typography variant="h5" className="text-gray-800 font-medium mb-4">
                What If Analysis
              </Typography>
              <div className="flex gap-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div className='mt-5'>
                  <p className='font-semibold'>Current vehicle:</p>
              <img
                src="/img/truck4.webp"
                alt="Analysis"
                className="h-[250px] w-100 object-cover rounded-lg border border-gray-200 mt-3"
              />
              <p className='font-semibold mt-5'>Truck Name:</p>
              <p className='text-md font-semibold'>RUL: <span className=''>80000KM</span></p>
              <p className='text-md font-semibold'>Resale Value:<span>30000</span></p>
              </div>
              <div className='items-center'>
                  <p className='font-semibold mt-5'>Suggested vehicle: <span>EV</span></p>
              <img
                src="/img/lorry.jpg"
                alt="Analysis"
                className="h-[250px] w-100 object-cover rounded-lg border border-gray-200 mt-3"
              />
              <div className="flex flex-col space-y-1 text-gray-700 w-full max-w-lg mt-4">
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

              </div>
              
              </div>

              <div className="flex flex-col space-y-4 text-gray-700 w-full max-w-lg mt-4">
                <Typography variant="h4" className="text-blue-600 mb-2">
                      Total Cost of Ownership (TCO) Comparison
                    </Typography>
                    <table className="min-w-full bg-white border-y">
                      <thead className='border-y'>
                        <tr>
                          <th className="py-2 px-4 ">Description</th>
                          <th className="py-2 px-4  ">EV Truck</th>
                          <th className="py-2 px-4 ">ICE Truck</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b'>
                          <td className=" px-4 py-2">Initial Purchase Cost</td>
                          <td className=" px-4 py-2">$80,000</td>
                          <td className=" px-4 py-2">$70,000</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">5-year Energy/Fuel Cost</td>
                          <td className="px-4 py-2">$24,000</td>
                          <td className="px-4 py-2">$58,335</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">5-year Maintenance Cost</td>
                          <td className="px-4 py-2">$5,000</td>
                          <td className="px-4 py-2">$15,000</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">5-year Insurance Cost</td>
                          <td className="px-4 py-2">$10,000</td>
                          <td className="px-4 py-2">$12,500</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2">Resale Value (after 5 years)</td>
                          <td className="px-4 py-2">$30,000</td>
                          <td className="px-4 py-2">$20,000</td>
                        </tr>
                        <tr className='border-b'>
                          <td className="px-4 py-2 font-bold">Net TCO (5 years)</td>
                          <td className="px-4 py-2 font-bold">$89,000</td>
                          <td className="px-4 py-2 font-bold">$135,835</td>
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