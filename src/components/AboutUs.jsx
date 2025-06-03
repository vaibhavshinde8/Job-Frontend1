import React from "react";
import Navbar from "./shared/Navbar";

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#6A38C2] mb-8">About Us</h1>

      <p className="text-lg text-gray-700 mb-6">
        Welcome to our comprehensive Job Application and Preparation Portal — your all-in-one platform designed to simplify your journey from job search to landing your dream role.
      </p>

      <h2 className="text-2xl font-semibold text-[#6A38C2] mt-8 mb-4">Our Mission</h2>
      <p className="text-gray-700 mb-6">
        We aim to empower job seekers and recruiters through a seamless, intelligent, and user-centric experience. From personalized dashboards to AI-driven job recommendations, our goal is to help users grow, prepare, and succeed in today’s competitive job market.
      </p>

      <h2 className="text-2xl font-semibold text-[#6A38C2] mt-8 mb-4">What We Offer</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-3">
        <li>
          <strong>Sign-Up/Login Module:</strong> Secure and user-friendly interfaces for individuals and companies.
        </li>
        <li>
          <strong>User Dashboard:</strong> Personalized space to manage job searches, resumes, and interview feedback.
        </li>
        <li>
          <strong>Job Application and Posting:</strong> Simple tools for candidates to apply and companies to post jobs efficiently.
        </li>
        <li>
          <strong>AI-Powered Recommendations:</strong> Smart job matches based on user profiles, skills, and performance.
        </li>
        <li>
          <strong>Interview Preparation Platform:</strong> Mock tests, video interviews, and resources to boost your readiness.
        </li>
        <li>
          <strong>Secure Payment Gateway:</strong> Safe and seamless transactions for premium tools and job posts.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#6A38C2] mt-8 mb-4">Why Choose Us?</h2>
      <p className="text-gray-700 mb-6">
        Our platform blends technology with personal growth. Whether you're a first-time job seeker, a professional looking for new opportunities, or an employer seeking the right candidate — we've got you covered. By offering skill development resources, AI-powered support, and real-time feedback tools, we’re not just helping you get a job — we’re helping you build a career.
      </p>

      <h2 className="text-2xl font-semibold text-[#6A38C2] mt-8 mb-4">Join Us Today</h2>
      <p className="text-gray-700">
        Start your journey with us and unlock opportunities tailored just for you. From building resumes to booking interviews, we’re here every step of the way.
      </p>
    </div>
    </>
    
  );
};

export default AboutUs;
