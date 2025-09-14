import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant";
import { setSingleJob } from "../../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        alert(res.data.message); // Simple alert for success
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#9056FE]">
            {singleJob?.title}
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1 text-sm font-bold text-[#9056FE] border border-[#9056FE] rounded-lg">
              {singleJob?.position}{" "}
              {singleJob?.position === 1 ? "Position" : "Positions"}
            </span>
            <span className="px-3 py-1 text-sm font-bold text-[#CE7DF8] border border-[#CE7DF8] rounded-lg">
              {singleJob?.jobType}
            </span>
            <span className="px-3 py-1 text-sm font-bold text-[#C97CF8] border border-[#C97CF8] rounded-lg">
              {singleJob?.salary} LPA
            </span>
          </div>
        </div>
        <button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#9056FE] to-[#CE7DF8] hover:shadow-lg hover:opacity-90"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
      <h2 className="text-lg font-semibold text-[#9056FE] border-b-2 border-gray-300 py-4 mt-6">
        Job Description
      </h2>
      <div className="my-6 text-gray-800 space-y-3">
        <h2 className="font-semibold">
          Role: <span className="pl-4 font-normal">{singleJob?.title}</span>
        </h2>
        <h2 className="font-semibold">
          Location:{" "}
          <span className="pl-4 font-normal">{singleJob?.location}</span>
        </h2>
        <h2 className="font-semibold">
          Description:{" "}
          <span className="pl-4 font-normal">{singleJob?.description}</span>
        </h2>
        <h2 className="font-semibold">
          Experience:{" "}
          <span className="pl-4 font-normal">
            {singleJob?.experienceLevel} yrs
          </span>
        </h2>
        <h2 className="font-semibold">
          Salary:{" "}
          <span className="pl-4 font-normal">{singleJob?.salary} LPA</span>
        </h2>
        <h2 className="font-semibold">
          Total Applicants:{" "}
          <span className="pl-4 font-normal">
            {singleJob?.applications?.length}
          </span>
        </h2>
        <h2 className="font-semibold">
          Posted Date:{" "}
          <span className="pl-4 font-normal">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default JobDescription;
