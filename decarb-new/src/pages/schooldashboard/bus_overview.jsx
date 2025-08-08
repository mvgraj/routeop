import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "http://13.202.84.210:3002";

function Bus_overview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const bus = state?.bus;
  const tripId = state?.tripId;

  const [csvData, setCsvData] = useState([]);

useEffect(() => {
  if (tripId && bus?.["Bus ID"]) {
    const csvFile = `trips/${bus["Bus ID"]}_summary.csv`;
    fetch(`${API_BASE}/download_file/${tripId}/${csvFile}`)
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split("\n").map(r => r.split(","));
        const header = rows[0];
        const routeMapUrlIndex = header.indexOf("Route Map URL");

        const filteredRows = rows.map(row => 
          row.filter((_, idx) => idx !== routeMapUrlIndex)
        );

        setCsvData(filteredRows);
      })
      .catch(err => console.error("Failed to load CSV:", err));
  }
}, [tripId, bus]);


  if (!bus) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>No bus data provided.</p>
        <button
          onClick={() => navigate("/school-dashboard/totalbus")}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Go back to Total Buses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Bus Overview</h1>
        <div/>
      </div>

      {/* Bus Details */}
      <div className="bg-white border shadow-md rounded-xl p-6">
        {/* Route Map */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Route Map</h2>
          <iframe
            src={`${API_BASE}/download_file/${tripId}/trips/${bus["Bus ID"]}_route_map.html`}
            title="Bus Route Map"
            className="w-full h-[450px] border rounded"
            sandbox="allow-scripts allow-same-origin"
            allowFullScreen
          />
        </div>

        {/* Summary CSV */}
        {csvData.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Summary Table</h2>
            <div className="overflow-auto border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {csvData[0].map((head, idx) => (
                      <th key={idx} className="px-3 py-2 border">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-t">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-3 py-2 border">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bus_overview;
