import React from "react";
import Navbar from "./shared/Navbar";

const ContactUs = () => {
  return (
<>

    <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#6A38C2] mb-8">Contact Us</h1>

      <p className="text-center text-gray-700 mb-10">
        Have questions, suggestions, or need help? We'd love to hear from you. Fill out the form below or reach us directly.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#6A38C2] text-white px-6 py-2 rounded-lg hover:bg-[#5931a6] transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Our Office</h2>
            <p className="text-gray-700">
              123 Career Avenue<br />
              Tech City, IN 456789<br />
              India
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Email</h2>
            <p className="text-gray-700">support@jobprepportal.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Phone</h2>
            <p className="text-gray-700">+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Business Hours</h2>
            <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
