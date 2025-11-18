// CTASection.jsx
import React from 'react';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Join Thousands of Learners on EduVerse</h2>
        <p className="text-lg mb-8">
          Get access to top educators, interactive courses, live chat support, and practice quizzes — all in one place.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            <a href='/login'> Get Started</a>
           
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition">
            <a href='/courses'>Browse Courses</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
