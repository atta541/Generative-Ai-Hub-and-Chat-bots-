import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/chatbots');
  };

  return (
    <div className="home-container">
      <h1 className="main-title">AI Chatbots Hub</h1>
      <p className="subtitle">
        Explore the future of conversation with our advanced LLM-powered chatbots
      </p>

      <div className="features-container">
        <FeatureCard
          icon="💬"
          title="Open Source Models"
          description="Leverage the power of community-driven AI models for your chatbot needs."
        />
        <FeatureCard
          icon="🤖"
          title="Closed Source Solutions"
          description="Access state-of-the-art proprietary models for unparalleled performance."
        />
        <FeatureCard
          icon="🧠"
          title="Fine-Tuning Capabilities"
          description="Customize models to fit your specific use case and domain."
        />
      </div>

      <button className="explore-button" onClick={handleExplore}>
        Explore Our Chatbots
      </button>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #1a202c, #2d3748);
          color: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif; /* Add a cleaner font */
        }

        .main-title {
          font-size: 3.5rem; /* Increased size */
          font-weight: bold;
          text-align: center;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.5rem; /* Increased size */
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .features-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .explore-button {
          background-color: #4299e1;
          color: white;
          font-size: 1.25rem; /* Increased size */
          font-weight: bold;
          padding: 0.75rem 2rem; /* Adjusted padding for a bigger button */
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
        }

        .explore-button:hover {
          background-color: #3182ce;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>

      <style jsx>{`
        .feature-card {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: center;
          width: 300px;
          transition: transform 0.3s, box-shadow 0.3s; /* Transition for smooth hover effect */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Adding shadow */
        }

        .feature-card:hover {
          transform: scale(1.05); /* Grow effect */
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3); /* Darker shadow on hover */
        }

        .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .description {
          font-size: 1rem;
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
};

export default Home;
