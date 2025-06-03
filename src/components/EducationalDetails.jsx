import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { educationalDetails } from "@/axios/api/user.api";
import { setData } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import NavbarCompany from "./shared/NavbarCompany";

function EducationalDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passoutYear: "",
    collegeName: "",
    branch: "",
    cgpa: "",
  });
   const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await educationalDetails({
      ...formData,
      passoutYear: Number(formData.passoutYear),
      cgpa: Number(formData.cgpa),
    });
     
    if (result?.success){
        console.log(result?.data)
        dispatch(setData(result?.data))
        navigate("/other-details");}
    else console.log("Error:", result);
  };

  return (

    <>
    <NavbarCompany/>
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto flex flex-col gap-4">
      <input name="passoutYear" value={formData.passoutYear} onChange={handleChange} placeholder="Passout Year" type="number" className="p-3 border rounded" />
      <input name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" className="p-3 border rounded" />
      <input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="p-3 border rounded" />
      <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" type="number" className="p-3 border rounded" />
      <Button type="submit"><Send className="w-4 h-4 mr-2" /> Submit</Button>
    </form>
    </>
    
  );
}

export default EducationalDetails;
