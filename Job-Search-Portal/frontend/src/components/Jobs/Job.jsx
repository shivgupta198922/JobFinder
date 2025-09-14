import React from "react";
import Avatar from "../Shared/Avatar";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookmarkedJobs } = useSelector((store) => store.job);

  // Check if job is bookmarked
  const isBookmarked = bookmarkedJobs.some((item) => item._id === job._id);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-[#F6E6FF] p-5 rounded-lg shadow-md w-full h-full hover:scale-105 transition-transform duration-200">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <span className="text-gray-500 text-sm">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <button
          className={`p-2 rounded-full shadow hover:scale-105 transition ${
            isBookmarked ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => dispatch(toggleBookmark(job._id))}
        >
          <Bookmark
            className="w-5 h-5"
            style={{
              stroke: isBookmarked ? "white" : "gray",
            }}
          />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center space-x-3 mt-2">
        <Avatar className="w-10 h-10" src={job?.company?.logo} />
        <div>
          <h2 className="text-lg font-semibold">{job?.company?.name}</h2>
          <p className="text-gray-500 text-sm">India</p>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-xl font-bold mt-3">{job?.title}</h2>
      <p className="text-gray-600 text-sm mt-1 truncate w-full overflow-hidden whitespace-nowrap">
        {job?.description}
      </p>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="px-3 py-1 bg-white border rounded-full text-blue-600 text-xs">
          {job?.position} {job?.position === 1 ? "position" : "positions"}
        </span>
        <span className="px-3 py-1 bg-white border rounded-full text-red-500 text-xs">
          {job?.jobType}
        </span>
        <span className="px-3 py-1 bg-white border rounded-full text-purple-600 text-xs">
          {job?.salary} LPA
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="px-4 py-2 border rounded-md text-sm font-medium cursor-pointer hover:scale-105"
        >
          Details
        </button>
        <button
          onClick={() => dispatch(toggleBookmark(job._id))}
          className={`px-4 py-2 text-white text-sm font-medium rounded-md cursor-pointer hover:scale-105 transition`}
          style={{
            background: isBookmarked
              ? "gray"
              : "linear-gradient(to right, #9056FE, #CE7DF8)",
          }}
        >
          {isBookmarked ? "Already Bookmarked" : "Save For Later"}
        </button>
      </div>
    </div>
  );
};

export default Job;
