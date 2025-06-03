import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setData, setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { login } from '@/axios/api/auth.api';
import { Exist } from '@/axios/api/company.api'
import { isUserExist } from '@/axios/api/user.api'
import { getProfile } from '@/axios/api/interviewer.api'

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('');
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const handleLogin = async (e) => {
        e.preventDefault();

        dispatch(setLoading(true));

        const response = await login(email, password, role);
        // console.log("user",user);
        dispatch(setLoading(false));

        if (response.success) {
            toast.success("User Login successfully!");
            dispatch(setUser(response.data.data.userType));
            //console.log(user);
            // console.log((store)=>store.auth);


            console.log(response)
            if (response.data.data.userType === "User") {
                //dispatch(setData(response.data?.message?.company));
                const response = await isUserExist();
                console.log("response", response);
                dispatch(setData(response?.data));
                navigate("/");

            } else if (response.data.data.userType === "Company") {
                const response = await Exist();
                //console.log("response", response);
                //console.log("Exist", response);
                // if(response.data.data=="User and company exist"){
                //     console.log("response.data.massage",response.data?.message?.company);
                //     dispatch(setData(response.data?.message?.company));
                //     navigate("/companyInfo");

                // }else{
                //     navigate("/company");
                // }
                
                dispatch(setData(response.data?.message?.company));
                navigate("/companyInfo");

            } else {
                const response=await getProfile();
                console.log(response);
                dispatch(setData(response?.data?.data))
                navigate("/interviewer");
            }

        } else {
            toast.error(response.message || "Invalid email");
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleLogin} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="patel@gmail.com"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='User'
                                    checked={role === 'User'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='cursor-pointer'
                                />
                                <Label>Student</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='Company'
                                    checked={role === 'Company'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='cursor-pointer'
                                />
                                <Label>Recruiter</Label>

                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type='radio'
                                    name='role'
                                    value='Interviewer'
                                    checked={role === 'Interviewer'}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='cursor-pointer'
                                />
                                <Label>Interviewer</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login