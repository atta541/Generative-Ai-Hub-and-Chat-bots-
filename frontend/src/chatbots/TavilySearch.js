// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const TavilySearch = () => {
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState(() => {
//         // Load chat history from localStorage on initial render
//         const savedHistory = localStorage.getItem('chatHistory');
//         return savedHistory ? JSON.parse(savedHistory) : [];
//     });
//     const [darkMode, setDarkMode] = useState(false);
//     const chatContainerRef = useRef(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message.trim() === '') return;
    
//         const userMessage = { type: 'user', text: message };
//         setChatHistory((prev) => [...prev, userMessage]);
    
//         try {
//             const res = await axios.post(`${BASE_URL}/api/tavilysearch/`, { message }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//                 },
//             });
//             const botResponse = res.data.response; // Ensure this is a string
//             const botMessage = { type: 'bot', text: botResponse };
//             setChatHistory((prev) => [...prev, botMessage]);
//         } catch (error) {
//             console.error('Error getting response from chatbot:', error);
//             const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
//             setChatHistory((prev) => [...prev, errorMessage]);
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
//         setDarkMode((prevMode) => !prevMode);
//     };

//     useEffect(() => {
//         chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [chatHistory]);

//     useEffect(() => {
//         // Save chat history to localStorage whenever it changes
//         localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
//     }, [chatHistory]);

//     useEffect(() => {
//         // Clear chat history on logout (for demonstration purposes)
//         const handleLogout = () => {
//             localStorage.removeItem('chatHistory');
//         };
//         window.addEventListener('beforeunload', handleLogout);
//         return () => window.removeEventListener('beforeunload', handleLogout);
//     }, []);

//     return (
//         <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
//             <div className={`flex justify-between items-center -mt-4 border-gray-300 ${darkMode ? '' : ''}`}>
//                 <div className="flex items-center">
//                     <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with Tavily Search </h2>
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

// export default TavilySearch;




// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const TavilySearch = () => {
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [darkMode, setDarkMode] = useState(false);
//     const chatContainerRef = useRef(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message.trim() === '') return;
    
//         const userMessage = { type: 'user', text: message };
//         setChatHistory((prev) => [...prev, userMessage]);
    
//         try {
//             const res = await axios.post(`${BASE_URL}/api/tavilysearch/`, { message }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//                 },
//             });
//             const botResponse = res.data.response;
//             const botMessage = { type: 'bot', text: botResponse };
//             setChatHistory((prev) => [...prev, botMessage]);
//         } catch (error) {
//             console.error('Error getting response from chatbot:', error);
//             const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
//             setChatHistory((prev) => [...prev, errorMessage]);
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
//         setDarkMode((prevMode) => !prevMode);
//     };

//     useEffect(() => {
//         chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [chatHistory]);

//     return (
//         <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
//             <div className={`flex justify-between items-center -mt-4 border-gray-300`}>
//                 <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with Tavily Search</h2>
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
//                         <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//                             <div className={`relative p-3 rounded-lg border-none ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
//                                 style={{ maxWidth: '70%' }}>
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

// export default TavilySearch;




import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TavilySearch = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const chatContainerRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const userMessage = { type: 'user', text: message };
        setChatHistory((prev) => [...prev, userMessage]);

        try {
            const res = await axios.post(`${BASE_URL}/api/tavilysearch/`, { message }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            const botResponse = res.data.response;
            const botMessage = { type: 'bot', text: formatBotResponse(botResponse) };
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error getting response from chatbot:', error);
            const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setMessage('');
        }
    };

    const formatBotResponse = (botResponse) => {
        // Format the response to display URLs and content in a readable way
        return botResponse.map((item, index) => (
            <div key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    {item.url}
                </a>
                <p>{item.content}</p>
            </div>
        ));
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch((err) => console.error('Failed to copy text:', err));
    };

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
            <div className={`flex justify-between items-center -mt-4 border-gray-300`}>
                <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with Tavily Search</h2>
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
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                            <div className={`relative p-3 rounded-lg border-none ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`} style={{ maxWidth: '70%' }}>
                                {msg.type === 'bot' ? msg.text : msg.text}
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
        </div>
    );
};

export default TavilySearch;
