import React from "react";

const solutions = [
  {
    title: "For Senior Citizens",
    description:
      "Simple, voice-enabled alerts and easy-to-follow guides to spot and avoid scams without the tech jargon.",
    icon: "👴👵",
    color: "from-blue-50 to-indigo-100",
  },
  {
    title: "For Students",
    description:
      "Interactive quizzes and bite-sized lessons on social media safety, online privacy, and responsible digital behavior.",
    icon: "🎓",
    color: "from-green-50 to-teal-100",
  },
  {
    title: "For Homemakers",
    description:
      "Simple guides on protecting your savings and family from common online shopping scams, fake investment schemes, and social media fraud. Learn to spot red flags and secure your digital life.",
    icon: "🏡",
    color: "from-pink-50 to-rose-100",
  },
  {
    title: "For Professionals",
    description:
      "Advanced insights into corporate phishing, data security, and identity theft prevention to secure your professional and personal life.",
    icon: "💼",
    color: "from-purple-50 to-indigo-100",
  },
  {
    title: "For Rural Users",
    description:
      "Content in local languages and a focus on common mobile and banking frauds, accessible on low-bandwidth connections.",
    icon: "🧑‍🌾",
    color: "from-yellow-50 to-orange-100",
  },
];

const TailoredSolutions = () => {
  return (
    <div className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Solutions for Every Indian
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Our platform is flexible and adapts to the unique challenges faced by
          different demographics.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              <div
                className={`p-4 rounded-xl text-3xl mb-4 w-fit bg-gradient-to-br ${solution.color}`}
              >
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {solution.title}
              </h3>
              <p className="mt-3 text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TailoredSolutions;
