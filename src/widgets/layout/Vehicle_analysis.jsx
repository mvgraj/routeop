// import React from 'react';
// import { Card } from "@material-tailwind/react";
// import img from '../../pages/dashboard/img/truck.jpg';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// export function Vehicle_Analysis() {
//   const navigate = useNavigate();

//   const navigateBack = () => {
//     console.log("Navigating to /fleet");
//     navigate('/fleet'); // Navigate to the fleet page
//   };

//   return (
//     <div className='mt-5'>
//       <div className='mb-3 ms-2 cursor-pointer flex items-center' onClick={navigateBack}>
//         <ArrowBackIcon />
//         <span className="ms-2 text-md">
//           Go back
//         </span>
//       </div>
//       <Card className="p-4">
//         <div className='flex items-center'>
//           <img src={img} alt='IMG' className='h-12 w-12 rounded-md mr-4' />
//           <div>
//             <div className='flex gap-3'>
//               <h2 className='text-lg font-semibold mb-1'>Vehicle Name</h2>
//               <p className='text-green-700 p-0.5 font-semibold'> · Active</p>
//             </div>
//             <p className='text-gray-600 mb-1 text-sm'>SUV · 2012 Nissan Pathfinder · 5N1AR1NB7CC614990</p>
//             <div className='flex text-sm'>
//               <p className='text-gray-600 mr-6'>95,284 mi </p>
//               <p className='text-gray-600 mr-5'>Austin</p>
//               <p className='text-gray-600 mr-5'> Lex Water</p>
//             </div>
//           </div>
//         </div>
//         <div className='mt-6 text-md'>
//           <ul className='flex'>
//             <li className='mr-10'>
//               <NavLink 
//                 className={({ isActive }) => isActive 
//                   ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
//                   : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
//                 to='overview'
//               >
//                 Overview
//               </NavLink>
//             </li>
//             <li className='mr-10'>
//               <NavLink
//                 className={({ isActive }) => isActive 
//                 ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
//                 : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
//                 to='serviceHistory'
//               >
//                 Service History
//               </NavLink>
//             </li>
//             <li className='mr-10'>
//               <NavLink
//                 className={({ isActive }) => isActive 
//                 ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
//                 : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
//                 to='fuelHistory'
//               >
//                 Fuel History
//               </NavLink>
//             </li>
//             <li className='mr-10'>
//               <NavLink
//                 className={({ isActive }) => isActive 
//                 ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
//                 : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
//                 to='workOrders'
//               >
//                 Work Orders
//               </NavLink>
//             </li>
//             <li className='mr-10'>
//               <NavLink
//                 className={({ isActive }) => isActive 
//                 ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
//                 : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
//                to='cost'
//               >
//                 Costs
//               </NavLink>
//             </li>
//             <li className='mr-10'>
//               <NavLink
//                 className={({ isActive }) => isActive 
//                 ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
//                 : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
//                to='Emission'
//               >
//                 Emissions
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </Card>
//       <div className='mt-4'>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Vehicle_Analysis;


import React from 'react';
import { Card } from "@material-tailwind/react";
import img from '../../pages/dashboard/img/truck.jpg';
import { NavLink, Outlet, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function Vehicle_Analysis() {
  return (
    <div className='mt-5'>
      <Link to="/dashboard/fleet" className='mb-3 ms-2 cursor-pointer flex items-center'>
        <ArrowBackIcon />
        <span className="ms-2 text-md">
          Go back
        </span>
      </Link>
      <Card className="p-4">
        <div className='flex items-center'>
          <img src={img} alt='IMG' className='h-12 w-12 rounded-md mr-4' />
          <div>
            <div className='flex gap-3'>
              <h2 className='text-lg font-semibold mb-1'>Vehicle Name</h2>
              <p className='text-green-700 p-0.5 font-semibold'> · Active</p>
            </div>
            <p className='text-gray-600 mb-1 text-sm'>SUV · 2012 Nissan Pathfinder · 5N1AR1NB7CC614990</p>
            <div className='flex text-sm'>
              <p className='text-gray-600 mr-6'>95,284 mi </p>
              <p className='text-gray-600 mr-5'>Austin</p>
              <p className='text-gray-600 mr-5'> Lex Water</p>
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
                to='workOrders'
              >
                Work Orders
              </NavLink>
            </li>
            <li className='mr-10'>
              <NavLink
                className={({ isActive }) => isActive 
                ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
                : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
               to='cost'
              >
                Costs
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
            {/* <li className='mr-10'>
              <NavLink
                className={({ isActive }) => isActive 
                ? 'text-blue-800 cursor-pointer border-b-2 border-blue-800 font-semibold' 
                : 'text-gray-800 cursor-pointer hover:text-blue-800 hover:font-semibold'}
               to='documents'
              >
                Documents
              </NavLink>
            </li> */}
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
