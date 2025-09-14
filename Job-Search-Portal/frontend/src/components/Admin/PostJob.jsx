import React, { useState } from "react";
import Header from "../Shared/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

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
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        alert(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-screen mt-25 mb-25">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-300 shadow-lg rounded-md bg-white"
        >
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
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm my-1"
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
                placeholder="Short job details..."
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm resize-none my-1"
              ></textarea>
            </div>

            {/* Other Fields with Short Placeholders */}
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
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm my-1"
                />
              </div>
            ))}

            {/* No of Positions Field (Fixed Spinners & Short Placeholder) */}
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
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm my-1 
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
                  onChange={selectChangeHandler}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm my-1"
                >
                  <option value="">Choose a Company</option>
                  {companies.map((company) => (
                    <option
                      key={company._id}
                      value={company?.name?.toLowerCase()}
                    >
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
              className="w-full my-4 px-6 py-3 bg-gray-400 text-white rounded-lg shadow-lg cursor-not-allowed flex items-center justify-center"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full my-4 px-6 py-3 bg-gradient-to-r from-[#C97CF8] to-[#A45DE6] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              Post New Job
            </button>
          )}

          {/* Company Not Registered Message */}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
