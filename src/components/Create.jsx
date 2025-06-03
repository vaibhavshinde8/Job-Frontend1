import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CreateUser } from "@/axios/api/user.api";
import { setData } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import NavbarCompany from "./shared/NavbarCompany";

function Create() {
    const dispatch=useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await CreateUser(formData);
    
    if (result?.success){
        dispatch(setData(result?.data))
        navigate("/educational-details");}
    else console.log("Error:", result);
  };

  return (
    <>
    <NavbarCompany/>
    <form
    onSubmit={handleSubmit}
    className="p-8 max-w-xl mx-auto bg-white shadow-xl rounded-2xl flex flex-col gap-6"
  >
    <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
  
    <input
      required
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Full Name *"
      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  
    <input
      required
      name="contact"
      value={formData.contact}
      onChange={handleChange}
      placeholder="Contact Number *"
      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  
    <input
      required
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Address *"
      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  
    <Button
      type="submit"
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all"
    >
      <Send className="w-4 h-4 mr-2" />
      Submit
    </Button>
  </form>
    
    </>
    
  );
}

export default Create;
