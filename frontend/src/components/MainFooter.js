import React from "react";
import { Link } from "react-router-dom";

const MainFooter = () => {
    return (
        <div
            className="flex flex-col w-full bg-gray-800 pt-16 text-white"
            style={{ background: '#' }}
            id="aboutus"
        >
            <div className="flex flex-col lg:flex-row justify-between px-8 lg:px-12">
                <div className="flex flex-col gap-6 mb-8 lg:mb-0">
                    <Link to="/" className="flex-shrink-0">
                        <div className="flex flex-row items-center gap-4">
                            <div className="text-[32px] font-bold text-[#6C60FE]">AI Chatbots</div>
                        </div>
                    </Link>

                    <div className="text-[14px] font-normal text-[#ffffff]">
                        Copyright © 2023. AI Solutions Agency
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="text-[16px] font-medium text-[#6C60FE]">Location</div>
                        <div className="text-[14px] font-normal text-[#ffffff] leading-6">
                            Innovating with AI chatbots for enhanced user engagement.
                        </div>
                    </div>
                </div>

                {/* Second Column: Our AI Services */}
                <div className="flex flex-col gap-6 mb-8 lg:mb-0">
                    <div className="text-[16px] font-medium text-[#6C60FE]">Our AI Services</div>
                    <div className="text-[14px] font-medium text-[#ffffff]">Chatbot Development</div>
                    <div className="text-[14px] font-medium text-[#ffffff]">Conversational AI</div>
                    <div className="text-[14px] font-medium text-[#ffffff]">Natural Language Processing</div>
                    <div className="text-[14px] font-medium text-[#ffffff]">AI Model Fine-Tuning</div>
                </div>

                {/* Third Column: Company Information */}
                <div className="flex flex-col gap-6 mb-8 lg:mb-0 lg:mr-[30rem]">
                    <div className="text-[16px] font-medium text-[#6C60FE]">Company</div>

                    <div className="text-[14px] font-medium text-[#ffffff]">About Us


                    </div>
                    <div className="text-[14px] font-medium text-[#ffffff]">AI Technologies</div>
                    <div className="text-[14px] font-medium text-[#ffffff]">Portfolio</div>

                    <Link to="/contact" className="flex-shrink-0">


                        <div className="text-[14px] font-medium text-[#ffffff]">Contact Us</div>

                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center px-8 lg:px-12 my-8">
                <div className="flex-grow h-[1px] bg-[#DADADA] lg:w-[70%] w-full mb-4 lg:mb-0"></div>

                <div className="flex gap-6 ml-0 lg:ml-6">

                </div>
            </div>

            <div className="flex justify-center items-center pb-8">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-[14px] text-[#ffffff] text-center lg:text-left">
                    <span>AI Development Policy</span>
                    <span>Data Privacy Policy</span>
                    <span>Usage Guidelines</span>
                    <span>Terms of Service</span>

                </div>
            </div>
        </div>
    );
};

export default MainFooter;

