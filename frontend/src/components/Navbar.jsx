// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to track if the user is logged in and their dashboard path
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/");

  // Use useEffect to check for the token and demographic when the component mounts or location changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const demographic = localStorage.getItem("demographic");

    setIsLoggedIn(!!token);

    // Set the correct dashboard path based on the user's demographic
    if (token && demographic) {
      setDashboardPath(`/${demographic}-dashboard`);
    } else {
      setDashboardPath("/");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("demographic");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Conditional styling based on current path (login/signup)
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const bgColorClass = isAuthPage ? "bg-gray-900" : "bg-white";
  const textColorClass = isAuthPage ? "text-white" : "text-gray-600";
  const logoColorClass = isAuthPage ? "text-indigo-400" : "text-indigo-600";
  const hoverTextColorClass = isAuthPage
    ? "hover:text-indigo-400"
    : "hover:text-indigo-600";
  const signupBtnColor = isAuthPage
    ? "bg-indigo-500 hover:bg-indigo-600"
    : "bg-indigo-600 hover:bg-indigo-700";
  const logoutBtnColor = "bg-red-500 hover:bg-red-600";

  return (
    <nav
      className={`${bgColorClass} shadow-sm sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className={`text-2xl font-bold ${logoColorClass}`}>
          CyberShield
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/cybershield-feed"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            CyberShield-Feed
          </Link>
          <Link
            to="/anonymous"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            Anonymous
          </Link>
          <Link
            to="/community-reputation"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            Community-Reputation
          </Link>
          <Link
            to="/chatbot"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            ChatBot
          </Link>
          <Link
            to="/api-tool"
            className={`font-semibold transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
          >
            Scam Detector
          </Link>
        </div>

        {/* Conditional Login/Signup or Logout/Dashboard Buttons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* New: Dashboard button for logged-in users */}
              <Link
                to={dashboardPath}
                className={`font-semibold py-2 px-4 rounded-full transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
              >
                My Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className={`font-bold py-2 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-white ${logoutBtnColor}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-semibold py-2 px-4 rounded-full transition-colors duration-200 ${textColorClass} ${hoverTextColorClass}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`font-bold py-2 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-white ${signupBtnColor}`}
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
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
