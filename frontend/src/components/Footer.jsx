import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

          <div>
            <span className="text-xl font-bold text-indigo-400">CyberShield</span>
            <p className="mt-1 text-sm text-gray-400">
              &copy; 2025 CyberShield. All rights reserved.
            </p>
          </div>


          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-300 hover:text-indigo-400">
              About Us
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-indigo-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-indigo-400">
              Terms of Service
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-indigo-400"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M..."></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-indigo-400"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M..."></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
