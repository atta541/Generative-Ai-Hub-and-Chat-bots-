
import React from 'react';

const SubscriptionAlert = ({ onClose, onSubscribe }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 px-4 rounded-t-lg">
          <h2 className="text-3xl font-extrabold">Premium Subscription</h2>
        </div>
        <div className="p-6">
          <p className="text-lg mb-4 text-gray-700">Unlock all features by subscribing to our premium packages.</p>
          <ul className="list-disc list-inside mb-4 text-gray-600">
            <li>Access to premium chatbots</li>
            <li>Exclusive updates and features</li>
            <li>Priority customer support</li>
          </ul>
          <p className="text-lg font-semibold text-gray-800 mb-6">Subscription Charges: <span className="text-blue-600">$15/month</span></p>
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:bg-gray-600 hover:scale-105"
            >
              OK
            </button>
            <a
              href="https://buy.stripe.com/test_bIY01BgRX0rq4I8eUW"  // Replace with your actual Stripe Checkout URL
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:from-green-500 hover:to-blue-600 hover:scale-105"
            >
              Subscribe Now
            </a>
          </div>
        </div>
        <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          <svg className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAlert;
