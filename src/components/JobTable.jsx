import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import NavbarCompany from './shared/NavbarCompany';
import axiosInstance from '@/axios/axiosConfig';
import { AppliedUsers, updateApllicationStatus } from '@/axios/api/company.api';
import { toast } from 'sonner'

const JobTable = () => {
    const [users, setUsers] = useState([]);
    const { jobId } = useParams();
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate=useNavigate();

    // Close popup
    const closePopup = () => setSelectedUser(null);
    console.log("jobId", jobId);
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const res = await AppliedUsers(jobId);
                console.log("res.data", res);
                setUsers(res.data?.data ?? []); // Safe fallback to empty array
                if(res?.message=="Unauthorized"){
                    navigate("/error");
                }
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchProfiles();
    }, []);


    if (!users || users.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h2 className="text-xl font-semibold text-gray-700">No users have applied for this job yet.</h2>
            </div>
        );
    }

    //updateApllicationStatus

    return (
        <>
            <NavbarCompany />
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">User Profiles</h2>
                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Passout</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="p-2">{u.name || 'Not mentioned'}</td>
                                <td>{u.email || 'Not mentioned'}</td>
                                <td>{u.contact || 'Not mentioned'}</td>
                                <td>{u.passoutYear || 'Not mentioned'}</td>
                                <td>
                                    <button
                                        onClick={() => setSelectedUser(u)}
                                        className="text-blue-600 text-sm"
                                    >
                                        See More Info
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Popup Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
                            <h2 className="text-xl font-bold mb-4">User Details</h2>
                            <div>
                                <p><strong>Name:</strong> {selectedUser.name || 'Not mentioned'}</p>
                                <p><strong>Email:</strong> {selectedUser.email || 'Not mentioned'}</p>
                                <p><strong>Contact:</strong> {selectedUser.contact || 'Not mentioned'}</p>
                                <p><strong>Passout Year:</strong> {selectedUser.passoutYear || 'Not mentioned'}</p>
                                <p><strong>Experience:</strong> {selectedUser.experience ? `${selectedUser.experience} yrs` : 'Not mentioned'}</p>
                                <p><strong>Skills:</strong> {selectedUser.skills?.length ? selectedUser.skills.join(', ') : 'Not mentioned'}</p>
                                <p><strong>GitHub:</strong> {selectedUser.githubProfile ? <a href={selectedUser.githubProfile} target="_blank" rel="noreferrer" className="text-blue-600">GitHub</a> : 'Not mentioned'}</p>
                                <p><strong>Portfolio:</strong> {selectedUser.portfolioUrl ? <a href={selectedUser.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-600">Portfolio</a> : 'Not mentioned'}</p>
                                <div>
                                    <strong>Projects:</strong>
                                    {selectedUser.projects?.length ? (
                                        selectedUser.projects.map((p, i) => (
                                            <div key={i} className="mb-2">
                                                <strong>{p.title || 'Untitled Project'}</strong>
                                                <div>{p.description || 'No description provided'}</div>
                                                {(p.link || p.githubLink) ? (
                                                    <>
                                                        {p.link && (
                                                            <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Live</a>
                                                        )}
                                                        {p.link && p.githubLink && ' | '}
                                                        {p.githubLink && (
                                                            <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Code</a>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div>Links not provided</div>
                                                )}
                                                <div>Tech: {p.techStack?.length ? p.techStack.join(', ') : 'Not mentioned'}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>Not mentioned</div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={async () => {
                                        try {
                                            const response = await updateApllicationStatus({
                                                userId: selectedUser._id,
                                                status: 'shortlisted',
                                            },jobId);
                                           //console.log("Selected response",selectedUser._id);
                                            console.log('Selected response:', response);
                                            toast.success("Student Shortlisted!");
                                            closePopup();
                                        } catch (error) {
                                            console.error('Error selecting candidate:', error);
                                        }
                                    }}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Select Candidate
                                </button>

                                <button
                                    onClick={async () => {
                                        try {
                                            const response = await updateApllicationStatus(
                                                {
                                                    userId: selectedUser._id,
                                                    status: 'rejected',
                                                },jobId
                                            );
                                            console.log('Rejected response:', response.data);
                                            toast.success("Student Rejected!");
                                            closePopup();
                                        } catch (error) {
                                            console.error('Error rejecting candidate:', error);
                                        }
                                    }}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Reject Candidate
                                </button>

                                <button
                                    onClick={closePopup}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </>

    );
};

export default JobTable;



