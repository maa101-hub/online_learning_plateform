import { Plus } from "lucide-react";

const EmptyChaptersList = () => {
  return (
    <div className="bg-white rounded-xl p-12 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <h3 className="text-xl font-medium text-gray-700 mb-3">No chapters yet</h3>
      <p className="text-gray-500 mb-8">Start creating your first chapter by clicking the "Add Chapter" button above.</p>
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mx-auto shadow-inner">
        <Plus className="h-12 w-12 text-indigo-300" />
      </div>
    </div>
  );
};

export default EmptyChaptersList;