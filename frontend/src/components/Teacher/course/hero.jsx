import React, { useState } from "react";
import {
  Edit,
  Calendar,
  DollarSign,
  IndianRupee ,
  Clock,
  Users,
  Tag,
  BookOpen,
} from "lucide-react";

import EditCourseModal from "./CourseEdit";

const Hero = ({ course }) => {
  const [isPublic, setIsPublic] = useState(false);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const [editToggler, setEditToggler] = useState(false);

  const EditHandler = ()=>{
      setEditToggler((prev)=>!prev);
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50">
      <div className=" ">
        <div className=" rounded-lg">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                    {course.title}
                  </h1>
                  <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    {isPublic ? "Public" : "Private"}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-200 rounded-lg hover:scale-105">
                    <Calendar className="text-blue-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Created
                      </p>
                      <p className="font-semibold text-gray-800">
                        {formatDate(course.created_on)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-200 rounded-lg hover:scale-105">
                    <IndianRupee className="text-green-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Price
                      </p>
                      <p className="font-semibold text-gray-800">
                        {course.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-200 rounded-lg hover:scale-105">
                    <Clock className="text-purple-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Duration
                      </p>
                      <p className="font-semibold text-gray-800">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-200 rounded-lg hover:scale-105">
                    <Users className="text-orange-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Students
                      </p>
                      <p className="font-semibold text-gray-800">
                        {course.nums_of_students}
                      </p>
                    </div>
                  </div>
                </div>

                {course.offer && (
                  <div className="mt-4 flex items-center gap-2">
                    <Tag className="text-red-500" size={18} />
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      {course.offer}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <label
                    htmlFor="public-toggle"
                    className="text-sm font-medium text-gray-700"
                  >
                    Make Course Public
                  </label>
                  <input
                    type="checkbox"
                    id="public-toggle"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>

                <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-lg"
                   onClick={EditHandler}
                >
                  <Edit size={18} className="mr-2" />
                  Edit Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-[-1]">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,192L48,181.3C96,171,192,149,288,138.7C384,128,480,128,576,149.3C672,171,768,213,864,208C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
          ></path>
        </svg>
      </div>

      {editToggler&&<EditCourseModal course={course} onClose={EditHandler}/>}
    </div>
  );
};

export default Hero;
