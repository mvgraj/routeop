import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Radio,
  Select, Option 
} from "@material-tailwind/react";
import TruckImage from "./img/lorry.jpg";
import Rating from 'react-rating-stars-component';
import { CameraIcon } from '@heroicons/react/24/outline';
import axios from "axios";
function Assign() {
  const [freightData, setFreightData] = useState([
    {
      type: "",
      freight_req: "",
      size: "",
      from_location: "",
      to_location: "",
      dimensions: "",
      refrigeration: null, // null for unselected, true for yes, false for no
      delivery_date: "",
      pickup_date: "",
      
    },
  ]);


  const [view, setView] = useState(false); // State to switch between views
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [truck,setTruck] = useState([])

  const [text1,setText1] =useState('Select');
  const [text2,setText2] =useState('Select');
  const [text3,setText3] =useState('Select')

  const handleclick1 = () =>{
    setText1(prevText =>
      prevText === 'Select'
      ? 'Selected'
      : 'Select'
    );
  };

  const handleclick2 = () =>{
    setText2(
      prevText =>
        prevText === 'Select'
      ? "Selected"
      : 'Select'
    )
  }
  const handleclick3 = () =>{
    setText3( prevText => prevText === 'Select' ? 'Selected' :'Select')
  }

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setImageName(file.name); // Set the file name
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleInputChange = (value, index, field) => {
    const newFreightData = [...freightData];
    newFreightData[index][field] = value;
    setFreightData(newFreightData);
  };


  const handleNext = () => {
    setView('fleet');
  };

  const handleBack = () => {
    setView(false);
  };

  const handleSave = async () => {
    const freight = freightData[0];
    const formData = new FormData();
    setView('fleet');
  
    // Append freight data
    formData.append("type", freight.type);
    formData.append("freight_req", freight.freight_req);  // Ensure field names match
    formData.append("size", freight.size);
    formData.append("from_location", freight.from_location);
    formData.append("to_location", freight.to_location);
    formData.append("dimensions", freight.dimensions);
    formData.append("refrigeration", freight.refrigeration); // Convert boolean to string
    formData.append("delivery_date", freight.delivery_date);
    formData.append("pickup_date", freight.pickup_date);
  
    // Append image if exists
    if (image) {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('freight_img', blob, imageName);
      } catch (fetchError) {
        console.error("Error fetching image:", fetchError);
        return; // Exit early if image fetch fails
      }
    }
  
    try {
      const response = await axios.post("http://13.202.84.210:3002/api/recommend_top_vehicles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Freight data saved:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving freight data:", error.response?.data || error.message);
      return; // Ensure some value is returned
    }
  };
  

  useEffect(() => {
    const getTruck = async () => {
      try {
        const data = await handleSave(); // Ensure `handleSave` returns data with a `top_vehicles` property
        if (data && data.top_vehicles) {
          console.log('useEffect data:', data.top_vehicles);
          setTruck(data.top_vehicles); // Set the state with the array of vehicles
        } else {
          console.log('No top vehicles data available');
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
  
    getTruck();
  }, []);
  
  


  if (view === "fleet") {
    return (
      
      <div className="p-8 min-h-screen">
        <Typography variant="h4" className="text-gray-900 font-semibold mb-8">
          Assign Fleet
        </Typography>
        <Button
          onClick={handleBack}
          style={{ backgroundColor: "#41729F", color: "white" }}
          className="mb-4 rounded-lg"
        >
          Back
        </Button>
        <div className="mb-8">
          <Typography variant="h5" className="text-gray-800 font-medium mb-4">
            Your Fleet Options
          </Typography>
          <div className=" gap-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
              {truck.length > 0 ? (
                truck.map((vehicle, index) => {
                  // Define background colors for the cards based on their index
                  const backgroundColors = ['#006d00', '#FFA500', '#FF0000']; // Green, Orange, Red
                  const backgroundColor = backgroundColors[index % backgroundColors.length]; // Select color

                  return (
                    <Card
                      key={index}
                      className="flex flex-col shadow-lg rounded-lg transition-transform transform hover:scale-105"
                    >
                      <img
                        src={TruckImage} // This can be dynamic if you have specific images for each vehicle
                        alt='truck'
                        className="h-40 w-full object-cover rounded-t-lg"
                      />
                      <div
                        className="p-4"
                        style={{ backgroundColor: backgroundColor, color: 'white', opacity: '0.7' }}
                      >
                        <Typography variant="body1" className="font-medium mb-1">
                          Vehicle ID: {vehicle.vehicle_id}
                        </Typography>
                        <Typography variant="body2">
                          Efficiency Score: {vehicle.efficiency_score.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          Total Cost: ${vehicle.total_cost.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          Total Emissions: {vehicle.total_emissions.toFixed(2)} kg
                        </Typography>
                      </div>
                    </Card>
                  );
                })
              ) : (
                // Ensure this section has the same grid layout
                <>
                  <Card
                    className="flex flex-col shadow-lg rounded-lg transition-transform transform hover:scale-105"
                  >
                    <img
                      src={TruckImage}
                      alt='truck'
                      className="h-40 w-full object-cover rounded-t-lg"
                    />
                    <div
                      className="p-4"
                      style={{ backgroundColor: "#006d00", color: "white", opacity: '0.7' }}
                    >
                      <Typography variant="body1" className="font-medium mb-1">
                        EcoTruck X1
                      </Typography>
                      <Typography variant="body2">Lowest carbon emission</Typography>
                    </div>
                  </Card>
                  <Card
                    className="flex flex-col shadow-lg rounded-lg transition-transform transform hover:scale-105"
                  >
                    <img
                      src={TruckImage}
                      alt='truck'
                      className="h-40 w-full object-cover rounded-t-lg"
                    />
                    <div
                      className="p-4"
                      style={{ backgroundColor: "#FFA500", color: "white", opacity: '0.7' }}
                    >
                      <Typography variant="body1" className="font-medium mb-1">
                        EconomyTruck Y2
                      </Typography>
                      <Typography variant="body2">Lowest cost with moderate emissions</Typography>
                    </div>
                  </Card>
                  <Card
                    className="flex flex-col shadow-lg rounded-lg transition-transform transform hover:scale-105"
                  >
                    <img
                      src={TruckImage}
                      alt='truck'
                      className="h-40 w-full object-cover rounded-t-lg"
                    />
                    <div
                      className="p-4"
                      style={{ backgroundColor: "#FF0000", color: "white", opacity: '0.7' }}
                    >
                      <Typography variant="body1" className="font-medium mb-1">
                        SpeedTruck Z3
                      </Typography>
                      <Typography variant="body2">Lowest Time with higher emissions</Typography>
                    </div>
                  </Card>
                </>
              )}
            </div>


             
  
          </div>
          <Typography variant="h5" className="text-gray-800 font-medium mt-8 mb-4">
            Assigned Driver
          </Typography>
          <Card className="mb-6 p-3 bg-white border border-gray-300 rounded-lg shadow-md max-w-md">
            <table>
              <thead className="text-left">
                <tr className="border-b text-sm ">
                  <th className="px-3 py-3">Driver Id</th>
                  <th className="px-3 py-3">Driver Name</th>
                  <th className="px-3 py-3">Rating</th>
                  <th className="px-3 py-3">Option</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm px-2">
                  <td className="px-3 py-3">D123456</td>
                  <td className="px-3 py-3">Roman Reigns</td>
                  <td>
                  <Rating
                        count={5}
                        value="5"
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        className="mr-2"
                      />
                      
                  </td>
                  <td className="text-blue-800 hover:font-semibold cursor-pointer underline px-1 py-3" onClick={handleclick1}>{text1}</td>
                </tr>
                <tr className=" text-sm px-2">
                  <td className="px-3 py-3">D233456</td>
                  <td className="px-3 py-3">Logan paul</td>
                  <td>
                  <Rating
                        count={5}
                        value="4"
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        className="mr-2"
                      />
                      
                  </td>
                  <td className="text-blue-800 hover:font-semibold cursor-pointer underline px-1 py-3" onClick={handleclick2}>{text2}</td>
                </tr>
                <tr className="text-sm">
                  <td className="px-3 py-3">D123321</td>
                  <td className="px-3 py-3">John cena</td>
                  <td >
                  <Rating
                        count={5}
                        value="4"
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        className="mr-2"
                      />
                      
                  </td>
                  <td className="text-blue-800 hover:font-semibold cursor-pointer underline px-1 py-3" onClick={handleclick3}>{text3}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen">
      <Typography variant="h4" className="mb-6">
        Assign Freight
      </Typography>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
      />
      {freightData.map((freight, index) => (
        <Card
          key={index}
          className="mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-md w-full"
        >
          <CardHeader
            floated={false}
            shadow={false}
            // color="transparent"
            className="m-0 mb-4 flex justify-between items-center"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Enter Freight Details
            </Typography>

          </CardHeader>
          <CardBody className="flex flex-col grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="grid gap-4 " style={{ width: '150%' }}>
            <div className="grid grid-cols-3 gap-4 items-center" >
              <Typography>Type</Typography>
              <Select
                label="Select an option"
                value={freight.type}
                onChange={(e) => handleInputChange(e, index, "type")}
                color="indigo"
              >
                <Option value="Dry Freight">Dry Freight</Option>
                <Option value="Refrigerated Freight">Refrigerated Freight </Option>
                <Option value="Liquid Freight">Liquid Freight</Option>
                <Option value="Bulk Freight">Bulk Freight</Option>
                <Option value="Containerized Freight">Containerized Freight</Option>
                <Option value="Pharmaceutical Freight">Pharmaceutical Freight</Option>
              </Select>
            <script type="text/javascript"> console.log(e) </script>

            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>Freight Requeriments</Typography>
              <Select
                label="Select an option"
                value={freight.freight_req}
                onChange={(e) => handleInputChange(e, index, "freight_req")}
                color="indigo"
              >
                <Option value="Breakbulk Cargo">Breakbulk Cargo</Option>
                <Option value="Live Animal Transport">Live Animal Transport</Option>
                <Option value="Perishable Goods">Perishable Goods</Option>
                <Option value="Fragile Freight">Fragile Freight</Option>
                <Option value="Medical and Healthcare Equipment">Medical and Healthcare Equipment</Option>
              </Select>

            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>Size (Tons)</Typography>
              <Input
                type="text"
                name="size"
                value={freight.size}
                onChange={(e) => handleInputChange(e.target.value, index, "size")}
                className="col-span-2 form"
                label="Size (Tons)"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>From Location</Typography>
              <Input
                type="text"
                name="fromLocation"
                value={freight.from_location}
                onChange={(e) => handleInputChange(e.target.value, index, "from_location")}
                className="col-span-2"
                label="From Location"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>To Location</Typography>
              <Input
                type="text"
                name="toLocation"
                value={freight.to_location}
                onChange={(e) => handleInputChange(e.target.value, index, "to_location")}
                className="col-span-2"
                label="To Location"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>Dimensions</Typography>
              <Input
                type="text"
                name="dimensions"
                value={freight.dimensions}
                onChange={(e) => handleInputChange(e.target.value, index, "dimensions")}
                className="col-span-2"
                label="Dimensions"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>Refrigeration</Typography>
              <div className="col-span-2 flex items-center space-x-4">
              <Radio
                id={`refrigeration-yes-${index}`}
                name={`refrigeration-${index}`}
                value="yes"
                checked={freight.refrigeration === true}
                onChange={() => handleInputChange(true, index, "refrigeration")}
                label="Yes"
              />
              <Radio
                id={`refrigeration-no-${index}`}
                name={`refrigeration-${index}`}
                value="no"
                checked={freight.refrigeration === false}
                onChange={() => handleInputChange(false, index, "refrigeration")}
                label="No"
              />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>Pickup Date</Typography>
              <Input
                type="date"
                name="pickupDate"
                value={freight.pickup_date}
                onChange={(e) => handleInputChange(e.target.value, index, "pickup_date")}
                className="col-span-2"
                label="Pickup Date"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Typography>Delivery Date</Typography>
              <Input
                type="date"
                name="deliveryDate"
                value={freight.delivery_date}
                onChange={(e) => handleInputChange(e.target_value, index, "delivery_date")}
                className="col-span-2"
                label="Delivery Date"
              />
            </div>
            </div>
            <div className="flex flex-col items-center mt-4 mb-4 ml-10" style={{ width: '100%' }}>
              <div
                className="h-60 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('fileInput').click()}
              >
                {image ? (
                  <img src={image} alt="Preview" className="object-cover w-[400px] h-full rounded-lg" />
                ) : (
                  <div className="text-center">
                    <CameraIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-500 mt-2">Drag & Drop your image here, or click to select one</p>
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 flex gap-2">
                <div>
                <span className="font-semibold">Freight Image:  </span>
                </div>
                {imageName && (
                  <p className="text-gray-700">{imageName}</p> // Display the image name
                )}
              </div>
            </div>

          </CardBody>
          <div className="flex justify-between">
          <Button
              onClick={handleSave}
              style={{ backgroundColor: "#41729F", color: "white" }}
              className="flex inline-block self-end justify-end mt-4 mb-4 rounded-lg"
            >
              Save
            </Button>
            <Button
              onClick={handleNext}
              style={{ backgroundColor: "#41729F", color: "white" }}
              className="flex inline-block self-end justify-end mt-4 mb-4 rounded-lg"
            >
              Show vehicles
            </Button>
          </div>
          
      
        </Card>
      ))}
    </div>
  );
}

export default Assign;