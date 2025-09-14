import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import Avatar from "../Shared/Avatar";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <table className="w-full shadow-md">
        <caption className="text-gray-600 text-sm py-3 font-medium bg-white opacity-70 mt-10">
          A list of your recently posted jobs
        </caption>
        <thead className="bg-[#C97CF8] text-white">
          <tr>
            <th className="px-6 py-3 text-left rounded-tl-2xl border-r border-gray-300">
              Company Name
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Role
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Date
            </th>
            <th className="px-6 py-3 text-right rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs?.map((job) => (
            <tr
              key={job._id}
              className="border border-gray-300 hover:bg-gray-100 transition"
            >
              <td className="px-6 py-3 flex items-center gap-3">
                <Avatar
                  src={job?.company?.logo}
                  alt={job?.company?.name}
                  className="w-10 h-10"
                />
                {job?.company?.name}
              </td>
              <td className="px-6 py-3 font-medium">{job?.title}</td>
              <td className="px-6 py-3 text-gray-600">
                {job?.createdAt.split("T")[0]}
              </td>
              <td className="px-6 py-3 text-right relative">
                <div className="inline-block cursor-pointer group">
                  <MoreHorizontal className="inline-block text-gray-500 hover:text-gray-700 transition" />
                  <div className="hidden absolute right-0 w-36 bg-white border border-gray-200 rounded-lg shadow-md p-2 group-hover:block transition-opacity duration-300 z-50">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg"
                    >
                      <Edit2 className="w-4 text-[#C97CF8]" />
                      <span className="text-gray-700">Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg mt-2"
                    >
                      <Eye className="w-4 text-[#C97CF8]" />
                      <span className="text-gray-700">Applicants</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;
