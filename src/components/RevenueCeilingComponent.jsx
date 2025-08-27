// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const RevenueCeilingComponent = ({ selectedPlan, revenueAccount }) => {
// //   const [periods, setPeriods] = useState([]);
// //   const [orgId, setOrgId] = useState('');
// //   const [acctId, setAcctId] = useState('');
// //   const [overrideAdjustments, setOverrideAdjustments] = useState(false);
// //   const [useFixedRevenue, setUseFixedRevenue] = useState(false);
// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [setupData, setSetupData] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // Format date to YYYY-MM-DD for display
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString('en-CA');
// //     } catch (e) {
// //       return 'Invalid Date';
// //     }
// //   };

// //   const fetchRevenueData = async () => {
// //     if (!selectedPlan?.projId || !selectedPlan?.version || !selectedPlan?.plType) {
// //       setPeriods([]);
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const { projId, version, plType } = selectedPlan;
// //       const url = `https://test-api-3tmq.onrender.com/ProjRevWrkPd/filter?projId=${projId}&versionNo=${version}&bgtType=${plType}`;
// //       const response = await axios.get(url);
// //       const newData = Array.isArray(response.data) ? response.data : [];
      
// //       // Preserve the order of existing periods by merging new data based on id
// //       setPeriods((prevPeriods) => {
// //         const updatedPeriods = prevPeriods.map((prevPeriod) => {
// //           const updatedPeriod = newData.find((newPeriod) => newPeriod.id === prevPeriod.id);
// //           return updatedPeriod || prevPeriod;
// //         });
// //         // Add any new periods that weren't in the previous state
// //         const newPeriodIds = new Set(updatedPeriods.map((p) => p.id));
// //         const additionalPeriods = newData.filter((newPeriod) => !newPeriodIds.has(newPeriod.id));
// //         return [...updatedPeriods, ...additionalPeriods];
// //       });
      
// //       // setAcctId(revenueAccount || (newData.length > 0 ? newData[0].acctId || '' : ''));
      

// //     } catch (error) {
// //       toast.error('Failed to fetch revenue data.');
// //       console.error("Fetch error:", error);
// //       setPeriods([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRevenueData();
// //     setOrgId(selectedPlan?.orgId || '');
// //   }, [selectedPlan, revenueAccount]);

// //   const handleInputChange = (index, field, value) => {
// //     const updatedPeriods = periods.map((period, i) => {
// //       if (i === index) {
// //         const updatedPeriod = { ...period, [field]: value };
// //         // For new rows, when endDate changes, update fiscalYear and period
// //         if (field === 'endDate' && period.id <= 0) {
// //           try {
// //             const date = new Date(value);
// //             if (!isNaN(date)) {
// //               updatedPeriod.fiscalYear = date.getFullYear().toString();
// //               updatedPeriod.period = (date.getMonth() + 1).toString(); // Month is 0-based, so add 1
// //             }
// //           } catch (e) {
// //             console.error("Date parsing error:", e);
// //           }
// //         }
// //         return updatedPeriod;
// //       }
// //       return period;
// //     });
// //     setPeriods(updatedPeriods);
// //   };

// //   useEffect(() => {
// //   const fetchSetupData = async () => {
// //     if (!selectedPlan?.projId || !selectedPlan?.version || !selectedPlan?.plType) return;
// //     try {
// //       const url = `https://test-api-3tmq.onrender.com/ProjBgtRevSetup/GetByProjectId/${selectedPlan.projId}/${selectedPlan.version}/${selectedPlan.plType}`;
// //       const response = await axios.get(url);
// //       // Defensive: handle both array and object response
// //       const data = Array.isArray(response.data) ? response.data[0] : response.data;
// //       if (data) {
// //         setUseFixedRevenue(!!data.overrideRevAmtFl);
// //         setOverrideAdjustments(!!data.useBillBurdenRates);
// //         setSetupData(data);
// //          setAcctId(data.revAcctId || '');
// //       }
// //     } catch (error) {
// //       // Optionally show a toast or just log
// //       console.error("Failed to fetch revenue setup data", error);
// //     }
// //   };
// //   fetchSetupData();
// // }, [selectedPlan]);

// //   const handleRevAdjBlur = async (index) => {
// //     const period = periods[index];
// //     if (period.id <= 0) return;

// //     const payload = {
// //       ...period,
// //       id: period.id,
// //       useFixedRevenue: useFixedRevenue,
// //       overrideSystemAdjustment: overrideAdjustments,
// //       revAmt: parseFloat(period.revAmt) || 0,
// //       revAdj: period.revAdj || '',
// //       fiscalYear: period.fiscalYear || '',
// //     };

// //     try {
// //       console.log('Updating revAdj with payload:', payload);
// //       await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
// //       toast.success("Revenue adjustment updated successfully!");
// //       fetchRevenueData();
// //     } catch (error) {
// //       toast.error("Failed to update revenue adjustment.");
// //       console.error("Upsert error:", error);
// //     }
// //   };

// //   const handleSetupCheckboxChange = async (field, value) => {
// //   if (!setupData) return;
// //   const updatedSetup = {
// //     ...setupData,
// //     [field]: value,
// //   };
// //   setSetupData(updatedSetup);

// //   // Update local checkbox state
// //   if (field === "overrideRevAmtFl") setUseFixedRevenue(value);
// //   if (field === "useBillBurdenRates") setOverrideAdjustments(value);

// //   try {
// //     await axios.post("https://test-api-3tmq.onrender.com/ProjBgtRevSetup/upsert", updatedSetup);
// //     toast.success("Revenue setup updated successfully!");
// //   } catch (error) {
// //     toast.error("Failed to update revenue setup.");
// //     // Optionally revert state on error
// //     setSetupData(setupData);
// //     if (field === "overrideRevAmtFl") setUseFixedRevenue(setupData.overrideRevAmtFl);
// //     if (field === "useBillBurdenRates") setOverrideAdjustments(setupData.useBillBurdenRates);
// //   }
// // };

// //   /*
// //   const handleAddNewRow = () => {
// //     setIsEditMode(true);
// //     const newRow = {
// //       id: -(new Date().getTime()),
// //       projId: selectedPlan.projId,
// //       versionNo: selectedPlan.version,
// //       bgtType: selectedPlan.plType,
// //       fiscalYear: '',
// //       period: '',
// //       endDate: new Date().toISOString().split('T')[0],
// //       revAmt: 0,
// //       revAdj: '',
// //       revDesc: '',
// //       useFixedRevenue: useFixedRevenue,
// //       overrideSystemAdjustment: overrideAdjustments,
// //     };
// //     setPeriods([newRow, ...periods]);
// //   };

// //   const handleSave = async () => {
// //     const newRow = periods.find((p) => p.id < 0);
// //     if (!newRow) {
// //       toast.warn("No new row to save.");
// //       return;
// //     }

// //     toast.info("Saving new row...");

// //     const payload = {
// //       ...newRow,
// //       id: 0,
// //       useFixedRevenue: useFixedRevenue,
// //       overrideSystemAdjustment: overrideAdjustments,
// //       revAmt: parseFloat(newRow.revAmt) || 0,
// //       revAdj: newRow.revAdj || '',
// //       fiscalYear: newRow.fiscalYear || '',
// //     };

// //     try {
// //       console.log('Saving new row with payload:', payload);
// //       await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
// //       toast.success("New row saved successfully!");
// //       setIsEditMode(false);
// //       fetchRevenueData();
// //     } catch (error) {
// //       toast.error("Failed to save new row.");
// //       console.error("Upsert error:", error);
// //     }
// //   };
// //   */

// //   const handleCancel = () => {
// //     setIsEditMode(false);
// //     fetchRevenueData();
// //   };




// //   return (
// //     <div className=" p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
// //       <div className="flex flex-col space-y-4">
// //         <div className="flex flex-col sm:flex-row gap-4">
// //           <div className="flex-1">
// //             <label className="text-sm font-normal">Org ID</label>
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
// //               value={orgId}
// //               readOnly
// //             />
// //           </div>
// //           <div className="flex-1">
// //             <label className="text-sm font-normal">Acct ID</label>
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
// //               value={acctId}
// //               readOnly
// //             />
// //           </div>
// //         </div>

// //         <div className="space-y-2">
// //           <div>
// //             <label className="text-sm font-normal mr-2">Use Fixed Revenue Amount as Total Revenue</label>
// //             <input
// //               type="checkbox"
// //               className="text-sm font-normal"
// //               checked={useFixedRevenue}
// //               onChange={(e) => handleSetupCheckboxChange("overrideRevAmtFl", e.target.checked)}
// //             />
// //           </div>
// //           <div>
// //             <label className="text-sm font-normal mr-2">Override Revenue Adjustments from Accounting System</label>
// //             <input
// //               type="checkbox"
// //               className="text-sm font-normal"
// //               checked={overrideAdjustments}
// //               onChange={(e) => handleSetupCheckboxChange("useBillBurdenRates", e.target.checked)}
// //             />
// //           </div>
// //         </div>

// //         <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
// //           <table className="w-full text-sm border-collapse">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="border p-2 font-normal">Fiscal Year</th>
// //                 <th className="border p-2 font-normal min-w-[60px]">Period</th>
// //                 <th className="border p-2 font-normal min-w-[150px]">End Date</th>
// //                 <th className="border p-2 font-normal min-w-[100px]">Fixed Revenue Amount</th>
// //                 <th className="border p-2 font-normal">Revenue Adjustment</th>
// //                 <th className="border p-2 font-normal">Description</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {loading ? (
// //                 <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
// //               ) : periods.length > 0 ? (
// //                 periods.map((period, index) => {
// //                   const isNewRow = period.id <= 0;
// //                   const isRevAdjDisabled = !overrideAdjustments;

// //                   return (
// //                     <tr key={period.id}>
// //                       <td className="border p-2">
// //                         {isNewRow ? (
// //                           <input
// //                             type="text"
// //                             className="w-full p-1 border rounded text-sm font-normal"
// //                             value={period.fiscalYear || ''}
// //                             onChange={(e) => handleInputChange(index, 'fiscalYear', e.target.value)}
// //                           />
// //                         ) : (
// //                           <span className="text-sm font-normal">{period.fy_Cd}</span>
// //                         )}
// //                       </td>
// //                       <td className="border p-2 min-w-[60px]">
// //                         <input
// //                           type="text"
// //                           className="w-full p-1 text-sm font-normal"
// //                           value={period.period || ''}
// //                           onChange={(e) => handleInputChange(index, 'period', e.target.value)}
// //                           disabled={!isNewRow}
// //                         />
// //                       </td>
// //                       <td className="border p-2 min-w-[150px]">
// //                         {isNewRow ? (
// //                           <input
// //                             type="date"
// //                             className="w-full p-1 border rounded text-sm font-normal"
// //                             value={period.endDate ? period.endDate.split('T')[0] : ''}
// //                             onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
// //                           />
// //                         ) : (
// //                           <span className="text-sm font-normal">{formatDate(period.endDate)}</span>
// //                         )}
// //                       </td>
// //                       <td className="border p-2 min-w-[100px]">
// //                         <input
// //                           type="number"
// //                           className="w-full p-1 border rounded text-sm font-normal bg-gray-200"
// //                           value={period.revAmt ?? 0}
// //                           disabled={true}
// //                         />
// //                       </td>
// //                       <td className="border p-2">
// //                         <input
// //                           type="text"
// //                           className={`w-full p-1 border rounded text-sm font-normal ${isRevAdjDisabled ? 'bg-gray-200' : 'bg-white'}`}
// //                           value={period.revAdj ?? 0}
// //                           onChange={(e) => handleInputChange(index, 'revAdj', e.target.value)}
// //                           onBlur={() => !isNewRow && handleRevAdjBlur(index)}
// //                           disabled={isRevAdjDisabled}
// //                         />
// //                       </td>
// //                       <td className="border p-2">
// //                         <input
// //                           type="text"
// //                           className="w-full p-1 text-sm font-normal"
// //                           value={period.revDesc || ''}
// //                           onChange={(e) => handleInputChange(index, 'revDesc', e.target.value)}
// //                           disabled={!isEditMode && !isNewRow}
// //                         />
// //                       </td>
// //                     </tr>
// //                   );
// //                 })
// //               ) : (
// //                 <tr><td colSpan="6" className="text-center p-4">No revenue ceiling data found for this plan.</td></tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="flex justify-end space-x-2 mt-4">
// //           {/* 
// //           {!isEditMode ? (
// //             <button
// //               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-normal"
// //               onClick={handleAddNewRow}
// //             >
// //               New
// //             </button>
// //           ) : (
// //             <>
// //               <button
// //                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-normal"
// //                 onClick={handleSave}
// //               >
// //                 Save
// //               </button>
// //               <button
// //                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
// //                 onClick={handleCancel}
// //               >
// //                 Cancel
// //               </button>
// //             </>
// //           )}
// //           */}
// //           {isEditMode && (
// //             <button
// //               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
// //               onClick={handleCancel}
// //             >
// //               Cancel
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RevenueCeilingComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const RevenueCeilingComponent = ({ selectedPlan, revenueAccount }) => {
//   const [periods, setPeriods] = useState([]);
//   const [orgId, setOrgId] = useState('');
//   const [acctId, setAcctId] = useState('');
//   const [overrideAdjustments, setOverrideAdjustments] = useState(false);
//   const [useFixedRevenue, setUseFixedRevenue] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [setupData, setSetupData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Format date to YYYY-MM-DD for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-CA');
//     } catch (e) {
//       return 'Invalid Date';
//     }
//   };

//   // Function to handle revenue adjustment validation
//   const handleRevAdjChange = (value, index) => {
//     // Allow empty string
//     if (value === "") {
//       handleInputChange(index, 'revAdj', "");
//       return;
//     }

//     // Remove any non-numeric characters except decimal point and minus sign
//     const cleanValue = value.replace(/[^0-9.-]/g, '');
    
//     // Check for valid number format (allow negative numbers and decimals)
//     const numericRegex = /^-?\d*\.?\d*$/;
    
//     if (numericRegex.test(cleanValue)) {
//       const numValue = parseFloat(cleanValue);
      
//       // Check if it's a valid number and within reasonable range
//       if (!isNaN(numValue)) {
//         // Set reasonable range limits (adjust as needed for your business logic)
//         const maxValue = 999999999.99; // 999 million with 2 decimal places
//         const minValue = -999999999.99; // Allow negative adjustments
        
//         if (numValue >= minValue && numValue <= maxValue) {
//           handleInputChange(index, 'revAdj', cleanValue);
//         } else {
//           // Show toast for out of range values
//           toast.warning(`Revenue Adjustment must be between ${minValue.toLocaleString()} and ${maxValue.toLocaleString()}`, {
//             toastId: "revenue-adj-range-warning",
//             autoClose: 3000,
//           });
//         }
//       } else {
//         handleInputChange(index, 'revAdj', cleanValue);
//       }
//     } else {
//       // Show toast for invalid format
//       toast.warning("Revenue Adjustment must be a valid numeric value", {
//         toastId: "revenue-adj-format-warning",
//         autoClose: 3000,
//       });
//     }
//   };

//   const fetchRevenueData = async () => {
//     if (!selectedPlan?.projId || !selectedPlan?.version || !selectedPlan?.plType) {
//       setPeriods([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const { projId, version, plType } = selectedPlan;
//       const url = `https://test-api-3tmq.onrender.com/ProjRevWrkPd/filter?projId=${projId}&versionNo=${version}&bgtType=${plType}`;
//       const response = await axios.get(url);
//       const newData = Array.isArray(response.data) ? response.data : [];
      
//       // Preserve the order of existing periods by merging new data based on id
//       setPeriods((prevPeriods) => {
//         const updatedPeriods = prevPeriods.map((prevPeriod) => {
//           const updatedPeriod = newData.find((newPeriod) => newPeriod.id === prevPeriod.id);
//           return updatedPeriod || prevPeriod;
//         });
//         // Add any new periods that weren't in the previous state
//         const newPeriodIds = new Set(updatedPeriods.map((p) => p.id));
//         const additionalPeriods = newData.filter((newPeriod) => !newPeriodIds.has(newPeriod.id));
//         return [...updatedPeriods, ...additionalPeriods];
//       });
      
//       // setAcctId(revenueAccount || (newData.length > 0 ? newData[0].acctId || '' : ''));
      
//     } catch (error) {
//       toast.error('Failed to fetch revenue data.');
//       console.error("Fetch error:", error);
//       setPeriods([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRevenueData();
//     setOrgId(selectedPlan?.orgId || '');
//   }, [selectedPlan, revenueAccount]);

//   const handleInputChange = (index, field, value) => {
//     const updatedPeriods = periods.map((period, i) => {
//       if (i === index) {
//         const updatedPeriod = { ...period, [field]: value };
//         // For new rows, when endDate changes, update fiscalYear and period
//         if (field === 'endDate' && period.id <= 0) {
//           try {
//             const date = new Date(value);
//             if (!isNaN(date)) {
//               updatedPeriod.fiscalYear = date.getFullYear().toString();
//               updatedPeriod.period = (date.getMonth() + 1).toString(); // Month is 0-based, so add 1
//             }
//           } catch (e) {
//             console.error("Date parsing error:", e);
//           }
//         }
//         return updatedPeriod;
//       }
//       return period;
//     });
//     setPeriods(updatedPeriods);
//   };

//   useEffect(() => {
//     const fetchSetupData = async () => {
//       if (!selectedPlan?.projId || !selectedPlan?.version || !selectedPlan?.plType) return;
//       try {
//         const url = `https://test-api-3tmq.onrender.com/ProjBgtRevSetup/GetByProjectId/${selectedPlan.projId}/${selectedPlan.version}/${selectedPlan.plType}`;
//         const response = await axios.get(url);
//         // Defensive: handle both array and object response
//         const data = Array.isArray(response.data) ? response.data[0] : response.data;
//         if (data) {
//           setUseFixedRevenue(!!data.overrideRevAmtFl);
//           setOverrideAdjustments(!!data.useBillBurdenRates);
//           setSetupData(data);
//           setAcctId(data.revAcctId || '');
//         }
//       } catch (error) {
//         // Optionally show a toast or just log
//         console.error("Failed to fetch revenue setup data", error);
//       }
//     };
//     fetchSetupData();
//   }, [selectedPlan]);

//   const handleRevAdjBlur = async (index) => {
//     const period = periods[index];
//     if (period.id <= 0) return;

//     const payload = {
//       ...period,
//       id: period.id,
//       useFixedRevenue: useFixedRevenue,
//       overrideSystemAdjustment: overrideAdjustments,
//       revAmt: parseFloat(period.revAmt) || 0,
//       revAdj: period.revAdj || '',
//       fiscalYear: period.fiscalYear || '',
//     };

//     try {
//       console.log('Updating revAdj with payload:', payload);
//       await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
//       toast.success("Revenue adjustment updated successfully!");
//       fetchRevenueData();
//     } catch (error) {
//       toast.error("Failed to update revenue adjustment.");
//       console.error("Upsert error:", error);
//     }
//   };

//   const handleSetupCheckboxChange = async (field, value) => {
//     if (!setupData) return;
//     const updatedSetup = {
//       ...setupData,
//       [field]: value,
//     };
//     setSetupData(updatedSetup);

//     // Update local checkbox state
//     if (field === "overrideRevAmtFl") setUseFixedRevenue(value);
//     if (field === "useBillBurdenRates") setOverrideAdjustments(value);

//     try {
//       await axios.post("https://test-api-3tmq.onrender.com/ProjBgtRevSetup/upsert", updatedSetup);
//       toast.success("Revenue setup updated successfully!");
//     } catch (error) {
//       toast.error("Failed to update revenue setup.");
//       // Optionally revert state on error
//       setSetupData(setupData);
//       if (field === "overrideRevAmtFl") setUseFixedRevenue(setupData.overrideRevAmtFl);
//       if (field === "useBillBurdenRates") setOverrideAdjustments(setupData.useBillBurdenRates);
//     }
//   };

//   /*
//   const handleAddNewRow = () => {
//     setIsEditMode(true);
//     const newRow = {
//       id: -(new Date().getTime()),
//       projId: selectedPlan.projId,
//       versionNo: selectedPlan.version,
//       bgtType: selectedPlan.plType,
//       fiscalYear: '',
//       period: '',
//       endDate: new Date().toISOString().split('T')[0],
//       revAmt: 0,
//       revAdj: '',
//       revDesc: '',
//       useFixedRevenue: useFixedRevenue,
//       overrideSystemAdjustment: overrideAdjustments,
//     };
//     setPeriods([newRow, ...periods]);
//   };

//   const handleSave = async () => {
//     const newRow = periods.find((p) => p.id < 0);
//     if (!newRow) {
//       toast.warn("No new row to save.");
//       return;
//     }

//     toast.info("Saving new row...");

//     const payload = {
//       ...newRow,
//       id: 0,
//       useFixedRevenue: useFixedRevenue,
//       overrideSystemAdjustment: overrideAdjustments,
//       revAmt: parseFloat(newRow.revAmt) || 0,
//       revAdj: newRow.revAdj || '',
//       fiscalYear: newRow.fiscalYear || '',
//     };

//     try {
//       console.log('Saving new row with payload:', payload);
//       await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
//       toast.success("New row saved successfully!");
//       setIsEditMode(false);
//       fetchRevenueData();
//     } catch (error) {
//       toast.error("Failed to save new row.");
//       console.error("Upsert error:", error);
//     }
//   };
//   */

//   const handleCancel = () => {
//     setIsEditMode(false);
//     fetchRevenueData();
//   };

//   return (
//     <div className=" p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
//       <div className="flex flex-col space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <label className="text-sm font-normal">Org ID</label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
//               value={orgId}
//               readOnly
//             />
//           </div>
//           <div className="flex-1">
//             <label className="text-sm font-normal">Acct ID</label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
//               value={acctId}
//               readOnly
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <div>
//             <label className="text-sm font-normal mr-2">Use Fixed Revenue Amount as Total Revenue</label>
//             <input
//               type="checkbox"
//               className="text-sm font-normal"
//               checked={useFixedRevenue}
//               onChange={(e) => handleSetupCheckboxChange("overrideRevAmtFl", e.target.checked)}
//             />
//           </div>
//           <div>
//             <label className="text-sm font-normal mr-2">Override Revenue Adjustments from Accounting System</label>
//             <input
//               type="checkbox"
//               className="text-sm font-normal"
//               checked={overrideAdjustments}
//               onChange={(e) => handleSetupCheckboxChange("useBillBurdenRates", e.target.checked)}
//             />
//           </div>
//         </div>

//         <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 font-normal">Fiscal Year</th>
//                 <th className="border p-2 font-normal min-w-[60px]">Period</th>
//                 <th className="border p-2 font-normal min-w-[150px]">End Date</th>
//                 <th className="border p-2 font-normal min-w-[100px]">Fixed Revenue Amount</th>
//                 <th className="border p-2 font-normal">Revenue Adjustment</th>
//                 <th className="border p-2 font-normal">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
//               ) : periods.length > 0 ? (
//                 periods.map((period, index) => {
//                   const isNewRow = period.id <= 0;
//                   const isRevAdjDisabled = !overrideAdjustments;

//                   return (
//                     <tr key={period.id}>
//                       <td className="border p-2">
//                         {isNewRow ? (
//                           <input
//                             type="text"
//                             className="w-full p-1 border rounded text-sm font-normal"
//                             value={period.fiscalYear || ''}
//                             onChange={(e) => handleInputChange(index, 'fiscalYear', e.target.value)}
//                           />
//                         ) : (
//                           <span className="text-sm font-normal">{period.fy_Cd}</span>
//                         )}
//                       </td>
//                       <td className="border p-2 min-w-[60px]">
//                         <input
//                           type="text"
//                           className="w-full p-1 text-sm font-normal"
//                           value={period.period || ''}
//                           onChange={(e) => handleInputChange(index, 'period', e.target.value)}
//                           disabled={!isNewRow}
//                         />
//                       </td>
//                       <td className="border p-2 min-w-[150px]">
//                         {isNewRow ? (
//                           <input
//                             type="date"
//                             className="w-full p-1 border rounded text-sm font-normal"
//                             value={period.endDate ? period.endDate.split('T')[0] : ''}
//                             onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
//                           />
//                         ) : (
//                           <span className="text-sm font-normal">{formatDate(period.endDate)}</span>
//                         )}
//                       </td>
//                       <td className="border p-2 min-w-[100px]">
//                         <input
//                           type="number"
//                           className="w-full p-1 border rounded text-sm font-normal bg-gray-200"
//                           value={period.revAmt ?? 0}
//                           disabled={true}
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           type="text"
//                           className={`w-full p-1 border rounded text-sm font-normal ${isRevAdjDisabled ? 'bg-gray-200' : 'bg-white'}`}
//                           value={period.revAdj ?? 0}
//                           onChange={(e) => handleRevAdjChange(e.target.value, index)}
//                           onBlur={() => !isNewRow && handleRevAdjBlur(index)}
//                           disabled={isRevAdjDisabled}
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           type="text"
//                           className="w-full p-1 text-sm font-normal"
//                           value={period.revDesc || ''}
//                           onChange={(e) => handleInputChange(index, 'revDesc', e.target.value)}
//                           disabled={!isEditMode && !isNewRow}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr><td colSpan="6" className="text-center p-4">No revenue ceiling data found for this plan.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-end space-x-2 mt-4">
//           {/* 
//           {!isEditMode ? (
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-normal"
//               onClick={handleAddNewRow}
//             >
//               New
//             </button>
//           ) : (
//             <>
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-normal"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//             </>
//           )}
//           */}
//           {isEditMode && (
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RevenueCeilingComponent;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const RevenueCeilingComponent = ({ selectedPlan, revenueAccount }) => {
//   const [periods, setPeriods] = useState([]);
//   const [orgId, setOrgId] = useState('');
//   const [acctId, setAcctId] = useState('');
//   const [overrideAdjustments, setOverrideAdjustments] = useState(false);
//   const [useFixedRevenue, setUseFixedRevenue] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [setupData, setSetupData] = useState(null);
//   const [loading, setLoading] = useState(false);


//   // Format date to YYYY-MM-DD for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-CA');
//     } catch (e) {
//       return 'Invalid Date';
//     }
//   };


//   // Function to handle revenue adjustment validation
//   const handleRevAdjChange = (value, index) => {
//     // Allow empty string
//     if (value === "") {
//       handleInputChange(index, 'revAdj', "");
//       return;
//     }

//     // Remove any non-numeric characters except decimal point and minus sign
//     const cleanValue = value.replace(/[^0-9.-]/g, '');
    
//     // Check if the original value contains any alphabetic characters
//     const hasAlphabetic = /[a-zA-Z]/.test(value);
    
//     if (hasAlphabetic) {
//       // Show toast for alphabetic characters
//       toast.warning("Revenue Adjustment must be a numeric value only", {
//         toastId: "revenue-adj-alpha-warning",
//         autoClose: 3000,
//       });
//       return;
//     }
    
//     // Check for valid number format (allow negative numbers and decimals)
//     const numericRegex = /^-?\d*\.?\d*$/;
    
//     if (numericRegex.test(cleanValue)) {
//       const numValue = parseFloat(cleanValue);
      
//       // Check if it's a valid number or allow the intermediate typing states
//       if (!isNaN(numValue) || cleanValue === '-' || cleanValue.endsWith('.')) {
//         handleInputChange(index, 'revAdj', cleanValue);
//       } else {
//         handleInputChange(index, 'revAdj', cleanValue);
//       }
//     } else {
//       // Show toast for invalid format
//       toast.warning("Revenue Adjustment must be a valid numeric value", {
//         toastId: "revenue-adj-format-warning",
//         autoClose: 3000,
//       });
//     }
//   };


//   const fetchRevenueData = async () => {
//     if (!selectedPlan?.projId || !selectedPlan?.version || !selectedPlan?.plType) {
//       setPeriods([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const { projId, version, plType } = selectedPlan;
//       const url = `https://test-api-3tmq.onrender.com/ProjRevWrkPd/filter?projId=${projId}&versionNo=${version}&bgtType=${plType}`;
//       const response = await axios.get(url);
//       const newData = Array.isArray(response.data) ? response.data : [];
      
//       // Preserve the order of existing periods by merging new data based on id
//       setPeriods((prevPeriods) => {
//         const updatedPeriods = prevPeriods.map((prevPeriod) => {
//           const updatedPeriod = newData.find((newPeriod) => newPeriod.id === prevPeriod.id);
//           return updatedPeriod || prevPeriod;
//         });
//         // Add any new periods that weren't in the previous state
//         const newPeriodIds = new Set(updatedPeriods.map((p) => p.id));
//         const additionalPeriods = newData.filter((newPeriod) => !newPeriodIds.has(newPeriod.id));
//         return [...updatedPeriods, ...additionalPeriods];
//       });
      
//       // setAcctId(revenueAccount || (newData.length > 0 ? newData[0].acctId || '' : ''));
      
//     } catch (error) {
//       toast.error('Failed to fetch revenue data.');
//       console.error("Fetch error:", error);
//       setPeriods([]);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchRevenueData();
//     setOrgId(selectedPlan?.orgId || '');
//   }, [selectedPlan, revenueAccount]);


//   const handleInputChange = (index, field, value) => {
//     const updatedPeriods = periods.map((period, i) => {
//       if (i === index) {
//         const updatedPeriod = { ...period, [field]: value };
//         // For new rows, when endDate changes, update fiscalYear and period
//         if (field === 'endDate' && period.id <= 0) {
//           try {
//             const date = new Date(value);
//             if (!isNaN(date)) {
//               updatedPeriod.fiscalYear = date.getFullYear().toString();
//               updatedPeriod.period = (date.getMonth() + 1).toString(); // Month is 0-based, so add 1
//             }
//           } catch (e) {
//             console.error("Date parsing error:", e);
//           }
//         }
//         return updatedPeriod;
//       }
//       return period;
//     });
//     setPeriods(updatedPeriods);
//   };


//   useEffect(() => {
//     const fetchSetupData = async () => {
//       if (!selectedPlan?.projId || !selectedPlan?.version || !selectedPlan?.plType) return;
//       try {
//         const url = `https://test-api-3tmq.onrender.com/ProjBgtRevSetup/GetByProjectId/${selectedPlan.projId}/${selectedPlan.version}/${selectedPlan.plType}`;
//         const response = await axios.get(url);
//         // Defensive: handle both array and object response
//         const data = Array.isArray(response.data) ? response.data[0] : response.data;
//         if (data) {
//           setUseFixedRevenue(!!data.overrideRevAmtFl);
//           setOverrideAdjustments(!!data.useBillBurdenRates);
//           setSetupData(data);
//           setAcctId(data.revAcctId || '');
//         }
//       } catch (error) {
//         // Optionally show a toast or just log
//         console.error("Failed to fetch revenue setup data", error);
//       }
//     };
//     fetchSetupData();
//   }, [selectedPlan]);


//   const handleRevAdjBlur = async (index) => {
//     const period = periods[index];
//     if (period.id <= 0) return;


//     const payload = {
//       ...period,
//       id: period.id,
//       useFixedRevenue: useFixedRevenue,
//       overrideSystemAdjustment: overrideAdjustments,
//       revAmt: parseFloat(period.revAmt) || 0,
//       revAdj: period.revAdj || '',
//       fiscalYear: period.fiscalYear || '',
//     };


//     try {
//       console.log('Updating revAdj with payload:', payload);
//       await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
//       toast.success("Revenue adjustment updated successfully!");
//       fetchRevenueData();
//     } catch (error) {
//       toast.error("Failed to update revenue adjustment.");
//       console.error("Upsert error:", error);
//     }
//   };


//   const handleSetupCheckboxChange = async (field, value) => {
//     if (!setupData) return;
//     const updatedSetup = {
//       ...setupData,
//       [field]: value,
//     };
//     setSetupData(updatedSetup);


//     // Update local checkbox state
//     if (field === "overrideRevAmtFl") setUseFixedRevenue(value);
//     if (field === "useBillBurdenRates") setOverrideAdjustments(value);


//     try {
//       await axios.post("https://test-api-3tmq.onrender.com/ProjBgtRevSetup/upsert", updatedSetup);
//       toast.success("Revenue setup updated successfully!");
//     } catch (error) {
//       toast.error("Failed to update revenue setup.");
//       // Optionally revert state on error
//       setSetupData(setupData);
//       if (field === "overrideRevAmtFl") setUseFixedRevenue(setupData.overrideRevAmtFl);
//       if (field === "useBillBurdenRates") setOverrideAdjustments(setupData.useBillBurdenRates);
//     }
//   };


//   /*
//   const handleAddNewRow = () => {
//     setIsEditMode(true);
//     const newRow = {
//       id: -(new Date().getTime()),
//       projId: selectedPlan.projId,
//       versionNo: selectedPlan.version,
//       bgtType: selectedPlan.plType,
//       fiscalYear: '',
//       period: '',
//       endDate: new Date().toISOString().split('T')[0],
//       revAmt: 0,
//       revAdj: '',
//       revDesc: '',
//       useFixedRevenue: useFixedRevenue,
//       overrideSystemAdjustment: overrideAdjustments,
//     };
//     setPeriods([newRow, ...periods]);
//   };


//   const handleSave = async () => {
//     const newRow = periods.find((p) => p.id < 0);
//     if (!newRow) {
//       toast.warn("No new row to save.");
//       return;
//     }


//     toast.info("Saving new row...");


//     const payload = {
//       ...newRow,
//       id: 0,
//       useFixedRevenue: useFixedRevenue,
//       overrideSystemAdjustment: overrideAdjustments,
//       revAmt: parseFloat(newRow.revAmt) || 0,
//       revAdj: newRow.revAdj || '',
//       fiscalYear: newRow.fiscalYear || '',
//     };


//     try {
//       console.log('Saving new row with payload:', payload);
//       await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
//       toast.success("New row saved successfully!");
//       setIsEditMode(false);
//       fetchRevenueData();
//     } catch (error) {
//       toast.error("Failed to save new row.");
//       console.error("Upsert error:", error);
//     }
//   };
//   */


//   const handleCancel = () => {
//     setIsEditMode(false);
//     fetchRevenueData();
//   };


//   return (
//     <div className=" p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
//       <div className="flex flex-col space-y-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <label className="text-sm font-normal">Org ID</label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
//               value={orgId}
//               readOnly
//             />
//           </div>
//           <div className="flex-1">
//             <label className="text-sm font-normal">Acct ID</label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
//               value={acctId}
//               readOnly
//             />
//           </div>
//         </div>


//         <div className="space-y-2">
//           <div>
//             <label className="text-sm font-normal mr-2">Use Fixed Revenue Amount as Total Revenue</label>
//             <input
//               type="checkbox"
//               className="text-sm font-normal"
//               checked={useFixedRevenue}
//               onChange={(e) => handleSetupCheckboxChange("overrideRevAmtFl", e.target.checked)}
//             />
//           </div>
//           <div>
//             <label className="text-sm font-normal mr-2">Override Revenue Adjustments from Accounting System</label>
//             <input
//               type="checkbox"
//               className="text-sm font-normal"
//               checked={overrideAdjustments}
//               onChange={(e) => handleSetupCheckboxChange("useBillBurdenRates", e.target.checked)}
//             />
//           </div>
//         </div>


//         <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2 font-normal">Fiscal Year</th>
//                 <th className="border p-2 font-normal min-w-[60px]">Period</th>
//                 <th className="border p-2 font-normal min-w-[150px]">End Date</th>
//                 <th className="border p-2 font-normal min-w-[100px]">Fixed Revenue Amount</th>
//                 <th className="border p-2 font-normal">Revenue Adjustment</th>
//                 <th className="border p-2 font-normal">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
//               ) : periods.length > 0 ? (
//                 periods.map((period, index) => {
//                   const isNewRow = period.id <= 0;
//                   const isRevAdjDisabled = !overrideAdjustments;


//                   return (
//                     <tr key={period.id}>
//                       <td className="border p-2">
//                         {isNewRow ? (
//                           <input
//                             type="text"
//                             className="w-full p-1 border rounded text-sm font-normal"
//                             value={period.fiscalYear || ''}
//                             onChange={(e) => handleInputChange(index, 'fiscalYear', e.target.value)}
//                           />
//                         ) : (
//                           <span className="text-sm font-normal">{period.fy_Cd}</span>
//                         )}
//                       </td>
//                       <td className="border p-2 min-w-[60px]">
//                         <input
//                           type="text"
//                           className="w-full p-1 text-sm font-normal"
//                           value={period.period || ''}
//                           onChange={(e) => handleInputChange(index, 'period', e.target.value)}
//                           disabled={!isNewRow}
//                         />
//                       </td>
//                       <td className="border p-2 min-w-[150px]">
//                         {isNewRow ? (
//                           <input
//                             type="date"
//                             className="w-full p-1 border rounded text-sm font-normal"
//                             value={period.endDate ? period.endDate.split('T')[0] : ''}
//                             onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
//                           />
//                         ) : (
//                           <span className="text-sm font-normal">{formatDate(period.endDate)}</span>
//                         )}
//                       </td>
//                       <td className="border p-2 min-w-[100px]">
//                         <input
//                           type="number"
//                           className="w-full p-1 border rounded text-sm font-normal bg-gray-200"
//                           value={period.revAmt ?? 0}
//                           disabled={true}
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           type="text"
//                           className={`w-full p-1 border rounded text-sm font-normal ${isRevAdjDisabled ? 'bg-gray-200' : 'bg-white'}`}
//                           value={period.revAdj ?? 0}
//                           onChange={(e) => handleRevAdjChange(e.target.value, index)}
//                           onBlur={() => !isNewRow && handleRevAdjBlur(index)}
//                           disabled={isRevAdjDisabled}
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           type="text"
//                           className="w-full p-1 text-sm font-normal"
//                           value={period.revDesc || ''}
//                           onChange={(e) => handleInputChange(index, 'revDesc', e.target.value)}
//                           disabled={!isEditMode && !isNewRow}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr><td colSpan="6" className="text-center p-4">No revenue ceiling data found for this plan.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>


//         <div className="flex justify-end space-x-2 mt-4">
//           {/* 
//           {!isEditMode ? (
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-normal"
//               onClick={handleAddNewRow}
//             >
//               New
//             </button>
//           ) : (
//             <>
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-normal"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//             </>
//           )}
//           */}
//           {isEditMode && (
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// export default RevenueCeilingComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RevenueCeilingComponent = ({ selectedPlan, revenueAccount }) => {
  const [periods, setPeriods] = useState([]);
  const [orgId, setOrgId] = useState("");
  const [acctId, setAcctId] = useState("");
  const [overrideAdjustments, setOverrideAdjustments] = useState(false);
  const [useFixedRevenue, setUseFixedRevenue] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [setupData, setSetupData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format date to YYYY-MM-DD for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-CA");
    } catch (e) {
      return "Invalid Date";
    }
  };

  const fetchRevenueData = async () => {
    if (
      !selectedPlan?.projId ||
      !selectedPlan?.version ||
      !selectedPlan?.plType
    ) {
      setPeriods([]);
      return;
    }
    setLoading(true);
    try {
      const { projId, version, plType } = selectedPlan;
      const url = `https://test-api-3tmq.onrender.com/ProjRevWrkPd/filter?projId=${projId}&versionNo=${version}&bgtType=${plType}`;
      const response = await axios.get(url);
      const newData = Array.isArray(response.data) ? response.data : [];

      // Preserve the order of existing periods by merging new data based on id
      setPeriods((prevPeriods) => {
        const updatedPeriods = prevPeriods.map((prevPeriod) => {
          const updatedPeriod = newData.find(
            (newPeriod) => newPeriod.id === prevPeriod.id
          );
          return updatedPeriod || prevPeriod;
        });
        // Add any new periods that weren't in the previous state
        const newPeriodIds = new Set(updatedPeriods.map((p) => p.id));
        const additionalPeriods = newData.filter(
          (newPeriod) => !newPeriodIds.has(newPeriod.id)
        );
        return [...updatedPeriods, ...additionalPeriods];
      });

      // setAcctId(revenueAccount || (newData.length > 0 ? newData[0].acctId || '' : ''));
    } catch (error) {
      toast.error("Failed to fetch revenue data.");
      console.error("Fetch error:", error);
      setPeriods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();
    setOrgId(selectedPlan?.orgId || "");
  }, [selectedPlan, revenueAccount]);

  const handleInputChange = (index, field, value) => {
    const updatedPeriods = periods.map((period, i) => {
      if (i === index) {
        const updatedPeriod = { ...period, [field]: value };
        // For new rows, when endDate changes, update fiscalYear and period
        if (field === "endDate" && period.id <= 0) {
          try {
            const date = new Date(value);
            if (!isNaN(date)) {
              updatedPeriod.fiscalYear = date.getFullYear().toString();
              updatedPeriod.period = (date.getMonth() + 1).toString(); // Month is 0-based, so add 1
            }
          } catch (e) {
            console.error("Date parsing error:", e);
          }
        }
        return updatedPeriod;
      }
      return period;
    });
    setPeriods(updatedPeriods);
  };

  useEffect(() => {
    const fetchSetupData = async () => {
      if (
        !selectedPlan?.projId ||
        !selectedPlan?.version ||
        !selectedPlan?.plType
      )
        return;
      try {
        const url = `https://test-api-3tmq.onrender.com/ProjBgtRevSetup/GetByProjectId/${selectedPlan.projId}/${selectedPlan.version}/${selectedPlan.plType}`;
        const response = await axios.get(url);
        // Defensive: handle both array and object response
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        if (data) {
          setUseFixedRevenue(!!data.overrideRevAmtFl);
          setOverrideAdjustments(!!data.useBillBurdenRates);
          setSetupData(data);
          setAcctId(data.revAcctId || "");
        }
      } catch (error) {
        // Optionally show a toast or just log
        console.error("Failed to fetch revenue setup data", error);
      }
    };
    fetchSetupData();
  }, [selectedPlan]);

  const handleRevAdjBlur = async (index) => {
    const period = periods[index];
    if (period.id <= 0) return;

    const payload = {
      ...period,
      id: period.id,
      useFixedRevenue: useFixedRevenue,
      overrideSystemAdjustment: overrideAdjustments,
      revAmt: parseFloat(period.revAmt) || 0,
      revAdj: period.revAdj || "",
      fiscalYear: period.fiscalYear || "",
    };

    try {
      console.log("Updating revAdj with payload:", payload);
      await axios.post(
        "https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert",
        payload
      );
      toast.success("Revenue adjustment updated successfully!");
      fetchRevenueData();
    } catch (error) {
      toast.error("Failed to update revenue adjustment.");
      console.error("Upsert error:", error);
    }
  };

  const handleSetupCheckboxChange = async (field, value) => {
    if (!setupData) return;
    const updatedSetup = {
      ...setupData,
      [field]: value,
    };
    setSetupData(updatedSetup);

    // Update local checkbox state
    if (field === "overrideRevAmtFl") setUseFixedRevenue(value);
    if (field === "useBillBurdenRates") setOverrideAdjustments(value);

    try {
      await axios.post(
        "https://test-api-3tmq.onrender.com/ProjBgtRevSetup/upsert",
        updatedSetup
      );
      toast.success("Revenue setup updated successfully!");
    } catch (error) {
      toast.error("Failed to update revenue setup.");
      // Optionally revert state on error
      setSetupData(setupData);
      if (field === "overrideRevAmtFl")
        setUseFixedRevenue(setupData.overrideRevAmtFl);
      if (field === "useBillBurdenRates")
        setOverrideAdjustments(setupData.useBillBurdenRates);
    }
  };

  /*
  const handleAddNewRow = () => {
    setIsEditMode(true);
    const newRow = {
      id: -(new Date().getTime()),
      projId: selectedPlan.projId,
      versionNo: selectedPlan.version,
      bgtType: selectedPlan.plType,
      fiscalYear: '',
      period: '',
      endDate: new Date().toISOString().split('T')[0],
      revAmt: 0,
      revAdj: '',
      revDesc: '',
      useFixedRevenue: useFixedRevenue,
      overrideSystemAdjustment: overrideAdjustments,
    };
    setPeriods([newRow, ...periods]);
  };

  const handleSave = async () => {
    const newRow = periods.find((p) => p.id < 0);
    if (!newRow) {
      toast.warn("No new row to save.");
      return;
    }

    toast.info("Saving new row...");

    const payload = {
      ...newRow,
      id: 0,
      useFixedRevenue: useFixedRevenue,
      overrideSystemAdjustment: overrideAdjustments,
      revAmt: parseFloat(newRow.revAmt) || 0,
      revAdj: newRow.revAdj || '',
      fiscalYear: newRow.fiscalYear || '',
    };

    try {
      console.log('Saving new row with payload:', payload);
      await axios.post('https://test-api-3tmq.onrender.com/ProjRevWrkPd/upsert', payload);
      toast.success("New row saved successfully!");
      setIsEditMode(false);
      fetchRevenueData();
    } catch (error) {
      toast.error("Failed to save new row.");
      console.error("Upsert error:", error);
    }
  };
  */

  const handleCancel = () => {
    setIsEditMode(false);
    fetchRevenueData();
  };

  return (
    <div className=" p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-normal">Org ID</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
              value={orgId}
              readOnly
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-normal">Acct ID</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1 bg-gray-200"
              value={acctId}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-sm font-normal mr-2">
              Use Fixed Revenue Amount as Total Revenue
            </label>
            <input
              type="checkbox"
              className="text-sm font-normal"
              checked={useFixedRevenue}
              onChange={(e) =>
                handleSetupCheckboxChange("overrideRevAmtFl", e.target.checked)
              }
            />
          </div>
          <div>
            <label className="text-sm font-normal mr-2">
              Override Revenue Adjustments from Accounting System
            </label>
            <input
              type="checkbox"
              className="text-sm font-normal"
              checked={overrideAdjustments}
              onChange={(e) =>
                handleSetupCheckboxChange(
                  "useBillBurdenRates",
                  e.target.checked
                )
              }
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-x-auto overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 font-normal">Fiscal Year</th>
                <th className="border p-2 font-normal min-w-[60px]">Period</th>
                <th className="border p-2 font-normal min-w-[150px]">
                  End Date
                </th>
                <th className="border p-2 font-normal min-w-[100px]">
                  Fixed Revenue Amount
                </th>
                <th className="border p-2 font-normal">Revenue Adjustment</th>
                <th className="border p-2 font-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : periods.length > 0 ? (
                periods.map((period, index) => {
                  const isNewRow = period.id <= 0;
                  const isRevAdjDisabled = !overrideAdjustments;

                  return (
                    <tr key={period.id}>
                      <td className="border p-2">
                        {isNewRow ? (
                          <input
                            type="text"
                            className="w-full p-1 border rounded text-sm font-normal"
                            value={period.fiscalYear || ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "fiscalYear",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="text-sm font-normal">
                            {period.fy_Cd}
                          </span>
                        )}
                      </td>
                      <td className="border p-2 min-w-[60px]">
                        <input
                          type="text"
                          className="w-full p-1 text-sm font-normal"
                          value={period.period || ""}
                          onChange={(e) =>
                            handleInputChange(index, "period", e.target.value)
                          }
                          disabled={!isNewRow}
                        />
                      </td>
                      <td className="border p-2 min-w-[150px]">
                        {isNewRow ? (
                          <input
                            type="date"
                            className="w-full p-1 border rounded text-sm font-normal"
                            value={
                              period.endDate ? period.endDate.split("T")[0] : ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="text-sm font-normal">
                            {formatDate(period.endDate)}
                          </span>
                        )}
                      </td>
                      <td className="border p-2 min-w-[100px]">
                        <input
                          type="number"
                          className="w-full p-1 border rounded text-sm font-normal bg-gray-200"
                          value={period.revAmt ?? 0}
                          disabled={true}
                        />
                      </td>
                      {/* <td className="border p-2">
                        <input
                          type="text"
                          className={`w-full p-1 border rounded text-sm font-normal ${
                            isRevAdjDisabled ? "bg-gray-200" : "bg-white"
                          }`}
                          value={period.revAdj ?? 0}
                          onChange={(e) =>
                            handleInputChange(index, "revAdj", e.target.value)
                          }
                          onBlur={() => !isNewRow && handleRevAdjBlur(index)}
                          disabled={isRevAdjDisabled}
                        />
                      </td> */}
                      <td className="border p-2">
                        <input
                          type="text"
                          className={`w-full p-1 border rounded text-sm font-normal ${
                            isRevAdjDisabled ? "bg-gray-200" : "bg-white"
                          }`}
                          value={period.revAdj ?? 0}
                          onChange={(e) => {
                            let raw = e.target.value.replace(/,/g, ""); // remove commas
                            if (raw === "") {
                              handleInputChange(index, "revAdj", "");
                              return;
                            }
                            if (!/^\d+$/.test(raw)) return; // allow only numbers
                            const formatted =
                              Number(raw).toLocaleString("en-US"); // add commas
                            handleInputChange(index, "revAdj", formatted);
                          }}
                          onBlur={() => !isNewRow && handleRevAdjBlur(index)}
                          disabled={isRevAdjDisabled}
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="text"
                          className="w-full p-1 text-sm font-normal"
                          value={period.revDesc || ""}
                          onChange={(e) =>
                            handleInputChange(index, "revDesc", e.target.value)
                          }
                          disabled={!isEditMode && !isNewRow}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No revenue ceiling data found for this plan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          {/* 
          {!isEditMode ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-normal"
              onClick={handleAddNewRow}
            >
              New
            </button>
          ) : (
            <>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-normal"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
          */}
          {isEditMode && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm font-normal"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueCeilingComponent;

