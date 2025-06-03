import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InterviewJoinPage() {
  const [interviewId, setInterviewId] = useState("");
  const [role, setRole] = useState("candidate"); // Default role
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!interviewId.trim()) {
      alert("Please enter a valid Interview ID.");
      return;
    }

    // Navigate to interview screen with params
    navigate(`/interview/${interviewId}`, { state: { role } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold mb-4">Join Interview</h1>

      <input
        type="text"
        placeholder="Enter Interview ID"
        className="px-4 py-2 border border-gray-300 rounded w-64"
        value={interviewId}
        onChange={(e) => setInterviewId(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded w-64"
      >
        <option value="candidate">Candidate</option>
        <option value="interviewer">Interviewer</option>
      </select>

      <button
        onClick={handleJoin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Join Interview
      </button>
    </div>
  );
}
