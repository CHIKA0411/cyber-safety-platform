import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://cyber-safety-platform.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.msg || "An error occurred during login.");
        return;
      }

      console.log("Login successful! Token:", data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("demographic", data.demographic);

      let redirectPath = `/${data.demographic}-dashboard`;
      navigate(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "Failed to connect to server. Please check your network."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl transition-transform duration-300 transform hover:scale-105">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Welcome Back 👋
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Log in to your CyberSafe account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          <div>
            <label
              htmlFor="emailOrPhone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email ID or Phone Number
            </label>
            <input
              type="text"
              name="emailOrPhone"
              id="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-semibold transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.875h2.25m-2.25 0h-2.25m2.25 0V15.5m0-6.75a4.5 4.5 0 00-7.794-3.187m7.794 3.187a4.5 4.5 0 01-7.794 3.187m7.794-3.187L21 21m-7.125-1.5l1.625-1.625M12 17.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>


          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </p>
          )}


          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
            >
              Log In
            </button>
          </div>
        </form>


        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
