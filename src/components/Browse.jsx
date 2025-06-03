import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import JobCardShimmer from './JobCardShimmer';
import { Allposts } from '@/axios/api/job.api';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const [allJobs, setAlljobs] = useState([]);
  const { searchedQuery } = useSelector((store) => store.job);
  const navigate=useNavigate();
  const fetchJobs = async () => {
    try {
      const response = await Allposts();
      setAlljobs(response?.data?.data || []);
      if(response?.message=="Unauthorized"){
        navigate("/error");
    }
    } catch (err) {
      console.error('Company Update Error:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = allJobs.filter((job) => {
    //if (!searchedQuery) return true;

    const lowerQuery = searchedQuery.toLowerCase();
    return (
      job?.JobTitle?.toLowerCase().includes(lowerQuery)
    );
  });

  if (allJobs.length === 0) {
    return <JobCardShimmer />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
