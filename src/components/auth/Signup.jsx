import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import { sendOtp, verifyOtp } from '@/axios/api/otp.api';
import { isRegisterd, login, register } from '@/axios/api/auth.api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startTimer = () => {
    setIsTimerActive(true);
    let timeLeft = 120;
    const interval = setInterval(() => {
      timeLeft--;
      setTimer(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsTimerActive(false);
      }
    }, 1000);
  };

  const handleSignUp = async () => {
    const res = await isRegisterd(email);
    if (res?.success) {
      handleSendOtp();
    } else {
      toast.error(res?.message || 'Failed to send OTP');
    }
  };

  const handleSendOtp = async () => {
    const res = await sendOtp(email);
    if (res?.success) {
      setOtpSent(true);
      startTimer();
      toast.success('OTP sent successfully!');
    } else {
      toast.error(res?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp(email, otp);
    if (res?.success) {
      setOtpVerified(true);
      toast.success('OTP Verified successfully!');
    } else {
      toast.error(res?.message || 'Invalid OTP');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const user={
        email:email,
        userType:role,
        password:password,
        conformPassword:confirmPassword
    }

    try {
      dispatch(setLoading(true));
      const res = await register(user);
      if (res.success) {
        toast.success('Registration Successful!');
        navigate('/login');
      } else {
        toast.error(res.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleRegister} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='patel@gmail.com'
              disabled={otpSent}
            />
          </div>

          {!otpSent && !otpVerified && (
            <Button type='button' onClick={handleSignUp} className='w-full my-2'>
              Get OTP
            </Button>
          )}

          {otpSent && !otpVerified && (
            <>
              <Input
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='my-2'
              />
              <Button type='button' onClick={handleVerifyOtp} disabled={!isTimerActive} className='w-full my-2'>
                Verify OTP ({timer}s)
              </Button>
            </>
          )}

          {otpVerified && (
            <>
            
              <div className='my-2'>
                <Label>Password</Label>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter Password'
                />
              </div>
              <div className='my-2'>
                <Label>Confirm Password</Label>
                <Input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm Password'
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

              {loading ? (
                <Button className='w-full my-4'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                </Button>
              ) : (
                <Button type='submit' className='w-full my-4'>
                  Sign Up
                </Button>
              )}
            </>
          )}

          <span className='text-sm'>
            Already have an account? <Link to='/login' className='text-blue-600'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
