import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import NavbarCompany from "./shared/NavbarCompany";
import { companyInfo } from "@/axios/api/company.api";
import { setLoading, setUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
function CompanyForm() {
  const navigate = useNavigate(); // ✅ use navigate hook
  const { loading, user } = useSelector(store => store.auth);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    companyName: "",
    contactNumber: "",
    locations: [""],
    description: "",
    tech: [""],
    members: "",
    websiteLink: "",
    establishment: "",
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;

    if (field === "locations" || field === "tech") {
      const updatedArray = [...formData[field]];
      updatedArray[index] = value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      members: Number(formData.members),
      establishment: Number(formData.establishment),
    };

    const result = await companyInfo(parsedData);
    if (result.success)
      navigate('/company/moreInfo')
    else {
      console.log(result)
      if (result.message?.statusCode == 404) {
        dispatch(setUser(null));
        navigate("/")
      }
      else{
        dispatch(setLoading(false));
        
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate("/company/moreInfo"); // ✅ just navigate to next page
  // };

  return (
    <>
      <NavbarCompany />
      <div className='text-center px-4'>
        <div className='flex flex-col gap-5 my-10'>
          <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
            No. 1 Job Hunt Website
          </span>
          <h1 className='text-5xl font-bold'>
            Post, Hire & <br />
            Build Your <span className='text-[#6A38C2]'>Dream Team</span>
          </h1>

          <p className="text-gray-500">
            Post your company details below to connect with top talent!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl flex flex-col gap-6 border border-gray-200'
        >
          {/* Row 1: Company Name + Contact Number */}
          <div className="flex gap-4">
            <input name="companyName" placeholder="Company Name *" value={formData.companyName} onChange={handleChange}
              required className="p-3 rounded-lg border border-gray-300 w-1/2" />
            <input name="contactNumber" placeholder="Contact Number *" value={formData.contactNumber} onChange={handleChange}
              required className="p-3 rounded-lg border border-gray-300 w-1/2" />
          </div>

          {/* Row 2: Full Description */}
          <textarea name="description" placeholder="Company Description" value={formData.description} onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 w-full resize-none" rows={4} />

          {/* Row 3: Website Link + Total Employees */}
          <div className="flex gap-4">
            <input name="websiteLink" placeholder="Website Link" value={formData.websiteLink} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />
            <input name="members" placeholder="Total Employees" type="number" value={formData.members} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />
          </div>

          {/* Row 4: Establishment Year + Locations */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              {formData.tech.map((t, idx) => (
                <input key={idx} value={t} onChange={(e) => handleChange(e, idx, "tech")}
                  placeholder={`Tech ${idx + 1}`} className="p-3 rounded-lg border border-gray-300" />
              ))}
              <Button type="button" variant="outline" onClick={() => handleAddField("tech")} className="w-fit text-sm gap-2">
                <Plus className="h-4 w-4" /> Add Tech
              </Button>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              {formData.locations.map((loc, idx) => (
                <input key={idx} value={loc} onChange={(e) => handleChange(e, idx, "locations")}
                  placeholder={`Location ${idx + 1}`} className="p-3 rounded-lg border border-gray-300" />
              ))}
              <Button type="button" variant="outline" onClick={() => handleAddField("locations")} className="w-fit text-sm gap-2">
                <Plus className="h-4 w-4" /> Add Location
              </Button>
            </div>
          </div>

          {/* Row 5: Establishment Year + Submit */}
          <div className="flex gap-4 items-end">
            <input name="establishment" placeholder="Establishment Year" type="number" value={formData.establishment} onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 w-1/2" />

            <Button
              type="submit"
              className="w-1/2 h-12 bg-[#6A38C2] text-white rounded-lg text-lg gap-2"
            >
              <Send className="h-5 w-5" /> Next
            </Button>
          </div>
        </form>
      </div>
    </>

  );
}

export default CompanyForm;
