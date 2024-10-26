import React, { useState } from 'react';

const AlreadySubscribedAlert = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose(); 
  };

  if (!isVisible) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-center py-4 px-6 rounded-t-lg">
          <h2 className="text-4xl font-extrabold">Congratulations!</h2>
          <p className="text-lg mt-2">You're already subscribed to our premium package.</p>
        </div>
        <div className="p-6">
          <p className="text-xl mb-4 text-gray-700">
            🎉 Thank you for being a valued subscriber!
          </p>
          <p className="text-lg font-semibold text-gray-800 mb-6">
            Enjoy all the exclusive features and benefits that come with your premium subscription.
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:bg-gray-600 hover:scale-105"
            >
              OK
            </button>
          </div>
        </div>
        <div className="absolute top-2 right-2 cursor-pointer" onClick={handleClose}>
          <svg className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AlreadySubscribedAlert;
