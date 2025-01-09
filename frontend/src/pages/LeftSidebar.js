// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Llama3Chatbot from '../chatbots/Llama3Chatbot';
// import MixtralChatbot from '../chatbots/MixtralChatbot';
// import Gemma from '../chatbots/Gemma';
// import ONE from '../pages/vedios/ONE.mp4';
// import PDF from '../chatbots/PDF';
// import Llama31Chatbot from '../chatbots/Llama31Chatbot';
// import Atta from '../chatbots/Atta';
// import HistoryAtta from '../components/history/History_Atta';
// import Claude from '../chatbots/ClaudeChatbot';
// import Gpt35 from '../chatbots/Gpt35';
// import Personalbot from '../chatbots/PersonalBot'
// import UOL from '../chatbots/Uol';
// import Llama32 from '../visionchatbots/llama32';


// const videoStyle = {
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   borderRadius: '5px',
// };

// function LeftSidebar() {
//   const location = useLocation();
//   const [selectedChatbot, setSelectedChatbot] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isHistoryVisible, setIsHistoryVisible] = useState(true); // State to manage history visibility

//   const handleChatbotClick = (chatbotName) => {
//     setSelectedChatbot(chatbotName);
//     setIsSidebarOpen(false);
//     setIsHistoryVisible(true); // Show history by default when a chatbot is selected
//   };

//   const toggleHistoryVisibility = () => {
//     setIsHistoryVisible(!isHistoryVisible);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-[90vh] w-full mt-0 border-2 border-black-300">
//       {/* Mobile Dropdown Button */}
//       <button
//         className="md:hidden p-3 bg-gray-700 text-white rounded-md mb-3"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         {isSidebarOpen ? 'Close Menu' : 'View Chatbots'}
//       </button>

//       {/* Sidebar for Desktop and Dropdown Menu for Mobile */}
//       <div
//         className={`md:flex ${isSidebarOpen ? 'flex' : 'hidden'} md:w-[15%] w-full p-3 shadow-md flex-col items-center md:mr-3 md:mb-0 mb-3   ${location.pathname === '/chatbots' ? 'bg-gray-900' : 'bg-transparent'}`}
//       >
//         <div className="flex flex-col gap-2 w-full">
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Llama3')}
//           >
//             Llama3
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Llama3.1')}
//           >
//             Llama3.1
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Mixtral')}
//           >
//             Mixtral
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Gpt3.5')}
//           >
//             Chat with gpt 3.5
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Claude')}
//           >
//             Claude 3.5 Sonnet
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Gemma')}
//           >
//             Gemma
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Uol')}
//           >
//             UOL
//           </button>

//           {/* vision models */}


//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('llama3.2-11b')}
//           >
//             llama3.2-11b
//           </button>

//           {/* end of vision models */}


//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Atta')}
//           >
//             Chat with Atta
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('PDF')}
//           >
//             Upload File
//           </button>
//           <button
//             className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
//             onClick={() => handleChatbotClick('Personalbot')}
//           >
//             Personal-Bot
//           </button>
//         </div>
//       </div>

//       {/* Chatbot Display Area */}
//       <div className="flex-1 p-5 rounded-md shadow-md flex justify-center items-center w-full ">
//         {selectedChatbot === null ? (
//           <video style={videoStyle} autoPlay loop muted>
//             <source src={ONE} type="video/mp4" />
//           </video>
//         ) : (
//           <>
//             {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
//             {selectedChatbot === 'Llama3.1' && <Llama31Chatbot />}
//             {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
//             {selectedChatbot === 'Claude' && <Claude />}
//             {selectedChatbot === 'Gpt3.5' && <Gpt35 />}
//             {selectedChatbot === 'Personalbot' && <Personalbot />}
//             {selectedChatbot === 'llama3.2-11b' && <Llama32/>}


//             {selectedChatbot === 'Gemma' && <Gemma />}
//             {/* {selectedChatbot === 'Gemma' && <Gemma />} */}

//             {selectedChatbot === 'Uol' && <UOL />}
//             {selectedChatbot === 'Atta' && <Atta />}

//             {selectedChatbot === 'PDF' && <PDF />}
//           </>
//         )}
//       </div>

//       {/* Right Side Space */}
//       {selectedChatbot && isHistoryVisible && (
//         <div className="hidden md:block md:w-[15%] p-3 bg-[#171717]">
//           {/* Button to toggle history visibility */}
//           {selectedChatbot !== 'PDF' && (
//             <button
//               className="mb-4 p-2 bg-gray-600 text-white rounded-md w-full"
//               onClick={toggleHistoryVisibility}
//             >
//               {isHistoryVisible ? 'Hide History' : 'Show History'}
//             </button>
//           )}

//           {/* Conditionally render content based on the selected chatbot and visibility */}
//           {isHistoryVisible && (
//             <>
//               {selectedChatbot === 'Llama3' && <HistoryAtta />}
//               {selectedChatbot === 'Llama3.1' && <HistoryAtta />}
//               {selectedChatbot === 'Mixtral' && <HistoryAtta />}
//               {selectedChatbot === 'Claude' && <HistoryAtta />}
//               {selectedChatbot === 'Gpt3.5' && <HistoryAtta />}
//               {selectedChatbot === 'Gemma' && <HistoryAtta />}
//               {selectedChatbot === 'Atta' && <HistoryAtta />}
//               {selectedChatbot === 'PDF' && <p>History will be added soon</p>}
//               {selectedChatbot === 'Personalbot' && <p>History will be added soon</p>}


//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LeftSidebar;




import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Llama3Chatbot from '../chatbots/Llama3Chatbot';
import MixtralChatbot from '../chatbots/MixtralChatbot';
import Gemma from '../chatbots/Gemma';
// import ONE from '../pages/vedios/ONE.mp4';
import PDF from '../chatbots/PDF';
import Llama31Chatbot from '../chatbots/Llama31Chatbot';
import Atta from '../chatbots/Atta';
import HistoryAtta from '../components/history/History_Atta';
import Claude from '../chatbots/ClaudeChatbot';
import Gpt35 from '../chatbots/Gpt35';
import Personalbot from '../chatbots/PersonalBot'
import UOL from '../chatbots/Uol';
import Llama32 from '../visionchatbots/llama32';
import Welcomechatbot from '../chatbots/Welcomechatbot';
import CricketBot from '../chatbots/CricketBot';
import LlamaVisionFree from '../chatbots/LlamaVisionFree';
import Gemini from '../chatbots/Gemini';
// const videoStyle = {
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   borderRadius: '5px',
// };

function LeftSidebar() {
  const location = useLocation();
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);

  const handleChatbotClick = (chatbotName) => {
    setSelectedChatbot(chatbotName);
    setIsSidebarOpen(false);
    setIsHistoryVisible(true);
  };

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  return (
    <div className="flex flex-col md:flex-row h-[90vh] w-full mt-0 border-2 border-black-300">
      {/* Mobile Dropdown Button */}
      <button
        className="md:hidden p-3 bg-gray-700 text-white rounded-md mb-3"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Menu' : 'View Chatbots'}
      </button>

      {/* Sidebar for Desktop and Dropdown Menu for Mobile */}
      <div
        className={`md:flex ${isSidebarOpen ? 'flex' : 'hidden'} md:w-[15%] w-full p-3 shadow-md flex-col items-center md:mr-3 md:mb-0 mb-3 ${location.pathname === '/chatbots' ? 'bg-gray-900' : 'bg-transparent'} overflow-y-auto max-h-[90vh]`}
      >
        <div className="flex flex-col gap-2 w-full">
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Llama3')}
          >
            Llama3
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Llama3.1')}
          >
            Llama3.1
          </button>



          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('LlamaVisionFree')}
          >
            LlamaVisionFree
          </button>



          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Mixtral')}
          >
            Mixtral
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Gpt3.5')}
          >
            Chat with gpt 3.5
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Claude')}
          >
            Claude 3.5 Sonnet
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Gemma')}
          >
            Gemma
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Uol')}
          >
            UOL
          </button>

          {/* vision models */}
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('llama3.2-11b')}
          >
            llama3.2-11b
          </button>
          {/* end of vision models */}

          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Atta')}
          >
            Chat with Atta
          </button>



          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('gemini')}
          >
            Chat with gemini pics
          </button>




          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('PDF')}
          >
            Upload File
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Personalbot')}
          >
            Personal-Bot
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('Personalbot')}
          >
            Personal-Bot
          </button>
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('cricketbot')}
          >
            Crikcet-Bot
          </button>
        </div>
      </div>

      {/* Chatbot Display Area */}
      <div className="flex-1 p-5 rounded-md shadow-md flex justify-center items-center w-full">
        {selectedChatbot === null ? (
          // <video style={videoStyle} autoPlay loop muted>
          //   <source src={ONE} type="video/mp4" />
          // </video>
          <Welcomechatbot />
        ) : (
          <>
            {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
            {selectedChatbot === 'Llama3.1' && <Llama31Chatbot />}
            {selectedChatbot === 'LlamaVisionFree' && <LlamaVisionFree />}
            {selectedChatbot === 'gemini' && <Gemini />}


            {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
            {selectedChatbot === 'Claude' && <Claude />}
            {selectedChatbot === 'Gpt3.5' && <Gpt35 />}
            {selectedChatbot === 'Personalbot' && <Personalbot />}
            {selectedChatbot === 'llama3.2-11b' && <Llama32 />}


            {selectedChatbot === 'cricketbot' && <CricketBot />}
            {/* {selectedChatbot === 'llama3.2-11b' && <Llama32 />} */}
            {selectedChatbot === 'Gemma' && <Gemma />}
            {selectedChatbot === 'Uol' && <UOL />}
            {selectedChatbot === 'Atta' && <Atta />}
            {selectedChatbot === 'PDF' && <PDF />}
          </>
        )}
      </div>

      {/* Right Side Space */}
      {selectedChatbot && isHistoryVisible && (
        <div className="hidden md:block md:w-[15%] p-3 bg-[#171717]">
          {/* Button to toggle history visibility */}
          {selectedChatbot !== 'PDF' && (
            <button
              className="mb-4 p-2 bg-gray-600 text-white rounded-md w-full"
              onClick={toggleHistoryVisibility}
            >
              {isHistoryVisible ? 'Hide History' : 'Show History'}
            </button>
          )}

          {/* Conditionally render content based on the selected chatbot and visibility */}
          {isHistoryVisible && (
            <>
              {selectedChatbot === 'Llama3' && <HistoryAtta />}
              {selectedChatbot === 'Llama3.1' && <HistoryAtta />}
              {selectedChatbot === 'Mixtral' && <HistoryAtta />}
              {selectedChatbot === 'Claude' && <HistoryAtta />}
              {selectedChatbot === 'Gpt3.5' && <HistoryAtta />}
              {selectedChatbot === 'Gemma' && <HistoryAtta />}
              {selectedChatbot === 'Atta' && <HistoryAtta />}
              {selectedChatbot === 'PDF' && <p>History will be added soon</p>}
              {selectedChatbot === 'Personalbot' && <p>History will be added soon</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
