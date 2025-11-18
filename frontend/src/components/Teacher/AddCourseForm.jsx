import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const AddCourseForm = ({ toggle }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stream, setStream] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const MAX_SIZE = 1 * 1024 * 1024;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Course title is required");
      return;
    }

    if (!stream.trim()) {
      toast.error("Stream should not blank");
      return;
    }

    if (thumbnail) {
      if (thumbnail.size > MAX_SIZE) {
        toast.error(
          "File size exceeds 1MB limit. Please choose a smaller file."
        );
        return;
      }
      if (!thumbnail.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("stream", stream);
    formData.append("duration", duration);
    formData.append("thumbnail", thumbnail);

    try {
      await api.post("/teacher/dashboard/addcourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Course Added successfully!",{autoClose: 1000,});

      setTimeout(() => toggle(false), 1000);
    } catch (err) {

      toast.error("Error adding course", {autoClose: 1000,});
    }

    // Reset form
    setTitle("");
    setDesc("");
    setPrice("");
    setStream("");
    setDuration("");
    setThumbnail(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6  p-6  max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">
        📚 Add New Course
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stream
          </label>
          <input
            type="text"
            className="form-input"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            placeholder="Arts,Science,Computer Science, etc."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="in Months"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail
          </label>
          <input
            type="file"
            className="form-input"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="form-input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition transform"
        >
          {"Add Course"}
        </button>

        <button
          className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition transform"
          onClick={() => toggle(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
