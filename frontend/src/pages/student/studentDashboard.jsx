import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Calendar, Trophy, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../utils/api";
import { handleApiError} from "../../utils/ErrorHandler";
import EmptyEnrolledCourses from "../../components/Student/Course/EmptyEnrolledCourse";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get("/student/dashboard/enrollcourses");
        const course = res.data;

        const improvedData = course.map((data, index) => {
          return {
            course_id: data.course_id,
            enroll_id: data.id,
            title: data.title,
            instructor: data.name,
            progress: 75, // hardcoded for now
            totalLessons: 120,
            completedLessons: 90,
            timeSpent: "45h 30m",
            nextLesson: "",
            image: data.thumbnail_url,
          };
        });
        setCourses(improvedData);
      } catch (error) {
        handleApiError("Sever Down", 500);
      }
    };
    fetchCourse();
  }, []);

  const weeklyProgress = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 4.0 },
    { day: "Sat", hours: 1.5 },
    { day: "Sun", hours: 2.8 },
  ];

  const achievements = [
    { title: "First Course Completed", icon: "🎯", earned: true },
    { title: "Week Streak", icon: "🔥", earned: true },
    { title: "Quick Learner", icon: "⚡", earned: true },
    { title: "Course Collector", icon: "📚", earned: false },
    { title: "Expert Level", icon: "🏆", earned: false },
  ];

  const maxHours = Math.max(...weeklyProgress.map((d) => d.hours));

  const EnrolledPageNavigation = (index)=>{
         navigate('/enrolledCourse', {state:{course: enrolledCourses[index]}})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            EduVerse
          </span>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/courses")}
            className="border border-purple-300 text-purple-600 px-4 py-2 rounded hover:bg-purple-50"
          >
            Browse Courses
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:from-purple-700 hover:to-blue-700"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              Welcome back, Student! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Continue your learning journey
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg shadow mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-2xl font-bold">Level 12</p>
              <p className="text-sm opacity-90">Learning Enthusiast</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Courses Enrolled",
              value: enrolledCourses.length,
              icon: <BookOpen className="h-10 w-10 text-purple-400" />,
            },
            {
              label: "Hours Learned",
              value: "96h 30m",
              icon: <Clock className="h-10 w-10 text-blue-400" />,
            },
            {
              label: "Certificates",
              value: "2",
              icon: <Trophy className="h-10 w-10 text-green-400" />,
            },
            {
              label: "Streak Days",
              value: "14",
              icon: <Calendar className="h-10 w-10 text-orange-400" />,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded shadow p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2 bg-white/80 rounded shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Courses</h2>
              <button
                onClick={() => navigate("/courses")}
                className="text-purple-600 border border-purple-300 px-3 py-1 rounded hover:bg-purple-50 text-sm"
              >
                Browse More
              </button>
            </div>
            <div className="space-y-5">
              {enrolledCourses.length>0?(enrolledCourses.map((course, index) => (
                <div
                  key={course.course_id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        by {course.instructor}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>
                            {course.completedLessons}/{course.totalLessons}{" "}
                            lessons
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.timeSpent}
                        </span>
                        <button className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-blue-700 text-sm"
                            onClick={()=>EnrolledPageNavigation(index)}
                        >
                          Continue <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                  </div>
                </div>
              ))):(<EmptyEnrolledCourses/>)}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="flex flex-col gap-3">
            <div className="bg-white/80 rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                This Week's Progress
              </h2>
              <div className="space-y-3">
                {weeklyProgress.map((day, i) => (
                  <div key={i} className="flex items-center">
                    <span className="w-10 text-sm text-gray-600">
                      {day.day}
                    </span>
                    <div className="flex-1 mx-2 bg-gray-200 h-3 rounded-full">
                      <div
                        className="h-3 rounded-full bg-blue-500"
                        style={{ width: `${(day.hours / maxHours) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-sm text-gray-600 text-right">
                      {day.hours}h
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement.earned
                        ? "bg-gradient-to-r from-purple-50 to-blue-50"
                        : "bg-gray-50 opacity-60"
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <span
                      className={`text-sm font-medium ${
                        achievement.earned ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {achievement.title}
                    </span>
                    {achievement.earned && (
                      <span className="ml-auto text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Earned
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
