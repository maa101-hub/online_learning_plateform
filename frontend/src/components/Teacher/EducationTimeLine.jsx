import React from 'react';

const EducationTimeline = ({ education }) => {
  return (
    <div className="pl-6">
  <h2 className="text-2xl font-bold text-purple-800 mb-6">🎓 Education </h2>
  <div className="border-l-2 border-purple-400 space-y-6">
    {education?.map((item, index) => (
      <div key={index} className="relative pl-6">
        <span className="absolute -left-3 top-2 w-3 h-3 bg-purple-600 rounded-full"></span>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-700">{item.degree}</h3>
          <p className="text-gray-700">{item.institute}</p>
          <p className="text-sm text-gray-500">{item.year}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default EducationTimeline;
