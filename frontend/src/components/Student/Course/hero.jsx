import { useState } from "react";
import { Calendar, User, Video, MessageSquare } from "lucide-react";
import {
  BookOpen,
  Code,
  PlayCircle,
  FileText,
  Puzzle,
  Brain,
  GraduationCap,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CoursePerformance = ({ course, fetchTopic }) => {

  
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const selectedChapter = course.chapters[selectedChapterIndex];

  const icons = [
    BookOpen,
    Code,
    PlayCircle,
    FileText,
    Puzzle,
    Brain,
    GraduationCap,
  ];

  const getChartData = (tests) =>
    tests?.map((test, idx) => ({
      name: `Test ${idx + 1}`,
      percentage: ((test.obtained / test.total) * 100).toFixed(2),
    }));

  const chartData = getChartData(selectedChapter.tests);

  return (
    <div className="relative max-w-6xl mx-auto p-4 md:p-4">
      <div className="overflow-hidden z-0  bg-gradient-to-br from-[#1e1b4b] to-[#1e3a8a] text-white rounded-md p-8 shadow-md">
        {/* Decorative SVG */}

        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 -top-72  w-xl h-xl pointer-events-none opacity-40 z-0"
        >
          <g fill="none" stroke="#93c5fd" stroke-width="1.5">
            <circle cx="100" cy="100" r="5" opacity="0.2" />
            <circle cx="100" cy="100" r="10" opacity="0.15" />
            <circle cx="100" cy="100" r="15" opacity="0.2" />
            <circle cx="100" cy="100" r="20" opacity="0.15" />
        
          </g>
        </svg>
        <svg
          className="absolute top-0 left-0 w-72 opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M48.1,-59.9C61.5,-49.1,70.5,-30.3,71.4,-12.7C72.2,5,64.8,21.3,54.2,33.7C43.5,46.1,29.5,54.6,14.1,61C-1.3,67.4,-17.9,71.6,-31.2,66.1C-44.6,60.7,-54.7,45.6,-60.3,29.5C-66,13.4,-67.2,-3.6,-62.8,-19.5C-58.5,-35.3,-48.6,-50,-34.8,-61.1C-20.9,-72.1,-3,-79.5,13.9,-76.6C30.8,-73.7,46.6,-60.7,48.1,-59.9Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Title & Description */}
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 drop-shadow">
          {course.meta?.title}
        </h1>
        <p className="text-sm opacity-90 mb-6 leading-relaxed max-w-2xl">
          {course.meta?.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button className="flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-md transition">
            <Video className="w-5 h-5" />
            Video Call Teacher
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-white text-indigo-700 hover:bg-blue-100 rounded-full shadow-md transition">
            <MessageSquare className="w-5 h-5" />
            Message Teacher
          </button>
        </div>

         <img src={course.meta.thumbnail_url} alt="thumbnail"  className="absolute top-4 right-4 border-2 border-blue-400 rounded-md opacity-40"/> 

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-blue-200">
          <div className="flex items-center gap-2">
           <span>{course.meta.stream}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(course.meta.enrolled_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{course.meta.name}</span>
          </div>
          <div className="w-full max-w-sm">
            <div className="flex justify-between mb-1">
              <span className="text-sm  text-blue-200">Course Completion</span>
              <span className="text-sm text-blue-200">
                {course.completion}%
              </span>
            </div>
            <div className="w-full bg-blue-950/40 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-green-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${course.completion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold  ml-6 mt-4">Test Performance</h2>
      <p className="mb-3 text-sm ml-10">
        {" "}
        You can see the performance in test chapter wise
      </p>

      {/* Mobile dropdown */}
      <div className="block md:hidden mb-4">
        <select
          value={selectedChapterIndex}
          onChange={(e) =>{ fetchTopic(parseInt(e.target.value));
            setSelectedChapterIndex(parseInt(e.target.value))}}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        >
          {course.chapters?.map((chapter, idx) => (
            <option key={idx} value={idx}>
              {chapter.title}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop layout with tabs */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="col-span-1 border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-y-auto max-h-[400px] custom-scrollbar p-2">
            {course.chapters?.map((chapter, idx) => {
              const isActive = idx === selectedChapterIndex;
              const Icon = icons[idx % icons.length]; // Cycle through icons if > list

              return (
                <button
                  key={idx}
                  onClick={() => {
                    fetchTopic(idx);
                    setSelectedChapterIndex(idx)}}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-sm font-medium
            ${
              isActive
                ? "bg-indigo-600 text-white shadow-inner"
                : "hover:bg-gray-100 text-gray-700"
            }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-indigo-500"
                    }`}
                  />
                  <span>{chapter.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* // 1e3a8a   */}
        {/* Graph Area */}
        <div className="col-span-3 p-6 rounded-xl shadow border border-yellow-800 bg-[#090112ea]">
          <h3 className="text-xl font-extrabold mb-4 text-amber-400">
            {selectedChapter.title} - Test Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#e2e8f0", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#e2e8f0", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2c2b28",
                  border: "1px solid #facc15",
                  color: "#fff",
                }}
                formatter={(v) => `${v}%`}
              />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#34d399" // Tailwind sky-400 #34d399  38bdf8
                strokeWidth={2}
                activeDot={{ r: 5, fill: "#facc15" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mobile chart */}
      <div className="block md:hidden bg-white rounded-lg shadow p-4">
        <h3 className="text-md font-semibold mb-3 text-gray-800">
          {selectedChapter.title} - Test Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#6366F1"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoursePerformance;
