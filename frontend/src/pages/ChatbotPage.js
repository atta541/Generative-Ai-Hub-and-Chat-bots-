// // src/pages/ChatbotPage.js
// import React, { useState } from 'react';
// import LeftSidebar from './LeftSidebar';
// import Llama3Chatbot from '../components/Llama3Chatbot';
// import MixtralChatbot from '../components/MixtralChatbot';
// import GeminiChatbot from '../components/GeminiChatbot';

// function ChatbotPage() {
//   const [selectedChatbot, setSelectedChatbot] = useState(null);

//   const handleSelectChatbot = (chatbotName) => {
//     setSelectedChatbot(chatbotName);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <LeftSidebar onSelectChatbot={handleSelectChatbot} />
//       <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '20px' }}>
//         {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
//         {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
//         {selectedChatbot === 'Gemini' && <GeminiChatbot />}
//       </div>
//     </div>
//   );
// }

// export default ChatbotPage;
