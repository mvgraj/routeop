import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input
} from "@material-tailwind/react";
import { TruckIcon, UserIcon, CalendarIcon, GlobeAltIcon , BriefcaseIcon} from "@heroicons/react/24/outline";
import { Modal, Backdrop, Fade } from '@mui/material';
import Rating from 'react-rating-stars-component';
import axios from 'axios';
import { IdentificationIcon } from '@heroicons/react/24/outline';

import driver1 from './img/driver1.png';
import driver2 from './img/driver2.png'
import driver3 from './img/driver3.png'
import driver4 from './img/driver4.jpg'
import driver5 from './img/driver5.png';

import driver6 from './img/driver6.jpg'
import driver7 from './img/driver7.jpg'
import driver8 from './img/driver8.png'
import driver9 from './img/driver9.jpg'
import driver10 from './img/driver10.jpg'
import driver11 from './img/driver11.png'

function Drivers() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    panId:'',
    aadharNumber: '',
    phoneNumber: '',
    photo: null,
    drivingLicense: null,
    Experience:''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to hold the form data
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('date_of_birth', formData.dateOfBirth);
    formDataToSend.append('pan_id', formData.panId);
    formDataToSend.append('aadhar_number', formData.aadharNumber);
    formDataToSend.append('phone_number', formData.phoneNumber);
    if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
    }
    if (formData.drivingLicense) {
        formDataToSend.append('driving_license', formData.drivingLicense);
    }
    formDataToSend.append('Experience', formData.Experience);

    try {
        // Send a POST request to the backend API
        const response = await axios.post('/api/drivers', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);  // Handle response if needed
        alert('Driver added successfully!');

        // Reset form and close the modal after submission
        setFormData({
            name: '',
            dateOfBirth: '',
            panId:'',
            aadharNumber: '',
            phoneNumber: '',
            photo: null,
            drivingLicense: null,
            Experience:''
        });
        handleClose();
    } catch (error) {
        console.error('Error adding driver:', error);
        alert('Failed to add driver. Please try again.');
    }
};

  // Dummy data for drivers
  const driverProfiles = [
    { image: 'https://media.istockphoto.com/id/1481401032/photo/happy-female-bus-driver-at-work-looking-at-camera.jpg?s=612x612&w=0&k=20&c=YARJf6u0Wtfbgq8zuF0eZkqX0T86UZLMdhyiEX_C6oc=', name: 'Fathima', id: 'DRV-20241003-101', trips: '50', emissionsSaved: '100', rating: 4.5, experience: '5 years' },
    { image: 'https://cloudfront-eu-central-1.images.arcpublishing.com/thenational/Q6I4UQIMEB5QGL23CA76YDVM4I.jpg', name: 'Ali', id: 'DRV-20240203-102', trips: '30', emissionsSaved: '75', rating: 5, experience: '3 years' },
    { image: 'https://www.shutterstock.com/image-photo/happy-man-working-bus-driver-600nw-2485619313.jpg', name: 'Mohammed', id: 'DRV-20241203-103', trips: '20', emissionsSaved: '50', rating: 3.2, experience: '2 years' },
    { image: 'https://static.vecteezy.com/system/resources/thumbnails/046/450/057/small/a-friendly-bus-driver-at-work-ai-generate-photo.jpg', name: 'Arun', id: 'DRV-20240303-104', trips: '10', emissionsSaved: '25', rating: 4.8, experience: '4 years' },
  
    // Add more dummy data as needed
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-10">
        <Typography variant="h4">
          Driver Profiles
        </Typography>
        <Button
          style={{ backgroundColor: '#41729F', borderColor: '#41729F' }}
          onClick={handleOpen}
        >
          + Add New Driver
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {driverProfiles.map((driver, index) => (
          <Card key={index} className="w-full ">
            <CardHeader
              color="blue"
              className="relative flex items-center justify-center h-48"
            >
              <img
                src={driver.image}
                alt={driver.name}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  <Typography variant="body2" className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-between gap-2">
                    <strong  className="font-semibold">Name:</strong><span className="text-sm">{driver.name}</span>
                    <div className="flex items-center ml-2">
                      <Rating
                        count={5}
                        value={driver.rating}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        className="mr-2"
                      />
                      <span className="flex  ml-3">{driver.rating}</span>
                      
                    </div>
                    
                    </div>
                  </Typography>
                </div>
                <div className="flex items-center">


                  <IdentificationIcon className="h-5 w-5 mr-2" />
                  <Typography variant="body2" className="w-full">
                    <strong className="font-semibold">Driver ID:</strong> <span className="text-sm">{driver.id}</span>
                  </Typography>
                 </div>

                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  <Typography variant="body2" className="w-full">
                    <strong  className="font-semibold">Trips:</strong> <span className="text-sm">{driver.trips}</span>
                  </Typography>
                </div>
                <div className="flex items-center">
                  <GlobeAltIcon className="h-5 w-5 mr-2" />
                  <Typography variant="body2" className="w-full">

                    <strong  className="font-semibold">Emissions Saved:</strong> <span className="text-sm">{driver.emissionsSaved}  g/liter</span>
                  </Typography>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  <Typography variant="body2" className="w-full">
                    <strong  className="font-semibold">Experience:</strong> <span className="text-sm">{driver.experience}</span>
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: { backdropFilter: 'none' } // Remove background blur
        }}
      >
        <Fade in={open}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white p-6 border rounded-lg shadow-lg w-full max-w-4xl">
              <form onSubmit={handleSubmit} className="flex flex-col">
              <Typography variant="h5" className="text-center flex-grow">
                    Add New Driver
                  </Typography>
                <div className="flex justify-between items-center mb-6 mt-5">
                 
                 
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Pan ID"
                    name="panId"
                    value={formData.panId}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Aadhar Number"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Photo"
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                  />
                  <Input
                    label="Driving License"
                    type="file"
                    name="drivingLicense"
                    onChange={handleFileChange}
                  />
                  <Input
                    label="Experience"
                    name="Experience"
                    value={formData.Experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex justify-between mt-7">
                <Button
                    onClick={handleClose}
                    style={{ backgroundColor: '#41729F', borderColor: '#41729F' }}
                  >
                    Back
                  </Button>
                  <Button type="submit" style={{ backgroundColor: '#41729F', borderColor: '#41729F' }}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Drivers;