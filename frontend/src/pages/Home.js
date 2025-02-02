// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import MainFooter from '../components/MainFooter';

// const Home = () => {
//   const navigate = useNavigate();

//   const handleExplore = () => {
//     navigate('/chatbots');
//   };

//   return (
//     <div className="home-container">
//       <h1 className="main-title">AI Chatbots Hub</h1>
//       <p className="subtitle">
//         Explore the future of conversation with our advanced LLM-powered chatbots
//       </p>

//       <div className="features-container">
//         <FeatureCard
//           icon="💬"
//           title="Open Source Models"
//           description="Leverage the power of community-driven AI models for your chatbot needs."
//         />
//         <FeatureCard
//           icon="🤖"
//           title="Closed Source Solutions"
//           description="Access state-of-the-art proprietary models for unparalleled performance."
//         />
//         <FeatureCard
//           icon="🧠"
//           title="Fine-Tuning Capabilities"
//           description="Customize models to fit your specific use case and domain."
//         />
//       </div>

//       <button className="explore-button" onClick={handleExplore}>
//         Explore Our Chatbots
//       </button>


//       <MainFooter/>

//       <style jsx>{`
//         .home-container {
//           min-height: 100vh;
//           background: linear-gradient(to bottom right, #1a202c, #2d3748);
//           color: white;
//           padding: 2rem;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           font-family: Arial, sans-serif; /* Add a cleaner font */
//         }

//         .main-title {
//           font-size: 3.5rem; /* Increased size */
//           font-weight: bold;
//           text-align: center;
//           margin-bottom: 1rem;
//         }

//         .subtitle {
//           font-size: 1.5rem; /* Increased size */
//           text-align: center;
//           margin-bottom: 3rem;
//           max-width: 600px;
//         }

//         .features-container {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: center;
//           gap: 2rem;
//           margin-bottom: 3rem;
//         }

//         .explore-button {
//           background-color: #4299e1;
//           color: white;
//           font-size: 1.25rem; /* Increased size */
//           font-weight: bold;
//           padding: 0.75rem 2rem; /* Adjusted padding for a bigger button */
//           border: none;
//           border-radius: 9999px;
//           cursor: pointer;
//           transition: background-color 0.3s, transform 0.3s;
//         }

//         .explore-button:hover {
//           background-color: #3182ce;
//           transform: scale(1.05);
//         }
//       `}</style>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }) => {
//   return (
//     <div className="feature-card">
//       <div className="icon">{icon}</div>
//       <h2 className="title">{title}</h2>
//       <p className="description">{description}</p>

//       <style jsx>{`
//         .feature-card {
//           background-color: rgba(255, 255, 255, 0.1);
//           border-radius: 0.5rem;
//           padding: 1.5rem;
//           text-align: center;
//           width: 300px;
//           transition: transform 0.3s, box-shadow 0.3s; /* Transition for smooth hover effect */
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Adding shadow */
//         }

//         .feature-card:hover {
//           transform: scale(1.05); /* Grow effect */
//           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3); /* Darker shadow on hover */
//         }

//         .icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//         }

//         .title {
//           font-size: 1.5rem;
//           font-weight: bold;
//           margin-bottom: 0.5rem;
//         }

//         .description {
//           font-size: 1rem;
//           color: #e2e8f0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import { FaComments, FaBolt, FaBrain, FaGlobe } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 border border-white/20">
    <div className="text-blue-400 text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExplore = () => {
    navigate("/chatbots");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-black"></div>

      <main className="container mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-wide drop-shadow-md">
            AI Chatbots Hub
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore the future of conversation with our advanced LLM-powered chatbots.
          </p>
          <button
            onClick={handleExplore}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-xl"
          >
            Explore Our Chatbots →
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<FaComments />}
            title="Open Source Models"
            description="Leverage the power of community-driven AI models for your chatbot needs."
          />
          <FeatureCard
            icon={<FaBolt />}
            title="Closed Source Solutions"
            description="Access state-of-the-art proprietary models for unparalleled performance."
          />
          <FeatureCard
            icon={<FaBrain />}
            title="Fine-Tuning Capabilities"
            description="Customize models to fit your specific use case and domain."
          />
          <FeatureCard
            icon={<FaGlobe />}
            title="Multi-lingual Support"
            description="Communicate effortlessly in multiple languages with our polyglot models."
          />
        </div>

        {/* Call-to-Action Section */}
        <div
          className={`bg-blue-600 bg-opacity-20 backdrop-blur-xl rounded-lg shadow-xl p-10 text-center transition-opacity duration-700 border border-white/20 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Ready to revolutionize your conversations?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of businesses already using our AI-powered chatbots.
          </p>
          <button
            onClick={handleExplore}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default Home;
