
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const bgColorClass = isLoginPage || isSignupPage ? "bg-gray-900" : "bg-white";
  const textColorClass =
    isLoginPage || isSignupPage ? "text-white" : "text-gray-600";
  const logoColorClass =
    isLoginPage || isSignupPage ? "text-indigo-400" : "text-indigo-600";
  const hoverTextColorClass =
    isLoginPage || isSignupPage
      ? "hover:text-indigo-400"
      : "hover:text-indigo-600";
  const loginBtnColor =
    isLoginPage || isSignupPage ? "text-gray-300" : "text-gray-600";
  const loginBtnHover =
    isLoginPage || isSignupPage ? "hover:text-white" : "hover:text-indigo-600";
  const signupBtnColor =
    isLoginPage || isSignupPage
      ? "bg-indigo-500 hover:bg-indigo-600"
      : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <nav
      className={`${bgColorClass} shadow-sm sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        <Link to="/" className={`text-2xl font-bold ${logoColorClass}`}>
          CyberShield
        </Link>

        <div className="hidden md:flex space-x-8">
          <a
            href="/#testimonials"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            Testimonials
          </a>


          <a
            href="/cybershield-feed"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            CyberShield-Feed
          </a>

          <a
            href="/anonymous"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            Anonymous
          </a>
          <a
            href="/community-reputation"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            Community-Reputation
          </a>
        </div>

        <a
          href="/chatbot"
          className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
        >
          ChatBot
        </a>


        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className={`font-semibold py-2 px-4 rounded-full transition-colors duration-200 ${loginBtnColor} ${loginBtnHover}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`font-bold py-2 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-white ${signupBtnColor}`}
          >
            Signup
          </Link>
        </div>


        <div className="md:hidden">

          <button className={`${textColorClass} ${hoverTextColorClass}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
