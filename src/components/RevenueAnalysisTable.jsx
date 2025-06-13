import React, { useEffect, useState } from "react";
import axios from "axios";

const columnLabels = {
  emplId: "Employee ID",
  totalForecastedHours: "Forecasted Hours",
  perHourRate: "Per Hour Rate",
  totalForecastedCost: "Forecasted Cost",
  burdenCost: "Burden Cost (Total + Burden)",
  tnmRevenue: "T&M Revenue",
  cpffRevenue: "CPFF Revenue",
  plcCode: "PLC Code",
};

const formatCurrency = (value) => {
  if (value == null || value === "") return "N/A"; 
  const numValue = Number(value);
  if (isNaN(numValue)) return "N/A";
  return numValue.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const RevenueAnalysisTable = ({ planId, status, style, plType }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!planId) {
      setData(null);
      setLoading(false);
      setError("No plan selected.");
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .get(
        `https://test-api-3tmq.onrender.com/Forecast/CalculateCost?planID=${planId}&templateId=1&type=TARGET`
      )
      .then((res) => {
        
        const correctedData = {
          ...res.data,
          totalBurdenCost: res.data.totalBurdenCost ?? 0, 
          employeeForecastSummary: res.data.employeeForecastSummary?.map((row) => ({
            ...row,
            burdenCost: row.totalBurdonCost ?? row.burdonCost ?? row.burdenCost ?? 0, 
          })) || [],
        };
        setData(correctedData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch revenue analysis data");
        setLoading(false);
      });
  }, [planId]);

  if (loading) {
    return (
      <div className="p-4 font-inter text-sm text-gray-600">
        Loading Revenue Analysis...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 font-inter text-sm text-red-600">{error}</div>
    );
  }
  if (!data || !data.employeeForecastSummary || data.employeeForecastSummary.length === 0) {
    return (
      <div className="p-4 font-inter text-sm text-gray-600">
        No Revenue Analysis data found.
      </div>
    );
  }

  const rows = data.employeeForecastSummary;
  const totals = {
    totalForecastedCost: data.totalCost,
    burdenCost: data.totalBurdenCost,
    tnmRevenue: data.tnmRevenue,
    cpffRevenue: data.cpffRevenue,
  };

  return (
    <div className="p-4 font-inter">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Revenue Analysis
      </h2>
      <div className="overflow-x-auto" style={style}>
        <table className="min-w-full text-sm text-left border-collapse border border-gray-300 bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              {Object.keys(columnLabels).map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 border border-gray-200 font-medium text-xs text-gray-900"
                >
                  {columnLabels[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.emplId || idx}
                className="even:bg-gray-50 hover:bg-blue-50 transition border-b border-gray-200"
              >
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {row.emplId || "N/A"}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {row.totalForecastedHours || "0"}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {formatCurrency(row.perHourRate)}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {formatCurrency(row.totalForecastedCost)}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {formatCurrency(row.burdenCost)}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {formatCurrency(row.tnmRevenue)}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {formatCurrency(row.cpffRevenue)}
                </td>
                <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-700">
                  {row.plcCode || "N/A"}
                </td>
              </tr>
            ))}
            <tr className="bg-yellow-100 font-semibold">
              <td
                className="py-2 px-3 border-r border-gray-200 text-sm text-gray-800"
                colSpan={3}
              >
                Total
              </td>
              <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-800">
                {formatCurrency(totals.totalForecastedCost)}
              </td>
              <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-800">
                {formatCurrency(totals.burdenCost)}
              </td>
              <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-800">
                {formatCurrency(totals.tnmRevenue)}
              </td>
              <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-800">
                {formatCurrency(totals.cpffRevenue)}
              </td>
              <td className="py-2 px-3 border-r border-gray-200 text-sm text-gray-800"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueAnalysisTable;