import React, { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { Allposts } from '@/axios/api/job.api';
import JobCardShimmer from './JobCardShimmer';
import { getAllJobs } from '@/axios/api/company.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const [allJobs, setAlljobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user } = useSelector(store => store.auth);
    const navigate=useNavigate();

    const AddJob = async () => {
        try {
            const response = await Allposts();
            setAlljobs(response?.data?.data);
            // if(response?.message=="Unauthorized"){
            //     navigate("/error");
            // }
            setLoading(false);

        } catch (err) {
            console.error('Error fetching jobs:', err);
            setLoading(false);
        }
    };

    const AddJobforHome = async () => {
        try {
            const response = await getAllJobs();
            setAlljobs(response?.data?.data);
            console.log("allJobs",allJobs);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setLoading(false);
        }
    };
    

    useEffect(() => {
        AddJobforHome();
        AddJob();
    }, []);

    if (loading) {
        return <JobCardShimmer />;
    }

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-4xl font-semibold text-gray-900">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-5">
                {Array.isArray(allJobs) && allJobs.length > 0 ? (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job?.jobId} job={job} />
                    ))
                ) : (
                    <span>No jobs available at the moment</span>
                )}

            </div>
        </div>
    );
};

export default LatestJobs;
