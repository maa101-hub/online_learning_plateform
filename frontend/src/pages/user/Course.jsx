import React from 'react'
import AllCourses from '../../components/course/AllCourses'
import Footer from '../../components/Home/footer'
import { useNavigate } from 'react-router-dom'
import {User} from 'lucide-react'
import { useAuth } from '../../utils/authProvider'
const Course = () => {

  const {role, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const NavigationHandle = ()=>{
          if(role==='teacher')navigate('/teacher/dashboard');
          else if(role==='student')navigate('/student/dashboard');
          else navigate('/login');
  }
  return (
    <div className='w-full'>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md mb-1">
        <div className="text-lg md:text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}> 
        
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduVerse
              </span>
        </div>
        <button onClick={() => NavigationHandle()} className="flex gap-1 text-sm px-4 py-2 border rounded text-white border-purple-300 bg-gradient-to-br from-purple-500 to-blue-500 hover:scale-105"><span><User/></span>Dashboard</button>
      </nav>
      <AllCourses></AllCourses>
      <Footer/>
    </div>
  )
}

export default Course
