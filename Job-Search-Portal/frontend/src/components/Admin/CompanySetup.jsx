import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  //Ensure `singleCompany` exists before accessing properties
  useEffect(() => {
    if (singleCompany) {
      setInput((prev) => ({
        ...prev,
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
      }));
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeFileHandler = (e) => {
    if (e.target.files.length > 0) {
      setInput((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      alert(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  //Show a loading message while `singleCompany` is `null`
  if (!singleCompany) {
    return (
      <div className="text-center text-gray-600 font-semibold mt-10">
        Loading company data...
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto mt-30 mb-25 border border-gray-300 rounded-3xl">
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-5 pb-6">
            <button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-gray-200 transition cursor-pointer"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="font-bold text-xl text-[#A45DE6]">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#A45DE6]">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-medium text-[#A45DE6]">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm resize-none"
                placeholder="Write a brief description about your company..."
              ></textarea>
            </div>
            <div>
              <label className="block font-medium text-[#A45DE6]">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-[#A45DE6]">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-medium text-[#A45DE6]">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full p-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          {loading ? (
            <button
              type="button"
              className="w-full mt-4 px-6 py-3 bg-gray-400 text-white rounded-lg shadow-lg cursor-not-allowed flex items-center justify-center"
              disabled
            >
              <span className="animate-spin mr-2 border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#C97CF8] to-[#A45DE6] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
