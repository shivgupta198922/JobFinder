import React, { useEffect } from "react";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Shared/Header";
import Hero from "../components/Home/Hero";
import Marquee from "../components/Home/Marqee";
import LatestJobs from "../components/Home/LatestJobs";
import Footer from "../components/Shared/Footer";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
