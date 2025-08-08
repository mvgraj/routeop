import React from 'react';
import {Card} from '@material-tailwind/react'

export function ServiceHistory() {
  return (
    
    <div className='mt-5'>
      <Card className="mt-3 p-3 h-700" style={{ height : '648px'}}> 
      <div className='flex gap-3'>
        <input 
        type='text'
        placeholder='Search'
        className='border-none ring-gray-300 ring-2 rounded-2xl px-3 py-1 pr-5 pl-5 focus:ring-gray-500'
        />
    </div>
      <div className='mt-7'>
        <table className='w-full text-sm'>
          <thead className='border-y text-left'>
            <tr className='px-3 py-5'>
              <th className='px-2 py-4'>Work Id</th>
              <th className='px-2 py-4'>Completed</th>
              <th className='px-2 py-4'>Meter</th>
              <th className='px-2 py-4'>Service Tasks</th>
              <th className='px-5 py-4'>Issuses</th>
              <th className='px-6 py-4'>Vendor</th>
              <th className='px-2 py-4'>Labels</th>
              <th className='px-2 py-4'>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='ps-4 py-4'>SB1092</td>
              <td className='px-2 py-4'>05/16/2023</td>
              <td className='px-2 py-4'>95,284 mi</td>
              <td className='px-2 py-4'>
                <ul>
                  <li>Tire Rotation</li>
                  <li>Engine Oil & Filter Replacement</li>
                  <li>Brake Inspection</li>
                  <li>Emergency Exit Function Test</li>
                  <li>First Aid Kit Inspection</li>
                  <li>Student Seating Inspection</li>
                </ul>
              </td>
              <td className=' py-4'>
                <ul>
                <li>Worn brake pads replaced</li>
                <li>Emergency exit alarm not working - fixed</li>
                <li>AC filter replacement</li>
                </ul>
              </td>
            
              <td className='ps-2 py-4'>Gulf Bus Services</td>
              <td className='px-2 py-4'><span className="badge badge-secondary">Preventative Maintenance</span></td>
              <td className='px-2 py-4'>280.90</td>
            </tr>
          </tbody>
        </table>
      </div>
      </Card>
    </div>
  );
}

export default ServiceHistory;