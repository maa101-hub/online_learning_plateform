import { BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyEnrolledCourses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <BookOpen className="text-indigo-600 w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Courses Enrolled
        </h2>
        <p className="text-gray-600 mb-6">
          You haven’t enrolled in any courses yet. Discover a wide range of expert-led courses and start learning today!
        </p>

        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition duration-200"
        >
          Explore Courses
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmptyEnrolledCourses;
