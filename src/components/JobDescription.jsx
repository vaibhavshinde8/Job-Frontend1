import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';
import axiosInstance from '@/axios/axiosConfig';
import { Input } from './ui/input';
import { setJobId } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import Loader from './ui/Loader';
import Navbar from './shared/Navbar';

const JobDescription = () => {
  const { id: jobId } = useParams();
  const [job, setJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      dispatch(setJobId(jobId));
      try {
        const res = await axiosInstance.get(`job/getJobById/${jobId}`);
        setJob(res.data.data);
        console.log(res.data.data)
        setEditJob(res.data.data);
        if(res?.message=="Unauthorized"){
          navigate("/error");
      }
      } catch (err) {
        toast.error('Error fetching job');
        console.error(err);
        
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditJob((prev) => ({ ...prev, [name]: value }));
  };

  async function handleApply() {
    try {
      await axiosInstance.post(`job/apply/${jobId}`);
      toast.success('Applied successfully');
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Application failed');
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`job/update/${jobId}`, editJob);
      toast.success('Job updated successfully');
      setJob(editJob);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="relative w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-14 px-6">
        <div className="p-10 rounded-3xl shadow-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">{job.JobTitle}</h1>
            <Button
              disabled={job.applied}
              onClick={handleApply}
              className={`px-6 py-2 text-white text-sm font-semibold rounded-xl shadow transition-all duration-300 ${
                job.applied
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#6A38C2]'
              }`}
            >
              {job.applied ? 'Already Applied' : 'Easy Apply'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[15px] text-gray-700 leading-relaxed">
            <div><strong className="text-gray-900">Company:</strong> {job.companyName}</div>
            <div><strong className="text-gray-900">Experience:</strong> {job.experience}</div>
            <div><strong className="text-gray-900">CTC:</strong> {job.ctc}</div>
            <div><strong className="text-gray-900">Type:</strong> {job.jobType}</div>
            <div><strong className="text-gray-900">Open Positions:</strong> {job.position}</div>
            <div><strong className="text-gray-900">Deadline:</strong> {job.deadline?.slice(0, 10)}</div>
            <div className="md:col-span-2"><strong className="text-gray-900">Eligibility:</strong> {job.eligibilityCriteria}</div>
            <div className="md:col-span-2"><strong className="text-gray-900">Description:</strong> {job.description}</div>
            <div className="md:col-span-2"><strong className="text-gray-900">Responsibilities:</strong> {job.responsibilities}</div>
            <div><strong className="text-gray-900">Skills:</strong> {job.skillsRequired?.join(', ')}</div>
            <div><strong className="text-gray-900">Locations:</strong> {job.location?.join(', ')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
