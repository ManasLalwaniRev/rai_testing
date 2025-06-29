// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "total", label: "Total" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "perHourRate", label: "Hr Rate" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// function isMonthEditable(duration, closedPeriod, planType) {
//   if (planType !== "EAC") return true;
//   if (!closedPeriod) return true;
//   const closedDate = new Date(closedPeriod);
//   if (isNaN(closedDate)) return true;
//   const durationDate = new Date(duration.year, duration.monthNo - 1, 1);
//   const closedMonth = closedDate.getMonth();
//   const closedYear = closedDate.getFullYear();
//   const durationMonth = durationDate.getMonth();
//   const durationYear = durationDate.getFullYear();
//   return durationYear > closedYear || (durationYear === closedYear && durationMonth >= closedMonth);
// }

// const ProjectHoursDetails = ({ planId, status, planType, closedPeriod, startDate, endDate, employees, isForecastLoading }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});

//   const isEditable = status === "Working";

//   useEffect(() => {
//     console.log("ProjectHoursDetails useEffect triggered with props:", { planId, planType, status, closedPeriod, startDate, endDate, employees, isForecastLoading });
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
//         console.log("Missing startDate or endDate, exiting fetchDurations");
//         setDurations([]);
//         setIsDurationLoading(false);
//         return;
//       }

//       setIsDurationLoading(true);
//       setError(null);
//       try {
//         const durationResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );

//         if (!Array.isArray(durationResponse.data)) {
//           throw new Error("Invalid duration response format");
//         }

//         setDurations(durationResponse.data);
//       } catch (err) {
//         console.error("Duration API call failed:", err.message, err.response?.data);
//         setError("Failed to load duration data. Please try again.");
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };

//     fetchDurations();
//   }, [startDate, endDate]);

//   const getEmployeeRow = (emp, idx) => {
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value = inputValue !== undefined ? inputValue : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);

//     return {
//       idType: "Employee",
//       emplId: emp.empl.emplId,
//       name: `${emp.empl.lastName}, ${emp.empl.firstName}`,
//       status: emp.empl.sEmplStatusCd || emp.empl.status || "IN",
//       acctId: emp.empl.accId || "-",
//       orgId: emp.empl.orgId || "-",
//       glcPlc: emp.empl.plcGlcCode || "-",
//       perHourRate: emp.empl.perHourRate || "-",
//       isRev: emp.empl.isRev ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.empl.isBrd ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       total: totalHours || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.empl && Array.isArray(emp.empl.plForecasts)) {
//       emp.empl.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value = forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = {
//           value,
//           ...forecast,
//         };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (!/^\d*\.?\d*$/.test(newValue)) return;
//     setInputValues((prev) => ({
//       ...prev,
//       [`${empIdx}_${uniqueKey}`]: newValue,
//     }));
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey) => {
//     if (!isEditable) return;
//     const newValue = inputValues[`${empIdx}_${uniqueKey}`];
//     if (newValue === undefined) return;

//     const emp = employees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];

//     if (!forecast || !forecast.forecastid) {
//       console.warn(`Forecast ID not found for employee ${emp.empl.emplId}, key ${uniqueKey}`);
//       return;
//     }

//     const prevEmployees = [...employees];
//     const updatedEmployees = [...employees];
//     const updatedForecasts = updatedEmployees[empIdx].empl.plForecasts.map((f) =>
//       f.forecastid === forecast.forecastid
//         ? { ...f, forecastedhours: newValue === "" ? 0 : Number(newValue) }
//         : f
//     );
//     updatedEmployees[empIdx] = {
//       ...updatedEmployees[empIdx],
//       empl: {
//         ...updatedEmployees[empIdx].empl,
//         plForecasts: updatedForecasts,
//       },
//     };

//     const payload = {
//       forecastedamt: forecast.forecastedamt ?? 0,
//       forecastid: Number(forecast.forecastid),
//       projId: forecast.projId,
//       plId: forecast.plId,
//       emplId: forecast.emplId,
//       month: forecast.month,
//       year: forecast.year,
//       forecastedhours: Number(newValue),
//       createdat: forecast.createdat,
//       updatedat: new Date().toISOString(),
//       displayText: forecast.displayText,
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (err) {
//       updatedEmployees[empIdx] = prevEmployees[empIdx];
//       window.alert(
//         "Failed to update forecasted hours: " +
//           (err.response?.data?.message || JSON.stringify(err.response?.data) || err.message)
//       );
//     }
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows([]);

//   const sortedDurations = [...durations].sort(
//     (a, b) => new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1)
//   );

//   // Show loading state if either forecast or duration data is still loading
//   if (isForecastLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-xs text-gray-600">Loading forecast data...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error: </strong>
//           <span className="block sm:inline text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!employees || employees.length === 0) {
//     return (
//       <div className="p-4 font-inter">
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">No forecast data found for this plan.</span>
//         </div>
//       </div>
//     );
//   }

//   const visibleEmployees = employees.filter((_, idx) => !hiddenRows[idx]);

//   return (
//     <div className="p-4 font-inter">
//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Hours</h2>
//       {hasHiddenRows && (
//         <button
//           className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//           onClick={showHiddenRows}
//         >
//           Show Hidden Rows
//         </button>
//       )}
//       <div className="flex w-full">
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
//             <thead className="bg-blue-100 text-gray-700 ">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {EMPLOYEE_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {visibleEmployees.map((emp, vIdx) => {
//                 const row = getEmployeeRow(emp, employees.findIndex((e) => e === emp));
//                 return (
//                   <tr
//                     key={emp.empl.emplId}
//                     className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
//                     style={{ height: `${ROW_HEIGHT_DEFAULT}px`, boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <td
//                         key={col.key}
//                         className="p-2 border-r border-gray-200 text-xs text-gray-700"
//                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                       >
//                         {row[col.key]}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="w-1/2 overflow-x-auto">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {sortedDurations.map((duration) => (
//                   <th
//                     key={`${duration.year}-${duration.monthNo}`}
//                     className="py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900"
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <span className="whitespace-nowrap">
//                         {duration.month}
//                       </span>
//                       <span className="text-xs text-gray-600">
//                         {duration.workingHours || 0} hrs
//                       </span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {visibleEmployees.map((emp) => {
//                 const monthHours = getMonthHours(emp);
//                 return (
//                   <tr
//                     key={emp.empl.emplId}
//                     className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
//                     style={{ height: `${ROW_HEIGHT_DEFAULT}px`, boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       const forecast = monthHours[uniqueKey];
//                       const value =
//                         inputValues[`${employees.findIndex((e) => e === emp)}_${uniqueKey}`] ??
//                         (forecast && forecast.value !== undefined ? forecast.value : "");
//                       const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
//                       return (
//                         <td
//                           key={`${duration.year}-${duration.monthNo}`}
//                           className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
//                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                         >
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
//                               !isInputEditable ? "cursor-not-allowed text-gray-400" : ""
//                             }`}
//                             style={{
//                               width: "55px",
//                               padding: "0px 2px",
//                               height: "20px",
//                               boxSizing: "border-box",
//                               lineHeight: "normal",
//                             }}
//                             value={value}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 employees.findIndex((e2) => e2 === emp),
//                                 uniqueKey,
//                                 e.target.value.replace(/[^0-9.]/g, "")
//                               )
//                             }
//                             onBlur={() =>
//                               handleForecastHoursBlur(
//                                 employees.findIndex((e2) => e2 === emp),
//                                 uniqueKey
//                               )
//                             }
//                             disabled={!isInputEditable}
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectHoursDetails;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "total", label: "Total" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "perHourRate", label: "Hr Rate" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
// ];

// const ROW_HEIGHT_DEFAULT = 64;

// function isMonthEditable(duration, closedPeriod, planType) {
//   // If planType is not EAC, it's always editable regardless of closedPeriod
//   if (planType !== "EAC") return true;
//   // If no closedPeriod is provided, it's editable
//   if (!closedPeriod) return true;

//   const closedDate = new Date(closedPeriod);
//   // If closedPeriod is invalid, treat as editable
//   if (isNaN(closedDate)) return true;

//   // Create a date object for the first day of the duration month
//   const durationDate = new Date(duration.year, duration.monthNo - 1, 1);

//   // Get month and year from closedPeriod and duration
//   const closedMonth = closedDate.getMonth(); // 0-11
//   const closedYear = closedDate.getFullYear();
//   const durationMonth = durationDate.getMonth(); // 0-11
//   const durationYear = durationDate.getFullYear();

//   // A month is editable if its year is greater than the closed year
//   // OR if it's the same year but the month is greater than or equal to the closed month
//   return durationYear > closedYear || (durationYear === closedYear && durationMonth >= closedMonth);
// }

// const ProjectHoursDetails = ({ planId, status, planType, closedPeriod, startDate, endDate, employees = [], isForecastLoading }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});

//   // State for Find and Replace functionality
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all"); // 'all', 'row', 'column'
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null); // For column-wise replacement

//   const isEditable = status === "Working";

//   useEffect(() => {
//     console.log("ProjectHoursDetails useEffect triggered with props:", { planId, planType, status, closedPeriod, startDate, endDate, employees, isForecastLoading });
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
//         console.log("Missing startDate or endDate, exiting fetchDurations");
//         setDurations([]);
//         setIsDurationLoading(false);
//         return;
//       }

//       setIsDurationLoading(true);
//       setError(null);
//       try {
//         const durationResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );

//         if (!Array.isArray(durationResponse.data)) {
//           throw new Error("Invalid duration response format");
//         }

//         setDurations(durationResponse.data);
//       } catch (err) {
//         console.error("Duration API call failed:", err.message, err.response?.data);
//         setError("Failed to load duration data. Please try again.");
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };

//     fetchDurations();
//   }, [startDate, endDate]);

//   const getEmployeeRow = (emp, idx) => {
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value = inputValue !== undefined ? inputValue : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);

//     return {
//       idType: "Employee",
//       emplId: emp.empl.emplId,
//       name: `${emp.empl.lastName}, ${emp.empl.firstName}`,
//       status: emp.empl.sEmplStatusCd || emp.empl.status || "IN",
//       acctId: emp.empl.accId || "-",
//       orgId: emp.empl.orgId || "-",
//       glcPlc: emp.empl.plcGlcCode || "-",
//       perHourRate: emp.empl.perHourRate || "-",
//       isRev: emp.empl.isRev ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.empl.isBrd ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       total: totalHours || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.empl && Array.isArray(emp.empl.plForecasts)) {
//       emp.empl.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value = forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = {
//           value,
//           ...forecast,
//         };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     // Allow empty string to clear the input, or valid numbers
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey) => {
//     if (!isEditable) return;
//     const currentInputValue = inputValues[`${empIdx}_${uniqueKey}`];
//     // If the input was cleared to empty string, treat it as 0 for API
//     const newValue = currentInputValue === "" ? 0 : Number(currentInputValue);

//     const emp = employees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     // Retrieve the duration object for the current month/year to check editability
//     const currentDuration = sortedDurations.find(d => `${d.monthNo}_${d.year}` === uniqueKey);
//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//         // toast.warn("This month is in a closed period and cannot be edited."); // Removed toast
//         console.warn("This month is in a closed period and cannot be edited."); // Log to console instead
//         setInputValues((prev) => ({
//             ...prev,
//             [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours), // Revert to original if not editable
//         }));
//         return;
//     }

//     // Only proceed if the effective numerical value has actually changed.
//     // This correctly handles cases like 0 vs "" (both become 0 numerically) or 100 vs 100.0 (both become 100).
//     if (newValue === originalForecastedHours) {
//       console.log("Value unchanged, no API call needed.");
//       return;
//     }

//     if (!forecast || !forecast.forecastid) {
//         // toast.info("No existing forecast to modify for this month. New entries are not supported via this update method."); // Removed toast
//         console.info("No existing forecast to modify for this month. New entries are not supported via this update method."); // Log to console instead
//         return;
//     }

//     // Set payload according to the requirement with appropriate fallbacks
//     const payload = {
//       forecastedamt: forecast.forecastedamt ?? 0,
//       forecastid: Number(forecast.forecastid),
//       projId: forecast.projId ?? "",
//       plId: forecast.plId ?? 0,
//       emplId: forecast.emplId ?? "",
//       dctId: forecast.dctId ?? 0,
//       month: forecast.month ?? 0,
//       year: forecast.year ?? 0,
//       totalBurdenCost: forecast.totalBurdenCost ?? 0,
//       burden: forecast.burden ?? 0,
//       ccffRevenue: forecast.ccffRevenue ?? 0,
//       tnmRevenue: forecast.tnmRevenue ?? 0,
//       cost: forecast.cost ?? 0,
//       fringe: forecast.fringe ?? 0,
//       overhead: forecast.overhead ?? 0,
//       gna: forecast.gna ?? 0,
//       forecastedhours: Number(newValue) || 0,
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split('T')[0],
//       displayText: forecast.displayText ?? "",
//     };

//     console.log("DEBUG: Payload being sent from handleForecastHoursBlur:", payload);

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // toast.success("Forecast updated successfully!"); // Removed toast
//       console.log("Forecast updated successfully!"); // Log to console instead
//     } catch (err) {
//       console.error("Error updating forecasted hours:", err);
//       const errorMessage =
//         err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
//       // toast.error("Failed to update forecasted hours: " + errorMessage); // Removed toast
//       console.error("Failed to update forecasted hours: " + errorMessage); // Log to console instead
//       // Revert the input value if the API call fails
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//     }
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({}); // Reset hidden rows

//   const sortedDurations = [...durations].sort(
//     (a, b) => new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//   );

//   // handleFindReplace function
//   const handleFindReplace = async () => {
//     if (!isEditable) {
//       // toast.error("Cannot perform find and replace: Plan is not in 'Working' status."); // Removed toast
//       console.error("Cannot perform find and replace: Plan is not in 'Working' status."); // Log to console instead
//       return;
//     }
//     if (findValue === "") {
//       // toast.warn("Please enter a value to find."); // Removed toast
//       console.warn("Please enter a value to find."); // Log to console instead
//       return;
//     }

//     if (replaceScope === 'row' && selectedRowIndex === null) {
//         // toast.error("Please select an employee row to use 'Selected Row' scope."); // Removed toast
//         console.error("Please select an employee row to use 'Selected Row' scope."); // Log to console instead
//         return;
//     }

//     if (replaceScope === 'column' && selectedColumnKey === null) {
//       // toast.error("Please select a month column to use 'Selected Column' scope."); // Removed toast
//       console.error("Please select a month column to use 'Selected Column' scope."); // Log to console instead
//       return;
//     }

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0; // Track skipped edits due to closed period

//     for (const empIdx in employees) {
//       const emp = employees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === 'row' && selectedRowIndex !== null && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === 'column' && selectedColumnKey !== null && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         // Check if month is editable for find & replace
//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//             console.log(`Skipping update for ${emp.empl.emplId} in ${uniqueKey}: month is not editable.`);
//             skippedCount++;
//             continue; // Skip this iteration if the month is not editable
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;

//         const displayedValue = inputValues[currentInputKey] !== undefined
//             ? String(inputValues[currentInputKey])
//             : String(getMonthHours(emp)[uniqueKey]?.value ?? "");

//         let isMatch = false;
//         const findValueNormalized = findValue.trim();
//         const displayedValueNormalized = displayedValue.trim();

//         if (findValueNormalized === "") {
//             isMatch = (displayedValueNormalized === "" || displayedValueNormalized === "0");
//         } else {
//             isMatch = (displayedValueNormalized === findValueNormalized);
//         }

//         if (isMatch) {
//           const newNumericValue = replaceValue === "" ? 0 : Number(replaceValue);

//           if (!isNaN(newNumericValue) || replaceValue === "") {
//             // Only update if the new value is numerically different from the original forecast
//             const forecast = getMonthHours(emp)[uniqueKey];
//             const originalForecastedHours = forecast?.forecastedhours ?? 0;

//             if (forecast && forecast.forecastid && newNumericValue !== originalForecastedHours) {
//               updatedInputValues[currentInputKey] = replaceValue; // Update local state for immediate UI reflection
//               replacementsCount++;

//               // Set payload according to the requirement with appropriate fallbacks
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
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
//                 forecastedhours: Number(newNumericValue) || 0,
//                 createdat: forecast.createdat ?? new Date(0).toISOString(),
//                 updatedat: new Date().toISOString().split('T')[0],
//                 displayText: forecast.displayText ?? "",
//               };

//               console.log("DEBUG: Payload being sent from handleFindReplace:", payload);

//               updates.push(axios.put(
//                 "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
//                 payload,
//                 { headers: { "Content-Type": "application/json" } }
//               ));
//             } else if (!forecast || !forecast.forecastid) {
//                 console.warn(`No forecastId found for employee ${emp.empl.emplId}, month ${uniqueKey}. Skipping API update for this cell.`);
//             } else {
//                 console.log(`Value for ${emp.empl.emplId}-${uniqueKey} did not change for API, skipping update.`);
//             }
//           }
//         }
//       }
//     }

//     setInputValues(updatedInputValues);

//     try {
//         await Promise.all(updates);
//         let successMessage = `Found "${findValue}", Replaced with "${replaceValue}" across ${replacementsCount} cells.`;
//         if (skippedCount > 0) {
//             successMessage += ` (${skippedCount} cells skipped due to being in a closed period.)`;
//         }

//         if (replacementsCount > 0) {
//             // toast.success(successMessage); // Removed toast
//             console.log(successMessage); // Log to console instead
//         } else if (skippedCount > 0) {
//             // toast.info(`No replacements made, but ${skippedCount} cells were skipped as they are in a closed period.`); // Removed toast
//             console.info(`No replacements made, but ${skippedCount} cells were skipped as they are in a closed period.`); // Log to console instead
//         } else {
//             // toast.info(`No occurrences of "${findValue}" found for replacement.`); // Removed toast
//             console.info(`No occurrences of "${findValue}" found for replacement.`); // Log to console instead
//         }
//     } catch (err) {
//         console.error("Error during batch update:", err);
//         const errorMessage = err.response?.data?.message || err.message || "Failed to replace some values.";
//         // toast.error(`Error replacing values: ${errorMessage}`); // Removed toast
//         console.error(`Error replacing values: ${errorMessage}`); // Log to console instead
//     } finally {
//         // This will now close the modal regardless of success or failure, or scope.
//         setShowFindReplace(false);
//         setFindValue("");
//         setReplaceValue("");
//         // Ensure selections are also cleared when the modal closes
//         clearSelection();
//     }
//   };

//   // handleRowClick function
//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     if (selectedRowIndex === actualEmpIdx) {
//       setSelectedRowIndex(null);
//       setReplaceScope("all");
//     } else {
//       setSelectedRowIndex(actualEmpIdx);
//       setSelectedColumnKey(null);
//       if (showFindReplace) {
//         setReplaceScope('row');
//       }
//     }
//   };

//   // handleColumnHeaderClick function
//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     if (selectedColumnKey === uniqueKey) {
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     } else {
//       setSelectedColumnKey(uniqueKey);
//       setSelectedRowIndex(null);
//       if (showFindReplace) {
//         setReplaceScope('column');
//       }
//     }
//   };

//   // clearSelection function
//   const clearSelection = () => {
//     setSelectedRowIndex(null);
//     setSelectedColumnKey(null);
//     setReplaceScope("all");
//   };

//   if (isForecastLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter">
//         {/* Removed ToastContainer */}
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-xs text-gray-600">Loading forecast data...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 font-inter">
//         {/* Removed ToastContainer */}
//         <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
//           <strong className="font-bold text-xs">Error: </strong>
//           <span className="block sm:inline text-xs">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!employees || employees.length === 0) {
//     return (
//       <div className="p-4 font-inter">
//         {/* Removed ToastContainer */}
//         <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
//           <span className="text-xs">No forecast data found for this plan.</span>
//         </div>
//       </div>
//     );
//   }

//   const visibleEmployees = employees.filter((_, idx) => !hiddenRows[idx]);

//   return (
//     <div className="p-4 font-inter">
//       {/* Removed ToastContainer */}
//       <h2 className="text-xs font-semibold mb-3 text-gray-800">Hours</h2>
//       <div className="flex justify-between items-center mb-4">
//         {hasHiddenRows && (
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//             onClick={showHiddenRows}
//           >
//             Show Hidden Rows
//           </button>
//         )}
//         <button
//           className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//           onClick={() => {
//             if (isEditable) {
//                 setShowFindReplace(true);
//             } else {
//                 // toast.warn("Find and Replace is only available when the plan status is 'Working'."); // Removed toast
//                 console.warn("Find and Replace is only available when the plan status is 'Working'."); // Log to console instead
//             }
//           }}
//         >
//           Find & Replace
//         </button>
//       </div>

//       <div className="flex w-full">
//         {/* Left Table (Employee Details) */}
//         <div className="w-1/2 overflow-x-auto border-r border-gray-300">
//           <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
//             <thead className="bg-blue-100 text-gray-700 ">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {EMPLOYEE_COLUMNS.map((col) => (
//                   <th
//                     key={col.key}
//                     // Adjusted classes for font size and weight as per reference
//                     className={`p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal
//                       ${selectedColumnKey && col.key === 'total' ? 'bg-yellow-100' : ''}
//                     `}
//                     style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {visibleEmployees.map((emp, vIdx) => {
//                 const actualEmpIdx = employees.findIndex((e) => e === emp); // Get actual index from original employees array
//                 const row = getEmployeeRow(emp, actualEmpIdx);
//                 return (
//                   <tr
//                     key={emp.empl.emplId}
//                     className={`even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200
//                       ${selectedRowIndex === actualEmpIdx ? 'bg-yellow-100 border-yellow-500 border-2' : ''}
//                     `}
//                     style={{ height: `${ROW_HEIGHT_DEFAULT}px`, boxSizing: "border-box", lineHeight: "normal", cursor: isEditable ? 'pointer' : 'default' }}
//                     onClick={() => handleRowClick(actualEmpIdx)}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <td
//                         key={col.key}
//                         className={`p-2 border-r border-gray-200 text-xs text-gray-700`}
//                         style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                       >
//                         {row[col.key]}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Right Table (Forecast Hours) */}
//         <div className="w-1/2 overflow-x-auto">
//           <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
//             <thead className="bg-blue-100 text-gray-700 font-normal">
//               <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
//                 {sortedDurations.map((duration) => {
//                     const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                     return (
//                     <th
//                         key={uniqueKey}
//                         // Adjusted classes here for font size and weight, and added selected column styling
//                         className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal
//                           ${selectedColumnKey === uniqueKey ? 'bg-yellow-100' : ''}
//                         `}
//                         style={{ boxSizing: "border-box", lineHeight: "normal", cursor: isEditable ? 'pointer' : 'default' }}
//                         onClick={() => handleColumnHeaderClick(uniqueKey)}
//                     >
//                         <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                                 {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                                 {duration.workingHours || 0} hrs
//                             </span>
//                         </div>
//                     </th>
//                     );
//                 })}
//               </tr>
//             </thead>
//             <tbody>
//               {visibleEmployees.map((emp) => {
//                 const actualEmpIdx = employees.findIndex((e) => e === emp); // Get actual index for inputValues
//                 const monthHours = getMonthHours(emp);
//                 return (
//                   <tr
//                     key={emp.empl.emplId}
//                     className={`even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200
//                       ${selectedRowIndex === actualEmpIdx ? 'bg-yellow-100 border-yellow-500 border-2' : ''}
//                     `}
//                     style={{ height: `${ROW_HEIGHT_DEFAULT}px`, boxSizing: "border-box", lineHeight: "normal", cursor: isEditable ? 'pointer' : 'default' }}
//                     onClick={() => handleRowClick(actualEmpIdx)}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       const forecast = monthHours[uniqueKey];
//                       const value =
//                         inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                         (forecast && forecast.value !== undefined ? forecast.value : "");
//                       const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
//                       return (
//                         <td
//                           key={uniqueKey}
//                           className={`py-2 px-3 border-r border-gray-200 text-center min-w-[100px]
//                             ${selectedColumnKey === uniqueKey ? 'bg-yellow-100' : ''}
//                           `}
//                           style={{ boxSizing: "border-box", lineHeight: "normal" }}
//                         >
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
//                               !isInputEditable ? "cursor-not-allowed text-gray-400" : ""
//                             }`}
//                             style={{
//                               width: "55px",
//                               padding: "0px 2px",
//                               height: "20px",
//                               boxSizing: "border-box",
//                               lineHeight: "normal",
//                             }}
//                             value={value}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 actualEmpIdx,
//                                 uniqueKey,
//                                 e.target.value.replace(/[^0-9.]/g, "")
//                               )
//                             }
//                             onBlur={() =>
//                               handleForecastHoursBlur(
//                                 actualEmpIdx,
//                                 uniqueKey
//                               )
//                             }
//                             disabled={!isInputEditable}
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Find and Replace Modal */}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
//             <h3 className="text-lg font-semibold mb-4">Find and Replace Hours</h3>
//             <div className="mb-3">
//               <label htmlFor="findValue" className="block text-gray-700 text-xs font-medium mb-1">
//                 Find:
//               </label>
//               <input
//                 type="text"
//                 id="findValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={findValue}
//                 onChange={(e) => setFindValue(e.target.value)}
//                 placeholder="Value to find (e.g., 100 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="replaceValue" className="block text-gray-700 text-xs font-medium mb-1">
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) => setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))}
//                 placeholder="New value (e.g., 120 or empty)"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Scope:
//               </label>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="inline-flex items-center text-xs cursor-pointer">
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="all"
//                     checked={replaceScope === "all"}
//                     onChange={(e) => {
//                         setReplaceScope(e.target.value);
//                     }}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer"
//                     onClick={() => selectedRowIndex !== null && setReplaceScope("row")}>
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="row"
//                     checked={replaceScope === "row"}
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                     disabled={selectedRowIndex === null}
//                   />
//                   <span className="ml-2">
//                     Selected Row ({selectedRowIndex !== null ? employees[selectedRowIndex]?.empl.emplId : 'N/A'})
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer"
//                     onClick={() => selectedColumnKey !== null && setReplaceScope("column")}>
//                   <input
//                     type="radio"
//                     className="form-radio text-blue-600"
//                     name="replaceScope"
//                     value="column"
//                     checked={replaceScope === "column"}
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                     disabled={selectedColumnKey === null}
//                   />
//                   <span className="ml-2">
//                     Selected Column ({selectedColumnKey ? sortedDurations.find(d => `${d.monthNo}_${d.year}` === selectedColumnKey)?.month : 'N/A'})
//                   </span>
//                 </label>
//               </div>
//               {(replaceScope === 'row' && selectedRowIndex === null) && (
//                   <p className="text-red-500 text-xs mt-1">Click on an employee row to enable "Selected Row" scope.</p>
//               )}
//               {(replaceScope === 'column' && selectedColumnKey === null) && (
//                 <p className="text-red-500 text-xs mt-1">Click on a month column to enable "Selected Column" scope.</p>
//               )}
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={clearSelection}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Clear Selection
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                     setShowFindReplace(false);
//                     setFindValue("");
//                     setReplaceValue("");
//                     clearSelection(); // Also clear selection when cancelling
//                 }}
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

// export default ProjectHoursDetails;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const EMPLOYEE_COLUMNS = [
  { key: "idType", label: "ID Type" },
  { key: "emplId", label: "ID" },
  { key: "name", label: "Name" },
  { key: "total", label: "Total" },
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "glcPlc", label: "Plc" },
  { key: "perHourRate", label: "Hr Rate" },
  { key: "isRev", label: "Rev" },
  { key: "isBrd", label: "Brd" },
  { key: "status", label: "Status" },
];

const ROW_HEIGHT_DEFAULT = 64;

function isMonthEditable(duration, closedPeriod, planType) {
  // If planType is not EAC, it's always editable regardless of closedPeriod
  if (planType !== "EAC") return true;
  // If no closedPeriod is provided, it's editable
  if (!closedPeriod) return true;

  const closedDate = new Date(closedPeriod);
  // If closedPeriod is invalid, treat as editable
  if (isNaN(closedDate)) return true;

  // Create a date object for the first day of the duration month
  const durationDate = new Date(duration.year, duration.monthNo - 1, 1);

  // Get month and year from closedPeriod and duration
  const closedMonth = closedDate.getMonth(); // 0-11
  const closedYear = closedDate.getFullYear();
  const durationMonth = durationDate.getMonth(); // 0-11
  const durationYear = durationDate.getFullYear();

  // A month is editable if its year is greater than the closed year
  // OR if it's the same year but the month is greater than or equal to the closed month
  return (
    durationYear > closedYear ||
    (durationYear === closedYear && durationMonth >= closedMonth)
  );
}

const ProjectHoursDetails = ({
  planId,
  status,
  planType,
  closedPeriod,
  startDate,
  endDate,
  employees = [],
  isForecastLoading,
}) => {
  const [durations, setDurations] = useState([]);
  const [isDurationLoading, setIsDurationLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenRows, setHiddenRows] = useState({});
  const [inputValues, setInputValues] = useState({});

  // State for Find and Replace functionality
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findValue, setFindValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");
  const [replaceScope, setReplaceScope] = useState("all"); // 'all', 'row', 'column'
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedColumnKey, setSelectedColumnKey] = useState(null); // For column-wise replacement

  const isEditable = status === "Working";

  useEffect(() => {
    console.log("ProjectHoursDetails useEffect triggered with props:", {
      planId,
      planType,
      status,
      closedPeriod,
      startDate,
      endDate,
      employees,
      isForecastLoading,
    });
    const fetchDurations = async () => {
      if (!startDate || !endDate) {
        console.log("Missing startDate or endDate, exiting fetchDurations");
        setDurations([]);
        setIsDurationLoading(false);
        return;
      }

      setIsDurationLoading(true);
      setError(null);
      try {
        const durationResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
        );

        if (!Array.isArray(durationResponse.data)) {
          throw new Error("Invalid duration response format");
        }

        setDurations(durationResponse.data);
      } catch (err) {
        console.error(
          "Duration API call failed:",
          err.message,
          err.response?.data
        );
        setError("Failed to load duration data. Please try again.");
      } finally {
        setIsDurationLoading(false);
      }
    };

    fetchDurations();
  }, [startDate, endDate]);

  const getEmployeeRow = (emp, idx) => {
    const monthHours = getMonthHours(emp);
    const totalHours = sortedDurations.reduce((sum, duration) => {
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      const inputValue = inputValues[`${idx}_${uniqueKey}`];
      const forecastValue = monthHours[uniqueKey]?.value;
      const value =
        inputValue !== undefined && inputValue !== ""
          ? inputValue
          : forecastValue; // Handle empty string for input
      return sum + (value && !isNaN(value) ? Number(value) : 0);
    }, 0);

    return {
      idType: "Employee",
      emplId: emp.empl.emplId,
      name: `${emp.empl.lastName}, ${emp.empl.firstName}`,
      status: emp.empl.sEmplStatusCd || emp.empl.status || "Act",
      acctId: emp.empl.accId || "-",
      orgId: emp.empl.orgId || "-",
      glcPlc: emp.empl.plcGlcCode || "-",
      perHourRate: emp.empl.perHourRate || "-",
      isRev: emp.empl.isRev ? (
        <span className="text-green-600 font-sm text-xl">✓</span>
      ) : (
        "-"
      ),
      isBrd: emp.empl.isBrd ? (
        <span className="text-green-600 font-sm text-xl">✓</span>
      ) : (
        "-"
      ),
      total: totalHours || "-",
    };
  };

  const getMonthHours = (emp) => {
    const monthHours = {};
    if (emp.empl && Array.isArray(emp.empl.plForecasts)) {
      emp.empl.plForecasts.forEach((forecast) => {
        const uniqueKey = `${forecast.month}_${forecast.year}`;
        const value = forecast.forecastedhours ?? 0;
        monthHours[uniqueKey] = {
          value,
          ...forecast,
        };
      });
    }
    return monthHours;
  };

  const handleInputChange = (empIdx, uniqueKey, newValue) => {
    if (!isEditable) return;
    // Allow empty string to clear the input, or valid numbers
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: newValue,
      }));
    }
  };

  const handleForecastHoursBlur = async (empIdx, uniqueKey) => {
    if (!isEditable) return;
    const currentInputValue = inputValues[`${empIdx}_${uniqueKey}`];
    // If the input was cleared to empty string, treat it as 0 for API
    const newValue = currentInputValue === "" ? 0 : Number(currentInputValue);

    const emp = employees[empIdx];
    const monthHours = getMonthHours(emp);
    const forecast = monthHours[uniqueKey];
    const originalForecastedHours = forecast?.forecastedhours ?? 0;

    // Retrieve the duration object for the current month/year to check editability
    const currentDuration = sortedDurations.find(
      (d) => `${d.monthNo}_${d.year}` === uniqueKey
    );
    if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
      console.warn("This month is in a closed period and cannot be edited."); // Log to console instead
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours), // Revert to original if not editable
      }));
      return;
    }

    // Only proceed if the effective numerical value has actually changed.
    // This correctly handles cases like 0 vs "" (both become 0 numerically) or 100 vs 100.0 (both become 100).
    if (newValue === originalForecastedHours) {
      console.log("Value unchanged, no API call needed.");
      return;
    }

    if (!forecast || !forecast.forecastid) {
      console.info(
        "No existing forecast to modify for this month. New entries are not supported via this update method."
      ); // Log to console instead
      return;
    }

    // Set payload according to the requirement with appropriate fallbacks
    const payload = {
      forecastedamt: forecast.forecastedamt ?? 0,
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
      // PlcRate: forecast.PlcRate ?? 0,
      forecastedhours: Number(newValue) || 0,
      createdat: forecast.createdat ?? new Date(0).toISOString(),
      updatedat: new Date().toISOString().split("T")[0],
      displayText: forecast.displayText ?? "",
    };

    console.log(
      "DEBUG: Payload being sent from handleForecastHoursBlur:",
      payload
    );

    try {
      await axios.put(
        "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Forecast updated successfully!"); // Log to console instead
    } catch (err) {
      console.error("Error updating forecasted hours:", err);
      const errorMessage =
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message;
      console.error("Failed to update forecasted hours: " + errorMessage); // Log to console instead
      // Revert the input value if the API call fails
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
      }));
    }
  };

  const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
  const showHiddenRows = () => setHiddenRows({}); // Reset hidden rows

  const sortedDurations = [...durations].sort(
    (a, b) =>
      new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
  );

  // handleFindReplace function
  const handleFindReplace = async () => {
    if (!isEditable) {
      console.error(
        "Cannot perform find and replace: Plan is not in 'Working' status."
      ); // Log to console instead
      return;
    }
    if (findValue === "") {
      console.warn("Please enter a value to find."); // Log to console instead
      return;
    }

    if (replaceScope === "row" && selectedRowIndex === null) {
      console.error(
        "Please select an employee row to use 'Selected Row' scope."
      ); // Log to console instead
      return;
    }

    if (replaceScope === "column" && selectedColumnKey === null) {
      console.error(
        "Please select a month column to use 'Selected Column' scope."
      ); // Log to console instead
      return;
    }

    const updates = [];
    const updatedInputValues = { ...inputValues };
    let replacementsCount = 0;
    let skippedCount = 0; // Track skipped edits due to closed period

    for (const empIdx in employees) {
      const emp = employees[empIdx];
      const actualEmpIdx = parseInt(empIdx, 10);

      if (
        replaceScope === "row" &&
        selectedRowIndex !== null &&
        actualEmpIdx !== selectedRowIndex
      ) {
        continue;
      }

      for (const duration of sortedDurations) {
        const uniqueKey = `${duration.monthNo}_${duration.year}`;

        if (
          replaceScope === "column" &&
          selectedColumnKey !== null &&
          uniqueKey !== selectedColumnKey
        ) {
          continue;
        }

        // Check if month is editable for find & replace
        if (!isMonthEditable(duration, closedPeriod, planType)) {
          console.log(
            `Skipping update for ${emp.empl.emplId} in ${uniqueKey}: month is not editable.`
          );
          skippedCount++;
          continue; // Skip this iteration if the month is not editable
        }

        const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;

        const displayedValue =
          inputValues[currentInputKey] !== undefined
            ? String(inputValues[currentInputKey])
            : String(getMonthHours(emp)[uniqueKey]?.value ?? "");

        let isMatch = false;
        const findValueNormalized = findValue.trim();
        const displayedValueNormalized = displayedValue.trim();

        if (findValueNormalized === "") {
          isMatch =
            displayedValueNormalized === "" || displayedValueNormalized === "0";
        } else {
          isMatch = displayedValueNormalized === findValueNormalized;
        }

        if (isMatch) {
          const newNumericValue =
            replaceValue === "" ? 0 : Number(replaceValue);

          if (!isNaN(newNumericValue) || replaceValue === "") {
            // Only update if the new value is numerically different from the original forecast
            const forecast = getMonthHours(emp)[uniqueKey];
            const originalForecastedHours = forecast?.forecastedhours ?? 0;

            if (
              forecast &&
              forecast.forecastid &&
              newNumericValue !== originalForecastedHours
            ) {
              updatedInputValues[currentInputKey] = replaceValue; // Update local state for immediate UI reflection
              replacementsCount++;

              // Set payload according to the requirement with appropriate fallbacks
              const payload = {
                forecastedamt: forecast.forecastedamt ?? 0,
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
                forecastedhours: Number(newNumericValue) || 0,
                createdat: forecast.createdat ?? new Date(0).toISOString(),
                updatedat: new Date().toISOString().split("T")[0],
                displayText: forecast.displayText ?? "",
              };

              console.log(
                "DEBUG: Payload being sent from handleFindReplace:",
                payload
              );

              updates.push(
                axios.put(
                  "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
                  payload,
                  { headers: { "Content-Type": "application/json" } }
                )
              );
            } else if (!forecast || !forecast.forecastid) {
              console.warn(
                `No forecastId found for employee ${emp.empl.emplId}, month ${uniqueKey}. Skipping API update for this cell.`
              );
            } else {
              console.log(
                `Value for ${emp.empl.emplId}-${uniqueKey} did not change for API, skipping update.`
              );
            }
          }
        }
      }
    }

    setInputValues(updatedInputValues);

    try {
      await Promise.all(updates);
      let successMessage = `Found "${findValue}", Replaced with "${replaceValue}" across ${replacementsCount} cells.`;
      if (skippedCount > 0) {
        successMessage += ` (${skippedCount} cells skipped due to being in a closed period.)`;
      }

      if (replacementsCount > 0) {
        console.log(successMessage); // Log to console instead
      } else if (skippedCount > 0) {
        console.info(
          `No replacements made, but ${skippedCount} cells were skipped as they are in a closed period.`
        ); // Log to console instead
      } else {
        console.info(`No occurrences of "${findValue}" found for replacement.`); // Log to console instead
      }
    } catch (err) {
      console.error("Error during batch update:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to replace some values.";
      console.error(`Error replacing values: ${errorMessage}`); // Log to console instead
    } finally {
      // This will now close the modal regardless of success or failure, or scope.
      setShowFindReplace(false);
      setFindValue("");
      setReplaceValue("");
      // Ensure selections are also cleared when the modal closes
      clearSelection();
    }
  };

  // handleRowClick function
  const handleRowClick = (actualEmpIdx) => {
    if (!isEditable) return;
    if (selectedRowIndex === actualEmpIdx) {
      setSelectedRowIndex(null);
      setReplaceScope("all");
    } else {
      setSelectedRowIndex(actualEmpIdx);
      setSelectedColumnKey(null);
      if (showFindReplace) {
        setReplaceScope("row");
      }
    }
  };

  // handleColumnHeaderClick function
  const handleColumnHeaderClick = (uniqueKey) => {
    if (!isEditable) return;
    if (selectedColumnKey === uniqueKey) {
      setSelectedColumnKey(null);
      setReplaceScope("all");
    } else {
      setSelectedColumnKey(uniqueKey);
      setSelectedRowIndex(null);
      if (showFindReplace) {
        setReplaceScope("column");
      }
    }
  };

  // clearSelection function
  const clearSelection = () => {
    setSelectedRowIndex(null);
    setSelectedColumnKey(null);
    setReplaceScope("all");
  };

  if (isForecastLoading || isDurationLoading) {
    return (
      <div className="p-4 font-inter">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-xs text-gray-600">
            Loading forecast data...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
          <strong className="font-bold text-xs">Error: </strong>
          <span className="block sm:inline text-xs">{error}</span>
        </div>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
          <span className="text-xs">No forecast data found for this plan.</span>
        </div>
      </div>
    );
  }

  const visibleEmployees = employees.filter((_, idx) => !hiddenRows[idx]);

  return (
    <div className="p-4 font-inter">
      <h2 className="text-xs font-semibold mb-3 text-gray-800">Hours</h2>
      <div className="flex justify-between items-center mb-4">
        {hasHiddenRows && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
            onClick={showHiddenRows}
          >
            Show Hidden Rows
          </button>
        )}
        <button
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
          onClick={() => {
            if (isEditable) {
              setShowFindReplace(true);
            } else {
              console.warn(
                "Find and Replace is only available when the plan status is 'Working'."
              ); // Log to console instead
            }
          }}
        >
          Find & Replace
        </button>
      </div>

      <div className="synchronized-tables-outer">
        <div className="synchronized-tables-container">
          {/* Left Table (Employee Details) */}
          <div
            className="synchronized-table-scroll border-r border-gray-300"
            style={{ minWidth: 350, maxWidth: 500 }}
          >
            <table className="table-fixed text-xs text-left min-w-max border border-gray-300 bg-white rounded-lg">
              <thead className="bg-blue-100 text-gray-700 sticky-thead">
                <tr
                  style={{
                    height: `${ROW_HEIGHT_DEFAULT}px`,
                    lineHeight: "normal",
                  }}
                >
                  {EMPLOYEE_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={`p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal
                  ${
                    selectedColumnKey && col.key === "total"
                      ? "bg-yellow-100"
                      : ""
                  }
                `}
                      style={{ boxSizing: "border-box", lineHeight: "normal" }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((_, idx) => !hiddenRows[idx])
                  .map((emp, vIdx) => {
                    const actualEmpIdx = employees.findIndex((e) => e === emp);
                    const row = getEmployeeRow(emp, actualEmpIdx);
                    return (
                      <tr
                        key={emp.empl.emplId}
                        className={`even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 
                  ${
                    selectedRowIndex === actualEmpIdx
                      ? "bg-yellow-100 border-yellow-500 border-2"
                      : ""
                  }
                `}
                        style={{
                          height: `${ROW_HEIGHT_DEFAULT}px`,
                          boxSizing: "border-box",
                          lineHeight: "normal",
                          cursor: isEditable ? "pointer" : "default",
                        }}
                        onClick={() => handleRowClick(actualEmpIdx)}
                      >
                        {EMPLOYEE_COLUMNS.map((col) => (
                          <td
                            key={col.key}
                            className={`p-2 border-r border-gray-200 text-xs text-gray-700`}
                            style={{
                              boxSizing: "border-box",
                              lineHeight: "normal",
                            }}
                          >
                            {row[col.key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Right Table (Forecast Hours) */}
          <div className="synchronized-table-scroll" style={{ minWidth: 350 }}>
            <table className="min-w-full text-xs text-center border-collapse border border-gray-300 bg-white rounded-lg">
              <thead className="bg-blue-100 text-gray-700 font-normal sticky-thead">
                <tr
                  style={{
                    height: `${ROW_HEIGHT_DEFAULT}px`,
                    lineHeight: "normal",
                  }}
                >
                  {sortedDurations.map((duration) => {
                    const uniqueKey = `${duration.monthNo}_${duration.year}`;
                    return (
                      <th
                        key={uniqueKey}
                        className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal
                    ${selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""}
                  `}
                        style={{
                          boxSizing: "border-box",
                          lineHeight: "normal",
                          cursor: isEditable ? "pointer" : "default",
                        }}
                        onClick={() => handleColumnHeaderClick(uniqueKey)}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
                            {duration.month}
                          </span>
                          <span className="text-xs text-gray-600 font-normal">
                            {duration.workingHours || 0} hrs
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((_, idx) => !hiddenRows[idx])
                  .map((emp) => {
                    const actualEmpIdx = employees.findIndex((e) => e === emp);
                    const monthHours = getMonthHours(emp);
                    return (
                      <tr
                        key={emp.empl.emplId}
                        className={`even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 
                  ${
                    selectedRowIndex === actualEmpIdx
                      ? "bg-yellow-100 border-yellow-500 border-2"
                      : ""
                  }
                `}
                        style={{
                          height: `${ROW_HEIGHT_DEFAULT}px`,
                          boxSizing: "border-box",
                          lineHeight: "normal",
                          cursor: isEditable ? "pointer" : "default",
                        }}
                        onClick={() => handleRowClick(actualEmpIdx)}
                      >
                        {sortedDurations.map((duration) => {
                          const uniqueKey = `${duration.monthNo}_${duration.year}`;
                          const forecast = monthHours[uniqueKey];
                          const value =
                            inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
                            (forecast && forecast.value !== undefined
                              ? forecast.value
                              : "");
                          const isInputEditable =
                            isEditable &&
                            isMonthEditable(duration, closedPeriod, planType);
                          return (
                            <td
                              key={uniqueKey}
                              className={`py-2 px-3 border-r border-gray-200 text-center min-w-[100px] 
                        ${
                          selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
                        }
                      `}
                              style={{
                                boxSizing: "border-box",
                                lineHeight: "normal",
                              }}
                            >
                              <input
                                type="text"
                                inputMode="numeric"
                                className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-xs text-gray-700 ${
                                  !isInputEditable
                                    ? "cursor-not-allowed text-gray-400"
                                    : ""
                                }`}
                                style={{
                                  width: "55px",
                                  padding: "0px 2px",
                                  height: "20px",
                                  boxSizing: "border-box",
                                  lineHeight: "normal",
                                }}
                                value={value}
                                onChange={(e) =>
                                  handleInputChange(
                                    actualEmpIdx,
                                    uniqueKey,
                                    e.target.value.replace(/[^0-9.]/g, "")
                                  )
                                }
                                onBlur={() =>
                                  handleForecastHoursBlur(
                                    actualEmpIdx,
                                    uniqueKey
                                  )
                                }
                                disabled={!isInputEditable}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Find and Replace Modal */}
      {showFindReplace && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-sm">
            <h3 className="text-lg font-semibold mb-4">
              Find and Replace Hours
            </h3>
            <div className="mb-3">
              <label
                htmlFor="findValue"
                className="block text-gray-700 text-xs font-medium mb-1"
              >
                Find:
              </label>
              <input
                type="text"
                id="findValue"
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
                value={findValue}
                onChange={(e) => setFindValue(e.target.value)}
                placeholder="Value to find (e.g., 100 or empty)"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="replaceValue"
                className="block text-gray-700 text-xs font-medium mb-1"
              >
                Replace with:       
              </label>
              <input
                type="text"
                id="replaceValue"
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
                value={replaceValue}
                onChange={(e) =>
                  setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="New value (e.g., 120 or empty)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Scope:
              </label>
              <div className="flex gap-4 flex-wrap">
                <label className="inline-flex items-center text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="all"
                    checked={replaceScope === "all"}
                    onChange={(e) => {
                      setReplaceScope(e.target.value);
                    }}
                  />
                  <span className="ml-2">All</span>
                </label>
                <label
                  className="inline-flex items-center text-xs cursor-pointer"
                  onClick={() =>
                    selectedRowIndex !== null && setReplaceScope("row")
                  }
                >
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="row"
                    checked={replaceScope === "row"}
                    onChange={(e) => setReplaceScope(e.target.value)}
                    disabled={selectedRowIndex === null}
                  />
                  <span className="ml-2">
                    Selected Row (
                    {selectedRowIndex !== null
                      ? employees[selectedRowIndex]?.empl.emplId
                      : "N/A"}
                    )
                  </span>
                </label>
                <label
                  className="inline-flex items-center text-xs cursor-pointer"
                  onClick={() =>
                    selectedColumnKey !== null && setReplaceScope("column")
                  }
                >
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="column"
                    checked={replaceScope === "column"}
                    onChange={(e) => setReplaceScope(e.target.value)}
                    disabled={selectedColumnKey === null}
                  />
                  <span className="ml-2">
                    Selected Column (
                    {selectedColumnKey
                      ? sortedDurations.find(
                          (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
                        )?.month
                      : "N/A"}
                    )
                  </span>
                </label>
              </div>
              {replaceScope === "row" && selectedRowIndex === null && (
                <p className="text-red-500 text-xs mt-1">
                  Click on an employee row to enable "Selected Row" scope.
                </p>
              )}
              {replaceScope === "column" && selectedColumnKey === null && (
                <p className="text-red-500 text-xs mt-1">
                  Click on a month column to enable "Selected Column" scope.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={clearSelection}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
              >
                Clear Selection
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowFindReplace(false);
                  setFindValue("");
                  setReplaceValue("");
                  clearSelection(); // Also clear selection when cancelling
                }}
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

export default ProjectHoursDetails;
