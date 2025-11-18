import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 1500); // simulate delay
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center px-4 relative transition-colors duration-500"
      >
        <div className="max-w-md w-full text-center space-y-8">
          {/* 404 Animation */}
          <div className="relative">
            <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text animate-pulse">
              404
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-300 rounded-full animate-bounce delay-150 opacity-60"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              The page you're looking for seems to have wandered off into the digital void.
              Don't worry, it happens to the best of us!
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-48 h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                <Search className="h-16 w-16 text-gray-400 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🔍</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>

            <button
              onClick={handleRedirect}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              {loading ? (
                <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Home className="h-4 w-4" />
              )}
              <span>{loading ? "Redirecting..." : "Back to Home"}</span>
            </button>
          </div>

          {/* Fun Fact */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">💡 Fun Fact</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The term "404" comes from the room number at CERN where the original web servers were located.
              When a page wasn't found, it was literally "not found in room 404"!
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full animate-ping opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-6 h-6 bg-purple-300 rounded-full animate-ping delay-300 opacity-20"></div>
          <div className="absolute top-1/2 right-20 w-3 h-3 bg-pink-300 rounded-full animate-pulse delay-500 opacity-40"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotFound;
