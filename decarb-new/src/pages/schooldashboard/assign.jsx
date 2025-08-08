// import React, { useState, useRef } from "react";
// import { 
//   Upload, 
//   MapPin, 
//   Users, 
//   FileText,
//   Truck,
//   Clock,
//   Map,
//   Camera,
//   CheckCircle,
//   AlertCircle,
//   Loader
// } from 'lucide-react';
// import Papa from 'papaparse';
// import MapModal from "./MapModal";
//  // adjust path if needed


// function Assign() {
//   const [routeData, setRouteData] = useState({
//     eps: 50.0,
//     min_samples: 1,
//     max_chunk: 50,
//     retry: 3,
//     bus_capacities: "21,32,45",
//     min_fill_ratio: 0.8,
//     max_allowed_dist_km: 2.0,
//     avg_speed_kmph: 60.0,
//     stop_time_per_student: 60,
//     start_time: "07:00"
//   });

//   const [activeTab, setActiveTab] = useState("route");
//   const fileInputRef = useRef(null);
//   const [csvData, setCsvData] = useState(null);
//   const [csvFile, setCsvFile] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [clusteringComplete, setClusteringComplete] = useState(false);
//   const [routingComplete, setRoutingComplete] = useState(false);
//   const [clusterResult, setClusterResult] = useState(null);
//   const [routeResult, setRouteResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);
// const [modalOpen, setModalOpen] = useState(false);
// const [currentMapUrl, setCurrentMapUrl] = useState("");
// const [downloadName, setDownloadName] = useState("");

// const openMapModal = (url, name) => {
//   setCurrentMapUrl(url);
//   setDownloadName(name);
//   setModalOpen(true);
// };

//   const API_BASE_URL = 'http://13.202.84.210:3002'; // Adjust this to your FastAPI server URL

//   const handleCsvUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCsvFile(file);
//       Papa.parse(file, {
//         header: true,
//         complete: (results) => {
//           setCsvData(results.data);
//           setOpenDialog(true);
//         },
//         error: (error) => {
//           setError("Error parsing CSV file: " + error.message);
//         }
//       });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setRouteData(prev => ({ ...prev, [field]: value }));
//   };

//  const handleClusterAndRoute = async () => {
//   if (!csvFile) {
//     setError("Please upload a CSV file first");
//     return;
//   }

//   setLoading(true);
//   setError(null);
//   setProgress(20);

//   try {
//     const formData = new FormData();
//     formData.append('file', csvFile);
    
//     // Add all parameters to form data
//     Object.entries(routeData).forEach(([key, value]) => {
//       formData.append(key, value.toString());
//     });

//     setProgress(40);

//     const response = await fetch(`${API_BASE_URL}/cluster_and_route`, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Accept': 'application/json',
//       },
//     });

//     setProgress(80);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
//     }

//     const result = await response.json();
    
//     // Update the result paths to be relative to the API base URL
//     const processedResult = {
//       ...result,
//     student_map: "http://13.202.84.210:8083/view/student_locations",
//   cluster_map: "http://13.202.84.210:8083/view/student_clusters_map",
//   route_map: "http://13.202.84.210:8083/view/all_bus_routes",
//   route_csv: "http://13.202.84.210:8083/download/bus_routes_summary"
//     };
    
//     setClusterResult(processedResult);
//     setRouteResult(processedResult);
//     setClusteringComplete(true);
//     setRoutingComplete(true);
//     setProgress(100);
//     setActiveTab("results");
//   } catch (err) {
//     console.error('Full error:', err);
//     setError(`Error processing data: ${err.message}`);
//   } finally {
//     setLoading(false);
//     setTimeout(() => setProgress(0), 1000);
//   }
// };

//   const ProgressBar = ({ value }) => (
//     <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//       <div 
//         className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   );

//   const Alert = ({ type, children }) => (
//     <div className={`flex items-center p-4 mb-4 rounded-lg ${
//       type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
//     }`}>
//       {type === 'error' ? (
//         <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
//       ) : (
//         <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//       )}
//       <span className={type === 'error' ? 'text-red-700' : 'text-green-700'}>
//         {children}
//       </span>
//     </div>
//   );

//   const Button = ({ children, onClick, disabled, variant = 'primary', className = '', ...props }) => {
//     const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
//     const variants = {
//       primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300",
//       secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
//       success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300",
//       warning: "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300",
//       danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300",
//       outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
//     };

//     return (
//       <button
//         className={`${baseClasses} ${variants[variant]} ${className}`}
//         onClick={onClick}
//         disabled={disabled}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   };

//   const Card = ({ children, className = '' }) => (
//     <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
//       {children}
//     </div>
//   );

//   const Input = ({ label, ...props }) => (
//     <div className="flex flex-col">
//       {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
//       <input
//         className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         {...props}
//       />
//     </div>
//   );

//   const TabButton = ({ active, disabled, onClick, children }) => (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
//         active
//           ? 'bg-blue-500 text-white'
//           : disabled
//           ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//       }`}
//     >
//       {children}
//     </button>
//   );

//   const Modal = ({ open, onClose, title, children }) => {
//     if (!open) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               ×
//             </button>
//           </div>
//           <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
//             {children}
//           </div>
//           <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={() => {
//               onClose();
//               setActiveTab("students");
//             }}>
//               Confirm Upload
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Smart School Bus Routing System
//       </h1>

//       {progress > 0 && (
//         <div className="mb-4">
//           <ProgressBar value={progress} />
//           <p className="text-sm text-gray-600 text-center">
//             Processing... {progress}%
//           </p>
//         </div>
//       )}

//       {error && (
//         <Alert type="error">
//           {error}
//         </Alert>
//       )}

//       <div className="flex gap-2 mb-6 flex-wrap">
//         <TabButton
//           active={activeTab === "route"}
//           onClick={() => setActiveTab("route")}
//         >
//           <MapPin className="w-4 h-4" />
//           Parameters
//         </TabButton>
//         <TabButton
//           active={activeTab === "students"}
//           disabled={!csvData}
//           onClick={() => setActiveTab("students")}
//         >
//           <FileText className="w-4 h-4" />
//           Student Data
//         </TabButton>
//         <TabButton
//           active={activeTab === "results"}
//           disabled={!routingComplete}
//           onClick={() => setActiveTab("results")}
//         >
//           <Truck className="w-4 h-4" />
//           Results
//         </TabButton>
//       </div>

//       {activeTab === "route" && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Clustering Parameters
//             </h2>
            
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">EPS (meters)</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="number"
//                     value={routeData.eps}
//                     onChange={(e) => handleInputChange("eps", parseFloat(e.target.value))}
//                     placeholder="Maximum distance between students in cluster"
//                     step="1"
//                   />
//                 </div>
//               </div>
              
              
//               <div className="flex justify-between mt-6">
//                 <Button
//                   variant="primary"
//                   onClick={() => document.getElementById('csvUpload').click()}
//                 >
//                   <Upload className="w-4 h-4" />
//                   Upload Student List (CSV)
//                 </Button>
                
//                 <input
//                   type="file"
//                   accept=".csv"
//                   onChange={handleCsvUpload}
//                   className="hidden"
//                   ref={fileInputRef}
//                   id="csvUpload"
//                 />
//               </div>
//             </div>
//           </Card>

//           <Card className="p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Bus Routing Parameters
//             </h2>
            
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">Bus Capacities</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="text"
//                     value={routeData.bus_capacities}
//                     onChange={(e) => handleInputChange("bus_capacities", e.target.value)}
//                     placeholder="Comma-separated capacities (e.g., 21,32,45)"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">Min Fill Ratio</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="number"
//                     step="0.1"
//                     min="0.1"
//                     max="1.0"
//                     value={routeData.min_fill_ratio}
//                     onChange={(e) => handleInputChange("min_fill_ratio", parseFloat(e.target.value))}
//                     placeholder="Minimum fill ratio (0.0 - 1.0)"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">Max Distance (km)</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="number"
//                     step="0.1"
//                     value={routeData.max_allowed_dist_km}
//                     onChange={(e) => handleInputChange("max_allowed_dist_km", parseFloat(e.target.value))}
//                     placeholder="Maximum distance between pickups"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">Avg Speed (km/h)</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="number"
//                     value={routeData.avg_speed_kmph}
//                     onChange={(e) => handleInputChange("avg_speed_kmph", parseFloat(e.target.value))}
//                     placeholder="Average bus speed"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">Stop Time (sec)</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="number"
//                     value={routeData.stop_time_per_student}
//                     onChange={(e) => handleInputChange("stop_time_per_student", parseInt(e.target.value))}
//                     placeholder="Stop time per student"
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm text-gray-600">Start Time</label>
//                 <div className="col-span-2">
//                   <Input
//                     type="time"
//                     value={routeData.start_time}
//                     onChange={(e) => handleInputChange("start_time", e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="flex justify-end mt-6">
//                 <Button
//                   variant="success"
//                   onClick={handleClusterAndRoute}
//                   disabled={!csvFile || loading}
//                 >
//                   {loading ? (
//                     <Loader className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Truck className="w-4 h-4" />
//                   )}
//                   Process Routing
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "students" && csvData && (
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Student List</h2>
//             <span className="text-sm text-gray-600">
//               Total Students: {csvData.length}
//             </span>
//           </div>
          
//           <div className="overflow-auto max-h-96">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   {Object.keys(csvData[0] || {}).map((key) => (
//                     <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {csvData.map((row, i) => (
//                   <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
//                     {Object.values(row).map((value, j) => (
//                       <td key={j} className="px-4 py-2 text-sm text-gray-600">
//                         {value}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {activeTab === "results" && routeResult && (
//         <Card className="p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Routing Results
//           </h2>
          
//           <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
//             <h3 className="text-lg font-medium text-green-700 mb-2">
//               Status
//             </h3>
//             <p className="text-lg font-semibold text-green-600">
//               {routeResult.message}
//             </p>
//             <p className="text-sm text-green-600 mt-1">
//               {routeResult.clusters} clusters created
//             </p>
//           </div>
          
//            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Button
//           variant="primary"
//           onClick={() => openMapModal(routeResult.student_map, "student_locations.html")}
//         >
//           <Map className="w-4 h-4 mr-2" />
//           View Student Map
//         </Button>

//         <Button
//           variant="success"
//           onClick={() => openMapModal(routeResult.cluster_map, "student_clusters_map.html")}
//         >
//           <Users className="w-4 h-4 mr-2" />
//           View Cluster Map
//         </Button>

//         <Button
//           variant="warning"
//           onClick={() => openMapModal(routeResult.route_map, "all_bus_routes.html")}
//         >
//           <Truck className="w-4 h-4 mr-2" />
//           View Route Map
//         </Button>
//       </div>

//       <MapModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         url={currentMapUrl}
//         downloadName={downloadName}
//       />
    
//           <div className="flex justify-center">
//             <Button
//   variant="secondary"
//   onClick={() => window.open(routeResult.route_csv, '_blank')}
// >
//   <FileText className="w-4 h-4" />
//   Download Route Summary CSV
// </Button>
//           </div>
//         </Card>
//       )}

//       <Modal
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         title="Student List Preview"
//       >
//         {csvData ? (
//           <div className="overflow-auto max-h-96">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   {Object.keys(csvData[0] || {}).map((key) => (
//                     <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {csvData.slice(0, 10).map((row, i) => (
//                   <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
//                     {Object.values(row).map((value, j) => (
//                       <td key={j} className="px-4 py-2 text-sm text-gray-600">
//                         {value}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//                 {csvData.length > 10 && (
//                   <tr>
//                     <td colSpan={Object.keys(csvData[0] || {}).length} className="px-4 py-2 text-center text-gray-500">
//                       Showing 10 of {csvData.length} students
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-600">No student data available</p>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default Assign;


import React, { useState, useRef } from "react";
import { 
  Upload, 
  MapPin, 
  Users, 
  FileText,
  Truck,
  Clock,
  Map,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import Papa from 'papaparse';
import MapModal from "./MapModal";

function Assign() {
  const [routeData, setRouteData] = useState({
    eps: 50.0,
    min_samples: 1,
    max_chunk: 50,
    retry: 3,
    bus_capacities: "21,32,45",
    min_fill_ratio: 0.8,
    max_allowed_dist_km: 2.0,
    avg_speed_kmph: 60.0,
    stop_time_per_student: 60,
    start_time: "07:00"
  });

  const [activeTab, setActiveTab] = useState("route");
  const fileInputRef = useRef(null);
  const [csvData, setCsvData] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clusteringComplete, setClusteringComplete] = useState(false);
  const [routingComplete, setRoutingComplete] = useState(false);
  const [tripResult, setTripResult] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMapUrl, setCurrentMapUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");
const [mapPopupVisible, setMapPopupVisible] = useState(false);
const [popupMapUrl, setPopupMapUrl] = useState("");
const [modalContent, setModalContent] = useState("");
const [isHtml, setIsHtml] = useState(false);
const [modalTitle, setModalTitle] = useState("");

  const API_BASE_URL = 'http://13.202.84.210:3002'; // Your FastAPI server URL

const handleViewMap = async (url, downloadName) => {
  setModalTitle(downloadName);
  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type");
    const text = await res.text();

    if (contentType.includes("text/html")) {
      setIsHtml(true);
      setModalContent(text);
      setCsvData([]);
    } else if (downloadName.endsWith(".csv")) {
      const rows = text.trim().split("\n").map((row) => row.split(","));
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


  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          setOpenDialog(true);
        },
        error: (error) => {
          setError("Error parsing CSV file: " + error.message);
        }
      });
    }
  };

  const handleInputChange = (field, value) => {
    setRouteData(prev => ({ ...prev, [field]: value }));
  };

  const handleClusterAndRoute = async () => {
    if (!csvFile) {
      setError("Please upload a CSV file first");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(20);

    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      
      // Add all parameters to form data
      Object.entries(routeData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      setProgress(40);

      const response = await fetch(`${API_BASE_URL}/cluster_and_route`, {
        method: 'POST',
        body: formData,
      });

      setProgress(80);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }

      const result = await response.json();
      
      // Get the trip ID from the response
      const tripId = result.trip_id;
      
      // Fetch the trip details
      const tripDetailsResponse = await fetch(`${API_BASE_URL}/routes/${tripId}`);
      if (!tripDetailsResponse.ok) {
        throw new Error("Failed to fetch trip details");
      }
      
      const tripDetails = await tripDetailsResponse.json();
      
      // Prepare the result object with download URLs
      const processedResult = {
        tripId,
        message: result.message,
        files: result.files,
        statistics: tripDetails.statistics,
        parameters: tripDetails.parameters,
        downloadUrls: {
          studentMap: `${API_BASE_URL}/download_file/${tripId}/student_locations.html`,
          clusterMap: `${API_BASE_URL}/download_file/${tripId}/student_clusters_map.html`,
          routeMap: `${API_BASE_URL}/download_file/${tripId}/all_bus_routes.html`,
          routeSummary: `${API_BASE_URL}/download_file/${tripId}/bus_routes_summary.csv`,
          studentsWithClusters: `${API_BASE_URL}/download_file/${tripId}/students_with_clusters.csv`,
          pickupPoints: `${API_BASE_URL}/download_file/${tripId}/pickup_points.csv`
        }
      };
      
      setTripResult(processedResult);
      setClusteringComplete(true);
      setRoutingComplete(true);
      setProgress(100);
      setActiveTab("results");
    } catch (err) {
      console.error('Full error:', err);
      setError(`Error processing data: ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const ProgressBar = ({ value }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const Alert = ({ type, children }) => (
    <div className={`flex items-center p-4 mb-4 rounded-lg ${
      type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
    }`}>
      {type === 'error' ? (
        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
      ) : (
        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
      )}
      <span className={type === 'error' ? 'text-red-700' : 'text-green-700'}>
        {children}
      </span>
    </div>
  );

  const Button = ({ children, onClick, disabled, variant = 'primary', className = '', ...props }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300",
      secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
      success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300",
      warning: "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {children}
    </div>
  );

  const Input = ({ label, ...props }) => (
    <div className="flex flex-col">
      {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
      <input
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );

  const TabButton = ({ active, disabled, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
        active
          ? 'bg-blue-500 text-white'
          : disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {children}
    </button>
  );

  const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => {
              onClose();
              setActiveTab("students");
            }}>
              Confirm Upload
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Smart School Bus Routing System
      </h1>

      {progress > 0 && (
        <div className="mb-4">
          <ProgressBar value={progress} />
          <p className="text-sm text-gray-600 text-center">
            Processing... {progress}%
          </p>
        </div>
      )}

      {error && (
        <Alert type="error">
          {error}
        </Alert>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        <TabButton
          active={activeTab === "route"}
          onClick={() => setActiveTab("route")}
        >
          <MapPin className="w-4 h-4" />
          Parameters
        </TabButton>
        <TabButton
          active={activeTab === "students"}
          disabled={!csvData}
          onClick={() => setActiveTab("students")}
        >
          <FileText className="w-4 h-4" />
          Student Data
        </TabButton>
        <TabButton
          active={activeTab === "results"}
          disabled={!routingComplete}
          onClick={() => setActiveTab("results")}
        >
          <Truck className="w-4 h-4" />
          Results
        </TabButton>
      </div>

      {activeTab === "route" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Clustering Parameters
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">EPS (meters)</label>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={routeData.eps}
                    onChange={(e) => handleInputChange("eps", parseFloat(e.target.value))}
                    placeholder="Maximum distance between students in cluster"
                    step="1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Min Samples</label>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={routeData.min_samples}
                    onChange={(e) => handleInputChange("min_samples", parseInt(e.target.value))}
                    placeholder="Minimum students per cluster"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="primary"
                  onClick={() => document.getElementById('csvUpload').click()}
                >
                  <Upload className="w-4 h-4" />
                  Upload Student List (CSV)
                </Button>
                
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                  ref={fileInputRef}
                  id="csvUpload"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Bus Routing Parameters
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Bus Capacities</label>
                <div className="col-span-2">
                  <Input
                    type="text"
                    value={routeData.bus_capacities}
                    onChange={(e) => handleInputChange("bus_capacities", e.target.value)}
                    placeholder="Comma-separated capacities (e.g., 21,32,45)"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Min Fill Ratio</label>
                <div className="col-span-2">
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="1.0"
                    value={routeData.min_fill_ratio}
                    onChange={(e) => handleInputChange("min_fill_ratio", parseFloat(e.target.value))}
                    placeholder="Minimum fill ratio (0.0 - 1.0)"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Max Distance (km)</label>
                <div className="col-span-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={routeData.max_allowed_dist_km}
                    onChange={(e) => handleInputChange("max_allowed_dist_km", parseFloat(e.target.value))}
                    placeholder="Maximum distance between pickups"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Avg Speed (km/h)</label>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={routeData.avg_speed_kmph}
                    onChange={(e) => handleInputChange("avg_speed_kmph", parseFloat(e.target.value))}
                    placeholder="Average bus speed"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Stop Time (sec)</label>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={routeData.stop_time_per_student}
                    onChange={(e) => handleInputChange("stop_time_per_student", parseInt(e.target.value))}
                    placeholder="Stop time per student"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-600">Start Time</label>
                <div className="col-span-2">
                  <Input
                    type="time"
                    value={routeData.start_time}
                    onChange={(e) => handleInputChange("start_time", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button
                  variant="success"
                  onClick={handleClusterAndRoute}
                  disabled={!csvFile || loading}
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Truck className="w-4 h-4" />
                  )}
                  Process Routing
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "students" && csvData && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Student List</h2>
            <span className="text-sm text-gray-600">
              Total Students: {csvData.length}
            </span>
          </div>
          
          <div className="overflow-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {Object.keys(csvData[0] || {}).map((key) => (
                    <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="px-4 py-2 text-sm text-gray-600">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

{activeTab === "results" && tripResult && (
  <>
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Routing Results
      </h2>
      
       <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
    <h3 className="text-lg font-medium text-blue-700 mb-2">Trip ID</h3>
    <p className="text-sm text-blue-600">{tripResult.tripId}</p>
  </div>

  {/* ✅ Routing Parameters */}
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
    <h3 className="text-lg font-medium text-gray-700 mb-2">Routing Parameters</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      {tripResult.parameters &&
        Object.entries(tripResult.parameters).map(([key, value]) => (
          <li key={key}>
            <span className="font-medium">{key.replace(/_/g, ' ')}:</span> {value.toString()}
          </li>
        ))}
    </ul>
  </div>


      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
        <h3 className="text-lg font-medium text-green-700 mb-2">Status</h3>
        <p className="text-lg font-semibold text-green-600">{tripResult.message}</p>
        <p className="text-sm text-green-600 mt-1">
          {tripResult.statistics.total_students} students | 
          {tripResult.statistics.total_clusters} clusters | 
          {tripResult.statistics.total_buses} buses
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Button onClick={() => handleViewMap(tripResult.downloadUrls.studentMap, "student_locations.html")}>
          <Map className="w-4 h-4 mr-2" />
          View Student Map
        </Button>

      <Button onClick={() => handleViewMap(tripResult.downloadUrls.clusterMap, "student_clusters_map.html")}>

          <Users className="w-4 h-4 mr-2" />
          View Cluster Map
        </Button>

       <Button onClick={() => handleViewMap(tripResult.downloadUrls.routeMap, "all_bus_routes.html")}>

          <Truck className="w-4 h-4 mr-2" />
          View Route Map
        </Button>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <Button
    variant="secondary"
    onClick={() =>
      handleViewMap(tripResult.downloadUrls.routeSummary, "route_summary.csv")
    }
  >
    <FileText className="w-4 h-4 mr-2" />
    View Route Summary
  </Button>

  <Button
    variant="secondary"
    onClick={() =>
      handleViewMap(tripResult.downloadUrls.pickupPoints, "pickup_points.csv")
    }
  >
    <MapPin className="w-4 h-4 mr-2" />
    View Pickup Points
  </Button>

  <Button
    variant="secondary"
    onClick={() =>
      handleViewMap(tripResult.downloadUrls.studentsWithClusters, "students_with_clusters.csv")
    }
  >
    <Users className="w-4 h-4 mr-2" />
    View Student Clusters
  </Button>
</div>

    </Card>

    {mapPopupVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Map View</h2>
            <button
              onClick={() => setMapPopupVisible(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
          <div className="flex-grow">
            <iframe
              srcDoc={popupMapUrl}
              title="Map Preview"
              className="w-full h-full min-h-[70vh] border-0"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )}
  </>
)}
{modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white max-w-5xl w-full h-[80vh] rounded shadow-lg overflow-hidden relative">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">{modalTitle}</h2>
        <button
          onClick={() => {
            setModalOpen(false);
            setModalContent("");
            setCsvData([]);
          }}
          className="text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>
      </div>
      <div className="p-4 h-full overflow-auto">
        {isHtml ? (
          <iframe
            title="HTML Preview"
            srcDoc={modalContent}
            className="w-full h-full border rounded"
          />
        ) : csvData.length > 0 ? (
          <div className="overflow-auto max-h-full">
            <table className="min-w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  {csvData[0].map((cell, idx) => (
                    <th key={idx} className="px-3 py-2 border-b">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-t hover:bg-gray-50">
                    {row.map((cell, colIdx) => (
                      <td key={colIdx} className="px-3 py-2 border-b">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-sm text-gray-800">
            {modalContent}
          </pre>
        )}
      </div>
    </div>
  </div>
)}

      <Modal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Student List Preview"
      >
        {csvData ? (
          <div className="overflow-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {Object.keys(csvData[0] || {}).map((key) => (
                    <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 10).map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="px-4 py-2 text-sm text-gray-600">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
                {csvData.length > 10 && (
                  <tr>
                    <td colSpan={Object.keys(csvData[0] || {}).length} className="px-4 py-2 text-center text-gray-500">
                      Showing 10 of {csvData.length} students
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No student data available</p>
        )}
      </Modal>
    </div>
  );
}

export default Assign;