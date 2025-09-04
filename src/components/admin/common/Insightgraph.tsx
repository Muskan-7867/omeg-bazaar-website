import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface InsightgraphProps {
  data: {
    month: string;
    monthlyUsers: number;
    orders: number;
    amount: number;
  }[];
}

const Insightgraph: React.FC<InsightgraphProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-gray-800">User Statistics</h2>
       
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="monthlyUsers"
            stroke="#ffc107"
            strokeWidth={2}
            name="Monthly Users"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#2196f3"
            strokeWidth={2}
            name="Orders"
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4caf50"
            name="Total Amount (₹)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

 
    </div>
  );
};

export default Insightgraph;
