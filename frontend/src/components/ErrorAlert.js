// ErrorAlert.js
import React, { useEffect, useState } from 'react';

const ErrorAlert = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 500); // Delay to allow slide-out animation to complete
        }, 5000); // Duration for which the alert is visible

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [onClose]);

    return (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 ${isVisible ? 'animate-slideIn' : 'animate-slideOut'}`}>
            <div className="flex justify-between items-center">
                <p>{message}</p>
                <button
                    className="ml-4 bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded"
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 500); // Delay to allow slide-out animation to complete
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorAlert;
