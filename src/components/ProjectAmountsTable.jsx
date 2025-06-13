import React from "react";

const ProjectAmountsTable = ({ plan, status, plType }) => {
  const amountsTypeOptions = [
    "Select",
    "Materials",
    "Subcontractors",
    "Materials Handling",
    "Travel",
    "Consultants",
    "Other Direct Costs",
  ];

  const idTypeOptions = [
    "Select",
    "Contract Employee",
    "General Labor Category",
    "Generic Staff",
    "Key Entry",
  ];

  const isEditable = status === "Working";

  return (
    <div className="space-y-4 font-inter">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-300">
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Line
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Hide Row
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Amounts Type
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                ID Type
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                ID
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Name
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Explanation
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Acct ID
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Org ID
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                GLC/PLC
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Rev
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Brd
              </th>
              <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder row */}
            <tr className="border-b border-gray-300 hover:bg-gray-50">
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200">
                <input
                  type="checkbox"
                  readOnly
                  className={`cursor-pointer ${
                    !isEditable ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={!isEditable}
                />
              </td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200">
                <select
                  className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                    !isEditable ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                  disabled={!isEditable}
                  defaultValue={plType || "Select"}
                >
                  {amountsTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200">
                <select
                  className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
                    !isEditable ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                  disabled={!isEditable}
                  defaultValue="Select"
                >
                  {idTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
              <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectAmountsTable;