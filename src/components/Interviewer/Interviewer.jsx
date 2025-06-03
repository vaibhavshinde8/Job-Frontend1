import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { CreateProfileInterviwer } from '@/axios/api/interviewer.api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavbarCompany from '../shared/NavbarCompany';

const Interviewer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    experienceYears: '',
    bio: '',
    skills: []
  });

  const allowedSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
    'Express', 'MongoDB', 'SQL', 'HTML', 'CSS', 'TypeScript',
    'Django', 'Flask', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'Linux', 'REST API'
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm({ ...form, skills: selected }); // assuming backend expects string[]
  };

  const handleNext = async () => {
    try {
      const payload = {
        ...form,
        experienceYears: parseInt(form.experienceYears),
      };

      console.log("Payload being sent:", payload); // useful for debugging

      const response = await CreateProfileInterviwer(payload);

      if (response?.data?.success) {
        toast.success("Step 1 saved successfully");
        navigate("/interviewer-profile-step-2", { state: { form: payload } });
      } else {
        toast.error(response?.data?.message || "Failed to save profile");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
    <NavbarCompany/>
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-4">
        Create Interviewer Profile - Step 1
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name and Email */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input name="fullName" value={form.fullName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        {/* Phone and LinkedIn */}
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input name="linkedin" value={form.linkedin} onChange={handleChange} />
        </div>

        {/* Experience Years and Skills */}
        <div>
          <Label htmlFor="experienceYears">Years of Experience</Label>
          <Input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="skills">Select Your Skills</Label>
          <div className="w-full border p-2 rounded-lg max-h-40 overflow-y-auto space-y-2 custom-scroll">
            {allowedSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={skill}
                  value={skill}
                  checked={form.skills.includes(skill)}
                  onChange={(e) => {
                    const updatedSkills = e.target.checked
                      ? [...form.skills, skill]
                      : form.skills.filter((s) => s !== skill);
                    setForm({ ...form, skills: updatedSkills });
                  }}
                />
                <label htmlFor={skill} className="text-sm text-gray-700">{skill}</label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Click to select or deselect skills.</p>
        </div>

        {/* Bio */}
        <div className="col-span-2">
          <Label htmlFor="bio">Short Bio</Label>
          <textarea
            name="bio"
            rows="4"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Tell us a bit about yourself"
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={handleNext}
          className="bg-[#6A38C2] hover:bg-[#582ea1] text-white w-full py-3 text-lg rounded-lg"
        >
          Next Step →
        </Button>
      </div>
    </div>
    </>
    
  );
};

export default Interviewer;
