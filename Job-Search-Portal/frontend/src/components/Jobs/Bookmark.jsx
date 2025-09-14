import React from "react";
import { useSelector } from "react-redux";
import Job from "../Jobs/Job";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const Bookmark = () => {
  const { bookmarkedJobs } = useSelector((store) => store.job);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 mt-25 ml-20 mr-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9F62FD] to-[#CA7BF7] bg-clip-text text-transparent mb-5">
          Bookmarked Jobs
        </h1>
        <div className="pb-5 w-full">
          {bookmarkedJobs.length === 0 ? (
            <p className="text-center text-gray-500 mt-5">No Bookmarked Jobs</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {bookmarkedJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bookmark;
