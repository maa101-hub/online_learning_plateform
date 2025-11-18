import React, { useEffect } from "react";
import CourseHeader from "../../components/Student/Course/header";
import CourseHero from "../../components/Student/Course/hero";
import { useState } from "react";
import ContentViewer from "../../components/Student/Course/ContentViewer";
import ChapterSidebar from "../../components/Student/Course/leftLayout";
import { useLocation, useNavigate } from "react-router-dom";
import {handleApiError} from "../../utils/ErrorHandler";
import api from "../../utils/api";

const EnrolledCourse = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [course1, setCourse] = useState({watch_time: "32000sec",
  total_time: "6500000sec",
completion: 78,

});

  const {course:courseData} = location.state || {};

  if (!courseData) {
    navigate("/student/dashboard");
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/student/enrollcourse/meta/${courseData.course_id}/${courseData.enroll_id}`
        );
        
        
        const tempData = {...course1,  meta: res.data.meta,
          chapters: res.data.chapters }
        setCourse(tempData);
      } catch (error) {
        console.log(error);
        
        handleApiError(error, "Some Internal Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const fetchTestsTopics = async (index) => {
  if (index == null) return;

  try {
    setLoading(true);

    const chapter_id = course1.chapters[index].chapter_id;

    // Deep copy course1
    const updatedCourse = JSON.parse(JSON.stringify(course1));

    if (!updatedCourse.chapters[index].topics) {
      const res = await api.get(`/student/enrollcourse/topics/${chapter_id}`);
      updatedCourse.chapters[index].topics = res.data;
    }

    if (!updatedCourse.chapters[index].tests) {
      const res = await api.get(`/student/enrollcourse/tests/${chapter_id}`);
      updatedCourse.chapters[index].tests = res.data;
    }

    setCourse(updatedCourse);
  } catch (error) {
    handleApiError(error, "Backend Down");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans">
      <CourseHeader />
      {course1.chapters?.length>0 && <CourseHero course={course1} fetchTopic={fetchTestsTopics}/>}
      

      <div className="relative flex flex-col md:flex-row h-screen">
       {course1.chapters &&<ChapterSidebar
          chapters={course1.chapters}
          fetchTopic={fetchTestsTopics}
          onSelectTopic={(topic) => setSelectedTopic(topic)}
        />}
        
        <ContentViewer topic={selectedTopic} />
      </div>

      {loading &&<div className="h-full w-full animate-spin"></div>}
    </div>
  );
};

export default EnrolledCourse;
