// src/components/FinalCta.jsx

import React from "react";
import { Link } from "react-router-dom";

const FinalCta = () => {
  return (
    <div className="bg-indigo-600 text-white py-16">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Secure Your Digital Life?
        </h2>
        <p className="mt-4 text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
          Join thousands of Indians who are becoming cyber smart.
        </p>
        <Link to="/login">
          <button className="mt-8 bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105">
            Start Your Cyber-Shield Journey
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FinalCta;
