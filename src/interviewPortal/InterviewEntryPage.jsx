import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewEntryPage = () => {
  const [interviewId, setInterviewId] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!interviewId || !role) {
      alert('Please enter Interview ID and select a role.');
      return;
    }

    navigate(`/instruction/${interviewId}`, {
      state: {
        interviewId,
        role,
      },
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Join Interview
        </h2>

        <label className="block w-full font-medium mb-2">Interview ID</label>
        <input
          type="text"
          value={interviewId}
          onChange={(e) => setInterviewId(e.target.value)}
          placeholder="Enter Interview ID"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-black text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />

        <label className="block w-full font-medium mb-2">Select Role</label>
        <div className="flex gap-4 mb-6 w-full">
          <button
            onClick={() => setRole("interviewer")}
            className={`flex-1 py-2 rounded-md font-medium transition-all duration-150 ${role === "interviewer"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-white"
              }`}
          >
            Interviewer
          </button>
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-md font-medium transition-all duration-150 ${role === "student"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-white"
              }`}
          >
            Student
          </button>
        </div>

        <button
          onClick={handleJoin}
          className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-900 transition-all"
        >
          Join Interview
        </button>
      </div>
    </div>
  );


}
export default InterviewEntryPage;
