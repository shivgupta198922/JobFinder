import { useState, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

// Lazy load components
const Logo = lazy(() => import("../Shared/Logo"));

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      window.alert(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url(./auth/bg_img.png)] p-6">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-3xl max-h-[90vh] p-6 gap-6">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center p-4 bg-cover bg-center rounded-2xl">
          <img
            src="./auth/login.webp"
            alt="login-illustration"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-2/3">
          {/* Login Title and Lazy Loaded Logo */}
          <div className="flex items-center w-full mb-4">
            <h2 className="text-2xl text-[#000000] font-bold flex-grow">
              Login
            </h2>
            <Suspense
              fallback={
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              }
            >
              <Logo className="h-10 w-auto ml-4" />
            </Suspense>
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Radio Buttons */}
            <div className="mb-3 flex gap-4">
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

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#0075E9] font-semibold cursor-pointer"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
