import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto mt-10 pt-16 px-4">
        {" "}
        <h1 className="font-bold text-xl text-[#C97CF8] mb-5">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <div className="flex items-center justify-between mb-5">
          {/* Improved Input Field */}
          <input
            type="text"
            placeholder="Filter applicants"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-3 w-full max-w-md border border-gray-300 rounded-xl outline-none shadow-md focus:ring-2 focus:ring-[#C97CF8] focus:border-[#C97CF8] transition"
          />
          {/* Gradient Button */}
          <button
            onClick={() => console.log("Filtering Applicants...")}
            className="px-6 py-3 bg-gradient-to-r from-[#C97CF8] to-[#A45DE6] text-white rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 ml-4"
          >
            Search
          </button>
        </div>
        <ApplicantsTable />
      </div>
      <Footer />
    </div>
  );
};

export default Applicants;
