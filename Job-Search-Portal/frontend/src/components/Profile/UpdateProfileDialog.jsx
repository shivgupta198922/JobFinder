import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    // ✅ Append file only if a new file was uploaded
    if (input.file instanceof File) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 mx-auto">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4 text-[#C97CF8]">
          Update Profile
        </h2>
        <form onSubmit={submitHandler}>
          {[
            { label: "Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Number", name: "phoneNumber", type: "text" },
            { label: "Bio", name: "bio", type: "text" },
            { label: "Skills", name: "skills", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={input[name]}
                onChange={changeEventHandler}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#C97CF8]"
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Resume
            </label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#C97CF8]"
            />
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C97CF8] text-white rounded hover:bg-[#B16AE2]"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UpdateProfileDialog;
