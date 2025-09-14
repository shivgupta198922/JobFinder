import React from "react";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Us
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Welcome to <span className="font-semibold text-blue-600">JobSearch Portal</span> — 
            your trusted platform for connecting job seekers and recruiters. 
            We are passionate about empowering careers and helping companies find top talent effortlessly.
          </p>
          <p className="text-gray-600 text-lg mb-8">
            Our mission is simple: <span className="font-semibold text-blue-600">Bridge the gap</span> between opportunities and talent across the globe.
            We ensure that whether you're looking for your dream job or the perfect candidate, you find it here.
          </p>
          <p className="text-gray-600 text-lg">
            Built with ❤️ by a passionate team, our platform focuses on simplicity, speed, and trust.
            Thank you for making us a part of your career journey!
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
