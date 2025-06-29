// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DirectCostCeilings = ({ projectId, isSearched, updatedBy = "user" }) => {
//   const [accounts, setAccounts] = useState([]);
//   const [directCostCeilings, setDirectCostCeilings] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   // New row state
//   const [showNewRow, setShowNewRow] = useState(false);
//   const [newRow, setNewRow] = useState({
//     accountId: "",
//     ceilingAmountFunc: "",
//   });

//   // Edit row state
//   const [editIndex, setEditIndex] = useState(null);
//   const [editRow, setEditRow] = useState({});

//   // Validate projectId format (e.g., "PROJ\d{3}")
//   const isValidProjectId = (id) => id && id.match(/^PROJ\d{3}$/);

//   // Fetch all accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       if (isSearched && projectId) {
//         try {
//           const res = await axios.get(
//             `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
//           );
//           setAccounts(res.data || []);
//         } catch {
//           setAccounts([]);
//         }
//       } else {
//         setAccounts([]);
//       }
//     };
//     fetchAccounts();
//   }, [projectId, isSearched]);

//   // Fetch direct cost ceilings
//   useEffect(() => {
//     const fetchDirectCostCeilings = async () => {
//       if (isSearched && projectId) {
//         try {
//           const res = await axios.get(
//             `https://test-api-3tmq.onrender.com/Project/GetAllCeilingAmtForDirectCost?projId=${projectId}`
//           );
//           setDirectCostCeilings(res.data?.data || []);
//           setIsDataFetched(true);
//         } catch {
//           setDirectCostCeilings([]);
//           setIsDataFetched(true);
//         }
//       } else {
//         setDirectCostCeilings([]);
//         setIsDataFetched(false);
//       }
//       setShowNewRow(false);
//     };
//     fetchDirectCostCeilings();
//   }, [projectId, isSearched]);

//   // Show new row
//   const handleNewClick = () => {
//     setShowNewRow(true);
//     setNewRow({
//       accountId: "",
//       ceilingAmountFunc: "",
//     });
//   };

//   // Handle new row changes
//   const handleNewChange = (e) => {
//     const { name, value } = e.target;
//     setNewRow((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save new direct cost ceiling
//   const handleSave = async () => {
//     if (!newRow.accountId || !newRow.ceilingAmountFunc) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     if (!updatedBy) {
//       alert("updatedBy is required. Please provide a user name.");
//       return;
//     }
//     const requestBody = {
//       projectId,
//       accountId: newRow.accountId,
//       ceilingAmountFunc: parseFloat(newRow.ceilingAmountFunc) || 0,
//       ceilingAmountBilling: 0, // Removed from UI, set to 0
//       applyToRbaCode: "R", // Default to Revenue as per dropdown
//     };
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/CreateCeilingAmtForDirectCost?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllCeilingAmtForDirectCost?projId=${projectId}`
//       );
//       setDirectCostCeilings(res.data?.data || []);
//       setShowNewRow(false);
//       setNewRow({
//         accountId: "",
//         ceilingAmountFunc: "",
//       });
//     } catch (err) {
//       alert("Failed to save. Please check your input and try again.");
//     }
//   };

//   // Edit row handlers
//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditRow({
//       ceilingAmountFunc: directCostCeilings[index].ceilingAmountFunc,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditRow((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (index) => {
//     const row = directCostCeilings[index];
//     const requestBody = {
//       projectId: row.projectId,
//       accountId: row.accountId,
//       ceilingAmountFunc: parseFloat(editRow.ceilingAmountFunc) || 0,
//       ceilingAmountBilling: 0, // Removed from UI, set to 0
//       applyToRbaCode: "R", // Default to Revenue as per dropdown
//     };
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Project/UpdateCeilingAmtForDirectCost?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllCeilingAmtForDirectCost?projId=${projectId}`
//       );
//       setDirectCostCeilings(res.data?.data || []);
//       setEditIndex(null);
//       setEditRow({});
//     } catch {
//       // handle error
//     }
//   };

//   // UI-only delete
//   const handleDeleteUI = (index) => {
//     setDirectCostCeilings((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Cancel new row
//   const handleCancelNewRow = () => {
//     setShowNewRow(false);
//     setNewRow({
//       accountId: "",
//       ceilingAmountFunc: "",
//     });
//   };

//   if (!isSearched) {
//     return (
//       <div className="text-gray-600">
//         Please search for a project to view details.
//       </div>
//     );
//   }

//   return (
//     <div className="animate-fade-in">
//       <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-gray-900 mb-2">
//             Direct Cost Ceilings
//           </h2>
//           <button
//             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
//             onClick={handleNewClick}
//           >
//             New
//           </button>
//         </div>
//         {directCostCeilings.length === 0 && !showNewRow ? (
//           <p className="text-gray-600">No data available.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-gray-100 border-b border-gray-200">
//                 <tr>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Account
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Account Name
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Functional Currency Ceiling Amount
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewRow && (
//                   <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
//                     <td className="px-2 py-1">
//                       <select
//                         name="accountId"
//                         value={newRow.accountId}
//                         onChange={handleNewChange}
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                       >
//                         <option value="">-- Select Account --</option>
//                         {accounts.map((account) => (
//                           <option key={account.acctId} value={account.acctId}>
//                             {account.acctId}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {accounts.find((a) => a.acctId === newRow.accountId)
//                         ?.acctName || ""}
//                     </td>
//                     <td className="px-2 py-1">
//                       <input
//                         type="text"
//                         name="ceilingAmountFunc"
//                         value={newRow.ceilingAmountFunc}
//                         onChange={handleNewChange}
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         placeholder="0"
//                       />
//                     </td>
//                     <td className="px-2 py-1 flex gap-1">
//                       <button
//                         onClick={handleSave}
//                         className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancelNewRow}
//                         className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 )}
//                 {directCostCeilings.map((ceiling, index) => (
//                   <tr
//                     key={index}
//                     className="bg-white border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {ceiling.accountId}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {accounts.find((a) => a.acctId === ceiling.accountId)
//                         ?.acctName || "N/A"}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           name="ceilingAmountFunc"
//                           value={editRow.ceilingAmountFunc}
//                           onChange={handleEditChange}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         />
//                       ) : (
//                         <span className="font-normal">
//                           {ceiling.ceilingAmountFunc}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-2 py-1 flex gap-1">
//                       {editIndex === index ? (
//                         <button
//                           onClick={() => handleUpdate(index)}
//                           className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//                         >
//                           Update
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteUI(index)}
//                             className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DirectCostCeilings;

import React, { useState, useEffect } from "react";
import axios from "axios";

const DirectCostCeilings = ({ projectId, isSearched, updatedBy = "user" }) => {
  const [accounts, setAccounts] = useState([]);
  const [directCostCeilings, setDirectCostCeilings] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRow, setNewRow] = useState({
    accountId: "",
    ceilingAmountFunc: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [lastSearchedProjectId, setLastSearchedProjectId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validate projectId format (e.g., "PROJ123")
  const isValidProjectId = (id) => id && /^PROJ\d{3}$/.test(id);

  // Fetch all accounts
  useEffect(() => {
    let isMounted = true;
    const fetchAccounts = async () => {
      if (isSearched && isValidProjectId(projectId)) {
        try {
          const res = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
          );
          if (isMounted) setAccounts(res.data || []);
        } catch {
          if (isMounted) setAccounts([]);
        }
      } else if (isMounted) {
        setAccounts([]);
      }
    };
    fetchAccounts();
    return () => { isMounted = false; };
  }, [isSearched, projectId]);

  // Fetch direct cost ceilings
  useEffect(() => {
    let isMounted = true;
    const fetchDirectCostCeilings = async () => {
      if (isSearched && isValidProjectId(projectId)) {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetAllCeilingAmtForDirectCost?projId=${projectId}`
          );
          if (isMounted) {
            setDirectCostCeilings(res.data?.data || []);
            setLastSearchedProjectId(projectId);
            setHasSearched(true);
          }
        } catch {
          if (isMounted) {
            setDirectCostCeilings([]);
            setLastSearchedProjectId(projectId);
            setHasSearched(true);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
            setShowNewRow(false);
          }
        }
      } else if (isMounted) {
        setDirectCostCeilings([]);
        setShowNewRow(false);
        setLastSearchedProjectId("");
        setHasSearched(false);
        setIsLoading(false);
      }
    };
    fetchDirectCostCeilings();
    return () => { isMounted = false; };
  }, [isSearched, projectId]);

  // Only show table if last search was valid and not blank
  const shouldShowTable =
    hasSearched && isValidProjectId(lastSearchedProjectId);

  // Show new row
  const handleNewClick = () => {
    setShowNewRow(true);
    setNewRow({
      accountId: "",
      ceilingAmountFunc: "",
    });
  };

  // Handle new row changes
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  // Save new direct cost ceiling
  const handleSave = async () => {
    if (!newRow.accountId || !newRow.ceilingAmountFunc) {
      alert("Please fill all required fields.");
      return;
    }
    if (!updatedBy) {
      alert("updatedBy is required. Please provide a user name.");
      return;
    }
    const requestBody = {
      projectId: lastSearchedProjectId,
      accountId: newRow.accountId,
      ceilingAmountFunc: parseFloat(newRow.ceilingAmountFunc) || 0,
      ceilingAmountBilling: 0,
      applyToRbaCode: "R",
    };
    try {
      await axios.post(
        `https://test-api-3tmq.onrender.com/Project/CreateCeilingAmtForDirectCost?updatedBy=${updatedBy}`,
        requestBody
      );
      const res = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllCeilingAmtForDirectCost?projId=${lastSearchedProjectId}`
      );
      setDirectCostCeilings(res.data?.data || []);
      setShowNewRow(false);
      setNewRow({
        accountId: "",
        ceilingAmountFunc: "",
      });
    } catch (err) {
      alert("Failed to save. Please check your input and try again.");
    }
  };

  // Edit row handlers
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditRow({
      ceilingAmountFunc: directCostCeilings[index].ceilingAmountFunc,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (index) => {
    const row = directCostCeilings[index];
    const requestBody = {
      projectId: row.projectId,
      accountId: row.accountId,
      ceilingAmountFunc: parseFloat(editRow.ceilingAmountFunc) || 0,
      ceilingAmountBilling: 0,
      applyToRbaCode: "R",
    };
    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/Project/UpdateCeilingAmtForDirectCost?updatedBy=${updatedBy}`,
        requestBody
      );
      const res = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllCeilingAmtForDirectCost?projId=${lastSearchedProjectId}`
      );
      setDirectCostCeilings(res.data?.data || []);
      setEditIndex(null);
      setEditRow({});
    } catch {
      // handle error
    }
  };

  // UI-only delete
  const handleDeleteUI = (index) => {
    setDirectCostCeilings((prev) => prev.filter((_, i) => i !== index));
  };

  // Cancel new row
  const handleCancelNewRow = () => {
    setShowNewRow(false);
    setNewRow({
      accountId: "",
      ceilingAmountFunc: "",
    });
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
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Direct Cost Ceilings
          </h2>
          <button
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
            onClick={handleNewClick}
          >
            New
          </button>
        </div>
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : directCostCeilings.length === 0 && !showNewRow ? (
          <p className="text-gray-600">No data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Account
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Account Name
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Functional Currency Ceiling Amount
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {showNewRow && (
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-2 py-1">
                      <select
                        name="accountId"
                        value={newRow.accountId}
                        onChange={handleNewChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                      >
                        <option value="">-- Select Account --</option>
                        {accounts.map((account) => (
                          <option key={account.acctId} value={account.acctId}>
                            {account.acctId}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {accounts.find((a) => a.acctId === newRow.accountId)
                        ?.acctName || ""}
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        name="ceilingAmountFunc"
                        value={newRow.ceilingAmountFunc}
                        onChange={handleNewChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-2 py-1 flex gap-1">
                      <button
                        onClick={handleSave}
                        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelNewRow}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
                {directCostCeilings.map((ceiling, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {ceiling.accountId}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {accounts.find((a) => a.acctId === ceiling.accountId)
                        ?.acctName || "N/A"}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <input
                          type="text"
                          name="ceilingAmountFunc"
                          value={editRow.ceilingAmountFunc}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        />
                      ) : (
                        <span className="font-normal">
                          {ceiling.ceilingAmountFunc}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-1 flex gap-1">
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
                            className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUI(index)}
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

export default DirectCostCeilings;