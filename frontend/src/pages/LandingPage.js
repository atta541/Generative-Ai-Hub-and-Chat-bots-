

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {/* Overlay with a semi-transparent white shade */}
      <div className="absolute inset-0 bg-white opacity-10"></div>

      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4">Next-Gen AI Chatbots</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Harness the power of fine-tuned language models for intelligent conversations</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300 shadow-lg"
          >
            Try Demo →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon="💬"
            title="Advanced Conversations"
            description="Engage in human-like dialogues with our state-of-the-art language models."
          />
          <FeatureCard
            icon="⚡"
            title="Lightning Fast"
            description="Experience real-time responses powered by efficient AI algorithms."
          />
          <FeatureCard
            icon="🧠"
            title="Fine-tuned Models"
            description="Customize chatbots with domain-specific knowledge for optimal performance."
          />
          <FeatureCard
            icon="🌐"
            title="Multi-lingual Support"
            description="Communicate effortlessly in multiple languages with our polyglot models."
          />
        </div>

        <div className={`bg-grey-100 rounded-lg shadow-xl p-8 text-center transition-opacity duration-800 border-2 border-blue-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-blue-800 mb-4">Ready to revolutionize your conversations?</h2>
          <p className="text-blue-600 mb-6">Join thousands of businesses already using our AI-powered chatbots.</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
