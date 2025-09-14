import React, { useState } from "react";
import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/contact`, formData);
      if (response.data.success) {
        setSuccess("Message sent successfully! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" }); // reset form
      }
    } catch (error) {
      setSuccess("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="5"
              className="w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
