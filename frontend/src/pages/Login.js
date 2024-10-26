import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <FaUser className="text-purple-400 text-4xl" />
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
        </div>
        <p className="text-gray-400 text-center">Please login to continue</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-purple-400 underline hover:text-purple-500"
          >
            Register here
          </button>
        </p>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        <div className="text-center text-gray-500">
          <p>Or</p>
          <p className="text-purple-400 cursor-pointer hover:text-purple-300">Continue with Google</p>
          <p className="text-purple-400 cursor-pointer hover:text-purple-300">Continue with Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
