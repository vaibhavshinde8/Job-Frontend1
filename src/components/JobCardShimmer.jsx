const JobCardShimmer = () => {
    return (
      <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 animate-pulse space-y-4">
  
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-5 w-14 bg-gray-300 rounded-full"></div>
        </div>
  
        <div>
          <div className="h-5 w-36 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 w-20 bg-gray-100 rounded"></div>
        </div>
  
        <div>
          <div className="h-5 w-44 bg-gray-200 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
            <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
          </div>
        </div>
  
        <div className="flex items-center gap-2 mt-4">
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
  
        <div className="flex items-center gap-4 mt-4">
          <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
        </div>
  
      </div>
    );
  };
  
  export default JobCardShimmer;
  