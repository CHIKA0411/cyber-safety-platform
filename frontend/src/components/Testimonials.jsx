import React from "react";

const testimonials = [
  {
    quote:
      "CyberSafe's simple videos helped my grandmother avoid a fraudulent call. It's a fantastic, easy-to-use resource for the whole family!",
    author: "Priya Sharma",
    role: "Working Professional",
  },
  {
    quote:
      "As a student, I'm always online. The real-time alerts helped me spot a phishing email before I clicked on it. It’s a must-have for every digital user.",
    author: "Rohan Singh",
    role: "College Student",
  },
  {
    quote:
      "The platform's content is so relatable. I feel empowered and confident now when handling online payments. Thank you!",
    author: "Anjali Gupta",
    role: "Homemaker",
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Trusted by Users Across India
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Hear from people who have made cyber safety a part of their daily
          lives with our help.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <p className="italic text-gray-700">"{testimonial.quote}"</p>
              <div className="mt-4 text-center">
                <p className="font-bold text-indigo-600">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
