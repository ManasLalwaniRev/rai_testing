// import React, { useState } from "react";

// // Hardcoded Employee Columns based on the provided EMPLOYEE_COLUMNS
// const EMPLOYEE_DETAILS_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "total", label: "Total" }, // This will be an input field for manual entry
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "perHourRate", label: "Hr Rate" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
// ];

// // Hardcoded Duration Data extended to December 2025
// const DURATIONS_DATA = [
//   { month: "May", year: 2025, monthNo: 5, workingHours: 160 },
//   { month: "Jun", year: 2025, monthNo: 6, workingHours: 168 },
//   { month: "Jul", year: 2025, monthNo: 7, workingHours: 184 },
//   { month: "Aug", year: 2025, monthNo: 8, workingHours: 152 },
//   { month: "Sep", year: 2025, monthNo: 9, workingHours: 168 },
//   { month: "Oct", year: 2025, monthNo: 10, workingHours: 168 },
//   { month: "Nov", year: 2025, monthNo: 11, workingHours: 160 },
//   { month: "Dec", year: 2025, monthNo: 12, workingHours: 176 },
// ];

// const ROW_HEIGHT_PX = "64px"; // Define a consistent row height

// // Helper to create an empty row based on columns and durations
// const emptyRowFromDefinitions = (columns, durations) => {
//   const row = {};
//   columns.forEach((col) => (row[col.key] = ""));
//   row.durationHours = {}; // To store hours for each month
//   durations.forEach((d) => (row.durationHours[`${d.monthNo}_${d.year}`] = ""));
//   return row;
// };

// const ProfessionalHoursTableWithDuration = () => {
//   const [columns] = useState(EMPLOYEE_DETAILS_COLUMNS);
//   const [durations] = useState(DURATIONS_DATA);
//   const [rows, setRows] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(null); // Use index for editing
//   const [inputRow, setInputRow] = useState(
//     emptyRowFromDefinitions(EMPLOYEE_DETAILS_COLUMNS, DURATIONS_DATA)
//   );

//   const handleNew = () => {
//     setInputRow(emptyRowFromDefinitions(columns, durations));
//     setEditingRowIndex(rows.length); // Set index to a new row at the end to indicate adding
//   };

//   const handleClose = () => {
//     setInputRow(emptyRowFromDefinitions(columns, durations)); // Clear input fields
//     setEditingRowIndex(null); // Hide the editable row
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("duration-")) {
//       const key = name.replace("duration-", "");
//       setInputRow((prev) => ({
//         ...prev,
//         durationHours: { ...prev.durationHours, [key]: value },
//       }));
//     } else {
//       setInputRow((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSave = () => {
//     if (editingRowIndex !== null) {
//       setRows((prev) => {
//         const updated = [...prev];
//         updated[editingRowIndex] = inputRow;
//         return updated;
//       });
//       setEditingRowIndex(null);
//       setInputRow(emptyRowFromDefinitions(columns, durations));
//     } else {
//       setRows((prev) => [...prev, inputRow]);
//       setInputRow(emptyRowFromDefinitions(columns, durations));
//     }
//   };

//   // Helper to check if the inputRow is empty to disable save button
//   const isInputRowEmpty = () => {
//     const isEmployeeDetailsEmpty = columns.every(
//       (col) => inputRow[col.key] === ""
//     );
//     const isDurationHoursEmpty = durations.every(
//       (d) => inputRow.durationHours[`${d.monthNo}_${d.year}`] === ""
//     );
//     return isEmployeeDetailsEmpty && isDurationHoursEmpty;
//   };

//   return (
//     <div className="p-4 font-inter">
//       <h2 className="text-xs font-normal mb-3 text-gray-800">Hours</h2>

//       <div className="flex gap-2 mb-4">
//         <button
//           className="bg-blue-600 text-white px-3 py-1 rounded text-[11px] hover:bg-blue-700 transition"
//           onClick={handleNew}
//           type="button"
//           disabled={editingRowIndex !== null} // Disable "New" if already editing/adding
//         >
//           New
//         </button>
//         <button
//           className="bg-green-600 text-white px-3 py-1 rounded text-[11px] hover:bg-green-700 transition"
//           onClick={handleSave}
//           type="button"
//           disabled={editingRowIndex === null || isInputRowEmpty()}
//         >
//           Save
//         </button>
//         {editingRowIndex !== null && ( // Show Close button only when adding/editing
//           <button
//             className="bg-red-600 text-white px-3 py-1 rounded text-[11px] hover:bg-red-700 transition"
//             onClick={handleClose}
//             type="button"
//           >
//             Close
//           </button>
//         )}
//       </div>

//       <div className="flex w-full">
//         {/* Employee Details Table */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: ROW_HEIGHT_PX, lineHeight: "normal" }}>
//                 {columns.map((col) => (
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
//               {rows.length === 0 && editingRowIndex === null && (
//                 <tr style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}>
//                   <td
//                     colSpan={columns.length}
//                     className="text-center text-gray-400 py-4"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     No data available. Click "New" to add a row.
//                   </td>
//                 </tr>
//               )}
//               {rows.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
//                   style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
//                 >
//                   {columns.map((col) => (
//                     <td
//                       key={col.key}
//                       className="p-2 border-r border-gray-200 text-xs text-gray-700"
//                       style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                     >
//                       {row[col.key]}
//                     </td>
//                   ))}
//                 </tr> 
//               ))}
//               {editingRowIndex !== null && (
//                 <tr
//                   className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
//                   style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
//                 >
//                   {columns.map((col) => (
//                     <td
//                       key={col.key}
//                       className="p-2 border-r border-gray-200 text-xs text-gray-700"
//                       style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                     >
//                       <input
//                         type="text"
//                         name={col.key}
//                         value={inputRow[col.key]}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 rounded px-1 py-0.5 w-full text-[11px]"
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Duration Hours Table */}
//         <div className="w-1/2 overflow-x-auto">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
//             <thead className="bg-blue-100 text-gray-700">
//               <tr style={{ height: ROW_HEIGHT_PX, lineHeight: "normal" }}>
//                 {durations.map((d) => (
//                   <th
//                     key={`${d.monthNo}_${d.year}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap">
//                         {d.month} {d.year}
//                       </span>
//                       <span className="text-xs text-gray-600">
//                         {d.workingHours || 0} hrs
//                       </span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {rows.length === 0 && editingRowIndex === null && (
//                 <tr style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}>
//                   <td
//                     colSpan={durations.length}
//                     className="text-center text-gray-400 py-4"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {" "}
//                   </td>
//                 </tr>
//               )}
//               {rows.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
//                   style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
//                 >
//                   {durations.map((d) => {
//                     const uniqueKey = `${d.monthNo}_${d.year}`;
//                     return (
//                       <td
//                         key={uniqueKey}
//                         className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
//                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                       >
//                         <input
//                           type="text"
//                           inputMode="numeric"
//                           name={`duration-${uniqueKey}`}
//                           value={row.durationHours[uniqueKey]}
//                           readOnly
//                           className="text-center outline-none bg-transparent w-full text-[11px] text-gray-700 cursor-default"
//                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//               {editingRowIndex !== null && (
//                 <tr
//                   className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
//                   style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
//                 >
//                   {durations.map((d) => {
//                     const uniqueKey = `${d.monthNo}_${d.year}`;
//                     return (
//                       <td
//                         key={uniqueKey}
//                         className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
//                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                       >
//                         <input
//                           type="text"
//                           inputMode="numeric"
//                           name={`duration-${uniqueKey}`}
//                           value={inputRow.durationHours[uniqueKey]}
//                           onChange={handleInputChange}
//                           className="border border-gray-300 rounded px-1 py-0.5 w-full text-[11px] text-center"
//                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
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
//     </div>
//   );
// };

// export default ProfessionalHoursTableWithDuration;


import React, { useState, useEffect, useCallback } from "react";

// Hardcoded Employee Columns based on the provided EMPLOYEE_COLUMNS
const EMPLOYEE_DETAILS_COLUMNS = [
  { key: "idType", label: "ID Type" },
  { key: "emplId", label: "ID" },
  { key: "name", label: "Name" },
  { key: "total", label: "Total" }, // This will be an input field for manual entry
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "glcPlc", label: "Plc" },
  { key: "perHourRate", label: "Hr Rate" },
  { key: "isRev", label: "Rev" }, // Changed to checkbox
  { key: "isBrd", label: "Brd" }, // Changed to checkbox
  { key: "status", label: "Status" },
];

// Hardcoded Duration Data extended to December 2025
const DURATIONS_DATA = [
  { month: "May", year: 2025, monthNo: 5, workingHours: 160 },
  { month: "Jun", year: 2025, monthNo: 6, workingHours: 168 },
  { month: "Jul", year: 2025, monthNo: 7, workingHours: 184 },
  { month: "Aug", year: 2025, monthNo: 8, workingHours: 152 },
  { month: "Sep", year: 2025, monthNo: 9, workingHours: 168 },
  { month: "Oct", year: 2025, monthNo: 10, workingHours: 168 },
  { month: "Nov", year: 2025, monthNo: 11, workingHours: 160 },
  { month: "Dec", year: 2025, monthNo: 12, workingHours: 176 },
];

const ROW_HEIGHT_PX = "64px"; // Define a consistent row height
const LOCAL_STORAGE_KEY = "professionalHoursData"; // Key for localStorage

// Helper to create an empty row based on columns and durations
const emptyRowFromDefinitions = (columns, durations) => {
  const row = {};
  columns.forEach((col) => (row[col.key] = ""));
  row.durationHours = {}; // To store hours for each month
  durations.forEach((d) => (row.durationHours[`${d.monthNo}_${d.year}`] = ""));
  return row;
};

const ProfessionalHoursTableWithDuration = () => {
  const [columns] = useState(EMPLOYEE_DETAILS_COLUMNS);
  const [durations] = useState(DURATIONS_DATA);
  const [rows, setRows] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null); // Use index for editing
  const [inputRow, setInputRow] = useState(
    emptyRowFromDefinitions(EMPLOYEE_DETAILS_COLUMNS, DURATIONS_DATA)
  );
  const [isSaving, setIsSaving] = useState(false); // State to manage saving progress

  // Load data from localStorage on component mount
  useEffect(() => {
    console.log("Attempting to load data from localStorage...");
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log("Raw stored data:", storedData);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setRows(parsedData);
        console.log("Successfully loaded data:", parsedData);
      } else {
        console.log("No data found in localStorage.");
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Save data to localStorage whenever 'rows' state changes
  useEffect(() => {
    console.log("Attempting to save data to localStorage. Current rows:", rows);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
      console.log("Data successfully saved to localStorage.");
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }, [rows]); // Runs whenever 'rows' state changes

  // Handle adding a new row
  const handleNew = () => {
    setInputRow(emptyRowFromDefinitions(columns, durations));
    setEditingRowIndex(rows.length); // Set index to a new row at the end to indicate adding
  };

  // Handle closing the editable row
  const handleClose = () => {
    setInputRow(emptyRowFromDefinitions(columns, durations)); // Clear input fields
    setEditingRowIndex(null); // Hide the editable row
  };

  // Handle changes in input fields (both employee details and duration hours)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("duration-")) {
      const key = name.replace("duration-", "");
      setInputRow((prev) => ({
        ...prev,
        durationHours: { ...prev.durationHours, [key]: value },
      }));
    } else if (type === 'checkbox') {
      setInputRow((prev) => ({
        ...prev,
        [name]: checked ? 'Yes' : 'No', // Store 'Yes' or 'No' string for checkboxes
      }));
    }
    else {
      setInputRow((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle saving a new or updated row and simulate API call
  const handleSave = async () => {
    if (editingRowIndex === null) return; // Should not happen if save button is enabled correctly

    setIsSaving(true);
    try {
      const newRowData = { ...inputRow }; // Create a copy of the input row

      // Simulate the payload structure for the API call
      const emplId = newRowData.emplId || `EMP${Date.now()}`; // Generate a unique emplId if not provided
      const pl_ID = Math.floor(Math.random() * 100000); // Simple random ID for pl_ID

      const plForecasts = durations
        .map((d) => {
          const key = `${d.monthNo}_${d.year}`;
          const forecastedHours = parseInt(newRowData.durationHours[key], 10);
          if (isNaN(forecastedHours) || forecastedHours <= 0) {
            return null; // Skip if no valid hours
          }

          const dayCount = new Date(d.year, d.monthNo, 0).getDate(); // Get number of days in month
          return {
            forecastid: Math.floor(Math.random() * 100000) + 1, // Random forecast ID
            projId: "PROJ001", // Hardcoded project ID
            plId: pl_ID,
            emplId: emplId,
            month: d.monthNo,
            year: d.year,
            totalBurdenCost: 0,
            burden: 0,
            ccffRevenue: 0,
            tnmRevenue: 0,
            cost: 0,
            fringe: 0,
            overhead: 0,
            gna: 0,
            forecastedhours: forecastedHours,
            createdat: new Date().toISOString(),
            updatedat: new Date().toISOString(),
            displayText: `1/${d.monthNo} - ${dayCount}/${d.monthNo}(${d.workingHours})`,
          };
        })
        .filter(Boolean); // Remove null entries

      const apiPayload = {
        pl_ID: pl_ID,
        empl_Id: emplId,
        empl: {
          emplId: emplId,
          orgId: newRowData.orgId || "",
          firstName: newRowData.name.split(' ')[0] || "",
          lastName: newRowData.name.split(' ').slice(1).join(' ') || "",
          midName: "",
          role: "",
          email: "",
          ln1Adr: "",
          mailStateDc: "",
          postalCd: "",
          countyName: "",
          phoneNumber: "",
          maritalCd: "",
          gender: "",
          hireDate: "",
          plcGlcCode: newRowData.glcPlc || "",
          perHourRate: parseFloat(newRowData.perHourRate) || 0,
          salary: 0,
          accId: newRowData.acctId || "",
          type: newRowData.idType || "",
          isRev: newRowData.isRev === 'Yes', // Convert 'Yes'/'No' to boolean for API payload
          isBrd: newRowData.isBrd === 'Yes', // Convert 'Yes'/'No' to boolean for API payload
          createdAt: new Date().toISOString(),
          plForecasts: plForecasts,
        },
      };

      // Simulate POST API call
      // You can replace this with your actual API endpoint
      const mockApiEndpoint = "https://jsonplaceholder.typicode.com/posts";
      console.log("Simulating API POST request with payload:", apiPayload);
      const response = await fetch(mockApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Mock API Response:", responseData); // Check console for mock API response

      // Update local state after successful "API" call
      setRows((prev) => {
        const updated = [...prev];
        if (editingRowIndex < prev.length) {
          // If editing an existing row
          updated[editingRowIndex] = newRowData;
        } else {
          // If adding a new row
          updated.push(newRowData);
        }
        return updated;
      });

      handleClose(); // Clear input and hide editable row after saving
    } catch (error) {
      console.error("Error saving data:", error);
      // Using alert for simplicity, consider a modal for better UX
      // eslint-disable-next-line no-alert
      alert("Failed to save data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to check if the inputRow is empty to disable save button
  const isInputRowEmpty = () => {
    const isEmployeeDetailsEmpty = columns.every(
      (col) => col.key === 'total' ? true : inputRow[col.key] === "" && (col.key !== 'isRev' && col.key !== 'isBrd')
    );
    const isDurationHoursEmpty = durations.every(
      (d) => inputRow.durationHours[`${d.monthNo}_${d.year}`] === ""
    );
    return isEmployeeDetailsEmpty && isDurationHoursEmpty;
  };

  // Function to enable editing of an existing row
  const handleRowClick = (rowIndex) => {
    // Only allow editing if not currently saving and no other row is being edited/added
    if (!isSaving && editingRowIndex === null) {
      setEditingRowIndex(rowIndex);
      setInputRow({ ...rows[rowIndex] }); // Populate inputRow with clicked row's data
    }
  };

  return (
    <div className="p-4 font-inter">
      <h2 className="text-xs font-normal mb-3 text-gray-800">Hours</h2>

      <div className="flex gap-2 mb-4">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded text-[11px] hover:bg-blue-700 transition"
          onClick={handleNew}
          type="button"
          disabled={editingRowIndex !== null || isSaving} // Disable "New" if already editing/adding or saving
        >
          New
        </button>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded text-[11px] hover:bg-green-700 transition"
          onClick={handleSave}
          type="button"
          disabled={editingRowIndex === null || isInputRowEmpty() || isSaving} // Disable if no row selected for editing/adding or saving
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        {editingRowIndex !== null && ( // Show Close button only when adding/editing
          <button
            className="bg-red-600 text-white px-3 py-1 rounded text-[11px] hover:bg-red-700 transition"
            onClick={handleClose}
            type="button"
            disabled={isSaving}
          >
            Close
          </button>
        )}
      </div>

      <div className="flex w-full">
        {/* Employee Details Table */}
        <div className="w-1/2 overflow-x-auto border-r border-gray-300">
          <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr style={{ height: ROW_HEIGHT_PX, lineHeight: "normal" }}>
                {columns.map((col) => (
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
              {rows.length === 0 && editingRowIndex === null && (
                <tr style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}>
                  <td
                    colSpan={columns.length}
                    className="text-center text-gray-400 py-4"
                    style={{ boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    No data available. Click "New" to add a row.
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 cursor-pointer ${editingRowIndex === idx ? 'bg-blue-100' : ''}`}
                  style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
                  onClick={() => handleRowClick(idx)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-2 border-r border-gray-200 text-xs text-gray-700"
                      style={{ boxSizing: "border-box", lineHeight: "normal" }}
                    >
                      {col.key === 'isRev' || col.key === 'isBrd' ? (
                        <input
                          type="checkbox"
                          checked={row[col.key] === 'Yes'} // Read 'Yes'/'No' string
                          readOnly // Keep readOnly for displayed rows
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          // For direct interaction if editingRowIndex matches
                          onChange={(e) => editingRowIndex === idx && handleInputChange(e)}
                        />
                      ) : editingRowIndex === idx ? (
                        <input
                          type="text"
                          name={col.key}
                          value={inputRow[col.key]}
                          onChange={(e) => handleInputChange(e)}
                          className="border border-gray-300 rounded px-1 py-0.5 w-full text-[11px]"
                          style={{ boxSizing: "border-box", lineHeight: "normal" }}
                        />
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {editingRowIndex !== null && editingRowIndex === rows.length && (
                <tr
                  className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
                  style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-2 border-r border-gray-200 text-xs text-gray-700"
                      style={{ boxSizing: "border-box", lineHeight: "normal" }}
                    >
                      {col.key === 'isRev' || col.key === 'isBrd' ? (
                        <input
                          type="checkbox"
                          name={col.key}
                          checked={inputRow[col.key] === 'Yes'} // Read 'Yes'/'No' string
                          onChange={(e) => handleInputChange(e)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      ) : (
                        <input
                          type="text"
                          name={col.key}
                          value={inputRow[col.key]}
                          onChange={(e) => handleInputChange(e)}
                          className="border border-gray-300 rounded px-1 py-0.5 w-full text-[11px]"
                          style={{ boxSizing: "border-box", lineHeight: "normal" }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Duration Hours Table */}
        <div className="w-1/2 overflow-x-auto">
          <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr style={{ height: ROW_HEIGHT_PX, lineHeight: "normal" }}>
                {durations.map((d) => (
                  <th
                    key={`${d.monthNo}_${d.year}`}
                    className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal"
                    style={{ boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="whitespace-nowrap">
                        {d.month} {d.year}
                      </span>
                      <span className="text-xs text-gray-600">
                        {d.workingHours || 0} hrs
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && editingRowIndex === null && (
                <tr style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}>
                  <td
                    colSpan={durations.length}
                    className="text-center text-gray-400 py-4"
                    style={{ boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    {" "}
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 cursor-pointer ${editingRowIndex === idx ? 'bg-blue-100' : ''}`}
                  style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
                  onClick={() => handleRowClick(idx)}
                >
                  {durations.map((d) => {
                    const uniqueKey = `${d.monthNo}_${d.year}`;
                    return (
                      <td
                        key={uniqueKey}
                        className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
                        style={{ boxSizing: "border-box", lineHeight: "normal" }}
                      >
                        {editingRowIndex === idx ? (
                          <input
                            type="text"
                            inputMode="numeric"
                            name={`duration-${uniqueKey}`}
                            value={inputRow.durationHours[uniqueKey]}
                            onChange={(e) => handleInputChange(e)}
                            className="border border-gray-300 rounded px-1 py-0.5 w-full text-[11px] text-center"
                            style={{ boxSizing: "border-box", lineHeight: "normal" }}
                          />
                        ) : (
                          <input
                            type="text"
                            inputMode="numeric"
                            name={`duration-${uniqueKey}`}
                            value={row.durationHours[uniqueKey]}
                            readOnly
                            className="text-center outline-none bg-transparent w-full text-[11px] text-gray-700 cursor-default"
                            style={{ boxSizing: "border-box", lineHeight: "normal" }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {editingRowIndex !== null && editingRowIndex === rows.length && (
                <tr
                  className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
                  style={{ height: ROW_HEIGHT_PX, boxSizing: "border-box", lineHeight: "normal" }}
                >
                  {durations.map((d) => {
                    const uniqueKey = `${d.monthNo}_${d.year}`;
                    return (
                      <td
                        key={uniqueKey}
                        className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
                        style={{ boxSizing: "border-box", lineHeight: "normal" }}
                      >
                        <input
                          type="text"
                          inputMode="numeric"
                          name={`duration-${uniqueKey}`}
                          value={inputRow.durationHours[uniqueKey]}
                          onChange={(e) => handleInputChange(e)}
                          className="border border-gray-300 rounded px-1 py-0.5 w-full text-[11px] text-center"
                          style={{ boxSizing: "border-box", lineHeight: "normal" }}
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
    </div>
  );
};

export default ProfessionalHoursTableWithDuration;
