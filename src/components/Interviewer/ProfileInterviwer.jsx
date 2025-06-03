import React, { useEffect, useState } from 'react';



import { Mail, Pen, Phone, MapPin,CheckCircle,CheckCircle2,Briefcase,Globe } from 'lucide-react';
import { Badge } from '../ui/badge';
// import AppliedJobTable from './AppliedJobTable';
// import UpdateProfileDialog from './UpdateProfileDialog';
import axiosInstance from '@/axios/axiosConfig'; // Your axios setup
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import NavbarInterviewer from '../shared/NavbarInterviwer';

const ProfileInterviewer = () => {
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get('interviewer/get-profile');
            console.log(res);
            setProfile(res?.data?.data); // Assuming API response is like { status: 200, data: {...profileData}, message: "" }
        } catch (err) {
            console.log("Failed to fetch profile", err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // email string
    const emailString = "{\n  _id: new ObjectId('67fd34db2a872ca0953157ac'),\n  email: 'vshinde2217@gmail.com'\n}";

    // 1. Use regex to extract the email from the string
    const emailMatch = emailString.match(/email: '([^']+)'/);

    // 2. Get the email
    const email = emailMatch ? emailMatch[1] : "NA";

    console.log(email);  // Output: vshinde2217@gmail.com


    return (
        <>
        <NavbarInterviewer/>
        <div>
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                    alt="profile"
                  />
                </Avatar>
                <div>
                  <h1 className="font-medium text-xl">{profile?.fullName || "Unknown User"}</h1>
                </div>
              </div>
              {/* <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                <Pen />
              </Button> */}
            </div>
      
            <div className="my-5">
              <div className="flex items-center gap-3 my-2">
                <Mail />
                <span>
                  {profile?.email
                    ? (profile.email.includes('email:') ? profile.email.match(/email: '([^']+)'/)?.[1] : profile.email)
                    : "NA"}
                </span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <Phone />
                <span>{profile?.phone || "NA"}</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <MapPin />
                <span>{profile?.bio || "NA"}</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <Globe />
                <a href={profile?.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {profile?.linkedin ? "LinkedIn Profile" : "NA"}
                </a>
              </div>
              <div className="flex items-center gap-3 my-2">
                <Briefcase />
                <span>{profile?.experienceYears ? `${profile.experienceYears} Years` : "NA"}</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <CheckCircle2 />
                <span>Active: {profile?.isActive ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <CheckCircle />
                <span>Verified: {profile?.isVerified ? "Yes" : "No"}</span>
              </div>
            </div>
      
            <div className="my-5">
              <h1 className="font-semibold mb-2">Skills</h1>
              <div className="flex items-center gap-1 flex-wrap">
                {profile?.skills?.length > 0
                  ? profile.skills.map((item, index) => (
                      <Badge key={index}>{item?.name}</Badge>
                    ))
                  : <span>NA</span>}
              </div>
            </div>
      
            <div className="my-5">
              <h1 className="font-semibold mb-2">Work Proof</h1>
              <div className="flex flex-col gap-2">
                {profile?.workProof?.length > 0
                  ? profile.workProof.map((proof, index) => (
                      <a key={index} href={proof} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Proof {index + 1}
                      </a>
                    ))
                  : <span>NA</span>}
              </div>
            </div>
          </div>
      
          {/* <UpdateProfileDialog open={open} setOpen={setOpen} /> */}
        </div>
        </>
        
      );
      
};

export default ProfileInterviewer;
