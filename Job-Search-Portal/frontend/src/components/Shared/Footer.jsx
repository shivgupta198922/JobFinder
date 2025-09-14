import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F0F14] text-white py-10 px-6 relative overflow-hidden mt-20">
      {/* Curved Background Shape on the Right */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#0F0F14] clip-path-custom"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="relative z-10">
          <img src="/blogo.svg" alt="Brand Logo" />
        </div>

        {/* About Section */}
        <div className="relative z-10">
          <h3 className="font-semibold text-lg">About Section</h3>
          <Link
            to="/about"
            className="block text-gray-400 mt-2 hover:text-white"
          >
            About Us
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="relative z-10">
          <h3 className="font-semibold text-lg">Navigation Links</h3>
          <Link to="/" className="block text-gray-400 mt-2 hover:text-white">
            Home
          </Link>
          <Link
            to="/jobs"
            className="block text-gray-400 mt-2 hover:text-white"
          >
            Browse Jobs
          </Link>
          <Link
            to="/admin/jobs"
            className="block text-gray-400 mt-2 hover:text-white"
          >
            Post a Job
          </Link>
          <Link
            to="/admin/companies"
            className="block text-gray-400 mt-2 hover:text-white"
          >
            Create a Company
          </Link>
        </div>

        {/* Tools */}
        <div className="relative z-10">
          <h3 className="font-semibold text-lg">Tools</h3>
          <p className="text-gray-400 mt-2">React</p>
          <p className="text-gray-400 mt-2">MongoDB</p>
          <p className="text-gray-400 mt-2">Express JS</p>
          <p className="text-gray-400 mt-2">Node JS</p>
          <p className="text-gray-400 mt-2">Redux</p>
        </div>

        {/* Members */}
        <div className="relative z-10">
          <h3 className="font-semibold text-lg">Members</h3>
          <p className="text-gray-400 mt-2">Created By Shiv Gupta</p>
          <p className="text-gray-400 mt-2"></p>
          <p className="text-gray-400 mt-2"></p>
          <p className="text-gray-400 mt-2"></p>
          <p className="text-gray-400 mt-2"></p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-6 relative z-10">
  <div className="flex gap-4">
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <img
        src="/social/twitter.svg"
        alt="Twitter"
        className="w-8 h-8 cursor-pointer"
      />
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
      <img
        src="/social/youtube.svg"
        alt="YouTube"
        className="w-8 h-8 cursor-pointer"
      />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <img
        src="/social/facebook.svg"
        alt="Facebook"
        className="w-8 h-8 cursor-pointer"
      />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <img
        src="/social/instagram.svg"
        alt="Instagram"
        className="w-8 h-8 cursor-pointer"
      />
    </a>
  </div>
</div>

      {/* <div className="mt-6 relative z-10">
        <div className="flex gap-4">
          <img
            src="/social/twitter.svg"
            alt="Twitter"
            className="w-8 h-8 cursor-pointer"
          />
          <img
            src="/social/youtube.svg"
            alt="YouTube"
            className="w-8 h-8 cursor-pointer"
          />
          <img
            src="/social/facebook.svg"
            alt="Facebook"
            className="w-8 h-8 cursor-pointer"
          />
          <img
            src="/social/instagram.svg"
            alt="Instagram"
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      </div> */}

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-6 pt-4 text-gray-400 text-sm flex flex-col md:flex-row justify-between relative z-10">
        <p>@2025-2030, All rights Reserved</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-white">
            Terms of Service
          </Link>
          <Link to="/help-center" className="hover:text-white">
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
