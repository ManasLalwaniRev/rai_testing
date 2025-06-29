// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const FISCAL_YEAR_START = 2023;
// // const FISCAL_YEAR_END = 2035;

// // const ceilingMethods = [
// //   { value: "C", label: "Ceiling" },
// //   { value: "O", label: "Override" },
// //   { value: "F", label: "Fixed" },
// // ];
// // const applyToRBAOptions = [
// //   { value: "R", label: "Revenue" },
// //   { value: "B", label: "Billing" },
// //   { value: "A", label: "All" },
// //   { value: "N", label: "None" },
// // ];

// // const BurdenCostCeilingDetails = ({
// //   projectId,
// //   isSearched,
// //   updatedBy = "user",
// // }) => {
// //   const [accounts, setAccounts] = useState([]);
// //   const [pools, setPools] = useState([]);
// //   const [burdenCeilings, setBurdenCeilings] = useState([]);
// //   const [fiscalYear, setFiscalYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [isDataFetched, setIsDataFetched] = useState(false);

// //   // New row state
// //   const [showNewRow, setShowNewRow] = useState(false);
// //   const [newRow, setNewRow] = useState({
// //     accountId: "",
// //     poolCode: "",
// //     rateCeiling: "",
// //     ceilingMethodCode: "",
// //     applyToRbaCode: "",
// //     fiscalYear: new Date().getFullYear().toString(),
// //   });

// //   // Edit row state
// //   const [editIndex, setEditIndex] = useState(null);
// //   const [editRow, setEditRow] = useState({});

// //   // Fiscal year options
// //   const fiscalYearOptions = [];
// //   for (let y = FISCAL_YEAR_START; y <= FISCAL_YEAR_END; y++) {
// //     fiscalYearOptions.push(y.toString());
// //   }

// //   // Helper: check if projectId is valid
// //   const isValidProjectId = (id) => id && id.length > 2;

// //   // Fetch burden ceilings for project and fiscal year
// //   useEffect(() => {
// //     const fetchBurdenCeilings = async () => {
// //       if (isSearched && isValidProjectId(projectId)) {
// //         try {
// //           const res = await axios.get(
// //             `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
// //           );
// //           setBurdenCeilings(res.data?.data || []);
// //           setIsDataFetched(true);
// //         } catch {
// //           setBurdenCeilings([]);
// //           setIsDataFetched(true);
// //         }
// //       } else {
// //         setBurdenCeilings([]);
// //         setIsDataFetched(false);
// //       }
// //       setShowNewRow(false);
// //       setAccounts([]);
// //       setPools([]);
// //     };
// //     fetchBurdenCeilings();
// //     // eslint-disable-next-line
// //   }, [projectId, isSearched]);

// //   // Fetch accounts when "New" is clicked
// //   const handleNewClick = async () => {
// //     if (!isValidProjectId(projectId)) return;
// //     try {
// //       const res = await axios.get(
// //         `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
// //       );
// //       setAccounts(res.data || []);
// //       setShowNewRow(true);
// //       setNewRow({
// //         accountId: "",
// //         poolCode: "",
// //         rateCeiling: "",
// //         ceilingMethodCode: "",
// //         applyToRbaCode: "",
// //         fiscalYear: fiscalYear,
// //       });
// //       setPools([]);
// //     } catch {
// //       setAccounts([]);
// //       setShowNewRow(false);
// //     }
// //   };

// //   // Fetch pools when account is selected in new row
// //   const handleNewAccountChange = async (e) => {
// //     const accountId = e.target.value;
// //     setNewRow((prev) => ({ ...prev, accountId, poolCode: "" }));
// //     if (accountId) {
// //       try {
// //         const res = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Orgnization/GetPoolsByOrgAccount?accountId=${accountId}&orgId=1.02`
// //         );
// //         setPools(res.data || []);
// //       } catch {
// //         setPools([]);
// //       }
// //     } else {
// //       setPools([]);
// //     }
// //   };

// //   // Save new burden ceiling
// //   const handleSave = async () => {
// //     if (
// //       !newRow.accountId ||
// //       !newRow.poolCode ||
// //       !newRow.rateCeiling ||
// //       !newRow.ceilingMethodCode ||
// //       !newRow.applyToRbaCode ||
// //       !newRow.fiscalYear
// //     ) {
// //       alert("Please fill all fields.");
// //       return;
// //     }
// //     if (!updatedBy) {
// //       alert("updatedBy is required. Please provide a user name.");
// //       return;
// //     }
// //     const requestBody = {
// //       projectId,
// //       fiscalYear: newRow.fiscalYear,
// //       accountId: newRow.accountId,
// //       poolCode: newRow.poolCode,
// //       rateCeiling: parseFloat(newRow.rateCeiling) || 0,
// //       rateFormat: "%",
// //       comCeiling: 0,
// //       comFormat: "",
// //       ceilingMethodCode: newRow.ceilingMethodCode,
// //       applyToRbaCode: newRow.applyToRbaCode,
// //     };
// //     try {
// //       await axios.post(
// //         `https://test-api-3tmq.onrender.com/Project/CreateBurdenCeilingForProject?updatedBy=${updatedBy}`,
// //         requestBody
// //       );
// //       // Refresh
// //       const res = await axios.get(
// //         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
// //       );
// //       setBurdenCeilings(res.data?.data || []);
// //       setShowNewRow(false);
// //       setNewRow({
// //         accountId: "",
// //         poolCode: "",
// //         rateCeiling: "",
// //         ceilingMethodCode: "",
// //         applyToRbaCode: "",
// //         fiscalYear: fiscalYear,
// //       });
// //     } catch (err) {
// //       alert("Failed to save. Please check your input and try again.");
// //     }
// //   };

// //   // Edit row handlers
// //   const handleEditClick = (index) => {
// //     setEditIndex(index);
// //     setEditRow({
// //       rateCeiling: burdenCeilings[index].rateCeiling,
// //       applyToRbaCode: burdenCeilings[index].applyToRbaCode,
// //     });
// //   };

// //   const handleEditChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditRow((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleUpdate = async (index) => {
// //     const row = burdenCeilings[index];
// //     const requestBody = {
// //       projectId: row.projectId,
// //       fiscalYear: row.fiscalYear,
// //       accountId: row.accountId,
// //       poolCode: row.poolCode,
// //       rateCeiling: parseFloat(editRow.rateCeiling) || 0,
// //       rateFormat: row.rateFormat,
// //       comCeiling: row.comCeiling,
// //       comFormat: row.comFormat,
// //       ceilingMethodCode: row.ceilingMethodCode,
// //       applyToRbaCode: editRow.applyToRbaCode,
// //     };
// //     try {
// //       await axios.put(
// //         `https://test-api-3tmq.onrender.com/Project/UpdateBurdenCeilingForProject?updatedBy=${updatedBy}`,
// //         requestBody
// //       );
// //       // Refresh
// //       const res = await axios.get(
// //         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
// //       );
// //       setBurdenCeilings(res.data?.data || []);
// //       setEditIndex(null);
// //       setEditRow({});
// //     } catch {
// //       // handle error
// //     }
// //   };

// //   // Fiscal year filter
// //   const filteredCeilings = burdenCeilings.filter(
// //     (c) => c.fiscalYear === fiscalYear
// //   );

// //   if (!isSearched) {
// //     return (
// //       <div className="text-gray-600">
// //         Please search for a project to view details.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="animate-fade-in">
// //       <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
// //         <div className="mb-4">
// //           <h2 className="text-xl font-bold text-gray-900 mb-2">
// //             Burden Cost Ceilings
// //           </h2>
// //           <div className="flex items-center mb-2">
// //             <label className="text-sm font-medium text-gray-700 mr-2">
// //               Project:
// //             </label>
// //             <span className="text-sm text-gray-900">{projectId}</span>
// //             <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
// //             <span className="ml-4 text-sm text-gray-900">Fiscal Year:</span>
// //             <select
// //               className="ml-1 px-2 py-1 border border-gray-300 rounded text-xs"
// //               value={fiscalYear}
// //               onChange={(e) => setFiscalYear(e.target.value)}
// //             >
// //               {fiscalYearOptions.map((y) => (
// //                 <option key={y} value={y}>
// //                   {y}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <button
// //             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
// //             onClick={handleNewClick}
// //           >
// //             New
// //           </button>
// //         </div>
// //         {filteredCeilings.length === 0 ? (
// //           <p className="text-gray-600">
// //             No data available for fiscal year {fiscalYear}.
// //           </p>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-left border-collapse">
// //               <thead className="bg-gray-100 border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Account
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Account Name
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Pool
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Rate Ceiling
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Ceiling Method
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Apply to R/B/A
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Action
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {showNewRow && (
// //                   <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.accountId}
// //                         onChange={handleNewAccountChange}
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                       >
// //                         <option value="">-- Select Account --</option>
// //                         {accounts.map((account) => (
// //                           <option key={account.acctId} value={account.acctId}>
// //                             {account.acctId}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {accounts.find((a) => a.acctId === newRow.accountId)
// //                         ?.acctName || ""}
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.poolCode}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             poolCode: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         disabled={!newRow.accountId}
// //                       >
// //                         <option value="">-- Select Pool --</option>
// //                         {pools.map((pool) => (
// //                           <option key={pool.poolId} value={pool.poolId}>
// //                             {pool.poolId}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <input
// //                         type="text"
// //                         value={newRow.rateCeiling}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             rateCeiling: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         placeholder="0"
// //                       />
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.ceilingMethodCode}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             ceilingMethodCode: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {ceilingMethods.map((method) => (
// //                           <option key={method.value} value={method.value}>
// //                             {method.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.applyToRbaCode}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             applyToRbaCode: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {applyToRBAOptions.map((option) => (
// //                           <option key={option.value} value={option.value}>
// //                             {option.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <button
// //                         onClick={handleSave}
// //                         className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
// //                       >
// //                         Save
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 )}
// //                 {filteredCeilings.map((ceiling, index) => (
// //                   <tr
// //                     key={index}
// //                     className="bg-white border-b border-gray-200 hover:bg-gray-50"
// //                   >
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.accountId}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.accountName ||
// //                         accounts.find((a) => a.acctId === ceiling.accountId)
// //                           ?.acctName ||
// //                         "N/A"}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.poolCode}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {editIndex === index ? (
// //                         <input
// //                           type="text"
// //                           name="rateCeiling"
// //                           value={editRow.rateCeiling}
// //                           onChange={handleEditChange}
// //                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         />
// //                       ) : (
// //                         <span className="font-normal">
// //                           {ceiling.rateCeiling}
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.ceilingMethodCode}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {editIndex === index ? (
// //                         <select
// //                           name="applyToRbaCode"
// //                           value={editRow.applyToRbaCode}
// //                           onChange={handleEditChange}
// //                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         >
// //                           {applyToRBAOptions.map((option) => (
// //                             <option key={option.value} value={option.value}>
// //                               {option.label}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       ) : (
// //                         <span className="font-normal">
// //                           {ceiling.applyToRbaCode}
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       {editIndex === index ? (
// //                         <button
// //                           onClick={() => handleUpdate(index)}
// //                           className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
// //                         >
// //                           Update
// //                         </button>
// //                       ) : (
// //                         <button
// //                           onClick={() => handleEditClick(index)}
// //                           className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
// //                         >
// //                           Edit
// //                         </button>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BurdenCostCeilingDetails;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const FISCAL_YEAR_START = 2023;
// // const FISCAL_YEAR_END = 2035;

// // const ceilingMethods = [
// //   { value: "C", label: "Ceiling" },
// //   { value: "O", label: "Override" },
// //   { value: "F", label: "Fixed" },
// // ];
// // const applyToRBAOptions = [
// //   { value: "R", label: "Revenue" },
// //   { value: "B", label: "Billing" },
// //   { value: "A", label: "All" },
// //   { value: "N", label: "None" },
// // ];

// // const BurdenCostCeilingDetails = ({
// //   projectId,
// //   isSearched,
// //   updatedBy = "user",
// // }) => {
// //   const [accounts, setAccounts] = useState([]);
// //   const [pools, setPools] = useState([]);
// //   const [burdenCeilings, setBurdenCeilings] = useState([]);
// //   const [fiscalYear, setFiscalYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [isDataFetched, setIsDataFetched] = useState(false);

// //   // New row state
// //   const [showNewRow, setShowNewRow] = useState(false);
// //   const [newRow, setNewRow] = useState({
// //     accountId: "",
// //     poolCode: "",
// //     rateCeiling: "",
// //     ceilingMethodCode: "",
// //     applyToRbaCode: "",
// //     fiscalYear: new Date().getFullYear().toString(),
// //   });

// //   // Edit row state
// //   const [editIndex, setEditIndex] = useState(null);
// //   const [editRow, setEditRow] = useState({});

// //   // Fiscal year options
// //   const fiscalYearOptions = [];
// //   for (let y = FISCAL_YEAR_START; y <= FISCAL_YEAR_END; y++) {
// //     fiscalYearOptions.push(y.toString());
// //   }

// //   // // Helper: check if projectId is valid
// //   // const isValidProjectId = (id) => id && id.length > 2;

// //   // Validate projectId format (e.g., "PROJ\d{3}")
// //   const isValidProjectId = (id) => id && id.match(/^PROJ\d{3}$/);

// //   // Fetch all accounts for mapping accountId to accountName
// //   useEffect(() => {
// //     const fetchAllAccounts = async () => {
// //       if (isValidProjectId(projectId)) {
// //         try {
// //           const res = await axios.get(
// //             `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
// //           );
// //           setAccounts(res.data || []);
// //         } catch {
// //           setAccounts([]);
// //         }
// //       } else {
// //         setAccounts([]);
// //       }
// //     };
// //     fetchAllAccounts();
// //   }, [projectId]);

// //   // Fetch burden ceilings for project and fiscal year
// //   useEffect(() => {
// //     const fetchBurdenCeilings = async () => {
// //       if (isSearched && isValidProjectId(projectId)) {
// //         try {
// //           const res = await axios.get(
// //             `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
// //           );
// //           setBurdenCeilings(res.data?.data || []);
// //           setIsDataFetched(true);
// //         } catch {
// //           setBurdenCeilings([]);  
// //           setIsDataFetched(true);
// //         }
// //       } else {
// //         setBurdenCeilings([]);
// //         setIsDataFetched(false);
// //       }
// //       setShowNewRow(false);
// //       setPools([]);
// //     };
// //     fetchBurdenCeilings();
// //     // eslint-disable-next-line
// //   }, [projectId, isSearched]);

// //   // Fetch pools when account is selected in new row
// //   const handleNewAccountChange = async (e) => {
// //     const accountId = e.target.value;
// //     setNewRow((prev) => ({ ...prev, accountId, poolCode: "" }));
// //     if (accountId) {
// //       try {
// //         const res = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Orgnization/GetPoolsByOrgAccount?accountId=${accountId}&orgId=1.02`
// //         );
// //         setPools(res.data || []);
// //       } catch {
// //         setPools([]);
// //       }
// //     } else {
// //       setPools([]);
// //     }
// //   };

// //   // Show new row
// //   const handleNewClick = () => {
// //     setShowNewRow(true);
// //     setNewRow({
// //       accountId: "",
// //       poolCode: "",
// //       rateCeiling: "",
// //       ceilingMethodCode: "",
// //       applyToRbaCode: "",
// //       fiscalYear: fiscalYear,
// //     });
// //     setPools([]);
// //   };

// //   // Save new burden ceiling
// //   const handleSave = async () => {
// //     if (
// //       !newRow.accountId ||
// //       !newRow.poolCode ||
// //       !newRow.rateCeiling ||
// //       !newRow.ceilingMethodCode ||
// //       !newRow.applyToRbaCode ||
// //       !newRow.fiscalYear
// //     ) {
// //       alert("Please fill all fields.");
// //       return;
// //     }
// //     if (!updatedBy) {
// //       alert("updatedBy is required. Please provide a user name.");
// //       return;
// //     }
// //     const requestBody = {
// //       projectId,
// //       fiscalYear: newRow.fiscalYear,
// //       accountId: newRow.accountId,
// //       poolCode: newRow.poolCode,
// //       rateCeiling: parseFloat(newRow.rateCeiling) || 0,
// //       rateFormat: "%",
// //       comCeiling: 0,
// //       comFormat: "",
// //       ceilingMethodCode: newRow.ceilingMethodCode,
// //       applyToRbaCode: newRow.applyToRbaCode,
// //     };
// //     try {
// //       await axios.post(
// //         `https://test-api-3tmq.onrender.com/Project/CreateBurdenCeilingForProject?updatedBy=${updatedBy}`,
// //         requestBody
// //       );
// //       // Refresh
// //       const res = await axios.get(
// //         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
// //       );
// //       setBurdenCeilings(res.data?.data || []);
// //       setShowNewRow(false);
// //       setNewRow({
// //         accountId: "",
// //         poolCode: "",
// //         rateCeiling: "",
// //         ceilingMethodCode: "",
// //         applyToRbaCode: "",
// //         fiscalYear: fiscalYear,
// //       });
// //     } catch (err) {
// //       alert("Failed to save. Please check your input and try again.");
// //     }
// //   };

// //   // Edit row handlers
// //   const handleEditClick = (index) => {
// //     setEditIndex(index);
// //     setEditRow({
// //       rateCeiling: burdenCeilings[index].rateCeiling,
// //       applyToRbaCode: burdenCeilings[index].applyToRbaCode,
// //     });
// //   };

// //   const handleEditChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditRow((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleUpdate = async (index) => {
// //     const row = burdenCeilings[index];
// //     const requestBody = {
// //       projectId: row.projectId,
// //       fiscalYear: row.fiscalYear,
// //       accountId: row.accountId,
// //       poolCode: row.poolCode,
// //       rateCeiling: parseFloat(editRow.rateCeiling) || 0,
// //       rateFormat: row.rateFormat,
// //       comCeiling: row.comCeiling,
// //       comFormat: row.comFormat,
// //       ceilingMethodCode: row.ceilingMethodCode,
// //       applyToRbaCode: editRow.applyToRbaCode,
// //     };
// //     try {
// //       await axios.put(
// //         `https://test-api-3tmq.onrender.com/Project/UpdateBurdenCeilingForProject?updatedBy=${updatedBy}`,
// //         requestBody
// //       );
// //       // Refresh
// //       const res = await axios.get(
// //         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
// //       );
// //       setBurdenCeilings(res.data?.data || []);
// //       setEditIndex(null);
// //       setEditRow({});
// //     } catch {
// //       // handle error
// //     }
// //   };

// //   // UI-only delete for existing rows
// //   const handleDeleteUI = (index) => {
// //     setBurdenCeilings((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   // Cancel new row
// //   const handleCancelNewRow = () => {
// //     setShowNewRow(false);
// //     setNewRow({
// //       accountId: "",
// //       poolCode: "",
// //       rateCeiling: "",
// //       ceilingMethodCode: "",
// //       applyToRbaCode: "",
// //       fiscalYear: fiscalYear,
// //     });
// //     setPools([]);
// //   };

// //   // Fiscal year filter
// //   const filteredCeilings = burdenCeilings.filter(
// //     (c) => c.fiscalYear === fiscalYear
// //   );

// //   if (!isSearched) {
// //     return (
// //       <div className="text-gray-600">
// //         Please search for a project to view details.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="animate-fade-in">
// //       <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
// //         <div className="mb-4">
// //           <h2 className="text-xl font-bold text-gray-900 mb-2">
// //             Burden Cost Ceilings
// //           </h2>
// //           <div className="flex items-center mb-2">
// //             <label className="text-sm font-medium text-gray-700 mr-2">
// //               Project:
// //             </label>
// //             <span className="text-sm text-gray-900">{projectId}</span>
// //             <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
// //             <span className="ml-4 text-sm text-gray-900">Fiscal Year:</span>
// //             <select
// //               className="ml-1 px-2 py-1 border border-gray-300 rounded text-xs"
// //               value={fiscalYear}
// //               onChange={(e) => setFiscalYear(e.target.value)}
// //             >
// //               {fiscalYearOptions.map((y) => (
// //                 <option key={y} value={y}>
// //                   {y}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <button
// //             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
// //             onClick={handleNewClick}
// //           >
// //             New
// //           </button>
// //         </div>
// //         {filteredCeilings.length === 0 && !showNewRow ? (
// //           <p className="text-gray-600">
// //             No data available for fiscal year {fiscalYear}.
// //           </p>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-left border-collapse">
// //               <thead className="bg-gray-100 border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Account
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Account Name
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Pool
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Rate Ceiling
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Ceiling Method
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Apply to R/B/A
// //                   </th>
// //                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
// //                     Action
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {showNewRow && (
// //                   <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.accountId}
// //                         onChange={handleNewAccountChange}
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                       >
// //                         <option value="">-- Select Account --</option>
// //                         {accounts.map((account) => (
// //                           <option key={account.acctId} value={account.acctId}>
// //                             {account.acctId}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {accounts.find((a) => a.acctId === newRow.accountId)
// //                         ?.acctName || ""}
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.poolCode}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             poolCode: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         disabled={!newRow.accountId}
// //                       >
// //                         <option value="">-- Select Pool --</option>
// //                         {pools.map((pool) => (
// //                           <option key={pool.poolId} value={pool.poolId}>
// //                             {pool.poolId}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <input
// //                         type="text"
// //                         value={newRow.rateCeiling}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             rateCeiling: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         placeholder="0"
// //                       />
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.ceilingMethodCode}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             ceilingMethodCode: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {ceilingMethods.map((method) => (
// //                           <option key={method.value} value={method.value}>
// //                             {method.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1">
// //                       <select
// //                         value={newRow.applyToRbaCode}
// //                         onChange={(e) =>
// //                           setNewRow((prev) => ({
// //                             ...prev,
// //                             applyToRbaCode: e.target.value,
// //                           }))
// //                         }
// //                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                       >
// //                         <option value="">-- Select --</option>
// //                         {applyToRBAOptions.map((option) => (
// //                           <option key={option.value} value={option.value}>
// //                             {option.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-2 py-1 flex gap-1">
// //                       <button
// //                         onClick={handleSave}
// //                         className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
// //                       >
// //                         Save
// //                       </button>
// //                       <button
// //                         onClick={handleCancelNewRow}
// //                         className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 )}
// //                 {filteredCeilings.map((ceiling, index) => (
// //                   <tr
// //                     key={index}
// //                     className="bg-white border-b border-gray-200 hover:bg-gray-50"
// //                   >
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.accountId}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {accounts.find((a) => a.acctId === ceiling.accountId)
// //                         ?.acctName || "N/A"}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.poolCode}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {editIndex === index ? (
// //                         <input
// //                           type="text"
// //                           name="rateCeiling"
// //                           value={editRow.rateCeiling}
// //                           onChange={handleEditChange}
// //                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         />
// //                       ) : (
// //                         <span className="font-normal">
// //                           {ceiling.rateCeiling}
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {ceiling.ceilingMethodCode}
// //                     </td>
// //                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
// //                       {editIndex === index ? (
// //                         <select
// //                           name="applyToRbaCode"
// //                           value={editRow.applyToRbaCode}
// //                           onChange={handleEditChange}
// //                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
// //                         >
// //                           {applyToRBAOptions.map((option) => (
// //                             <option key={option.value} value={option.value}>
// //                               {option.label}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       ) : (
// //                         <span className="font-normal">
// //                           {ceiling.applyToRbaCode}
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-2 py-1 flex gap-1">
// //                       {editIndex === index ? (
// //                         <button
// //                           onClick={() => handleUpdate(index)}
// //                           className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
// //                         >
// //                           Update
// //                         </button>
// //                       ) : (
// //                         <>
// //                           <button
// //                             onClick={() => handleEditClick(index)}
// //                             className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs"
// //                           >
// //                             Edit
// //                           </button>
// //                           <button
// //                             onClick={() => handleDeleteUI(index)}
// //                             className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
// //                           >
// //                             Delete
// //                           </button>
// //                         </>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )} //       </div>
// //     </div>
// //   );
// // };

// // export default BurdenCostCeilingDetails;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FISCAL_YEAR_START = 2023;
// const FISCAL_YEAR_END = 2035;

// const ceilingMethods = [
//   { value: "C", label: "Ceiling" },
//   { value: "O", label: "Override" },
//   { value: "F", label: "Fixed" },
// ];
// const applyToRBAOptions = [
//   { value: "R", label: "Revenue" },
//   { value: "B", label: "Billing" },
//   { value: "A", label: "All" },
//   { value: "N", label: "None" },
// ];

// const BurdenCostCeilingDetails = ({
//   projectId,
//   isSearched,
//   updatedBy = "user",
// }) => {
//   const [accounts, setAccounts] = useState([]);
//   const [pools, setPools] = useState([]);
//   const [burdenCeilings, setBurdenCeilings] = useState([]);
//   const [fiscalYear, setFiscalYear] = useState(
//     new Date().getFullYear().toString()
//   );
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   // New row state
//   const [showNewRow, setShowNewRow] = useState(false);
//   const [newRow, setNewRow] = useState({
//     accountId: "",
//     poolCode: "",
//     rateCeiling: "",
//     ceilingMethodCode: "",
//     applyToRbaCode: "",
//     fiscalYear: new Date().getFullYear().toString(),
//   });

//   // Edit row state
//   const [editIndex, setEditIndex] = useState(null);
//   const [editRow, setEditRow] = useState({});

//   // Fiscal year options
//   const fiscalYearOptions = [];
//   for (let y = FISCAL_YEAR_START; y <= FISCAL_YEAR_END; y++) {
//     fiscalYearOptions.push(y.toString());
//   }

//   // Validate projectId format (e.g., "PROJ123")
//   const isValidProjectId = (id) => id && /^PROJ\d{3}$/.test(id);

//   // Fetch all accounts for mapping accountId to accountName
//   useEffect(() => {
//     const fetchAllAccounts = async () => {
//       if (!isSearched || !isValidProjectId(projectId)) {
//         setAccounts([]);
//         return;
//       }
//       try {
//         const res = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
//         );
//         setAccounts(res.data || []);
//       } catch {
//         setAccounts([]);
//       }
//     };
//     fetchAllAccounts();
//   }, [projectId, isSearched]);

//   // Fetch burden ceilings for project and fiscal year
//   useEffect(() => {
//     const fetchBurdenCeilings = async () => {
//       if (!isSearched || !isValidProjectId(projectId)) {
//         setBurdenCeilings([]);
//         setIsDataFetched(false);
//         setShowNewRow(false);
//         setPools([]);
//         return;
//       }
//       try {
//         const res = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
//         );
//         setBurdenCeilings(res.data?.data || []);
//         setIsDataFetched(true);
//       } catch {
//         setBurdenCeilings([]);
//         setIsDataFetched(true);
//       }
//       setShowNewRow(false);
//       setPools([]);
//     };
//     fetchBurdenCeilings(); // Corrected to call fetchBurdenCeilings
//   }, [projectId, isSearched]);

//   // Fetch pools when account is selected in new row
//   const handleNewAccountChange = async (e) => {
//     const accountId = e.target.value;
//     setNewRow((prev) => ({ ...prev, accountId, poolCode: "" }));
//     if (!accountId || !isSearched || !isValidProjectId(projectId)) {
//       setPools([]);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Orgnization/GetPoolsByOrgAccount?accountId=${accountId}&orgId=1.02`
//       );
//       setPools(res.data || []);
//     } catch {
//       setPools([]);
//     }
//   };

//   // Show new row
//   const handleNewClick = () => {
//     if (!isSearched || !isValidProjectId(projectId)) {
//       alert("Please enter a valid project ID (e.g., PROJ123) and search.");
//       return;
//     }
//     setShowNewRow(true);
//     setNewRow({
//       accountId: "",
//       poolCode: "",
//       rateCeiling: "",
//       ceilingMethodCode: "",
//       applyToRbaCode: "",
//       fiscalYear: fiscalYear,
//     });
//     setPools([]);
//   };

//   // Save new burden ceiling
//   const handleSave = async () => {
//     if (
//       !newRow.accountId ||
//       !newRow.poolCode ||
//       !newRow.rateCeiling ||
//       !newRow.ceilingMethodCode ||
//       !newRow.applyToRbaCode ||
//       !newRow.fiscalYear
//     ) {
//       alert("Please fill all fields.");
//       return;
//     }
//     if (!updatedBy) {
//       alert("updatedBy is required. Please provide a user name.");
//       return;
//     }
//     if (!isSearched || !isValidProjectId(projectId)) {
//       alert("Please enter a valid project ID (e.g., PROJ123) and search.");
//       return;
//     }
//     const requestBody = {
//       projectId,
//       fiscalYear: newRow.fiscalYear,
//       accountId: newRow.accountId,
//       poolCode: newRow.poolCode,
//       rateCeiling: parseFloat(newRow.rateCeiling) || 0,
//       rateFormat: "%",
//       comCeiling: 0,
//       comFormat: "",
//       ceilingMethodCode: newRow.ceilingMethodCode,
//       applyToRbaCode: newRow.applyToRbaCode,
//     };
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/CreateBurdenCeilingForProject?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       // Refresh
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
//       );
//       setBurdenCeilings(res.data?.data || []);
//       setShowNewRow(false);
//       setNewRow({
//         accountId: "",
//         poolCode: "",
//         rateCeiling: "",
//         ceilingMethodCode: "",
//         applyToRbaCode: "",
//         fiscalYear: fiscalYear,
//       });
//     } catch (err) {
//       alert("Failed to save. Please check your input and try again.");
//     }
//   };

//   // Edit row handlers
//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditRow({
//       rateCeiling: burdenCeilings[index].rateCeiling,
//       applyToRbaCode: burdenCeilings[index].applyToRbaCode,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditRow((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (index) => {
//     const row = burdenCeilings[index];
//     if (!isSearched || !isValidProjectId(projectId)) {
//       alert("Please enter a valid project ID (e.g., PROJ123) and search.");
//       return;
//     }
//     const requestBody = {
//       projectId: row.projectId,
//       fiscalYear: row.fiscalYear,
//       accountId: row.accountId,
//       poolCode: row.poolCode,
//       rateCeiling: parseFloat(editRow.rateCeiling) || 0,
//       rateFormat: row.rateFormat,
//       comCeiling: row.comCeiling,
//       comFormat: row.comFormat,
//       ceilingMethodCode: row.ceilingMethodCode,
//       applyToRbaCode: editRow.applyToRbaCode,
//     };
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Project/UpdateBurdenCeilingForProject?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       // Refresh
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
//       );
//       setBurdenCeilings(res.data?.data || []);
//       setEditIndex(null);
//       setEditRow({});
//     } catch {
//       alert("Failed to update. Please check your input and try again.");
//     }
//   };

//   // UI-only delete for existing rows
//   const handleDeleteUI = (index) => {
//     setBurdenCeilings((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Cancel new row
//   const handleCancelNewRow = () => {
//     setShowNewRow(false);
//     setNewRow({
//       accountId: "",
//       poolCode: "",
//       rateCeiling: "",
//       ceilingMethodCode: "",
//       applyToRbaCode: "",
//       fiscalYear: fiscalYear,
//     });
//     setPools([]);
//   };

//   // Fiscal year filter
//   const filteredCeilings = burdenCeilings.filter(
//     (c) => c.fiscalYear === fiscalYear
//   );

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
//             Burden Cost Ceilings
//           </h2>
//           <div className="flex items-center mb-2">
//             <label className="text-sm font-medium text-gray-700 mr-2">
//               Project:
//             </label>
//             <span className="text-sm text-gray-900">{projectId}</span>
//             <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
//             <span className="ml-4 text-sm text-gray-900">Fiscal Year:</span>
//             <select
//               className="ml-1 px-2 py-1 border border-gray-300 rounded text-xs"
//               value={fiscalYear}
//               onChange={(e) => setFiscalYear(e.target.value)}
//             >
//               {fiscalYearOptions.map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
//             onClick={handleNewClick}
//           >
//             New
//           </button>
//         </div>
//         {filteredCeilings.length === 0 && !showNewRow ? (
//           <p className="text-gray-600">
//             No data available for fiscal year {fiscalYear}.
//           </p>
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
//                     Pool
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Rate Ceiling
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Ceiling Method
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Apply to R/B/A
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
//                         value={newRow.accountId}
//                         onChange={handleNewAccountChange}
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
//                       <select
//                         value={newRow.poolCode}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             poolCode: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         disabled={!newRow.accountId}
//                       >
//                         <option value="">-- Select Pool --</option>
//                         {pools.map((pool) => (
//                           <option key={pool.poolId} value={pool.poolId}>
//                             {pool.poolId}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-2 py-1">
//                       <input
//                         type="text"
//                         value={newRow.rateCeiling}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             rateCeiling: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         placeholder="0"
//                       />
//                     </td>
//                     <td className="px-2 py-1">
//                       <select
//                         value={newRow.ceilingMethodCode}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             ceilingMethodCode: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                       >
//                         <option value="">-- Select --</option>
//                         {ceilingMethods.map((method) => (
//                           <option key={method.value} value={method.value}>
//                             {method.label}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-2 py-1">
//                       <select
//                         value={newRow.applyToRbaCode}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             applyToRbaCode: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                       >
//                         <option value="">-- Select --</option>
//                         {applyToRBAOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
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
//                 {filteredCeilings.map((ceiling, index) => (
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
//                       {ceiling.poolCode}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           name="rateCeiling"
//                           value={editRow.rateCeiling}
//                           onChange={handleEditChange}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         />
//                       ) : (
//                         <span className="font-normal">
//                           {ceiling.rateCeiling}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {ceiling.ceilingMethodCode}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <select
//                           name="applyToRbaCode"
//                           value={editRow.applyToRbaCode}
//                           onChange={handleEditChange}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         >
//                           {applyToRBAOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span className="font-normal">
//                           {ceiling.applyToRbaCode}
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

// export default BurdenCostCeilingDetails;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FISCAL_YEAR_START = 2023;
// const FISCAL_YEAR_END = 2035;

// const ceilingMethods = [
//   { value: "C", label: "Ceiling" },
//   { value: "O", label: "Override" },
//   { value: "F", label: "Fixed" },
// ];
// const applyToRBAOptions = [
//   { value: "R", label: "Revenue" },
//   { value: "B", label: "Billing" },
//   { value: "A", label: "All" },
//   { value: "N", label: "None" },
// ];

// const BurdenCostCeilingDetails = ({
//   projectId,
//   isSearched,
//   updatedBy = "user",
// }) => {
//   const [accounts, setAccounts] = useState([]);
//   const [pools, setPools] = useState([]);
//   const [burdenCeilings, setBurdenCeilings] = useState([]);
//   const [fiscalYear, setFiscalYear] = useState(
//     new Date().getFullYear().toString()
//   );
//   const [showNewRow, setShowNewRow] = useState(false);
//   const [newRow, setNewRow] = useState({
//     accountId: "",
//     poolCode: "",
//     rateCeiling: "",
//     ceilingMethodCode: "",
//     applyToRbaCode: "",
//     fiscalYear: new Date().getFullYear().toString(),
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [editRow, setEditRow] = useState({});
//   const [lastSearchedProjectId, setLastSearchedProjectId] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   // Fiscal year options
//   const fiscalYearOptions = [];
//   for (let y = FISCAL_YEAR_START; y <= FISCAL_YEAR_END; y++) {
//     fiscalYearOptions.push(y.toString());
//   }

//   // Validate projectId format (e.g., "PROJ123")
//   const isValidProjectId = (id) => id && /^PROJ\d{3}$/.test(id);

//   // Fetch all accounts for mapping accountId to accountName
//   useEffect(() => {
//     const fetchAllAccounts = async () => {
//       if (isSearched && isValidProjectId(projectId)) {
//         try {
//           const res = await axios.get(
//             `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
//           );
//           setAccounts(res.data || []);
//         } catch {
//           setAccounts([]);
//         }
//       }
//     };
//     fetchAllAccounts();
//     // eslint-disable-next-line
//   }, [isSearched]);

//   // Fetch burden ceilings for project and fiscal year
//   useEffect(() => {
//     const fetchBurdenCeilings = async () => {
//       if (isSearched && isValidProjectId(projectId)) {
//         try {
//           const res = await axios.get(
//             `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
//           );
//           setBurdenCeilings(res.data?.data || []);
//           setLastSearchedProjectId(projectId);
//           setHasSearched(true);
//         } catch {
//           setBurdenCeilings([]);
//           setLastSearchedProjectId(projectId);
//           setHasSearched(true);
//         }
//         setShowNewRow(false);
//         setPools([]);
//       }
//     };
//     fetchBurdenCeilings();
//     // eslint-disable-next-line
//   }, [isSearched]);

//   // Don't clear data if user is typing after a search
//   const shouldShowTable =
//     hasSearched && isValidProjectId(lastSearchedProjectId);

//   // Fetch pools when account is selected in new row
//   const handleNewAccountChange = async (e) => {
//     const accountId = e.target.value;
//     setNewRow((prev) => ({ ...prev, accountId, poolCode: "" }));
//     if (!accountId || !isSearched || !isValidProjectId(projectId)) {
//       setPools([]);
//       return;
//     }
//     try {
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Orgnization/GetPoolsByOrgAccount?accountId=${accountId}&orgId=1.02`
//       );
//       setPools(res.data || []);
//     } catch {
//       setPools([]);
//     }
//   };

//   // Show new row
//   const handleNewClick = () => {
//     if (!isSearched || !isValidProjectId(projectId)) {
//       alert("Please enter a valid project ID (e.g., PROJ123) and search.");
//       return;
//     }
//     setShowNewRow(true);
//     setNewRow({
//       accountId: "",
//       poolCode: "",
//       rateCeiling: "",
//       ceilingMethodCode: "",
//       applyToRbaCode: "",
//       fiscalYear: fiscalYear,
//     });
//     setPools([]);
//   };

//   // Save new burden ceiling
//   const handleSave = async () => {
//     if (
//       !newRow.accountId ||
//       !newRow.poolCode ||
//       !newRow.rateCeiling ||
//       !newRow.ceilingMethodCode ||
//       !newRow.applyToRbaCode ||
//       !newRow.fiscalYear
//     ) {
//       alert("Please fill all fields.");
//       return;
//     }
//     if (!updatedBy) {
//       alert("updatedBy is required. Please provide a user name.");
//       return;
//     }
//     if (!isSearched || !isValidProjectId(projectId)) {
//       alert("Please enter a valid project ID (e.g., PROJ123) and search.");
//       return;
//     }
//     const requestBody = {
//       projectId: lastSearchedProjectId,
//       fiscalYear: newRow.fiscalYear,
//       accountId: newRow.accountId,
//       poolCode: newRow.poolCode,
//       rateCeiling: parseFloat(newRow.rateCeiling) || 0,
//       rateFormat: "%",
//       comCeiling: 0,
//       comFormat: "",
//       ceilingMethodCode: newRow.ceilingMethodCode,
//       applyToRbaCode: newRow.applyToRbaCode,
//     };
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/CreateBurdenCeilingForProject?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       // Refresh
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${lastSearchedProjectId}`
//       );
//       setBurdenCeilings(res.data?.data || []);
//       setShowNewRow(false);
//       setNewRow({
//         accountId: "",
//         poolCode: "",
//         rateCeiling: "",
//         ceilingMethodCode: "",
//         applyToRbaCode: "",
//         fiscalYear: fiscalYear,
//       });
//     } catch (err) {
//       alert("Failed to save. Please check your input and try again.");
//     }
//   };

//   // Edit row handlers
//   const handleEditClick = (index) => {
//     setEditIndex(index);
//     setEditRow({
//       rateCeiling: burdenCeilings[index].rateCeiling,
//       applyToRbaCode: burdenCeilings[index].applyToRbaCode,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditRow((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (index) => {
//     const row = burdenCeilings[index];
//     if (!isSearched || !isValidProjectId(projectId)) {
//       alert("Please enter a valid project ID (e.g., PROJ123) and search.");
//       return;
//     }
//     const requestBody = {
//       projectId: row.projectId,
//       fiscalYear: row.fiscalYear,
//       accountId: row.accountId,
//       poolCode: row.poolCode,
//       rateCeiling: parseFloat(editRow.rateCeiling) || 0,
//       rateFormat: row.rateFormat,
//       comCeiling: row.comCeiling,
//       comFormat: row.comFormat,
//       ceilingMethodCode: row.ceilingMethodCode,
//       applyToRbaCode: editRow.applyToRbaCode,
//     };
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Project/UpdateBurdenCeilingForProject?updatedBy=${updatedBy}`,
//         requestBody
//       );
//       // Refresh
//       const res = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${lastSearchedProjectId}`
//       );
//       setBurdenCeilings(res.data?.data || []);
//       setEditIndex(null);
//       setEditRow({});
//     } catch {
//       alert("Failed to update. Please check your input and try again.");
//     }
//   };

//   // UI-only delete for existing rows
//   const handleDeleteUI = (index) => {
//     setBurdenCeilings((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Cancel new row
//   const handleCancelNewRow = () => {
//     setShowNewRow(false);
//     setNewRow({
//       accountId: "",
//       poolCode: "",
//       rateCeiling: "",
//       ceilingMethodCode: "",
//       applyToRbaCode: "",
//       fiscalYear: fiscalYear,
//     });
//     setPools([]);
//   };

//   // Fiscal year filter
//   const filteredCeilings = burdenCeilings.filter(
//     (c) => c.fiscalYear === fiscalYear
//   );

//   if (!shouldShowTable) {
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
//             Burden Cost Ceilings
//           </h2>
//           <div className="flex items-center mb-2">
//             <label className="text-sm font-medium text-gray-700 mr-2">
//               Project:
//             </label>
//             <span className="text-sm text-gray-900">{lastSearchedProjectId}</span>
//             <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
//             <span className="ml-4 text-sm text-gray-900">Fiscal Year:</span>
//             <select
//               className="ml-1 px-2 py-1 border border-gray-300 rounded text-xs"
//               value={fiscalYear}
//               onChange={(e) => setFiscalYear(e.target.value)}
//             >
//               {fiscalYearOptions.map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
//             onClick={handleNewClick}
//           >
//             New
//           </button>
//         </div>
//         {filteredCeilings.length === 0 && !showNewRow ? (
//           <p className="text-gray-600">
//             No data available for fiscal year {fiscalYear}.
//           </p>
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
//                     Pool
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Rate Ceiling
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Ceiling Method
//                   </th>
//                   <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
//                     Apply to R/B/A
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
//                         value={newRow.accountId}
//                         onChange={handleNewAccountChange}
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
//                       <select
//                         value={newRow.poolCode}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             poolCode: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         disabled={!newRow.accountId}
//                       >
//                         <option value="">-- Select Pool --</option>
//                         {pools.map((pool) => (
//                           <option key={pool.poolId} value={pool.poolId}>
//                             {pool.poolId}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-2 py-1">
//                       <input
//                         type="text"
//                         value={newRow.rateCeiling}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             rateCeiling: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         placeholder="0"
//                       />
//                     </td>
//                     <td className="px-2 py-1">
//                       <select
//                         value={newRow.ceilingMethodCode}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             ceilingMethodCode: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                       >
//                         <option value="">-- Select --</option>
//                         {ceilingMethods.map((method) => (
//                           <option key={method.value} value={method.value}>
//                             {method.label}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="px-2 py-1">
//                       <select
//                         value={newRow.applyToRbaCode}
//                         onChange={(e) =>
//                           setNewRow((prev) => ({
//                             ...prev,
//                             applyToRbaCode: e.target.value,
//                           }))
//                         }
//                         className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                       >
//                         <option value="">-- Select --</option>
//                         {applyToRBAOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
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
//                 {filteredCeilings.map((ceiling, index) => (
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
//                       {ceiling.poolCode}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           name="rateCeiling"
//                           value={editRow.rateCeiling}
//                           onChange={handleEditChange}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         />
//                       ) : (
//                         <span className="font-normal">
//                           {ceiling.rateCeiling}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {ceiling.ceilingMethodCode}
//                     </td>
//                     <td className="px-2 py-1 text-xs text-gray-900 font-normal">
//                       {editIndex === index ? (
//                         <select
//                           name="applyToRbaCode"
//                           value={editRow.applyToRbaCode}
//                           onChange={handleEditChange}
//                           className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
//                         >
//                           {applyToRBAOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span className="font-normal">
//                           {ceiling.applyToRbaCode}
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

// export default BurdenCostCeilingDetails;


import React, { useState, useEffect } from "react";
import axios from "axios";

const FISCAL_YEAR_START = 2023;
const FISCAL_YEAR_END = 2035;

const ceilingMethods = [
  { value: "C", label: "Ceiling" },
  { value: "O", label: "Override" },
  { value: "F", label: "Fixed" },
];
const applyToRBAOptions = [
  { value: "R", label: "Revenue" },
  { value: "B", label: "Billing" },
  { value: "A", label: "All" },
  { value: "N", label: "None" },
];

const BurdenCostCeilingDetails = ({
  projectId,
  isSearched,
  updatedBy = "user",
}) => {
  const [accounts, setAccounts] = useState([]);
  const [pools, setPools] = useState([]);
  const [burdenCeilings, setBurdenCeilings] = useState([]);
  const [fiscalYear, setFiscalYear] = useState(
    new Date().getFullYear().toString()
  );
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRow, setNewRow] = useState({
    accountId: "",
    poolCode: "",
    rateCeiling: "",
    ceilingMethodCode: "",
    applyToRbaCode: "",
    fiscalYear: new Date().getFullYear().toString(),
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [lastSearchedProjectId, setLastSearchedProjectId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fiscal year options
  const fiscalYearOptions = [];
  for (let y = FISCAL_YEAR_START; y <= FISCAL_YEAR_END; y++) {
    fiscalYearOptions.push(y.toString());
  }

  // Validate projectId format (e.g., "PROJ123")
  const isValidProjectId = (id) => id && /^PROJ\d{3}$/.test(id);

  // Fetch all accounts for mapping accountId to accountName
  useEffect(() => {
    let isMounted = true;
    const fetchAllAccounts = async () => {
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
    fetchAllAccounts();
    return () => { isMounted = false; };
  }, [isSearched, projectId]);

  // Fetch burden ceilings for project and fiscal year
  useEffect(() => {
    let isMounted = true;
    const fetchBurdenCeilings = async () => {
      if (isSearched && isValidProjectId(projectId)) {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${projectId}`
          );
          if (isMounted) {
            setBurdenCeilings(res.data?.data || []);
            setLastSearchedProjectId(projectId);
            setHasSearched(true);
          }
        } catch {
          if (isMounted) {
            setBurdenCeilings([]);
            setLastSearchedProjectId(projectId);
            setHasSearched(true);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
            setShowNewRow(false);
            setPools([]);
          }
        }
      } else if (isMounted) {
        setBurdenCeilings([]);
        setShowNewRow(false);
        setPools([]);
        setLastSearchedProjectId("");
        setHasSearched(false);
        setIsLoading(false);
      }
    };
    fetchBurdenCeilings();
    return () => { isMounted = false; };
  }, [isSearched, projectId]);

  // Only show table if last search was valid and not blank
  const shouldShowTable =
    hasSearched && isValidProjectId(lastSearchedProjectId);

  // Fetch pools when account is selected in new row
  const handleNewAccountChange = async (e) => {
    const accountId = e.target.value;
    setNewRow((prev) => ({ ...prev, accountId, poolCode: "" }));
    if (!accountId || !isSearched || !isValidProjectId(projectId)) {
      setPools([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://test-api-3tmq.onrender.com/Orgnization/GetPoolsByOrgAccount?accountId=${accountId}&orgId=1.02`
      );
      setPools(res.data || []);
    } catch {
      setPools([]);
    }
  };

  // Show new row
  const handleNewClick = () => {
    if (!isSearched || !isValidProjectId(projectId)) {
      alert("Please enter a valid project ID (e.g., PROJ123) and search.");
      return;
    }
    setShowNewRow(true);
    setNewRow({
      accountId: "",
      poolCode: "",
      rateCeiling: "",
      ceilingMethodCode: "",
      applyToRbaCode: "",
      fiscalYear: fiscalYear,
    });
    setPools([]);
  };

  // Save new burden ceiling
  const handleSave = async () => {
    if (
      !newRow.accountId ||
      !newRow.poolCode ||
      !newRow.rateCeiling ||
      !newRow.ceilingMethodCode ||
      !newRow.applyToRbaCode ||
      !newRow.fiscalYear
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (!updatedBy) {
      alert("updatedBy is required. Please provide a user name.");
      return;
    }
    if (!isSearched || !isValidProjectId(projectId)) {
      alert("Please enter a valid project ID (e.g., PROJ123) and search.");
      return;
    }
    const requestBody = {
      projectId: lastSearchedProjectId,
      fiscalYear: newRow.fiscalYear,
      accountId: newRow.accountId,
      poolCode: newRow.poolCode,
      rateCeiling: parseFloat(newRow.rateCeiling) || 0,
      rateFormat: "%",
      comCeiling: 0,
      comFormat: "",
      ceilingMethodCode: newRow.ceilingMethodCode,
      applyToRbaCode: newRow.applyToRbaCode,
    };
    try {
      await axios.post(
        `https://test-api-3tmq.onrender.com/Project/CreateBurdenCeilingForProject?updatedBy=${updatedBy}`,
        requestBody
      );
      // Refresh
      const res = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${lastSearchedProjectId}`
      );
      setBurdenCeilings(res.data?.data || []);
      setShowNewRow(false);
      setNewRow({
        accountId: "",
        poolCode: "",
        rateCeiling: "",
        ceilingMethodCode: "",
        applyToRbaCode: "",
        fiscalYear: fiscalYear,
      });
    } catch (err) {
      alert("Failed to save. Please check your input and try again.");
    }
  };

  // Edit row handlers
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditRow({
      rateCeiling: burdenCeilings[index].rateCeiling,
      applyToRbaCode: burdenCeilings[index].applyToRbaCode,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (index) => {
    const row = burdenCeilings[index];
    if (!isSearched || !isValidProjectId(projectId)) {
      alert("Please enter a valid project ID (e.g., PROJ123) and search.");
      return;
    }
    const requestBody = {
      projectId: row.projectId,
      fiscalYear: row.fiscalYear,
      accountId: row.accountId,
      poolCode: row.poolCode,
      rateCeiling: parseFloat(editRow.rateCeiling) || 0,
      rateFormat: row.rateFormat,
      comCeiling: row.comCeiling,
      comFormat: row.comFormat,
      ceilingMethodCode: row.ceilingMethodCode,
      applyToRbaCode: editRow.applyToRbaCode,
    };
    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/Project/UpdateBurdenCeilingForProject?updatedBy=${updatedBy}`,
        requestBody
      );
      // Refresh
      const res = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllBurdenCeilingForProject?projId=${lastSearchedProjectId}`
      );
      setBurdenCeilings(res.data?.data || []);
      setEditIndex(null);
      setEditRow({});
    } catch {
      alert("Failed to update. Please check your input and try again.");
    }
  };

  // UI-only delete for existing rows
  const handleDeleteUI = (index) => {
    setBurdenCeilings((prev) => prev.filter((_, i) => i !== index));
  };

  // Cancel new row
  const handleCancelNewRow = () => {
    setShowNewRow(false);
    setNewRow({
      accountId: "",
      poolCode: "",
      rateCeiling: "",
      ceilingMethodCode: "",
      applyToRbaCode: "",
      fiscalYear: fiscalYear,
    });
    setPools([]);
  };

  // Fiscal year filter
  const filteredCeilings = burdenCeilings.filter(
    (c) => c.fiscalYear === fiscalYear
  );

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
            Burden Cost Ceilings
          </h2>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700 mr-2">
              Project:
            </label>
            <span className="text-sm text-gray-900">{lastSearchedProjectId}</span>
            <span className="ml-4 text-sm text-gray-900">Org ID: 1.02</span>
            <span className="ml-4 text-sm text-gray-900">Fiscal Year:</span>
            <select
              className="ml-1 px-2 py-1 border border-gray-300 rounded text-xs"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              {fiscalYearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
            onClick={handleNewClick}
          >
            New
          </button>
        </div>
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : filteredCeilings.length === 0 && !showNewRow ? (
          <p className="text-gray-600">
            No data available for fiscal year {fiscalYear}.
          </p>
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
                    Pool
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Rate Ceiling
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Ceiling Method
                  </th>
                  <th className="px-2 py-1 text-gray-700 font-semibold text-xs">
                    Apply to R/B/A
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
                        value={newRow.accountId}
                        onChange={handleNewAccountChange}
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
                      <select
                        value={newRow.poolCode}
                        onChange={(e) =>
                          setNewRow((prev) => ({
                            ...prev,
                            poolCode: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        disabled={!newRow.accountId}
                      >
                        <option value="">-- Select Pool --</option>
                        {pools.map((pool) => (
                          <option key={pool.poolId} value={pool.poolId}>
                            {pool.poolId}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        value={newRow.rateCeiling}
                        onChange={(e) =>
                          setNewRow((prev) => ({
                            ...prev,
                            rateCeiling: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <select
                        value={newRow.ceilingMethodCode}
                        onChange={(e) =>
                          setNewRow((prev) => ({
                            ...prev,
                            ceilingMethodCode: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                      >
                        <option value="">-- Select --</option>
                        {ceilingMethods.map((method) => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1">
                      <select
                        value={newRow.applyToRbaCode}
                        onChange={(e) =>
                          setNewRow((prev) => ({
                            ...prev,
                            applyToRbaCode: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                      >
                        <option value="">-- Select --</option>
                        {applyToRBAOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
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
                {filteredCeilings.map((ceiling, index) => (
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
                      {ceiling.poolCode}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {editIndex === index ? (
                        <input
                          type="text"
                          name="rateCeiling"
                          value={editRow.rateCeiling}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs font-normal"
                        />
                      ) : (
                        <span className="font-normal">
                          {ceiling.rateCeiling}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-900 font-normal">
                      {ceiling.ceilingMethodCode}
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
                        <span className="font-normal">
                          {ceiling.applyToRbaCode}
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

export default BurdenCostCeilingDetails;




