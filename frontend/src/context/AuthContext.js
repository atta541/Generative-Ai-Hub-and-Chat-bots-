// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [username, setUsername] = useState('');
//     const [isSubscribed, setIsSubscribed] = useState(false); 

//     const login = async (username, password) => {
//         try {
//             const response = await fetch(`${BASE_URL}/api/login/`, {
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem('access_token', data.access);
//                 localStorage.setItem('refresh_token', data.refresh);
//                 localStorage.setItem('username', username);
//                 localStorage.setItem('userid', data.user_id);
//                 localStorage.setItem('setIsSubscribed', data.is_subscribed);

                

//                 setIsSubscribed(data.is_subscribed);

                
//                 setUsername(username);
//                 setIsAuthenticated(true); // Set authentication state here
//             } else {
//                 console.error('Login failed:', data.error);
//                 setIsAuthenticated(false);
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             setIsAuthenticated(false);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('username');
//         localStorage.removeItem('userid');
//         localStorage.removeItem('chatHistory');
//         setIsAuthenticated(false);
//         setUsername('');
//         setIsSubscribed(false); // Reset subscription status on logout
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, isSubscribed, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };




import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const subscriptionStatus = localStorage.getItem('is_subscribed') === 'true';

    if (token) {
      setIsAuthenticated(true);
      setIsSubscribed(subscriptionStatus);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_subscribed');
    setIsAuthenticated(false);
    setIsSubscribed(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isSubscribed, setIsSubscribed, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
