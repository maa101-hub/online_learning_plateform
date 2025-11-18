import React from "react";
import ReactPlayer from "react-player";

const ContentViewer = ({ topic }) => {
  if (!topic) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-[#0e0707ef]">
        <p className="text-gray-500 text-lg">Select a topic to begin</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 bg-gray-50 dark:bg-[#0e0707ef] overflow-hidden dark:text-amber-300">
      <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>

      {topic.type === "Video" && (
        <div className="aspect-video">
          <ReactPlayer url={topic.url} controls width="100%" height="100%" />
        </div>
      )}

      {topic.type === "Pdf" && (
        <iframe
          src={topic.url}
          title={topic.title}
          width="100%"
          height="600"
          className="border rounded"
        />
      )}

      {topic.type === "test" && (
        <div className="bg-white dark:bg-[#0e0707ef] shadow p-4 rounded">
          <p>This will open the test page: <code>{topic.url}</code></p>
          {/* Implement navigation if needed */}
        </div>
      )}
    </div>
  );
};

export default ContentViewer;
