import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
    LogOut, Bell, Mail, Users, Briefcase, User2, PlusCircle, FileText, DollarSign,
    Search, LayoutDashboard ,GraduationCap
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { Logout } from '@/axios/api/auth.api'
import axios from 'axios'
const NavbarCompany = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoFile, setLogoFile] = useState(null)
    const { data } = useSelector(store => store.auth)

    const logoutHandler = async () => {
        const res = await Logout()
        console.log(res)
        if (res.success) {
            dispatch(setUser(null))
            navigate('/')
            toast.success(res.message)
        } else {
            if (res.statusCode === 404) {
                dispatch(setUser(null))
                navigate('/')
            } else {
                toast.error(res.message || 'Invalid email')
            }
        }
    }
    console.log("data", data);

    return (
        <div className='bg-white shadow-sm border-b'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo */}
                <div>
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-gray-800">
                        {/* <img src="/logo.png" alt="HireHustle Logo" className="h-20 w-20" /> */}
                        <span>
                            Hire<span className="text-[#F83002]">Hustle</span>
                        </span>
                    </Link>
                </div>

                {/* Nav Links */}
                <div className='flex items-center gap-10'>
                    <ul className='flex items-center gap-6 text-sm text-gray-700 font-medium'>
                        {/* <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
                            <LayoutDashboard className="w-4 h-4" />
                            <Link to="/company/dashboard">Dashboard</Link>
                        </li> */}
                        <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
                            <PlusCircle className="w-4 h-4" />
                            <Link to="/company/post">Post Job</Link>
                        </li>
                        <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
                            <FileText className="w-4 h-4" />
                            <Link to="/company/getAlljob">My Jobs</Link>
                        </li>
                        <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
                            <FileText className="w-4 h-4" />
                            <Link to="/paymentCompany">Payment</Link>
                        </li>
                        <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
                            <GraduationCap className="w-4 h-4" />
                            <Link to="/getTop">Top Students</Link>
                        </li>


                        {/* <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
                            <DollarSign className="w-4 h-4" />
                            <Link to="/company/billing">Billing</Link>
                        </li> */}
                        {/* <li className='relative group'>
                            <Bell className='w-5 h-5 text-gray-600 group-hover:text-[#6A38C2] cursor-pointer transition' />
                          
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </li> */}
                    </ul>

                    {/* Auth Buttons / Avatar */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer bg-gray-600">
                                    <AvatarImage src={data?.logo} alt="profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 shadow-lg border">
                                <div className='p-4 rounded'>
                                    <div className='flex gap-3 items-center'>

                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            <Button variant="link" className="p-0 h-auto mt-1 text-[#6A38C2]">
                                                <Link to="/companyProfile">View Profile</Link>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-4 text-gray-600'>
                                        <div className='flex items-center gap-2 cursor-pointer hover:text-red-500 transition'>
                                            <LogOut className="w-4 h-4" />
                                            <Button onClick={logoutHandler} variant="link" className="p-0 h-auto text-sm">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavbarCompany
