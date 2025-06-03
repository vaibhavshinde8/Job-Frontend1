import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { getAppliedJobsByUser } from '@/axios/api/job.api'
import Navbar from './shared/Navbar'
import { useNavigate } from 'react-router-dom'

const AppliedHistroy = () => {

    const navigate=useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const fetchJobs = async () => {
        try {
            const response = await getAppliedJobsByUser();
            console.log("response", response);
            setAppliedJobs(response?.data?.data || []);
        } catch (err) {
            navigate("/error");
            console.error('Company Update Error:', err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div>
            <Navbar />
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Action</TableHead> {/* New Column */}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (
                        appliedJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{job.JobTitle}</TableCell>
                                <TableCell>{job.companyName}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${job?.applicationStatus === "applied" ? "bg-gray-400" :
                                            job?.applicationStatus === "rejected" ? "bg-red-400" :
                                                "bg-gray-200"
                                        }`}>
                                        {job?.applicationStatus === "applied" ? "Pending" : job?.applicationStatus}
                                    </Badge>

                                </TableCell>
                                <TableCell className="text-right">
                                    <button
                                        onClick={() => window.location.href = `/description/${job._id}`}
                                        className="bg-blue-400 hover:bg-blue-300 text-white text-sm px-3 py-1 rounded-md"
                                    >
                                        Check Details
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>You haven't applied to any job yet.</TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
        </div>
    )
}

export default AppliedHistroy