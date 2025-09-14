import React, { useEffect } from "react";
import Header from "../Shared/Header";
import Job from "../Jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import useGetAllJobs from "../../hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="bg-white min-h-screen ml-10 mr-10">
      <Header />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-2xl my-10 text-[#7B3FBF]">
          Search Results ({allJobs.length})
        </h1>
        {allJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#7B3FBF] font-semibold text-lg">
            No Jobs Available
          </p>
        )}
      </div>
    </div>
  );
};

export default Browse;
