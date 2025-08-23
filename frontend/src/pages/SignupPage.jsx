import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    email: "",
    phone: "",
    demographic: "student",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("https://cyber-safety-platform.vercel.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.msg || "An error occurred during signup.");
        return;
      }

      console.log("Signup Successful!", data.msg);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Failed to connect to server. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl transition-transform duration-300 transform hover:scale-105">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Create Your Account ✨
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Tell us a little about yourself to get a personalized experience.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email ID
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>


          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create Your Password
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters.
                </p>
              </div>

              
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errorMessage}
              </p>
            )}
          </div>


          <div>
            <label
              htmlFor="demographic"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              I am a
            </label>
            <select
              name="demographic"
              id="demographic"
              value={formData.demographic}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="senior-citizen">Senior Citizen</option>
              <option value="homemaker">Homemaker</option>
              <option value="rural-user">Rural User</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
