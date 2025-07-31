import React, { useState, useEffect } from "react";
import axios from "axios";

const applyToRBAOptions = [
  { value: "R", label: "Revenue" },
  { value: "B", label: "Billing" },
  { value: "A", label: "All" },
  { value: "N", label: "None" },
];

const CostFeeOverrideDetails = ({ projectId, isSearched, updatedBy = "user" }) => {
  const [accounts, setAccounts] = useState([]);
  const [costFeeOverrides, setCostFeeOverrides] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [lastSearchedProjectId, setLastSearchedProjectId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validate projectId format (e.g., "PROJ123")
  const isValidProjectId = (id) => id && /^PROJ\d{3}$/.test(id);

  useEffect(() => {
    let isMounted = true;
    const fetchAccounts = async () => {
      if (isSearched && isValidProjectId(projectId)) {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
          );
          if (isMounted) {
            setAccounts(res.data || []);
            // Initialize cost fee overrides based on accounts
            const initialOverrides = (res.data || []).map(account => ({
              accountId: account.acctId,
              accountName: account.acctName,
              feePercent: "0.000000%",
              functionalCurrencyFeeOnHours: "0.0000",
              applyToRbaCode: "A",
            }));
            setCostFeeOverrides(initialOverrides);
            setLastSearchedProjectId(projectId);
            setHasSearched(true);
          }
        } catch {
          if (isMounted) {
            setAccounts([]);
            setCostFeeOverrides([]);
            setLastSearchedProjectId(projectId);
            setHasSearched(true);
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      } else if (isMounted) {
        setAccounts([]);
        setCostFeeOverrides([]);
        setLastSearchedProjectId("");
        setHasSearched(false);
        setIsLoading(false);
      }
    };
    fetchAccounts();
    return () => { isMounted = false; };
  }, [isSearched, projectId]);

  // Only show table if last search was valid and not blank
  const shouldShowTable =
    hasSearched && isValidProjectId(lastSearchedProjectId);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditRow({
      accountId: costFeeOverrides[index].accountId,
      functionalCurrencyFeeOnHours: costFeeOverrides[index].functionalCurrencyFeeOnHours,
      applyToRbaCode: costFeeOverrides[index].applyToRbaCode,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (index) => {
    const updatedRow = {
      ...costFeeOverrides[index],
      accountId: editRow.accountId,
      functionalCurrencyFeeOnHours: editRow.functionalCurrencyFeeOnHours,
      applyToRbaCode: editRow.applyToRbaCode,
    };
    const updatedOverrides = [...costFeeOverrides];
    updatedOverrides[index] = updatedRow;
    setCostFeeOverrides(updatedOverrides);
    setEditIndex(null);
    setEditRow({});
    // Note: This is UI-only update; actual API call would be needed for persistence
  };

  const handleDelete = (index) => {
    const updatedOverrides = costFeeOverrides.filter((_, i) => i !== index);
    setCostFeeOverrides(updatedOverrides);
    setEditIndex(null);
    setEditRow({});
    // Note: This is UI-only delete; actual API call would be needed for persistence
  };

  if (!shouldShowTable) {
    return (
      <div className="text-gray-600">
        Please search for a project to view details.
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Cost Fee Override Details
        </h2>
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : costFeeOverrides.length === 0 ? (
          <p className="text-gray-600">No data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Account</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Account Name</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Fee Percent</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Functional Currency Fee on Hours</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Apply to R/B/A</th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {costFeeOverrides.map((override, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <select
                          name="accountId"
                          value={editRow.accountId}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        >
                          {accounts.map((account) => (
                            <option key={account.acctId} value={account.acctId}>
                              {account.acctId}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-normal">{override.accountId}</span>
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">{override.accountName}</td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">{override.feePercent}</td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <input
                          type="text"
                          name="functionalCurrencyFeeOnHours"
                          value={editRow.functionalCurrencyFeeOnHours}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        />
                      ) : (
                        <span className="font-normal">{override.functionalCurrencyFeeOnHours}</span>
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <select
                          name="applyToRbaCode"
                          value={editRow.applyToRbaCode}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        >
                          {applyToRBAOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-normal">{override.applyToRbaCode}</span>
                      )}
                    </td>
                    <td className="px-2 py-1">
                      {editIndex === index ? (
                        <button
                          onClick={() => handleUpdate(index)}
                          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                        >
                          Update
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(index)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs mr-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostFeeOverrideDetails;