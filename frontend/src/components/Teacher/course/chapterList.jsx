import React, { useEffect, useState } from "react";
import ChapterItem from "./ChapterItem";
import EmptyChaptersList from "./EmptyChapterList";
import AddChapterDialog from "./AddChapterDialog";
import api from "../../../utils/api";
import { toast, ToastContainer } from "react-toastify";

const course = {
  chapters: [
    {
      chapter_id: 1,
      title: "Introduction to Advanced JavaScript",
      description:
        "Overview of the course and introduction to advanced JavaScript concepts",
      topics: [
        {
          id: 1,
          title: "Course Overview",
          type: "video",
          duration: "15 minutes",
          resource: "https://www.youtube.com/watch?v=gOWmKowrIa0",
        },
        {
          id: 2,
          title: "JavaScript Fundamentals Recap",
          type: "pdf",
          resource: "https://example.com/pdf1",
        },
      ],
      test: [
        {
          title: "test_01",
          id: "1",
          created_at: "23-03-2023",
          duration: "2h",
          marks: "100",
        },
        {
          title: "test_02",
          id: "2",
          created_at: "23-04-2023",
          duration: "2h",
          marks: "100",
        },
      ],
    },
    {
      chapter_id: 2,
      title: "Working with Closures and Scopes",
      description:
        "Deep dive into JavaScript closures, lexical scope and practical applications",
      test: [
        {
          title: "test_01",
          id: "1",
          created_at: "23-03-2023",
          duration: "2h",
          marks: "100",
        },
        {
          title: "test_02",
          id: "2",
          created_at: "23-04-2023",
          duration: "2h",
          marks: "100",
        },
      ],
    },
  ],
};

const CourseDetail = ({ course_id }) => {
  const [toggle, setToggle] = useState(false);
  const [chapters , setChapters ] = useState([{
    chapter_id:'',
    title :'',
    description :''
  }]);
  useEffect(() => {
  const ChapterFetch = async () => {
    try {
      const numericId = parseInt(course_id, 10);
          const res = await api.get(`/teacher/course/allchapter/${numericId}`);
          if(res.data.data.length>0)
         {setChapters(res.data.data);
         setToggle(true);}
    } catch (error) {
      const errMsg = error?.response?.data?.error || "There is an error in fetching the chapters";
      toast.error(errMsg);
    }
  };

  if (course_id) {
    ChapterFetch();
  }
}, [course_id]);


  const [expandedChapter, setExpandedChapter] = useState(null);

  const toggleChapter = (id) => {
    setExpandedChapter((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Chapters
              {toggle &&
              <span className="ml-3 text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full ">
                {chapters?.length}
              </span>
}
            </h2>

            <AddChapterDialog course_id={course_id} />
          </div>

          {toggle ? (
            chapters.map((chapter, index) => (
              <div className="space-y-3" key={index}>
              <ChapterItem
                key={chapter.chapter_id}
                chapter={chapter}
                isExpanded={expandedChapter === chapter.chapter_id}
                onToggle={toggleChapter}
              />
              </div>
            ))
          ) : (
            <EmptyChaptersList />
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CourseDetail;
