import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import NavbarCompany from './shared/NavbarCompany';
import axiosInstance from '@/axios/axiosConfig';
import { AppliedUsers, updateApllicationStatus } from '@/axios/api/company.api';
import { toast } from 'sonner'
import { RejectedCandidates, SelectedCandidates } from '@/axios/api/job.api';

const RejectedCandidate = () => {
    const [users, setUsers] = useState([]);
    const { jobId } = useParams();
    const navigate=useNavigate();


    console.log("jobId", jobId);
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const res = await RejectedCandidates(jobId);
                if(res?.message=="Unauthorized"){
                    navigate("/error");
                }
                console.log("res.data", res);
                setUsers(res.data?.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchProfiles();
    }, []);





    return (
        <>
            <NavbarCompany />
            <div className="max-w-6xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">All Users</h2>

                {!users ? (
                    <div className="text-center text-gray-500 py-10 text-lg">
                        🚫 No users found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
                        {users.map(user => (
                            <div
                                key={user._id}
                                className="p-4 border rounded-lg shadow-md bg-white space-y-2"
                            >
                                <p><span className="font-semibold">Name:</span> {user.name}</p>
                                <p><span className="font-semibold">Email:</span> {user.email}</p>
                                <p><span className="font-semibold">Contact:</span> {user.contact}</p>
                                <p><span className="font-semibold">Address:</span> {user.address}</p>
                                <p><span className="font-semibold">Skills:</span> {user.skills.join(', ') || 'N/A'}</p>
                                <p><span className="font-semibold">Projects:</span> {user.projects.length > 0 ? user.projects.join(', ') : 'No projects yet'}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>

    );
};

export default RejectedCandidate;



