import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";
import Avatar from "../Shared/Avatar";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      {" "}
      <table className="w-full shadow-md">
        <caption className="text-gray-600 text-sm py-3 font-medium bg-white opacity-70 mt-10">
          Recent Registered Companies
        </caption>
        <thead className="bg-[#C97CF8] text-white">
          <tr>
            <th className="px-6 py-3 text-left rounded-tl-2xl border-r border-gray-300">
              Logo
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Name
            </th>
            <th className="px-6 py-3 text-left border-r border-gray-300">
              Date
            </th>
            <th className="px-6 py-3 text-right rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany?.map((company) => (
            <tr
              key={company._id}
              className="border border-gray-300 hover:bg-gray-100 transition"
            >
              <td className="px-6 py-3">
                <Avatar
                  src={company.logo}
                  alt={company.name}
                  className="w-10 h-10"
                />
              </td>
              <td className="px-6 py-3 font-medium">{company.name}</td>
              <td className="px-6 py-3 text-gray-600">
                {company.createdAt.split("T")[0]}
              </td>
              <td className="px-6 py-3 text-right relative">
                <div className="inline-block cursor-pointer group">
                  <MoreHorizontal className="inline-block text-gray-500 hover:text-gray-700 transition" />
                  <div className="hidden absolute right-0 w-36 bg-white border border-gray-200 rounded-lg shadow-md p-2 group-hover:block transition-opacity duration-300 z-50">
                    {/* This popup will now properly overlap the table */}
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg"
                    >
                      <Edit2 className="w-4 text-[#C97CF8]" />
                      <span className="text-gray-700">Edit</span>
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

export default CompaniesTable;
