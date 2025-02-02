// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FaUser, FaLock } from 'react-icons/fa'; 

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(username, password);
//       navigate('/home');
//     } catch (error) {
//       setMessage('Login failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//         <div className="flex items-center justify-center space-x-2">
//           <FaUser className="text-purple-400 text-4xl" />
//           <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
//         </div>
//         <p className="text-gray-400 text-center">Please login to continue</p>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <FaUser className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div className="relative">
//             <FaLock className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-gray-400 text-center">
//           Don't have an account?{' '}
//           <button
//             onClick={() => navigate('/register')}
//             className="text-purple-400 underline hover:text-purple-500"
//           >
//             Register here
//           </button>
//         </p>
//         {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
//         <div className="text-center text-gray-500">
//           <p>Or</p>
//           <p className="text-purple-400 cursor-pointer hover:text-purple-300">Continue with Google</p>
//           <p className="text-purple-400 cursor-pointer hover:text-purple-300">Continue with Facebook</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleGoogleSuccess = async (credentialResponse) => {
//     // Check if credentialResponse is defined and contains the token
//     if (credentialResponse && credentialResponse.credential) {
//         const token = credentialResponse.credential; // Ensure you are accessing the right property

//         console.log('Extracted token:', token); // Log the token for debugging

//         try {
//             const { data } = await axios.post('http://localhost:8000/api/google-login/', {
//                 token: token,
//             });

//             if (data.access_token) {
//                 localStorage.setItem('access_token', data.access_token);
//                 localStorage.setItem('refresh_token', data.refresh_token);
//                 console.log('Login successful');
//                 navigate('/home');  // Redirect to home or desired page
//             } else {
//                 console.error('Login failed:', data.error);
//             }
//         } catch (error) {
//             console.error('Request failed:', error.response?.data || error.message);
//             setMessage(error.response?.data?.error || 'Google login failed');
//         }
//     } else {
//         console.error('No token received'); // Keep this for debugging
//     }
// };




//   const googleLogin = useGoogleLogin({
//     onSuccess: handleGoogleSuccess,
//     onError: () => setMessage('Google login failed'),
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(username, password);
//       navigate('/home');
//     } catch (error) {
//       setMessage('Login failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//         <div className="flex items-center justify-center space-x-2">
//           <FaUser className="text-purple-400 text-4xl" />
//           <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
//         </div>
//         <p className="text-gray-400 text-center">Please login to continue</p>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <FaUser className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <div className="relative">
//             <FaLock className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-gray-400 text-center">
//           Don't have an account?{' '}
//           <button
//             onClick={() => navigate('/register')}
//             className="text-purple-400 underline hover:text-purple-500"
//           >
//             Register here
//           </button>
//         </p>
//         {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
//         <div className="text-center text-gray-500">
//           <p>Or</p>
//           <button
//             onClick={googleLogin}
//             className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold transition duration-300 hover:bg-blue-600"
//           >
//             Continue with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const { login } = useContext(AuthContext);



//     const handleGoogleSuccess = async (credentialResponse) => {
//       const { access_token } = credentialResponse;

//       if (access_token) {
//           try {
//               // Fetch user information from Google using the access_token
//               const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
//               const { email, given_name: firstName, family_name: lastName, picture } = userInfoResponse.data;

//               // Send user info to your backend
//               const { data } = await axios.post('http://localhost:8000/api/google-login/', {
//                   email,
//                   first_name: firstName,
//                   last_name: lastName,
//                   picture,
//               });

//               if (data.access_token) {
//                   localStorage.setItem('access_token', data.access_token);
//                   localStorage.setItem('refresh_token', data.refresh_token);
//                   console.log('Login successful, tokens saved to local storage');
//                   navigate('/home');
//               } else {
//                   console.error('Login failed:', data.error);
//                   setMessage(data.error || 'Login failed');
//               }
//           } catch (error) {
//               console.error('Request failed:', error.response?.data || error.message);
//               setMessage(error.response?.data?.error || 'Google login failed');
//           }
//       } else {
//           console.error('No access token received. Full response:', credentialResponse);
//           setMessage('No access token received. Please check your Google login configuration.');
//       }
//   };




//   const googleLogin = useGoogleLogin({
//     onSuccess: handleGoogleSuccess,
//     onError: () => setMessage('Google login failed'),
//     scope: 'openid email profile', // Ensure 'openid' is included
//     flow: 'implicit', // Make sure you're using the correct flow
// });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(username, password);
//             navigate('/home');
//         } catch (error) {
//             setMessage('Login failed');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//                 <div className="flex items-center justify-center space-x-2">
//                     <FaUser className="text-purple-400 text-4xl" />
//                     <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
//                 </div>
//                 <p className="text-gray-400 text-center">Please login to continue</p>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="relative">
//                         <FaUser className="absolute left-3 top-3 text-gray-500" />
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             placeholder="Username"
//                             className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>
//                     <div className="relative">
//                         <FaLock className="absolute left-3 top-3 text-gray-500" />
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
//                             className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <p className="text-gray-400 text-center">
//                     Don't have an account?{' '}
//                     <button
//                         onClick={() => navigate('/register')}
//                         className="text-purple-400 underline hover:text-purple-500"
//                     >
//                         Register here
//                     </button>
//                 </p>
//                 {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
//                 <div className="text-center text-gray-500">
//                     <p>Or</p>
//                     <button
//                         onClick={googleLogin}
//                         className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold transition duration-300 hover:bg-blue-600"
//                     >
//                         Continue with Google
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;



// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';



// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const { login, setIsAuthenticated } = useContext(AuthContext); // Include setIsAuthenticated

//     const handleGoogleSuccess = async (credentialResponse) => {
//         const { access_token } = credentialResponse;

//         if (access_token) {
//             try {
//                 // Fetch user information from Google using the access_token
//                 const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
//                 const { email, given_name: firstName, family_name: lastName, picture } = userInfoResponse.data;

//                 // Send user info to your backend
//                 const { data } = await axios.post(`${BASE_URL}/api/google-login/`, {
//                     email,
//                     first_name: firstName,
//                     last_name: lastName,
//                     picture,
//                 });

//                 if (data.access_token) {
//                     localStorage.setItem('access_token', data.access_token);
//                     localStorage.setItem('refresh_token', data.refresh_token);
//                     console.log('Login successful, tokens saved to local storage');

//                     // Set isAuthenticated to true
//                     setIsAuthenticated(true); // Update this state

//                     // Redirect to /home after setting isAuthenticated
//                     navigate('/home');
//                 } else {
//                     console.error('Login failed:', data.error);
//                     setMessage(data.error || 'Login failed');
//                 }
//             } catch (error) {
//                 console.error('Request failed:', error.response?.data || error.message);
//                 setMessage(error.response?.data?.error || 'Google login failed');
//             }
//         } else {
//             console.error('No access token received. Full response:', credentialResponse);
//             setMessage('No access token received. Please check your Google login configuration.');
//         }
//     };

//     const googleLogin = useGoogleLogin({
//         onSuccess: handleGoogleSuccess,
//         onError: () => setMessage('Google login failed'),
//         scope: 'openid email profile', // Ensure 'openid' is included
//         flow: 'implicit', // Make sure you're using the correct flow
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(username, password);
//             navigate('/home');
//         } catch (error) {
//             setMessage('Login failed');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//                 <div className="flex items-center justify-center space-x-2">
//                     <FaUser className="text-purple-400 text-4xl" />
//                     <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
//                 </div>
//                 <p className="text-gray-400 text-center">Please login to continue</p>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="relative">
//                         <FaUser className="absolute left-3 top-3 text-gray-500" />
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             placeholder="Username"
//                             className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>
//                     <div className="relative">
//                         <FaLock className="absolute left-3 top-3 text-gray-500" />
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
//                             className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
//                     >
//                         Login
//                     </button>

//                       {/* Forgot Password Button */}
//                 <div className="text-center mt-4">
//                     <button
//                         onClick={() => navigate('/forgot-password')}
//                         className="text-purple-400 underline hover:text-purple-500"
//                     >
//                         Forgot Password?
//                     </button>
//                 </div>
//                 </form>
//                 <p className="text-gray-400 text-center">
//                     Don't have an account?{' '}
//                     <button
//                         onClick={() => navigate('/register')}
//                         className="text-purple-400 underline hover:text-purple-500"
//                     >
//                         Register here
//                     </button>
//                 </p>


//                 {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
//                 <div className="text-center text-gray-500">
//                     <p>Or</p>
//                     <button
//                         onClick={googleLogin}
//                         className="flex items-center justify-center mt-4 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold transition duration-300 hover:shadow-lg hover:bg-gray-100 ml-20"
//                     >
//                         <img
//                             src="https://developers.google.com/identity/images/g-logo.png"
//                             alt="Google Logo"
//                             className="h-5 mr-2"
//                         />
//                         Continue with Google
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Login;



// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [generalMessage, setGeneralMessage] = useState('');
//   const navigate = useNavigate();
//   const { login, setIsAuthenticated } = useContext(AuthContext); // Include setIsAuthenticated

//   const handleGoogleSuccess = async (credentialResponse) => {
//     const { access_token } = credentialResponse;

//     if (access_token) {
//       try {
//         const userInfoResponse = await axios.get(
//           `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
//         );
//         const { email, given_name: firstName, family_name: lastName, picture } =
//           userInfoResponse.data;

//         const { data } = await axios.post(`${BASE_URL}/api/google-login/`, {
//           email,
//           first_name: firstName,
//           last_name: lastName,
//           picture,
//         });

//         if (data.access_token) {
//           localStorage.setItem('access_token', data.access_token);
//           localStorage.setItem('refresh_token', data.refresh_token);
//           setIsAuthenticated(true);
//           navigate('/home');
//         } else {
//           setGeneralMessage(data.error || 'Login failed');
//         }
//       } catch (error) {
//         setGeneralMessage(error.response?.data?.error || 'Google login failed');
//       }
//     } else {
//       setGeneralMessage('No access token received. Please check your Google login configuration.');
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: handleGoogleSuccess,
//     onError: () => setGeneralMessage('Google login failed'),
//     scope: 'openid email profile',
//     flow: 'implicit',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUsernameError('');
//     setPasswordError('');
//     setGeneralMessage('');


//     try {
//       const response = await axios.post(`${BASE_URL}/api/login/`, {
//         username,
//         password,
//       });

//       const { access, refresh } = response.data;
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//       setIsAuthenticated(true);
//       navigate('/home');
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Login failed';
//       if (errorMessage.includes('username')) {
//         setUsernameError('Invalid username');
//       } else if (errorMessage.includes('password')) {
//         setPasswordError('Invalid password');
//       } else {
//         setGeneralMessage('Login failed. Please check your credentials.');
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//         <div className="flex items-center justify-center space-x-2">
//           <FaUser className="text-purple-400 text-4xl" />
//           <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
//         </div>
//         <p className="text-gray-400 text-center">Please login to continue</p>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <FaUser className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             {usernameError && (
//               <p className="mt-1 text-sm text-red-500">{usernameError}</p>
//             )}
//           </div>
//           <div className="relative">
//             <FaLock className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             {passwordError && (
//               <p className="mt-1 text-sm text-red-500">{passwordError}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
//           >
//             Login
//           </button>

//           <div className="text-center mt-4">
//             <button
//               onClick={() => navigate('/forgot-password')}
//               className="text-purple-400 underline hover:text-purple-500"
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </form>
//         <p className="text-gray-400 text-center">
//           Don't have an account?{' '}
//           <button
//             onClick={() => navigate('/register')}
//             className="text-purple-400 underline hover:text-purple-500"
//           >
//             Register here
//           </button>
//         </p>

//         {generalMessage && (
//           <p className="mt-4 text-red-500 text-center">{generalMessage}</p>
//         )}
//         <div className="text-center text-gray-500">
//           <p>Or</p>
//           <button
//             onClick={googleLogin}
//             className="flex items-center justify-center mt-4 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold transition duration-300 hover:shadow-lg hover:bg-gray-100 ml-20"
//           >
//             <img
//               src="https://developers.google.com/identity/images/g-logo.png"
//               alt="Google Logo"
//               className="h-5 mr-2"
//             />
//             Continue with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalMessage, setGeneralMessage] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleGoogleSuccess = async (credentialResponse) => {
    const { access_token } = credentialResponse;

    if (!access_token) {
      setGeneralMessage(
        'No access token received. Please check your Google login configuration.'
      );
      return;
    }

    try {
      const userInfoResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { email, given_name: firstName, family_name: lastName, picture } =
        userInfoResponse.data;

      const { data } = await axios.post(`${BASE_URL}/api/google-login/`, {
        email,
        first_name: firstName,
        last_name: lastName,
        picture,
      });

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setGeneralMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setGeneralMessage(error.response?.data?.error || 'Google login failed');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setGeneralMessage('Google login failed'),
    scope: 'openid email profile',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setGeneralMessage('');

    if (!username) {
      setUsernameError('Username is required');
    }
    if (!password) {
      setPasswordError('Password is required');
    }
    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login/`, {
        username,
        password,
      });
      // alert(response.data.is_subscribed);


      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('is_subscribed', response.data.is_subscribed);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      if (errorMessage.includes('username')) {
        setUsernameError('Invalid username');
      } else if (errorMessage.includes('password')) {
        setPasswordError('Invalid password');
      } else {
        setGeneralMessage('Login failed. Please check your credentials.');
      }
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
            {usernameError && (
              <p className="mt-1 text-sm text-red-500">{usernameError}</p>
            )}
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
            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-purple-400 underline hover:text-purple-500"
            >
              Forgot Password?
            </button>
          </div>
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

        {generalMessage && (
          <p className="mt-4 text-red-500 text-center">{generalMessage}</p>
        )}
        <div className="text-center text-gray-500">
          <p>Or</p>
          <button
            onClick={googleLogin}
            className="flex items-center justify-center mt-4 ml-20 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold transition duration-300 hover:shadow-lg hover:bg-gray-100"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
