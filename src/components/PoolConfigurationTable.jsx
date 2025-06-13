import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PoolConfigurationTable = () => {
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [groupCodes, setGroupCodes] = useState([]);
  const [groupNames, setGroupNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const groupResponse = await axios.get("https://test-api-3tmq.onrender.com/Orgnization/GetAllPools");
        console.log("Group codes API response:", groupResponse.data);
        const codes = groupResponse.data.map(item => item.code);
        const names = groupResponse.data.reduce((acc, item) => {
          acc[item.code] = item.name;
          return acc;
        }, {});
        setGroupCodes(codes);
        setGroupNames(names);

        const tableResponse = await axios.get("https://test-api-3tmq.onrender.com/Orgnization/GetAccountPools");
        console.log("Table data API response:", tableResponse.data);
        const tableDataRaw = tableResponse.data;

        const mappedData = tableDataRaw.map(row => {
          const mappedRow = { orgId: row.orgId || "", acctId: row.acctId || "" };
          codes.forEach(code => {
            mappedRow[code] = row[code.toUpperCase()] === true;
          });
          return mappedRow;
        });

        setTableData(mappedData);
        setOriginalTableData(mappedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (rowIndex, groupCode) => {
    setTableData(prev => {
      const newData = [...prev];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [groupCode]: !newData[rowIndex][groupCode],
      };
      return newData;
    });
  };

  const handleSave = async () => {
    const requestBody = tableData.map(row => ({
      orgId: row.orgId,
      acctId: row.acctId,
      ...groupCodes.reduce((acc, code) => {
        acc[code] = row[code] || false;
        return acc;
      }, {}),
    }));

    console.log("Sending POST request with body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await axios.post(
        "https://test-api-3tmq.onrender.com/Orgnization/BulkUpSertOrgAccountPoolMapping",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      setOriginalTableData([...tableData]);
      setError(null);
      toast.success("Data saved successfully");
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to update pool mapping";
      setError(errorMessage);
      setTableData([...originalTableData]);
      setTimeout(() => setError(null), 5000);
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-roboto">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 text-sm font-medium">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-3 bg-red-50 rounded-lg font-roboto text-sm font-medium shadow-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 max-w-6xl mx-auto font-roboto bg-gray-50 rounded-xl shadow-md">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 bg-blue-50 py-2 px-4 rounded-lg">Pool Configuration</h2>
      <div className="mb-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm shadow-sm transition-all duration-200"
        >
          Save
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-50">
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 text-left text-gray-800 font-semibold text-sm whitespace-nowrap border-r border-gray-200">
                Org ID
              </th>
              <th className="py-2 px-3 text-left text-gray-800 font-semibold text-sm whitespace-nowrap border-r border-gray-200">
                Account ID
              </th>
              {groupCodes.map((code, index) => (
                <th
                  key={index}
                  className="py-2 px-3 text-left text-gray-800 font-semibold text-sm whitespace-nowrap border-r border-gray-200"
                >
                  {groupNames[code] || code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-2 px-3 text-gray-600 text-xs font-medium whitespace-nowrap border-r border-gray-200">
                  {row.orgId}
                </td>
                <td className="py-2 px-3 text-gray-600 text-xs font-medium whitespace-nowrap border-r border-gray-200">
                  {row.acctId}
                </td>
                {groupCodes.map((code, idx) => (
                  <td key={idx} className="py-2 px-3 border-r border-gray-200">
                    <input
                      type="checkbox"
                      checked={row[code] === true}
                      onChange={() => handleCheckboxChange(index, code)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolConfigurationTable;