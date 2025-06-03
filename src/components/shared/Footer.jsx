import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-300">
          {/* Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold text-[#6A38C2]">HireHustle</h2>
            <p className="mt-2 text-sm">
              Your all-in-one platform for job seekers and recruiters. Explore jobs, prepare with AI tools, and hire smarter.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-[#6A38C2]">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-[#6A38C2]">How it Works</a></li>
              <li><a href="/jobs" className="hover:text-[#6A38C2]">Browse Jobs</a></li>
              <li><a href="/contact" className="hover:text-[#6A38C2]">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#6A38C2]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#6A38C2]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#6A38C2]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#6A38C2]">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
            <p className="text-sm mb-2">Get job alerts and updates right in your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#6A38C2] text-white text-sm rounded-md hover:bg-[#5931a6] transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-sm text-gray-600">© 2024 HireHustle. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-[#6A38C2]" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324..."/></svg>
            </a>
            <a href="https://twitter.com" className="hover:text-[#6A38C2]" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835..."/></svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-[#6A38C2]" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452..."/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
