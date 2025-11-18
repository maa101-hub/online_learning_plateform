import { FileText } from "lucide-react";

const EmptyTopicsList = () => {
  return (
    <div className="text-center py-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-3 shadow-inner">
        <FileText className="h-7 w-7 text-indigo-400" />
      </div>
      <p className="text-gray-600 mb-2 font-medium">No topics yet</p>
      <p className="text-sm text-gray-500">Add your first topic to get started</p>
    </div>
  );
};

export default EmptyTopicsList;