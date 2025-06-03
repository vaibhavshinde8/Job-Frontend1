import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateUser as update } from '@/axios/api/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { data } = useSelector(store => store.auth);

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        skills: '',
        projects:''
    });

    useEffect(() => {
        if (data) {
            setInput({
                name: data.name || '',
                phoneNumber: data.contact || '',
                address: data.address || '',
                skills: data.skills?.join(', ') || '',
                projects: data.projects?.join(', ') || '',
            });
        }
    }, [data]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedUser = {
            name: input.name,
            contact: input.phoneNumber,
            address: input.address,
            skills: input.skills.split(',').map(skill => skill.trim()),
            projects:input.projects.split(',').map(projects => projects.trim()),
        };

        try {
            setLoading(true);
            console.log(updatedUser);
            const res = await update(updatedUser);
            console.log('Response:', res);  // Debug: check API response
            if (res?.success) {
                toast.success(res?.message);
                console.log("start")
                dispatch(setData(res?.data));
                console.log("end")
                 // ✅ Update Redux
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.message || "Something went wrong");
            console.log("what wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g. React, Node.js"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="projects" className="text-right">Projects</Label>
                            <Input
                                id="projects"
                                name="projects"
                                value={input.projects}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g. Voting System"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="address" className="text-right">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={input.address}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading
                                ? <Button className="w-full my-4" disabled><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                                : <Button type="submit" className="w-full my-4">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
