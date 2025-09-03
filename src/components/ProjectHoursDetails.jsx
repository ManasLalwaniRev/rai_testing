// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const debounceTimeout = useRef(null);
//   // inside your component definition
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   useEffect(() => {
//   const container = verticalScrollRef.current;
//   const firstScroll = firstTableRef.current;
//   const lastScroll = lastTableRef.current;

//   if (!container || !firstScroll || !lastScroll) return;

//   const onScroll = () => {
//     const scrollTop = container.scrollTop;
//     // Sync vertical scroll, inner containers do not have their own vertical scrollbars,
//     // but scrollTop can be set to keep content aligned vertically just in case
//     firstScroll.scrollTop = scrollTop;
//     lastScroll.scrollTop = scrollTop;
//   };

//   container.addEventListener("scroll", onScroll);
//   return () => container.removeEventListener("scroll", onScroll);
// }, []);

//    const fetchEmployees = async () => {
//       if (!planId) return;
//       setIsLoading(true);
//       try {
//         const employeeApi =
//           planType === "EAC"
//             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//         const response = await axios.get(employeeApi);
//         setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         setLocalEmployees([]);
//         if (err.response && err.response.status === 500) {
//           toast.info(
//             'No forecast data available for this plan.',
//             {
//               toastId: "no-forecast-data",
//               autoClose: 3000,
//             }
//           );
//         } else {
//           toast.error(
//             "Failed to load forecast data: " +
//               (err.response?.data?.message || err.message),
//             {
//               toastId: "forecast-error",
//               autoClose: 3000,
//             }
//           );
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//   // Fetch employees locally on planId change
//   useEffect(() => {
//     // const fetchEmployees = async () => {
//     //   if (!planId) return;
//     //   setIsLoading(true);
//     //   try {
//     //     const employeeApi =
//     //       planType === "EAC"
//     //         ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//     //         : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//     //     const response = await axios.get(employeeApi);
//     //     setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     //   } catch (err) {
//     //     setLocalEmployees([]);
//     //     if (err.response && err.response.status === 500) {
//     //       toast.info(
//     //         'No forecast data available for this plan. Click "New" to add entries.',
//     //         {
//     //           toastId: "no-forecast-data",
//     //           autoClose: 3000,
//     //         }
//     //       );
//     //     } else {
//     //       toast.error(
//     //         "Failed to load forecast data: " +
//     //           (err.response?.data?.message || err.message),
//     //         {
//     //           toastId: "forecast-error",
//     //           autoClose: 3000,
//     //         }
//     //       );
//     //     }
//     //   } finally {
//     //     setIsLoading(false);
//     //   }
//     // };

//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(searchTerm)}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   const handleIdChange = (value) => {
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === value
//     );
//     setNewEntry((prev) => ({
//       ...prev,
//       id: value,
//       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
//       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
//       perHourRate: selectedEmployee ? selectedEmployee.perHourRate || "" : "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       plcGlcCode: "",
//     }));
//     setPlcSearch("");
//   };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }

//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//   if (!showNewForm || !isEditable) return;

//   // Validate date range - simple string to Date
//   if (new Date(fillEndDate) < new Date(fillStartDate)) {
//     toast.error("End Period cannot be before Start Period.");
//     return;
//   }

//   const startDateObj = new Date(fillStartDate);
//   const endDateObj = new Date(fillEndDate);

//   const newHours = {};

//   const isDurationInRange = (duration) => {
//     const durationValue = duration.year * 100 + duration.monthNo;

//     const startYear = startDateObj.getFullYear();
//     const startMonth = startDateObj.getMonth() + 1;
//     const startValue = startYear * 100 + startMonth;

//     const endYear = endDateObj.getFullYear();
//     const endMonth = endDateObj.getMonth() + 1;
//     const endValue = endYear * 100 + endMonth;

//     return durationValue >= startValue && durationValue <= endValue;
//   };

//   if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//     const sourceEmp = localEmployees[sourceRowIndex];
//     const sourceMonthHours = getMonthHours(sourceEmp);
//     sortedDurations.forEach((duration) => {
//       if (!isDurationInRange(duration)) return;
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//         newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//       } else {
//         newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//       }
//     });
//   } else if (fillMethod === "Specify Hours") {
//     sortedDurations.forEach((duration) => {
//       if (!isDurationInRange(duration)) return;
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//         newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//       } else if (isMonthEditable(duration, closedPeriod, planType)) {
//         newHours[uniqueKey] = fillHours.toString();
//       }
//     });
//   } else if (fillMethod === "Use Available Hours") {
//     try {
//       // Important: API still uses startDate and endDate variables - keep them as is
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//       );

//       const availableHours = response.data.reduce((acc, d) => {
//         const uniqueKey = `${d.monthNo}_${d.year}`;
//         acc[uniqueKey] = d.workingHours || 0;
//         return acc;
//       }, {});
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//         }
//       });
//     } catch (err) {
//       toast.error("Failed to fetch available hours.", {
//         toastId: "available-hours-error",
//         autoClose: 3000,
//       });
//       return;
//     }
//   } else if (fillMethod === "Use Start Period Hours" && sortedDurations.length > 0) {
//     const firstDuration = sortedDurations[0];
//     if (!isDurationInRange(firstDuration)) {
//       toast.error("Start Period hours are outside the selected duration range.");
//       return;
//     }
//     const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//     const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//     sortedDurations.forEach((duration) => {
//       if (!isDurationInRange(duration)) return;
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//         newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//       } else if (isMonthEditable(duration, closedPeriod, planType)) {
//         newHours[uniqueKey] = firstValue;
//       }
//     });
//   }

//   setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//   setShowFillValues(false);
//   setFillMethod("None");
//   setFillHours(0.0);
//   setSourceRowIndex(null);
// };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", {
//         toastId: "no-plan-id",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setIsDurationLoading(true);

//     const payloadForecasts = sortedDurations.map((duration) => ({
//       forecastedhours:
//         Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       // effectDt: new Date().toISOString(),
//       effectDt: null,
//       plEmployee: null,
//     }));

//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );

//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");

//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       // Re-fetch to update UI with new entry
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err.response?.data?.message ||
//             JSON.stringify(err.response?.data?.errors) ||
//             err.message),
//         {
//           toastId: "save-entry-error",
//           autoClose: 5000,
//         }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

// const handleFindReplace = async () => {
//   if (
//     !isEditable ||
//     findValue === "" ||
//     (replaceScope === "row" && selectedRowIndex === null) ||
//     (replaceScope === "column" && selectedColumnKey === null)
//   ) {
//     toast.warn("Please select a valid scope and enter a value to find.", {
//       toastId: "find-replace-warning",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // Show loading state
//   setIsLoading(true);

//   const updates = [];
//   const updatedInputValues = { ...inputValues };
//   let replacementsCount = 0;
//   let skippedCount = 0;

//   for (const empIdx in localEmployees) {
//     const emp = localEmployees[empIdx];
//     const actualEmpIdx = parseInt(empIdx, 10);

//     if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//       continue;
//     }

//     for (const duration of sortedDurations) {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;

//       if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//         continue;
//       }

//       if (!isMonthEditable(duration, closedPeriod, planType)) {
//         continue;
//       }

//       const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;

//       // Get the actual displayed value
//       let displayedValue;
//       if (inputValues[currentInputKey] !== undefined) {
//         displayedValue = String(inputValues[currentInputKey]);
//       } else {
//         const monthHours = getMonthHours(emp);
//         const forecast = monthHours[uniqueKey];
//         if (forecast && forecast.value !== undefined) {
//           displayedValue = String(forecast.value);
//         } else {
//           displayedValue = "0";
//         }
//       }

//       const findValueTrimmed = findValue.trim();
//       const displayedValueTrimmed = displayedValue.trim();

//       // Matching logic
//       let isMatch = false;

//       // Helper
//      function isZeroLike(val) {
//   // Accept undefined and null as zero-like too
//   if (val === undefined || val === null) return true;

//   if (typeof val === "number") return val === 0;

//   if (typeof val === "string") {
//     const trimmed = val.trim();
//     return (
//       trimmed === "" ||
//       trimmed === "0" ||
//       trimmed === "0.0" ||
//       trimmed === "0.00" ||
//       (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//     );
//   }
//   return false;
// }

//       if (!isNaN(Number(findValueTrimmed)) && Number(findValueTrimmed) === 0) {
//   // If searching for 0, match if displayedValue is zero-like
//   isMatch = isZeroLike(displayedValueTrimmed);
// } else {
//   // Normal match: exact string or numeric equality
//   isMatch = displayedValueTrimmed === findValueTrimmed;
//   if (!isMatch) {
//     const findNum = parseFloat(findValueTrimmed);
//     const displayNum = parseFloat(displayedValueTrimmed);
//     if (!isNaN(findNum) && !isNaN(displayNum)) {
//       isMatch = findNum === displayNum;
//     }
//   }
// }

//       if (isMatch) {
//         const newValue = replaceValue.trim();
//         const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

//         const forecast = getMonthHours(emp)[uniqueKey];

//         // Only proceed if we have a valid forecast with forecastid
//         if (forecast && forecast.forecastid) {
//           // Don't check against API value; check if a change is required for what's currently displayed
//           if (displayedValueTrimmed !== newValue) {
//             updatedInputValues[currentInputKey] = newValue;
//             replacementsCount++;

//             const payload = {
//               forecastedamt: forecast.forecastedamt ?? 0,
//               forecastid: Number(forecast.forecastid),
//               projId: forecast.projId,
//               plId: forecast.plId,
//               emplId: forecast.emplId,
//               dctId: forecast.dctId ?? 0,
//               month: forecast.month,
//               year: forecast.year,
//               totalBurdenCost: forecast.totalBurdenCost ?? 0,
//               burden: forecast.burden ?? 0,
//               ccffRevenue: forecast.ccffRevenue ?? 0,
//               tnmRevenue: forecast.tnmRevenue ?? 0,
//               cost: forecast.cost ?? 0,
//               fringe: forecast.fringe ?? 0,
//               overhead: forecast.overhead ?? 0,
//               gna: forecast.gna ?? 0,
//               [planType === "EAC" ? "actualhours" : "forecastedhours"]: newNumericValue,
//               updatedat: new Date().toISOString().split("T")[0],
//               displayText: forecast.displayText ?? "",
//             };

//             updates.push(
//               axios
//                 .put(
//                   `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                   payload,
//                   { headers: { "Content-Type": "application/json" } }
//                 )
//                 .catch((err) => {
//                   console.error(
//                     "Failed update for payload:",
//                     payload,
//                     err?.response?.data || err.message
//                   );
//                 })
//             );
//           }
//         } else {
//           // Skip cells without existing forecasts and count them
//           console.log(`Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`);
//           skippedCount++;
//         }
//       }
//     }
//   }

//   console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

//   setInputValues(updatedInputValues);
//   try {
//     if (updates.length > 0) {
//       await Promise.all(updates);
//     }

//     // Update local state only for cells that were actually updated
//     setLocalEmployees((prev) => {
//       const updated = [...prev];
//       for (const empIdx in updated) {
//         const emp = updated[empIdx];
//         for (const duration of sortedDurations) {
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           const currentInputKey = `${empIdx}_${uniqueKey}`;
//           if (updatedInputValues[currentInputKey] !== undefined) {
//             if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//               const forecast = emp.emple.plForecasts.find(
//                 (f) => f.month === duration.monthNo && f.year === duration.year
//               );
//               if (forecast) {
//                 const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
//                 if (planType === "EAC") {
//                   forecast.actualhours = newValue;
//                 } else {
//                   forecast.forecastedhours = newValue;
//                 }
//               }
//             }
//           }
//         }
//       }
//       return updated;
//     });

//     if (replacementsCount > 0) {
//       toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//         autoClose: 2000,
//       });
//     }

//     // if (skippedCount > 0) {
//     //   toast.warn(`Skipped ${skippedCount} cells - forecast records must be created first before they can be edited.`, {
//     //     autoClose: 4000,
//     //   });
//     // }

//     if (replacementsCount === 0 && skippedCount === 0) {
//       toast.info("No cells replaced.", { autoClose: 2000 });
//     }

//   } catch (err) {
//     toast.error(
//       "Failed to replace values: " + (err.response?.data?.message || err.message),
//       {
//         toastId: "replace-error",
//         autoClose: 3000,
//       }
//     );
//   } finally {
//     // Hide loading state
//     setIsLoading(false);
//     setShowFindReplace(false);
//     setFindValue("");
//     setReplaceValue("");
//     setSelectedRowIndex(null);
//     setSelectedColumnKey(null);
//     setReplaceScope("all");
//   }
// };

// const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                 onClick={() => isEditable && setShowFindReplace(true)}
//               >
//                 Find / Replace
//               </button>
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}
//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//              {showFillValues && (
//          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//              <h3 className="text-lg font-semibold mb-4">
//                Fill Values to selected record/s
//              </h3>
//              <div className="mb-4">
//                <label className="block text-gray-700 text-xs font-medium mb-1">
//                  Select Fill Method
//                </label>
//                <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                  <option value="Use Start Period Hours">
//                    Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                        (e.target.value === "0" || e.target.value === "")
//                      ) {
//                        e.preventDefault();
//                        setFillHours("");
//                      }
//                    }}
//                    className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                    placeholder="0.00"
//                  />
//                </div>
//              )}
//              <div className="mb-4">
//                <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               {/* <input
//                 type="text"
//                 value={startDate}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
//               /> */}
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               {/* <input
//                 type="text"
//                 value={endDate}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
//               /> */}
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//          </div>
//        )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="synchronized-tables-container flex">
//           <div className="synchronized-table-scroll first ">
//             <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//               <thead className="sticky-thead">
//                 <tr
//                   style={{
//                     height: `${ROW_HEIGHT_DEFAULT}px`,
//                     lineHeight: "normal",
//                   }}
//                 >
//                   {EMPLOYEE_COLUMNS.map((col) => (
//                     <th
//                       key={col.key}
//                       className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Reduced padding and min-width
//                     >
//                       {col.label}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewForm && (
//                   <tr
//                     key="new-entry"
//                     className="bg-gray-50"
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {console.log("Rendering new entry form with:", {
//                       employeeSuggestions,
//                       laborAccounts,
//                       plcOptions,
//                       plcSearch,
//                     })}
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <select
//                         name="idType"
//                         value={newEntry.idType || ""}
//                         onChange={(e) =>
//                           setNewEntry({ ...newEntry, idType: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {ID_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={(e) => handleIdChange(e.target.value)}
//                         className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
//                         list="employee-id-list"
//                         placeholder="Enter ID"
//                       />
//                       <datalist id="employee-id-list">
//                         {employeeSuggestions
//                           .filter(
//                             (emp) =>
//                               emp.emplId && typeof emp.emplId === "string"
//                           )
//                           .map((emp, index) => (
//                             <option
//                               key={`${emp.emplId}-${index}`}
//                               value={emp.emplId}
//                             >
//                               {emp.lastName && emp.firstName
//                                 ? `${emp.lastName}, ${emp.firstName}`
//                                 : emp.lastName || emp.firstName || emp.emplId}
//                             </option>
//                           ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="name"
//                         value={
//                           newEntry.idType === "Vendor"
//                             ? newEntry.lastName || newEntry.firstName || ""
//                             : newEntry.lastName && newEntry.firstName
//                             ? `${newEntry.lastName}, ${newEntry.firstName}`
//                             : newEntry.lastName || newEntry.firstName || ""
//                         }
//                         readOnly
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                         placeholder="Name (auto-filled)"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="acctId"
//                         value={newEntry.acctId}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, acctId: e.target.value })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         list="account-list"
//                         placeholder="Enter Account"
//                         disabled={!isBudPlan}
//                       />
//                       <datalist id="account-list">
//                         {laborAccounts.map((account, index) => (
//                           <option
//                             key={`${account.id}-${index}`}
//                             value={account.id}
//                           >
//                             {account.id}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, orgId: e.target.value })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         placeholder="Enter Organization"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="plcGlcCode"
//                         value={newEntry.plcGlcCode}
//                         onChange={(e) =>
//                           isBudPlan && handlePlcInputChange(e.target.value)
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         list="plc-list"
//                         placeholder="Enter Plc"
//                         disabled={!isBudPlan}
//                       />
//                       <datalist id="plc-list">
//                         {plcOptions.map((plc, index) => (
//                           <option
//                             key={`${plc.value}-${index}`}
//                             value={plc.value}
//                           >
//                             {plc.label}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="checkbox"
//                         name="isRev"
//                         checked={newEntry.isRev}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isRev: e.target.checked })
//                         }
//                         className="w-4 h-4"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="checkbox"
//                         name="isBrd"
//                         checked={newEntry.isBrd}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isBrd: e.target.checked })
//                         }
//                         className="w-4 h-4"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="status"
//                         value={newEntry.status}
//                         onChange={(e) =>
//                           setNewEntry({ ...newEntry, status: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Enter Status"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       <input
//                         type="text"
//                         name="perHourRate"
//                         value={newEntry.perHourRate}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({
//                             ...newEntry,
//                             perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
//                           })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         placeholder="Enter Hour Rate"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Reduced padding */}
//                       {Object.values(newEntryPeriodHours)
//                         .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                         .toFixed(2)}
//                     </td>
//                   </tr>
//                 )}
//                 {localEmployees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = localEmployees.findIndex(
//                       (e) => e === emp
//                     );
//                     const row = getEmployeeRow(emp, actualEmpIdx);
//                     const editedData = editedEmployeeData[actualEmpIdx] || {};
//                     return (
//                       <tr
//                         key={`employee-${actualEmpIdx}`}
//                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                           selectedRowIndex === actualEmpIdx
//                             ? "bg-yellow-100"
//                             : "even:bg-gray-50"
//                         }`}
//                         style={{
//                           height: `${ROW_HEIGHT_DEFAULT}px`,
//                           lineHeight: "normal",
//                           cursor: isEditable ? "pointer" : "default",
//                         }}
//                         onClick={() => handleRowClick(actualEmpIdx)}
//                       >
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {row.idType}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {row.emplId}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {row.name}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.acctId !== undefined
//                                   ? editedData.acctId
//                                   : row.acctId
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "acctId",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               list="account-list"
//                             />
//                           ) : (
//                             row.acctId
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.orgId !== undefined
//                                   ? editedData.orgId
//                                   : row.orgId
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "orgId",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             />
//                           ) : (
//                             row.orgId
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.glcPlc !== undefined
//                                   ? editedData.glcPlc
//                                   : row.glcPlc
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "glcPlc",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               list="plc-list"
//                             />
//                           ) : (
//                             row.glcPlc
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="checkbox"
//                               checked={
//                                 editedData.isRev !== undefined
//                                   ? editedData.isRev
//                                   : emp.emple.isRev
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "isRev",
//                                   e.target.checked
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-4 h-4"
//                             />
//                           ) : (
//                             row.isRev
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="checkbox"
//                               checked={
//                                 editedData.isBrd !== undefined
//                                   ? editedData.isBrd
//                                   : emp.emple.isBrd
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "isBrd",
//                                   e.target.checked
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-4 h-4"
//                             />
//                           ) : (
//                             row.isBrd
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {row.status}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.perHourRate !== undefined
//                                   ? editedData.perHourRate
//                                   : row.perHourRate
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "perHourRate",
//                                   e.target.value.replace(/[^0-9.]/g, "")
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             />
//                           ) : (
//                             row.perHourRate
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {" "}
//                           {/* Reduced padding and min-width */}
//                           {row.total}
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>

//           <div className="synchronized-table-scroll last">
//             <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//               <thead className="sticky-thead">
//                 <tr
//                   style={{
//                     height: `${ROW_HEIGHT_DEFAULT}px`,
//                     lineHeight: "normal",
//                   }}
//                 >
//                   {sortedDurations.map((duration) => {
//                     const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                     return (
//                       <th
//                         key={uniqueKey}
//                         className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                           selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
//                         }`}
//                         style={{ cursor: isEditable ? "pointer" : "default" }}
//                         onClick={() => handleColumnHeaderClick(uniqueKey)}
//                       >
//                         <div className="flex flex-col items-center justify-center h-full">
//                           <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                             {duration.month}
//                           </span>
//                           <span className="text-xs text-gray-600 font-normal">
//                             {duration.workingHours || 0} hrs
//                           </span>
//                         </div>
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewForm && (
//                   <tr
//                     key="new-entry"
//                     className="bg-gray-50"
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       const isInputEditable =
//                         isEditable &&
//                         isMonthEditable(duration, closedPeriod, planType);
//                       return (
//                         <td
//                           key={`new-${uniqueKey}`}
//                           className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                             planType === "EAC"
//                               ? isInputEditable
//                                 ? "bg-green-50"
//                                 : "bg-gray-200"
//                               : ""
//                           }`}
//                         >
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             value={newEntryPeriodHours[uniqueKey] || ""}
//                             onChange={(e) =>
//                               isInputEditable &&
//                               setNewEntryPeriodHours((prev) => ({
//                                 ...prev,
//                                 [uniqueKey]: e.target.value.replace(
//                                   /[^0-9.]/g,
//                                   ""
//                                 ),
//                               }))
//                             }
//                             className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                               !isInputEditable
//                                 ? "cursor-not-allowed text-gray-400"
//                                 : "text-gray-700"
//                             }`}
//                             disabled={!isInputEditable}
//                             placeholder="Enter Hours"
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 )}
//                 {localEmployees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = localEmployees.findIndex(
//                       (e) => e === emp
//                     );
//                     const monthHours = getMonthHours(emp);
//                     return (
//                       <tr
//                         key={`hours-${actualEmpIdx}`}
//                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                           selectedRowIndex === actualEmpIdx
//                             ? "bg-yellow-100"
//                             : "even:bg-gray-50"
//                         }`}
//                         style={{
//                           height: `${ROW_HEIGHT_DEFAULT}px`,
//                           lineHeight: "normal",
//                           cursor: isEditable ? "pointer" : "default",
//                         }}
//                         onClick={() => handleRowClick(actualEmpIdx)}
//                       >
//                         {sortedDurations.map((duration) => {
//                           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                           const forecast = monthHours[uniqueKey];
//                           const value =
//                             inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                             (forecast?.value !== undefined
//                               ? forecast.value
//                               : "0");
//                           const isInputEditable =
//                             isEditable &&
//                             isMonthEditable(duration, closedPeriod, planType);
//                           return (
//                             <td
//                               key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                               className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                 selectedColumnKey === uniqueKey
//                                   ? "bg-yellow-100"
//                                   : ""
//                               } ${
//                                 planType === "EAC"
//                                   ? isInputEditable
//                                     ? "bg-green-50"
//                                     : "bg-gray-200"
//                                   : ""
//                               }`}
//                             >
//                               <input
//                                 type="text"
//                                 inputMode="numeric"
//                                 className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                   !isInputEditable
//                                     ? "cursor-not-allowed text-gray-400"
//                                     : "text-gray-700"
//                                 }`}
//                                 value={value}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={(e) =>
//                                   handleForecastHoursBlur(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 disabled={!isInputEditable}
//                                 placeholder="Enter Hours"
//                               />
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       )}

//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const debounceTimeout = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     // Check newEntry for non-default values
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     // Check if newEntryPeriodHours or inputValues have entries
//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified = Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(searchTerm)}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   const handleIdChange = (value) => {
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === value
//     );
//     setNewEntry((prev) => ({
//       ...prev,
//       id: value,
//       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
//       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
//       perHourRate: selectedEmployee ? selectedEmployee.perHourRate || "" : "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       plcGlcCode: "",
//     }));
//     setPlcSearch("");
//   };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }

//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (fillMethod === "Use Start Period Hours" && sortedDurations.length > 0) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error("Start Period hours are outside the selected duration range.");
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", {
//         toastId: "no-plan-id",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setIsDurationLoading(true);

//     const payloadForecasts = sortedDurations.map((duration) => ({
//       forecastedhours:
//         Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));

//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );

//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");

//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err.response?.data?.message ||
//             JSON.stringify(err.response?.data?.errors) ||
//             err.message),
//         {
//           toastId: "save-entry-error",
//           autoClose: 5000,
//         }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (!isNaN(Number(findValueTrimmed)) && Number(findValueTrimmed) === 0) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]: newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) => f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " + (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                 onClick={() => isEditable && setShowFindReplace(true)}
//               >
//                 Find / Replace
//               </button>
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}
//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="synchronized-tables-container flex">
//           <div className="synchronized-table-scroll first">
//             <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//               <thead className="sticky-thead">
//                 <tr
//                   style={{
//                     height: `${ROW_HEIGHT_DEFAULT}px`,
//                     lineHeight: "normal",
//                   }}
//                 >
//                   {EMPLOYEE_COLUMNS.map((col) => (
//                     <th
//                       key={col.key}
//                       className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                     >
//                       {col.label}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewForm && (
//                   <tr
//                     key="new-entry"
//                     className="bg-gray-50"
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <select
//                         name="idType"
//                         value={newEntry.idType || ""}
//                         onChange={(e) =>
//                           setNewEntry({ ...newEntry, idType: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {ID_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={(e) => handleIdChange(e.target.value)}
//                         className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
//                         list="employee-id-list"
//                         placeholder="Enter ID"
//                       />
//                       <datalist id="employee-id-list">
//                         {employeeSuggestions
//                           .filter(
//                             (emp) =>
//                               emp.emplId && typeof emp.emplId === "string"
//                           )
//                           .map((emp, index) => (
//                             <option
//                               key={`${emp.emplId}-${index}`}
//                               value={emp.emplId}
//                             >
//                               {emp.lastName && emp.firstName
//                                 ? `${emp.lastName}, ${emp.firstName}`
//                                 : emp.lastName || emp.firstName || emp.emplId}
//                             </option>
//                           ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="name"
//                         value={
//                           newEntry.idType === "Vendor"
//                             ? newEntry.lastName || newEntry.firstName || ""
//                             : newEntry.lastName && newEntry.firstName
//                             ? `${newEntry.lastName}, ${newEntry.firstName}`
//                             : newEntry.lastName || newEntry.firstName || ""
//                         }
//                         readOnly
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                         placeholder="Name (auto-filled)"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="acctId"
//                         value={newEntry.acctId}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, acctId: e.target.value })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         list="account-list"
//                         placeholder="Enter Account"
//                         disabled={!isBudPlan}
//                       />
//                       <datalist id="account-list">
//                         {laborAccounts.map((account, index) => (
//                           <option
//                             key={`${account.id}-${index}`}
//                             value={account.id}
//                           >
//                             {account.id}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, orgId: e.target.value })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         placeholder="Enter Organization"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlcCode"
//                         value={newEntry.plcGlcCode}
//                         onChange={(e) =>
//                           isBudPlan && handlePlcInputChange(e.target.value)
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         list="plc-list"
//                         placeholder="Enter Plc"
//                         disabled={!isBudPlan}
//                       />
//                       <datalist id="plc-list">
//                         {plcOptions.map((plc, index) => (
//                           <option
//                             key={`${plc.value}-${index}`}
//                             value={plc.value}
//                           >
//                             {plc.label}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="isRev"
//                         checked={newEntry.isRev}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isRev: e.target.checked })
//                         }
//                         className="w-4 h-4"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="isBrd"
//                         checked={newEntry.isBrd}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isBrd: e.target.checked })
//                         }
//                         className="w-4 h-4"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="status"
//                         value={newEntry.status}
//                         onChange={(e) =>
//                           setNewEntry({ ...newEntry, status: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Enter Status"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="perHourRate"
//                         value={newEntry.perHourRate}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({
//                             ...newEntry,
//                             perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
//                           })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         placeholder="Enter Hour Rate"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {Object.values(newEntryPeriodHours)
//                         .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                         .toFixed(2)}
//                     </td>
//                   </tr>
//                 )}
//                 {localEmployees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = localEmployees.findIndex(
//                       (e) => e === emp
//                     );
//                     const row = getEmployeeRow(emp, actualEmpIdx);
//                     const editedData = editedEmployeeData[actualEmpIdx] || {};
//                     return (
//                       <tr
//                         key={`employee-${actualEmpIdx}`}
//                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                           selectedRowIndex === actualEmpIdx
//                             ? "bg-yellow-100"
//                             : "even:bg-gray-50"
//                         }`}
//                         style={{
//                           height: `${ROW_HEIGHT_DEFAULT}px`,
//                           lineHeight: "normal",
//                           cursor: isEditable ? "pointer" : "default",
//                         }}
//                         onClick={() => handleRowClick(actualEmpIdx)}
//                       >
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.idType}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.emplId}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.name}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.acctId !== undefined
//                                   ? editedData.acctId
//                                   : row.acctId
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "acctId",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               list="account-list"
//                             />
//                           ) : (
//                             row.acctId
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.orgId !== undefined
//                                   ? editedData.orgId
//                                   : row.orgId
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "orgId",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             />
//                           ) : (
//                             row.orgId
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.glcPlc !== undefined
//                                   ? editedData.glcPlc
//                                   : row.glcPlc
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "glcPlc",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               list="plc-list"
//                             />
//                           ) : (
//                             row.glcPlc
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="checkbox"
//                               checked={
//                                 editedData.isRev !== undefined
//                                   ? editedData.isRev
//                                   : emp.emple.isRev
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "isRev",
//                                   e.target.checked
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-4 h-4"
//                             />
//                           ) : (
//                             row.isRev
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="checkbox"
//                               checked={
//                                 editedData.isBrd !== undefined
//                                   ? editedData.isBrd
//                                   : emp.emple.isBrd
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "isBrd",
//                                   e.target.checked
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-4 h-4"
//                             />
//                           ) : (
//                             row.isBrd
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.status}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.perHourRate !== undefined
//                                   ? editedData.perHourRate
//                                   : row.perHourRate
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "perHourRate",
//                                   e.target.value.replace(/[^0-9.]/g, "")
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             />
//                           ) : (
//                             row.perHourRate
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.total}
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>

//           <div className="synchronized-table-scroll last">
//             <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//               <thead className="sticky-thead">
//                 <tr
//                   style={{
//                     height: `${ROW_HEIGHT_DEFAULT}px`,
//                     lineHeight: "normal",
//                   }}
//                 >
//                   {sortedDurations.map((duration) => {
//                     const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                     return (
//                       <th
//                         key={uniqueKey}
//                         className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                           selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
//                         }`}
//                         style={{ cursor: isEditable ? "pointer" : "default" }}
//                         onClick={() => handleColumnHeaderClick(uniqueKey)}
//                       >
//                         <div className="flex flex-col items-center justify-center h-full">
//                           <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                             {duration.month}
//                           </span>
//                           <span className="text-xs text-gray-600 font-normal">
//                             {duration.workingHours || 0} hrs
//                           </span>
//                         </div>
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewForm && (
//                   <tr
//                     key="new-entry"
//                     className="bg-gray-50"
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       const isInputEditable =
//                         isEditable &&
//                         isMonthEditable(duration, closedPeriod, planType);
//                       return (
//                         <td
//                           key={`new-${uniqueKey}`}
//                           className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                             planType === "EAC"
//                               ? isInputEditable
//                                 ? "bg-green-50"
//                                 : "bg-gray-200"
//                               : ""
//                           }`}
//                         >
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             value={newEntryPeriodHours[uniqueKey] || ""}
//                             onChange={(e) =>
//                               isInputEditable &&
//                               setNewEntryPeriodHours((prev) => ({
//                                 ...prev,
//                                 [uniqueKey]: e.target.value.replace(
//                                   /[^0-9.]/g,
//                                   ""
//                                 ),
//                               }))
//                             }
//                             className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                               !isInputEditable
//                                 ? "cursor-not-allowed text-gray-400"
//                                 : "text-gray-700"
//                             }`}
//                             disabled={!isInputEditable}
//                             placeholder="Enter Hours"
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 )}
//                 {localEmployees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = localEmployees.findIndex(
//                       (e) => e === emp
//                     );
//                     const monthHours = getMonthHours(emp);
//                     return (
//                       <tr
//                         key={`hours-${actualEmpIdx}`}
//                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                           selectedRowIndex === actualEmpIdx
//                             ? "bg-yellow-100"
//                             : "even:bg-gray-50"
//                         }`}
//                         style={{
//                           height: `${ROW_HEIGHT_DEFAULT}px`,
//                           lineHeight: "normal",
//                           cursor: isEditable ? "pointer" : "default",
//                         }}
//                         onClick={() => handleRowClick(actualEmpIdx)}
//                       >
//                         {sortedDurations.map((duration) => {
//                           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                           const forecast = monthHours[uniqueKey];
//                           const value =
//                             inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                             (forecast?.value !== undefined
//                               ? forecast.value
//                               : "0");
//                           const isInputEditable =
//                             isEditable &&
//                             isMonthEditable(duration, closedPeriod, planType);
//                           return (
//                             <td
//                               key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                               className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                 selectedColumnKey === uniqueKey
//                                   ? "bg-yellow-100"
//                                   : ""
//                               } ${
//                                 planType === "EAC"
//                                   ? isInputEditable
//                                     ? "bg-green-50"
//                                     : "bg-gray-200"
//                                   : ""
//                               }`}
//                             >
//                               <input
//                                 type="text"
//                                 inputMode="numeric"
//                                 className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                   !isInputEditable
//                                     ? "cursor-not-allowed text-gray-400"
//                                     : "text-gray-700"
//                                 }`}
//                                 value={value}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={(e) =>
//                                   handleForecastHoursBlur(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 disabled={!isInputEditable}
//                                 placeholder="Enter Hours"
//                               />
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const debounceTimeout = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     // Check newEntry for non-default values
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     // Check if newEntryPeriodHours or inputValues have entries
//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified = Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(searchTerm)}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   const handleIdChange = (value) => {
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === value
//     );
//     setNewEntry((prev) => ({
//       ...prev,
//       id: value,
//       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
//       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
//       perHourRate: selectedEmployee ? selectedEmployee.perHourRate || "" : "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       plcGlcCode: "",
//     }));
//     setPlcSearch("");
//   };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }
//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (fillMethod === "Use Start Period Hours" && sortedDurations.length > 0) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error("Start Period hours are outside the selected duration range.");
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", {
//         toastId: "no-plan-id",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setIsDurationLoading(true);

//     const payloadForecasts = durations.map((duration) => ({
//       forecastedhours:
//         Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));

//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );

//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");

//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err.response?.data?.message ||
//             JSON.stringify(err.response?.data?.errors) ||
//             err.message),
//         {
//           toastId: "save-entry-error",
//           autoClose: 5000,
//         }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (!isNaN(Number(findValueTrimmed)) && Number(findValueTrimmed) === 0) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]: newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) => f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " + (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {/* {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                 onClick={() => isEditable && setShowFindReplace(true)}
//               >
//                 Find / Replace
//               </button>
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )} */}
//           {isEditable && (
//   <>
//     <button
//       onClick={() => setShowNewForm((prev) => !prev)}
//       className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//     >
//       {showNewForm ? "Cancel" : "New"}
//     </button>
//     {!showNewForm && (  // <-- Add this condition to hide when showNewForm is true
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//         onClick={() => isEditable && setShowFindReplace(true)}
//       >
//         Find / Replace
//       </button>
//     )}
//     {showNewForm && (
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//         onClick={() => isEditable && setShowFillValues(true)}
//       >
//         Fill Values
//       </button>
//     )}
//   </>
// )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="synchronized-tables-container flex">
//           <div className="synchronized-table-scroll first">
//             <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//               <thead className="sticky-thead">
//                 <tr
//                   style={{
//                     height: `${ROW_HEIGHT_DEFAULT}px`,
//                     lineHeight: "normal",
//                   }}
//                 >
//                   {EMPLOYEE_COLUMNS.map((col) => (
//                     <th
//                       key={col.key}
//                       className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                     >
//                       {col.label}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewForm && (
//                   <tr
//                     key="new-entry"
//                     className="bg-gray-50"
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <select
//                         name="idType"
//                         value={newEntry.idType || ""}
//                         onChange={(e) =>
//                           setNewEntry({ ...newEntry, idType: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                       >
//                         {ID_TYPE_OPTIONS.map((opt) => (
//                           <option key={opt.value} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={(e) => handleIdChange(e.target.value)}
//                         className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
//                         list="employee-id-list"
//                         placeholder="Enter ID"
//                       />
//                       <datalist id="employee-id-list">
//                         {employeeSuggestions
//                           .filter(
//                             (emp) =>
//                               emp.emplId && typeof emp.emplId === "string"
//                           )
//                           .map((emp, index) => (
//                             <option
//                               key={`${emp.emplId}-${index}`}
//                               value={emp.emplId}
//                             >
//                               {emp.lastName && emp.firstName
//                                 ? `${emp.lastName}, ${emp.firstName}`
//                                 : emp.lastName || emp.firstName || emp.emplId}
//                             </option>
//                           ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="name"
//                         value={
//                           newEntry.idType === "Vendor"
//                             ? newEntry.lastName || newEntry.firstName || ""
//                             : newEntry.lastName && newEntry.firstName
//                             ? `${newEntry.lastName}, ${newEntry.firstName}`
//                             : newEntry.lastName || newEntry.firstName || ""
//                         }
//                         readOnly
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                         placeholder="Name (auto-filled)"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="acctId"
//                         value={newEntry.acctId}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, acctId: e.target.value })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         list="account-list"
//                         placeholder="Enter Account"
//                         disabled={!isBudPlan}
//                       />
//                       <datalist id="account-list">
//                         {laborAccounts.map((account, index) => (
//                           <option
//                             key={`${account.id}-${index}`}
//                             value={account.id}
//                           >
//                             {account.id}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="orgId"
//                         value={newEntry.orgId}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, orgId: e.target.value })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         placeholder="Enter Organization"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="plcGlcCode"
//                         value={newEntry.plcGlcCode}
//                         onChange={(e) =>
//                           isBudPlan && handlePlcInputChange(e.target.value)
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         list="plc-list"
//                         placeholder="Enter Plc"
//                         disabled={!isBudPlan}
//                       />
//                       <datalist id="plc-list">
//                         {plcOptions.map((plc, index) => (
//                           <option
//                             key={`${plc.value}-${index}`}
//                             value={plc.value}
//                           >
//                             {plc.label}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="isRev"
//                         checked={newEntry.isRev}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isRev: e.target.checked })
//                         }
//                         className="w-4 h-4"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       <input
//                         type="checkbox"
//                         name="isBrd"
//                         checked={newEntry.isBrd}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isBrd: e.target.checked })
//                         }
//                         className="w-4 h-4"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="status"
//                         value={newEntry.status}
//                         onChange={(e) =>
//                           setNewEntry({ ...newEntry, status: e.target.value })
//                         }
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         placeholder="Enter Status"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       <input
//                         type="text"
//                         name="perHourRate"
//                         value={newEntry.perHourRate}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({
//                             ...newEntry,
//                             perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
//                           })
//                         }
//                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                         }`}
//                         placeholder="Enter Hour Rate"
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {Object.values(newEntryPeriodHours)
//                         .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                         .toFixed(2)}
//                     </td>
//                   </tr>
//                 )}
//                 {localEmployees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = localEmployees.findIndex(
//                       (e) => e === emp
//                     );
//                     const row = getEmployeeRow(emp, actualEmpIdx);
//                     const editedData = editedEmployeeData[actualEmpIdx] || {};
//                     return (
//                       <tr
//                         key={`employee-${actualEmpIdx}`}
//                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                           selectedRowIndex === actualEmpIdx
//                             ? "bg-yellow-100"
//                             : "even:bg-gray-50"
//                         }`}
//                         style={{
//                           height: `${ROW_HEIGHT_DEFAULT}px`,
//                           lineHeight: "normal",
//                           cursor: isEditable ? "pointer" : "default",
//                         }}
//                         onClick={() => handleRowClick(actualEmpIdx)}
//                       >
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.idType}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.emplId}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.name}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.acctId !== undefined
//                                   ? editedData.acctId
//                                   : row.acctId
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "acctId",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               list="account-list"
//                             />
//                           ) : (
//                             row.acctId
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.orgId !== undefined
//                                   ? editedData.orgId
//                                   : row.orgId
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "orgId",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             />
//                           ) : (
//                             row.orgId
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.glcPlc !== undefined
//                                   ? editedData.glcPlc
//                                   : row.glcPlc
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "glcPlc",
//                                   e.target.value
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               list="plc-list"
//                             />
//                           ) : (
//                             row.glcPlc
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="checkbox"
//                               checked={
//                                 editedData.isRev !== undefined
//                                   ? editedData.isRev
//                                   : emp.emple.isRev
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "isRev",
//                                   e.target.checked
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-4 h-4"
//                             />
//                           ) : (
//                             row.isRev
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="checkbox"
//                               checked={
//                                 editedData.isBrd !== undefined
//                                   ? editedData.isBrd
//                                   : emp.emple.isBrd
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "isBrd",
//                                   e.target.checked
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-4 h-4"
//                             />
//                           ) : (
//                             row.isBrd
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.status}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {isBudPlan && isEditable ? (
//                             <input
//                               type="text"
//                               value={
//                                 editedData.perHourRate !== undefined
//                                   ? editedData.perHourRate
//                                   : row.perHourRate
//                               }
//                               onChange={(e) =>
//                                 handleEmployeeDataChange(
//                                   actualEmpIdx,
//                                   "perHourRate",
//                                   e.target.value.replace(/[^0-9.]/g, "")
//                                 )
//                               }
//                               onBlur={() =>
//                                 handleEmployeeDataBlur(actualEmpIdx, emp)
//                               }
//                               className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                             />
//                           ) : (
//                             row.perHourRate
//                           )}
//                         </td>
//                         <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                           {row.total}
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//           <div className="synchronized-table-scroll last">
//             <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//               <thead className="sticky-thead">
//                 <tr
//                   style={{
//                     height: `${ROW_HEIGHT_DEFAULT}px`,
//                     lineHeight: "normal",
//                   }}
//                 >
//                   {sortedDurations.map((duration) => {
//                     const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                     return (
//                       <th
//                         key={uniqueKey}
//                         className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                           selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
//                         }`}
//                         style={{ cursor: isEditable ? "pointer" : "default" }}
//                         onClick={() => handleColumnHeaderClick(uniqueKey)}
//                       >
//                         <div className="flex flex-col items-center justify-center h-full">
//                           <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                             {duration.month}
//                           </span>
//                           <span className="text-xs text-gray-600 font-normal">
//                             {duration.workingHours || 0} hrs
//                           </span>
//                         </div>
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody>
//                 {showNewForm && (
//                   <tr
//                     key="new-entry"
//                     className="bg-gray-50"
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       const isInputEditable =
//                         isEditable &&
//                         isMonthEditable(duration, closedPeriod, planType);
//                       return (
//                         <td
//                           key={`new-${uniqueKey}`}
//                           className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                             planType === "EAC"
//                               ? isInputEditable
//                                 ? "bg-green-50"
//                                 : "bg-gray-200"
//                               : ""
//                           }`}
//                         >
//                           <input
//                             type="text"
//                             inputMode="numeric"
//                             value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                             onChange={(e) =>
//                               isInputEditable &&
//                               setNewEntryPeriodHours((prev) => ({
//                                 ...prev,
//                                 [uniqueKey]: e.target.value.replace(
//                                   /[^0-9.]/g,
//                                   ""
//                                 ),
//                               }))
//                             }
//                             className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                               !isInputEditable
//                                 ? "cursor-not-allowed text-gray-400"
//                                 : "text-gray-700"
//                             }`}
//                             disabled={!isInputEditable}
//                             placeholder="Enter Hours"
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 )}
//                 {localEmployees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = localEmployees.findIndex(
//                       (e) => e === emp
//                     );
//                     const monthHours = getMonthHours(emp);
//                     return (
//                       <tr
//                         key={`hours-${actualEmpIdx}`}
//                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                           selectedRowIndex === actualEmpIdx
//                             ? "bg-yellow-100"
//                             : "even:bg-gray-50"
//                         }`}
//                         style={{
//                           height: `${ROW_HEIGHT_DEFAULT}px`,
//                           lineHeight: "normal",
//                           cursor: isEditable ? "pointer" : "default",
//                         }}
//                         onClick={() => handleRowClick(actualEmpIdx)}
//                       >
//                         {sortedDurations.map((duration) => {
//                           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                           const forecast = monthHours[uniqueKey];
//                           const value =
//                             inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                             (forecast?.value !== undefined
//                               ? forecast.value
//                               : "0");
//                           const isInputEditable =
//                             isEditable &&
//                             isMonthEditable(duration, closedPeriod, planType);
//                           return (
//                             <td
//                               key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                               className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                 selectedColumnKey === uniqueKey
//                                   ? "bg-yellow-100"
//                                   : ""
//                               } ${
//                                 planType === "EAC"
//                                   ? isInputEditable
//                                     ? "bg-green-50"
//                                     : "bg-gray-200"
//                                   : ""
//                               }`}
//                             >
//                               <input
//                                 type="text"
//                                 inputMode="numeric"
//                                 className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                   !isInputEditable
//                                     ? "cursor-not-allowed text-gray-400"
//                                     : "text-gray-700"
//                                 }`}
//                                 value={value}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={(e) =>
//                                   handleForecastHoursBlur(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 disabled={!isInputEditable}
//                                 placeholder="Enter Hours"
//                               />
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const debounceTimeout = useRef(null);
//   const horizontalScrollRef = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);
//   const vfirstTableRef = useRef(null);
//   const vlastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     // Check newEntry for non-default values
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     // Check if newEntryPeriodHours or inputValues have entries
//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified =
//       Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue =
//         "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   // Vertical sync only
//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = vfirstTableRef.current;
//     const lastScroll = vlastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const container = horizontalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       firstScroll.scrollLeft = scrollLeft;
//       lastScroll.scrollLeft = scrollLeft;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//             searchTerm
//           )}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   const handleIdChange = (value) => {
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === value
//     );
//     setNewEntry((prev) => ({
//       ...prev,
//       id: value,
//       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
//       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
//       perHourRate: selectedEmployee ? selectedEmployee.perHourRate || "" : "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       plcGlcCode: "",
//     }));
//     setPlcSearch("");
//   };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }
//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (
//             planType === "EAC" &&
//             !isMonthEditable(duration, closedPeriod, planType)
//           ) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (
//       fillMethod === "Use Start Period Hours" &&
//       sortedDurations.length > 0
//     ) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error(
//           "Start Period hours are outside the selected duration range."
//         );
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", {
//         toastId: "no-plan-id",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setIsDurationLoading(true);

//     const payloadForecasts = durations.map((duration) => ({
//       forecastedhours:
//         Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));

//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );

//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");

//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err.response?.data?.message ||
//             JSON.stringify(err.response?.data?.errors) ||
//             err.message),
//         {
//           toastId: "save-entry-error",
//           autoClose: 5000,
//         }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (
//           !isNaN(Number(findValueTrimmed)) &&
//           Number(findValueTrimmed) === 0
//         ) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue =
//             newValue === "" ? 0 : parseFloat(newValue) || 0;
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]:
//                   newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(
//       `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
//     );

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) =>
//                     f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue =
//                     parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {/* {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                 onClick={() => isEditable && setShowFindReplace(true)}
//               >
//                 Find / Replace
//               </button>
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )} */}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               {!showNewForm && ( // <-- Add this condition to hide when showNewForm is true
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFindReplace(true)}
//                 >
//                   Find / Replace
//                 </button>
//               )}
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="vertical-scroll-wrapper" ref={verticalScrollRef}>
//           <div className="synchronized-tables-container flex">
//             <div className="synchronized-table-scroll first">
//               <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <th
//                         key={col.key}
//                         className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <select
//                           name="idType"
//                           value={newEntry.idType || ""}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, idType: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         >
//                           {ID_TYPE_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="id"
//                           value={newEntry.id}
//                           onChange={(e) => handleIdChange(e.target.value)}
//                           className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
//                           list="employee-id-list"
//                           placeholder="Enter ID"
//                         />
//                         <datalist id="employee-id-list">
//                           {employeeSuggestions
//                             .filter(
//                               (emp) =>
//                                 emp.emplId && typeof emp.emplId === "string"
//                             )
//                             .map((emp, index) => (
//                               <option
//                                 key={`${emp.emplId}-${index}`}
//                                 value={emp.emplId}
//                               >
//                                 {emp.lastName && emp.firstName
//                                   ? `${emp.lastName}, ${emp.firstName}`
//                                   : emp.lastName || emp.firstName || emp.emplId}
//                               </option>
//                             ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="name"
//                           value={
//                             newEntry.idType === "Vendor"
//                               ? newEntry.lastName || newEntry.firstName || ""
//                               : newEntry.lastName && newEntry.firstName
//                               ? `${newEntry.lastName}, ${newEntry.firstName}`
//                               : newEntry.lastName || newEntry.firstName || ""
//                           }
//                           readOnly
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                           placeholder="Name (auto-filled)"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="acctId"
//                           value={newEntry.acctId}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({ ...newEntry, acctId: e.target.value })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="account-list"
//                           placeholder="Enter Account"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="account-list">
//                           {laborAccounts.map((account, index) => (
//                             <option
//                               key={`${account.id}-${index}`}
//                               value={account.id}
//                             >
//                               {account.id}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="orgId"
//                           value={newEntry.orgId}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({ ...newEntry, orgId: e.target.value })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Organization"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="plcGlcCode"
//                           value={newEntry.plcGlcCode}
//                           onChange={(e) =>
//                             isBudPlan && handlePlcInputChange(e.target.value)
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="plc-list"
//                           placeholder="Enter Plc"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="plc-list">
//                           {plcOptions.map((plc, index) => (
//                             <option
//                               key={`${plc.value}-${index}`}
//                               value={plc.value}
//                             >
//                               {plc.label}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isRev"
//                           checked={newEntry.isRev}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isRev: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isBrd"
//                           checked={newEntry.isBrd}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isBrd: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="status"
//                           value={newEntry.status}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, status: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           placeholder="Enter Status"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="perHourRate"
//                           value={newEntry.perHourRate}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               perHourRate: e.target.value.replace(
//                                 /[^0-9.]/g,
//                                 ""
//                               ),
//                             })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Hour Rate"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         {Object.values(newEntryPeriodHours)
//                           .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                           .toFixed(2)}
//                       </td>
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const row = getEmployeeRow(emp, actualEmpIdx);
//                       const editedData = editedEmployeeData[actualEmpIdx] || {};
//                       return (
//                         <tr
//                           key={`employee-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.idType}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.emplId}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.name}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.acctId !== undefined
//                                     ? editedData.acctId
//                                     : row.acctId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "acctId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="account-list"
//                               />
//                             ) : (
//                               row.acctId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.orgId !== undefined
//                                     ? editedData.orgId
//                                     : row.orgId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "orgId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.orgId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.glcPlc !== undefined
//                                     ? editedData.glcPlc
//                                     : row.glcPlc
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "glcPlc",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="plc-list"
//                               />
//                             ) : (
//                               row.glcPlc
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isRev !== undefined
//                                     ? editedData.isRev
//                                     : emp.emple.isRev
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isRev",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isRev
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isBrd !== undefined
//                                     ? editedData.isBrd
//                                     : emp.emple.isBrd
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isBrd",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isBrd
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.status}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.perHourRate !== undefined
//                                     ? editedData.perHourRate
//                                     : row.perHourRate
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "perHourRate",
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.perHourRate
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.total}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="synchronized-table-scroll last">
//               <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       return (
//                         <th
//                           key={uniqueKey}
//                           className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                             selectedColumnKey === uniqueKey
//                               ? "bg-yellow-100"
//                               : ""
//                           }`}
//                           style={{ cursor: isEditable ? "pointer" : "default" }}
//                           onClick={() => handleColumnHeaderClick(uniqueKey)}
//                         >
//                           <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                               {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                               {duration.workingHours || 0} hrs
//                             </span>
//                           </div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {sortedDurations.map((duration) => {
//                         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                         const isInputEditable =
//                           isEditable &&
//                           isMonthEditable(duration, closedPeriod, planType);
//                         return (
//                           <td
//                             key={`new-${uniqueKey}`}
//                             className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                               planType === "EAC"
//                                 ? isInputEditable
//                                   ? "bg-green-50"
//                                   : "bg-gray-200"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               type="text"
//                               inputMode="numeric"
//                               value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                               onChange={(e) =>
//                                 isInputEditable &&
//                                 setNewEntryPeriodHours((prev) => ({
//                                   ...prev,
//                                   [uniqueKey]: e.target.value.replace(
//                                     /[^0-9.]/g,
//                                     ""
//                                   ),
//                                 }))
//                               }
//                               className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                 !isInputEditable
//                                   ? "cursor-not-allowed text-gray-400"
//                                   : "text-gray-700"
//                               }`}
//                               disabled={!isInputEditable}
//                               placeholder="Enter Hours"
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const monthHours = getMonthHours(emp);
//                       return (
//                         <tr
//                           key={`hours-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           {sortedDurations.map((duration) => {
//                             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                             const forecast = monthHours[uniqueKey];
//                             const value =
//                               inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                               (forecast?.value !== undefined
//                                 ? forecast.value
//                                 : "0");
//                             const isInputEditable =
//                               isEditable &&
//                               isMonthEditable(duration, closedPeriod, planType);
//                             return (
//                               <td
//                                 key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                                 className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                   selectedColumnKey === uniqueKey
//                                     ? "bg-yellow-100"
//                                     : ""
//                                 } ${
//                                   planType === "EAC"
//                                     ? isInputEditable
//                                       ? "bg-green-50"
//                                       : "bg-gray-200"
//                                     : ""
//                                 }`}
//                               >
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                     !isInputEditable
//                                       ? "cursor-not-allowed text-gray-400"
//                                       : "text-gray-700"
//                                   }`}
//                                   value={value}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value.replace(/[^0-9.]/g, "")
//                                     )
//                                   }
//                                   onBlur={(e) =>
//                                     handleForecastHoursBlur(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isInputEditable}
//                                   placeholder="Enter Hours"
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const debounceTimeout = useRef(null);
//   const horizontalScrollRef = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);
//   const vfirstTableRef = useRef(null);
//   const vlastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     // Check newEntry for non-default values
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     // Check if newEntryPeriodHours or inputValues have entries
//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified =
//       Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue =
//         "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   // Vertical sync only
//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = vfirstTableRef.current;
//     const lastScroll = vlastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const container = horizontalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       firstScroll.scrollLeft = scrollLeft;
//       lastScroll.scrollLeft = scrollLeft;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "",
//                   orgId: emp.orgId || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "",
//                   orgId: emp.orgId || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//             searchTerm
//           )}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   // const validateAndPopulateEmployeeData = (empId) => {
//   //   if (!empId.trim()) {
//   //     return null;
//   //   }

//   //   const selectedEmployee = employeeSuggestions.find(
//   //     (emp) => emp.emplId === empId
//   //   );

//   //   if (!selectedEmployee) {
//   //     toast.error("Please enter a valid Employee ID from the available list.", {
//   //       toastId: "invalid-employee-id",
//   //       autoClose: 3000,
//   //     });
//   //     return null;
//   //   }

//   //   return selectedEmployee;
//   // };

//   // const handleIdChange = (value) => {
//   //   const trimmedValue = value.trim();

//   //   if (!trimmedValue) {
//   //     // Clear all fields when ID is empty
//   //     setNewEntry((prev) => ({
//   //       ...prev,
//   //       id: "",
//   //       firstName: "",
//   //       lastName: "",
//   //       perHourRate: "",
//   //       orgId: "",
//   //       plcGlcCode: "",
//   //       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //     }));
//   //     setPlcSearch("");
//   //     return;
//   //   }

//   //   const selectedEmployee = validateAndPopulateEmployeeData(trimmedValue);

//   //   if (selectedEmployee) {
//   //     setNewEntry((prev) => ({
//   //       ...prev,
//   //       id: trimmedValue,
//   //       firstName: selectedEmployee.firstName || "",
//   //       lastName: selectedEmployee.lastName || "",
//   //       perHourRate: selectedEmployee.perHourRate || "",
//   //       orgId: selectedEmployee.orgId || "",
//   //       plcGlcCode: selectedEmployee.plc || "",
//   //       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //     }));
//   //     setPlcSearch(selectedEmployee.plc || "");
//   //   } else {
//   //     // Keep the entered ID but don't populate other fields for invalid IDs
//   //     setNewEntry((prev) => ({
//   //       ...prev,
//   //       id: trimmedValue,
//   //     }));
//   //   }
//   // };
//   const handleIdChange = (value) => {
//   const trimmedValue = value.trim();

//   // Always update the ID field regardless of validity
//   setNewEntry((prev) => ({
//     ...prev,
//     id: trimmedValue,
//   }));

//   if (!trimmedValue) {
//     // Clear all fields when ID is empty
//     setNewEntry((prev) => ({
//       ...prev,
//       id: "",
//       firstName: "",
//       lastName: "",
//       perHourRate: "",
//       orgId: "",
//       plcGlcCode: "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//     }));
//     setPlcSearch("");
//     return;
//   }

//   // Only validate and populate if we have employee suggestions loaded
//   if (employeeSuggestions.length > 0) {
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === trimmedValue
//     );

//     if (selectedEmployee) {
//       // Valid employee found - populate fields
//       setNewEntry((prev) => ({
//         ...prev,
//         id: trimmedValue,
//         firstName: selectedEmployee.firstName || "",
//         lastName: selectedEmployee.lastName || "",
//         perHourRate: selectedEmployee.perHourRate || selectedEmployee.hrRate || "",
//         orgId: selectedEmployee.orgId || "",
//         plcGlcCode: selectedEmployee.plc || "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch(selectedEmployee.plc || "");
//     } else {
//       // Only show error if the user has typed what appears to be a complete ID
//       // Check if the input looks like a complete employee ID (you can adjust this logic)
//       if (trimmedValue.length >= 3) { // Minimum length check
//         toast.error("Please enter a valid Employee ID from the available list.", {
//           toastId: "invalid-employee-id",
//           autoClose: 3000,
//         });
//       }

//       // Don't auto-populate fields for invalid IDs, but keep the entered value
//       setNewEntry((prev) => ({
//         ...prev,
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch("");
//     }
//   }
// };

//   // const handleIdBlur = (value) => {
//   //   const trimmedValue = value.trim();

//   //   if (trimmedValue && employeeSuggestions.length > 0) {
//   //     const selectedEmployee = employeeSuggestions.find(
//   //       (emp) => emp.emplId === trimmedValue
//   //     );

//   //     if (!selectedEmployee) {
//   //       toast.error("Please enter a valid Employee ID from the available list.", {
//   //         toastId: "invalid-employee-id",
//   //         autoClose: 3000,
//   //       });
//   //     }
//   //   }
//   // };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }
//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (
//             planType === "EAC" &&
//             !isMonthEditable(duration, closedPeriod, planType)
//           ) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (
//       fillMethod === "Use Start Period Hours" &&
//       sortedDurations.length > 0
//     ) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error(
//           "Start Period hours are outside the selected duration range."
//         );
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {

//     if (!planId) {
//     toast.error("Plan ID is required to save a new entry.", {
//       toastId: "no-plan-id",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // Validate employee ID before saving
//   if (!newEntry.id.trim()) {
//     toast.error("Employee ID is required.", {
//       toastId: "no-employee-id",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // Check if the entered ID exists in suggestions
//   if (employeeSuggestions.length > 0) {
//     const validEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === newEntry.id.trim()
//     );

//     if (!validEmployee) {
//       toast.error("Please enter a valid Employee ID from the available list.", {
//         toastId: "invalid-employee-id-save",
//         autoClose: 3000,
//       });
//       return;
//     }
//   }

//   setIsDurationLoading(true);
//     // if (!planId) {
//     //   toast.error("Plan ID is required to save a new entry.", {
//     //     toastId: "no-plan-id",
//     //     autoClose: 3000,
//     //   });
//     //   return;
//     // }

//     // // Validate employee ID before saving
//     // if (!newEntry.id.trim()) {
//     //   toast.error("Employee ID is required.", {
//     //     toastId: "no-employee-id",
//     //     autoClose: 3000,
//     //   });
//     //   return;
//     // }

//     // const validEmployee = validateAndPopulateEmployeeData(newEntry.id);
//     // if (!validEmployee) {
//     //   return; // Error already shown in validation function
//     // }

//     // setIsDurationLoading(true);

//     const payloadForecasts = durations.map((duration) => ({
//       forecastedhours:
//         Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));

//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };

//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );

//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");

//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err.response?.data?.message ||
//             JSON.stringify(err.response?.data?.errors) ||
//             err.message),
//         {
//           toastId: "save-entry-error",
//           autoClose: 5000,
//         }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (
//           !isNaN(Number(findValueTrimmed)) &&
//           Number(findValueTrimmed) === 0
//         ) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue =
//             newValue === "" ? 0 : parseFloat(newValue) || 0;
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]:
//                   newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(
//       `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
//     );

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) =>
//                     f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue =
//                     parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               {!showNewForm && ( // <-- Add this condition to hide when showNewForm is true
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFindReplace(true)}
//                 >
//                   Find / Replace
//                 </button>
//               )}
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="vertical-scroll-wrapper" ref={verticalScrollRef}>
//           <div className="synchronized-tables-container flex">
//             <div className="synchronized-table-scroll first">
//               <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <th
//                         key={col.key}
//                         className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <select
//                           name="idType"
//                           value={newEntry.idType || ""}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, idType: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         >
//                           {ID_TYPE_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="id"
//                           value={newEntry.id}
//                           onChange={(e) => handleIdChange(e.target.value)}
//                           // onBlur={(e) => handleIdBlur(e.target.value)}
//                           className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
//                           list="employee-id-list"
//                           placeholder="Enter ID"
//                         />
//                         <datalist id="employee-id-list">
//                           {employeeSuggestions
//                             .filter(
//                               (emp) =>
//                                 emp.emplId && typeof emp.emplId === "string"
//                             )
//                             .map((emp, index) => (
//                               <option
//                                 key={`${emp.emplId}-${index}`}
//                                 value={emp.emplId}
//                               >
//                                 {emp.lastName && emp.firstName
//                                   ? `${emp.lastName}, ${emp.firstName}`
//                                   : emp.lastName || emp.firstName || emp.emplId}
//                               </option>
//                             ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="name"
//                           value={
//                             newEntry.idType === "Vendor"
//                               ? newEntry.lastName || newEntry.firstName || ""
//                               : newEntry.lastName && newEntry.firstName
//                               ? `${newEntry.lastName}, ${newEntry.firstName}`
//                               : newEntry.lastName || newEntry.firstName || ""
//                           }
//                           readOnly
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                           placeholder="Name (auto-filled)"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="acctId"
//                           value={newEntry.acctId}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({ ...newEntry, acctId: e.target.value })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="account-list"
//                           placeholder="Enter Account"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="account-list">
//                           {laborAccounts.map((account, index) => (
//                             <option
//                               key={`${account.id}-${index}`}
//                               value={account.id}
//                             >
//                               {account.id}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="orgId"
//                           value={newEntry.orgId}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({ ...newEntry, orgId: e.target.value })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Organization"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="plcGlcCode"
//                           value={newEntry.plcGlcCode}
//                           onChange={(e) =>
//                             isBudPlan && handlePlcInputChange(e.target.value)
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="plc-list"
//                           placeholder="Enter Plc"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="plc-list">
//                           {plcOptions.map((plc, index) => (
//                             <option
//                               key={`${plc.value}-${index}`}
//                               value={plc.value}
//                             >
//                               {plc.label}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isRev"
//                           checked={newEntry.isRev}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isRev: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isBrd"
//                           checked={newEntry.isBrd}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isBrd: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="status"
//                           value={newEntry.status}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, status: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           placeholder="Enter Status"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="perHourRate"
//                           value={newEntry.perHourRate}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               perHourRate: e.target.value.replace(
//                                 /[^0-9.]/g,
//                                 ""
//                               ),
//                             })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Hour Rate"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         {Object.values(newEntryPeriodHours)
//                           .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                           .toFixed(2)}
//                       </td>
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const row = getEmployeeRow(emp, actualEmpIdx);
//                       const editedData = editedEmployeeData[actualEmpIdx] || {};
//                       return (
//                         <tr
//                           key={`employee-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.idType}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.emplId}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.name}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.acctId !== undefined
//                                     ? editedData.acctId
//                                     : row.acctId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "acctId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="account-list"
//                               />
//                             ) : (
//                               row.acctId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.orgId !== undefined
//                                     ? editedData.orgId
//                                     : row.orgId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "orgId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.orgId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.glcPlc !== undefined
//                                     ? editedData.glcPlc
//                                     : row.glcPlc
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "glcPlc",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="plc-list"
//                               />
//                             ) : (
//                               row.glcPlc
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isRev !== undefined
//                                     ? editedData.isRev
//                                     : emp.emple.isRev
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isRev",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isRev
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isBrd !== undefined
//                                     ? editedData.isBrd
//                                     : emp.emple.isBrd
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isBrd",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isBrd
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.status}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.perHourRate !== undefined
//                                     ? editedData.perHourRate
//                                     : row.perHourRate
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "perHourRate",
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.perHourRate
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.total}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="synchronized-table-scroll last">
//               <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       return (
//                         <th
//                           key={uniqueKey}
//                           className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                             selectedColumnKey === uniqueKey
//                               ? "bg-yellow-100"
//                               : ""
//                           }`}
//                           style={{ cursor: isEditable ? "pointer" : "default" }}
//                           onClick={() => handleColumnHeaderClick(uniqueKey)}
//                         >
//                           <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                               {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                               {duration.workingHours || 0} hrs
//                             </span>
//                           </div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {sortedDurations.map((duration) => {
//                         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                         const isInputEditable =
//                           isEditable &&
//                           isMonthEditable(duration, closedPeriod, planType);
//                         return (
//                           <td
//                             key={`new-${uniqueKey}`}
//                             className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                               planType === "EAC"
//                                 ? isInputEditable
//                                   ? "bg-green-50"
//                                   : "bg-gray-200"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               type="text"
//                               inputMode="numeric"
//                               value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                               onChange={(e) =>
//                                 isInputEditable &&
//                                 setNewEntryPeriodHours((prev) => ({
//                                   ...prev,
//                                   [uniqueKey]: e.target.value.replace(
//                                     /[^0-9.]/g,
//                                     ""
//                                   ),
//                                 }))
//                               }
//                               className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                 !isInputEditable
//                                   ? "cursor-not-allowed text-gray-400"
//                                   : "text-gray-700"
//                               }`}
//                               disabled={!isInputEditable}
//                               placeholder="Enter Hours"
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const monthHours = getMonthHours(emp);
//                       return (
//                         <tr
//                           key={`hours-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           {sortedDurations.map((duration) => {
//                             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                             const forecast = monthHours[uniqueKey];
//                             const value =
//                               inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                               (forecast?.value !== undefined
//                                 ? forecast.value
//                                 : "0");
//                             const isInputEditable =
//                               isEditable &&
//                               isMonthEditable(duration, closedPeriod, planType);
//                             return (
//                               <td
//                                 key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                                 className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                   selectedColumnKey === uniqueKey
//                                     ? "bg-yellow-100"
//                                     : ""
//                                 } ${
//                                   planType === "EAC"
//                                     ? isInputEditable
//                                       ? "bg-green-50"
//                                       : "bg-gray-200"
//                                     : ""
//                                 }`}
//                               >
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                     !isInputEditable
//                                       ? "cursor-not-allowed text-gray-400"
//                                       : "text-gray-700"
//                                   }`}
//                                   value={value}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value.replace(/[^0-9.]/g, "")
//                                     )
//                                   }
//                                   onBlur={(e) =>
//                                     handleForecastHoursBlur(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isInputEditable}
//                                   placeholder="Enter Hours"
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const debounceTimeout = useRef(null);
//   const horizontalScrollRef = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);
//   const vfirstTableRef = useRef(null);
//   const vlastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   useEffect(() => {
//     if (newEntry.idType === "PLC") {
//       setNewEntry({
//         ...newEntry,
//         id: "PLC",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       });
//       setPlcSearch("");
//     }
//   // eslint-disable-next-line
//   }, [newEntry.idType]);

//   const isValidEmployeeId = (id) => {
//     if (!id) return false;
//     if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     if (newEntry.idType === "Other") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     return true;
//   };
//   const isValidAccount = (val) => !val || laborAccounts.some(acc => acc.id === val);
//   // const isValidOrg = (val) => !val || employeeSuggestions.some(emp => emp.orgId === val) || /[A-Za-z0-9]+/.test(val);
//   const isValidOrg = (val) => {
//   if (!val) return true; // Allow empty
//   // Only allow numeric values
//   return /^\d+$/.test(val.trim());
// };

//   const isValidPlc = (val) => !val || plcOptions.some(opt => opt.value === val);

//   // // Validation functions
//   // const validateAccountId = (acctId) => {
//   //   if (!acctId.trim()) return true; // Allow empty for optional field
//   //   return laborAccounts.some(account => account.id === acctId);
//   // };

//   // const validatePlcCode = (plcCode) => {
//   //   if (!plcCode.trim()) return true; // Allow empty for optional field
//   //   return plcOptions.some(plc => plc.value === plcCode || plc.value.startsWith(plcCode.split('-')[0]));
//   // };

//   // // Check for duplicate employee ID
//   // const checkDuplicateEmployee = (emplId) => {
//   //   return localEmployees.some(emp => emp.emple && emp.emple.emplId === emplId.trim());
//   // };

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     // Check newEntry for non-default values
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     // Check if newEntryPeriodHours or inputValues have entries
//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified =
//       Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue =
//         "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   // Vertical sync only
//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = vfirstTableRef.current;
//     const lastScroll = vlastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const container = horizontalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       firstScroll.scrollLeft = scrollLeft;
//       lastScroll.scrollLeft = scrollLeft;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   // useEffect(() => {
//   //   const fetchEmployeesSuggestions = async () => {
//   //     if (!projectId || !showNewForm) return;
//   //     try {
//   //       const endpoint =
//   //         newEntry.idType === "Vendor"
//   //           ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//   //           : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//   //       const response = await axios.get(endpoint);
//   //       const suggestions = Array.isArray(response.data)
//   //         ? response.data.map((emp) => {
//   //             if (newEntry.idType === "Vendor") {
//   //               return {
//   //                 emplId: emp.vendId,
//   //                 firstName: "",
//   //                 lastName: emp.employeeName || "",
//   //                 perHourRate: emp.perHourRate || emp.hrRate || "",
//   //                 plc: emp.plc || "",
//   //                 orgId: emp.orgId || "",

//   //               };
//   //             } else {
//   //               const [lastName, firstName] = (emp.employeeName || "")
//   //                 .split(", ")
//   //                 .map((str) => str.trim());
//   //               return {
//   //                 emplId: emp.empId,
//   //                 firstName: firstName || "",
//   //                 lastName: lastName || "",
//   //                 perHourRate: emp.perHourRate || emp.hrRate || "",
//   //                 plc: emp.plc || "",
//   //                 orgId: emp.orgId || "",
//   //               };
//   //             }
//   //           })
//   //         : [];
//   //       setEmployeeSuggestions(suggestions);
//   //     } catch (err) {
//   //       setEmployeeSuggestions([]);
//   //       toast.error(`Failed to fetch employee suggestions`, {
//   //         toastId: "employee-fetch-error",
//   //         autoClose: 3000,
//   //       });
//   //     }
//   //   };

//   //   const fetchLaborAccounts = async () => {
//   //     if (!projectId || !showNewForm) return;
//   //     try {
//   //       const response = await axios.get(
//   //         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//   //       );
//   //       const data = Array.isArray(response.data)
//   //         ? response.data[0]
//   //         : response.data;
//   //       const accounts = Array.isArray(data.laborAccounts)
//   //         ? data.laborAccounts.map((account) => ({ id: account }))
//   //         : [];
//   //       setLaborAccounts(accounts);
//   //       // ONLY auto-populate organization for Vendor Employee type
//   //     if (newEntry.idType === "Vendor" && data.orgId) {
//   //       setNewEntry(prev => ({
//   //         ...prev,
//   //         orgId: data.orgId
//   //       }));
//   //     }
//   //     } catch (err) {
//   //       setLaborAccounts([]);
//   //       toast.error(`Failed to fetch labor accounts`, {
//   //         toastId: "labor-accounts-error",
//   //         autoClose: 3000,
//   //       });
//   //     }
//   //   };

//   //   const fetchPlcOptions = async (searchTerm) => {
//   //     if (!projectId || !showNewForm) return;
//   //     try {
//   //       const response = await axios.get(
//   //         `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//   //           searchTerm
//   //         )}`
//   //       );
//   //       const options = Array.isArray(response.data)
//   //         ? response.data.map((plc) => ({
//   //             value: plc.laborCategoryCode,
//   //             label: `${plc.laborCategoryCode} - ${plc.description}`,
//   //           }))
//   //         : [];
//   //       setPlcOptions(options);
//   //     } catch (err) {
//   //       setPlcOptions([]);
//   //       toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//   //         toastId: "plc-fetch-error",
//   //         autoClose: 3000,
//   //       });
//   //     }
//   //   };

//   //   if (showNewForm) {
//   //     fetchEmployeesSuggestions();
//   //     fetchLaborAccounts();
//   //     fetchProjectOrgData();
//   //     if (plcSearch) {
//   //       if (debounceTimeout.current) {
//   //         clearTimeout(debounceTimeout.current);
//   //       }
//   //       debounceTimeout.current = setTimeout(() => {
//   //         fetchPlcOptions(plcSearch);
//   //       }, 300);
//   //     } else {
//   //       setPlcOptions([]);
//   //     }
//   //   } else {
//   //     setEmployeeSuggestions([]);
//   //     setLaborAccounts([]);
//   //     setPlcOptions([]);
//   //     setPlcSearch("");
//   //   }

//   //   return () => {
//   //     if (debounceTimeout.current) {
//   //       clearTimeout(debounceTimeout.current);
//   //     }
//   //   };
//   // }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   // ID Type change handler

//   useEffect(() => {
//   const fetchEmployeesSuggestions = async () => {
//     if (!projectId || !showNewForm) return;
//     try {
//       const endpoint =
//         newEntry.idType === "Vendor"
//           ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//       const response = await axios.get(endpoint);
//       const suggestions = Array.isArray(response.data)
//         ? response.data.map((emp) => {
//             if (newEntry.idType === "Vendor") {
//               return {
//                 emplId: emp.vendId, // Use vendId as the main ID
//                 firstName: "",
//                 lastName: emp.employeeName || "",
//                 perHourRate: emp.perHourRate || emp.hrRate || "",
//                 plc: emp.plc || "", // This is the PLC from API
//                 orgId: emp.orgId || "",
//               };
//             } else {
//               const [lastName, firstName] = (emp.employeeName || "")
//                 .split(", ")
//                 .map((str) => str.trim());
//               return {
//                 emplId: emp.empId,
//                 firstName: firstName || "",
//                 lastName: lastName || "",
//                 perHourRate: emp.perHourRate || emp.hrRate || "",
//                 plc: emp.plc || "",
//                 orgId: emp.orgId || "",
//               };
//             }
//           })
//         : [];
//       setEmployeeSuggestions(suggestions);
//     } catch (err) {
//       setEmployeeSuggestions([]);
//       toast.error(`Failed to fetch employee suggestions`, {
//         toastId: "employee-fetch-error",
//         autoClose: 3000,
//       });
//     }
//   };

//   const fetchLaborAccounts = async () => {
//     if (!projectId || !showNewForm) return;
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
//       const accounts = Array.isArray(data.laborAccounts)
//         ? data.laborAccounts.map((account) => ({ id: account }))
//         : [];
//       setLaborAccounts(accounts);

//       // ONLY auto-populate organization for Vendor Employee type
//       if (newEntry.idType === "Vendor" && data.orgId) {
//         setNewEntry(prev => ({
//           ...prev,
//           orgId: data.orgId
//         }));
//       }
//     } catch (err) {
//       setLaborAccounts([]);
//       toast.error(`Failed to fetch labor accounts`, {
//         toastId: "labor-accounts-error",
//         autoClose: 3000,
//       });
//     }
//   };

//   const fetchPlcOptions = async (searchTerm) => {
//     if (!projectId || !showNewForm) return;
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//           searchTerm
//         )}`
//       );
//       const options = Array.isArray(response.data)
//         ? response.data.map((plc) => ({
//             value: plc.laborCategoryCode,
//             label: `${plc.laborCategoryCode} - ${plc.description}`,
//           }))
//         : [];
//       setPlcOptions(options);
//     } catch (err) {
//       setPlcOptions([]);
//       toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//         toastId: "plc-fetch-error",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (showNewForm) {
//     fetchEmployeesSuggestions();
//     fetchLaborAccounts();
//     if (plcSearch) {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//       debounceTimeout.current = setTimeout(() => {
//         fetchPlcOptions(plcSearch);
//       }, 300);
//     } else {
//       setPlcOptions([]);
//     }
//   } else {
//     setEmployeeSuggestions([]);
//     setLaborAccounts([]);
//     setPlcOptions([]);
//     setPlcSearch("");
//   }

//   return () => {
//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }
//   };
// }, [projectId, showNewForm, plcSearch, newEntry.idType]);

//   const handleIdTypeChange = (value) => {
//     setNewEntry((prev) => ({
//       ...prev,
//       idType: value,
//       // Clear ID field when switching to PLC
//       id: value === "PLC" ? "" : prev.id,
//     }));

//     // Clear other fields when changing ID type
//     if (value === "PLC") {
//       setNewEntry((prev) => ({
//         ...prev,
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch("");
//     }
//   };

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   // const handlePlcBlur = (value) => {
//   //   if (value.trim() && !validatePlcCode(value)) {
//   //     toast.error("Please enter a valid PLC code from the available list.", {
//   //       toastId: "invalid-plc-code",
//   //       autoClose: 3000,
//   //     });
//   //   }
//   // };

//   // Account validation handlers

//   const handlePlcBlur = (val) => {
//     if (val && !isValidPlc(val)) {
//       toast.error("Please enter a valid Plc from the available list.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, plcGlcCode: ""}));
//       setPlcSearch("");
//     }
//   };

//   const handleAccountChange = (value) => {
//     setNewEntry((prev) => ({ ...prev, acctId: value }));
//   };

//   // const handleAccountBlur = (value) => {
//   //   if (value.trim() && !validateAccountId(value)) {
//   //     toast.error("Please enter a valid Account ID from the available list.", {
//   //       toastId: "invalid-account-id",
//   //       autoClose: 3000,
//   //     });
//   //   }
//   // };

//   // Organization validation handlers

//   const handleAccountBlur = (val) => {
//     if (val && !isValidAccount(val)) {
//       toast.error("Please enter a valid Account from the available list.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, acctId: ""}));
//     }
//   };

//   const handleOrgChange = (value) => {
//     setNewEntry((prev) => ({ ...prev, orgId: value }));
//   };

//   const handleOrgBlur = (val) => {
//   if (val && !isValidOrg(val)) {
//     toast.error("Organization must be a numeric ID only.", {autoClose: 3000});
//     setNewEntry(prev => ({...prev, orgId: ""}));
//   }
// };

// //   const handleOrgBlur = (val) => {
// //   if (val && !isValidOrg(val)) {
// //     toast.error("Organization must be a numeric ID only.", {autoClose: 3000});
// //     setNewEntry(prev => ({...prev, orgId: ""}));
// //   }
// // };

//   // const handleOrgBlur = (val) => {
//   //   if (val && !isValidOrg(val)) {
//   //     toast.error("Please enter a valid Organization.", {autoClose: 3000});
//   //     setNewEntry(prev => ({...prev, orgId: ""}));
//   //   }
//   // };

//   // const handleOrgBlur = (value) => {
//   //   // Basic validation - you can enhance this based on your organization data requirements
//   //   if (value.trim() && value.trim().length < 2) {
//   //     toast.error("Please enter a valid Organization ID.", {
//   //       toastId: "invalid-org-id",
//   //       autoClose: 3000,
//   //     });
//   //   }
//   // };

//   // const handleIdChange = (value) => {
//   //   const trimmedValue = value.trim();

//   //   // Don't allow input if ID Type is PLC
//   //   if (newEntry.idType === "PLC") {
//   //     toast.warn("ID field is disabled when ID Type is PLC.", {
//   //       toastId: "plc-id-disabled",
//   //       autoClose: 3000,
//   //     });
//   //     return;
//   //   }

//   //   // Always update the ID field regardless of validity
//   //   setNewEntry((prev) => ({
//   //     ...prev,
//   //     id: trimmedValue,
//   //   }));

//   //   if (!trimmedValue) {
//   //     // Clear all fields when ID is empty
//   //     setNewEntry((prev) => ({
//   //       ...prev,
//   //       id: "",
//   //       firstName: "",
//   //       lastName: "",
//   //       perHourRate: "",
//   //       orgId: "",
//   //       plcGlcCode: "",
//   //       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //     }));
//   //     setPlcSearch("");
//   //     return;
//   //   }

//   //   // Check for duplicate employee ID
//   //   if (checkDuplicateEmployee(trimmedValue)) {
//   //     toast.error("This Employee ID already exists in the plan.", {
//   //       toastId: "duplicate-employee-id",
//   //       autoClose: 3000,
//   //     });
//   //     return;
//   //   }

//   //   // Only validate and populate if we have employee suggestions loaded
//   //   if (employeeSuggestions.length > 0) {
//   //     const selectedEmployee = employeeSuggestions.find(
//   //       (emp) => emp.emplId === trimmedValue
//   //     );

//   //     if (selectedEmployee) {
//   //       // Valid employee found - populate fields
//   //       setNewEntry((prev) => ({
//   //         ...prev,
//   //         id: trimmedValue,
//   //         firstName: selectedEmployee.firstName || "",
//   //         lastName: selectedEmployee.lastName || "",
//   //         perHourRate: selectedEmployee.perHourRate || selectedEmployee.hrRate || "",
//   //         orgId: selectedEmployee.orgId || "",
//   //         plcGlcCode: selectedEmployee.plc || "",
//   //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //       }));
//   //       setPlcSearch(selectedEmployee.plc || "");
//   //     } else {
//   //       // Only show error if the user has typed what appears to be a complete ID
//   //       if (trimmedValue.length >= 3) {
//   //         toast.error("Please enter a valid Employee ID from the available list.", {
//   //           toastId: "invalid-employee-id",
//   //           autoClose: 3000,
//   //         });
//   //       }

//   //       // Don't auto-populate fields for invalid IDs, but keep the entered value
//   //       setNewEntry((prev) => ({
//   //         ...prev,
//   //         firstName: "",
//   //         lastName: "",
//   //         perHourRate: "",
//   //         orgId: "",
//   //         plcGlcCode: "",
//   //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //       }));
//   //       setPlcSearch("");
//   //     }
//   //   }
//   // };

//   //  const handleIdChange = (value) => {
//   //   const trimmedValue = value.trim();
//   //   if (newEntry.idType === "PLC") {
//   //     setNewEntry(prev => ({ ...prev, id: "PLC" }));
//   //     return;
//   //   }
//   //   setNewEntry(prev => ({ ...prev, id: trimmedValue }));
//   //   if (!trimmedValue) {
//   //     setNewEntry(prev => ({
//   //       ...prev,
//   //       id: "",
//   //       firstName: "",
//   //       lastName: "",
//   //       perHourRate: "",
//   //       orgId: "",
//   //       plcGlcCode: "",
//   //       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //     }));
//   //     setPlcSearch("");
//   //     return;
//   //   }
//   //   if (
//   //     (newEntry.idType === "Employee" ||
//   //     newEntry.idType === "Vendor" ||
//   //     newEntry.idType === "Other") &&
//   //     employeeSuggestions.length > 0
//   //   ) {
//   //     const selectedEmployee = employeeSuggestions.find(emp => emp.emplId === trimmedValue);
//   //     if (selectedEmployee) {
//   //       setNewEntry(prev => ({
//   //         ...prev,
//   //         id: trimmedValue,
//   //         firstName: selectedEmployee.firstName || "",
//   //         lastName: selectedEmployee.lastName || "",
//   //         perHourRate: selectedEmployee.perHourRate || selectedEmployee.hrRate || "",
//   //         orgId: selectedEmployee.orgId || "",
//   //         plcGlcCode: selectedEmployee.plc || "",
//   //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //       }));
//   //       setPlcSearch(selectedEmployee.plc || "");
//   //     } else {
//   //       if (trimmedValue.length >= 1) {
//   //         toast.error("Please enter a valid ID from the available list.", {autoClose: 3000});
//   //       }
//   //       setNewEntry(prev => ({
//   //         ...prev,
//   //         firstName: "",
//   //         lastName: "",
//   //         perHourRate: "",
//   //         orgId: "",
//   //         plcGlcCode: "",
//   //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//   //       }));
//   //       setPlcSearch("");
//   //     }
//   //   }
//   // };

// //   const handleIdChange = (value) => {
// //   const trimmedValue = value.trim();

// //   // For PLC type, always set to "PLC"
// //   if (newEntry.idType === "PLC") {
// //     setNewEntry(prev => ({ ...prev, id: "PLC" }));
// //     return;
// //   }

// //   // Always update the ID field regardless of validity
// //   setNewEntry(prev => ({ ...prev, id: trimmedValue }));

// //   if (!trimmedValue) {
// //     // Clear all fields when ID is empty
// //     setNewEntry(prev => ({
// //       ...prev,
// //       id: "",
// //       firstName: "",
// //       lastName: "",
// //       perHourRate: "",
// //       orgId: "",
// //       plcGlcCode: "",
// //       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //     }));
// //     setPlcSearch("");
// //     return;
// //   }

// //   // Check for duplicate employee ID
// //   const isDuplicate = localEmployees.some(emp =>
// //     emp.emple && emp.emple.emplId === trimmedValue
// //   );

// //   if (isDuplicate) {
// //     toast.error("This ID already exists. Please use a different ID.", {
// //       toastId: "duplicate-id",
// //       autoClose: 3000,
// //     });
// //     return;
// //   }

// //   // For "Other" type, allow any ID without validation
// //   if (newEntry.idType === "Other") {
// //     // Don't validate or auto-populate for "Other" type
// //     return;
// //   }

// //   // Only validate and populate for Employee/Vendor types if we have suggestions loaded
// //   if (
// //     (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
// //     employeeSuggestions.length > 0
// //   ) {
// //     const selectedEmployee = employeeSuggestions.find(emp => emp.emplId === trimmedValue);

// //     if (selectedEmployee) {
// //       // Valid employee found - populate fields
// //       setNewEntry(prev => ({
// //         ...prev,
// //         id: trimmedValue,
// //         firstName: selectedEmployee.firstName || "",
// //         lastName: selectedEmployee.lastName || "",
// //         perHourRate: selectedEmployee.perHourRate || selectedEmployee.hrRate || "",
// //         orgId: selectedEmployee.orgId || "",
// //         plcGlcCode: selectedEmployee.plc || "",
// //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //       }));
// //       setPlcSearch(selectedEmployee.plc || "");
// //     } else {
// //       // Only show error if the user has typed at least 3-4 characters
// //       if (trimmedValue.length >= 3) {
// //         toast.error("Please enter a valid ID from the available list.", {
// //           toastId: "invalid-id",
// //           autoClose: 3000,
// //         });
// //       }

// //       // Don't auto-populate fields for invalid IDs, but keep the entered value
// //       setNewEntry(prev => ({
// //         ...prev,
// //         firstName: "",
// //         lastName: "",
// //         perHourRate: "",
// //         orgId: "",
// //         plcGlcCode: "",
// //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //       }));
// //       setPlcSearch("");
// //     }
// //   }
// // };

// // const handleIdChange = (value) => {
// //   const trimmedValue = value.trim();

// //   // For PLC type, always set to "PLC"
// //   if (newEntry.idType === "PLC") {
// //     setNewEntry(prev => ({ ...prev, id: "PLC" }));
// //     return;
// //   }

// //   // Always update the ID field regardless of validity
// //   setNewEntry((prev) => ({
// //     ...prev,
// //     id: trimmedValue,
// //   }));

// //   if (!trimmedValue) {
// //     // Clear all fields when ID is empty
// //     setNewEntry((prev) => ({
// //       ...prev,
// //       id: "",
// //       firstName: "",
// //       lastName: "",
// //       perHourRate: "",
// //       orgId: "",
// //       plcGlcCode: "",
// //       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //     }));
// //     setPlcSearch("");
// //     return;
// //   }

// //   // Check for duplicate employee ID
// //   const isDuplicate = localEmployees.some(emp =>
// //     emp.emple && emp.emple.emplId === trimmedValue
// //   );

// //   if (isDuplicate) {
// //     toast.error("This ID already exists. Please use a different ID.", {
// //       toastId: "duplicate-id",
// //       autoClose: 3000,
// //     });
// //     return;
// //   }

// //   // For "Other" type, allow any ID without validation
// //   if (newEntry.idType === "Other") {
// //     return;
// //   }

// //   // Only validate and populate for Employee/Vendor types if we have suggestions loaded
// //   if (
// //     (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
// //     employeeSuggestions.length > 0
// //   ) {
// //     const selectedEmployee = employeeSuggestions.find(emp => emp.emplId === trimmedValue);

// //     if (selectedEmployee) {
// //       // Valid employee found - populate fields
// //       setNewEntry((prev) => ({
// //         ...prev,
// //         id: trimmedValue,
// //         firstName: selectedEmployee.firstName || "",
// //         lastName: selectedEmployee.lastName || "",
// //         perHourRate: selectedEmployee.perHourRate || "",
// //         orgId: selectedEmployee.orgId || "",
// //         plcGlcCode: selectedEmployee.plc || "",
// //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //       }));
// //       setPlcSearch(selectedEmployee.plc || "");
// //     } else {
// //       // Only show error if the user has typed at least 3 characters AND no partial match exists
// //       if (trimmedValue.length >= 3) {
// //         // Check if any employee ID starts with typed value
// //         const partialMatch = employeeSuggestions.some((emp) =>
// //           emp.emplId.startsWith(trimmedValue)
// //         );

// //         if (!partialMatch) {
// //           toast.error("❌ Invalid ID, please select a valid one!", {
// //             toastId: "invalid-id",
// //             autoClose: 3000,
// //           });
// //         }
// //       }

// //       // Don't auto-populate fields for invalid IDs, but keep the entered value
// //       setNewEntry((prev) => ({
// //         ...prev,
// //         firstName: "",
// //         lastName: "",
// //         perHourRate: "",
// //         orgId: "",
// //         plcGlcCode: "",
// //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //       }));
// //       setPlcSearch("");
// //     }
// //   }
// // };

// const handleIdChange = (value) => {
//   const trimmedValue = value.trim();

//   // For PLC type, always set to "PLC"
//   if (newEntry.idType === "PLC") {
//     setNewEntry(prev => ({ ...prev, id: "PLC" }));
//     return;
//   }

//   // Always update the ID field regardless of validity
//   setNewEntry((prev) => ({
//     ...prev,
//     id: trimmedValue,
//   }));

//   if (!trimmedValue) {
//     // Clear all fields when ID is empty
//     setNewEntry((prev) => ({
//       ...prev,
//       id: "",
//       firstName: "",
//       lastName: "",
//       perHourRate: "",
//       orgId: "",
//       plcGlcCode: "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//     }));
//     setPlcSearch("");
//     return;
//   }

//   // Check for duplicate employee ID
//   const isDuplicate = localEmployees.some(emp =>
//     emp.emple && emp.emple.emplId === trimmedValue
//   );

//   if (isDuplicate) {
//     toast.error("This ID already exists. Please use a different ID.", {
//       toastId: "duplicate-id",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // For "Other" type, allow any ID without validation
//   if (newEntry.idType === "Other") {
//     return;
//   }

//   // Only validate and populate for Employee/Vendor types if we have suggestions loaded
//   if (
//     (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
//     employeeSuggestions.length > 0
//   ) {
//     const selectedEmployee = employeeSuggestions.find(emp => emp.emplId === trimmedValue);

//     if (selectedEmployee) {
//       // Valid employee found - populate fields INCLUDING PLC for Vendor
//       setNewEntry((prev) => ({
//         ...prev,
//         id: trimmedValue,
//         firstName: selectedEmployee.firstName || "",
//         lastName: selectedEmployee.lastName || "",
//         perHourRate: selectedEmployee.perHourRate || "",
//         orgId: selectedEmployee.orgId || prev.orgId, // Keep existing orgId if not provided
//         plcGlcCode: selectedEmployee.plc || "", // AUTO-POPULATE PLC
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch(selectedEmployee.plc || ""); // UPDATE PLC SEARCH TOO
//     } else {
//       // Only show error if the user has typed at least 3 characters AND no partial match exists
//       if (trimmedValue.length >= 3) {
//         // Check if any employee ID starts with typed value
//         const partialMatch = employeeSuggestions.some((emp) =>
//           emp.emplId.startsWith(trimmedValue)
//         );

//         if (!partialMatch) {
//           toast.error("Invalid ID, please select a valid one!", {
//             toastId: "invalid-id",
//             autoClose: 3000,
//           });
//         }
//       }

//       // Don't auto-populate fields for invalid IDs, but keep the entered value
//       setNewEntry((prev) => ({
//         ...prev,
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         // DON'T clear orgId for Vendor type as it should come from project
//         orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch("");
//     }
//   }
// };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }
//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (
//             planType === "EAC" &&
//             !isMonthEditable(duration, closedPeriod, planType)
//           ) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (
//       fillMethod === "Use Start Period Hours" &&
//       sortedDurations.length > 0
//     ) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error(
//           "Start Period hours are outside the selected duration range."
//         );
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   // const handleSaveNewEntry = async () => {
//   //   if (!planId) {
//   //     toast.error("Plan ID is required to save a new entry.", {
//   //       toastId: "no-plan-id",
//   //       autoClose: 3000,
//   //     });
//   //     return;
//   //   }

//   //   // Validate ID Type PLC (should not have an ID)
//   //   if (newEntry.idType === "PLC") {
//   //     if (newEntry.id.trim()) {
//   //       toast.error("ID field should be empty when ID Type is PLC.", {
//   //         toastId: "plc-should-not-have-id",
//   //         autoClose: 3000,
//   //       });
//   //       return;
//   //     }
//   //   } else {
//   //     // Validate employee ID for non-PLC types
//   //     if (!newEntry.id.trim()) {
//   //       toast.error("Employee ID is required.", {
//   //         toastId: "no-employee-id",
//   //         autoClose: 3000,
//   //       });
//   //       return;
//   //     }

//   //     // Check for duplicate employee ID
//   //     if (checkDuplicateEmployee(newEntry.id)) {
//   //       toast.error("This Employee ID already exists in the plan. Please use a different ID.", {
//   //         toastId: "duplicate-employee-save",
//   //         autoClose: 3000,
//   //       });
//   //       return;
//   //     }

//   //     // Check if the entered ID exists in suggestions (for non-PLC types)
//   //     if (employeeSuggestions.length > 0) {
//   //       const validEmployee = employeeSuggestions.find(
//   //         (emp) => emp.emplId === newEntry.id.trim()
//   //       );

//   //       if (!validEmployee) {
//   //         toast.error("Please enter a valid Employee ID from the available list.", {
//   //           toastId: "invalid-employee-id-save",
//   //           autoClose: 3000,
//   //         });
//   //         return;
//   //       }
//   //     }
//   //   }

//   //   // Validate Account ID
//   //   if (newEntry.acctId.trim() && !validateAccountId(newEntry.acctId)) {
//   //     toast.error("Please enter a valid Account ID from the available list.", {
//   //       toastId: "invalid-account-save",
//   //       autoClose: 3000,
//   //     });
//   //     return;
//   //   }

//   //   // Validate PLC Code
//   //   if (newEntry.plcGlcCode.trim() && !validatePlcCode(newEntry.plcGlcCode)) {
//   //     toast.error("Please enter a valid PLC code from the available list.", {
//   //       toastId: "invalid-plc-save",
//   //       autoClose: 3000,
//   //     });
//   //     return;
//   //   }

//   //   setIsDurationLoading(true);

//   //   const payloadForecasts = durations.map((duration) => ({
//   //     forecastedhours:
//   //       Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
//   //       0,
//   //     projId: projectId,
//   //     plId: planId,
//   //     emplId: newEntry.id,
//   //     month: duration.monthNo,
//   //     year: duration.year,
//   //     acctId: newEntry.acctId,
//   //     orgId: newEntry.orgId,
//   //     plc: newEntry.plcGlcCode || "",
//   //     hrlyRate: Number(newEntry.perHourRate) || 0,
//   //     effectDt: null,
//   //     plEmployee: null,
//   //   }));

//   //   const payload = {
//   //     id: 0,
//   //     emplId: newEntry.id,
//   //     firstName: newEntry.firstName,
//   //     lastName: newEntry.lastName,
//   //     type: newEntry.idType,
//   //     isRev: newEntry.isRev,
//   //     isBrd: newEntry.isBrd,
//   //     plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//   //     perHourRate: Number(newEntry.perHourRate) || 0,
//   //     status: newEntry.status || "Act",
//   //     accId: newEntry.acctId,
//   //     orgId: newEntry.orgId || "",
//   //     plId: planId,
//   //     plForecasts: payloadForecasts,
//   //   };

//   //   try {
//   //     await axios.post(
//   //       "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//   //       payload
//   //     );

//   //     setSuccessMessageText("Entry saved successfully!");
//   //     setShowSuccessMessage(true);
//   //     setShowNewForm(false);
//   //     setNewEntry({
//   //       id: "",
//   //       firstName: "",
//   //       lastName: "",
//   //       isRev: false,
//   //       isBrd: false,
//   //       idType: "",
//   //       acctId: "",
//   //       orgId: "",
//   //       plcGlcCode: "",
//   //       perHourRate: "",
//   //       status: "Act",
//   //     });
//   //     setNewEntryPeriodHours({});
//   //     setEmployeeSuggestions([]);
//   //     setLaborAccounts([]);
//   //     setPlcOptions([]);
//   //     setPlcSearch("");

//   //     if (onSaveSuccess) {
//   //       onSaveSuccess();
//   //     }
//   //     fetchEmployees();
//   //   } catch (err) {
//   //     setSuccessMessageText("Failed to save entry.");
//   //     setShowSuccessMessage(true);
//   //     toast.error(
//   //       "Failed to save new entry: " +
//   //         (err.response?.data?.message ||
//   //           JSON.stringify(err.response?.data?.errors) ||
//   //           err.message),
//   //       {
//   //         toastId: "save-entry-error",
//   //         autoClose: 5000,
//   //       }
//   //     );
//   //   } finally {
//   //     setIsDurationLoading(false);
//   //     setTimeout(() => setShowSuccessMessage(false), 2000);
//   //   }
//   // };

//   //  const handleSaveNewEntry = async () => {
//   //   if (!planId) {
//   //     toast.error("Plan ID is required to save a new entry.", {autoClose: 3000});
//   //     return;
//   //   }
//   //   if (newEntry.idType === "PLC") {
//   //     if (!newEntry.id || newEntry.id !== "PLC") {
//   //       toast.error("ID must be automatically set to 'PLC' for PLC type.", {autoClose: 3000});
//   //       return;
//   //     }
//   //   }
//   //   if (
//   //     newEntry.idType === "Employee" ||
//   //     newEntry.idType === "Vendor" ||
//   //     newEntry.idType === "Other"
//   //   ) {
//   //     if (!newEntry.id.trim() || !isValidEmployeeId(newEntry.id.trim())) {
//   //       toast.error("Please enter a valid ID from the available list.", {autoClose: 3000});
//   //       return;
//   //     }
//   //   }
//   //   if (!isValidAccount(newEntry.acctId)) {
//   //     toast.error("Please enter a valid Account from the available list.", {autoClose: 3000});
//   //     return;
//   //   }
//   //   if (!isValidOrg(newEntry.orgId)) {
//   //     toast.error("Please enter a valid Organization.", {autoClose: 3000});
//   //     return;
//   //   }
//   //   if (!isValidPlc(newEntry.plcGlcCode)) {
//   //     toast.error("Please enter a valid Plc from the available list.", {autoClose: 3000});
//   //     return;
//   //   }
//   //   setIsDurationLoading(true);
//   //   const payloadForecasts = durations.map(duration => ({
//   //     forecastedhours: Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) || 0,
//   //     projId: projectId,
//   //     plId: planId,
//   //     emplId: newEntry.id,
//   //     month: duration.monthNo,
//   //     year: duration.year,
//   //     acctId: newEntry.acctId,
//   //     orgId: newEntry.orgId,
//   //     plc: newEntry.plcGlcCode || "",
//   //     hrlyRate: Number(newEntry.perHourRate) || 0,
//   //     effectDt: null,
//   //     plEmployee: null,
//   //   }));
//   //   const payload = {
//   //     id: 0,
//   //     emplId: newEntry.id,
//   //     firstName: newEntry.firstName,
//   //     lastName: newEntry.lastName,
//   //     type: newEntry.idType,
//   //     isRev: newEntry.isRev,
//   //     isBrd: newEntry.isBrd,
//   //     plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//   //     perHourRate: Number(newEntry.perHourRate) || 0,
//   //     status: newEntry.status || "Act",
//   //     accId: newEntry.acctId,
//   //     orgId: newEntry.orgId || "",
//   //     plId: planId,
//   //     plForecasts: payloadForecasts,
//   //   };
//   //   try {
//   //     await axios.post(
//   //       "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//   //       payload
//   //     );
//   //     setSuccessMessageText("Entry saved successfully!");
//   //     setShowSuccessMessage(true);
//   //     setShowNewForm(false);
//   //     setNewEntry({
//   //       id: "",
//   //       firstName: "",
//   //       lastName: "",
//   //       isRev: false,
//   //       isBrd: false,
//   //       idType: "",
//   //       acctId: "",
//   //       orgId: "",
//   //       plcGlcCode: "",
//   //       perHourRate: "",
//   //       status: "Act",
//   //     });
//   //     setNewEntryPeriodHours({});
//   //     setEmployeeSuggestions([]);
//   //     setLaborAccounts([]);
//   //     setPlcOptions([]);
//   //     setPlcSearch("");
//   //     if (onSaveSuccess) {
//   //       onSaveSuccess();
//   //     }
//   //     fetchEmployees();
//   //   } catch (err) {
//   //     setSuccessMessageText("Failed to save entry.");
//   //     setShowSuccessMessage(true);
//   //     toast.error(
//   //       "Failed to save new entry: " +
//   //         (err?.response?.data?.message ||
//   //           JSON.stringify(err?.response?.data?.errors) ||
//   //           err?.message),
//   //       { toastId: "save-entry-error", autoClose: 5000 }
//   //     );
//   //   } finally {
//   //     setIsDurationLoading(false);
//   //     setTimeout(() => setShowSuccessMessage(false), 2000);
//   //   }
//   // };
//   const handleSaveNewEntry = async () => {
//   if (!planId) {
//     toast.error("Plan ID is required to save a new entry.", { autoClose: 3000 });
//     return;
//   }

//   // Check for duplicate employee ID before validating anything else
//   const isDuplicate = localEmployees.some(
//     emp => emp.emple && emp.emple.emplId === newEntry.id.trim()
//   );
//   if (isDuplicate) {
//     toast.error("Can't save entry with existing ID. Please use a different ID.", {
//       toastId: "duplicate-save-error",
//       autoClose: 3000,
//     });
//     return;
//   }

//   if (newEntry.idType === "PLC") {
//     if (!newEntry.id || newEntry.id !== "PLC") {
//       toast.error("ID must be automatically set to 'PLC' for PLC type.", { autoClose: 3000 });
//       return;
//     }
//   } else if (newEntry.idType === "Other") {
//     // For Other type, just check that it's not empty (no further validation)
//     if (!newEntry.id.trim()) {
//       toast.error("ID is required.", { autoClose: 3000 });
//       return;
//     }
//   } else if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//     if (!newEntry.id.trim()) {
//       toast.error("ID is required.", { autoClose: 3000 });
//       return;
//     }
//     // Only validate against suggestions if we have them
//     if (employeeSuggestions.length > 0) {
//       const validEmployee = employeeSuggestions.find(emp => emp.emplId === newEntry.id.trim());
//       if (!validEmployee) {
//         toast.error("Please enter a valid ID from the available list.", { autoClose: 3000 });
//         return;
//       }
//     }
//   }

//   if (!isValidAccount(newEntry.acctId)) {
//     toast.error("Please enter a valid Account from the available list.", { autoClose: 3000 });
//     return;
//   }
//   if (!isValidOrg(newEntry.orgId)) {
//     toast.error("Please enter a valid Organization.", { autoClose: 3000 });
//     return;
//   }
//   if (!isValidPlc(newEntry.plcGlcCode)) {
//     toast.error("Please enter a valid Plc from the available list.", { autoClose: 3000 });
//     return;
//   }

//   setIsDurationLoading(true);
//   const payloadForecasts = durations.map(duration => ({
//     forecastedhours: Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) || 0,
//     projId: projectId,
//     plId: planId,
//     emplId: newEntry.id,
//     month: duration.monthNo,
//     year: duration.year,
//     acctId: newEntry.acctId,
//     orgId: newEntry.orgId,
//     plc: newEntry.plcGlcCode || "",
//     hrlyRate: Number(newEntry.perHourRate) || 0,
//     effectDt: null,
//     plEmployee: null,
//   }));
//   const payload = {
//     id: 0,
//     emplId: newEntry.id,
//     firstName: newEntry.firstName,
//     lastName: newEntry.lastName,
//     type: newEntry.idType,
//     isRev: newEntry.isRev,
//     isBrd: newEntry.isBrd,
//     plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//     perHourRate: Number(newEntry.perHourRate) || 0,
//     status: newEntry.status || "Act",
//     accId: newEntry.acctId,
//     orgId: newEntry.orgId || "",
//     plId: planId,
//     plForecasts: payloadForecasts,
//   };
//   try {
//     await axios.post(
//       "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//       payload
//     );
//     setSuccessMessageText("Entry saved successfully!");
//     setShowSuccessMessage(true);
//     setShowNewForm(false);
//     setNewEntry({
//       id: "",
//       firstName: "",
//       lastName: "",
//       isRev: false,
//       isBrd: false,
//       idType: "",
//       acctId: "",
//       orgId: "",
//       plcGlcCode: "",
//       perHourRate: "",
//       status: "Act",
//     });
//     setNewEntryPeriodHours({});
//     setEmployeeSuggestions([]);
//     setLaborAccounts([]);
//     setPlcOptions([]);
//     setPlcSearch("");
//     if (onSaveSuccess) {
//       onSaveSuccess();
//     }
//     fetchEmployees();
//   } catch (err) {
//     setSuccessMessageText("Failed to save entry.");
//     setShowSuccessMessage(true);
//     toast.error(
//       "Failed to save new entry: " +
//         (err?.response?.data?.message ||
//           JSON.stringify(err?.response?.data?.errors) ||
//           err?.message),
//       { toastId: "save-entry-error", autoClose: 5000 }
//     );
//   } finally {
//     setIsDurationLoading(false);
//     setTimeout(() => setShowSuccessMessage(false), 2000);
//   }
// };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (
//           !isNaN(Number(findValueTrimmed)) &&
//           Number(findValueTrimmed) === 0
//         ) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue =
//             newValue === "" ? 0 : parseFloat(newValue) || 0;
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]:
//                   newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(
//       `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
//     );

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) =>
//                     f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue =
//                     parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               {!showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFindReplace(true)}
//                 >
//                   Find / Replace
//                 </button>
//               )}
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="vertical-scroll-wrapper" ref={verticalScrollRef}>
//           <div className="synchronized-tables-container flex">
//             <div className="synchronized-table-scroll first">
//               <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <th
//                         key={col.key}
//                         className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <select
//                           name="idType"
//                           value={newEntry.idType || ""}
//                           onChange={(e) => handleIdTypeChange(e.target.value)}
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         >
//                           {ID_TYPE_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="id"
//                           value={newEntry.id}
//                           onChange={(e) => handleIdChange(e.target.value)}
//                           disabled={newEntry.idType === "PLC"}
//                           className={`w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border ${
//                             newEntry.idType === "PLC" ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="employee-id-list"
//                           placeholder={newEntry.idType === "PLC" ? "Not required for PLC" : "Enter ID"}
//                         />
//                         <datalist id="employee-id-list">
//                           {employeeSuggestions
//                             .filter(
//                               (emp) =>
//                                 emp.emplId && typeof emp.emplId === "string"
//                             )
//                             .map((emp, index) => (
//                               <option
//                                 key={`${emp.emplId}-${index}`}
//                                 value={emp.emplId}
//                               >
//                                 {emp.lastName && emp.firstName
//                                   ? `${emp.lastName}, ${emp.firstName}`
//                                   : emp.lastName || emp.firstName || emp.emplId}
//                               </option>
//                             ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="name"
//                           value={
//                             newEntry.idType === "Vendor"
//                               ? newEntry.lastName || newEntry.firstName || ""
//                               : newEntry.lastName && newEntry.firstName
//                               ? `${newEntry.lastName}, ${newEntry.firstName}`
//                               : newEntry.lastName || newEntry.firstName || ""
//                           }
//                           readOnly
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                           placeholder="Name (auto-filled)"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="acctId"
//                           value={newEntry.acctId}
//                           onChange={(e) => handleAccountChange(e.target.value)}
//                           onBlur={(e) => handleAccountBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="account-list"
//                           placeholder="Enter Account"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="account-list">
//                           {laborAccounts.map((account, index) => (
//                             <option
//                               key={`${account.id}-${index}`}
//                               value={account.id}
//                             >
//                               {account.id}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       {/* <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="orgId"
//                           value={newEntry.orgId}
//                           onChange={(e) => handleOrgChange(e.target.value)}
//                           onBlur={(e) => handleOrgBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Organization"
//                           disabled={!isBudPlan}
//                         />
//                       </td> */}
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//   <input
//     type="text"
//     name="orgId"
//     value={newEntry.orgId}
//     onChange={(e) => handleOrgChange(e.target.value.replace(/[^0-9]/g, ""))} // ONLY ALLOW NUMBERS
//     onBlur={(e) => handleOrgBlur(e.target.value)}
//     className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//       !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//     }`}
//     placeholder="Enter Organization (numeric only)"
//     disabled={!isBudPlan}
//     inputMode="numeric" // ADD THIS FOR MOBILE NUMERIC KEYBOARD
//   />
// </td>

//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="plcGlcCode"
//                           value={newEntry.plcGlcCode}
//                           onChange={(e) =>
//                             isBudPlan && handlePlcInputChange(e.target.value)
//                           }
//                           onBlur={(e) => handlePlcBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="plc-list"
//                           placeholder="Enter Plc"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="plc-list">
//                           {plcOptions.map((plc, index) => (
//                             <option
//                               key={`${plc.value}-${index}`}
//                               value={plc.value}
//                             >
//                               {plc.label}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isRev"
//                           checked={newEntry.isRev}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isRev: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isBrd"
//                           checked={newEntry.isBrd}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isBrd: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="status"
//                           value={newEntry.status}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, status: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           placeholder="Enter Status"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="perHourRate"
//                           value={newEntry.perHourRate}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               perHourRate: e.target.value.replace(
//                                 /[^0-9.]/g,
//                                 ""
//                               ),
//                             })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Hour Rate"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         {Object.values(newEntryPeriodHours)
//                           .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                           .toFixed(2)}
//                       </td>
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const row = getEmployeeRow(emp, actualEmpIdx);
//                       const editedData = editedEmployeeData[actualEmpIdx] || {};
//                       return (
//                         <tr
//                           key={`employee-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.idType}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.emplId}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.name}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.acctId !== undefined
//                                     ? editedData.acctId
//                                     : row.acctId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "acctId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="account-list"
//                               />
//                             ) : (
//                               row.acctId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.orgId !== undefined
//                                     ? editedData.orgId
//                                     : row.orgId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "orgId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.orgId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.glcPlc !== undefined
//                                     ? editedData.glcPlc
//                                     : row.glcPlc
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "glcPlc",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="plc-list"
//                               />
//                             ) : (
//                               row.glcPlc
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isRev !== undefined
//                                     ? editedData.isRev
//                                     : emp.emple.isRev
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isRev",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isRev
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isBrd !== undefined
//                                     ? editedData.isBrd
//                                     : emp.emple.isBrd
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isBrd",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isBrd
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.status}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.perHourRate !== undefined
//                                     ? editedData.perHourRate
//                                     : row.perHourRate
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "perHourRate",
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.perHourRate
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.total}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="synchronized-table-scroll last">
//               <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       return (
//                         <th
//                           key={uniqueKey}
//                           className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                             selectedColumnKey === uniqueKey
//                               ? "bg-yellow-100"
//                               : ""
//                           }`}
//                           style={{ cursor: isEditable ? "pointer" : "default" }}
//                           onClick={() => handleColumnHeaderClick(uniqueKey)}
//                         >
//                           <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                               {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                               {duration.workingHours || 0} hrs
//                             </span>
//                           </div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {sortedDurations.map((duration) => {
//                         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                         const isInputEditable =
//                           isEditable &&
//                           isMonthEditable(duration, closedPeriod, planType);
//                         return (
//                           <td
//                             key={`new-${uniqueKey}`}
//                             className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                               planType === "EAC"
//                                 ? isInputEditable
//                                   ? "bg-green-50"
//                                   : "bg-gray-200"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               type="text"
//                               inputMode="numeric"
//                               value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                               onChange={(e) =>
//                                 isInputEditable &&
//                                 setNewEntryPeriodHours((prev) => ({
//                                   ...prev,
//                                   [uniqueKey]: e.target.value.replace(
//                                     /[^0-9.]/g,
//                                     ""
//                                   ),
//                                 }))
//                               }
//                               className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                 !isInputEditable
//                                   ? "cursor-not-allowed text-gray-400"
//                                   : "text-gray-700"
//                               }`}
//                               disabled={!isInputEditable}
//                               placeholder="Enter Hours"
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const monthHours = getMonthHours(emp);
//                       return (
//                         <tr
//                           key={`hours-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           {sortedDurations.map((duration) => {
//                             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                             const forecast = monthHours[uniqueKey];
//                             const value =
//                               inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                               (forecast?.value !== undefined
//                                 ? forecast.value
//                                 : "0");
//                             const isInputEditable =
//                               isEditable &&
//                               isMonthEditable(duration, closedPeriod, planType);
//                             return (
//                               <td
//                                 key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                                 className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                   selectedColumnKey === uniqueKey
//                                     ? "bg-yellow-100"
//                                     : ""
//                                 } ${
//                                   planType === "EAC"
//                                     ? isInputEditable
//                                       ? "bg-green-50"
//                                       : "bg-gray-200"
//                                     : ""
//                                 }`}
//                               >
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                     !isInputEditable
//                                       ? "cursor-not-allowed text-gray-400"
//                                       : "text-gray-700"
//                                   }`}
//                                   value={value}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value.replace(/[^0-9.]/g, "")
//                                     )
//                                   }
//                                   onBlur={(e) =>
//                                     handleForecastHoursBlur(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isInputEditable}
//                                   placeholder="Enter Hours"
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const [autoPopulatedPLC, setAutoPopulatedPLC] = useState(false); // Track if PLC is auto-populated
//   const debounceTimeout = useRef(null);
//   const horizontalScrollRef = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);
//   const vfirstTableRef = useRef(null);
//   const vlastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Clear all fields when ID type changes
//   useEffect(() => {
//     if (newEntry.idType === "PLC") {
//       setNewEntry({
//         ...newEntry,
//         id: "PLC",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       });
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     } else if (newEntry.idType !== "") {
//       // Clear all fields when switching to any other type
//       setNewEntry(prev => ({
//         ...prev,
//         id: "",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     }
//   // eslint-disable-next-line
//   }, [newEntry.idType]);

//   const isValidEmployeeId = (id) => {
//     if (!id) return false;
//     if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     if (newEntry.idType === "Other") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     return true;
//   };

//   const isValidAccount = (val) => !val || laborAccounts.some(acc => acc.id === val);

//   // Fixed organization validation - allow any non-empty value
//   const isValidOrg = (val) => {
//     if (!val) return true; // Allow empty
//     return val.toString().trim().length > 0; // Just check if it's not empty after trimming
//   };

//   // const isValidPlc = (val) => !val || plcOptions.some(opt => opt.value === val) || autoPopulatedPLC;
//   const isValidPlc = (val) => {
//   if (!val) return true; // Allow empty
//   // Allow if it's in plcOptions OR if it's auto-populated from employee suggestions
//   return plcOptions.some(opt => opt.value === val) ||
//          employeeSuggestions.some(emp => emp.plc === val);
// };

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified =
//       Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue =
//         "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   // Vertical sync only
//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = vfirstTableRef.current;
//     const lastScroll = vlastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const container = horizontalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       firstScroll.scrollLeft = scrollLeft;
//       lastScroll.scrollLeft = scrollLeft;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.vendId, // Use vendId as the main ID
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "", // This is the PLC from API
//                   orgId: emp.orgId || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "",
//                   orgId: emp.orgId || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);

//         // ONLY auto-populate organization for Vendor Employee type
//         if (newEntry.idType === "Vendor" && data.orgId) {
//           setNewEntry(prev => ({
//             ...prev,
//             orgId: data.orgId
//           }));
//         }
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//             searchTerm
//           )}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch && !autoPopulatedPLC) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType, autoPopulatedPLC]);

//   // ID Type change handler
//   const handleIdTypeChange = (value) => {
//     setNewEntry((prev) => ({
//       id: "",
//       firstName: "",
//       lastName: "",
//       isRev: false,
//       isBrd: false,
//       idType: value,
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       orgId: "",
//       plcGlcCode: "",
//       perHourRate: "",
//       status: "Act",
//     }));
//     setPlcSearch("");
//     setAutoPopulatedPLC(false);
//   };

//   const handlePlcInputChange = (value) => {
//     // Only allow manual input if PLC is not auto-populated
//     if (!autoPopulatedPLC) {
//       setPlcSearch(value);
//       setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//     }
//   };

//   const handlePlcBlur = (val) => {
//     if (val && !isValidPlc(val)) {
//       toast.error("Please enter a valid Plc from the available list.", {autoClose: 3000});
//       if (!autoPopulatedPLC) {
//         setNewEntry(prev => ({...prev, plcGlcCode: ""}));
//         setPlcSearch("");
//       }
//     }
//   };

//   const handleAccountChange = (value) => {
//     setNewEntry((prev) => ({ ...prev, acctId: value }));
//   };

//   const handleAccountBlur = (val) => {
//     if (val && !isValidAccount(val)) {
//       toast.error("Please enter a valid Account from the available list.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, acctId: ""}));
//     }
//   };

//   const handleOrgChange = (value) => {
//     setNewEntry((prev) => ({ ...prev, orgId: value }));
//   };

//   const handleOrgBlur = (val) => {
//     if (val && !isValidOrg(val)) {
//       toast.error("Organization is required and cannot be empty.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, orgId: ""}));
//     }
//   };

// //   const handleIdChange = (value) => {
// //     const trimmedValue = value.trim();

// //     // For PLC type, always set to "PLC"
// //     if (newEntry.idType === "PLC") {
// //       setNewEntry(prev => ({ ...prev, id: "PLC" }));
// //       return;
// //     }

// //     // Always update the ID field regardless of validity
// //     setNewEntry((prev) => ({
// //       ...prev,
// //       id: trimmedValue,
// //     }));

// //     if (!trimmedValue) {
// //       // Clear all fields when ID is empty
// //       setNewEntry((prev) => ({
// //         ...prev,
// //         id: "",
// //         firstName: "",
// //         lastName: "",
// //         perHourRate: "",
// //         orgId: newEntry.idType === "Vendor" ? prev.orgId : "", // Keep orgId for Vendor type
// //         plcGlcCode: "",
// //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //       }));
// //       setPlcSearch("");
// //       setAutoPopulatedPLC(false);
// //       return;
// //     }

// //     // Check for duplicate employee ID
// //     const isDuplicate = localEmployees.some(emp =>
// //       emp.emple && emp.emple.emplId === trimmedValue
// //     );

// //     if (isDuplicate) {
// //       toast.error("This ID already exists. Please use a different ID.", {
// //         toastId: "duplicate-id",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     // For "Other" type, allow any ID without validation
// //     if (newEntry.idType === "Other") {
// //       return;
// //     }

// //     // Only validate and populate for Employee/Vendor types if we have suggestions loaded
// //     if (
// //       (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
// //       employeeSuggestions.length > 0
// //     ) {
// //       const selectedEmployee = employeeSuggestions.find(emp => emp.emplId === trimmedValue);

// //       if (selectedEmployee) {
// //         // Valid employee found - populate fields INCLUDING PLC for Vendor
// //         setNewEntry((prev) => ({
// //           ...prev,
// //           id: trimmedValue,
// //           firstName: selectedEmployee.firstName || "",
// //           lastName: selectedEmployee.lastName || "",
// //           perHourRate: selectedEmployee.perHourRate || "",
// //           orgId: selectedEmployee.orgId || prev.orgId, // Keep existing orgId if not provided
// //           plcGlcCode: selectedEmployee.plc || "", // AUTO-POPULATE PLC
// //           acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //         }));
// //         setPlcSearch(selectedEmployee.plc || ""); // UPDATE PLC SEARCH TOO
// //         setAutoPopulatedPLC(!!selectedEmployee.plc); // Mark as auto-populated if PLC exists
// //       } else {
// //         // Only show error if the user has typed at least 3 characters AND no partial match exists
// //         if (trimmedValue.length >= 3) {
// //           // Check if any employee ID starts with typed value
// //           const partialMatch = employeeSuggestions.some((emp) =>
// //             emp.emplId.startsWith(trimmedValue)
// //           );

// //           if (!partialMatch) {
// //             toast.error("Invalid ID, please select a valid one!", {
// //               toastId: "invalid-id",
// //               autoClose: 3000,
// //             });
// //           }
// //         }

// //         // Don't auto-populate fields for invalid IDs, but keep the entered value
// //         setNewEntry((prev) => ({
// //           ...prev,
// //           firstName: "",
// //           lastName: "",
// //           perHourRate: "",
// //           // DON'T clear orgId for Vendor type as it should come from project
// //           orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
// //           plcGlcCode: "",
// //           acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //         }));
// //         setPlcSearch("");
// //         setAutoPopulatedPLC(false);
// //       }
// //     }
// //   };

// const handleIdChange = (value) => {
//   const trimmedValue = value.trim();

//   // 1. PLC type is always “PLC”
//   if (newEntry.idType === "PLC") {
//     setNewEntry(prev => ({ ...prev, id: "PLC" }));
//     return;
//   }

//   // 2. Persist whatever the user typed
//   setNewEntry(prev => ({ ...prev, id: trimmedValue }));

//   // 3. If the field is cleared, reset most fields and exit
//   if (!trimmedValue) {
//     setNewEntry(prev => ({
//       ...prev,
//       id: "",
//       firstName: "",
//       lastName: "",
//       perHourRate: "",
//       orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//       plcGlcCode: "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//     }));
//     setPlcSearch("");
//     setAutoPopulatedPLC(false);
//     return;
//   }

//   // 4. Duplicate check against already-saved employees
//   const isDuplicate = localEmployees.some(
//     emp => emp.emple && emp.emple.emplId === trimmedValue
//   );
//   if (isDuplicate) {
//     toast.error("This ID already exists. Please use a different ID.", {
//       toastId: "duplicate-id",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // 5. “Other” type needs no further validation
//   if (newEntry.idType === "Other") return;

//   // 6. For Employee / Vendor types, try to auto-populate from suggestions
//   if (
//     (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
//     employeeSuggestions.length > 0
//   ) {
//     const selectedEmployee = employeeSuggestions.find(
//       emp => emp.emplId === trimmedValue
//     );

//     if (selectedEmployee) {
//       // Found a match – copy its details, *including PLC*
//       setNewEntry(prev => ({
//         ...prev,
//         id: trimmedValue,
//         firstName: selectedEmployee.firstName || "",
//         lastName: selectedEmployee.lastName || "",
//         perHourRate: selectedEmployee.perHourRate || "",
//         orgId: selectedEmployee.orgId || prev.orgId,
//         plcGlcCode: selectedEmployee.plc || "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch(selectedEmployee.plc || "");
//       setAutoPopulatedPLC(!!selectedEmployee.plc);
//     } else {
//       // No exact match – warn only if the entry is clearly invalid
//       if (trimmedValue.length >= 3) {
//         const partialMatch = employeeSuggestions.some(emp =>
//           emp.emplId.startsWith(trimmedValue)
//         );
//         if (!partialMatch) {
//           toast.error("Invalid ID, please select a valid one!", {
//             toastId: "invalid-id",
//             autoClose: 3000,
//           });
//         }
//       }

//       // Leave any previously auto-populated PLC untouched;
//       // only clear PLC when it wasn’t auto-filled.
//       setNewEntry(prev => ({
//         ...prev,
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//         plcGlcCode:
//           newEntry.idType === "Vendor" && autoPopulatedPLC
//             ? prev.plcGlcCode
//             : "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));

//       if (!(newEntry.idType === "Vendor" && autoPopulatedPLC)) {
//         setPlcSearch("");
//         setAutoPopulatedPLC(false);
//       }
//     }
//   }
// };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }
//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (
//             planType === "EAC" &&
//             !isMonthEditable(duration, closedPeriod, planType)
//           ) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (
//       fillMethod === "Use Start Period Hours" &&
//       sortedDurations.length > 0
//     ) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error(
//           "Start Period hours are outside the selected duration range."
//         );
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", { autoClose: 3000 });
//       return;
//     }

//     // Check for duplicate employee ID before validating anything else
//     const isDuplicate = localEmployees.some(
//       emp => emp.emple && emp.emple.emplId === newEntry.id.trim()
//     );
//     if (isDuplicate) {
//       toast.error("Can't save entry with existing ID. Please use a different ID.", {
//         toastId: "duplicate-save-error",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (newEntry.idType === "PLC") {
//       if (!newEntry.id || newEntry.id !== "PLC") {
//         toast.error("ID must be automatically set to 'PLC' for PLC type.", { autoClose: 3000 });
//         return;
//       }
//     } else if (newEntry.idType === "Other") {
//       // For Other type, just check that it's not empty (no further validation)
//       if (!newEntry.id.trim()) {
//         toast.error("ID is required.", { autoClose: 3000 });
//         return;
//       }
//     } else if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       if (!newEntry.id.trim()) {
//         toast.error("ID is required.", { autoClose: 3000 });
//         return;
//       }
//       // Only validate against suggestions if we have them
//       if (employeeSuggestions.length > 0) {
//         const validEmployee = employeeSuggestions.find(emp => emp.emplId === newEntry.id.trim());
//         if (!validEmployee) {
//           toast.error("Please enter a valid ID from the available list.", { autoClose: 3000 });
//           return;
//         }
//       }
//     }

//     if (!isValidAccount(newEntry.acctId)) {
//       toast.error("Please enter a valid Account from the available list.", { autoClose: 3000 });
//       return;
//     }
//     if (!isValidOrg(newEntry.orgId)) {
//       toast.error("Organization is required.", { autoClose: 3000 });
//       return;
//     }
//     if (!isValidPlc(newEntry.plcGlcCode)) {
//       toast.error("Please enter a valid Plc from the available list.", { autoClose: 3000 });
//       return;
//     }

//     setIsDurationLoading(true);
//     const payloadForecasts = durations.map(duration => ({
//       forecastedhours: Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) || 0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));
//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };
//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );
//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err?.response?.data?.message ||
//             JSON.stringify(err?.response?.data?.errors) ||
//             err?.message),
//         { toastId: "save-entry-error", autoClose: 5000 }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (
//           !isNaN(Number(findValueTrimmed)) &&
//           Number(findValueTrimmed) === 0
//         ) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue =
//             newValue === "" ? 0 : parseFloat(newValue) || 0;
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]:
//                   newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(
//       `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
//     );

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) =>
//                     f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue =
//                     parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               {!showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFindReplace(true)}
//                 >
//                   Find / Replace
//                 </button>
//               )}
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="vertical-scroll-wrapper" ref={verticalScrollRef}>
//           <div className="synchronized-tables-container flex">
//             <div className="synchronized-table-scroll first">
//               <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <th
//                         key={col.key}
//                         className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <select
//                           name="idType"
//                           value={newEntry.idType || ""}
//                           onChange={(e) => handleIdTypeChange(e.target.value)}
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         >
//                           {ID_TYPE_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="id"
//                           value={newEntry.id}
//                           onChange={(e) => handleIdChange(e.target.value)}
//                           disabled={newEntry.idType === "PLC"}
//                           className={`w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border ${
//                             newEntry.idType === "PLC" ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="employee-id-list"
//                           placeholder={newEntry.idType === "PLC" ? "Not required for PLC" : "Enter ID"}
//                         />
//                         <datalist id="employee-id-list">
//                           {employeeSuggestions
//                             .filter(
//                               (emp) =>
//                                 emp.emplId && typeof emp.emplId === "string"
//                             )
//                             .map((emp, index) => (
//                               <option
//                                 key={`${emp.emplId}-${index}`}
//                                 value={emp.emplId}
//                               >
//                                 {emp.lastName && emp.firstName
//                                   ? `${emp.lastName}, ${emp.firstName}`
//                                   : emp.lastName || emp.firstName || emp.emplId}
//                               </option>
//                             ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="name"
//                           value={
//                             newEntry.idType === "Vendor"
//                               ? newEntry.lastName || newEntry.firstName || ""
//                               : newEntry.lastName && newEntry.firstName
//                               ? `${newEntry.lastName}, ${newEntry.firstName}`
//                               : newEntry.lastName || newEntry.firstName || ""
//                           }
//                           readOnly
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                           placeholder="Name (auto-filled)"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="acctId"
//                           value={newEntry.acctId}
//                           onChange={(e) => handleAccountChange(e.target.value)}
//                           onBlur={(e) => handleAccountBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="account-list"
//                           placeholder="Enter Account"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="account-list">
//                           {laborAccounts.map((account, index) => (
//                             <option
//                               key={`${account.id}-${index}`}
//                               value={account.id}
//                             >
//                               {account.id}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="orgId"
//                           value={newEntry.orgId}
//                           onChange={(e) => handleOrgChange(e.target.value)}
//                           onBlur={(e) => handleOrgBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Organization"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="plcGlcCode"
//                           value={newEntry.plcGlcCode}
//                           onChange={(e) =>
//                             isBudPlan && handlePlcInputChange(e.target.value)
//                           }
//                           onBlur={(e) => handlePlcBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan || autoPopulatedPLC ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="plc-list"
//                           placeholder="Enter Plc"
//                           disabled={!isBudPlan || autoPopulatedPLC}
//                           readOnly={autoPopulatedPLC}
//                         />
//                         <datalist id="plc-list">
//                           {plcOptions.map((plc, index) => (
//                             <option
//                               key={`${plc.value}-${index}`}
//                               value={plc.value}
//                             >
//                               {plc.label}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isRev"
//                           checked={newEntry.isRev}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isRev: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isBrd"
//                           checked={newEntry.isBrd}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isBrd: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="status"
//                           value={newEntry.status}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, status: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           placeholder="Enter Status"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="perHourRate"
//                           value={newEntry.perHourRate}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               perHourRate: e.target.value.replace(
//                                 /[^0-9.]/g,
//                                 ""
//                               ),
//                             })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Hour Rate"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         {Object.values(newEntryPeriodHours)
//                           .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                           .toFixed(2)}
//                       </td>
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const row = getEmployeeRow(emp, actualEmpIdx);
//                       const editedData = editedEmployeeData[actualEmpIdx] || {};
//                       return (
//                         <tr
//                           key={`employee-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.idType}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.emplId}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.name}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.acctId !== undefined
//                                     ? editedData.acctId
//                                     : row.acctId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "acctId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="account-list"
//                               />
//                             ) : (
//                               row.acctId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.orgId !== undefined
//                                     ? editedData.orgId
//                                     : row.orgId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "orgId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.orgId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.glcPlc !== undefined
//                                     ? editedData.glcPlc
//                                     : row.glcPlc
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "glcPlc",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="plc-list"
//                               />
//                             ) : (
//                               row.glcPlc
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isRev !== undefined
//                                     ? editedData.isRev
//                                     : emp.emple.isRev
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isRev",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isRev
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isBrd !== undefined
//                                     ? editedData.isBrd
//                                     : emp.emple.isBrd
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isBrd",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isBrd
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.status}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.perHourRate !== undefined
//                                     ? editedData.perHourRate
//                                     : row.perHourRate
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "perHourRate",
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.perHourRate
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.total}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="synchronized-table-scroll last">
//               <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       return (
//                         <th
//                           key={uniqueKey}
//                           className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                             selectedColumnKey === uniqueKey
//                               ? "bg-yellow-100"
//                               : ""
//                           }`}
//                           style={{ cursor: isEditable ? "pointer" : "default" }}
//                           onClick={() => handleColumnHeaderClick(uniqueKey)}
//                         >
//                           <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                               {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                               {duration.workingHours || 0} hrs
//                             </span>
//                           </div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {sortedDurations.map((duration) => {
//                         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                         const isInputEditable =
//                           isEditable &&
//                           isMonthEditable(duration, closedPeriod, planType);
//                         return (
//                           <td
//                             key={`new-${uniqueKey}`}
//                             className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                               planType === "EAC"
//                                 ? isInputEditable
//                                   ? "bg-green-50"
//                                   : "bg-gray-200"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               type="text"
//                               inputMode="numeric"
//                               value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                               onChange={(e) =>
//                                 isInputEditable &&
//                                 setNewEntryPeriodHours((prev) => ({
//                                   ...prev,
//                                   [uniqueKey]: e.target.value.replace(
//                                     /[^0-9.]/g,
//                                     ""
//                                   ),
//                                 }))
//                               }
//                               className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                 !isInputEditable
//                                   ? "cursor-not-allowed text-gray-400"
//                                   : "text-gray-700"
//                               }`}
//                               disabled={!isInputEditable}
//                               placeholder="Enter Hours"
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const monthHours = getMonthHours(emp);
//                       return (
//                         <tr
//                           key={`hours-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           {sortedDurations.map((duration) => {
//                             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                             const forecast = monthHours[uniqueKey];
//                             const value =
//                               inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                               (forecast?.value !== undefined
//                                 ? forecast.value
//                                 : "0");
//                             const isInputEditable =
//                               isEditable &&
//                               isMonthEditable(duration, closedPeriod, planType);
//                             return (
//                               <td
//                                 key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                                 className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                   selectedColumnKey === uniqueKey
//                                     ? "bg-yellow-100"
//                                     : ""
//                                 } ${
//                                   planType === "EAC"
//                                     ? isInputEditable
//                                       ? "bg-green-50"
//                                       : "bg-gray-200"
//                                     : ""
//                                 }`}
//                               >
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                     !isInputEditable
//                                       ? "cursor-not-allowed text-gray-400"
//                                       : "text-gray-700"
//                                   }`}
//                                   value={value}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value.replace(/[^0-9.]/g, "")
//                                     )
//                                   }
//                                   onBlur={(e) =>
//                                     handleForecastHoursBlur(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isInputEditable}
//                                   placeholder="Enter Hours"
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const [autoPopulatedPLC, setAutoPopulatedPLC] = useState(false); // Track if PLC is auto-populated
//   const debounceTimeout = useRef(null);
//   const horizontalScrollRef = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);
//   const vfirstTableRef = useRef(null);
//   const vlastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Clear all fields when ID type changes
//   useEffect(() => {
//     if (newEntry.idType === "PLC") {
//       setNewEntry({
//         ...newEntry,
//         id: "PLC",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       });
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     } else if (newEntry.idType !== "") {
//       // Clear all fields when switching to any other type
//       setNewEntry(prev => ({
//         ...prev,
//         id: "",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     }
//   // eslint-disable-next-line
//   }, [newEntry.idType]);

//   const isValidEmployeeId = (id) => {
//     if (!id) return false;
//     if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     if (newEntry.idType === "Other") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     return true;
//   };

//   const isValidAccount = (val) => !val || laborAccounts.some(acc => acc.id === val);

//   // Fixed organization validation - allow any non-empty value
//   const isValidOrg = (val) => {
//     if (!val) return true; // Allow empty
//     return val.toString().trim().length > 0; // Just check if it's not empty after trimming
//   };

//   // const isValidPlc = (val) => !val || plcOptions.some(opt => opt.value === val) || autoPopulatedPLC;
//   const isValidPlc = (val) => {
//   if (!val) return true; // Allow empty
//   // Allow if it's in plcOptions OR if it's auto-populated from employee suggestions
//   return plcOptions.some(opt => opt.value === val) ||
//          employeeSuggestions.some(emp => emp.plc === val);
// };

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified =
//       Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue =
//         "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   // Vertical sync only
//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = vfirstTableRef.current;
//     const lastScroll = vlastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const container = horizontalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       firstScroll.scrollLeft = scrollLeft;
//       lastScroll.scrollLeft = scrollLeft;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.vendId, // Use vendId as the main ID
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "", // This is the PLC from API
//                   orgId: emp.orgId || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "",
//                   orgId: emp.orgId || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);

//         // ONLY auto-populate organization for Vendor Employee type
//         if (newEntry.idType === "Vendor" && data.orgId) {
//           setNewEntry(prev => ({
//             ...prev,
//             orgId: data.orgId
//           }));
//         }
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//             searchTerm
//           )}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch && !autoPopulatedPLC) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType, autoPopulatedPLC]);

//   // ID Type change handler
//   const handleIdTypeChange = (value) => {
//     setNewEntry((prev) => ({
//       id: "",
//       firstName: "",
//       lastName: "",
//       isRev: false,
//       isBrd: false,
//       idType: value,
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       orgId: "",
//       plcGlcCode: "",
//       perHourRate: "",
//       status: "Act",
//     }));
//     setPlcSearch("");
//     setAutoPopulatedPLC(false);
//   };

//   const handlePlcInputChange = (value) => {
//     // Only allow manual input if PLC is not auto-populated
//     if (!autoPopulatedPLC) {
//       setPlcSearch(value);
//       setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//     }
//   };

//   const handlePlcBlur = (val) => {
//     if (val && !isValidPlc(val)) {
//       toast.error("Please enter a valid Plc from the available list.", {autoClose: 3000});
//       if (!autoPopulatedPLC) {
//         setNewEntry(prev => ({...prev, plcGlcCode: ""}));
//         setPlcSearch("");
//       }
//     }
//   };

//   const handleAccountChange = (value) => {
//     setNewEntry((prev) => ({ ...prev, acctId: value }));
//   };

//   const handleAccountBlur = (val) => {
//     if (val && !isValidAccount(val)) {
//       toast.error("Please enter a valid Account from the available list.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, acctId: ""}));
//     }
//   };

//   const handleOrgChange = (value) => {
//     let filteredValue = value;
//     if (newEntry.idType === "Vendor") {
//       filteredValue = value.replace(/[^0-9]/g, ''); // Only numbers for Vendor Org
//     }
//     setNewEntry((prev) => ({ ...prev, orgId: filteredValue }));
//   };

//   const handleOrgBlur = (val) => {
//     if (val && !isValidOrg(val)) {
//       toast.error("Organization is required and cannot be empty.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, orgId: ""}));
//     }
//   };

//   const handleIdChange = (value) => {
//   const trimmedValue = value.trim();

//   // 1. PLC type is always “PLC”
//   if (newEntry.idType === "PLC") {
//     setNewEntry(prev => ({ ...prev, id: "PLC" }));
//     return;
//   }

//   // 2. Persist whatever the user typed
//   setNewEntry(prev => ({ ...prev, id: trimmedValue }));

//   // 3. If the field is cleared, reset most fields and exit
//   if (!trimmedValue) {
//     setNewEntry(prev => ({
//       ...prev,
//       id: "",
//       firstName: "",
//       lastName: "",
//       perHourRate: "",
//       orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//       plcGlcCode: "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//     }));
//     setPlcSearch("");
//     setAutoPopulatedPLC(false);
//     return;
//   }

//   // 4. Duplicate check against already-saved employees
//   const isDuplicate = localEmployees.some(
//     emp => emp.emple && emp.emple.emplId === trimmedValue
//   );
//   if (isDuplicate) {
//     toast.error("This ID already exists. Please use a different ID.", {
//       toastId: "duplicate-id",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // 5. “Other” type needs no further validation
//   if (newEntry.idType === "Other") return;

//   // 6. For Employee / Vendor types, try to auto-populate from suggestions
//   if (
//     (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
//     employeeSuggestions.length > 0
//   ) {
//     const selectedEmployee = employeeSuggestions.find(
//       emp => emp.emplId === trimmedValue
//     );

//     if (selectedEmployee) {
//       // Found a match – copy its details, *including PLC*
//       setNewEntry(prev => ({
//         ...prev,
//         id: trimmedValue,
//         firstName: selectedEmployee.firstName || "",
//         lastName: selectedEmployee.lastName || "",
//         perHourRate: selectedEmployee.perHourRate || "",
//         orgId: selectedEmployee.orgId || prev.orgId,
//         plcGlcCode: selectedEmployee.plc || "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch(selectedEmployee.plc || "");
//       setAutoPopulatedPLC(!!selectedEmployee.plc);
//     } else {
//       // No exact match – warn only if the entry is clearly invalid
//       if (trimmedValue.length >= 3) {
//         const partialMatch = employeeSuggestions.some(emp =>
//           emp.emplId.startsWith(trimmedValue)
//         );
//         if (!partialMatch) {
//           toast.error("Invalid ID, please select a valid one!", {
//             toastId: "invalid-id",
//             autoClose: 3000,
//           });
//         }
//       }

//       // Leave any previously auto-populated PLC untouched;
//       // only clear PLC when it wasn’t auto-filled.
//       setNewEntry(prev => ({
//         ...prev,
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//         plcGlcCode:
//           newEntry.idType === "Vendor" && autoPopulatedPLC
//             ? prev.plcGlcCode
//             : "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));

//       if (!(newEntry.idType === "Vendor" && autoPopulatedPLC)) {
//         setPlcSearch("");
//         setAutoPopulatedPLC(false);
//       }
//     }
//   }
// };

// //   const handleIdChange = (value) => {
// //     const trimmedValue = value.trim();

// //     // 1. PLC type is always “PLC”
// //     if (newEntry.idType === "PLC") {
// //       setNewEntry(prev => ({ ...prev, id: "PLC" }));
// //       return;
// //     }

// //     // 2. Persist whatever the user typed
// //     setNewEntry(prev => ({ ...prev, id: trimmedValue }));

// //     // 3. If the field is cleared, reset most fields and exit
// //     if (!trimmedValue) {
// //       setNewEntry(prev => ({
// //         ...prev,
// //         id: "",
// //         firstName: "",
// //         lastName: "",
// //         perHourRate: "",
// //         orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
// //         plcGlcCode: "",
// //         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //       }));
// //       setPlcSearch("");
// //       setAutoPopulatedPLC(false);
// //       return;
// //     }

// //     // 4. Duplicate check against already-saved employees
// //     const isDuplicate = localEmployees.some(
// //       emp => emp.emple && emp.emple.emplId === trimmedValue
// //     );
// //     if (isDuplicate) {
// //       toast.error("This ID already exists. Please use a different ID.", {
// //         toastId: "duplicate-id",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     // 5. “Other” type needs no further validation
// //     if (newEntry.idType === "Other") return;

// //     // 6. For Employee / Vendor types, try to auto-populate from suggestions
// //     if (
// //       (newEntry.idType === "Employee" || newEntry.idType === "Vendor ") &&
// //       employeeSuggestions.length > 0
// //     ) {
// //       const selectedEmployee = employeeSuggestions.find(
// //         emp => emp.emplId === trimmedValue
// //       );

// //       if (selectedEmployee) {
// //         // Found a match – copy its details, *including PLC*
// //         setNewEntry(prev => ({
// //           ...prev,
// //           id: trimmedValue,
// //           firstName: selectedEmployee.firstName || "",
// //           lastName: selectedEmployee.lastName || "",
// //           perHourRate: selectedEmployee.perHourRate || "",
// //           orgId: selectedEmployee.orgId || prev.orgId,
// //           plcGlcCode: selectedEmployee.plc || "",
// //           acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //         }));
// //         setPlcSearch(selectedEmployee.plc || "");
// //         setAutoPopulatedPLC(!!selectedEmployee.plc);
// //       } else {
// //         // No exact match – warn only if the entry is clearly invalid
// //         if (trimmedValue.length >= 3) {
// //           const partialMatch = employeeSuggestions.some(emp =>
// //             emp.emplId.startsWith(trimmedValue)
// //           );
// //           if (!partialMatch) {
// //             toast.error("Invalid ID, please select a valid one!", {
// //               toastId: "invalid-id",
// //               autoClose: 3000,
// //             });
// //           }
// //         }

// //         // Leave any previously auto-populated PLC untouched;
// //         // only clear PLC when it wasn’t auto-filled.
// //         setNewEntry(prev => ({
// //           ...prev,
// //           firstName: "",
// //           lastName: "",
// //           perHourRate: "",
// //           orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
// //           plcGlcCode:
// //             newEntry.idType === "Vendor" && autoPopulatedPLC
// //               ? prev.plcGlcCode
// //               : "",
// //           acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
// //         }));

// //         if (!(newEntry.idType === "Vendor" && autoPopulatedPLC)) {
// //           setPlcSearch("");
// //           setAutoPopulatedPLC(false);
// //         }
// //       }
// //     }
// //   };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     let filteredValue = value;
//     if (field === "orgId" && localEmployees[empIdx]?.emple?.type === "Vendor") {
//       filteredValue = value.replace(/[^0-9]/g, ''); // Only numbers for Vendor Org
//     } else if (field === "perHourRate") {
//       filteredValue = value.replace(/[^0-9.]/g, '');
//     } else if (field === "glcPlc") {
//       // No filter, but will validate on blur
//     }
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: filteredValue,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     const empType = emp.emple.type || "Employee";

//     // Validation before update
//     if (editedData.acctId !== undefined && !isValidAccount(editedData.acctId)) {
//       toast.error("Invalid Account, must be from the suggestion list.");
//       setEditedEmployeeData(prev => ({
//         ...prev,
//         [empIdx]: { ...prev[empIdx], acctId: originalData.acctId }
//       }));
//       return;
//     }

//     if (editedData.orgId !== undefined) {
//       if (!isValidOrg(editedData.orgId)) {
//         toast.error("Invalid Organization.");
//         setEditedEmployeeData(prev => ({
//           ...prev,
//           [empIdx]: { ...prev[empIdx], orgId: originalData.orgId }
//         }));
//         return;
//       }
//       if (empType === "Vendor" && !/^\d+$/.test(editedData.orgId)) {
//         toast.error("Organization for Vendor must be numeric.");
//         setEditedEmployeeData(prev => ({
//           ...prev,
//           [empIdx]: { ...prev[empIdx], orgId: originalData.orgId }
//         }));
//         return;
//       }
//     }

//     if (editedData.glcPlc !== undefined && !isValidPlc(editedData.glcPlc)) {
//       toast.error("Invalid Plc, must be from the suggestion list.");
//       setEditedEmployeeData(prev => ({
//         ...prev,
//         [empIdx]: { ...prev[empIdx], glcPlc: originalData.glcPlc }
//       }));
//       return;
//     }

//     if (editedData.perHourRate !== undefined) {
//       const rate = parseFloat(editedData.perHourRate);
//       if (isNaN(rate) || rate < 0) {
//         toast.error("Invalid Hour Rate, must be a non-negative number.");
//         setEditedEmployeeData(prev => ({
//           ...prev,
//           [empIdx]: { ...prev[empIdx], perHourRate: originalData.perHourRate }
//         }));
//         return;
//       }
//       if (empType !== "Vendor") {
//         // For non-Vendor, must match suggestion
//         const suggestions = empType === "Employee" ? employeeSuggestions : []; // Assume loaded
//         const selected = suggestions.find(s => s.emplId === emp.emple.emplId);
//         if (selected && rate !== parseFloat(selected.perHourRate)) {
//           toast.error("Invalid Hour Rate, must match the suggested value.");
//           setEditedEmployeeData(prev => ({
//             ...prev,
//             [empIdx]: { ...prev[empIdx], perHourRate: originalData.perHourRate }
//           }));
//           return;
//         }
//       }
//     }

//     // Original change check and PUT
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }

//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (
//             planType === "EAC" &&
//             !isMonthEditable(duration, closedPeriod, planType)
//           ) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (
//       fillMethod === "Use Start Period Hours" &&
//       sortedDurations.length > 0
//     ) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error(
//           "Start Period hours are outside the selected duration range."
//         );
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", { autoClose: 3000 });
//       return;
//     }

//     // Check for duplicate employee ID before validating anything else
//     const isDuplicate = localEmployees.some(
//       emp => emp.emple && emp.emple.emplId === newEntry.id.trim()
//     );
//     if (isDuplicate) {
//       toast.error("Can't save entry with existing ID. Please use a different ID.", {
//         toastId: "duplicate-save-error",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (newEntry.idType === "PLC") {
//       if (!newEntry.id || newEntry.id !== "PLC") {
//         toast.error("ID must be automatically set to 'PLC' for PLC type.", { autoClose: 3000 });
//         return;
//       }
//     } else if (newEntry.idType === "Other") {
//       // For Other type, just check that it's not empty (no further validation)
//       if (!newEntry.id.trim()) {
//         toast.error("ID is required.", { autoClose: 3000 });
//         return;
//       }
//     } else if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       if (!newEntry.id.trim()) {
//         toast.error("ID is required.", { autoClose: 3000 });
//         return;
//       }
//       // Only validate against suggestions if we have them
//       if (employeeSuggestions.length > 0) {
//         const validEmployee = employeeSuggestions.find(emp => emp.emplId === newEntry.id.trim());
//         if (!validEmployee) {
//           toast.error("Please enter a valid ID from the available list.", { autoClose: 3000 });
//           return;
//         } else {
//           // Validate other fields against the selected suggestion
//           if (newEntry.orgId !== validEmployee.orgId) {
//             toast.error("Invalid Organization, must match the suggested value.");
//             return;
//           }
//           if (newEntry.plcGlcCode !== validEmployee.plc) {
//             toast.error("Invalid Plc, must match the suggested value or be from the list.");
//             return;
//           }
//           if (newEntry.idType === "Employee" && newEntry.perHourRate !== validEmployee.perHourRate) {
//             toast.error("Invalid Hour Rate, must match the suggested value.");
//             return;
//           }
//         }
//       }
//     }

//     if (!isValidAccount(newEntry.acctId)) {
//       toast.error("Please enter a valid Account from the available list.", { autoClose: 3000 });
//       return;
//     }
//     if (!isValidOrg(newEntry.orgId)) {
//       toast.error("Organization is required.", { autoClose: 3000 });
//       return;
//     }
//     if (!isValidPlc(newEntry.plcGlcCode)) {
//       toast.error("Please enter a valid Plc from the available list.", { autoClose: 3000 });
//       return;
//     }

//     setIsDurationLoading(true);
//     const payloadForecasts = durations.map(duration => ({
//       forecastedhours: Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) || 0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));
//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };
//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );
//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err?.response?.data?.message ||
//             JSON.stringify(err?.response?.data?.errors) ||
//             err?.message),
//         { toastId: "save-entry-error", autoClose: 5000 }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (
//           !isNaN(Number(findValueTrimmed)) &&
//           Number(findValueTrimmed) === 0
//         ) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue =
//             newValue === "" ? 0 : parseFloat(newValue) || 0;
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]:
//                   newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(
//       `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
//     );

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) =>
//                     f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue =
//                     parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               {!showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFindReplace(true)}
//                 >
//                   Find / Replace
//                 </button>
//               )}
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="vertical-scroll-wrapper" ref={verticalScrollRef}>
//           <div className="synchronized-tables-container flex">
//             <div className="synchronized-table-scroll first">
//               <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <th
//                         key={col.key}
//                         className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <select
//                           name="idType"
//                           value={newEntry.idType || ""}
//                           onChange={(e) => handleIdTypeChange(e.target.value)}
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         >
//                           {ID_TYPE_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="id"
//                           value={newEntry.id}
//                           onChange={(e) => handleIdChange(e.target.value)}
//                           disabled={newEntry.idType === "PLC"}
//                           className={`w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border ${
//                             newEntry.idType === "PLC" ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="employee-id-list"
//                           placeholder={newEntry.idType === "PLC" ? "Not required for PLC" : "Enter ID"}
//                         />
//                         <datalist id="employee-id-list">
//                           {employeeSuggestions
//                             .filter(
//                               (emp) =>
//                                 emp.emplId && typeof emp.emplId === "string"
//                             )
//                             .map((emp, index) => (
//                               <option
//                                 key={`${emp.emplId}-${index}`}
//                                 value={emp.emplId}
//                               >
//                                 {emp.lastName && emp.firstName
//                                   ? `${emp.lastName}, ${emp.firstName}`
//                                   : emp.lastName || emp.firstName || emp.emplId}
//                               </option>
//                             ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="name"
//                           value={
//                             newEntry.idType === "Vendor"
//                               ? newEntry.lastName || newEntry.firstName || ""
//                               : newEntry.lastName && newEntry.firstName
//                               ? `${newEntry.lastName}, ${newEntry.firstName}`
//                               : newEntry.lastName || newEntry.firstName || ""
//                           }
//                           readOnly
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                           placeholder="Name (auto-filled)"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="acctId"
//                           value={newEntry.acctId}
//                           onChange={(e) => handleAccountChange(e.target.value)}
//                           onBlur={(e) => handleAccountBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="account-list"
//                           placeholder="Enter Account"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="account-list">
//                           {laborAccounts.map((account, index) => (
//                             <option
//                               key={`${account.id}-${index}`}
//                               value={account.id}
//                             >
//                               {account.id}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="orgId"
//                           value={newEntry.orgId}
//                           onChange={(e) => handleOrgChange(e.target.value)}
//                           onBlur={(e) => handleOrgBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Organization"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="plcGlcCode"
//                           value={newEntry.plcGlcCode}
//                           onChange={(e) =>
//                             isBudPlan && handlePlcInputChange(e.target.value)
//                           }
//                           onBlur={(e) => handlePlcBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`} // Removed autoPopulatedPLC condition to make editable
//                           list="plc-list"
//                           placeholder="Enter Plc"
//                           disabled={!isBudPlan} // Removed autoPopulatedPLC to make editable
//                           readOnly={false} // Ensure editable
//                         />
//                         <datalist id="plc-list">
//                           {plcOptions.map((plc, index) => (
//                             <option
//                               key={`${plc.value}-${index}`}
//                               value={plc.value}
//                             >
//                               {plc.label}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isRev"
//                           checked={newEntry.isRev}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isRev: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isBrd"
//                           checked={newEntry.isBrd}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isBrd: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="status"
//                           value={newEntry.status}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, status: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           placeholder="Enter Status"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="perHourRate"
//                           value={newEntry.perHourRate}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               perHourRate: e.target.value.replace(
//                                 /[^0-9.]/g,
//                                 ""
//                               ),
//                             })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Hour Rate"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         {Object.values(newEntryPeriodHours)
//                           .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                           .toFixed(2)}
//                       </td>
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const row = getEmployeeRow(emp, actualEmpIdx);
//                       const editedData = editedEmployeeData[actualEmpIdx] || {};
//                       return (
//                         <tr
//                           key={`employee-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.idType}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.emplId}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.name}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.acctId !== undefined
//                                     ? editedData.acctId
//                                     : row.acctId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "acctId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="account-list"
//                               />
//                             ) : (
//                               row.acctId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.orgId !== undefined
//                                     ? editedData.orgId
//                                     : row.orgId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "orgId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.orgId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.glcPlc !== undefined
//                                     ? editedData.glcPlc
//                                     : row.glcPlc
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "glcPlc",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="plc-list"
//                               />
//                             ) : (
//                               row.glcPlc
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isRev !== undefined
//                                     ? editedData.isRev
//                                     : emp.emple.isRev
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isRev",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isRev
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isBrd !== undefined
//                                     ? editedData.isBrd
//                                     : emp.emple.isBrd
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isBrd",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isBrd
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.status}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.perHourRate !== undefined
//                                     ? editedData.perHourRate
//                                     : row.perHourRate
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "perHourRate",
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.perHourRate
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.total}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="synchronized-table-scroll last">
//               <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       return (
//                         <th
//                           key={uniqueKey}
//                           className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                             selectedColumnKey === uniqueKey
//                               ? "bg-yellow-100"
//                               : ""
//                           }`}
//                           style={{ cursor: isEditable ? "pointer" : "default" }}
//                           onClick={() => handleColumnHeaderClick(uniqueKey)}
//                         >
//                           <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                               {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                               {duration.workingHours || 0} hrs
//                             </span>
//                           </div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {sortedDurations.map((duration) => {
//                         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                         const isInputEditable =
//                           isEditable &&
//                           isMonthEditable(duration, closedPeriod, planType);
//                         return (
//                           <td
//                             key={`new-${uniqueKey}`}
//                             className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                               planType === "EAC"
//                                 ? isInputEditable
//                                   ? "bg-green-50"
//                                   : "bg-gray-200"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               type="text"
//                               inputMode="numeric"
//                               value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                               onChange={(e) =>
//                                 isInputEditable &&
//                                 setNewEntryPeriodHours((prev) => ({
//                                   ...prev,
//                                   [uniqueKey]: e.target.value.replace(
//                                     /[^0-9.]/g,
//                                     ""
//                                   ),
//                                 }))
//                               }
//                               className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                 !isInputEditable
//                                   ? "cursor-not-allowed text-gray-400"
//                                   : "text-gray-700"
//                               }`}
//                               disabled={!isInputEditable}
//                               placeholder="Enter Hours"
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const monthHours = getMonthHours(emp);
//                       return (
//                         <tr
//                           key={`hours-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           {sortedDurations.map((duration) => {
//                             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                             const forecast = monthHours[uniqueKey];
//                             const value =
//                               inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                               (forecast?.value !== undefined
//                                 ? forecast.value
//                                 : "0");
//                             const isInputEditable =
//                               isEditable &&
//                               isMonthEditable(duration, closedPeriod, planType);
//                             return (
//                               <td
//                                 key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                                 className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                   selectedColumnKey === uniqueKey
//                                     ? "bg-yellow-100"
//                                     : ""
//                                 } ${
//                                   planType === "EAC"
//                                     ? isInputEditable
//                                       ? "bg-green-50"
//                                       : "bg-gray-200"
//                                     : ""
//                                 }`}
//                               >
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                     !isInputEditable
//                                       ? "cursor-not-allowed text-gray-400"
//                                       : "text-gray-700"
//                                   }`}
//                                   value={value}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value.replace(/[^0-9.]/g, "")
//                                     )
//                                   }
//                                   onBlur={(e) =>
//                                     handleForecastHoursBlur(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isInputEditable}
//                                   placeholder="Enter Hours"
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "glcPlc", label: "Plc" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "perHourRate", label: "Hour Rate" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "Select ID Type" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor Employee" },
//   { value: "PLC", label: "PLC" },
//   { value: "Other", label: "Other" },
// ];

// const ROW_HEIGHT_DEFAULT = 48;

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
//   return (
//     durationYear > closedYear ||
//     (durationYear === closedYear && durationMonth >= closedMonth)
//   );
// }

// const ProjectHoursDetails = ({
//   planId,
//   projectId,
//   status,
//   planType,
//   closedPeriod,
//   startDate,
//   endDate,
//   fiscalYear,
//   onSaveSuccess,
// }) => {
//   const [durations, setDurations] = useState([]);
//   const [isDurationLoading, setIsDurationLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [inputValues, setInputValues] = useState({});
//   const [showFindReplace, setShowFindReplace] = useState(false);
//   const [findValue, setFindValue] = useState("");
//   const [replaceValue, setReplaceValue] = useState("");
//   const [replaceScope, setReplaceScope] = useState("all");
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
//   const [showNewForm, setShowNewForm] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     id: "",
//     firstName: "",
//     lastName: "",
//     isRev: false,
//     isBrd: false,
//     idType: "",
//     acctId: "",
//     orgId: "",
//     plcGlcCode: "",
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [laborAccounts, setLaborAccounts] = useState([]);
//   const [plcOptions, setPlcOptions] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [fillHours, setFillHours] = useState(0.0);
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedEmployeeData, setEditedEmployeeData] = useState({});
//   const [localEmployees, setLocalEmployees] = useState([]);
//   const [fillStartDate, setFillStartDate] = useState(startDate);
//   const [fillEndDate, setFillEndDate] = useState(endDate);
//   const [isLoading, setIsLoading] = useState(false);
//   const [autoPopulatedPLC, setAutoPopulatedPLC] = useState(false); // Track if PLC is auto-populated
//   const debounceTimeout = useRef(null);
//   const horizontalScrollRef = useRef(null);
//   const verticalScrollRef = useRef(null);
//   const firstTableRef = useRef(null);
//   const lastTableRef = useRef(null);
//   const vfirstTableRef = useRef(null);
//   const vlastTableRef = useRef(null);

//   const isEditable = status === "In Progress";
//   const isBudPlan = planType === "BUD";

//   // Clear all fields when ID type changes
//   useEffect(() => {
//     if (newEntry.idType === "PLC") {
//       setNewEntry({
//         ...newEntry,
//         id: "PLC",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       });
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     } else if (newEntry.idType !== "") {
//       // Clear all fields when switching to any other type
//       setNewEntry(prev => ({
//         ...prev,
//         id: "",
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: "",
//         plcGlcCode: "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     }
//   // eslint-disable-next-line
//   }, [newEntry.idType]);

//   const isValidEmployeeId = (id) => {
//     if (!id) return false;
//     if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     if (newEntry.idType === "Other") {
//       return !!employeeSuggestions.find(emp => emp.emplId === id);
//     }
//     return true;
//   };

//   const isValidAccount = (val) => !val || laborAccounts.some(acc => acc.id === val);

//   // Fixed organization validation - allow any non-empty value
//   const isValidOrg = (val) => {
//     if (!val) return true; // Allow empty
//     return val.toString().trim().length > 0; // Just check if it's not empty after trimming
//   };

//   // const isValidPlc = (val) => !val || plcOptions.some(opt => opt.value === val) || autoPopulatedPLC;
//   const isValidPlc = (val) => {
//   if (!val) return true; // Allow empty
//   // Allow if it's in plcOptions OR if it's auto-populated from employee suggestions
//   return plcOptions.some(opt => opt.value === val) ||
//          employeeSuggestions.some(emp => emp.plc === val);
// };

//   // Track unsaved changes
//   const hasUnsavedChanges = () => {
//     const isNewEntryModified =
//       newEntry.id !== "" ||
//       newEntry.firstName !== "" ||
//       newEntry.lastName !== "" ||
//       newEntry.isRev ||
//       newEntry.isBrd ||
//       newEntry.idType !== "" ||
//       newEntry.acctId !== "" ||
//       newEntry.orgId !== "" ||
//       newEntry.plcGlcCode !== "" ||
//       newEntry.perHourRate !== "" ||
//       newEntry.status !== "Act";

//     const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
//     const isInputValuesModified = Object.keys(inputValues).length > 0;
//     const isEditedEmployeeDataModified =
//       Object.keys(editedEmployeeData).length > 0;

//     return (
//       isNewEntryModified ||
//       isPeriodHoursModified ||
//       isInputValuesModified ||
//       isEditedEmployeeDataModified
//     );
//   };

//   // Handle beforeunload event for unsaved changes
//   useEffect(() => {
//     if (!hasUnsavedChanges()) return;

//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue =
//         "You have unsaved changes. Are you sure you want to leave without saving?";
//       return event.returnValue;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

//   // Vertical sync only
//   useEffect(() => {
//     const container = verticalScrollRef.current;
//     const firstScroll = vfirstTableRef.current;
//     const lastScroll = vlastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollTop = container.scrollTop;
//       firstScroll.scrollTop = scrollTop;
//       lastScroll.scrollTop = scrollTop;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const container = horizontalScrollRef.current;
//     const firstScroll = firstTableRef.current;
//     const lastScroll = lastTableRef.current;

//     if (!container || !firstScroll || !lastScroll) return;

//     const onScroll = () => {
//       const scrollLeft = container.scrollLeft;
//       firstScroll.scrollLeft = scrollLeft;
//       lastScroll.scrollLeft = scrollLeft;
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   const fetchEmployees = async () => {
//     if (!planId) return;
//     setIsLoading(true);
//     try {
//       const employeeApi =
//         planType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//       const response = await axios.get(employeeApi);
//       setLocalEmployees(Array.isArray(response.data) ? response.data : []);
//     } catch (err) {
//       setLocalEmployees([]);
//       if (err.response && err.response.status === 500) {
//         toast.info("No forecast data available for this plan.", {
//           toastId: "no-forecast-data",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [planId, planType]);

//   useEffect(() => {
//     const fetchDurations = async () => {
//       if (!startDate || !endDate) {
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
//         setError("Failed to load duration data. Please try again.");
//         toast.error(
//           "Failed to load duration data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "duration-error",
//             autoClose: 3000,
//           }
//         );
//       } finally {
//         setIsDurationLoading(false);
//       }
//     };
//     fetchDurations();
//   }, [startDate, endDate]);

//   useEffect(() => {
//     const fetchEmployeesSuggestions = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.vendId, // Use vendId as the main ID
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "", // This is the PLC from API
//                   orgId: emp.orgId || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                   perHourRate: emp.perHourRate || emp.hrRate || "",
//                   plc: emp.plc || "",
//                   orgId: emp.orgId || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//       } catch (err) {
//         setEmployeeSuggestions([]);
//         toast.error(`Failed to fetch employee suggestions`, {
//           toastId: "employee-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchLaborAccounts = async () => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.laborAccounts)
//           ? data.laborAccounts.map((account) => ({ id: account }))
//           : [];
//         setLaborAccounts(accounts);

//         // ONLY auto-populate organization for Vendor Employee type
//         if (newEntry.idType === "Vendor" && data.orgId) {
//           setNewEntry(prev => ({
//             ...prev,
//             orgId: data.orgId
//           }));
//         }
//       } catch (err) {
//         setLaborAccounts([]);
//         toast.error(`Failed to fetch labor accounts`, {
//           toastId: "labor-accounts-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     const fetchPlcOptions = async (searchTerm) => {
//       if (!projectId || !showNewForm) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(
//             searchTerm
//           )}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         setPlcOptions([]);
//         toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
//           toastId: "plc-fetch-error",
//           autoClose: 3000,
//         });
//       }
//     };

//     if (showNewForm) {
//       fetchEmployeesSuggestions();
//       fetchLaborAccounts();
//       if (plcSearch && !autoPopulatedPLC) {
//         if (debounceTimeout.current) {
//           clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//           fetchPlcOptions(plcSearch);
//         }, 300);
//       } else {
//         setPlcOptions([]);
//       }
//     } else {
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//     }

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [projectId, showNewForm, plcSearch, newEntry.idType, autoPopulatedPLC]);

//   // ID Type change handler
//   const handleIdTypeChange = (value) => {
//     setNewEntry((prev) => ({
//       id: "",
//       firstName: "",
//       lastName: "",
//       isRev: false,
//       isBrd: false,
//       idType: value,
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       orgId: "",
//       plcGlcCode: "",
//       perHourRate: "",
//       status: "Act",
//     }));
//     setPlcSearch("");
//     setAutoPopulatedPLC(false);
//   };

//   const handlePlcInputChange = (value) => {
//     setPlcSearch(value);
//     if (value && !isValidPlc(value)) {
//       toast.error("Invalid Plc, must be from the suggestion list.");
//       return;
//     }
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//   };

//   const handlePlcBlur = (val) => {
//     if (val && !isValidPlc(val)) {
//       toast.error("Please enter a valid Plc from the available list.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, plcGlcCode: ""}));
//       setPlcSearch("");
//     }
//   };

//   const handleAccountChange = (value) => {
//     setNewEntry((prev) => ({ ...prev, acctId: value }));
//   };

//   const handleAccountBlur = (val) => {
//     if (val && !isValidAccount(val)) {
//       toast.error("Please enter a valid Account from the available list.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, acctId: ""}));
//     }
//   };

//   const handleOrgChange = (value) => {
//     let filteredValue = value;
//     if (newEntry.idType === "Vendor") {
//       filteredValue = value.replace(/[^0-9]/g, ''); // Only allow numbers for Vendor
//     }
//     if (filteredValue && !isValidOrg(filteredValue)) {
//       toast.error("Invalid Organization, must be from the suggestion list.");
//       return;
//     }
//     setNewEntry((prev) => ({ ...prev, orgId: filteredValue }));
//   };

//   const handleOrgBlur = (val) => {
//     if (val && !isValidOrg(val)) {
//       toast.error("Organization is required and cannot be empty.", {autoClose: 3000});
//       setNewEntry(prev => ({...prev, orgId: ""}));
//     }
//   };

// const handleIdChange = (value) => {
//   const trimmedValue = value.trim();

//   // 1. PLC type is always “PLC”
//   if (newEntry.idType === "PLC") {
//     setNewEntry(prev => ({ ...prev, id: "PLC" }));
//     return;
//   }

//   // 2. Persist whatever the user typed
//   setNewEntry(prev => ({ ...prev, id: trimmedValue }));

//   // 3. If the field is cleared, reset most fields and exit
//   if (!trimmedValue) {
//     setNewEntry(prev => ({
//       ...prev,
//       id: "",
//       firstName: "",
//       lastName: "",
//       perHourRate: "",
//       orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//       plcGlcCode: "",
//       acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//     }));
//     setPlcSearch("");
//     setAutoPopulatedPLC(false);
//     return;
//   }

//   // 4. Duplicate check against already-saved employees
//   const isDuplicate = localEmployees.some(
//     emp => emp.emple && emp.emple.emplId === trimmedValue
//   );
//   if (isDuplicate) {
//     toast.error("This ID already exists. Please use a different ID.", {
//       toastId: "duplicate-id",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // 5. “Other” type needs no further validation
//   if (newEntry.idType === "Other") return;

//   // 6. For Employee / Vendor types, try to auto-populate from suggestions
//   if (
//     (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
//     employeeSuggestions.length > 0
//   ) {
//     const selectedEmployee = employeeSuggestions.find(
//       emp => emp.emplId === trimmedValue
//     );

//     if (selectedEmployee) {
//       // Found a match – copy its details, *including PLC*
//       setNewEntry(prev => ({
//         ...prev,
//         id: trimmedValue,
//         firstName: selectedEmployee.firstName || "",
//         lastName: selectedEmployee.lastName || "",
//         perHourRate: selectedEmployee.perHourRate || "",
//         orgId: selectedEmployee.orgId || prev.orgId,
//         plcGlcCode: selectedEmployee.plc || "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));
//       setPlcSearch(selectedEmployee.plc || "");
//       setAutoPopulatedPLC(!!selectedEmployee.plc);
//     } else {
//       // No exact match – warn only if the entry is clearly invalid
//       if (trimmedValue.length >= 3) {
//         const partialMatch = employeeSuggestions.some(emp =>
//           emp.emplId.startsWith(trimmedValue)
//         );
//         if (!partialMatch) {
//           toast.error("Invalid ID, please select a valid one!", {
//             toastId: "invalid-id",
//             autoClose: 3000,
//           });
//         }
//       }

//       // Leave any previously auto-populated PLC untouched;
//       // only clear PLC when it wasn’t auto-filled.
//       setNewEntry(prev => ({
//         ...prev,
//         firstName: "",
//         lastName: "",
//         perHourRate: "",
//         orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
//         plcGlcCode:
//           newEntry.idType === "Vendor" && autoPopulatedPLC
//             ? prev.plcGlcCode
//             : "",
//         acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
//       }));

//       if (!(newEntry.idType === "Vendor" && autoPopulatedPLC)) {
//         setPlcSearch("");
//         setAutoPopulatedPLC(false);
//       }
//     }
//   }
// };

//   const getEmployeeRow = (emp, idx) => {
//     if (!emp || !emp.emple) {
//       return {
//         idType: "-",
//         emplId: "-",
//         name: "-",
//         acctId: "-",
//         orgId: "-",
//         glcPlc: "-",
//         isRev: "-",
//         isBrd: "-",
//         status: "-",
//         perHourRate: "0",
//         total: "0",
//       };
//     }
//     const monthHours = getMonthHours(emp);
//     const totalHours = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthHours[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);
//     return {
//       idType:
//         ID_TYPE_OPTIONS.find(
//           (opt) => opt.value === (emp.emple.type || "Employee")
//         )?.label ||
//         emp.emple.type ||
//         "Employee",
//       emplId: emp.emple.emplId,
//       name:
//         emp.emple.idType === "Vendor"
//           ? emp.emple.lastName || emp.emple.firstName || "-"
//           : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
//             "-",
//       acctId:
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
//       orgId: emp.emple.orgId || "-",
//       glcPlc: emp.emple.plcGlcCode || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-lg">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       perHourRate:
//         emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
//           ? Number(emp.emple.perHourRate).toFixed(2)
//           : "0",
//       total: totalHours.toFixed(2) || "-",
//     };
//   };

//   const getMonthHours = (emp) => {
//     const monthHours = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         const value =
//           planType === "EAC" && forecast.actualhours !== undefined
//             ? forecast.actualhours
//             : forecast.forecastedhours ?? 0;
//         monthHours[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthHours;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleEmployeeDataChange = (empIdx, field, value) => {
//     if (!isEditable || !isBudPlan) return;
//     let filteredValue = value;
//     const empType = localEmployees[empIdx]?.emple?.type;
//     if (field === "orgId") {
//       if (empType === "Vendor") {
//         filteredValue = value.replace(/[^0-9]/g, '');
//       }
//       if (filteredValue && !isValidOrg(filteredValue)) {
//         toast.error("Invalid Organization, must be from the suggestion list.");
//         return;
//       }
//     } else if (field === "glcPlc") {
//       if (value && !isValidPlc(value)) {
//         toast.error("Invalid Plc, must be from the suggestion list.");
//         return;
//       }
//     } else if (field === "perHourRate") {
//       filteredValue = value.replace(/[^0-9.]/g, '');
//     }
//     setEditedEmployeeData((prev) => ({
//       ...prev,
//       [empIdx]: {
//         ...prev[empIdx],
//         [field]: filteredValue,
//       },
//     }));
//   };

//   const handleEmployeeDataBlur = async (empIdx, emp) => {
//     if (!isEditable || !isBudPlan) return;
//     const editedData = editedEmployeeData[empIdx] || {};
//     const originalData = getEmployeeRow(emp, empIdx);
//     if (
//       !editedData ||
//       ((editedData.acctId === undefined ||
//         editedData.acctId === originalData.acctId) &&
//         (editedData.orgId === undefined ||
//           editedData.orgId === originalData.orgId) &&
//         (editedData.glcPlc === undefined ||
//           editedData.glcPlc === originalData.glcPlc) &&
//         (editedData.perHourRate === undefined ||
//           editedData.perHourRate === originalData.perHourRate) &&
//         (editedData.isRev === undefined ||
//           editedData.isRev === emp.emple.isRev) &&
//         (editedData.isBrd === undefined ||
//           editedData.isBrd === emp.emple.isBrd))
//     ) {
//       return;
//     }
//     const payload = {
//       id: emp.emple.id || 0,
//       emplId: emp.emple.emplId,
//       firstName: emp.emple.firstName || "",
//       lastName: emp.emple.lastName || "",
//       type: emp.emple.type || "Employee",
//       isRev:
//         editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
//       isBrd:
//         editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
//       plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
//         .split("-")[0]
//         .substring(0, 20),
//       perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
//       status: emp.emple.status || "Act",
//       accId:
//         editedData.acctId ||
//         emp.emple.accId ||
//         (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
//       orgId: editedData.orgId || emp.emple.orgId || "",
//       plId: planId,
//       plForecasts: emp.emple.plForecasts || [],
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedEmployeeData((prev) => {
//         const newData = { ...prev };
//         delete newData[empIdx];
//         return newData;
//       });
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         updated[empIdx] = {
//           ...updated[empIdx],
//           emple: {
//             ...updated[empIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });

//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       console.error("Failed to update employee:", err);
//     }
//   };

//   const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = localEmployees[empIdx];
//     const monthHours = getMonthHours(emp);
//     const forecast = monthHours[uniqueKey];
//     const originalForecastedHours = forecast?.forecastedhours ?? 0;

//     if (newValue === originalForecastedHours) {
//       return;
//     }

//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.warn("Cannot edit hours for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

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
//       ...(planType === "EAC"
//         ? { actualhours: Number(newValue) || 0 }
//         : { forecastedhours: Number(newValue) || 0 }),
//       createdat: forecast.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast.displayText ?? "",
//     };

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${empIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
//       }));
//       toast.error(
//         "Failed to update forecast: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     if (new Date(fillEndDate) < new Date(fillStartDate)) {
//       toast.error("End Period cannot be before Start Period.");
//       return;
//     }

//     const startDateObj = new Date(fillStartDate);
//     const endDateObj = new Date(fillEndDate);

//     const newHours = {};

//     const isDurationInRange = (duration) => {
//       const durationValue = duration.year * 100 + duration.monthNo;
//       const startYear = startDateObj.getFullYear();
//       const startMonth = startDateObj.getMonth() + 1;
//       const startValue = startYear * 100 + startMonth;
//       const endYear = endDateObj.getFullYear();
//       const endMonth = endDateObj.getMonth() + 1;
//       const endValue = endYear * 100 + endMonth;
//       return durationValue >= startValue && durationValue <= endValue;
//     };

//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = localEmployees[sourceRowIndex];
//       const sourceMonthHours = getMonthHours(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else {
//           newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
//         }
//       });
//     } else if (fillMethod === "Specify Hours") {
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = fillHours.toString();
//         }
//       });
//     } else if (fillMethod === "Use Available Hours") {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         const availableHours = response.data.reduce((acc, d) => {
//           const uniqueKey = `${d.monthNo}_${d.year}`;
//           acc[uniqueKey] = d.workingHours || 0;
//           return acc;
//         }, {});
//         sortedDurations.forEach((duration) => {
//           if (!isDurationInRange(duration)) return;
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           if (
//             planType === "EAC" &&
//             !isMonthEditable(duration, closedPeriod, planType)
//           ) {
//             newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//           } else if (isMonthEditable(duration, closedPeriod, planType)) {
//             newHours[uniqueKey] = availableHours[uniqueKey] || "0";
//           }
//         });
//       } catch (err) {
//         toast.error("Failed to fetch available hours.", {
//           toastId: "available-hours-error",
//           autoClose: 3000,
//         });
//         return;
//       }
//     } else if (
//       fillMethod === "Use Start Period Hours" &&
//       sortedDurations.length > 0
//     ) {
//       const firstDuration = sortedDurations[0];
//       if (!isDurationInRange(firstDuration)) {
//         toast.error(
//           "Start Period hours are outside the selected duration range."
//         );
//         return;
//       }
//       const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
//       const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
//       sortedDurations.forEach((duration) => {
//         if (!isDurationInRange(duration)) return;
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
//         } else if (isMonthEditable(duration, closedPeriod, planType)) {
//           newHours[uniqueKey] = firstValue;
//         }
//       });
//     }

//     setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
//     setShowFillValues(false);
//     setFillMethod("None");
//     setFillHours(0.0);
//     setSourceRowIndex(null);
//   };

//   const handleSaveNewEntry = async () => {
//     if (!planId) {
//       toast.error("Plan ID is required to save a new entry.", { autoClose: 3000 });
//       return;
//     }

//     // Check for duplicate employee ID before validating anything else
//     const isDuplicate = localEmployees.some(
//       emp => emp.emple && emp.emple.emplId === newEntry.id.trim()
//     );
//     if (isDuplicate) {
//       toast.error("Can't save entry with existing ID. Please use a different ID.", {
//         toastId: "duplicate-save-error",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (newEntry.idType === "PLC") {
//       if (!newEntry.id || newEntry.id !== "PLC") {
//         toast.error("ID must be automatically set to 'PLC' for PLC type.", { autoClose: 3000 });
//         return;
//       }
//     } else if (newEntry.idType === "Other") {
//       // For Other type, just check that it's not empty (no further validation)
//       if (!newEntry.id.trim()) {
//         toast.error("ID is required.", { autoClose: 3000 });
//         return;
//       }
//     } else if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
//       if (!newEntry.id.trim()) {
//         toast.error("ID is required.", { autoClose: 3000 });
//         return;
//       }
//       // Only validate against suggestions if we have them
//       if (employeeSuggestions.length > 0) {
//         const validEmployee = employeeSuggestions.find(emp => emp.emplId === newEntry.id.trim());
//         if (!validEmployee) {
//           toast.error("Please enter a valid ID from the available list.", { autoClose: 3000 });
//           return;
//         }
//       }
//     }

//     if (!isValidAccount(newEntry.acctId)) {
//       toast.error("Please enter a valid Account from the available list.", { autoClose: 3000 });
//       return;
//     }
//     if (!isValidOrg(newEntry.orgId)) {
//       toast.error("Organization is required.", { autoClose: 3000 });
//       return;
//     }
//     if (!isValidPlc(newEntry.plcGlcCode)) {
//       toast.error("Please enter a valid Plc from the available list.", { autoClose: 3000 });
//       return;
//     }

//     setIsDurationLoading(true);
//     const payloadForecasts = durations.map(duration => ({
//       forecastedhours: Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) || 0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       month: duration.monthNo,
//       year: duration.year,
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       plc: newEntry.plcGlcCode || "",
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       effectDt: null,
//       plEmployee: null,
//     }));
//     const payload = {
//       id: 0,
//       emplId: newEntry.id,
//       firstName: newEntry.firstName,
//       lastName: newEntry.lastName,
//       type: newEntry.idType,
//       isRev: newEntry.isRev,
//       isBrd: newEntry.isBrd,
//       plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
//       perHourRate: Number(newEntry.perHourRate) || 0,
//       status: newEntry.status || "Act",
//       accId: newEntry.acctId,
//       orgId: newEntry.orgId || "",
//       plId: planId,
//       plForecasts: payloadForecasts,
//     };
//     try {
//       await axios.post(
//         "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
//         payload
//       );
//       setSuccessMessageText("Entry saved successfully!");
//       setShowSuccessMessage(true);
//       setShowNewForm(false);
//       setNewEntry({
//         id: "",
//         firstName: "",
//         lastName: "",
//         isRev: false,
//         isBrd: false,
//         idType: "",
//         acctId: "",
//         orgId: "",
//         plcGlcCode: "",
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodHours({});
//       setEmployeeSuggestions([]);
//       setLaborAccounts([]);
//       setPlcOptions([]);
//       setPlcSearch("");
//       setAutoPopulatedPLC(false);
//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//       fetchEmployees();
//     } catch (err) {
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to save new entry: " +
//           (err?.response?.data?.message ||
//             JSON.stringify(err?.response?.data?.errors) ||
//             err?.message),
//         { toastId: "save-entry-error", autoClose: 5000 }
//       );
//     } finally {
//       setIsDurationLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();

//         function isZeroLike(val) {
//           if (val === undefined || val === null) return true;
//           if (typeof val === "number") return val === 0;
//           if (typeof val === "string") {
//             const trimmed = val.trim();
//             return (
//               trimmed === "" ||
//               trimmed === "0" ||
//               trimmed === "0.0" ||
//               trimmed === "0.00" ||
//               (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
//             );
//           }
//           return false;
//         }

//         let isMatch = false;
//         if (
//           !isNaN(Number(findValueTrimmed)) &&
//           Number(findValueTrimmed) === 0
//         ) {
//           isMatch = isZeroLike(displayedValueTrimmed);
//         } else {
//           isMatch = displayedValueTrimmed === findValueTrimmed;
//           if (!isMatch) {
//             const findNum = parseFloat(findValueTrimmed);
//             const displayNum = parseFloat(displayedValueTrimmed);
//             if (!isNaN(findNum) && !isNaN(displayNum)) {
//               isMatch = findNum === displayNum;
//             }
//           }
//         }

//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue =
//             newValue === "" ? 0 : parseFloat(newValue) || 0;
//           const forecast = getMonthHours(emp)[uniqueKey];

//           if (forecast && forecast.forecastid) {
//             if (displayedValueTrimmed !== newValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;
//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]:
//                   newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             console.log(
//               `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
//             );
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(
//       `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
//     );

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) =>
//                     f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue =
//                     parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });

//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }

//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

//   const handleRowClick = (actualEmpIdx) => {
//     if (!isEditable) return;
//     setSelectedRowIndex(
//       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
//     );
//     setSelectedColumnKey(null);
//     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
//     if (showNewForm) setSourceRowIndex(actualEmpIdx);
//   };

//   const handleColumnHeaderClick = (uniqueKey) => {
//     if (!isEditable) return;
//     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
//     setSelectedRowIndex(null);
//     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
//   };

//   const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations = [...durations]
//     .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
//     .sort(
//       (a, b) =>
//         new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
//     );

//   if (isLoading || isDurationLoading) {
//     return (
//       <div className="p-4 font-inter flex justify-center items-center">
//         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-xs text-gray-600">
//           Loading forecast data...
//         </span>
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

//   const rowCount = Math.max(
//     localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {showSuccessMessage && (
//         <div
//           className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
//             successMessageText.includes("successfully") ||
//             successMessageText.includes("Replaced")
//               ? "bg-green-500"
//               : "bg-red-500"
//           } text-white text-xs`}
//         >
//           {successMessageText}
//         </div>
//       )}

//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2 ">
//           {hasHiddenRows && (
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//               onClick={showHiddenRows}
//             >
//               Show Hidden Rows
//             </button>
//           )}
//           {isEditable && (
//             <>
//               <button
//                 onClick={() => setShowNewForm((prev) => !prev)}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//               >
//                 {showNewForm ? "Cancel" : "New"}
//               </button>
//               {!showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFindReplace(true)}
//                 >
//                   Find / Replace
//                 </button>
//               )}
//               {showNewForm && (
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
//                   onClick={() => isEditable && setShowFillValues(true)}
//                 >
//                   Fill Values
//                 </button>
//               )}
//             </>
//           )}

//           {showNewForm && (
//             <button
//               onClick={handleSaveNewEntry}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
//             >
//               Save Entry
//             </button>
//           )}
//         </div>
//       </div>

//       {showFillValues && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Fill Values to selected record/s
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Select Fill Method
//               </label>
//               <select
//                 value={fillMethod}
//                 onChange={(e) => setFillMethod(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               >
//                 <option value="None">None</option>
//                 <option value="Copy From Source Record">
//                   Copy from source record
//                 </option>
//                 <option value="Specify Hours">Specify Hours</option>
//                 <option value="Use Available Hours">Use Available Hours</option>
//                 <option value="Use Start Period Hours">
//                   Use Start Period Hours
//                 </option>
//               </select>
//             </div>
//             {fillMethod === "Specify Hours" && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs font-medium mb-1">
//                   Hours
//                 </label>
//                 <input
//                   type="text"
//                   inputMode="decimal"
//                   value={fillHours}
//                   onChange={(e) =>
//                     setFillHours(parseFloat(e.target.value) || 0)
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Backspace" &&
//                       (e.target.value === "0" || e.target.value === "")
//                     ) {
//                       e.preventDefault();
//                       setFillHours("");
//                     }
//                   }}
//                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                   placeholder="0.00"
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="date"
//                 value={fillStartDate}
//                 onChange={(e) => setFillStartDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="date"
//                 value={fillEndDate}
//                 onChange={(e) => setFillEndDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
//                   setFillHours(0.0);
//                   setSourceRowIndex(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={handleFillValues}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//               >
//                 Fill
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {localEmployees.length === 0 &&
//       !showNewForm &&
//       sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="vertical-scroll-wrapper" ref={verticalScrollRef}>
//           <div className="synchronized-tables-container flex">
//             <div className="synchronized-table-scroll first">
//               <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {EMPLOYEE_COLUMNS.map((col) => (
//                       <th
//                         key={col.key}
//                         className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <select
//                           name="idType"
//                           value={newEntry.idType || ""}
//                           onChange={(e) => handleIdTypeChange(e.target.value)}
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                         >
//                           {ID_TYPE_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="id"
//                           value={newEntry.id}
//                           onChange={(e) => handleIdChange(e.target.value)}
//                           disabled={newEntry.idType === "PLC"}
//                           className={`w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border ${
//                             newEntry.idType === "PLC" ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="employee-id-list"
//                           placeholder={newEntry.idType === "PLC" ? "Not required for PLC" : "Enter ID"}
//                         />
//                         <datalist id="employee-id-list">
//                           {employeeSuggestions
//                             .filter(
//                               (emp) =>
//                                 emp.emplId && typeof emp.emplId === "string"
//                             )
//                             .map((emp, index) => (
//                               <option
//                                 key={`${emp.emplId}-${index}`}
//                                 value={emp.emplId}
//                               >
//                                 {emp.lastName && emp.firstName
//                                   ? `${emp.lastName}, ${emp.firstName}`
//                                   : emp.lastName || emp.firstName || emp.emplId}
//                               </option>
//                             ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="name"
//                           value={
//                             newEntry.idType === "Vendor"
//                               ? newEntry.lastName || newEntry.firstName || ""
//                               : newEntry.lastName && newEntry.firstName
//                               ? `${newEntry.lastName}, ${newEntry.firstName}`
//                               : newEntry.lastName || newEntry.firstName || ""
//                           }
//                           readOnly
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
//                           placeholder="Name (auto-filled)"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="acctId"
//                           value={newEntry.acctId}
//                           onChange={(e) => handleAccountChange(e.target.value)}
//                           onBlur={(e) => handleAccountBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="account-list"
//                           placeholder="Enter Account"
//                           disabled={!isBudPlan}
//                         />
//                         <datalist id="account-list">
//                           {laborAccounts.map((account, index) => (
//                             <option
//                               key={`${account.id}-${index}`}
//                               value={account.id}
//                             >
//                               {account.id}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="orgId"
//                           value={newEntry.orgId}
//                           onChange={(e) => handleOrgChange(e.target.value)}
//                           onBlur={(e) => handleOrgBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Organization"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="plcGlcCode"
//                           value={newEntry.plcGlcCode}
//                           onChange={(e) =>
//                             isBudPlan && handlePlcInputChange(e.target.value)
//                           }
//                           onBlur={(e) => handlePlcBlur(e.target.value)}
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan || autoPopulatedPLC ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           list="plc-list"
//                           placeholder="Enter Plc"
//                           disabled={!isBudPlan || autoPopulatedPLC}
//                           readOnly={autoPopulatedPLC}
//                         />
//                         <datalist id="plc-list">
//                           {plcOptions.map((plc, index) => (
//                             <option
//                               key={`${plc.value}-${index}`}
//                               value={plc.value}
//                             >
//                               {plc.label}
//                             </option>
//                           ))}
//                         </datalist>
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isRev"
//                           checked={newEntry.isRev}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isRev: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                         <input
//                           type="checkbox"
//                           name="isBrd"
//                           checked={newEntry.isBrd}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               isBrd: e.target.checked,
//                             })
//                           }
//                           className="w-4 h-4"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="status"
//                           value={newEntry.status}
//                           onChange={(e) =>
//                             setNewEntry({ ...newEntry, status: e.target.value })
//                           }
//                           className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                           placeholder="Enter Status"
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         <input
//                           type="text"
//                           name="perHourRate"
//                           value={newEntry.perHourRate}
//                           onChange={(e) =>
//                             isBudPlan &&
//                             setNewEntry({
//                               ...newEntry,
//                               perHourRate: e.target.value.replace(
//                                 /[^0-9.]/g,
//                                 ""
//                               ),
//                             })
//                           }
//                           className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
//                             !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
//                           }`}
//                           placeholder="Enter Hour Rate"
//                           disabled={!isBudPlan}
//                         />
//                       </td>
//                       <td className="border border-gray-300 px-1.5 py-0.5">
//                         {Object.values(newEntryPeriodHours)
//                           .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                           .toFixed(2)}
//                       </td>
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const row = getEmployeeRow(emp, actualEmpIdx);
//                       const editedData = editedEmployeeData[actualEmpIdx] || {};
//                       return (
//                         <tr
//                           key={`employee-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.idType}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.emplId}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.name}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.acctId !== undefined
//                                     ? editedData.acctId
//                                     : row.acctId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "acctId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="account-list"
//                               />
//                             ) : (
//                               row.acctId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.orgId !== undefined
//                                     ? editedData.orgId
//                                     : row.orgId
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "orgId",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.orgId
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.glcPlc !== undefined
//                                     ? editedData.glcPlc
//                                     : row.glcPlc
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "glcPlc",
//                                     e.target.value
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                 list="plc-list"
//                               />
//                             ) : (
//                               row.glcPlc
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isRev !== undefined
//                                     ? editedData.isRev
//                                     : emp.emple.isRev
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isRev",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isRev
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   editedData.isBrd !== undefined
//                                     ? editedData.isBrd
//                                     : emp.emple.isBrd
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "isBrd",
//                                     e.target.checked
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-4 h-4"
//                               />
//                             ) : (
//                               row.isBrd
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.status}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {isBudPlan && isEditable ? (
//                               <input
//                                 type="text"
//                                 value={
//                                   editedData.perHourRate !== undefined
//                                     ? editedData.perHourRate
//                                     : row.perHourRate
//                                 }
//                                 onChange={(e) =>
//                                   handleEmployeeDataChange(
//                                     actualEmpIdx,
//                                     "perHourRate",
//                                     e.target.value.replace(/[^0-9.]/g, "")
//                                   )
//                                 }
//                                 onBlur={() =>
//                                   handleEmployeeDataBlur(actualEmpIdx, emp)
//                                 }
//                                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                               />
//                             ) : (
//                               row.perHourRate
//                             )}
//                           </td>
//                           <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
//                             {row.total}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="synchronized-table-scroll last">
//               <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
//                 <thead className="sticky-thead">
//                   <tr
//                     style={{
//                       height: `${ROW_HEIGHT_DEFAULT}px`,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     {sortedDurations.map((duration) => {
//                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                       return (
//                         <th
//                           key={uniqueKey}
//                           className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
//                             selectedColumnKey === uniqueKey
//                               ? "bg-yellow-100"
//                               : ""
//                           }`}
//                           style={{ cursor: isEditable ? "pointer" : "default" }}
//                           onClick={() => handleColumnHeaderClick(uniqueKey)}
//                         >
//                           <div className="flex flex-col items-center justify-center h-full">
//                             <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                               {duration.month}
//                             </span>
//                             <span className="text-xs text-gray-600 font-normal">
//                               {duration.workingHours || 0} hrs
//                             </span>
//                           </div>
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {showNewForm && (
//                     <tr
//                       key="new-entry"
//                       className="bg-gray-50"
//                       style={{
//                         height: `${ROW_HEIGHT_DEFAULT}px`,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {sortedDurations.map((duration) => {
//                         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                         const isInputEditable =
//                           isEditable &&
//                           isMonthEditable(duration, closedPeriod, planType);
//                         return (
//                           <td
//                             key={`new-${uniqueKey}`}
//                             className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                               planType === "EAC"
//                                 ? isInputEditable
//                                   ? "bg-green-50"
//                                   : "bg-gray-200"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               type="text"
//                               inputMode="numeric"
//                               value={newEntryPeriodHours[uniqueKey] ?? "0"}
//                               onChange={(e) =>
//                                 isInputEditable &&
//                                 setNewEntryPeriodHours((prev) => ({
//                                   ...prev,
//                                   [uniqueKey]: e.target.value.replace(
//                                     /[^0-9.]/g,
//                                     ""
//                                   ),
//                                 }))
//                               }
//                               className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                 !isInputEditable
//                                   ? "cursor-not-allowed text-gray-400"
//                                   : "text-gray-700"
//                               }`}
//                               disabled={!isInputEditable}
//                               placeholder="Enter Hours"
//                             />
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   )}
//                   {localEmployees
//                     .filter((_, idx) => !hiddenRows[idx])
//                     .map((emp, idx) => {
//                       const actualEmpIdx = localEmployees.findIndex(
//                         (e) => e === emp
//                       );
//                       const monthHours = getMonthHours(emp);
//                       return (
//                         <tr
//                           key={`hours-${actualEmpIdx}`}
//                           className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
//                             selectedRowIndex === actualEmpIdx
//                               ? "bg-yellow-100"
//                               : "even:bg-gray-50"
//                           }`}
//                           style={{
//                             height: `${ROW_HEIGHT_DEFAULT}px`,
//                             lineHeight: "normal",
//                             cursor: isEditable ? "pointer" : "default",
//                           }}
//                           onClick={() => handleRowClick(actualEmpIdx)}
//                         >
//                           {sortedDurations.map((duration) => {
//                             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//                             const forecast = monthHours[uniqueKey];
//                             const value =
//                               inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
//                               (forecast?.value !== undefined
//                                 ? forecast.value
//                                 : "0");
//                             const isInputEditable =
//                               isEditable &&
//                               isMonthEditable(duration, closedPeriod, planType);
//                             return (
//                               <td
//                                 key={`hours-${actualEmpIdx}-${uniqueKey}`}
//                                 className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                   selectedColumnKey === uniqueKey
//                                     ? "bg-yellow-100"
//                                     : ""
//                                 } ${
//                                   planType === "EAC"
//                                     ? isInputEditable
//                                       ? "bg-green-50"
//                                       : "bg-gray-200"
//                                     : ""
//                                 }`}
//                               >
//                                 <input
//                                   type="text"
//                                   inputMode="numeric"
//                                   className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                                     !isInputEditable
//                                       ? "cursor-not-allowed text-gray-400"
//                                       : "text-gray-700"
//                                   }`}
//                                   value={value}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value.replace(/[^0-9.]/g, "")
//                                     )
//                                   }
//                                   onBlur={(e) =>
//                                     handleForecastHoursBlur(
//                                       actualEmpIdx,
//                                       uniqueKey,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={!isInputEditable}
//                                   placeholder="Enter Hours"
//                                 />
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       {showFindReplace && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
//             <h3 className="text-lg font-semibold mb-4">
//               Find and Replace Hours
//             </h3>
//             <div className="mb-3">
//               <label
//                 htmlFor="findValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
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
//               <label
//                 htmlFor="replaceValue"
//                 className="block text-gray-700 text-xs font-medium mb-1"
//               >
//                 Replace with:
//               </label>
//               <input
//                 type="text"
//                 id="replaceValue"
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
//                 value={replaceValue}
//                 onChange={(e) =>
//                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
//                 }
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
//                     onChange={(e) => setReplaceScope(e.target.value)}
//                   />
//                   <span className="ml-2">All</span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Row (
//                     {selectedRowIndex !== null
//                       ? localEmployees[selectedRowIndex]?.emple.emplId
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//                 <label className="inline-flex items-center text-xs cursor-pointer">
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
//                     Selected Column (
//                     {selectedColumnKey
//                       ? sortedDurations.find(
//                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
//                         )?.month
//                       : "N/A"}
//                     )
//                   </span>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFindReplace(false);
//                   setSelectedRowIndex(null);
//                   setSelectedColumnKey(null);
//                   setReplaceScope("all");
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMPLOYEE_COLUMNS = [
  { key: "idType", label: "ID Type" },
  { key: "emplId", label: "ID" },
  { key: "name", label: "Name" },
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "glcPlc", label: "Plc" },
  { key: "isRev", label: "Rev" },
  { key: "isBrd", label: "Brd" },
  { key: "status", label: "Status" },
  { key: "perHourRate", label: "Hour Rate" },
  { key: "total", label: "Total" },
];

const ID_TYPE_OPTIONS = [
  { value: "", label: "Select ID Type" },
  { value: "Employee", label: "Employee" },
  { value: "Vendor", label: "Vendor Employee" },
  { value: "PLC", label: "PLC" },
  { value: "Other", label: "Other" },
];

const ROW_HEIGHT_DEFAULT = 48;

function isMonthEditable(duration, closedPeriod, planType) {
  if (planType !== "EAC") return true;
  if (!closedPeriod) return true;
  const closedDate = new Date(closedPeriod);
  if (isNaN(closedDate)) return true;
  const durationDate = new Date(duration.year, duration.monthNo - 1, 1);
  const closedMonth = closedDate.getMonth();
  const closedYear = closedDate.getFullYear();
  const durationMonth = durationDate.getMonth();
  const durationYear = durationDate.getFullYear();
  return (
    durationYear > closedYear ||
    (durationYear === closedYear && durationMonth >= closedMonth)
  );
}

const ProjectHoursDetails = ({
  planId,
  projectId,
  status,
  planType,
  closedPeriod,
  startDate,
  endDate,
  fiscalYear,
  onSaveSuccess,
}) => {
  const [durations, setDurations] = useState([]);
  const [isDurationLoading, setIsDurationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hiddenRows, setHiddenRows] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findValue, setFindValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");
  const [replaceScope, setReplaceScope] = useState("all");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedColumnKey, setSelectedColumnKey] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    id: "",
    firstName: "",
    lastName: "",
    isRev: false,
    isBrd: false,
    idType: "",
    acctId: "",
    orgId: "",
    plcGlcCode: "",
    perHourRate: "",
    status: "Act",
  });
  const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
  const [laborAccounts, setLaborAccounts] = useState([]);
  const [plcOptions, setPlcOptions] = useState([]);
  const [plcSearch, setPlcSearch] = useState("");
  const [showFillValues, setShowFillValues] = useState(false);
  const [fillMethod, setFillMethod] = useState("None");
  const [fillHours, setFillHours] = useState(0.0);
  const [sourceRowIndex, setSourceRowIndex] = useState(null);
  const [editedEmployeeData, setEditedEmployeeData] = useState({});
  const [localEmployees, setLocalEmployees] = useState([]);
  const [fillStartDate, setFillStartDate] = useState(startDate);
  const [fillEndDate, setFillEndDate] = useState(endDate);
  const [isLoading, setIsLoading] = useState(false);
  const [autoPopulatedPLC, setAutoPopulatedPLC] = useState(false); // Track if PLC is auto-populated
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [orgSearch, setOrgSearch] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [filteredPlcOptions, setFilteredPlcOptions] = useState([]);
  // Add these state variables after your existing useState declarations
  const [updateAccountOptions, setUpdateAccountOptions] = useState([]);
  const [updateOrganizationOptions, setUpdateOrganizationOptions] = useState([]);
  const [updatePlcOptions, setUpdatePlcOptions] = useState([]);


 

  const debounceTimeout = useRef(null);
  const horizontalScrollRef = useRef(null);
  const verticalScrollRef = useRef(null);
  const firstTableRef = useRef(null);
  const lastTableRef = useRef(null);
  const vfirstTableRef = useRef(null);
  const vlastTableRef = useRef(null);

  const isEditable = status === "In Progress";
  const isBudPlan = planType === "BUD";
  const isFieldEditable = planType === "BUD" || planType === "EAC"; // Add this line

  // Clear all fields when ID type changes
  useEffect(() => {
    if (newEntry.idType === "PLC") {
      setNewEntry({
        ...newEntry,
        id: "PLC",
        firstName: "",
        lastName: "",
        perHourRate: "",
        orgId: "",
        plcGlcCode: "",
        acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
      });
      setPlcSearch("");
      setAutoPopulatedPLC(false);
    } else if (newEntry.idType !== "") {
      // Clear all fields when switching to any other type
      setNewEntry((prev) => ({
        ...prev,
        id: "",
        firstName: "",
        lastName: "",
        perHourRate: "",
        orgId: "",
        plcGlcCode: "",
        acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
      }));
      setPlcSearch("");
      setAutoPopulatedPLC(false);
    }
    // eslint-disable-next-line
  }, [newEntry.idType]);

  const isValidEmployeeId = (id) => {
    if (!id) return false;
    if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
      return !!employeeSuggestions.find((emp) => emp.emplId === id);
    }
    if (newEntry.idType === "Other") {
      return !!employeeSuggestions.find((emp) => emp.emplId === id);
    }
    return true;
  };

  const isValidAccount = (val) =>
    !val || laborAccounts.some((acc) => acc.id === val);

 
// const isValidOrg = (val) => {
//   if (!val) return true; // Allow empty
//   return val.toString().trim().length > 0; // Just check if it's not empty after trimming
// };

const isValidOrg = (val) => {
  if (!val) return false; // Do not allow empty
  const trimmed = val.toString().trim();
  // Only allow numeric/decimal strings
  if (!/^[\d.]+$/.test(trimmed)) return false;
  // Only allow exact match in organizationOptions (from API)
  return organizationOptions.some(opt => opt.value.toString() === trimmed);
};

// Update the validation function to check the correct options based on context
const isValidOrgForUpdate = (val, updateOptions) => {
  if (!val) return false;
  const trimmed = val.toString().trim();
  if (!/^[\d.]+$/.test(trimmed)) return false;
  return updateOptions.some(opt => opt.value.toString() === trimmed);
};

// Add this validation function for accounts
const isValidAccountForUpdate = (val, updateOptions) => {
  if (!val) return false;
  const trimmed = val.toString().trim();
  return updateOptions.some(opt => opt.id === trimmed);
};





// const isValidPlc = (val) => {
//   if (!val) return true; // Allow empty
//   return val.toString().trim().length > 0; // Just check if it's not empty after trimming
// };

// const isValidPlc = (val) => {
//   if (!val) return false; // Do not allow empty
//   const trimmed = val.toString().trim();
//   return plcOptions.some(opt => opt.value === trimmed);
// };

// const isValidPlc = (val) => {
//   if (!val) return true; // Allow empty
//   return plcOptions.some(option => option.value === val.trim());
// };

const isValidPlc = (val) => {
  if (!val) return true; // Allow empty
  if (plcOptions.length === 0) return true; // If no options loaded yet, allow it
  const isValid = plcOptions.some(option => option.value === val.trim());
  console.log('PLC validation for:', val, 'isValid:', isValid, 'available options:', plcOptions.length); // DEBUG LOG
  return isValid;
};

// Add this validation function for PLC updates
const isValidPlcForUpdate = (val, updateOptions) => {
  if (!val) return true; // Allow empty
  if (updateOptions.length === 0) return true; // If no options loaded yet, allow it
  const trimmed = val.toString().trim();
  return updateOptions.some(option => option.value === trimmed);
};



  // Track unsaved changes
  const hasUnsavedChanges = () => {
    const isNewEntryModified =
      newEntry.id !== "" ||
      newEntry.firstName !== "" ||
      newEntry.lastName !== "" ||
      newEntry.isRev ||
      newEntry.isBrd ||
      newEntry.idType !== "" ||
      newEntry.acctId !== "" ||
      newEntry.orgId !== "" ||
      newEntry.plcGlcCode !== "" ||
      newEntry.perHourRate !== "" ||
      newEntry.status !== "Act";

    const isPeriodHoursModified = Object.keys(newEntryPeriodHours).length > 0;
    const isInputValuesModified = Object.keys(inputValues).length > 0;
    const isEditedEmployeeDataModified =
      Object.keys(editedEmployeeData).length > 0;

    return (
      isNewEntryModified ||
      isPeriodHoursModified ||
      isInputValuesModified ||
      isEditedEmployeeDataModified
    );
  };

  // Handle beforeunload event for unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges()) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "You have unsaved changes. Are you sure you want to leave without saving?";
      return event.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [newEntry, newEntryPeriodHours, inputValues, editedEmployeeData]);

  // Vertical sync only
  useEffect(() => {
    const container = verticalScrollRef.current;
    const firstScroll = vfirstTableRef.current;
    const lastScroll = vlastTableRef.current;

    if (!container || !firstScroll || !lastScroll) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      firstScroll.scrollTop = scrollTop;
      lastScroll.scrollTop = scrollTop;
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = horizontalScrollRef.current;
    const firstScroll = firstTableRef.current;
    const lastScroll = lastTableRef.current;

    if (!container || !firstScroll || !lastScroll) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      firstScroll.scrollLeft = scrollLeft;
      lastScroll.scrollLeft = scrollLeft;
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const fetchEmployees = async () => {
    if (!planId) return;
    setIsLoading(true);
    try {
      const employeeApi =
        planType === "EAC"
          ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
          : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
      const response = await axios.get(employeeApi);
      setLocalEmployees(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setLocalEmployees([]);
      if (err.response && err.response.status === 500) {
        toast.info("No forecast data available for this plan.", {
          toastId: "no-forecast-data",
          autoClose: 3000,
        });
      } else {
        toast.error(
          "Failed to load forecast data: " +
            (err.response?.data?.message || err.message),
          {
            toastId: "forecast-error",
            autoClose: 3000,
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [planId, planType]);

  useEffect(() => {
    const fetchDurations = async () => {
      if (!startDate || !endDate) {
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
        setError("Failed to load duration data. Please try again.");
        toast.error(
          "Failed to load duration data: " +
            (err.response?.data?.message || err.message),
          {
            toastId: "duration-error",
            autoClose: 3000,
          }
        );
      } finally {
        setIsDurationLoading(false);
      }
    };
    fetchDurations();
  }, [startDate, endDate]);

  // ADD THIS useEffect after your existing useEffects
useEffect(() => {
  const loadOrganizationOptions = async () => {
    if (!showNewForm) return;
    
    try {
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
      );
      const orgOptions = Array.isArray(response.data)
        ? response.data.map((org) => ({
            value: org.orgId,
            label: org.orgId,
          }))
        : [];
      setOrganizationOptions(orgOptions);
    } catch (err) {
      console.error("Failed to fetch organizations:", err);
    }
  };

  loadOrganizationOptions();
}, [showNewForm]);

// Add this useEffect to initialize update options when employees are loaded
// useEffect(() => {
//   const initializeUpdateOptions = async () => {
//     if (localEmployees.length === 0) return;
    
//     try {
//       // Load organizations for updates
//       const orgResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//       );
//       const orgOptions = Array.isArray(orgResponse.data)
//         ? orgResponse.data.map((org) => ({
//             value: org.orgId,
//             label: org.orgId,
//           }))
//         : [];
      
//       // Load PLC options from project data for updates
//       if (projectId) {
//         try {
//           const response = await axios.get(
//             `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//           );
//           const data = Array.isArray(response.data) ? response.data[0] : response.data;
          
//           let plcOptionsForUpdate = [];
//           if (data.plc && Array.isArray(data.plc)) {
//             plcOptionsForUpdate = data.plc.map(plc => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }));
//           }
          
//           // Load account options for updates
//           let accountsForUpdate = [];
//           if (data.employeeLaborAccounts && Array.isArray(data.employeeLaborAccounts)) {
//             accountsForUpdate = data.employeeLaborAccounts.map(account => ({ id: account.accountId }));
//           }
//           if (data.sunContractorLaborAccounts && Array.isArray(data.sunContractorLaborAccounts)) {
//             const vendorAccounts = data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }));
//             accountsForUpdate = [...accountsForUpdate, ...vendorAccounts];
//           }
          
//           // Remove duplicates from accounts
//           const uniqueAccountsMap = new Map();
//           accountsForUpdate.forEach(acc => {
//             if (acc.id && !uniqueAccountsMap.has(acc.id)) {
//               uniqueAccountsMap.set(acc.id, acc);
//             }
//           });
//           const uniqueAccounts = Array.from(uniqueAccountsMap.values());
          
//           // Initialize all update options
//           setUpdateAccountOptions(uniqueAccounts);
//           setUpdateOrganizationOptions(orgOptions);
//           setUpdatePlcOptions(plcOptionsForUpdate);
//         } catch (err) {
//           console.error("Failed to load project data for updates:", err);
//           setUpdateAccountOptions(laborAccounts);
//           setUpdateOrganizationOptions(orgOptions);
//           setUpdatePlcOptions(plcOptions);
//         }
//       } else {
//         // Fallback to existing options
//         setUpdateAccountOptions(laborAccounts);
//         setUpdateOrganizationOptions(orgOptions);
//         setUpdatePlcOptions(plcOptions);
//       }
      
//     } catch (err) {
//       console.error("Failed to initialize update options:", err);
//     }
//   };
  
//   initializeUpdateOptions();
// }, [localEmployees.length, projectId,  plcOptions]); // Add projectId as dependency

useEffect(() => {
  const initializeUpdateOptions = async () => {
    if (localEmployees.length === 0) return;
    
    try {
      // Load organizations for updates
      const orgResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
      );
      const orgOptions = Array.isArray(orgResponse.data)
        ? orgResponse.data.map((org) => ({
            value: org.orgId,
            label: org.orgId,
          }))
        : [];
      
      // Load PLC options from project data for updates
      if (projectId) {
        try {
          const response = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
          );
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
          
          let plcOptionsForUpdate = [];
          if (data.plc && Array.isArray(data.plc)) {
            plcOptionsForUpdate = data.plc.map(plc => ({
              value: plc.laborCategoryCode,
              label: `${plc.laborCategoryCode} - ${plc.description}`,
            }));
          }
          
          // Load account options for updates
          let accountsForUpdate = [];
          if (data.employeeLaborAccounts && Array.isArray(data.employeeLaborAccounts)) {
            accountsForUpdate = data.employeeLaborAccounts.map(account => ({ id: account.accountId }));
          }
          if (data.sunContractorLaborAccounts && Array.isArray(data.sunContractorLaborAccounts)) {
            const vendorAccounts = data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }));
            accountsForUpdate = [...accountsForUpdate, ...vendorAccounts];
          }
          
          // Remove duplicates from accounts
          const uniqueAccountsMap = new Map();
          accountsForUpdate.forEach(acc => {
            if (acc.id && !uniqueAccountsMap.has(acc.id)) {
              uniqueAccountsMap.set(acc.id, acc);
            }
          });
          const uniqueAccounts = Array.from(uniqueAccountsMap.values());
          
          // Initialize all update options
          setUpdateAccountOptions(uniqueAccounts);
          setUpdateOrganizationOptions(orgOptions);
          setUpdatePlcOptions(plcOptionsForUpdate); // Make sure this is set properly
          
          // ALSO update the main plcOptions if they're empty
          if (plcOptions.length === 0) {
            setPlcOptions(plcOptionsForUpdate);
            setFilteredPlcOptions(plcOptionsForUpdate);
          }
        } catch (err) {
          console.error("Failed to load project data for updates:", err);
          // Fallback to existing options
          setUpdateAccountOptions(laborAccounts);
          setUpdateOrganizationOptions(orgOptions);
          setUpdatePlcOptions(plcOptions.length > 0 ? plcOptions : []);
        }
      } else {
        // Fallback to existing options
        setUpdateAccountOptions(laborAccounts);
        setUpdateOrganizationOptions(orgOptions);
        setUpdatePlcOptions(plcOptions.length > 0 ? plcOptions : []);
      }
      
    } catch (err) {
      console.error("Failed to initialize update options:", err);
    }
  };
  
  initializeUpdateOptions();
}, [localEmployees.length, projectId]); // Remove plcOptions from dependencies to avoid circular updates



// useEffect(() => {
//   if (localEmployees.length > 0) {
//     // Initialize update options with current data
//     setUpdateAccountOptions(laborAccounts);
//     setUpdateOrganizationOptions(organizationOptions);
//     setUpdatePlcOptions(plcOptions);
//   }
// }, [localEmployees, laborAccounts, organizationOptions, plcOptions]);

// useEffect(() => {
//   if (localEmployees.length > 0) {
//     // Initialize update options with current data
//     setUpdateAccountOptions(laborAccounts);
//     setUpdateOrganizationOptions(organizationOptions);
//     setUpdatePlcOptions(plcOptions);
//   }
// }, [localEmployees, laborAccounts, organizationOptions, plcOptions]);




useEffect(() => {
  const fetchEmployeesSuggestions = async () => {
if (!projectId || !showNewForm || !newEntry.idType || newEntry.idType === "") {
  setEmployeeSuggestions([]);
  return;
}

    try {
      const endpoint =
        newEntry.idType === "Vendor"
          ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
          : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
      const response = await axios.get(endpoint);
      const suggestions = Array.isArray(response.data)
        ? response.data.map((emp) => {
            if (newEntry.idType === "Vendor") {
              return {
                emplId: emp.vendId,
                firstName: "",
                lastName: emp.employeeName || "",
                perHourRate: emp.perHourRate || emp.hrRate || "",
                plc: emp.plc || "",
                orgId: emp.orgId || "",
              };
            } else {
              const [lastName, firstName] = (emp.employeeName || "")
                .split(", ")
                .map((str) => str.trim());
              return {
                emplId: emp.empId,
                firstName: firstName || "",
                lastName: lastName || "",
                perHourRate: emp.perHourRate || emp.hrRate || "",
                plc: emp.plc || "",
                orgId: emp.orgId || "",
              };
            }
          })
        : [];
      setEmployeeSuggestions(suggestions);
    } catch (err) {
      setEmployeeSuggestions([]);
      toast.error(`Failed to fetch employee suggestions`, {
        toastId: "employee-fetch-error",
        autoClose: 3000,
      });
    }
  };

  



// const fetchLaborAccounts = async () => {
//   if (!projectId || !showNewForm) return;
//   try {
//     const response = await axios.get(
//       `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//     );
//     const data = Array.isArray(response.data) ? response.data[0] : response.data;

//     let accounts = [];

//     if (newEntry.idType === "Employee") {
//       accounts = Array.isArray(data.employeeLaborAccounts)
//         ? data.employeeLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else if (newEntry.idType === "Vendor") {
//       accounts = Array.isArray(data.sunContractorLaborAccounts)
//         ? data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else {
//       accounts = [];
//     }

//     console.log(JSON.stringify(accounts))

    

//     // Remove duplicates by account ID string
//     const uniqueAccountsMap = new Map();
//     accounts.forEach(acc => {
//       if (acc.id && !uniqueAccountsMap.has(acc.id)) {
//         uniqueAccountsMap.set(acc.id, acc);
//       }
//     });
//     const uniqueAccounts = Array.from(uniqueAccountsMap.values());

//     setLaborAccounts(uniqueAccounts);

//     // Auto-populate organization for Vendor Employees if present
//     if (newEntry.idType === "Vendor" && data.orgId) {
//       setNewEntry(prev => ({
//         ...prev,
//         orgId: data.orgId,
//       }));
//     }
//   } catch (err) {
//     setLaborAccounts([]);
//     toast.error("Failed to fetch labor accounts", {
//       toastId: "labor-accounts-error",
//       autoClose: 3000,
//     });
//   }
// };

// const fetchLaborAccounts = async () => {
//   if (!projectId || !showNewForm) return;
//   try {
//     const response = await axios.get(
//       `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//     );
//     const data = Array.isArray(response.data) ? response.data[0] : response.data;

//     let accounts = [];

//     if (newEntry.idType === "Employee") {
//       accounts = Array.isArray(data.employeeLaborAccounts)
//         ? data.employeeLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else if (newEntry.idType === "Vendor") {
//       accounts = Array.isArray(data.sunContractorLaborAccounts)
//         ? data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else {
//       accounts = [];
//     }

//     // Remove duplicates by account ID string
//     const uniqueAccountsMap = new Map();
//     accounts.forEach(acc => {
//       if (acc.id && !uniqueAccountsMap.has(acc.id)) {
//         uniqueAccountsMap.set(acc.id, acc);
//       }
//     });
//     const uniqueAccounts = Array.from(uniqueAccountsMap.values());

//     setLaborAccounts(uniqueAccounts);

//     // **ADD THIS SECTION FOR PLC OPTIONS**
//     // Set PLC options from project data
//     if (data.plc && Array.isArray(data.plc)) {
//       const plcOptions = data.plc.map(plc => ({
//         value: plc.laborCategoryCode,
//         label: `${plc.laborCategoryCode} - ${plc.description}`,
//       }));
//       setPlcOptions(plcOptions);
//     }

//     // Auto-populate organization for Vendor Employees if present
//     if (newEntry.idType === "Vendor" && data.orgId) {
//       setNewEntry(prev => ({
//         ...prev,
//         orgId: data.orgId,
//       }));
//     }
//   } catch (err) {
//     setLaborAccounts([]);
//     setPlcOptions([]); // Clear PLC options on error
//     toast.error("Failed to fetch labor accounts", {
//       toastId: "labor-accounts-error",
//       autoClose: 3000,
//     });
//   }
// };

// const fetchLaborAccounts = async () => {
//   if (!projectId || !showNewForm) return;
//   try {
//     const response = await axios.get(
//       `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//     );
//     const data = Array.isArray(response.data) ? response.data[0] : response.data;

//     let accounts = [];

//     if (newEntry.idType === "Employee") {
//       accounts = Array.isArray(data.employeeLaborAccounts)
//         ? data.employeeLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else if (newEntry.idType === "Vendor") {
//       accounts = Array.isArray(data.sunContractorLaborAccounts)
//         ? data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else {
//       accounts = [];
//     }

//     // Remove duplicates
//     const uniqueAccountsMap = new Map();
//     accounts.forEach(acc => {
//       if (acc.id && !uniqueAccountsMap.has(acc.id)) {
//         uniqueAccountsMap.set(acc.id, acc);
//       }
//     });
//     const uniqueAccounts = Array.from(uniqueAccountsMap.values());
//     setLaborAccounts(uniqueAccounts);

//     // **ADD THIS SECTION** - Set PLC options from project data
//     if (data.plc && Array.isArray(data.plc)) {
//       const plcOptions = data.plc.map(plc => ({
//         value: plc.laborCategoryCode,
//         label: `${plc.laborCategoryCode} - ${plc.description}`,
//       }));
//       setPlcOptions(plcOptions);
//       setFilteredPlcOptions(plcOptions);
//     }

//     // Auto-populate organization for Vendor Employees if present
//     if (newEntry.idType === "Vendor" && data.orgId) {
//       setNewEntry(prev => ({
//         ...prev,
//         orgId: data.orgId,
//       }));
//     }
//   } catch (err) {
//     setLaborAccounts([]);
//     setPlcOptions([]); // Clear PLC options on error
//     toast.error("Failed to fetch labor accounts", {
//       toastId: "labor-accounts-error",
//       autoClose: 3000,
//     });
//   }
// };

// const fetchLaborAccounts = async () => {
//   if (!projectId || !showNewForm) return;
//   try {
//     const response = await axios.get(
//       `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//     );
//     const data = Array.isArray(response.data) ? response.data[0] : response.data;

//     let accounts = [];

//     if (newEntry.idType === "Employee") {
//       accounts = Array.isArray(data.employeeLaborAccounts)
//         ? data.employeeLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else if (newEntry.idType === "Vendor") {
//       accounts = Array.isArray(data.sunContractorLaborAccounts)
//         ? data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }))
//         : [];
//     } else {
//       accounts = [];
//     }

//     // Remove duplicates
//     const uniqueAccountsMap = new Map();
//     accounts.forEach(acc => {
//       if (acc.id && !uniqueAccountsMap.has(acc.id)) {
//         uniqueAccountsMap.set(acc.id, acc);
//       }
//     });
//     const uniqueAccounts = Array.from(uniqueAccountsMap.values());
//     setLaborAccounts(uniqueAccounts);

//     // **FIX: Set PLC options from project data**
//     if (data.plc && Array.isArray(data.plc)) {
//       const plcOptionsFromApi = data.plc.map(plc => ({
//         value: plc.laborCategoryCode,
//         label: `${plc.laborCategoryCode} - ${plc.description}`,
//       }));
//       console.log('PLC Options loaded:', plcOptionsFromApi); // DEBUG LOG
//       setPlcOptions(plcOptionsFromApi);
//       setFilteredPlcOptions(plcOptionsFromApi);
//     } else {
//       console.log('No PLC data found in API response:', data); // DEBUG LOG
//       setPlcOptions([]);
//       setFilteredPlcOptions([]);
//     }

//     // Auto-populate organization for Vendor Employees if present
//     if (newEntry.idType === "Vendor" && data.orgId) {
//       setNewEntry(prev => ({
//         ...prev,
//         orgId: data.orgId,
//       }));
//     }
//   } catch (err) {
//     console.error('Error fetching labor accounts:', err); // DEBUG LOG
//     setLaborAccounts([]);
//     setPlcOptions([]);
//     setFilteredPlcOptions([]);
//     toast.error("Failed to fetch labor accounts", {
//       toastId: "labor-accounts-error",
//       autoClose: 3000,
//     });
//   }
// };

const fetchLaborAccounts = async () => {
  if (!projectId || !showNewForm) return;
  try {
    const response = await axios.get(
      `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
    );
    const data = Array.isArray(response.data) ? response.data[0] : response.data;

    let accounts = [];

    if (newEntry.idType === "Employee") {
      accounts = Array.isArray(data.employeeLaborAccounts)
        ? data.employeeLaborAccounts.map(account => ({ id: account.accountId }))
        : [];
    } else if (newEntry.idType === "Vendor") {
      accounts = Array.isArray(data.sunContractorLaborAccounts)
        ? data.sunContractorLaborAccounts.map(account => ({ id: account.accountId }))
        : [];
    } else {
      accounts = [];
    }

    // Remove duplicates
    const uniqueAccountsMap = new Map();
    accounts.forEach(acc => {
      if (acc.id && !uniqueAccountsMap.has(acc.id)) {
        uniqueAccountsMap.set(acc.id, acc);
      }
    });
    const uniqueAccounts = Array.from(uniqueAccountsMap.values());
    setLaborAccounts(uniqueAccounts);

    // **FIX: Set PLC options from project data**
    if (data.plc && Array.isArray(data.plc)) {
      const plcOptionsFromApi = data.plc.map(plc => ({
        value: plc.laborCategoryCode,
        label: `${plc.laborCategoryCode} - ${plc.description}`,
      }));
      console.log('PLC Options loaded:', plcOptionsFromApi); // DEBUG LOG
      setPlcOptions(plcOptionsFromApi);
      setFilteredPlcOptions(plcOptionsFromApi); // Initialize filtered options
    } else {
      console.log('No PLC data found in API response:', data); // DEBUG LOG
      setPlcOptions([]);
      setFilteredPlcOptions([]);
    }

    // Auto-populate organization for Vendor Employees if present
    if (newEntry.idType === "Vendor" && data.orgId) {
      setNewEntry(prev => ({
        ...prev,
        orgId: data.orgId,
      }));
    }
  } catch (err) {
    console.error('Error fetching labor accounts:', err); // DEBUG LOG
    setLaborAccounts([]);
    setPlcOptions([]);
    setFilteredPlcOptions([]);
    toast.error("Failed to fetch labor accounts", {
      toastId: "labor-accounts-error",
      autoClose: 3000,
    });
  }
};









  if (showNewForm) {
    fetchEmployeesSuggestions();
    fetchLaborAccounts();
  } else {
    setEmployeeSuggestions([]);
  setLaborAccounts([]);
  setPlcOptions([]);
  setFilteredPlcOptions([]); // ADD THIS LINE
  setPlcSearch("");
  setOrgSearch("");
  setAutoPopulatedPLC(false);
    // setEmployeeSuggestions([]);
    // setLaborAccounts([]);
    // setPlcSearch("");
    // setOrgSearch("");
    // setAutoPopulatedPLC(false);
  }

  return () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };
}, [projectId, showNewForm, newEntry.idType]);

// Initialize filtered PLC options when PLC options change
// useEffect(() => {
//   if (plcOptions.length > 0) {
//     setFilteredPlcOptions(plcOptions);
//   }
// }, [plcOptions]);

// Initialize filtered PLC options when PLC options change
useEffect(() => {
  if (plcOptions.length > 0) {
    setFilteredPlcOptions(plcOptions);
    console.log('PLC options initialized:', plcOptions.length); // DEBUG LOG
  }
}, [plcOptions]);


// const handleOrgInputChangeForUpdate = (value, actualEmpIdx) => {
//   const numericValue = value.replace(/[^0-9.]/g, "");
//   handleEmployeeDataChange(actualEmpIdx, "orgId", numericValue);
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // Only fetch if user typed something - DO NOT update the input value
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().startsWith(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setOrganizationOptions(filteredOptions);
//         // IMPORTANT: DO NOT UPDATE THE INPUT VALUE HERE
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//         setOrganizationOptions([]);
//       }
//     }, 500); // Increased timeout to reduce API calls
//   } else {
//     setOrganizationOptions([]); // Clear options when input is empty
//   }
// };


// const handleOrgInputChangeForUpdate = (value, actualEmpIdx) => {
//   const numericValue = value.replace(/[^0-9.]/g, "");
//   handleEmployeeDataChange(actualEmpIdx, "orgId", numericValue);
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // Filter organizations starting with input
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().startsWith(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setOrganizationOptions(filteredOptions);
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//         setOrganizationOptions([]);
//       }
//     }, 300);
//   }
// };



// const handleOrgInputChangeForUpdate = (value, actualEmpIdx) => {
  
//   // Keep only numbers and period (for decimals)
//   const numericValue = value.replace(/[^0-9.]/g, "");
//   handleEmployeeDataChange(actualEmpIdx, "orgId", numericValue);
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // FIX: Always fetch filtered organizations when user types
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().includes(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setOrganizationOptions(filteredOptions);
//         console.log('Filtered org options:', filteredOptions); // Debug log
//       } catch (err) {
//         console.error("Failed to fetch filtered organizations:", err);
//         setOrganizationOptions([]);
//       }
//     }, 300);
//   } else {
//     // Load all organizations when input is empty
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const orgOptions = Array.isArray(response.data)
//           ? response.data.map((org) => ({
//               value: org.orgId,
//               label: org.orgId,
//             }))
//           : [];
//         setOrganizationOptions(orgOptions);
//       } catch (err) {
//         console.error("Failed to fetch all organizations:", err);
//       }
//     }, 300);
//   }
// };

// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // FIX: Always fetch PLC options when user types
//   if (value.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(value)}`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//         console.log('Filtered PLC options:', options); // Debug log
//       } catch (err) {
//         console.error("Failed to fetch filtered PLCs:", err);
//         setPlcOptions([]);
//       }
//     }, 300);
//   } else {
//     // Load all PLCs when input is empty  
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/`
//         );
//         const options = Array.isArray(response.data)
//           ? response.data.map((plc) => ({
//               value: plc.laborCategoryCode,
//               label: `${plc.laborCategoryCode} - ${plc.description}`,
//             }))
//           : [];
//         setPlcOptions(options);
//       } catch (err) {
//         console.error("Failed to fetch all PLCs:", err);
//       }
//     }, 300);
//   }
// };





  // ID Type change handler

//   const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
//   // No API calls needed - PLC options are loaded from project data
// };

// const handleOrgInputChangeForUpdate = (value, actualEmpIdx) => {
//   const numericValue = value.replace(/[^0-9.]/g, "");
  
//   // Real-time validation
//   if (numericValue && !organizationOptions.some(opt => opt.value.toString().startsWith(numericValue))) {
//     toast.error("Please enter a valid numeric Organization ID from the available list.", {
//       autoClose: 3000,
//     });
//     return; // Don't update if invalid
//   }
  
//   handleEmployeeDataChange(actualEmpIdx, "orgId", numericValue);
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // Filter organizations
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().startsWith(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setUpdateOrganizationOptions(filteredOptions);
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//         setUpdateOrganizationOptions([]);
//       }
//     }, 300);
//   } else {
//     setUpdateOrganizationOptions([]);
//   }
// };

const handleOrgInputChangeForUpdate = (value, actualEmpIdx) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  
  // Remove real-time validation - only validate on blur
  handleEmployeeDataChange(actualEmpIdx, "orgId", numericValue);
  setOrgSearch(numericValue);
  
  // Clear previous timeout
  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }
  
  // Always fetch filtered organizations when user types
  if (numericValue.length >= 1) {
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
        );
        const filteredOptions = Array.isArray(response.data)
          ? response.data
              .filter(org => org.orgId.toString().startsWith(numericValue))
              .map((org) => ({
                value: org.orgId,
                label: org.orgId,
              }))
          : [];
        setUpdateOrganizationOptions(filteredOptions); // Use correct state variable
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
        setUpdateOrganizationOptions([]);
      }
    }, 300);
  } else {
    // Load all organizations when input is empty
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
        );
        const orgOptions = Array.isArray(response.data)
          ? response.data.map((org) => ({
              value: org.orgId,
              label: org.orgId,
            }))
          : [];
        setUpdateOrganizationOptions(orgOptions);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
        setUpdateOrganizationOptions([]);
      }
    }, 300);
  }
};


// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Filter PLC options for update mode too
//   if (value.length >= 1) {
//     const filtered = plcOptions.filter(option => 
//       option.value.toLowerCase().startsWith(value.toLowerCase())
//     );
//     setFilteredPlcOptions(filtered);
//   } else {
//     setFilteredPlcOptions(plcOptions);
//   }
// };




//   const handleOrgInputChange = (value) => {
//   // FIX: Allow decimal numbers for hour rate, only numeric for orgId
//   const numericValue = value.replace(/[^0-9]/g, "");
//   setNewEntry((prev) => ({ ...prev, orgId: numericValue }));
//   setOrgSearch(numericValue);
// };
  
//   const handleOrgInputChange = (value) => {
//   // Keep only numbers and period (for decimals)
//   const numericValue = value.replace(/[^0-9.]/g, "");
//   setNewEntry((prev) => ({ ...prev, orgId: numericValue }));
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // Fetch organizations when user types
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().startsWith(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setOrganizationOptions(filteredOptions);
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//         setOrganizationOptions([]);
//       }
//     }, 300);
//   } else {
//     // Load all organizations when input is empty
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const orgOptions = Array.isArray(response.data)
//           ? response.data.map((org) => ({
//               value: org.orgId,
//               label: org.orgId,
//             }))
//           : [];
//         setOrganizationOptions(orgOptions);
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//       }
//     }, 300);
//   }
// };

// const handleOrgInputChange = (value) => {
//   // Keep only numbers and period (for decimals)
//   const numericValue = value.replace(/[^0-9.]/g, "");
//   setNewEntry((prev) => ({ ...prev, orgId: numericValue }));
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // Fetch organizations when user types - DO NOT update input value
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().startsWith(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setOrganizationOptions(filteredOptions);
//         // IMPORTANT: DO NOT UPDATE newEntry.orgId HERE
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//         setOrganizationOptions([]);
//       }
//     }, 300);
//   } else {
//     // Load all organizations when input is empty
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const orgOptions = Array.isArray(response.data)
//           ? response.data.map((org) => ({
//               value: org.orgId,
//               label: org.orgId,
//             }))
//           : [];
//         setOrganizationOptions(orgOptions);
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//       }
//     }, 300);
//   }
// };

// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   // Real-time validation
//   if (value && plcOptions.length > 0 && !plcOptions.some(option => option.value.toLowerCase().startsWith(value.toLowerCase()))) {
//     toast.error("Please enter a valid PLC from the available list.", {
//       autoClose: 3000,
//     });
//     return; // Don't update if invalid
//   }
  
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Filter PLC options
//   if (value.length >= 1) {
//     const filtered = plcOptions.filter(option => 
//       option.value.toLowerCase().startsWith(value.toLowerCase())
//     );
//     setUpdatePlcOptions(filtered);
//   } else {
//     setUpdatePlcOptions(plcOptions);
//   }
// };

// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   // Remove real-time validation - only validate on blur
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Filter PLC options based on input
//   if (value.length >= 1) {
//     const filtered = plcOptions.filter(option => 
//       option.value.toLowerCase().startsWith(value.toLowerCase())
//     );
//     setUpdatePlcOptions(filtered);
//   } else {
//     setUpdatePlcOptions(plcOptions);
//   }
// };

// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Filter PLC options based on input - use contains instead of startsWith for better matching
//   if (value.length >= 1) {
//     const filtered = updatePlcOptions.filter(option => 
//       option.value.toLowerCase().includes(value.toLowerCase()) ||
//       option.label.toLowerCase().includes(value.toLowerCase())
//     );
//     setUpdatePlcOptions(filtered);
//   } else {
//     // Reset to all available PLC options when input is empty
//     if (plcOptions.length > 0) {
//       setUpdatePlcOptions(plcOptions);
//     }
//   }
// };

// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Filter PLC options based on input - show suggestions from first character
//   if (value.length >= 1) {
//     const filtered = updatePlcOptions.filter(option => 
//       option.value.toLowerCase().includes(value.toLowerCase()) ||
//       option.label.toLowerCase().includes(value.toLowerCase())
//     );
//     setUpdatePlcOptions(filtered);
//   } else {
//     // Reset to all available PLC options when input is empty
//     if (plcOptions.length > 0) {
//       setUpdatePlcOptions(plcOptions);
//     }
//   }
// };

// const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
//   handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
//   setPlcSearch(value);
  
//   // Always filter from the original plcOptions, not updatePlcOptions
//   if (value.length >= 1) {
//     const filtered = plcOptions.filter(option => 
//       option.value.toLowerCase().includes(value.toLowerCase()) ||
//       option.label.toLowerCase().includes(value.toLowerCase())
//     );
//     setUpdatePlcOptions(filtered);
//   } else {
//     // Reset to all available PLC options when input is empty
//     setUpdatePlcOptions(plcOptions);
//   }
// };

const handlePlcInputChangeForUpdate = (value, actualEmpIdx) => {
  handleEmployeeDataChange(actualEmpIdx, "glcPlc", value);
  setPlcSearch(value);
  
  // Always filter from the original plcOptions, not updatePlcOptions
  if (value.length >= 1) {
    const filtered = plcOptions.filter(option => 
      option.value.toLowerCase().includes(value.toLowerCase()) ||
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setUpdatePlcOptions(filtered);
  } else {
    // Reset to all available PLC options when input is empty
    setUpdatePlcOptions(plcOptions);
  }
};





// const handleOrgInputChange = (value) => {
//   const numericValue = value.replace(/[^0-9.]/g, "");
  
//   // Real-time validation
//   if (numericValue && !organizationOptions.some(opt => opt.value.toString().startsWith(numericValue))) {
//     toast.error("Please enter a valid numeric Organization ID from the available list.", {
//       autoClose: 3000,
//     });
//     return; // Don't update if invalid
//   }
  
//   setNewEntry((prev) => ({ ...prev, orgId: numericValue }));
//   setOrgSearch(numericValue);
  
//   // Clear previous timeout
//   if (debounceTimeout.current) {
//     clearTimeout(debounceTimeout.current);
//   }
  
//   // Fetch filtered organizations
//   if (numericValue.length >= 1) {
//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
//         );
//         const filteredOptions = Array.isArray(response.data)
//           ? response.data
//               .filter(org => org.orgId.toString().startsWith(numericValue))
//               .map((org) => ({
//                 value: org.orgId,
//                 label: org.orgId,
//               }))
//           : [];
//         setOrganizationOptions(filteredOptions);
//       } catch (err) {
//         console.error("Failed to fetch organizations:", err);
//         setOrganizationOptions([]);
//       }
//     }, 300);
//   } else {
//     setOrganizationOptions([]);
//   }
// };

const handleOrgInputChange = (value) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  
  // Remove real-time validation - only validate on blur
  setNewEntry((prev) => ({ ...prev, orgId: numericValue }));
  setOrgSearch(numericValue);
  
  // Clear previous timeout
  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }
  
  // Always fetch filtered organizations when user types
  if (numericValue.length >= 1) {
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
        );
        const filteredOptions = Array.isArray(response.data)
          ? response.data
              .filter(org => org.orgId.toString().startsWith(numericValue))
              .map((org) => ({
                value: org.orgId,
                label: org.orgId,
              }))
          : [];
        setOrganizationOptions(filteredOptions);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
        setOrganizationOptions([]);
      }
    }, 300);
  } else {
    // Load all organizations when input is empty
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetAllOrgs`
        );
        const orgOptions = Array.isArray(response.data)
          ? response.data.map((org) => ({
              value: org.orgId,
              label: org.orgId,
            }))
          : [];
        setOrganizationOptions(orgOptions);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
        setOrganizationOptions([]);
      }
    }, 300);
  }
};


  const handleIdTypeChange = (value) => {
    setNewEntry((prev) => ({
      id: "",
      firstName: "",
      lastName: "",
      isRev: false,
      isBrd: false,
      idType: value,
      acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
      orgId: "",
      plcGlcCode: "",
      perHourRate: "",
      status: "Act",
    }));
    setPlcSearch("");
    setAutoPopulatedPLC(false);
  };

//   const handlePlcInputChange = (value) => {
//     // Only allow manual input if PLC is not auto-populated
//     if (!autoPopulatedPLC) {
//       setPlcSearch(value);
//       setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
//     }
//   };

  // Update the existing handlePlcBlur
//   const handlePlcBlur = (val) => {
//   if (val && val.length >= 3 && !isValidPlc(val)) {
//     toast.error("Please enter a valid PLC from the available list.", {autoClose: 3000});
//     if (!autoPopulatedPLC) {
//       setNewEntry(prev => ({...prev, plcGlcCode: ""}));
//       setPlcSearch("");
//     }
//   }
// };

// const handlePlcInputChange = (value) => {
//   // Only allow manual input if PLC is not auto-populated
//   if (!autoPopulatedPLC) {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
    
//     // Filter PLC options based on first character match
//     if (value.length >= 1) {
//       const filtered = plcOptions.filter(option => 
//         option.value.toLowerCase().startsWith(value.toLowerCase())
//       );
//       setFilteredPlcOptions(filtered);
//     } else {
//       setFilteredPlcOptions(plcOptions);
//     }
//   }
// };

// const handlePlcInputChange = (value) => {
//   console.log('PLC input changed:', value, 'autoPopulatedPLC:', autoPopulatedPLC); // DEBUG LOG
//   console.log('Current plcOptions:', plcOptions); // DEBUG LOG
  
//   // Only allow manual input if PLC is not auto-populated
//   if (!autoPopulatedPLC) {
//     setPlcSearch(value);
//     setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
    
//     // Filter PLC options based on first character match
//     if (value.length >= 1) {
//       const filtered = plcOptions.filter(option => 
//         option.value.toLowerCase().startsWith(value.toLowerCase())
//       );
//       console.log('Filtered PLC options:', filtered); // DEBUG LOG
//       setFilteredPlcOptions(filtered);
//     } else {
//       setFilteredPlcOptions(plcOptions);
//     }
//   }
// };

// const handlePlcInputChange = (value) => {
//   console.log('PLC input changed:', value, 'autoPopulatedPLC:', autoPopulatedPLC); // DEBUG LOG
  
//   // ALWAYS allow manual input - remove autoPopulatedPLC check
//   setPlcSearch(value);
//   setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
  
//   // Filter PLC options based on first character match
//   if (value.length >= 1) {
//     const filtered = plcOptions.filter(option => 
//       option.value.toLowerCase().startsWith(value.toLowerCase())
//     );
//     console.log('Filtered PLC options:', filtered); // DEBUG LOG
//     setFilteredPlcOptions(filtered);
//   } else {
//     setFilteredPlcOptions(plcOptions);
//   }
  
//   // Reset auto-populated flag when user manually types
//   if (autoPopulatedPLC && value !== newEntry.plcGlcCode) {
//     setAutoPopulatedPLC(false);
//   }
// };

// const handlePlcInputChange = (value) => {
//   // Real-time validation
//   if (value && plcOptions.length > 0 && !plcOptions.some(option => option.value.toLowerCase().startsWith(value.toLowerCase()))) {
//     toast.error("Please enter a valid PLC from the available list.", {
//       autoClose: 3000,
//     });
//     return; // Don't update if invalid
//   }
  
//   setPlcSearch(value);
//   setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
  
//   // Filter PLC options
//   if (value.length >= 1) {
//     const filtered = plcOptions.filter(option => 
//       option.value.toLowerCase().startsWith(value.toLowerCase())
//     );
//     setFilteredPlcOptions(filtered);
//   } else {
//     setFilteredPlcOptions(plcOptions);
//   }
  
//   // Reset auto-populated flag when user manually types
//   if (autoPopulatedPLC && value !== newEntry.plcGlcCode) {
//     setAutoPopulatedPLC(false);
//   }
// };

const handlePlcInputChange = (value) => {
  // Remove real-time validation - only validate on blur
  setPlcSearch(value);
  setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
  
  // Filter PLC options
  if (value.length >= 1) {
    const filtered = plcOptions.filter(option => 
      option.value.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredPlcOptions(filtered);
  } else {
    setFilteredPlcOptions(plcOptions);
  }
  
  // Reset auto-populated flag when user manually types
  if (autoPopulatedPLC && value !== newEntry.plcGlcCode) {
    setAutoPopulatedPLC(false);
  }
};







// const handlePlcBlur = (val) => {
//   if (!isValidPlc(val)) {
//     toast.error("Please enter a valid PLC from the available list.", { autoClose: 3000 });
//     if (!autoPopulatedPLC) {
//       setNewEntry(prev => ({ ...prev, plcGlcCode: "" }));
//       setPlcSearch("");
//     }
//   }
// };

const handlePlcBlur = (val) => {
  if (val && !isValidPlc(val)) {
    toast.error("Please enter a valid PLC from the available list.", { autoClose: 3000 });
    // Only clear if it's not a valid PLC AND not auto-populated initially
    if (!autoPopulatedPLC) {
      setNewEntry(prev => ({ ...prev, plcGlcCode: "" }));
      setPlcSearch("");
    }
  }
};



  const handleAccountChange = (value) => {
    setNewEntry((prev) => ({ ...prev, acctId: value }));
  };

  const handleAccountBlur = (val) => {
    if (val && !isValidAccount(val)) {
      toast.error("Please enter a valid Account from the available list.", {
        autoClose: 3000,
      });
      setNewEntry((prev) => ({ ...prev, acctId: "" }));
    }
  };

  const handleOrgChange = (value) => {
    setNewEntry((prev) => ({ ...prev, orgId: value }));
    setOrgSearch(value); // Add this line to track search

  };

//   const handleOrgBlur = (val) => {
//   if (val && val.length >= 3 && !isValidOrg(val)) {
//     toast.error("Please enter a valid numeric Organization ID from the available list.", {
//       autoClose: 3000,
//     });
//     setNewEntry(prev => ({...prev, orgId: ""}));
//     setOrgSearch("");
//   }
// };

const handleOrgBlur = (val) => {
  if (!isValidOrg(val)) {
    toast.error("Please enter a valid numeric Organization ID from the available list.", { autoClose: 3000 });
    setNewEntry(prev => ({ ...prev, orgId: "" }));
    setOrgSearch("");
  }
};


  

  const handleIdChange = (value) => {
    const trimmedValue = value.trim();

    // 1. PLC type is always “PLC”
    if (newEntry.idType === "PLC") {
      setNewEntry((prev) => ({ ...prev, id: "PLC" }));
      return;
    }

    // 2. Persist whatever the user typed
    setNewEntry((prev) => ({ ...prev, id: trimmedValue }));

    // 3. If the field is cleared, reset most fields and exit
    if (!trimmedValue) {
      setNewEntry((prev) => ({
        ...prev,
        id: "",
        firstName: "",
        lastName: "",
        perHourRate: "",
        orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
        plcGlcCode: "",
        acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
      }));
      setPlcSearch("");
      setAutoPopulatedPLC(false);
      return;
    }

    

    // 5. “Other” type needs no further validation
    if (newEntry.idType === "Other") return;

    // 6. For Employee / Vendor types, try to auto-populate from suggestions
    if (
      (newEntry.idType === "Employee" || newEntry.idType === "Vendor") &&
      employeeSuggestions.length > 0
    ) {
      const selectedEmployee = employeeSuggestions.find(
        (emp) => emp.emplId === trimmedValue
      );

      if (selectedEmployee) {
        // Found a match – copy its details, *including PLC*
        setNewEntry((prev) => ({
          ...prev,
          id: trimmedValue,
          firstName: selectedEmployee.firstName || "",
          lastName: selectedEmployee.lastName || "",
          perHourRate: selectedEmployee.perHourRate || "",
          orgId: selectedEmployee.orgId || prev.orgId,
          plcGlcCode: selectedEmployee.plc || "",
          acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
        }));
        setPlcSearch(selectedEmployee.plc || "");
        // setAutoPopulatedPLC(!!selectedEmployee.plc);
      } else {
        // No exact match – warn only if the entry is clearly invalid
        if (trimmedValue.length >= 3) {
          const partialMatch = employeeSuggestions.some((emp) =>
            emp.emplId.startsWith(trimmedValue)
          );
          if (!partialMatch) {
            toast.error("Invalid ID, please select a valid one!", {
              toastId: "invalid-id",
              autoClose: 3000,
            });
          }
        }

        // Leave any previously auto-populated PLC untouched;
        // only clear PLC when it wasn’t auto-filled.
        setNewEntry((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          perHourRate: "",
          orgId: newEntry.idType === "Vendor" ? prev.orgId : "",
          plcGlcCode:
            newEntry.idType === "Vendor" && autoPopulatedPLC
              ? prev.plcGlcCode
              : "",
          acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
        }));

        if (!(newEntry.idType === "Vendor" && autoPopulatedPLC)) {
          setPlcSearch("");
          setAutoPopulatedPLC(false);
        }
      }
    }
  };

  const getEmployeeRow = (emp, idx) => {
    if (!emp || !emp.emple) {
      return {
        idType: "-",
        emplId: "-",
        name: "-",
        acctId: "-",
        orgId: "-",
        glcPlc: "-",
        isRev: "-",
        isBrd: "-",
        status: "-",
        perHourRate: "0",
        total: "0",
      };
    }
    const monthHours = getMonthHours(emp);
    const totalHours = sortedDurations.reduce((sum, duration) => {
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      const inputValue = inputValues[`${idx}_${uniqueKey}`];
      const forecastValue = monthHours[uniqueKey]?.value;
      const value =
        inputValue !== undefined && inputValue !== ""
          ? inputValue
          : forecastValue;
      return sum + (value && !isNaN(value) ? Number(value) : 0);
    }, 0);
    return {
      idType:
        ID_TYPE_OPTIONS.find(
          (opt) => opt.value === (emp.emple.type || "Employee")
        )?.label ||
        emp.emple.type ||
        "Employee",
      emplId: emp.emple.emplId,
      name:
        emp.emple.idType === "Vendor"
          ? emp.emple.lastName || emp.emple.firstName || "-"
          : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
            "-",
      acctId:
        emp.emple.accId ||
        (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
      orgId: emp.emple.orgId || "-",
    //   glcPlc: emp.emple.plcGlcCode || "-",
    glcPlc: (() => {
  const plcCode = emp.emple.plcGlcCode || "";
  if (!plcCode) return "-";
  
  // Try to find the full description from available PLC options
  const plcOption = plcOptions.find(option => option.value === plcCode) || 
                   updatePlcOptions.find(option => option.value === plcCode);
  
  return plcOption ? plcOption.label : plcCode; // Show full description if found, otherwise just code
})(),

      isRev: emp.emple.isRev ? (
        <span className="text-green-600 font-sm text-lg">✓</span>
      ) : (
        "-"
      ),
      isBrd: emp.emple.isBrd ? (
        <span className="text-green-600 font-sm text-lg">✓</span>
      ) : (
        "-"
      ),
      status: emp.emple.status || "Act",
      perHourRate:
        emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
          ? Number(emp.emple.perHourRate).toFixed(2)
          : "0",
      total: totalHours.toFixed(2) || "-",
    };
  };

  const getMonthHours = (emp) => {
    const monthHours = {};
    if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
      emp.emple.plForecasts.forEach((forecast) => {
        const uniqueKey = `${forecast.month}_${forecast.year}`;
        const value =
          planType === "EAC" && forecast.actualhours !== undefined
            ? forecast.actualhours
            : forecast.forecastedhours ?? 0;
        monthHours[uniqueKey] = { value, ...forecast };
      });
    }
    return monthHours;
  };

  const handleInputChange = (empIdx, uniqueKey, newValue) => {
    if (!isEditable) return;
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: newValue,
      }));
    }
  };

  const handleEmployeeDataChange = (empIdx, field, value) => {
    if (!isEditable || !isBudPlan) return;
    setEditedEmployeeData((prev) => ({
      ...prev,
      [empIdx]: {
        ...prev[empIdx],
        [field]: value,
      },
    }));
  };

  const handleEmployeeDataBlur = async (empIdx, emp) => {
    if (!isEditable || !isBudPlan) return;
    const editedData = editedEmployeeData[empIdx] || {};
    const originalData = getEmployeeRow(emp, empIdx);
    if (
      !editedData ||
      ((editedData.acctId === undefined ||
        editedData.acctId === originalData.acctId) &&
        (editedData.orgId === undefined ||
          editedData.orgId === originalData.orgId) &&
        (editedData.glcPlc === undefined ||
          editedData.glcPlc === originalData.glcPlc) &&
        (editedData.perHourRate === undefined ||
          editedData.perHourRate === originalData.perHourRate) &&
        (editedData.isRev === undefined ||
          editedData.isRev === emp.emple.isRev) &&
        (editedData.isBrd === undefined ||
          editedData.isBrd === emp.emple.isBrd))
    ) {
      return;
    }
    const payload = {
      id: emp.emple.id || 0,
      emplId: emp.emple.emplId,
      firstName: emp.emple.firstName || "",
      lastName: emp.emple.lastName || "",
      type: emp.emple.type || "Employee",
      isRev:
        editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
      isBrd:
        editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
      plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
        .split("-")[0]
        .substring(0, 20),
      perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
      status: emp.emple.status || "Act",
      accId:
        editedData.acctId ||
        emp.emple.accId ||
        (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
      orgId: editedData.orgId || emp.emple.orgId || "",
      plId: planId,
      plForecasts: emp.emple.plForecasts || [],
    };

    try {
      await axios.put(
        "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setEditedEmployeeData((prev) => {
        const newData = { ...prev };
        delete newData[empIdx];
        return newData;
      });
      setLocalEmployees((prev) => {
        const updated = [...prev];
        updated[empIdx] = {
          ...updated[empIdx],
          emple: {
            ...updated[empIdx].emple,
            ...payload,
          },
        };
        return updated;
      });

      toast.success("Employee updated successfully!", {
        toastId: `employee-update-${empIdx}`,
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Failed to update employee:", err);
    }
  };

  const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
    if (!isEditable) return;
    const newValue = value === "" ? 0 : Number(value);
    const emp = localEmployees[empIdx];
    const monthHours = getMonthHours(emp);
    const forecast = monthHours[uniqueKey];
    const originalForecastedHours = forecast?.forecastedhours ?? 0;

    if (newValue === originalForecastedHours) {
      return;
    }

    const currentDuration = sortedDurations.find(
      (d) => `${d.monthNo}_${d.year}` === uniqueKey
    );

    if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
      }));
      toast.warn("Cannot edit hours for a closed period.", {
        toastId: "closed-period-warning",
        autoClose: 3000,
      });
      return;
    }

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
      ...(planType === "EAC"
        ? { actualhours: Number(newValue) || 0 }
        : { forecastedhours: Number(newValue) || 0 }),
      createdat: forecast.createdat ?? new Date(0).toISOString(),
      updatedat: new Date().toISOString().split("T")[0],
      displayText: forecast.displayText ?? "",
    };

    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Employee updated successfully!", {
        toastId: `employee-update-${empIdx}`,
        autoClose: 2000,
      });
    } catch (err) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
      }));
      toast.error(
        "Failed to update forecast: " +
          (err.response?.data?.message || err.message),
        {
          toastId: "forecast-update-error",
          autoClose: 3000,
        }
      );
    }
  };

//   const handleAccountInputChangeForUpdate = (value, actualEmpIdx) => {
//   // Real-time validation
//   if (value && !laborAccounts.some(acc => acc.id === value.trim())) {
//     toast.error("Please enter a valid Account from the available list.", {
//       autoClose: 3000,
//     });
//     return; // Don't update if invalid
//   }
  
//   handleEmployeeDataChange(actualEmpIdx, "acctId", value);
  
//   // Filter accounts based on input
//   if (value.length >= 1) {
//     const filtered = laborAccounts.filter(acc => 
//       acc.id.toLowerCase().includes(value.toLowerCase())
//     );
//     setUpdateAccountOptions(filtered);
//   } else {
//     setUpdateAccountOptions(laborAccounts);
//   }
// };

// const handleAccountInputChangeForUpdate = (value, actualEmpIdx) => {
//   // Remove real-time validation - only validate on blur
//   handleEmployeeDataChange(actualEmpIdx, "acctId", value);
  
//   // Filter accounts based on input
//   if (value.length >= 1) {
//     const filtered = laborAccounts.filter(acc => 
//       acc.id.toLowerCase().includes(value.toLowerCase())
//     );
//     setUpdateAccountOptions(filtered);
//   } else {
//     setUpdateAccountOptions(laborAccounts);
//   }
// };

const handleAccountInputChangeForUpdate = (value, actualEmpIdx) => {
  handleEmployeeDataChange(actualEmpIdx, "acctId", value);
  
  // Filter accounts based on input
  if (value.length >= 1) {
    const filtered = updateAccountOptions.filter(acc => 
      acc.id.toLowerCase().includes(value.toLowerCase())
    );
    setUpdateAccountOptions(filtered);
  } else {
    // Reset to all available accounts when input is empty
    if (laborAccounts.length > 0) {
      setUpdateAccountOptions(laborAccounts);
    }
  }
};


  const handleFillValues = async () => {
    if (!showNewForm || !isEditable) return;

    if (new Date(fillEndDate) < new Date(fillStartDate)) {
      toast.error("End Period cannot be before Start Period.");
      return;
    }

    const startDateObj = new Date(fillStartDate);
    const endDateObj = new Date(fillEndDate);

    const newHours = {};

    const isDurationInRange = (duration) => {
      const durationValue = duration.year * 100 + duration.monthNo;
      const startYear = startDateObj.getFullYear();
      const startMonth = startDateObj.getMonth() + 1;
      const startValue = startYear * 100 + startMonth;
      const endYear = endDateObj.getFullYear();
      const endMonth = endDateObj.getMonth() + 1;
      const endValue = endYear * 100 + endMonth;
      return durationValue >= startValue && durationValue <= endValue;
    };

    if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
      const sourceEmp = localEmployees[sourceRowIndex];
      const sourceMonthHours = getMonthHours(sourceEmp);
      sortedDurations.forEach((duration) => {
        if (!isDurationInRange(duration)) return;
        const uniqueKey = `${duration.monthNo}_${duration.year}`;
        if (
          planType === "EAC" &&
          !isMonthEditable(duration, closedPeriod, planType)
        ) {
          newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
        } else {
          newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
        }
      });
    } else if (fillMethod === "Specify Hours") {
      sortedDurations.forEach((duration) => {
        if (!isDurationInRange(duration)) return;
        const uniqueKey = `${duration.monthNo}_${duration.year}`;
        if (
          planType === "EAC" &&
          !isMonthEditable(duration, closedPeriod, planType)
        ) {
          newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
        } else if (isMonthEditable(duration, closedPeriod, planType)) {
          newHours[uniqueKey] = fillHours.toString();
        }
      });
    } else if (fillMethod === "Use Available Hours") {
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
        );
        const availableHours = response.data.reduce((acc, d) => {
          const uniqueKey = `${d.monthNo}_${d.year}`;
          acc[uniqueKey] = d.workingHours || 0;
          return acc;
        }, {});
        sortedDurations.forEach((duration) => {
          if (!isDurationInRange(duration)) return;
          const uniqueKey = `${duration.monthNo}_${duration.year}`;
          if (
            planType === "EAC" &&
            !isMonthEditable(duration, closedPeriod, planType)
          ) {
            newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
          } else if (isMonthEditable(duration, closedPeriod, planType)) {
            newHours[uniqueKey] = availableHours[uniqueKey] || "0";
          }
        });
      } catch (err) {
        toast.error("Failed to fetch available hours.", {
          toastId: "available-hours-error",
          autoClose: 3000,
        });
        return;
      }
    } else if (
      fillMethod === "Use Start Period Hours" &&
      sortedDurations.length > 0
    ) {
      const firstDuration = sortedDurations[0];
      if (!isDurationInRange(firstDuration)) {
        toast.error(
          "Start Period hours are outside the selected duration range."
        );
        return;
      }
      const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
      const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
      sortedDurations.forEach((duration) => {
        if (!isDurationInRange(duration)) return;
        const uniqueKey = `${duration.monthNo}_${duration.year}`;
        if (
          planType === "EAC" &&
          !isMonthEditable(duration, closedPeriod, planType)
        ) {
          newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
        } else if (isMonthEditable(duration, closedPeriod, planType)) {
          newHours[uniqueKey] = firstValue;
        }
      });
    }

    setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
    setShowFillValues(false);
    setFillMethod("None");
    setFillHours(0.0);
    setSourceRowIndex(null);
  };

  const handleSaveNewEntry = async () => {
    if (!planId) {
      toast.error("Plan ID is required to save a new entry.", {
        autoClose: 3000,
      });
      return;
    }

    // Check for duplicate employee ID before validating anything else
    // const isDuplicate = localEmployees.some(
    //   (emp) => emp.emple && emp.emple.emplId === newEntry.id.trim()
    // );
    // if (isDuplicate) {
    //   toast.error(
    //     "Can't save entry with existing ID. Please use a different ID.",
    //     {
    //       toastId: "duplicate-save-error",
    //       autoClose: 3000,
    //     }
    //   );
    //   return;
    // }

    const isDuplicate = localEmployees.some(
  (emp) => emp.emple && 
    emp.emple.emplId === newEntry.id.trim() && 
    emp.emple.plcGlcCode === newEntry.plcGlcCode.trim()
);
if (isDuplicate) {
  toast.error(
    "Can't save entry with existing ID and PLC combination. Please use a different ID or PLC.",
    {
      toastId: "duplicate-save-error",
      autoClose: 3000,
    }
  );
  return;
}

    if (newEntry.idType === "PLC") {
      if (!newEntry.id || newEntry.id !== "PLC") {
        toast.error("ID must be automatically set to 'PLC' for PLC type.", {
          autoClose: 3000,
        });
        return;
      }
    } else if (newEntry.idType === "Other") {
      // For Other type, just check that it's not empty (no further validation)
      if (!newEntry.id.trim()) {
        toast.error("ID is required.", { autoClose: 3000 });
        return;
      }
    } else if (newEntry.idType === "Employee" || newEntry.idType === "Vendor") {
      if (!newEntry.id.trim()) {
        toast.error("ID is required.", { autoClose: 3000 });
        return;
      }
      // Only validate against suggestions if we have them
      if (employeeSuggestions.length > 0) {
        const validEmployee = employeeSuggestions.find(
          (emp) => emp.emplId === newEntry.id.trim()
        );
        if (!validEmployee) {
          toast.error("Please enter a valid ID from the available list.", {
            autoClose: 3000,
          });
          return;
        }
      }
    }

    if (!isValidAccount(newEntry.acctId)) {
      toast.error("Please enter a valid Account from the available list.", {
        autoClose: 3000,
      });
      return;
    }
    if (!isValidOrg(newEntry.orgId)) {
      toast.error("Organization is required.", { autoClose: 3000 });
      return;
    }
    if (!isValidPlc(newEntry.plcGlcCode)) {
      toast.error("Please enter a valid Plc from the available list.", {
        autoClose: 3000,
      });
      return;
    }

    setIsDurationLoading(true);
    const payloadForecasts = durations.map((duration) => ({
      forecastedhours:
        Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
        0,
      projId: projectId,
      plId: planId,
      emplId: newEntry.id,
      month: duration.monthNo,
      year: duration.year,
      acctId: newEntry.acctId,
      orgId: newEntry.orgId,
      plc: newEntry.plcGlcCode || "",
      hrlyRate: Number(newEntry.perHourRate) || 0,
      effectDt: null,
      plEmployee: null,
    }));
    const payload = {
      id: 0,
      emplId: newEntry.id,
      firstName: newEntry.firstName,
      lastName: newEntry.lastName,
      type: newEntry.idType,
      isRev: newEntry.isRev,
      isBrd: newEntry.isBrd,
      plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
      perHourRate: Number(newEntry.perHourRate) || 0,
      status: newEntry.status || "Act",
      accId: newEntry.acctId,
      orgId: newEntry.orgId || "",
      plId: planId,
      plForecasts: payloadForecasts,
    };
    try {
      await axios.post(
        "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
        payload
      );
      setSuccessMessageText("Entry saved successfully!");
      setShowSuccessMessage(true);
      setShowNewForm(false);
      setNewEntry({
        id: "",
        firstName: "",
        lastName: "",
        isRev: false,
        isBrd: false,
        idType: "",
        acctId: "",
        orgId: "",
        plcGlcCode: "",
        perHourRate: "",
        status: "Act",
      });
      setNewEntryPeriodHours({});
      setEmployeeSuggestions([]);
      setLaborAccounts([]);
      setPlcOptions([]);
      setPlcSearch("");
      setAutoPopulatedPLC(false);
      if (onSaveSuccess) {
        onSaveSuccess();
      }
      fetchEmployees();
    } catch (err) {
  setSuccessMessageText("Failed to save entry.");
  setShowSuccessMessage(true);
  
  // Simple error extraction
  let errorMessage = "Failed to save new entry: ";
  
  if (err?.response?.data?.error) {
    errorMessage += err.response.data.error;
  } else if (err?.response?.data?.message) {
    errorMessage += err.response.data.message;
  } else if (err?.message) {
    errorMessage += err.message;
  } else {
    errorMessage += "Unknown error occurred";
  }
  
  toast.error(errorMessage, {
    toastId: "save-entry-error",
    autoClose: 5000,
  });
  
  // Optional: Log for debugging
  console.error("API Error:", err?.response?.data || err);
} finally {
  setIsDurationLoading(false);
  setTimeout(() => setShowSuccessMessage(false), 2000);
}
  };

  const handleFindReplace = async () => {
    if (
      !isEditable ||
      findValue === "" ||
      (replaceScope === "row" && selectedRowIndex === null) ||
      (replaceScope === "column" && selectedColumnKey === null)
    ) {
      toast.warn("Please select a valid scope and enter a value to find.", {
        toastId: "find-replace-warning",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    const updates = [];
    const updatedInputValues = { ...inputValues };
    let replacementsCount = 0;
    let skippedCount = 0;

    for (const empIdx in localEmployees) {
      const emp = localEmployees[empIdx];
      const actualEmpIdx = parseInt(empIdx, 10);

      if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
        continue;
      }

      for (const duration of sortedDurations) {
        const uniqueKey = `${duration.monthNo}_${duration.year}`;

        if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
          continue;
        }

        if (!isMonthEditable(duration, closedPeriod, planType)) {
          continue;
        }

        const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
        let displayedValue;
        if (inputValues[currentInputKey] !== undefined) {
          displayedValue = String(inputValues[currentInputKey]);
        } else {
          const monthHours = getMonthHours(emp);
          const forecast = monthHours[uniqueKey];
          if (forecast && forecast.value !== undefined) {
            displayedValue = String(forecast.value);
          } else {
            displayedValue = "0";
          }
        }

        const findValueTrimmed = findValue.trim();
        const displayedValueTrimmed = displayedValue.trim();

        function isZeroLike(val) {
          if (val === undefined || val === null) return true;
          if (typeof val === "number") return val === 0;
          if (typeof val === "string") {
            const trimmed = val.trim();
            return (
              trimmed === "" ||
              trimmed === "0" ||
              trimmed === "0.0" ||
              trimmed === "0.00" ||
              (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
            );
          }
          return false;
        }

        let isMatch = false;
        if (
          !isNaN(Number(findValueTrimmed)) &&
          Number(findValueTrimmed) === 0
        ) {
          isMatch = isZeroLike(displayedValueTrimmed);
        } else {
          isMatch = displayedValueTrimmed === findValueTrimmed;
          if (!isMatch) {
            const findNum = parseFloat(findValueTrimmed);
            const displayNum = parseFloat(displayedValueTrimmed);
            if (!isNaN(findNum) && !isNaN(displayNum)) {
              isMatch = findNum === displayNum;
            }
          }
        }

        if (isMatch) {
          const newValue = replaceValue.trim();
          const newNumericValue =
            newValue === "" ? 0 : parseFloat(newValue) || 0;
          const forecast = getMonthHours(emp)[uniqueKey];

          if (forecast && forecast.forecastid) {
            if (displayedValueTrimmed !== newValue) {
              updatedInputValues[currentInputKey] = newValue;
              replacementsCount++;
              const payload = {
                forecastedamt: forecast.forecastedamt ?? 0,
                forecastid: Number(forecast.forecastid),
                projId: forecast.projId,
                plId: forecast.plId,
                emplId: forecast.emplId,
                dctId: forecast.dctId ?? 0,
                month: forecast.month,
                year: forecast.year,
                totalBurdenCost: forecast.totalBurdenCost ?? 0,
                burden: forecast.burden ?? 0,
                ccffRevenue: forecast.ccffRevenue ?? 0,
                tnmRevenue: forecast.tnmRevenue ?? 0,
                cost: forecast.cost ?? 0,
                fringe: forecast.fringe ?? 0,
                overhead: forecast.overhead ?? 0,
                gna: forecast.gna ?? 0,
                [planType === "EAC" ? "actualhours" : "forecastedhours"]:
                  newNumericValue,
                updatedat: new Date().toISOString().split("T")[0],
                displayText: forecast.displayText ?? "",
              };
              updates.push(
                axios
                  .put(
                    `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
                    payload,
                    { headers: { "Content-Type": "application/json" } }
                  )
                  .catch((err) => {
                    console.error(
                      "Failed update for payload:",
                      payload,
                      err?.response?.data || err.message
                    );
                  })
              );
            }
          } else {
            console.log(
              `Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`
            );
            skippedCount++;
          }
        }
      }
    }

    console.log(
      `Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`
    );

    setInputValues(updatedInputValues);
    try {
      if (updates.length > 0) {
        await Promise.all(updates);
      }
      setLocalEmployees((prev) => {
        const updated = [...prev];
        for (const empIdx in updated) {
          const emp = updated[empIdx];
          for (const duration of sortedDurations) {
            const uniqueKey = `${duration.monthNo}_${duration.year}`;
            const currentInputKey = `${empIdx}_${uniqueKey}`;
            if (updatedInputValues[currentInputKey] !== undefined) {
              if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
                const forecast = emp.emple.plForecasts.find(
                  (f) =>
                    f.month === duration.monthNo && f.year === duration.year
                );
                if (forecast) {
                  const newValue =
                    parseFloat(updatedInputValues[currentInputKey]) || 0;
                  if (planType === "EAC") {
                    forecast.actualhours = newValue;
                  } else {
                    forecast.forecastedhours = newValue;
                  }
                }
              }
            }
          }
        }
        return updated;
      });

      if (replacementsCount > 0) {
        toast.success(`Successfully replaced ${replacementsCount} cells.`, {
          autoClose: 2000,
        });
      }

      if (replacementsCount === 0 && skippedCount === 0) {
        toast.info("No cells replaced.", { autoClose: 2000 });
      }
    } catch (err) {
      toast.error(
        "Failed to replace values: " +
          (err.response?.data?.message || err.message),
        {
          toastId: "replace-error",
          autoClose: 3000,
        }
      );
    } finally {
      setIsLoading(false);
      setShowFindReplace(false);
      setFindValue("");
      setReplaceValue("");
      setSelectedRowIndex(null);
      setSelectedColumnKey(null);
      setReplaceScope("all");
    }
  };


  
const handleRowClick = (actualEmpIdx) => {
    if (!isEditable) return;
    setSelectedRowIndex(
      actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
    );
    setSelectedEmployeeId(localEmployees[actualEmpIdx]?.emple_Id);
    setSelectedColumnKey(null);
    setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
    if (showNewForm) setSourceRowIndex(actualEmpIdx);
  };

  // handle delete employee here
  const handleDeleteEmployee = async (emple_Id) => {
    if (!emple_Id) return;
 
    try {
      await axios.delete(
        `https://test-api-3tmq.onrender.com/Employee/DeleteEmployee/${emple_Id}`
      );
 
      toast.success("Employee deleted successfully!");
 
      // Remove deleted employee from local state
      setLocalEmployees((prev) =>
        prev.filter((emp) => emp.emple_Id !== emple_Id)
      );
    } catch (err) {
      toast.error(
        "Failed to delete employee: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleColumnHeaderClick = (uniqueKey) => {
    if (!isEditable) return;
    setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
    setSelectedRowIndex(null);
    setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
  };

  const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
  const showHiddenRows = () => setHiddenRows({});

  const sortedDurations = [...durations]
    .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
    .sort(
      (a, b) =>
        new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
    );

  if (isLoading || isDurationLoading) {
    return (
      <div className="p-4 font-inter flex justify-center items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-xs text-gray-600">
          Loading forecast data...
        </span>
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

  const rowCount = Math.max(
    localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
      (showNewForm ? 1 : 0),
    2
  );

  return (
    <div className="relative p-4 font-inter w-full synchronized-tables-outer">
      {showSuccessMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
            successMessageText.includes("successfully") ||
            successMessageText.includes("Replaced")
              ? "bg-green-500"
              : "bg-red-500"
          } text-white text-xs`}
        >
          {successMessageText}
        </div>
      )}

      <div className="w-full flex justify-between mb-4 gap-2">
        <div className="flex-grow"></div>
        <div className="flex gap-2 ">
          {hasHiddenRows && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
              onClick={showHiddenRows}
            >
              Show Hidden Rows
            </button>
          )}
          {isEditable && (
            <>
              {/* <button
                onClick={() => setShowNewForm((prev) => !prev)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
              >
                {showNewForm ? "Cancel" : "New"}
              </button> */}
              <button
  onClick={() => {
    if (showNewForm) {
      // Reset all form fields when canceling
      setNewEntry({
        id: "",
        firstName: "",
        lastName: "",
        isRev: false,
        isBrd: false,
        idType: "",
        acctId: "",
        orgId: "",
        plcGlcCode: "",
        perHourRate: "",
        status: "Act",
      });
      setNewEntryPeriodHours({});
      setEmployeeSuggestions([]);
      setLaborAccounts([]);
      setPlcOptions([]);
      setFilteredPlcOptions([]);
      setPlcSearch("");
      setOrgSearch("");
      setAutoPopulatedPLC(false);
      setShowNewForm(false);
    } else {
      setShowNewForm(true);
    }
  }}
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
>
  {showNewForm ? "Cancel" : "New"}
</button>

              {!showNewForm && (
                <>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
                  onClick={() => isEditable && setShowFindReplace(true)}
                >
                  Find / Replace
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs font-medium"
                    onClick={() => {
                      if (!selectedEmployeeId) {
                        toast.error("Please select an employee to delete");
                        return;
                      }
                      if (
                        window.confirm(
                          "Are you sure you want to delete this employee?"
                        )
                      ) {
                        handleDeleteEmployee(selectedEmployeeId);
                        setSelectedEmployeeId(null); // optional: clear selection
                      }
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
              {showNewForm && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
                  onClick={() => isEditable && setShowFillValues(true)}
                >
                  Fill Values
                </button>
              )}
            </>
          )}

          {showNewForm && (
            <button
              onClick={handleSaveNewEntry}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
            >
              Save Entry
            </button>
          )}
        </div>
      </div>

      {showFillValues && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
            <h3 className="text-lg font-semibold mb-4">
              Fill Values to selected record/s
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Select Fill Method
              </label>
              <select
                value={fillMethod}
                onChange={(e) => setFillMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
              >
                <option value="None">None</option>
                <option value="Copy From Source Record">
                  Copy from source record
                </option>
                <option value="Specify Hours">Specify Hours</option>
                <option value="Use Available Hours">Use Available Hours</option>
                <option value="Use Start Period Hours">
                  Use Start Period Hours
                </option>
              </select>
            </div>
            {fillMethod === "Specify Hours" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-xs font-medium mb-1">
                  Hours
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={fillHours}
                  onChange={(e) =>
                    setFillHours(parseFloat(e.target.value) || 0)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      (e.target.value === "0" || e.target.value === "")
                    ) {
                      e.preventDefault();
                      setFillHours("");
                    }
                  }}
                  className="w-full border border-gray-300 rounded-md p-2 text-xs"
                  placeholder="0.00"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Start Period
              </label>
              <input
                type="date"
                value={fillStartDate}
                onChange={(e) => setFillStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                End Period
              </label>
              <input
                type="date"
                value={fillEndDate}
                onChange={(e) => setFillEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowFillValues(false);
                  setFillMethod("None");
                  setFillHours(0.0);
                  setSourceRowIndex(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleFillValues}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
              >
                Fill
              </button>
            </div>
          </div>
        </div>
      )}

      {localEmployees.length === 0 &&
      !showNewForm &&
      sortedDurations.length > 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
          No forecast data available for this plan.
        </div>
      ) : (
        <div className="vertical-scroll-wrapper " ref={verticalScrollRef}>
          <div className="synchronized-tables-container flex">
            <div className="synchronized-table-scroll first">
              <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
                <thead className="sticky-thead">
                  <tr
                    style={{
                      height: `${ROW_HEIGHT_DEFAULT}px`,
                      lineHeight: "normal",
                    }}
                  >
                    {EMPLOYEE_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {showNewForm && (
                    <tr
                      key="new-entry"
                      className="bg-gray-50"
                      style={{
                        height: `${ROW_HEIGHT_DEFAULT}px`,
                        lineHeight: "normal",
                      }}
                    >
                      <td className="border border-gray-300 px-1.5 py-0.5">
                        <select
                          name="idType"
                          value={newEntry.idType || ""}
                          onChange={(e) => handleIdTypeChange(e.target.value)}
                          className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        >
                          {ID_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-1.5 py-0.5">
                        <input
                          type="text"
                          name="id"
                          value={newEntry.id}
                          onChange={(e) => handleIdChange(e.target.value)}
                          disabled={newEntry.idType === "PLC"}
                          className={`w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border ${
                            newEntry.idType === "PLC"
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          list="employee-id-list"
                          placeholder={
                            newEntry.idType === "PLC"
                              ? "Not required for PLC"
                              : "Enter ID"
                          }
                        />
                        {/* <datalist id="employee-id-list">
                          {employeeSuggestions
                            .filter(
                              (emp) =>
                                emp.emplId && typeof emp.emplId === "string"
                            )
                            .map((emp, index) => (
                              <option
                                key={`${emp.emplId}-${index}`}
                                value={emp.emplId}
                              >
                                {emp.lastName && emp.firstName
                                  ? `${emp.lastName}, ${emp.firstName}`
                                  : emp.lastName || emp.firstName || emp.emplId}
                              </option>
                            ))}
                        </datalist> */}
                        <datalist id="employee-id-list">
                          {newEntry.idType !== "Other" &&
                            employeeSuggestions
                              .filter(
                                (emp) =>
                                  emp.emplId && typeof emp.emplId === "string"
                              )
                              .map((emp, index) => (
                                <option
                                  key={`${emp.emplId}-${index}`}
                                  value={emp.emplId}
                                >
                                  {emp.lastName && emp.firstName
                                    ? `${emp.lastName}, ${emp.firstName}`
                                    : emp.lastName ||
                                      emp.firstName ||
                                      emp.emplId}
                                </option>
                              ))}
                        </datalist>
                      </td>
                      {/* <td className="border border-gray-300 px-1.5 py-0.5">
                        <input
                          type="text"
                          name="name"
                          value={
                            newEntry.idType === "Vendor"
                              ? newEntry.lastName || newEntry.firstName || ""
                              : newEntry.lastName && newEntry.firstName
                              ? `${newEntry.lastName}, ${newEntry.firstName}`
                              : newEntry.lastName || newEntry.firstName || ""
                          }
                          readOnly
                          className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
                          placeholder="Name (auto-filled)"
                        />
                      </td> */}
                      <td className="border border-gray-300 px-1.5 py-0.5">
  <input
    type="text"
    name="name"
    value={
      newEntry.idType === "Other"
        ? `${newEntry.firstName || ""} ${newEntry.lastName || ""}`.trim()
        : newEntry.idType === "Vendor"
        ? newEntry.lastName || newEntry.firstName || ""
        : newEntry.lastName && newEntry.firstName
        ? `${newEntry.lastName}, ${newEntry.firstName}`
        : newEntry.lastName || newEntry.firstName || ""
    }
    readOnly={newEntry.idType !== "Other"}
    onChange={(e) => {
      if (newEntry.idType === "Other") {
        const fullName = e.target.value.trim();
        // Split name into first and last (assuming format: "First Last")
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        
        setNewEntry(prev => ({
          ...prev,
          firstName: firstName,
          lastName: lastName
        }));
      }
    }}
    className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
      newEntry.idType === "Other" 
        ? "bg-white" 
        : "bg-gray-100 cursor-not-allowed"
    }`}
    placeholder={
      newEntry.idType === "Other" 
        ? "Enter name" 
        : "Name (auto-filled)"
    }
  />
</td>

                      <td className="border border-gray-300 px-1.5 py-0.5">
                        <input
                          type="text"
                          name="acctId"
                          value={newEntry.acctId}
                          onChange={(e) => handleAccountChange(e.target.value)}
                          onBlur={(e) => handleAccountBlur(e.target.value)}
                          className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                            !isFieldEditable ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                          list="account-list"
                          placeholder="Enter Account"
                        //   disabled={!isBudPlan}
                        disabled={!isFieldEditable} 
                        />
                        <datalist id="account-list">
                          {laborAccounts.map((account, index) => (
                            <option
                              key={`${account.id}-${index}`}
                              value={account.id}
                            >
                              {account.id}
                            </option>
                          ))}
                        </datalist>
                      </td>
                      {/* <td className="border border-gray-300 px-1.5 py-0.5">
                        <input
                          type="text"
                          name="orgId"
                          value={newEntry.orgId}
                          onChange={(e) => handleOrgChange(e.target.value)}
                          onBlur={(e) => handleOrgBlur(e.target.value)}
                          className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                            !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                          placeholder="Enter Organization"
                          disabled={!isBudPlan}
                        />
                      </td> */}
                      <td className="border border-gray-300 px-1.5 py-0.5">
  <input
    type="text"
    name="orgId"
    value={newEntry.orgId}
    onChange={(e) => handleOrgInputChange(e.target.value)}
    onBlur={(e) => handleOrgBlur(e.target.value)}
    className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
      !isFieldEditable ? "bg-gray-100 cursor-not-allowed" : ""
    }`}
    list="organization-list"
    placeholder="Enter Organization ID (numeric)"
    // disabled={!isBudPlan}
    disabled={!isFieldEditable}
  />
  <datalist id="organization-list">
    {organizationOptions.map((org, index) => (
      <option
        key={`${org.value}-${index}`}
        value={org.value}
      >
        {org.label}
      </option>
    ))}
  </datalist>
</td>


                      <td className="border border-gray-300 px-1.5 py-0.5">
                        {/* <input
                          type="text"
                          name="plcGlcCode"
                          value={newEntry.plcGlcCode}
                          onChange={(e) =>
                            isBudPlan && handlePlcInputChange(e.target.value)
                          }
                          onBlur={(e) => handlePlcBlur(e.target.value)}
                          className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                            !isBudPlan || autoPopulatedPLC
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          list="plc-list"
                          placeholder="Enter Plc"
                          disabled={!isBudPlan || autoPopulatedPLC}
                          readOnly={autoPopulatedPLC}
                        /> */}
                        <input
  type="text"
  name="plcGlcCode"
  value={newEntry.plcGlcCode}
  onChange={(e) => handlePlcInputChange(e.target.value)}
  onBlur={(e) => handlePlcBlur(e.target.value)}
  className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
    autoPopulatedPLC ? "bg-gray-100 cursor-not-allowed" : ""
  }`}
  list="plc-list"
  placeholder="Enter Plc"
//   disabled={autoPopulatedPLC}
//   readOnly={autoPopulatedPLC}
/>
                        {/* <datalist id="plc-list">
                          {plcOptions.map((plc, index) => (
                            <option
                              key={`${plc.value}-${index}`}
                              value={plc.value}
                            >
                              {plc.label}
                            </option>
                          ))}
                        </datalist> */}
                        <datalist id="plc-list">
  {filteredPlcOptions.map((plc, index) => (
    <option
      key={`${plc.value}-${index}`}
      value={plc.value}
    >
      {plc.label}
    </option>
  ))}
</datalist>

                      </td>
                      <td className="border border-gray-300 px-1.5 py-0.5 text-center">
                        <input
                          type="checkbox"
                          name="isRev"
                          checked={newEntry.isRev}
                        //   onChange={(e) =>
                        //     isBudPlan &&
                        //     setNewEntry({
                        //       ...newEntry,
                        //       isRev: e.target.checked,
                        //     })
                        //   }
                        // CHANGE TO:
onChange={(e) =>
  isFieldEditable &&
  setNewEntry({
    ...newEntry,
    isRev: e.target.checked,
  })
}
disabled={!isFieldEditable}
                       

                        />
                      </td>
                      <td className="border border-gray-300 px-1.5 py-0.5 text-center">
                        <input
                          type="checkbox"
                          name="isBrd"
                          checked={newEntry.isBrd}
                        //   onChange={(e) =>
                        //     isBudPlan &&
                        //     setNewEntry({
                        //       ...newEntry,
                        //       isBrd: e.target.checked,
                        //     })
                        //   }
                        //   className="w-4 h-4"
                        //   disabled={!isBudPlan}
                        // CHANGE TO:
onChange={(e) =>
  isFieldEditable &&
  setNewEntry({
    ...newEntry,
    isBrd: e.target.checked,
  })
}
disabled={!isFieldEditable}
                        />
                      </td>
                      <td className="border border-gray-300 px-1.5 py-0.5">
                        <input
                          type="text"
                          name="status"
                          value={newEntry.status}
                          onChange={(e) =>
                            setNewEntry({ ...newEntry, status: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                          placeholder="Enter Status"
                        />
                      </td>
                      <td className="border border-gray-300 px-1.5 py-0.5">
                        <input
                          type="text"
                          name="perHourRate"
                          value={newEntry.perHourRate}
                        //   onChange={(e) =>
                        //     isBudPlan &&
                        //     setNewEntry({
                        //       ...newEntry,
                        //       perHourRate: e.target.value.replace(
                        //         /[^0-9.]/g,
                        //         ""
                        //       ),
                        //     })
                        //   }
                        //   className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                        //     !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        //   }`}
                        //   placeholder="Enter Hour Rate"
                        //   disabled={!isBudPlan}
                        // CHANGE TO:
onChange={(e) =>
  isFieldEditable &&
  setNewEntry({
    ...newEntry,
    perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
  })
}
className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
  !isFieldEditable ? "bg-gray-100 cursor-not-allowed" : ""
}`}
disabled={!isFieldEditable}
                        />
                      </td>
                      <td className="border border-gray-300 px-1.5 py-0.5">
                        {Object.values(newEntryPeriodHours)
                          .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {localEmployees
                    .filter((_, idx) => !hiddenRows[idx])
                    .map((emp, idx) => {
                      const actualEmpIdx = localEmployees.findIndex(
                        (e) => e === emp
                      );
                      const row = getEmployeeRow(emp, actualEmpIdx);
                      const editedData = editedEmployeeData[actualEmpIdx] || {};
                      return (
                        <tr
                          key={`employee-${actualEmpIdx}`}
                          className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
                            selectedRowIndex === actualEmpIdx
                              ? "bg-yellow-100"
                              : "even:bg-gray-50"
                          }`}
                          style={{
                            height: `${ROW_HEIGHT_DEFAULT}px`,
                            lineHeight: "normal",
                            cursor: isEditable ? "pointer" : "default",
                          }}
                          onClick={() => handleRowClick(actualEmpIdx)}
                        >
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {row.idType}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {row.emplId}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {row.name}
                          </td>

                          {/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.acctId !== undefined
          ? editedData.acctId
          : row.acctId
      }
      onChange={(e) => handleAccountInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={() => handleEmployeeDataBlur(actualEmpIdx, emp)}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`account-list-${actualEmpIdx}`}
      placeholder="Enter Account"
    />
  ) : (
    row.acctId
  )}
  <datalist id={`account-list-${actualEmpIdx}`}>
    {updateAccountOptions.map((account, index) => (
      <option
        key={`${account.id}-${index}`}
        value={account.id}
      >
        {account.id}
      </option>
    ))}
  </datalist>
</td> */}

<td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.acctId !== undefined
          ? editedData.acctId
          : row.acctId
      }
      onChange={(e) => handleAccountInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={(e) => {
        const val = e.target.value;
        if (val && !isValidAccountForUpdate(val, updateAccountOptions)) {
          toast.error("Please enter a valid Account from the available list.", {
            autoClose: 3000,
          });
        } else {
          handleEmployeeDataBlur(actualEmpIdx, emp);
        }
      }}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`account-list-${actualEmpIdx}`}
      placeholder="Enter Account"
    />
  ) : (
    row.acctId
  )}
  <datalist id={`account-list-${actualEmpIdx}`}>
    {updateAccountOptions.map((account, index) => (
      <option
        key={`${account.id}-${index}`}
        value={account.id}
      >
        {account.id}
      </option>
    ))}
  </datalist>
</td>


                          
                          {/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {isBudPlan && isEditable ? (
                              <input
                                type="text"
                                value={
                                  editedData.acctId !== undefined
                                    ? editedData.acctId
                                    : row.acctId
                                }
                                onChange={(e) =>
                                  handleEmployeeDataChange(
                                    actualEmpIdx,
                                    "acctId",
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  handleEmployeeDataBlur(actualEmpIdx, emp)
                                }
                                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                                list="account-list"
                              />
                            ) : (
                              row.acctId
                            )}
                          </td> */}
                         
                         
                          {/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {isBudPlan && isEditable ? (
                              <input
                                type="text"
                                value={
                                  editedData.orgId !== undefined
                                    ? editedData.orgId
                                    : row.orgId
                                }
                                onChange={(e) =>
                                  handleEmployeeDataChange(
                                    actualEmpIdx,
                                    "orgId",
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  handleEmployeeDataBlur(actualEmpIdx, emp)
                                }
                                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                              />
                            ) : (
                              row.orgId
                            )}
                          </td> */}
                          {/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.orgId !== undefined
          ? editedData.orgId
          : row.orgId
      }
      onChange={(e) => handleOrgInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={(e) => {
        const val = e.target.value;
        if (val && val.length >= 3 && !isValidOrg(val)) {
          toast.error("Please enter a valid numeric Organization ID from the available list.", {
            autoClose: 3000,
          });
          handleEmployeeDataChange(actualEmpIdx, "orgId", "");
        } else {
          handleEmployeeDataBlur(actualEmpIdx, emp);
        }
      }}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list="organization-list"
      placeholder="Enter Organization ID"
    />
  ) : (
    row.orgId
  )}
</td> */}

<td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.orgId !== undefined
          ? editedData.orgId
          : row.orgId
      }
      onChange={(e) => handleOrgInputChangeForUpdate(e.target.value, actualEmpIdx)}
    //   onBlur={(e) => {
    //     const val = e.target.value;
    //     if (val && !isValidOrg(val)) {
    //       toast.error("Please enter a valid numeric Organization ID from the available list.", {
    //         autoClose: 3000,
    //       });
    //       // Don't clear the value automatically - let user fix it
    //     } else {
    //       handleEmployeeDataBlur(actualEmpIdx, emp);
    //     }
    //   }}
    onBlur={(e) => {
  const val = e.target.value;
  const originalValue = row.orgId;
  
  // Only validate if the value has actually changed
  if (val !== originalValue && val && !isValidOrgForUpdate(val, updateOrganizationOptions)) {
    toast.error("Please enter a valid numeric Organization ID from the available list.", {
      autoClose: 3000,
    });
  } else {
    handleEmployeeDataBlur(actualEmpIdx, emp);
  }
}}


      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`organization-list-${actualEmpIdx}`}
      placeholder="Enter Organization ID"
    />
  ) : (
    row.orgId
  )}
  <datalist id={`organization-list-${actualEmpIdx}`}>
    {updateOrganizationOptions.map((org, index) => (
      <option
        key={`${org.value}-${index}`}
        value={org.value}
      >
        {org.label}
      </option>
    ))}
  </datalist>
</td>



                          {/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {isBudPlan && isEditable ? (
                              <input
                                type="text"
                                value={
                                  editedData.glcPlc !== undefined
                                    ? editedData.glcPlc
                                    : row.glcPlc
                                }
                                onChange={(e) =>
                                  handleEmployeeDataChange(
                                    actualEmpIdx,
                                    "glcPlc",
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  handleEmployeeDataBlur(actualEmpIdx, emp)
                                }
                                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                                list="plc-list"
                              />
                            ) : (
                              row.glcPlc
                            )}
                          </td> */}
                         {/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.glcPlc !== undefined
          ? editedData.glcPlc
          : row.glcPlc
      }
      onChange={(e) => handlePlcInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={(e) => {
        const val = e.target.value;
        if (val && val.length >= 3 && !isValidPlc(val)) {
          toast.error("Please enter a valid PLC from the available list.", {
            autoClose: 3000,
          });
          handleEmployeeDataChange(actualEmpIdx, "glcPlc", "");
        } else {
          handleEmployeeDataBlur(actualEmpIdx, emp);
        }
      }}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list="plc-list"
      placeholder="Enter PLC"
    />
  ) : (
    row.glcPlc
  )}
</td> */}
{/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.glcPlc !== undefined
          ? editedData.glcPlc
          : row.glcPlc
      }
      onChange={(e) => handlePlcInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={() => handleEmployeeDataBlur(actualEmpIdx, emp)}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`plc-list-${actualEmpIdx}`}
      placeholder="Enter PLC"
    />
  ) : (
    row.glcPlc
  )}
  <datalist id={`plc-list-${actualEmpIdx}`}>
    {updatePlcOptions.map((plc, index) => (
      <option
        key={`${plc.value}-${index}`}
        value={plc.value}
      >
        {plc.label}
      </option>
    ))}
  </datalist>
</td> */}
{/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.glcPlc !== undefined
          ? editedData.glcPlc
          : row.glcPlc
      }
      onChange={(e) => handlePlcInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={(e) => {
        const val = e.target.value;
        if (val && !isValidPlcForUpdate(val, updatePlcOptions)) {
          toast.error("Please enter a valid PLC from the available list.", {
            autoClose: 3000,
          });
        } else {
          handleEmployeeDataBlur(actualEmpIdx, emp);
        }
      }}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`plc-list-${actualEmpIdx}`}
      placeholder="Enter PLC"
    />
  ) : (
    row.glcPlc
  )}
  <datalist id={`plc-list-${actualEmpIdx}`}>
    {updatePlcOptions.map((plc, index) => (
      <option
        key={`${plc.value}-${index}`}
        value={plc.value}
      >
        {plc.label}
      </option>
    ))}
  </datalist>
</td> */}
{/* <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.glcPlc !== undefined
          ? editedData.glcPlc
          : row.glcPlc
      }
      onChange={(e) => handlePlcInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={(e) => {
        const val = e.target.value;
        const originalValue = row.glcPlc;
        
        // Only validate if the value has actually changed
        if (val !== originalValue && val && !isValidPlcForUpdate(val, updatePlcOptions)) {
          toast.error("Please enter a valid PLC from the available list.", {
            autoClose: 3000,
          });
        } else {
          handleEmployeeDataBlur(actualEmpIdx, emp);
        }
      }}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`plc-list-${actualEmpIdx}`}
      placeholder="Enter PLC"
    />
  ) : (
    row.glcPlc
  )}
  <datalist id={`plc-list-${actualEmpIdx}`}>
    {(updatePlcOptions.length > 0 ? updatePlcOptions : plcOptions).map((plc, index) => (
      <option
        key={`${plc.value}-${index}`}
        value={plc.value}
      >
        {plc.label}
      </option>
    ))}
  </datalist>
</td> */}

<td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
  {isBudPlan && isEditable ? (
    <input
      type="text"
      value={
        editedData.glcPlc !== undefined
          ? editedData.glcPlc
          : row.glcPlc
      }
      onChange={(e) => handlePlcInputChangeForUpdate(e.target.value, actualEmpIdx)}
      onBlur={(e) => {
        const val = e.target.value;
        const originalValue = row.glcPlc;
        
        // Only validate if the value has actually changed
        if (val !== originalValue && val && !isValidPlcForUpdate(val, updatePlcOptions)) {
          toast.error("Please enter a valid PLC from the available list.", {
            autoClose: 3000,
          });
        } else {
          handleEmployeeDataBlur(actualEmpIdx, emp);
        }
      }}
      className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
      list={`plc-list-${actualEmpIdx}`}
      placeholder="Enter PLC"
    />
  ) : (
    row.glcPlc
  )}
  <datalist id={`plc-list-${actualEmpIdx}`}>
    {/* Use updatePlcOptions if available, otherwise fallback to plcOptions */}
    {(updatePlcOptions.length > 0 ? updatePlcOptions : plcOptions).map((plc, index) => (
      <option
        key={`${plc.value}-${index}`}
        value={plc.value}
      >
        {plc.label}
      </option>
    ))}
  </datalist>
</td>






                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
                            {isBudPlan && isEditable ? (
                              <input
                                type="checkbox"
                                checked={
                                  editedData.isRev !== undefined
                                    ? editedData.isRev
                                    : emp.emple.isRev
                                }
                                onChange={(e) =>
                                  handleEmployeeDataChange(
                                    actualEmpIdx,
                                    "isRev",
                                    e.target.checked
                                  )
                                }
                                onBlur={() =>
                                  handleEmployeeDataBlur(actualEmpIdx, emp)
                                }
                                className="w-4 h-4"
                              />
                            ) : (
                              row.isRev
                            )}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
                            {isBudPlan && isEditable ? (
                              <input
                                type="checkbox"
                                checked={
                                  editedData.isBrd !== undefined
                                    ? editedData.isBrd
                                    : emp.emple.isBrd
                                }
                                onChange={(e) =>
                                  handleEmployeeDataChange(
                                    actualEmpIdx,
                                    "isBrd",
                                    e.target.checked
                                  )
                                }
                                onBlur={() =>
                                  handleEmployeeDataBlur(actualEmpIdx, emp)
                                }
                                className="w-4 h-4"
                              />
                            ) : (
                              row.isBrd
                            )}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {row.status}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {isBudPlan && isEditable ? (
                              <input
                                type="text"
                                value={
                                  editedData.perHourRate !== undefined
                                    ? editedData.perHourRate
                                    : row.perHourRate
                                }
                                onChange={(e) =>
                                  handleEmployeeDataChange(
                                    actualEmpIdx,
                                    "perHourRate",
                                    e.target.value.replace(/[^0-9.]/g, "")
                                  )
                                }
                                onBlur={() =>
                                  handleEmployeeDataBlur(actualEmpIdx, emp)
                                }
                                className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                              />
                            ) : (
                              row.perHourRate
                            )}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                            {row.total}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="synchronized-table-scroll last">
              <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
                <thead className="sticky-thead">
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
                          className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
                            selectedColumnKey === uniqueKey
                              ? "bg-yellow-100"
                              : ""
                          }`}
                          style={{ cursor: isEditable ? "pointer" : "default" }}
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
                  {showNewForm && (
                    <tr
                      key="new-entry"
                      className="bg-gray-50"
                      style={{
                        height: `${ROW_HEIGHT_DEFAULT}px`,
                        lineHeight: "normal",
                      }}
                    >
                      {sortedDurations.map((duration) => {
                        const uniqueKey = `${duration.monthNo}_${duration.year}`;
                        const isInputEditable =
                          isEditable &&
                          isMonthEditable(duration, closedPeriod, planType);
                        return (
                          <td
                            key={`new-${uniqueKey}`}
                            className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
                              planType === "EAC"
                                ? isInputEditable
                                  ? "bg-green-50"
                                  : "bg-gray-200"
                                : ""
                            }`}
                          >
                            <input
                              type="text"
                              inputMode="numeric"
                              value={newEntryPeriodHours[uniqueKey] ?? "0"}
                              onChange={(e) =>
                                isInputEditable &&
                                setNewEntryPeriodHours((prev) => ({
                                  ...prev,
                                  [uniqueKey]: e.target.value.replace(
                                    /[^0-9.]/g,
                                    ""
                                  ),
                                }))
                              }
                              className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
                                !isInputEditable
                                  ? "cursor-not-allowed text-gray-400"
                                  : "text-gray-700"
                              }`}
                              disabled={!isInputEditable}
                              placeholder="Enter Hours"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  )}
                  {localEmployees
                    .filter((_, idx) => !hiddenRows[idx])
                    .map((emp, idx) => {
                      const actualEmpIdx = localEmployees.findIndex(
                        (e) => e === emp
                      );
                      const monthHours = getMonthHours(emp);
                      return (
                        <tr
                          key={`hours-${actualEmpIdx}`}
                          className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
                            selectedRowIndex === actualEmpIdx
                              ? "bg-yellow-100"
                              : "even:bg-gray-50"
                          }`}
                          style={{
                            height: `${ROW_HEIGHT_DEFAULT}px`,
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
                              (forecast?.value !== undefined
                                ? forecast.value
                                : "0");
                            const isInputEditable =
                              isEditable &&
                              isMonthEditable(duration, closedPeriod, planType);
                            return (
                              <td
                                key={`hours-${actualEmpIdx}-${uniqueKey}`}
                                className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
                                  selectedColumnKey === uniqueKey
                                    ? "bg-yellow-100"
                                    : ""
                                } ${
                                  planType === "EAC"
                                    ? isInputEditable
                                      ? "bg-green-50"
                                      : "bg-gray-200"
                                    : ""
                                }`}
                              >
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
                                    !isInputEditable
                                      ? "cursor-not-allowed text-gray-400"
                                      : "text-gray-700"
                                  }`}
                                  value={value}
                                  onChange={(e) =>
                                    handleInputChange(
                                      actualEmpIdx,
                                      uniqueKey,
                                      e.target.value.replace(/[^0-9.]/g, "")
                                    )
                                  }
                                  onBlur={(e) =>
                                    handleForecastHoursBlur(
                                      actualEmpIdx,
                                      uniqueKey,
                                      e.target.value
                                    )
                                  }
                                  disabled={!isInputEditable}
                                  placeholder="Enter Hours"
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
      )}
      {showFindReplace && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
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
                    onChange={(e) => setReplaceScope(e.target.value)}
                  />
                  <span className="ml-2">All</span>
                </label>
                <label className="inline-flex items-center text-xs cursor-pointer">
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
                      ? localEmployees[selectedRowIndex]?.emple.emplId
                      : "N/A"}
                    )
                  </span>
                </label>
                <label className="inline-flex items-center text-xs cursor-pointer">
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
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowFindReplace(false);
                  setSelectedRowIndex(null);
                  setSelectedColumnKey(null);
                  setReplaceScope("all");
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

