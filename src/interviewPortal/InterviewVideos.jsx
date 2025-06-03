import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosConfig.js";
import { format } from "date-fns";
import { FiDownload, FiCopy } from "react-icons/fi";
import { MdVideoLibrary } from "react-icons/md";

const InterviewVideos = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterviewRecordings = async () => {
      try {
        const response = await axiosInstance.get("getAllInterviewRecordings");
        if (response.data.success) {
          setInterviews(response.data.data);
        } else {
          setError("Failed to fetch recordings.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error("Error fetching interview videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewRecordings();
  }, []);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("Video link copied to clipboard!");
  };

  const filteredInterviews = interviews.filter((interview) =>
    interview.interviewId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading interview videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">🎥 Interview Recordings Dashboard</h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by Interview ID..."
          className="w-full md:w-1/2 px-4 py-2 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {filteredInterviews.map((item) => {
          const createdDate = format(new Date(item.createdAt), "dd MMM yyyy, hh:mm a");
          const updatedDate = format(new Date(item.updatedAt), "dd MMM yyyy, hh:mm a");

          return (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800">
                  <MdVideoLibrary className="inline mr-2 text-blue-500" />
                  Interview ID: {item.interviewId}
                </h2>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-600">
                  Recorded
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">🆔 Record ID: {item._id}</p>
              <p className="text-sm text-gray-600 mb-1">📅 Created: {createdDate}</p>
              <p className="text-sm text-gray-600 mb-3">🔄 Updated: {updatedDate}</p>

              <div className="space-y-4">
                {item.video.map((videoUrl, index) => (
                  <div key={index} className="group relative">
                    <video
                      controls
                      className="w-full rounded-lg border border-gray-300"
                      preload="metadata"
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => window.open(videoUrl, "_blank")}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-blue-100"
                        title="Download / Open"
                      >
                        <FiDownload className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleCopy(videoUrl)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-green-100"
                        title="Copy link"
                      >
                        <FiCopy className="text-green-600" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Video {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredInterviews.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">No interviews found for this ID.</p>
      )}
    </div>
  );
};

export default InterviewVideos;
