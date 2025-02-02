import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Llama3Chatbot from '../chatbots/Llama3Chatbot';
import MixtralChatbot from '../chatbots/MixtralChatbot';
import Gemma from '../chatbots/Gemma';
import PDF from '../chatbots/PDF';
import Llama31Chatbot from '../chatbots/Llama31Chatbot';
import Atta from '../chatbots/Atta';
// import HistoryAtta from '../components/history/History_Atta';
import Claude from '../chatbots/ClaudeChatbot';
import Gpt35 from '../chatbots/Gpt35';
import Personalbot from '../chatbots/PersonalBot';
import UOL from '../chatbots/Uol';
import Llama32 from '../visionchatbots/llama32';
import Welcomechatbot from '../chatbots/Welcomechatbot';
import CricketBot from '../chatbots/CricketBot';
import LlamaVisionFree from '../chatbots/LlamaVisionFree';
import Gemini from '../chatbots/Gemini';
import UolTurbo from '../chatbots/UolTurbo';
import Deepseek from '../chatbots/DeepseekText';
import FluxImage from '../chatbots/FluxImage';
import Tavilysearch from '../chatbots/TavilySearch';
import CSV from '../chatbots/CSV';
import IslamicBot from '../chatbots/IslamicBot';

function LeftSidebar() {
  const location = useLocation();
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isHistoryVisible, setIsHistoryVisible] = useState(true);

  const handleChatbotClick = (chatbotName) => {
    setSelectedChatbot(chatbotName);
    setIsSidebarOpen(false);
    // setIsHistoryVisible(true);
  };

  // const toggleHistoryVisibility = () => {
  //   setIsHistoryVisible(!isHistoryVisible);
  // };

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
            onClick={() => handleChatbotClick('DeepseekR1Distill')}
          >
            Deepseek R1 Distill
          </button>



          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('FluxImage')}
          >
            FluxImage          </button>


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
            Upload File pdf
          </button>



          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('islamicbot')}
          >
            islamicbot
            
          </button>




          
          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('CSV')}
          >
            Upload File csv
          </button>

          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('tavilysearch')}
          >
            tavilysearch          </button>




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
            Cricket-Bot
          </button>

          <button
            className="bg-gray-700 text-white border-none py-3 rounded-md cursor-pointer w-full text-center text-lg font-sans transition-transform duration-100"
            onClick={() => handleChatbotClick('uol-turbo')}
          >
            Uol Turbo
          </button>
        </div>
      </div>

      {/* Chatbot Display Area */}
      <div className="flex-1 p-5 rounded-md shadow-md flex justify-center items-center w-full">
        {selectedChatbot === null ? (
          <Welcomechatbot />
        ) : (
          <>
            {selectedChatbot === 'Llama3' && <Llama3Chatbot />}
            {selectedChatbot === 'Llama3.1' && <Llama31Chatbot />}
            {selectedChatbot === 'LlamaVisionFree' && <LlamaVisionFree />}
            {selectedChatbot === 'DeepseekR1Distill' && <Deepseek />}
            {selectedChatbot === 'FluxImage' && <FluxImage />}
            {selectedChatbot === 'gemini' && <Gemini />}
            {selectedChatbot === 'tavilysearch' && <Tavilysearch />}

            {selectedChatbot === 'Mixtral' && <MixtralChatbot />}
            {selectedChatbot === 'Claude' && <Claude />}
            {selectedChatbot === 'Gpt3.5' && <Gpt35 />}
            {selectedChatbot === 'Personalbot' && <Personalbot />}
            {selectedChatbot === 'llama3.2-11b' && <Llama32 />}
            {selectedChatbot === 'cricketbot' && <CricketBot />}
            {selectedChatbot === 'Gemma' && <Gemma />}
            {selectedChatbot === 'Uol' && <UOL />}
            {selectedChatbot === 'uol-turbo' && <UolTurbo />}
            {selectedChatbot === 'islamicbot' && <IslamicBot />}

            {selectedChatbot === 'Atta' && <Atta />}
            {selectedChatbot === 'PDF' && <PDF />}
            {selectedChatbot === 'CSV' && <CSV />}

          </>
        )}
      </div>

      {/* {selectedChatbot && isHistoryVisible && (
        <div className="hidden md:block md:w-[15%] p-3 bg-[#171717]">
          {selectedChatbot !== 'PDF' && (
            <button
              className="mb-4 p-2 bg-gray-600 text-white rounded-md w-full"
              onClick={toggleHistoryVisibility}
            >
              {isHistoryVisible ? 'Hide History' : 'Show History'}
            </button>
          )}

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
      )} */}
    </div>
  );
}

export default LeftSidebar;
