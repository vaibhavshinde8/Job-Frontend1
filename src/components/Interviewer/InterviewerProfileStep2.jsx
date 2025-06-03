import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadWorkProf, AddProfilePic, CreateProfileInterviwer } from '@/axios/api/interviewer.api';

const InterviewerProfileStep2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [workProofFiles, setWorkProofFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state to show spinner during API calls

  const [form, setForm] = useState({
    ...state.form,
    profilePicture: '',
    workProof: [{ title: '', link: '' }],
  });

  const handleWorkProofChange = (index, field, value) => {
    const newWorkProof = [...form.workProof];
    newWorkProof[index][field] = value;
    setForm({ ...form, workProof: newWorkProof });
  };

  const handleProfilePicUpload = async () => {
    if (!profilePicFile) return alert("Please select a profile picture");

    setLoading(true); // Start loading spinner
    const fd = new FormData();
    fd.append('file', profilePicFile);

    try {
      const res = await AddProfilePic(fd);
      if (res.success) {
        setForm(prev => ({ ...prev, profilePicture: res.data.url }));
        alert("Profile picture uploaded successfully!");
      } else {
        alert("Profile picture upload failed.");
      }
    } catch (error) {
      alert("An error occurred while uploading the profile picture.");
    } finally {
      setLoading(false); // End loading spinner
    }
  };

  const handleWorkProofUpload = async () => {
    if (workProofFiles.length === 0) return alert("Please select work proof files");

    setLoading(true); // Start loading spinner
    const fd = new FormData();
    workProofFiles.forEach(file => fd.append('files', file));

    try {
      const res = await UploadWorkProf(fd);
      if (res.success) {
        alert("Work proof files uploaded successfully!");
      } else {
        alert("Work proof upload failed.");
      }
    } catch (error) {
      alert("An error occurred while uploading work proof files.");
    } finally {
      setLoading(false); // End loading spinner
    }
  };

  const handleSubmit = async () => {
    if (!form.profilePicture) return alert("Please upload a profile picture");

    setLoading(true); // Start loading spinner
    const payload = {
      ...form,
      experienceYears: parseInt(form.experienceYears),
    };

    try {
      const res = await CreateProfileInterviwer(payload);
      if (res.success) {
        alert('Profile created!');
        navigate('/dashboard');
      } else {
        alert(res.message?.message || 'Submission failed');
      }
    } catch (error) {
      alert("An error occurred while submitting the profile.");
    } finally {
      setLoading(false); // End loading spinner
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-semibold">Step 2: Upload Files</h2>

      <label>Profile Picture</label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePicFile(e.target.files[0])}
      />
      <Button
        type="button"
        onClick={handleProfilePicUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Picture"}
      </Button>

      <label>Work Proof Links</label>
      {form.workProof.map((wp, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder="Title"
            value={wp.title}
            onChange={(e) => handleWorkProofChange(index, 'title', e.target.value)}
          />
          <Input
            placeholder="Link"
            value={wp.link}
            onChange={(e) => handleWorkProofChange(index, 'link', e.target.value)}
          />
        </div>
      ))}

      <label>Upload Work Proof Files</label>
      <Input
        type="file"
        multiple
        onChange={(e) => setWorkProofFiles([...e.target.files])}
      />
      <Button
        type="button"
        onClick={handleWorkProofUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Files"}
      </Button>

      <Button
        type="button"
        onClick={handleSubmit}
        className="bg-purple-600 text-white"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Profile"}
      </Button>
    </div>
  );
};

export default InterviewerProfileStep2;
