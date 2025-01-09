// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaUser, FaEnvelope, FaLock, FaIdBadge } from 'react-icons/fa';

// const Register = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/register/', {
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         username,
//         password,
//       });

//       if (response.status === 201) {
//         setMessage('Account created successfully! You can now log in.');
//         navigate('/login');
//       } else {
//         setMessage(response.data.error || 'Error creating account. Please try again.');
//       }
//     } catch (error) {
//       setMessage('Error creating account. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//         <div className="flex items-center justify-center space-x-2">
//           <FaUser className="text-purple-400 text-4xl" />
//           <h2 className="text-3xl font-bold text-white">Create Account</h2>
//         </div>
//         <p className="text-gray-400 text-center">Please fill in the details to register</p>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               placeholder="First Name"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               style={{ width: '100%', maxWidth: '450px' }} // Increase width here
//             />
//           </div>
//           <div className="relative">
//             <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               placeholder="Last Name"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               style={{ width: '100%', maxWidth: '450px' }} // Increase width here
//             />
//           </div>
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               style={{ width: '100%', maxWidth: '450px' }} // Increase width here
//             />
//           </div>
//           <div className="relative">
//             <FaUser className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               style={{ width: '100%', maxWidth: '450px' }} 
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
//               style={{ width: '100%', maxWidth: '450px' }} 
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
//           >
//             Register
//           </button>
//         </form>
//         {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
//         <p className="text-gray-400 text-center">
//           Already registered?{' '}
//           <button
//             onClick={() => navigate('/login')}
//             className="text-purple-400 underline hover:text-purple-500"
//           >
//             Login here
//           </button>
//         </p>
//         <div className="text-center text-gray-500">
//           <p>Or</p>
//           <p className="text-purple-400 cursor-pointer hover:text-purple-300">Continue with Google</p>
//           <p className="text-purple-400 cursor-pointer hover:text-purple-300">Continue with Facebook</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaIdBadge } from 'react-icons/fa';


const BASE_URL = process.env.REACT_APP_BASE_URL;
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      });

      if (response.status === 201) {
        setMessage('Account created successfully! You can now log in.');
        navigate('/login');
      } else {
        setMessage(response.data.error || 'Error creating account. Please try again.');
      }
    } catch (error) {
      setMessage('Error creating account. Please try again.');
    }
  };

  const googleLogin = () => {
    // Redirect to the login page
    navigate('/login');
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <FaUser className="text-purple-400 text-4xl" />
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
        </div>
        <p className="text-gray-400 text-center">Please fill in the details to register</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: '100%', maxWidth: '450px' }} 
            />
          </div>
          <div className="relative">
            <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: '100%', maxWidth: '450px' }} 
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: '100%', maxWidth: '450px' }} 
            />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: '100%', maxWidth: '450px' }} 
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
              style={{ width: '100%', maxWidth: '450px' }} 
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold transition duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        <p className="text-gray-400 text-center">
          Already registered?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-purple-400 underline hover:text-purple-500"
          >
            Login here
          </button>
        </p>
        <div className="text-center text-gray-500">
          <p>Or</p>
          <button
            onClick={googleLogin}
            className="flex items-center justify-center mt-4 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold transition duration-300 hover:shadow-lg hover:bg-gray-100 ml-20"
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

export default Register;
