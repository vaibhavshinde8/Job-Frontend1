import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarCompany from "./shared/NavbarCompany";
import { companyInfo } from "@/axios/api/company.api"; // You can rename this
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { CreateUser } from "@/axios/api/user.api";
import Navbar from "./shared/Navbar";

function User() {
  const navigate = useNavigate();
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    passoutYear: "",
    collegeName: "",
    branch: "",
    cgpa: "",
    experience: "",
    skills: ['JavaScript',
          'Python',
          'Java',
          'C++',
          'React',
          'Node.js',
          'Express',
          'MongoDB',
          'SQL',
          'HTML',
          'CSS',
          'TypeScript',
          'Django',
          'Flask',
          'AWS',
          'Docker',
          'Kubernetes',
          'Git',
          'Linux',
          'REST API'],
    resume: "",
    description: "",
    githubProfile: "",
    leetcodeProfile: "",
    portfolioUrl: "",
    profileImage: "",
    projects: [{
      title: "",
      description: "",
      link: "",
      githubLink: "",
      techStack: [""],
    }]
  });

  const handleChange = (e, index, field, nested = false) => {
    const { name, value } = e.target;

    if (nested) {
      const updatedProjects = [...formData.projects];
      if (field === "techStack") {
        updatedProjects[index][field] = [...updatedProjects[index][field]];
        updatedProjects[index][field][name] = value;
      } else {
        updatedProjects[index][field] = value;
      }
      setFormData({ ...formData, projects: updatedProjects });
    } else if (field === "skills") {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = value;
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (field) => {
    if (field === "skills") {
      setFormData({ ...formData, skills: [...formData.skills, ""] });
    } else if (field === "projects") {
      setFormData({
        ...formData,
        projects: [...formData.projects, {
          title: "",
          description: "",
          link: "",
          githubLink: "",
          techStack: [""],
        }]
      });
    }
  };

  const handleAddTechStack = (projectIndex) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projectIndex].techStack.push("");
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedData = {
      ...formData,
      passoutYear: Number(formData.passoutYear),
      cgpa: Number(formData.cgpa),
      experience: Number(formData.experience),
    };

    const result = await CreateUser(parsedData); // rename API as needed
    if (result.success) {
      navigate('/company/moreInfo');
    } else {
      console.log(result);
      if (result.message?.statusCode === 404) {
        dispatch(setUser(null));
        navigate("/");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-center px-4">
        <form onSubmit={handleSubmit}
          className='max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl flex flex-col gap-6 border border-gray-200'>

          {/* Personal Info */}
          <div className="flex gap-4">
            <input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange}
              required className="p-3 rounded-lg border border-gray-300 w-1/2" />
            <input name="email" placeholder="Email *" value={formData.email} onChange={handleChange}
              required className="p-3 rounded-lg border border-gray-300 w-1/2" />
          </div>

          <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />
          <input name="address" placeholder="Address *" value={formData.address} onChange={handleChange}
            required className="p-3 rounded-lg border border-gray-300" />

          {/* Education */}
          <div className="flex gap-4">
            <input name="passoutYear" placeholder="Passout Year" type="number" value={formData.passoutYear} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />
            <input name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />
          </div>
          <div className="flex gap-4">
            <input name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />
            <input name="cgpa" placeholder="CGPA" type="number" value={formData.cgpa} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            {formData.skills.map((skill, idx) => (
              <input key={idx} value={skill} onChange={(e) => handleChange(e, idx, "skills")}
                placeholder={`Skill ${idx + 1}`} className="p-3 rounded-lg border border-gray-300" />
            ))}
            <Button type="button" variant="outline" onClick={() => handleAddField("skills")} className="w-fit text-sm gap-2">
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>

          {/* Experience + Links */}
          <input name="experience" placeholder="Experience (in years)" type="number" value={formData.experience} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />
          <input name="resume" placeholder="Resume URL" value={formData.resume} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />
          <input name="githubProfile" placeholder="GitHub Profile URL" value={formData.githubProfile} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />
          <input name="leetcodeProfile" placeholder="Leetcode Profile URL" value={formData.leetcodeProfile} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />
          <input name="portfolioUrl" placeholder="Portfolio URL" value={formData.portfolioUrl} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />
          <input name="profileImage" placeholder="Profile Image URL" value={formData.profileImage} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300" />

          {/* Description */}
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 resize-none" rows={4} />

          {/* Projects */}
          {formData.projects.map((project, pIdx) => (
            <div key={pIdx} className="border p-4 rounded-xl bg-gray-50">
              <h3 className="font-bold mb-2">Project {pIdx + 1}</h3>
              <input placeholder="Project Title" value={project.title} onChange={(e) => handleChange(e, pIdx, "title", true)}
                className="p-2 rounded-lg border border-gray-300 w-full mb-2" />
              <input placeholder="Project Description" value={project.description} onChange={(e) => handleChange(e, pIdx, "description", true)}
                className="p-2 rounded-lg border border-gray-300 w-full mb-2" />
              <input placeholder="Live Link" value={project.link} onChange={(e) => handleChange(e, pIdx, "link", true)}
                className="p-2 rounded-lg border border-gray-300 w-full mb-2" />
              <input placeholder="GitHub Link" value={project.githubLink} onChange={(e) => handleChange(e, pIdx, "githubLink", true)}
                className="p-2 rounded-lg border border-gray-300 w-full mb-2" />

              {/* Tech Stack */}
              <div className="flex flex-col gap-2">
                {project.techStack.map((tech, tIdx) => (
                  <input key={tIdx} placeholder={`Tech ${tIdx + 1}`} value={tech}
                    onChange={(e) => {
                      const updatedProjects = [...formData.projects];
                      updatedProjects[pIdx].techStack[tIdx] = e.target.value;
                      setFormData({ ...formData, projects: updatedProjects });
                    }}
                    className="p-2 rounded-lg border border-gray-300"
                  />
                ))}
                <Button type="button" onClick={() => handleAddTechStack(pIdx)} className="w-fit text-sm gap-2">
                  <Plus className="h-4 w-4" /> Add Tech
                </Button>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={() => handleAddField("projects")} className="w-fit text-sm gap-2">
            <Plus className="h-4 w-4" /> Add Project
          </Button>

          {/* Submit */}
          <Button type="submit" className="h-12 bg-[#6A38C2] text-white rounded-lg text-lg gap-2">
            <Send className="h-5 w-5" /> Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default User;
