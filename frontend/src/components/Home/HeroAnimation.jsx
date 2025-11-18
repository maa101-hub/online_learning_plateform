import React from 'react';
import { BookOpen, Users, Award, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden z-0">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float delay-200"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Logo/Brand */}
            

            {/* Main heading */}
            <div className="space-y-4">
              <h2 className="opacity-90 animate-fadeInUp delay-200 text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h2>
              <p className="opacity-90 animate-fadeInUp delay-300 text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover a world of knowledge with our innovative online learning platform. 
                Interactive courses, expert instructors, and a community that grows together.
              </p>
            </div>

           

            {/* Stats */}
            <div className="opacity-90 animate-fadeInUp delay-700 grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right side - Visual elements */}
          <div className="relative lg:pl-8">
            <div className="opacity-90 animate-fadeInRight delay-300">
              {/* Main illustration container */}
              <div className="relative">
                {/* Background circle */}
                <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                
                {/* Floating cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Card 1 */}
                    <div className="absolute top-0 left-0 w-32 h-40 bg-white rounded-2xl shadow-xl p-4 animate-bounce [animation-duration:3s] duration-1000 hover:scale-110 transition-transform  cursor-pointer">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-blue-200 rounded w-1/2"></div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="absolute top-20 right-0 w-36 h-44 bg-white rounded-2xl shadow-xl p-4 animate-bounce [animation-duration:4s] delay-200 hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-2 bg-purple-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="absolute bottom-0 left-8 w-40 h-36 bg-white rounded-2xl shadow-xl p-4 animate-ping [animation-duration:2s] delay-500 hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <div className="w-8 h-8 bg-indigo-500 rounded-lg mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-indigo-200 rounded w-2/3"></div>
                      </div>
                    </div>

                    {/* Central element */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-glow">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;