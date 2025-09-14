import React from "react";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-gray-300 text-gray-700";
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-purple-100 p-6 rounded-3xl shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-200 text-left">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Job Role</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs.length > 0 ? (
              allAppliedJobs.map((job) => (
                <tr key={job._id} className="border-t border-purple-300">
                  <td className="py-3 px-4">
                    {job?.createdAt?.split("T")[0] || "N/A"}
                  </td>
                  <td className="py-3 px-4">{job.job?.title || "N/A"}</td>
                  <td className="py-3 px-4">
                    {job.job?.company?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        job.status
                      )}`}
                    >
                      {job.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-600">
                  You haven't applied for any jobs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
