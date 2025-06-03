import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { useSelector } from 'react-redux';

const LatestJobCards = ({ job }) => {
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  return (
    <div
    onClick={() =>
      user ? navigate(`/description/${job._id}`) : navigate('/login')
    }
      className="p-5 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        {job.applied && (
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
            Applied
          </span>
        )}
      </div>

      <div>
        <h1 className="font-semibold text-xl my-2 text-gray-900">{job?.companyName}</h1>
        <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
      </div>

      <h2 className="font-bold text-lg my-2 text-gray-800">{job?.JobTitle}</h2>
      <p className="text-sm text-gray-600 line-clamp-4">{job?.responsibilities}</p>

      <div className="flex items-center gap-3 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.ctc} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <Button
          className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCards;
