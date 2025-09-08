import Image from "next/image";
import React from "react";

interface Item {
    title: string;
    amount: string;
    icon: string | React.ElementType;
}

interface SummaryProps {
    data: Item[];
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6"> 
            {data.map(({ title, amount, icon }, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-[#ECECEC] rounded-lg shadow-sm w-full"
                >
                    <div className="w-2/3">
                        <p className="text-sm text-[#000000] font-medium">{title}</p>
                        <h3 className="text-lg md:text-xl text-[#000000] font-semibold">{amount}</h3> 
                    </div>
                    {typeof icon === "string" ? (
                        <Image src={icon} alt={title} className="h-12 w-12 mt-2 " /> 
                    ) : (
                        React.createElement(icon, { className: " mt-2 p-2 rounded-lg h-12 w-12 text-black" })
                    )}
                </div>
            ))}
        </div>
    );
};

export default Summary;
