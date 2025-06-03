
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import axiosInstance from '@/axios/axiosConfig'
import Navbar from './shared/Navbar';
const BookSlot = () => {
  const [date, setDate] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchedSkills = ["Python", "C++", "Java", "JavaScript", "DSA"];
    setSkills(fetchedSkills);
    setDate(getToday());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      date,
      skill: selectedSkill, // send as string, not array
    };

    console.log("POST Data:", dataToSend);
    try {
      await axiosInstance.post('/interview/book', dataToSend)
      toast.success('Slot posted successfully')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }

  };

  return (

    <>
    <Navbar/>
    <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Book Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getToday()}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Select Skill</label>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="" disabled>Select a skill</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition"
        >
          Submit Booking
        </button>
      </form>
    </div>
    </>
    
  );
};

export default BookSlot;
