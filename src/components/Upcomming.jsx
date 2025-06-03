import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import axiosInstance from "@/axios/axiosConfig";
import { useNavigate } from "react-router-dom";

const Upcomming = () => {
    const [upcomingInterviews, setUpcomingInterviews] = useState([])
      const navigate=useNavigate();

    const fetchUpcomingInterviews = async () => {
        try {
            const res = await axiosInstance.get('/interview/getInterviweStudent')
            const responseData = res.data.data
            setUpcomingInterviews(Array.isArray(responseData) ? responseData : [])
            if(res?.message=="Unauthorized"){
                navigate("/error");
            }
        } catch (err) {
            console.error('Error fetching upcoming interviews', err)
            setUpcomingInterviews([])
        }
    }
   // const navigate=useNavigate();
    useEffect(() => {

        fetchUpcomingInterviews()
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-[#6A38C2]">Upcoming Interviews</h2>

                {upcomingInterviews.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">No interviews scheduled.</p>
                ) : (
                    <div className="space-y-6">
                        {upcomingInterviews.map((interview, idx) => {
                            const now = new Date();
                            const interviewDate = new Date(interview.date);
                            const [startHour, startMinute] = interview.startTime.split(":").map(Number);
                            const startDateTime = new Date(interviewDate.setHours(startHour, startMinute, 0, 0));

                            let endDateTime;
                            if (interview.endTime) {
                                const [endHour, endMinute] = interview.endTime.split(":").map(Number);
                                endDateTime = new Date(interviewDate.setHours(endHour, endMinute, 0, 0));
                            }

                            const isOngoing = now >= startDateTime && (!endDateTime || now <= endDateTime);
                            const isUpcoming = now < startDateTime;
                            const isCompleted = endDateTime && now > endDateTime;

                            return (
                                <div
                                    key={idx}
                                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-lg">
                                            <span className="font-semibold text-gray-700">📅 Date:</span>{" "}
                                            {new Date(interview.date).toLocaleDateString()}
                                        </p>
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

                                        {isOngoing && (
                                            <button onClick={()=>{
                                                navigate(`/instruction/${interview._id}`)
                                            }} className="mt-4 bg-[#6A38C2] text-white px-4 py-2 rounded-lg shadow hover:bg-[#5731a0] transition">
                                                Join Interview
                                            </button>
                                        )}

                                        {isUpcoming && (
                                            <p className="mt-4 text-blue-600 font-semibold">Upcoming</p>
                                        )}

                                        {isCompleted && (
                                            <p className="mt-4 text-gray-500 font-semibold">Completed</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>


        </>
    )
}
export default Upcomming;