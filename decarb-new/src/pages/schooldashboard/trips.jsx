
import { Card, Typography, Button } from '@material-tailwind/react';
import React, { useState } from 'react';

function Routes() {
  const [showMap, setShowMap] = useState(false);

  const handleCardClick = () => {
    setShowMap(true);
  };

  const handleBackClick = () => {
    setShowMap(false);
  };

  return (
    <div className="relative min-h-screen p-4">
      {!showMap ? (
        <Card
          onClick={handleCardClick}
          className="cursor-pointer mt-10 w-[30%] p-6 shadow-lg hover:shadow-xl transition duration-300"
        >
          <Typography variant="h5" color="blue-gray" className="mb-2">
            School Name: Zayed Educational Complex
          </Typography>
          <Typography variant="paragraph" color="gray">
            Number of Students: 997
          </Typography>
        </Card>
      ) : (
        <div>
          <div className='flex items-center justify-between'>
          <Button
            onClick={handleBackClick}
            className="mb-4 bg-blue-500 hover:bg-blue-600"
          >
            Back
          </Button>
           <Typography variant="h5" color="blue-gray" className="mb-2">
            School Name: Zayed Educational Complex
          </Typography>
          <div/>
          </div>
          <iframe
            src="/students_road_map.html"
            width="100%"
            height="870px"
            title="Student Road Map"
            className="border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
}

export default Routes;

