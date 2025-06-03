import React, { useEffect, useState } from 'react'

import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { PostJob } from '@/axios/api/company.api'
import NavbarCompany from './shared/NavbarCompany'
import { Input } from './ui/input'


const dummyCompanies = {
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
  

const PostJobCompany = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    JobTitle: "",
    description: "",
    eligibilityCriteria: "",
    ctc: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    skillsRequired: "",
    responsibilities: "",
    deadline: "",
    companyId: ""
  })
  const AddJob = async () => {
    try {
        const response = await PostJob(dummyCompanies);
        console.log("response", response);
        // dispatch(setAllJobs(response?.data?.data));
        // console.log(jobs);
    } catch (err) {
        console.error('Company Update Error:', err)
    }
}
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSelectCompany = (value) => {
    const selectedCompany = dummyCompanies.find(c => c.name.toLowerCase() === value)
    setInput({ ...input, companyId: selectedCompany?._id || "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const payload = {
        ...input,
        location: input.location.split(',').map(item => item.trim()),
        skillsRequired: input.skillsRequired.split(',').map(item => item.trim()),
        deadline: new Date(input.deadline),
        position: Number(input.position)
      }

      const response = await PostJob(input);
      console.log("response", response);
      if (response?.data?.success) {
        toast.success("Job posted successfully")
      } else {
        toast.error("Failed to post job")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <NavbarCompany />
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={handleSubmit} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Job Title</Label>
              <Input name="JobTitle" value={input.JobTitle} onChange={handleChange} />
            </div>
            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={handleChange} />
            </div>
            <div>
              <Label>Eligibility Criteria</Label>
              <Input name="eligibilityCriteria" value={input.eligibilityCriteria} onChange={handleChange} />
            </div>
            <div>
              <Label>CTC</Label>
              <Input name="ctc" value={input.ctc} onChange={handleChange} />
            </div>
            <div>
              <Label>Location (comma separated)</Label>
              <Input name="location" value={input.location} onChange={handleChange} />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={handleChange} />
            </div>
            <div>
              <Label>Experience</Label>
              <Input name="experience" value={input.experience} onChange={handleChange} />
            </div>
            <div>
              <Label>Positions</Label>
              <Input name="position" type="number" value={input.position} onChange={handleChange} />
            </div>
            <div>
              <Label>Skills Required (comma separated)</Label>
              <Input name="skillsRequired" value={input.skillsRequired} onChange={handleChange} />
            </div>
            <div>
              <Label>Responsibilities</Label>
              <Input name="responsibilities" value={input.responsibilities} onChange={handleChange} />
            </div>
            <div>
              <Label>Deadline</Label>
              <Input name="deadline" type="date" value={input.deadline} onChange={handleChange} />
            </div>
            
            {
              dummyCompanies.length > 0 && (
                <div>
                  <Label>Select Company</Label>
                  <Select onValueChange={handleSelectCompany}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {dummyCompanies.map((company) => (
                          <SelectItem key={company._id} value={company.name.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )
            }
          </div>
          {
            loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">Post Job</Button>
            )
          }
          {
            dummyCompanies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company before posting a job</p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJobCompany
