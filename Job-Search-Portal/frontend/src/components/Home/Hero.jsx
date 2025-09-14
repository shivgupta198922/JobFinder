import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle search action
  const searchJobHandler = () => {
    if (!query.trim()) return; // Prevent empty search
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Trigger search when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <section className="mt-16 relative flex items-center justify-between px-16 py-20 bg-gradient-to-r from-white to-purple-100">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold">
          <span className="bg-gradient-to-r from-[#9F62FD] to-[#CA7BF7] bg-clip-text text-transparent">
            Search Apply
          </span>{" "}
          & Get Your <span className="text-[#828EDC]">Dream</span> Jobs
        </h1>
        <p className="text-gray-600 mt-4">
          Discover endless opportunities with ease. Find, apply, and secure your
          ideal job through our seamless platform, designed to connect you with
          employers.
        </p>

        {/* Search Bar and Button Wrapper */}
        <div className="flex items-center space-x-4 mt-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm flex-grow max-w-[600px]">
            <input
              type="text"
              placeholder="Find your dream jobs"
              className="bg-transparent outline-none flex-grow px-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="text-purple-500 cursor-pointer"
              onClick={searchJobHandler}
            >
              <FaSearch />
            </button>
          </div>

          {/* No. 1 Job Hunt Button */}
          <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#D280F7] to-[#8A52FF] rounded-full font-medium shadow-lg hover:bg-purple-700 whitespace-nowrap">
            No. 1 Job Hunt Website
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div>
        <img src="/hero/image.svg" alt="Hero Illustration" className="w-96" />
      </div>

      {/* Gradient Fade-Out Effect */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white"></div>
    </section>
  );
};

export default Hero;
