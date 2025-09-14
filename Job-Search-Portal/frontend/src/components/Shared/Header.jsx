import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";


const Header = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Logout Handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 shadow-md bg-white">
      <Logo />

      <nav className="flex items-center space-x-6">
        {/* Recruiter Links */}
        {user && user.role === "recruiter" ? (
          <>
            <NavLink
              to="/admin/companies"
              className={`text-lg font-semibold ${
                location.pathname.startsWith("/admin/companies")
                  ? "underline text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Companies
            </NavLink>
            <NavLink
              to="/admin/jobs"
              className={`text-lg font-semibold ${
                location.pathname.startsWith("/admin/jobs")
                  ? "underline text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Jobs
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={`text-lg font-semibold ${
                location.pathname === "/"
                  ? "underline text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={`text-lg font-semibold ${
                location.pathname.startsWith("/jobs")
                  ? "underline text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Jobs
            </NavLink>
            
            <NavLink
  to="/about"
  className={`text-lg font-semibold ${
    location.pathname.startsWith("/about")
      ? "underline text-black"
      : "text-gray-500 hover:text-black"
  }`}
>
  About Us
</NavLink>
<NavLink
  to="/contact"
  className={`text-lg font-semibold ${
    location.pathname.startsWith("/contact")
      ? "underline text-black"
      : "text-gray-500 hover:text-black"
  }`}
>
  Contact Us
</NavLink>
          </>
          
        )}

        {/* Authentication Section */}
        {!user ? (
          <>
            <Link to="/login">
              <button className="bg-gradient-to-r from-[#D280F7] to-[#8A52FF] text-white px-4 py-2 h-[44px] w-[138px] rounded-full cursor-pointer text-lg hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gradient-to-r from-[#D280F7] to-[#8A52FF] text-white px-4 py-2 h-[44px] w-[138px] rounded-full cursor-pointer text-lg hover:scale-105">
                Signup
              </button>
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <Avatar
              className="w-10 h-10"
              src={user?.profile?.profilePhoto}
              alt={user?.fullname}
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar
                    className="w-10 h-10"
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                {user.role === "student" && (
                  <>
                    <Link
                      to="/profile"
                      className="block p-2 text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/bookmark"
                      className="block p-2 text-gray-700 hover:bg-gray-100"
                    >
                      Bookmarked
                    </Link>
                  </>
                )}
                <button
                  onClick={logoutHandler}
                  className="w-full text-left p-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
