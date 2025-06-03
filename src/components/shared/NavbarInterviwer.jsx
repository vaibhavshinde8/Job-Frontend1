import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LayoutDashboard, Users, Calendar, LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { Logout } from '@/axios/api/auth.api'

const NavbarInterviewer = () => {
  const { user, data } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    const res = await Logout()
    if (res.success) {
      dispatch(setUser(null))
      navigate('/')
      toast.success(res.message)
    } else {
      if (res.statusCode === 404) {
        dispatch(setUser(null))
        navigate('/')
      } else {
        toast.error(res.message || 'Logout failed')
      }
    }
  }

  return (
    <div className='bg-white shadow-sm border-b'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-gray-800">
          <span>
            Hire<span className="text-[#F83002]">Hustle</span>
          </span>
        </Link>

        {/* Nav Links */}
        <ul className='flex items-center gap-6 text-sm text-gray-700 font-medium'>
          <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
            <LayoutDashboard className="w-4 h-4" />
            <Link to="/Dashboard">Fill Slots</Link>
          </li>
          <li className='flex items-center gap-1 hover:text-[#6A38C2] transition'>
            <Calendar className="w-4 h-4" />
            <Link to="/interviewer/interviews">Interview History</Link>
          </li>
          
        </ul>

        {/* Auth Buttons / Avatar */}
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer bg-gray-600">
                <AvatarImage src={data?.profilePic} alt="profile" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 shadow-lg border">
              <div className='p-4 rounded'>
                <div className='flex gap-3 items-center'>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-[#6A38C2]">
                      <Link to="/interviewer/profile">View Profile</Link>
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
        ) : (
          <div className='flex items-center gap-2'>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarInterviewer
