import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "All",
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Chennai",
      "Mumbai",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "FullStack Developer",
      "Nextjs Developer",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (selectedValue) {
      dispatch(setSearchedQuery(selectedValue === "All" ? "" : selectedValue));
    }
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-[#FBF9F5] p-4 rounded-lg shadow-md w-72 mt-25 mb-25 ml-5">
      <h2 className="text-lg font-semibold">Filter Jobs</h2>
      <hr className="my-2" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-medium">{data.filterType}</h3>
          {data.array.map((item, idx) => (
            <label key={idx} className="flex items-center space-x-2 my-1">
              <input
                type="radio"
                name={data.filterType.toLowerCase()}
                value={item}
                className="accent-black"
                checked={selectedValue === item}
                onChange={changeHandler}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
