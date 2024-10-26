import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryAtta = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/history_atta/2/');
        if (Array.isArray(response.data.conversations)) {
          setConversations(response.data.conversations);
        } else {
          console.error('API response does not contain an array of conversations:', response.data);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    // Initial fetch
    fetchConversations();

    // Set up polling
    const intervalId = setInterval(fetchConversations, 3600000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Helper function to truncate text to the first 5 words
  const truncateText = (text) => {
    const words = text.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text;
  };

  // Group conversations by date
  const groupedConversations = Array.isArray(conversations) ? conversations.reduce((acc, convo) => {
    const date = new Date(convo.created_at).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(convo);
    return acc;
  }, {}) : {};

  return (
    <div
      className="p-4 bg-[#171717] h-[90%]  overflow-y-auto"
      style={{
        scrollbarColor: '#333 #171717',
        scrollbarWidth: 'thin'
      }}
    >
      {Object.keys(groupedConversations).length > 0 ? (
        Object.keys(groupedConversations).map(date => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white -mt-5">
              {date === new Date().toDateString() ? 'Today' : 'Yesterday'}
            </h2>
            {groupedConversations[date].map((convo, index) => (
              <div key={index} className="mb-4 flex items-start h-10">
                {/* Bot response bubble with hover effect */}
                <div className="flex-1 p-3 rounded-lg ml-1 max-w-[200px] min-h-[20px] overflow-hidden bg-gray-800 text-white hover:shadow-md transition-shadow duration-300">
                  <p className="text-left whitespace-nowrap overflow-hidden text-ellipsis">
                    {truncateText(convo.bot_response)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-white">No conversations available.</p>
      )}
    </div>
  );
};

export default HistoryAtta;
