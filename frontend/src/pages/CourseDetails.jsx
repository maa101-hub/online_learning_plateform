import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, User, Clock, Star, Play, CheckCircle, CreditCard } from "lucide-react";
import { useAuth } from "../utils/authProvider";
import api from "../utils/api";
import { handleApiError } from "../utils/ErrorHandler";

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const {role} = useAuth();
if (!course) {
    navigate("/courses");
    return null;
  }
  const [chapters, setChapters] = useState([]);
   const [activeTab, setActiveTab] = useState("overview");

  

 const fetchChapters = useCallback(async () => {
  try {
    const res = await api.get(`/allcourse/allchapters/${course.course_id}`);
    setChapters(res.data);  
  } catch (error) {
    handleApiError(error, "error in server");
  }
}, [course.course_id]);

useEffect(() => {
  if (course?.course_id) fetchChapters();
}, [course?.course_id, fetchChapters]);



 

  const NavigationHandle = ()=>{
    if(role==='teacher')navigate('/teacher/dashboard');
    else if(role==='student')navigate('/student/dashboard');
    else navigate('/login');
}

  const reviews = [
    {
      name: "Alex Johnson",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
      date: "2 weeks ago"
    },
    {
      name: "Maria Garcia",
      rating: 4,
      comment: "Great content and well-structured. I learned a lot and can apply it immediately in my work.",
      date: "1 month ago"
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "This course exceeded my expectations. The quality of instruction is top-notch.",
      date: "3 weeks ago"
    }
  ];

  const totalLessons = chapters?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduVerse
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
               
                onClick={() => navigate("/courses")}
                className="flex border-1 p-1 rounded-sm border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <BookOpen className="h-4 w-4 mt-1.5 mr-2" />
               <span className=""> All Courses</span>
              </button>
              <button 
                 
                 onClick={() => NavigationHandle()}
                className="flex border-1 p-1 rounded-sm border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <User className="h-4 w-4 mr-2 mt-1.5" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
              />
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-1 rounded-sm">
                  {course.category}
                </span>
                
                <span className="bg-gray-100 rounded-xl p-1">
                  ⭐ ({course.students.toLocaleString()} students)
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-8 border-b border-gray-200">
                {["overview", "curriculum", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? "border-purple-600 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-2 rounded-xl">
               
                  <h1 className="text-2xl font-bold">Course Overview</h1>
               
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">What you'll learn</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        Master the fundamentals and advanced concepts
                      </li>
                      
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        Learn industry best practices and standards
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        Get hands-on experience with practical exercises
                      </li>
                    </ul>
                  </div>
                  
                  <hr />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Basic computer literacy</li>
                      <li>• No prior experience required</li>
                      <li>• Willingness to learn and practice</li>
                    </ul>
                  </div>
                  
                  <hr />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Course Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      This comprehensive course is designed to take you from beginner to advanced level. 
                      You'll learn through a combination of theoretical knowledge and practical application, 
                      ensuring you can apply what you learn immediately in real-world scenarios. 
                      The course includes practical-based learning, quizzes, and assignments to reinforce your understanding.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-4">
  {chapters?.map((chapter, sectionIndex) => (
    <div
      key={sectionIndex}
      className=" bg-gradient-to-r from-indigo-200 to-purple-200 shadow-sm border border-indigo-200 rounded-sm p-1 transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex items-center gap-3">
        <div className="bg-indigo-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold">
          {sectionIndex + 1}
        </div>
        <h3 className="text-lg font-serif text-gray-800">{chapter.title}</h3>
      </div>
    </div>
  ))}
</div>

            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg p-3">
                 
                    <h1>Student Reviews</h1>
                 
                  <div>
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-24">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                   <span className="text-3xl font-bold text-purple-600">{(Number(course.price) - (Number(course.price)*Number(course.offer))/100).toFixed(2)}</span>
                    <span className="text-xl text-gray-400 line-through">{course.price}</span>
                     
                  </div>
                  <span className="bg-red-100 text-red-700 rounded-lg p-1">
                    Save ${((course.price*course.offer)/100).toFixed(2)}
                  </span>
                </div>

                <button 
                   
                  className="flex w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-2 px-10 rounded-lg text-white justify-center gap-2"
                  onClick={() => navigate("/payment", { state: { course } })}
                >
                  <CreditCard className="h-5 w-5 mt-1" />
                 <span> Enroll Now</span>
                </button>
                <hr className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-purple-600" />
                      {course.duration} of video content
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                      {totalLessons} lessons
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                      Lifetime access
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                      Access on mobile and desktop
                    </li>
                  </ul>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;