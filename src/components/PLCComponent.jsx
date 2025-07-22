// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
//   const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
//   const [newRate, setNewRate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [editBillRate, setEditBillRate] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
//   const [newEmployeeRate, setNewEmployeeRate] = useState(null);
//   const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
//   const [editEmployeeFields, setEditEmployeeFields] = useState({});
//   const [editingEmployeeRowId, setEditingEmployeeRowId] = useState(null);
//   const [vendorBillingRates, setVendorBillingRates] = useState([]);
//   const [newVendorRate, setNewVendorRate] = useState(null);
//   const [editVendorBillRate, setEditVendorBillRate] = useState({});
//   const [editVendorFields, setEditVendorFields] = useState({});
//   const [editingVendorRowId, setEditingVendorRowId] = useState(null);
//   const [plcs, setPlcs] = useState([]);
//   const [plcSearch, setPlcSearch] = useState("");
//   const [vendorEmployees, setVendorEmployees] = useState([]);

//   const lookupTypeOptions = ["Select", "Employee", "Contract Employee"];
//   const rateTypeOptions = ["Select", "Billing", "Actual"];
//   const vendorLookupTypeOptions = ["Select", "Vendor", "Employee"];

//   // Fetch billing rates schedule based on selected project ID
//   useEffect(() => {
//     const fetchBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
//         );
//         const filteredData = response.data.filter((item) =>
//           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//         );
//         setBillingRatesSchedule(
//           filteredData.map((item) => ({
//             id: item.id,
//             plc: item.laborCategoryCode,
//             billRate: item.billingRate,
//             rateType: item.rateType || "Select",
//             startDate: item.effectiveDate
//               ? item.effectiveDate.split("T")[0]
//               : "",
//             endDate: item.endDate ? item.endDate.split("T")[0] : null,
//           }))
//         );
//         const newEditBillRate = {};
//         filteredData.forEach((item) => {
//           newEditBillRate[item.id] = item.billingRate;
//         });
//         setEditBillRate(newEditBillRate);
//       } catch (error) {
//         console.error("Error fetching billing rates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBillingRates();
//   }, [selectedProjectId]);

//   // Fetch employees for the selected project
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (
//         !selectedProjectId ||
//         typeof selectedProjectId !== "string" ||
//         selectedProjectId.trim() === ""
//       ) {
//         setEmployees([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
//         );
//         setEmployees(
//           response.data.map((item) => ({
//             empId: item.empId,
//             employeeName: item.employeeName,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         setEmployees([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, [selectedProjectId]);

//   // Fetch PLCs for search
//   useEffect(() => {
//     const fetchPlcs = async () => {
//       if (!plcSearch) return;
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
//         );
//         const filteredPlcs = response.data
//           .filter((item) =>
//             item.laborCategoryCode
//               .toLowerCase()
//               .includes(plcSearch.toLowerCase())
//           )
//           .map((item) => ({
//             laborCategoryCode: item.laborCategoryCode,
//             description: item.description || "",
//           }));
//         setPlcs(filteredPlcs);
//       } catch (error) {
//         console.error("Error fetching PLCs:", error);
//       }
//     };
//     fetchPlcs();
//   }, [plcSearch]);

//   // Fetch employee billing rates
//   useEffect(() => {
//     const fetchEmployeeBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/ProjEmplRt`
//         );
//         const filteredData = response.data.filter(
//           (item) =>
//             item.projId
//               .toLowerCase()
//               .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//         );
//         setEmployeeBillingRates(
//           filteredData.map((item) => ({
//             id: item.projEmplRtKey || item.id,
//             lookupType: item.type,
//             empId: item.emplId,
//             employeeName:
//               item.employeeName ||
//               employees.find((emp) => emp.empId === item.emplId)
//                 ?.employeeName ||
//               "",
//             plc: item.billLabCatCd,
//             plcDescription: item.plcDescription || "",
//             billRate: item.billRtAmt,
//             rateType: item.sBillRtTypeCd,
//             startDate: item.startDt ? item.startDt.split("T")[0] : "",
//             endDate: item.endDt ? item.endDt.split("T")[0] : null,
//           }))
//         );
//         const newEditEmployeeBillRate = {};
//         const newEditEmployeeFields = {};
//         filteredData.forEach((item) => {
//           const id = item.projEmplRtKey || item.id;
//           if (id) {
//             newEditEmployeeBillRate[id] = item.billRtAmt;
//             newEditEmployeeFields[id] = {
//               lookupType: item.type,
//               rateType: item.sBillRtTypeCd,
//               startDate: item.startDt ? item.startDt.split("T")[0] : "",
//               endDate: item.endDt ? item.endDt.split("T")[0] : null,
//             };
//           }
//         });
//         setEditEmployeeBillRate(newEditEmployeeBillRate);
//         setEditEmployeeFields(newEditEmployeeFields);
//       } catch (error) {
//         console.error("Error fetching employee billing rates:", error);
//         setEmployeeBillingRates([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployeeBillingRates();
//   }, [selectedProjectId, employees]);

//   // Fetch vendor billing rates
//   useEffect(() => {
//     const fetchVendorBillingRates = async () => {
//       if (!selectedProjectId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/ProjVendRt`
//         );
//         const filteredData = response.data.filter((item) =>
//           item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//         );
//         setVendorBillingRates(
//           filteredData.map((item) => ({
//              id: item.projVendRtKey || item.id,
//             lookupType: item.type,
//             vendorId: item.vendId || "",
//             vendorName: item.vendorName || "",
//             vendorEmployee: item.vendEmplId || "",
//             vendorEmployeeName: item.vendEmplName || "",
//             plc: item.billLabCatCd,
//             plcDescription: item.plcDescription || item.description || "",
//             billRate: item.billRtAmt,
//             rateType: item.sBillRtTypeCd,
//             startDate: new Date(item.startDt).toISOString().split("T")[0],
//             endDate: item.endDt
//               ? new Date(item.endDt).toISOString().split("T")[0]
//               : null,
//           }))
//         );
//         const newEditVendorBillRate = {};
//         const newEditVendorFields = {};
//         filteredData.forEach((item) => {
//           newEditVendorBillRate[item.id] = item.billRtAmt;
//           newEditVendorFields[item.id] = {
//             lookupType: item.type,
//             rateType: item.sBillRtTypeCd,
//             startDate: new Date(item.startDt).toISOString().split("T")[0],
//             endDate: item.endDt
//               ? new Date(item.endDt).toISOString().split("T")[0]
//               : null,
//           };
//         });
//         setEditVendorBillRate(newEditVendorBillRate);
//         setEditVendorFields(newEditVendorFields);
//       } catch (error) {
//         console.error("Error fetching vendor billing rates:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVendorBillingRates();
//   }, [selectedProjectId]);

//   const handleUpdate = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       await axios.put(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
//         {
//           id,
//           projId: selectedProjectId,
//           laborCategoryCode: updatedData.plc,
//           costRate: parseFloat(updatedData.billRate) * 0.65,
//           billingRate: parseFloat(updatedData.billRate),
//           effectiveDate: updatedData.startDate,
//           endDate: updatedData.endDate || null,
//           rateType: updatedData.rateType,
//           isActive: true,
//           modifiedBy: "admin",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       );
//       setBillingRatesSchedule((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 plc: updatedData.plc,
//                 billRate: parseFloat(updatedData.billRate),
//                 rateType: updatedData.rateType,
//                 startDate: updatedData.startDate,
//                 endDate: updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
//     } catch (error) {
//       console.error("Error updating billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!selectedProjectId) {
//       setVendorEmployees([]);
//       return;
//     }
//     const fetchVendorEmployees = async () => {
//       try {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${selectedProjectId}`
//         );
//         setVendorEmployees(response.data);
//       } catch (error) {
//         setVendorEmployees([]);
//         console.error("Error fetching vendor employees:", error);
//       }
//     };
//     fetchVendorEmployees();
//   }, [selectedProjectId]);

//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
//       );
//       setBillingRatesSchedule((prev) => prev.filter((rate) => rate.id !== id));
//       setEditBillRate((prev) => {
//         const newEditBillRate = { ...prev };
//         delete newEditBillRate[id];
//         return newEditBillRate;
//       });
//     } catch (error) {
//       console.error("Error deleting billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddRow = () => {
//     setNewRate({
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewRate = async () => {
//     if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
//       console.error(
//         "Please fill all required fields (PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
//         {
//           id: 0,
//           projId: selectedProjectId,
//           laborCategoryCode: newRate.plc,
//           costRate: parseFloat(newRate.billRate) * 0.65,
//           billingRate: parseFloat(newRate.billRate),
//           effectiveDate: newRate.startDate,
//           endDate: newRate.endDate || null,
//           rateType: newRate.rateType,
//           isActive: true,
//           modifiedBy: "admin",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       );
//       setNewRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
//       );
//       const filteredData = fetchResponse.data.filter((item) =>
//         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//       );
//       setBillingRatesSchedule(
//         filteredData.map((item) => ({
//           id: item.id,
//           plc: item.laborCategoryCode,
//           billRate: item.billingRate,
//           rateType: item.rateType,
//           startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
//           endDate: item.endDate ? item.endDate.split("T")[0] : null,
//         }))
//       );
//     } catch (error) {
//       console.error(
//         "Error adding billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewRateChange = (field, value) => {
//     setNewRate((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleBillRateChange = (id, value) => {
//     setEditBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   // Employee Billing Rates Handlers
//   const handleAddEmployeeRow = () => {
//     setNewEmployeeRate({
//       lookupType: "",
//       empId: "",
//       employeeName: "",
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewEmployeeRate = async () => {
//     if (
//       !newEmployeeRate ||
//       !newEmployeeRate.empId ||
//       !newEmployeeRate.plc ||
//       !newEmployeeRate.startDate ||
//       !newEmployeeRate.billRate
//     ) {
//       console.error(
//         "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
//         id: 0,
//         projId: selectedProjectId,
//         emplId: newEmployeeRate.empId,
//         employeeName: newEmployeeRate.employeeName,
//         billLabCatCd: newEmployeeRate.plc,
//         billRtAmt: parseFloat(newEmployeeRate.billRate),
//         startDt: newEmployeeRate.startDate,
//         endDt: newEmployeeRate.endDate || null,
//         sBillRtTypeCd: newEmployeeRate.rateType,
//         type: newEmployeeRate.lookupType,
//         isActive: true,
//         modifiedBy: "admin",
//       });
//       setNewEmployeeRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjEmplRt`
//       );
//       const filteredData = fetchResponse.data.filter(
//         (item) =>
//           item.projId
//             .toLowerCase()
//             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//       );
//       setEmployeeBillingRates(
//         filteredData.map((item) => ({
//           id: item.projEmplRtKey || item.id,
//           lookupType: item.type || "Select",
//           empId: item.emplId,
//           employeeName:
//             item.employeeName ||
//             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
//             "",
//           plc: item.billLabCatCd,
//           plcDescription: item.plcDescription || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: item.startDt ? item.startDt.split("T")[0] : "",
//           endDate: item.endDt ? item.endDt.split("T")[0] : null,
//         }))
//       );
//       const newEditEmployeeBillRate = {};
//       const newEditEmployeeFields = {};
//       filteredData.forEach((item) => {
//         const id = item.projEmplRtKey || item.id;
//         if (id) {
//           newEditEmployeeBillRate[id] = item.billRtAmt;
//           newEditEmployeeFields[id] = {
//             lookupType: item.type || "Select",
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: item.startDt ? item.startDt.split("T")[0] : "",
//             endDate: item.endDt ? item.endDt.split("T")[0] : null,
//           };
//         }
//       });
//       setEditEmployeeBillRate(newEditEmployeeBillRate);
//       setEditEmployeeFields(newEditEmployeeFields);
//     } catch (error) {
//       console.error(
//         "Error adding employee billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmployeeBillRateChange = (id, value) => {
//     setEditEmployeeBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   const handleUpdateEmployee = async (id, updatedData) => {
//     if (!id) {
//       console.error("Invalid ID for update");
//       return;
//     }
//     setLoading(true);
//     try {
//       const fields = editEmployeeFields[id] || {};
//       await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
//         projEmplRtKey: id,
//         projId: selectedProjectId,
//         emplId: updatedData.empId,
//         employeeName: updatedData.employeeName,
//         billLabCatCd: updatedData.plc,
//         billRtAmt: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
//         startDt: fields.startDate || updatedData.startDate,
//         endDt: fields.endDate || updatedData.endDate || null,
//         sBillRtTypeCd: fields.rateType || updatedData.rateType,
//         type: fields.lookupType || updatedData.lookupType,
//         isActive: true,
//         modifiedBy: "admin",
//       });
//       setEmployeeBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 lookupType: fields.lookupType || updatedData.lookupType,
//                 empId: updatedData.empId,
//                 employeeName: updatedData.employeeName,
//                 plc: updatedData.plc,
//                 plcDescription:
//                   plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)
//                     ?.description || updatedData.plcDescription,
//                 billRate: parseFloat(
//                   editEmployeeBillRate[id] || updatedData.billRate
//                 ),
//                 rateType: fields.rateType || updatedData.rateType,
//                 startDate: fields.startDate || updatedData.startDate,
//                 endDate: fields.endDate || updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditEmployeeBillRate((prev) => ({
//         ...prev,
//         [id]: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
//       }));
//       setEditEmployeeFields((prev) => ({
//         ...prev,
//         [id]: {
//           lookupType: fields.lookupType || updatedData.lookupType,
//           rateType: fields.rateType || updatedData.rateType,
//           startDate: fields.startDate || updatedData.startDate,
//           endDate: fields.endDate || updatedData.endDate || null,
//         },
//       }));
//       setEditingEmployeeRowId(null);
//       // Refetch employee billing rates to ensure state consistency after update
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjEmplRt`
//       );
//       const filteredData = fetchResponse.data.filter(
//         (item) =>
//           item.projId
//             .toLowerCase()
//             .startsWith(selectedProjectId.toLowerCase()) && item.emplId
//       );
//       setEmployeeBillingRates(
//         filteredData.map((item) => ({
//           id: item.projEmplRtKey || item.id,
//           lookupType: item.type || "Select",
//           empId: item.emplId,
//           employeeName:
//             item.employeeName ||
//             employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
//             "",
//           plc: item.billLabCatCd,
//           plcDescription: item.plcDescription || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: item.startDt ? item.startDt.split("T")[0] : "",
//           endDate: item.endDt ? item.endDt.split("T")[0] : null,
//         }))
//       );
//       const newEditEmployeeBillRate = {};
//       const newEditEmployeeFields = {};
//       filteredData.forEach((item) => {
//         const id = item.projEmplRtKey || item.id;
//         if (id) {
//           newEditEmployeeBillRate[id] = item.billRtAmt;
//           newEditEmployeeFields[id] = {
//             lookupType: item.type || "Select",
//             rateType: item.sBillRtTypeCd || "Select",
//             startDate: item.startDt ? item.startDt.split("T")[0] : "",
//             endDate: item.endDt ? item.endDt.split("T")[0] : null,
//           };
//         }
//       });
//       setEditEmployeeBillRate(newEditEmployeeBillRate);
//       setEditEmployeeFields(newEditEmployeeFields);
//     } catch (error) {
//       console.error("Error updating employee billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteEmployee = async (id) => {
//     if (!id) {
//       console.error("Invalid ID for deletion");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
//       setEmployeeBillingRates((prev) => prev.filter((rate) => rate.id !== id));
//       setEditEmployeeBillRate((prev) => {
//         const newEditEmployeeBillRate = { ...prev };
//         delete newEditEmployeeBillRate[id];
//         return newEditEmployeeBillRate;
//       });
//       setEditEmployeeFields((prev) => {
//         const newEditEmployeeFields = { ...prev };
//         delete newEditEmployeeFields[id];
//         return newEditEmployeeFields;
//       });
//       setEditingEmployeeRowId(null);
//     } catch (error) {
//       console.error("Error deleting employee billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewEmployeeRateChange = (field, value, id = null) => {
//     if (id) {
//       if (field === "empId") {
//         const selectedEmp = employees.find((emp) => emp.empId === value);
//         setEmployeeBillingRates((prev) =>
//           prev.map((rate) =>
//             rate.id === id
//               ? {
//                   ...rate,
//                   empId: value,
//                   employeeName: selectedEmp
//                     ? selectedEmp.employeeName
//                     : rate.employeeName,
//                 }
//               : rate
//           )
//         );
//       } else {
//         setEditEmployeeFields((prev) => ({
//           ...prev,
//           [id]: {
//             ...prev[id],
//             [field]: value,
//           },
//         }));
//       }
//     } else {
//       const selectedEmp =
//         field === "empId" ? employees.find((emp) => emp.empId === value) : null;
//       setNewEmployeeRate((prev) => ({
//         ...prev,
//         [field]: value,
//         ...(field === "empId" && selectedEmp
//           ? { employeeName: selectedEmp.employeeName }
//           : {}),
//       }));
//     }
//   };

//   // Vendor Billing Rates Handlers
//   const handleAddVendorRow = () => {
//     setNewVendorRate({
//       lookupType: "Select",
//       vendorId: "",
//       vendorName: "",
//       vendorEmployee: "",
//       vendorEmployeeName: "",
//       plc: "",
//       billRate: "",
//       rateType: "Select",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const handleSaveNewVendorRate = async () => {
//     if (
//       !newVendorRate ||
//       !newVendorRate.vendorId ||
//       !newVendorRate.vendorName ||
//       !newVendorRate.plc ||
//       !newVendorRate.startDate ||
//       !newVendorRate.billRate
//     ) {
//       console.error(
//         "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
//       );
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
//         id: 0,
//         projId: selectedPlan?.projId || selectedProjectId,
//         vendId: newVendorRate.vendorId,
//         vendEmplId: newVendorRate.vendorEmployee,
//         billLabCatCd: newVendorRate.plc,
//         billDiscRt: 0,
//         companyId: "1",
//         billRtAmt: parseFloat(newVendorRate.billRate),
//         startDt: new Date(newVendorRate.startDate).toISOString(),
//         endDt: newVendorRate.endDate
//           ? new Date(newVendorRate.endDate).toISOString()
//           : null,
//         sBillRtTypeCd: newVendorRate.rateType,
//         type: newVendorRate.lookupType,
//         modifiedBy: "admin",
//         timeStamp: new Date().toISOString(),
//       });
//       setNewVendorRate(null);
//       const fetchResponse = await axios.get(
//         `https://test-api-3tmq.onrender.com/ProjVendRt`
//       );
//       const filteredData = fetchResponse.data.filter((item) =>
//         item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
//       );
//       setVendorBillingRates(
//         filteredData.map((item) => ({
//         id: item.projVendRtKey || item.id,
//           lookupType: item.type || "Select",
//           vendorId: item.vendId || "",
//           vendorName: item.vendorName || "",
//           vendorEmployee: item.vendEmplId || "",
//           vendorEmployeeName: item.vendEmplName || "",
//           plc: item.billLabCatCd,
//           plcDescription: item.description || "",
//           billRate: item.billRtAmt,
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: new Date(item.startDt).toISOString().split("T")[0],
//           endDate: item.endDt
//             ? new Date(item.endDt).toISOString().split("T")[0]
//             : null,
//         }))
//       );
//       const newEditVendorBillRate = {};
//       const newEditVendorFields = {};
//       filteredData.forEach((item) => {
//         newEditVendorBillRate[item.id] = item.billRtAmt;
//         newEditVendorFields[item.id] = {
//           lookupType: item.type || "Select",
//           rateType: item.sBillRtTypeCd || "Select",
//           startDate: new Date(item.startDt).toISOString().split("T")[0],
//           endDate: item.endDt
//             ? new Date(item.endDt).toISOString().split("T")[0]
//             : null,
//         };
//       });
//       setEditVendorBillRate(newEditVendorBillRate);
//       setEditVendorFields(newEditVendorFields);
//     } catch (error) {
//       console.error(
//         "Error adding vendor billing rate:",
//         error.response ? error.response.data : error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVendorBillRateChange = (id, value) => {
//     setEditVendorBillRate((prev) => ({
//       ...prev,
//       [id]: value === "" ? "" : parseFloat(value) || 0,
//     }));
//   };

//   const handleUpdateVendor = async (id, updatedData) => {
//     setLoading(true);
//     try {
//       const fields = editVendorFields[id] || {};
//       await axios.put(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`, {
//         projVendRtKey: id,
//         projId: selectedProjectId,
//         vendId: updatedData.vendorId,
//         vendEmplId: updatedData.vendorEmployee,
//         billLabCatCd: updatedData.plc,
//         billDiscRt: 0,
//         companyId: "1",
//         billRtAmt: parseFloat(editVendorBillRate[id] || updatedData.billRate),
//         startDt: new Date(
//           fields.startDate || updatedData.startDate
//         ).toISOString(),
//         endDt: fields.endDate
//           ? new Date(fields.endDate).toISOString()
//           : updatedData.endDate
//           ? new Date(updatedData.endDate).toISOString()
//           : null,
//         sBillRtTypeCd: fields.rateType || updatedData.rateType,
//         type: fields.lookupType || updatedData.lookupType,
//         modifiedBy: "admin",
//         timeStamp: new Date().toISOString(),
//       });
//       setVendorBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 lookupType: fields.lookupType || updatedData.lookupType,
//                 vendorId: updatedData.vendorId,
//                 vendorName: updatedData.vendorName,
//                 vendorEmployee: updatedData.vendorEmployee,
//                 vendorEmployeeName: updatedData.vendorEmployeeName,
//                 plc: updatedData.plc,
//                 plcDescription:
//                   plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)
//                     ?.description || updatedData.plcDescription,
//                 billRate: parseFloat(
//                   editVendorBillRate[id] || updatedData.billRate
//                 ),
//                 rateType: fields.rateType || updatedData.rateType,
//                 startDate: fields.startDate || updatedData.startDate,
//                 endDate: fields.endDate || updatedData.endDate || null,
//               }
//             : rate
//         )
//       );
//       setEditVendorBillRate((prev) => ({
//         ...prev,
//         [id]: parseFloat(editVendorBillRate[id] || updatedData.billRate),
//       }));
//       setEditVendorFields((prev) => ({
//         ...prev,
//         [id]: {
//           lookupType: fields.lookupType || updatedData.lookupType,
//           rateType: fields.rateType || updatedData.rateType,
//           startDate: fields.startDate || updatedData.startDate,
//           endDate: fields.endDate || updatedData.endDate || null,
//         },
//       }));
//       setEditingVendorRowId(null);
//     } catch (error) {
//       console.error("Error updating vendor billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteVendor = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
//       setVendorBillingRates((prev) => prev.filter((rate) => rate.id !== id));
//       setEditVendorBillRate((prev) => {
//         const newEditVendorBillRate = { ...prev };
//         delete newEditVendorBillRate[id];
//         return newEditVendorBillRate;
//       });
//       setEditVendorFields((prev) => {
//         const newEditVendorFields = { ...prev };
//         delete newEditVendorFields[id];
//         return newEditVendorFields;
//       });
//       setEditingVendorRowId(null);
//     } catch (error) {
//       console.error("Error deleting vendor billing rate:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewVendorRateChange = (field, value) => {
//     setNewVendorRate((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleVendorFieldChange = (id, field, value) => {
//     if (field === "vendorId") {
//       const selectedVend = vendorEmployees.find((v) => v.vendId === value);
//       setEditVendorFields((prev) => ({
//         ...prev,
//         [id]: {
//           ...prev[id],
//           vendorId: value,
//           vendorName: selectedVend
//             ? selectedVend.employeeName
//             : prev[id]?.vendorName,
//           vendorEmployee: selectedVend
//             ? selectedVend.empId
//             : prev[id]?.vendorEmployee,
//           vendorEmployeeName: selectedVend
//             ? selectedVend.employeeName
//             : prev[id]?.vendorEmployeeName,
//         },
//       }));
//       setVendorBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id
//             ? {
//                 ...rate,
//                 vendorId: value,
//                 vendorName: selectedVend
//                   ? selectedVend.employeeName
//                   : rate.vendorName,
//                 vendorEmployee: selectedVend
//                   ? selectedVend.empId
//                   : rate.vendorEmployee,
//                 vendorEmployeeName: selectedVend
//                   ? selectedVend.employeeName
//                   : rate.vendorEmployeeName,
//               }
//             : rate
//         )
//       );
//       return;
//     }
//     setEditVendorFields((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       },
//     }));
//     if (
//       field !== "lookupType" &&
//       field !== "rateType" &&
//       field !== "startDate" &&
//       field !== "endDate"
//     ) {
//       setVendorBillingRates((prev) =>
//         prev.map((rate) =>
//           rate.id === id ? { ...rate, [field]: value } : rate
//         )
//       );
//     }
//   };

//   const handleEditEmployeeRow = (id) => {
//     setEditingEmployeeRowId(id);
//   };

//   const handleEditVendorRow = (id) => {
//     setEditingVendorRowId(id);
//   };

//   return (
//     <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
//       <div className="mb-4">
//         <h3 className="text-xs font-normal">
//           Project Labor Categories Billing Rates Schedule
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 font-normal">Plc</th>
//                 <th className="border p-2 font-normal">Bill Rate</th>
//                 <th className="border p-2 font-normal">Rate Type</th>
//                 <th className="border p-2 font-normal">Start Date</th>
//                 <th className="border p-2 font-normal">End Date</th>
//                 <th className="border p-2 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="border p-2 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : billingRatesSchedule.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="border p-2 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 billingRatesSchedule.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
//                   >
//                     <td className="border p-2 sm:w-1/8">
//                       <span>{item.plc}</span>
//                     </td>
//                     <td className="border p-2 sm:w-1/5">
//                       <input
//                         type="text"
//                         value={editBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-2 sm:w-1/5">
//                       <select
//                         value={item.rateType}
//                         onChange={(e) =>
//                           handleNewRateChange("rateType", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       >
//                         {rateTypeOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                     <td className="border p-2 sm:w-1/5">
//                       <input
//                         type="date"
//                         value={item.startDate}
//                         onChange={(e) =>
//                           handleNewRateChange("startDate", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-2 sm:w-1/5">
//                       <input
//                         type="date"
//                         value={item.endDate || ""}
//                         onChange={(e) =>
//                           handleNewRateChange("endDate", e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-2 sm:w-1/5">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
//                         <button
//                           onClick={() =>
//                             handleUpdate(item.id, {
//                               ...item,
//                               billRate: editBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-normal hover:bg-blue-300 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-normal hover:bg-gray-300 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0">
//                   <td className="border p-2 sm:w-1/5">
//                     <input
//                       type="text"
//                       value={newRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-2 sm:w-1/5">
//                     <input
//                       type="text"
//                       value={newRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/5">
//                     <select
//                       value={newRate.rateType}
//                       onChange={(e) =>
//                         handleNewRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-2 sm:w-1/5">
//                     <input
//                       type="date"
//                       value={newRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/5">
//                     <input
//                       type="date"
//                       value={newRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/5">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
//                       <button
//                         onClick={handleSaveNewRate}
//                         className="bg-green-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewRate(null)}
//                         className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="6" className="border p-2">
//                   <button
//                     onClick={handleAddRow}
//                     className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 font-normal">Lookup Type</th>
//                 <th className="border p-2 font-normal">Employee</th>
//                 <th className="border p-2 font-normal">Employee Name</th>
//                 <th className="border p-2 font-normal">PLC</th>
//                 <th className="border p-2 font-normal">PLC Description</th>
//                 <th className="border p-2 font-normal">Bill Rate</th>
//                 <th className="border p-2 font-normal">Rate Type</th>
//                 <th className="border p-2 font-normal">Start Date</th>
//                 <th className="border p-2 font-normal">End Date</th>
//                 <th className="border p-2 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="10" className="border p-2 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
//                 <tr>
//                   <td colSpan="10" className="border p-2 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 employeeBillingRates.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
//                   >
//                     <td className="border p-2 sm:w-1/8">
//                       {editingEmployeeRowId === item.id ? (
//                         <select
//                           value={
//                             editEmployeeFields[item.id]?.lookupType ??
//                             item.lookupType
//                           }
//                           onChange={(e) =>
//                             handleNewEmployeeRateChange(
//                               "lookupType",
//                               e.target.value,
//                               item.id
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         >
//                           {lookupTypeOptions.map((option) => (
//                             <option key={option} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditEmployeeRow(item.id)}
//                         >
//                           {item.lookupType}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       {editingEmployeeRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={item.empId}
//                           onChange={(e) =>
//                             handleNewEmployeeRateChange(
//                               "empId",
//                               e.target.value,
//                               item.id
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                           list="employee-list"
//                           disabled={employees.length === 0}
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditEmployeeRow(item.id)}
//                         >
//                           {item.empId}
//                         </span>
//                       )}
//                       <datalist id="employee-list">
//                         {employees.map((emp) => (
//                           <option key={emp.empId} value={emp.empId}>
//                             {emp.employeeName}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       <span
//                         className="cursor-pointer"
//                         onClick={() => handleEditEmployeeRow(item.id)}
//                       >
//                         {item.employeeName}
//                       </span>
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       <input
//                         type="text"
//                         value={item.plc}
//                         onChange={(e) => {
//                           handleNewEmployeeRateChange(
//                             "plc",
//                             e.target.value,
//                             item.id
//                           );
//                           setPlcSearch(e.target.value);
//                         }}
//                         className="w-full p-1 border rounded text-xs"
//                         list="plc-list"
//                         disabled
//                       />
//                       <datalist id="plc-list">
//                         {plcs.map((plc) => (
//                           <option
//                             key={plc.laborCategoryCode}
//                             value={plc.laborCategoryCode}
//                           >
//                             {plc.description}
//                           </option>
//                         ))}
//                       </datalist>
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       <span
//                         className="cursor-pointer"
//                         onClick={() => handleEditEmployeeRow(item.id)}
//                       >
//                         {plcs.find((plc) => plc.laborCategoryCode === item.plc)
//                           ?.description || item.plcDescription}
//                       </span>
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       {editingEmployeeRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={editEmployeeBillRate[item.id] ?? item.billRate}
//                           onChange={(e) =>
//                             handleEmployeeBillRateChange(
//                               item.id,
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditEmployeeRow(item.id)}
//                         >
//                           {item.billRate}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       {editingEmployeeRowId === item.id ? (
//                         <select
//                           value={
//                             editEmployeeFields[item.id]?.rateType ??
//                             item.rateType
//                           }
//                           onChange={(e) =>
//                             handleNewEmployeeRateChange(
//                               "rateType",
//                               e.target.value,
//                               item.id
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         >
//                           {rateTypeOptions.map((option) => (
//                             <option key={option} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditEmployeeRow(item.id)}
//                         >
//                           {item.rateType}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       {editingEmployeeRowId === item.id ? (
//                         <input
//                           type="date"
//                           value={
//                             editEmployeeFields[item.id]?.startDate ??
//                             item.startDate
//                           }
//                           onChange={(e) =>
//                             handleNewEmployeeRateChange(
//                               "startDate",
//                               e.target.value,
//                               item.id
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditEmployeeRow(item.id)}
//                         >
//                           {item.startDate}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       {editingEmployeeRowId === item.id ? (
//                         <input
//                           type="date"
//                           value={
//                             editEmployeeFields[item.id]?.endDate ??
//                             item.endDate ??
//                             ""
//                           }
//                           onChange={(e) =>
//                             handleNewEmployeeRateChange(
//                               "endDate",
//                               e.target.value,
//                               item.id
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditEmployeeRow(item.id)}
//                         >
//                           {item.endDate || ""}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/8">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
//                         <button
//                           onClick={() =>
//                             handleUpdateEmployee(item.id, {
//                               ...item,
//                               billRate:
//                                 editEmployeeBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-normal hover:bg-blue-300 transition w-full sm:w-auto"
//                           disabled={loading || !item.id}
//                         >
//                           {editingEmployeeRowId === item.id ? "Save" : "Edit"}
//                         </button>
//                         <button
//                           onClick={() => handleDeleteEmployee(item.id)}
//                           className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-normal hover:bg-gray-300 transition w-full sm:w-auto"
//                           disabled={loading || !item.id}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newEmployeeRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0">
//                   <td className="border p-2 sm:w-1/8">
//                     <select
//                       value={newEmployeeRate.lookupType}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange(
//                           "lookupType",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {lookupTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.empId || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("empId", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                       list="employee-list"
//                       disabled={employees.length === 0}
//                     />
//                     <datalist id="employee-list">
//                       {employees.map((emp) => (
//                         <option key={emp.empId} value={emp.empId}>
//                           {emp.employeeName}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     {newEmployeeRate.employeeName || ""}
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewEmployeeRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     {plcs.find(
//                       (plc) => plc.laborCategoryCode === newEmployeeRate.plc
//                     )?.description || ""}
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <input
//                       type="text"
//                       value={newEmployeeRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <select
//                       value={newEmployeeRate.rateType}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <input
//                       type="date"
//                       value={newEmployeeRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <input
//                       type="date"
//                       value={newEmployeeRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewEmployeeRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/8">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
//                       <button
//                         onClick={handleSaveNewEmployeeRate}
//                         className="bg-green-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewEmployeeRate(null)}
//                         className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="10" className="border p-2">
//                   <button
//                     onClick={handleAddEmployeeRow}
//                     className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newEmployeeRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 font-normal">Lookup Type</th>
//                 <th className="border p-2 font-normal">Vendor</th>
//                 <th className="border p-2 font-normal">Vendor Name</th>
//                 <th className="border p-2 font-normal">Vendor Employee</th>
//                 <th className="border p-2 font-normal">Vendor Employee Name</th>
//                 <th className="border p-2 font-normal">PLC</th>
//                 <th className="border p-2 font-normal">PLC Description</th>
//                 <th className="border p-2 font-normal">Bill Rate</th>
//                 <th className="border p-2 font-normal">Rate Type</th>
//                 <th className="border p-2 font-normal">Start Date</th>
//                 <th className="border p-2 font-normal">End Date</th>
//                 <th className="border p-2 font-normal">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="border p-2 text-center">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : vendorBillingRates.length === 0 && !newVendorRate ? (
//                 <tr>
//                   <td colSpan="12" className="border p-2 text-center">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 vendorBillingRates.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
//                   >
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <select
//                           value={
//                             editVendorFields[item.id]?.lookupType ??
//                             item.lookupType
//                           }
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "lookupType",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         >
//                           {vendorLookupTypeOptions.map((option) => (
//                             <option key={option} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.lookupType}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={item.vendorId}
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "vendorId",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.vendorId}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={item.vendorName}
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "vendorName",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.vendorName}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={item.vendorEmployee}
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "vendorEmployee",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.vendorEmployee}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={item.vendorEmployeeName}
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "vendorEmployeeName",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.vendorEmployeeName}
//                         </span>
//                       )}
//                     </td>
//                     {/* <td className="border p-2 sm:w-1/8">
//                       <input
//                         type="text"
//                         value={editEmployeeBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleEmployeeBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td> */}
//                     <td className="border p-2 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={editVendorBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleVendorBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       <span>{item.plc}</span>
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       <span
//                         className="cursor-pointer"
//                         onClick={() => handleEditVendorRow(item.id)}
//                       >
//                         {plcs.find((plc) => plc.laborCategoryCode === item.plc)
//                           ?.description || item.plcDescription}
//                       </span>
//                     </td>
//                     {/* <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="text"
//                           value={editVendorBillRate[item.id] ?? item.billRate}
//                           onChange={(e) =>
//                             handleVendorBillRateChange(item.id, e.target.value)
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.billRate}
//                         </span>
//                       )}
//                     </td> */}
//                     <td className="border p-2 sm:w-1/10">
//                       <input
//                         type="text"
//                         value={editVendorBillRate[item.id] ?? item.billRate}
//                         onChange={(e) =>
//                           handleVendorBillRateChange(item.id, e.target.value)
//                         }
//                         className="w-full p-1 border rounded text-xs"
//                       />
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <select
//                           value={
//                             editVendorFields[item.id]?.rateType ?? item.rateType
//                           }
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "rateType",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         >
//                           {rateTypeOptions.map((option) => (
//                             <option key={option} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.rateType}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="date"
//                           value={
//                             editVendorFields[item.id]?.startDate ??
//                             item.startDate
//                           }
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "startDate",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.startDate}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       {editingVendorRowId === item.id ? (
//                         <input
//                           type="date"
//                           value={
//                             editVendorFields[item.id]?.endDate ??
//                             item.endDate ??
//                             ""
//                           }
//                           onChange={(e) =>
//                             handleVendorFieldChange(
//                               item.id,
//                               "endDate",
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-1 border rounded text-xs"
//                         />
//                       ) : (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => handleEditVendorRow(item.id)}
//                         >
//                           {item.endDate || ""}
//                         </span>
//                       )}
//                     </td>
//                     <td className="border p-2 sm:w-1/10">
//                       <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
//                         <button
//                           onClick={() =>
//                             handleUpdateVendor(item.id, {
//                               ...item,
//                               billRate:
//                                 editVendorBillRate[item.id] || item.billRate,
//                             })
//                           }
//                           className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-normal hover:bg-blue-300 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           {editingVendorRowId === item.id ? "Save" : "Edit"}
//                         </button>
//                         <button
//                           onClick={() => handleDeleteVendor(item.id)}
//                           className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-normal hover:bg-gray-300 transition w-full sm:w-auto"
//                           disabled={loading}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//               {newVendorRate && (
//                 <tr className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0">
//                   <td className="border p-2 sm:w-1/10">
//                     <select
//                       value={newVendorRate.lookupType}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("lookupType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {vendorLookupTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorId || ""}
//                       onChange={(e) => {
//                         const selectedVend = vendorEmployees.find(
//                           (v) => v.vendId === e.target.value
//                         );
//                         setNewVendorRate((prev) => ({
//                           ...prev,
//                           vendorId: e.target.value,
//                           vendorName: selectedVend
//                             ? selectedVend.employeeName
//                             : prev.vendorName,
//                           vendorEmployee: selectedVend
//                             ? selectedVend.empId
//                             : prev.vendorEmployee,
//                           vendorEmployeeName: selectedVend
//                             ? selectedVend.employeeName
//                             : prev.vendorEmployeeName,
//                         }));
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="vendor-list"
//                     />
//                     <datalist id="vendor-list">
//                       {vendorEmployees.map((v) => (
//                         <option key={`${v.vendId}-${v.empId}`} value={v.vendId}>
//                           {v.employeeName}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorName || ""}
//                       readOnly
//                       onChange={(e) =>
//                         handleNewVendorRateChange("vendorName", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorEmployee || ""}
//                       readOnly
//                       onChange={(e) =>
//                         handleNewVendorRateChange(
//                           "vendorEmployee",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newVendorRate.vendorEmployeeName || ""}
//                       readOnly
//                       onChange={(e) =>
//                         handleNewVendorRateChange(
//                           "vendorEmployeeName",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newVendorRate.plc || ""}
//                       onChange={(e) => {
//                         handleNewVendorRateChange("plc", e.target.value);
//                         setPlcSearch(e.target.value);
//                       }}
//                       className="w-full p-1 border rounded text-xs"
//                       list="plc-list"
//                     />
//                     <datalist id="plc-list">
//                       {plcs.map((plc) => (
//                         <option
//                           key={plc.laborCategoryCode}
//                           value={plc.laborCategoryCode}
//                         >
//                           {plc.description}
//                         </option>
//                       ))}
//                     </datalist>
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     {plcs.find(
//                       (plc) => plc.laborCategoryCode === newVendorRate.plc
//                     )?.description || ""}
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="text"
//                       value={newVendorRate.billRate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("billRate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <select
//                       value={newVendorRate.rateType}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("rateType", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     >
//                       {rateTypeOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="date"
//                       value={newVendorRate.startDate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("startDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <input
//                       type="date"
//                       value={newVendorRate.endDate || ""}
//                       onChange={(e) =>
//                         handleNewVendorRateChange("endDate", e.target.value)
//                       }
//                       className="w-full p-1 border rounded text-xs"
//                     />
//                   </td>
//                   <td className="border p-2 sm:w-1/10">
//                     <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
//                       <button
//                         onClick={handleSaveNewVendorRate}
//                         className="bg-green-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setNewVendorRate(null)}
//                         className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
//                         disabled={loading}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan="12" className="border p-2">
//                   <button
//                     onClick={handleAddVendorRow}
//                     className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
//                     disabled={loading || newVendorRate}
//                   >
//                     Add
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PLCComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PLCComponent = ({ selectedProjectId, selectedPlan }) => {
  const [billingRatesSchedule, setBillingRatesSchedule] = useState([]);
  const [newRate, setNewRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editBillRate, setEditBillRate] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employeeBillingRates, setEmployeeBillingRates] = useState([]);
  const [newEmployeeRate, setNewEmployeeRate] = useState(null);
  const [editEmployeeBillRate, setEditEmployeeBillRate] = useState({});
  const [editEmployeeFields, setEditEmployeeFields] = useState({});
  const [editingEmployeeRowId, setEditingEmployeeRowId] = useState(null);
  const [vendorBillingRates, setVendorBillingRates] = useState([]);
  const [newVendorRate, setNewVendorRate] = useState(null);
  const [editVendorBillRate, setEditVendorBillRate] = useState({});
  const [editVendorFields, setEditVendorFields] = useState({});
  const [editingVendorRowId, setEditingVendorRowId] = useState(null);
  const [plcs, setPlcs] = useState([]);
  const [plcSearch, setPlcSearch] = useState("");
  const [vendorEmployees, setVendorEmployees] = useState([]);

  const lookupTypeOptions = ["Select", "Employee", "Contract Employee"];
  const rateTypeOptions = ["Select", "Billing", "Actual"];
  const vendorLookupTypeOptions = ["Select", "Vendor", "Employee"];

  // Fetch billing rates schedule based on selected project ID
  useEffect(() => {
    const fetchBillingRates = async () => {
      if (!selectedProjectId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
        );
        const filteredData = response.data.filter((item) =>
          item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
        );
        setBillingRatesSchedule(
          filteredData.map((item) => ({
            id: item.id,
            plc: item.laborCategoryCode,
            billRate: item.billingRate,
            rateType: item.rateType || "Select",
            startDate: item.effectiveDate
              ? item.effectiveDate.split("T")[0]
              : "",
            endDate: item.endDate ? item.endDate.split("T")[0] : null,
          }))
        );
        const newEditBillRate = {};
        filteredData.forEach((item) => {
          newEditBillRate[item.id] = item.billingRate;
        });
        setEditBillRate(newEditBillRate);
      } catch (error) {
        console.error("Error fetching billing rates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBillingRates();
  }, [selectedProjectId]);

  // Fetch employees for the selected project
  useEffect(() => {
    const fetchEmployees = async () => {
      if (
        !selectedProjectId ||
        typeof selectedProjectId !== "string" ||
        selectedProjectId.trim() === ""
      ) {
        setEmployees([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${selectedProjectId}`
        );
        setEmployees(
          response.data.map((item) => ({
            empId: item.empId,
            employeeName: item.employeeName,
          }))
        );
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [selectedProjectId]);

  // Fetch PLCs for search
  useEffect(() => {
    const fetchPlcs = async () => {
      if (!plcSearch) return;
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${plcSearch}`
        );
        const filteredPlcs = response.data
          .filter((item) =>
            item.laborCategoryCode
              .toLowerCase()
              .includes(plcSearch.toLowerCase())
          )
          .map((item) => ({
            laborCategoryCode: item.laborCategoryCode,
            description: item.description || "",
          }));
        setPlcs(filteredPlcs);
      } catch (error) {
        console.error("Error fetching PLCs:", error);
      }
    };
    fetchPlcs();
  }, [plcSearch]);

  // Fetch employee billing rates
  useEffect(() => {
    const fetchEmployeeBillingRates = async () => {
      if (!selectedProjectId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/ProjEmplRt`
        );
        const filteredData = response.data.filter(
          (item) =>
            item.projId
              .toLowerCase()
              .startsWith(selectedProjectId.toLowerCase()) && item.emplId
        );
        setEmployeeBillingRates(
          filteredData.map((item) => ({
            id: item.projEmplRtKey || item.id,
            lookupType: item.type,
            empId: item.emplId,
            employeeName:
              item.employeeName ||
              employees.find((emp) => emp.empId === item.emplId)
                ?.employeeName ||
              "",
            plc: item.billLabCatCd,
            plcDescription: item.plcDescription || "",
            billRate: item.billRtAmt,
            rateType: item.sBillRtTypeCd,
            startDate: item.startDt ? item.startDt.split("T")[0] : "",
            endDate: item.endDt ? item.endDt.split("T")[0] : null,
          }))
        );
        const newEditEmployeeBillRate = {};
        const newEditEmployeeFields = {};
        filteredData.forEach((item) => {
          const id = item.projEmplRtKey || item.id;
          if (id) {
            newEditEmployeeBillRate[id] = item.billRtAmt;
            newEditEmployeeFields[id] = {
              lookupType: item.type,
              rateType: item.sBillRtTypeCd,
              startDate: item.startDt ? item.startDt.split("T")[0] : "",
              endDate: item.endDt ? item.endDt.split("T")[0] : null,
            };
          }
        });
        setEditEmployeeBillRate(newEditEmployeeBillRate);
        setEditEmployeeFields(newEditEmployeeFields);
      } catch (error) {
        console.error("Error fetching employee billing rates:", error);
        setEmployeeBillingRates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeBillingRates();
  }, [selectedProjectId, employees]);

  // Fetch vendor billing rates
  useEffect(() => {
    const fetchVendorBillingRates = async () => {
      if (!selectedProjectId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/ProjVendRt`
        );
        const filteredData = response.data.filter((item) =>
          item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
        );
        setVendorBillingRates(
          filteredData.map((item) => ({
            id: item.projVendRtKey || item.id, // <-- use projVendRtKey as id
            projVendRtKey: item.projVendRtKey, // <-- keep this for update
            lookupType: item.type,
            vendorId: item.vendId || "",
            vendorName: item.vendorName || "",
            vendorEmployee: item.vendEmplId || "",
            vendorEmployeeName: item.vendEmplName || "",
            plc: item.billLabCatCd,
            plcDescription: item.plcDescription || item.description || "",
            billRate: item.billRtAmt,
            rateType: item.sBillRtTypeCd,
            startDate: new Date(item.startDt).toISOString().split("T")[0],
            endDate: item.endDt
              ? new Date(item.endDt).toISOString().split("T")[0]
              : null,
          }))
        );
        const newEditVendorBillRate = {};
        const newEditVendorFields = {};
        filteredData.forEach((item) => {
          newEditVendorBillRate[item.id] = item.billRtAmt;
          newEditVendorFields[item.id] = {
            lookupType: item.type,
            rateType: item.sBillRtTypeCd,
            startDate: new Date(item.startDt).toISOString().split("T")[0],
            endDate: item.endDt
              ? new Date(item.endDt).toISOString().split("T")[0]
              : null,
          };
        });
        setEditVendorBillRate(newEditVendorBillRate);
        setEditVendorFields(newEditVendorFields);
      } catch (error) {
        console.error("Error fetching vendor billing rates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorBillingRates();
  }, [selectedProjectId]);

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`,
        {
          id,
          projId: selectedProjectId,
          laborCategoryCode: updatedData.plc,
          costRate: parseFloat(updatedData.billRate) * 0.65,
          billingRate: parseFloat(updatedData.billRate),
          effectiveDate: updatedData.startDate,
          endDate: updatedData.endDate || null,
          rateType: updatedData.rateType,
          isActive: true,
          modifiedBy: "admin",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      setBillingRatesSchedule((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                plc: updatedData.plc,
                billRate: parseFloat(updatedData.billRate),
                rateType: updatedData.rateType,
                startDate: updatedData.startDate,
                endDate: updatedData.endDate || null,
              }
            : rate
        )
      );
      setEditBillRate((prev) => ({ ...prev, [id]: updatedData.billRate }));
    } catch (error) {
      console.error("Error updating billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedProjectId) {
      setVendorEmployees([]);
      return;
    }
    const fetchVendorEmployees = async () => {
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${selectedProjectId}`
        );
        setVendorEmployees(response.data);
      } catch (error) {
        setVendorEmployees([]);
        console.error("Error fetching vendor employees:", error);
      }
    };
    fetchVendorEmployees();
  }, [selectedProjectId]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates/${id}`
      );
      setBillingRatesSchedule((prev) => prev.filter((rate) => rate.id !== id));
      setEditBillRate((prev) => {
        const newEditBillRate = { ...prev };
        delete newEditBillRate[id];
        return newEditBillRate;
      });
    } catch (error) {
      console.error("Error deleting billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = () => {
    setNewRate({
      plc: "",
      billRate: "",
      rateType: "Select",
      startDate: "",
      endDate: "",
    });
  };

  const handleSaveNewRate = async () => {
    if (!newRate || !newRate.plc || !newRate.startDate || !newRate.billRate) {
      console.error(
        "Please fill all required fields (PLC, Bill Rate, Start Date)"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`,
        {
          id: 0,
          projId: selectedProjectId,
          laborCategoryCode: newRate.plc,
          costRate: parseFloat(newRate.billRate) * 0.65,
          billingRate: parseFloat(newRate.billRate),
          effectiveDate: newRate.startDate,
          endDate: newRate.endDate || null,
          rateType: newRate.rateType,
          isActive: true,
          modifiedBy: "admin",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      setNewRate(null);
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/api/ProjectPlcRates`
      );
      const filteredData = fetchResponse.data.filter((item) =>
        item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
      );
      setBillingRatesSchedule(
        filteredData.map((item) => ({
          id: item.id,
          plc: item.laborCategoryCode,
          billRate: item.billingRate,
          rateType: item.rateType,
          startDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
          endDate: item.endDate ? item.endDate.split("T")[0] : null,
        }))
      );
    } catch (error) {
      console.error(
        "Error adding billing rate:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewRateChange = (field, value) => {
    setNewRate((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillRateChange = (id, value) => {
    setEditBillRate((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseFloat(value) || 0,
    }));
  };

  // Employee Billing Rates Handlers
  const handleAddEmployeeRow = () => {
    setNewEmployeeRate({
      lookupType: "",
      empId: "",
      employeeName: "",
      plc: "",
      billRate: "",
      rateType: "Select",
      startDate: "",
      endDate: "",
    });
  };

  const handleSaveNewEmployeeRate = async () => {
    if (
      !newEmployeeRate ||
      !newEmployeeRate.empId ||
      !newEmployeeRate.plc ||
      !newEmployeeRate.startDate ||
      !newEmployeeRate.billRate
    ) {
      console.error(
        "Please fill all required fields (Employee, PLC, Bill Rate, Start Date)"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(`https://test-api-3tmq.onrender.com/ProjEmplRt`, {
        id: 0,
        projId: selectedProjectId,
        emplId: newEmployeeRate.empId,
        employeeName: newEmployeeRate.employeeName,
        billLabCatCd: newEmployeeRate.plc,
        billRtAmt: parseFloat(newEmployeeRate.billRate),
        startDt: newEmployeeRate.startDate,
        endDt: newEmployeeRate.endDate || null,
        sBillRtTypeCd: newEmployeeRate.rateType,
        type: newEmployeeRate.lookupType,
        isActive: true,
        modifiedBy: "admin",
      });
      setNewEmployeeRate(null);
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/ProjEmplRt`
      );
      const filteredData = fetchResponse.data.filter(
        (item) =>
          item.projId
            .toLowerCase()
            .startsWith(selectedProjectId.toLowerCase()) && item.emplId
      );
      setEmployeeBillingRates(
        filteredData.map((item) => ({
          id: item.projEmplRtKey || item.id,
          lookupType: item.type || "Select",
          empId: item.emplId,
          employeeName:
            item.employeeName ||
            employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
            "",
          plc: item.billLabCatCd,
          plcDescription: item.plcDescription || "",
          billRate: item.billRtAmt,
          rateType: item.sBillRtTypeCd || "Select",
          startDate: item.startDt ? item.startDt.split("T")[0] : "",
          endDate: item.endDt ? item.endDt.split("T")[0] : null,
        }))
      );
      const newEditEmployeeBillRate = {};
      const newEditEmployeeFields = {};
      filteredData.forEach((item) => {
        const id = item.projEmplRtKey || item.id;
        if (id) {
          newEditEmployeeBillRate[id] = item.billRtAmt;
          newEditEmployeeFields[id] = {
            lookupType: item.type || "Select",
            rateType: item.sBillRtTypeCd || "Select",
            startDate: item.startDt ? item.startDt.split("T")[0] : "",
            endDate: item.endDt ? item.endDt.split("T")[0] : null,
          };
        }
      });
      setEditEmployeeBillRate(newEditEmployeeBillRate);
      setEditEmployeeFields(newEditEmployeeFields);
    } catch (error) {
      console.error(
        "Error adding employee billing rate:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeBillRateChange = (id, value) => {
    setEditEmployeeBillRate((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseFloat(value) || 0,
    }));
  };

  const handleUpdateEmployee = async (id, updatedData) => {
    if (!id) {
      console.error("Invalid ID for update");
      return;
    }
    setLoading(true);
    try {
      const fields = editEmployeeFields[id] || {};
      await axios.put(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`, {
        projEmplRtKey: id,
        projId: selectedProjectId,
        emplId: updatedData.empId,
        employeeName: updatedData.employeeName,
        billLabCatCd: updatedData.plc,
        billRtAmt: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
        startDt: fields.startDate || updatedData.startDate,
        endDt: fields.endDate || updatedData.endDate || null,
        sBillRtTypeCd: fields.rateType || updatedData.rateType,
        type: fields.lookupType || updatedData.lookupType,
        isActive: true,
        modifiedBy: "admin",
      });
      setEmployeeBillingRates((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                lookupType: fields.lookupType || updatedData.lookupType,
                empId: updatedData.empId,
                employeeName: updatedData.employeeName,
                plc: updatedData.plc,
                plcDescription:
                  plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)
                    ?.description || updatedData.plcDescription,
                billRate: parseFloat(
                  editEmployeeBillRate[id] || updatedData.billRate
                ),
                rateType: fields.rateType || updatedData.rateType,
                startDate: fields.startDate || updatedData.startDate,
                endDate: fields.endDate || updatedData.endDate || null,
              }
            : rate
        )
      );
      setEditEmployeeBillRate((prev) => ({
        ...prev,
        [id]: parseFloat(editEmployeeBillRate[id] || updatedData.billRate),
      }));
      setEditEmployeeFields((prev) => ({
        ...prev,
        [id]: {
          lookupType: fields.lookupType || updatedData.lookupType,
          rateType: fields.rateType || updatedData.rateType,
          startDate: fields.startDate || updatedData.startDate,
          endDate: fields.endDate || updatedData.endDate || null,
        },
      }));
      setEditingEmployeeRowId(null);
      // Refetch employee billing rates to ensure state consistency after update
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/ProjEmplRt`
      );
      const filteredData = fetchResponse.data.filter(
        (item) =>
          item.projId
            .toLowerCase()
            .startsWith(selectedProjectId.toLowerCase()) && item.emplId
      );
      setEmployeeBillingRates(
        filteredData.map((item) => ({
          id: item.projEmplRtKey || item.id,
          lookupType: item.type || "Select",
          empId: item.emplId,
          employeeName:
            item.employeeName ||
            employees.find((emp) => emp.empId === item.emplId)?.employeeName ||
            "",
          plc: item.billLabCatCd,
          plcDescription: item.plcDescription || "",
          billRate: item.billRtAmt,
          rateType: item.sBillRtTypeCd || "Select",
          startDate: item.startDt ? item.startDt.split("T")[0] : "",
          endDate: item.endDt ? item.endDt.split("T")[0] : null,
        }))
      );
      const newEditEmployeeBillRate = {};
      const newEditEmployeeFields = {};
      filteredData.forEach((item) => {
        const id = item.projEmplRtKey || item.id;
        if (id) {
          newEditEmployeeBillRate[id] = item.billRtAmt;
          newEditEmployeeFields[id] = {
            lookupType: item.type || "Select",
            rateType: item.sBillRtTypeCd || "Select",
            startDate: item.startDt ? item.startDt.split("T")[0] : "",
            endDate: item.endDt ? item.endDt.split("T")[0] : null,
          };
        }
      });
      setEditEmployeeBillRate(newEditEmployeeBillRate);
      setEditEmployeeFields(newEditEmployeeFields);
    } catch (error) {
      console.error("Error updating employee billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!id) {
      console.error("Invalid ID for deletion");
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`https://test-api-3tmq.onrender.com/ProjEmplRt/${id}`);
      setEmployeeBillingRates((prev) => prev.filter((rate) => rate.id !== id));
      setEditEmployeeBillRate((prev) => {
        const newEditEmployeeBillRate = { ...prev };
        delete newEditEmployeeBillRate[id];
        return newEditEmployeeBillRate;
      });
      setEditEmployeeFields((prev) => {
        const newEditEmployeeFields = { ...prev };
        delete newEditEmployeeFields[id];
        return newEditEmployeeFields;
      });
      setEditingEmployeeRowId(null);
    } catch (error) {
      console.error("Error deleting employee billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEmployeeRateChange = (field, value, id = null) => {
    if (id) {
      if (field === "empId") {
        const selectedEmp = employees.find((emp) => emp.empId === value);
        setEmployeeBillingRates((prev) =>
          prev.map((rate) =>
            rate.id === id
              ? {
                  ...rate,
                  empId: value,
                  employeeName: selectedEmp
                    ? selectedEmp.employeeName
                    : rate.employeeName,
                }
              : rate
          )
        );
      } else {
        setEditEmployeeFields((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            [field]: value,
          },
        }));
      }
    } else {
      const selectedEmp =
        field === "empId" ? employees.find((emp) => emp.empId === value) : null;
      setNewEmployeeRate((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "empId" && selectedEmp
          ? { employeeName: selectedEmp.employeeName }
          : {}),
      }));
    }
  };

  // Vendor Billing Rates Handlers
  const handleAddVendorRow = () => {
    setNewVendorRate({
      lookupType: "Select",
      vendorId: "",
      vendorName: "",
      vendorEmployee: "",
      vendorEmployeeName: "",
      plc: "",
      billRate: "",
      rateType: "Select",
      startDate: "",
      endDate: "",
    });
  };

  const handleSaveNewVendorRate = async () => {
    if (
      !newVendorRate ||
      !newVendorRate.vendorId ||
      !newVendorRate.vendorName ||
      !newVendorRate.plc ||
      !newVendorRate.startDate ||
      !newVendorRate.billRate
    ) {
      console.error(
        "Please fill all required fields (Vendor ID, Vendor Name, PLC, Bill Rate, Start Date)"
      );
      return;
    }
    setLoading(true);
    try {
      await axios.post(`https://test-api-3tmq.onrender.com/ProjVendRt`, {
        id: 0,
        projId: selectedPlan?.projId || selectedProjectId,
        vendId: newVendorRate.vendorId,
        vendEmplId: newVendorRate.vendorEmployee,
        billLabCatCd: newVendorRate.plc,
        billDiscRt: 0,
        companyId: "1",
        billRtAmt: parseFloat(newVendorRate.billRate),
        startDt: new Date(newVendorRate.startDate).toISOString(),
        endDt: newVendorRate.endDate
          ? new Date(newVendorRate.endDate).toISOString()
          : null,
        sBillRtTypeCd: newVendorRate.rateType,
        type: newVendorRate.lookupType,
        modifiedBy: "admin",
        timeStamp: new Date().toISOString(),
      });
      setNewVendorRate(null);
      const fetchResponse = await axios.get(
        `https://test-api-3tmq.onrender.com/ProjVendRt`
      );
      const filteredData = fetchResponse.data.filter((item) =>
        item.projId.toLowerCase().startsWith(selectedProjectId.toLowerCase())
      );
      // setVendorBillingRates(
      //   filteredData.map((item) => ({
      //     id: item.id,
      //     lookupType: item.type || "Select",
      //     vendorId: item.vendId || "",
      //     // vendorName: item.vendorName || "",
      //     // vendorEmployee: item.vendEmplId || "",
      //     vendorName: item.vendEmplName || newVendorRate.vendorName || "", // Use vendEmplName or fallback to newVendorRate.vendorName
      //     vendorEmployee: item.vendEmplId || "",
      //     vendorEmployeeName: item.vendEmplName || "",
      //     plc: item.billLabCatCd,
      //     plcDescription: item.description || "",
      //     billRate: item.billRtAmt,
      //     rateType: item.sBillRtTypeCd || "Select",
      //     startDate: new Date(item.startDt).toISOString().split("T")[0],
      //     endDate: item.endDt
      //       ? new Date(item.endDt).toISOString().split("T")[0]
      //       : null,
      //   }))
      // );
      setVendorBillingRates(
        filteredData.map((item) => ({
          id: item.projVendRtKey || item.id,
          projVendRtKey: item.projVendRtKey,
          lookupType: item.type || "Select",
          vendorId: item.vendId || "",
          vendorName: item.vendEmplName || newVendorRate.vendorEmployeeName || "", // Use vendEmplName
          vendorEmployee: item.vendEmplId || "",
          vendorEmployeeName:
            item.vendEmplName || newVendorRate.vendorEmployeeName || "", // Use vendEmplName
          plc: item.billLabCatCd,
          plcDescription: item.plcDescription || "",
          billRate: item.billRtAmt,
          rateType: item.sBillRtTypeCd || "Select",
          startDate: new Date(item.startDt).toISOString().split("T")[0],
          endDate: item.endDt
            ? new Date(item.endDt).toISOString().split("T")[0]
            : null,
        }))
      );
      const newEditVendorBillRate = {};
      const newEditVendorFields = {};
      filteredData.forEach((item) => {
        newEditVendorBillRate[item.id] = item.billRtAmt;
        newEditVendorFields[item.id] = {
          lookupType: item.type || "Select",
          rateType: item.sBillRtTypeCd || "Select",
          startDate: new Date(item.startDt).toISOString().split("T")[0],
          endDate: item.endDt
            ? new Date(item.endDt).toISOString().split("T")[0]
            : null,
        };
      });
      setEditVendorBillRate(newEditVendorBillRate);
      setEditVendorFields(newEditVendorFields);
    } catch (error) {
      console.error(
        "Error adding vendor billing rate:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  //   const handleVendorBillRateChange = (id, value) => {
  //     setEditVendorBillRate((prev) => ({
  //       ...prev,
  //       [id]: value === "" ? "" : parseFloat(value) || 0,
  //     }));
  //   };

  // const handleVendorBillRateChange = (id, value) => {
  //   setEditVendorBillRate((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };
  const handleVendorBillRateChange = (id, value) => {
    setEditVendorBillRate((prev) => ({
      ...prev,
      [id]: value === "" ? "" : parseFloat(value) || 0,
    }));
  };
  const handleUpdateVendor = async (id, updatedData) => {
    setLoading(true);
    try {
      const fields = editVendorFields[id] || {};
      const row = vendorBillingRates.find((r) => r.id === id);
      const projVendRtKey = row?.projVendRtKey || id;

      await axios.put(
        `https://test-api-3tmq.onrender.com/ProjVendRt/${projVendRtKey}`,
        {
          projVendRtKey: projVendRtKey,
          projId: selectedProjectId,
          vendId: updatedData.vendorId,
          vendEmplId: updatedData.vendorEmployee,
          billLabCatCd: updatedData.plc,
          billDiscRt: 0,
          companyId: "1",
          billRtAmt: parseFloat(editVendorBillRate[id] ?? updatedData.billRate),
          startDt: new Date(
            fields.startDate || updatedData.startDate
          ).toISOString(),
          endDt: fields.endDate
            ? new Date(fields.endDate).toISOString()
            : updatedData.endDate
            ? new Date(updatedData.endDate).toISOString()
            : null,
          sBillRtTypeCd: fields.rateType || updatedData.rateType,
          type: fields.lookupType || updatedData.lookupType,
          modifiedBy: "admin",
          timeStamp: new Date().toISOString(),
        }
      );
      setVendorBillingRates((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                lookupType: fields.lookupType || updatedData.lookupType,
                vendorId: updatedData.vendorId,
                vendorName: updatedData.vendorName,
                vendorEmployee: updatedData.vendorEmployee,
                vendorEmployeeName: updatedData.vendorEmployeeName,
                plc: updatedData.plc,
                plcDescription:
                  plcs.find((plc) => plc.laborCategoryCode === updatedData.plc)
                    ?.description || updatedData.plcDescription,
                billRate: parseFloat(
                  editVendorBillRate[id] || updatedData.billRate
                ),
                rateType: fields.rateType || updatedData.rateType,
                startDate: fields.startDate || updatedData.startDate,
                endDate: fields.endDate || updatedData.endDate || null,
              }
            : rate
        )
      );
      //   setEditVendorBillRate((prev) => ({
      //     ...prev,
      //     [id]: parseFloat(editVendorBillRate[id] || updatedData.billRate),
      //   }));
      setEditVendorBillRate((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      setEditVendorFields((prev) => ({
        ...prev,
        [id]: {
          lookupType: fields.lookupType || updatedData.lookupType,
          rateType: fields.rateType || updatedData.rateType,
          startDate: fields.startDate || updatedData.startDate,
          endDate: fields.endDate || updatedData.endDate || null,
        },
      }));
      setEditingVendorRowId(null);
    } catch (error) {
      console.error("Error updating vendor billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVendor = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://test-api-3tmq.onrender.com/ProjVendRt/${id}`);
      setVendorBillingRates((prev) => prev.filter((rate) => rate.id !== id));
      setEditVendorBillRate((prev) => {
        const newEditVendorBillRate = { ...prev };
        delete newEditVendorBillRate[id];
        return newEditVendorBillRate;
      });
      setEditVendorFields((prev) => {
        const newEditVendorFields = { ...prev };
        delete newEditVendorFields[id];
        return newEditVendorFields;
      });
      setEditingVendorRowId(null);
    } catch (error) {
      console.error("Error deleting vendor billing rate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewVendorRateChange = (field, value) => {
    setNewVendorRate((prev) => ({ ...prev, [field]: value }));
  };

  const handleVendorFieldChange = (id, field, value) => {
    if (field === "billRate") {
      handleVendorBillRateChange(id, value);
      return;
    }
    if (field === "vendorId") {
      const selectedVend = vendorEmployees.find((v) => v.vendId === value);
      setEditVendorFields((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          vendorId: value,
          vendorName: selectedVend
            ? selectedVend.employeeName
            : prev[id]?.vendorName,
          vendorEmployee: selectedVend
            ? selectedVend.empId
            : prev[id]?.vendorEmployee,
          vendorEmployeeName: selectedVend
            ? selectedVend.employeeName
            : prev[id]?.vendorEmployeeName,
        },
      }));
      setVendorBillingRates((prev) =>
        prev.map((rate) =>
          rate.id === id
            ? {
                ...rate,
                vendorId: value,
                vendorName: selectedVend
                  ? selectedVend.employeeName
                  : rate.vendorName,
                vendorEmployee: selectedVend
                  ? selectedVend.empId
                  : rate.vendorEmployee,
                vendorEmployeeName: selectedVend
                  ? selectedVend.employeeName
                  : rate.vendorEmployeeName,
              }
            : rate
        )
      );
      return;
    }
    setEditVendorFields((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    if (
      field !== "lookupType" &&
      field !== "rateType" &&
      field !== "startDate" &&
      field !== "endDate" &&
      field !== "billRate"
    ) {
      setVendorBillingRates((prev) =>
        prev.map((rate) =>
          rate.id === id ? { ...rate, [field]: value } : rate
        )
      );
    }
  };

  const handleEditEmployeeRow = (id) => {
    setEditingEmployeeRowId(id);
  };

  const handleEditVendorRow = (id) => {
    setEditingVendorRowId(id);
  };

  return (
    <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 text-xs">
      <div className="mb-4">
        <h3 className="text-xs font-normal">
          Project Labor Categories Billing Rates Schedule
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 font-normal">Plc</th>
                <th className="border p-2 font-normal">Bill Rate</th>
                <th className="border p-2 font-normal">Rate Type</th>
                <th className="border p-2 font-normal">Start Date</th>
                <th className="border p-2 font-normal">End Date</th>
                <th className="border p-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr key="loading">
                  <td colSpan="6" className="border p-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : billingRatesSchedule.length === 0 ? (
                <tr key="no-data">
                  <td colSpan="6" className="border p-2 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                billingRatesSchedule.map((item) => (
                  <tr
                    key={item.id}
                    className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
                  >
                    <td className="border p-2 sm:w-1/8">
                      <span>{item.plc}</span>
                    </td>
                    <td className="border p-2 sm:w-1/5">
                      <input
                        type="text"
                        value={editBillRate[item.id] ?? item.billRate}
                        onChange={(e) =>
                          handleBillRateChange(item.id, e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-2 sm:w-1/5">
                      <select
                        value={item.rateType}
                        onChange={(e) =>
                          handleNewRateChange("rateType", e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      >
                        {rateTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-2 sm:w-1/5">
                      <input
                        type="date"
                        value={item.startDate}
                        onChange={(e) =>
                          handleNewRateChange("startDate", e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-2 sm:w-1/5">
                      <input
                        type="date"
                        value={item.endDate || ""}
                        onChange={(e) =>
                          handleNewRateChange("endDate", e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-2 sm:w-1/5">
                      <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() =>
                            handleUpdate(item.id, {
                              ...item,
                              billRate: editBillRate[item.id] || item.billRate,
                            })
                          }
                          className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-normal hover:bg-blue-300 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-normal hover:bg-gray-300 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {newRate && (
                <tr
                  key="new-rate"
                  className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
                >
                  <td className="border p-2 sm:w-1/5">
                    <input
                      type="text"
                      value={newRate.plc || ""}
                      onChange={(e) => {
                        handleNewRateChange("plc", e.target.value);
                        setPlcSearch(e.target.value);
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="plc-list"
                    />
                    <datalist id="plc-list">
                      {plcs.map((plc) => (
                        <option
                          key={plc.laborCategoryCode}
                          value={plc.laborCategoryCode}
                        >
                          {plc.description}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-2 sm:w-1/5">
                    <input
                      type="text"
                      value={newRate.billRate || ""}
                      onChange={(e) =>
                        handleNewRateChange("billRate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/5">
                    <select
                      value={newRate.rateType}
                      onChange={(e) =>
                        handleNewRateChange("rateType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 sm:w-1/5">
                    <input
                      type="date"
                      value={newRate.startDate || ""}
                      onChange={(e) =>
                        handleNewRateChange("startDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/5">
                    <input
                      type="date"
                      value={newRate.endDate || ""}
                      onChange={(e) =>
                        handleNewRateChange("endDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/5">
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={handleSaveNewRate}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewRate(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              <tr key="add-button">
                <td colSpan="6" className="border p-2">
                  <button
                    onClick={handleAddRow}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
                    disabled={loading || newRate}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-normal">Employee Billing Rates Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 font-normal">Lookup Type</th>
                <th className="border p-2 font-normal">Employee</th>
                <th className="border p-2 font-normal">Employee Name</th>
                <th className="border p-2 font-normal">PLC</th>
                <th className="border p-2 font-normal">PLC Description</th>
                <th className="border p-2 font-normal">Bill Rate</th>
                <th className="border p-2 font-normal">Rate Type</th>
                <th className="border p-2 font-normal">Start Date</th>
                <th className="border p-2 font-normal">End Date</th>
                <th className="border p-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="border p-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : employeeBillingRates.length === 0 && !newEmployeeRate ? (
                <tr>
                  <td colSpan="10" className="border p-2 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                employeeBillingRates.map((item) => (
                  <tr
                    key={item.id}
                    className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
                  >
                    <td className="border p-2 sm:w-1/8">
                      {editingEmployeeRowId === item.id ? (
                        <select
                          value={
                            editEmployeeFields[item.id]?.lookupType ??
                            item.lookupType
                          }
                          onChange={(e) =>
                            handleNewEmployeeRateChange(
                              "lookupType",
                              e.target.value,
                              item.id
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        >
                          {lookupTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditEmployeeRow(item.id)}
                        >
                          {item.lookupType}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      {editingEmployeeRowId === item.id ? (
                        <input
                          type="text"
                          value={item.empId}
                          onChange={(e) =>
                            handleNewEmployeeRateChange(
                              "empId",
                              e.target.value,
                              item.id
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                          list="employee-list"
                          disabled={employees.length === 0}
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditEmployeeRow(item.id)}
                        >
                          {item.empId}
                        </span>
                      )}
                      <datalist id="employee-list">
                        {employees.map((emp) => (
                          <option key={emp.empId} value={emp.empId}>
                            {emp.employeeName}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleEditEmployeeRow(item.id)}
                      >
                        {item.employeeName}
                      </span>
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      <input
                        type="text"
                        value={item.plc}
                        onChange={(e) => {
                          handleNewEmployeeRateChange(
                            "plc",
                            e.target.value,
                            item.id
                          );
                          setPlcSearch(e.target.value);
                        }}
                        className="w-full p-1 border rounded text-xs"
                        list="plc-list"
                        disabled
                      />
                      <datalist id="plc-list">
                        {plcs.map((plc) => (
                          <option
                            key={plc.laborCategoryCode}
                            value={plc.laborCategoryCode}
                          >
                            {plc.description}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleEditEmployeeRow(item.id)}
                      >
                        {plcs.find((plc) => plc.laborCategoryCode === item.plc)
                          ?.description || item.plcDescription}
                      </span>
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      {editingEmployeeRowId === item.id ? (
                        <input
                          type="text"
                          value={editEmployeeBillRate[item.id] ?? item.billRate}
                          onChange={(e) =>
                            handleEmployeeBillRateChange(
                              item.id,
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditEmployeeRow(item.id)}
                        >
                          {item.billRate}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      {editingEmployeeRowId === item.id ? (
                        <select
                          value={
                            editEmployeeFields[item.id]?.rateType ??
                            item.rateType
                          }
                          onChange={(e) =>
                            handleNewEmployeeRateChange(
                              "rateType",
                              e.target.value,
                              item.id
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        >
                          {rateTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditEmployeeRow(item.id)}
                        >
                          {item.rateType}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      {editingEmployeeRowId === item.id ? (
                        <input
                          type="date"
                          value={
                            editEmployeeFields[item.id]?.startDate ??
                            item.startDate
                          }
                          onChange={(e) =>
                            handleNewEmployeeRateChange(
                              "startDate",
                              e.target.value,
                              item.id
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditEmployeeRow(item.id)}
                        >
                          {item.startDate}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      {editingEmployeeRowId === item.id ? (
                        <input
                          type="date"
                          value={
                            editEmployeeFields[item.id]?.endDate ??
                            item.endDate ??
                            ""
                          }
                          onChange={(e) =>
                            handleNewEmployeeRateChange(
                              "endDate",
                              e.target.value,
                              item.id
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditEmployeeRow(item.id)}
                        >
                          {item.endDate || ""}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/8">
                      <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateEmployee(item.id, {
                              ...item,
                              billRate:
                                editEmployeeBillRate[item.id] || item.billRate,
                            })
                          }
                          className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-normal hover:bg-blue-300 transition w-full sm:w-auto"
                          disabled={loading || !item.id}
                        >
                          {editingEmployeeRowId === item.id ? "Save" : "Edit"}
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(item.id)}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-normal hover:bg-gray-300 transition w-full sm:w-auto"
                          disabled={loading || !item.id}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {newEmployeeRate && (
                <tr className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0">
                  <td className="border p-2 sm:w-1/8">
                    <select
                      value={newEmployeeRate.lookupType}
                      onChange={(e) =>
                        handleNewEmployeeRateChange(
                          "lookupType",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {lookupTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <input
                      type="text"
                      value={newEmployeeRate.empId || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("empId", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                      list="employee-list"
                      disabled={employees.length === 0}
                    />
                    <datalist id="employee-list">
                      {employees.map((emp) => (
                        <option key={emp.empId} value={emp.empId}>
                          {emp.employeeName}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    {newEmployeeRate.employeeName || ""}
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <input
                      type="text"
                      value={newEmployeeRate.plc || ""}
                      onChange={(e) => {
                        handleNewEmployeeRateChange("plc", e.target.value);
                        setPlcSearch(e.target.value);
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="plc-list"
                    />
                    <datalist id="plc-list">
                      {plcs.map((plc) => (
                        <option
                          key={plc.laborCategoryCode}
                          value={plc.laborCategoryCode}
                        >
                          {plc.description}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    {plcs.find(
                      (plc) => plc.laborCategoryCode === newEmployeeRate.plc
                    )?.description || ""}
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <input
                      type="text"
                      value={newEmployeeRate.billRate || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("billRate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <select
                      value={newEmployeeRate.rateType}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("rateType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <input
                      type="date"
                      value={newEmployeeRate.startDate || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("startDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <input
                      type="date"
                      value={newEmployeeRate.endDate || ""}
                      onChange={(e) =>
                        handleNewEmployeeRateChange("endDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/8">
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={handleSaveNewEmployeeRate}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewEmployeeRate(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="10" className="border p-2">
                  <button
                    onClick={handleAddEmployeeRow}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
                    disabled={loading || newEmployeeRate}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-normal">Vendor Billing Rates Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 font-normal">Lookup Type</th>
                <th className="border p-2 font-normal">Vendor</th>
                <th className="border p-2 font-normal">Vendor Name</th>
                <th className="border p-2 font-normal">Vendor Employee</th>
                <th className="border p-2 font-normal">Vendor Employee Name</th>
                <th className="border p-2 font-normal">PLC</th>
                <th className="border p-2 font-normal">PLC Description</th>
                <th className="border p-2 font-normal">Bill Rate</th>
                <th className="border p-2 font-normal">Rate Type</th>
                <th className="border p-2 font-normal">Start Date</th>
                <th className="border p-2 font-normal">End Date</th>
                <th className="border p-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="border p-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : vendorBillingRates.length === 0 && !newVendorRate ? (
                <tr>
                  <td colSpan="12" className="border p-2 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                vendorBillingRates.map((item) => (
                  <tr
                    key={item.id}
                    className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0"
                  >
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <select
                          value={
                            editVendorFields[item.id]?.lookupType ??
                            item.lookupType
                          }
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "lookupType",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        >
                          {vendorLookupTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.lookupType}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="text"
                          value={item.vendorId}
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "vendorId",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.vendorId}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="text"
                          value={item.vendorEmployeeName}
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "vendorName",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.vendorEmployeeName}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="text"
                          value={item.vendorEmployee}
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "vendorEmployee",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.vendorEmployee}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="text"
                          value={item.vendorEmployeeName}
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "vendorEmployeeName",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.vendorEmployeeName}
                        </span>
                      )}
                    </td>
                    {/* <td className="border p-2 sm:w-1/8">
                      <input
                        type="text"
                        value={editEmployeeBillRate[item.id] ?? item.billRate}
                        onChange={(e) =>
                          handleEmployeeBillRateChange(item.id, e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      />
                    </td> */}
                    <td className="border p-2 sm:w-1/10">
                      <span>{item.plc}</span>
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleEditVendorRow(item.id)}
                      >
                        {plcs.find((plc) => plc.laborCategoryCode === item.plc)
                          ?.description || item.plcDescription}
                      </span>
                    </td>
                    {/* <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="text"
                          value={editVendorBillRate[item.id] ?? item.billRate}
                          onChange={(e) =>
                            handleVendorBillRateChange(item.id, e.target.value)
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.billRate}
                        </span>
                      )}
                    </td> */}
                    <td className="border p-2 sm:w-1/10">
                      {/* <input
                        type="text"
                        value={
                          editVendorBillRate[item.id] !== undefined
                            ? editVendorBillRate[item.id]
                            : item.billRate
                        }
                        onChange={(e) =>
                          handleVendorBillRateChange(item.id, e.target.value)
                        }
                        className="w-full p-1 border rounded text-xs"
                      /> */}
                      
  <input
    type="text"
    value={editVendorBillRate[item.id] ?? item.billRate ?? ""}
    onChange={(e) => handleVendorBillRateChange(item.id, e.target.value)}
    className="w-full p-1 border rounded text-xs"
  />

                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <select
                          value={
                            editVendorFields[item.id]?.rateType ?? item.rateType
                          }
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "rateType",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        >
                          {rateTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.rateType}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="date"
                          value={
                            editVendorFields[item.id]?.startDate ??
                            item.startDate
                          }
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.startDate}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      {editingVendorRowId === item.id ? (
                        <input
                          type="date"
                          value={
                            editVendorFields[item.id]?.endDate ??
                            item.endDate ??
                            ""
                          }
                          onChange={(e) =>
                            handleVendorFieldChange(
                              item.id,
                              "endDate",
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditVendorRow(item.id)}
                        >
                          {item.endDate || ""}
                        </span>
                      )}
                    </td>
                    <td className="border p-2 sm:w-1/10">
                      <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateVendor(item.id, {
                              ...item,
                              billRate:
                                editVendorBillRate[item.id] || item.billRate,
                            })
                          }
                          className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-normal hover:bg-blue-300 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          {editingVendorRowId === item.id ? "Save" : "Edit"}
                        </button>
                        <button
                          onClick={() => handleDeleteVendor(item.id)}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-normal hover:bg-gray-300 transition w-full sm:w-auto"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {newVendorRate && (
                <tr className="sm:table-row flex flex-col sm:flex-row mb-2 sm:mb-0">
                  <td className="border p-2 sm:w-1/10">
                    <select
                      value={newVendorRate.lookupType}
                      onChange={(e) =>
                        handleNewVendorRateChange("lookupType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {vendorLookupTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="text"
                      value={newVendorRate.vendorId || ""}
                      onChange={(e) => {
                        const selectedVend = vendorEmployees.find(
                          (v) => v.vendId === e.target.value
                        );
                        setNewVendorRate((prev) => ({
                          ...prev,
                          vendorId: e.target.value,
                          vendorName: selectedVend
                            ? selectedVend.employeeName
                            : prev.vendorName,
                          vendorEmployee: selectedVend
                            ? selectedVend.empId
                            : prev.vendorEmployee,
                          vendorEmployeeName: selectedVend
                            ? selectedVend.employeeName
                            : prev.vendorEmployeeName,
                        }));
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="vendor-list"
                    />
                    <datalist id="vendor-list">
                      {vendorEmployees.map((v) => (
                        <option key={`${v.vendId}-${v.empId}`} value={v.vendId}>
                          {v.employeeName}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="text"
                      value={newVendorRate.vendorName || ""}
                      readOnly
                      onChange={(e) =>
                        handleNewVendorRateChange("vendorName", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="text"
                      value={newVendorRate.vendorEmployee || ""}
                      readOnly
                      onChange={(e) =>
                        handleNewVendorRateChange(
                          "vendorEmployee",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="text"
                      value={newVendorRate.vendorEmployeeName || ""}
                      readOnly
                      onChange={(e) =>
                        handleNewVendorRateChange(
                          "vendorEmployeeName",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="text"
                      value={newVendorRate.plc || ""}
                      onChange={(e) => {
                        handleNewVendorRateChange("plc", e.target.value);
                        setPlcSearch(e.target.value);
                      }}
                      className="w-full p-1 border rounded text-xs"
                      list="plc-list"
                    />
                    <datalist id="plc-list">
                      {plcs.map((plc) => (
                        <option
                          key={plc.laborCategoryCode}
                          value={plc.laborCategoryCode}
                        >
                          {plc.description}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    {plcs.find(
                      (plc) => plc.laborCategoryCode === newVendorRate.plc
                    )?.description || ""}
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="text"
                      value={newVendorRate.billRate || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("billRate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <select
                      value={newVendorRate.rateType}
                      onChange={(e) =>
                        handleNewVendorRateChange("rateType", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    >
                      {rateTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="date"
                      value={newVendorRate.startDate || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("startDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <input
                      type="date"
                      value={newVendorRate.endDate || ""}
                      onChange={(e) =>
                        handleNewVendorRateChange("endDate", e.target.value)
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2 sm:w-1/10">
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={handleSaveNewVendorRate}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-green-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewVendorRate(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-gray-600 transition w-full sm:w-auto"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="12" className="border p-2">
                  <button
                    onClick={handleAddVendorRow}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-normal hover:bg-blue-600 transition"
                    disabled={loading || newVendorRate}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PLCComponent;
