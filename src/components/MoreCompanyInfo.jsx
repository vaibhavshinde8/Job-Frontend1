import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, UploadCloud } from "lucide-react";
import axiosInstance from "@/axios/axiosConfig";
import NavbarCompany from "./shared/NavbarCompany";

function MoreCompanyInfo() {
    const [formData, setFormData] = useState({
        hrName: "",
        hrEmail: "",
        hrPhone: "",
        logo: "", // logo URL will be stored here after upload
    });

    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (!file) return;
       

        const data = new FormData();
        data.append("logo", file);

        try {
            setUploading(true);
            const response = await axiosInstance.post("/company/logo", data);
            setFormData({ ...formData, logo: response.data.logoUrl });
            setResponseMessage("✅ Logo uploaded successfully!");
        } catch (err) {
            console.error(err);
            setResponseMessage("❌ Logo upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("HR Info Submitted:", formData);
            await axiosInstance.post("/company/hr", formData);
            setResponseMessage("✅ HR info submitted successfully!");
        } catch (err) {
            setResponseMessage(err);
        }
    };

    return (
        <>
         <NavbarCompany/>
         <div className='text-center px-4'>
            {/* Header */}
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className="text-gray-500">
                    Post your company details below to connect with top talent!
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className='max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl flex flex-col gap-6 border border-gray-200'
            >
                {/* Row 1: HR Name + Email */}
                <div className="flex gap-4">
                    <input
                        name="hrName"
                        placeholder="HR Contact Name"
                        value={formData.hrName}
                        onChange={handleChange}
                        className="p-3 rounded-lg border border-gray-300 w-1/2"
                    />
                    <input
                        name="hrEmail"
                        placeholder="HR Email"
                        value={formData.hrEmail}
                        onChange={handleChange}
                        className="p-3 rounded-lg border border-gray-300 w-1/2"
                    />
                </div>

                {/* Row 2: HR Phone */}
                <input
                    name="hrPhone"
                    placeholder="HR Phone Number"
                    value={formData.hrPhone}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-gray-300 w-full"
                />

                {/* Row 3: Logo Upload */}
                <div className="flex items-center justify-between gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="p-2 rounded-lg border border-gray-300 w-full"
                    />
                    {uploading && <span className="text-sm text-blue-500">Uploading...</span>}
                </div>

                {/* Row 4: Logo Preview */}
                {formData.logo && (
                    <div className="w-full flex justify-center">
                        <img
                            src={formData.logo}
                            alt="Logo Preview"
                            className="max-h-32 object-contain"
                        />
                    </div>
                )}

                {/* Row 5: Submit */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-[#6A38C2] text-white rounded-lg text-lg gap-2 px-6 h-12"
                    >
                        <Send className="h-5 w-5" /> Submit HR Info
                    </Button>
                </div>

                {responseMessage && (
                    <p className="mt-2 text-sm text-center text-green-600">{responseMessage}</p>
                )}
            </form>
        </div>
        </>
       
    );
}

export default MoreCompanyInfo;
