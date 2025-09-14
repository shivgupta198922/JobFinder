import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../Shared/Avatar";
import { FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs(); // ✅ Fetch applied jobs on mount

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="bg-blue-100 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto mt-32 mb-16 relative">
        <div className="flex items-center gap-8">
          {/* Profile Photo */}
          <Avatar
            src={user?.profile?.avatar || "/profile.svg"}
            className="w-28 h-28 rounded-full object-cover"
          />

          {/* Profile Details */}
          <div>
            <h2 className="text-2xl font-bold">
              {user?.fullname || "User Name"}
            </h2>
            <p className="text-gray-700 text-lg">
              {user?.profile?.bio || "Add a bio"}
            </p>
          </div>

          {/* Edit Icon */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="absolute top-6 right-6 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FaEdit size={24} />
          </button>
        </div>

        {/* Contact Details */}
        <div className="mt-8 space-y-4 text-gray-800 text-lg">
          <div className="flex items-center gap-4">
            <FaEnvelope size={18} />
            <span>{user?.email || "No Email"}</span>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone size={18} />
            <span>{user?.phoneNumber || "No Phone Number"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Skills</h3>
          <div className="flex gap-4 mt-4 flex-wrap">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-200 text-purple-800 text-base font-semibold px-5 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Resume</h3>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg"
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <p className="text-gray-600 text-lg">No Resume Uploaded</p>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <AppliedJobTable />

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
};

export default Profile;
