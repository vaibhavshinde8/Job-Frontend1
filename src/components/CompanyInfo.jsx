import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import NavbarCompany from "./shared/NavbarCompany";
import { PostJob } from "@/axios/api/company.api";
import { setAllJobs } from "@/redux/jobSlice";
import JobHeroSection from "./JobHeroSection";
import HiringMadeEasy from "./HiringMadeEasy";
import FAQSection from "./FAQSection";

const CompanyInfo = () => {
   
    
    const dispatch = useDispatch();
    const dummyJob = {
        JobTitle: "Frontend Developer",
        experience: "1-3 years",
        ctc: "8-10 LPA",
        eligibilityCriteria: "B.Tech in Computer Science or related field. Minimum 60% throughout academics.",
        skillsRequired: ["HTML", "CSS", "JavaScript", "React", "Redux", "REST APIs"],
        responsibilities: "Develop and maintain responsive user interfaces. Collaborate with backend developers and designers. Optimize applications for performance and scalability.",
        location: ["Bangalore", "Remote"],
        deadline: new Date("2025-04-30"),
        jobType: "Full-Time",
        position: 2,
        isActive: true
    };
   
      
    const AddJob = async () => {
        try {
            const response = await PostJob(dummyJob);
            console.log("response", response);
            //dispatch(setAllJobs(response?.data?.data));
            //console.log(jobs);
        } catch (err) {
            console.error('Company Update Error:', err)
            
        }
    }


    
    return (
        <>
            <NavbarCompany />
            <JobHeroSection/>
            <HiringMadeEasy/>
            <FAQSection/>
        </>


    )
}
export default CompanyInfo;