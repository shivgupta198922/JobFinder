import { useState, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/constant";

// Lazy load components
const Logo = lazy(() => import("../Shared/Logo"));

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: null,
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phone);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);

    if (formData.file) {
      formDataToSend.append("file", formData.file); // Ensure file key matches backend
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed!";
      window.alert(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Input fields configuration
  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      name: "fullName",
      placeholder: "Enter your full name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phone",
      placeholder: "Enter your phone number",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url(./auth/bg_img.png)] p-6">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-3xl max-h-[90vh] p-6 gap-6">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-purple-200 p-4 bg-cover bg-center rounded-2xl">
          <img
            src="./auth/signup.webp"
            alt="signup-illustration"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-2/3">
          {/* Sign Up Title and Lazy Loaded Logo */}
          <div className="flex items-center w-full mb-4">
            <div className="flex-grow">
              <h2 className="text-2xl text-[#000000] font-bold">Sign Up</h2>
            </div>
            <Suspense
              fallback={
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              }
            >
              <Logo className="h-10 w-auto ml-4" />
            </Suspense>
          </div>

          <form
            className="mt-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Dynamically Rendered Input Fields */}
            {inputFields.map((field, index) => (
              <div key={index} className="mb-3">
                <label className="block text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            ))}

            {/* Role Selection & Profile Upload */}
            <div className="mb-3 flex items-center gap-6">
              {/* Radio Buttons */}
              <div className="flex gap-4">
                {["student", "recruiter"].map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </label>
                ))}
              </div>

              {/* Profile Upload */}
              <div className="flex items-center gap-1">
                <label className="text-black font-medium text-sm">
                  Profile
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="border rounded px-1 py-0.5 w-28 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
