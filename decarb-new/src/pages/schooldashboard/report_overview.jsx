// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Typography, Card, CardBody } from "@material-tailwind/react";
// import { useNavigate } from 'react-router-dom';
// import {  Button } from "@material-tailwind/react";
// import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
// function Report_overview() {
//   const { state } = useLocation();
//   const { trip } = state || {};
//   const navigate = useNavigate();
// const [open,setOpen] = useState(false)
// const [htmlSrc, setHtmlSrc] = useState("");
//   // Sample student assignment data with coordinates for map view

//     const handleOpen = (src) => {
//     setHtmlSrc(src);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setHtmlSrc("");
//   };

//   const studentAssignments = [
//     { 
//       id: 1, 
//       name: "Ahmed Mohammed", 
//       grade: "5", 
//       pickup: "Al Barsha Mall", 
//       dropoff: "Main Gate", 
//       assignedSeat: "A12",
//       pickupCoords: { lat: 25.1193, lng: 55.2012 },
//       dropoffCoords: { lat: 25.1185, lng: 55.2020 }
//     },
//     { 
//       id: 2, 
//       name: "Fatima Ali", 
//       grade: "4", 
//       pickup: "Al Barsha Park", 
//       dropoff: "North Gate", 
//       assignedSeat: "B05",
//       pickupCoords: { lat: 25.1205, lng: 55.1998 },
//       dropoffCoords: { lat: 25.1190, lng: 55.2030 }
//     },
//     { 
//       id: 3, 
//       name: "Youssef Ibrahim", 
//       grade: "6", 
//       pickup: "Al Barsha South", 
//       dropoff: "Main Gate", 
//       assignedSeat: "A08",
//       pickupCoords: { lat: 25.1178, lng: 55.2005 },
//       dropoffCoords: { lat: 25.1185, lng: 55.2020 }
//     },
//     { 
//       id: 4, 
//       name: "Layla Hassan", 
//       grade: "5", 
//       pickup: "Al Barsha 1", 
//       dropoff: "South Gate", 
//       assignedSeat: "C12",
//       pickupCoords: { lat: 25.1210, lng: 55.1985 },
//       dropoffCoords: { lat: 25.1175, lng: 55.2015 }
//     },
//     { 
//       id: 5, 
//       name: "Omar Abdullah", 
//       grade: "3", 
//       pickup: "Al Barsha Heights", 
//       dropoff: "Main Gate", 
//       assignedSeat: "B02",
//       pickupCoords: { lat: 25.1220, lng: 55.1975 },
//       dropoffCoords: { lat: 25.1185, lng: 55.2020 }
//     }
//   ];

//   // Generate CSV content
//   const generateCSV = () => {
//     const headers = ['id', 'name', 'grade', 'pickup', 'dropoff', 'assignedSeat'].join(',');
//     const rows = studentAssignments.map(student => 
//       [student.id, student.name, student.grade, student.pickup, student.dropoff, student.assignedSeat].join(',')
//     ).join('\n');
//     return `${headers}\n${rows}`;
//   };

//   return (
//     <div className="p-1">
//         <p onClick={() => navigate(-1)} className="cursor-pointer text-blue-500 hover:underline ml-2">
//         Back
//         </p>
//         <div className='p-2'>
//       {trip ? (
//         <>
//           <div className="mb-8">
//             <Typography variant="h3" className="mb-2">Trip Overview</Typography>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//               <Card className="shadow-sm">
//                 <CardBody>
//                   <Typography variant="h6" color="blue-gray">Trip ID</Typography>
//                   <Typography variant="paragraph">{trip.tripId}</Typography>
//                 </CardBody>
//               </Card>
//               <Card className="shadow-sm">
//                 <CardBody>
//                   <Typography variant="h6" color="blue-gray">Date</Typography>
//                   <Typography variant="paragraph">{trip.date}</Typography>
//                 </CardBody>
//               </Card>
//               <Card className="shadow-sm">
//                 <CardBody>
//                   <Typography variant="h6" color="blue-gray">Total Students</Typography>
//                   <Typography variant="paragraph">{trip.capacity}</Typography>
//                 </CardBody>
//               </Card>
//             <Card className="shadow-sm">
//                 <CardBody>
//                   <Typography variant="h6" color="blue-gray">Distance</Typography>
//                   <Typography variant="paragraph">{trip.distance}</Typography>
//                 </CardBody>
//               </Card>
//               <Card className="shadow-sm">
//                 <CardBody>
//                   <Typography variant="h6" color="blue-gray">Total Bus</Typography>
//                   <Typography variant="paragraph">20</Typography>
//                 </CardBody>
//               </Card>
//                 <Card className="shadow-sm">
//                 <CardBody>
//                   <Typography variant="h6" color="blue-gray">Total Time</Typography>
//                   <Typography variant="paragraph">{trip.duration}</Typography>
//                 </CardBody>
//               </Card>
             
//             </div>
//           </div>

//           <Typography variant="h4" className="mb-4">Student Assignments</Typography>
          
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// <Card className="h-full shadow-sm border border-gray-200">
//   <CardBody>
//     {/* CSV Format Heading */}
//     <div className="flex justify-between items-center mb-6">
//       <Typography variant="h5" className="text-xl font-semibold text-gray-800">
//         CSV Format
//       </Typography>
//     </div>

//     {/* Map Buttons */}
//     <div className="flex flex-col gap-4">
//       <Button
//         onClick={() => handleOpen("/all_bus_routes.html")}
//         className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
//       >
//         🚌 All Bus Routes
//       </Button>

//       <Button
//         onClick={() => handleOpen("/student_clusters_map.html")}
//         className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow"
//       >
//         🗺️ Student Clusters Map
//       </Button>

//       <Button
//         onClick={() => handleOpen("/student_locations.html")}
//         className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded shadow"
//       >
//         📍 Student Locations
//       </Button>
//     </div>

//     {/* Trip Summary */}
    // <div className="mt-6">
    //   <Typography variant="h5" className="text-xl font-semibold text-gray-800 mb-2">
    //     Trip Summary
    //   </Typography>

    //   <div className="text-gray-700 text-sm space-y-1">
    //     <p><span className="font-medium">Trip ID:</span> {trip?.tripId}</p>
    //     <p><span className="font-medium">Vehicle:</span> {trip?.vehicleNo}</p>
    //     <p><span className="font-medium">Date:</span> {trip?.date}</p>
    //     <p><span className="font-medium">Distance:</span> {trip?.distance}</p>
    //     <p><span className="font-medium">Duration:</span> {trip?.duration}</p>
    //     <p><span className="font-medium">Route:</span> {trip?.startLocation} ➝ {trip?.endLocation}</p>
    //   </div>

    //   <p
    //     onClick={() => navigate('/school-dashboard/totalbus')}
    //     className="cursor-pointer text-blue-600 hover:underline mt-4 inline-block"
    //   >
    //     View All Buses
    //   </p>
//     </div>
//   </CardBody>
// </Card>


//     <Dialog size="xl" open={open} handler={handleClose}>
//         <DialogHeader>HTML Preview</DialogHeader>
//         <DialogBody className="h-[80vh]">
//           <iframe src={htmlSrc} className="w-full h-full" title="HTML Preview" />
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="gradient" color="red" onClick={handleClose}>
//             Close
//           </Button>
//         </DialogFooter>
//       </Dialog>


//             {/* Map View */}
//             <Card className="h-full shadow-sm">
//               <CardBody>
//                 <Typography variant="h5" className="mb-4">Route Map View</Typography>
//                 <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
//                   {/* This would be replaced with your actual map component */}
//                   <iframe
//                     src="/all_bus_routes.html"
//                     width="100%"
//                     height="100%"
//                     title="Student Road Map"
//                     className="border border-gray-300 rounded"
//                 />
                  
//                 </div>
//               </CardBody>
//             </Card>
//           </div>

//           {/* Trip Metrics (same as before) */}
//        <div className="mt-8">
//   <Typography variant="h4" className="mb-4">Trip Metrics</Typography>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm">
//     <div className="p-4 border rounded shadow-sm">
//       <strong>Bus Capacities:</strong> 21, 32, 45
//     </div>
//     <div className="p-4 border rounded shadow-sm">
//       <strong>Min Fill Ratio:</strong> 0.8
//     </div>
//     <div className="p-4 border rounded shadow-sm">
//       <strong>Max Distance:</strong> 2 km
//     </div>
//     <div className="p-4 border rounded shadow-sm">
//       <strong>Avg Speed:</strong> 60 km/h
//     </div>
//     <div className="p-4 border rounded shadow-sm">
//       <strong>Stop Time:</strong> 60 sec
//     </div>
//     <div className="p-4 border rounded shadow-sm">
//       <strong>Start Time:</strong> 07:00
//     </div>
//   </div>
// </div>

//         </>
//       ) : (
//         <Typography variant="h4" color="red">No trip data available. Please select a trip from the reports page.</Typography>
//       )}
//       </div>
//     </div>
//   );
// }

// export default Report_overview;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Typography, Card, CardBody, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

// function Report_overview() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const tripId = state?.tripId;
//   const [trip, setTrip] = useState(state?.trip || null);
//   const [loading, setLoading] = useState(!state?.trip);
//   const [open, setOpen] = useState(false);
//   const [htmlSrc, setHtmlSrc] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalContent, setModalContent] = useState("");
//   const [csvData, setCsvData] = useState([]);
//   const [isHtml, setIsHtml] = useState(false);
//   useEffect(() => {
//     if (!trip && tripId) {
//       const fetchTripData = async () => {
//         try {
//           const res = await fetch("http://13.202.84.210:3002/routes");
//           const data = await res.json();
//           if (data[tripId]) {
//             setTrip({ ...data[tripId], tripId });
//           }
//         } catch (err) {
//           console.error("Failed to load trip data:", err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchTripData();
//     }
//   }, [trip, tripId]);

// const handleViewMap = async (url, downloadName) => {
//   setModalTitle(downloadName);
//   try {
//     const res = await fetch(url);
//     const contentType = res.headers.get("content-type");
//     const text = await res.text();

//     if (contentType.includes("text/html")) {
//       setIsHtml(true);
//       setModalContent(text);
//       setCsvData([]);
//     } else if (downloadName.endsWith(".csv")) {
//       const rows = text.trim().split("\n").map((row) => row.split(","));
//       setIsHtml(false);
//       setCsvData(rows);
//       setModalContent("");
//     } else {
//       setIsHtml(false);
//       setModalContent(text);
//       setCsvData([]);
//     }

//     setModalOpen(true);
//   } catch (err) {
//     console.error("Failed to load file:", err);
//   }
// };

// const handleCloseModal = () => {
//   setModalOpen(false);
//   setModalTitle("");
//   setModalContent("");
//   setCsvData([]);
//   setIsHtml(false);
// };

//   const handleOpen = (src) => {
//     setHtmlSrc(src);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setHtmlSrc("");
//   };

//   const parameters = trip?.parameters || {};
//   console.log(trip)
//   return (
//     <div className="p-1">
//       <p onClick={() => navigate(-1)} className="cursor-pointer text-blue-500 hover:underline ml-2">Back</p>
//       <div className='p-2'>
//         {loading ? (
//           <Typography variant="h5" className="text-gray-500">Loading trip details...</Typography>
//         ) : trip ? (
//           <>
//             <div className="mb-8">
//               <Typography variant="h3" className="mb-2">Trip Overview</Typography>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//                 <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Trip ID</Typography><Typography variant="paragraph">{state?.tripId}</Typography></CardBody></Card>
//                 <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Date</Typography><Typography variant="paragraph">{trip.timestamp?.split("T")[0]}</Typography></CardBody></Card>
//                 <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Total Students</Typography><Typography variant="paragraph">{trip.statistics?.total_students}</Typography></CardBody></Card>
//                 <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Distance</Typography><Typography variant="paragraph">{trip.statistics?.total_distance_km}</Typography></CardBody></Card>
//                 <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Total Bus</Typography><Typography variant="paragraph">{trip.statistics?.total_buses}</Typography></CardBody></Card>
//                 <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Total Time</Typography><Typography variant="paragraph">{trip.statistics?.total_duration_min}</Typography></CardBody></Card>
//               </div>
//             </div>

//             <Typography variant="h4" className="mb-4">Student Assignments</Typography>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card className="h-full shadow-sm border border-gray-200">
//                 <CardBody>
//                   <div className="flex justify-between items-center mb-6">
//                     <Typography variant="h5" className="text-xl font-semibold text-gray-800">CSV Format</Typography>
//                   </div>

//             <div className="flex flex-col gap-4">
//   {trip?.files?.map((file, idx) => {
//     let label = "";
//     let color = "bg-gray-600";

//     if (file.includes("all_bus_routes")) {
//       label = "🚌 All Bus Routes";
//       color = "bg-blue-600 hover:bg-blue-700";
//     } else if (file.includes("student_clusters_map")) {
//       label = "🗺️ Student Clusters Map";
//       color = "bg-green-600 hover:bg-green-700";
//     } else if (file.includes("student_locations")) {
//       label = "📍 Student Locations";
//       color = "bg-purple-600 hover:bg-purple-700";
//     } else if (file.endsWith(".csv")) {
//       label = `📄 ${file}`;
//       color = "bg-indigo-600 hover:bg-indigo-700";
//     }

//     return (
//       <Button
//         key={idx}
//         onClick={() => handleViewMap(`/${file}`, file)}
//         className={`${color} text-white py-2 px-4 rounded shadow text-left`}
//       >
//         {label}
//       </Button>
//     );
//   })}
// </div>



//                   <div className="mt-6">
//                     <Typography variant="h5" className="text-xl font-semibold text-gray-800 mb-2">Trip Summary</Typography>
//                     <div className="text-gray-700 text-sm space-y-1">
//                       <p><span className="font-medium">Trip ID:</span> {trip?.tripId}</p>
//                       <p><span className="font-medium">Date:</span> {trip?.timestamp?.split("T")[0]}</p>
//                     </div>
//                     <p onClick={() => navigate('/school-dashboard/totalbus')} className="cursor-pointer text-blue-600 hover:underline mt-4 inline-block">View All Buses</p>
//                   </div>
//                 </CardBody>
//               </Card>

//               <Dialog size="xl" open={modalOpen} handler={handleCloseModal}>
//   <DialogHeader>{modalTitle}</DialogHeader>
//   <DialogBody className="h-[80vh] overflow-auto">
//     {isHtml ? (
//       <iframe
//         srcDoc={modalContent}
//         title="HTML Preview"
//         className="w-full h-full border border-gray-300 rounded"
//       />
//     ) : csvData.length > 0 ? (
//       <div className="overflow-auto max-h-[70vh]">
//         <table className="w-full border border-gray-300 text-sm text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               {csvData[0]?.map((header, i) => (
//                 <th key={i} className="border px-2 py-1 font-semibold">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {csvData.slice(1).map((row, i) => (
//               <tr key={i}>
//                 {row.map((cell, j) => (
//                   <td key={j} className="border px-2 py-1">
//                     {cell}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     ) : (
//       <pre className="text-sm whitespace-pre-wrap">{modalContent}</pre>
//     )}
//   </DialogBody>
//   <DialogFooter>
//     <Button variant="gradient" color="red" onClick={handleCloseModal}>
//       Close
//     </Button>
//   </DialogFooter>
// </Dialog>


//               <Card className="h-full shadow-sm">
//                 <CardBody>
//                   <Typography variant="h5" className="mb-4">Route Map View</Typography>
//                   <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
//                     <iframe
//                         src={`http://13.202.84.210:3002/download_file/${tripId}/all_bus_routes.html`}
//                         width="100%"
//                         height="100%"
//                         title="Student Road Map"
//                         className="border border-gray-300 rounded"
//                       />

//                   </div>
//                 </CardBody>
//               </Card>
//             </div>

//             <div className="mt-8">
//               <Typography variant="h4" className="mb-4">Trip Metrics</Typography>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm">
//                 <div className="p-4 border rounded shadow-sm"><strong>Bus Capacities:</strong> {parameters.bus_capacities || '--'}</div>
//                 {Object.entries(parameters).filter(([key]) => key !== "bus_capacities").map(([key, value]) => (
//                   <div key={key} className="p-4 border rounded shadow-sm">
//                     <strong>{key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value.toString()}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <Typography variant="h4" color="red">No trip data available. Please select a trip from the reports page.</Typography>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Report_overview;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";

const API_BASE = "http://13.202.84.210:3002";

function Report_overview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tripId = state?.tripId;
  const [trip, setTrip] = useState(state?.trip || null);
  const [loading, setLoading] = useState(!state?.trip);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [isHtml, setIsHtml] = useState(false);

  useEffect(() => {
    if (!trip && tripId) {
      fetch(`${API_BASE}/routes`)
        .then(res => res.json())
        .then(data => {
          if (data[tripId]) setTrip({ ...data[tripId], tripId });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [trip, tripId]);

  const handleViewMap = async (fileName) => {
    const url = `${API_BASE}/download_file/${tripId}/${fileName}`;
    setModalTitle(fileName);
    try {
      const res = await fetch(url);
      const ct = res.headers.get("content-type") || "";
      const text = await res.text();

      if (ct.includes("html")) {
        setIsHtml(true);
        setModalContent(text);
        setCsvData([]);
      } else if (fileName.endsWith(".csv")) {
        const rows = text.trim().split("\n").map(r => r.split(","));
        setIsHtml(false);
        setCsvData(rows);
        setModalContent("");
      } else {
        setIsHtml(false);
        setModalContent(text);
        setCsvData([]);
      }
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to load file:", err);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalTitle("");
    setModalContent("");
    setCsvData([]);
    setIsHtml(false);
  };

  const parameters = trip?.parameters || {};

  return (
    <div className="p-4">
      <Button variant="text" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      {loading ? (
        <Typography variant="h5" color="gray">
          Loading trip…
        </Typography>
      ) : trip ? (
        <>
          <Typography variant="h3" className="mb-4">Trip Overview</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Trip ID</Typography><Typography variant="paragraph">{state?.tripId}</Typography></CardBody></Card>
          <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Date</Typography><Typography variant="paragraph">{trip.timestamp?.split("T")[0]}</Typography></CardBody></Card>
          <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Total Students</Typography><Typography variant="paragraph">{trip.statistics?.total_students}</Typography></CardBody></Card>
          <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Distance</Typography><Typography variant="paragraph">{trip.statistics?.total_distance_km}</Typography></CardBody></Card>
          <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Total Bus</Typography><Typography variant="paragraph">{trip.statistics?.total_buses}</Typography></CardBody></Card>
          <Card className="shadow-sm"><CardBody><Typography variant="h6" color="blue-gray">Total Time</Typography><Typography variant="paragraph">{trip.statistics?.total_duration_min}</Typography></CardBody></Card>
          </div>

          <Typography variant="h4" className="mb-2">Files</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* File Buttons */}
          <Card className="border shadow-md rounded-lg overflow-hidden">
            <CardBody className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-800">Trip Files</h2>

              {trip.files.length > 0 ? (
                <div className="grid gap-3">
                 {trip.files.map((file, i) => {
                if (!file.endsWith(".csv") && !file.endsWith(".html")) return null;

                let label = file;
                let color = "bg-gray-600";

                if (file.includes("all_bus_routes")) {
                  label = "🚌 All Bus Routes";
                  color = "bg-blue-600";
                } else if (file.includes("student_clusters_map")) {
                  label = "🗺️ Student Clusters Map";
                  color = "bg-green-600";
                } else if (file.includes("student_locations")) {
                  label = "📍 Student Locations";
                  color = "bg-purple-600";
                } else if (file.endsWith(".csv")) {
                  label = `📄 ${file}`;
                  color = "bg-indigo-600";
                }

                return (
                  <Button
                    key={i}
                    className={`${color} text-white w-full py-2 px-4 rounded-md shadow-sm hover:opacity-90 transition`}
                    onClick={() => handleViewMap(file)}
                    aria-label={`View file ${label}`}
                  >
                    {label}
                  </Button>
                );
              })}

                </div>
              ) : (
                <p className="text-gray-500 text-sm">No files available.</p>
              )}

              <div className="pt-4 border-t border-gray-200">
                <button
              onClick={() =>
                navigate('/school-dashboard/totalbus', {
                  state: {
                    tripId,
                    buses: trip.buses,
                  },
                })
              }
              className="text-blue-600 hover:underline font-medium transition"
            >
              🚍 View All Buses
            </button>
              </div>
            </CardBody>
          </Card>


            {/* Route Map */}
            <Card className="shadow-sm">
              <CardBody>
                <Typography variant="h5" className="mb-2">Route Map View</Typography>
                <iframe
                  src={`${API_BASE}/download_file/${tripId}/all_bus_routes.html`}
                  title="Route Map"
                  className="w-full h-96 border rounded"
                  sandbox="allow-scripts allow-same-origin"
                  allowFullScreen
                />
              </CardBody>
            </Card>
          </div>

        <Typography variant="h4" className="mb-4">Trip Metrics</Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm">
          {Object.entries(parameters).map(([k, v]) => (
            <div key={k} className="p-4 border rounded shadow-sm">
              <strong>{k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}:</strong> {v.toString()}
            </div>
          ))}
        </div>


          <Dialog size="xl" open={modalOpen} handler={handleCloseModal}>
            <DialogHeader>{modalTitle}</DialogHeader>
            <DialogBody className="h-[80vh] overflow-auto">
              {isHtml ? (
                <iframe
                  srcDoc={modalContent}
                  className="w-full h-full border rounded"
                  title="HTML Preview"
                />
              ) : csvData.length ? (
                <div className="overflow-auto max-h-[70vh]">
                  <table className="w-full border text-sm">
                    <thead className="bg-gray-100"><tr>
                      {csvData[0].map((h, idx) => <th key={idx} className="border px-2 py-1">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {csvData.slice(1).map((r, ridx) => (
                        <tr key={ridx}>
                          {r.map((c, cidx) => <td key={cidx} className="border px-2 py-1">{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre>{modalContent}</pre>
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="gradient" color="red" onClick={handleCloseModal}>Close</Button>
            </DialogFooter>
          </Dialog>
        </>
      ) : (
        <Typography variant="h5" color="red">
          No trip selected! Please go back.
        </Typography>
      )}
    </div>
  );
}

export default Report_overview;
