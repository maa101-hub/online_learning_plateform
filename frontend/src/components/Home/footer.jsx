// Footer.jsx
import React from 'react';
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">EduVerse</h3>
          <p className="text-sm">
            Empowering learners with expert-led courses, live support, and smart assessments.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:underline">Courses</Link></li>
            <li><Link to="/#testimonials" className="hover:underline">Testimonials</Link></li>
           
            <li><a href="/signup" className="hover:underline">Join Now</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="#privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="#terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} EduVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
