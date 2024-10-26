// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// // import attaprofile from '../assets/attaprofile.jpg';
// import PromptInput from './PromptInput';

// const PersonalBot = () => {
//     const [message, setMessage] = useState('');
//     const [promptInstructions, setPromptInstructions] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [darkMode, setDarkMode] = useState(false);
//     const [showPromptModal, setShowPromptModal] = useState(true);
//     const chatContainerRef = useRef(null);

//     const handlePromptSubmit = (prompt) => {
//         setPromptInstructions(prompt);
//         setShowPromptModal(false); // Hide the modal after prompt is submitted
//     };

//     const handleEditPrompt = () => {
//         setShowPromptModal(true); // Show the modal to edit the prompt
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message.trim() === '' || promptInstructions.trim() === '') return;

//         const userMessage = { type: 'user', text: message };
//         setChatHistory(prev => [...prev, userMessage]);

//         try {
//             const res = await axios.post('http://127.0.0.1:8000/api/personalbot/', { 
//                 message, 
//                 prompt_instructions: promptInstructions 
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//                 }
//             });
//             const botResponse = res.data.response;
//             const botMessage = { type: 'bot', text: botResponse };
//             setChatHistory(prev => [...prev, botMessage]);
//         } catch (error) {
//             console.error('Error getting response from chatbot:', error);
//             const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
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
//             {showPromptModal && <PromptInput onPromptSubmit={handlePromptSubmit} initialPrompt={promptInstructions} />}
            
//             {!showPromptModal && (
//                 <>
//                     <div className={`flex justify-between items-center p-4 border-b border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//                         <div className="flex items-center space-x-4">
//                             {/* <img src={attaprofile} alt="Atta-ur-rehman" className="w-12 h-12 rounded-full" /> */}
//                             <div>
//                                 <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with your Personal-Bot</h2>
//                                 <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{promptInstructions}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 className="py-2 px-4 bg-green-500 text-white rounded-lg font-semibold transition-all hover:bg-green-600"
//                                 onClick={handleEditPrompt}
//                             >
//                                 Edit Prompt
//                             </button>
//                             <button
//                                 className="py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold transition-all hover:bg-blue-700"
//                                 onClick={toggleDarkMode}
//                             >
//                                 {darkMode ? 'Light Mode' : 'Dark Mode'}
//                             </button>
//                         </div>
//                     </div>
//                     <div className={`flex-1 overflow-y-auto p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
//                         <div className="flex flex-col">
//                             {chatHistory.map((msg, index) => (
//                                 <div
//                                     key={index}
//                                     className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
//                                 >
//                                     <div
//                                         className={`relative p-4 rounded-lg ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
//                                         style={{ maxWidth: '70%' }}
//                                     >
//                                         {msg.text}
//                                         {msg.type === 'bot' && (
//                                             <button
//                                                 className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
//                                                 onClick={() => handleCopy(msg.text)}
//                                             >
//                                                 copy
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                             <div ref={chatContainerRef} />
//                         </div>
//                     </div>
//                     <form className="p-4 bg-gray-100" onSubmit={handleSubmit}>
//                         <div className="flex items-center">
//                             <input
//                                 type="text"
//                                 className={`w-full p-3 border border-gray-300 text-lg rounded-l-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 placeholder="Enter your message"
//                             />
//                             <button
//                                 type="submit"
//                                 className="py-3 px-6 text-lg text-white bg-blue-500 rounded-r-lg transition-colors duration-300 hover:bg-blue-700"
//                             >
//                                 Send
//                             </button>
//                         </div>
//                     </form>
//                 </>
//             )}
//         </div>
//     );
// };

// export default PersonalBot;



import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import PromptInput from '../components/PromptInput';

const PersonalBot = () => {
    const [message, setMessage] = useState('');
    const [promptInstructions, setPromptInstructions] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [showPromptModal, setShowPromptModal] = useState(true);
    const chatContainerRef = useRef(null);

    const handlePromptSubmit = (prompt) => {
        setPromptInstructions(prompt);
        setShowPromptModal(false); // Hide the modal after prompt is submitted
    };

    const handleEditPrompt = () => {
        setShowPromptModal(true); // Show the modal to edit the prompt
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '' || promptInstructions.trim() === '') return;

        const userMessage = { type: 'user', text: message };
        setChatHistory(prev => [...prev, userMessage]);

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/personalbot/', { 
                message, 
                prompt_instructions: promptInstructions 
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const botResponse = res.data.response;
            const botMessage = { type: 'bot', text: botResponse };
            setChatHistory(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error getting response from chatbot:', error);
            const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
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

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const truncateText = (text, wordLimit = 30) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return `${words.slice(0, wordLimit).join(' ')}...`;
    };

    return (
        <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
            {showPromptModal && <PromptInput onPromptSubmit={handlePromptSubmit} initialPrompt={promptInstructions} />}
            
            {!showPromptModal && (
                <>
                    <div className={`flex justify-between items-center p-4 border-b border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex items-center space-x-4">
                            {/* <img src={attaprofile} alt="Atta-ur-rehman" className="w-12 h-12 rounded-full" /> */}
                            <div>
                                <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Chat with your Personal-Bot</h2>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {truncateText(promptInstructions)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                className="py-2 px-4 bg-green-500 text-white rounded-lg font-semibold transition-all hover:bg-green-600"
                                onClick={handleEditPrompt}
                            >
                                Edit Prompt
                            </button>
                            <button
                                className="py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold transition-all hover:bg-blue-700"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 overflow-y-auto p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
                        <div className="flex flex-col">
                            {chatHistory.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                                >
                                    <div
                                        className={`relative p-4 rounded-lg ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
                                        style={{ maxWidth: '70%' }}
                                    >
                                        {/* Display full bot response text */}
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
                    <form className="p-4 bg-gray-100" onSubmit={handleSubmit}>
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
                                className="py-3 px-6 text-lg text-white bg-blue-500 rounded-r-lg transition-colors duration-300 hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default PersonalBot;
