import React, { useState, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  BookOpenText,
  FlaskConical,
} from "lucide-react";

const ChapterSidebar = ({ chapters, onSelectTopic, fetchTopic }) => {
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    onSelectTopic(topic);
    if (isMobile) toggleMobile();
  };

  const SidebarContent = () => (
    <div className="w-full md:w-64 h-full md:h-screen overflow-y-auto bg-white dark:bg-[#0B0F19] border-r dark:border-[#1E293B] shadow-md p-4 space-y-3">
      {chapters.map((chapter, index) => (
        <div key={index} className="rounded-lg border dark:border-[#334155]">
          <button
            onClick={() =>{
              fetchTopic(index);
              setExpandedChapter(expandedChapter === index ? null : index);
            }
              
            }
            className="w-full flex justify-between items-center px-4 py-3 font-semibold 
              bg-gray-100 hover:bg-gray-200 text-gray-800 
              dark:bg-[#111827] dark:hover:bg-[#1F2937] dark:text-[#FF9933] transition rounded-t-lg"
          >
            {chapter.title}
            {expandedChapter === index ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {expandedChapter === index && (
            <div className="bg-white dark:bg-[#111827] px-2 py-2 space-y-2">
              {chapter.topics.map((topic, idx) => {
                const isSelected = selectedTopic?.topic_id === topic.topic_id;
                return (
                  <button
                    key={idx}
                    onClick={() => handleTopicSelect(topic)}
                    className={`w-full flex items-center gap-2 p-2 text-sm rounded-md transition 
                      ${isSelected
                        ? "bg-indigo-100 dark:bg-indigo-900 border-l-4 border-indigo-500 dark:border-indigo-400"
                        : "hover:bg-gray-100 dark:hover:bg-[#1E293B]"
                      } text-gray-800 dark:text-slate-300`}
                  >
                    <BookOpenText className="w-4 h-4 text-indigo-500" />
                    {topic.title}
                  </button>
                );
              })}

              {chapter.tests.map((test, idx) => {
               
                return (
                  <button
                    key={idx}
                    onClick={() => handleTopicSelect(test)}
                    className={`w-full flex items-center gap-2 p-2 text-sm rounded-md transition 
                      
                        bg-indigo-100 dark:bg-blue-950 border-l-4 border-indigo-500 dark:border-indigo-400
                       
                       text-gray-800 dark:text-slate-300`}
                  >
                     <FlaskConical className="w-4 h-4 text-cyan-500" />
                    {test.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Menu Toggle Button */}
          <div className="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-[#0B0F19] shadow-md md:hidden">
            <button
              onClick={toggleMobile}
              className="flex items-center gap-2 text-gray-700 dark:text-slate-200"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-medium">Chapters</span>
            </button>
          </div>

          {mobileOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="w-64 bg-white dark:bg-[#0B0F19] h-full shadow-xl">
                <SidebarContent />
              </div>
              <div
                className="flex-1 bg-black bg-opacity-50"
                onClick={toggleMobile}
              />
            </div>
          )}
        </>
      ) : (
        <SidebarContent />
      )}
    </>
  );
};

export default ChapterSidebar;
