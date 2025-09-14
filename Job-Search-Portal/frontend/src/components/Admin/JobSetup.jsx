import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetJobById from "../../hooks/useGetJobById";

const JobSetup = () => {
  const params = useParams();
  useGetJobById(params.id);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,
    companyId: "",
  });

  const { singleJob } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      requirements: singleJob?.requirements || "",
      salary: singleJob?.salary || "",
      location: singleJob?.location || "",
      jobType: singleJob?.jobType || "",
      experience: singleJob?.experience || "",
      position: singleJob?.position || 1,
      companyId: singleJob?.companyId || "",
    });
  }, [singleJob]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-20 mb-20 border border-gray-300 rounded-3xl">
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          {/* Back Button & Title */}
          <div className="flex items-center gap-5 pb-6">
            <button
              onClick={() => navigate("/admin/jobs")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="font-bold text-xl text-[#A45DE6]">Edit Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block font-medium text-[#A45DE6]">Title</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Job title"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block font-medium text-[#A45DE6]">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows="4"
                placeholder="Brief job details..."
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Other Fields */}
            {[
              {
                label: "Requirements",
                name: "requirements",
                placeholder: "Skills needed",
              },
              {
                label: "Salary",
                name: "salary",
                placeholder: "e.g., 50K/year",
              },
              {
                label: "Location",
                name: "location",
                placeholder: "City or Remote",
              },
              {
                label: "Job Type",
                name: "jobType",
                placeholder: "Full-time, Part-time",
              },
              {
                label: "Experience Level",
                name: "experience",
                placeholder: "e.g., 2+ years",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-medium text-[#A45DE6]">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  placeholder={field.placeholder}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
                />
              </div>
            ))}

            {/* No of Positions Field */}
            <div>
              <label className="block font-medium text-[#A45DE6]">
                No of Positions
              </label>
              <input
                type="number"
                name="position"
                min="1"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="e.g., 3"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm 
                  appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none 
                  [&::-webkit-outer-spin-button]:appearance-none 
                  [-moz-appearance:textfield]"
              />
            </div>

            {/* Select Company Dropdown */}
            {companies.length > 0 && (
              <div>
                <label className="block font-medium text-[#A45DE6]">
                  Select a Company
                </label>
                <select
                  value={input.companyId}
                  onChange={selectChangeHandler}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
                >
                  <option value="">Choose a Company</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company?._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <button
              type="button"
              className="w-full mt-4 px-6 py-3 bg-gray-400 text-white rounded-lg shadow-lg cursor-not-allowed flex items-center justify-center"
              disabled
            >
              <span className="animate-spin mr-2 border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Updating...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#C97CF8] to-[#A45DE6] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              Update Job
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSetup;
