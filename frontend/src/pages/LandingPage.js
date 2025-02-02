import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import { FaComments, FaBolt, FaBrain, FaGlobe, FaShieldAlt, FaRocket, FaHeadset } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 border border-white/20">
    <div className="text-blue-400 text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const WhyChooseUsCard = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-6 bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 border border-white/20">
    <div className="text-blue-500 text-4xl">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
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
              Next-Gen AI Chatbots
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Harness the power of fine-tuned language models for intelligent conversations.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-xl"
            >
              Try Demo →
            </button>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <FeatureCard icon={<FaComments />} title="Advanced Conversations" description="Engage in human-like dialogues with our state-of-the-art language models." />
            <FeatureCard icon={<FaBolt />} title="Lightning Fast" description="Experience real-time responses powered by efficient AI algorithms." />
            <FeatureCard icon={<FaBrain />} title="Fine-tuned Models" description="Customize chatbots with domain-specific knowledge for optimal performance." />
            <FeatureCard icon={<FaGlobe />} title="Multi-lingual Support" description="Communicate effortlessly in multiple languages with our polyglot models." />
          </div>

          {/* Why Choose Us Section */}
          <section className="text-center py-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose Us?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-10">
              Our AI chatbots are designed to offer intelligent, efficient, and scalable solutions for businesses worldwide.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <WhyChooseUsCard icon={<FaShieldAlt />} title="Secure & Reliable" description="End-to-end encryption ensures secure and trustworthy interactions." />
              <WhyChooseUsCard icon={<FaRocket />} title="Scalable Performance" description="Whether you're a startup or an enterprise, our AI chatbots scale with your needs." />
              <WhyChooseUsCard icon={<FaHeadset />} title="24/7 Customer Support" description="Get round-the-clock assistance to ensure seamless chatbot performance." />
            </div>
          </section>

          {/* Call-to-Action Section */}
          <div
            className={`bg-blue-600 bg-opacity-20 backdrop-blur-xl rounded-lg shadow-xl p-10 text-center transition-opacity duration-700 border border-white/20 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Ready to revolutionize your conversations?</h2>
            <p className="text-lg text-gray-300 mb-6">Join thousands of businesses already using our AI-powered chatbots.</p>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-xl"
            >
              Get Started Now
            </button>
          </div>
        </main>
      </div>

      <MainFooter />
    </>
  );
};

export default LandingPage;

