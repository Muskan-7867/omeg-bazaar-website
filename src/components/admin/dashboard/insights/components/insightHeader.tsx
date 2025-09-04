import React from "react";

interface InsightsHeaderProps {
  title: string;
  yearOptions: string[];
  monthOptions: string[];
}

const InsightsHeader: React.FC<InsightsHeaderProps> = ({
  title,
  yearOptions,
  monthOptions,
}) => {
  return (
    <div className="flex justify-between items-center mb-2 p-2 bg-gradient-to-r  rounded-lg ">
      <h2 className="text-[20px] font-medium  ">{title}</h2>
      <div className="flex space-x-4 border border-[#AAD9F9] pr-4 rounded-lg" >
        <select className="rounded-lg px-4 py-2 text-[#2C5B8C] text-sm bg-[#FFFFFF] hover:border-none  focus:outline-none">
          {yearOptions.map((year, index) => (
            <option key={index} value={year} >
              {year}
            </option>
          ))}
        </select>
        <select className=" rounded-lg px-4 py-2 text-sm text-[#2C5B8C] bg-[#FFFFFF]  hover:border-none  focus:outline-none">
          {monthOptions.map((month, index) => (
            <option key={index} value={month} >
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InsightsHeader;