import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";

const shortlistingStatus = [
  {
    label: "Accepted",
    icon: <CheckCircle className="w-5 h-5 text-green-600 mr-2" />,
  },
  {
    label: "Rejected",
    icon: <XCircle className="w-5 h-5 text-red-600 mr-2" />,
  },
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <table className="w-full shadow-md rounded-lg">
        <caption className="text-gray-600 text-sm py-3 font-medium bg-white opacity-70 mt-10">
          Recent Applied Users
        </caption>
        <thead className="bg-[#C97CF8] text-white">
          <tr>
            <th className="px-6 py-3 text-left rounded-tl-2xl border-r border-gray-300">
              Full Name
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Email
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Contact
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Resume
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Date
            </th>
            <th className="px-6 py-3 text-right rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants?.applications?.map((item) => (
            <tr
              key={item._id}
              className="border border-gray-300 hover:bg-gray-100 transition"
            >
              <td className="px-6 py-3">{item?.applicant?.fullname}</td>
              <td className="px-6 py-3">{item?.applicant?.email}</td>
              <td className="px-6 py-3">{item?.applicant?.phoneNumber}</td>
              <td className="px-6 py-3">
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </td>
              <td className="px-6 py-3">
                {item?.applicant?.createdAt.split("T")[0]}
              </td>
              {/* Action Dropdown */}
              <td className="px-6 py-3 text-right relative">
                <div className="inline-block cursor-pointer group relative">
                  <MoreHorizontal className="inline-block text-gray-500 hover:text-gray-700 transition" />
                  <div
                    className="hidden absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 
                    rounded-lg shadow-md p-2 group-hover:block transition-opacity duration-300 z-50"
                  >
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status.label, item?._id)}
                        className="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg text-gray-700"
                      >
                        {status.icon}
                        {status.label}
                      </div>
                    ))}
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

export default ApplicantsTable;
