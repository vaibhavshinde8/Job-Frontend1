import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Plus } from "lucide-react";
import { otherDetails } from "@/axios/api/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setData } from "@/redux/authSlice";
import NavbarCompany from "./shared/NavbarCompany";

function OtherDetails() {
    const [formData, setFormData] = useState({
        experience: "",
        skills: [
           
        ],
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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData({ ...formData, skills: newSkills });
    };

    const handleAddSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, ""] });
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...formData.projects];
        newProjects[index][field] = value;
        setFormData({ ...formData, projects: newProjects });
    };

    const handleTechStackChange = (projIndex, techIndex, value) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[projIndex].techStack[techIndex] = value;
        setFormData({ ...formData, projects: updatedProjects });
    };

    const handleAddProject = () => {
        setFormData({
            ...formData,
            projects: [
                ...formData.projects,
                { title: "", description: "", link: "", githubLink: "", techStack: [""] }
            ]
        });
    };

    const handleAddTechStack = (projIndex) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[projIndex].techStack.push("");
        setFormData({ ...formData, projects: updatedProjects });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await otherDetails({
            ...formData,
            experience: Number(formData.experience),
        });
        if (result?.success) {
            console.log("All done!");
            dispatch(setData(result?.data));
            navigate("/");
        } else {
            console.log("Error:", result);
        }
    };

    return (
        <>
            <NavbarCompany />
            <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto flex flex-col gap-6 bg-white shadow-lg rounded-xl">
                <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience (years)" type="number" className="p-3 border rounded" />
                <input name="description" value={formData.description} onChange={handleChange} placeholder="Short Description" className="p-3 border rounded" />
                <input name="githubProfile" value={formData.githubProfile} onChange={handleChange} placeholder="GitHub Profile URL" className="p-3 border rounded" />
                <input name="leetcodeProfile" value={formData.leetcodeProfile} onChange={handleChange} placeholder="LeetCode Profile URL" className="p-3 border rounded" />
                <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} placeholder="Portfolio URL" className="p-3 border rounded" />
                <input name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="Profile Image URL" className="p-3 border rounded" />

                <div className="space-y-2">
  <label className="font-semibold">Select Skills</label>
  <select
    onChange={(e) => {
      const selected = e.target.value;
      if (selected && !formData.skills.includes(selected)) {
        setFormData({ ...formData, skills: [...formData.skills, selected] });
      }
      e.target.selectedIndex = 0; // Reset to default
    }}
    className="p-2 border rounded w-full"
  >
    <option value="">-- Choose a Skill --</option>
    {[
      "JavaScript", "Python", "Java", "C++", "React", "Node.js", "Express",
      "MongoDB", "SQL", "HTML", "CSS", "TypeScript", "Django",
      "Flask", "AWS", "Docker", "Kubernetes"
    ]
      .filter(skill => !formData.skills.includes(skill))
      .map((skill, idx) => (
        <option key={idx} value={skill}>
          {skill}
        </option>
      ))}
  </select>

  <div className="flex flex-wrap gap-2 mt-2">
    {formData.skills.map((skill, idx) => (
      <span
        key={idx}
        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
      >
        {skill}
      </span>
    ))}
  </div>
</div>



                <div className="space-y-4">
                    <label className="font-semibold">Projects</label>
                    {formData.projects.map((project, projIdx) => (
                        <div key={projIdx} className="border p-4 rounded-md space-y-2">
                            <input
                                placeholder="Title"
                                value={project.title}
                                onChange={(e) => handleProjectChange(projIdx, "title", e.target.value)}
                                className="p-2 border rounded w-full"
                            />
                            <input
                                placeholder="Description"
                                value={project.description}
                                onChange={(e) => handleProjectChange(projIdx, "description", e.target.value)}
                                className="p-2 border rounded w-full"
                            />
                            <input
                                placeholder="Live Link"
                                value={project.link}
                                onChange={(e) => handleProjectChange(projIdx, "link", e.target.value)}
                                className="p-2 border rounded w-full"
                            />
                            <input
                                placeholder="GitHub Link"
                                value={project.githubLink}
                                onChange={(e) => handleProjectChange(projIdx, "githubLink", e.target.value)}
                                className="p-2 border rounded w-full"
                            />
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tech Stack</label>
                                {project.techStack.map((tech, techIdx) => (
                                    <input
                                        key={techIdx}
                                        value={tech}
                                        onChange={(e) => handleTechStackChange(projIdx, techIdx, e.target.value)}
                                        className="p-2 border rounded w-full"
                                    />
                                ))}
                                <Button type="button" onClick={() => handleAddTechStack(projIdx)} className="text-xs gap-2">
                                    <Plus className="h-4 w-4" /> Add Tech
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={handleAddProject} className="text-sm gap-2">
                        <Plus className="h-4 w-4" /> Add Project
                    </Button>
                </div>

                <Button type="submit" className="mt-6 flex gap-2 items-center">
                    <Send className="w-4 h-4" /> Submit
                </Button>
            </form>
        </>
    );
}

export default OtherDetails;
