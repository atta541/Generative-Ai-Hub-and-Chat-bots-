import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const FluxImage = () => {
    const [imagePrompt, setImagePrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const chatContainerRef = useRef(null);

    const handleImageGeneration = async (e) => {
        e.preventDefault();
        if (imagePrompt.trim() === '') return;

        setGeneratedImage(null);  // Clear previous image

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/generate-image/', { prompt: imagePrompt }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setGeneratedImage(`data:image/png;base64,${res.data.image}`);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setImagePrompt('');
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [generatedImage]);

    return (
        <div className={`flex flex-col h-full font-sans ${darkMode ? 'bg-gray-900' : ''}`} style={{ width: '100%' }}>
            <div className={`flex justify-between items-center -mt-4 border-gray-300 ${darkMode ? '' : ''}`}>
                <div className="flex items-center">
                    <h2 className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Generate Image</h2>
                </div>

                <button
                    className="py-2 px-4 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-700"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-5 border-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} style={{ maxHeight: 'calc(100vh - 140px)' }}>
                <div className="flex flex-col">
                    {generatedImage && (
                        <div className="mt-4">
                            <img src={generatedImage} alt="Generated" className="max-w-full h-auto" />
                        </div>
                    )}
                    <div ref={chatContainerRef} />
                </div>
            </div>

            <form className="p-5 border-t border-gray-300 bg-white" onSubmit={handleImageGeneration}>
                <div className="flex items-center">
                    <input
                        type="text"
                        className={`w-full p-3 border border-gray-300 text-lg rounded-l-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Enter a prompt to generate an image"
                    />
                    <button
                        type="submit"
                        className="py-3 px-6 text-sm text-white bg-black rounded-r-lg transition-colors duration-300 hover:bg-green-400 h-14"
                    >
                        Generate Image
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FluxImage;
