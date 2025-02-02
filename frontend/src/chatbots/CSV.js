import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CSV = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [csvId, setCsvId] = useState(null); // Store the uploaded CSV ID
  const chatContainerRef = useRef(null);

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert('Please upload a CSV file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('csv', csvFile);

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${BASE_URL}/api/upload_csv/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setCsvId(response.data.csv_id); // Save the returned CSV ID
      alert('CSV uploaded and processed successfully.');
      setCsvFile(null);
    } catch (error) {
      console.error('Error uploading CSV:', error);
      alert('Failed to upload CSV.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '' || !csvId) {
      alert('Please upload a CSV and provide a message.');
      return;
    }

    const userMessage = { type: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const token = localStorage.getItem('access_token');
      const res = await axios.get(`${BASE_URL}/api/csvchat/`, {
        params: { csv_id: csvId, question: message },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const botResponse = res.data.response;
      const botMessage = { type: 'bot', text: botResponse };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response from chatbot:', error);
      const errorMessage = { type: 'bot', text: 'Error getting response from chatbot.' };
      setChatHistory((prev) => [...prev, errorMessage]);
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
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
      <div className={`flex justify-between items-center -mt-5 border-gray-300`}>
        <h2 className={`text-2xl text-black mt-8 ${darkMode ? 'text-white' : ''}`}>Chat with your file</h2>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="flex flex-col">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`relative p-3 rounded-lg ${msg.type === 'user' ? (darkMode ? 'bg-blue-400 text-white' : 'bg-black text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black')}`}
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
      <div className="p-5 border-t border-gray-300 bg-white">
        <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              className="p-2 border border-gray-300 text-sm rounded-md"
              accept=".csv"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className={`py-1 px-3 text-sm text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-black'} transition-colors duration-300 hover:${loading ? '' : 'bg-green-400'}`}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              className={`w-full p-2 border border-gray-300 text-lg rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <button
              type="submit"
              className="py-2 px-4 text-lg text-white bg-black rounded-md transition-colors duration-300 hover:bg-green-400"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CSV;