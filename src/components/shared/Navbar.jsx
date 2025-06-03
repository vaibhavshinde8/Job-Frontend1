import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
    LogOut,
    Bell,
    FileText,
    Info,
    HelpCircle,
    Briefcase,
    Home,
    Mail,
    ClipboardList,
    Building2,
    CheckCircle,
    BarChart2,
} from 'lucide-react'
import { CreditCard } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { Logout } from '@/axios/api/auth.api'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    console.log("Navbar", user);

    const logoutHandler = async () => {
        const res = await Logout()
        if (res?.success) {
            dispatch(setUser(null))
            navigate('/')
            toast.success(res.message)
        } else {
            if (res?.statusCode === 404) {
                dispatch(setUser(null))
                navigate('/')
            } else {
                toast.error(res?.message || 'Try again')
            }
        }
    }
    const handleClick = (e) => {
        if (!user) {
            e.preventDefault(); // Prevent the default navigation
            navigate("/login");
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-gray-800">
                    {/* <img src="/logo.png" alt="HireHustle Logo" className="h-20 w-20" /> */}
                    <span>
                        Hire<span className="text-[#F83002]">Hustle</span>
                    </span>
                </Link>


                {/* Navigation Links */}
                <nav>
                    <ul className="flex gap-6 items-center text-gray-700 font-medium text-md">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <Building2 size={16} /> Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs"
                                        onClick={handleClick}
                                        className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <Briefcase size={16} /> Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <Home size={16} /> Home
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleClick} to="/jobs" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <Briefcase size={16} /> Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleClick} to="/applied_jobs" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <ClipboardList size={16} /> Applied
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <Info size={16} /> About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleClick} to="/book-slot" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <CheckCircle size={16} /> Book Slot
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleClick} to="/upcomming" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <CalendarCheck size={18} /> Your Interviews
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleClick} to="/payment" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <CreditCard size={18} /> Payment
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/contact" className="flex items-center gap-1 hover:text-[#6A38C2] transition">
                                        <Mail size={16} /> Contact
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Auth / User Section */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <Button variant="outline" className="text-md">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-md">Signup</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="text-gray-700 hover:text-[#6A38C2] transition flex items-center gap-1  font-medium text-md">
                                Profile
                            </Link>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border border-gray-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 shadow-md">
                                    <div className="p-4">
                                        <div className="flex gap-3 items-center">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                                                <p className="text-md text-muted-foreground">{user?.profile?.bio}</p>

                                                {/* My Profile */}

                                                <Button
                                                    variant="link"
                                                    className="p-0 h-auto mb-3 flex items-center gap-1 text-md text-[#6A38C2]"
                                                >
                                                    <BarChart2 size={16} />
                                                    <Link to="/performance">See Performance</Link>
                                                </Button>

                                                <Button
                                                    variant="link"
                                                    className="p-0 h-auto mt-1 flex items-center gap-1 text-md text-[#6A38C2]"
                                                >
                                                    <FileText size={16} />
                                                    <Link to="/profile">My Profile</Link>
                                                </Button>

                                                {/* See Performance */}
                                                
                                            </div>
                                        </div>

                                        {/* Logout Section */}
                                        <div className="flex flex-col mt-3 text-gray-600">
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <LogOut size={18} />
                                                <Button
                                                    onClick={logoutHandler}
                                                    variant="link"
                                                    className="p-0 h-auto text-red-500 text-md"
                                                >
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>

                            </Popover>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
