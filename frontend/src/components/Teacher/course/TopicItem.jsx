import { FileText, Trash2, Edit, Video,ChevronDown, ChevronUp } from "lucide-react";
import VideoViewer from "./VideoViewer";
import PdfViewer from './PdfViewer';
import EditTopicDialog from "./EditTopicDialog";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../utils/api";


const TopicItem = ({ topic , onToggle , isExpanded , onDelete}) => {
 
  
  const [isEdit, setIsEdit] = useState(false);

  const deleteTopic = async ()=>{
    try {
        await api.delete('/teacher/course/deleteTopic', {
  data: { topic }
});

onDelete(topic.topic_id)

    } catch (error) {
      toast.error("error in delete the topic");
    }
             
    }
  return (
    <li className="bg-gray-50 p-4 rounded-lg hover:bg-white transition-colors group border border-transparent hover:border-gray-200 hover:shadow-sm">
      <div className="flex items-center">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 shadow-inner ${
            topic.type === "Video"
              ? "bg-gradient-to-r from-indigo-100 to-blue-100"
              : "bg-gradient-to-r from-blue-100 to-cyan-100"
          }`}
        >
          {topic.type === "Video" ? (  <div>
            <Video className="h-4 w-4 text-indigo-600" />
           
            </div>
          ) : (
            <FileText className="h-4 w-4 text-blue-600" />
          )}
        </div>

        <div
              onClick={() => onToggle(topic.topic_id)}
              className="flex items-center cursor-pointer group"
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {topic.title}
              </h3>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 ml-2 text-indigo-500" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-2 text-indigo-500" />
              )}
            </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
          aria-label="Edit topic"
          onClick={()=>setIsEdit(true)}
        >
          <Edit className="h-4 w-4 text-indigo-600" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Delete topic"
          onClick={deleteTopic}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>

      </div>
      </div>

      {
        isExpanded && <div className="mt-5">
       {
        topic.type==='Video' ? <VideoViewer   videoUrl={topic.url} thumbnailUrl={topic.thumbnail}/>:<PdfViewer url={topic.url}/>
       }
       

       </div>
      }
       {
        isEdit && <EditTopicDialog topic= {topic} setIsEdit={setIsEdit}/>
       }
     
      
      <ToastContainer/>
    </li>
  );
};

export default TopicItem;
