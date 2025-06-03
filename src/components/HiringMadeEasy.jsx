import React from "react";

const HiringMadeEasy = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Career Made Simple</h2>
        <p className="text-lg text-gray-600 mt-2">Find, Apply, and Prepare with Ease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 - Search Jobs */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white relative">
          <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-md mb-3 inline-block">
            SEARCH JOBS
          </span>
          <h3 className="text-xl font-semibold mb-4">Find the Right Opportunities</h3>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>• Browse thousands of job listings across multiple industries</li>
            <li>• Use filters to match roles based on your skills, location, and preferences</li>
          </ul>
          
        </div>

        {/* Card 2 - Apply Jobs */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
          <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-md mb-3 inline-block">
            APPLY NOW
          </span>
          <h3 className="text-xl font-semibold mb-4">Submit Applications Easily</h3>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>• Create your profile and apply with a single click</li>
            <li>• Track your applications and stay updated on new openings</li>
          </ul>
        
        </div>

        {/* Card 3 - Prepare for Jobs */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white relative">
          {/* Ribbon */}
          <div className="absolute top-0 right-0">
            <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg font-semibold">
              Newly Launched
            </div>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-md mb-3 inline-block">
            PREPARE BETTER
          </span>
          <h3 className="text-xl font-semibold mb-4">Ace Your Interviews</h3>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>• Access preparation material, mock tests, and interview tips</li>
            <li>• Get ready for technical rounds, HR interviews, and aptitude tests</li>
          </ul>
       
        </div>
      </div>
    </section>
  );
};

export default HiringMadeEasy;
