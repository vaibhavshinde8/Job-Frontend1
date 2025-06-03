import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getAll } from '@/axios/api/company.api'
import NavbarCompany from './shared/NavbarCompany'
import HandAnimation from './ui/HandAnimation'
import Loader from './ui/Loader'

const GetAllJobs = () => {
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate()

    const AddJob = async () => {
        try {
            const response = await getAll();
            console.log("response", response);
            //dispatch(setAllJobs(response?.data?.data));
            console.log(response?.data?.data);
            setJobs(response?.data?.data);
            if(response?.message=="Unauthorized"){
                navigate("/error");
            }
        } catch (err) {
            navigate("/error");
            console.error('Company Update Error:', err)
        }
    }
    const handle = (e) => {
        console.log(e);
    }



    useEffect(() => {
        const timer = setTimeout(() => {
            AddJob();
        }, 2000);

        // Optional cleanup
        return () => clearTimeout(timer);
    }, []);
    console.log("Jobs",jobs);
    if (jobs.length==0) {
        return (
            <div className="relative w-screen h-screen">
            <Loader/>
          </div>
        );
      }

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const now = new Date()
        const diffTime = Math.abs(now - createdAt)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    }

    return (
        <div>
            <NavbarCompany />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl mb-10">Search Results ({jobs.length})</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    { jobs.map(job => (
                        <div key={job._id}

                            onClick={() => handle(job._id)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <p>{daysAgoFunction(job?.createdAt)}</p>

                            </div>



                            <div className="mt-2">
                                <h1 className="font-bold text-lg">{job?.JobTitle}</h1>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-5">
                                    {job?.responsibilities || job?.eligibilityCriteria}
                                </p>



                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
                                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.ctc}</Badge>
                            </div>
                            <div className='flex items-center gap-4 mt-4'>

                                <Button onClick={() => navigate(`/company/getAlljob/${job?._id}`)} className="bg-[#7209b7]">Details</Button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GetAllJobs
