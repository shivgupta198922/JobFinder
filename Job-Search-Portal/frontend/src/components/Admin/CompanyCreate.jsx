import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        alert(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-4xl w-full mx-auto bg-white p-8 shadow-lg rounded-2xl border border-gray-300">
          <div className="mb-6">
            <button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-gray-200 transition cursor-pointer mb-5"
            >
              <ArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="font-bold text-2xl text-[#B45AE7]">
              Your Company Name
            </h1>
            <p className="text-gray-500">
              What would you like to give your company name? You can change this
              later.
            </p>
          </div>
          {/* Label */}
          <label className="block font-medium text-[#A45DE6]">
            Company Name
          </label>
          <input
            type="text"
            className="my-2 p-3 w-full border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#C97CF8] shadow-sm"
            placeholder="Hire_Up, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {/* Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl shadow hover:bg-gray-400 transition"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#C97CF8] to-[#A45DE6] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
              onClick={registerNewCompany}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
