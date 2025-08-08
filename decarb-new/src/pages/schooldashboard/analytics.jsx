// import React, { useState } from "react";
// import { Typography } from "@material-tailwind/react";
// import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";
// import 'react-datepicker/dist/react-datepicker.css';
// import { useNavigate } from "react-router-dom";
// import schoolBus1 from "./img/Dubai-School-buse1.jpg";
// import schoolBus2 from "./img/Dubai-School-buse3.webp"
// import schoolBus3 from "./img/Dubai-School-buse2.jpg"
// import schoolBus4 from "./img/Dubai-School-buse4.jpg"

// // Register Chart.js components
// ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

// // Dummy data for trips
// const trips = [
//   {
//     tripId: "TRP-2024-005",
//     tripNumber: 5,
//     vehicleNo: "DUB-GEMS-001",
//     image: schoolBus1,
//     date: "2024-07-03",
//     capacity: 20,
//     emissions: "142 g/km",
//     mileage: "6.6 km/l",
//     startLocation: "Al Barsha South",
//     endLocation: "GEMS Founders School",
//     distance: "12.5 km",
//     duration: "36 mins"
//   },
//   {
//     tripId: "TRP-2024-006",
//     tripNumber: 6,
//     vehicleNo: "DUB-GEMS-002",
//     image: schoolBus2,
//     date: "2024-07-03",
//     capacity: 26,
//     emissions: "158 g/km",
//     mileage: "6.1 km/l",
//     startLocation: "Al Barsha 1",
//     endLocation: "GEMS World Academy",
//     distance: "10.8 km",
//     duration: "31 mins"
//   }
// ];

// function Analytics() {
//   const navigate = useNavigate();
//   const navigatetoheader = (trip) => {
//     navigate("/school-dashboard/report_overview", {state: {trip}});
//   };
  
//   return (
//     <div className="p-4">
//       <Typography variant="h4" className="mb-6">
//         Trip Reports
//       </Typography>
//       <div className="rounded-xl bg-white p-3">
//         <table className="min-w-full bg-white rounded-xl">
//           <thead className="text-left font-semibold text-gray-800 text-sm">
//             <tr className="border-y">
//               <th className="px-6 py-3">Trip</th>
//               <th className="px-6 py-4">Trip ID</th>
//               <th className="px-6 py-3">Date</th>
//               <th className="px-6 py-3">Students</th>
//               <th className="px-6 py-3">Distance</th>
//               <th className="px-6 py-3">Time</th>
         
              
//             </tr>
//           </thead>
//           <tbody className="text-xs">
//             {trips.map((trip, index) => (
//               <tr className="text-sm text-gray-800 border-b hover:bg-gray-50 cursor-pointer" 
//                   key={index} onClick={() => navigatetoheader(trip)}>
//                     <td className="px-6 py-3">{trip.tripNumber}</td>
//                 <td className="px-6 py-3">{trip.tripId}</td>
//                 <td className="px-6 py-3">{trip.date}</td>
//                 <td className="px-6 py-3">{trip.capacity}</td>
//                 <td className="px-6 py-3">{trip.distance}</td>
//                 <td className="px-6 py-3">{trip.duration}</td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Analytics;

import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();
  const [routesData, setRoutesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("http://13.202.84.210:3002/routes");
        const data = await res.json();
        setRoutesData(data);
      } catch (error) {
        console.error("Failed to fetch trip data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const navigateToTrip = (tripId, trip) => {
    navigate("/school-dashboard/report_overview", { state: { tripId, trip } });
  };

  const getFilteredParams = (params) => {
    const excluded = ["bus_capacities"];
    return Object.entries(params || {}).filter(([key]) => !excluded.includes(key));
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-6">
        Trip Reports
      </Typography>

      {loading ? (
        <p className="text-gray-600">Loading trips...</p>
      ) : Object.keys(routesData).length === 0 ? (
        <p className="text-gray-600">No trip data found.</p>
      ) : (
        <div className="rounded-xl bg-white p-3 overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Trip ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Students</th>
                <th className="px-4 py-3">Clusters</th>
                <th className="px-4 py-3">Buses</th>
                {/* Dynamic parameter headers */}
                {getFilteredParams(Object.values(routesData)[0]?.parameters).map(
                  ([key]) => (
                    <th key={key} className="px-4 py-3 capitalize">
                      {key.replace(/_/g, " ")}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(routesData).map(([tripId, trip], index) => (
                <tr
                  key={tripId}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigateToTrip(tripId, trip)}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{tripId}</td>
                  <td className="px-4 py-3">
                    {trip.timestamp?.split("T")[0] ?? "--"}
                  </td>
                  <td className="px-4 py-3">
                    {trip.statistics?.total_students ?? "--"}
                  </td>
                  <td className="px-4 py-3">
                    {trip.statistics?.total_clusters ?? "--"}
                  </td>
                  <td className="px-4 py-3">
                    {trip.statistics?.total_buses ?? "--"}
                  </td>
                  {/* Render each filtered param */}
                  {getFilteredParams(trip.parameters).map(([key, value]) => (
                    <td key={key} className="px-4 py-3">
                      {value.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Analytics;
