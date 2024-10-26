import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // Add subscription state

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('username', username);
        localStorage.setItem('userid', data.user_id);

        setIsSubscribed(data.is_subscribed);
        setUsername(username);
        setIsAuthenticated(true);
      } else {
        console.error('Login failed:', data.error);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    setIsAuthenticated(false);
    setUsername('');
    setIsSubscribed(false); // Reset subscription status on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, isSubscribed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
