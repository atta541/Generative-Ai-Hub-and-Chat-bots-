

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SubscriptionAlert from '../components/SubscriptionAlert';  
import ErrorAlert from '../components/ErrorAlert';  
import Loader from '../components/Loader';  // Import the Loader component



const BASE_URL = process.env.REACT_APP_BASE_URL;
const UolTurbo = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);  
    const [showErrorAlert, setShowErrorAlert] = useState(false);  
    const [errorAlertMessage, setErrorAlertMessage] = useState(''); 
    const [loading, setLoading] = useState(false);  // State for showing the loader
    const chatContainerRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const userMessage = { type: 'user', text: message };
        setChatHistory(prev => [...prev, userMessage]);
        setLoading(true);  // Show the loader when starting to fetch data

        try {
            const res = await axios.post(`${BASE_URL}/api/uolturbo/`, { message }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const botResponse = res.data.response;
            const botMessage = { type: 'bot', text: botResponse };
            setChatHistory(prev => [...prev, botMessage]);
            setShowErrorAlert(false);

        } catch (error) {
            console.error('Error getting response from chatbot:', error.response ? error.response.data : error.message);

            if (error.response && error.response.status === 403) {
                // Show the subscription alert for subscription-related errors
                setShowSubscriptionAlert(true);
                setErrorAlertMessage('Your subscription is required to continue using this service.');
            } else {
                setErrorAlertMessage('There was an issue with the chatbot service. Please try again later.');
            }

            // Show error alert with the appropriate message
            setShowErrorAlert(true);

            // Add a bot message indicating the issue
            const errorMessage = { type: 'bot', text: 'Their was an error please try later.' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);  // Hide the loader after data is fetched
            setMessage('');
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch((err) => console.error('Failed to copy text:', err));
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const handleCloseSubscriptionAlert = () => {
        setShowSubscriptionAlert(false);
    };

    const handleSubscribe = () => {
        console.log('Redirecting to subscription page...');
    };

    const handleCloseErrorAlert = () => {
        setShowErrorAlert(false);
    };

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
            <div className={`flex justify-between items-center -mt-4 border-gray-300 ${darkMode ? '' : ''}`}>
                <div className="flex items-center">
                    <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with UoL Turbo</h2>
                </div>

                <button
                    className="py-2 px-4 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-700"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div className={`flex-1 overflow-y-auto p-5 border-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
                <div className="flex flex-col">
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            <div
                                className={`relative p-3 rounded-lg border-none ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
                                style={{ maxWidth: '70%' }}
                            >
                                {msg.text}
                                {msg.type === 'bot' && (
                                    <button
                                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                                        onClick={() => handleCopy(msg.text)}
                                    >
                                        Copy
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={chatContainerRef} />
                </div>
            </div>
            <form className="p-5 border-t border-gray-300 bg-white" onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <input
                        type="text"
                        className={`w-full p-3 border border-gray-300 text-lg rounded-l-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                    />
                    <button
                        type="submit"
                        className="py-3 px-6 text-lg text-white bg-black rounded-r-lg transition-colors duration-300 hover:bg-green-400"
                    >
                        Send
                    </button>
                </div>
            </form>

            {/* Subscription Alert */}
            {showSubscriptionAlert && (
                <SubscriptionAlert
                    onClose={handleCloseSubscriptionAlert}
                    onSubscribe={handleSubscribe}
                />
            )}

            {/* Error Alert */}
            {showErrorAlert && (
                <ErrorAlert
                    message={errorAlertMessage}
                    onClose={handleCloseErrorAlert}
                />
            )}

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default UolTurbo;


