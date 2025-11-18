import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Calendar, Search } from "lucide-react";
import api from "../../utils/api";

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [courses,setCourses] = useState([]);

  useEffect(()=>{
      const fetchCourse = async ()=>{
           const res = await api.get('/allcourse'); 
          const fdata = res.data;
          const course2 = fdata.map((data,index)=>{
                return {
                  ...data, rating:4.8
                }
          });
          setCourses(course2);
      }
      fetchCourse();
  },[]);

  const courses1 = [
    {
      course_id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      category: "Web Development",
      price: 99.99,
      offer: 10,
      rating: 4.8,
      students: 15420,
      duration: "42 hours",
      teacher_id : 1,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp."
    },
    
  ];

  const uniqueStreams = useMemo(() => {
    const set = new Set(courses?.map(course => course.category));
    return ["All", ...Array.from(set)];
  }, [courses]);

  const filteredCourses = courses?.filter(course => {
    const keyword = searchTerm.toLowerCase();
    const matchesText = course.title.toLowerCase().includes(keyword) ||
                        course.instructor.toLowerCase().includes(keyword) ||
                        course.description.toLowerCase().includes(keyword) ||
                        course.category.toLowerCase().includes(keyword);
    const matchesStream = selectedStream === "All" || course.category === selectedStream;
    return matchesText && matchesStream;
  });

  return (
    <div className="min-h-screen p-4 bg-gray-50">
    
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Explore Our Courses</h1>
        <p className="text-center text-gray-600 mb-6">Search and filter courses by your interests</p>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by title, instructor, stream or description"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <select
            value={selectedStream}
            onChange={e => setSelectedStream(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {uniqueStreams.map((stream, index) => (
              <option key={index} value={stream}>{stream}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map(course => (
            <div key={course.id} className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <span className="absolute top-0.5 right-2 bg-white/70 w-14 rounded-3xl px-2 h-5 text-sm font-medium">⭐{course.rating}</span>
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs text-white bg-blue-800 rounded mb-2">{course.category}</span>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{course.description}</p>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <User size={14} /> {course.instructor}
                  <Calendar size={14} className="ml-4" /> {course.duration}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-600 font-bold text-lg">${course.price}</span>
                    <span className="line-through text-sm text-gray-500 ml-2">${course.originalPrice}</span>
                  </div>
                  <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
                </div>
                <button onClick={() => navigate(`/coursedetails`, { state: { course } })} className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <BookOpen size={40} className="mx-auto mb-4 text-purple-300" />
            <p>No courses match your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
