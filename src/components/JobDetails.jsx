import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import { Label } from './ui/label'
import { toast } from 'sonner'
import axiosInstance from '@/axios/axiosConfig'
import { Input } from './ui/input'
import { setJobId } from '@/redux/authSlice';
import { useDispatch } from 'react-redux'
import { RejectedCandidates, SelectedCandidates } from '@/axios/api/job.api'

const JobDetails = () => {
    const { jobId } = useParams();

    const [job, setJob] = useState(null)
    const [editJob, setEditJob] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    console.log(jobId);
    const navigate = useNavigate();
    // Fetch job data by ID
    useEffect(() => {
        if (!jobId) return
        const fetchJob = async () => {
            dispatch(setJobId(jobId));
            try {
                const res = await axiosInstance.get(`job/getJobByIdCompany/${jobId}`)
                setJob(res.data.data)
                console.log(res);
                if(res?.message=="Unauthorized"){
                    navigate("/error");
                }
                setEditJob(res.data.data) // Create editable state
            } catch (err) {
                toast.error('Error fetching job')
                console.error(err)
            }
        }
        fetchJob()
    }, [jobId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditJob(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axiosInstance.put(`job/update/${jobId}`, editJob)
            toast.success('Job updated successfully!')
            setJob(editJob) // Update the displayed info
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }


    if (!job) return <p className="text-center my-10">Loading...</p>

    return (
        <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow border">
            <h1 className="text-2xl font-bold mb-4">{job.JobTitle}</h1>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><strong>Company:</strong> {job.companyName}</div>
                <div><strong>Experience:</strong> {job.experience}</div>
                <div><strong>CTC:</strong> {job.ctc}</div>
                <div><strong>Type:</strong> {job.jobType}</div>
                <div><strong>Open Positions:</strong> {job.position}</div>
                <div><strong>Deadline:</strong> {job.deadline?.slice(0, 10)}</div>
                <div className="col-span-2"><strong>Eligibility:</strong> {job.eligibilityCriteria}</div>
                <div className="col-span-2"><strong>Description:</strong> {job.description}</div>
                <div className="col-span-2"><strong>Responsibilities:</strong> {job.responsibilities}</div>
                <div><strong>Skills:</strong> {job.skillsRequired?.join(', ')}</div>
                <div><strong>Locations:</strong> {job.location?.join(', ')}</div>
            </div>

            <div className="mt-6">
                <Dialog>
                    <div className='flex flex-row space-x-5'>


                        <DialogTrigger asChild>
                            <Button>Edit Job</Button>
                        </DialogTrigger>

                        <Button onClick={() => navigate(`/jobTable/${jobId}`)}>Applied Candidates</Button>
                        <Button onClick={() => navigate(`/company/${jobId}`)}>Selected Candidates</Button>
                        <Button onClick={() => navigate(`/rejected/${jobId}`)}>Rejected Candidates</Button>

                    </div>
                    <DialogContent className="max-w-3xl p-6 h-4/5 overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
                        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Job Title</Label>
                                <Input name="JobTitle" value={editJob.JobTitle} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Experience</Label>
                                <Input name="experience" value={editJob.experience} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>CTC</Label>
                                <Input name="ctc" value={editJob.ctc} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Job Type</Label>
                                <Input name="jobType" value={editJob.jobType} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Open Positions</Label>
                                <Input name="position" type="number" value={editJob.position} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Deadline</Label>
                                <Input type="date" name="deadline" value={editJob.deadline?.slice(0, 10)} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Eligibility Criteria</Label>
                                <Input name="eligibilityCriteria" value={editJob.eligibilityCriteria} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Description</Label>
                                <Input name="responsibilities" value={editJob.description} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Responsibilities</Label>
                                <Input name="responsibilities" value={editJob.responsibilities} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Skills Required (comma separated)</Label>
                                <Input
                                    name="skillsRequired"
                                    value={editJob.skillsRequired.join(', ')}
                                    onChange={(e) =>
                                        setEditJob(prev => ({
                                            ...prev,
                                            skillsRequired: e.target.value.split(',').map(s => s.trim()),
                                        }))
                                    }
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Locations (comma separated)</Label>
                                <Input
                                    name="location"
                                    value={editJob.location.join(', ')}
                                    onChange={(e) =>
                                        setEditJob(prev => ({
                                            ...prev,
                                            location: e.target.value.split(',').map(l => l.trim()),
                                        }))
                                    }
                                />
                            </div>
                            <div className="col-span-2 mt-4">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Job'}
                                </Button>

                            </div>
                        </form>
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    )
}

export default JobDetails
