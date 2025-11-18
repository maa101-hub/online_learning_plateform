import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Delete } from "lucide-react";
import api from "../../utils/api";

const EditProfile = ({ teacher, profileEdit }) => {
  const [formData, setFormData] = useState({
    name: teacher.name,
    dob: teacher.dob,
    yoe: teacher.yoe,
    description: teacher.description,
    email: teacher.email,
    phone: teacher.phone,
    education: teacher.education,
    public_id: teacher.public_id,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    teacher.image_url || "/teacher_profile.png"
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEduChange = (i, e) => {
    const newEdu = [...formData.education];
    newEdu[i][e.target.name] = e.target.value;
    setFormData({ ...formData, education: newEdu });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", year: "", institute: "" },
      ],
    });
  };

  const MAX_SIZE = 1 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error(
          "File size exceeds 1MB limit. Please choose a smaller file."
        );
        return;
      }

      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(); // interface of type formdata
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "education") form.append(key, value);
    });
    form.append("education", JSON.stringify(formData.education));
    if (imageFile) form.append("image", imageFile);

    try {
      await api.put("/teacher/dashboard/editProfile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");

      setTimeout(() => profileEdit(false), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mr-1 mt-5 p-8 border border-gray-300 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-800">
        Teacher Profile Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
        {/* Image Upload */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover border rounded-md"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 border rounded-md flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="w-full">
            <label className="block font-medium">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm"
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Years of Experience</label>
            <input
              type="number"
              name="yoe"
              value={formData.yoe}
              onChange={handleChange}
              className="form-input"
              min="0"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-textarea w-full"
          ></textarea>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="font-semibold mb-2">Educational Qualifications</h3>
          {formData.education?.map((edu, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-2"
            >
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEduChange(index, e)}
                placeholder="Degree"
                className="form-input"
              />
              <input
                type="text"
                name="year"
                value={edu.year}
                onChange={(e) => handleEduChange(index, e)}
                placeholder="Year"
                className="form-input"
              />
              <input
                type="text"
                name="institute"
                value={edu.institute}
                onChange={(e) => handleEduChange(index, e)}
                placeholder="Institute"
                className="form-input"
              />
              <Delete
                className="text-red-600 mt-1 hover:text-orange-400 cursor-pointer"
                onClick={() => {
                  const updatedEducation = formData.education.filter(
                    (_, i) => i !== index
                  );
                  setFormData((prev) => ({
                    ...prev,
                    education: updatedEducation,
                  }));
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="text-blue-600 text-sm mt-1 underline hover:text-green-600"
          >
            + Add another qualification
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center flex justify-between">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Save Profile
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-900"
            onClick={() => profileEdit(false)}
          >
            Cancel
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditProfile;
