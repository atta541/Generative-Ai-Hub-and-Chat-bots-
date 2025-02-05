// import React, { useState } from 'react';

// const AlreadySubscribedAlert = ({ onClose }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   const handleClose = () => {
//     setIsVisible(false);
//     onClose(); 
//   };

//   if (!isVisible) return null; 

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
//       <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out">
//         <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-center py-4 px-6 rounded-t-lg">
//           <h2 className="text-4xl font-extrabold">Congratulations!</h2>
//           <p className="text-lg mt-2">You're already subscribed to our premium package.</p>
//         </div>
//         <div className="p-6">
//           <p className="text-xl mb-4 text-gray-700">
//             🎉 Thank you for being a valued subscriber!
//           </p>
//           <p className="text-lg font-semibold text-gray-800 mb-6">
//             Enjoy all the exclusive features and benefits that come with your premium subscription.
//           </p>
//           <div className="flex justify-end">
//             <button
//               onClick={handleClose}
//               className="bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:bg-gray-600 hover:scale-105"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//         <div className="absolute top-2 right-2 cursor-pointer" onClick={handleClose}>
//           <svg className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlreadySubscribedAlert;



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/solid";

const AlreadySubscribedAlert = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-white/40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-5 px-8 rounded-t-xl">
              <h2 className="text-3xl font-bold tracking-wide">🎉 Congratulations!</h2>
              <p className="text-lg mt-1">You're already subscribed to our premium package.</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-lg text-gray-800 font-medium mb-4">
                Enjoy all the exclusive features and benefits that come with your premium subscription.
              </p>
              <button
                onClick={handleClose}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all hover:bg-indigo-700 hover:scale-105"
              >
                Awesome!
              </button>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-all"
              onClick={handleClose}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlreadySubscribedAlert;
