import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import axiosInstance from "@/axios/axiosConfig"; // Assuming you have axios configured
import Navbar from "./shared/Navbar";

const COLORS = ["#6A38C2", "#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#FF6384", "#36A2EB", "#FFCE56"];

const chartOptions = [
  { label: "Bar Chart", value: "bar" },
  { label: "Pie Chart", value: "pie" },
  { label: "Radar Chart", value: "radar" },
];

const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedChart, setSelectedChart] = useState("bar");

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const res = await axiosInstance.get("/getMarks");
        setPerformanceData(res.data.data || []);
        // if(performanceData)
        console.log(res.data.data)
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  if (performanceData.length === 0) {
    return <div className="text-center mt-20 text-gray-600">Loading performance data...</div>;
  }

  return (
    <>
    <Navbar/>
     <div className="flex max-w-7xl mx-auto p-6">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md rounded-2xl p-4 mr-6">
        <h3 className="text-xl font-bold text-[#6A38C2] mb-6 text-center">Select Chart</h3>
        <div className="flex flex-col space-y-4">
          {chartOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedChart(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedChart === option.value
                  ? "bg-[#6A38C2] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#6A38C2]">Performance Overview</h1>

        {Array.isArray(performanceData)&& performanceData.map((student) => (
          <div key={student._id} className="space-y-12">
            {student.interviewRecords.map((record, i) => {
              const chartData = Object.entries(record.subtopicMarks)
                .filter(([key]) => key !== "_id")
                .map(([topic, score]) => ({
                  topic,
                  score: parseFloat(score),
                }));

              return (
                <div key={record._id} className="p-6 bg-white shadow-lg rounded-2xl">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">{record.skill} Performance</h2>

                  {/* Conditional rendering based on selectedChart */}
                  {selectedChart === "bar" && (
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="topic" angle={-45} textAnchor="end" interval={0} height={120} />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="score" fill={COLORS[i % COLORS.length]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {selectedChart === "pie" && (
                    <div className="w-full h-[300px] flex justify-center">
                      <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            dataKey="score"
                            nameKey="topic"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {selectedChart === "radar" && (
                    <div className="w-full h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="topic" />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} />
                          <Radar name={record.skill} dataKey="score" stroke="#6A38C2" fill="#6A38C2" fillOpacity={0.6} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
    </>
   
  );
};

export default PerformancePage;
