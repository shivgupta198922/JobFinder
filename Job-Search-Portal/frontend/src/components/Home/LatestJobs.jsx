import React from "react";
import Job from "../Jobs/Job";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20 ml-20 mr-20">
      <h1 className="text-4xl font-bold">
        <span className="bg-gradient-to-r from-[#9F62FD] to-[#CA7BF7] bg-clip-text text-transparent">
          Latest & Top{" "}
        </span>{" "}
        Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <Job key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
