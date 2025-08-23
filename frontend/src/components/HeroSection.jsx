import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Your Shield Against Cyber Fraud
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
          An innovative platform to help you, your family, and your community
          recognize, prevent, and respond to online threats.
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105">
            Get Started Free
          </button>
          <button className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
