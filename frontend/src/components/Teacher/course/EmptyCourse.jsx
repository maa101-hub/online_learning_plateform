import { BookOpen, Plus, Lightbulb, Users } from 'lucide-react';

const EmptyCoursesState = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-sm shadow-sm p-12 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/4 via-purple-100/4 to-indigo-100/4"></div>

          {/* Icon Container */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-xl">
              <BookOpen className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-blue-200 rounded-full animate-pulse"></div>
            {/* <div className="absolute inset-0 w-40 h-40 mx-auto border-2 border-blue-100 rounded-full -mt-4 -ml-4"></div> */}
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text ">
            No Courses Yet
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            You haven't created any courses yet. Start building your first course and share your knowledge with the world.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Share Knowledge</h3>
              <p className="text-sm text-gray-600 text-center">Transform your expertise into engaging learning experiences</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Build Community</h3>
              <p className="text-sm text-gray-600 text-center">Connect with learners and grow your audience</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Professional Tools</h3>
              <p className="text-sm text-gray-600 text-center">Use our advanced course creation and management tools</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <button
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-3" />
              Create Your First Course
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Get started in minutes with our intuitive course builder
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-200 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-gray-800">10K+</div>
            <div className="text-sm text-gray-600">Courses Created</div>
          </div>
          <div className="bg-amber-200 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-gray-800">50K+</div>
            <div className="text-sm text-gray-600">Students Learning</div>
          </div>
          <div className="bg-lime-200 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-gray-800">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCoursesState;
