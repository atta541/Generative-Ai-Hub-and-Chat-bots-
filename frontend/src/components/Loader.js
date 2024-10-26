import React from 'react';
import './Allcss.css';  

const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></div>
            </div>
        </div>
    );
};

export default Loader;

