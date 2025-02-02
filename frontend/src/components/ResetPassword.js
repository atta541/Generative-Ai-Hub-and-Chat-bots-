import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/reset-password/`, {
                token,
                new_password: newPassword,
            });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 3000); // Redirect after success
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-white">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg font-semibold"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
