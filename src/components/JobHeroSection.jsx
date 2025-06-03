import React from "react";

const JobHeroSection = () => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div
        className="relative w-full h-[560px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.investopedia.com/thmb/ejUMpcr5pOzEIkw5FekHv4E5-f0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1210536688-f8aa4c9c1ace4e348e2bcd5e267fdbb3.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 flex bg-black/70 items-center justify-center px-4">
          {/* Decreased darkness from bg-black/20 to bg-black/10 */}
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Hire Smarter. <br /> Build Faster. <br />
              <span className="text-[#FFCD1D]">Grow</span> with{" "}
              <span className="text-[#ff4b4b]">HireHustle</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 font-light">
              Unlock thousands of top-tier professionals and take your hiring journey to the next level.
            </p>
            
            <p className="mt-3 text-sm text-white/70">
              No hidden charges. Cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-6 md:px-20 py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Card 1 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-3xl px-8 py-10 text-center max-w-sm border-t-4 border-[#6A38C2]">
          <div className="text-5xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Explore Opportunities</h3>
          <p className="text-gray-600 text-base">
            Discover top jobs across industries tailored to your skills, passion, and location.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-3xl px-8 py-10 text-center max-w-sm border-t-4 border-[#FFCD1D]">
          <div className="text-5xl mb-6">📝</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Apply with Ease</h3>
          <p className="text-gray-600 text-base">
            Fast-track your application process with a few clicks and real-time status tracking.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-3xl px-8 py-10 text-center max-w-sm border-t-4 border-[#6A38C2]">
          <div className="text-5xl mb-6">🎯</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Prepare for Success</h3>
          <p className="text-gray-600 text-base">
            Sharpen your edge with curated resources, expert career advice, and mock interviews.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-3xl px-8 py-10 text-center max-w-sm border-t-4 border-[#FFCD1D]">
          <div className="text-5xl mb-6">🚀</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Succeed & Grow</h3>
          <p className="text-gray-600 text-base">
            Land your dream job and unlock career milestones faster with HireHustle by your side.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobHeroSection;
