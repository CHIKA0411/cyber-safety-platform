// src/components/CoreFeatures.jsx

import React from "react";

const features = [
  {
    title: "Learn & Educate",
    description:
      "Access a rich library of articles, videos, and tutorials on various cyber threats.",
    icon: (
      <svg
        className="h-8 w-8 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.253v13m0-13C10.835 5.59 10.038 5.253 9 5.253c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c1.038 0 1.835-.337 2.91-1.002m0 0C13.165 7.91 13.962 8.253 15 8.253c2.485 0 4.5-2.015 4.5-4.5S17.485 3.253 15 3.253z"
        />
      </svg>
    ),
  },
  {
    title: "Real-time Alerts",
    description:
      "Get instant notifications about new and trending scams in your region.",
    icon: (
      <svg
        className="h-8 w-8 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 17h5l-1.405-1.405C18.667 14.562 19 13.844 19 13c0-2.485-2.015-4.5-4.5-4.5S10 10.515 10 13c0 .844.333 1.562.405 2.595L9 17h5z"
        />
      </svg>
    ),
  },
  {
    title: "Report & Respond",
    description:
      "Easily report suspicious activity and get guidance on the next steps to take.",
    icon: (
      <svg
        className="h-8 w-8 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m-1-4h1v1h-1m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const CoreFeatures = () => {
  return (
    <div className="bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Empowering You to Stay Safe
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Our platform is built on three core pillars to ensure your digital
          security.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-indigo-100">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreFeatures;
