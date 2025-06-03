import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, UserPlus, CheckCircle } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    if (!query.trim()) return
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <section className="relative bg-gradient-to-br from-[#f5f3ff] to-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-[#ffece8] text-[#F83002] rounded-full">
          🚀 Trusted by 100k+ Job Seekers
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          Find Your <span className="text-[#6A38C2]">Dream Job</span><br />
          with Ease & Speed
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Join thousands who found their dream careers. Explore verified job listings from top companies around the world.
        </p>

        {/* Search Box */}
        <div className="flex w-full max-w-xl mx-auto bg-white rounded-full border border-gray-200 shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="Search jobs e.g. Designer, Developer..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 text-gray-700 focus:outline-none"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] rounded-l-none rounded-r-full py-6 px-5"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          <Button onClick={() => navigate('/browse')} className="bg-[#F83002] hover:bg-[#e02900] px-6 py-2">
            <Briefcase className="h-4 w-4 mr-2" />
            Browse Jobs
          </Button>
          <Button variant="outline" onClick={() => navigate('/applied_jobs')} className="px-6 py-2 border-gray-300">
            <UserPlus className="h-4 w-4 mr-2" />
            Applied Jobs
          </Button>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="text-green-500" size={18} />
            100% Verified Jobs
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="text-green-500" size={18} />
            24/7 Career Support
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="text-green-500" size={18} />
            Resume & Interview Guidance
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
