// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Home from './pages/Home';
// import Register from './components/Register';
// import Login from './components/Login';
// import Navbar from './components/Navbar';
// import Chatbot from './pages/LeftSidebar';
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import MainFooter from './components/MainFooter';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <MainContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// const MainContent = () => {
//   const location = useLocation(); 

//   return (
//     <>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//         <Route path="/chatbots" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
//       </Routes>
      
//       {/* Render MainFooter only when on the '/' page */}
//       {location.pathname === '/' && <MainFooter />}
//     </>
//   );
// };

// export default App;






// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Navbar from './components/Navbar';
// import Chatbot from './pages/LeftSidebar';
// import { AuthProvider, AuthContext } from './context/AuthContext'; // Import AuthContext
// import PrivateRoute from './context/PrivateRoute';
// import MainFooter from './components/MainFooter';
// import LandingPage from './pages/LandingPage';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <MainContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// const MainContent = () => {
//   const { isAuthenticated } = useContext(AuthContext); // Use useContext instead of useAuth

//   return (
//     <>
//       <Routes>
//         {/* Show LandingPage if user is not authenticated */}
//         <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
        
//         {/* Routes for login and register */}
//         <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
//         <Route path="/register" element={<Register />} />
        
//         {/* Authenticated routes */}
//         <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
//         <Route path="/chatbots" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
//       </Routes>

//       {/* Render MainFooter for all users */}
//       <MainFooter />
//     </>
//   );
// };

// export default App;




import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Chatbot from './pages/LeftSidebar';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Import AuthContext
import PrivateRoute from './context/PrivateRoute';
import MainFooter from './components/MainFooter';
import LandingPage from './pages/LandingPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="719066176783-ls7e7hu7sdn0n5k4eg8khdcmn8nkgtjm.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <Navbar />
          <MainContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

const MainContent = () => {
  const { isAuthenticated } = useContext(AuthContext); // Use useContext instead of useAuth

  return (
    <>
      <Routes>
        {/* Show LandingPage if user is not authenticated */}
        <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
        
        {/* Routes for login and register */}
        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Authenticated routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/chatbots" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
      </Routes>

      {/* Render MainFooter for all users */}
      <MainFooter />
    </>
  );
};

export default App;
