import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/axios/axiosConfig';
import NavbarCompany from './shared/NavbarCompany';

const GetTopStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  const skills = ["Python", "C++", "Java", "JavaScript", "DSA"];

  // Handle skill selection (checkbox)
  const handleSkillChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSkills((prevSelectedSkills) => {
      if (checked) {
        return [...prevSelectedSkills, value];  // Add the selected skill
      } else {
        return prevSelectedSkills.filter(skill => skill !== value);  // Remove unselected skill
      }
    });
  };

  // Function to fetch top students based on selected skills
  const fetchStudents = async () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill!');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('getTopRankedStudents', {
        requiredSkills: selectedSkills
      });
      console.log("Response data:", response); // Log the full response

      if (response.data.success) {
        console.log("Students data:", response.data.data); // Log the students data
        setStudents(response.data.data); // Set students data
      } else {
        console.error('Error: Data fetch unsuccessful');
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarCompany />
      <div className="min-h-screen p-6 md:p-10 bg-gray-50">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-purple-700">
          <GraduationCap className="w-8 h-8 text-purple-600" />
          Top Students
        </h1>
  
        {/* Skills Section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Select Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  id={skill}
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={handleSkillChange}
                  className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor={skill} className="ml-2 text-gray-700 capitalize">{skill}</label>
              </div>
            ))}
          </div>
        </div>
  
        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={fetchStudents}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md"
          >
            Submit
          </button>
        </div>
  
        {/* Loading */}
        {loading && <div className="mt-6 text-center text-purple-600 text-lg">Loading...</div>}
  
        {/* Students Data */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {students.map((student) => (
              <div
                key={student._id}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100"
              >
                <h2 className="text-xl font-bold text-purple-700 capitalize mb-2">{student.name}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Score:</span> {student.total_score ? student.total_score.toFixed(2) : 'N/A'}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Email:</span> {student.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Contact:</span> {student.contact}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Address:</span> {student.address}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Skills:</span> {student.skills ? student.skills.join(', ') : 'No skills listed'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-8 text-center">No students available.</p>
        )}
  
        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link to="/" className="text-purple-600 font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
  
};

export default GetTopStudents;
