import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import ChapterContent from './ChapterContent';
import AddTopicDialog from './AddTopicDialog';
import api from '../../../utils/api';
import { toast } from 'react-toastify';

const ChapterItem = ({ chapter, isExpanded, onToggle }) => {
const [topicLn , setTopicln] = useState(1);

const deleteChapter = async ()=>{
  try {

    await api.delete(`/teacher/course/deleteChapter/${chapter.chapter_id}`);
  } catch (error) {
    toast.error("error in delete the chapter");
  }
            

}

  return (
    <div className="overflow-hidden border border-gray-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-l-4 hover:border-l-indigo-500">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div
              onClick={() => onToggle(chapter.chapter_id)}
              className="flex items-center cursor-pointer group"
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {chapter.title}
              </h3>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 ml-2 text-indigo-500" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-2 text-indigo-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
          </div>

          <div className="flex items-center space-x-3 mt-2 md:mt-0">
            {topicLn==0 &&<button
          className="p-2 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Delete topic"
          onClick={deleteChapter}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>}
            
         <div className="flex justify-between items-center  ">
           <AddTopicDialog  chapter_id={chapter.chapter_id}/>
         </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 animate-slide-down">
            <ChapterContent chapter_id={chapter.chapter_id}  setTopicln={setTopicln}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterItem;
