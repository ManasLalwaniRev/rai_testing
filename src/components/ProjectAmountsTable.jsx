// // // // import React from "react";

// // // // const ProjectAmountsTable = ({ plan, status, plType }) => {
// // // //   const amountsTypeOptions = [
// // // //     "Select",
// // // //     "Materials",
// // // //     "Subcontractors",
// // // //     "Materials Handling",
// // // //     "Travel",
// // // //     "Consultants",
// // // //     "Other Direct Costs",
// // // //   ];

// // // //   const idTypeOptions = [
// // // //     "Select",
// // // //     "Contract Employee",
// // // //     "General Labor Category",
// // // //     "Generic Staff",
// // // //     "Key Entry",
// // // //   ];

// // // //   const isEditable = status === "Working";

// // // //   return (
// // // //     <div className="space-y-4 font-inter">
// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full border border-gray-300 bg-white rounded-lg">
// // // //           <thead className="bg-gray-100">
// // // //             <tr className="border-b border-gray-300">
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Line
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Hide Row
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Amounts Type
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 ID Type
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 ID
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Name
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Explanation
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Acct ID
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Org ID
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 GLC/PLC
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Rev
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Brd
// // // //               </th>
// // // //               <th className="py-2 px-3 text-left text-gray-900 font-medium text-xs whitespace-nowrap border-r border-gray-200">
// // // //                 Total
// // // //               </th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {/* Placeholder row */}
// // // //             <tr className="border-b border-gray-300 hover:bg-gray-50">
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   readOnly
// // // //                   className={`cursor-pointer ${
// // // //                     !isEditable ? "cursor-not-allowed opacity-50" : ""
// // // //                   }`}
// // // //                   disabled={!isEditable}
// // // //                 />
// // // //               </td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200">
// // // //                 <select
// // // //                   className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
// // // //                     !isEditable ? "cursor-not-allowed text-gray-400" : ""
// // // //                   }`}
// // // //                   disabled={!isEditable}
// // // //                   defaultValue={plType || "Select"}
// // // //                 >
// // // //                   {amountsTypeOptions.map((option) => (
// // // //                     <option key={option} value={option}>
// // // //                       {option}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>
// // // //               </td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200">
// // // //                 <select
// // // //                   className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${
// // // //                     !isEditable ? "cursor-not-allowed text-gray-400" : ""
// // // //                   }`}
// // // //                   disabled={!isEditable}
// // // //                   defaultValue="Select"
// // // //                 >
// // // //                   {idTypeOptions.map((option) => (
// // // //                     <option key={option} value={option}>
// // // //                       {option}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>
// // // //               </td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //               <td className="py-2 px-3 text-gray-700 text-sm whitespace-nowrap border-r border-gray-200"></td>
// // // //             </tr>
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;

// // // //---------------------------------------------------------------------------------------------------
// // // // import React, { useState } from "react";
// // // // import axios from "axios";

// // // // const ProjectAmountsTable = ({ plan, status, plType }) => {
// // // //   const projectInfo = {
// // // //     projectId: "PROJ001",
// // // //     type: "BUD",
// // // //     version: "40",
// // // //     status: status || "Working",
// // // //   };

// // // //   const amountsTypeOptions = [
// // // //     "Select", "Materials", "Subcontractors", "Materials Handling",
// // // //     "Travel", "Consultants", "Other Direct Costs",
// // // //   ];

// // // //   const idTypeOptions = [
// // // //     "Select", "Contract Employee", "General Labor Category",
// // // //     "Generic Staff", "Key Entry",
// // // //   ];

// // // //   const isEditable = projectInfo.status === "Working";

// // // //   const [rows, setRows] = useState([
// // // //     {
// // // //       id: Date.now(),
// // // //       hide: false,
// // // //       amountType: plType || "Select",
// // // //       idType: "Select",
// // // //       idValue: "",
// // // //       name: "",
// // // //       explanation: "",
// // // //       acctId: "",
// // // //       orgId: "",
// // // //       glcPlc: "",
// // // //       rev: false,
// // // //       brd: false,
// // // //       total: "",
// // // //     },
// // // //   ]);

// // // //   const addNewRow = () => {
// // // //     setRows([
// // // //       ...rows,
// // // //       {
// // // //         id: Date.now(),
// // // //         hide: false,
// // // //         amountType: "Select",
// // // //         idType: "Select",
// // // //         idValue: "",
// // // //         name: "",
// // // //         explanation: "",
// // // //         acctId: "",
// // // //         orgId: "",
// // // //         glcPlc: "",
// // // //         rev: false,
// // // //         brd: false,
// // // //         total: "",
// // // //       },
// // // //     ]);
// // // //   };

// // // //   const handleInputChange = (index, field, value) => {
// // // //     const updatedRows = [...rows];
// // // //     updatedRows[index][field] = value;
// // // //     setRows(updatedRows);
// // // //   };

// // // //   const handleSave = async (rowData) => {
// // // //     const payload = {
// // // //       ...rowData,
// // // //       rev: rowData.rev ? 1 : 0,
// // // //       brd: rowData.brd ? 1 : 0,
// // // //     };

// // // //     try {
// // // //       await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
// // // //       alert("Row saved successfully.");
// // // //     } catch (error) {
// // // //       alert("Error saving row.");
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //     for (let row of rows) {
// // // //       const payload = {
// // // //         ...row,
// // // //         rev: row.rev ? 1 : 0,
// // // //         brd: row.brd ? 1 : 0,
// // // //       };

// // // //       try {
// // // //         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
// // // //       } catch (error) {
// // // //         console.error("Failed row:", row, error);
// // // //         alert("Error saving one or more rows.");
// // // //         return;
// // // //       }
// // // //     }
// // // //     alert("All rows saved!");
// // // //   };

// // // //   return (
// // // //     <div className="space-y-4 font-inter relative">
// // // //       {/* Project Info & Buttons */}
// // // //       <div className="flex justify-between items-center bg-gray-100 p-3 rounded border border-gray-300">
// // // //         <div className="text-sm text-gray-800 font-medium">
// // // //           Project ID: {projectInfo.projectId}, Type: {projectInfo.type}, Version: {projectInfo.version}, Status: {projectInfo.status}
// // // //         </div>
// // // //         <div className="flex space-x-2">
// // // //           <button
// // // //             className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
// // // //             onClick={addNewRow}
// // // //             disabled={!isEditable}
// // // //           >
// // // //             ➕ Add Row
// // // //           </button>
// // // //           <button
// // // //             className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
// // // //             onClick={handleSaveAll}
// // // //             disabled={!isEditable}
// // // //           >
// // // //             💾 Save All
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Table */}
// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full border border-gray-300 bg-white rounded-lg">
// // // //           <thead className="bg-gray-100">
// // // //             <tr className="border-b border-gray-300">
// // // //               {[
// // // //                 "Line", "Hide Row", "Amounts Type", "ID Type", "ID", "Name", "Explanation",
// // // //                 "Acct ID", "Org ID", "GLC/PLC", "Rev", "Brd", "Total", "Action",
// // // //               ].map((title) => (
// // // //                 <th
// // // //                   key={title}
// // // //                   className="py-2 px-3 text-left text-xs font-medium text-gray-900 whitespace-nowrap border-r border-gray-200"
// // // //                 >
// // // //                   {title}
// // // //                 </th>
// // // //               ))}
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {rows.map((row, index) => (
// // // //               <tr key={row.id} className="border-b border-gray-300 hover:bg-gray-50">
// // // //                 <td className="py-2 px-3 text-sm border-r">{index + 1}</td>

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={row.hide}
// // // //                     disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(index, "hide", e.target.checked)}
// // // //                   />
// // // //                 </td>

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <select
// // // //                     className="w-full border rounded px-2 py-1 text-sm"
// // // //                     value={row.amountType}
// // // //                     disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(index, "amountType", e.target.value)}
// // // //                   >
// // // //                     {amountsTypeOptions.map((opt) => (
// // // //                       <option key={opt}>{opt}</option>
// // // //                     ))}
// // // //                   </select>
// // // //                 </td>

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <select
// // // //                     className="w-full border rounded px-2 py-1 text-sm"
// // // //                     value={row.idType}
// // // //                     disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(index, "idType", e.target.value)}
// // // //                   >
// // // //                     {idTypeOptions.map((opt) => (
// // // //                       <option key={opt}>{opt}</option>
// // // //                     ))}
// // // //                   </select>
// // // //                 </td>

// // // //                 {["idValue", "name", "explanation", "acctId", "orgId", "glcPlc"].map((field) => (
// // // //                   <td key={field} className="py-2 px-3 border-r">
// // // //                     <input
// // // //                       type="text"
// // // //                       className="w-full border rounded px-2 py-1 text-sm"
// // // //                       value={row[field]}
// // // //                       disabled={!isEditable}
// // // //                       onChange={(e) => handleInputChange(index, field, e.target.value)}
// // // //                     />
// // // //                   </td>
// // // //                 ))}

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={row.rev}
// // // //                     disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(index, "rev", e.target.checked)}
// // // //                   />
// // // //                 </td>

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={row.brd}
// // // //                     disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(index, "brd", e.target.checked)}
// // // //                   />
// // // //                 </td>

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <input
// // // //                     type="text"
// // // //                     className="w-full border rounded px-2 py-1 text-sm"
// // // //                     value={row.total}
// // // //                     disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(index, "total", e.target.value)}
// // // //                   />
// // // //                 </td>

// // // //                 <td className="py-2 px-3 border-r">
// // // //                   <button
// // // //                     className="bg-green-500 text-white px-2 py-1 rounded text-xs"
// // // //                     disabled={!isEditable}
// // // //                     onClick={() => handleSave(row)}
// // // //                   >
// // // //                     💾 Save
// // // //                   </button>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;
// // // //----------------------------------------------------------------------------------------------

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";

// // // // const ProjectAmountsTable = ({ plan, status, plType }) => {
// // // //   const projectInfo = {
// // // //     projectId: "PROJ001",
// // // //     type: "BUD",
// // // //     version: "40",
// // // //     status: status || "Working",
// // // //   };

// // // //   const amountsTypeOptions = ["Select", "Materials", "Subcontractors", "Materials Handling", "Travel", "Consultants", "Other Direct Costs"];
// // // //   const idTypeOptions = ["Select", "Contract Employee", "General Labor Category", "Generic Staff", "Key Entry"];
// // // //   const isEditable = projectInfo.status === "Working";

// // // //   const [periods, setPeriods] = useState([]);
// // // //   const [rows, setRows] = useState([
// // // //     {
// // // //       id: Date.now(),
// // // //       hide: false,
// // // //       amountType: plType || "Select",
// // // //       idType: "Select",
// // // //       idValue: "",
// // // //       name: "",
// // // //       explanation: "",
// // // //       acctId: "",
// // // //       orgId: "",
// // // //       glcPlc: "",
// // // //       rev: false,
// // // //       brd: false,
// // // //       total: "",
// // // //       periodAmounts: {}, // key: month (e.g. "2025-07"), value: string
// // // //     },
// // // //   ]);

// // // //   useEffect(() => {
// // // //     // Example API fetch
// // // //     const fetchPeriods = async () => {
// // // //       try {
// // // //         const res = await axios.get("https://your-api.com/GetWorkingDaysForDuration");
// // // //         // Assume API returns: ["2025-07", "2025-08", "2025-09"]
// // // //         setPeriods(res.data || []);
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch periods", err);
// // // //       }
// // // //     };

// // // //     fetchPeriods();
// // // //   }, []);

// // // //   const addNewRow = () => {
// // // //     const newPeriodAmounts = {};
// // // //     periods.forEach((p) => {
// // // //       newPeriodAmounts[p] = "";
// // // //     });

// // // //     setRows([
// // // //       ...rows,
// // // //       {
// // // //         id: Date.now(),
// // // //         hide: false,
// // // //         amountType: "Select",
// // // //         idType: "Select",
// // // //         idValue: "",
// // // //         name: "",
// // // //         explanation: "",
// // // //         acctId: "",
// // // //         orgId: "",
// // // //         glcPlc: "",
// // // //         rev: false,
// // // //         brd: false,
// // // //         total: "",
// // // //         periodAmounts: newPeriodAmounts,
// // // //       },
// // // //     ]);
// // // //   };

// // // //   const handleInputChange = (index, field, value) => {
// // // //     const updatedRows = [...rows];
// // // //     updatedRows[index][field] = value;
// // // //     setRows(updatedRows);
// // // //   };

// // // //   const handlePeriodChange = (rowIndex, periodKey, value) => {
// // // //     const updatedRows = [...rows];
// // // //     updatedRows[rowIndex].periodAmounts[periodKey] = value;
// // // //     setRows(updatedRows);
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //     for (let row of rows) {
// // // //       const payload = {
// // // //         ...row,
// // // //         rev: row.rev ? 1 : 0,
// // // //         brd: row.brd ? 1 : 0,
// // // //       };
// // // //       try {
// // // //         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
// // // //       } catch (err) {
// // // //         console.error("Save error", err);
// // // //         alert("Error saving one or more rows.");
// // // //         return;
// // // //       }
// // // //     }
// // // //     alert("All rows saved!");
// // // //   };

// // // //   return (
// // // //     <div className="space-y-4 font-inter">
// // // //       {/* Project Info and Buttons */}
// // // //       <div className="flex justify-between items-center bg-gray-100 p-3 rounded border border-gray-300">
// // // //         <div className="text-sm font-medium">
// // // //           Project ID: {projectInfo.projectId}, Type: {projectInfo.type}, Version: {projectInfo.version}, Status: {projectInfo.status}
// // // //         </div>
// // // //         <div className="flex space-x-2">
// // // //           <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={addNewRow} disabled={!isEditable}>➕ Add Row</button>
// // // //           <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleSaveAll} disabled={!isEditable}>💾 Save All</button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Table */}
// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full border border-gray-300 bg-white rounded-lg">
// // // //           <thead className="bg-gray-100">
// // // //             <tr className="border-b">
// // // //               {[
// // // //                 "Line", "Hide Row", "Amounts Type", "ID Type", "ID", "Name", "Explanation",
// // // //                 "Acct ID", "Org ID", "GLC/PLC", "Rev", "Brd", "Total"
// // // //               ].map((title) => (
// // // //                 <th key={title} className="px-2 py-1 text-left text-xs border-r">{title}</th>
// // // //               ))}
// // // //               {periods.map((period) => (
// // // //                 <th key={period} className="px-2 py-1 text-xs text-center border-r bg-blue-50">{period}</th>
// // // //               ))}
// // // //               <th className="px-2 py-1 text-xs">Action</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {rows.map((row, rowIndex) => (
// // // //               <tr key={row.id} className="border-b hover:bg-gray-50">
// // // //                 <td className="px-2 py-1 text-sm border-r">{rowIndex + 1}</td>

// // // //                 <td className="px-2 py-1 border-r">
// // // //                   <input type="checkbox" checked={row.hide} disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(rowIndex, "hide", e.target.checked)} />
// // // //                 </td>

// // // //                 <td className="px-2 py-1 border-r">
// // // //                   <select className="w-full text-sm px-1 py-1 border rounded" value={row.amountType} disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(rowIndex, "amountType", e.target.value)}>
// // // //                     {amountsTypeOptions.map((opt) => (<option key={opt}>{opt}</option>))}
// // // //                   </select>
// // // //                 </td>

// // // //                 <td className="px-2 py-1 border-r">
// // // //                   <select className="w-full text-sm px-1 py-1 border rounded" value={row.idType} disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(rowIndex, "idType", e.target.value)}>
// // // //                     {idTypeOptions.map((opt) => (<option key={opt}>{opt}</option>))}
// // // //                   </select>
// // // //                 </td>

// // // //                 {["idValue", "name", "explanation", "acctId", "orgId", "glcPlc"].map((field) => (
// // // //                   <td key={field} className="px-2 py-1 border-r">
// // // //                     <input type="text" value={row[field]} disabled={!isEditable}
// // // //                       onChange={(e) => handleInputChange(rowIndex, field, e.target.value)}
// // // //                       className="w-full px-1 py-1 text-sm border rounded" />
// // // //                   </td>
// // // //                 ))}

// // // //                 <td className="px-2 py-1 border-r">
// // // //                   <input type="checkbox" checked={row.rev} disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(rowIndex, "rev", e.target.checked)} />
// // // //                 </td>

// // // //                 <td className="px-2 py-1 border-r">
// // // //                   <input type="checkbox" checked={row.brd} disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(rowIndex, "brd", e.target.checked)} />
// // // //                 </td>

// // // //                 <td className="px-2 py-1 border-r">
// // // //                   <input type="text" value={row.total} disabled={!isEditable}
// // // //                     onChange={(e) => handleInputChange(rowIndex, "total", e.target.value)}
// // // //                     className="w-full px-1 py-1 text-sm border rounded" />
// // // //                 </td>

// // // //                 {/* Monthly Period Fields */}
// // // //                 {periods.map((periodKey) => (
// // // //                   <td key={periodKey} className="px-2 py-1 border-r">
// // // //                     <input type="number" min="0" step="any"
// // // //                       value={row.periodAmounts?.[periodKey] || ""}
// // // //                       onChange={(e) => handlePeriodChange(rowIndex, periodKey, e.target.value)}
// // // //                       disabled={!isEditable}
// // // //                       className="w-full px-1 py-1 text-sm border rounded text-right" />
// // // //                   </td>
// // // //                 ))}

// // // //                 <td className="px-2 py-1">
// // // //                   <button className="bg-green-500 text-white px-2 py-1 rounded text-xs" disabled={!isEditable}
// // // //                     onClick={() => handleSaveAll()}>
// // // //                     💾 Save
// // // //                   </button>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;
// // // //----------------------------------------------

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";

// // // // const PERIODS_API_URL = "https://test-api-3tmq.onrender.com/Forecast/GetPeriods"; // replace with actual

// // // // const ProjectAmountsTable = ({ plan = {}, status, plType }) => {
// // // //   const projectInfo = {
// // // //     projectId: "PROJ001",
// // // //     type: "BUD",
// // // //     version: "40",
// // // //     status: status || "Working",
// // // //   };

// // // //   const amountsTypeOptions = ["Select", "Materials", "Subcontractors", "Materials Handling", "Travel", "Consultants", "Other Direct Costs"];
// // // //   const idTypeOptions = ["Select", "Contract Employee", "General Labor Category", "Generic Staff", "Key Entry"];
// // // //   const isEditable = projectInfo.status === "Working";

// // // //   const [periods, setPeriods] = useState([]); // e.g. ["2025-07", "2025-08"]
// // // //   const [rows, setRows] = useState([
// // // //     {
// // // //       id: Date.now(),
// // // //       hide: false,
// // // //       amountType: plType || "Select",
// // // //       idType: "Select",
// // // //       idValue: "",
// // // //       name: "",
// // // //       explanation: "",
// // // //       acctId: "",
// // // //       orgId: "",
// // // //       glcPlc: "",
// // // //       rev: false,
// // // //       brd: false,
// // // //       total: "",
// // // //       periodAmounts: {}, // e.g. { "2025-07": 0, ... }
// // // //     },
// // // //   ]);

// // // //   // Fetch dynamic periods from API
// // // //   useEffect(() => {
// // // //     const fetchPeriods = async () => {
// // // //       try {
// // // //         const res = await axios.get(PERIODS_API_URL);
// // // //         if (Array.isArray(res.data)) setPeriods(res.data);
// // // //         else console.error("Unexpected periods format:", res.data);
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch periods:", err);
// // // //       }
// // // //     };
// // // //     fetchPeriods();
// // // //   }, []);

// // // //   // Ensure that existing rows have all period keys
// // // //   useEffect(() => {
// // // //     setRows(rows.map(r => {
// // // //       const pa = { ...r.periodAmounts };
// // // //       periods.forEach(p => {
// // // //         if (!(p in pa)) pa[p] = "";
// // // //       });
// // // //       return { ...r, periodAmounts: pa };
// // // //     }));
// // // //   }, [periods]);

// // // //   const addNewRow = () => {
// // // //     const pa = {};
// // // //     periods.forEach(p => { pa[p] = ""; });
// // // //     setRows([...rows, {
// // // //       id: Date.now(),
// // // //       hide: false,
// // // //       amountType: "Select",
// // // //       idType: "Select",
// // // //       idValue: "",
// // // //       name: "",
// // // //       explanation: "",
// // // //       acctId: "",
// // // //       orgId: "",
// // // //       glcPlc: "",
// // // //       rev: false,
// // // //       brd: false,
// // // //       total: "",
// // // //       periodAmounts: pa,
// // // //     }]);
// // // //   };

// // // //   const updateField = (idx, field, value) => {
// // // //     const newRows = [...rows];
// // // //     newRows[idx][field] = value;
// // // //     setRows(newRows);
// // // //   };

// // // //   const updatePeriod = (idx, period, value) => {
// // // //     const newRows = [...rows];
// // // //     newRows[idx].periodAmounts[period] = value;
// // // //     setRows(newRows);
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //     try {
// // // //       for (let row of rows) {
// // // //         for (const [periodKey, costRaw] of Object.entries(row.periodAmounts)) {
// // // //           const cost = parseFloat(costRaw);
// // // //           if (isNaN(cost) || cost <= 0) continue;

// // // //           const [year, month] = periodKey.split("-");
// // // //           const payload = {
// // // //             forecastedamt: cost,
// // // //             forecastid: 0,
// // // //             projId: projectInfo.projectId,
// // // //             plId: plan.id || 0,
// // // //             emplId: row.idValue || "",
// // // //             dctId: 0,
// // // //             month: parseInt(month),
// // // //             year: parseInt(year),
// // // //             totalBurdenCost: 0,
// // // //             burden: 0,
// // // //             ccffRevenue: 0,
// // // //             tnmRevenue: 0,
// // // //             cost: cost,
// // // //             fringe: 0,
// // // //             overhead: 0,
// // // //             gna: 0,
// // // //             forecastedhours: 0,
// // // //             createdat: new Date().toISOString(),
// // // //             updatedat: new Date().toISOString(),
// // // //             displayText: row.amountType || "",
// // // //           };
// // // //           await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount", payload);
// // // //         }
// // // //       }
// // // //       alert("All monthly forecast entries saved successfully!");
// // // //     } catch (err) {
// // // //       console.error("Forecast save error:", err);
// // // //       alert("Failed to save some entries – see console.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="space-y-4 font-inter">
// // // //       <div className="flex justify-between items-center bg-gray-100 p-3 rounded border">
// // // //         <span>ProjID: {projectInfo.projectId} | Type: {projectInfo.type} | Ver: {projectInfo.version} | Status: {projectInfo.status}</span>
// // // //         <div className="space-x-2">
// // // //           <button onClick={addNewRow} disabled={!isEditable} className="bg-blue-500 text-white px-3 rounded">➕ Add Row</button>
// // // //           <button onClick={handleSaveAll} disabled={!isEditable} className="bg-green-600 text-white px-3 rounded">💾 Save All</button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full bg-white border rounded">
// // // //           <thead className="bg-gray-100">
// // // //             <tr className="divide-x">
// // // //               {["Line","Hide","Amt Type","ID Type","ID","Name","Explanation","Acct","Org","GLC/PLC","Rev","Brd","Total"]
// // // //                .map(t => <th key={t} className="p-2 text-xs">{t}</th>)}
// // // //               {periods.map(p => <th key={p} className="p-2 text-xs text-center bg-blue-50">{p}</th>)}
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {rows.map((r, i) => (
// // // //               <tr key={r.id} className="divide-x hover:bg-gray-50">
// // // //                 <td className="p-1 text-sm">{i + 1}</td>
// // // //                 <td className="p-1"><input type="checkbox" checked={r.hide} disabled={!isEditable} onChange={e => updateField(i, "hide", e.target.checked)} /></td>
// // // //                 <td className="p-1">
// // // //                   <select value={r.amountType} disabled={!isEditable} onChange={e => updateField(i, "amountType", e.target.value)}>
// // // //                     {amountsTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
// // // //                   </select>
// // // //                 </td>
// // // //                 <td className="p-1">
// // // //                   <select value={r.idType} disabled={!isEditable} onChange={e => updateField(i, "idType", e.target.value)}>
// // // //                     {idTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
// // // //                   </select>
// // // //                 </td>
// // // //                 {["idValue","name","explanation","acctId","orgId","glcPlc"].map(f =>
// // // //                   <td key={f} className="p-1">
// // // //                     <input type="text" value={r[f]} disabled={!isEditable} onChange={e => updateField(i, f, e.target.value)} />
// // // //                   </td>
// // // //                 )}
// // // //                 <td className="p-1"><input type="checkbox" checked={r.rev} disabled={!isEditable} onChange={e => updateField(i, "rev", e.target.checked)} /></td>
// // // //                 <td className="p-1"><input type="checkbox" checked={r.brd} disabled={!isEditable} onChange={e => updateField(i, "brd", e.target.checked)} /></td>
// // // //                 <td className="p-1">
// // // //                   <input type="text" value={r.total} disabled={!isEditable} onChange={e => updateField(i, "total", e.target.value)} />
// // // //                 </td>

// // // //                 {periods.map(p => (
// // // //                   <td key={p} className="p-1">
// // // //                     <input type="number" min="0" step="0.01" disabled={!isEditable}
// // // //                       value={r.periodAmounts[p] || ""}
// // // //                       onChange={e => updatePeriod(i, p, e.target.value)}
// // // //                     />
// // // //                   </td>
// // // //                 ))}
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;


// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const EMPLOYEE_COLUMNS = [
// // // //   { key: "idType", label: "ID Type" },
// // // //   { key: "emplId", label: "ID" },
// // // //   { key: "name", label: "Name" },
// // // //   { key: "status", label: "Status" },
// // // //   { key: "acctId", label: "Account" },
// // // //   { key: "orgId", label: "Organization" },
// // // //   { key: "glcPlc", label: "Plc" },
// // // // ];

// // // // const ROW_HEIGHT_DEFAULT = 64;

// // // // const ProjectAmountDetails = ({ planId, status, planType, closedPeriod, startDate, endDate, employees, isForecastLoading }) => {
// // // //   const [durations, setDurations] = useState([]);
// // // //   const [inputValues, setInputValues] = useState({});
// // // //   const [loading, setLoading] = useState(false);

// // // //   const isEditable = status === "Working";

// // // //   useEffect(() => {
// // // //     const fetchDurations = async () => {
// // // //       if (!startDate || !endDate) return;

// // // //       try {
// // // //         const res = await axios.get(
// // // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
// // // //         );
// // // //         if (Array.isArray(res.data)) {
// // // //           const sorted = [...res.data].sort(
// // // //             (a, b) => new Date(a.year, a.monthNo - 1) - new Date(b.year, b.monthNo - 1)
// // // //           );
// // // //           setDurations(sorted);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch durations", err);
// // // //       }
// // // //     };

// // // //     fetchDurations();
// // // //   }, [startDate, endDate]);

// // // //   const getEmployeeRow = (emp) => ({
// // // //     idType: "Employee",
// // // //     emplId: emp.empl.emplId,
// // // //     name: `${emp.empl.lastName}, ${emp.empl.firstName}`,
// // // //     status: emp.empl.sEmplStatusCd || emp.empl.status || "IN",
// // // //     acctId: emp.empl.accId || "-",
// // // //     orgId: emp.empl.orgId || "-",
// // // //     glcPlc: emp.empl.plcGlcCode || "-",
// // // //   });

// // // //   const handleInputChange = (empIdx, uniqueKey, value) => {
// // // //     if (!isEditable) return;
// // // //     if (!/^\d*\.?\d*$/.test(value)) return;
// // // //     setInputValues((prev) => ({
// // // //       ...prev,
// // // //       [`${empIdx}_${uniqueKey}`]: value,
// // // //     }));
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //     const payload = [];

// // // //     employees.forEach((emp, empIdx) => {
// // // //       durations.forEach((duration) => {
// // // //         const uniqueKey = `${duration.monthNo}_${duration.year}`;
// // // //         const amount = inputValues[`${empIdx}_${uniqueKey}`];

// // // //         if (amount !== undefined && amount !== "") {
// // // //           payload.push({
// // // //             forecastid: 0,
// // // //             projId: planId,
// // // //             plId: emp.empl.plId,
// // // //             emplId: emp.empl.emplId,
// // // //             month: duration.monthNo,
// // // //             year: duration.year,
// // // //             cost: Number(amount),
// // // //             createdat: new Date().toISOString(),
// // // //             updatedat: new Date().toISOString(),
// // // //             displayText: `${duration.month} ${duration.year}`,
// // // //           });
// // // //         }
// // // //       });
// // // //     });

// // // //     try {
// // // //       setLoading(true);
// // // //       await axios.put(
// // // //         "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount",
// // // //         payload,
// // // //         {
// // // //           headers: { "Content-Type": "application/json" },
// // // //         }
// // // //       );
// // // //       alert("Amounts saved successfully.");
// // // //     } catch (err) {
// // // //       alert("Failed to save amounts.");
// // // //       console.error(err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-4 font-inter">
// // // //       <h2 className="text-lg font-semibold mb-3 text-gray-800">Amounts</h2>
// // // //       <button
// // // //         onClick={handleSaveAll}
// // // //         disabled={loading}
// // // //         className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
// // // //       >
// // // //         {loading ? "Saving..." : "Save All"}
// // // //       </button>

// // // //       <div className="flex w-full">
// // // //         {/* LEFT STATIC EMPLOYEE TABLE */}
// // // //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// // // //           <table className="table-fixed text-sm text-left min-w-max border border-gray-300 bg-white rounded-lg">
// // // //             <thead className="bg-blue-100 text-gray-700 font-normal">
// // // //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px` }}>
// // // //                 {EMPLOYEE_COLUMNS.map((col) => (
// // // //                   <th
// // // //                     key={col.key}
// // // //                     className="p-2 border border-gray-200 text-xs font-medium text-gray-900"
// // // //                   >
// // // //                     {col.label}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {employees.map((emp, idx) => {
// // // //                 const row = getEmployeeRow(emp);
// // // //                 return (
// // // //                   <tr
// // // //                     key={emp.empl.emplId}
// // // //                     className="even:bg-gray-50 border-b border-gray-200 hover:bg-blue-50"
// // // //                     style={{ height: `${ROW_HEIGHT_DEFAULT}px` }}
// // // //                   >
// // // //                     {EMPLOYEE_COLUMNS.map((col) => (
// // // //                       <td key={col.key} className="p-2 border-r text-sm text-gray-700">
// // // //                         {row[col.key]}
// // // //                       </td>
// // // //                     ))}
// // // //                   </tr>
// // // //                 );
// // // //               })}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         {/* RIGHT DYNAMIC MONTHLY AMOUNT TABLE */}
// // // //         <div className="w-1/2 overflow-x-auto">
// // // //           <table className="min-w-full text-sm text-center border-collapse border border-gray-300 bg-white rounded-lg">
// // // //             <thead className="bg-blue-100 text-gray-700 font-normal">
// // // //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px` }}>
// // // //                 {durations.map((d) => (
// // // //                   <th key={`${d.year}-${d.monthNo}`} className="py-2 px-3 border text-xs font-medium text-gray-900">
// // // //                     <div className="flex flex-col items-center">
// // // //                       <span>{d.month}</span>
// // // //                       <span className="text-xs text-gray-500">{d.workingHours || 0} hrs</span>
// // // //                     </div>
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {employees.map((emp, empIdx) => (
// // // //                 <tr
// // // //                   key={emp.empl.emplId}
// // // //                   className="even:bg-gray-50 border-b hover:bg-blue-50"
// // // //                   style={{ height: `${ROW_HEIGHT_DEFAULT}px` }}
// // // //                 >
// // // //                   {durations.map((d) => {
// // // //                     const uniqueKey = `${d.monthNo}_${d.year}`;
// // // //                     const value = inputValues[`${empIdx}_${uniqueKey}`] ?? "";
// // // //                     return (
// // // //                       <td key={`${d.year}-${d.monthNo}`} className="py-2 px-3 border">
// // // //                         <input
// // // //                           type="text"
// // // //                           inputMode="decimal"
// // // //                           value={value}
// // // //                           onChange={(e) =>
// // // //                             handleInputChange(empIdx, uniqueKey, e.target.value.replace(/[^0-9.]/g, ""))
// // // //                           }
// // // //                           className="text-center outline-none bg-transparent focus:outline-blue-500 w-[60px] text-sm text-gray-700"
// // // //                           disabled={!isEditable}
// // // //                         />
// // // //                       </td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountDetails;

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const EMPLOYEE_COLUMNS = [
// // // //   { key: "idType", label: "ID Type" },
// // // //   { key: "emplId", label: "ID" },
// // // //   { key: "name", label: "Name" },
// // // //   { key: "status", label: "Status" },
// // // //   { key: "acctId", label: "Account" },
// // // //   { key: "orgId", label: "Organization" },
// // // //   { key: "glcPlc", label: "Plc" },
// // // //   { key: "perHourRate", label: "Hr Rate" },
// // // //   { key: "isRev", label: "Rev" },
// // // //   { key: "isBrd", label: "Brd" },
// // // // ];

// // // // const ROW_HEIGHT_DEFAULT = 64;

// // // // const ProjectAmountsTable = ({ plId, projId, planType, status }) => {
// // // //   const [durations, setDurations] = useState([]);
// // // //   const [employees, setEmployees] = useState([]);
// // // //   const [inputValues, setInputValues] = useState({});
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   const isEditable = status === "Working";

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const [durRes, empRes] = await Promise.all([
// // // //           axios.get(`https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDurationForAmount?plId=${plId}&projId=${projId}`),
// // // //           axios.get(`https://test-api-3tmq.onrender.com/Forecast/GetForecastAmounts?plId=${plId}&projId=${projId}`),
// // // //         ]);

// // // //         setDurations(durRes.data);
// // // //         setEmployees(empRes.data);
// // // //       } catch (err) {
// // // //         console.error("Error fetching data:", err);
// // // //         alert("Failed to load data");
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [plId, projId]);

// // // //   const handleInputChange = (emplId, key, value) => {
// // // //     if (!isEditable) return;
// // // //     if (!/^-?\d*\.?\d*$/.test(value)) return;
// // // //     setInputValues((prev) => ({
// // // //       ...prev,
// // // //       [`${emplId}_${key}`]: value,
// // // //     }));
// // // //   };

// // // //   const handleSaveAll = async () => {
// // // //     const payloads = [];

// // // //     for (const emp of employees) {
// // // //       for (const d of durations) {
// // // //         const key = `${emp.emplId}_${d.monthNo}_${d.year}`;
// // // //         const value = inputValues[key];

// // // //         if (value !== undefined) {
// // // //           payloads.push({
// // // //             forecastedamt: Number(value),
// // // //             forecastid: 0,
// // // //             projId,
// // // //             plId,
// // // //             emplId: emp.emplId,
// // // //             dctId: 0,
// // // //             month: d.monthNo,
// // // //             year: d.year,
// // // //             totalBurdenCost: 0,
// // // //             burden: 0,
// // // //             ccffRevenue: 0,
// // // //             tnmRevenue: 0,
// // // //             cost: Number(value),
// // // //             fringe: 0,
// // // //             overhead: 0,
// // // //             gna: 0,
// // // //             forecastedhours: 0,
// // // //             createdat: new Date().toISOString(),
// // // //             updatedat: new Date().toISOString(),
// // // //             displayText: `${d.month}-${d.year}`,
// // // //           });
// // // //         }
// // // //       }
// // // //     }

// // // //     try {
// // // //       await Promise.all(
// // // //         payloads.map((p) =>
// // // //           axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount", p, {
// // // //             headers: { "Content-Type": "application/json" },
// // // //           })
// // // //         )
// // // //       );
// // // //       alert("All amounts saved successfully");
// // // //     } catch (err) {
// // // //       console.error("Save failed:", err);
// // // //       alert("Error saving amounts");
// // // //     }
// // // //   };

// // // //   if (isLoading) {
// // // //     return <div className="p-4">Loading...</div>;
// // // //   }

// // // //   return (
// // // //     <div className="p-4 font-inter">
// // // //       <h2 className="text-lg font-semibold mb-3 text-gray-800">Amounts</h2>
// // // //       <div className="flex w-full">
// // // //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// // // //           <table className="min-w-max text-sm text-left border border-gray-300 bg-white rounded-lg">
// // // //             <thead className="bg-blue-100 text-gray-700">
// // // //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px` }}>
// // // //                 {EMPLOYEE_COLUMNS.map((col) => (
// // // //                   <th key={col.key} className="p-2 border border-gray-200 text-xs">{col.label}</th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {employees.map((emp) => (
// // // //                 <tr key={emp.emplId} className="even:bg-gray-50 hover:bg-blue-50 border-b border-gray-200">
// // // //                   {EMPLOYEE_COLUMNS.map((col) => (
// // // //                     <td key={col.key} className="p-2 border-r text-sm text-gray-700">
// // // //                       {emp[col.key] ?? "-"}
// // // //                     </td>
// // // //                   ))}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //         <div className="w-1/2 overflow-x-auto">
// // // //           <table className="min-w-full text-sm text-center border border-gray-300 bg-white rounded-lg">
// // // //             <thead className="bg-blue-100 text-gray-700">
// // // //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px` }}>
// // // //                 {durations.map((d) => (
// // // //                   <th key={`${d.monthNo}_${d.year}`} className="py-2 px-3 border text-xs">
// // // //                     {d.month} <br /> ({d.year})
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {employees.map((emp) => (
// // // //                 <tr key={emp.emplId} className="even:bg-gray-50 hover:bg-blue-50 border-b border-gray-200">
// // // //                   {durations.map((d) => {
// // // //                     const key = `${emp.emplId}_${d.monthNo}_${d.year}`;
// // // //                     const value = inputValues[key] ?? "";
// // // //                     return (
// // // //                       <td key={key} className="py-2 px-3 border-r min-w-[100px]">
// // // //                         <input
// // // //                           type="text"
// // // //                           value={value}
// // // //                           onChange={(e) => handleInputChange(emp.emplId, `${d.monthNo}_${d.year}`, e.target.value)}
// // // //                           className="text-center w-full outline-none bg-transparent focus:outline-blue-500 text-sm text-gray-700"
// // // //                         />
// // // //                       </td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //       {isEditable && (
// // // //         <div className="mt-4">
// // // //           <button
// // // //             onClick={handleSaveAll}
// // // //             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
// // // //           >
// // // //             Save All
// // // //           </button>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const AMOUNTS_COLUMNS = [
// // // //   { key: "id", label: "ID" },
// // // //   { key: "name", label: "Name" },
// // // //   { key: "org", label: "Org" },
// // // //   { key: "rev", label: "Rev" },
// // // //   { key: "brd", label: "Brd" },
// // // // ];

// // // // const ProjectAmountsTable = ({ data, selectedPlan }) => {
// // // //   const [durations, setDurations] = useState([]);
// // // //   const [inputValues, setInputValues] = useState({});

// // // //   useEffect(() => {
// // // //     const fetchDurations = async () => {
// // // //       if (!selectedPlan?.startDate || !selectedPlan?.endDate) return;
// // // //       try {
// // // //         const res = await axios.get(
// // // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${selectedPlan.startDate}/${selectedPlan.endDate}`
// // // //         );
// // // //         if (Array.isArray(res.data)) {
// // // //           setDurations(res.data);
// // // //         } else {
// // // //           console.warn("Empty or invalid duration data");
// // // //           setDurations([]);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Error fetching durations:", err);
// // // //         setDurations([]);
// // // //       }
// // // //     };

// // // //     fetchDurations();
// // // //   }, [selectedPlan]);

// // // //   const handleChange = (key, value) => {
// // // //     setInputValues((prev) => ({
// // // //       ...prev,
// // // //       [key]: value,
// // // //     }));
// // // //   };

// // // //   const handleSaveAll = () => {
// // // //     const payload = [];

// // // //     data?.forEach((row, rowIdx) => {
// // // //       durations?.forEach((duration) => {
// // // //         const key = `${rowIdx}_${duration.monthNo}_${duration.year}`;
// // // //         const amount = inputValues[key];
// // // //         const parsed = parseFloat(amount);
// // // //         if (amount !== undefined && Number.isFinite(parsed)) {
// // // //           payload.push({
// // // //             projId: selectedPlan?.projId,
// // // //             plId: selectedPlan?.plId,
// // // //             emplId: row.id,
// // // //             month: duration.monthNo,
// // // //             year: duration.year,
// // // //             cost: parsed,
// // // //           });
// // // //         }
// // // //       });
// // // //     });

// // // //     console.log("Save Payload:", payload);
// // // //     alert("Data logged in console.");
// // // //   };

// // // //   if (!data || !Array.isArray(data) || !selectedPlan) {
// // // //     return <div className="p-4 text-red-600">Data or plan is missing</div>;
// // // //   }

// // // //   return (
// // // //     <div className="p-4 font-inter">
// // // //       <h2 className="text-lg font-semibold mb-3">Amounts</h2>
// // // //       <div className="flex w-full">
// // // //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// // // //           <table className="table-auto border border-gray-300 w-full text-sm">
// // // //             <thead className="bg-blue-100">
// // // //               <tr>
// // // //                 {AMOUNTS_COLUMNS.map((col) => (
// // // //                   <th key={col.key} className="p-2 border border-gray-200">
// // // //                     {col.label}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data.map((row) => (
// // // //                 <tr key={row.id} className="border-t border-gray-200">
// // // //                   <td className="p-2 border-r">{row.id}</td>
// // // //                   <td className="p-2 border-r">{row.name}</td>
// // // //                   <td className="p-2 border-r">{row.org}</td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="checkbox" checked={row.rev === 1} readOnly />
// // // //                   </td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="checkbox" checked={row.brd === 1} readOnly />
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         <div className="w-1/2 overflow-x-auto">
// // // //           <table className="table-auto border border-gray-300 w-full text-sm">
// // // //             <thead className="bg-blue-100">
// // // //               <tr>
// // // //                 {Array.isArray(durations) && durations.length > 0 && durations.map((duration) => (
// // // //                   <th
// // // //                     key={`${duration.year}_${duration.monthNo}`}
// // // //                     className="p-2 border border-gray-200"
// // // //                   >
// // // //                     {duration.month}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data.map((row, rowIdx) => (
// // // //                 <tr key={row.id} className="border-t border-gray-200">
// // // //                   {Array.isArray(durations) && durations.length > 0 && durations.map((duration) => (
// // // //                     <td
// // // //                       key={`${duration.year}_${duration.monthNo}`}
// // // //                       className="p-2 border-r"
// // // //                     >
// // // //                       <input
// // // //                         type="text"
// // // //                         value={inputValues[`${rowIdx}_${duration.monthNo}_${duration.year}`] || ""}
// // // //                         onChange={(e) =>
// // // //                           handleChange(
// // // //                             `${rowIdx}_${duration.monthNo}_${duration.year}`,
// // // //                             e.target.value.replace(/[^0-9.]/g, "")
// // // //                           )
// // // //                         }
// // // //                         className="w-20 text-center border border-gray-300 rounded"
// // // //                       />
// // // //                     </td>
// // // //                   ))}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //       <div className="flex justify-end mt-4">
// // // //         <button
// // // //           onClick={handleSaveAll}
// // // //           className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// // // //         >
// // // //           Save All
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const AMOUNTS_COLUMNS = [
// // // //   { key: "id", label: "ID" },
// // // //   { key: "name", label: "Name" },
// // // //   { key: "org", label: "Org" },
// // // //   { key: "rev", label: "Rev" },
// // // //   { key: "brd", label: "Brd" },
// // // // ];

// // // // const ProjectAmountsTable = ({ data, selectedPlan }) => {
// // // //   const [durations, setDurations] = useState([]);
// // // //   const [inputValues, setInputValues] = useState({});
// // // //   const [newRow, setNewRow] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchDurations = async () => {
// // // //       if (!selectedPlan?.startDate || !selectedPlan?.endDate) return;
// // // //       try {
// // // //         const res = await axios.get(
// // // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${selectedPlan.startDate}/${selectedPlan.endDate}`
// // // //         );
// // // //         if (Array.isArray(res.data)) {
// // // //           setDurations(res.data);
// // // //         } else {
// // // //           console.warn("Empty or invalid duration data");
// // // //           setDurations([]);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Error fetching durations:", err);
// // // //         setDurations([]);
// // // //       }
// // // //     };

// // // //     fetchDurations();
// // // //   }, [selectedPlan]);

// // // //   const handleChange = (key, value) => {
// // // //     setInputValues((prev) => ({
// // // //       ...prev,
// // // //       [key]: value,
// // // //     }));
// // // //   };

// // // //   const handleSaveAll = () => {
// // // //     const payload = [];

// // // //     data?.forEach((row, rowIdx) => {
// // // //       durations?.forEach((duration) => {
// // // //         const key = `${rowIdx}_${duration.monthNo}_${duration.year}`;
// // // //         const amount = inputValues[key];
// // // //         const parsed = parseFloat(amount);
// // // //         if (amount !== undefined && Number.isFinite(parsed)) {
// // // //           payload.push({
// // // //             projId: selectedPlan?.projId,
// // // //             plId: selectedPlan?.plId,
// // // //             emplId: row.id,
// // // //             month: duration.monthNo,
// // // //             year: duration.year,
// // // //             cost: parsed,
// // // //           });
// // // //         }
// // // //       });
// // // //     });

// // // //     if (newRow) {
// // // //       durations?.forEach((duration) => {
// // // //         const key = `new_${duration.monthNo}_${duration.year}`;
// // // //         const amount = inputValues[key];
// // // //         const parsed = parseFloat(amount);
// // // //         if (amount !== undefined && Number.isFinite(parsed)) {
// // // //           payload.push({
// // // //             projId: selectedPlan?.projId,
// // // //             plId: selectedPlan?.plId,
// // // //             emplId: "", // Add appropriate emplId logic if needed
// // // //             month: duration.monthNo,
// // // //             year: duration.year,
// // // //             cost: parsed,
// // // //           });
// // // //         }
// // // //       });
// // // //     }

// // // //     console.log("Save Payload:", payload);
// // // //     alert("Data logged in console.");
// // // //   };

// // // //   return (
// // // //     <div className="p-4 font-inter">
// // // //       <h2 className="text-lg font-semibold mb-3">Amounts</h2>
// // // //       <div className="mb-3">
// // // //         <button
// // // //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// // // //           onClick={() => setNewRow({ name: "", org: "", rev: false, brd: false })}
// // // //         >
// // // //           + New Row
// // // //         </button>
// // // //       </div>
// // // //       <div className="flex w-full">
// // // //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// // // //           <table className="table-auto border border-gray-300 w-full text-sm">
// // // //             <thead className="bg-blue-100">
// // // //               <tr>
// // // //                 {AMOUNTS_COLUMNS.map((col) => (
// // // //                   <th key={col.key} className="p-2 border border-gray-200">
// // // //                     {col.label}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data?.map((row) => (
// // // //                 <tr key={row.id} className="border-t border-gray-200">
// // // //                   <td className="p-2 border-r">{row.id}</td>
// // // //                   <td className="p-2 border-r">{row.name}</td>
// // // //                   <td className="p-2 border-r">{row.org}</td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="checkbox" checked={row.rev === 1} readOnly />
// // // //                   </td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="checkbox" checked={row.brd === 1} readOnly />
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //               {newRow && (
// // // //                 <tr className="border-t border-gray-200">
// // // //                   <td className="p-2 border-r">-</td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="text" placeholder="Name" className="w-full border px-2 py-1 rounded" />
// // // //                   </td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="text" placeholder="Org" className="w-full border px-2 py-1 rounded" />
// // // //                   </td>
// // // //                   <td className="p-2 border-r text-center">
// // // //                     <input type="checkbox" />
// // // //                   </td>
// // // //                   <td className="p-2 border-r text-center">
// // // //                     <input type="checkbox" />
// // // //                   </td>
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         <div className="w-1/2 overflow-x-auto">
// // // //           <table className="table-auto border border-gray-300 w-full text-sm">
// // // //             <thead className="bg-blue-100">
// // // //               <tr>
// // // //                 {durations.map((duration) => (
// // // //                   <th
// // // //                     key={`${duration.year}_${duration.monthNo}`}
// // // //                     className="p-2 border border-gray-200"
// // // //                   >
// // // //                     {duration.month}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data?.map((row, rowIdx) => (
// // // //                 <tr key={row.id} className="border-t border-gray-200">
// // // //                   {durations.map((duration) => {
// // // //                     const key = `${rowIdx}_${duration.monthNo}_${duration.year}`;
// // // //                     return (
// // // //                       <td
// // // //                         key={`${duration.year}_${duration.monthNo}`}
// // // //                         className="p-2 border-r"
// // // //                       >
// // // //                         <input
// // // //                           type="text"
// // // //                           value={inputValues[key] || ""}
// // // //                           onChange={(e) =>
// // // //                             handleChange(
// // // //                               key,
// // // //                               e.target.value.replace(/[^0-9.]/g, "")
// // // //                             )
// // // //                           }
// // // //                           className={`w-20 text-center border rounded ${
// // // //                             row.status === "working"
// // // //                               ? "border-gray-300"
// // // //                               : "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
// // // //                           }`}
// // // //                           disabled={row.status !== "working"}
// // // //                         />
// // // //                       </td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}
// // // //               {newRow && (
// // // //                 <tr className="border-t border-gray-200">
// // // //                   {durations.map((duration) => {
// // // //                     const key = `new_${duration.monthNo}_${duration.year}`;
// // // //                     return (
// // // //                       <td key={key} className="p-2 border-r">
// // // //                         <input
// // // //                           type="text"
// // // //                           value={inputValues[key] || ""}
// // // //                           onChange={(e) =>
// // // //                             handleChange(
// // // //                               key,
// // // //                               e.target.value.replace(/[^0-9.]/g, "")
// // // //                             )
// // // //                           }
// // // //                           className="w-20 text-center border border-gray-300 rounded"
// // // //                         />
// // // //                       </td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //       <div className="flex justify-end mt-4">
// // // //         <button
// // // //           onClick={handleSaveAll}
// // // //           className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// // // //         >
// // // //           Save All
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;

// // // //------------------------------------------------------------------------------------------------------------------- Latest
// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const AMOUNTS_COLUMNS = [
// // // //   { key: "id", label: "ID" },
// // // //   { key: "name", label: "Name" },
// // // //   { key: "org", label: "Org" },
// // // //   { key: "rev", label: "Rev" },
// // // //   { key: "brd", label: "Brd" },
// // // // ];

// // // // const STATIC_DURATIONS = [
// // // //   { month: "Jan", monthNo: 1, year: 2025 },
// // // //   { month: "Feb", monthNo: 2, year: 2025 },
// // // //   { month: "Mar", monthNo: 3, year: 2025 },
// // // // ];

// // // // const ProjectAmountsTable = ({ data, selectedPlan }) => {
// // // //   const [durations, setDurations] = useState([]);
// // // //   const [inputValues, setInputValues] = useState({});
// // // //   const [newRow, setNewRow] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchDurations = async () => {
// // // //       if (!selectedPlan?.startDate || !selectedPlan?.endDate) {
// // // //         // fallback to static for now
// // // //         setDurations(STATIC_DURATIONS);
// // // //         return;
// // // //       }
// // // //       try {
// // // //         const res = await axios.get(
// // // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${selectedPlan.startDate}/${selectedPlan.endDate}`
// // // //         );
// // // //         if (Array.isArray(res.data)) {
// // // //           setDurations(res.data);
// // // //         } else {
// // // //           console.warn("Empty or invalid duration data");
// // // //           setDurations([]);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Error fetching durations:", err);
// // // //         setDurations([]);
// // // //       }
// // // //     };

// // // //     fetchDurations();
// // // //   }, [selectedPlan]);

// // // //   const handleChange = (key, value) => {
// // // //     setInputValues((prev) => ({
// // // //       ...prev,
// // // //       [key]: value,
// // // //     }));
// // // //   };

// // // //   const handleSaveAll = () => {
// // // //     const payload = [];

// // // //     data?.forEach((row, rowIdx) => {
// // // //       durations?.forEach((duration) => {
// // // //         const key = `${rowIdx}_${duration.monthNo}_${duration.year}`;
// // // //         const amount = inputValues[key];
// // // //         const parsed = parseFloat(amount);
// // // //         if (amount !== undefined && Number.isFinite(parsed)) {
// // // //           payload.push({
// // // //             projId: selectedPlan?.projId,
// // // //             plId: selectedPlan?.plId,
// // // //             emplId: row.id,
// // // //             month: duration.monthNo,
// // // //             year: duration.year,
// // // //             cost: parsed,
// // // //           });
// // // //         }
// // // //       });
// // // //     });

// // // //     if (newRow) {
// // // //       durations?.forEach((duration) => {
// // // //         const key = `new_${duration.monthNo}_${duration.year}`;
// // // //         const amount = inputValues[key];
// // // //         const parsed = parseFloat(amount);
// // // //         if (amount !== undefined && Number.isFinite(parsed)) {
// // // //           payload.push({
// // // //             projId: selectedPlan?.projId,
// // // //             plId: selectedPlan?.plId,
// // // //             emplId: "", // Add appropriate emplId logic if needed
// // // //             month: duration.monthNo,
// // // //             year: duration.year,
// // // //             cost: parsed,
// // // //           });
// // // //         }
// // // //       });
// // // //     }

// // // //     console.log("Save Payload:", payload);
// // // //     alert("Data logged in console.");
// // // //   };

// // // //   return (
// // // //     <div className="p-4 font-inter">
// // // //       <h2 className="text-lg font-semibold mb-3">Amounts</h2>
// // // //       <div className="mb-3">
// // // //         <button
// // // //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// // // //           onClick={() => setNewRow({ name: "", org: "", rev: false, brd: false })}
// // // //         >
// // // //           + New Row
// // // //         </button>
// // // //       </div>
// // // //       <div className="flex w-full">
// // // //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// // // //           <table className="table-auto border border-gray-300 w-full text-sm">
// // // //             <thead className="bg-blue-100">
// // // //               <tr>
// // // //                 {AMOUNTS_COLUMNS.map((col) => (
// // // //                   <th key={col.key} className="p-2 border border-gray-200">
// // // //                     {col.label}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data?.map((row) => (
// // // //                 <tr key={row.id} className="border-t border-gray-200">
// // // //                   <td className="p-2 border-r">{row.id}</td>
// // // //                   <td className="p-2 border-r">{row.name}</td>
// // // //                   <td className="p-2 border-r">{row.org}</td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="checkbox" checked={row.rev === 1} readOnly />
// // // //                   </td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="checkbox" checked={row.brd === 1} readOnly />
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //               {newRow && (
// // // //                 <tr className="border-t border-gray-200">
// // // //                   <td className="p-2 border-r">-</td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="text" placeholder="Name" className="w-full border px-2 py-1 rounded" />
// // // //                   </td>
// // // //                   <td className="p-2 border-r">
// // // //                     <input type="text" placeholder="Org" className="w-full border px-2 py-1 rounded" />
// // // //                   </td>
// // // //                   <td className="p-2 border-r text-center">
// // // //                     <input type="checkbox" />
// // // //                   </td>
// // // //                   <td className="p-2 border-r text-center">
// // // //                     <input type="checkbox" />
// // // //                   </td>
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         <div className="w-1/2 overflow-x-auto">
// // // //           <table className="table-auto border border-gray-300 w-full text-sm">
// // // //             <thead className="bg-blue-100">
// // // //               <tr>
// // // //                 {durations.map((duration) => (
// // // //                   <th
// // // //                     key={`${duration.year}_${duration.monthNo}`}
// // // //                     className="p-2 border border-gray-200"
// // // //                   >
// // // //                     {duration.month}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data?.map((row, rowIdx) => (
// // // //                 <tr key={row.id} className="border-t border-gray-200">
// // // //                   {durations.map((duration) => {
// // // //                     const key = `${rowIdx}_${duration.monthNo}_${duration.year}`;
// // // //                     return (
// // // //                       <td
// // // //                         key={`${duration.year}_${duration.monthNo}`}
// // // //                         className="p-2 border-r"
// // // //                       >
// // // //                         <input
// // // //                           type="text"
// // // //                           value={inputValues[key] || ""}
// // // //                           onChange={(e) =>
// // // //                             handleChange(
// // // //                               key,
// // // //                               e.target.value.replace(/[^0-9.]/g, "")
// // // //                             )
// // // //                           }
// // // //                           className={`w-20 text-center border rounded ${
// // // //                             row.status === "working"
// // // //                               ? "border-gray-300"
// // // //                               : "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
// // // //                           }`}
// // // //                           disabled={row.status !== "working"}
// // // //                         />
// // // //                       </td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}
// // // //               {newRow && (
// // // //                 <tr className="border-t border-gray-200">
// // // //                   {durations.map((duration) => {
// // // //                     const key = `new_${duration.monthNo}_${duration.year}`;
// // // //                     return (
// // // //                       <td key={key} className="p-2 border-r">
// // // //                         <input
// // // //                           type="text"
// // // //                           value={inputValues[key] || ""}
// // // //                           onChange={(e) =>
// // // //                             handleChange(
// // // //                               key,
// // // //                               e.target.value.replace(/[^0-9.]/g, "")
// // // //                             )
// // // //                           }
// // // //                           className="w-20 text-center border border-gray-300 rounded"
// // // //                         />
// // // //                       </td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //       <div className="flex justify-end mt-4">
// // // //         <button
// // // //           onClick={handleSaveAll}
// // // //           className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// // // //         >
// // // //           Save All
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;


// // // //---------------------------------------------------------------------------------------------------

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";

// // // // const STATIC_DURATIONS = [
// // // //   { month: "Jan", monthNo: 1, year: 2025 },
// // // //   { month: "Feb", monthNo: 2, year: 2025 },
// // // //   { month: "Mar", monthNo: 3, year: 2025 },
// // // //   { month: "Apr", monthNo: 4, year: 2025 },
// // // //   { month: "May", monthNo: 5, year: 2025 },
// // // //   { month: "Jun", monthNo: 6, year: 2025 },
// // // // ];

// // // // const ProjectAmountsTable = ({ initialData, startDate, endDate }) => {
// // // //   const [periods, setPeriods] = useState([]);
// // // //   const [entries, setEntries] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [newEntry, setNewEntry] = useState({
// // // //     id: "",
// // // //     revenue: false,
// // // //     orgId: "",
// // // //     amount: 0,
// // // //     burden: false,
// // // //     amountType: null,
// // // //     idType: null,
// // // //   });
// // // //   const [editingId, setEditingId] = useState(null);
// // // //   const [editEntry, setEditEntry] = useState({});
// // // //   const [showRevenue, setShowRevenue] = useState(false);
// // // //   const [showBurden, setShowBurden] = useState(false);
// // // //   const [periodAmounts, setPeriodAmounts] = useState({});

// // // //   // Log props and entries for debugging
// // // //   useEffect(() => {
// // // //     console.log("ProjectAmountsTable Props:", { initialData, startDate, endDate });
// // // //     console.log("Entries length:", entries.length, "Entries:", entries);
// // // //     console.log("Period Amounts:", periodAmounts);
// // // //   }, [initialData, startDate, endDate, entries, periodAmounts]);

// // // //   // Helper function to check if a period is closed (before June 19, 2025, 01:49 AM IST)
// // // //   const isPeriodClosed = (monthNo, year) => {
// // // //     const currentDate = new Date("2025-06-19T00:19:00Z"); // 01:49 AM IST
// // // //     const periodDate = new Date(year, monthNo - 1, 1);
// // // //     return periodDate < currentDate;
// // // //   };

// // // //   // Fetch periods
// // // //   useEffect(() => {
// // // //     const fetchPeriods = async () => {
// // // //       if (!startDate || !endDate) {
// // // //         console.warn("Missing startDate or endDate, using STATIC_DURATIONS");
// // // //         setPeriods(STATIC_DURATIONS);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
// // // //         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
// // // //         console.log("Fetching periods for:", { formattedStartDate, formattedEndDate });

// // // //         const response = await axios.get(
// // // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
// // // //         );
// // // //         console.log("Periods API Response:", response.data);
// // // //         if (Array.isArray(response.data)) {
// // // //           const formattedPeriods = response.data.map((p) => ({
// // // //             month: p.month,
// // // //             monthNo: p.monthNo,
// // // //             year: p.year,
// // // //           }));
// // // //           setPeriods(formattedPeriods);
// // // //         } else {
// // // //           console.warn("Invalid periods API response, using STATIC_DURATIONS");
// // // //           setPeriods(STATIC_DURATIONS);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch periods:", err.message, err.response?.data);
// // // //         setError("Failed to load periods");
// // // //         setPeriods(STATIC_DURATIONS);
// // // //       }
// // // //     };

// // // //     fetchPeriods();
// // // //   }, [startDate, endDate]);

// // // //   // Initialize state with initialData when provided
// // // //   useEffect(() => {
// // // //     if (initialData && initialData.plForecasts && initialData.plForecasts.length > 0) {
// // // //       setLoading(true);
// // // //       try {
// // // //         const entry = {
// // // //           id: initialData.id || "EMP001",
// // // //           revenue: initialData.isRev ? 1 : 0,
// // // //           orgId: initialData.orgId || "1.02",
// // // //           amount: initialData.plForecasts.reduce((sum, forecast) => sum + (parseFloat(forecast.forecastedamt) || 0), 0),
// // // //           burden: initialData.isBrd || false,
// // // //           amountType: initialData.amountType || null,
// // // //           idType: initialData.idType || null,
// // // //         };
// // // //         setEntries([entry]);
// // // //         const initialPeriodAmounts = {};
// // // //         initialData.plForecasts.forEach((forecast) => {
// // // //           const periodKey = `${STATIC_DURATIONS[forecast.month - 1].month}-${forecast.year}`;
// // // //           initialPeriodAmounts[periodKey] = parseFloat(forecast.forecastedamt) || 0;
// // // //         });
// // // //         setPeriodAmounts(initialPeriodAmounts);
// // // //       } catch (err) {
// // // //         console.error("Failed to process initialData:", err.message);
// // // //         setError("Failed to process initial data");
// // // //         setEntries([]);
// // // //         setPeriodAmounts({});
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     } else {
// // // //       setEntries([]);
// // // //       setPeriodAmounts({});
// // // //       setLoading(false);
// // // //     }
// // // //   }, [initialData]);

// // // //   const handleNewInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setNewEntry((prev) => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const handleEditInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setEditEntry((prev) => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const handleCheckboxChange = (field) => {
// // // //     if (field === "revenue") setShowRevenue(!showRevenue);
// // // //     if (field === "burden") setShowBurden(!showBurden);
// // // //   };

// // // //   const handlePeriodAmountChange = (periodKey, value) => {
// // // //     setPeriodAmounts((prev) => ({
// // // //       ...prev,
// // // //       [periodKey]: value ? parseFloat(value) || 0 : 0,
// // // //     }));
// // // //     const totalAmount = Object.values(periodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // // //     if (entries.length > 0) {
// // // //       setEntries([{ ...entries[0], amount: totalAmount }]);
// // // //     }
// // // //   };

// // // //   const handleAddEntry = async () => {
// // // //     if (!newEntry.id || !newEntry.orgId || !newEntry.amountType || !newEntry.idType) {
// // // //       alert("Please fill all required fields");
// // // //       return;
// // // //     }

// // // //     const totalAmount = Object.values(periodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // // //     const newEntryData = {
// // // //       id: newEntry.id,
// // // //       revenue: newEntry.revenue ? 1 : 0,
// // // //       orgId: newEntry.orgId,
// // // //       amount: totalAmount,
// // // //       burden: newEntry.burden,
// // // //       amountType: newEntry.amountType,
// // // //       idType: newEntry.idType,
// // // //     };

// // // //     try {
// // // //       await axios.post(
// // // //         `https://test-api-3tmq.onrender.com/Project/SaveForecastData`,
// // // //         {
// // // //           planId: initialData?.plId || null,
// // // //           revenue: newEntryData.revenue,
// // // //           orgId: newEntryData.orgId,
// // // //           amount: newEntryData.amount,
// // // //           burden: newEntryData.burden,
// // // //           amountType: newEntryData.amountType,
// // // //           idType: newEntryData.idType,
// // // //         }
// // // //       );
// // // //       console.log("Successfully saved new entry to API");
// // // //     } catch (err) {
// // // //       console.error("Failed to save new entry:", err.message, err.response?.data);
// // // //       alert("Failed to save entry to API. It will be added locally.");
// // // //     }

// // // //     setEntries([newEntryData]);
// // // //     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, amountType: null, idType: null });
// // // //     setPeriodAmounts({});
// // // //   };

// // // //   const startEditing = (entry) => {
// // // //     setEditingId(entry.id);
// // // //     setEditEntry({
// // // //       id: entry.id,
// // // //       revenue: entry.revenue,
// // // //       orgId: entry.orgId,
// // // //       amount: entry.amount,
// // // //       burden: entry.burden,
// // // //       amountType: entry.amountType,
// // // //       idType: entry.idType,
// // // //     });
// // // //     const initialPeriodAmounts = {};
// // // //     periods.forEach((p) => {
// // // //       const periodKey = `${p.month}-${p.year}`;
// // // //       initialPeriodAmounts[periodKey] = periodAmounts[periodKey] || (entry.amount / periods.length) || 0;
// // // //     });
// // // //     setPeriodAmounts(initialPeriodAmounts);
// // // //   };

// // // //   const saveEdit = async (id) => {
// // // //     if (!editEntry.id || !editEntry.orgId || !editEntry.amountType || !editEntry.idType) {
// // // //       alert("Please fill all required fields");
// // // //       return;
// // // //     }

// // // //     const totalAmount = Object.values(periodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // // //     const updatedEntry = {
// // // //       id: editEntry.id,
// // // //       revenue: editEntry.revenue ? 1 : 0,
// // // //       orgId: editEntry.orgId,
// // // //       amount: totalAmount,
// // // //       burden: editEntry.burden || false,
// // // //       amountType: editEntry.amountType,
// // // //       idType: editEntry.idType,
// // // //     };

// // // //     try {
// // // //       await axios.post(
// // // //         `https://test-api-3tmq.onrender.com/Project/SaveForecastData`,
// // // //         {
// // // //           planId: initialData?.plId || null,
// // // //           revenue: updatedEntry.revenue,
// // // //           orgId: updatedEntry.orgId,
// // // //           amount: updatedEntry.amount,
// // // //           burden: updatedEntry.burden,
// // // //           amountType: updatedEntry.amountType,
// // // //           idType: updatedEntry.idType,
// // // //         }
// // // //       );
// // // //       console.log("Successfully updated entry in API");
// // // //     } catch (err) {
// // // //       console.error("Failed to update entry:", err.message, err.response?.data);
// // // //       alert("Failed to update entry in API. It will be updated locally.");
// // // //     }

// // // //     setEntries([updatedEntry]);
// // // //     setEditingId(null);
// // // //     setEditEntry({});
// // // //   };

// // // //   const cancelEdit = () => {
// // // //     setEditingId(null);
// // // //     setEditEntry({});
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-32">
// // // //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
// // // //         <span className="ml-2 text-gray-600 text-sm">Loading...</span>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="text-red-500 text-sm">
// // // //         {error}. Using default periods. Please check API connectivity.
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="flex flex-col sm:flex-row gap-4">
// // // //       {/* Left Section: Row Entries */}
// // // //       <div className="w-full sm:w-1/3 border rounded shadow bg-white">
// // // //         <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm">
// // // //           <thead>
// // // //             <tr className="bg-gray-100">
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Employee</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Rev</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Burd</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">ID Type</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Amount Type</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Org ID</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Amount</th>
// // // //               <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Actions</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {entries.length > 0 && (
// // // //               <tr key={entries[0].id} className="hover:bg-gray-50">
// // // //                 {editingId === entries[0].id ? (
// // // //                   <>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <input
// // // //                         type="text"
// // // //                         value={editEntry.id || entries[0].id}
// // // //                         onChange={(e) => setEditEntry({ ...editEntry, id: e.target.value })}
// // // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                       />
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={editEntry.revenue || entries[0].revenue}
// // // //                         onChange={(e) => setEditEntry({ ...editEntry, revenue: e.target.checked })}
// // // //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // // //                       />
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={editEntry.burden || entries[0].burden}
// // // //                         onChange={(e) => setEditEntry({ ...editEntry, burden: e.target.checked })}
// // // //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // // //                       />
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <select
// // // //                         name="idType"
// // // //                         value={editEntry.idType || entries[0].idType || ""}
// // // //                         onChange={(e) => setEditEntry({ ...editEntry, idType: e.target.value })}
// // // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                       >
// // // //                         <option value="">None</option>
// // // //                         <option value="Contract Employee">Contract Employee</option>
// // // //                         <option value="Employee">Employee</option>
// // // //                         <option value="General Labor Category">General Labor Category</option>
// // // //                         <option value="Generic Staff">Generic Staff</option>
// // // //                         <option value="Key Entry">Key Entry</option>
// // // //                         <option value="Project Labor Category">Project Labor Category</option>
// // // //                         <option value="Vendor">Vendor</option>
// // // //                         <option value="Vendor Employee">Vendor Employee</option>
// // // //                       </select>
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <select
// // // //                         name="amountType"
// // // //                         value={editEntry.amountType || entries[0].amountType || ""}
// // // //                         onChange={(e) => setEditEntry({ ...editEntry, amountType: e.target.value })}
// // // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                       >
// // // //                         <option value="">None</option>
// // // //                         <option value="Materials">Materials</option>
// // // //                         <option value="Subcontractors">Subcontractors</option>
// // // //                         <option value="Mat & Handling">Mat & Handling</option>
// // // //                         <option value="Travel">Travel</option>
// // // //                         <option value="Consultants">Consultants</option>
// // // //                         <option value="Other Direct Cost">Other Direct Cost</option>
// // // //                       </select>
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <input
// // // //                         type="text"
// // // //                         value={editEntry.orgId || entries[0].orgId}
// // // //                         onChange={(e) => setEditEntry({ ...editEntry, orgId: e.target.value })}
// // // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                       />
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       {`$${entries[0].amount.toFixed(2)}`}
// // // //                     </td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <div className="flex gap-1 mt-1">
// // // //                         <button
// // // //                           onClick={() => saveEdit(entries[0].id)}
// // // //                           className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700"
// // // //                         >
// // // //                           Save
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={cancelEdit}
// // // //                           className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700"
// // // //                         >
// // // //                           Cancel
// // // //                         </button>
// // // //                       </div>
// // // //                     </td>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{entries[0].id}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{entries[0].revenue ? "Yes" : "No"}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{entries[0].burden ? "Yes" : "No"}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{entries[0].idType || "None"}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{entries[0].amountType || "None"}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{entries[0].orgId}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">{`$${entries[0].amount.toFixed(2)}`}</td>
// // // //                     <td className="border border-gray-300 px-2 py-0.5">
// // // //                       <button
// // // //                         onClick={() => startEditing(entries[0])}
// // // //                         className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
// // // //                       >
// // // //                         Edit
// // // //                       </button>
// // // //                     </td>
// // // //                   </>
// // // //                 )}
// // // //               </tr>
// // // //             )}
// // // //             {entries.length === 0 && (
// // // //               <tr className="bg-gray-50">
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <input
// // // //                     type="text"
// // // //                     name="id"
// // // //                     value={newEntry.id}
// // // //                     onChange={handleNewInputChange}
// // // //                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                     placeholder="Employee"
// // // //                   />
// // // //                 </td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     name="revenue"
// // // //                     checked={newEntry.revenue}
// // // //                     onChange={(e) => setNewEntry({ ...newEntry, revenue: e.target.checked })}
// // // //                     className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     name="burden"
// // // //                     checked={newEntry.burden}
// // // //                     onChange={(e) => setNewEntry({ ...newEntry, burden: e.target.checked })}
// // // //                     className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <select
// // // //                     name="idType"
// // // //                     value={newEntry.idType || ""}
// // // //                     onChange={handleNewInputChange}
// // // //                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                   >
// // // //                     <option value="">None</option>
// // // //                     <option value="Contract Employee">Contract Employee</option>
// // // //                     <option value="Employee">Employee</option>
// // // //                     <option value="General Labor Category">General Labor Category</option>
// // // //                     <option value="Generic Staff">Generic Staff</option>
// // // //                     <option value="Key Entry">Key Entry</option>
// // // //                     <option value="Project Labor Category">Project Labor Category</option>
// // // //                     <option value="Vendor">Vendor</option>
// // // //                     <option value="Vendor Employee">Vendor Employee</option>
// // // //                   </select>
// // // //                 </td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <select
// // // //                     name="amountType"
// // // //                     value={newEntry.amountType || ""}
// // // //                     onChange={handleNewInputChange}
// // // //                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                   >
// // // //                     <option value="">None</option>
// // // //                     <option value="Materials">Materials</option>
// // // //                     <option value="Subcontractors">Subcontractors</option>
// // // //                     <option value="Mat & Handling">Mat & Handling</option>
// // // //                     <option value="Travel">Travel</option>
// // // //                     <option value="Consultants">Consultants</option>
// // // //                     <option value="Other Direct Cost">Other Direct Cost</option>
// // // //                   </select>
// // // //                 </td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <input
// // // //                     type="text"
// // // //                     name="orgId"
// // // //                     value={newEntry.orgId}
// // // //                     onChange={handleNewInputChange}
// // // //                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                     placeholder="Org ID"
// // // //                   />
// // // //                 </td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">$0.00</td>
// // // //                 <td className="border border-gray-300 px-2 py-0.5">
// // // //                   <button
// // // //                     onClick={handleAddEntry}
// // // //                     className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 mt-1 w-full"
// // // //                   >
// // // //                     Save
// // // //                   </button>
// // // //                 </td>
// // // //               </tr>
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //       {/* Right Section: Periods */}
// // // //       <div className="w-full sm:w-2/3 overflow-x-auto border rounded shadow bg-white">
// // // //         {periods.length === 0 ? (
// // // //           <div className="text-center text-gray-500 text-sm py-2">
// // // //             No periods available. Please check date range or API connectivity.
// // // //           </div>
// // // //         ) : (
// // // //           <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm">
// // // //             <thead>
// // // //               <tr className="bg-gray-100">
// // // //                 {periods.map((period) => (
// // // //                   <th
// // // //                     key={`${period.month}-${period.year}`}
// // // //                     className="border border-gray-300 px-2 py-0.5 text-left font-semibold min-w-[120px]"
// // // //                   >
// // // //                     {period.month} {period.year}
// // // //                   </th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               <tr>
// // // //                 {periods.map((period) => {
// // // //                   const periodKey = `${period.month}-${period.year}`;
// // // //                   return (
// // // //                     <td
// // // //                       key={periodKey}
// // // //                       className="border border-gray-300 px-2 py-0.5"
// // // //                     >
// // // //                       <input
// // // //                         type="number"
// // // //                         value={periodAmounts[periodKey] || ""}
// // // //                         onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// // // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                         disabled={isPeriodClosed(period.monthNo, period.year)}
// // // //                         placeholder={isPeriodClosed(period.monthNo, period.year) ? "Closed" : "Amount"}
// // // //                       />
// // // //                     </td>
// // // //                   );
// // // //                 })}
// // // //               </tr>
// // // //             </tbody>
// // // //           </table>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProjectAmountsTable;

// // // import React, { useState, useEffect, useCallback, Fragment } from "react";
// // // import axios from "axios";

// // // const ProjectAmountsTable = ({ initialData, startDate, endDate }) => {
// // //   const [periods, setPeriods] = useState([]);
// // //   const [entries, setEntries] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // State for new entry form fields
// // //   const [newEntry, setNewEntry] = useState({
// // //     id: "",
// // //     revenue: false,
// // //     orgId: "",
// // //     amount: 0,
// // //     burden: false,
// // //     amountType: null,
// // //     accountId: "",
// // //     idType: null,
// // //   });
// // //   // State for new entry's period amounts
// // //   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});

// // //   const [editingId, setEditingId] = useState(null);
// // //   const [editEntry, setEditEntry] = useState({});
// // //   const [periodAmounts, setPeriodAmounts] = useState({});
// // //   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({}); // To store original state for cancel

// // //   // State to hold all pending changes before "Save All"
// // //   const [pendingChanges, setPendingChanges] = useState([]); // Array to store { type: 'new' | 'edit', data: { ... } }

// // //   // State for success message
// // //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// // //   const [successMessageText, setSuccessMessageText] = useState("");

// // //   // Helper function to check if a period is closed (before June 19, 2025, 01:49 AM IST)
// // //   const isPeriodClosed = (monthNo, year) => {
// // //     const currentDate = new Date("2025-06-19T00:19:00Z"); // 01:49 AM IST
// // //     const periodDate = new Date(year, monthNo - 1, 1);
// // //     return periodDate < currentDate;
// // //   };

// // //   // Fetch periods dynamically based on startDate and endDate
// // //   useEffect(() => {
// // //     const fetchPeriods = async () => {
// // //       if (!startDate || !endDate) {
// // //         console.warn("Missing startDate or endDate, cannot fetch periods dynamically.");
// // //         setPeriods([]);
// // //         return;
// // //       }

// // //       try {
// // //         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
// // //         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
// // //         console.log("Fetching periods for amounts:", { formattedStartDate, formattedEndDate });

// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
// // //         );
// // //         if (Array.isArray(response.data)) {
// // //           const formattedPeriods = response.data.map((p) => ({
// // //             month: p.month,
// // //             monthNo: p.monthNo,
// // //             year: p.year,
// // //           }));
// // //           setPeriods(formattedPeriods);
// // //         } else {
// // //           setPeriods([]);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch periods for ProjectAmountsTable:", err.message, err.response?.data);
// // //         setError("Failed to load periods.");
// // //         setPeriods([]);
// // //       }
// // //     };

// // //     fetchPeriods();
// // //   }, [startDate, endDate]);


// // //   // Fetch and initialize state with data for the amounts table
// // //   const fetchProjectData = useCallback(async () => {
// // //     if (initialData?.plId && periods.length > 0) { // Ensure periods are loaded
// // //       setLoading(true);
// // //       try {
// // //         console.log(`Fetching project data for amounts from planId: ${initialData.plId}`);
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
// // //         );
// // //         const apiData = response.data;
// // //         console.log("Amounts API Response:", apiData);

// // //         if (apiData && apiData.empl) { // Check for 'empl' object
// // //           const entry = {
// // //             id: apiData.empl.id || "",
// // //             revenue: apiData.empl.isRev || false,
// // //             orgId: apiData.empl.orgId || "",
// // //             burden: apiData.empl.isBrd || false,
// // //             amountType: apiData.empl.amountType || null,
// // //             accountId: apiData.empl.acctId || "", // Populate Account ID
// // //             idType: apiData.empl.plcGlc || null, // Assuming plcGlc maps to idType
// // //             amount: 0, // Will be calculated from forecasts
// // //           };

// // //           const fetchedPeriodAmountsForExistingEntry = {};
// // //           let totalCalculatedAmount = 0;
// // //           if (apiData.empl.plForecasts && Array.isArray(apiData.empl.plForecasts)) {
// // //             apiData.empl.plForecasts.forEach((forecast) => {
// // //               const periodDetail = periods.find(p => p.monthNo === forecast.month && p.year === forecast.year);
// // //               if (periodDetail) {
// // //                 const periodKey = `${periodDetail.month}-${periodDetail.year}`;
// // //                 const forecastedAmt = parseFloat(forecast.forecastedamt) || 0;
// // //                 fetchedPeriodAmountsForExistingEntry[periodKey] = forecastedAmt;
// // //                 totalCalculatedAmount += forecastedAmt;
// // //               }
// // //             });
// // //           }
// // //           // Set entries with the full entry data and calculated total amount
// // //           setEntries([{ ...entry, amount: totalCalculatedAmount, periodForecasts: fetchedPeriodAmountsForExistingEntry }]); // Store periodForecasts with entry
// // //           setPeriodAmounts(fetchedPeriodAmountsForExistingEntry); // For the currently displayed/edited entry
// // //           setOriginalPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// // //           setNewEntryPeriodAmounts({}); // Clear any pending amounts for the new row
// // //           setPendingChanges([]); // Clear pending changes after a fresh fetch
// // //         } else {
// // //           console.log("No existing project data found or invalid structure for this planId in amounts.");
// // //           setEntries([]);
// // //           setPeriodAmounts({});
// // //           setOriginalPeriodAmounts({});
// // //           setNewEntryPeriodAmounts({}); // Ensure new entry periods are also cleared
// // //           setPendingChanges([]);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch project data for amounts:", err.message, err.response?.data);
// // //         setError("Failed to load project data for amounts.");
// // //         setEntries([]);
// // //         setPeriodAmounts({});
// // //         setOriginalPeriodAmounts({});
// // //         setNewEntryPeriodAmounts({});
// // //         setPendingChanges([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     } else if (!initialData?.plId) { // If planId is missing, reset states
// // //         setEntries([]);
// // //         setPeriodAmounts({});
// // //         setOriginalPeriodAmounts({});
// // //         setNewEntryPeriodAmounts({});
// // //         setPendingChanges([]);
// // //         setLoading(false);
// // //     }
// // //   }, [initialData?.plId, periods]); // Rerun when initialData.plId or periods change

// // //   // Initial data fetch on component mount or relevant prop changes
// // //   useEffect(() => {
// // //     fetchProjectData();
// // //   }, [fetchProjectData]); // Depend on the memoized fetchProjectData

// // //   const handleNewInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setNewEntry((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleEditInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setEditEntry((prev) => ({ ...prev, [name]: value }));

// // //     // Update pending changes for the edited entry
// // //     setPendingChanges(prevChanges => {
// // //         const existingChangeIndex = prevChanges.findIndex(
// // //             change => change.type === 'edit' && change.data.id === editEntry.id
// // //         );
// // //         const updatedEditData = { ...editEntry, [name]: value };
// // //         if (existingChangeIndex > -1) {
// // //             return prevChanges.map((change, index) =>
// // //                 index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// // //             );
// // //         } else {
// // //             return [...prevChanges, { type: 'edit', data: updatedEditData }];
// // //         }
// // //     });
// // //   };

// // //   // Unified change handler for period amounts based on active editing/new entry
// // //   const handlePeriodAmountChange = (periodKey, value) => {
// // //     if (editingId) { // If an existing entry is being edited
// // //       setPeriodAmounts((prev) => {
// // //         const newPrev = { ...prev, [periodKey]: value ? parseFloat(value) || 0 : 0 };
// // //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// // //         // Update the editEntry's total amount and period forecasts for pending changes
// // //         setEditEntry(prevEditEntry => ({ ...prevEditEntry, amount: totalAmount }));

// // //         // Update pending changes for the edited entry's period amounts
// // //         setPendingChanges(prevChanges => {
// // //             const existingChangeIndex = prevChanges.findIndex(
// // //                 change => change.type === 'edit' && change.data.id === editingId
// // //             );
// // //             const updatedPeriodForecasts = { ...newPrev };
// // //             const updatedEditData = {
// // //                 ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : editEntry),
// // //                 amount: totalAmount,
// // //                 periodForecasts: updatedPeriodForecasts // Store periodForecasts for edited entry
// // //             };

// // //             if (existingChangeIndex > -1) {
// // //                 return prevChanges.map((change, index) =>
// // //                     index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// // //                 );
// // //             } else {
// // //                 // If this is the first change to this entry during editing, add it to pendingChanges
// // //                 return [...prevChanges, { type: 'edit', data: updatedEditData }];
// // //             }
// // //         });
// // //         return newPrev;
// // //       });
// // //     } else { // This handles the new entry row
// // //       setNewEntryPeriodAmounts((prev) => {
// // //         const newPrev = { ...prev, [periodKey]: value ? parseFloat(value) || 0 : 0 };
// // //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // //         setNewEntry(prevNewEntry => ({ ...prevNewEntry, amount: totalAmount }));

// // //         // Update pending changes for the new entry's period amounts
// // //         setPendingChanges(prevChanges => {
// // //             const existingChangeIndex = prevChanges.findIndex(
// // //                 change => change.type === 'new' && change.data.id === newEntry.id
// // //             );
// // //             const updatedPeriodForecasts = { ...newPrev };
// // //             const updatedNewData = {
// // //                 ...newEntry, // Ensure all newEntry fields are included
// // //                 amount: totalAmount,
// // //                 periodForecasts: updatedPeriodForecasts // Store periodForecasts for new entry
// // //             };

// // //             if (existingChangeIndex > -1) {
// // //                 return prevChanges.map((change, index) =>
// // //                     index === existingChangeIndex ? { ...change, data: updatedNewData } : change
// // //                 );
// // //             } else {
// // //                 // Add the new entry to pending changes
// // //                 return [...prevChanges, { type: 'new', data: updatedNewData }];
// // //             }
// // //         });
// // //         return newPrev;
// // //       });
// // //     }
// // //   };

// // //   const addPendingNewEntry = () => {
// // //     if (!newEntry.idType || !newEntry.amountType || !newEntry.accountId) {
// // //       setSuccessMessageText("Please fill all required fields for new entry before adding: ID Type, Amount Type, Account ID.");
// // //       setShowSuccessMessage(true);
// // //       setTimeout(() => setShowSuccessMessage(false), 3000);
// // //       return;
// // //     }

// // //     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// // //     const entryToAdd = {
// // //         ...newEntry,
// // //         amount: totalAmount,
// // //         periodForecasts: newEntryPeriodAmounts, // Store period forecasts with the entry
// // //     };

// // //     // Add to entries for immediate display
// // //     setEntries(prevEntries => [...prevEntries, entryToAdd]);

// // //     // Add to pending changes
// // //     setPendingChanges(prevChanges => [...prevChanges, { type: 'new', data: entryToAdd }]);

// // //     // Reset new entry form and its period amounts for the next blank row
// // //     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, amountType: null, accountId: "", idType: null });
// // //     setNewEntryPeriodAmounts({});
// // //   };

// // //   const startEditing = (entry) => {
// // //     setEditingId(entry.id);
// // //     setEditEntry({
// // //       id: entry.id,
// // //       revenue: entry.revenue,
// // //       orgId: entry.orgId,
// // //       amount: entry.amount,
// // //       burden: entry.burden,
// // //       amountType: entry.amountType,
// // //       accountId: entry.accountId,
// // //       idType: entry.idType,
// // //     });
// // //     setPeriodAmounts(entry.periodForecasts || {}); // Populate periodAmounts for the edited entry
// // //     setOriginalPeriodAmounts(entry.periodForecasts || {}); // Store for cancel
// // //   };

// // //   const cancelEdit = () => {
// // //     setEditingId(null);
// // //     setEditEntry({});
// // //     setPeriodAmounts(originalPeriodAmounts); // Revert to original amounts for the edited row

// // //     // Remove pending changes for this specific edit if cancelled
// // //     setPendingChanges(prevChanges =>
// // //         prevChanges.filter(change => !(change.type === 'edit' && change.data.id === editingId))
// // //     );
// // //   };

// // //   const handleSaveAll = async () => {
// // //     setLoading(true);
// // //     let successCount = 0;
// // //     let errorCount = 0;

// // //     for (const change of pendingChanges) {
// // //         const { type, data } = change;
// // //         const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // //         const payloadForecasts = periods.map(period => ({
// // //             forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
// // //             projId: initialData?.projId || "N/A",
// // //             plId: initialData?.plId || 0,
// // //             emplId: data.id,
// // //             dctId: initialData?.dctId || 0,
// // //             month: period.monthNo,
// // //             year: period.year,
// // //         }));

// // //         const payload = {
// // //             dctId: initialData?.dctId || 0,
// // //             plId: initialData?.plId || 0,
// // //             acctId: data.accountId,
// // //             orgId: data.orgId,
// // //             notes: type === 'new' ? "Auto-generated from UI" : "Auto-updated from UI",
// // //             category: "Direct Cost",
// // //             amountType: data.amountType,
// // //             id: data.id,
// // //             isRev: data.revenue,
// // //             isBrd: data.burden,
// // //             plcGlc: data.idType,
// // //             plForecasts: payloadForecasts,
// // //         };

// // //         try {
// // //             await axios.post(
// // //                 `https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost`,
// // //                 payload
// // //             );
// // //             successCount++;
// // //         } catch (err) {
// // //             console.error(`Failed to save ${type} entry ${data.id}:`, err.message, err.response?.data);
// // //             errorCount++;
// // //         }
// // //     }

// // //     if (errorCount === 0 && successCount > 0) {
// // //         setSuccessMessageText(`Successfully saved ${successCount} entries!`);
// // //     } else if (successCount > 0 && errorCount > 0) {
// // //         setSuccessMessageText(`Saved ${successCount} entries with ${errorCount} errors.`);
// // //     } else if (errorCount > 0) {
// // //         setSuccessMessageText(`Failed to save ${errorCount} entries.`);
// // //     } else {
// // //         setSuccessMessageText("No changes to save.");
// // //     }
// // //     setShowSuccessMessage(true);
// // //     setTimeout(() => setShowSuccessMessage(false), 3000);

// // //     // After attempting to save all, re-fetch all data to get the latest state from the backend
// // //     setPendingChanges([]); // Clear pending changes regardless of individual success/failure
// // //     await fetchProjectData();
// // //     setLoading(false);
// // //   };


// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-32">
// // //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
// // //         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="text-red-500 text-sm">
// // //         {error}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="relative p-4"> {/* Main wrapper for entire component, made relative and added padding */}
// // //       {/* Success/Error Message */}
// // //       {showSuccessMessage && (
// // //         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50
// // //           ${successMessageText.includes("successfully") ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
// // //           {successMessageText}
// // //         </div>
// // //       )}

// // //       {/* Save All Button in its own row, aligned to the right */}
// // //       <div className="w-full flex justify-end mb-4"> {/* Added mb-4 for margin-bottom */}
// // //         <button
// // //           onClick={handleSaveAll}
// // //           className={`bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:bg-blue-700 transition-colors
// // //             ${pendingChanges.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// // //           disabled={pendingChanges.length === 0}
// // //         >
// // //           Save All ({pendingChanges.length})
// // //         </button>
// // //       </div>

// // //       {/* Main content area: Left Section (Table) and Right Section (Periods) */}
// // //       <div className="flex flex-col sm:flex-row gap-4"> {/* Removed relative from here */}
// // //         {/* Left Section: Row Entries */}
// // //         <div className="w-full sm:w-1/3 border rounded shadow bg-white">
// // //           <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm">
// // //             <thead>
// // //               <tr className="bg-gray-100">
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Employee</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Rev</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Burd</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">ID Type</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Amount Type</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Account ID</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Org ID</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Amount</th>
// // //                 <th className="border border-gray-300 px-2 py-0.5 text-left font-semibold">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               <Fragment>
// // //                 {entries.map((entry) => (
// // //                   <tr key={entry.id} className="hover:bg-gray-50">
// // //                     {editingId === entry.id ? (
// // //                       <>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <input
// // //                             type="text"
// // //                             value={editEntry.id || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <input
// // //                             type="checkbox"
// // //                             checked={editEntry.revenue}
// // //                             onChange={(e) => handleEditInputChange({ target: { name: 'revenue', value: e.target.checked }})}
// // //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <input
// // //                             type="checkbox"
// // //                             checked={editEntry.burden}
// // //                             onChange={(e) => handleEditInputChange({ target: { name: 'burden', value: e.target.checked }})}
// // //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <select
// // //                             name="idType"
// // //                             value={editEntry.idType || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           >
// // //                             <option value="">None</option>
// // //                             <option value="Contract Employee">Contract Employee</option>
// // //                             <option value="Employee">Employee</option>
// // //                             <option value="General Labor Category">General Labor Category</option>
// // //                             <option value="Generic Staff">Generic Staff</option>
// // //                             <option value="Key Entry">Key Entry</option>
// // //                             <option value="Project Labor Category">Project Labor Category</option>
// // //                             <option value="Vendor">Vendor</option>
// // //                             <option value="Vendor Employee">Vendor Employee</option>
// // //                           </select>
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <select
// // //                             name="amountType"
// // //                             value={editEntry.amountType || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           >
// // //                             <option value="">None</option>
// // //                             <option value="Materials">Materials</option>
// // //                             <option value="Subcontractors">Subcontractors</option>
// // //                             <option value="Mat & Handling">Mat & Handling</option>
// // //                             <option value="Travel">Travel</option>
// // //                             <option value="Consultants">Consultants</option>
// // //                             <option value="Other Direct Cost">Other Direct Cost</option>
// // //                           </select>
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <input
// // //                             type="text"
// // //                             name="accountId"
// // //                             value={editEntry.accountId || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                             placeholder="Account ID"
// // //                           />
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <input
// // //                             type="text"
// // //                             value={editEntry.orgId || ""}
// // //                             onChange={(e) => handleEditInputChange({ target: { name: 'orgId', value: e.target.value }})}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           {`$${editEntry.amount?.toFixed(2) || "0.00"}`}
// // //                         </td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <div className="flex gap-1 mt-1">
// // //                             <button
// // //                               onClick={cancelEdit}
// // //                               className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700"
// // //                             >
// // //                               Cancel
// // //                             </button>
// // //                           </div>
// // //                         </td>
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.revenue ? "Yes" : "No"}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.burden ? "Yes" : "No"}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{entry.orgId}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">{`$${entry.amount.toFixed(2)}`}</td>
// // //                         <td className="border border-gray-300 px-2 py-0.5">
// // //                           <button
// // //                             onClick={() => startEditing(entry)}
// // //                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
// // //                           >
// // //                             Edit
// // //                           </button>
// // //                         </td>
// // //                       </>
// // //                     )}
// // //                   </tr>
// // //                 ))}
// // //                 {/* This row is always for adding new entries */}
// // //                 <tr className="bg-gray-50">
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <input
// // //                         type="text"
// // //                         name="id"
// // //                         value={newEntry.id}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                         placeholder="Employee"
// // //                       />
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <input
// // //                         type="checkbox"
// // //                         name="revenue"
// // //                         checked={newEntry.revenue}
// // //                         onChange={(e) => handleNewInputChange({ target: { name: 'revenue', value: e.target.checked }})}
// // //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                       />
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <input
// // //                         type="checkbox"
// // //                         name="burden"
// // //                         checked={newEntry.burden}
// // //                         onChange={(e) => handleNewInputChange({ target: { name: 'burden', value: e.target.checked }})}
// // //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                       />
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <select
// // //                         name="idType"
// // //                         value={newEntry.idType || ""}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                       >
// // //                         <option value="">None</option>
// // //                         <option value="Contract Employee">Contract Employee</option>
// // //                         <option value="Employee">Employee</option>
// // //                         <option value="General Labor Category">General Labor Category</option>
// // //                         <option value="Generic Staff">Generic Staff</option>
// // //                         <option value="Key Entry">Key Entry</option>
// // //                         <option value="Project Labor Category">Project Labor Category</option>
// // //                         <option value="Vendor">Vendor</option>
// // //                         <option value="Vendor Employee">Vendor Employee</option>
// // //                       </select>
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <select
// // //                         name="amountType"
// // //                         value={newEntry.amountType || ""}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                       >
// // //                         <option value="">None</option>
// // //                         <option value="Materials">Materials</option>
// // //                         <option value="Subcontractors">Subcontractors</option>
// // //                         <option value="Mat & Handling">Mat & Handling</option>
// // //                         <option value="Travel">Travel</option>
// // //                         <option value="Consultants">Consultants</option>
// // //                         <option value="Other Direct Cost">Other Direct Cost</option>
// // //                       </select>
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <input
// // //                         type="text"
// // //                         name="accountId"
// // //                         value={newEntry.accountId}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                         placeholder="Account ID"
// // //                       />
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <input
// // //                         type="text"
// // //                         name="orgId"
// // //                         value={newEntry.orgId}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                         placeholder="Org ID"
// // //                       />
// // //                     </td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">$0.00</td>
// // //                     <td className="border border-gray-300 px-2 py-0.5">
// // //                       <button
// // //                         onClick={addPendingNewEntry} // Changed to add to pending changes
// // //                         className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 mt-1 w-full"
// // //                       >
// // //                         Add
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //               </Fragment>
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Right Section: Periods */}
// // //         <div className="w-full sm:w-2/3 overflow-x-auto border rounded shadow bg-white">
// // //           {periods.length === 0 ? (
// // //             <div className="text-center text-gray-500 text-sm py-2">
// // //               No periods available. Please select a project with a valid date range.
// // //             </div>
// // //           ) : (
// // //             <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm">
// // //               <thead>
// // //                 <tr className="bg-gray-100">
// // //                   {periods.map((period) => (
// // //                     <th
// // //                       key={`${period.month}-${period.year}`}
// // //                       className="border border-gray-300 px-2 py-0.5 text-left font-semibold min-w-[120px]"
// // //                     >
// // //                       {period.month} {period.year}
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {/* Render period inputs for existing entries */}
// // //                 {entries.map((entry) => (
// // //                    <tr key={`periods-${entry.id}`}>
// // //                     {periods.map((period) => {
// // //                       const periodKey = `${period.month}-${period.year}`;
// // //                       const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// // //                       const placeholderText = isInputDisabled ? "Closed" : "Amount";

// // //                       // Use periodAmounts if editing this specific entry, otherwise display from entry.periodForecasts
// // //                       const displayAmount = editingId === entry.id ? periodAmounts[periodKey] : (entry.periodForecasts ? entry.periodForecasts[periodKey] : '');

// // //                       return (
// // //                         <td
// // //                           key={periodKey}
// // //                           className="border border-gray-300 px-2 py-0.5"
// // //                         >
// // //                           <input
// // //                             type="number"
// // //                             value={displayAmount || ""}
// // //                             onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                             disabled={isInputDisabled || editingId !== entry.id} // Disable if not editing this specific row
// // //                             placeholder={placeholderText}
// // //                           />
// // //                         </td>
// // //                       );
// // //                     })}
// // //                   </tr>
// // //                 ))}
// // //                  {/* Render the blank row's period inputs for new entry separately */}
// // //                    <tr>
// // //                     {periods.map((period) => {
// // //                       const periodKey = `${period.month}-${period.year}`;
// // //                       const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// // //                       const placeholderText = isInputDisabled ? "Closed" : "Amount";
// // //                       return (
// // //                         <td
// // //                           key={periodKey}
// // //                           className="border border-gray-300 px-2 py-0.5"
// // //                         >
// // //                           <input
// // //                             type="number"
// // //                             value={newEntryPeriodAmounts[periodKey] || ""} // Use newEntryPeriodAmounts for the new row
// // //                             onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                             disabled={isInputDisabled || editingId !== null} // Disable if an existing row is being edited
// // //                             placeholder={placeholderText}
// // //                           />
// // //                         </td>
// // //                       );
// // //                     })}
// // //                   </tr>
// // //               </tbody>
// // //             </table>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProjectAmountsTable;

// // // import React, { useState, useEffect, useCallback, Fragment } from "react";
// // // import axios from "axios";

// // // const ENTRY_COLUMNS = [
// // //   { key: "id", label: "ID" },
// // //   { key: "revenue", label: "Rev" },
// // //   { key: "burden", label: "Burd" },
// // //   { key: "idType", label: "ID Type" },
// // //   { key: "amountType", label: "Amount Type" },
// // //   { key: "accountId", label: "Account ID" },
// // //   { key: "orgId", label: "Org ID" },
// // //   { key: "amount", label: "Total Amount" },
// // //   { key: "actions", label: "Actions" },
// // // ];

// // // const ROW_HEIGHT_DEFAULT = 64; // Consistent with ProjectHoursDetails

// // // const ProjectAmountsTable = ({ initialData, startDate, endDate }) => {
// // //   const [periods, setPeriods] = useState([]);
// // //   const [entries, setEntries] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // State for new entry form fields
// // //   const [newEntry, setNewEntry] = useState({
// // //     id: "",
// // //     revenue: false,
// // //     orgId: "",
// // //     amount: 0,
// // //     burden: false,
// // //     amountType: null,
// // //     accountId: "",
// // //     idType: null,
// // //   });
// // //   // State for new entry's period amounts
// // //   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});

// // //   const [editingId, setEditingId] = useState(null);
// // //   const [editEntry, setEditEntry] = useState({});
// // //   const [periodAmounts, setPeriodAmounts] = useState({});
// // //   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({}); // To store original state for cancel

// // //   // State to hold all pending changes before "Save All"
// // //   const [pendingChanges, setPendingChanges] = useState([]); // Array to store { type: 'new' | 'edit', data: { ... } }

// // //   // State for success message
// // //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// // //   const [successMessageText, setSuccessMessageText] = useState("");

// // //   // Helper function to check if a period is closed (before June 19, 2025, 01:49 AM IST)
// // //   // This function matches the one in ProjectHoursDetails for consistency
// // //   const isPeriodClosed = (monthNo, year) => {
// // //     const currentDate = new Date("2025-06-19T00:19:00Z"); // 01:49 AM IST
// // //     const periodDate = new Date(year, monthNo - 1, 1);
// // //     return periodDate < currentDate;
// // //   };

// // //   // Fetch periods dynamically based on startDate and endDate
// // //   useEffect(() => {
// // //     const fetchPeriods = async () => {
// // //       if (!startDate || !endDate) {
// // //         console.warn("Missing startDate or endDate, cannot fetch periods dynamically.");
// // //         setPeriods([]);
// // //         return;
// // //       }

// // //       try {
// // //         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
// // //         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
// // //         console.log("Fetching periods for amounts:", { formattedStartDate, formattedEndDate });

// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
// // //         );
// // //         if (Array.isArray(response.data)) {
// // //           const formattedPeriods = response.data.map((p) => ({
// // //             month: p.month,
// // //             monthNo: p.monthNo,
// // //             year: p.year,
// // //             workingHours: p.workingHours, // Include workingHours for consistency with Hours table if needed
// // //           }));
// // //           setPeriods(formattedPeriods);
// // //         } else {
// // //           setPeriods([]);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch periods for ProjectAmountsTable:", err.message, err.response?.data);
// // //         setError("Failed to load periods.");
// // //         setPeriods([]);
// // //       }
// // //     };

// // //     fetchPeriods();
// // //   }, [startDate, endDate]);

// // //   // Fetch and initialize state with data for the amounts table
// // //   const fetchProjectData = useCallback(async () => {
// // //     // Ensure periods are loaded and initialData.plId is available
// // //     if (initialData?.plId && periods.length > 0) {
// // //       setLoading(true);
// // //       try {
// // //         console.log(`Fetching project data for amounts from planId: ${initialData.plId}`);
// // //         const response = await axios.get(
// // //           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
// // //         );
// // //         const apiData = response.data;
// // //         console.log("Amounts API Response:", apiData);

// // //         if (apiData && apiData.empl) { // Check for 'empl' object
// // //           const entry = {
// // //             id: apiData.empl.id || "",
// // //             revenue: apiData.empl.isRev || false,
// // //             orgId: apiData.empl.orgId || "",
// // //             burden: apiData.empl.isBrd || false,
// // //             amountType: apiData.empl.amountType || null,
// // //             accountId: apiData.empl.acctId || "", // Populate Account ID
// // //             idType: apiData.empl.plcGlc || null, // Assuming plcGlc maps to idType
// // //             amount: 0, // Will be calculated from forecasts
// // //           };

// // //           const fetchedPeriodAmountsForExistingEntry = {};
// // //           let totalCalculatedAmount = 0;
// // //           if (apiData.empl.plForecasts && Array.isArray(apiData.empl.plForecasts)) {
// // //             apiData.empl.plForecasts.forEach((forecast) => {
// // //               const periodDetail = periods.find(p => p.monthNo === forecast.month && p.year === forecast.year);
// // //               if (periodDetail) {
// // //                 const periodKey = `${periodDetail.month}-${periodDetail.year}`;
// // //                 const forecastedAmt = parseFloat(forecast.forecastedamt) || 0;
// // //                 fetchedPeriodAmountsForExistingEntry[periodKey] = forecastedAmt;
// // //                 totalCalculatedAmount += forecastedAmt;
// // //               }
// // //             });
// // //           }
// // //           // Set entries with the full entry data and calculated total amount
// // //           setEntries([{ ...entry, amount: totalCalculatedAmount, periodForecasts: fetchedPeriodAmountsForExistingEntry }]); // Store periodForecasts with entry
// // //           setPeriodAmounts(fetchedPeriodAmountsForExistingEntry); // For the currently displayed/edited entry
// // //           setOriginalPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// // //           setNewEntryPeriodAmounts({}); // Clear any pending amounts for the new row
// // //           setPendingChanges([]); // Clear pending changes after a fresh fetch
// // //         } else {
// // //           console.log("No existing project data found or invalid structure for this planId in amounts.");
// // //           setEntries([]);
// // //           setPeriodAmounts({});
// // //           setOriginalPeriodAmounts({});
// // //           setNewEntryPeriodAmounts({}); // Ensure new entry periods are also cleared
// // //           setPendingChanges([]);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch project data for amounts:", err.message, err.response?.data);
// // //         setError("Failed to load project data for amounts.");
// // //         setEntries([]);
// // //         setPeriodAmounts({});
// // //         setOriginalPeriodAmounts({});
// // //         setNewEntryPeriodAmounts({});
// // //         setPendingChanges([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     } else if (!initialData?.plId) { // If planId is missing, reset states
// // //         setEntries([]);
// // //         setPeriodAmounts({});
// // //         setOriginalPeriodAmounts({});
// // //         setNewEntryPeriodAmounts({});
// // //         setPendingChanges([]);
// // //         setLoading(false);
// // //     }
// // //   }, [initialData?.plId, periods]); // Rerun when initialData.plId or periods change

// // //   // Initial data fetch on component mount or relevant prop changes
// // //   useEffect(() => {
// // //     fetchProjectData();
// // //   }, [fetchProjectData]); // Depend on the memoized fetchProjectData

// // //   const handleNewInputChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setNewEntry((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
// // //   };

// // //   const handleEditInputChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setEditEntry((prev) => {
// // //       const updatedEditEntry = { ...prev, [name]: type === 'checkbox' ? checked : value };

// // //       // Update pending changes for the edited entry
// // //       setPendingChanges(prevChanges => {
// // //         const existingChangeIndex = prevChanges.findIndex(
// // //           change => change.type === 'edit' && change.data.id === editingId
// // //         );
// // //         const updatedEditData = {
// // //           ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : prev), // Use existing data if available
// // //           ...updatedEditEntry
// // //         };

// // //         if (existingChangeIndex > -1) {
// // //           return prevChanges.map((change, index) =>
// // //             index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// // //           );
// // //         } else {
// // //           // Add the original entry to pending changes first, then apply the edit
// // //           const originalEntry = entries.find(entry => entry.id === editingId);
// // //           return [
// // //             ...prevChanges,
// // //             { type: 'edit', data: { ...originalEntry, ...updatedEditData } }
// // //           ];
// // //         }
// // //       });
// // //       return updatedEditEntry;
// // //     });
// // //   };


// // //   // Unified change handler for period amounts based on active editing/new entry
// // //   const handlePeriodAmountChange = (periodKey, value) => {
// // //     const numericValue = value ? parseFloat(value) || 0 : 0;

// // //     if (editingId) { // If an existing entry is being edited
// // //       setPeriodAmounts((prev) => {
// // //         const newPrev = { ...prev, [periodKey]: numericValue };
// // //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// // //         setEditEntry(prevEditEntry => {
// // //           const updatedEditEntry = { ...prevEditEntry, amount: totalAmount };
          
// // //           setPendingChanges(prevChanges => {
// // //             const existingChangeIndex = prevChanges.findIndex(
// // //               change => change.type === 'edit' && change.data.id === editingId
// // //             );
// // //             const updatedPeriodForecasts = { ...newPrev };
// // //             const updatedEditData = {
// // //               ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : updatedEditEntry),
// // //               amount: totalAmount,
// // //               periodForecasts: updatedPeriodForecasts
// // //             };

// // //             if (existingChangeIndex > -1) {
// // //               return prevChanges.map((change, index) =>
// // //                 index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// // //               );
// // //             } else {
// // //               // If this is the first change to this entry during editing, add it to pendingChanges
// // //               const originalEntry = entries.find(entry => entry.id === editingId);
// // //               return [...prevChanges, { type: 'edit', data: { ...originalEntry, ...updatedEditData } }];
// // //             }
// // //           });
// // //           return updatedEditEntry;
// // //         });
// // //         return newPrev;
// // //       });
// // //     } else { // This handles the new entry row
// // //       setNewEntryPeriodAmounts((prev) => {
// // //         const newPrev = { ...prev, [periodKey]: numericValue };
// // //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // //         setNewEntry(prevNewEntry => {
// // //           const updatedNewEntry = { ...prevNewEntry, amount: totalAmount };

// // //           setPendingChanges(prevChanges => {
// // //             const existingChangeIndex = prevChanges.findIndex(
// // //               change => change.type === 'new' && change.data.id === updatedNewEntry.id
// // //             );
// // //             const updatedPeriodForecasts = { ...newPrev };
// // //             const updatedNewData = {
// // //               ...updatedNewEntry, // Ensure all newEntry fields are included
// // //               amount: totalAmount,
// // //               periodForecasts: updatedPeriodForecasts // Store periodForecasts for new entry
// // //             };

// // //             if (existingChangeIndex > -1) {
// // //               return prevChanges.map((change, index) =>
// // //                 index === existingChangeIndex ? { ...change, data: updatedNewData } : change
// // //               );
// // //             } else {
// // //               // Add the new entry to pending changes
// // //               return [...prevChanges, { type: 'new', data: updatedNewData }];
// // //             }
// // //           });
// // //           return updatedNewEntry;
// // //         });
// // //         return newPrev;
// // //       });
// // //     }
// // //   };

// // //   const addPendingNewEntry = () => {
// // //     if (!newEntry.idType || !newEntry.amountType || !newEntry.accountId || !newEntry.id) {
// // //       setSuccessMessageText("Please fill all required fields for new entry: ID, ID Type, Amount Type, Account ID.");
// // //       setShowSuccessMessage(true);
// // //       setTimeout(() => setShowSuccessMessage(false), 3000);
// // //       return;
// // //     }

// // //     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// // //     const entryToAdd = {
// // //         ...newEntry,
// // //         amount: totalAmount,
// // //         periodForecasts: newEntryPeriodAmounts, // Store period forecasts with the entry
// // //     };

// // //     // Add to entries for immediate display
// // //     setEntries(prevEntries => [...prevEntries, entryToAdd]);

// // //     // Add to pending changes
// // //     setPendingChanges(prevChanges => [...prevChanges, { type: 'new', data: entryToAdd }]);

// // //     // Reset new entry form and its period amounts for the next blank row
// // //     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, amountType: null, accountId: "", idType: null });
// // //     setNewEntryPeriodAmounts({});
// // //   };

// // //   const startEditing = (entry) => {
// // //     setEditingId(entry.id);
// // //     setEditEntry({
// // //       id: entry.id,
// // //       revenue: entry.revenue,
// // //       orgId: entry.orgId,
// // //       amount: entry.amount,
// // //       burden: entry.burden,
// // //       amountType: entry.amountType,
// // //       accountId: entry.accountId,
// // //       idType: entry.idType,
// // //     });
// // //     setPeriodAmounts(entry.periodForecasts || {}); // Populate periodAmounts for the edited entry
// // //     setOriginalPeriodAmounts(entry.periodForecasts || {}); // Store for cancel
// // //   };

// // //   const cancelEdit = () => {
// // //     setEditingId(null);
// // //     setEditEntry({});
// // //     setPeriodAmounts(originalPeriodAmounts); // Revert to original amounts for the edited row

// // //     // Revert the display for the cancelled row in `entries` to its original state
// // //     setEntries(prevEntries => prevEntries.map(entry =>
// // //       entry.id === editingId ? { ...entry, periodForecasts: originalPeriodAmounts, amount: Object.values(originalPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) } : entry
// // //     ));

// // //     // Remove pending changes for this specific edit if cancelled
// // //     setPendingChanges(prevChanges =>
// // //         prevChanges.filter(change => !(change.type === 'edit' && change.data.id === editingId))
// // //     );
// // //   };

// // //   const handleSaveAll = async () => {
// // //     setLoading(true);
// // //     let successCount = 0;
// // //     let errorCount = 0;

// // //     for (const change of pendingChanges) {
// // //         const { type, data } = change;
// // //         const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// // //         const payloadForecasts = periods.map(period => ({
// // //             forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
// // //             projId: initialData?.projId || "N/A",
// // //             plId: initialData?.plId || 0,
// // //             emplId: data.id, // Direct cost uses emplId as its ID
// // //             dctId: initialData?.dctId || 0, // This is likely from the parent component's selected plan
// // //             month: period.monthNo,
// // //             year: period.year,
// // //         }));

// // //         const payload = {
// // //             dctId: initialData?.dctId || 0,
// // //             plId: initialData?.plId || 0,
// // //             acctId: data.accountId,
// // //             orgId: data.orgId,
// // //             notes: type === 'new' ? "Auto-generated from UI" : "Auto-updated from UI",
// // //             category: "Direct Cost",
// // //             amountType: data.amountType,
// // //             id: data.id, // This `id` is actually `emplId` in the API structure
// // //             isRev: data.revenue,
// // //             isBrd: data.burden,
// // //             plcGlc: data.idType,
// // //             plForecasts: payloadForecasts,
// // //         };

// // //         try {
// // //             await axios.post(
// // //                 `https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost`,
// // //                 payload
// // //             );
// // //             successCount++;
// // //         } catch (err) {
// // //             console.error(`Failed to save ${type} entry ${data.id}:`, err.message, err.response?.data);
// // //             errorCount++;
// // //         }
// // //     }

// // //     if (errorCount === 0 && successCount > 0) {
// // //         setSuccessMessageText(`Successfully saved ${successCount} entries!`);
// // //     } else if (successCount > 0 && errorCount > 0) {
// // //         setSuccessMessageText(`Saved ${successCount} entries with ${errorCount} errors.`);
// // //     } else if (errorCount > 0) {
// // //         setSuccessMessageText(`Failed to save ${errorCount} entries.`);
// // //     } else {
// // //         setSuccessMessageText("No changes to save.");
// // //     }
// // //     setShowSuccessMessage(true);
// // //     setTimeout(() => setShowSuccessMessage(false), 3000);

// // //     // After attempting to save all, re-fetch all data to get the latest state from the backend
// // //     setPendingChanges([]); // Clear pending changes regardless of individual success/failure
// // //     await fetchProjectData();
// // //     setLoading(false);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-32 p-4 font-inter">
// // //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
// // //         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="p-4 font-inter">
// // //         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
// // //           <strong className="font-bold text-xs">Error: </strong>
// // //           <span className="block sm:inline text-xs">{error}</span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!initialData?.plId) {
// // //     return (
// // //         <div className="p-4 font-inter">
// // //             <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
// // //                 <span className="text-xs">Please select a plan to view amounts data.</span>
// // //             </div>
// // //         </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="relative p-4 font-inter">
// // //       {/* Success/Error Message */}
// // //       {showSuccessMessage && (
// // //         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50
// // //           ${successMessageText.includes("successfully") ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
// // //           {successMessageText}
// // //         </div>
// // //       )}

// // //       {/* Save All Button */}
// // //       <div className="w-full flex justify-end mb-4">
// // //         <button
// // //           onClick={handleSaveAll}
// // //           className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium
// // //             ${pendingChanges.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// // //           disabled={pendingChanges.length === 0}
// // //         >
// // //           Save All ({pendingChanges.length})
// // //         </button>
// // //       </div>

// // //       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>

// // //       <div className="flex w-full">
// // //         {/* Left Table (Entry Details) */}
// // //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// // //           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
// // //             <thead className="bg-blue-100 text-gray-700">
// // //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// // //                 {ENTRY_COLUMNS.map((col) => (
// // //                   <th
// // //                     key={col.key}
// // //                     className={`p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal`}
// // //                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
// // //                   >
// // //                     {col.label}
// // //                   </th>
// // //                 ))}
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               <Fragment>
// // //                 {entries.map((entry) => (
// // //                   <tr key={entry.id} className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200">
// // //                     {editingId === entry.id ? (
// // //                       <>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <input
// // //                             type="text"
// // //                             name="id"
// // //                             value={editEntry.id || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200 flex items-center justify-center h-full">
// // //                           <input
// // //                             type="checkbox"
// // //                             name="revenue"
// // //                             checked={editEntry.revenue}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200 flex items-center justify-center h-full">
// // //                           <input
// // //                             type="checkbox"
// // //                             name="burden"
// // //                             checked={editEntry.burden}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <select
// // //                             name="idType"
// // //                             value={editEntry.idType || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           >
// // //                             <option value="">None</option>
// // //                             <option value="Contract Employee">Contract Employee</option>
// // //                             <option value="Employee">Employee</option>
// // //                             <option value="General Labor Category">General Labor Category</option>
// // //                             <option value="Generic Staff">Generic Staff</option>
// // //                             <option value="Key Entry">Key Entry</option>
// // //                             <option value="Project Labor Category">Project Labor Category</option>
// // //                             <option value="Vendor">Vendor</option>
// // //                             <option value="Vendor Employee">Vendor Employee</option>
// // //                           </select>
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <select
// // //                             name="amountType"
// // //                             value={editEntry.amountType || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           >
// // //                             <option value="">None</option>
// // //                             <option value="Materials">Materials</option>
// // //                             <option value="Subcontractors">Subcontractors</option>
// // //                             <option value="Mat & Handling">Mat & Handling</option>
// // //                             <option value="Travel">Travel</option>
// // //                             <option value="Consultants">Consultants</option>
// // //                             <option value="Other Direct Cost">Other Direct Cost</option>
// // //                           </select>
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <input
// // //                             type="text"
// // //                             name="accountId"
// // //                             value={editEntry.accountId || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                             placeholder="Account ID"
// // //                           />
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <input
// // //                             type="text"
// // //                             name="orgId"
// // //                             value={editEntry.orgId || ""}
// // //                             onChange={handleEditInputChange}
// // //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                           />
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           {`$${editEntry.amount?.toFixed(2) || "0.00"}`}
// // //                         </td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <div className="flex gap-1 mt-1">
// // //                             <button
// // //                               onClick={cancelEdit}
// // //                               className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700"
// // //                             >
// // //                               Cancel
// // //                             </button>
// // //                           </div>
// // //                         </td>
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <td className="p-2 border-r border-gray-200">{entry.id}</td>
// // //                         <td className="p-2 border-r border-gray-200 text-center">{entry.revenue ? "✓" : "-"}</td>
// // //                         <td className="p-2 border-r border-gray-200 text-center">{entry.burden ? "✓" : "-"}</td>
// // //                         <td className="p-2 border-r border-gray-200">{entry.idType || "None"}</td>
// // //                         <td className="p-2 border-r border-gray-200">{entry.amountType || "None"}</td>
// // //                         <td className="p-2 border-r border-gray-200">{entry.accountId || "N/A"}</td>
// // //                         <td className="p-2 border-r border-gray-200">{entry.orgId}</td>
// // //                         <td className="p-2 border-r border-gray-200">{`$${entry.amount.toFixed(2)}`}</td>
// // //                         <td className="p-2 border-r border-gray-200">
// // //                           <button
// // //                             onClick={() => startEditing(entry)}
// // //                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
// // //                           >
// // //                             Edit
// // //                           </button>
// // //                         </td>
// // //                       </>
// // //                     )}
// // //                   </tr>
// // //                 ))}
// // //                 {/* This row is always for adding new entries */}
// // //                 <tr className="bg-gray-50 border-b border-gray-200">
// // //                     <td className="p-2 border-r border-gray-200">
// // //                       <input
// // //                         type="text"
// // //                         name="id"
// // //                         value={newEntry.id}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                         placeholder="ID"
// // //                       />
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200 flex items-center justify-center h-full">
// // //                       <input
// // //                         type="checkbox"
// // //                         name="revenue"
// // //                         checked={newEntry.revenue}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                       />
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200 flex items-center justify-center h-full">
// // //                       <input
// // //                         type="checkbox"
// // //                         name="burden"
// // //                         checked={newEntry.burden}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// // //                       />
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200">
// // //                       <select
// // //                         name="idType"
// // //                         value={newEntry.idType || ""}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                       >
// // //                         <option value="">None</option>
// // //                         <option value="Contract Employee">Contract Employee</option>
// // //                         <option value="Employee">Employee</option>
// // //                         <option value="General Labor Category">General Labor Category</option>
// // //                         <option value="Generic Staff">Generic Staff</option>
// // //                         <option value="Key Entry">Key Entry</option>
// // //                         <option value="Project Labor Category">Project Labor Category</option>
// // //                         <option value="Vendor">Vendor</option>
// // //                         <option value="Vendor Employee">Vendor Employee</option>
// // //                       </select>
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200">
// // //                       <select
// // //                         name="amountType"
// // //                         value={newEntry.amountType || ""}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                       >
// // //                         <option value="">None</option>
// // //                         <option value="Materials">Materials</option>
// // //                         <option value="Subcontractors">Subcontractors</option>
// // //                         <option value="Mat & Handling">Mat & Handling</option>
// // //                         <option value="Travel">Travel</option>
// // //                         <option value="Consultants">Consultants</option>
// // //                         <option value="Other Direct Cost">Other Direct Cost</option>
// // //                       </select>
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200">
// // //                       <input
// // //                         type="text"
// // //                         name="accountId"
// // //                         value={newEntry.accountId}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                         placeholder="Account ID"
// // //                       />
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200">
// // //                       <input
// // //                         type="text"
// // //                         name="orgId"
// // //                         value={newEntry.orgId}
// // //                         onChange={handleNewInputChange}
// // //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                         placeholder="Org ID"
// // //                       />
// // //                     </td>
// // //                     <td className="p-2 border-r border-gray-200">{`$${newEntry.amount.toFixed(2)}`}</td>
// // //                     <td className="p-2 border-r border-gray-200">
// // //                       <button
// // //                         onClick={addPendingNewEntry}
// // //                         className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 mt-1 w-full"
// // //                       >
// // //                         Add
// // //                       </button>
// // //                     </td>
// // //                 </tr>
// // //               </Fragment>
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Right Table (Periods) */}
// // //         <div className="w-1/2 overflow-x-auto">
// // //           {periods.length === 0 ? (
// // //             <div className="text-center text-gray-500 text-sm py-2">
// // //               No periods available. Please select a project with a valid date range.
// // //             </div>
// // //           ) : (
// // //             <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
// // //               <thead className="bg-blue-100 text-gray-700 font-normal">
// // //                 <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// // //                   {periods.map((period) => (
// // //                     <th
// // //                       key={`${period.month}-${period.year}`}
// // //                       className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal`}
// // //                       style={{ boxSizing: "border-box", lineHeight: "normal" }}
// // //                     >
// // //                       <div className="flex flex-col items-center justify-center h-full">
// // //                         <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
// // //                           {period.month}
// // //                         </span>
// // //                         <span className="text-xs text-gray-600 font-normal">
// // //                           {/* {period.year} */}
// // //                         </span>
// // //                       </div>
// // //                     </th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {/* Render period inputs for existing entries */}
// // //                 {entries.map((entry) => (
// // //                    <tr key={`periods-${entry.id}`} className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200">
// // //                     {periods.map((period) => {
// // //                       const periodKey = `${period.month}-${period.year}`;
// // //                       const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// // //                       const placeholderText = isInputDisabled ? "Closed" : "Amount";

// // //                       // Use periodAmounts if editing this specific entry, otherwise display from entry.periodForecasts
// // //                       const displayAmount = editingId === entry.id ? (periodAmounts[periodKey] || "") : (entry.periodForecasts ? (entry.periodForecasts[periodKey] || "") : '');

// // //                       return (
// // //                         <td
// // //                           key={periodKey}
// // //                           className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// // //                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
// // //                         >
// // //                           <input
// // //                             type="number"
// // //                             inputMode="numeric"
// // //                             value={displayAmount}
// // //                             onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// // //                             className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
// // //                               isInputDisabled || editingId !== entry.id ? "cursor-not-allowed text-gray-400" : ""
// // //                             }`}
// // //                             style={{
// // //                               width: "55px",
// // //                               padding: "0px 2px",
// // //                               height: "20px",
// // //                               boxSizing: "border-box",
// // //                               lineHeight: "normal",
// // //                             }}
// // //                             disabled={isInputDisabled || editingId !== entry.id} // Disable if not editing this specific row
// // //                             placeholder={placeholderText}
// // //                           />
// // //                         </td>
// // //                       );
// // //                     })}
// // //                   </tr>
// // //                 ))}
// // //                   {/* Render the blank row's period inputs for new entry separately */}
// // //                     <tr className="bg-gray-50 border-b border-gray-200">
// // //                     {periods.map((period) => {
// // //                       const periodKey = `${period.month}-${period.year}`;
// // //                       const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// // //                       const placeholderText = isInputDisabled ? "Closed" : "Amount";
// // //                       return (
// // //                         <td
// // //                           key={periodKey}
// // //                           className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// // //                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
// // //                         >
// // //                           <input
// // //                             type="number"
// // //                             inputMode="numeric"
// // //                             value={newEntryPeriodAmounts[periodKey] || ""} // Use newEntryPeriodAmounts for the new row
// // //                             onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// // //                             className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
// // //                               isInputDisabled || editingId !== null ? "cursor-not-allowed text-gray-400" : ""
// // //                             }`}
// // //                             style={{
// // //                               width: "55px",
// // //                               padding: "0px 2px",
// // //                               height: "20px",
// // //                               boxSizing: "border-box",
// // //                               lineHeight: "normal",
// // //                             }}
// // //                             disabled={isInputDisabled || editingId !== null} // Disable if an existing row is being edited
// // //                             placeholder={placeholderText}
// // //                           />
// // //                         </td>
// // //                       );
// // //                     })}
// // //                   </tr>
// // //               </tbody>
// // //             </table>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProjectAmountsTable;

// // import React, { useState, useEffect, useCallback, Fragment } from "react";
// // import axios from "axios";

// // const ENTRY_COLUMNS = [
// //   { key: "id", label: "ID" },
// //   { key: "revenue", label: "Rev" }, // Checkbox for revenue
// //   { key: "burden", label: "Burd" }, // Checkbox for burden only
// //   { key: "idType", label: "ID Type" }, // Dropdown for idType (shifted from Burd)
// //   { key: "amountType", label: "Amount Type" }, // Dropdown for amountType (shifted from ID Type)
// //   { key: "accountId", label: "Account ID" }, // Text input for accountId
// //   { key: "orgId", label: "Org ID" }, // Text input for orgId
// //   { key: "amount", label: "Total Amount" }, // Total amount display
// //   { key: "actions", label: "Actions" }, // Kept as the last column
// // ];

// // const ROW_HEIGHT_DEFAULT = 64; // Consistent with ProjectHoursDetails

// // const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
// //   const [periods, setPeriods] = useState([]);
// //   const [entries, setEntries] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // State for new entry form fields
// //   const [newEntry, setNewEntry] = useState({
// //     id: "",
// //     revenue: false,
// //     orgId: "",
// //     amount: 0,
// //     burden: false,
// //     idType: null,
// //     amountType: null,
// //     accountId: "",
// //   });
// //   // State for new entry's period amounts
// //   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});

// //   const [editingId, setEditingId] = useState(null);
// //   const [editEntry, setEditEntry] = useState({});
// //   const [periodAmounts, setPeriodAmounts] = useState({});
// //   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({}); // To store original state for cancel

// //   // State to hold all pending changes before "Save All"
// //   const [pendingChanges, setPendingChanges] = useState([]); // Array to store { type: 'new' | 'edit', data: { ... } }

// //   // State for success message
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [successMessageText, setSuccessMessageText] = useState("");

// //   // Helper function to check if a period is closed
// //   const isPeriodClosed = (monthNo, year) => {
// //     if (planType === "BUD") {
// //       return false; // All periods are editable for BUD
// //     }
// //     // For EAC, periods before June 2025 are closed
// //     const closedDate = new Date("2025-06-01T00:00:00Z"); // Start of June 2025
// //     const periodDate = new Date(year, monthNo - 1, 1);
// //     return periodDate < closedDate;
// //   };

// //   // Fetch periods dynamically based on startDate and endDate
// //   useEffect(() => {
// //     const fetchPeriods = async () => {
// //       if (!startDate || !endDate) {
// //         console.warn("Missing startDate or endDate, cannot fetch periods dynamically.");
// //         setPeriods([]);
// //         return;
// //       }

// //       try {
// //         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
// //         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
// //         console.log("Fetching periods for amounts:", { formattedStartDate, formattedEndDate });

// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
// //         );
// //         if (Array.isArray(response.data)) {
// //           const formattedPeriods = response.data.map((p) => ({
// //             month: p.month,
// //             monthNo: p.monthNo,
// //             year: p.year,
// //             workingHours: p.workingHours,
// //           }));
// //           setPeriods(formattedPeriods);
// //         } else {
// //           setPeriods([]);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch periods for ProjectAmountsTable:", err.message, err.response?.data);
// //         setError("Failed to load periods.");
// //         setPeriods([]);
// //       }
// //     };

// //     fetchPeriods();
// //   }, [startDate, endDate]);

// //   // Fetch and initialize state with data for the amounts table
// //   const fetchProjectData = useCallback(async () => {
// //     if (initialData?.plId && periods.length > 0) {
// //       setLoading(true);
// //       try {
// //         console.log(`Fetching project data for amounts from planId: ${initialData.plId}`);
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
// //         );
// //         const apiData = response.data;
// //         console.log("Amounts API Response:", apiData);

// //         if (apiData && apiData.empl) {
// //           const entry = {
// //             id: apiData.empl.id || "",
// //             revenue: apiData.empl.isRev || false,
// //             orgId: apiData.empl.orgId || "",
// //             burden: apiData.empl.isBrd || false,
// //             idType: apiData.empl.plcGlc || null, // Moved from original idType to idType
// //             amountType: apiData.empl.amountType || null,
// //             accountId: apiData.empl.acctId || "",
// //             amount: 0,
// //           };

// //           const fetchedPeriodAmountsForExistingEntry = {};
// //           let totalCalculatedAmount = 0;
// //           if (apiData.empl.plForecasts && Array.isArray(apiData.empl.plForecasts)) {
// //             apiData.empl.plForecasts.forEach((forecast) => {
// //               const periodDetail = periods.find(p => p.monthNo === forecast.month && p.year === forecast.year);
// //               if (periodDetail) {
// //                 const periodKey = `${periodDetail.month}-${periodDetail.year}`;
// //                 const forecastedAmt = parseFloat(forecast.forecastedamt) || 0;
// //                 fetchedPeriodAmountsForExistingEntry[periodKey] = forecastedAmt;
// //                 totalCalculatedAmount += forecastedAmt;
// //               }
// //             });
// //           }
// //           setEntries([{ ...entry, amount: totalCalculatedAmount, periodForecasts: fetchedPeriodAmountsForExistingEntry }]);
// //           setPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// //           setOriginalPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// //           setNewEntryPeriodAmounts({});
// //           setPendingChanges([]);
// //         } else {
// //           console.log("No existing project data found or invalid structure for this planId in amounts.");
// //           setEntries([]);
// //           setPeriodAmounts({});
// //           setOriginalPeriodAmounts({});
// //           setNewEntryPeriodAmounts({});
// //           setPendingChanges([]);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch project data for amounts:", err.message, err.response?.data);
// //         setError("Failed to load project data for amounts.");
// //         setEntries([]);
// //         setPeriodAmounts({});
// //         setOriginalPeriodAmounts({});
// //         setNewEntryPeriodAmounts({});
// //         setPendingChanges([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     } else if (!initialData?.plId) {
// //       setEntries([]);
// //       setPeriodAmounts({});
// //       setOriginalPeriodAmounts({});
// //       setNewEntryPeriodAmounts({});
// //       setPendingChanges([]);
// //       setLoading(false);
// //     }
// //   }, [initialData?.plId, periods, planType]);

// //   useEffect(() => {
// //     fetchProjectData();
// //   }, [fetchProjectData]);

// //   const handleNewInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setNewEntry((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
// //   };

// //   const handleEditInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setEditEntry((prev) => {
// //       const updatedEditEntry = { ...prev, [name]: type === 'checkbox' ? checked : value };

// //       setPendingChanges(prevChanges => {
// //         const existingChangeIndex = prevChanges.findIndex(
// //           change => change.type === 'edit' && change.data.id === editingId
// //         );
// //         const updatedEditData = {
// //           ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : prev),
// //           ...updatedEditEntry
// //         };

// //         if (existingChangeIndex > -1) {
// //           return prevChanges.map((change, index) =>
// //             index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// //           );
// //         } else {
// //           const originalEntry = entries.find(entry => entry.id === editingId);
// //           return [
// //             ...prevChanges,
// //             { type: 'edit', data: { ...originalEntry, ...updatedEditEntry } }
// //           ];
// //         }
// //       });
// //       return updatedEditEntry;
// //     });
// //   };

// //   const handlePeriodAmountChange = (periodKey, value) => {
// //     const numericValue = value ? parseFloat(value) || 0 : 0;

// //     if (editingId) {
// //       setPeriodAmounts((prev) => {
// //         const newPrev = { ...prev, [periodKey]: numericValue };
// //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// //         setEditEntry(prevEditEntry => {
// //           const updatedEditEntry = { ...prevEditEntry, amount: totalAmount };
          
// //           setPendingChanges(prevChanges => {
// //             const existingChangeIndex = prevChanges.findIndex(
// //               change => change.type === 'edit' && change.data.id === editingId
// //             );
// //             const updatedPeriodForecasts = { ...newPrev };
// //             const updatedEditData = {
// //               ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : updatedEditEntry),
// //               amount: totalAmount,
// //               periodForecasts: updatedPeriodForecasts
// //             };

// //             if (existingChangeIndex > -1) {
// //               return prevChanges.map((change, index) =>
// //                 index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// //               );
// //             } else {
// //               const originalEntry = entries.find(entry => entry.id === editingId);
// //               return [...prevChanges, { type: 'edit', data: { ...originalEntry, ...updatedEditData } }];
// //             }
// //           });
// //           return updatedEditEntry;
// //         });
// //         return newPrev;
// //       });
// //     } else {
// //       setNewEntryPeriodAmounts((prev) => {
// //         const newPrev = { ...prev, [periodKey]: numericValue };
// //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //         setNewEntry(prevNewEntry => {
// //           const updatedNewEntry = { ...prevNewEntry, amount: totalAmount };

// //           setPendingChanges(prevChanges => {
// //             const existingChangeIndex = prevChanges.findIndex(
// //               change => change.type === 'new' && change.data.id === updatedNewEntry.id
// //             );
// //             const updatedPeriodForecasts = { ...newPrev };
// //             const updatedNewData = {
// //               ...updatedNewEntry,
// //               amount: totalAmount,
// //               periodForecasts: updatedPeriodForecasts
// //             };

// //             if (existingChangeIndex > -1) {
// //               return prevChanges.map((change, index) =>
// //                 index === existingChangeIndex ? { ...change, data: updatedNewData } : change
// //               );
// //             } else {
// //               return [...prevChanges, { type: 'new', data: updatedNewData }];
// //             }
// //           });
// //           return updatedNewEntry;
// //         });
// //         return newPrev;
// //       });
// //     }
// //   };

// //   const addPendingNewEntry = () => {
// //     if (!newEntry.idType || !newEntry.amountType || !newEntry.accountId || !newEntry.id) {
// //       setSuccessMessageText("Please fill all required fields for new entry: ID, ID Type, Amount Type, Account ID.");
// //       setShowSuccessMessage(true);
// //       setTimeout(() => setShowSuccessMessage(false), 3000);
// //       return;
// //     }

// //     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// //     const entryToAdd = {
// //       ...newEntry,
// //       amount: totalAmount,
// //       periodForecasts: newEntryPeriodAmounts,
// //     };

// //     setEntries(prevEntries => [...prevEntries, entryToAdd]);
// //     setPendingChanges(prevChanges => [...prevChanges, { type: 'new', data: entryToAdd }]);
// //     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, idType: null, amountType: null, accountId: "" });
// //     setNewEntryPeriodAmounts({});
// //   };

// //   const startEditing = (entry) => {
// //     setEditingId(entry.id);
// //     setEditEntry({
// //       id: entry.id,
// //       revenue: entry.revenue,
// //       orgId: entry.orgId,
// //       amount: entry.amount,
// //       burden: entry.burden,
// //       idType: entry.idType,
// //       amountType: entry.amountType,
// //       accountId: entry.accountId,
// //     });
// //     setPeriodAmounts(entry.periodForecasts || {});
// //     setOriginalPeriodAmounts(entry.periodForecasts || {});
// //   };

// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setEditEntry({});
// //     setPeriodAmounts(originalPeriodAmounts);

// //     setEntries(prevEntries => prevEntries.map(entry =>
// //       entry.id === editingId ? { ...entry, periodForecasts: originalPeriodAmounts, amount: Object.values(originalPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) } : entry
// //     ));

// //     setPendingChanges(prevChanges =>
// //       prevChanges.filter(change => !(change.type === 'edit' && change.data.id === editingId))
// //     );
// //   };

// //   const handleSaveAll = async () => {
// //     setLoading(true);
// //     let successCount = 0;
// //     let errorCount = 0;

// //     for (const change of pendingChanges) {
// //       const { type, data } = change;
// //       const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //       const payloadForecasts = periods.map(period => ({
// //         forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
// //         projId: initialData?.projId || "N/A",
// //         plId: initialData?.plId || 0,
// //         emplId: data.id,
// //         dctId: initialData?.dctId || 0,
// //         month: period.monthNo,
// //         year: period.year,
// //       }));

// //       const payload = {
// //         dctId: initialData?.dctId || 0,
// //         plId: initialData?.plId || 0,
// //         acctId: data.accountId,
// //         orgId: data.orgId,
// //         notes: type === 'new' ? "Auto-generated from UI" : "Auto-updated from UI",
// //         category: "Direct Cost",
// //         amountType: data.amountType,
// //         id: data.id,
// //         isRev: data.revenue,
// //         isBrd: data.burden,
// //         plcGlc: data.idType,
// //         plForecasts: payloadForecasts,
// //       };

// //       try {
// //         await axios.post(
// //           `https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost`,
// //           payload
// //         );
// //         successCount++;
// //       } catch (err) {
// //         console.error(`Failed to save ${type} entry ${data.id}:`, err.message, err.response?.data);
// //         errorCount++;
// //       }
// //     }

// //     if (errorCount === 0 && successCount > 0) {
// //       setSuccessMessageText(`Successfully saved ${successCount} entries!`);
// //     } else if (successCount > 0 && errorCount > 0) {
// //       setSuccessMessageText(`Saved ${successCount} entries with ${errorCount} errors.`);
// //     } else if (errorCount > 0) {
// //       setSuccessMessageText(`Failed to save ${errorCount} entries.`);
// //     } else {
// //       setSuccessMessageText("No changes to save.");
// //     }
// //     setShowSuccessMessage(true);
// //     setTimeout(() => setShowSuccessMessage(false), 3000);

// //     setPendingChanges([]);
// //     await fetchProjectData();
// //     setLoading(false);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-32 p-4 font-inter">
// //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-4 font-inter">
// //         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
// //           <strong className="font-bold text-xs">Error: </strong>
// //           <span className="block sm:inline text-xs">{error}</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!initialData?.plId) {
// //     return (
// //       <div className="p-4 font-inter">
// //         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
// //           <span className="text-xs">Please select a plan to view amounts data.</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative p-4 font-inter">
// //       {showSuccessMessage && (
// //         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50
// //           ${successMessageText.includes("successfully") ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
// //           {successMessageText}
// //         </div>
// //       )}

// //       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
// //       <div className="w-full flex justify-end mb-4">
// //         <button
// //           onClick={handleSaveAll}
// //           className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium
// //             ${pendingChanges.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// //           disabled={pendingChanges.length === 0}
// //         >
// //           Save All ({pendingChanges.length})
// //         </button>
// //       </div>

// //       <div className="flex w-full">
// //         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
// //           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
// //             <thead className="bg-blue-100 text-gray-700">
// //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {ENTRY_COLUMNS.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     className={`p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal`}
// //                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                   >
// //                     {col.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <Fragment>
// //                 {entries.map((entry) => (
// //                   <tr key={entry.id} className="hover:bg-gray-50">
// //                     {editingId === entry.id ? (
// //                       <>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             value={editEntry.id || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="checkbox"
// //                             checked={editEntry.revenue}
// //                             onChange={(e) => handleEditInputChange({ target: { name: 'revenue', value: e.target.checked }})}
// //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="checkbox"
// //                             checked={editEntry.burden}
// //                             onChange={(e) => handleEditInputChange({ target: { name: 'burden', value: e.target.checked }})}
// //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <select
// //                             name="idType"
// //                             value={editEntry.idType || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           >
// //                             <option value="">None</option>
// //                             <option value="Contract Employee">Contract Employee</option>
// //                             <option value="Employee">Employee</option>
// //                             <option value="General Labor Category">General Labor Category</option>
// //                             <option value="Generic Staff">Generic Staff</option>
// //                             <option value="Key Entry">Key Entry</option>
// //                             <option value="Project Labor Category">Project Labor Category</option>
// //                             <option value="Vendor">Vendor</option>
// //                             <option value="Vendor Employee">Vendor Employee</option>
// //                           </select>
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <select
// //                             name="amountType"
// //                             value={editEntry.amountType || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           >
// //                             <option value="">None</option>
// //                             <option value="Materials">Materials</option>
// //                             <option value="Subcontractors">Subcontractors</option>
// //                             <option value="Mat & Handling">Mat & Handling</option>
// //                             <option value="Travel">Travel</option>
// //                             <option value="Consultants">Consultants</option>
// //                             <option value="Other Direct Cost">Other Direct Cost</option>
// //                           </select>
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="accountId"
// //                             value={editEntry.accountId || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             placeholder="Account ID"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             value={editEntry.orgId || ""}
// //                             onChange={(e) => handleEditInputChange({ target: { name: 'orgId', value: e.target.value }})}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           {`$${editEntry.amount?.toFixed(2) || "0.00"}`}
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <div className="flex gap-1 mt-1">
// //                             <button
// //                               onClick={cancelEdit}
// //                               className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700"
// //                             >
// //                               Cancel
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.revenue ? "Yes" : "No"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.burden ? "Yes" : "No"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.orgId}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{`$${entry.amount.toFixed(2)}`}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <button
// //                             onClick={() => startEditing(entry)}
// //                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
// //                           >
// //                             Edit
// //                           </button>
// //                         </td>
// //                       </>
// //                     )}
// //                   </tr>
// //                 ))}
// //                 {/* This row is always for adding new entries */}
// //                 <tr className="bg-gray-50">
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <input
// //                         type="text"
// //                         name="id"
// //                         value={newEntry.id}
// //                         onChange={handleNewInputChange}
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                         placeholder="Employee"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <input
// //                         type="checkbox"
// //                         name="revenue"
// //                         checked={newEntry.revenue}
// //                         onChange={(e) => handleNewInputChange({ target: { name: 'revenue', value: e.target.checked }})}
// //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <input
// //                         type="checkbox"
// //                         name="burden"
// //                         checked={newEntry.burden}
// //                         onChange={(e) => handleNewInputChange({ target: { name: 'burden', value: e.target.checked }})}
// //                         className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <select
// //                         name="idType"
// //                         value={newEntry.idType || ""}
// //                         onChange={handleNewInputChange}
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       >
// //                         <option value="">None</option>
// //                         <option value="Contract Employee">Contract Employee</option>
// //                         <option value="Employee">Employee</option>
// //                         <option value="General Labor Category">General Labor Category</option>
// //                         <option value="Generic Staff">Generic Staff</option>
// //                         <option value="Key Entry">Key Entry</option>
// //                         <option value="Project Labor Category">Project Labor Category</option>
// //                         <option value="Vendor">Vendor</option>
// //                         <option value="Vendor Employee">Vendor Employee</option>
// //                       </select>
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <select
// //                         name="amountType"
// //                         value={newEntry.amountType || ""}
// //                         onChange={handleNewInputChange}
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       >
// //                         <option value="">None</option>
// //                         <option value="Materials">Materials</option>
// //                         <option value="Subcontractors">Subcontractors</option>
// //                         <option value="Mat & Handling">Mat & Handling</option>
// //                         <option value="Travel">Travel</option>
// //                         <option value="Consultants">Consultants</option>
// //                         <option value="Other Direct Cost">Other Direct Cost</option>
// //                       </select>
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <input
// //                         type="text"
// //                         name="accountId"
// //                         value={newEntry.accountId}
// //                         onChange={handleNewInputChange}
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                         placeholder="Account ID"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <input
// //                         type="text"
// //                         name="orgId"
// //                         value={newEntry.orgId}
// //                         onChange={handleNewInputChange}
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                         placeholder="Org ID"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-2 py-0.5">$0.00</td>
// //                     <td className="border border-gray-300 px-2 py-0.5">
// //                       <button
// //                         onClick={addPendingNewEntry} // Changed to add to pending changes
// //                         className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 mt-1 w-full"
// //                       >
// //                         Add
// //                       </button>
// //                     </td>
// //                   </tr>
// //               </Fragment>
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="w-1/2 overflow-x-auto">
// //           {periods.length === 0 ? (
// //             <div className="text-center text-gray-500 text-sm py-2">
// //               No periods available. Please select a project with a valid date range.
// //             </div>
// //           ) : (
// //             <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
// //               <thead className="bg-blue-100 text-gray-700 font-normal">
// //                 <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                   {periods.map((period) => (
// //                     <th
// //                       key={`${period.month}-${period.year}`}
// //                       className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal`}
// //                       style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                     >
// //                       <div className="flex flex-col items-center justify-center h-full">
// //                         <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
// //                           {period.month}
// //                         </span>
// //                       </div>
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {entries.map((entry) => (
// //                   <tr key={`periods-${entry.id}`} className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
// //                       style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                     {periods.map((period) => {
// //                       const periodKey = `${period.month}-${period.year}`;
// //                       const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// //                       const placeholderText = isInputDisabled ? "Closed" : "";
// //                       const displayAmount = editingId === entry.id ? (periodAmounts[periodKey] || "") : (entry.periodForecasts ? (entry.periodForecasts[periodKey] || "") : '');

// //                       return (
// //                         <td
// //                           key={periodKey}
// //                           className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// //                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                         >
// //                           <input
// //                             type="text"
// //                             inputMode="numeric"
// //                             value={displayAmount}
// //                             onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// //                             className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
// //                               isInputDisabled || editingId !== entry.id ? "cursor-not-allowed text-gray-400" : ""
// //                             }`}
// //                             style={{
// //                               width: "55px",
// //                               padding: "0px 2px",
// //                               height: "20px",
// //                               boxSizing: "border-box",
// //                               lineHeight: "normal",
// //                             }}
// //                             disabled={isInputDisabled || editingId !== entry.id}
// //                             placeholder={placeholderText}
// //                           />
// //                         </td>
// //                       );
// //                     })}
// //                   </tr>
// //                 ))}
// //                 <tr className="bg-gray-50 border-b border-gray-200"
// //                     style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                   {periods.map((period) => {
// //                     const periodKey = `${period.month}-${period.year}`;
// //                     const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// //                     const placeholderText = isInputDisabled ? "Closed" : "";
// //                     return (
// //                       <td
// //                         key={periodKey}
// //                         className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// //                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                       >
// //                         <input
// //                           type="text"
// //                           inputMode="numeric"
// //                           value={newEntryPeriodAmounts[periodKey] || ""}
// //                           onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// //                           className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
// //                             isInputDisabled || editingId !== null ? "cursor-not-allowed text-gray-400" : ""
// //                           }`}
// //                           style={{
// //                             width: "55px",
// //                             padding: "0px 2px",
// //                             height: "20px",
// //                             boxSizing: "border-box",
// //                             lineHeight: "normal",
// //                           }}
// //                           disabled={isInputDisabled || editingId !== null}
// //                           placeholder={placeholderText}
// //                         />
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectAmountsTable;


// // import React, { useState, useEffect, useCallback, Fragment } from "react";
// // import axios from "axios";

// // const ENTRY_COLUMNS = [
// //   { key: "id", label: "ID" },
// //   { key: "revenue", label: "Rev" },
// //   { key: "burden", label: "Burd" },
// //   { key: "idType", label: "ID Type" },
// //   { key: "amountType", label: "Amount Type" },
// //   { key: "accountId", label: "Account ID" },
// //   { key: "orgId", label: "Org ID" },
// //   { key: "amount", label: "Total Amount" },
// //   { key: "actions", label: "Actions" },
// // ];

// // const ROW_HEIGHT_DEFAULT = 64;

// // const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
// //   const [periods, setPeriods] = useState([]);
// //   const [entries, setEntries] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [newEntry, setNewEntry] = useState({
// //     id: "",
// //     revenue: false,
// //     orgId: "",
// //     amount: 0,
// //     burden: false,
// //     idType: null,
// //     amountType: null,
// //     accountId: "",
// //   });
// //   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
// //   const [editingId, setEditingId] = useState(null);
// //   const [editEntry, setEditEntry] = useState({});
// //   const [periodAmounts, setPeriodAmounts] = useState({});
// //   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({});
// //   const [pendingChanges, setPendingChanges] = useState([]);
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [successMessageText, setSuccessMessageText] = useState("");

// //   const isPeriodClosed = (monthNo, year) => {
// //     if (planType === "BUD") return false;
// //     const closedDate = new Date("2025-06-01T00:00:00Z");
// //     const periodDate = new Date(year, monthNo - 1, 1);
// //     return periodDate < closedDate;
// //   };

// //   useEffect(() => {
// //     const fetchPeriods = async () => {
// //       if (!startDate || !endDate) {
// //         setPeriods([]);
// //         return;
// //       }
// //       try {
// //         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
// //         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
// //         );
// //         if (Array.isArray(response.data)) {
// //           const formattedPeriods = response.data.map((p) => ({
// //             month: p.month,
// //             monthNo: p.monthNo,
// //             year: p.year,
// //             workingHours: p.workingHours,
// //           }));
// //           setPeriods(formattedPeriods);
// //         } else {
// //           setPeriods([]);
// //         }
// //       } catch (err) {
// //         setError("Failed to load periods.");
// //         setPeriods([]);
// //       }
// //     };
// //     fetchPeriods();
// //   }, [startDate, endDate]);

// //   const fetchProjectData = useCallback(async () => {
// //     if (initialData?.plId && periods.length > 0) {
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
// //         );
// //         const apiData = response.data;
// //         if (apiData && apiData.empl) {
// //           const entry = {
// //             id: apiData.empl.id || "",
// //             revenue: apiData.empl.isRev || false,
// //             orgId: apiData.empl.orgId || "",
// //             burden: apiData.empl.isBrd || false,
// //             idType: apiData.empl.plcGlc || null,
// //             amountType: apiData.empl.amountType || null,
// //             accountId: apiData.empl.acctId || "",
// //             amount: 0,
// //           };
// //           const fetchedPeriodAmountsForExistingEntry = {};
// //           let totalCalculatedAmount = 0;
// //           if (apiData.empl.plForecasts && Array.isArray(apiData.empl.plForecasts)) {
// //             apiData.empl.plForecasts.forEach((forecast) => {
// //               const periodDetail = periods.find(p => p.monthNo === forecast.month && p.year === forecast.year);
// //               if (periodDetail) {
// //                 const periodKey = `${periodDetail.month}-${periodDetail.year}`;
// //                 const forecastedAmt = parseFloat(forecast.forecastedamt) || 0;
// //                 fetchedPeriodAmountsForExistingEntry[periodKey] = forecastedAmt;
// //                 totalCalculatedAmount += forecastedAmt;
// //               }
// //             });
// //           }
// //           setEntries([{ ...entry, amount: totalCalculatedAmount, periodForecasts: fetchedPeriodAmountsForExistingEntry }]);
// //           setPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// //           setOriginalPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// //           setNewEntryPeriodAmounts({});
// //           setPendingChanges([]);
// //         } else {
// //           setEntries([]);
// //           setPeriodAmounts({});
// //           setOriginalPeriodAmounts({});
// //           setNewEntryPeriodAmounts({});
// //           setPendingChanges([]);
// //         }
// //       } catch (err) {
// //         setError("Failed to load project data for amounts.");
// //         setEntries([]);
// //         setPeriodAmounts({});
// //         setOriginalPeriodAmounts({});
// //         setNewEntryPeriodAmounts({});
// //         setPendingChanges([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     } else if (!initialData?.plId) {
// //       setEntries([]);
// //       setPeriodAmounts({});
// //       setOriginalPeriodAmounts({});
// //       setNewEntryPeriodAmounts({});
// //       setPendingChanges([]);
// //       setLoading(false);
// //     }
// //   }, [initialData?.plId, periods, planType]);

// //   useEffect(() => {
// //     fetchProjectData();
// //   }, [fetchProjectData]);

// //   const handleNewInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setNewEntry((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
// //   };

// //   const handleEditInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setEditEntry((prev) => {
// //       const updatedEditEntry = { ...prev, [name]: type === 'checkbox' ? checked : value };
// //       setPendingChanges(prevChanges => {
// //         const existingChangeIndex = prevChanges.findIndex(
// //           change => change.type === 'edit' && change.data.id === editingId
// //         );
// //         const updatedEditData = {
// //           ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : prev),
// //           ...updatedEditEntry
// //         };
// //         if (existingChangeIndex > -1) {
// //           return prevChanges.map((change, index) =>
// //             index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// //           );
// //         } else {
// //           const originalEntry = entries.find(entry => entry.id === editingId);
// //           return [
// //             ...prevChanges,
// //             { type: 'edit', data: { ...originalEntry, ...updatedEditEntry } }
// //           ];
// //         }
// //       });
// //       return updatedEditEntry;
// //     });
// //   };

// //   const handlePeriodAmountChange = (periodKey, value) => {
// //     const numericValue = value ? parseFloat(value) || 0 : 0;
// //     if (editingId) {
// //       setPeriodAmounts((prev) => {
// //         const newPrev = { ...prev, [periodKey]: numericValue };
// //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //         setEditEntry(prevEditEntry => {
// //           const updatedEditEntry = { ...prevEditEntry, amount: totalAmount };
// //           setPendingChanges(prevChanges => {
// //             const existingChangeIndex = prevChanges.findIndex(
// //               change => change.type === 'edit' && change.data.id === editingId
// //             );
// //             const updatedPeriodForecasts = { ...newPrev };
// //             const updatedEditData = {
// //               ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : updatedEditEntry),
// //               amount: totalAmount,
// //               periodForecasts: updatedPeriodForecasts
// //             };
// //             if (existingChangeIndex > -1) {
// //               return prevChanges.map((change, index) =>
// //                 index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// //               );
// //             } else {
// //               const originalEntry = entries.find(entry => entry.id === editingId);
// //               return [...prevChanges, { type: 'edit', data: { ...originalEntry, ...updatedEditData } }];
// //             }
// //           });
// //           return updatedEditEntry;
// //         });
// //         return newPrev;
// //       });
// //     } else {
// //       setNewEntryPeriodAmounts((prev) => {
// //         const newPrev = { ...prev, [periodKey]: numericValue };
// //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //         setNewEntry(prevNewEntry => {
// //           const updatedNewEntry = { ...prevNewEntry, amount: totalAmount };
// //           setPendingChanges(prevChanges => {
// //             const existingChangeIndex = prevChanges.findIndex(
// //               change => change.type === 'new' && change.data.id === updatedNewEntry.id
// //             );
// //             const updatedPeriodForecasts = { ...newPrev };
// //             const updatedNewData = {
// //               ...updatedNewEntry,
// //               amount: totalAmount,
// //               periodForecasts: updatedPeriodForecasts
// //             };
// //             if (existingChangeIndex > -1) {
// //               return prevChanges.map((change, index) =>
// //                 index === existingChangeIndex ? { ...change, data: updatedNewData } : change
// //               );
// //             } else {
// //               return [...prevChanges, { type: 'new', data: updatedNewData }];
// //             }
// //           });
// //           return updatedNewEntry;
// //         });
// //         return newPrev;
// //       });
// //     }
// //   };

// //   const addPendingNewEntry = () => {
// //     if (!newEntry.idType || !newEntry.amountType || !newEntry.accountId) {
// //       setSuccessMessageText("Please fill all required fields for new entry: ID Type, Amount Type, Account ID.");
// //       setShowSuccessMessage(true);
// //       setTimeout(() => setShowSuccessMessage(false), 3000);
// //       return;
// //     }
// //     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //     const entryToAdd = {
// //       ...newEntry,
// //       amount: totalAmount,
// //       periodForecasts: newEntryPeriodAmounts,
// //     };
// //     setEntries(prevEntries => [...prevEntries, entryToAdd]);
// //     setPendingChanges(prevChanges => [...prevChanges, { type: 'new', data: entryToAdd }]);
// //     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, idType: null, amountType: null, accountId: "" });
// //     setNewEntryPeriodAmounts({});
// //   };

// //   const startEditing = (entry) => {
// //     setEditingId(entry.id);
// //     setEditEntry({
// //       id: entry.id,
// //       revenue: entry.revenue,
// //       orgId: entry.orgId,
// //       amount: entry.amount,
// //       burden: entry.burden,
// //       idType: entry.idType,
// //       amountType: entry.amountType,
// //       accountId: entry.accountId,
// //     });
// //     setPeriodAmounts(entry.periodForecasts || {});
// //     setOriginalPeriodAmounts(entry.periodForecasts || {});
// //   };

// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setEditEntry({});
// //     setPeriodAmounts(originalPeriodAmounts);
// //     setEntries(prevEntries => prevEntries.map(entry =>
// //       entry.id === editingId ? { ...entry, periodForecasts: originalPeriodAmounts, amount: Object.values(originalPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) } : entry
// //     ));
// //     setPendingChanges(prevChanges =>
// //       prevChanges.filter(change => !(change.type === 'edit' && change.data.id === editingId))
// //     );
// //   };

// //   const handleSaveAll = async () => {
// //     setLoading(true);
// //     let successCount = 0;
// //     let errorCount = 0;
// //     for (const change of pendingChanges) {
// //       const { type, data } = change;
// //       const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //       const payloadForecasts = periods.map(period => ({
// //         forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
// //         projId: initialData?.projId || "N/A",
// //         plId: initialData?.plId || 0,
// //         emplId: data.id,
// //         dctId: initialData?.dctId || 0,
// //         month: period.monthNo,
// //         year: period.year,
// //       }));
// //       const payload = {
// //         dctId: initialData?.dctId || 0,
// //         plId: initialData?.plId || 0,
// //         acctId: data.accountId,
// //         orgId: data.orgId,
// //         notes: type === 'new' ? "Auto-generated from UI" : "Auto-updated from UI",
// //         category: "Direct Cost",
// //         amountType: data.amountType,
// //         id: data.id,
// //         isRev: data.revenue,
// //         isBrd: data.burden,
// //         plcGlc: data.idType,
// //         plForecasts: payloadForecasts,
// //       };
// //       try {
// //         await axios.post(
// //           `https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost`,
// //           payload
// //         );
// //         successCount++;
// //       } catch (err) {
// //         errorCount++;
// //       }
// //     }
// //     if (errorCount === 0 && successCount > 0) {
// //       setSuccessMessageText(`Successfully saved ${successCount} entries!`);
// //     } else if (successCount > 0 && errorCount > 0) {
// //       setSuccessMessageText(`Saved ${successCount} entries with ${errorCount} errors.`);
// //     } else if (errorCount > 0) {
// //       setSuccessMessageText(`Failed to save ${errorCount} entries.`);
// //     } else {
// //       setSuccessMessageText("No changes to save.");
// //     }
// //     setShowSuccessMessage(true);
// //     setTimeout(() => setShowSuccessMessage(false), 3000);
// //     setPendingChanges([]);
// //     await fetchProjectData();
// //     setLoading(false);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-32 p-4 font-inter">
// //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-4 font-inter">
// //         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
// //           <strong className="font-bold text-xs">Error: </strong>
// //           <span className="block sm:inline text-xs">{error}</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!initialData?.plId) {
// //     return (
// //       <div className="p-4 font-inter">
// //         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
// //           <span className="text-xs">Please select a plan to view amounts data.</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Calculate the number of rows for height matching
// //   const rowCount = Math.max(entries.length + 1, 2);

// //   return (
// //     <div className="relative p-4 font-inter">
// //       {showSuccessMessage && (
// //         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50
// //           ${successMessageText.includes("successfully") ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
// //           {successMessageText}
// //         </div>
// //       )}

// //       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
// //       <div className="w-full flex justify-end mb-4">
// //         <button
// //           onClick={handleSaveAll}
// //           className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium
// //             ${pendingChanges.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// //           disabled={pendingChanges.length === 0}
// //         >
// //           Save All ({pendingChanges.length})
// //         </button>
// //       </div>

// //       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
// //         {/* Left Table */}
// //         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
// //           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1 h-full">
// //             <thead className="bg-blue-100 text-gray-700">
// //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {ENTRY_COLUMNS.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
// //                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                   >
// //                     {col.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <Fragment>
// //                 {entries.map((entry) => (
// //                   <tr key={entry.id} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                     {editingId === entry.id ? (
// //                       <>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="id"
// //                             value={editEntry.id || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="checkbox"
// //                             name="revenue"
// //                             checked={editEntry.revenue}
// //                             onChange={handleEditInputChange}
// //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="checkbox"
// //                             name="burden"
// //                             checked={editEntry.burden}
// //                             onChange={handleEditInputChange}
// //                             className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <select
// //                             name="idType"
// //                             value={editEntry.idType || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           >
// //                             <option value="">None</option>
// //                             <option value="Contract Employee">Contract Employee</option>
// //                             <option value="Employee">Employee</option>
// //                             <option value="General Labor Category">General Labor Category</option>
// //                             <option value="Generic Staff">Generic Staff</option>
// //                             <option value="Key Entry">Key Entry</option>
// //                             <option value="Project Labor Category">Project Labor Category</option>
// //                             <option value="Vendor">Vendor</option>
// //                             <option value="Vendor Employee">Vendor Employee</option>
// //                           </select>
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <select
// //                             name="amountType"
// //                             value={editEntry.amountType || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                           >
// //                             <option value="">None</option>
// //                             <option value="Materials">Materials</option>
// //                             <option value="Subcontractors">Subcontractors</option>
// //                             <option value="Mat & Handling">Mat & Handling</option>
// //                             <option value="Travel">Travel</option>
// //                             <option value="Consultants">Consultants</option>
// //                             <option value="Other Direct Cost">Other Direct Cost</option>
// //                           </select>
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="accountId"
// //                             value={editEntry.accountId || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             placeholder="Account ID"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="orgId"
// //                             value={editEntry.orgId || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             placeholder="Org ID"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           {`$${editEntry.amount?.toFixed(2) || "0.00"}`}
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <button
// //                             onClick={cancelEdit}
// //                             className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700"
// //                           >
// //                             Cancel
// //                           </button>
// //                         </td>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                           <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4 text-blue-600" />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                           <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4 text-blue-600" />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{`$${entry.amount.toFixed(2)}`}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <button
// //                             onClick={() => startEditing(entry)}
// //                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
// //                           >
// //                             Edit
// //                           </button>
// //                         </td>
// //                       </>
// //                     )}
// //                   </tr>
// //                 ))}
// //                 {/* New Entry Row */}
// //                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <input
// //                       type="text"
// //                       name="id"
// //                       value={newEntry.id}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       placeholder="ID"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                     <input
// //                       type="checkbox"
// //                       name="revenue"
// //                       checked={newEntry.revenue}
// //                       onChange={handleNewInputChange}
// //                       className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                     <input
// //                       type="checkbox"
// //                       name="burden"
// //                       checked={newEntry.burden}
// //                       onChange={handleNewInputChange}
// //                       className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <select
// //                       name="idType"
// //                       value={newEntry.idType || ""}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">None</option>
// //                       <option value="Contract Employee">Contract Employee</option>
// //                       <option value="Employee">Employee</option>
// //                       <option value="General Labor Category">General Labor Category</option>
// //                       <option value="Generic Staff">Generic Staff</option>
// //                       <option value="Key Entry">Key Entry</option>
// //                       <option value="Project Labor Category">Project Labor Category</option>
// //                       <option value="Vendor">Vendor</option>
// //                       <option value="Vendor Employee">Vendor Employee</option>
// //                     </select>
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <select
// //                       name="amountType"
// //                       value={newEntry.amountType || ""}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                       <option value="">None</option>
// //                       <option value="Materials">Materials</option>
// //                       <option value="Subcontractors">Subcontractors</option>
// //                       <option value="Mat & Handling">Mat & Handling</option>
// //                       <option value="Travel">Travel</option>
// //                       <option value="Consultants">Consultants</option>
// //                       <option value="Other Direct Cost">Other Direct Cost</option>
// //                     </select>
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <input
// //                       type="text"
// //                       name="accountId"
// //                       value={newEntry.accountId}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       placeholder="Account ID"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <input
// //                       type="text"
// //                       name="orgId"
// //                       value={newEntry.orgId}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       placeholder="Org ID"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">{`$${newEntry.amount.toFixed(2)}`}</td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <button
// //                       onClick={addPendingNewEntry}
// //                       className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 mt-1 w-full"
// //                     >
// //                       Add
// //                     </button>
// //                   </td>
// //                 </tr>
// //               </Fragment>
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Right Table (Periods/Duration) */}
// //         <div className="w-1/2 overflow-x-auto flex flex-col">
// //           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1 h-full">
// //             <thead className="bg-blue-100 text-gray-700 font-normal">
// //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {periods.map((period) => (
// //                   <th
// //                     key={`${period.month}-${period.year}`}
// //                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
// //                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                   >
// //                     <div className="flex flex-col items-center justify-center h-full">
// //                       <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
// //                         {period.month}
// //                       </span>
// //                     </div>
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {entries.map((entry) => (
// //                 <tr key={`periods-${entry.id}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                   {periods.map((period) => {
// //                     const periodKey = `${period.month}-${period.year}`;
// //                     const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// //                     const placeholderText = isInputDisabled ? "Closed" : "";
// //                     const displayAmount = editingId === entry.id ? (periodAmounts[periodKey] || "") : (entry.periodForecasts ? (entry.periodForecasts[periodKey] || "") : '');
// //                     return (
// //                       <td
// //                         key={periodKey}
// //                         className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// //                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                       >
// //                         <input
// //                           type="text"
// //                           inputMode="numeric"
// //                           value={displayAmount}
// //                           onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// //                           className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
// //                             isInputDisabled || editingId !== entry.id ? "cursor-not-allowed text-gray-400" : ""
// //                           }`}
// //                           style={{
// //                             width: "55px",
// //                             padding: "0px 2px",
// //                             height: "20px",
// //                             boxSizing: "border-box",
// //                             lineHeight: "normal",
// //                           }}
// //                           disabled={isInputDisabled || editingId !== entry.id}
// //                           placeholder={placeholderText}
// //                         />
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}
// //               {/* New Entry Row */}
// //               <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {periods.map((period) => {
// //                   const periodKey = `${period.month}-${period.year}`;
// //                   const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// //                   const placeholderText = isInputDisabled ? "Closed" : "";
// //                   return (
// //                     <td
// //                       key={periodKey}
// //                       className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// //                       style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                     >
// //                       <input
// //                         type="text"
// //                         inputMode="numeric"
// //                         value={newEntryPeriodAmounts[periodKey] || ""}
// //                         onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// //                         className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
// //                           isInputDisabled || editingId !== null ? "cursor-not-allowed text-gray-400" : ""
// //                         }`}
// //                         style={{
// //                           width: "55px",
// //                           padding: "0px 2px",
// //                           height: "20px",
// //                           boxSizing: "border-box",
// //                           lineHeight: "normal",
// //                         }}
// //                         disabled={isInputDisabled || editingId !== null}
// //                         placeholder={placeholderText}
// //                       />
// //                     </td>
// //                   );
// //                 })}
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectAmountsTable;



// // import React, { useState, useEffect, useCallback, Fragment } from "react";
// // import axios from "axios";

// // const ENTRY_COLUMNS = [
// //   { key: "id", label: "ID" },
// //   { key: "revenue", label: "Rev" },
// //   { key: "burden", label: "Burd" },
// //   { key: "idType", label: "ID Type" },
// //   { key: "amountType", label: "Amount Type" },
// //   { key: "accountId", label: "Account ID" },
// //   { key: "orgId", label: "Org ID" },
// //   { key: "amount", label: "Total Amount" },
// //   { key: "actions", label: "Actions" },
// // ];

// // const ROW_HEIGHT_DEFAULT = 64;

// // const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
// //   const [periods, setPeriods] = useState([]);
// //   const [entries, setEntries] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [newEntry, setNewEntry] = useState({
// //     id: "",
// //     revenue: false,
// //     orgId: "",
// //     amount: 0,
// //     burden: false,
// //     idType: null,
// //     amountType: null,
// //     accountId: "",
// //   });
// //   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
// //   const [editingId, setEditingId] = useState(null);
// //   const [editEntry, setEditEntry] = useState({});
// //   const [periodAmounts, setPeriodAmounts] = useState({});
// //   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({});
// //   const [pendingChanges, setPendingChanges] = useState([]);
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [successMessageText, setSuccessMessageText] = useState("");

// //   const isPeriodClosed = (monthNo, year) => {
// //     if (planType === "BUD") return false;
// //     const closedDate = new Date("2025-06-01T00:00:00Z");
// //     const periodDate = new Date(year, monthNo - 1, 1);
// //     return periodDate < closedDate;
// //   };

// //   useEffect(() => {
// //     const fetchPeriods = async () => {
// //       if (!startDate || !endDate) {
// //         setPeriods([]);
// //         return;
// //       }
// //       try {
// //         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
// //         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
// //         );
// //         if (Array.isArray(response.data)) {
// //           const formattedPeriods = response.data.map((p) => ({
// //             month: p.month,
// //             monthNo: p.monthNo,
// //             year: p.year,
// //             workingHours: p.workingHours,
// //           }));
// //           setPeriods(formattedPeriods);
// //         } else {
// //           setPeriods([]);
// //         }
// //       } catch (err) {
// //         setError("Failed to load periods.");
// //         setPeriods([]);
// //       }
// //     };
// //     fetchPeriods();
// //   }, [startDate, endDate]);

// //   const fetchProjectData = useCallback(async () => {
// //     if (initialData?.plId && periods.length > 0) {
// //       setLoading(true);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
// //         );
// //         const apiData = response.data;
// //         if (apiData && apiData.empl) {
// //           const entry = {
// //             id: apiData.empl.id || "",
// //             revenue: apiData.empl.isRev || false,
// //             orgId: apiData.empl.orgId || "",
// //             burden: apiData.empl.isBrd || false,
// //             idType: apiData.empl.plcGlc || null,
// //             amountType: apiData.empl.amountType || null,
// //             accountId: apiData.empl.acctId || "",
// //             amount: 0,
// //           };
// //           const fetchedPeriodAmountsForExistingEntry = {};
// //           let totalCalculatedAmount = 0;
// //           if (apiData.empl.plForecasts && Array.isArray(apiData.empl.plForecasts)) {
// //             apiData.empl.plForecasts.forEach((forecast) => {
// //               const periodDetail = periods.find(p => p.monthNo === forecast.month && p.year === forecast.year);
// //               if (periodDetail) {
// //                 const periodKey = `${periodDetail.month}-${periodDetail.year}`;
// //                 const forecastedAmt = parseFloat(forecast.forecastedamt) || 0;
// //                 fetchedPeriodAmountsForExistingEntry[periodKey] = forecastedAmt;
// //                 totalCalculatedAmount += forecastedAmt;
// //               }
// //             });
// //           }
// //           setEntries([{ ...entry, amount: totalCalculatedAmount, periodForecasts: fetchedPeriodAmountsForExistingEntry }]);
// //           setPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// //           setOriginalPeriodAmounts(fetchedPeriodAmountsForExistingEntry);
// //           setNewEntryPeriodAmounts({});
// //           setPendingChanges([]);
// //         } else {
// //           setEntries([]);
// //           setPeriodAmounts({});
// //           setOriginalPeriodAmounts({});
// //           setNewEntryPeriodAmounts({});
// //           setPendingChanges([]);
// //         }
// //       } catch (err) {
// //         setError("Failed to load project data for amounts.");
// //         setEntries([]);
// //         setPeriodAmounts({});
// //         setOriginalPeriodAmounts({});
// //         setNewEntryPeriodAmounts({});
// //         setPendingChanges([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     } else if (!initialData?.plId) {
// //       setEntries([]);
// //       setPeriodAmounts({});
// //       setOriginalPeriodAmounts({});
// //       setNewEntryPeriodAmounts({});
// //       setPendingChanges([]);
// //       setLoading(false);
// //     }
// //   }, [initialData?.plId, periods, planType]);

// //   useEffect(() => {
// //     fetchProjectData();
// //   }, [fetchProjectData]);

// //   const handleNewInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setNewEntry((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
// //   };

// //   const handleEditInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setEditEntry((prev) => {
// //       const updatedEditEntry = { ...prev, [name]: type === 'checkbox' ? checked : value };
// //       setPendingChanges(prevChanges => {
// //         const existingChangeIndex = prevChanges.findIndex(
// //           change => change.type === 'edit' && change.data.id === editingId
// //         );
// //         const updatedEditData = {
// //           ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : prev),
// //           ...updatedEditEntry
// //         };
// //         if (existingChangeIndex > -1) {
// //           return prevChanges.map((change, index) =>
// //             index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// //           );
// //         } else {
// //           const originalEntry = entries.find(entry => entry.id === editingId);
// //           return [
// //             ...prevChanges,
// //             { type: 'edit', data: { ...originalEntry, ...updatedEditEntry } }
// //           ];
// //         }
// //       });
// //       return updatedEditEntry;
// //     });
// //   };

// //   const handlePeriodAmountChange = (periodKey, value) => {
// //     const numericValue = value ? parseFloat(value) || 0 : 0;
// //     if (editingId) {
// //       setPeriodAmounts((prev) => {
// //         const newPrev = { ...prev, [periodKey]: numericValue };
// //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //         setEditEntry(prevEditEntry => {
// //           const updatedEditEntry = { ...prevEditEntry, amount: totalAmount };
// //           setPendingChanges(prevChanges => {
// //             const existingChangeIndex = prevChanges.findIndex(
// //               change => change.type === 'edit' && change.data.id === editingId
// //             );
// //             const updatedPeriodForecasts = { ...newPrev };
// //             const updatedEditData = {
// //               ...(existingChangeIndex > -1 ? prevChanges[existingChangeIndex].data : updatedEditEntry),
// //               amount: totalAmount,
// //               periodForecasts: updatedPeriodForecasts
// //             };
// //             if (existingChangeIndex > -1) {
// //               return prevChanges.map((change, index) =>
// //                 index === existingChangeIndex ? { ...change, data: updatedEditData } : change
// //               );
// //             } else {
// //               const originalEntry = entries.find(entry => entry.id === editingId);
// //               return [...prevChanges, { type: 'edit', data: { ...originalEntry, ...updatedEditData } }];
// //             }
// //           });
// //           return updatedEditEntry;
// //         });
// //         return newPrev;
// //       });
// //     } else {
// //       setNewEntryPeriodAmounts((prev) => {
// //         const newPrev = { ...prev, [periodKey]: numericValue };
// //         const totalAmount = Object.values(newPrev).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //         setNewEntry(prevNewEntry => {
// //           const updatedNewEntry = { ...prevNewEntry, amount: totalAmount };
// //           setPendingChanges(prevChanges => {
// //             const existingChangeIndex = prevChanges.findIndex(
// //               change => change.type === 'new' && change.data.id === updatedNewEntry.id
// //             );
// //             const updatedPeriodForecasts = { ...newPrev };
// //             const updatedNewData = {
// //               ...updatedNewEntry,
// //               amount: totalAmount,
// //               periodForecasts: updatedPeriodForecasts
// //             };
// //             if (existingChangeIndex > -1) {
// //               return prevChanges.map((change, index) =>
// //                 index === existingChangeIndex ? { ...change, data: updatedNewData } : change
// //               );
// //             } else {
// //               return [...prevChanges, { type: 'new', data: updatedNewData }];
// //             }
// //           });
// //           return updatedNewEntry;
// //         });
// //         return newPrev;
// //       });
// //     }
// //   };

// //   // Allow Add even if ID is empty
// //   const addPendingNewEntry = () => {
// //     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //     const entryToAdd = {
// //       ...newEntry,
// //       amount: totalAmount,
// //       periodForecasts: newEntryPeriodAmounts,
// //     };
// //     setEntries(prevEntries => [...prevEntries, entryToAdd]);
// //     setPendingChanges(prevChanges => [...prevChanges, { type: 'new', data: entryToAdd }]);
// //     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, idType: null, amountType: null, accountId: "" });
// //     setNewEntryPeriodAmounts({});
// //   };

// //   const startEditing = (entry) => {
// //     setEditingId(entry.id);
// //     setEditEntry({
// //       id: entry.id,
// //       revenue: entry.revenue,
// //       orgId: entry.orgId,
// //       amount: entry.amount,
// //       burden: entry.burden,
// //       idType: entry.idType,
// //       amountType: entry.amountType,
// //       accountId: entry.accountId,
// //     });
// //     setPeriodAmounts(entry.periodForecasts || {});
// //     setOriginalPeriodAmounts(entry.periodForecasts || {});
// //   };

// //   const cancelEdit = () => {
// //     setEditingId(null);
// //     setEditEntry({});
// //     setPeriodAmounts(originalPeriodAmounts);
// //     setEntries(prevEntries => prevEntries.map(entry =>
// //       entry.id === editingId ? { ...entry, periodForecasts: originalPeriodAmounts, amount: Object.values(originalPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) } : entry
// //     ));
// //     setPendingChanges(prevChanges =>
// //       prevChanges.filter(change => !(change.type === 'edit' && change.data.id === editingId))
// //     );
// //   };

// //   const handleSaveAll = async () => {
// //     setLoading(true);
// //     let successCount = 0;
// //     let errorCount = 0;
// //     for (const change of pendingChanges) {
// //       const { type, data } = change;
// //       const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
// //       const payloadForecasts = periods.map(period => ({
// //         forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
// //         projId: initialData?.projId || "N/A",
// //         plId: initialData?.plId || 0,
// //         emplId: data.id,
// //         dctId: initialData?.dctId || 0,
// //         month: period.monthNo,
// //         year: period.year,
// //       }));
// //       const payload = {
// //         dctId: initialData?.dctId || 0,
// //         plId: initialData?.plId || 0,
// //         acctId: data.accountId,
// //         orgId: data.orgId,
// //         notes: type === 'new' ? "Auto-generated from UI" : "Auto-updated from UI",
// //         category: "Direct Cost",
// //         amountType: data.amountType,
// //         id: data.id,
// //         isRev: data.revenue,
// //         isBrd: data.burden,
// //         // plcGlc: data.idType,
// //         plForecasts: payloadForecasts,
// //       };
// //       try {
// //         await axios.post(
// //           `https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost`,
// //           payload
// //         );
// //         successCount++;
// //       } catch (err) {
// //         errorCount++;
// //       }
// //     }
// //     if (errorCount === 0 && successCount > 0) {
// //       setSuccessMessageText(`Successfully saved ${successCount} entries!`);
// //     } else if (successCount > 0 && errorCount > 0) {
// //       setSuccessMessageText(`Saved ${successCount} entries with ${errorCount} errors.`);
// //     } else if (errorCount > 0) {
// //       setSuccessMessageText(`Failed to save ${errorCount} entries.`);
// //     } else {
// //       setSuccessMessageText("No changes to save.");
// //     }
// //     setShowSuccessMessage(true);
// //     setTimeout(() => setShowSuccessMessage(false), 3000);
// //     setPendingChanges([]);
// //     await fetchProjectData();
// //     setLoading(false);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-32 p-4 font-inter">
// //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-4 font-inter">
// //         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
// //           <strong className="font-bold text-xs">Error: </strong>
// //           <span className="block sm:inline text-xs">{error}</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!initialData?.plId) {
// //     return (
// //       <div className="p-4 font-inter">
// //         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
// //           <span className="text-xs">Please select a plan to view amounts data.</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const rowCount = Math.max(entries.length + 1, 2);

// //   return (
// //     <div className="relative p-4 font-inter">
// //       {showSuccessMessage && (
// //         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50
// //           ${successMessageText.includes("successfully") ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
// //           {successMessageText}
// //         </div>
// //       )}

// //       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
// //       <div className="w-full flex justify-end mb-4">
// //         <button
// //           onClick={handleSaveAll}
// //           className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium
// //             ${pendingChanges.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// //           disabled={pendingChanges.length === 0}
// //         >
// //           Save All ({pendingChanges.length})
// //         </button>
// //       </div>

// //       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
// //         {/* Left Table */}
// //         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
// //           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1 h-full">
// //             <thead className="bg-blue-100 text-gray-700">
// //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {ENTRY_COLUMNS.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
// //                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                   >
// //                     {col.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <Fragment>
// //                 {entries.map((entry) => (
// //                   <tr key={entry.id} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                     {editingId === entry.id ? (
// //                       <>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="id"
// //                             value={editEntry.id || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                           <input
// //                             type="checkbox"
// //                             name="revenue"
// //                             checked={editEntry.revenue}
// //                             onChange={handleEditInputChange}
// //                             className="w-4 h-4"
// //                             style={{ boxShadow: "none", outline: "none", border: "1px solid #ccc" }}
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                           <input
// //                             type="checkbox"
// //                             name="burden"
// //                             checked={editEntry.burden}
// //                             onChange={handleEditInputChange}
// //                             className="w-4 h-4"
// //                             style={{ boxShadow: "none", outline: "none", border: "1px solid #ccc" }}
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <select
// //                             name="idType"
// //                             value={editEntry.idType || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                           >
// //                             <option value="">None</option>
// //                             <option value="Contract Employee">Contract Employee</option>
// //                             <option value="Employee">Employee</option>
// //                             <option value="General Labor Category">General Labor Category</option>
// //                             <option value="Generic Staff">Generic Staff</option>
// //                             <option value="Key Entry">Key Entry</option>
// //                             <option value="Project Labor Category">Project Labor Category</option>
// //                             <option value="Vendor">Vendor</option>
// //                             <option value="Vendor Employee">Vendor Employee</option>
// //                           </select>
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <select
// //                             name="amountType"
// //                             value={editEntry.amountType || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                           >
// //                             <option value="">None</option>
// //                             <option value="Materials">Materials</option>
// //                             <option value="Subcontractors">Subcontractors</option>
// //                             <option value="Mat & Handling">Mat & Handling</option>
// //                             <option value="Travel">Travel</option>
// //                             <option value="Consultants">Consultants</option>
// //                             <option value="Other Direct Cost">Other Direct Cost</option>
// //                           </select>
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="accountId"
// //                             value={editEntry.accountId || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                             placeholder="Account ID"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <input
// //                             type="text"
// //                             name="orgId"
// //                             value={editEntry.orgId || ""}
// //                             onChange={handleEditInputChange}
// //                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                             placeholder="Org ID"
// //                           />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           {`$${editEntry.amount?.toFixed(2) || "0.00"}`}
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <button
// //                             onClick={cancelEdit}
// //                             className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700"
// //                           >
// //                             Cancel
// //                           </button>
// //                         </td>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                           <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" style={{ boxShadow: "none", outline: "none", border: "1px solid #ccc" }} />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                           <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" style={{ boxShadow: "none", outline: "none", border: "1px solid #ccc" }} />
// //                         </td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">{`$${entry.amount.toFixed(2)}`}</td>
// //                         <td className="border border-gray-300 px-2 py-0.5">
// //                           <button
// //                             onClick={() => startEditing(entry)}
// //                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
// //                           >
// //                             Edit
// //                           </button>
// //                         </td>
// //                       </>
// //                     )}
// //                   </tr>
// //                 ))}
// //                 {/* New Entry Row */}
// //                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <input
// //                       type="text"
// //                       name="id"
// //                       value={newEntry.id}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                       placeholder="ID"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                     <input
// //                       type="checkbox"
// //                       name="revenue"
// //                       checked={newEntry.revenue}
// //                       onChange={handleNewInputChange}
// //                       className="w-4 h-4"
// //                       style={{ boxShadow: "none", outline: "none", border: "1px solid #ccc" }}
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5 text-center">
// //                     <input
// //                       type="checkbox"
// //                       name="burden"
// //                       checked={newEntry.burden}
// //                       onChange={handleNewInputChange}
// //                       className="w-4 h-4"
// //                       style={{ boxShadow: "none", outline: "none", border: "1px solid #ccc" }}
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <select
// //                       name="idType"
// //                       value={newEntry.idType || ""}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                     >
// //                       <option value="">None</option>
// //                       <option value="Contract Employee">Contract Employee</option>
// //                       <option value="Employee">Employee</option>
// //                       <option value="General Labor Category">General Labor Category</option>
// //                       <option value="Generic Staff">Generic Staff</option>
// //                       <option value="Key Entry">Key Entry</option>
// //                       <option value="Project Labor Category">Project Labor Category</option>
// //                       <option value="Vendor">Vendor</option>
// //                       <option value="Vendor Employee">Vendor Employee</option>
// //                     </select>
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <select
// //                       name="amountType"
// //                       value={newEntry.amountType || ""}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                     >
// //                       <option value="">None</option>
// //                       <option value="Materials">Materials</option>
// //                       <option value="Subcontractors">Subcontractors</option>
// //                       <option value="Mat & Handling">Mat & Handling</option>
// //                       <option value="Travel">Travel</option>
// //                       <option value="Consultants">Consultants</option>
// //                       <option value="Other Direct Cost">Other Direct Cost</option>
// //                     </select>
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <input
// //                       type="text"
// //                       name="accountId"
// //                       value={newEntry.accountId}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                       placeholder="Account ID"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <input
// //                       type="text"
// //                       name="orgId"
// //                       value={newEntry.orgId}
// //                       onChange={handleNewInputChange}
// //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs sm:text-sm"
// //                       placeholder="Org ID"
// //                     />
// //                   </td>
// //                   <td className="border border-gray-300 px-2 py-0.5">{`$${newEntry.amount.toFixed(2)}`}</td>
// //                   <td className="border border-gray-300 px-2 py-0.5">
// //                     <button
// //                       onClick={addPendingNewEntry}
// //                       className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 mt-1 w-full"
// //                     >
// //                       Add
// //                     </button>
// //                   </td>
// //                 </tr>
// //               </Fragment>
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Right Table (Periods/Duration) */}
// //         <div className="w-1/2 overflow-x-auto flex flex-col">
// //           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1 h-full">
// //             <thead className="bg-blue-100 text-gray-700 font-normal">
// //               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {periods.map((period) => (
// //                   <th
// //                     key={`${period.month}-${period.year}`}
// //                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
// //                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                   >
// //                     <div className="flex flex-col items-center justify-center h-full">
// //                       <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
// //                         {period.month}
// //                       </span>
// //                     </div>
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {entries.map((entry) => (
// //                 <tr key={`periods-${entry.id}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                   {periods.map((period) => {
// //                     const periodKey = `${period.month}-${period.year}`;
// //                     const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// //                     const placeholderText = isInputDisabled ? "Closed" : "";
// //                     const displayAmount = editingId === entry.id ? (periodAmounts[periodKey] || "") : (entry.periodForecasts ? (entry.periodForecasts[periodKey] || "") : '');
// //                     return (
// //                       <td
// //                         key={periodKey}
// //                         className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// //                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                       >
// //                         <input
// //                           type="text"
// //                           value={displayAmount}
// //                           onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// //                           className={`text-center outline-none bg-transparent transition text-xs text-gray-700 ${
// //                             isInputDisabled || editingId !== entry.id ? "cursor-not-allowed text-gray-400" : ""
// //                           }`}
// //                           style={{
// //                             width: "55px",
// //                             padding: "0px 2px",
// //                             height: "20px",
// //                             boxSizing: "border-box",
// //                             lineHeight: "normal",
// //                           }}
// //                           disabled={isInputDisabled || editingId !== entry.id}
// //                           placeholder={placeholderText}
// //                         />
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}
// //               {/* New Entry Row */}
// //               <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
// //                 {periods.map((period) => {
// //                   const periodKey = `${period.month}-${period.year}`;
// //                   const isInputDisabled = isPeriodClosed(period.monthNo, period.year);
// //                   const placeholderText = isInputDisabled ? "Closed" : "";
// //                   return (
// //                     <td
// //                       key={periodKey}
// //                       className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
// //                       style={{ boxSizing: "border-box", lineHeight: "normal" }}
// //                     >
// //                       <input
// //                         type="text"
// //                         value={newEntryPeriodAmounts[periodKey] || ""}
// //                         onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
// //                         className={`text-center outline-none bg-transparent transition text-xs text-gray-700 ${
// //                           isInputDisabled || editingId !== null ? "cursor-not-allowed text-gray-400" : ""
// //                         }`}
// //                         style={{
// //                           width: "55px",
// //                           padding: "0px 2px",
// //                           height: "20px",
// //                           boxSizing: "border-box",
// //                           lineHeight: "normal",
// //                         }}
// //                         disabled={isInputDisabled || editingId !== null}
// //                         placeholder={placeholderText}
// //                       />
// //                     </td>
// //                   );
// //                 })}
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectAmountsTable;


// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
//   { key: "actions", label: "Actions" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: null,
//     amountType: null,
//     accountId: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [editingId, setEditingId] = useState(null);
//   const [editEntry, setEditEntry] = useState({});
//   const [periodAmounts, setPeriodAmounts] = useState({});
//   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({});
//   const [pendingChanges, setPendingChanges] = useState([]);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");

//   const isPeriodClosed = (monthNo, year) => {
//     if (planType === "BUD") return false;
//     const closedDate = new Date("2025-06-01T00:00:00Z");
//     const periodDate = new Date(year, monthNo - 1, 1);
//     return periodDate < closedDate;
//   };

//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         const apiData = response.data;
//         if (apiData && apiData.empl) {
//           const entry = {
//             id: apiData.empl.id || "",
//             revenue: apiData.empl.isRev || false,
//             orgId: apiData.empl.orgId || "",
//             burden: apiData.empl.isBrd || false,
//             idType: apiData.empl.plcGlc || null,
//             amountType: apiData.empl.amountType || null,
//             accountId: apiData.empl.acctId || "",
//             amount: 0,
//           };
//           const fetchedPeriodAmounts = {};
//           let totalAmount = 0;
//           if (apiData.empl.plForecasts && Array.isArray(apiData.empl.plForecasts)) {
//             apiData.empl.plForecasts.forEach((forecast) => {
//               const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//               if (period) {
//                 const periodKey = `${period.month}-${period.year}`;
//                 const amount = parseFloat(forecast.forecastedamt) || 0;
//                 fetchedPeriodAmounts[periodKey] = amount;
//                 totalAmount += amount;
//               }
//             });
//           }
//           setEntries([{ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts }]);
//           setPeriodAmounts(fetchedPeriodAmounts);
//           setOriginalPeriodAmounts(fetchedPeriodAmounts);
//           setNewEntryPeriodAmounts({});
//           setPendingChanges([]);
//         } else {
//           setEntries([]);
//           setPeriodAmounts({});
//           setOriginalPeriodAmounts({});
//           setNewEntryPeriodAmounts({});
//           setPendingChanges([]);
//         }
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setPeriodAmounts({});
//         setOriginalPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setPendingChanges([]);
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setPeriodAmounts({});
//       setOriginalPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setPendingChanges([]);
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   const handleNewInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewEntry((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditEntry((prev) => {
//       const updated = { ...prev, [name]: type === "checkbox" ? checked : value };
//       setPendingChanges((prevChanges) => {
//         const index = prevChanges.findIndex((c) => c.type === "edit" && c.data.id === editingId);
//         const data = { ...(index > -1 ? prevChanges[index].data : prev), ...updated };
//         return index > -1
//           ? prevChanges.map((c, i) => (i === index ? { ...c, data } : c))
//           : [...prevChanges, { type: "edit", data: { ...entries.find((e) => e.id === editingId), ...updated } }];
//       });
//       return updated;
//     });
//   };

//   const handlePeriodAmountChange = (periodKey, value) => {
//     const numericValue = value ? parseFloat(value) || 0 : 0;
//     if (editingId) {
//       setPeriodAmounts((prev) => {
//         const newAmounts = { ...prev, [periodKey]: numericValue };
//         const total = Object.values(newAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//         setEditEntry((prevEdit) => {
//           const updated = { ...prevEdit, amount: total };
//           setPendingChanges((prevChanges) => {
//             const index = prevChanges.findIndex((c) => c.type === "edit" && c.data.id === editingId);
//             const data = {
//               ...(index > -1 ? prevChanges[index].data : updated),
//               amount: total,
//               periodForecasts: newAmounts,
//             };
//             return index > -1
//               ? prevChanges.map((c, i) => (i === index ? { ...c, data } : c))
//               : [...prevChanges, { type: "edit", data: { ...entries.find((e) => e.id === editingId), ...data } }];
//           });
//           return updated;
//         });
//         return newAmounts;
//       });
//     } else {
//       setNewEntryPeriodAmounts((prev) => {
//         const newAmounts = { ...prev, [periodKey]: numericValue };
//         const total = Object.values(newAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//         setNewEntry((prevNew) => {
//           const updated = { ...prevNew, amount: total };
//           setPendingChanges((prevChanges) => {
//             const index = prevChanges.findIndex((c) => c.type === "new" && c.data.id === updated.id);
//             const data = { ...updated, amount: total, periodForecasts: newAmounts };
//             return index > -1
//               ? prevChanges.map((c, i) => (i === index ? { ...c, data } : c))
//               : [...prevChanges, { type: "new", data }];
//           });
//           return updated;
//         });
//         return newAmounts;
//       });
//     }
//   };

//   const addPendingNewEntry = () => {
//     if (!newEntry.idType || !newEntry.amountType || !newEntry.accountId) {
//       setSuccessMessageText("Please fill required fields: ID Type, Amount Type, Account ID.");
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 3000);
//       return;
//     }
//     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//     const entryToAdd = {
//       id: newEntry.id || `auto_${Date.now()}`,
//       revenue: newEntry.revenue,
//       orgId: newEntry.orgId,
//       amount: totalAmount,
//       burden: newEntry.burden,
//       idType: newEntry.idType,
//       amountType: newEntry.amountType,
//       accountId: newEntry.accountId,
//       periodForecasts: newEntryPeriodAmounts,
//     };
//     setEntries((prev) => [...prev, entryToAdd]);
//     setPendingChanges((prev) => [...prev, { type: "new", data: entryToAdd }]);
//     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, idType: null, amountType: null, accountId: "" });
//     setNewEntryPeriodAmounts({});
//   };

//   const startEditing = (entry) => {
//     setEditingId(entry.id);
//     setEditEntry({
//       id: entry.id,
//       revenue: entry.revenue,
//       orgId: entry.orgId,
//       amount: entry.amount,
//       burden: entry.burden,
//       idType: entry.idType,
//       amountType: entry.amountType,
//       accountId: entry.accountId,
//     });
//     setPeriodAmounts(entry.periodForecasts || {});
//     setOriginalPeriodAmounts(entry.periodForecasts || {});
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditEntry({});
//     setPeriodAmounts(originalPeriodAmounts);
//     setEntries((prev) =>
//       prev.map((entry) =>
//         entry.id === editingId
//           ? { ...entry, periodForecasts: originalPeriodAmounts, amount: Object.values(originalPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) }
//           : entry
//       )
//     );
//     setPendingChanges((prev) => prev.filter((c) => !(c.type === "edit" && c.data.id === editingId)));
//   };

//   const handleSaveAll = async () => {
//     setLoading(true);
//     let successCount = 0;
//     let errorCount = 0;

//     for (const change of pendingChanges) {
//       const { type, data } = change;
//       const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//       const payloadForecasts = periods.map((period) => ({
//         forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
//         projId: initialData?.projId || "N/A",
//         plId: initialData?.plId || 0,
//         emplId: data.id, // Ensure emplId is valid
//         dctId: initialData?.dctId || 0,
//         month: period.monthNo,
//         year: period.year,
//       }));

//       const payload = {
//         dctId: initialData?.dctId || 0,
//         plId: initialData?.plId || 0,
//         acctId: data.accountId,
//         orgId: data.orgId || "",
//         notes: type === "new" ? "Auto-generated from UI" : "Auto-updated from UI",
//         category: "Direct Cost",
//         amountType: data.amountType,
//         id: data.id,
//         isRev: data.revenue,
//         isBrd: data.burden,
//         plcGlc: data.idType,
//         plForecasts: payloadForecasts,
//       };

//       console.log("Sending payload:", payload); // Debug payload
//       try {
//         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//         successCount++;
//       } catch (err) {
//         console.error(`Failed to save ${type} entry ${data.id}:`, err.message, err.response?.data);
//         errorCount++;
//       }
//     }

//     if (errorCount === 0 && successCount > 0) setSuccessMessageText(`Successfully saved ${successCount} entries!`);
//     else if (successCount > 0 && errorCount > 0) setSuccessMessageText(`Saved ${successCount} with ${errorCount} errors.`);
//     else if (errorCount > 0) setSuccessMessageText(`Failed to save ${errorCount} entries.`);
//     else setSuccessMessageText("No changes to save.");
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);

//     setPendingChanges([]);
//     await fetchProjectData();
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + 1, 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4">
//         <button
//           onClick={handleSaveAll}
//           className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium ${pendingChanges.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
//           disabled={pendingChanges.length === 0}
//         >
//           Save All ({pendingChanges.length})
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry) => (
//                   <tr key={entry.id} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     {editingId === entry.id ? (
//                       <>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <input
//                             type="text"
//                             name="id"
//                             value={editEntry.id || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input
//                             type="checkbox"
//                             name="revenue"
//                             checked={editEntry.revenue}
//                             onChange={handleEditInputChange}
//                             className="w-4 h-4"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input
//                             type="checkbox"
//                             name="burden"
//                             checked={editEntry.burden}
//                             onChange={handleEditInputChange}
//                             className="w-4 h-4"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <select
//                             name="idType"
//                             value={editEntry.idType || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             <option value="">None</option>
//                             <option value="Contract Employee">Contract Employee</option>
//                             <option value="Employee">Employee</option>
//                             <option value="General Labor Category">General Labor Category</option>
//                             <option value="Generic Staff">Generic Staff</option>
//                             <option value="Key Entry">Key Entry</option>
//                             <option value="Project Labor Category">Project Labor Category</option>
//                             <option value="Vendor">Vendor</option>
//                             <option value="Vendor Employee">Vendor Employee</option>
//                           </select>
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <select
//                             name="amountType"
//                             value={editEntry.amountType || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           >
//                             <option value="">None</option>
//                             <option value="Materials">Materials</option>
//                             <option value="Subcontractors">Subcontractors</option>
//                             <option value="Mat & Handling">Mat & Handling</option>
//                             <option value="Travel">Travel</option>
//                             <option value="Consultants">Consultants</option>
//                             <option value="Other Direct Cost">Other Direct Cost</option>
//                           </select>
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <input
//                             type="text"
//                             name="accountId"
//                             value={editEntry.accountId || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Account ID"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <input
//                             type="text"
//                             name="orgId"
//                             value={editEntry.orgId || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Org ID"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">{`$${editEntry.amount?.toFixed(2) || "0.00"}`}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <button onClick={cancelEdit} className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700">
//                             Cancel
//                           </button>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{`$${entry.amount.toFixed(2)}`}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <button
//                             onClick={() => startEditing(entry)}
//                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
//                           >
//                             Edit
//                           </button>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))}
//                 {/* New Entry Row */}
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <input
//                       type="text"
//                       name="id"
//                       value={newEntry.id}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="ID"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5 text-center">
//                     <input
//                       type="checkbox"
//                       name="revenue"
//                       checked={newEntry.revenue}
//                       onChange={handleNewInputChange}
//                       className="w-4 h-4"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5 text-center">
//                     <input
//                       type="checkbox"
//                       name="burden"
//                       checked={newEntry.burden}
//                       onChange={handleNewInputChange}
//                       className="w-4 h-4"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <select
//                       name="idType"
//                       value={newEntry.idType || ""}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">None</option>
//                       <option value="Contract Employee">Contract Employee</option>
//                       <option value="Employee">Employee</option>
//                       <option value="General Labor Category">General Labor Category</option>
//                       <option value="Generic Staff">Generic Staff</option>
//                       <option value="Key Entry">Key Entry</option>
//                       <option value="Project Labor Category">Project Labor Category</option>
//                       <option value="Vendor">Vendor</option>
//                       <option value="Vendor Employee">Vendor Employee</option>
//                     </select>
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <select
//                       name="amountType"
//                       value={newEntry.amountType || ""}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">None</option>
//                       <option value="Materials">Materials</option>
//                       <option value="Subcontractors">Subcontractors</option>
//                       <option value="Mat & Handling">Mat & Handling</option>
//                       <option value="Travel">Travel</option>
//                       <option value="Consultants">Consultants</option>
//                       <option value="Other Direct Cost">Other Direct Cost</option>
//                     </select>
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <input
//                       type="text"
//                       name="accountId"
//                       value={newEntry.accountId}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Account ID"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <input
//                       type="text"
//                       name="orgId"
//                       value={newEntry.orgId}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Org ID"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">{`$${newEntry.amount.toFixed(2)}`}</td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <button
//                       onClick={addPendingNewEntry}
//                       className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 w-full"
//                     >
//                       Add
//                     </button>
//                   </td>
//                 </tr>
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => (
//                   <th
//                     key={`${period.month}-${period.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap text-xs">{period.month}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry) => (
//                 <tr key={`periods-${entry.id}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isDisabled = isPeriodClosed(period.monthNo, period.year) && planType === "EAC";
//                     const placeholder = isDisabled ? "Closed" : "";
//                     const value = editingId === entry.id ? (periodAmounts[periodKey] || "") : (entry.periodForecasts?.[periodKey] || "");

//                     return (
//                       <td key={periodKey} className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={value}
//                           onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
//                           className={`text-center border border-gray-300 bg-white focus:outline focus:outline-blue-500 text-xs ${isDisabled || editingId !== entry.id ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={isDisabled || editingId !== entry.id}
//                           placeholder={placeholder}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {/* New Entry Row */}
//               <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const isDisabled = isPeriodClosed(period.monthNo, period.year) && planType === "EAC";
//                   const placeholder = isDisabled ? "Closed" : "";
//                   return (
//                     <td key={periodKey} className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]">
//                       <input
//                         type="text"
//                         value={newEntryPeriodAmounts[periodKey] || ""}
//                         onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
//                         className={`text-center border border-gray-300 bg-white focus:outline focus:outline-blue-500 text-xs ${isDisabled || editingId !== null ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                         style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                         disabled={isDisabled || editingId !== null}
//                         placeholder={placeholder}
//                       />
//                     </td>
//                   );
//                 })}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectAmountsTable;

// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
//   { key: "actions", label: "Actions" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: null,
//     amountType: null,
//     accountId: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [editingId, setEditingId] = useState(null);
//   const [editEntry, setEditEntry] = useState({});
//   const [periodAmounts, setPeriodAmounts] = useState({});
//   const [originalPeriodAmounts, setOriginalPeriodAmounts] = useState({});
//   const [pendingChanges, setPendingChanges] = useState([]);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");

//   // Helper: For EAC, before closed period is not editable; for BUD, all editable
//   const isPeriodClosed = (monthNo, year) => {
//     if (planType === "BUD") return false;
//     const closedDate = new Date(initialData?.closedPeriod || "2025-06-01T00:00:00Z");
//     const periodDate = new Date(year, monthNo - 1, 1);
//     return periodDate < closedDate;
//   };

//   // Fetch periods
//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   // Fetch all entries for the plan
//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         // API returns an array of entries
//         const apiData = Array.isArray(response.data) ? response.data : [response.data];
//         const allEntries = [];
//         apiData.forEach((item) => {
//           if (item.empl) {
//             const entry = {
//               id: item.empl.id || "",
//               revenue: item.empl.isRev || false,
//               orgId: item.empl.orgId || "",
//               burden: item.empl.isBrd || false,
//               idType: item.empl.plcGlc || null,
//               amountType: item.empl.amountType || null,
//               accountId: item.empl.acctId || "",
//               amount: 0,
//             };
//             const fetchedPeriodAmounts = {};
//             let totalAmount = 0;
//             if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
//               item.empl.plForecasts.forEach((forecast) => {
//                 const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//                 if (period) {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const amount = parseFloat(forecast.forecastedamt) || 0;
//                   fetchedPeriodAmounts[periodKey] = amount;
//                   totalAmount += amount;
//                 }
//               });
//             }
//             allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
//           }
//         });
//         setEntries(allEntries);
//         setPeriodAmounts({});
//         setOriginalPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setPendingChanges([]);
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setPeriodAmounts({});
//         setOriginalPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setPendingChanges([]);
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setPeriodAmounts({});
//       setOriginalPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setPendingChanges([]);
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   const handleNewInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewEntry((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditEntry((prev) => {
//       const updated = { ...prev, [name]: type === "checkbox" ? checked : value };
//       setPendingChanges((prevChanges) => {
//         const index = prevChanges.findIndex((c) => c.type === "edit" && c.data.id === editingId);
//         const data = { ...(index > -1 ? prevChanges[index].data : prev), ...updated };
//         return index > -1
//           ? prevChanges.map((c, i) => (i === index ? { ...c, data } : c))
//           : [...prevChanges, { type: "edit", data: { ...entries.find((e) => e.id === editingId), ...updated } }];
//       });
//       return updated;
//     });
//   };

//   const handlePeriodAmountChange = (periodKey, value) => {
//     const numericValue = value ? parseFloat(value) || 0 : 0;
//     if (editingId) {
//       setPeriodAmounts((prev) => {
//         const newAmounts = { ...prev, [periodKey]: numericValue };
//         const total = Object.values(newAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//         setEditEntry((prevEdit) => {
//           const updated = { ...prevEdit, amount: total };
//           setPendingChanges((prevChanges) => {
//             const index = prevChanges.findIndex((c) => c.type === "edit" && c.data.id === editingId);
//             const data = {
//               ...(index > -1 ? prevChanges[index].data : updated),
//               amount: total,
//               periodForecasts: newAmounts,
//             };
//             return index > -1
//               ? prevChanges.map((c, i) => (i === index ? { ...c, data } : c))
//               : [...prevChanges, { type: "edit", data: { ...entries.find((e) => e.id === editingId), ...data } }];
//           });
//           return updated;
//         });
//         return newAmounts;
//       });
//     } else {
//       setNewEntryPeriodAmounts((prev) => {
//         const newAmounts = { ...prev, [periodKey]: numericValue };
//         const total = Object.values(newAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//         setNewEntry((prevNew) => {
//           const updated = { ...prevNew, amount: total };
//           setPendingChanges((prevChanges) => {
//             const index = prevChanges.findIndex((c) => c.type === "new" && c.data.id === updated.id);
//             const data = { ...updated, amount: total, periodForecasts: newAmounts };
//             return index > -1
//               ? prevChanges.map((c, i) => (i === index ? { ...c, data } : c))
//               : [...prevChanges, { type: "new", data }];
//           });
//           return updated;
//         });
//         return newAmounts;
//       });
//     }
//   };

//   const addPendingNewEntry = () => {
//     if (!newEntry.idType || !newEntry.amountType || !newEntry.accountId) {
//       setSuccessMessageText("Please fill required fields: ID Type, Amount Type, Account ID.");
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 3000);
//       return;
//     }
//     const totalAmount = Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//     const entryToAdd = {
//       id: newEntry.id || `auto_${Date.now()}`,
//       revenue: newEntry.revenue,
//       orgId: newEntry.orgId,
//       amount: totalAmount,
//       burden: newEntry.burden,
//       idType: newEntry.idType,
//       amountType: newEntry.amountType,
//       accountId: newEntry.accountId,
//       periodForecasts: newEntryPeriodAmounts,
//     };
//     setEntries((prev) => [...prev, entryToAdd]);
//     setPendingChanges((prev) => [...prev, { type: "new", data: entryToAdd }]);
//     setNewEntry({ id: "", revenue: false, orgId: "", amount: 0, burden: false, idType: null, amountType: null, accountId: "" });
//     setNewEntryPeriodAmounts({});
//   };

//   const startEditing = (entry) => {
//     setEditingId(entry.id);
//     setEditEntry({
//       id: entry.id,
//       revenue: entry.revenue,
//       orgId: entry.orgId,
//       amount: entry.amount,
//       burden: entry.burden,
//       idType: entry.idType,
//       amountType: entry.amountType,
//       accountId: entry.accountId,
//     });
//     setPeriodAmounts(entry.periodForecasts || {});
//     setOriginalPeriodAmounts(entry.periodForecasts || {});
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditEntry({});
//     setPeriodAmounts(originalPeriodAmounts);
//     setEntries((prev) =>
//       prev.map((entry) =>
//         entry.id === editingId
//           ? { ...entry, periodForecasts: originalPeriodAmounts, amount: Object.values(originalPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0) }
//           : entry
//       )
//     );
//     setPendingChanges((prev) => prev.filter((c) => !(c.type === "edit" && c.data.id === editingId)));
//   };

//   const handleSaveAll = async () => {
//     setLoading(true);
//     let successCount = 0;
//     let errorCount = 0;

//     for (const change of pendingChanges) {
//       const { type, data } = change;
//       const totalAmount = Object.values(data.periodForecasts || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//       const payloadForecasts = periods.map((period) => ({
//         forecastedamt: data.periodForecasts[`${period.month}-${period.year}`] || 0,
//         projId: initialData?.projId || "N/A",
//         plId: initialData?.plId || 0,
//         emplId: data.id,
//         dctId: initialData?.dctId || 0,
//         month: period.monthNo,
//         year: period.year,
//       }));

//       const payload = {
//         dctId: initialData?.dctId || 0,
//         plId: initialData?.plId || 0,
//         acctId: data.accountId,
//         orgId: data.orgId || "",
//         notes: type === "new" ? "Auto-generated from UI" : "Auto-updated from UI",
//         category: "Direct Cost",
//         amountType: data.amountType,
//         id: data.id,
//         isRev: data.revenue,
//         isBrd: data.burden,
//         plcGlc: data.idType,
//         plForecasts: payloadForecasts,
//       };

//       try {
//         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//         successCount++;
//       } catch (err) {
//         errorCount++;
//       }
//     }

//     if (errorCount === 0 && successCount > 0) setSuccessMessageText(`Successfully saved ${successCount} entries!`);
//     else if (successCount > 0 && errorCount > 0) setSuccessMessageText(`Saved ${successCount} with ${errorCount} errors.`);
//     else if (errorCount > 0) setSuccessMessageText(`Failed to save ${errorCount} entries.`);
//     else setSuccessMessageText("No changes to save.");
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);

//     setPendingChanges([]);
//     await fetchProjectData();
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + 1, 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4">
//         <button
//           onClick={handleSaveAll}
//           className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium ${pendingChanges.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
//           disabled={pendingChanges.length === 0}
//         >
//           Save All ({pendingChanges.length})
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry) => (
//                   <tr key={entry.id} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     {editingId === entry.id ? (
//                       <>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <input
//                             type="text"
//                             name="id"
//                             value={editEntry.id || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input
//                             type="checkbox"
//                             name="revenue"
//                             checked={editEntry.revenue}
//                             onChange={handleEditInputChange}
//                             className="w-4 h-4"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input
//                             type="checkbox"
//                             name="burden"
//                             checked={editEntry.burden}
//                             onChange={handleEditInputChange}
//                             className="w-4 h-4"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <select
//                             name="idType"
//                             value={editEntry.idType || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           >
//                             <option value="">None</option>
//                             <option value="Contract Employee">Contract Employee</option>
//                             <option value="Employee">Employee</option>
//                             <option value="General Labor Category">General Labor Category</option>
//                             <option value="Generic Staff">Generic Staff</option>
//                             <option value="Key Entry">Key Entry</option>
//                             <option value="Project Labor Category">Project Labor Category</option>
//                             <option value="Vendor">Vendor</option>
//                             <option value="Vendor Employee">Vendor Employee</option>
//                           </select>
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <select
//                             name="amountType"
//                             value={editEntry.amountType || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           >
//                             <option value="">None</option>
//                             <option value="Materials">Materials</option>
//                             <option value="Subcontractors">Subcontractors</option>
//                             <option value="Mat & Handling">Mat & Handling</option>
//                             <option value="Travel">Travel</option>
//                             <option value="Consultants">Consultants</option>
//                             <option value="Other Direct Cost">Other Direct Cost</option>
//                           </select>
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <input
//                             type="text"
//                             name="accountId"
//                             value={editEntry.accountId || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             placeholder="Account ID"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <input
//                             type="text"
//                             name="orgId"
//                             value={editEntry.orgId || ""}
//                             onChange={handleEditInputChange}
//                             className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             placeholder="Org ID"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">{`$${editEntry.amount?.toFixed(2) || "0.00"}`}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <button onClick={cancelEdit} className="bg-gray-600 text-white px-2 py-0.5 rounded text-xs hover:bg-gray-700">
//                             Cancel
//                           </button>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5 text-center">
//                           <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                         </td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">{`$${entry.amount.toFixed(2)}`}</td>
//                         <td className="border border-gray-300 px-2 py-0.5">
//                           <button
//                             onClick={() => startEditing(entry)}
//                             className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700"
//                           >
//                             Edit
//                           </button>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))}
//                 {/* New Entry Row */}
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <input
//                       type="text"
//                       name="id"
//                       value={newEntry.id}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       placeholder="ID"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5 text-center">
//                     <input
//                       type="checkbox"
//                       name="revenue"
//                       checked={newEntry.revenue}
//                       onChange={handleNewInputChange}
//                       className="w-4 h-4"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5 text-center">
//                     <input
//                       type="checkbox"
//                       name="burden"
//                       checked={newEntry.burden}
//                       onChange={handleNewInputChange}
//                       className="w-4 h-4"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <select
//                       name="idType"
//                       value={newEntry.idType || ""}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                     >
//                       <option value="">None</option>
//                       <option value="Contract Employee">Contract Employee</option>
//                       <option value="Employee">Employee</option>
//                       <option value="General Labor Category">General Labor Category</option>
//                       <option value="Generic Staff">Generic Staff</option>
//                       <option value="Key Entry">Key Entry</option>
//                       <option value="Project Labor Category">Project Labor Category</option>
//                       <option value="Vendor">Vendor</option>
//                       <option value="Vendor Employee">Vendor Employee</option>
//                     </select>
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <select
//                       name="amountType"
//                       value={newEntry.amountType || ""}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                     >
//                       <option value="">None</option>
//                       <option value="Materials">Materials</option>
//                       <option value="Subcontractors">Subcontractors</option>
//                       <option value="Mat & Handling">Mat & Handling</option>
//                       <option value="Travel">Travel</option>
//                       <option value="Consultants">Consultants</option>
//                       <option value="Other Direct Cost">Other Direct Cost</option>
//                     </select>
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <input
//                       type="text"
//                       name="accountId"
//                       value={newEntry.accountId}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       placeholder="Account ID"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <input
//                       type="text"
//                       name="orgId"
//                       value={newEntry.orgId}
//                       onChange={handleNewInputChange}
//                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       placeholder="Org ID"
//                     />
//                   </td>
//                   <td className="border border-gray-300 px-2 py-0.5">{`$${newEntry.amount.toFixed(2)}`}</td>
//                   <td className="border border-gray-300 px-2 py-0.5">
//                     <button
//                       onClick={addPendingNewEntry}
//                       className="bg-green-600 text-white px-2 py-0.5 rounded text-xs hover:bg-green-700 w-full"
//                     >
//                       Add
//                     </button>
//                   </td>
//                 </tr>
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => (
//                   <th
//                     key={`${period.month}-${period.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap text-xs">{period.month}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry) => (
//                 <tr key={`periods-${entry.id}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isDisabled = isPeriodClosed(period.monthNo, period.year) && planType === "EAC";
//                     const placeholder = isDisabled ? "Closed" : "";
//                     const value = editingId === entry.id ? (periodAmounts[periodKey] || "") : (entry.periodForecasts?.[periodKey] || "");

//                     return (
//                       <td key={periodKey} className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={value}
//                           onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
//                           className={`text-center border border-gray-300 bg-white text-xs ${isDisabled || editingId !== entry.id ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={isDisabled || editingId !== entry.id}
//                           placeholder={placeholder}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {/* New Entry Row */}
//               <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const isDisabled = isPeriodClosed(period.monthNo, period.year) && planType === "EAC";
//                   const placeholder = isDisabled ? "Closed" : "";
//                   return (
//                     <td key={periodKey} className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]">
//                       <input
//                         type="text"
//                         value={newEntryPeriodAmounts[periodKey] || ""}
//                         onChange={(e) => handlePeriodAmountChange(periodKey, e.target.value)}
//                         className={`text-center border border-gray-300 bg-white text-xs ${isDisabled || editingId !== null ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                         style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                         disabled={isDisabled || editingId !== null}
//                         placeholder={placeholder}
//                       />
//                     </td>
//                   );
//                 })}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectAmountsTable;

// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "plcGlc", label: "PLC" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
// ];

// const AMOUNT_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Materials", label: "Materials" },
//   { value: "Subcontractors", label: "Subcontractors" },
//   { value: "Mat & Handling", label: "Mat & Handling" },
//   { value: "Travel", label: "Travel" },
//   { value: "Consultants", label: "Consultants" },
//   { value: "Other Direct Cost", label: "Other Direct Cost" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const getUniqueKey = (entry, idx) => entry._rowKey || `${entry.id || "auto"}-${idx}`;

// const isMonthEditable = (planType, closedPeriod, monthNo, year) => {
//   if (planType !== "EAC") return true;
//   if (!closedPeriod) return true;
//   const closedDate = new Date(closedPeriod);
//   if (isNaN(closedDate)) return true;
//   const durationDate = new Date(year, monthNo - 1, 1);
//   return durationDate >= new Date(closedDate.getFullYear(), closedDate.getMonth(), 1);
// };

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: "",
//     amountType: "",
//     plcGlc: "",
//     accountId: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [findReplace, setFindReplace] = useState({ show: false, find: "", replace: "", scope: "all", row: null, col: null });

//   // For direct editing: keep a local state for all period values
//   const [allPeriodAmounts, setAllPeriodAmounts] = useState({}); // { rowKey: { periodKey: value } }

//   // Fetch periods
//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   // Fetch all entries for the plan
//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         const apiData = Array.isArray(response.data) ? response.data : [response.data];
//         const allEntries = [];
//         const allAmounts = {};
//         apiData.forEach((item, idx) => {
//           if (item.empl) {
//             const rowKey = `${item.empl.id || "auto"}-${idx}-${Date.now()}`;
//             const entry = {
//               id: item.empl.id || "",
//               revenue: item.empl.isRev || false,
//               orgId: item.empl.orgId || "",
//               burden: item.empl.isBrd || false,
//               idType: "", // always "None"
//               amountType: item.empl.amountType || "",
//               plcGlc: item.empl.plcGlc || "",
//               accountId: item.empl.acctId || "",
//               amount: 0,
//               rgId: item.empl.rgId || "",
//               hrRate: item.empl.hrRate || "",
//               _rowKey: rowKey,
//             };
//             const fetchedPeriodAmounts = {};
//             let totalAmount = 0;
//             if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
//               item.empl.plForecasts.forEach((forecast) => {
//                 const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//                 if (period) {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const amount = parseFloat(forecast.forecastedamt) || 0;
//                   fetchedPeriodAmounts[periodKey] = amount;
//                   totalAmount += amount;
//                 }
//               });
//             }
//             allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
//             allAmounts[rowKey] = { ...fetchedPeriodAmounts };
//           }
//         });
//         setEntries(allEntries);
//         setAllPeriodAmounts(allAmounts);
//         setNewEntryPeriodAmounts({});
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setAllPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setAllPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   // Directly editable duration cells
//   const handlePeriodAmountChange = async (rowKey, periodKey, value, entry, period) => {
//     setAllPeriodAmounts((prev) => {
//       const updated = { ...prev };
//       if (!updated[rowKey]) updated[rowKey] = {};
//       updated[rowKey][periodKey] = value;
//       return updated;
//     });

//     // Call update API for this cell only
//     if (entry && entry.accountId && entry.orgId && entry.hrRate) {
//       const payload = {
//         forecastedamt: value,
//         orgId: entry.orgId,
//         accountId: entry.accountId,
//         hrRate: entry.hrRate,
//         month: period.monthNo,
//         year: period.year,
//       };
//       try {
//         await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours", payload);
//         setSuccessMessageText("Forecast updated!");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       } catch (err) {
//         setSuccessMessageText("Failed to update forecast.");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       }
//     }
//   };

//   // Find & Replace logic
//   const handleFindReplace = async () => {
//     const { find, replace, scope, row, col } = findReplace;
//     let updated = { ...allPeriodAmounts };
//     let count = 0;
//     entries.forEach((entry) => {
//       const rowKey = entry._rowKey;
//       if (scope === "row" && row !== rowKey) return;
//       periods.forEach((period) => {
//         const periodKey = `${period.month}-${period.year}`;
//         if (scope === "col" && col !== periodKey) return;
//         const editable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//         if (!editable) return;
//         const val = updated[rowKey]?.[periodKey];
//         if ((find === "" && (!val || val === 0)) || (String(val) === find)) {
//           updated[rowKey][periodKey] = replace;
//           count++;
//         }
//       });
//     });
//     setAllPeriodAmounts(updated);
//     setFindReplace({ ...findReplace, show: false, find: "", replace: "", row: null, col: null });
//     setSuccessMessageText(`Replaced ${count} cells.`);
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 2000);
//   };

//   // Save All: POST all data to AddNewDirectCost
//   const handleSaveAll = async () => {
//     setLoading(true);
//     let successCount = 0;
//     let errorCount = 0;

//     for (const entry of entries) {
//       const rowKey = entry._rowKey;
//       const periodForecasts = allPeriodAmounts[rowKey] || {};
//       const totalAmount = Object.values(periodForecasts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//       const payloadForecasts = periods.map((period) => ({
//         forecastedamt: periodForecasts[`${period.month}-${period.year}`] || 0,
//         projId: initialData?.projId || "N/A",
//         plId: initialData?.plId || 0,
//         emplId: entry.id,
//         dctId: initialData?.dctId || 0,
//         month: period.monthNo,
//         year: period.year,
//       }));

//       const payload = {
//         dctId: initialData?.dctId || 0,
//         plId: initialData?.plId || 0,
//         acctId: entry.accountId,
//         orgId: entry.orgId || "",
//         notes: "Auto-updated from UI",
//         category: "Direct Cost",
//         amountType: entry.amountType,
//         id: entry.id,
//         isRev: entry.revenue,
//         isBrd: entry.burden,
//         plcGlc: entry.plcGlc,
//         plForecasts: payloadForecasts,
//       };

//       try {
//         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//         successCount++;
//       } catch (err) {
//         errorCount++;
//       }
//     }

//     if (errorCount === 0 && successCount > 0) setSuccessMessageText(`Successfully saved ${successCount} entries!`);
//     else if (successCount > 0 && errorCount > 0) setSuccessMessageText(`Saved ${successCount} with ${errorCount} errors.`);
//     else if (errorCount > 0) setSuccessMessageText(`Failed to save ${errorCount} entries.`);
//     else setSuccessMessageText("No changes to save.");
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);

//     await fetchProjectData();
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + (showNewForm ? 1 : 0), 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4 gap-2">
//         <button
//           onClick={() => setShowNewForm((prev) => !prev)}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//         >
//           {showNewForm ? "Cancel" : "New"}
//         </button>
//         <button
//           onClick={() => setFindReplace({ ...findReplace, show: true })}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Find & Replace
//         </button>
//         <button
//           onClick={handleSaveAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Save All
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry, idx) => (
//                   <tr key={entry._rowKey} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">None</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.plcGlc || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(allPeriodAmounts[entry._rowKey] || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 ))}
//                 {showNewForm && (
//                   <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={e => setNewEntry({ ...newEntry, id: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="revenue"
//                         checked={newEntry.revenue}
//                         onChange={e => setNewEntry({ ...newEntry, revenue: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="burden"
//                         checked={newEntry.burden}
//                         onChange={e => setNewEntry({ ...newEntry, burden: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">None</td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="amountType"
//                         value={newEntry.amountType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, amountType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {AMOUNT_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlc"
//                         value={newEntry.plcGlc}
//                         onChange={e => setNewEntry({ ...newEntry, plcGlc: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="PLC"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="accountId"
//                         value={newEntry.accountId}
//                         onChange={e => setNewEntry({ ...newEntry, accountId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Account ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={e => setNewEntry({ ...newEntry, orgId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Org ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 )}
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => (
//                   <th
//                     key={`${period.month}-${period.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap text-xs">{period.month}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry, idx) => (
//                 <tr key={`periods-${entry._rowKey}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`${entry._rowKey}-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={allPeriodAmounts[entry._rowKey]?.[periodKey] || ""}
//                           onChange={e => isEditable && handlePeriodAmountChange(entry._rowKey, periodKey, e.target.value, entry, period)}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {showNewForm && (
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`new-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={newEntryPeriodAmounts[periodKey] || ""}
//                           onChange={e => isEditable && setNewEntryPeriodAmounts(prev => ({ ...prev, [periodKey]: e.target.value }))}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {showNewForm && (
//         <div className="flex justify-end mt-2">
//           <button
//             onClick={() => {
//               // Add new entry with unique row key
//               const rowKey = `${newEntry.id || "auto"}-new-${Date.now()}`;
//               const entryToAdd = {
//                 ...newEntry,
//                 amount: Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0),
//                 periodForecasts: newEntryPeriodAmounts,
//                 _rowKey: rowKey,
//               };
//               setEntries((prev) => [...prev, entryToAdd]);
//               setAllPeriodAmounts((prev) => ({ ...prev, [rowKey]: { ...newEntryPeriodAmounts } }));
//               setShowNewForm(false);
//               setNewEntry({
//                 id: "",
//                 revenue: false,
//                 orgId: "",
//                 amount: 0,
//                 burden: false,
//                 idType: "",
//                 amountType: "",
//                 plcGlc: "",
//                 accountId: "",
//               });
//               setNewEntryPeriodAmounts({});
//             }}
//             className="bg-green-600 text-white px-4 py-1 rounded text-xs hover:bg-green-700"
//           >
//             Add Entry
//           </button>
//         </div>
//       )}

//       {/* Find & Replace Modal */}
//       {findReplace.show && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
//             <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
//             <div className="mb-3">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.find}
//                 onChange={e => setFindReplace({ ...findReplace, find: e.target.value })}
//                 placeholder="Value to find (e.g., 100 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.replace}
//                 onChange={e => setFindReplace({ ...findReplace, replace: e.target.value })}
//                 placeholder="New value (e.g., 120 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="all"
//                     checked={findReplace.scope === "all"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="row"
//                     checked={findReplace.scope === "row"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Row (Row Key)</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="col"
//                     checked={findReplace.scope === "col"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Column (Month)</span>
//                 </label>
//               </div>
//               {findReplace.scope === "row" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.row || ""}
//                   onChange={e => setFindReplace({ ...findReplace, row: e.target.value })}
//                   placeholder="Enter Row Key (see code)"
//                 />
//               )}
//               {findReplace.scope === "col" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.col || ""}
//                   onChange={e => setFindReplace({ ...findReplace, col: e.target.value })}
//                   placeholder="Enter Month-Year (e.g., Jul-2025)"
//                 />
//               )}
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFindReplace({ ...findReplace, show: false })}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFindReplace}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Replace All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectAmountsTable;


// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "plcGlc", label: "PLC" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
// ];

// const AMOUNT_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Materials", label: "Materials" },
//   { value: "Subcontractors", label: "Subcontractors" },
//   { value: "Mat & Handling", label: "Mat & Handling" },
//   { value: "Travel", label: "Travel" },
//   { value: "Consultants", label: "Consultants" },
//   { value: "Other Direct Cost", label: "Other Direct Cost" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const getUniqueKey = (entry, idx) => entry._rowKey || `${entry.id || "auto"}-${idx}`;

// const isMonthEditable = (planType, closedPeriod, monthNo, year) => {
//   if (planType !== "EAC") return true;
//   if (!closedPeriod) return true;
//   const closedDate = new Date(closedPeriod);
//   if (isNaN(closedDate)) return true;
//   const durationDate = new Date(year, monthNo - 1, 1);
//   return durationDate >= new Date(closedDate.getFullYear(), closedDate.getMonth(), 1);
// };

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: "",
//     amountType: "",
//     plcGlc: "",
//     accountId: "",
//     hrRate: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [findReplace, setFindReplace] = useState({ show: false, find: "", replace: "", scope: "all", row: null, col: null });

//   // For direct editing: keep a local state for all period values
//   const [allPeriodAmounts, setAllPeriodAmounts] = useState({}); // { rowKey: { periodKey: value } }
//   const [changedRows, setChangedRows] = useState({}); // { rowKey: true }

//   // Fetch periods
//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   // Fetch all entries for the plan
//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         const apiData = Array.isArray(response.data) ? response.data : [response.data];
//         const allEntries = [];
//         const allAmounts = {};
//         apiData.forEach((item, idx) => {
//           if (item.empl) {
//             const rowKey = `${item.empl.id || "auto"}-${idx}-${Date.now()}`;
//             const entry = {
//               id: item.empl.id || "",
//               revenue: item.empl.isRev || false,
//               orgId: item.empl.orgId || "",
//               burden: item.empl.isBrd || false,
//               idType: "", // always "None"
//               amountType: item.empl.amountType || "",
//               plcGlc: item.empl.plcGlc || "",
//               accountId: item.empl.acctId || "",
//               amount: 0,
//               rgId: item.empl.rgId || "",
//               hrRate: item.empl.hrRate || "",
//               _rowKey: rowKey,
//             };
//             const fetchedPeriodAmounts = {};
//             let totalAmount = 0;
//             if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
//               item.empl.plForecasts.forEach((forecast) => {
//                 const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//                 if (period) {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const amount = parseFloat(forecast.forecastedamt) || 0;
//                   fetchedPeriodAmounts[periodKey] = amount;
//                   totalAmount += amount;
//                 }
//               });
//             }
//             allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
//             allAmounts[rowKey] = { ...fetchedPeriodAmounts };
//           }
//         });
//         setEntries(allEntries);
//         setAllPeriodAmounts(allAmounts);
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setAllPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setAllPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setChangedRows({});
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   // Directly editable duration cells
//   const handlePeriodAmountChange = async (rowKey, periodKey, value, entry, period) => {
//     setAllPeriodAmounts((prev) => {
//       const updated = { ...prev };
//       if (!updated[rowKey]) updated[rowKey] = {};
//       updated[rowKey][periodKey] = value;
//       return updated;
//     });
//     setChangedRows((prev) => ({ ...prev, [rowKey]: true }));

//     // Call update API for this cell only
//     if (entry && entry.accountId && entry.orgId && entry.hrRate) {
//       const payload = {
//         forecastedamt: value,
//         orgId: entry.orgId,
//         accountId: entry.accountId,
//         hrRate: entry.hrRate,
//         month: period.monthNo,
//         year: period.year,
//       };
//       try {
//         await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours", payload);
//         setSuccessMessageText("Forecast updated!");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       } catch (err) {
//         setSuccessMessageText("Failed to update forecast.");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       }
//     }
//   };

//   // Find & Replace logic
//   const handleFindReplace = async () => {
//     const { find, replace, scope, row, col } = findReplace;
//     let updated = { ...allPeriodAmounts };
//     let count = 0;
//     entries.forEach((entry) => {
//       const rowKey = entry._rowKey;
//       if (scope === "row" && row !== rowKey) return;
//       periods.forEach((period) => {
//         const periodKey = `${period.month}-${period.year}`;
//         if (scope === "col" && col !== periodKey) return;
//         const editable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//         if (!editable) return;
//         const val = updated[rowKey]?.[periodKey];
//         if ((find === "" && (!val || val === 0)) || (String(val) === find)) {
//           updated[rowKey][periodKey] = replace;
//           count++;
//         }
//       });
//     });
//     setAllPeriodAmounts(updated);
//     setFindReplace({ ...findReplace, show: false, find: "", replace: "", row: null, col: null });
//     setSuccessMessageText(`Replaced ${count} cells.`);
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 2000);
//   };

//   // Save All: POST all changed data to AddNewDirectCost
//   const handleSaveAll = async () => {
//     setLoading(true);
//     let successCount = 0;
//     let errorCount = 0;

//     for (const entry of entries) {
//       const rowKey = entry._rowKey;
//       if (!changedRows[rowKey]) continue; // Only save changed rows
//       const periodForecasts = allPeriodAmounts[rowKey] || {};
//       const totalAmount = Object.values(periodForecasts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//       const payloadForecasts = periods.map((period) => ({
//         forecastedamt: periodForecasts[`${period.month}-${period.year}`] || 0,
//         projId: initialData?.projId || "N/A",
//         plId: initialData?.plId || 0,
//         emplId: entry.id,
//         dctId: initialData?.dctId || 0,
//         month: period.monthNo,
//         year: period.year,
//         acctId: entry.accountId,
//         orgId: entry.orgId,
//         plcRate: entry.hrRate || 0,
//         hrlyRate: entry.hrRate || 0,
//         effectDt: new Date().toISOString(),
//       }));

//       const payload = {
//         dctId: initialData?.dctId || 0,
//         plId: initialData?.plId || 0,
//         acctId: entry.accountId,
//         orgId: entry.orgId || "",
//         notes: "Auto-updated from UI",
//         category: "Direct Cost",
//         amountType: entry.amountType,
//         id: entry.id,
//         isRev: entry.revenue,
//         isBrd: entry.burden,
//         plcGlc: (entry.plcGlc || "").substring(0, 20),
//         plForecasts: payloadForecasts,
//       };

//       try {
//         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//         successCount++;
//       } catch (err) {
//         errorCount++;
//       }
//     }

//     if (errorCount === 0 && successCount > 0) setSuccessMessageText(`Successfully saved ${successCount} entries!`);
//     else if (successCount > 0 && errorCount > 0) setSuccessMessageText(`Saved ${successCount} with ${errorCount} errors.`);
//     else if (errorCount > 0) setSuccessMessageText(`Failed to save ${errorCount} entries.`);
//     else setSuccessMessageText("No changes to save.");
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);

//     await fetchProjectData();
//     setLoading(false);
//   };

//   // ... rest of your render code (unchanged, as in your message) ...
//   // (You can keep your table rendering, modal, and all UI as is.)

//   // Just make sure to use handlePeriodAmountChange and handleSaveAll as above.

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + (showNewForm ? 1 : 0), 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4 gap-2">
//         <button
//           onClick={() => setShowNewForm((prev) => !prev)}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//         >
//           {showNewForm ? "Cancel" : "New"}
//         </button>
//         <button
//           onClick={() => setFindReplace({ ...findReplace, show: true })}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Find & Replace
//         </button>
//         <button
//           onClick={handleSaveAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Save All
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry, idx) => (
//                   <tr key={entry._rowKey} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">None</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.plcGlc || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(allPeriodAmounts[entry._rowKey] || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 ))}
//                 {showNewForm && (
//                   <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={e => setNewEntry({ ...newEntry, id: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="revenue"
//                         checked={newEntry.revenue}
//                         onChange={e => setNewEntry({ ...newEntry, revenue: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="burden"
//                         checked={newEntry.burden}
//                         onChange={e => setNewEntry({ ...newEntry, burden: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">None</td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="amountType"
//                         value={newEntry.amountType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, amountType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {AMOUNT_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlc"
//                         value={newEntry.plcGlc}
//                         onChange={e => setNewEntry({ ...newEntry, plcGlc: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="PLC"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="accountId"
//                         value={newEntry.accountId}
//                         onChange={e => setNewEntry({ ...newEntry, accountId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Account ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={e => setNewEntry({ ...newEntry, orgId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Org ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 )}
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => (
//                   <th
//                     key={`${period.month}-${period.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap text-xs">{period.month}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry, idx) => (
//                 <tr key={`periods-${entry._rowKey}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`${entry._rowKey}-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={allPeriodAmounts[entry._rowKey]?.[periodKey] || ""}
//                           onChange={e => isEditable && handlePeriodAmountChange(entry._rowKey, periodKey, e.target.value, entry, period)}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {showNewForm && (
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`new-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={newEntryPeriodAmounts[periodKey] || ""}
//                           onChange={e => isEditable && setNewEntryPeriodAmounts(prev => ({ ...prev, [periodKey]: e.target.value }))}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {showNewForm && (
//         <div className="flex justify-end mt-2">
//           <button
//             onClick={() => {
//               // Add new entry with unique row key
//               const rowKey = `${newEntry.id || "auto"}-new-${Date.now()}`;
//               const entryToAdd = {
//                 ...newEntry,
//                 amount: Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0),
//                 periodForecasts: newEntryPeriodAmounts,
//                 _rowKey: rowKey,
//               };
//               setEntries((prev) => [...prev, entryToAdd]);
//               setAllPeriodAmounts((prev) => ({ ...prev, [rowKey]: { ...newEntryPeriodAmounts } }));
//               setShowNewForm(false);
//               setNewEntry({
//                 id: "",
//                 revenue: false,
//                 orgId: "",
//                 amount: 0,
//                 burden: false,
//                 idType: "",
//                 amountType: "",
//                 plcGlc: "",
//                 accountId: "",
//                 hrRate: "",
//               });
//               setNewEntryPeriodAmounts({});
//             }}
//             className="bg-green-600 text-white px-4 py-1 rounded text-xs hover:bg-green-700"
//           >
//             Add Entry
//           </button>
//         </div>
//       )}

//       {/* Find & Replace Modal */}
//       {findReplace.show && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
//             <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
//             <div className="mb-3">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.find}
//                 onChange={e => setFindReplace({ ...findReplace, find: e.target.value })}
//                 placeholder="Value to find (e.g., 100 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.replace}
//                 onChange={e => setFindReplace({ ...findReplace, replace: e.target.value })}
//                 placeholder="New value (e.g., 120 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="all"
//                     checked={findReplace.scope === "all"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="row"
//                     checked={findReplace.scope === "row"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Row (Row Key)</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="col"
//                     checked={findReplace.scope === "col"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Column (Month)</span>
//                 </label>
//               </div>
//               {findReplace.scope === "row" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.row || ""}
//                   onChange={e => setFindReplace({ ...findReplace, row: e.target.value })}
//                   placeholder="Enter Row Key (see code)"
//                 />
//               )}
//               {findReplace.scope === "col" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.col || ""}
//                   onChange={e => setFindReplace({ ...findReplace, col: e.target.value })}
//                   placeholder="Enter Month-Year (e.g., Jul-2025)"
//                 />
//               )}
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFindReplace({ ...findReplace, show: false })}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFindReplace}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Replace All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectAmountsTable;


// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "plcGlc", label: "PLC" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
// ];

// const AMOUNT_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Materials", label: "Materials" },
//   { value: "Subcontractors", label: "Subcontractors" },
//   { value: "Mat & Handling", label: "Mat & Handling" },
//   { value: "Travel", label: "Travel" },
//   { value: "Consultants", label: "Consultants" },
//   { value: "Other Direct Cost", label: "Other Direct Cost" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const getUniqueKey = (entry, idx) => entry._rowKey || `${entry.id || "auto"}-${idx}`;

// const isMonthEditable = (planType, closedPeriod, monthNo, year) => {
//   if (planType !== "EAC") return true;
//   if (!closedPeriod) return true;
//   const closedDate = new Date(closedPeriod);
//   if (isNaN(closedDate)) return true;
//   const durationDate = new Date(year, monthNo - 1, 1);
//   return durationDate >= new Date(closedDate.getFullYear(), closedDate.getMonth(), 1);
// };

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: "",
//     amountType: "",
//     plcGlc: "",
//     accountId: "",
//     hrRate: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [findReplace, setFindReplace] = useState({ show: false, find: "", replace: "", scope: "all", row: null, col: null });

//   // For direct editing: keep a local state for all period values
//   const [allPeriodAmounts, setAllPeriodAmounts] = useState({}); // { rowKey: { periodKey: value } }
//   const [changedRows, setChangedRows] = useState({}); // { rowKey: true }

//   // Fetch periods
//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   // Fetch all entries for the plan
//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         const apiData = Array.isArray(response.data) ? response.data : [response.data];
//         const allEntries = [];
//         const allAmounts = {};
//         apiData.forEach((item, idx) => {
//           if (item.empl) {
//             const rowKey = `${item.empl.id || "auto"}-${idx}-${Date.now()}`;
//             const entry = {
//               id: item.empl.id || "",
//               revenue: item.empl.isRev || false,
//               orgId: item.empl.orgId || "",
//               burden: item.empl.isBrd || false,
//               idType: "", // always "None"
//               amountType: item.empl.amountType || "",
//               plcGlc: item.empl.plcGlc || "",
//               accountId: item.empl.acctId || "",
//               amount: 0,
//               rgId: item.empl.rgId || "",
//               hrRate: item.empl.hrRate || "",
//               _rowKey: rowKey,
//             };
//             const fetchedPeriodAmounts = {};
//             let totalAmount = 0;
//             if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
//               item.empl.plForecasts.forEach((forecast) => {
//                 const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//                 if (period) {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const amount = parseFloat(forecast.forecastedamt) || 0;
//                   fetchedPeriodAmounts[periodKey] = amount;
//                   totalAmount += amount;
//                 }
//               });
//             }
//             allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
//             allAmounts[rowKey] = { ...fetchedPeriodAmounts };
//           }
//         });
//         setEntries(allEntries);
//         setAllPeriodAmounts(allAmounts);
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setAllPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setAllPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setChangedRows({});
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   // Directly editable duration cells
//   const handlePeriodAmountChange = async (rowKey, periodKey, value, entry, period) => {
//     setAllPeriodAmounts((prev) => {
//       const updated = { ...prev };
//       if (!updated[rowKey]) updated[rowKey] = {};
//       updated[rowKey][periodKey] = value;
//       return updated;
//     });
//     setChangedRows((prev) => ({ ...prev, [rowKey]: true }));

//     // Call update API for this cell only
//     if (entry && entry.accountId && entry.orgId && entry.hrRate) {
//       const payload = {
//         forecastedamt: value,
//         orgId: entry.orgId,
//         accountId: entry.accountId,
//         hrRate: entry.hrRate,
//         month: period.monthNo,
//         year: period.year,
//       };
//       try {
//         await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours", payload);
//         setSuccessMessageText("Forecast updated!");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       } catch (err) {
//         setSuccessMessageText("Failed to update forecast.");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       }
//     }
//   };

//   // Find & Replace logic
//   const handleFindReplace = async () => {
//     const { find, replace, scope, row, col } = findReplace;
//     let updated = { ...allPeriodAmounts };
//     let count = 0;
//     entries.forEach((entry) => {
//       const rowKey = entry._rowKey;
//       if (scope === "row" && row !== rowKey) return;
//       periods.forEach((period) => {
//         const periodKey = `${period.month}-${period.year}`;
//         if (scope === "col" && col !== periodKey) return;
//         const editable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//         if (!editable) return;
//         const val = updated[rowKey]?.[periodKey];
//         if ((find === "" && (!val || val === 0)) || (String(val) === find)) {
//           updated[rowKey][periodKey] = replace;
//           count++;
//         }
//       });
//     });
//     setAllPeriodAmounts(updated);
//     setFindReplace({ ...findReplace, show: false, find: "", replace: "", row: null, col: null });
//     setSuccessMessageText(`Replaced ${count} cells.`);
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 2000);
//   };

//   // Save All: POST all changed data to AddNewDirectCost
//   const handleSaveAll = async () => {
//     setLoading(true);
//     let successCount = 0;
//     let errorCount = 0;

//     for (const entry of entries) {
//       const rowKey = entry._rowKey;
//       if (!changedRows[rowKey]) continue; // Only save changed rows
//       const periodForecasts = allPeriodAmounts[rowKey] || {};
//       const totalAmount = Object.values(periodForecasts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
//       const payloadForecasts = periods.map((period) => ({
//         forecastedamt: periodForecasts[`${period.month}-${period.year}`] || 0,
//         projId: initialData?.projId || "N/A",
//         plId: initialData?.plId || 0,
//         emplId: entry.id,
//         dctId: initialData?.dctId || 0,
//         month: period.monthNo,
//         year: period.year,
//         acctId: entry.accountId,
//         orgId: entry.orgId,
//         plcRate: entry.hrRate || 0,
//         hrlyRate: entry.hrRate || 0,
//         effectDt: new Date().toISOString(),
//       }));

//       const payload = {
//         dctId: initialData?.dctId || 0,
//         plId: initialData?.plId || 0,
//         acctId: entry.accountId,
//         orgId: entry.orgId || "",
//         notes: "Auto-updated from UI",
//         category: "Direct Cost",
//         amountType: entry.amountType,
//         id: entry.id,
//         isRev: entry.revenue,
//         isBrd: entry.burden,
//         plcGlc: (entry.plcGlc || "").substring(0, 20),
//         plForecasts: payloadForecasts,
//       };

//       try {
//         await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//         successCount++;
//       } catch (err) {
//         errorCount++;
//       }
//     }

//     if (errorCount === 0 && successCount > 0) setSuccessMessageText(`Successfully saved ${successCount} entries!`);
//     else if (successCount > 0 && errorCount > 0) setSuccessMessageText(`Saved ${successCount} with ${errorCount} errors.`);
//     else if (errorCount > 0) setSuccessMessageText(`Failed to save ${errorCount} entries.`);
//     else setSuccessMessageText("No changes to save.");
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);

//     await fetchProjectData();
//     setLoading(false);
//   };

//   // ... rest of your render code (unchanged, as in your message) ...
//   // (You can keep your table rendering, modal, and all UI as is.)

//   // Just make sure to use handlePeriodAmountChange and handleSaveAll as above.

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + (showNewForm ? 1 : 0), 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4 gap-2">
//         <button
//           onClick={() => setShowNewForm((prev) => !prev)}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//         >
//           {showNewForm ? "Cancel" : "New"}
//         </button>
//         <button
//           onClick={() => setFindReplace({ ...findReplace, show: true })}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Find & Replace
//         </button>
//         <button
//           onClick={handleSaveAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Save All
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }} 
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry, idx) => (
//                   <tr key={entry._rowKey} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">None</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.plcGlc || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(allPeriodAmounts[entry._rowKey] || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 ))}
//                 {showNewForm && (
//                   <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={e => setNewEntry({ ...newEntry, id: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="revenue"
//                         checked={newEntry.revenue}
//                         onChange={e => setNewEntry({ ...newEntry, revenue: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="burden"
//                         checked={newEntry.burden}
//                         onChange={e => setNewEntry({ ...newEntry, burden: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">None</td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="amountType"
//                         value={newEntry.amountType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, amountType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {AMOUNT_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlc"
//                         value={newEntry.plcGlc}
//                         onChange={e => setNewEntry({ ...newEntry, plcGlc: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="PLC"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="accountId"
//                         value={newEntry.accountId}
//                         onChange={e => setNewEntry({ ...newEntry, accountId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Account ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={e => setNewEntry({ ...newEntry, orgId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Org ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 )}
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => (
//                   <th
//                     key={`${period.month}-${period.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap text-xs">{period.month}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry, idx) => (
//                 <tr key={`periods-${entry._rowKey}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`${entry._rowKey}-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={allPeriodAmounts[entry._rowKey]?.[periodKey] || ""}
//                           onChange={e => isEditable && handlePeriodAmountChange(entry._rowKey, periodKey, e.target.value, entry, period)}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {showNewForm && (
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`new-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={newEntryPeriodAmounts[periodKey] || ""}
//                           onChange={e => isEditable && setNewEntryPeriodAmounts(prev => ({ ...prev, [periodKey]: e.target.value }))}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}     
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {showNewForm && (
//         <div className="flex justify-end mt-2">
//           <button
//             onClick={() => {
//               // Add new entry with unique row key
//               const rowKey = `${newEntry.id || "auto"}-new-${Date.now()}`;
//               const entryToAdd = {
//                 ...newEntry,
//                 amount: Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0),
//                 periodForecasts: newEntryPeriodAmounts,
//                 _rowKey: rowKey,
//               };
//               setEntries((prev) => [...prev, entryToAdd]);
//               setAllPeriodAmounts((prev) => ({ ...prev, [rowKey]: { ...newEntryPeriodAmounts } }));
//               setShowNewForm(false);
//               setNewEntry({
//                 id: "",
//                 revenue: false,
//                 orgId: "",
//                 amount: 0,
//                 burden: false,
//                 idType: "",
//                 amountType: "",
//                 plcGlc: "",
//                 accountId: "",
//                 hrRate: "",
//               });
//               setNewEntryPeriodAmounts({});
//             }}
//             className="bg-green-600 text-white px-4 py-1 rounded text-xs hover:bg-green-700"
//           >
//             Add Entry
//           </button>
//         </div>
//       )}

//       {/* Find & Replace Modal */}
//       {findReplace.show && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
//             <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
//             <div className="mb-3">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.find}
//                 onChange={e => setFindReplace({ ...findReplace, find: e.target.value })}
//                 placeholder="Value to find (e.g., 100 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.replace}
//                 onChange={e => setFindReplace({ ...findReplace, replace: e.target.value })}
//                 placeholder="New value (e.g., 120 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="all"
//                     checked={findReplace.scope === "all"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="row"
//                     checked={findReplace.scope === "row"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Row (Row Key)</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="col"
//                     checked={findReplace.scope === "col"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Column (Month)</span>
//                 </label>
//               </div>
//               {findReplace.scope === "row" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.row || ""}
//                   onChange={e => setFindReplace({ ...findReplace, row: e.target.value })}
//                   placeholder="Enter Row Key (see code)"
//                 />
//               )}
//               {findReplace.scope === "col" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.col || ""}
//                   onChange={e => setFindReplace({ ...findReplace, col: e.target.value })}
//                   placeholder="Enter Month-Year (e.g., Jul-2025)"
//                 />
//               )}
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFindReplace({ ...findReplace, show: false })}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFindReplace}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Replace All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectAmountsTable;


// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "plcGlc", label: "PLC" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
// ];

// const AMOUNT_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Materials", label: "Materials" },
//   { value: "Subcontractors", label: "Subcontractors" },
//   { value: "Mat & Handling", label: "Mat & Handling" },
//   { value: "Travel", label: "Travel" },
//   { value: "Consultants", label: "Consultants" },
//   { value: "Other Direct Cost", label: "Other Direct Cost" },
// ];

// // You can fetch this from an API if available
// const ID_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const getUniqueKey = (entry, idx) => entry._rowKey || `${entry.id || "auto"}-${idx}`;

// const isMonthEditable = (planType, closedPeriod, monthNo, year) => {
//   if (planType !== "EAC") return true;
//   if (!closedPeriod) return true;
//   const closedDate = new Date(closedPeriod);
//   if (isNaN(closedDate)) return true;
//   const durationDate = new Date(year, monthNo - 1, 1);
//   return durationDate >= new Date(closedDate.getFullYear(), closedDate.getMonth(), 1);
// };

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: "",
//     amountType: "",
//     plcGlc: "",
//     accountId: "",
//     hrRate: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [findReplace, setFindReplace] = useState({ show: false, find: "", replace: "", scope: "all", row: null, col: null });

//   // For direct editing: keep a local state for all period values
//   const [allPeriodAmounts, setAllPeriodAmounts] = useState({}); // { rowKey: { periodKey: value } }
//   const [changedRows, setChangedRows] = useState({}); // { rowKey: true }

//   // Fetch periods
//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   // Fetch all entries for the plan
//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         const apiData = Array.isArray(response.data) ? response.data : [response.data];
//         const allEntries = [];
//         const allAmounts = {};
//         apiData.forEach((item, idx) => {
//           if (item.empl) {
//             const rowKey = `${item.empl.id || "auto"}-${idx}-${item.empl.idType || "none"}`;
//             const entry = {
//               id: item.empl.id || "",
//               revenue: item.empl.isRev || false,
//               orgId: item.empl.orgId || "",
//               burden: item.empl.isBrd || false,
//               idType: item.empl.idType || "", // Use idType from API, fallback to ""
//               amountType: item.empl.amountType || "",
//               plcGlc: item.empl.plcGlc || "",
//               accountId: item.empl.acctId || "",
//               amount: 0,
//               rgId: item.empl.rgId || "",
//               hrRate: item.empl.hrRate || "",
//               _rowKey: rowKey,
//             };
//             const fetchedPeriodAmounts = {};
//             let totalAmount = 0;
//             if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
//               item.empl.plForecasts.forEach((forecast) => {
//                 const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//                 if (period) {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const amount = parseFloat(forecast.forecastedamt) || 0;
//                   fetchedPeriodAmounts[periodKey] = amount;
//                   totalAmount += amount;
//                 }
//               });
//             }
//             allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
//             allAmounts[rowKey] = { ...fetchedPeriodAmounts };
//           }
//         });
//         setEntries(allEntries);
//         setAllPeriodAmounts(allAmounts);
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setAllPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setAllPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setChangedRows({});
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   // Directly editable duration cells
//   const handlePeriodAmountChange = async (rowKey, periodKey, value, entry, period) => {
//     setAllPeriodAmounts((prev) => {
//       const updated = { ...prev };
//       if (!updated[rowKey]) updated[rowKey] = {};
//       updated[rowKey][periodKey] = value;
//       return updated;
//     });
//     setChangedRows((prev) => ({ ...prev, [rowKey]: true }));

//     // Call update API for this cell only
//     if (entry && entry.accountId && entry.orgId && entry.hrRate) {
//       const payload = {
//         forecastedamt: value,
//         orgId: entry.orgId,
//         accountId: entry.accountId,
//         hrRate: entry.hrRate,
//         month: period.monthNo,
//         year: period.year,
//       };
//       try {
//         await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount", payload);
//         setSuccessMessageText("Forecast updated!");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       } catch (err) {
//         setSuccessMessageText("Failed to update forecast.");
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//       }
//     }
//   };

//   // Find & Replace logic
//   const handleFindReplace = async () => {
//     const { find, replace, scope, row, col } = findReplace;
//     let updated = { ...allPeriodAmounts };
//     let count = 0;
//     entries.forEach((entry) => {
//       const rowKey = entry._rowKey;
//       if (scope === "row" && row !== rowKey) return;
//       periods.forEach((period) => {
//         const periodKey = `${period.month}-${period.year}`;
//         if (scope === "col" && col !== periodKey) return;
//         const editable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//         if (!editable) return;
//         const val = updated[rowKey]?.[periodKey];
//         if ((find === "" && (!val || val === 0)) || (String(val) === find)) {
//           updated[rowKey][periodKey] = replace;
//           count++;
//         }
//       });
//     });
//     setAllPeriodAmounts(updated);
//     setFindReplace({ ...findReplace, show: false, find: "", replace: "", row: null, col: null });
//     setSuccessMessageText(`Replaced ${count} cells.`);
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 2000);
//   };

//   // Save New Entry
//   const handleSaveNewEntry = async () => {
//     if (!initialData?.plId) return;
//     setLoading(true);

//     // Prepare period forecasts
//     const payloadForecasts = periods.map((period) => ({
//       forecastedamt: newEntryPeriodAmounts[`${period.month}-${period.year}`] || 0,
//       projId: initialData?.projId || "N/A",
//       plId: initialData?.plId || 0,
//       emplId: newEntry.id,
//       dctId: initialData?.dctId || 0,
//       month: period.monthNo,
//       year: period.year,
//       acctId: newEntry.accountId, 
//       orgId: newEntry.orgId,
//       plcRate: newEntry.hrRate || 0,
//       hrlyRate: newEntry.hrRate || 0,
//       effectDt: new Date().toISOString(),   
//     }));

//     const payload = {
//       dctId: initialData?.dctId || 0,
//       plId: initialData?.plId || 0,
//       acctId: newEntry.accountId,
//       orgId: newEntry.orgId || "",
//       notes: "Auto-updated from UI",
//       category: "Direct Cost",
//       amountType: newEntry.amountType,
//       id: newEntry.id,
//       idType: newEntry.idType || "", // Pass idType
//       isRev: newEntry.revenue,
//       isBrd: newEntry.burden,
//       // plcGlc: (newEntry.plcGlc || "").substring(0, 20),
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         revenue: false,
//         orgId: "",
//         amount: 0,
//         burden: false,
//         idType: "",
//         amountType: "",
//         plcGlc: "",
//         accountId: "",
//         hrRate: "",
//       });
//       setNewEntryPeriodAmounts({});
//       await fetchProjectData();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//     } finally {
//       setLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + (showNewForm ? 1 : 0), 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4 gap-2">
//         <button
//           onClick={() => setShowNewForm((prev) => !prev)}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//         >
//           {showNewForm ? "Cancel" : "New"}
//         </button>
//         <button
//           onClick={() => setFindReplace({ ...findReplace, show: true })}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Find & Replace
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }} 
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry, idx) => (
//                   <tr key={entry._rowKey} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.plcGlc || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(allPeriodAmounts[entry._rowKey] || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 ))}
//                 {showNewForm && (
//                   <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={e => setNewEntry({ ...newEntry, id: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="revenue"
//                         checked={newEntry.revenue}
//                         onChange={e => setNewEntry({ ...newEntry, revenue: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="burden"
//                         checked={newEntry.burden}
//                         onChange={e => setNewEntry({ ...newEntry, burden: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="idType"
//                         value={newEntry.idType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, idType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {ID_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="amountType"
//                         value={newEntry.amountType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, amountType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {AMOUNT_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlc"
//                         value={newEntry.plcGlc}
//                         onChange={e => setNewEntry({ ...newEntry, plcGlc: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="PLC"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="accountId"
//                         value={newEntry.accountId}
//                         onChange={e => setNewEntry({ ...newEntry, accountId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Account ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={e => setNewEntry({ ...newEntry, orgId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Org ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 )}
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => (
//                   <th
//                     key={`${period.month}-${period.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap text-xs">{period.month}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry, idx) => (
//                 <tr key={`periods-${entry._rowKey}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`${entry._rowKey}-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={allPeriodAmounts[entry._rowKey]?.[periodKey] || ""}
//                           onChange={e => isEditable && handlePeriodAmountChange(entry._rowKey, periodKey, e.target.value, entry, period)}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {showNewForm && (
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year);
//                     return (
//                       <td key={`new-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={newEntryPeriodAmounts[periodKey] || ""}
//                           onChange={e => isEditable && setNewEntryPeriodAmounts(prev => ({ ...prev, [periodKey]: e.target.value }))}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}     
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {showNewForm && (
//         <div className="flex justify-end mt-2">
//           <button
//             onClick={handleSaveNewEntry}
//             className="bg-green-600 text-white px-4 py-1 rounded text-xs hover:bg-green-700"
//           >
//             Save Entry
//           </button>
//         </div>
//       )}

//       {/* Find & Replace Modal */}
//       {findReplace.show && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
//             <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
//             <div className="mb-3">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.find}
//                 onChange={e => setFindReplace({ ...findReplace, find: e.target.value })}
//                 placeholder="Value to find (e.g., 100 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.replace}
//                 onChange={e => setFindReplace({ ...findReplace, replace: e.target.value })}
//                 placeholder="New value (e.g., 120 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="all"
//                     checked={findReplace.scope === "all"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="row"
//                     checked={findReplace.scope === "row"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Row (Row Key)</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="col"
//                     checked={findReplace.scope === "col"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">Column (Month)</span>
//                 </label>
//               </div>
//               {findReplace.scope === "row" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.row || ""}
//                   onChange={e => setFindReplace({ ...findReplace, row: e.target.value })}
//                   placeholder="Enter Row Key (see code)"
//                 />
//               )}
//               {findReplace.scope === "col" && (
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs mt-2"
//                   value={findReplace.col || ""}
//                   onChange={e => setFindReplace({ ...findReplace, col: e.target.value })}
//                   placeholder="Enter Month-Year (e.g., Jul-2025)"
//                 />
//               )}
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFindReplace({ ...findReplace, show: false })}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFindReplace}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Replace All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectAmountsTable;

// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import axios from "axios";

// const ENTRY_COLUMNS = [
//   { key: "id", label: "ID" },
//   { key: "revenue", label: "Rev" },
//   { key: "burden", label: "Burd" },
//   { key: "idType", label: "ID Type" },
//   { key: "amountType", label: "Amount Type" },
//   { key: "plcGlc", label: "PLC" },
//   { key: "accountId", label: "Account ID" },
//   { key: "orgId", label: "Org ID" },
//   { key: "amount", label: "Total Amount" },
// ];

// const AMOUNT_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Materials", label: "Materials" },
//   { value: "Subcontractors", label: "Subcontractors" },
//   { value: "Mat & Handling", label: "Mat & Handling" },
//   { value: "Travel", label: "Travel" },
//   { value: "Consultants", label: "Consultants" },
//   { value: "Other Direct Cost", label: "Other Direct Cost" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// const isMonthEditable = (planType, closedPeriod, monthNo, year, planStatus) => {
//   if (planStatus !== "Working") return false;
//   if (planType !== "EAC") return true;
//   if (!closedPeriod) return true;
//   const closedDate = new Date(closedPeriod);
//   if (isNaN(closedDate)) return true;
//   const durationDate = new Date(year, monthNo - 1, 1);
//   return durationDate >= new Date(closedDate.getFullYear(), closedDate.getMonth(), 1);
// };

// const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
//   const [periods, setPeriods] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     revenue: false,
//     orgId: "",
//     amount: 0,
//     burden: false,
//     idType: "",
//     amountType: "",
//     plcGlc: "",
//     accountId: "",
//     hrRate: "",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [findReplace, setFindReplace] = useState({ show: false, find: "", replace: "", scope: "all", row: null, col: null });

//   const [allPeriodAmounts, setAllPeriodAmounts] = useState({});
//   const [changedRows, setChangedRows] = useState({});
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);

//   const planStatus = initialData?.status || "";

//   useEffect(() => {
//     const fetchPeriods = async () => {
//       if (!startDate || !endDate) {
//         setPeriods([]);
//         return;
//       }
//       try {
//         const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
//         const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
//         );
//         if (Array.isArray(response.data)) {
//           const formattedPeriods = response.data.map((p) => ({
//             month: p.month,
//             monthNo: p.monthNo,
//             year: p.year,
//             workingHours: p.workingHours,
//           }));
//           setPeriods(formattedPeriods);
//         } else {
//           setPeriods([]);
//         }
//       } catch (err) {
//         setError("Failed to load periods.");
//         setPeriods([]);
//       }
//     };
//     fetchPeriods();
//   }, [startDate, endDate]);

//   const fetchProjectData = useCallback(async () => {
//     if (initialData?.plId && periods.length > 0) {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
//         );
//         const apiData = Array.isArray(response.data) ? response.data : [response.data];
//         const allEntries = [];
//         const allAmounts = {};
//         apiData.forEach((item, idx) => {
//           if (item.empl) {
//             const rowKey = `${item.empl.id || "auto"}-${idx}-${item.empl.idType || "none"}`;
//             const entry = {
//               id: item.empl.id || "",
//               revenue: item.empl.isRev || false,
//               orgId: item.empl.orgId || "",
//               burden: item.empl.isBrd || false,
//               idType: item.empl.idType || "",
//               amountType: item.empl.amountType || "",
//               plcGlc: item.empl.plcGlc || "",
//               accountId: item.empl.acctId || "",
//               amount: 0,
//               rgId: item.empl.rgId || "",
//               hrRate: item.empl.hrRate || "",
//               dctId: item.empl.dctId || 0,
//               plId: item.empl.plId || initialData?.plId || 0,
//               projId: item.empl.projId || initialData?.projId || "",
//               _rowKey: rowKey,
//               plForecasts: item.empl.plForecasts || [],
//             };
//             const fetchedPeriodAmounts = {};
//             let totalAmount = 0;
//             if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
//               item.empl.plForecasts.forEach((forecast) => {
//                 const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
//                 if (period) {
//                   const periodKey = `${period.month}-${period.year}`;
//                   const amount = parseFloat(forecast.forecastedamt) || 0;
//                   fetchedPeriodAmounts[periodKey] = amount;
//                   totalAmount += amount;
//                 }
//               });
//             }
//             allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
//             allAmounts[rowKey] = { ...fetchedPeriodAmounts };
//           }
//         });
//         setEntries(allEntries);
//         setAllPeriodAmounts(allAmounts);
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } catch (err) {
//         setError("Failed to load project data for amounts.");
//         setEntries([]);
//         setAllPeriodAmounts({});
//         setNewEntryPeriodAmounts({});
//         setChangedRows({});
//       } finally {
//         setLoading(false);
//       }
//     } else if (!initialData?.plId) {
//       setEntries([]);
//       setAllPeriodAmounts({});
//       setNewEntryPeriodAmounts({});
//       setChangedRows({});
//       setLoading(false);
//     }
//   }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

//   useEffect(() => {
//     fetchProjectData();
//   }, [fetchProjectData]);

//   const handlePeriodAmountChange = (rowKey, periodKey, value, entry, period) => {
//     setAllPeriodAmounts((prev) => {
//       const updated = { ...prev };
//       if (!updated[rowKey]) updated[rowKey] = {};
//       updated[rowKey][periodKey] = value;
//       return updated;
//     });
//     setChangedRows((prev) => ({ ...prev, [rowKey]: true }));
//   };

//   const handlePeriodAmountBlurOrEnter = async (rowKey, periodKey, entry, period) => {
//     const value = allPeriodAmounts[rowKey]?.[periodKey] || 0;
//     let forecastid = 0;
//     if (entry.plForecasts && Array.isArray(entry.plForecasts)) {
//       const found = entry.plForecasts.find(
//         (f) => f.month === period.monthNo && f.year === period.year
//       );
//       if (found && found.forecastid) forecastid = found.forecastid;
//     }
//     const payload = {
//       forecastedamt: parseFloat(value) || 0,
//       forecastid,
//       projId: entry.projId || initialData?.projId || "",
//       plId: entry.plId || initialData?.plId || 0,
//       emplId: entry.id,
//       dctId: entry.dctId || initialData?.dctId || 0,
//       month: period.monthNo,
//       year: period.year,
//       totalBurdenCost: 0,
//       burden: 0,
//       ccffRevenue: 0,
//       tnmRevenue: 0,
//       cost: 0,
//       fringe: 0,
//       overhead: 0,
//       gna: 0,
//       forecastedhours: 0,
//       createdat: new Date().toISOString(),
//       updatedat: new Date().toISOString(),
//       displayText: "",
//       acctId: entry.accountId,
//       orgId: entry.orgId,
//       plc: entry.plcGlc || "",
//       plcRateId: 0,
//       hrlyRate: entry.hrRate || 0,
//       effectDt: new Date().toISOString(),
//     };
//     try {
//       await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount", payload);
//       setSuccessMessageText("Forecast updated!");
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//       await fetchProjectData();
//     } catch (err) {
//       setSuccessMessageText("Failed to update forecast.");
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   // Find & Replace logic (all/row/column, only editable cells, only changed cells call API)
//   const handleFindReplace = async () => {
//     if (!findReplace.find) return;
//     let updates = [];
//     let updatedInputValues = { ...allPeriodAmounts };
//     let replacementsCount = 0;

//     entries.forEach((entry, rowIdx) => {
//       const rowKey = entry._rowKey;
//       if (findReplace.scope === "row" && findReplace.row !== rowKey) return;

//       periods.forEach((period) => {
//         const periodKey = `${period.month}-${period.year}`;
//         if (findReplace.scope === "col" && findReplace.col !== periodKey) return;

//         const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year, planStatus);
//         if (!isEditable) return;

//         const currentValue = updatedInputValues[rowKey]?.[periodKey] !== undefined
//           ? String(updatedInputValues[rowKey][periodKey])
//           : String(entry.periodForecasts?.[periodKey] ?? "");

//         let isMatch = false;
//         const findValueNormalized = findReplace.find.trim();
//         const currentValueNormalized = currentValue.trim();

//         if (findValueNormalized === "") {
//           isMatch = (currentValueNormalized === "" || currentValueNormalized === "0");
//         } else {
//           isMatch = (currentValueNormalized === findValueNormalized);
//         }

//         if (isMatch) {
//           const newNumericValue = findReplace.replace === "" ? 0 : Number(findReplace.replace);
//           if (!isNaN(newNumericValue) || findReplace.replace === "") {
//             // Only update if the new value is numerically different from the original forecast
//             const forecast = entry.plForecasts && Array.isArray(entry.plForecasts)
//               ? entry.plForecasts.find(f => f.month === period.monthNo && f.year === period.year)
//               : null;
//             const originalForecastedAmt = forecast?.forecastedamt ?? 0;

//             if (forecast && forecast.forecastid && newNumericValue !== originalForecastedAmt) {
//               updatedInputValues[rowKey] = { ...updatedInputValues[rowKey], [periodKey]: newNumericValue };
//               replacementsCount++;

//               const payload = {
//                 forecastedamt: newNumericValue,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId ?? "",
//                 plId: forecast.plId ?? 0,
//                 emplId: forecast.emplId ?? "",
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month ?? 0,
//                 year: forecast.year ?? 0,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 forecastedhours: forecast.forecastedhours ?? 0,
//                 createdat: forecast.createdat ?? new Date(0).toISOString(),
//                 updatedat: new Date().toISOString(),
//                 displayText: forecast.displayText ?? "",
//                 acctId: entry.accountId,
//                 orgId: entry.orgId,
//                 plc: entry.plcGlc || "",
//                 plcRateId: 0,
//                 hrlyRate: entry.hrRate || 0,
//                 effectDt: new Date().toISOString(),
//               };

//               updates.push(axios.put(
//                 "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount",
//                 payload
//               ));
//             }
//           }
//         }
//       });
//     });

//     setAllPeriodAmounts(updatedInputValues);

//     try {
//       await Promise.all(updates);
//       setSuccessMessageText(`Replaced ${replacementsCount} cells.`);
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//       await fetchProjectData();
//     } catch (err) {
//       setSuccessMessageText("Failed to replace some values.");
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     } finally {
//       setFindReplace({ show: false, find: "", replace: "", scope: "all", row: null, col: null });
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//     }
//   };

//   // Save New Entry
//   const handleSaveNewEntry = async () => {
//     if (!initialData?.plId) return;
//     setLoading(true);

//     const payloadForecasts = periods.map((period) => ({
//       forecastedamt: newEntryPeriodAmounts[`${period.month}-${period.year}`] || 0,
//       projId: initialData?.projId || "N/A",
//       plId: initialData?.plId || 0,
//       emplId: newEntry.id,
//       dctId: initialData?.dctId || 0,
//       month: period.monthNo,
//       year: period.year,
//       acctId: newEntry.accountId,
//       orgId: newEntry.orgId,
//       plcRate: newEntry.hrRate || 0,
//       hrlyRate: newEntry.hrRate || 0,
//       effectDt: new Date().toISOString(),
//     }));

//     const payload = {
//       dctId: initialData?.dctId || 0,
//       plId: initialData?.plId || 0,
//       acctId: newEntry.accountId,
//       orgId: newEntry.orgId || "",
//       notes: "Auto-updated from UI",
//       category: "Direct Cost",
//       amountType: newEntry.amountType,
//       id: newEntry.id,
//       idType: newEntry.idType || "",
//       isRev: newEntry.revenue,
//       isBrd: newEntry.burden,
//       plcGlc: (newEntry.plcGlc || "").substring(0, 20),
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         revenue: false,
//         orgId: "",
//         amount: 0,
//         burden: false,
//         idType: "",
//         amountType: "",
//         plcGlc: "",
//         accountId: "",
//         hrRate: "",
//       });
//       setNewEntryPeriodAmounts({});
//       await fetchProjectData();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//     } finally {
//       setLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32 p-4 font-inter">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!initialData?.plId) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">Please select a plan to view amounts data.</span>
//         </div>
//       </div>
//     );
//   }

//   const rowCount = Math.max(entries.length + (showNewForm ? 1 : 0), 2);

//   return (
//     <div className="relative p-4 font-inter">
//       {showSuccessMessage && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
//           {successMessageText}
//         </div>
//       )}

//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
//       <div className="w-full flex justify-end mb-4 gap-2">
//         <button
//           onClick={() => setShowNewForm((prev) => !prev)}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//         >
//           {showNewForm ? "Cancel" : "New"}
//         </button>
//         <button
//           onClick={() => setFindReplace({ ...findReplace, show: true })}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
//         >
//           Find & Replace
//         </button>
//       </div>

//       <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
//         {/* Left Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {ENTRY_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }} 
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <Fragment>
//                 {entries.map((entry, idx) => (
//                   <tr key={entry._rowKey} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.plcGlc || "None"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(allPeriodAmounts[entry._rowKey] || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 ))}
//                 {showNewForm && (
//                   <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={e => setNewEntry({ ...newEntry, id: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="revenue"
//                         checked={newEntry.revenue}
//                         onChange={e => setNewEntry({ ...newEntry, revenue: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="burden"
//                         checked={newEntry.burden}
//                         onChange={e => setNewEntry({ ...newEntry, burden: e.target.checked })}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="idType"
//                         value={newEntry.idType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, idType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {ID_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <select
//                         name="amountType"
//                         value={newEntry.amountType || ""}
//                         onChange={e => setNewEntry({ ...newEntry, amountType: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {AMOUNT_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlc"
//                         value={newEntry.plcGlc}
//                         onChange={e => setNewEntry({ ...newEntry, plcGlc: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="PLC"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="accountId"
//                         value={newEntry.accountId}
//                         onChange={e => setNewEntry({ ...newEntry, accountId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Account ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={e => setNewEntry({ ...newEntry, orgId: e.target.value })}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Org ID"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
//                   </tr>
//                 )}
//               </Fragment>
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Periods/Duration) */}
//         <div className="w-1/2 overflow-x-auto flex flex-col">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {periods.map((period) => {
//                   const periodKey = `${period.month}-${period.year}`;
//                   return (
//                     <th
//                       key={periodKey}
//                       className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal
//                         ${selectedColumnKey === periodKey ? 'bg-yellow-100' : ''}
//                       `}
//                       style={{ boxSizing: "border-box", lineHeight: "normal", cursor: "pointer" }}
//                       onClick={() => setSelectedColumnKey(periodKey)}
//                     >
//                       <div className="flex flex-col items-center justify-center h-full">
//                         <span className="whitespace-nowrap text-xs">{period.month}</span>
//                       </div>
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
//             <tbody>
//               {entries.map((entry, idx) => (
//                 <tr key={`periods-${entry._rowKey}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year, planStatus);
//                     return (
//                       <td key={`${entry._rowKey}-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={allPeriodAmounts[entry._rowKey]?.[periodKey] || ""}
//                           onChange={e => isEditable && handlePeriodAmountChange(entry._rowKey, periodKey, e.target.value, entry, period)}
//                           onBlur={() => isEditable && handlePeriodAmountBlurOrEnter(entry._rowKey, periodKey, entry, period)}
//                           onKeyDown={e => {
//                             if (
//                               isEditable &&
//                               (e.key === "Enter" || e.key === "Tab")
//                             ) {
//                               handlePeriodAmountBlurOrEnter(entry._rowKey, periodKey, entry, period);
//                             }
//                           }}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {showNewForm && (
//                 <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                   {periods.map((period, pidx) => {
//                     const periodKey = `${period.month}-${period.year}`;
//                     const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year, planStatus);
//                     return (
//                       <td key={`new-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
//                         <input
//                           type="text"
//                           value={newEntryPeriodAmounts[periodKey] || ""}
//                           onChange={e => isEditable && setNewEntryPeriodAmounts(prev => ({ ...prev, [periodKey]: e.target.value }))}
//                           className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
//                           style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
//                           disabled={!isEditable}
//                           placeholder={!isEditable ? "Closed" : ""}     
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {showNewForm && (
//         <div className="flex justify-end mt-2">
//           <button
//             onClick={handleSaveNewEntry}
//             className="bg-green-600 text-white px-4 py-1 rounded text-xs hover:bg-green-700"
//           >
//             Save Entry
//           </button>
//         </div>
//       )}

//       {/* Find & Replace Modal */}
//       {findReplace.show && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
//             <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
//             <div className="mb-3">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.find}
//                 onChange={e => setFindReplace({ ...findReplace, find: e.target.value })}
//                 placeholder="Value to find (e.g., 100 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findReplace.replace}
//                 onChange={e => setFindReplace({ ...findReplace, replace: e.target.value })}
//                 placeholder="New value (e.g., 120 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="all"
//                     checked={findReplace.scope === "all"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value })}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="row"
//                     checked={findReplace.scope === "row"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value, row: entries[selectedRowIndex]?._rowKey || null })}
//                   />
//                   <span className="ml-2">Selected Row</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="col"
//                     checked={findReplace.scope === "col"}
//                     onChange={e => setFindReplace({ ...findReplace, scope: e.target.value, col: selectedColumnKey })}
//                   />
//                   <span className="ml-2">Selected Column</span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFindReplace({ show: false, find: "", replace: "", scope: "all", row: null, col: null })}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFindReplace}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Replace All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectAmountsTable;

import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";

const ENTRY_COLUMNS = [
  { key: "id", label: "ID" },
  { key: "revenue", label: "Rev" },
  { key: "burden", label: "Burd" },
  { key: "idType", label: "ID Type" },
  { key: "amountType", label: "Amount Type" },
  { key: "plcGlc", label: "PLC" },
  { key: "accountId", label: "Account ID" },
  { key: "orgId", label: "Org ID" },
  { key: "amount", label: "Total Amount" },
];

const AMOUNT_TYPE_OPTIONS = [
  { value: "", label: "None" },
  { value: "Materials", label: "Materials" },
  { value: "Subcontractors", label: "Subcontractors" },
  { value: "Mat & Handling", label: "Mat & Handling" },
  { value: "Travel", label: "Travel" },
  { value: "Consultants", label: "Consultants" },
  { value: "Other Direct Cost", label: "Other Direct Cost" },
];

const ID_TYPE_OPTIONS = [
  { value: "", label: "None" },
  { value: "Employee", label: "Employee" },
  { value: "Vendor", label: "Vendor" },
  { value: "Other", label: "Other" },
];

const ROW_HEIGHT_DEFAULT = 64;

const isMonthEditable = (planType, closedPeriod, monthNo, year, planStatus) => {
  if (planStatus !== "Working") return false;
  if (planType !== "EAC") return true;
  if (!closedPeriod) return true;
  const closedDate = new Date(closedPeriod);
  if (isNaN(closedDate)) return true;
  const durationDate = new Date(year, monthNo - 1, 1);
  return durationDate >= new Date(closedDate.getFullYear(), closedDate.getMonth(), 1);
};

const ProjectAmountsTable = ({ initialData, startDate, endDate, planType }) => {
  const [periods, setPeriods] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showNewForm, setShowNewForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    id: "",
    revenue: false,
    orgId: "",
    amount: 0,
    burden: false,
    idType: "",
    amountType: "",
    plcGlc: "",
    accountId: "",
    hrRate: "",
  });
  const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [findReplace, setFindReplace] = useState({ show: false, find: "", replace: "", scope: "all", row: null, col: null });

  const [allPeriodAmounts, setAllPeriodAmounts] = useState({});
  const [changedRows, setChangedRows] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedColumnKey, setSelectedColumnKey] = useState(null);

  const planStatus = initialData?.status || "";

  useEffect(() => {
    const fetchPeriods = async () => {
      if (!startDate || !endDate) {
        setPeriods([]);
        return;
      }
      try {
        const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
        const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${formattedStartDate}/${formattedEndDate}`
        );
        if (Array.isArray(response.data)) {
          const formattedPeriods = response.data.map((p) => ({
            month: p.month,
            monthNo: p.monthNo,
            year: p.year,
            workingHours: p.workingHours,
          }));
          setPeriods(formattedPeriods);
        } else {
          setPeriods([]);
        }
      } catch (err) {
        setError("Failed to load periods.");
        setPeriods([]);
      }
    };
    fetchPeriods();
  }, [startDate, endDate]);

  const fetchProjectData = useCallback(async () => {
    if (initialData?.plId && periods.length > 0) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${initialData.plId}`
        );
        const apiData = Array.isArray(response.data) ? response.data : [response.data];
        const allEntries = [];
        const allAmounts = {};
        apiData.forEach((item, idx) => {
          if (item.empl) {
            const rowKey = `${item.empl.id || "auto"}-${idx}-${item.empl.idType || "none"}`;
            const entry = {
              id: item.empl.id || "",
              revenue: item.empl.isRev || false,
              orgId: item.empl.orgId || "",
              burden: item.empl.isBrd || false,
              idType: item.empl.idType || "",
              amountType: item.empl.amountType || "",
              plcGlc: item.empl.plcGlc || "",
              accountId: item.empl.acctId || "",
              amount: 0,
              rgId: item.empl.rgId || "",
              hrRate: item.empl.hrRate || "",
              dctId: item.empl.dctId || 0,
              plId: item.empl.plId || initialData?.plId || 0,
              projId: item.empl.projId || initialData?.projId || "",
              _rowKey: rowKey,
              plForecasts: item.empl.plForecasts || [],
            };
            const fetchedPeriodAmounts = {};
            let totalAmount = 0;
            if (item.empl.plForecasts && Array.isArray(item.empl.plForecasts)) {
              item.empl.plForecasts.forEach((forecast) => {
                const period = periods.find((p) => p.monthNo === forecast.month && p.year === forecast.year);
                if (period) {
                  const periodKey = `${period.month}-${period.year}`;
                  const amount = parseFloat(forecast.forecastedamt) || 0;
                  fetchedPeriodAmounts[periodKey] = amount;
                  totalAmount += amount;
                }
              });
            }
            allEntries.push({ ...entry, amount: totalAmount, periodForecasts: fetchedPeriodAmounts });
            allAmounts[rowKey] = { ...fetchedPeriodAmounts };
          }
        });
        setEntries(allEntries);
        setAllPeriodAmounts(allAmounts);
        setNewEntryPeriodAmounts({});
        setChangedRows({});
      } catch (err) {
        setError("Failed to load project data for amounts.");
        setEntries([]);
        setAllPeriodAmounts({});
        setNewEntryPeriodAmounts({});
        setChangedRows({});
      } finally {
        setLoading(false);
      }
    } else if (!initialData?.plId) {
      setEntries([]);
      setAllPeriodAmounts({});
      setNewEntryPeriodAmounts({});
      setChangedRows({});
      setLoading(false);
    }
  }, [initialData?.plId, periods, planType, initialData?.closedPeriod]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  // Row/column selection for Find & Replace
  const handleRowClick = (idx) => {
    setSelectedRowIndex(idx === selectedRowIndex ? null : idx);
    setFindReplace((prev) => ({
      ...prev,
      scope: idx === selectedRowIndex ? "all" : "row",
      row: idx === selectedRowIndex ? null : entries[idx]?._rowKey,
    }));
  };
  const handleColumnHeaderClick = (periodKey) => {
    setSelectedColumnKey(periodKey === selectedColumnKey ? null : periodKey);
    setFindReplace((prev) => ({
      ...prev,
      scope: periodKey === selectedColumnKey ? "all" : "col",
      col: periodKey === selectedColumnKey ? null : periodKey,
    }));
  };

  const handlePeriodAmountChange = (rowKey, periodKey, value, entry, period) => {
  setAllPeriodAmounts(prev => ({
    ...prev,
    [rowKey]: {
      ...prev[rowKey],
      [periodKey]: value
    }
  }));
};

  // Only call update API if value actually changed
  const handlePeriodAmountBlurOrEnter = async (rowKey, periodKey, entry, period) => {
    const value = allPeriodAmounts[rowKey]?.[periodKey] || "";
    const forecast = entry.plForecasts && Array.isArray(entry.plForecasts)
      ? entry.plForecasts.find(f => f.month === period.monthNo && f.year === period.year)
      : null;
    const originalForecastedAmt = forecast?.forecastedamt ?? 0;
    const newNumericValue = value === "" ? 0 : Number(value);

    if (newNumericValue === originalForecastedAmt) return; // Only call API if changed

    let forecastid = forecast?.forecastid || 0;
    const payload = {
      forecastedamt: newNumericValue,
      forecastid,
      projId: entry.projId || initialData?.projId || "",
      plId: entry.plId || initialData?.plId || 0,
      emplId: entry.id,
      dctId: entry.dctId || initialData?.dctId || 0,
      month: period.monthNo,
      year: period.year,
      totalBurdenCost: 0,
      burden: 0,
      ccffRevenue: 0,
      tnmRevenue: 0,
      cost: 0,
      fringe: 0,
      overhead: 0,
      gna: 0,
      forecastedhours: 0,
      createdat: new Date().toISOString(),
      updatedat: new Date().toISOString(),
      displayText: "",
      acctId: entry.accountId,
      orgId: entry.orgId,
      plc: entry.plcGlc || "",
      plcRateId: 0,
      hrlyRate: entry.hrRate || 0,
      effectDt: new Date().toISOString(),
    };
    try {
      await axios.put("https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount", payload);
      setSuccessMessageText("Forecast updated!");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
      await fetchProjectData();
    } catch (err) {
      setSuccessMessageText("Failed to update forecast.");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  // Find & Replace logic (all/row/column, only editable cells, only changed cells call API)
  const handleFindReplace = async () => {
    if (!findReplace.find) return;
    let updates = [];
    let updatedInputValues = { ...allPeriodAmounts };
    let replacementsCount = 0;

    entries.forEach((entry, rowIdx) => {
      const rowKey = entry._rowKey;
      if (findReplace.scope === "row" && findReplace.row !== rowKey) return;

      periods.forEach((period) => {
        const periodKey = `${period.month}-${period.year}`;
        if (findReplace.scope === "col" && findReplace.col !== periodKey) return;

        const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year, planStatus);
        if (!isEditable) return;

        const currentValue = updatedInputValues[rowKey]?.[periodKey] !== undefined
          ? String(updatedInputValues[rowKey][periodKey])
          : String(entry.periodForecasts?.[periodKey] ?? "");

        let isMatch = false;
        const findValueNormalized = findReplace.find.trim();
        const currentValueNormalized = currentValue.trim();

        if (findValueNormalized === "") {
          isMatch = (currentValueNormalized === "" || currentValueNormalized === "0");
        } else {
          isMatch = (currentValueNormalized === findValueNormalized);
        }

        if (isMatch) {
          const newNumericValue = findReplace.replace === "" ? 0 : Number(findReplace.replace);
          if (!isNaN(newNumericValue) || findReplace.replace === "") {
            const forecast = entry.plForecasts && Array.isArray(entry.plForecasts)
              ? entry.plForecasts.find(f => f.month === period.monthNo && f.year === period.year)
              : null;
            const originalForecastedAmt = forecast?.forecastedamt ?? 0;

            if (forecast && forecast.forecastid && newNumericValue !== originalForecastedAmt) {
              updatedInputValues[rowKey] = { ...updatedInputValues[rowKey], [periodKey]: newNumericValue };
              replacementsCount++;

              const payload = {
                forecastedamt: newNumericValue,
                forecastid: Number(forecast.forecastid),
                projId: forecast.projId ?? "",
                plId: forecast.plId ?? 0,
                emplId: forecast.emplId ?? "",
                dctId: forecast.dctId ?? 0,
                month: forecast.month ?? 0,
                year: forecast.year ?? 0,
                totalBurdenCost: forecast.totalBurdenCost ?? 0,
                burden: forecast.burden ?? 0,
                ccffRevenue: forecast.ccffRevenue ?? 0,
                tnmRevenue: forecast.tnmRevenue ?? 0,
                cost: forecast.cost ?? 0,
                fringe: forecast.fringe ?? 0,
                overhead: forecast.overhead ?? 0,
                gna: forecast.gna ?? 0,
                forecastedhours: forecast.forecastedhours ?? 0,
                createdat: forecast.createdat ?? new Date(0).toISOString(),
                updatedat: new Date().toISOString(),
                displayText: forecast.displayText ?? "",
                acctId: entry.accountId,
                orgId: entry.orgId,
                plc: entry.plcGlc || "",
                plcRateId: 0,
                hrlyRate: entry.hrRate || 0,
                effectDt: new Date().toISOString(),
              };

              updates.push(axios.put(
                "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount",
                payload
              ));
            }
          }
        }
      });
    });

    setAllPeriodAmounts(updatedInputValues);

    try {
      await Promise.all(updates);
      setSuccessMessageText(`Replaced ${replacementsCount} cells.`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
      await fetchProjectData();
    } catch (err) {
      setSuccessMessageText("Failed to replace some values.");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } finally {
      setFindReplace({ show: false, find: "", replace: "", scope: "all", row: null, col: null });
      setSelectedRowIndex(null);
      setSelectedColumnKey(null);
    }
  };

  // Save New Entry
  const handleSaveNewEntry = async () => {
    if (!initialData?.plId) return;
    setLoading(true);

    const payloadForecasts = periods.map((period) => ({
      forecastedamt: newEntryPeriodAmounts[`${period.month}-${period.year}`] || 0,
      projId: initialData?.projId || "N/A",
      plId: initialData?.plId || 0,
      emplId: newEntry.id,
      dctId: initialData?.dctId || 0,
      month: period.monthNo,
      year: period.year,
      acctId: newEntry.accountId,
      orgId: newEntry.orgId,
      plcRate: newEntry.hrRate || 0,
      hrlyRate: newEntry.hrRate || 0,
      effectDt: new Date().toISOString(),
    }));

    const payload = {
      dctId: initialData?.dctId || 0,
      plId: initialData?.plId || 0,
      acctId: newEntry.accountId,
      orgId: newEntry.orgId || "",
      notes: "Auto-updated from UI",
      category: "Direct Cost",
      amountType: newEntry.amountType,
      id: newEntry.id,
      idType: newEntry.idType || "",
      isRev: newEntry.revenue,
      isBrd: newEntry.burden,
      plcGlc: (newEntry.plcGlc || "").substring(0, 20),
      plForecasts: payloadForecasts,
    };

    try {
      await axios.post("https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost", payload);
      setSuccessMessageText("Entry saved successfully!");
      setShowSuccessMessage(true);
      setShowNewForm(false);
      setNewEntry({
        id: "",
        revenue: false,
        orgId: "",
        amount: 0,
        burden: false,
        idType: "",
        amountType: "",
        plcGlc: "",
        accountId: "",
        hrRate: "",
      });
      setNewEntryPeriodAmounts({});
      await fetchProjectData();
    } catch (err) {
      setSuccessMessageText("Failed to save entry.");
      setShowSuccessMessage(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32 p-4 font-inter">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600 text-sm">Loading amounts data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
          <strong className="font-bold text-xs">Error:</strong> <span className="text-xs">{error}</span>
        </div>
      </div>
    );
  }

  if (!initialData?.plId) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
          <span className="text-xs">Please select a plan to view amounts data.</span>
        </div>
      </div>
    );
  }

  const rowCount = Math.max(entries.length + (showNewForm ? 1 : 0), 2);

  return (
    <div className="relative p-4 font-inter">
      {showSuccessMessage && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white`}>
          {successMessageText}
        </div>
      )}

      <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
      <div className="w-full flex justify-end mb-4 gap-2">
        <button
          onClick={() => setShowNewForm((prev) => !prev)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
        >
          {showNewForm ? "Cancel" : "New"}
        </button>
        <button
          onClick={() => setFindReplace({ ...findReplace, show: true })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium"
        >
          Find & Replace
        </button>
      </div>

      <div className="flex w-full items-stretch" style={{ minHeight: `${ROW_HEIGHT_DEFAULT * rowCount}px` }}>
        {/* Left Table */}
        <div className="w-1/2 overflow-x-auto border-r border-gray-300 flex flex-col">
          <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg flex-1">
            <thead className="bg-blue-100 text-gray-700">
              <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                {ENTRY_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal"
                    style={{ boxSizing: "border-box", lineHeight: "normal" }} 
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Fragment>
                {entries.map((entry, idx) => (
                  <tr
                    key={entry._rowKey}
                    style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal", cursor: "pointer" }}
                    className={selectedRowIndex === idx ? "bg-yellow-100" : ""}
                    onClick={() => handleRowClick(idx)}
                  >
                    <td className="border border-gray-300 px-2 py-0.5">{entry.id}</td>
                    <td className="border border-gray-300 px-2 py-0.5 text-center">
                      <input type="checkbox" checked={entry.revenue} readOnly className="w-4 h-4" />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5 text-center">
                      <input type="checkbox" checked={entry.burden} readOnly className="w-4 h-4" />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">{entry.idType || "None"}</td>
                    <td className="border border-gray-300 px-2 py-0.5">{entry.amountType || "None"}</td>
                    <td className="border border-gray-300 px-2 py-0.5">{entry.plcGlc || "None"}</td>
                    <td className="border border-gray-300 px-2 py-0.5">{entry.accountId || "N/A"}</td>
                    <td className="border border-gray-300 px-2 py-0.5">{entry.orgId || "N/A"}</td>
                    <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(allPeriodAmounts[entry._rowKey] || {}).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
                  </tr>
                ))}
                {showNewForm && (
                  <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="id"
                        value={newEntry.id}
                        onChange={e => setNewEntry({ ...newEntry, id: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="ID"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5 text-center">
                      <input
                        type="checkbox"
                        name="revenue"
                        checked={newEntry.revenue}
                        onChange={e => setNewEntry({ ...newEntry, revenue: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5 text-center">
                      <input
                        type="checkbox"
                        name="burden"
                        checked={newEntry.burden}
                        onChange={e => setNewEntry({ ...newEntry, burden: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <select
                        name="idType"
                        value={newEntry.idType || ""}
                        onChange={e => setNewEntry({ ...newEntry, idType: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                      >
                        {ID_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <select
                        name="amountType"
                        value={newEntry.amountType || ""}
                        onChange={e => setNewEntry({ ...newEntry, amountType: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                      >
                        {AMOUNT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="plcGlc"
                        value={newEntry.plcGlc}
                        onChange={e => setNewEntry({ ...newEntry, plcGlc: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="PLC"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="accountId"
                        value={newEntry.accountId}
                        onChange={e => setNewEntry({ ...newEntry, accountId: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Account ID"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="orgId"
                        value={newEntry.orgId}
                        onChange={e => setNewEntry({ ...newEntry, orgId: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Org ID"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">{`$${Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}`}</td>
                  </tr>
                )}
              </Fragment>
            </tbody>
          </table>
        </div>

        {/* Right Table (Periods/Duration) */}
        <div className="w-1/2 overflow-x-auto flex flex-col">
          <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg flex-1">
            <thead className="bg-blue-100 text-gray-700 font-normal">
              <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                {periods.map((period) => {
                  const periodKey = `${period.month}-${period.year}`;
                  return (
                    <th
                      key={periodKey}
                      className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal
                        ${selectedColumnKey === periodKey ? 'bg-yellow-100' : ''}
                      `}
                      style={{ boxSizing: "border-box", lineHeight: "normal", cursor: "pointer" }}
                      onClick={() => handleColumnHeaderClick(periodKey)}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="whitespace-nowrap text-xs">{period.month}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={`periods-${entry._rowKey}`} style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                  {periods.map((period, pidx) => {
                    const periodKey = `${period.month}-${period.year}`;
                    const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year, planStatus);
                    return (
                      <td key={`${entry._rowKey}-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
                        <input
                          type="text"
                          value={allPeriodAmounts[entry._rowKey]?.[periodKey] || ""}
                          onChange={e => isEditable && handlePeriodAmountChange(entry._rowKey, periodKey, e.target.value, entry, period)}
                          onBlur={() => isEditable && handlePeriodAmountBlurOrEnter(entry._rowKey, periodKey, entry, period)}
                          onKeyDown={e => {
                            if (
                              isEditable &&
                              (e.key === "Enter" || e.key === "Tab")
                            ) {
                              handlePeriodAmountBlurOrEnter(entry._rowKey, periodKey, entry, period);
                            }
                          }}
                          className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
                          style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
                          disabled={!isEditable}
                          placeholder={!isEditable ? "Closed" : ""}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
              {showNewForm && (
                <tr className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                  {periods.map((period, pidx) => {
                    const periodKey = `${period.month}-${period.year}`;
                    const isEditable = isMonthEditable(planType, initialData?.closedPeriod, period.monthNo, period.year, planStatus);
                    return (
                      <td key={`new-${periodKey}`} className="py-2 px-3 border-r border-gray-200 border-b border-gray-300 text-center min-w-[100px]">
                        <input
                          type="text"
                          value={newEntryPeriodAmounts[periodKey] || ""}
                          onChange={e => isEditable && setNewEntryPeriodAmounts(prev => ({ ...prev, [periodKey]: e.target.value }))}
                          className={`text-center border border-gray-300 bg-white text-xs ${!isEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
                          style={{ width: "55px", padding: "0 2px", height: "20px", boxSizing: "border-box", lineHeight: "normal" }}
                          disabled={!isEditable}
                          placeholder={!isEditable ? "Closed" : ""}     
                        />
                      </td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showNewForm && (
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSaveNewEntry}
            className="bg-green-600 text-white px-4 py-1 rounded text-xs hover:bg-green-700"
          >
            Save Entry
          </button>
        </div>
      )}

      {/* Find & Replace Modal */}
      {findReplace.show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
            <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
                value={findReplace.find}
                onChange={e => setFindReplace({ ...findReplace, find: e.target.value })}
                placeholder="Value to find (e.g., 100 or empty)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
                value={findReplace.replace}
                onChange={e => setFindReplace({ ...findReplace, replace: e.target.value })}
                placeholder="New value (e.g., 120 or empty)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
              <div className="flex gap-4 flex-wrap">
                <label className="inline-flex items-center text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="all"
                    checked={findReplace.scope === "all"}
                    onChange={e => setFindReplace({ ...findReplace, scope: e.target.value, row: null, col: null })}
                  />
                  <span className="ml-2">All</span>
                </label>
                <label className="inline-flex items-center text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="row"
                    checked={findReplace.scope === "row"}
                    onChange={e => setFindReplace({ ...findReplace, scope: e.target.value, row: entries[selectedRowIndex]?._rowKey || null })}
                  />
                  <span className="ml-2">Selected Row</span>
                </label>
                <label className="inline-flex items-center text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="col"
                    checked={findReplace.scope === "col"}
                    onChange={e => setFindReplace({ ...findReplace, scope: e.target.value, col: selectedColumnKey })}
                  />
                  <span className="ml-2">Selected Column</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFindReplace({ show: false, find: "", replace: "", scope: "all", row: null, col: null })}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFindReplace}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
              >
                Replace All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAmountsTable;
