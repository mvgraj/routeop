import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import schoolBus1 from "./img/Dubai-School-buse1.jpg"; // fallback
import schoolBus2 from "./img/Dubai-School-buse3.webp"; // fallback

function TotalBus() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const buses = state?.buses || [];
  const tripId = state?.tripId;

  const handleBusClick = (bus) => {
    navigate("/school-dashboard/bus_overview", {
      state: { bus, tripId },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 mt-5">
        <p
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          ← Back
        </p>
        <h1 className="text-2xl font-bold text-gray-800">Total Buses</h1>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-left bg-white border rounded-xl">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2">Bus Number</th>
              <th className="px-4 py-2">Bus ID</th>
              <th className="px-4 py-2">Bus Capacity</th>
              <th className="px-4 py-2">Total Students</th>
              <th className="px-4 py-2">Distance (km)</th>
              <th className="px-4 py-2">Duration (min)</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {buses.map((bus, i) => (
              <tr
                key={i}
                onClick={() => handleBusClick(bus)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2">{bus["Bus Number"]}</td>
                <td className="px-4 py-2">{bus["Bus ID"]}</td>
                <td className="px-4 py-2">{bus["Bus Capacity"]}</td>
                <td className="px-4 py-2">{bus["Total Students"]}</td>
                <td className="px-4 py-2">{bus["Total Distance (km)"]}</td>
                <td className="px-4 py-2">{bus["Estimated Duration (min)"]}</td>
                <td className="px-4 py-2">{bus["Start Time"]}</td>
                <td className="px-4 py-2">{bus["End Time"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalBus;
