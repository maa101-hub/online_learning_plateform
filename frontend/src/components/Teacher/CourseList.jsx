import React from 'react';
import {useNavigate} from 'react-router-dom';
import { BookOpen, Clock, DollarSign, Users,GraduationCap } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer,  LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
    Legend, } from 'recharts';
 import { useEffect } from 'react';   
import api from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { useCourse } from './course/courseContext';
import EmptyCoursesState from './course/EmptyCourse';  
  

const CourseList = () => {
    const navigate = useNavigate();
   
    const { courses, setCourses } = useCourse();

   useEffect( ()=>{
const fetchData = async ()=>{
     try {
      const result = await api.get('/teacher/dashboard/allcourse');
      
      setCourses(result.data.data);

     } catch (error) {
      toast.error("there is error in server",{
        autoClose:500,
      })
     }
};

fetchData();

   },[])

  
  return (
    <div className="mt-3 px-2">
      {courses.length>0?<CourseStats course={courses}/>: <EmptyCoursesState/>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {courses.length>0&&courses?.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            <img src={course.thumbnail_url} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-purple-700">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
              <hr className='text-blue-900'/>
              <div className="flex justify-between items-center text-sm text-gray-600 pt-2">
                <span className="flex items-center gap-1"><Clock size={16} /> {course.duration}</span>
                <span className="flex items-center gap-1"><Users size={16} /> {course.nums_of_students} Enrolled</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-1"><BookOpen size={16} /> {course.stream}</span>
                <span className="flex items-center gap-1 text-green-600"> ₹{course.price}</span>
              </div>
              <div className='flex justify-between mt-2'>
              <p className="text-xs text-gray-400">Created on: {course.created_on.toLocaleString()}</p>
              <button className='border-1 p-1 text-sm bg-blue-500 text-white rounded-sm  hover:cursor-pointer' onClick={()=>{navigate('/teacher/courseDetails', {state:{course}})}}>View Course</button>

              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CourseList;

const COLORS = ['#a78bfa', '#f472b6', '#60a5fa', '#facc15', '#34d399'];

const CourseStats = ({ course }) => {
    const now = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      return {
        label: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        month: d.getMonth(),
      };
    });
  
    // Histogram Data - Courses Added Per Month
    const coursesPerMonth = last12Months.map(({ label, month, year }) => {
      const count = course?.filter((c) => {
        const created = new Date(c.created_on);
        return created.getMonth() === month && created.getFullYear() === year;
      }).length;
      return { month: label, count };
    });
  
    // Line Graph Data - Students Enrolled Per Month
    const studentsPerMonth = last12Months.map(({ label, month, year }) => {
      const totalStudents = course?.filter((c) => {
          const created = new Date(c.created_on);
          return created.getMonth() === month && created.getFullYear() === year;
        })
        .reduce((sum, c) => sum + (c.nums_of_students|| 0), 0);
      return { month: label, students: totalStudents };
    });
  
    // Pie Chart Data - Stream Distribution
    const streamCount = {};
    course?.forEach((c) => {
      if (c.stream) {
        streamCount[c.stream] = (streamCount[c.stream] || 0) + 1;
      }
    });
    const streamData = Object.entries(streamCount).map(([stream, value]) => ({
      name: stream,
      value,
    }));
  
    const totalCourses = course.length;
    const totalStudents = course?.reduce((sum, c) => sum + (c.nums_of_students || 0), 0);
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentMonthCourses = course?.filter((c) => {
      const created = new Date(c.created_on);
      return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
    }).length;
  
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 ">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-purple-100 p-4 rounded-lg shadow text-center">
            <GraduationCap className="mx-auto text-purple-600" />
            <h4 className="text-xl font-bold text-purple-800">{totalCourses}</h4>
            <p className="text-sm">Total Courses</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-lg shadow text-center">
            <Users className="mx-auto text-pink-600" />
            <h4 className="text-xl font-bold text-pink-800">{totalStudents}</h4>
            <p className="text-sm">Total Students</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow text-center">
            <BookOpen className="mx-auto text-blue-600" />
            <h4 className="text-xl font-bold text-blue-800">{currentMonthCourses}</h4>
            <p className="text-sm">Courses This Month</p>
          </div>
        </div>
  
        {/* Line Chart */}
        <div className="bg-neutral-200 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Student Enrollment</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={studentsPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="students" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Bar Chart */}
        <div className="bg-neutral-200 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Courses Added Monthly</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coursesPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* Pie Chart */}
        <div className="bg-neutral-200 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Course Streams Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={streamData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {streamData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  






/*  {
            course_id : 1,
            "description": "this is  js course",
            "thumbnail_url": "https://res.cloudinary.com/dfm40rrao/image/upload/v1748889991/uploads/file_fhrivt.jpg",
            "public_id": "uploads/file_fhrivt",
            "nums_of_students": 0,
            "is_public": false


        id: 'c1',
        image_url: "ulr",
       
        desc: 'Learn JavaScript from scratch with projects and real-world applications.',
        num_of_students_enrolled: 120,
      },
  }

  */