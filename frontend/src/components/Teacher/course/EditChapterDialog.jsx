import { useState } from 'react';
import { Plus } from 'lucide-react';
import api from '../../../utils/api';

const EditChapterDialog = ({course_id, chapter_id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });

  const closeDialog = () => {
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setErrors({ title: '', description: '' });
  };

  const openDialog = () => {
    setIsOpen(true);
    setErrors({ title: '', description: '' });
  };

  const handleSave = async () => {
    let hasError = false;
    const newErrors = { title: '', description: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      hasError = true;
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
        await api.put('teacher/course/editchapter',{title, description, chapter_id});
        toast.success("chapter edit successfully");
        closeDialog();
      } catch (error) {
        toast.error("error in chapter edit",error);
      }

  };

  return (
    <>
      <button
        onClick={openDialog}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Chapter
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-md shadow-lg p-6 relative animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800">Add New Chapter</h2>
            <p className="text-sm text-gray-600 mb-4">Create a new chapter for your course.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="chapter-title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="chapter-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`mt-1 block w-full rounded-md border p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter chapter title"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="chapter-desc" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="chapter-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`mt-1 block w-full rounded-md border p-2 text-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter chapter description"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeDialog}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Save Chapter
              </button>
            </div>

            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditChapterDialog;
