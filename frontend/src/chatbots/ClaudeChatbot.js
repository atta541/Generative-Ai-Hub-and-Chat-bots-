
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const Claude = () => {
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [darkMode, setDarkMode] = useState(false);
//     const chatContainerRef = useRef(null);

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     if (message.trim() === '') return;

//     //     const userMessage = { type: 'user', text: message };
//     //     setChatHistory(prev => [...prev, userMessage]);

//     //     try {
//     //         const res = await axios.post('http://127.0.0.1:8000/api/claude/', { message }, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//     //             }
//     //         });
//     //         const botResponse = res.data.response;
//     //         const botMessage = { type: 'bot', text: botResponse };
//     //         setChatHistory(prev => [...prev, botMessage]);
//     //     } catch (error) {
//     //         console.error('Error getting response from chatbot:', error);
//     //         const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
//     //         setChatHistory(prev => [...prev, errorMessage]);
//     //     } finally {
//     //         setMessage('');
//     //     }
//     // };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message.trim() === '') return;
    
//         const userMessage = { type: 'user', text: message };
//         setChatHistory(prev => [...prev, userMessage]);
    
//         try {
//             const res = await axios.post('http://127.0.0.1:8000/api/claude/', { message }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//                 }
//             });
//             const botResponse = res.data.response;
//             const botMessage = { type: 'bot', text: botResponse };
//             setChatHistory(prev => [...prev, botMessage]);
//         } catch (error) {
//             console.error('Error getting response from chatbot:', error.response ? error.response.data : error.message);
//             const errorMessage = { type: 'bot', text: 'Subscribe now to start using this chatbot!.' };
//             alert("please first subsceriptr")// here if we call that component
//             setChatHistory(prev => [...prev, errorMessage]);
//         } finally {
//             setMessage('');
//         }
//     };
    
//     const handleCopy = (text) => {
//         navigator.clipboard.writeText(text)
//             .then(() => alert('Copied to clipboard!'))
//             .catch((err) => console.error('Failed to copy text:', err));
//     };

//     const toggleDarkMode = () => {
//         setDarkMode(prevMode => !prevMode);
//     };

//     useEffect(() => {
//         chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [chatHistory]);

//     return (
//         <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
//             <div className={`flex justify-between items-center -mt-4 border-gray-300 ${darkMode ? '' : ''}`}>
//                 <div className="flex items-center">
//                     <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with Claude 3.5 Sonnet</h2>
//                 </div>

//                 <button
//                     className="py-2 px-4 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-700"
//                     onClick={toggleDarkMode}
//                 >
//                     {darkMode ? 'Light Mode' : 'Dark Mode'}
//                 </button>
//             </div>
//             <div className={`flex-1 overflow-y-auto p-5 border-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
//                 <div className="flex flex-col">
//                     {chatHistory.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
//                         >
//                             <div
//                                 className={`relative p-3 rounded-lg border-none ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
//                                 style={{ maxWidth: '70%' }}
//                             >
//                                 {msg.text}
//                                 {msg.type === 'bot' && (
//                                     <button
//                                         className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
//                                         onClick={() => handleCopy(msg.text)}
//                                     >
//                                         copy
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={chatContainerRef} />
//                 </div>
//             </div>
//             <form className="p-5 border-t border-gray-300 bg-white" onSubmit={handleSubmit}>
//                 <div className="flex items-center">
//                     <input
//                         type="text"
//                         className={`w-full p-3 border border-gray-300 text-lg rounded-l-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Enter your message"
//                     />
//                     <button
//                         type="submit"
//                         className="py-3 px-6 text-lg text-white bg-black rounded-r-lg transition-colors duration-300 hover:bg-green-400"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Claude;




import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SubscriptionAlert from '../components/SubscriptionAlert';  // Import the SubscriptionAlert component
import ErrorAlert from '../components/ErrorAlert';  // Import the ErrorAlert component

const Claude = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);  // State for showing the subscription alert
    const [showErrorAlert, setShowErrorAlert] = useState(false);  // State for showing the error alert
    const [errorAlertMessage, setErrorAlertMessage] = useState(''); // State for error alert message
    const chatContainerRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const userMessage = { type: 'user', text: message };
        setChatHistory(prev => [...prev, userMessage]);

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/claude/', { message }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const botResponse = res.data.response;
            const botMessage = { type: 'bot', text: botResponse };
            setChatHistory(prev => [...prev, botMessage]);
            setShowErrorAlert(false);  // Hide error alert if request is successful

        } catch (error) {
            console.error('Error getting response from chatbot:', error.response ? error.response.data : error.message);

            if (error.response && error.response.status === 403) {
                // Handle subscription error
                setShowSubscriptionAlert(true);
                setShowErrorAlert(false);  // Hide error alert if subscription error

            } else {
                // Handle other errors (e.g., backend server issues)
                setErrorAlertMessage('There was an issue with the chatbot service. Please try again later.');
                setShowErrorAlert(true);
                setShowSubscriptionAlert(false);  // Hide subscription alert if error from backend
            }

            const errorMessage = { type: 'bot', text: 'There was an issue with the service. Please try again later.' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
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
        setShowSubscriptionAlert(false);  // Close the subscription alert
    };

    const handleCloseErrorAlert = () => {
        setShowErrorAlert(false);  // Close the error alert
    };

    const handleSubscribe = () => {
        // Redirect to subscription page or handle subscription logic here
        console.log('Redirecting to subscription page...');
    };

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
            <div className={`flex justify-between items-center -mt-4 border-gray-300 ${darkMode ? '' : ''}`}>
                <div className="flex items-center">
                    <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with Claude 3.5 Sonnet</h2>
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
                                        copy
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
        </div>
    );
};

export default Claude;
