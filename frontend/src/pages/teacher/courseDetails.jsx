import React, { useEffect, useState } from 'react'
import Header from '../../components/Teacher/course/header';
import ChapterList from '../../components/Teacher/course/chapterList';
import StudentList from '../../components/Teacher/course/StudentList';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/Teacher/course/hero';
import { useCourse } from '../../components/Teacher/course/courseContext';



const courseDetails = () => {

  const [toggle, setToggle]  = useState(true);
  const location = useLocation();
const { course: initialCourse } = location.state || {};
const { courses } = useCourse();
const [course, setCourse] = useState(initialCourse || null);


useEffect(() => {
    
  if (initialCourse?.course_id && courses.length > 0) {
    const updated = courses.find(c => c.course_id === initialCourse.course_id);
    if (updated) {
      setCourse(updated); // update local course with latest from context
    }
  }
}, [courses, initialCourse]);

  return (
    <div className="w-full min-h-screen  overflow-hidden">
    <Header course={course} />
    <Hero course={course}/>

    <div className="px-0 py-0 rounded-xl flex gap-4 max-w-1/2 mx-auto mt-5">
      <button
        onClick={() => setToggle(true)}
        className={`w-full py-1 rounded-lg font-semibold transition-all duration-300 ${
          toggle
            ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
            : 'bg-gray-200 text-slate-600'
        }`}
      >
        Chapters
      </button>

      <button
        onClick={() => setToggle(false)}
        className={`w-full py-1 rounded-lg font-semibold transition-all duration-300 ${
          !toggle
            ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
            : 'bg-gray-200 text-slate-600'
        }`}
      >
        Students
      </button>
    </div>
   <div  className='m-4 rounded-lg'>
    {toggle && <ChapterList course_id= {course.course_id}/>}
    {!toggle && <StudentList/>}
    </div>

  </div>
  )
}

export default courseDetails
