// import React from "react";
// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Button,
// } from "@material-tailwind/react";

// const MapModal = ({ open, onClose, url, downloadName }) => (
//   <Dialog 
//     open={open} 
//     handler={onClose} 
//     size="xxl"
//     className="fixed right-0 top-0 h-full w-3/4 ml-1/4" // Adjust width and positioning
//     style={{
//       marginLeft: '16rem', // Match your sidebar width
//       maxWidth: 'calc(100% - 16rem)', // Subtract sidebar width
//       marginTop: '1rem',
//       marginRight: '1rem',
//       height: 'calc(100% - 2rem)'
//     }}
//   >
//     <DialogHeader>Map Preview</DialogHeader>
//     <DialogBody divider className="h-[80vh]">
//       <iframe
//         src={url}
//         title="Map Preview"
//         className="w-full h-full border rounded"
//       />
//     </DialogBody>
//     <DialogFooter className="flex justify-between">
//       <Button
//         variant="outlined"
//         onClick={onClose}
//         className="mr-2"
//       >
//         Close
//       </Button>
//       <Button
//         variant="gradient"
//         color="blue"
//         onClick={() => window.open(url, "_blank")}
//       >
//         Download
//       </Button>
//     </DialogFooter>
//   </Dialog>
// );

// export default MapModal;



import React from 'react';

const MapModal = ({ open, onClose, url, downloadName }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Map View</h2>
          <div className="flex gap-2">
            <a 
              href={url} 
              download={downloadName}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <iframe 
          src={url} 
          title="Map View"
          className="w-full h-full min-h-[70vh] border-0"
          sandbox="allow-scripts allow-same-origin"
          allowFullScreen
        />

        </div>
      </div>
    </div>
  );
};

export default MapModal;