import React from "react";
import {graphone,graph2,graph3 } from "../../../constants/imagePath";
import Image from "next/image";
interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  isPositive: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  subtitle
}) => {
  // Dynamically set the value text size based on the title
  const valueTextSize = title === "Total Users" ? "text-sm" : "text-2xl";
  const valueordertext = title === "Total Orders" ? "text-3xl" : "text-2xl";



  return (
    <div
      className=" shadow-md  border border-gray-300 rounded-lg p-4 "
      style={{
        width: "410px",
        height: "227px",
        borderRadius: "12px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <h3 className="text-lg font-medium text-[#1F4062] mb-4">{title}</h3>

        {/* Content for "Total Artists" */}
        {title === "Total Artist's" ? (
          <>
            <div className="flex items-center mb-2">
             
              <p className="text-lg text-[#2c5B8C] font-bold">{subtitle}</p>
            </div>

            <div className="flex items-center mb-2">
             
              <p
                className={` ${valueordertext} text-lg text-[#2c5B8C] font-bold`}
              >
                {value}
              </p>
            </div>
          </>
        ) : (
          // Default layout for other cards
          <>
            <p className="text-lg text-[#2c5B8C] font-bold mb-2">{subtitle}</p>
            <div className="flex items-center font-bold mb-2">
              <span className={`${valueTextSize} font-bold text-[#2c5B8C]`}>
                {value}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Graph Image */}
      <div className="flex justify-center items-center mb-8 mr-4">
        <Image
          src={
            title === "Total Orders"
              ? graphone
              : title === "Total Amount (In Rupees)"
              ? graph2
              : graph3
          }
          alt="Graph"
          className="h-[93px] w-[137px]"
        />
      </div>
    </div>
  );
};

export default InsightCard;
