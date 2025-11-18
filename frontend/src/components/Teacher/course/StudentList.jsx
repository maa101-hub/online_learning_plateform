import { useState } from "react";

const studentData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    enrolledOn: "15 Jan 2023",
    progress: 75,
    initials: "JD",
  },
  {
    name: "Alice Miller",
    email: "alice.m@example.com",
    enrolledOn: "20 Jan 2023",
    progress: 60,
    initials: "AM",
  },
  {
    name: "Robert Kim",
    email: "robert.kim@example.com",
    enrolledOn: "22 Jan 2023",
    progress: 90,
    initials: "RK",
  },
  {
    name: "Tanya Smith",
    email: "tanya.smith@example.com",
    enrolledOn: "1 Feb 2023",
    progress: 30,
    initials: "TS",
  },
  {
    name: "Luke Wilson",
    email: "luke.wilson@example.com",
    enrolledOn: "10 Feb 2023",
    progress: 45,
    initials: "LW",
  },
];

const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = studentData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          Enrolled Students
          <span className="ml-3 text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            {filteredStudents.length}
          </span>
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            className="w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-400 focus:outline-none"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 rounded text-sm">
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="py-4 px-6 text-left font-medium">Student</th>
              <th className="py-4 px-6 text-left font-medium">Email</th>
              <th className="py-4 px-6 text-left font-medium">Enrolled On</th>
              <th className="py-4 px-6 text-left font-medium">Progress</th>
              <th className="py-4 px-6 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student, i) => (
              <tr key={i} className="text-sm hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                      {student.initials}
                    </div>
                    <span className="ml-3 font-medium text-gray-800">{student.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{student.email}</td>
                <td className="py-4 px-6 text-gray-600">{student.enrolledOn}</td>
                <td className="py-4 px-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        student.progress > 80
                          ? "bg-green-500"
                          : student.progress > 50
                          ? "bg-indigo-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1.5 block">
                    {student.progress}% complete
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1 rounded text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Showing 1–{filteredStudents.length} of {studentData.length} students
        </span>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-1 text-sm rounded border border-gray-200 text-gray-400 cursor-not-allowed"
          >
            Previous
          </button>
          <button className="px-3 py-1 text-sm rounded border border-indigo-200 text-indigo-700 hover:bg-indigo-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;
