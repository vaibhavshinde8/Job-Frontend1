import React, { useEffect, useState } from 'react'
import axiosInstance from '@/axios/axiosConfig'
import NavbarInterviewer from '../shared/NavbarInterviwer'
import { useNavigate } from 'react-router-dom'

const UpcomingInterviews = () => {
    const [upcomingInterviews, setUpcomingInterviews] = useState([])
    const [filteredInterviews, setFilteredInterviews] = useState([])

    const [filterDate, setFilterDate] = useState('')
    const [filterStartTime, setFilterStartTime] = useState('')
    const [filterEndTime, setFilterEndTime] = useState('')
    const [filterSkill, setFilterSkill] = useState('')
  const navigate=useNavigate()
    useEffect(() => {
        const fetchUpcomingInterviews = async () => {
            try {
                const res = await axiosInstance.get('/interview/getInterviweInterviwer')
                const responseData = Array.isArray(res.data.data) ? res.data.data : []
                console.log("responseData",responseData);
                setUpcomingInterviews(responseData)
                setFilteredInterviews(responseData)
            } catch (err) {
                console.error('Error fetching upcoming interviews', err)
                setUpcomingInterviews([])
            }
        }

        fetchUpcomingInterviews()
    }, [])

    const handleFilter = () => {
        const filtered = upcomingInterviews.filter(interview => {
            const matchesDate = filterDate ? interview.date === filterDate : true
            const matchesSkill = filterSkill
                ? interview.skill.toLowerCase().includes(filterSkill.toLowerCase())
                : true
            const matchesTime =
                (!filterStartTime || interview.startTime >= filterStartTime) &&
                (!filterEndTime || interview.endTime <= filterEndTime)
            return matchesDate && matchesSkill && matchesTime
        })
        setFilteredInterviews(filtered)
    }

    const clearFilters = () => {
        setFilterDate('')
        setFilterStartTime('')
        setFilterEndTime('')
        setFilterSkill('')
        setFilteredInterviews(upcomingInterviews)
    }

    return (
        <>
          <NavbarInterviewer />
          <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-10 gap-6 px-6">
            {/* Filter Panel */}
            <div className="bg-white sticky top-10 shadow-lg rounded-xl p-6 w-full lg:w-1/4 h-fit">
              <h3 className="text-xl font-semibold mb-4 text-[#6A38C2]">Filter Interviews</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filterStartTime}
                    onChange={(e) => setFilterStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filterEndTime}
                    onChange={(e) => setFilterEndTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skill</label>
                  <input
                    type="text"
                    placeholder="e.g. React"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    className="w-full bg-[#6A38C2] text-white py-2 rounded-md hover:bg-[#5531a1]"
                    onClick={handleFilter}
                  >
                    Apply
                  </button>
                  <button
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
      
            {/* Interview List */}
            <div className="flex-1">
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-3xl font-semibold mb-6 text-[#6A38C2]">Upcoming Interviews</h2>
      
                {filteredInterviews.length === 0 ? (
                  <p className="text-gray-500 text-center text-lg">No interviews found.</p>
                ) : (
                  <div className="space-y-6">
                    {filteredInterviews.map((interview, idx) => {
                      const now = new Date();
                      const interviewDate = new Date(interview.date);
                      const [startHour, startMinute] = interview.startTime.split(':').map(Number);
                      const startDateTime = new Date(interviewDate.setHours(startHour, startMinute, 0, 0));
      
                      let endDateTime;
                      if (interview.endTime) {
                        const [endHour, endMinute] = interview.endTime.split(':').map(Number);
                        endDateTime = new Date(interviewDate.setHours(endHour, endMinute, 0, 0));
                      }
      
                      const isOngoing = now >= startDateTime && (!endDateTime || now <= endDateTime);
                      const isUpcoming = now < startDateTime;
                      const isCompleted = endDateTime && now > endDateTime;
      
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        >
                          <div className="space-y-3">
                            {/* Date + Status Row */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <p className="text-lg font-semibold text-gray-700 flex items-center">
                                📅 {new Date(interview.date).toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                {isOngoing && (
                                  <button className="bg-[#6A38C2] text-white px-4 py-2 rounded-lg shadow hover:bg-[#5731a0] transition"
                                  onClick={()=>{
                                    navigate(`/instruction/${interview._id}?skill=${encodeURIComponent(interview.skill)}`)
                                  }}
                                  >
                                    Join Interview
                                  </button>
                                )}
                                {isUpcoming && (
                                  <span className="text-blue-600 font-semibold">Upcoming</span>
                                )}
                                {isCompleted && (
                                  <span className="text-gray-500 font-semibold">Completed</span>
                                )}
                              </div>
                            </div>
      
                            <p className="text-lg">
                              <span className="font-semibold text-gray-700">⏰ Start:</span> {interview.startTime}
                            </p>
      
                            {interview.endTime && (
                              <p className="text-lg">
                                <span className="font-semibold text-gray-700">⏱️ End:</span> {interview.endTime}
                              </p>
                            )}
      
                            <p className="text-lg">
                              <span className="font-semibold text-gray-700">🛠️ Skills:</span> {interview.skill}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
      
}

export default UpcomingInterviews
