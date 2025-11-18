import { FileText, Plus } from 'lucide-react';
import AddTopicDialog from './AddTopicDialog';
import TopicItem from './TopicItem';
import EmptyTopicsList from './EmptyTopicList';
import { Clock, CalendarDays, CircleDollarSign } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../utils/api';

const ChapterContent = ({ chapter_id , setTopicln }) => {
  if(!chapter_id)return null;
   const [topics, setTopics] = useState([]);
   const [tests, setTests ] = useState([]);
   const [isCurrent, setCurrent ] = useState(null);
   
   const onToggle = (id)=>{
         setCurrent((prev)=>prev === id? null: id);
   }

   const onDelete = (id)=>{
          const filterTopic = topics.filter((topic)=>topic.topic_id !== id);

          setTopics(filterTopic);
          setTopicln(filterTopic.length);
   }
   
   useEffect(()=>{
        const fetchChapters = async ()=>{
          try {
             const res = await api.get(`/teacher/course/alltopics/${chapter_id}`);
             setTopics(res.data.data);
             setTopicln(res.data.data.length);
          } catch (error) {
              toast.error("error in topics fetching");
          }
                 
        }

        const fetchTests =async()=>{
            try {
            
          } catch (error) {
            toast.error("error in tests fetching");
          }
            
        }
        fetchChapters();
        fetchTests();
   }, [chapter_id]);
  return (
    <div className="mt-6 border-t pt-5">
      {/* Topics Section */}
      

      {topics?.length > 0 ? (
        <ul className="space-y-3">
          {topics.map((topic) => (
            <TopicItem key={topic.topic_id} topic={topic} isExpanded={isCurrent === topic.topic_id} onToggle={onToggle} onDelete={onDelete}/>
          ))}
        </ul>
      ) : (
        <EmptyTopicsList /> 
      )}

      {/* Chapter Tests Section */}
      <div className=" mt-6 border-t pt-5">
        <div className='flex justify-between mr-3'>
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">Chapter Tests</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {tests.length}
          </span>
        </h4>
        <button
            className="flex items-center text-sm h-9 px-3 border border-green-200 text-green-900 rounded hover:bg-green-50 hover:text-green-800 transition-colors"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Test
        </button>
        </div>
        {tests && tests.map((test) => (
  <div
    key={test.id}
    id={test.id}
    className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4"
  >
    {/* Title */}
    <div className="flex items-center gap-3 mb-2">
       <FileText className="h-4 w-4 text-green-600" />
      <p className="text-lg font-semibold text-gray-800">{test.title}</p>
    </div>

    {/* Metadata */}
    <div className="flex items-center gap-6 text-sm text-gray-600 mt-2">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-4 h-4 text-gray-500" />
        <span>{test.created_at}</span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span>{test.duration}</span>
      </div>

      <div className="flex items-center gap-2">
        <CircleDollarSign className="w-4 h-4 text-gray-500" />
        <span>{test.marks} marks</span>
      </div>
    </div>
  </div>
))}
       
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ChapterContent;
