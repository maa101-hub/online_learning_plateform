import { useState } from "react";
import { FileText, Plus, Video } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../utils/api";

const AddTopicDialog = ({ chapter_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("Video");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileSubmit = (event) => {
    event.preventDefault();

    if (event.target.files[0]) {
      const f = event.target.files[0];

      const MAX_SIZE = 50 * 1024 * 1024;
      if (f.size > MAX_SIZE) {
        toast.error("upload file size is more please reduce the size 50 MB");
        return;
      } else {
        setFile(f);
      }
    }
  };

  const handleSubmit = async () => {
    if (file != null && title != "") {
      setIsUploading(true);
      const form = new FormData();

      form.append("title", title);
      form.append("type", type);
      form.append("resource", file);
      form.append("chapter_id", chapter_id);
      try {
        
        await api.post("/teacher/course/addTopic", form);

        toast.success("Topic add successfully",{autoClose:100});
        setTitle("");
        setFile(null);
        setType("Video");
        setTimeout(() => setIsOpen(false), 200);

        
      } catch (error) {
        toast.error(
          `Error in uploading topic: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setIsUploading(false); // STOP LOADING
      }
    } else {
      toast.error("Please fill all the details");
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 border border-indigo-200 text-white bg-green-600 hover:bg-indigo-50 hover:text-indigo-800 px-3 py-1.5 rounded text-sm"
      >
        <Plus className="h-4 w-4" />
        Topic
      </button>

      {/* Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Dialog Header */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Topic
              </h2>
              <p className="text-sm text-gray-500">
                Add a new topic to this chapter.
              </p>
            </div>

            {/* Dialog Body */}
            <div className="space-y-4">
              {/* Title Input */}
              <div className="space-y-1">
                <label
                  htmlFor="topic-title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="topic-title"
                  placeholder="Enter topic title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Type Selection */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-700 transition-colors">
                    <input
                      type="radio"
                      name="topic-type"
                      checked={type === "Video"}
                      className="text-indigo-600"
                      onChange={() => setType("Video")}
                    />
                    <Video className="h-4 w-4 text-indigo-600" />
                    <span>Video</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-700 transition-colors">
                    <input
                      type="radio"
                      name="topic-type"
                      className="text-indigo-600"
                      onChange={() => setType("Pdf")}
                    />
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span>PDF</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="resource"
                  className="text-sm font-medium text-gray-700"
                >
                  Upload {type}
                </label>
                <input
                  type="file"
                  id="resource"
                  placeholder="upload resource"
                  accept={type === "Video" ? "video/*" : "application/pdf"}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={handleFileSubmit}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                disabled={!title || !file || isUploading}
                className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                onClick={handleSubmit}
              >
                Save Topic
              </button>
            </div>

            {/* Close (optional X button) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {isUploading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-lg z-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default AddTopicDialog;
