// src/components/Navbar.jsx
import { BookOpen } from "lucide-react";
const Navbar = () => {
    return (
      <nav className="sticky bg-white/80 backdrop-blur-md top-0 z-50 shadow-sm shadow-puple-400  text-indigo-900 p-1 pl-4 md:p-4  ">
        <div className="flex  md:flex-row md:items-center md:justify-between max-w-full mx-auto">
          {/* Logo */}
          <div className="text-lg md:text-2xl font-bold tracking-wide  md:mb-0">
          <div className="opacity-100 animate-fadeInLeft">
              <div className="flex items-center space-x-3 ">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center animate-glow">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduVerse
                </h1>
              </div>
            </div>
          </div>
  
          {/* Nav Links */}
          <div className="m-1.5 flex md:flex-row gap-2 md:gap-8 text-sm font-normal">
            <a href="/" className="hover:text-indigo-600 hover:underline">Home</a>
            <a href="/courses" className="hover:text-indigo-600 hover:underline">Courses</a>
            <a href="/about" className="hover:text-indigo-600 hover:underline">About Us</a>
            <a href="/contact" className="hover:text-indigo-600 hover:underline">Contact</a>
            <a href="/login" className="hover:text-indigo-600 hover:underline">Login</a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  