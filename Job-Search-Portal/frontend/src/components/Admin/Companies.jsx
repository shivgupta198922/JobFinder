import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto mt-10 pt-16">
        <div className="flex items-center justify-between mb-5">
          {/* Improved Input Field */}
          <input
            type="text"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl outline-none shadow-md focus:ring-2 focus:ring-[#C97CF8] focus:border-[#C97CF8] transition"
          />
          {/* Gradient Button */}
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="px-6 py-3 bg-gradient-to-r from-[#C97CF8] to-[#A45DE6] text-white rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            New Company
          </button>
        </div>
        <CompaniesTable />
      </div>
      <Footer />
    </div>
  );
};

export default Companies;
