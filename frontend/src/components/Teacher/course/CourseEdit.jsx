import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import api from "../../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { useCourse } from "./courseContext";

export default function EditCourseModal({ course, onClose }) {
  const { updateCourse } = useCourse();
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    duration: "",
    description: "",
    stream: "",
    thumbnail_url: "",
    thumbnail: null,
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        price: course.price,
        stream: course.stream,
        duration: course.duration,
        description: course.description,
        thumbnail_url: course.thumbnail_url || "",
      });
    }
  }, [course]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const MAX_SIZE = 1 * 1024 * 1024;

  const handleThumbnailUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error(
          "File size exceeds 1MB limit. Please choose a smaller file."
        );
        return;
      }
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setFormData((prev) => ({ ...prev, thumbnail_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const form = new FormData();
    form.append("course_id", course.course_id);
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("stream", formData.stream);
    form.append("duration", formData.duration);
    form.append("description", formData.description);
    if (formData.thumbnail) {
      form.append("thumbnail", formData.thumbnail); // this is the file
    }

    try {
      await api.put("/teacher/dashboard/editcourse", form);
      updateCourse({
        ...course,
        ...formData,
        thumbnail_url: formData.thumbnail_url,
      });

      toast.success("Course Update Successfully", { autoClose: 300 });
      onClose();
    } catch (error) {
      toast.error("Error in Course Updation", { autoClose: 300 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Course</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-red-600" />
          </button>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Course Thumbnail
          </label>
          {formData.thumbnail_url && (
            <div className="relative w-full h-32">
              <img
                src={formData.thumbnail_url}
                alt="Thumbnail"
                className="w-full h-full object-cover rounded-lg border"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={() => handleInputChange("thumbnail", "")}
              >
                <X size={16} />
              </button>
            </div>
          )}
          <label
            htmlFor="thumbnail-upload"
            className="cursor-pointer border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col items-center hover:border-indigo-400"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-indigo-600 hover:underline">
              Upload Thumbnail
            </span>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailUpload}
            />
          </label>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="form-input"
          />
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                handleInputChange("price", parseFloat(e.target.value) || 0)
              }
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="form-input"
              placeholder="e.g., 12 weeks"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stream
          </label>
          <input
            type="text"
            value={formData.stream}
            onChange={(e) => handleInputChange("stream", e.target.value)}
            className="form-input"
            placeholder="Computer Science, Arts etc."
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="mt-1 w-full p-2 border  rounded-lg min-h-[100px] form-input"
            rows={4}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3  pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
