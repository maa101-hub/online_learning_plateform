import React, { createContext, useContext, useState } from 'react';


const CourseContext = createContext();

// Custom hook for using the context
export const useCourse = () => useContext(CourseContext);

// Context Provider
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const updateCourse = (updated) => { 
    setCourses(prev =>
      prev.map(course =>
        course.course_id === updated.course_id ? updated : course
      )
    );
  };

  return (
    <CourseContext.Provider value={{ courses, setCourses, updateCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
