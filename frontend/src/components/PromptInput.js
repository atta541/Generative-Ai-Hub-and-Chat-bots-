import React, { useState } from 'react';

const PromptInput = ({ onPromptSubmit, initialPrompt }) => {
    const [prompt, setPrompt] = useState(initialPrompt || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPromptSubmit(prompt);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
                <h3 className="text-2xl font-semibold mb-6 text-center">Configure Your Bot</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-lg text-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe how you want the bot to behave (e.g., 'You are a cricket expert...')"
                        rows="5"
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold transition-all hover:bg-blue-700"
                        >
                            OK
                        </button>
                        <button
                            type="button"
                            className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all hover:bg-gray-400"
                            onClick={() => setPrompt(initialPrompt)} // Resets to initial prompt
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromptInput;



