// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword  = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/forgot-password/`, { email });
//             setMessage(response.data.message);
//         } catch (error) {
//             setMessage(error.response?.data?.error || 'An error occurred');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-900">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
//                 <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold"
//                     >
//                         Send Reset Link
//                     </button>
//                 </form>
//                 {message && <p className="text-green-500 mt-4">{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword ;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/forgot-password/`, { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold"
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-purple-400 underline hover:text-purple-500"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
