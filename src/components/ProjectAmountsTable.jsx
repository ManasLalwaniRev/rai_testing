// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const EMPLOYEE_COLUMNS = [
// //   { key: "idType", label: "ID Type" },
// //   { key: "emplId", label: "ID" },
// //   { key: "name", label: "Name" },
// //   { key: "acctId", label: "Account" },
// //   { key: "orgId", label: "Organization" },
// //   { key: "isRev", label: "Rev" },
// //   { key: "isBrd", label: "Brd" },
// //   { key: "status", label: "Status" },
// //   { key: "total", label: "Total" },
// // ];

// // const ID_TYPE_OPTIONS = [
// //   { value: "", label: "None" },
// //   { value: "Employee", label: "Employee" },
// //   { value: "Vendor", label: "Vendor" },
// //   { value: "Vendor Employee", label: "Vendor Employee" },
// //   { value: "Other", label: "Other" },
// // ];

// // const ROW_HEIGHT_DEFAULT = 48;

// // function isMonthEditable(duration, closedPeriod, planType) {
// //   if (planType !== "EAC") return true;
// //   if (!closedPeriod) return true;
// //   const closedDate = new Date(closedPeriod);
// //   if (isNaN(closedDate)) return true;
// //   const durationDate = new Date(duration.year, duration.monthNo - 1, 1);
// //   const closedMonth = closedDate.getMonth();
// //   const closedYear = closedDate.getFullYear();
// //   const durationMonth = durationDate.getMonth();
// //   const durationYear = durationDate.getFullYear();
// //   return (
// //     durationYear > closedYear ||
// //     (durationYear === closedYear && durationMonth >= closedMonth)
// //   );
// // }

// // const ProjectAmountsTable = ({
// //   initialData,
// //   startDate,
// //   endDate,
// //   planType,
// //   fiscalYear: propFiscalYear,
// //   onSaveSuccess,
// //   refreshKey,
// // }) => {
// //   const [employees, setEmployees] = useState([]);
// //   const [durations, setDurations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [inputValues, setInputValues] = useState({});
// //   const [showFindReplace, setShowFindReplace] = useState(false);
// //   const [findValue, setFindValue] = useState("");
// //   const [replaceValue, setReplaceValue] = useState("");
// //   const [replaceScope, setReplaceScope] = useState("all");
// //   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
// //   const [selectedColumnKey, setSelectedColumnKey] = useState(null);
// //   const [showNewForm, setShowNewForm] = useState(false);
// //   const [newEntry, setNewEntry] = useState({
// //     id: "",
// //     firstName: "",
// //     lastName: "",
// //     isRev: false,
// //     isBrd: false,
// //     idType: "",
// //     acctId: "",
// //     orgId: "",
// //     perHourRate: "",
// //     status: "Act",
// //   });
// //   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [successMessageText, setSuccessMessageText] = useState("");
// //   const [hiddenRows, setHiddenRows] = useState({});
// //   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
// //   const [nonLaborAccounts, setNonLaborAccounts] = useState([]);
// //   const [showFillValues, setShowFillValues] = useState(false);
// //   const [fillMethod, setFillMethod] = useState("None");
// //   const [sourceRowIndex, setSourceRowIndex] = useState(null);
// //   const [editedRowData, setEditedRowData] = useState({});

// //   const isEditable = initialData.status === "In Progress";
// //   const planId = initialData.plId;
// //   const projectId = initialData.projId;
// //   const closedPeriod = initialData.closedPeriod;
// //   const isBudPlan = planType && planType.toUpperCase() === "BUD";

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!startDate || !endDate || !planId) {
// //         setDurations([]);
// //         setEmployees([]);
// //         setIsLoading(false);
// //         return;
// //       }

// //       setIsLoading(true);
// //       setError(null);

// //       try {
// //         const durationResponse = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
// //         );
// //         if (!Array.isArray(durationResponse.data)) {
// //           throw new Error("Invalid duration response format");
// //         }
// //         const fetchedDurations = durationResponse.data;
// //         setDurations(fetchedDurations);

// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}`
// //         );
// //         const apiData = Array.isArray(response.data)
// //           ? response.data
// //           : [response.data];
// //         // console.log(apiData.length);
// //         // console.log(JSON.stringify(apiData));
// //         if (apiData.length === 0) {
// //           setEmployees([]);
// //           toast.info('No forecast data available for this plan.', {
// //             toastId: "no-forecast-data",
// //             autoClose: 3000,
// //           });
// //         } else {
// //           // const employeeMap = new Map();
// //           // apiData.forEach((item, idx) => {
// //           //   const emplId = item.empl?.id || `auto-${idx}`;
// //           //   const existing = employeeMap.get(emplId) || {
// //           //     emple: {
// //           //       empleId: emplId,
// //           //       emplId: item.empl?.id || "",
// //           //       firstName: item.empl?.firstName || "",
// //           //       lastName: item.empl?.lastName || "",
// //           //       accId: item.empl?.acctId || "",
// //           //       orgId: item.empl?.orgId || "",
// //           //       perHourRate: item.empl?.hrRate || "",
// //           //       isRev: item.empl?.isRev || false,
// //           //       isBrd: item.empl?.isBrd || false,
// //           //       status: item.empl?.status || "Act",
// //           //       type: item.empl?.type || "",
// //           //       category: item.empl?.category || "",
// //           //       dctId: item.dctId || 0,
// //           //       plId: item.pl_ID || 0,
// //           //       plForecasts: [],
// //           //     },
// //           //   };
// //           //   existing.emple.plForecasts = [
// //           //     ...existing.emple.plForecasts,
// //           //     ...(item.empl?.plForecasts || []),
// //           //   ];
// //           //   // console.log(emplId);
// //           //   // console.log(JSON.stringify(existing));
// //           //   employeeMap.set(emplId, existing);
// //           // });
// //           // const updatedEmployees = Array.from(employeeMap.values());
// //           // setEmployees(updatedEmployees);
// //           const updatedEmployees = apiData.map((item, idx) => ({
// //             emple: {
// //               empleId: item.empl?.id || `auto-${idx}`,
// //               emplId: item.empl?.id || "",
// //               firstName: item.empl?.firstName || "",
// //               lastName: item.empl?.lastName || "",
// //               accId: item.empl?.acctId || "",
// //               orgId: item.empl?.orgId || "",
// //               perHourRate: item.empl?.hrRate || "",
// //               isRev: item.empl?.isRev || false,
// //               isBrd: item.empl?.isBrd || false,
// //               status: item.empl?.status || "Act",
// //               type: item.empl?.type || "",
// //               category: item.empl?.category || "",
// //               dctId: item.dctId || 0,
// //               plId: item.pl_ID || 0,
// //               plForecasts: item.empl?.plForecasts || [],
// //             },
// //           }));
// //           setEmployees(updatedEmployees);
// //         }
// //         setInputValues({});
// //         setNewEntryPeriodAmounts({});
// //       } catch (err) {
// //         setError("Failed to load data. Please try again.");
// //         if (err.response && err.response.status === 500) {
// //           setEmployees([]);
// //           toast.info("No forecast data available for this plan.", {
// //             toastId: "no-forecast-data",
// //             autoClose: 3000,
// //           });
// //         } else {
// //           toast.error(
// //             "Failed to load forecast data: " +
// //               (err.response?.data?.message || err.message),
// //             {
// //               toastId: "forecast-error",
// //               autoClose: 3000,
// //             }
// //           );
// //         }
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [startDate, endDate, planId, refreshKey]);

// //   useEffect(() => {
// //     const fetchEmployees = async () => {
// //       if (!projectId) {
// //         console.warn("projectId is undefined, skipping employee fetch");
// //         setEmployeeSuggestions([]);
// //         return;
// //       }
// //       if (!showNewForm) {
// //         console.log("New entry form is not open, skipping employee fetch");
// //         setEmployeeSuggestions([]);
// //         return;
// //       }
// //       console.log(`Fetching employees for projectId: ${projectId}`);
// //       try {
// //         const endpoint =
// //           newEntry.idType === "Vendor" || newEntry.idType === "Vendor Employee"
// //             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
// //             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
// //         const response = await axios.get(endpoint);
// //         console.log("Employee suggestions response:", response.data);
// //         const suggestions = Array.isArray(response.data)
// //           ? response.data.map((emp) => {
// //               if (newEntry.idType === "Vendor") {
// //                 return {
// //                   emplId: emp.vendId,
// //                   firstName: "",
// //                   lastName: emp.employeeName || "",
// //                 };
// //               } else if (newEntry.idType === "Vendor Employee") {
// //                 return {
// //                   emplId: emp.empId,
// //                   firstName: "",
// //                   lastName: emp.employeeName || "",
// //                 };
// //               } else {
// //                 const [lastName, firstName] = (emp.employeeName || "")
// //                   .split(", ")
// //                   .map((str) => str.trim());
// //                 return {
// //                   emplId: emp.empId,
// //                   firstName: firstName || "",
// //                   lastName: lastName || "",
// //                 };
// //               }
// //             })
// //           : [];
// //         setEmployeeSuggestions(suggestions);
// //         console.log("Updated employeeSuggestions:", suggestions);
// //       } catch (err) {
// //         console.error("Error fetching employees:", err);
// //         setEmployeeSuggestions([]);
// //         toast.error(
// //           `Failed to fetch ${
// //             newEntry.idType === "Vendor" ||
// //             newEntry.idType === "Vendor Employee"
// //               ? "vendor "
// //               : ""
// //           }employee suggestions${
// //             projectId
// //               ? " for project ID " + projectId
// //               : ". Project ID is missing."
// //           }`,
// //           {
// //             toastId: "employee-fetch-error",
// //             autoClose: 3000,
// //           }
// //         );
// //       }
// //     };

// //     const fetchNonLaborAccounts = async () => {
// //       if (!projectId) {
// //         console.warn(
// //           "projectId is undefined, skipping non-labor accounts fetch"
// //         );
// //         setNonLaborAccounts([]);
// //         return;
// //       }
// //       if (!showNewForm) {
// //         console.log(
// //           "New entry form is not open, skipping non-labor accounts fetch"
// //         );
// //         setNonLaborAccounts([]);
// //         return;
// //       }
// //       console.log(`Fetching non-labor accounts for projectId: ${projectId}`);
// //       try {
// //         const response = await axios.get(
// //           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
// //         );
// //         console.log("Non-labor accounts response:", response.data);
// //         const data = Array.isArray(response.data)
// //           ? response.data[0]
// //           : response.data;
// //         const accounts = Array.isArray(data.nonLaborAccounts)
// //           ? data.nonLaborAccounts.map((account) => ({ id: account }))
// //           : [];
// //         setNonLaborAccounts(accounts);
// //         console.log("Updated nonLaborAccounts:", accounts);
// //       } catch (err) {
// //         console.error("Error fetching non-labor accounts:", err);
// //         setNonLaborAccounts([]);
// //         toast.error(
// //           `Failed to fetch non-labor accounts${
// //             projectId
// //               ? " for project ID " + projectId
// //               : ". Project ID is missing."
// //           }`,
// //           {
// //             toastId: "non-labor-accounts-error",
// //             autoClose: 3000,
// //           }
// //         );
// //       }
// //     };

// //     if (showNewForm) {
// //       fetchEmployees();
// //       fetchNonLaborAccounts();
// //     } else {
// //       setEmployeeSuggestions([]);
// //       setNonLaborAccounts([]);
// //     }
// //   }, [projectId, showNewForm, newEntry.idType]);

// //   const handleIdChange = (value) => {
// //     console.log("handleIdChange called with value:", value);
// //     const selectedEmployee = employeeSuggestions.find(
// //       (emp) => emp.emplId === value
// //     );
// //     console.log("Selected employee:", selectedEmployee);
// //     setNewEntry((prev) => ({
// //       ...prev,
// //       id: value,
// //       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
// //       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
// //       acctId: nonLaborAccounts.length > 0 ? nonLaborAccounts[0].id : "",
// //     }));
// //   };

// //   const handleRowFieldChange = (rowIdx, field, value) => {
// //     if (!isBudPlan || !isEditable) return;
// //     setEditedRowData((prev) => ({
// //       ...prev,
// //       [rowIdx]: {
// //         ...prev[rowIdx],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   const handleRowFieldBlur = async (rowIdx, emp) => {
// //     if (!isBudPlan || !isEditable) return;
// //     if (!emp || !emp.emple) {
// //       toast.error("Employee data is missing for update.");
// //       return;
// //     }

// //     const edited = editedRowData[rowIdx] || {};
// //     if (
// //       edited.acctId === undefined &&
// //       edited.orgId === undefined &&
// //       edited.isRev === undefined &&
// //       edited.isBrd === undefined
// //     )
// //       return;

// //     const payload = {
// //       dctId: emp.emple.dctId || 0,
// //       plId: emp.emple.plId || 0,
// //       accId: edited.acctId !== undefined ? edited.acctId : emp.emple.accId, 
// //       orgId: edited.orgId !== undefined ? edited.orgId : emp.emple.orgId,
// //       type: emp.emple.type || "",
// //       category: emp.emple.category || "",
// //       amountType: emp.emple.amountType || "",
// //       id: emp.emple.emplId || "",
// //       isRev: edited.isRev !== undefined ? edited.isRev : emp.emple.isRev,
// //       isBrd: edited.isBrd !== undefined ? edited.isBrd : emp.emple.isBrd,
// //       createdBy: emp.emple.createdBy || "System",
// //       lastModifiedBy: "System",
// //     };

// //     try {
// //       await axios.put(
// //         "https://test-api-3tmq.onrender.com/DirectCost/UpdateDirectCost",
// //         { ...payload, acctId: payload.accId },
// //         { headers: { "Content-Type": "application/json" } }
// //       );
// //       setEditedRowData((prev) => {
// //         const newData = { ...prev };
// //         delete newData[rowIdx];
// //         return newData;
// //       });
// //       setEmployees((prev) => {
// //         const updated = [...prev];
// //         updated[rowIdx] = {
// //           ...updated[rowIdx],
// //           emple: {
// //             ...updated[rowIdx].emple,
// //             ...payload,
// //           },
// //         };
// //         return updated;
// //       });
// //       toast.success("Employee updated successfully!", {
// //         toastId: `employee-update-${rowIdx}`,
// //         autoClose: 2000,
// //       });
// //     } catch (err) {
// //       toast.error(
// //         "Failed to update row: " + (err.response?.data?.message || err.message)
// //       );
// //     }
// //   };

// //   const getEmployeeRow = (emp, idx) => {
// //     const monthAmounts = getMonthAmounts(emp);
// //     const totalAmount = sortedDurations.reduce((sum, duration) => {
// //       const uniqueKey = `${duration.monthNo}_${duration.year}`;
// //       const inputValue = inputValues[`${idx}_${uniqueKey}`];
// //       const forecastValue = monthAmounts[uniqueKey]?.value;
// //       const value =
// //         inputValue !== undefined && inputValue !== ""
// //           ? inputValue
// //           : forecastValue;
// //       return sum + (value && !isNaN(value) ? Number(value) : 0);
// //     }, 0);

// //     return {
// //       idType: emp.emple.type || "Employee",
// //       emplId: emp.emple.emplId || "-",
// //       name:
// //         emp.emple.category || emp.emple.firstName || emp.emple.lastName
// //           ? emp.emple.category ||
// //             `${emp.emple.lastName || ""}${
// //               emp.emple.firstName && emp.emple.lastName ? ", " : ""
// //             }${emp.emple.firstName || ""}`
// //           : "-",
// //       acctId: emp.emple.accId || "-",
// //       orgId: emp.emple.orgId || "-",
// //       isRev: emp.emple.isRev ? (
// //         <span className="text-green-600 font-sm text-xl">✓</span>
// //       ) : (
// //         "-"
// //       ),
// //       isBrd: emp.emple.isBrd ? (
// //         <span className="text-green-600 font-sm text-xl">✓</span>
// //       ) : (
// //         "-"
// //       ),
// //       status: emp.emple.status || "Act",
// //       total: totalAmount.toFixed(2) || "-",
// //     };
// //   };

// //   const getMonthAmounts = (emp) => {
// //     const monthAmounts = {};
// //     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
// //       emp.emple.plForecasts.forEach((forecast) => {
// //         const uniqueKey = `${forecast.month}_${forecast.year}`;
// //         // Use actualhours for EAC, forecastedhours otherwise
// //         const value =
// //           planType === "EAC" && forecast.actualamt !== undefined
// //             ? forecast.actualamt
// //             : forecast.forecastedamt ?? 0;
// //         monthAmounts[uniqueKey] = { value, ...forecast };
// //       });
// //     }
// //     return monthAmounts;
// //   };

// //   const handleInputChange = (empIdx, uniqueKey, newValue) => {
// //     if (!isEditable) return;
// //     const currentDuration = sortedDurations.find(
// //       (d) => `${d.monthNo}_${d.year}` === uniqueKey
// //     );
// //     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
// //       toast.warn("Cannot edit amounts for a closed period.", {
// //         toastId: "closed-period-warning",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }
// //     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
// //       console.log(
// //         `Updating inputValues for ${empIdx}_${uniqueKey}: ${newValue}`
// //       );
// //       setInputValues((prev) => ({
// //         ...prev,
// //         [`${empIdx}_${uniqueKey}`]: newValue,
// //       }));
// //     }
// //   };

// //   const handleForecastAmountBlur = async (empIdx, uniqueKey, value) => {
// //     if (!isEditable) return;
// //     const newValue = value === "" ? 0 : Number(value);
// //     const emp = employees[empIdx];
// //     const monthAmounts = getMonthAmounts(emp);
// //     const forecast = monthAmounts[uniqueKey];
// //     const originalForecastedAmount = forecast?.forecastedamt ?? 0;
// //     const currentDuration = sortedDurations.find(
// //       (d) => `${d.monthNo}_${d.year}` === uniqueKey
// //     );

// //     console.log(
// //       `handleForecastAmountBlur: empIdx=${empIdx}, uniqueKey=${uniqueKey}, newValue=${newValue}, original=${originalForecastedAmount}, month=${currentDuration?.monthNo}, year=${currentDuration?.year}`
// //     );

// //     if (newValue === originalForecastedAmount) {
// //       console.log("No change in forecast amount, skipping API call");
// //       return;
// //     }

// //     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
// //       console.log(`Cannot edit ${uniqueKey}: period closed`);
// //       setInputValues((prev) => ({
// //         ...prev,
// //         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
// //       }));
// //       toast.warn("Cannot edit amounts for a closed period.", {
// //         toastId: "closed-period-warning",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     if (!forecast || !forecast.forecastid) {
// //       console.log(
// //         'No forecast ID found, update skipped. Use "New" to add a new entry.'
// //       );
// //       setInputValues((prev) => ({
// //         ...prev,
// //         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
// //       }));
// //       toast.warn(
// //         'Cannot update amount for a non-existing forecast. Please use the "New" button to add a new entry.',
// //         {
// //           toastId: "no-forecast-id-warning",
// //           autoClose: 3000,
// //         }
// //       );
// //       return;
// //     }

// //     const payload = {
// //       forecastedamt: Number(newValue) || 0,
// //       forecastid: Number(forecast.forecastid),
// //       projId: forecast?.projId ?? projectId,
// //       plId: forecast?.plId ?? planId,
// //       emplId: forecast?.emplId ?? emp.emple.emplId,
// //       dctId: forecast?.dctId ?? 0,
// //       month: forecast?.month ?? currentDuration.monthNo,
// //       year: forecast?.year ?? currentDuration.year,
// //       totalBurdenCost: forecast?.totalBurdenCost ?? 0,
// //       burden: forecast?.burden ?? 0,
// //       ccffRevenue: forecast?.ccffRevenue ?? 0,
// //       tnmRevenue: forecast?.tnmRevenue ?? 0,
// //       cost: forecast?.cost ?? 0,
// //       fringe: forecast?.fringe ?? 0,
// //       overhead: forecast?.overhead ?? 0,
// //       gna: forecast?.gna ?? 0,
// //       ...(planType === "EAC"
// //         ? { actualamt: Number(newValue) || 0 }
// //         : { forecastedamt: Number(newValue) || 0 }),
// //       createdat: forecast?.createdat ?? new Date(0).toISOString(),
// //       updatedat: new Date().toISOString().split("T")[0],
// //       displayText: forecast?.displayText ?? "",
// //     };

// //     console.log("UpdateForecastAmount payload:", payload);

// //     try {
// //       await axios.put(
// //         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
// //         payload,
// //         { headers: { "Content-Type": "application/json" } }
// //       );
// //       setSuccessMessageText("Forecast updated!");
// //       setShowSuccessMessage(true);
// //       toast.success("Forecast amount updated successfully!", {
// //         toastId: "forecast-update-success",
// //         autoClose: 3000,
// //       });
// //     } catch (err) {
// //       console.error("API error:", err.response?.data || err);
// //       setInputValues((prev) => ({
// //         ...prev,
// //         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
// //       }));
// //       setSuccessMessageText("Failed to update forecast.");
// //       setShowSuccessMessage(true);
// //       toast.error(
// //         "Failed to update forecast amount: " +
// //           (err.response?.data?.message || err.message),
// //         {
// //           toastId: "forecast-update-error",
// //           autoClose: 3000,
// //         }
// //       );
// //     } finally {
// //       setTimeout(() => setShowSuccessMessage(false), 2000);
// //     }
// //   };

// //   const handleFillValues = async () => {
// //     if (!showNewForm || !isEditable) return;

// //     const newAmounts = {};
// //     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
// //       const sourceEmp = employees[sourceRowIndex];
// //       const sourceMonthAmounts = getMonthAmounts(sourceEmp);
// //       sortedDurations.forEach((duration) => {
// //         const uniqueKey = `${duration.monthNo}_${duration.year}`;
// //         if (
// //           planType === "EAC" &&
// //           !isMonthEditable(duration, closedPeriod, planType)
// //         ) {
// //           newAmounts[uniqueKey] = newEntryPeriodAmounts[uniqueKey] || "0";
// //         } else {
// //           newAmounts[uniqueKey] =
// //             sourceMonthAmounts[uniqueKey]?.value?.toString() || "0";
// //         }
// //       });
// //     }

// //     setNewEntryPeriodAmounts((prev) => ({ ...prev, ...newAmounts }));
// //     setShowFillValues(false);
// //     setFillMethod("None");
// //     setSourceRowIndex(null);
// //   };

// //   const handleSaveNewEntry = async () => {
// //     if (!planId) {
// //       toast.error("Plan ID is required to save a new entry.", {
// //         toastId: "no-plan-id",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }

// //     setIsLoading(true);

// //     const payloadForecasts = sortedDurations.map((duration) => ({
// //       forecastedamt:
// //         Number(newEntryPeriodAmounts[`${duration.monthNo}_${duration.year}`]) ||
// //         0,
// //       forecastid: 0,
// //       projId: projectId,
// //       plId: planId,
// //       emplId: newEntry.id,
// //       dctId: 0,
// //       month: duration.monthNo,
// //       year: duration.year,
// //       totalBurdenCost: 0,
// //       fees: 0,
// //       burden: 0,
// //       ccffRevenue: 0,
// //       tnmRevenue: 0,
// //       revenue: 0,
// //       cost: 0,
// //       fringe: 0,
// //       overhead: 0,
// //       gna: 0,
// //       forecastedhours: 0,
// //       updatedat: new Date().toISOString().split("T")[0],
// //       displayText: "",
// //       acctId: newEntry.acctId,
// //       orgId: newEntry.orgId,
// //       hrlyRate: Number(newEntry.perHourRate) || 0,
// //       // effectDt: new Date().toISOString(),
// //       effectDt: null,
// //     }));

// //     const payload = {
// //       dctId: 0,
// //       plId: planId,
// //       acctId: newEntry.acctId || "",
// //       orgId: newEntry.orgId || "",
// //       notes: "",
// //       category: newEntry.name || "Test",
// //       amountType: "",
// //       id: newEntry.id,
// //       type: newEntry.idType || "Employee",
// //       isRev: newEntry.isRev || false,
// //       isBrd: newEntry.isBrd || false,
// //       status: newEntry.status || "Act",
// //       createdBy: "System",
// //       lastModifiedBy: "System",
// //       plForecasts: payloadForecasts,
// //       plDct: {},
// //     };

// //     console.log("AddNewDirectCost payload for new entry:", payload);

// //     try {
// //       const response = await axios.post(
// //         "https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost",
// //         payload,
// //         { headers: { "Content-Type": "application/json" } }
// //       );

// //       console.log("Save response:", response.status, response.data);

// //       const newEmployee = {
// //         emple: {
// //           empleId: newEntry.id,
// //           emplId: newEntry.id,
// //           firstName: newEntry.firstName || "",
// //           lastName: newEntry.lastName || "",
// //           accId: newEntry.acctId || "",
// //           orgId: newEntry.orgId || "",
// //           perHourRate: Number(newEntry.perHourRate) || 0,
// //           isRev: newEntry.isRev || false,
// //           isBrd: newEntry.isBrd || false,
// //           status: newEntry.status || "Act",
// //           type: newEntry.idType || "Employee",
// //           plForecasts: payloadForecasts.map((forecast) => ({
// //             ...forecast,
// //             forecastid:
// //               response.data?.plForecasts?.find(
// //                 (f) => f.month === forecast.month && f.year === forecast.year
// //               )?.forecastid || 0,
// //             createdat: new Date().toISOString(),
// //           })),
// //         },
// //       };

// //       setEmployees((prevEmployees) => {
// //         const employeeMap = new Map();
// //         prevEmployees.forEach((emp) => {
// //           const emplId = emp.emple.emplId || `auto-${Math.random()}`;
// //           employeeMap.set(emplId, emp);
// //         });
// //         employeeMap.set(newEntry.id, newEmployee);
// //         return Array.from(employeeMap.values());
// //       });

// //       setSuccessMessageText("Entry saved successfully!");
// //       setShowSuccessMessage(true);
// //       setShowNewForm(false);
// //       setNewEntry({
// //         id: "",
// //         firstName: "",
// //         lastName: "",
// //         isRev: false,
// //         isBrd: false,
// //         idType: "",
// //         acctId: "",
// //         orgId: "",
// //         perHourRate: "",
// //         status: "Act",
// //       });
// //       setNewEntryPeriodAmounts({});
// //       setEmployeeSuggestions([]);
// //       setNonLaborAccounts([]);

// //       if (onSaveSuccess) {
// //         console.log("Calling onSaveSuccess");
// //         onSaveSuccess();
// //       }

// //       toast.success("New entry saved and added to table!", {
// //         toastId: "save-entry-success",
// //         autoClose: 3000,
// //       });
// //     } catch (err) {
// //       const errorMessage = err.response?.data?.errors
// //         ? Object.entries(err.response.data.errors)
// //             .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
// //             .join("; ")
// //         : err.response?.data?.message || err.message;
// //       console.error("Save error:", err.response?.data || err);
// //       setSuccessMessageText("Failed to save entry.");
// //       setShowSuccessMessage(true);
// //       toast.error(`Failed to save new entry: ${errorMessage}`, {
// //         toastId: "save-entry-error",
// //         autoClose: 5000,
// //       });
// //     } finally {
// //       setIsLoading(false);
// //       setTimeout(() => setShowSuccessMessage(false), 2000);
// //     }
// //   };

// //   const handleRowClick = (actualEmpIdx) => {
// //     if (!isEditable) return;
// //     setSelectedRowIndex(
// //       actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
// //     );
// //     setSelectedColumnKey(null);
// //     setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
// //     if (showNewForm) setSourceRowIndex(actualEmpIdx);
// //   };

// //   const handleColumnHeaderClick = (uniqueKey) => {
// //     if (!isEditable) return;
// //     setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
// //     setSelectedRowIndex(null);
// //     setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
// //   };


// //   const handleFindReplace = async () => {
// //   if (
// //     !isEditable ||
// //     findValue === "" ||
// //     (replaceScope === "row" && selectedRowIndex === null) ||
// //     (replaceScope === "column" && selectedColumnKey === null)
// //   ) {
// //     toast.warn("Please select a valid scope and enter a value to find.", {
// //       toastId: "find-replace-warning",
// //       autoClose: 3000,
// //     });
// //     return;
// //   }

// //   // Show loading state
// //   setIsLoading(true);

// //   const updates = [];
// //   const updatedInputValues = { ...inputValues };
// //   let replacementsCount = 0;
// //   let skippedCount = 0;

// //   for (const empIdx in employees) {
// //     const emp = employees[empIdx];
// //     const actualEmpIdx = parseInt(empIdx, 10);

// //     if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
// //       continue;
// //     }

// //     for (const duration of sortedDurations) {
// //       const uniqueKey = `${duration.monthNo}_${duration.year}`;

// //       if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
// //         continue;
// //       }

// //       if (!isMonthEditable(duration, closedPeriod, planType)) {
// //         continue;
// //       }

// //       const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
      
// //       // Get the actual displayed value
// //       let displayedValue;
// //       if (inputValues[currentInputKey] !== undefined) {
// //         displayedValue = String(inputValues[currentInputKey]);
// //       } else {
// //         const monthAmounts = getMonthAmounts(emp);
// //         const forecast = monthAmounts[uniqueKey];
// //         if (forecast && forecast.value !== undefined) {
// //           displayedValue = String(forecast.value);
// //         } else {
// //           displayedValue = "0";
// //         }
// //       }

// //       const findValueTrimmed = findValue.trim();
// //       const displayedValueTrimmed = displayedValue.trim();
      
// //       // Matching logic
// //       let isMatch = false;
      
// //       if (findValueTrimmed === "0") {
// //         const numValue = parseFloat(displayedValueTrimmed);
// //         isMatch = displayedValueTrimmed === "" || 
// //                  displayedValueTrimmed === "0" || 
// //                  (!isNaN(numValue) && numValue === 0);
// //       } else {
// //         isMatch = displayedValueTrimmed === findValueTrimmed;
        
// //         if (!isMatch) {
// //           const findNum = parseFloat(findValueTrimmed);
// //           const displayNum = parseFloat(displayedValueTrimmed);
// //           if (!isNaN(findNum) && !isNaN(displayNum)) {
// //             isMatch = findNum === displayNum;
// //           }
// //         }
// //       }

// //       if (isMatch) {
// //         const newValue = replaceValue.trim();
// //         const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

// //         const forecast = getMonthAmounts(emp)[uniqueKey];
        
// //         // Only proceed if we have a valid forecast with forecastid
// //         if (forecast && forecast.forecastid) {
// //           const originalValue = planType === "EAC" 
// //             ? (forecast.actualamt ?? 0) 
// //             : (forecast.forecastedamt ?? 0);

// //           if (newNumericValue !== originalValue) {
// //             updatedInputValues[currentInputKey] = newValue;
// //             replacementsCount++;

// //             const payload = {
// //               forecastid: Number(forecast.forecastid),
// //               projId: forecast.projId || projectId,
// //               plId: forecast.plId || planId,
// //               emplId: forecast.emplId || "",
// //               dctId: forecast.dctId || 0,
// //               month: forecast.month || duration.monthNo,
// //               year: forecast.year || duration.year,
// //               totalBurdenCost: forecast.totalBurdenCost || 0,
// //               burden: forecast.burden || 0,
// //               ccffRevenue: forecast.ccffRevenue || 0,
// //               tnmRevenue: forecast.tnmRevenue || 0,
// //               cost: forecast.cost || 0,
// //               fringe: forecast.fringe || 0,
// //               overhead: forecast.overhead || 0,
// //               gna: forecast.gna || 0,
// //               forecastedhours: forecast.forecastedhours || 0,
// //               updatedat: new Date().toISOString().split("T")[0],
// //               displayText: forecast.displayText || "",
// //               [planType === "EAC" ? "actualamt" : "forecastedamt"]: newNumericValue,
// //             };
            
// //             updates.push(
// //               axios
// //                 .put(
// //                   `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
// //                   payload,
// //                   { headers: { "Content-Type": "application/json" } }
// //                 )
// //                 .catch((err) => {
// //                   console.error(
// //                     "Failed update for payload:",
// //                     payload,
// //                     err?.response?.data || err.message
// //                   );
// //                 })
// //             );
// //           }
// //         } else {
// //           // Skip cells without existing forecasts and count them
// //           console.log(`Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`);
// //           skippedCount++;
// //         }
// //       }
// //     }
// //   }

// //   console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

// //   setInputValues(updatedInputValues);
// //   try {
// //     if (updates.length > 0) {
// //       await Promise.all(updates);
// //     }
    
// //     // Update local state only for cells that were actually updated
// //     setEmployees((prev) => {
// //       const updated = [...prev];
// //       for (const empIdx in updated) {
// //         const emp = updated[empIdx];
// //         for (const duration of sortedDurations) {
// //           const uniqueKey = `${duration.monthNo}_${duration.year}`;
// //           const currentInputKey = `${empIdx}_${uniqueKey}`;
// //           if (updatedInputValues[currentInputKey] !== undefined) {
// //             if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
// //               const forecast = emp.emple.plForecasts.find(
// //                 (f) =>
// //                   f.month === duration.monthNo && f.year === duration.year
// //               );
// //               if (forecast) {
// //                 const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
// //                 if (planType === "EAC") {
// //                   forecast.actualamt = newValue;
// //                 } else {
// //                   forecast.forecastedamt = newValue;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //       return updated;
// //     });
    
// //     if (replacementsCount > 0) {
// //       toast.success(`Successfully replaced ${replacementsCount} cells.`, {
// //         autoClose: 2000,
// //       });
// //     }
    
    
// //     if (replacementsCount === 0 && skippedCount === 0) {
// //       toast.info("No cells replaced.", { autoClose: 2000 });
// //     }
    
// //   } catch (err) {
// //     toast.error(
// //       "Failed to replace values: " + (err.response?.data?.message || err.message),
// //       {
// //         toastId: "replace-error",
// //         autoClose: 3000,
// //       }
// //     );
// //   } finally {
// //     // Hide loading state
// //     setIsLoading(false);
// //     setShowFindReplace(false);
// //     setFindValue("");
// //     setReplaceValue("");
// //     setSelectedRowIndex(null);
// //     setSelectedColumnKey(null);
// //     setReplaceScope("all");
// //   }
// // };



// //   const showHiddenRows = () => setHiddenRows({});

// //   const sortedDurations =
// //     propFiscalYear && propFiscalYear !== "All"
// //       ? durations
// //           .filter((d) => d.year === parseInt(propFiscalYear))
// //           .sort(
// //             (a, b) =>
// //               new Date(a.year, a.monthNo - 1, 1) -
// //               new Date(b.year, b.monthNo - 1, 1)
// //           )
// //       : durations.sort(
// //           (a, b) =>
// //             new Date(a.year, a.monthNo - 1, 1) -
// //             new Date(b.year, b.monthNo - 1, 1)
// //         );

// //   if (isLoading) {
// //     return (
// //       <div className="p-4 font-inter flex justify-center items-center">
// //         <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
// //         <span className="ml-2 text-xs text-gray-600">
// //           Loading forecast data...
// //         </span>
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

// //   const rowCount = Math.max(
// //     employees.filter((_, idx) => !hiddenRows[idx]).length +
// //       (showNewForm ? 1 : 0),
// //     2
// //   );

// //   return (
// //     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
// //       {/* <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2> */}
// //       <div className="w-full flex justify-between mb-4 gap-2">
// //         <div className="flex-grow"></div>
// //         <div className="flex gap-2">
// //           {Object.values(hiddenRows).some(Boolean) && (
// //             <button
// //               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
// //               onClick={showHiddenRows}
// //             >
// //               Show Hidden Rows
// //             </button>
// //           )}
// //           {isEditable && (
// //             <>
// //               <button
// //                 onClick={() => setShowNewForm((prev) => !prev)}
// //                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
// //               >
// //                 {showNewForm ? "Cancel" : "New"}
// //               </button>
// //               <button
// //                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
// //                 onClick={() => isEditable && setShowFindReplace(true)}
// //               >
// //                 Find / Replace
// //               </button>
// //               {showNewForm && (
// //                 <button
// //                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
// //                   onClick={() => isEditable && setShowFillValues(true)}
// //                 >
// //                   Fill Values
// //                 </button>
// //               )}
// //             </>
// //           )}
// //           {showNewForm && (
// //             <button
// //               onClick={handleSaveNewEntry}
// //               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
// //             >
// //               Save Entry
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {showFillValues && (
// //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
// //             <h3 className="text-lg font-semibold mb-4">
// //               Fill Values to selected record/s
// //             </h3>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-xs font-medium mb-1">
// //                 Select Fill Method
// //               </label>
// //               <select
// //                 value={fillMethod}
// //                 onChange={(e) => setFillMethod(e.target.value)}
// //                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
// //               >
// //                 <option value="None">None</option>
// //                 <option value="Copy From Source Record">
// //                   Copy from source record
// //                 </option>
// //               </select>
// //             </div>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-xs font-medium mb-1">
// //                 Start Period
// //               </label>
// //               <input
// //                 type="text"
// //                 value={startDate}
// //                 readOnly
// //                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-xs font-medium mb-1">
// //                 End Period
// //               </label>
// //               <input
// //                 type="text"
// //                 value={endDate}
// //                 readOnly
// //                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
// //               />
// //             </div>
// //             <div className="flex justify-end gap-3">
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setShowFillValues(false);
// //                   setFillMethod("None");
// //                   setSourceRowIndex(null);
// //                 }}
// //                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
// //               >
// //                 Close
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleFillValues}
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
// //               >
// //                 Fill
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {employees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
// //         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
// //           No forecast data available for this plan.
// //         </div>
// //       ) : (
// //         <div className="synchronized-tables-container">
// //           <div className="synchronized-table-scroll">
// //             <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
// //               <thead className="sticky-thead">
// //                 <tr
// //                   style={{
// //                     height: `${ROW_HEIGHT_DEFAULT}px`,
// //                     lineHeight: "normal",
// //                   }}
// //                 >
// //                   {EMPLOYEE_COLUMNS.map((col) => (
// //                     <th
// //                       key={col.key}
// //                       className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px]
// //                     >
// //                       {col.label}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {showNewForm && (
// //                   <tr
// //                     key="new-entry"
// //                     className="bg-gray-50"
// //                     style={{
// //                       height: `${ROW_HEIGHT_DEFAULT}px`,
// //                       lineHeight: "normal",
// //                     }}
// //                   >
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <select
// //                         name="idType"
// //                         value={newEntry.idType || ""}
// //                         onChange={(e) =>
// //                           setNewEntry({ ...newEntry, idType: e.target.value })
// //                         }
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
// //                       >
// //                         {ID_TYPE_OPTIONS.map((opt) => (
// //                           <option key={opt.value} value={opt.value}>
// //                             {opt.label}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="text"
// //                         name="id"
// //                         value={newEntry.id}
// //                         onChange={(e) => handleIdChange(e.target.value)}
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
// //                         list="employee-id-list"
// //                         placeholder="Enter ID"
// //                       />
// //                       <datalist id="employee-id-list">
// //                         {employeeSuggestions
// //                           .filter(
// //                             (emp) =>
// //                               emp.emplId && typeof emp.emplId === "string"
// //                           )
// //                           .map((emp, index) => (
// //                             <option
// //                               key={`${emp.emplId}-${index}`}
// //                               value={emp.emplId}
// //                             >
// //                               {emp.lastName && emp.firstName
// //                                 ? `${emp.lastName}, ${emp.firstName}`
// //                                 : emp.lastName || emp.firstName || emp.emplId}
// //                             </option>
// //                           ))}
// //                       </datalist>
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="text"
// //                         name="name"
// //                         value={
// //                           newEntry.lastName && newEntry.firstName
// //                             ? `${newEntry.lastName}, ${newEntry.firstName}`
// //                             : newEntry.lastName || newEntry.firstName || ""
// //                         }
// //                         readOnly
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
// //                         placeholder="Name (auto-filled)"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="text"
// //                         name="acctId"
// //                         value={newEntry.acctId}
// //                         onChange={(e) =>
// //                           isBudPlan &&
// //                           setNewEntry({ ...newEntry, acctId: e.target.value })
// //                         }
// //                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
// //                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
// //                         }`}
// //                         list="account-list"
// //                         placeholder="Enter Account"
// //                         readOnly={!isBudPlan}
// //                       />
// //                       <datalist id="account-list">
// //                         {nonLaborAccounts.map((account, index) => (
// //                           <option
// //                             key={`${account.id}-${index}`}
// //                             value={account.id}
// //                           >
// //                             {account.id}
// //                           </option>
// //                         ))}
// //                       </datalist>
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="text"
// //                         name="orgId"
// //                         value={newEntry.orgId}
// //                         onChange={(e) =>
// //                           isBudPlan &&
// //                           setNewEntry({ ...newEntry, orgId: e.target.value })
// //                         }
// //                         className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
// //                           !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
// //                         }`}
// //                         placeholder="Enter Organization"
// //                         readOnly={!isBudPlan}
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="checkbox"
// //                         name="isRev"
// //                         checked={newEntry.isRev}
// //                         onChange={(e) =>
// //                           isBudPlan &&
// //                           setNewEntry({ ...newEntry, isRev: e.target.checked })
// //                         }
// //                         className={`w-4 h-4 ${
// //                           !isBudPlan ? "cursor-not-allowed" : ""
// //                         }`}
// //                         disabled={!isBudPlan}
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="checkbox"
// //                         name="isBrd"
// //                         checked={newEntry.isBrd}
// //                         onChange={(e) =>
// //                           isBudPlan &&
// //                           setNewEntry({ ...newEntry, isBrd: e.target.checked })
// //                         }
// //                         className={`w-4 h-4 ${
// //                           !isBudPlan ? "cursor-not-allowed" : ""
// //                         }`}
// //                         disabled={!isBudPlan}
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       <input
// //                         type="text"
// //                         name="status"
// //                         value={newEntry.status}
// //                         onChange={(e) =>
// //                           setNewEntry({ ...newEntry, status: e.target.value })
// //                         }
// //                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
// //                         placeholder="Enter Status"
// //                       />
// //                     </td>
// //                     <td className="border border-gray-300 px-1.5 py-0.5">
// //                       {" "}
// //                       {/* Changed px-2 to px-1.5 */}
// //                       {Object.values(newEntryPeriodAmounts)
// //                         .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
// //                         .toFixed(2)}
// //                     </td>
// //                   </tr>
// //                 )}
// //                 {employees
// //                   .filter((_, idx) => !hiddenRows[idx])
// //                   .map((emp, idx) => {
// //                     const actualEmpIdx = employees.findIndex((e) => e === emp);
// //                     const row = getEmployeeRow(emp, actualEmpIdx);
// //                     const uniqueRowKey = `${
// //                       emp.emple.emplId || "emp"
// //                     }-${actualEmpIdx}`;
// //                     return (
// //                       <tr
// //                         key={uniqueRowKey}
// //                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
// //                           selectedRowIndex === actualEmpIdx
// //                             ? "bg-yellow-100"
// //                             : "even:bg-gray-50"
// //                         }`}
// //                         style={{
// //                           height: `${ROW_HEIGHT_DEFAULT}px`,
// //                           lineHeight: "normal",
// //                           cursor: isEditable ? "pointer" : "default",
// //                         }}
// //                         onClick={() => handleRowClick(actualEmpIdx)}
// //                       >
// //                         {EMPLOYEE_COLUMNS.map((col) => {
// //                           if (isBudPlan && isEditable) {
// //                             if (col.key === "acctId") {
// //                               return (
// //                                 <td
// //                                   key={`${uniqueRowKey}-acctId`}
// //                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
// //                                 >
// //                                   {" "}
// //                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
// //                                   <input
// //                                     type="text"
// //                                     value={
// //                                       editedRowData[actualEmpIdx]?.acctId !==
// //                                       undefined
// //                                         ? editedRowData[actualEmpIdx].acctId
// //                                         : row.acctId
// //                                     }
// //                                     onChange={(e) =>
// //                                       handleRowFieldChange(
// //                                         actualEmpIdx,
// //                                         "acctId",
// //                                         e.target.value
// //                                       )
// //                                     }
// //                                     onBlur={() =>
// //                                       handleRowFieldBlur(actualEmpIdx, emp)
// //                                     }
// //                                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
// //                                   />
// //                                 </td>
// //                               );
// //                             }
// //                             if (col.key === "orgId") {
// //                               return (
// //                                 <td
// //                                   key={`${uniqueRowKey}-orgId`}
// //                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
// //                                 >
// //                                   {" "}
// //                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
// //                                   <input
// //                                     type="text"
// //                                     value={
// //                                       editedRowData[actualEmpIdx]?.orgId !==
// //                                       undefined
// //                                         ? editedRowData[actualEmpIdx].orgId
// //                                         : row.orgId
// //                                     }
// //                                     onChange={(e) =>
// //                                       handleRowFieldChange(
// //                                         actualEmpIdx,
// //                                         "orgId",
// //                                         e.target.value
// //                                       )
// //                                     }
// //                                     onBlur={() =>
// //                                       handleRowFieldBlur(actualEmpIdx, emp)
// //                                     }
// //                                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
// //                                   />
// //                                 </td>
// //                               );
// //                             }
// //                             if (col.key === "isRev") {
// //                               return (
// //                                 <td
// //                                   key={`${uniqueRowKey}-isRev`}
// //                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
// //                                 >
// //                                   {" "}
// //                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
// //                                   <input
// //                                     type="checkbox"
// //                                     checked={
// //                                       editedRowData[actualEmpIdx]?.isRev !==
// //                                       undefined
// //                                         ? editedRowData[actualEmpIdx].isRev
// //                                         : emp.emple.isRev
// //                                     }
// //                                     onChange={(e) =>
// //                                       handleRowFieldChange(
// //                                         actualEmpIdx,
// //                                         "isRev",
// //                                         e.target.checked
// //                                       )
// //                                     }
// //                                     onBlur={() =>
// //                                       handleRowFieldBlur(actualEmpIdx, emp)
// //                                     }
// //                                     className="w-4 h-4"
// //                                   />
// //                                 </td>
// //                               );
// //                             }
// //                             if (col.key === "isBrd") {
// //                               return (
// //                                 <td
// //                                   key={`${uniqueRowKey}-isBrd`}
// //                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
// //                                 >
// //                                   {" "}
// //                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
// //                                   <input
// //                                     type="checkbox"
// //                                     checked={
// //                                       editedRowData[actualEmpIdx]?.isBrd !==
// //                                       undefined
// //                                         ? editedRowData[actualEmpIdx].isBrd
// //                                         : emp.emple.isBrd
// //                                     }
// //                                     onChange={(e) =>
// //                                       handleRowFieldChange(
// //                                         actualEmpIdx,
// //                                         "isBrd",
// //                                         e.target.checked
// //                                       )
// //                                     }
// //                                     onBlur={() =>
// //                                       handleRowFieldBlur(actualEmpIdx, emp)
// //                                     }
// //                                     className="w-4 h-4"
// //                                   />
// //                                 </td>
// //                               );
// //                             }
// //                           }
// //                           return (
// //                             <td
// //                               key={`${uniqueRowKey}-${col.key}`}
// //                               className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
// //                             >
// //                               {" "}
// //                               {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
// //                               {row[col.key]}
// //                             </td>
// //                           );
// //                         })}
// //                       </tr>
// //                     );
// //                   })}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="synchronized-table-scroll">
// //             <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
// //               <thead className="sticky-thead">
// //                 <tr
// //                   style={{
// //                     height: `${ROW_HEIGHT_DEFAULT}px`,
// //                     lineHeight: "normal",
// //                   }}
// //                 >
// //                   {sortedDurations.map((duration) => {
// //                     const uniqueKey = `${duration.monthNo}_${duration.year}`;
// //                     return (
// //                       <th
// //                         key={uniqueKey}
// //                         className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
// //                           /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
// //                           selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
// //                         }`}
// //                         style={{ cursor: isEditable ? "pointer" : "default" }}
// //                         onClick={() => handleColumnHeaderClick(uniqueKey)}
// //                       >
// //                         <div className="flex flex-col items-center justify-center h-full">
// //                           <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
// //                             {duration.month}
// //                           </span>
// //                         </div>
// //                       </th>
// //                     );
// //                   })}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {showNewForm && (
// //                   <tr
// //                     key="new-entry"
// //                     className="bg-gray-50"
// //                     style={{
// //                       height: `${ROW_HEIGHT_DEFAULT}px`,
// //                       lineHeight: "normal",
// //                     }}
// //                   >
// //                     {sortedDurations.map((duration) => {
// //                       const uniqueKey = `${duration.monthNo}_${duration.year}`;
// //                       const isInputEditable =
// //                         isEditable &&
// //                         isMonthEditable(duration, closedPeriod, planType);
// //                       return (
// //                         <td
// //                           key={`new-${uniqueKey}`}
// //                           className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
// //                             /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
// //                             planType === "EAC"
// //                               ? isInputEditable
// //                                 ? "bg-green-50"
// //                                 : "bg-gray-200"
// //                               : ""
// //                           }`}
// //                         >
// //                           <input
// //                             type="text"
// //                             inputMode="numeric"
// //                             value={newEntryPeriodAmounts[uniqueKey] || ""}
// //                             onChange={(e) =>
// //                               isInputEditable &&
// //                               setNewEntryPeriodAmounts((prev) => ({
// //                                 ...prev,
// //                                 [uniqueKey]: e.target.value.replace(
// //                                   /[^0-9.]/g,
// //                                   ""
// //                                 ),
// //                               }))
// //                             }
// //                             className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
// //                               /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
// //                               !isInputEditable
// //                                 ? "cursor-not-allowed text-gray-400"
// //                                 : "text-gray-700"
// //                             }`}
// //                             disabled={!isInputEditable}
// //                             placeholder="Enter Amount"
// //                           />
// //                         </td>
// //                       );
// //                     })}
// //                   </tr>
// //                 )}
// //                 {employees
// //                   .filter((_, idx) => !hiddenRows[idx])
// //                   .map((emp, idx) => {
// //                     const actualEmpIdx = employees.findIndex((e) => e === emp);
// //                     const monthAmounts = getMonthAmounts(emp);
// //                     const uniqueRowKey = `${
// //                       emp.emple.emplId || "emp"
// //                     }-${actualEmpIdx}`;
// //                     return (
// //                       <tr
// //                         key={uniqueRowKey}
// //                         className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
// //                           selectedRowIndex === actualEmpIdx
// //                             ? "bg-yellow-100"
// //                             : "even:bg-gray-50"
// //                         }`}
// //                         style={{
// //                           height: `${ROW_HEIGHT_DEFAULT}px`,
// //                           lineHeight: "normal",
// //                           cursor: isEditable ? "pointer" : "default",
// //                         }}
// //                         onClick={() => handleRowClick(actualEmpIdx)}
// //                       >
// //                         {sortedDurations.map((duration) => {
// //                           const uniqueKey = `${duration.monthNo}_${duration.year}`;
// //                           const forecast = monthAmounts[uniqueKey];
// //                           const value =
// //                             inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
// //                             (forecast?.value !== undefined
// //                               ? forecast.value
// //                               : "0");
// //                           const isInputEditable =
// //                             isEditable &&
// //                             isMonthEditable(duration, closedPeriod, planType);
// //                           return (
// //                             <td
// //                               key={`${uniqueRowKey}-${uniqueKey}`}
// //                               className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
// //                                 /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
// //                                 selectedColumnKey === uniqueKey
// //                                   ? "bg-yellow-100"
// //                                   : ""
// //                               } ${
// //                                 planType === "EAC"
// //                                   ? isInputEditable
// //                                     ? "bg-green-50"
// //                                     : "bg-gray-200"
// //                                   : ""
// //                               }`}
// //                             >
// //                               <input
// //                                 type="text"
// //                                 inputMode="numeric"
// //                                 className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
// //                                   /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
// //                                   !isInputEditable
// //                                     ? "cursor-not-allowed text-gray-400"
// //                                     : "text-gray-700"
// //                                 }`}
// //                                 value={value}
// //                                 onChange={(e) =>
// //                                   handleInputChange(
// //                                     actualEmpIdx,
// //                                     uniqueKey,
// //                                     e.target.value.replace(/[^0-9.]/g, "")
// //                                   )
// //                                 }
// //                                 onBlur={(e) =>
// //                                   handleForecastAmountBlur(
// //                                     actualEmpIdx,
// //                                     uniqueKey,
// //                                     e.target.value
// //                                   )
// //                                 }
// //                                 disabled={!isInputEditable}
// //                                 placeholder="Enter Amount"
// //                               />
// //                             </td>
// //                           );
// //                         })}
// //                       </tr>
// //                     );
// //                   })}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}

// //       {showFindReplace && (
// //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
// //             <h3 className="text-lg font-semibold mb-4">
// //               Find and Replace Amounts
// //             </h3>
// //             <div className="mb-3">
// //               <label
// //                 htmlFor="findValue"
// //                 className="block text-gray-700 text-xs font-medium mb-1"
// //               >
// //                 Find:
// //               </label>
// //               <input
// //                 type="text"
// //                 id="findValue"
// //                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
// //                 value={findValue}
// //                 onChange={(e) => setFindValue(e.target.value)}
// //                 placeholder="Value to find (e.g., 100 or empty)"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label
// //                 htmlFor="replaceValue"
// //                 className="block text-gray-700 text-xs font-medium mb-1"
// //               >
// //                 Replace with:
// //               </label>
// //               <input
// //                 type="text"
// //                 id="replaceValue"
// //                 className="w-full border border-gray-300 rounded-md p-2 text-xs"
// //                 value={replaceValue}
// //                 onChange={(e) =>
// //                   setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
// //                 }
// //                 placeholder="New value (e.g., 120 or empty)"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-xs font-medium mb-1">
// //                 Scope:
// //               </label>
// //               <div className="flex gap-4 flex-wrap">
// //                 <label className="inline-flex items-center text-xs cursor-pointer">
// //                   <input
// //                     type="radio"
// //                     className="form-radio text-blue-600"
// //                     name="replaceScope"
// //                     value="all"
// //                     checked={replaceScope === "all"}
// //                     onChange={(e) => setReplaceScope(e.target.value)}
// //                   />
// //                   <span className="ml-2">All</span>
// //                 </label>
// //                 <label className="inline-flex items-center text-xs cursor-pointer">
// //                   <input
// //                     type="radio"
// //                     className="form-radio text-blue-600"
// //                     name="replaceScope"
// //                     value="row"
// //                     checked={replaceScope === "row"}
// //                     onChange={(e) => setReplaceScope(e.target.value)}
// //                     disabled={selectedRowIndex === null}
// //                   />
// //                   <span className="ml-2">
// //                     Selected Row (
// //                     {selectedRowIndex !== null
// //                       ? employees[selectedRowIndex]?.emple.emplId
// //                       : "N/A"}
// //                     )
// //                   </span>
// //                 </label>
// //                 <label className="inline-flex items-center text-xs cursor-pointer">
// //                   <input
// //                     type="radio"
// //                     className="form-radio text-blue-600"
// //                     name="replaceScope"
// //                     value="column"
// //                     checked={replaceScope === "column"}
// //                     onChange={(e) => setReplaceScope(e.target.value)}
// //                     disabled={selectedColumnKey === null}
// //                   />
// //                   <span className="ml-2">
// //                     Selected Column (
// //                     {selectedColumnKey
// //                       ? sortedDurations.find(
// //                           (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
// //                         )?.month
// //                       : "N/A"}
// //                     )
// //                   </span>
// //                 </label>
// //               </div>
// //             </div>
// //             <div className="flex justify-end gap-3">
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setShowFindReplace(false);
// //                   setSelectedRowIndex(null);
// //                   setSelectedColumnKey(null);
// //                   setReplaceScope("all");
// //                 }}
// //                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleFindReplace}
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs cursor-pointer"
// //               >
// //                 Replace All
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProjectAmountsTable;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor" },
//   { value: "Vendor Employee", label: "Vendor Employee" },
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

// const ProjectAmountsTable = ({
//   initialData,
//   startDate,
//   endDate,
//   planType,
//   fiscalYear: propFiscalYear,
//   onSaveSuccess,
//   refreshKey,
// }) => {
//   const [employees, setEmployees] = useState([]);
//   const [durations, setDurations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
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
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [nonLaborAccounts, setNonLaborAccounts] = useState([]);
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedRowData, setEditedRowData] = useState({});

//   const isEditable = initialData.status === "In Progress";
//   const planId = initialData.plId;
//   const projectId = initialData.projId;
//   const closedPeriod = initialData.closedPeriod;
//   const isBudPlan = planType && planType.toUpperCase() === "BUD";

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!startDate || !endDate || !planId) {
//         setDurations([]);
//         setEmployees([]);
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const durationResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         if (!Array.isArray(durationResponse.data)) {
//           throw new Error("Invalid duration response format");
//         }
//         const fetchedDurations = durationResponse.data;
//         setDurations(fetchedDurations);

//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}`
//         );
//         const apiData = Array.isArray(response.data)
//           ? response.data
//           : [response.data];
//         // console.log(apiData.length);
//         // console.log(JSON.stringify(apiData));
//         if (apiData.length === 0) {
//           setEmployees([]);
//           toast.info('No forecast data available for this plan.', {
//             toastId: "no-forecast-data",
//             autoClose: 3000,
//           });
//         } else {
//           // const employeeMap = new Map();
//           // apiData.forEach((item, idx) => {
//           //   const emplId = item.empl?.id || `auto-${idx}`;
//           //   const existing = employeeMap.get(emplId) || {
//           //     emple: {
//           //       empleId: emplId,
//           //       emplId: item.empl?.id || "",
//           //       firstName: item.empl?.firstName || "",
//           //       lastName: item.empl?.lastName || "",
//           //       accId: item.empl?.acctId || "",
//           //       orgId: item.empl?.orgId || "",
//           //       perHourRate: item.empl?.hrRate || "",
//           //       isRev: item.empl?.isRev || false,
//           //       isBrd: item.empl?.isBrd || false,
//           //       status: item.empl?.status || "Act",
//           //       type: item.empl?.type || "",
//           //       category: item.empl?.category || "",
//           //       dctId: item.dctId || 0,
//           //       plId: item.pl_ID || 0,
//           //       plForecasts: [],
//           //     },
//           //   };
//           //   existing.emple.plForecasts = [
//           //     ...existing.emple.plForecasts,
//           //     ...(item.empl?.plForecasts || []),
//           //   ];
//           //   // console.log(emplId);
//           //   // console.log(JSON.stringify(existing));
//           //   employeeMap.set(emplId, existing);
//           // });
//           // const updatedEmployees = Array.from(employeeMap.values());
//           // setEmployees(updatedEmployees);
//           const updatedEmployees = apiData.map((item, idx) => ({
//             emple: {
//               empleId: item.empl?.id || `auto-${idx}`,
//               emplId: item.empl?.id || "",
//               firstName: item.empl?.firstName || "",
//               lastName: item.empl?.lastName || "",
//               accId: item.empl?.acctId || "",
//               orgId: item.empl?.orgId || "",
//               perHourRate: item.empl?.hrRate || "",
//               isRev: item.empl?.isRev || false,
//               isBrd: item.empl?.isBrd || false,
//               status: item.empl?.status || "Act",
//               type: item.empl?.type || "",
//               category: item.empl?.category || "",
//               dctId: item.dctId || 0,
//               plId: item.pl_ID || 0,
//               plForecasts: item.empl?.plForecasts || [],
//             },
//           }));
//           setEmployees(updatedEmployees);
//         }
//         setInputValues({});
//         setNewEntryPeriodAmounts({});
//       } catch (err) {
//         setError("Failed to load data. Please try again.");
//         if (err.response && err.response.status === 500) {
//           setEmployees([]);
//           toast.info("No forecast data available for this plan.", {
//             toastId: "no-forecast-data",
//             autoClose: 3000,
//           });
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

//     fetchData();
//   }, [startDate, endDate, planId, refreshKey]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (!projectId) {
//         console.warn("projectId is undefined, skipping employee fetch");
//         setEmployeeSuggestions([]);
//         return;
//       }
//       if (!showNewForm) {
//         console.log("New entry form is not open, skipping employee fetch");
//         setEmployeeSuggestions([]);
//         return;
//       }
//       console.log(`Fetching employees for projectId: ${projectId}`);
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor" || newEntry.idType === "Vendor Employee"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         console.log("Employee suggestions response:", response.data);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.vendId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                 };
//               } else if (newEntry.idType === "Vendor Employee") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//         console.log("Updated employeeSuggestions:", suggestions);
//       } catch (err) {
//         console.error("Error fetching employees:", err);
//         setEmployeeSuggestions([]);
//         toast.error(
//           `Failed to fetch ${
//             newEntry.idType === "Vendor" ||
//             newEntry.idType === "Vendor Employee"
//               ? "vendor "
//               : ""
//           }employee suggestions${
//             projectId
//               ? " for project ID " + projectId
//               : ". Project ID is missing."
//           }`,
//           {
//             toastId: "employee-fetch-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     };

//     const fetchNonLaborAccounts = async () => {
//       if (!projectId) {
//         console.warn(
//           "projectId is undefined, skipping non-labor accounts fetch"
//         );
//         setNonLaborAccounts([]);
//         return;
//       }
//       if (!showNewForm) {
//         console.log(
//           "New entry form is not open, skipping non-labor accounts fetch"
//         );
//         setNonLaborAccounts([]);
//         return;
//       }
//       console.log(`Fetching non-labor accounts for projectId: ${projectId}`);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         console.log("Non-labor accounts response:", response.data);
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.nonLaborAccounts)
//           ? data.nonLaborAccounts.map((account) => ({ id: account }))
//           : [];
//         setNonLaborAccounts(accounts);
//         console.log("Updated nonLaborAccounts:", accounts);
//       } catch (err) {
//         console.error("Error fetching non-labor accounts:", err);
//         setNonLaborAccounts([]);
//         toast.error(
//           `Failed to fetch non-labor accounts${
//             projectId
//               ? " for project ID " + projectId
//               : ". Project ID is missing."
//           }`,
//           {
//             toastId: "non-labor-accounts-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     };

//     if (showNewForm) {
//       fetchEmployees();
//       fetchNonLaborAccounts();
//     } else {
//       setEmployeeSuggestions([]);
//       setNonLaborAccounts([]);
//     }
//   }, [projectId, showNewForm, newEntry.idType]);

//   const handleIdChange = (value) => {
//     console.log("handleIdChange called with value:", value);
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === value
//     );
//     console.log("Selected employee:", selectedEmployee);
//     setNewEntry((prev) => ({
//       ...prev,
//       id: value,
//       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
//       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
//       acctId: nonLaborAccounts.length > 0 ? nonLaborAccounts[0].id : "",
//     }));
//   };

//   const handleRowFieldChange = (rowIdx, field, value) => {
//     if (!isBudPlan || !isEditable) return;
//     setEditedRowData((prev) => ({
//       ...prev,
//       [rowIdx]: {
//         ...prev[rowIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleRowFieldBlur = async (rowIdx, emp) => {
//     if (!isBudPlan || !isEditable) return;
//     if (!emp || !emp.emple) {
//       toast.error("Employee data is missing for update.");
//       return;
//     }

//     const edited = editedRowData[rowIdx] || {};
//     if (
//       edited.acctId === undefined &&
//       edited.orgId === undefined &&
//       edited.isRev === undefined &&
//       edited.isBrd === undefined
//     )
//       return;

//     const payload = {
//       dctId: emp.emple.dctId || 0,
//       plId: emp.emple.plId || 0,
//       accId: edited.acctId !== undefined ? edited.acctId : emp.emple.accId, 
//       orgId: edited.orgId !== undefined ? edited.orgId : emp.emple.orgId,
//       type: emp.emple.type || "",
//       category: emp.emple.category || "",
//       amountType: emp.emple.amountType || "",
//       id: emp.emple.emplId || "",
//       isRev: edited.isRev !== undefined ? edited.isRev : emp.emple.isRev,
//       isBrd: edited.isBrd !== undefined ? edited.isBrd : emp.emple.isBrd,
//       createdBy: emp.emple.createdBy || "System",
//       lastModifiedBy: "System",
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/DirectCost/UpdateDirectCost",
//         { ...payload, acctId: payload.accId },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedRowData((prev) => {
//         const newData = { ...prev };
//         delete newData[rowIdx];
//         return newData;
//       });
//       setEmployees((prev) => {
//         const updated = [...prev];
//         updated[rowIdx] = {
//           ...updated[rowIdx],
//           emple: {
//             ...updated[rowIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${rowIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       toast.error(
//         "Failed to update row: " + (err.response?.data?.message || err.message)
//       );
//     }
//   };

//   const getEmployeeRow = (emp, idx) => {
//     const monthAmounts = getMonthAmounts(emp);
//     const totalAmount = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthAmounts[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);

//     return {
//       idType: emp.emple.type || "Employee",
//       emplId: emp.emple.emplId || "-",
//       name:
//         emp.emple.category || emp.emple.firstName || emp.emple.lastName
//           ? emp.emple.category ||
//             `${emp.emple.lastName || ""}${
//               emp.emple.firstName && emp.emple.lastName ? ", " : ""
//             }${emp.emple.firstName || ""}`
//           : "-",
//       acctId: emp.emple.accId || "-",
//       orgId: emp.emple.orgId || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       total: totalAmount.toFixed(2) || "-",
//     };
//   };

//   const getMonthAmounts = (emp) => {
//     const monthAmounts = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         // Use actualhours for EAC, forecastedhours otherwise
//         const value =
//           planType === "EAC" && forecast.actualamt !== undefined
//             ? forecast.actualamt
//             : forecast.forecastedamt ?? 0;
//         monthAmounts[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthAmounts;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );
//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       toast.warn("Cannot edit amounts for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       console.log(
//         `Updating inputValues for ${empIdx}_${uniqueKey}: ${newValue}`
//       );
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleForecastAmountBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = employees[empIdx];
//     const monthAmounts = getMonthAmounts(emp);
//     const forecast = monthAmounts[uniqueKey];
//     const originalForecastedAmount = forecast?.forecastedamt ?? 0;
//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     console.log(
//       `handleForecastAmountBlur: empIdx=${empIdx}, uniqueKey=${uniqueKey}, newValue=${newValue}, original=${originalForecastedAmount}, month=${currentDuration?.monthNo}, year=${currentDuration?.year}`
//     );

//     if (newValue === originalForecastedAmount) {
//       console.log("No change in forecast amount, skipping API call");
//       return;
//     }

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       console.log(`Cannot edit ${uniqueKey}: period closed`);
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
//       }));
//       toast.warn("Cannot edit amounts for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (!forecast || !forecast.forecastid) {
//       console.log(
//         'No forecast ID found, update skipped. Use "New" to add a new entry.'
//       );
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
//       }));
//       toast.warn(
//         'Cannot update amount for a non-existing forecast. Please use the "New" button to add a new entry.',
//         {
//           toastId: "no-forecast-id-warning",
//           autoClose: 3000,
//         }
//       );
//       return;
//     }

//     const payload = {
//       forecastedamt: Number(newValue) || 0,
//       forecastid: Number(forecast.forecastid),
//       projId: forecast?.projId ?? projectId,
//       plId: forecast?.plId ?? planId,
//       emplId: forecast?.emplId ?? emp.emple.emplId,
//       dctId: forecast?.dctId ?? 0,
//       month: forecast?.month ?? currentDuration.monthNo,
//       year: forecast?.year ?? currentDuration.year,
//       totalBurdenCost: forecast?.totalBurdenCost ?? 0,
//       burden: forecast?.burden ?? 0,
//       ccffRevenue: forecast?.ccffRevenue ?? 0,
//       tnmRevenue: forecast?.tnmRevenue ?? 0,
//       cost: forecast?.cost ?? 0,
//       fringe: forecast?.fringe ?? 0,
//       overhead: forecast?.overhead ?? 0,
//       gna: forecast?.gna ?? 0,
//       ...(planType === "EAC"
//         ? { actualamt: Number(newValue) || 0 }
//         : { forecastedamt: Number(newValue) || 0 }),
//       createdat: forecast?.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast?.displayText ?? "",
//     };

//     console.log("UpdateForecastAmount payload:", payload);

//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setSuccessMessageText("Forecast updated!");
//       setShowSuccessMessage(true);
//       toast.success("Forecast amount updated successfully!", {
//         toastId: "forecast-update-success",
//         autoClose: 3000,
//       });
//     } catch (err) {
//       console.error("API error:", err.response?.data || err);
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
//       }));
//       setSuccessMessageText("Failed to update forecast.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to update forecast amount: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     const newAmounts = {};
//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = employees[sourceRowIndex];
//       const sourceMonthAmounts = getMonthAmounts(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newAmounts[uniqueKey] = newEntryPeriodAmounts[uniqueKey] || "0";
//         } else {
//           newAmounts[uniqueKey] =
//             sourceMonthAmounts[uniqueKey]?.value?.toString() || "0";
//         }
//       });
//     }

//     setNewEntryPeriodAmounts((prev) => ({ ...prev, ...newAmounts }));
//     setShowFillValues(false);
//     setFillMethod("None");
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

//     setIsLoading(true);

//     const payloadForecasts = durations.map((duration) => ({
//       forecastedamt:
//         Number(newEntryPeriodAmounts[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       forecastid: 0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       dctId: 0,
//       month: duration.monthNo,
//       year: duration.year,
//       totalBurdenCost: 0,
//       fees: 0,
//       burden: 0,
//       ccffRevenue: 0,
//       tnmRevenue: 0,
//       revenue: 0,
//       cost: 0,
//       fringe: 0,
//       overhead: 0,
//       gna: 0,
//       forecastedhours: 0,
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: "",
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       // effectDt: new Date().toISOString(),
//       effectDt: null,
//     }));

//     const payload = {
//       dctId: 0,
//       plId: planId,
//       acctId: newEntry.acctId || "",
//       orgId: newEntry.orgId || "",
//       notes: "",
//       category: newEntry.name || "Test",
//       amountType: "",
//       id: newEntry.id,
//       type: newEntry.idType || "Employee",
//       isRev: newEntry.isRev || false,
//       isBrd: newEntry.isBrd || false,
//       status: newEntry.status || "Act",
//       createdBy: "System",
//       lastModifiedBy: "System",
//       plForecasts: payloadForecasts,
//       plDct: {},
//     };

//     console.log("AddNewDirectCost payload for new entry:", payload);

//     try {
//       const response = await axios.post(
//         "https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Save response:", response.status, response.data);

//       const newEmployee = {
//         emple: {
//           empleId: newEntry.id,
//           emplId: newEntry.id,
//           firstName: newEntry.firstName || "",
//           lastName: newEntry.lastName || "",
//           accId: newEntry.acctId || "",
//           orgId: newEntry.orgId || "",
//           perHourRate: Number(newEntry.perHourRate) || 0,
//           isRev: newEntry.isRev || false,
//           isBrd: newEntry.isBrd || false,
//           status: newEntry.status || "Act",
//           type: newEntry.idType || "Employee",
//           plForecasts: payloadForecasts.map((forecast) => ({
//             ...forecast,
//             forecastid:
//               response.data?.plForecasts?.find(
//                 (f) => f.month === forecast.month && f.year === forecast.year
//               )?.forecastid || 0,
//             createdat: new Date().toISOString(),
//           })),
//         },
//       };

//       setEmployees((prevEmployees) => {
//         const employeeMap = new Map();
//         prevEmployees.forEach((emp) => {
//           const emplId = emp.emple.emplId || `auto-${Math.random()}`;
//           employeeMap.set(emplId, emp);
//         });
//         employeeMap.set(newEntry.id, newEmployee);
//         return Array.from(employeeMap.values());
//       });

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
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodAmounts({});
//       setEmployeeSuggestions([]);
//       setNonLaborAccounts([]);

//       if (onSaveSuccess) {
//         console.log("Calling onSaveSuccess");
//         onSaveSuccess();
//       }

//       toast.success("New entry saved and added to table!", {
//         toastId: "save-entry-success",
//         autoClose: 3000,
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.errors
//         ? Object.entries(err.response.data.errors)
//             .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
//             .join("; ")
//         : err.response?.data?.message || err.message;
//       console.error("Save error:", err.response?.data || err);
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(`Failed to save new entry: ${errorMessage}`, {
//         toastId: "save-entry-error",
//         autoClose: 5000,
//       });
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
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

//   const handleFindReplace = async () => {
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

//   for (const empIdx in employees) {
//     const emp = employees[empIdx];
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
//         const monthAmounts = getMonthAmounts(emp);
//         const forecast = monthAmounts[uniqueKey];
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
      
//       if (findValueTrimmed === "0") {
//         const numValue = parseFloat(displayedValueTrimmed);
//         isMatch = displayedValueTrimmed === "" || 
//                  displayedValueTrimmed === "0" || 
//                  (!isNaN(numValue) && numValue === 0);
//       } else {
//         isMatch = displayedValueTrimmed === findValueTrimmed;
        
//         if (!isMatch) {
//           const findNum = parseFloat(findValueTrimmed);
//           const displayNum = parseFloat(displayedValueTrimmed);
//           if (!isNaN(findNum) && !isNaN(displayNum)) {
//             isMatch = findNum === displayNum;
//           }
//         }
//       }

//       if (isMatch) {
//         const newValue = replaceValue.trim();
//         const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

//         const forecast = getMonthAmounts(emp)[uniqueKey];
        
//         // Only proceed if we have a valid forecast with forecastid
//         if (forecast && forecast.forecastid) {
//           const originalValue = planType === "EAC" 
//             ? (forecast.actualamt ?? 0) 
//             : (forecast.forecastedamt ?? 0);

//           if (newNumericValue !== originalValue) {
//             updatedInputValues[currentInputKey] = newValue;
//             replacementsCount++;

//             const payload = {
//               forecastid: Number(forecast.forecastid),
//               projId: forecast.projId || projectId,
//               plId: forecast.plId || planId,
//               emplId: forecast.emplId || "",
//               dctId: forecast.dctId || 0,
//               month: forecast.month || duration.monthNo,
//               year: forecast.year || duration.year,
//               totalBurdenCost: forecast.totalBurdenCost || 0,
//               burden: forecast.burden || 0,
//               ccffRevenue: forecast.ccffRevenue || 0,
//               tnmRevenue: forecast.tnmRevenue || 0,
//               cost: forecast.cost || 0,
//               fringe: forecast.fringe || 0,
//               overhead: forecast.overhead || 0,
//               gna: forecast.gna || 0,
//               forecastedhours: forecast.forecastedhours || 0,
//               updatedat: new Date().toISOString().split("T")[0],
//               displayText: forecast.displayText || "",
//               [planType === "EAC" ? "actualamt" : "forecastedamt"]: newNumericValue,
//             };
            
//             updates.push(
//               axios
//                 .put(
//                   `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
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
//     setEmployees((prev) => {
//       const updated = [...prev];
//       for (const empIdx in updated) {
//         const emp = updated[empIdx];
//         for (const duration of sortedDurations) {
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           const currentInputKey = `${empIdx}_${uniqueKey}`;
//           if (updatedInputValues[currentInputKey] !== undefined) {
//             if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//               const forecast = emp.emple.plForecasts.find(
//                 (f) =>
//                   f.month === duration.monthNo && f.year === duration.year
//               );
//               if (forecast) {
//                 const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
//                 if (planType === "EAC") {
//                   forecast.actualamt = newValue;
//                 } else {
//                   forecast.forecastedamt = newValue;
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

//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations =
//     propFiscalYear && propFiscalYear !== "All"
//       ? durations
//           .filter((d) => d.year === parseInt(propFiscalYear))
//           .sort(
//             (a, b) =>
//               new Date(a.year, a.monthNo - 1, 1) -
//               new Date(b.year, b.monthNo - 1, 1)
//           )
//       : durations.sort(
//           (a, b) =>
//             new Date(a.year, a.monthNo - 1, 1) -
//             new Date(b.year, b.monthNo - 1, 1)
//         );

//   if (isLoading) {
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
//     employees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {/* <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2> */}
//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2">
//           {Object.values(hiddenRows).some(Boolean) && (
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
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="text"
//                 value={startDate}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="text"
//                 value={endDate}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
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

//       {employees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="synchronized-tables-container">
//           <div className="synchronized-table-scroll">
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
//                       className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px]
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
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
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
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={(e) => handleIdChange(e.target.value)}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
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
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="text"
//                         name="name"
//                         value={
//                           newEntry.lastName && newEntry.firstName
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
//                       {/* Changed px-2 to px-1.5 */}
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
//                         readOnly={!isBudPlan}
//                       />
//                       <datalist id="account-list">
//                         {nonLaborAccounts.map((account, index) => (
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
//                       {/* Changed px-2 to px-1.5 */}
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
//                         readOnly={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="checkbox"
//                         name="isRev"
//                         checked={newEntry.isRev}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isRev: e.target.checked })
//                         }
//                         className={`w-4 h-4 ${
//                           !isBudPlan ? "cursor-not-allowed" : ""
//                         }`}
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="checkbox"
//                         name="isBrd"
//                         checked={newEntry.isBrd}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isBrd: e.target.checked })
//                         }
//                         className={`w-4 h-4 ${
//                           !isBudPlan ? "cursor-not-allowed" : ""
//                         }`}
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
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
//                       {/* Changed px-2 to px-1.5 */}
//                       {Object.values(newEntryPeriodAmounts)
//                         .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                         .toFixed(2)}
//                     </td>
//                   </tr>
//                 )}
//                 {employees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = employees.findIndex((e) => e === emp);
//                     const row = getEmployeeRow(emp, actualEmpIdx);
//                     const uniqueRowKey = `${
//                       emp.emple.emplId || "emp"
//                     }-${actualEmpIdx}`;
//                     return (
//                       <tr
//                         key={uniqueRowKey}
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
//                         {EMPLOYEE_COLUMNS.map((col) => {
//                           if (isBudPlan && isEditable) {
//                             if (col.key === "acctId") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-acctId`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="text"
//                                     value={
//                                       editedRowData[actualEmpIdx]?.acctId !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].acctId
//                                         : row.acctId
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "acctId",
//                                         e.target.value
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                   />
//                                 </td>
//                               );
//                             }
//                             if (col.key === "orgId") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-orgId`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="text"
//                                     value={
//                                       editedRowData[actualEmpIdx]?.orgId !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].orgId
//                                         : row.orgId
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "orgId",
//                                         e.target.value
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                   />
//                                 </td>
//                               );
//                             }
//                             if (col.key === "isRev") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-isRev`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="checkbox"
//                                     checked={
//                                       editedRowData[actualEmpIdx]?.isRev !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].isRev
//                                         : emp.emple.isRev
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "isRev",
//                                         e.target.checked
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-4 h-4"
//                                   />
//                                 </td>
//                               );
//                             }
//                             if (col.key === "isBrd") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-isBrd`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="checkbox"
//                                     checked={
//                                       editedRowData[actualEmpIdx]?.isBrd !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].isBrd
//                                         : emp.emple.isBrd
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "isBrd",
//                                         e.target.checked
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-4 h-4"
//                                   />
//                                 </td>
//                               );
//                             }
//                           }
//                           return (
//                             <td
//                               key={`${uniqueRowKey}-${col.key}`}
//                               className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
//                             >
//                               {" "}
//                               {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                               {row[col.key]}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//           <div className="synchronized-table-scroll">
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
//                           /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
//                           selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
//                         }`}
//                         style={{ cursor: isEditable ? "pointer" : "default" }}
//                         onClick={() => handleColumnHeaderClick(uniqueKey)}
//                       >
//                         <div className="flex flex-col items-center justify-center h-full">
//                           <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                             {duration.month}
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
//                             /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
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
//                             value={newEntryPeriodAmounts[uniqueKey] || ""}
//                             onChange={(e) =>
//                               isInputEditable &&
//                               setNewEntryPeriodAmounts((prev) => ({
//                                 ...prev,
//                                 [uniqueKey]: e.target.value.replace(
//                                   /[^0-9.]/g,
//                                   ""
//                                 ),
//                               }))
//                             }
//                             className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                               /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
//                               !isInputEditable
//                                 ? "cursor-not-allowed text-gray-400"
//                                 : "text-gray-700"
//                             }`}
//                             disabled={!isInputEditable}
//                             placeholder="Enter Amount"
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 )}
//                 {employees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = employees.findIndex((e) => e === emp);
//                     const monthAmounts = getMonthAmounts(emp);
//                     const uniqueRowKey = `${
//                       emp.emple.emplId || "emp"
//                     }-${actualEmpIdx}`;
//                     return (
//                       <tr
//                         key={uniqueRowKey}
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
//                           const forecast = monthAmounts[uniqueKey];
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
//                               key={`${uniqueRowKey}-${uniqueKey}`}
//                               className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                 /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
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
//                                   /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
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
//                                   handleForecastAmountBlur(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 disabled={!isInputEditable}
//                                 placeholder="Enter Amount"
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
//               Find and Replace Amounts
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
//                       ? employees[selectedRowIndex]?.emple.emplId
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
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs cursor-pointer"
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


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPLOYEE_COLUMNS = [
//   { key: "idType", label: "ID Type" },
//   { key: "emplId", label: "ID" },
//   { key: "name", label: "Name" },
//   { key: "acctId", label: "Account" },
//   { key: "orgId", label: "Organization" },
//   { key: "isRev", label: "Rev" },
//   { key: "isBrd", label: "Brd" },
//   { key: "status", label: "Status" },
//   { key: "total", label: "Total" },
// ];

// const ID_TYPE_OPTIONS = [
//   { value: "", label: "None" },
//   { value: "Employee", label: "Employee" },
//   { value: "Vendor", label: "Vendor" },
//   { value: "Vendor Employee", label: "Vendor Employee" },
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

// const ProjectAmountsTable = ({
//   initialData,
//   startDate,
//   endDate,
//   planType,
//   fiscalYear: propFiscalYear,
//   onSaveSuccess,
//   refreshKey,
// }) => {
//   const [employees, setEmployees] = useState([]);
//   const [durations, setDurations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
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
//     perHourRate: "",
//     status: "Act",
//   });
//   const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [successMessageText, setSuccessMessageText] = useState("");
//   const [hiddenRows, setHiddenRows] = useState({});
//   const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
//   const [nonLaborAccounts, setNonLaborAccounts] = useState([]);
//   const [showFillValues, setShowFillValues] = useState(false);
//   const [fillMethod, setFillMethod] = useState("None");
//   const [sourceRowIndex, setSourceRowIndex] = useState(null);
//   const [editedRowData, setEditedRowData] = useState({});

//   const isEditable = initialData.status === "In Progress";
//   const planId = initialData.plId;
//   const projectId = initialData.projId;
//   const closedPeriod = initialData.closedPeriod;
//   const isBudPlan = planType && planType.toUpperCase() === "BUD";

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!startDate || !endDate || !planId) {
//         setDurations([]);
//         setEmployees([]);
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const durationResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
//         );
//         if (!Array.isArray(durationResponse.data)) {
//           throw new Error("Invalid duration response format");
//         }
//         const fetchedDurations = durationResponse.data;
//         setDurations(fetchedDurations);

//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}`
//         );
//         const apiData = Array.isArray(response.data)
//           ? response.data
//           : [response.data];
//         if (apiData.length === 0) {
//           setEmployees([]);
//           toast.info('No forecast data available for this plan.', {
//             toastId: "no-forecast-data",
//             autoClose: 3000,
//           });
//         } else {
//           const updatedEmployees = apiData.map((item, idx) => ({
//             emple: {
//               empleId: item.empl?.id || `auto-${idx}`,
//               emplId: item.empl?.id || "",
//               firstName: item.empl?.firstName || "",
//               lastName: item.empl?.lastName || "",
//               accId: item.empl?.acctId || "",
//               orgId: item.empl?.orgId || "",
//               perHourRate: item.empl?.hrRate || "",
//               isRev: item.empl?.isRev || false,
//               isBrd: item.empl?.isBrd || false,
//               status: item.empl?.status || "Act",
//               type: item.empl?.type || "",
//               category: item.empl?.category || "",
//               dctId: item.dctId || 0,
//               plId: item.pl_ID || 0,
//               plForecasts: item.empl?.plForecasts || [],
//             },
//           }));
//           setEmployees(updatedEmployees);
//         }
//         setInputValues({});
//         setNewEntryPeriodAmounts({});
//       } catch (err) {
//         setError("Failed to load data. Please try again.");
//         if (err.response && err.response.status === 500) {
//           setEmployees([]);
//           toast.info("No forecast data available for this plan.", {
//             toastId: "no-forecast-data",
//             autoClose: 3000,
//           });
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

//     fetchData();
//   }, [startDate, endDate, planId, refreshKey, propFiscalYear]); // Added propFiscalYear for refetch on fiscal year change

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (!projectId) {
//         console.warn("projectId is undefined, skipping employee fetch");
//         setEmployeeSuggestions([]);
//         return;
//       }
//       if (!showNewForm) {
//         console.log("New entry form is not open, skipping employee fetch");
//         setEmployeeSuggestions([]);
//         return;
//       }
//       console.log(`Fetching employees for projectId: ${projectId}`);
//       try {
//         const endpoint =
//           newEntry.idType === "Vendor" || newEntry.idType === "Vendor Employee"
//             ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
//         const response = await axios.get(endpoint);
//         console.log("Employee suggestions response:", response.data);
//         const suggestions = Array.isArray(response.data)
//           ? response.data.map((emp) => {
//               if (newEntry.idType === "Vendor") {
//                 return {
//                   emplId: emp.vendId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                 };
//               } else if (newEntry.idType === "Vendor Employee") {
//                 return {
//                   emplId: emp.empId,
//                   firstName: "",
//                   lastName: emp.employeeName || "",
//                 };
//               } else {
//                 const [lastName, firstName] = (emp.employeeName || "")
//                   .split(", ")
//                   .map((str) => str.trim());
//                 return {
//                   emplId: emp.empId,
//                   firstName: firstName || "",
//                   lastName: lastName || "",
//                 };
//               }
//             })
//           : [];
//         setEmployeeSuggestions(suggestions);
//         console.log("Updated employeeSuggestions:", suggestions);
//       } catch (err) {
//         console.error("Error fetching employees:", err);
//         setEmployeeSuggestions([]);
//         toast.error(
//           `Failed to fetch ${
//             newEntry.idType === "Vendor" ||
//             newEntry.idType === "Vendor Employee"
//               ? "vendor "
//               : ""
//           }employee suggestions${
//             projectId
//               ? " for project ID " + projectId
//               : ". Project ID is missing."
//           }`,
//           {
//             toastId: "employee-fetch-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     };

//     const fetchNonLaborAccounts = async () => {
//       if (!projectId) {
//         console.warn(
//           "projectId is undefined, skipping non-labor accounts fetch"
//         );
//         setNonLaborAccounts([]);
//         return;
//       }
//       if (!showNewForm) {
//         console.log(
//           "New entry form is not open, skipping non-labor accounts fetch"
//         );
//         setNonLaborAccounts([]);
//         return;
//       }
//       console.log(`Fetching non-labor accounts for projectId: ${projectId}`);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
//         );
//         console.log("Non-labor accounts response:", response.data);
//         const data = Array.isArray(response.data)
//           ? response.data[0]
//           : response.data;
//         const accounts = Array.isArray(data.nonLaborAccounts)
//           ? data.nonLaborAccounts.map((account) => ({ id: account }))
//           : [];
//         setNonLaborAccounts(accounts);
//         console.log("Updated nonLaborAccounts:", accounts);
//       } catch (err) {
//         console.error("Error fetching non-labor accounts:", err);
//         setNonLaborAccounts([]);
//         toast.error(
//           `Failed to fetch non-labor accounts${
//             projectId
//               ? " for project ID " + projectId
//               : ". Project ID is missing."
//           }`,
//           {
//             toastId: "non-labor-accounts-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     };

//     if (showNewForm) {
//       fetchEmployees();
//       fetchNonLaborAccounts();
//     } else {
//       setEmployeeSuggestions([]);
//       setNonLaborAccounts([]);
//     }
//   }, [projectId, showNewForm, newEntry.idType]);

//   const handleIdChange = (value) => {
//     console.log("handleIdChange called with value:", value);
//     const selectedEmployee = employeeSuggestions.find(
//       (emp) => emp.emplId === value
//     );
//     console.log("Selected employee:", selectedEmployee);
//     setNewEntry((prev) => ({
//       ...prev,
//       id: value,
//       firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
//       lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
//       acctId: nonLaborAccounts.length > 0 ? nonLaborAccounts[0].id : "",
//     }));
//   };

//   const handleRowFieldChange = (rowIdx, field, value) => {
//     if (!isBudPlan || !isEditable) return;
//     setEditedRowData((prev) => ({
//       ...prev,
//       [rowIdx]: {
//         ...prev[rowIdx],
//         [field]: value,
//       },
//     }));
//   };

//   const handleRowFieldBlur = async (rowIdx, emp) => {
//     if (!isBudPlan || !isEditable) return;
//     if (!emp || !emp.emple) {
//       toast.error("Employee data is missing for update.");
//       return;
//     }

//     const edited = editedRowData[rowIdx] || {};
//     if (
//       edited.acctId === undefined &&
//       edited.orgId === undefined &&
//       edited.isRev === undefined &&
//       edited.isBrd === undefined
//     )
//       return;

//     const payload = {
//       dctId: emp.emple.dctId || 0,
//       plId: emp.emple.plId || 0,
//       accId: edited.acctId !== undefined ? edited.acctId : emp.emple.accId, 
//       orgId: edited.orgId !== undefined ? edited.orgId : emp.emple.orgId,
//       type: emp.emple.type || "",
//       category: emp.emple.category || "",
//       amountType: emp.emple.amountType || "",
//       id: emp.emple.emplId || "",
//       isRev: edited.isRev !== undefined ? edited.isRev : emp.emple.isRev,
//       isBrd: edited.isBrd !== undefined ? edited.isBrd : emp.emple.isBrd,
//       createdBy: emp.emple.createdBy || "System",
//       lastModifiedBy: "System",
//     };

//     try {
//       await axios.put(
//         "https://test-api-3tmq.onrender.com/DirectCost/UpdateDirectCost",
//         { ...payload, acctId: payload.accId },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setEditedRowData((prev) => {
//         const newData = { ...prev };
//         delete newData[rowIdx];
//         return newData;
//       });
//       setEmployees((prev) => {
//         const updated = [...prev];
//         updated[rowIdx] = {
//           ...updated[rowIdx],
//           emple: {
//             ...updated[rowIdx].emple,
//             ...payload,
//           },
//         };
//         return updated;
//       });
//       toast.success("Employee updated successfully!", {
//         toastId: `employee-update-${rowIdx}`,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       toast.error(
//         "Failed to update row: " + (err.response?.data?.message || err.message)
//       );
//     }
//   };

//   const getEmployeeRow = (emp, idx) => {
//     const monthAmounts = getMonthAmounts(emp);
//     const totalAmount = sortedDurations.reduce((sum, duration) => {
//       const uniqueKey = `${duration.monthNo}_${duration.year}`;
//       const inputValue = inputValues[`${idx}_${uniqueKey}`];
//       const forecastValue = monthAmounts[uniqueKey]?.value;
//       const value =
//         inputValue !== undefined && inputValue !== ""
//           ? inputValue
//           : forecastValue;
//       return sum + (value && !isNaN(value) ? Number(value) : 0);
//     }, 0);

//     return {
//       idType: emp.emple.type || "Employee",
//       emplId: emp.emple.emplId || "-",
//       name:
//         emp.emple.category || emp.emple.firstName || emp.emple.lastName
//           ? emp.emple.category ||
//             `${emp.emple.lastName || ""}${
//               emp.emple.firstName && emp.emple.lastName ? ", " : ""
//             }${emp.emple.firstName || ""}`
//           : "-",
//       acctId: emp.emple.accId || "-",
//       orgId: emp.emple.orgId || "-",
//       isRev: emp.emple.isRev ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       isBrd: emp.emple.isBrd ? (
//         <span className="text-green-600 font-sm text-xl">✓</span>
//       ) : (
//         "-"
//       ),
//       status: emp.emple.status || "Act",
//       total: totalAmount.toFixed(2) || "-",
//     };
//   };

//   const getMonthAmounts = (emp) => {
//     const monthAmounts = {};
//     if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//       emp.emple.plForecasts.forEach((forecast) => {
//         const uniqueKey = `${forecast.month}_${forecast.year}`;
//         // Use actualhours for EAC, forecastedhours otherwise
//         const value =
//           planType === "EAC" && forecast.actualamt !== undefined
//             ? forecast.actualamt
//             : forecast.forecastedamt ?? 0;
//         monthAmounts[uniqueKey] = { value, ...forecast };
//       });
//     }
//     return monthAmounts;
//   };

//   const handleInputChange = (empIdx, uniqueKey, newValue) => {
//     if (!isEditable) return;
//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );
//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       toast.warn("Cannot edit amounts for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
//       console.log(
//         `Updating inputValues for ${empIdx}_${uniqueKey}: ${newValue}`
//       );
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: newValue,
//       }));
//     }
//   };

//   const handleForecastAmountBlur = async (empIdx, uniqueKey, value) => {
//     if (!isEditable) return;
//     const newValue = value === "" ? 0 : Number(value);
//     const emp = employees[empIdx];
//     const monthAmounts = getMonthAmounts(emp);
//     const forecast = monthAmounts[uniqueKey];
//     const originalForecastedAmount = forecast?.forecastedamt ?? 0;
//     const currentDuration = sortedDurations.find(
//       (d) => `${d.monthNo}_${d.year}` === uniqueKey
//     );

//     console.log(
//       `handleForecastAmountBlur: empIdx=${empIdx}, uniqueKey=${uniqueKey}, newValue=${newValue}, original=${originalForecastedAmount}, month=${currentDuration?.monthNo}, year=${currentDuration?.year}`
//     );

//     if (newValue === originalForecastedAmount) {
//       console.log("No change in forecast amount, skipping API call");
//       return;
//     }

//     if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
//       console.log(`Cannot edit ${uniqueKey}: period closed`);
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
//       }));
//       toast.warn("Cannot edit amounts for a closed period.", {
//         toastId: "closed-period-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const payload = {
//       forecastedamt: Number(newValue) || 0,
//       forecastid: Number(forecast?.forecastid ?? 0),
//       projId: forecast?.projId ?? projectId,
//       plId: forecast?.plId ?? planId,
//       emplId: forecast?.emplId ?? emp.emple.emplId,
//       dctId: forecast?.dctId ?? 0,
//       month: forecast?.month ?? currentDuration.monthNo,
//       year: forecast?.year ?? currentDuration.year,
//       totalBurdenCost: forecast?.totalBurdenCost ?? 0,
//       burden: forecast?.burden ?? 0,
//       ccffRevenue: forecast?.ccffRevenue ?? 0,
//       tnmRevenue: forecast?.tnmRevenue ?? 0,
//       cost: forecast?.cost ?? 0,
//       fringe: forecast?.fringe ?? 0,
//       overhead: forecast?.overhead ?? 0,
//       gna: forecast?.gna ?? 0,
//       ...(planType === "EAC"
//         ? { actualamt: Number(newValue) || 0 }
//         : { forecastedamt: Number(newValue) || 0 }),
//       createdat: forecast?.createdat ?? new Date(0).toISOString(),
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: forecast?.displayText ?? "",
//     };

//     console.log("UpdateForecastAmount payload:", payload);

//     try {
//       const response = await axios.put(
//         `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setSuccessMessageText("Forecast updated!");
//       setShowSuccessMessage(true);
//       toast.success("Forecast amount updated successfully!", {
//         toastId: "forecast-update-success",
//         autoClose: 3000,
//       });

//       // Update local state with the response data for consistency
//       setEmployees((prev) => {
//         const updated = [...prev];
//         const updatedEmp = { ...updated[empIdx] };
//         const updatedForecasts = [...(updatedEmp.emple.plForecasts || [])];
//         const forecastIndex = updatedForecasts.findIndex(
//           (f) => f.month === payload.month && f.year === payload.year
//         );
//         const updatedForecast = response.data; // Assume API returns the updated forecast
//         if (forecastIndex >= 0) {
//           updatedForecasts[forecastIndex] = {
//             ...updatedForecasts[forecastIndex],
//             ...updatedForecast,
//             value: planType === "EAC" ? updatedForecast.actualamt : updatedForecast.forecastedamt,
//           };
//         } else {
//           updatedForecasts.push({
//             ...updatedForecast,
//             value: planType === "EAC" ? updatedForecast.actualamt : updatedForecast.forecastedamt,
//           });
//         }
//         updatedEmp.emple = {
//           ...updatedEmp.emple,
//           plForecasts: updatedForecasts,
//         };
//         updated[empIdx] = updatedEmp;
//         return updated;
//       });

//       // Clear the input value after successful update
//       setInputValues((prev) => {
//         const newInputs = { ...prev };
//         delete newInputs[`${empIdx}_${uniqueKey}`];
//         return newInputs;
//       });

//       // Trigger refetch to ensure UI syncs with server (like in ProjectHoursDetails)
//       if (onSaveSuccess) {
//         onSaveSuccess();
//       }
//     } catch (err) {
//       console.error("API error:", err.response?.data || err);
//       setInputValues((prev) => ({
//         ...prev,
//         [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
//       }));
//       setSuccessMessageText("Failed to update forecast.");
//       setShowSuccessMessage(true);
//       toast.error(
//         "Failed to update forecast amount: " +
//           (err.response?.data?.message || err.message),
//         {
//           toastId: "forecast-update-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//     }
//   };

//   const handleFillValues = async () => {
//     if (!showNewForm || !isEditable) return;

//     const newAmounts = {};
//     if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
//       const sourceEmp = employees[sourceRowIndex];
//       const sourceMonthAmounts = getMonthAmounts(sourceEmp);
//       sortedDurations.forEach((duration) => {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;
//         if (
//           planType === "EAC" &&
//           !isMonthEditable(duration, closedPeriod, planType)
//         ) {
//           newAmounts[uniqueKey] = newEntryPeriodAmounts[uniqueKey] || "0";
//         } else {
//           newAmounts[uniqueKey] =
//             sourceMonthAmounts[uniqueKey]?.value?.toString() || "0";
//         }
//       });
//     }

//     setNewEntryPeriodAmounts((prev) => ({ ...prev, ...newAmounts }));
//     setShowFillValues(false);
//     setFillMethod("None");
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

//     setIsLoading(true);

//     const payloadForecasts = durations.map((duration) => ({
//       forecastedamt:
//         Number(newEntryPeriodAmounts[`${duration.monthNo}_${duration.year}`]) ||
//         0,
//       forecastid: 0,
//       projId: projectId,
//       plId: planId,
//       emplId: newEntry.id,
//       dctId: 0,
//       month: duration.monthNo,
//       year: duration.year,
//       totalBurdenCost: 0,
//       fees: 0,
//       burden: 0,
//       ccffRevenue: 0,
//       tnmRevenue: 0,
//       revenue: 0,
//       cost: 0,
//       fringe: 0,
//       overhead: 0,
//       gna: 0,
//       forecastedhours: 0,
//       updatedat: new Date().toISOString().split("T")[0],
//       displayText: "",
//       acctId: newEntry.acctId,
//       orgId: newEntry.orgId,
//       hrlyRate: Number(newEntry.perHourRate) || 0,
//       // effectDt: new Date().toISOString(),
//       effectDt: null,
//     }));

//     const payload = {
//       dctId: 0,
//       plId: planId,
//       acctId: newEntry.acctId || "",
//       orgId: newEntry.orgId || "",
//       notes: "",
//       category: newEntry.name || "Test",
//       amountType: "",
//       id: newEntry.id,
//       type: newEntry.idType || "Employee",
//       isRev: newEntry.isRev || false,
//       isBrd: newEntry.isBrd || false,
//       status: newEntry.status || "Act",
//       createdBy: "System",
//       lastModifiedBy: "System",
//       plForecasts: payloadForecasts,
//       plDct: {},
//     };

//     console.log("AddNewDirectCost payload for new entry:", payload);

//     try {
//       const response = await axios.post(
//         "https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Save response:", response.status, response.data);

//       const newEmployee = {
//         emple: {
//           empleId: newEntry.id,
//           emplId: newEntry.id,
//           firstName: newEntry.firstName || "",
//           lastName: newEntry.lastName || "",
//           accId: newEntry.acctId || "",
//           orgId: newEntry.orgId || "",
//           perHourRate: Number(newEntry.perHourRate) || 0,
//           isRev: newEntry.isRev || false,
//           isBrd: newEntry.isBrd || false,
//           status: newEntry.status || "Act",
//           type: newEntry.idType || "Employee",
//           plForecasts: payloadForecasts.map((forecast) => ({
//             ...forecast,
//             forecastid:
//               response.data?.plForecasts?.find(
//                 (f) => f.month === forecast.month && f.year === forecast.year
//               )?.forecastid || 0,
//             createdat: new Date().toISOString(),
//           })),
//         },
//       };

//       setEmployees((prevEmployees) => {
//         const employeeMap = new Map();
//         prevEmployees.forEach((emp) => {
//           const emplId = emp.emple.emplId || `auto-${Math.random()}`;
//           employeeMap.set(emplId, emp);
//         });
//         employeeMap.set(newEntry.id, newEmployee);
//         return Array.from(employeeMap.values());
//       });

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
//         perHourRate: "",
//         status: "Act",
//       });
//       setNewEntryPeriodAmounts({});
//       setEmployeeSuggestions([]);
//       setNonLaborAccounts([]);

//       if (onSaveSuccess) {
//         console.log("Calling onSaveSuccess");
//         onSaveSuccess();
//       }

//       toast.success("New entry saved and added to table!", {
//         toastId: "save-entry-success",
//         autoClose: 3000,
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.errors
//         ? Object.entries(err.response.data.errors)
//             .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
//             .join("; ")
//         : err.response?.data?.message || err.message;
//       console.error("Save error:", err.response?.data || err);
//       setSuccessMessageText("Failed to save entry.");
//       setShowSuccessMessage(true);
//       toast.error(`Failed to save new entry: ${errorMessage}`, {
//         toastId: "save-entry-error",
//         autoClose: 5000,
//       });
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
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

//   const handleFindReplace = async () => {
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

//   for (const empIdx in employees) {
//     const emp = employees[empIdx];
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
//         const monthAmounts = getMonthAmounts(emp);
//         const forecast = monthAmounts[uniqueKey];
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
      
//       if (findValueTrimmed === "0") {
//         const numValue = parseFloat(displayedValueTrimmed);
//         isMatch = displayedValueTrimmed === "" || 
//                  displayedValueTrimmed === "0" || 
//                  (!isNaN(numValue) && numValue === 0);
//       } else {
//         isMatch = displayedValueTrimmed === findValueTrimmed;
        
//         if (!isMatch) {
//           const findNum = parseFloat(findValueTrimmed);
//           const displayNum = parseFloat(displayedValueTrimmed);
//           if (!isNaN(findNum) && !isNaN(displayNum)) {
//             isMatch = findNum === displayNum;
//           }
//         }
//       }

//       if (isMatch) {
//         const newValue = replaceValue.trim();
//         const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

//         const forecast = getMonthAmounts(emp)[uniqueKey];
        
//         // Only proceed if we have a valid forecast with forecastid
//         if (forecast && forecast.forecastid) {
//           const originalValue = planType === "EAC" 
//             ? (forecast.actualamt ?? 0) 
//             : (forecast.forecastedamt ?? 0);

//           if (newNumericValue !== originalValue) {
//             updatedInputValues[currentInputKey] = newValue;
//             replacementsCount++;

//             const payload = {
//               forecastid: Number(forecast.forecastid),
//               projId: forecast.projId || projectId,
//               plId: forecast.plId || planId,
//               emplId: forecast.emplId || "",
//               dctId: forecast.dctId || 0,
//               month: forecast.month || duration.monthNo,
//               year: forecast.year || duration.year,
//               totalBurdenCost: forecast.totalBurdenCost || 0,
//               burden: forecast.burden || 0,
//               ccffRevenue: forecast.ccffRevenue || 0,
//               tnmRevenue: forecast.tnmRevenue || 0,
//               cost: forecast.cost || 0,
//               fringe: forecast.fringe || 0,
//               overhead: forecast.overhead || 0,
//               gna: forecast.gna || 0,
//               forecastedhours: forecast.forecastedhours || 0,
//               updatedat: new Date().toISOString().split("T")[0],
//               displayText: forecast.displayText || "",
//               [planType === "EAC" ? "actualamt" : "forecastedamt"]: newNumericValue,
//             };
            
//             updates.push(
//               axios
//                 .put(
//                   `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
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
//     setEmployees((prev) => {
//       const updated = [...prev];
//       for (const empIdx in updated) {
//         const emp = updated[empIdx];
//         for (const duration of sortedDurations) {
//           const uniqueKey = `${duration.monthNo}_${duration.year}`;
//           const currentInputKey = `${empIdx}_${uniqueKey}`;
//           if (updatedInputValues[currentInputKey] !== undefined) {
//             if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//               const forecast = emp.emple.plForecasts.find(
//                 (f) =>
//                   f.month === duration.monthNo && f.year === duration.year
//               );
//               if (forecast) {
//                 const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
//                 if (planType === "EAC") {
//                   forecast.actualamt = newValue;
//                 } else {
//                   forecast.forecastedamt = newValue;
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

//   const showHiddenRows = () => setHiddenRows({});

//   const sortedDurations =
//     propFiscalYear && propFiscalYear !== "All"
//       ? durations
//           .filter((d) => d.year === parseInt(propFiscalYear))
//           .sort(
//             (a, b) =>
//               new Date(a.year, a.monthNo - 1, 1) -
//               new Date(b.year, b.monthNo - 1, 1)
//           )
//       : durations.sort(
//           (a, b) =>
//             new Date(a.year, a.monthNo - 1, 1) -
//             new Date(b.year, b.monthNo - 1, 1)
//         );

//   if (isLoading) {
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
//     employees.filter((_, idx) => !hiddenRows[idx]).length +
//       (showNewForm ? 1 : 0),
//     2
//   );

//   return (
//     <div className="relative p-4 font-inter w-full synchronized-tables-outer">
//       {/* <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2> */}
//       <div className="w-full flex justify-between mb-4 gap-2">
//         <div className="flex-grow"></div>
//         <div className="flex gap-2">
//           {Object.values(hiddenRows).some(Boolean) && (
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
//               {!showNewForm && ( // Hide Find/Replace while creating new entry
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
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 Start Period
//               </label>
//               <input
//                 type="text"
//                 value={startDate}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-xs font-medium mb-1">
//                 End Period
//               </label>
//               <input
//                 type="text"
//                 value={endDate}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
//               />
//             </div>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowFillValues(false);
//                   setFillMethod("None");
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

//       {employees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
//           No forecast data available for this plan.
//         </div>
//       ) : (
//         <div className="synchronized-tables-container">
//           <div className="synchronized-table-scroll">
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
//                       className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px]
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
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
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
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="text"
//                         name="id"
//                         value={newEntry.id}
//                         onChange={(e) => handleIdChange(e.target.value)}
//                         className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
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
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="text"
//                         name="name"
//                         value={
//                           newEntry.lastName && newEntry.firstName
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
//                       {/* Changed px-2 to px-1.5 */}
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
//                         readOnly={!isBudPlan}
//                       />
//                       <datalist id="account-list">
//                         {nonLaborAccounts.map((account, index) => (
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
//                       {/* Changed px-2 to px-1.5 */}
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
//                         readOnly={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="checkbox"
//                         name="isRev"
//                         checked={newEntry.isRev}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isRev: e.target.checked })
//                         }
//                         className={`w-4 h-4 ${
//                           !isBudPlan ? "cursor-not-allowed" : ""
//                         }`}
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5 text-center">
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
//                       <input
//                         type="checkbox"
//                         name="isBrd"
//                         checked={newEntry.isBrd}
//                         onChange={(e) =>
//                           isBudPlan &&
//                           setNewEntry({ ...newEntry, isBrd: e.target.checked })
//                         }
//                         className={`w-4 h-4 ${
//                           !isBudPlan ? "cursor-not-allowed" : ""
//                         }`}
//                         disabled={!isBudPlan}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-1.5 py-0.5">
//                       {" "}
//                       {/* Changed px-2 to px-1.5 */}
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
//                       {/* Changed px-2 to px-1.5 */}
//                       {Object.values(newEntryPeriodAmounts)
//                         .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
//                         .toFixed(2)}
//                     </td>
//                   </tr>
//                 )}
//                 {employees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = employees.findIndex((e) => e === emp);
//                     const row = getEmployeeRow(emp, actualEmpIdx);
//                     const uniqueRowKey = `${
//                       emp.emple.emplId || "emp"
//                     }-${actualEmpIdx}`;
//                     return (
//                       <tr
//                         key={uniqueRowKey}
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
//                         {EMPLOYEE_COLUMNS.map((col) => {
//                           if (isBudPlan && isEditable) {
//                             if (col.key === "acctId") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-acctId`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="text"
//                                     value={
//                                       editedRowData[actualEmpIdx]?.acctId !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].acctId
//                                         : row.acctId
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "acctId",
//                                         e.target.value
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                   />
//                                 </td>
//                               );
//                             }
//                             if (col.key === "orgId") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-orgId`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="text"
//                                     value={
//                                       editedRowData[actualEmpIdx]?.orgId !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].orgId
//                                         : row.orgId
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "orgId",
//                                         e.target.value
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
//                                   />
//                                 </td>
//                               );
//                             }
//                             if (col.key === "isRev") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-isRev`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="checkbox"
//                                     checked={
//                                       editedRowData[actualEmpIdx]?.isRev !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].isRev
//                                         : emp.emple.isRev
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "isRev",
//                                         e.target.checked
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-4 h-4"
//                                   />
//                                 </td>
//                               );
//                             }
//                             if (col.key === "isBrd") {
//                               return (
//                                 <td
//                                   key={`${uniqueRowKey}-isBrd`}
//                                   className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
//                                 >
//                                   {" "}
//                                   {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                                   <input
//                                     type="checkbox"
//                                     checked={
//                                       editedRowData[actualEmpIdx]?.isBrd !==
//                                       undefined
//                                         ? editedRowData[actualEmpIdx].isBrd
//                                         : emp.emple.isBrd
//                                     }
//                                     onChange={(e) =>
//                                       handleRowFieldChange(
//                                         actualEmpIdx,
//                                         "isBrd",
//                                         e.target.checked
//                                       )
//                                     }
//                                     onBlur={() =>
//                                       handleRowFieldBlur(actualEmpIdx, emp)
//                                     }
//                                     className="w-4 h-4"
//                                   />
//                                 </td>
//                               );
//                             }
//                           }
//                           return (
//                             <td
//                               key={`${uniqueRowKey}-${col.key}`}
//                               className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
//                             >
//                               {" "}
//                               {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
//                               {row[col.key]}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//           <div className="synchronized-table-scroll">
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
//                           /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
//                           selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
//                         }`}
//                         style={{ cursor: isEditable ? "pointer" : "default" }}
//                         onClick={() => handleColumnHeaderClick(uniqueKey)}
//                       >
//                         <div className="flex flex-col items-center justify-center h-full">
//                           <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
//                             {duration.month}
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
//                             /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
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
//                             value={newEntryPeriodAmounts[uniqueKey] || ""}
//                             onChange={(e) =>
//                               isInputEditable &&
//                               setNewEntryPeriodAmounts((prev) => ({
//                                 ...prev,
//                                 [uniqueKey]: e.target.value.replace(
//                                   /[^0-9.]/g,
//                                   ""
//                                 ),
//                               }))
//                             }
//                             className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
//                               /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
//                               !isInputEditable
//                                 ? "cursor-not-allowed text-gray-400"
//                                 : "text-gray-700"
//                             }`}
//                             disabled={!isInputEditable}
//                             placeholder="Enter Amount"
//                           />
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 )}
//                 {employees
//                   .filter((_, idx) => !hiddenRows[idx])
//                   .map((emp, idx) => {
//                     const actualEmpIdx = employees.findIndex((e) => e === emp);
//                     const monthAmounts = getMonthAmounts(emp);
//                     const uniqueRowKey = `${
//                       emp.emple.emplId || "emp"
//                     }-${actualEmpIdx}`;
//                     return (
//                       <tr
//                         key={uniqueRowKey}
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
//                           const forecast = monthAmounts[uniqueKey];
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
//                               key={`${uniqueRowKey}-${uniqueKey}`}
//                               className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
//                                 /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
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
//                                   /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
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
//                                   handleForecastAmountBlur(
//                                     actualEmpIdx,
//                                     uniqueKey,
//                                     e.target.value
//                                   )
//                                 }
//                                 disabled={!isInputEditable}
//                                 placeholder="Enter Amount"
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
//               Find and Replace Amounts
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
//                       ? employees[selectedRowIndex]?.emple.emplId
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
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs cursor-pointer"
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

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMPLOYEE_COLUMNS = [
  { key: "idType", label: "ID Type" },
  { key: "emplId", label: "ID" },
  { key: "name", label: "Name" },
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "isRev", label: "Rev" },
  { key: "isBrd", label: "Brd" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total" },
];

const ID_TYPE_OPTIONS = [
  { value: "", label: "None" },
  { value: "Employee", label: "Employee" },
  { value: "Vendor", label: "Vendor" },
  { value: "Vendor Employee", label: "Vendor Employee" },
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

const ProjectAmountsTable = ({
  initialData,
  startDate,
  endDate,
  planType,
  fiscalYear: propFiscalYear,
  onSaveSuccess,
  refreshKey,
}) => {
  const [employees, setEmployees] = useState([]);
  const [durations, setDurations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    perHourRate: "",
    status: "Act",
  });
  const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [hiddenRows, setHiddenRows] = useState({});
  const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
  const [nonLaborAccounts, setNonLaborAccounts] = useState([]);
  const [showFillValues, setShowFillValues] = useState(false);
  const [fillMethod, setFillMethod] = useState("None");
  const [sourceRowIndex, setSourceRowIndex] = useState(null);
  const [editedRowData, setEditedRowData] = useState({});

  const isEditable = initialData.status === "In Progress";
  const planId = initialData.plId;
  const projectId = initialData.projId;
  const closedPeriod = initialData.closedPeriod;
  const isBudPlan = planType && planType.toUpperCase() === "BUD";

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate || !planId) {
        setDurations([]);
        setEmployees([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const durationResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
        );
        if (!Array.isArray(durationResponse.data)) {
          throw new Error("Invalid duration response format");
        }
        const fetchedDurations = durationResponse.data;
        setDurations(fetchedDurations);

        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}`
        );
        const apiData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        if (apiData.length === 0) {
          setEmployees([]);
          toast.info('No forecast data available for this plan.', {
            toastId: "no-forecast-data",
            autoClose: 3000,
          });
        } else {
          const updatedEmployees = apiData.map((item, idx) => ({
            emple: {
              empleId: item.empl?.id || `auto-${idx}`,
              emplId: item.empl?.id || "",
              firstName: item.empl?.firstName || "",
              lastName: item.empl?.lastName || "",
              accId: item.empl?.acctId || "",
              orgId: item.empl?.orgId || "",
              perHourRate: item.empl?.hrRate || "",
              isRev: item.empl?.isRev || false,
              isBrd: item.empl?.isBrd || false,
              status: item.empl?.status || "Act",
              type: item.empl?.type || "",
              category: item.empl?.category || "",
              dctId: item.dctId || 0,
              plId: item.pl_ID || 0,
              plForecasts: item.empl?.plForecasts || [],
            },
          }));
          setEmployees(updatedEmployees);
        }
        setInputValues({});
        setNewEntryPeriodAmounts({});
      } catch (err) {
        setError("Failed to load data. Please try again.");
        if (err.response && err.response.status === 500) {
          setEmployees([]);
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

    fetchData();
  }, [startDate, endDate, planId, refreshKey]); // Added propFiscalYear for refetch on fiscal year change

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!projectId) {
        console.warn("projectId is undefined, skipping employee fetch");
        setEmployeeSuggestions([]);
        return;
      }
      if (!showNewForm) {
        console.log("New entry form is not open, skipping employee fetch");
        setEmployeeSuggestions([]);
        return;
      }
      console.log(`Fetching employees for projectId: ${projectId}`);
      try {
        const endpoint =
          newEntry.idType === "Vendor" || newEntry.idType === "Vendor Employee"
            ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
            : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
        const response = await axios.get(endpoint);
        console.log("Employee suggestions response:", response.data);
        const suggestions = Array.isArray(response.data)
          ? response.data.map((emp) => {
              if (newEntry.idType === "Vendor") {
                return {
                  emplId: emp.vendId,
                  firstName: "",
                  lastName: emp.employeeName || "",
                };
              } else if (newEntry.idType === "Vendor Employee") {
                return {
                  emplId: emp.empId,
                  firstName: "",
                  lastName: emp.employeeName || "",
                };
              } else {
                const [lastName, firstName] = (emp.employeeName || "")
                  .split(", ")
                  .map((str) => str.trim());
                return {
                  emplId: emp.empId,
                  firstName: firstName || "",
                  lastName: lastName || "",
                };
              }
            })
          : [];
        setEmployeeSuggestions(suggestions);
        console.log("Updated employeeSuggestions:", suggestions);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setEmployeeSuggestions([]);
        toast.error(
          `Failed to fetch ${
            newEntry.idType === "Vendor" ||
            newEntry.idType === "Vendor Employee"
              ? "vendor "
              : ""
          }employee suggestions${
            projectId
              ? " for project ID " + projectId
              : ". Project ID is missing."
          }`,
          {
            toastId: "employee-fetch-error",
            autoClose: 3000,
          }
        );
      }
    };

    const fetchNonLaborAccounts = async () => {
      if (!projectId) {
        console.warn(
          "projectId is undefined, skipping non-labor accounts fetch"
        );
        setNonLaborAccounts([]);
        return;
      }
      if (!showNewForm) {
        console.log(
          "New entry form is not open, skipping non-labor accounts fetch"
        );
        setNonLaborAccounts([]);
        return;
      }
      console.log(`Fetching non-labor accounts for projectId: ${projectId}`);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
        );
        console.log("Non-labor accounts response:", response.data);
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        const accounts = Array.isArray(data.nonLaborAccounts)
          ? data.nonLaborAccounts.map((account) => ({ id: account }))
          : [];
        setNonLaborAccounts(accounts);
        console.log("Updated nonLaborAccounts:", accounts);
      } catch (err) {
        console.error("Error fetching non-labor accounts:", err);
        setNonLaborAccounts([]);
        toast.error(
          `Failed to fetch non-labor accounts${
            projectId
              ? " for project ID " + projectId
              : ". Project ID is missing."
          }`,
          {
            toastId: "non-labor-accounts-error",
            autoClose: 3000,
          }
        );
      }
    };

    if (showNewForm) {
      fetchEmployees();
      fetchNonLaborAccounts();
    } else {
      setEmployeeSuggestions([]);
      setNonLaborAccounts([]);
    }
  }, [projectId, showNewForm, newEntry.idType]);

  const handleIdChange = (value) => {
    console.log("handleIdChange called with value:", value);
    const selectedEmployee = employeeSuggestions.find(
      (emp) => emp.emplId === value
    );
    console.log("Selected employee:", selectedEmployee);
    setNewEntry((prev) => ({
      ...prev,
      id: value,
      firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
      lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
      acctId: nonLaborAccounts.length > 0 ? nonLaborAccounts[0].id : "",
    }));
  };

  const handleRowFieldChange = (rowIdx, field, value) => {
    if (!isBudPlan || !isEditable) return;
    setEditedRowData((prev) => ({
      ...prev,
      [rowIdx]: {
        ...prev[rowIdx],
        [field]: value,
      },
    }));
  };

  const handleRowFieldBlur = async (rowIdx, emp) => {
    if (!isBudPlan || !isEditable) return;
    if (!emp || !emp.emple) {
      toast.error("Employee data is missing for update.");
      return;
    }

    const edited = editedRowData[rowIdx] || {};
    if (
      edited.acctId === undefined &&
      edited.orgId === undefined &&
      edited.isRev === undefined &&
      edited.isBrd === undefined
    )
      return;

    const payload = {
      dctId: emp.emple.dctId || 0,
      plId: emp.emple.plId || 0,
      accId: edited.acctId !== undefined ? edited.acctId : emp.emple.accId, 
      orgId: edited.orgId !== undefined ? edited.orgId : emp.emple.orgId,
      type: emp.emple.type || "",
      category: emp.emple.category || "",
      amountType: emp.emple.amountType || "",
      id: emp.emple.emplId || "",
      isRev: edited.isRev !== undefined ? edited.isRev : emp.emple.isRev,
      isBrd: edited.isBrd !== undefined ? edited.isBrd : emp.emple.isBrd,
      createdBy: emp.emple.createdBy || "System",
      lastModifiedBy: "System",
    };

    try {
      await axios.put(
        "https://test-api-3tmq.onrender.com/DirectCost/UpdateDirectCost",
        { ...payload, acctId: payload.accId },
        { headers: { "Content-Type": "application/json" } }
      );
      setEditedRowData((prev) => {
        const newData = { ...prev };
        delete newData[rowIdx];
        return newData;
      });
      setEmployees((prev) => {
        const updated = [...prev];
        updated[rowIdx] = {
          ...updated[rowIdx],
          emple: {
            ...updated[rowIdx].emple,
            ...payload,
          },
        };
        return updated;
      });
      toast.success("Employee updated successfully!", {
        toastId: `employee-update-${rowIdx}`,
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(
        "Failed to update row: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const getEmployeeRow = (emp, idx) => {
    const monthAmounts = getMonthAmounts(emp);
    const totalAmount = sortedDurations.reduce((sum, duration) => {
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      const inputValue = inputValues[`${idx}_${uniqueKey}`];
      const forecastValue = monthAmounts[uniqueKey]?.value;
      const value =
        inputValue !== undefined && inputValue !== ""
          ? inputValue
          : forecastValue;
      return sum + (value && !isNaN(value) ? Number(value) : 0);
    }, 0);

    return {
      idType: emp.emple.type || "Employee",
      emplId: emp.emple.emplId || "-",
      name:
        emp.emple.category || emp.emple.firstName || emp.emple.lastName
          ? emp.emple.category ||
            `${emp.emple.lastName || ""}${
              emp.emple.firstName && emp.emple.lastName ? ", " : ""
            }${emp.emple.firstName || ""}`
          : "-",
      acctId: emp.emple.accId || "-",
      orgId: emp.emple.orgId || "-",
      isRev: emp.emple.isRev ? (
        <span className="text-green-600 font-sm text-xl">✓</span>
      ) : (
        "-"
      ),
      isBrd: emp.emple.isBrd ? (
        <span className="text-green-600 font-sm text-xl">✓</span>
      ) : (
        "-"
      ),
      status: emp.emple.status || "Act",
      total: totalAmount.toFixed(2) || "-",
    };
  };

  const getMonthAmounts = (emp) => {
    const monthAmounts = {};
    if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
      emp.emple.plForecasts.forEach((forecast) => {
        const uniqueKey = `${forecast.month}_${forecast.year}`;
        // Use actualhours for EAC, forecastedhours otherwise
        const value =
          planType === "EAC" && forecast.actualamt !== undefined
            ? forecast.actualamt
            : forecast.forecastedamt ?? 0;
        monthAmounts[uniqueKey] = { value, ...forecast };
      });
    }
    return monthAmounts;
  };

  const handleInputChange = (empIdx, uniqueKey, newValue) => {
    if (!isEditable) return;
    const currentDuration = sortedDurations.find(
      (d) => `${d.monthNo}_${d.year}` === uniqueKey
    );
    if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
      toast.warn("Cannot edit amounts for a closed period.", {
        toastId: "closed-period-warning",
        autoClose: 3000,
      });
      return;
    }
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      console.log(
        `Updating inputValues for ${empIdx}_${uniqueKey}: ${newValue}`
      );
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: newValue,
      }));
    }
  };

  const handleForecastAmountBlur = async (empIdx, uniqueKey, value) => {
    if (!isEditable) return;
    const newValue = value === "" ? 0 : Number(value);
    const emp = employees[empIdx];
    const monthAmounts = getMonthAmounts(emp);
    const forecast = monthAmounts[uniqueKey];
    const originalForecastedAmount = forecast?.forecastedamt ?? 0;
    const currentDuration = sortedDurations.find(
      (d) => `${d.monthNo}_${d.year}` === uniqueKey
    );

    console.log(
      `handleForecastAmountBlur: empIdx=${empIdx}, uniqueKey=${uniqueKey}, newValue=${newValue}, original=${originalForecastedAmount}, month=${currentDuration?.monthNo}, year=${currentDuration?.year}`
    );

    if (newValue === originalForecastedAmount) {
      console.log("No change in forecast amount, skipping API call");
      return;
    }

    if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
      console.log(`Cannot edit ${uniqueKey}: period closed`);
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
      }));
      toast.warn("Cannot edit amounts for a closed period.", {
        toastId: "closed-period-warning",
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      forecastedamt: Number(newValue) || 0,
      forecastid: Number(forecast?.forecastid ?? 0),
      projId: forecast?.projId ?? projectId,
      plId: forecast?.plId ?? planId,
      emplId: forecast?.emplId ?? emp.emple.emplId,
      dctId: forecast?.dctId ?? 0,
      month: forecast?.month ?? currentDuration.monthNo,
      year: forecast?.year ?? currentDuration.year,
      totalBurdenCost: forecast?.totalBurdenCost ?? 0,
      burden: forecast?.burden ?? 0,
      ccffRevenue: forecast?.ccffRevenue ?? 0,
      tnmRevenue: forecast?.tnmRevenue ?? 0,
      cost: forecast?.cost ?? 0,
      fringe: forecast?.fringe ?? 0,
      overhead: forecast?.overhead ?? 0,
      gna: forecast?.gna ?? 0,
      ...(planType === "EAC"
        ? { actualamt: Number(newValue) || 0 }
        : { forecastedamt: Number(newValue) || 0 }),
      createdat: forecast?.createdat ?? new Date(0).toISOString(),
      updatedat: new Date().toISOString().split("T")[0],
      displayText: forecast?.displayText ?? "",
    };

    console.log("UpdateForecastAmount payload:", payload);

    try {
      const response = await axios.put(
        `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccessMessageText("Forecast updated!");
      setShowSuccessMessage(true);
      toast.success("Forecast amount updated successfully!", {
        toastId: "forecast-update-success",
        autoClose: 3000,
      });

      // Update local state with the response data for consistency
      setEmployees((prev) => {
        const updated = [...prev];
        const updatedEmp = { ...updated[empIdx] };
        const updatedForecasts = [...(updatedEmp.emple.plForecasts || [])];
        const forecastIndex = updatedForecasts.findIndex(
          (f) => f.month === payload.month && f.year === payload.year
        );
        const updatedForecast = response.data; // Assume API returns the updated forecast
        if (forecastIndex >= 0) {
          updatedForecasts[forecastIndex] = {
            ...updatedForecasts[forecastIndex],
            ...updatedForecast,
            value: planType === "EAC" ? updatedForecast.actualamt : updatedForecast.forecastedamt,
          };
        } else {
          updatedForecasts.push({
            ...updatedForecast,
            value: planType === "EAC" ? updatedForecast.actualamt : updatedForecast.forecastedamt,
          });
        }
        updatedEmp.emple = {
          ...updatedEmp.emple,
          plForecasts: updatedForecasts,
        };
        updated[empIdx] = updatedEmp;
        return updated;
      });

      // Clear the input value after successful update
      setInputValues((prev) => {
        const newInputs = { ...prev };
        delete newInputs[`${empIdx}_${uniqueKey}`];
        return newInputs;
      });

      // Trigger refetch to ensure UI syncs with server (like in ProjectHoursDetails)
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (err) {
      console.error("API error:", err.response?.data || err);
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
      }));
      setSuccessMessageText("Failed to update forecast.");
      setShowSuccessMessage(true);
      toast.error(
        "Failed to update forecast amount: " +
          (err.response?.data?.message || err.message),
        {
          toastId: "forecast-update-error",
          autoClose: 3000,
        }
      );
    } finally {
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  const handleFillValues = async () => {
    if (!showNewForm || !isEditable) return;

    const newAmounts = {};
    if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
      const sourceEmp = employees[sourceRowIndex];
      const sourceMonthAmounts = getMonthAmounts(sourceEmp);
      sortedDurations.forEach((duration) => {
        const uniqueKey = `${duration.monthNo}_${duration.year}`;
        if (
          planType === "EAC" &&
          !isMonthEditable(duration, closedPeriod, planType)
        ) {
          newAmounts[uniqueKey] = newEntryPeriodAmounts[uniqueKey] || "0";
        } else {
          newAmounts[uniqueKey] =
            sourceMonthAmounts[uniqueKey]?.value?.toString() || "0";
        }
      });
    }

    setNewEntryPeriodAmounts((prev) => ({ ...prev, ...newAmounts }));
    setShowFillValues(false);
    setFillMethod("None");
    setSourceRowIndex(null);
  };

  const handleSaveNewEntry = async () => {
    if (!planId) {
      toast.error("Plan ID is required to save a new entry.", {
        toastId: "no-plan-id",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    const payloadForecasts = durations.map((duration) => ({
      forecastedamt:
        Number(newEntryPeriodAmounts[`${duration.monthNo}_${duration.year}`]) ||
        0,
      forecastid: 0,
      projId: projectId,
      plId: planId,
      emplId: newEntry.id,
      dctId: 0,
      month: duration.monthNo,
      year: duration.year,
      totalBurdenCost: 0,
      fees: 0,
      burden: 0,
      ccffRevenue: 0,
      tnmRevenue: 0,
      revenue: 0,
      cost: 0,
      fringe: 0,
      overhead: 0,
      gna: 0,
      forecastedhours: 0,
      updatedat: new Date().toISOString().split("T")[0],
      displayText: "",
      acctId: newEntry.acctId,
      orgId: newEntry.orgId,
      hrlyRate: Number(newEntry.perHourRate) || 0,
      // effectDt: new Date().toISOString(),
      effectDt: null,
    }));

    const payload = {
      dctId: 0,
      plId: planId,
      acctId: newEntry.acctId || "",
      orgId: newEntry.orgId || "",
      notes: "",
      category: newEntry.name || "Test",
      amountType: "",
      id: newEntry.id,
      type: newEntry.idType || "Employee",
      isRev: newEntry.isRev || false,
      isBrd: newEntry.isBrd || false,
      status: newEntry.status || "Act",
      createdBy: "System",
      lastModifiedBy: "System",
      plForecasts: payloadForecasts,
      plDct: {},
    };

    console.log("AddNewDirectCost payload for new entry:", payload);

    try {
      const response = await axios.post(
        "https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Save response:", response.status, response.data);

      const newEmployee = {
        emple: {
          empleId: newEntry.id,
          emplId: newEntry.id,
          firstName: newEntry.firstName || "",
          lastName: newEntry.lastName || "",
          accId: newEntry.acctId || "",
          orgId: newEntry.orgId || "",
          perHourRate: Number(newEntry.perHourRate) || 0,
          isRev: newEntry.isRev || false,
          isBrd: newEntry.isBrd || false,
          status: newEntry.status || "Act",
          type: newEntry.idType || "Employee",
          plForecasts: payloadForecasts.map((forecast) => ({
            ...forecast,
            forecastid:
              response.data?.plForecasts?.find(
                (f) => f.month === forecast.month && f.year === forecast.year
              )?.forecastid || 0,
            createdat: new Date().toISOString(),
          })),
        },
      };

      setEmployees((prevEmployees) => {
        const employeeMap = new Map();
        prevEmployees.forEach((emp) => {
          const emplId = emp.emple.emplId || `auto-${Math.random()}`;
          employeeMap.set(emplId, emp);
        });
        employeeMap.set(newEntry.id, newEmployee);
        return Array.from(employeeMap.values());
      });

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
        perHourRate: "",
        status: "Act",
      });
      // setNewEntryPeriodAmounts({});
      setEmployeeSuggestions([]);
      setNonLaborAccounts([]);

      if (onSaveSuccess) {
        console.log("Calling onSaveSuccess");
        onSaveSuccess();
      }

      toast.success("New entry saved and added to table!", {
        toastId: "save-entry-success",
        autoClose: 3000,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.errors
        ? Object.entries(err.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("; ")
        : err.response?.data?.message || err.message;
      console.error("Save error:", err.response?.data || err);
      setSuccessMessageText("Failed to save entry.");
      setShowSuccessMessage(true);
      toast.error(`Failed to save new entry: ${errorMessage}`, {
        toastId: "save-entry-error",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  const handleRowClick = (actualEmpIdx) => {
    if (!isEditable) return;
    setSelectedRowIndex(
      actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
    );
    setSelectedColumnKey(null);
    setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
    if (showNewForm) setSourceRowIndex(actualEmpIdx);
  };

  const handleColumnHeaderClick = (uniqueKey) => {
    if (!isEditable) return;
    setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
    setSelectedRowIndex(null);
    setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
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

  // Show loading state
  setIsLoading(true);

  const updates = [];
  const updatedInputValues = { ...inputValues };
  let replacementsCount = 0;
  let skippedCount = 0;

  for (const empIdx in employees) {
    const emp = employees[empIdx];
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
      
      // Get the actual displayed value
      let displayedValue;
      if (inputValues[currentInputKey] !== undefined) {
        displayedValue = String(inputValues[currentInputKey]);
      } else {
        const monthAmounts = getMonthAmounts(emp);
        const forecast = monthAmounts[uniqueKey];
        if (forecast && forecast.value !== undefined) {
          displayedValue = String(forecast.value);
        } else {
          displayedValue = "0";
        }
      }

      const findValueTrimmed = findValue.trim();
      const displayedValueTrimmed = displayedValue.trim();
      
      // Matching logic
      let isMatch = false;
      
      if (findValueTrimmed === "0") {
        const numValue = parseFloat(displayedValueTrimmed);
        isMatch = displayedValueTrimmed === "" || 
                 displayedValueTrimmed === "0" || 
                 (!isNaN(numValue) && numValue === 0);
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
        const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

        const forecast = getMonthAmounts(emp)[uniqueKey];
        
        // Only proceed if we have a valid forecast with forecastid
        if (forecast && forecast.forecastid) {
          const originalValue = planType === "EAC" 
            ? (forecast.actualamt ?? 0) 
            : (forecast.forecastedamt ?? 0);

          if (newNumericValue !== originalValue) {
            updatedInputValues[currentInputKey] = newValue;
            replacementsCount++;

            const payload = {
              forecastid: Number(forecast.forecastid),
              projId: forecast.projId || projectId,
              plId: forecast.plId || planId,
              emplId: forecast.emplId || "",
              dctId: forecast.dctId || 0,
              month: forecast.month || duration.monthNo,
              year: forecast.year || duration.year,
              totalBurdenCost: forecast.totalBurdenCost || 0,
              burden: forecast.burden || 0,
              ccffRevenue: forecast.ccffRevenue || 0,
              tnmRevenue: forecast.tnmRevenue || 0,
              cost: forecast.cost || 0,
              fringe: forecast.fringe || 0,
              overhead: forecast.overhead || 0,
              gna: forecast.gna || 0,
              forecastedhours: forecast.forecastedhours || 0,
              updatedat: new Date().toISOString().split("T")[0],
              displayText: forecast.displayText || "",
              [planType === "EAC" ? "actualamt" : "forecastedamt"]: newNumericValue,
            };
            
            updates.push(
              axios
                .put(
                  `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastAmount/${planType}`,
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
          // Skip cells without existing forecasts and count them
          console.log(`Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`);
          skippedCount++;
        }
      }
    }
  }

  console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

  setInputValues(updatedInputValues);
  try {
    if (updates.length > 0) {
      await Promise.all(updates);
    }
    
    // Update local state only for cells that were actually updated
    setEmployees((prev) => {
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
                const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
                if (planType === "EAC") {
                  forecast.actualamt = newValue;
                } else {
                  forecast.forecastedamt = newValue;
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
      "Failed to replace values: " + (err.response?.data?.message || err.message),
      {
        toastId: "replace-error",
        autoClose: 3000,
      }
    );
  } finally {
    // Hide loading state
    setIsLoading(false);
    setShowFindReplace(false);
    setFindValue("");
    setReplaceValue("");
    setSelectedRowIndex(null);
    setSelectedColumnKey(null);
    setReplaceScope("all");
  }
};

  const showHiddenRows = () => setHiddenRows({});

  const sortedDurations =
    propFiscalYear && propFiscalYear !== "All"
      ? durations
          .filter((d) => d.year === parseInt(propFiscalYear))
          .sort(
            (a, b) =>
              new Date(a.year, a.monthNo - 1, 1) -
              new Date(b.year, b.monthNo - 1, 1)
          )
      : durations.sort(
          (a, b) =>
            new Date(a.year, a.monthNo - 1, 1) -
            new Date(b.year, b.monthNo - 1, 1)
        );

  if (isLoading) {
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
    employees.filter((_, idx) => !hiddenRows[idx]).length +
      (showNewForm ? 1 : 0),
    2
  );

  return (
    <div className="relative p-4 font-inter w-full synchronized-tables-outer">
      {/* <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2> */}
      <div className="w-full flex justify-between mb-4 gap-2">
        <div className="flex-grow"></div>
        <div className="flex gap-2">
          {Object.values(hiddenRows).some(Boolean) && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
              onClick={showHiddenRows}
            >
              Show Hidden Rows
            </button>
          )}
          {isEditable && (
            <>
              <button
                onClick={() => setShowNewForm((prev) => !prev)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
              >
                {showNewForm ? "Cancel" : "New"}
              </button>
              {!showNewForm && ( // Hide Find/Replace while creating new entry
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
                  onClick={() => isEditable && setShowFindReplace(true)}
                >
                  Find / Replace
                </button>
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
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Start Period
              </label>
              <input
                type="text"
                value={startDate}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                End Period
              </label>
              <input
                type="text"
                value={endDate}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowFillValues(false);
                  setFillMethod("None");
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

      {employees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
          No forecast data available for this plan.
        </div>
      ) : (
        <div className="synchronized-tables-container">
          <div className="synchronized-table-scroll">
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
                      className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px]
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
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <select
                        name="idType"
                        value={newEntry.idType || ""}
                        onChange={(e) =>
                          setNewEntry({ ...newEntry, idType: e.target.value })
                        }
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
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <input
                        type="text"
                        name="id"
                        value={newEntry.id}
                        onChange={(e) => handleIdChange(e.target.value)}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        list="employee-id-list"
                        placeholder="Enter ID"
                      />
                      <datalist id="employee-id-list">
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
                      </datalist>
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <input
                        type="text"
                        name="name"
                        value={
                          newEntry.lastName && newEntry.firstName
                            ? `${newEntry.lastName}, ${newEntry.firstName}`
                            : newEntry.lastName || newEntry.firstName || ""
                        }
                        readOnly
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
                        placeholder="Name (auto-filled)"
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <input
                        type="text"
                        name="acctId"
                        value={newEntry.acctId}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, acctId: e.target.value })
                        }
                        className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                          !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        list="account-list"
                        placeholder="Enter Account"
                        readOnly={!isBudPlan}
                      />
                      <datalist id="account-list">
                        {nonLaborAccounts.map((account, index) => (
                          <option
                            key={`${account.id}-${index}`}
                            value={account.id}
                          >
                            {account.id}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <input
                        type="text"
                        name="orgId"
                        value={newEntry.orgId}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, orgId: e.target.value })
                        }
                        className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                          !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        placeholder="Enter Organization"
                        readOnly={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5 text-center">
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <input
                        type="checkbox"
                        name="isRev"
                        checked={newEntry.isRev}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, isRev: e.target.checked })
                        }
                        className={`w-4 h-4 ${
                          !isBudPlan ? "cursor-not-allowed" : ""
                        }`}
                        disabled={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5 text-center">
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      <input
                        type="checkbox"
                        name="isBrd"
                        checked={newEntry.isBrd}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, isBrd: e.target.checked })
                        }
                        className={`w-4 h-4 ${
                          !isBudPlan ? "cursor-not-allowed" : ""
                        }`}
                        disabled={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
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
                      {" "}
                      {/* Changed px-2 to px-1.5 */}
                      {Object.values(newEntryPeriodAmounts)
                        .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                )}
                {employees
                  .filter((_, idx) => !hiddenRows[idx])
                  .map((emp, idx) => {
                    const actualEmpIdx = employees.findIndex((e) => e === emp);
                    const row = getEmployeeRow(emp, actualEmpIdx);
                    const uniqueRowKey = `${
                      emp.emple.emplId || "emp"
                    }-${actualEmpIdx}`;
                    return (
                      <tr
                        key={uniqueRowKey}
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
                        {EMPLOYEE_COLUMNS.map((col) => {
                          if (isBudPlan && isEditable) {
                            if (col.key === "acctId") {
                              return (
                                <td
                                  key={`${uniqueRowKey}-acctId`}
                                  className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
                                >
                                  {" "}
                                  {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
                                  <input
                                    type="text"
                                    value={
                                      editedRowData[actualEmpIdx]?.acctId !==
                                      undefined
                                        ? editedRowData[actualEmpIdx].acctId
                                        : row.acctId
                                    }
                                    onChange={(e) =>
                                      handleRowFieldChange(
                                        actualEmpIdx,
                                        "acctId",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() =>
                                      handleRowFieldBlur(actualEmpIdx, emp)
                                    }
                                    className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                                  />
                                </td>
                              );
                            }
                            if (col.key === "orgId") {
                              return (
                                <td
                                  key={`${uniqueRowKey}-orgId`}
                                  className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
                                >
                                  {" "}
                                  {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
                                  <input
                                    type="text"
                                    value={
                                      editedRowData[actualEmpIdx]?.orgId !==
                                      undefined
                                        ? editedRowData[actualEmpIdx].orgId
                                        : row.orgId
                                    }
                                    onChange={(e) =>
                                      handleRowFieldChange(
                                        actualEmpIdx,
                                        "orgId",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() =>
                                      handleRowFieldBlur(actualEmpIdx, emp)
                                    }
                                    className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                                  />
                                </td>
                              );
                            }
                            if (col.key === "isRev") {
                              return (
                                <td
                                  key={`${uniqueRowKey}-isRev`}
                                  className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
                                >
                                  {" "}
                                  {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
                                  <input
                                    type="checkbox"
                                    checked={
                                      editedRowData[actualEmpIdx]?.isRev !==
                                      undefined
                                        ? editedRowData[actualEmpIdx].isRev
                                        : emp.emple.isRev
                                    }
                                    onChange={(e) =>
                                      handleRowFieldChange(
                                        actualEmpIdx,
                                        "isRev",
                                        e.target.checked
                                      )
                                    }
                                    onBlur={() =>
                                      handleRowFieldBlur(actualEmpIdx, emp)
                                    }
                                    className="w-4 h-4"
                                  />
                                </td>
                              );
                            }
                            if (col.key === "isBrd") {
                              return (
                                <td
                                  key={`${uniqueRowKey}-isBrd`}
                                  className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center"
                                >
                                  {" "}
                                  {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
                                  <input
                                    type="checkbox"
                                    checked={
                                      editedRowData[actualEmpIdx]?.isBrd !==
                                      undefined
                                        ? editedRowData[actualEmpIdx].isBrd
                                        : emp.emple.isBrd
                                    }
                                    onChange={(e) =>
                                      handleRowFieldChange(
                                        actualEmpIdx,
                                        "isBrd",
                                        e.target.checked
                                      )
                                    }
                                    onBlur={() =>
                                      handleRowFieldBlur(actualEmpIdx, emp)
                                    }
                                    className="w-4 h-4"
                                  />
                                </td>
                              );
                            }
                          }
                          return (
                            <td
                              key={`${uniqueRowKey}-${col.key}`}
                              className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]"
                            >
                              {" "}
                              {/* Changed p-2 to p-1.5, min-w-[80px] to min-w-[70px] */}
                              {row[col.key]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="synchronized-table-scroll">
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
                          /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
                          selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
                        }`}
                        style={{ cursor: isEditable ? "pointer" : "default" }}
                        onClick={() => handleColumnHeaderClick(uniqueKey)}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
                            {duration.month}
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
                            /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
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
                            value={newEntryPeriodAmounts[uniqueKey] || ""}
                            onChange={(e) =>
                              isInputEditable &&
                              setNewEntryPeriodAmounts((prev) => ({
                                ...prev,
                                [uniqueKey]: e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                ),
                              }))
                            }
                            className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
                              /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
                              !isInputEditable
                                ? "cursor-not-allowed text-gray-400"
                                : "text-gray-700"
                            }`}
                            disabled={!isInputEditable}
                            placeholder="Enter Amount"
                          />
                        </td>
                      );
                    })}
                  </tr>
                )}
                {employees
                  .filter((_, idx) => !hiddenRows[idx])
                  .map((emp, idx) => {
                    const actualEmpIdx = employees.findIndex((e) => e === emp);
                    const monthAmounts = getMonthAmounts(emp);
                    const uniqueRowKey = `${
                      emp.emple.emplId || "emp"
                    }-${actualEmpIdx}`;
                    return (
                      <tr
                        key={uniqueRowKey}
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
                          const forecast = monthAmounts[uniqueKey];
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
                              key={`${uniqueRowKey}-${uniqueKey}`}
                              className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
                                /* Changed py-2 px-3 to px-2 py-1.5, min-w-[100px] to min-w-[80px] */
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
                                  /* Changed w-[55px] h-[20px] to w-[50px] h-[18px] */
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
                                  handleForecastAmountBlur(
                                    actualEmpIdx,
                                    uniqueKey,
                                    e.target.value
                                  )
                                }
                                disabled={!isInputEditable}
                                placeholder="Enter Amount"
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
      )}

      {showFindReplace && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
            <h3 className="text-lg font-semibold mb-4">
              Find and Replace Amounts
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
                      ? employees[selectedRowIndex]?.emple.emplId
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs cursor-pointer"
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
