import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Allposts } from '@/axios/api/job.api';
import Loader from './ui/Loader';
import { useNavigate } from 'react-router-dom';
// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const {searchedQuery } = useSelector(store => store.job);
    const [allJobs,setAlljobs]=useState([]);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const navigate=useNavigate();
    const AddJob = async () => {
        try {
            const response = await Allposts();
            console.log("response", response);
            //dispatch(setAllJobs(response?.data?.data));
            console.log("response?.data?.data",response?.data?.data);
            if(response?.message=="Unauthorized"){
                navigate("/error");
            }
            setAlljobs(response?.data?.data);
        } catch (err) {
            console.error('Company Update Error:', err)
        }
    }

  

    useEffect(() => {
            const timer = setTimeout(() => {
                AddJob();
            }, 2000);
    
            // Optional cleanup
            return () => clearTimeout(timer);
        }, []);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const titleMatch = job?.JobTitle?.toLowerCase().includes(searchedQuery.toLowerCase());
                const descMatch = job?.responsibilities?.toLowerCase().includes(searchedQuery.toLowerCase());
                const locationMatch = Array.isArray(job?.location)
                    ? job.location.some(loc => loc.toLowerCase().includes(searchedQuery.toLowerCase()))
                    : job?.location?.toLowerCase?.().includes(searchedQuery.toLowerCase());
    
                return titleMatch || descMatch || locationMatch;
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);
    
    if (allJobs.length === 0) {
        return (
            <div className="relative w-screen h-screen">
            <Loader/>
          </div>
        );
      }
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs