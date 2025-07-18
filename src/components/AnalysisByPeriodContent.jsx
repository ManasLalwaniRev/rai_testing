// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// // No longer needed: const INTERNAL_FINANCIAL_API_URL = '/api/financial-data';

// const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error }) => {
//   const [expandedStaffRows, setExpandedStaffRows] = useState([]);
//   const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
//   const [financialData, setFinancialData] = useState([]);
//   // Use props for loading and error states
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   const [allApiData, setAllApiData] = useState(null);
//   const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

//   const [selectedOrgId, setSelectedOrgId] = useState('');
//   const [availableOrgIds, setAvailableOrgIds] = useState([]);

//   const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');


//   /**
//    * Helper to map month and year to a date range string (e.g., "05/01-05/31_2025")
//    * Uses Date object to accurately determine the last day of the month, accounting for leap years.
//    */
//   const getMonthRangeKey = (month, year) => {
//     // Month is 1-indexed for input, but 0-indexed for Date constructor (month - 1)
//     // Day 0 of the *next* month gives the last day of the *current* month
//     const lastDay = new Date(year, month, 0).getDate();
//     const monthString = month.toString().padStart(2, '0');
//     return `${monthString}/01-${monthString}/${lastDay}_${year}`;
//   };

//   /**
//    * Transforms the raw API response into the FinancialRow structure expected by the frontend.
//    * This function filters the provided apiResponse based on currentOrgId.
//    * It also dynamically calculates profit based on the selected revenue view.
//    *
//    * NOTE: projID filtering has been removed as per requirement.
//    */
//   const transformApiDataToFinancialRows = useCallback((
//     apiResponse,
//     currentOrgId,
//     dynamicDateRanges,
//     selectedRevenueView
//   ) => {
//     const financialRows = [];

//     const revenueData = {};
//     const tnmRevenueData = {};
//     const cpffRevenueData = {};
//     const totalExpenseData = {};
//     const profitData = {};
//     const profitOnCostData = {};
//     const profitOnRevenueData = {};

//     let totalRevenueOverall = 0;
//     let totalExpenseOverall = 0;
//     let totalProfitOverall = 0;
//     let overallProfitOnCost = 0;
//     let overallProfitOnRevenue = 0;

//     dynamicDateRanges.forEach(range => {
//       revenueData[range] = 0;
//       tnmRevenueData[range] = 0;
//       cpffRevenueData[range] = 0;
//       totalExpenseData[range] = 0;
//       profitData[range] = 0;
//       profitOnCostData[range] = 0;
//       profitOnRevenueData[range] = 0;
//     });

//     const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => {
//       acc[range] = 0;
//       return acc;
//     }, {});

//     const totalStaffHoursByMonth = dynamicDateRanges.reduce((acc, range) => {
//       acc[range] = 0;
//       return acc;
//     }, {});

//     const uniqueEmployeesMap = new Map();

//     const filteredSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
//       // Filter only by selected Org ID. projID filtering is removed.
//       return currentOrgId ? empSummary.orgID === currentOrgId : true;
//     });

//     if (filteredSummaries.length > 0) {
//       filteredSummaries.forEach(empSummary => {
//         // Use emplId as the unique key for the employee map
//         if (!uniqueEmployeesMap.has(empSummary.emplId)) {
//           uniqueEmployeesMap.set(empSummary.emplId, {
//             id: empSummary.emplId,
//             name: `${empSummary.name} (${empSummary.emplId})`, // Format name (EMPLID)
//             cost: 0,
//             accountId: empSummary.accID || '', // Use accID from empSummary
//             orgId: empSummary.orgID || '',
//             glcPlc: empSummary.plcCode || '',
//             hrlyRate: empSummary.perHourRate || 0,
//             monthlyHours: {},
//             monthlyCost: {},
//             detailSummary: {},
//           });
//         }
//         const employee = uniqueEmployeesMap.get(empSummary.emplId);

//         if (empSummary.emplSchedule && Array.isArray(empSummary.emplSchedule.payrollSalary)) {
//           empSummary.emplSchedule.payrollSalary.forEach(salaryEntry => {
//             const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

//             if (monthRange) {
//               tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
//             //  cpffRevenueData[monthRange] = (cpffRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
//               // revenueData[monthRange] = tnmRevenueData[monthRange] + cpffRevenueData[monthRange];
//               revenueData[monthRange] = (revenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
//             //  tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);

//               totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
//               totalStaffCostByMonth[monthRange] = (totalStaffCostByMonth[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
//               totalStaffHoursByMonth[monthRange] = (totalStaffHoursByMonth[monthRange] || 0) + (salaryEntry.hours || 0);

//               employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
//               employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

//               if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
//               employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

//               if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
//               employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

//               if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
//               employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

//               if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
//               employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
//             }
//           });
//         }
//       });
//     }

//     Array.from(uniqueEmployeesMap.values()).forEach(employee => {
//       employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
//     });

//     // let overallRevenueForProfit = 0;
//     // if (selectedRevenueView === 't&m') {
//     //   overallRevenueForProfit = Object.values(tnmRevenueData).reduce((sum, val) => sum + val, 0);
//     // } else if (selectedRevenueView === 'cpff') {
//     //   overallRevenueForProfit = Object.values(cpffRevenueData).reduce((sum, val) => sum + val, 0);
//     // }
//     let overallRevenueForProfit = apiResponse.revenue || 0; // Use the top-level API revenue for overall profit calculation
//     // totalRevenueOverall = Object.values(revenueData).reduce((sum, val) => sum + val, 0);
//     totalRevenueOverall = apiResponse.revenue || 0;


//     totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
//     const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
//     const totalStaffHoursOverall = Object.values(totalStaffHoursByMonth).reduce((sum, val) => sum + val, 0);

//     totalProfitOverall = overallRevenueForProfit - totalExpenseOverall;
//     overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
//     overallProfitOnRevenue = overallRevenueForProfit !== 0
//       ? (totalProfitOverall / overallRevenueForProfit)
//       : 0;

//     financialRows.push({
//       id: `revenue-${currentOrgId}`,
//       description: 'Revenue',
//       total: totalRevenueOverall,
//       data: revenueData,
//       tnmRevenueData: tnmRevenueData,
//       cpffRevenueData: cpffRevenueData,
//       type: 'summary',
//       orgId: currentOrgId,
//       // accountId: '', // Not applicable for top-level summary
//     });

//     financialRows.push({
//       id: `total-staff-cost-${currentOrgId}`,
//       description: 'Total Staff Cost',
//       total: totalStaffCostOverall,
//       totalHours: totalStaffHoursOverall,
//       data: totalStaffCostByMonth,
//       type: 'expandable',
//       employees: Array.from(uniqueEmployeesMap.values()),
//       orgId: currentOrgId,
//       // accountId: '', // Not applicable for top-level summary
//     });

//     financialRows.push({
//       id: `total-expense-${currentOrgId}`,
//       description: 'Total Expense',
//       total: totalExpenseOverall,
//       data: totalExpenseData,
//       type: 'summary',
//       orgId: currentOrgId,
//       // accountId: '', // Not applicable for top-level summary
//     });

//     financialRows.push({
//       id: `profit-${currentOrgId}`,
//       description: 'Profit',
//       total: totalProfitOverall,
//       data: profitData,
//       type: 'summary',
//       orgId: currentOrgId,
//       // accountId: '', // Not applicable for top-level summary
//     });

//     dynamicDateRanges.forEach(range => {
//       let revenueForMonth = 0;
//       if (selectedRevenueView === 't&m') {
//         revenueForMonth = (tnmRevenueData[range] || 0);
//       } else if (selectedRevenueView === 'cpff') {
//         revenueForMonth = (cpffRevenueData[range] || 0);
//       }
//       const expenseForMonth = (totalExpenseData[range] || 0);
//       profitData[range] = revenueForMonth - expenseForMonth;
//     });

//     dynamicDateRanges.forEach(range => {
//       const profit = (profitData[range] || 0);
//       const expense = (totalExpenseData[range] || 0);
//       profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
//     });

//     financialRows.push({
//       id: `profit-cost-${currentOrgId}`,
//       description: 'Profit % on Cost',
//       total: overallProfitOnCost, // Store as decimal, format for display
//       data: profitOnCostData,
//       type: 'summary',
//       orgId: currentOrgId,
//       // accountId: '', // Not applicable for top-level summary
//     });

//     dynamicDateRanges.forEach(range => {
//       const profit = (profitData[range] || 0);
//       let revenueForPercentage = 0;
//       if (selectedRevenueView === 't&m') {
//         revenueForPercentage = (tnmRevenueData[range] || 0);
//       } else if (selectedRevenueView === 'cpff') {
//         revenueForPercentage = (cpffRevenueData[range] || 0);
//       }
//       profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
//     });

//     financialRows.push({
//       id: `profit-revenue-${currentOrgId}`,
//       description: 'Profit % on Revenue',
//       total: overallProfitOnRevenue, // Store as decimal, format for display
//       data: profitOnRevenueData,
//       type: 'summary',
//       orgId: currentOrgId,
//       // accountId: '', // Not applicable for top-level summary
//     });

//     return financialRows;
//   }, [selectedRevenueView]);


//   // This useEffect now processes the initialApiData received from props
//   useEffect(() => {
//     if (isLoading) {
//       // If parent is still loading, keep local state loading
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     if (error) {
//       // If parent passed an error, clear data and show error
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     if (initialApiData) {
//       setAllApiData(initialApiData);

//       const uniqueOrgIds = new Set();
//       const uniqueDateRangesSet = new Set();

//       (initialApiData.employeeForecastSummary || []).forEach(summary => {
//         if (summary.emplSchedule && Array.isArray(summary.emplSchedule.payrollSalary)) {
//           uniqueOrgIds.add(summary.orgID);

//           summary.emplSchedule.payrollSalary.forEach(salaryEntry => {
//               const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
//               uniqueDateRangesSet.add(monthRangeKey);
//           });
//         }
//       });

//       const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
//           const [, , yearAStr] = a.split('_');
//           const [monthAStr,] = a.split('/')[0].split('-');
//           const yearA = parseInt(yearAStr);
//           const monthA = parseInt(monthAStr);

//           const [, , yearBStr] = b.split('_');
//           const [monthBStr,] = b.split('/')[0].split('-');
//           const yearB = parseInt(yearBStr);
//           const monthB = parseInt(monthBStr);

//           if (yearA !== yearB) return yearA - yearB;
//           return monthA - monthB;
//       });

//       setDynamicDateRanges(sortedDateRanges);

//       const orgs = Array.from(uniqueOrgIds).sort();
//       setAvailableOrgIds(orgs);

//       if (orgs.length > 0) {
//         setSelectedOrgId(orgs[0]);
//       } else {
//         setSelectedOrgId('');
//       }
//     } else {
//       // If initialApiData is null (e.g., no plan selected yet in parent)
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//     }
//   }, [initialApiData, isLoading, error]); // Depend on initialApiData, isLoading, error props

//   useEffect(() => {
//     if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
//       const transformedData = transformApiDataToFinancialRows(
//         allApiData,
//         selectedOrgId,
//         dynamicDateRanges,
//         selectedRevenueView
//       );
//       console.log("Transformed Data (after filter & transform):", transformedData);
//       setFinancialData(transformedData);
//     } else {
//       setFinancialData([]);
//     }
//     setExpandedStaffRows([]);
//     setExpandedEmployeeDetails([]);
//   }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows]);

//   const toggleStaffRow = (id) => {
//     setExpandedStaffRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const toggleEmployeeDetail = (id) => {
//     setExpandedEmployeeDetails(prev =>
//       prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
//     );
//   };

//   const formatValue = (value, isHours = false, isPercentage = false) => {
//     if (typeof value === 'number') {
//       let formatted;
//       if (isPercentage) {
//         formatted = (value * 100).toLocaleString('en-US', {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         });
//         return `${formatted}%`;
//       }
//       formatted = value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//       return isHours ? `${formatted} hrs` : formatted;
//     }
//     return isHours ? '0.00 hrs' : (isPercentage ? '0.00%' : '0.00');
//   };

//   // Adjusted for more transparency
//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   if (isLoading) { // Use prop for loading
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading data...
//       </div>
//     );
//   }

//   if (error) { // Use prop for error
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
//       {/* New container for the main content with glassmorphism */}
//       <div className={`p-6 ${getGlassmorphismClasses()}`}>
//         {/* Page Title - Hidden */}
//         {/* <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg text-gray-900">Analysis by Period</h1> */}

//         {/* Dropdown Selectors and Buttons - Hidden */}
//         <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden">
//           {/* Org ID Dropdown - Still commented out as per previous instruction */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="orgId-select" className="text-lg font-semibold mr-4">Select Org:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="orgId-select"
//                 value={selectedOrgId}
//                 onChange={(e) => setSelectedOrgId(e.target.value)}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//               >
//                 <option value="" className="bg-gray-800 text-white">-- Select Org --</option>
//                 {availableOrgIds.map(orgId => (
//                   <option key={orgId} value={orgId} className="bg-gray-800 text-white">
//                     {orgId}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}

//           {/* Plan ID Dropdown (Fixed/Disabled) - Commented Out */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="planId-select" className="text-lg font-semibold mr-4">Plan:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="planId-select"
//                 value={planID}
//                 onChange={() => {}}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//                 disabled
//               >
//                 <option value={planID} className="bg-gray-800 text-white">{planID}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}
//           {/* Template ID Dropdown (Fixed/Disabled) - Commented Out */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="templateId-select" className="text-lg font-semibold mr-4">Template:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="templateId-select"
//                 value={templateId}
//                 onChange={() => {}}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//                 disabled
//               >
//                 <option value={templateId} className="bg-gray-800 text-white">{templateId}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}
//           {/* Type Dropdown (Fixed/Disabled) - Commented Out */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="type-select" className="text-lg font-semibold mr-4">Type:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="type-select"
//                 value={type}
//                 onChange={() => {}}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//                 disabled
//               >
//                 <option value={type} className="bg-gray-800 text-white">{type}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}

//           {/* Revenue Type Selector */}
//           {/* <div className="flex items-center">
//             <label htmlFor="revenue-view-select" className="text-lg font-semibold mr-4 text-gray-800">Revenue View:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="revenue-view-select"
//                 value={selectedRevenueView}
//                 onChange={(e) => setSelectedRevenueView(e.target.value)}
//                 className="block w-48 py-2 px-3 bg-transparent text-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//               >
//                 <option value="t&m" className="bg-gray-100 text-gray-800">T&M Revenue</option>
//                 <option value="cpff" className="bg-gray-100 text-gray-800">CPFF Revenue</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div> */}

//           {/* Cancel Button for Pop-out */}
//           {/* <button
//               onClick={onCancel}
//               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
//           >
//               Cancel
//           </button> */}
//         </div>

//         {/* Main table container - Removed redundant getGlassmorphismClasses() here */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//             {/* Table Header */}
//             <thead>
//               <tr className="bg-gray-100 bg-opacity-50">
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
//                 {dynamicDateRanges.map((range) => {
//                   const parts = range.split('_');
//                   const monthPart = parts[0].split('/')[0];
//                   const yearPart = parts[1];
//                   return (
//                     <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
//                       {`${monthPart}/${yearPart}`}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
//             {/* Table Body */}
//             <tbody className="divide-y divide-gray-300 divide-opacity-10">
//               {financialData.length === 0 ? (
//                   <tr>
//                       <td colSpan={dynamicDateRanges.length + 7} className="py-8 text-center text-gray-600 text-lg">
//                           {isLoading ? 'Loading data...' : 'No data available for the selected criteria.'}
//                       </td>
//                   </tr>
//               ) : (
//                   financialData.map((row) => (
//                   <React.Fragment key={row.id}>
//                       <tr
//                       className={`
//                           group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
//                           ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
//                           ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
//                       `}
//                       onClick={() => row.type === 'expandable' && toggleStaffRow(row.id)}
//                       >
//                       <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                           {row.type === 'expandable' && (
//                           <span className="mr-2">
//                               {expandedStaffRows.includes(row.id) ? (
//                               <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                               ) : (
//                               <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                               )}
//                           </span>
//                           )}
//                           {row.description}
//                       </td>
//                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.accountId || ''}</td>
//                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.orgId || ''}</td>
//                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.glcPlc || ''}</td>
//                       <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.hrlyRate)}</td>
//                       <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${
//                           typeof row.total === 'number' && row.total < 0 ? 'text-red-600' :
//                           (typeof row.total === 'number' && row.total > 0 && row.description === 'Profit' ? 'text-green-600' : '')
//                       }`}>
//                            {/* Apply percentage formatting for Profit % rows in Total column */}
//                           {row.description.includes('Profit %') ? formatValue(row.total, false, true) : formatValue(row.total)}
//                       </td>
//                       {dynamicDateRanges.map((range) => {
//                           let dataForRange;

//                           if (row.description === 'Revenue') {
//                               if (selectedRevenueView === 't&m' && row.tnmRevenueData) {
//                                   dataForRange = row.tnmRevenueData[range];
//                               } else if (selectedRevenueView === 'cpff' && row.cpffRevenueData) {
//                                   dataForRange = row.cpffRevenueData[range];
//                               } else {
//                                   dataForRange = row.data[range];
//                               }
//                           } else {
//                               dataForRange = row.data[range];
//                           }

//                           const isProfitRow = row.id.startsWith('profit-');
//                           const isNegative = typeof dataForRange === 'number' && dataForRange < 0;
//                           const isPositive = typeof dataForRange === 'number' && dataForRange > 0;
//                           let textColorClass = '';
//                           if (isProfitRow) {
//                               if (isNegative) {
//                                   textColorClass = 'text-red-600';
//                               } else if (isPositive) {
//                                   textColorClass = 'text-green-600';
//                               }
//                           }
//                           return (
//                           <td key={range} className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${textColorClass}`}>
//                               {/* Apply percentage formatting for Profit % rows in monthly data */}
//                               {row.description.includes('Profit %') ? formatValue(dataForRange, false, true) : formatValue(dataForRange)}
//                           </td>
//                           );
//                       })}
//                       </tr>

//                       {/* Render expanded employees for Total Staff Cost row */}
//                       {row.type === 'expandable' && expandedStaffRows.includes(row.id) && row.employees && row.employees.length > 0 && (
//                         <>
//                           {row.employees.map((employee) => (
//                             <React.Fragment key={`${row.id}-${employee.id}`}>
//                               {/* Individual Employee Row */}
//                               <tr
//                                   className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                                   onClick={() => toggleEmployeeDetail(`${row.id}-${employee.id}`)}
//                               >
//                                   <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                   <span className="mr-2">
//                                       {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) ? (
//                                       <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                       ) : (
//                                       <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                       )}
//                                   </span>
//                                   {employee.name}
//                                   </td>
//                                   {/* Display Account ID for the employee */}
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.accountId || ''}</td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.orgId || ''}</td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.glcPlc || ''}</td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td>
//                                   {/* This cell now correctly displays the total cost for the employee */}
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                   {formatValue(employee.cost)}
//                                   </td>
//                                   {dynamicDateRanges.map((currentRange) => (
//                                       <td key={`${employee.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                           {formatValue(employee.monthlyCost[currentRange] || 0)}
//                                       </td>
//                                   ))}
//                               </tr>

//                               {/* Employee Hours Row (nested detail) */}
//                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && (
//                                 <tr key={`${employee.id}-hours-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
//                                   <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
//                                     --- Employee Hours
//                                   </td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                     {/* This is the correct place for total hours in detail */}
//                                     {formatValue(Object.values(employee.monthlyHours).reduce((sum, val) => sum + val, 0))}
//                                   </td>
//                                   {dynamicDateRanges.map((currentRange) => (
//                                     <td key={`${employee.id}-hours-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                       {formatValue(employee.monthlyHours[currentRange] || 0, true)}
//                                     </td>
//                                   ))}
//                                 </tr>
//                               )}

//                               {/* Nested Employee Cost Details (Raw Cost, Fringe, Overhead, G&A) as horizontal rows */}
//                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && Object.keys(employee.detailSummary).length > 0 && (
//                                   <>
//                                     {Object.keys(employee.detailSummary).map(detailDescription => {
//                                       const detailTotal = Object.values(employee.detailSummary[detailDescription]).reduce((sum, val) => sum + val, 0);

//                                       return (
//                                       <tr key={`${employee.id}-${detailDescription}-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
//                                         <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
//                                           --- {detailDescription}
//                                         </td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-700">{employee.accountId || ''}</td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                         {/* Removed the extra empty <td> here */}
//                                         <td className="py-2 px-4 text-right whitespace-nowrap"></td> {/* This was the extra td */}
//                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                           {formatValue(detailTotal)}
//                                         </td>
//                                         {dynamicDateRanges.map((currentRange) => (
//                                             <td key={`${employee.id}-${detailDescription}-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                               {formatValue(employee.detailSummary[detailDescription][currentRange] || 0)}
//                                             </td>
//                                         ))}
//                                       </tr>
//                                     );})}
//                                   </>
//                               )}
//                             </React.Fragment>
//                           ))}
//                         </>
//                       )}
//                   </React.Fragment>
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisByPeriodContent;


// // UPDATED CODE 
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error }) => {
//   const [expandedStaffRows, setExpandedStaffRows] = useState([]);
//   const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
//   const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
//   // Removed expandedNonLaborEmployeeRows state as it's no longer needed for dropdown
//   const [financialData, setFinancialData] = useState([]);

//   const [allApiData, setAllApiData] = useState(null);
//   const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

//   const [selectedOrgId, setSelectedOrgId] = useState('');
//   const [availableOrgIds, setAvailableOrgIds] = useState([]);

//   const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');

//   /**
//    * Helper to map month and year to a date range string (e.g., "05/01-05/31_2025")
//    * Uses Date object to accurately determine the last day of the month, accounting for leap years.
//    */
//   const getMonthRangeKey = (month, year) => {
//     // Month is 1-indexed for input, but 0-indexed for Date constructor (month - 1)
//     // Day 0 of the *next* month gives the last day of the *current* month
//     const lastDay = new Date(year, month, 0).getDate();
//     const monthString = month.toString().padStart(2, '0');
//     return `${monthString}/01-${monthString}/${lastDay}_${year}`;
//   };

//   /**
//    * Transforms the raw API response into the FinancialRow structure expected by the frontend.
//    * This function filters the provided apiResponse based on currentOrgId.
//    * It also dynamically calculates profit based on the selected revenue view.
//    */
//   const transformApiDataToFinancialRows = useCallback((
//     apiResponse,
//     currentOrgId,
//     dynamicDateRanges,
//     selectedRevenueView
//   ) => {
//     console.log("transformApiDataToFinancialRows: apiResponse", apiResponse);
//     console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
//     console.log("transformApiDataToFinancialRows: dynamicDateRanges", dynamicDateRanges);

//     const financialRows = [];

//     const revenueData = {};
//     const tnmRevenueData = {};
//     const cpffRevenueData = {};
//     const totalExpenseData = {};
//     const profitData = {};
//     const profitOnCostData = {};
//     const profitOnRevenueData = {};

//     let totalRevenueOverall = 0;
//     let totalExpenseOverall = 0;
//     let totalProfitOverall = 0;
//     let overallProfitOnCost = 0;
//     let overallProfitOnRevenue = 0;

//     dynamicDateRanges.forEach(range => {
//       revenueData[range] = 0;
//       tnmRevenueData[range] = 0;
//       cpffRevenueData[range] = 0;
//       totalExpenseData[range] = 0;
//       profitData[range] = 0;
//       profitOnCostData[range] = 0;
//       profitOnRevenueData[range] = 0;
//     });

//     const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => {
//       acc[range] = 0;
//       return acc;
//     }, {});

//     const totalStaffHoursByMonth = dynamicDateRanges.reduce((acc, range) => {
//       acc[range] = 0;
//       return acc;
//     }, {});

//     const uniqueEmployeesMap = new Map();
//     const nonLaborAcctDetailsMap = new Map(); // Map to group non-labor details by account ID and then by month

//     const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
//       // Filter only by selected Org ID.
//       return currentOrgId ? empSummary.orgID === currentOrgId : true;
//     });

//     if (filteredEmployeeSummaries.length > 0) {
//       filteredEmployeeSummaries.forEach(empSummary => {
//         // Use emplId as the unique key for the employee map
//         if (!uniqueEmployeesMap.has(empSummary.emplId)) {
//           uniqueEmployeesMap.set(empSummary.emplId, {
//             id: empSummary.emplId,
//             name: `${empSummary.name} (${empSummary.emplId})`, // Format name (EMPLID)
//             cost: 0,
//             accountId: empSummary.accID || '', // Use accID from empSummary
//             orgId: empSummary.orgID || '',
//             glcPlc: empSummary.plcCode || '',
//             hrlyRate: empSummary.perHourRate || 0,
//             monthlyHours: {},
//             monthlyCost: {},
//             detailSummary: {},
//           });
//         }
//         const employee = uniqueEmployeesMap.get(empSummary.emplId);

//         if (empSummary.emplSchedule && Array.isArray(empSummary.emplSchedule.payrollSalary)) {
//           empSummary.emplSchedule.payrollSalary.forEach(salaryEntry => {
//             const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

//             if (monthRange) {
//               tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
//               revenueData[monthRange] = (revenueData[monthRange] || 0) + (salaryEntry.revenue || 0);

//               totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
//               totalStaffCostByMonth[monthRange] = (totalStaffCostByMonth[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
//               totalStaffHoursByMonth[monthRange] = (totalStaffHoursByMonth[monthRange] || 0) + (salaryEntry.hours || 0);

//               employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
//               employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

//               if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
//               employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

//               if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
//               employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

//               if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
//               employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

//               if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
//               employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
//             }
//           });
//         }
//       });
//     }

//     // Process direct and indirect cost data for Non-Labor Staff Cost
//     let totalNonLaborCostOverall = 0;
//     const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => {
//       acc[range] = 0;
//       return acc;
//     }, {});

//     // Combine direct and indirect costs, using the correct casing for directCOstForecastSummary
//     const allNonLaborSummaries = [
//       ...(apiResponse.directCOstForecastSummary || []), // Corrected casing here
//       ...(apiResponse.indirectCostForecastSummary || [])
//     ];
//     console.log("transformApiDataToFinancialRows: allNonLaborSummaries (before filter)", allNonLaborSummaries);


//     allNonLaborSummaries.filter(nonLaborSummary => {
//         const shouldInclude = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
//         console.log(`Filtering non-labor summary for orgID ${nonLaborSummary.orgID}. Current selectedOrgId: ${currentOrgId}. Include: ${shouldInclude}`);
//         return shouldInclude;
//     }).forEach(nonLaborSummary => {
//         // Correctly access the 'forecasts' array within directCostSchedule or indirectCostSchedule
//         const schedules = (nonLaborSummary.directCostSchedule && nonLaborSummary.directCostSchedule.forecasts) ||
//                           (nonLaborSummary.indirectCostSchedule && nonLaborSummary.indirectCostSchedule.forecasts) || [];
//         console.log(`Processing non-labor summary for accID: ${nonLaborSummary.accID}, orgID: ${nonLaborSummary.orgID}. Forecast schedules found:`, schedules);

//         const accountId = nonLaborSummary.accID;
//         const orgId = nonLaborSummary.orgID;
//         const glcPlc = nonLaborSummary.plcCode || '';
//         const accName = nonLaborSummary.accName || `Account: ${accountId}`;

//         if (!nonLaborAcctDetailsMap.has(accountId)) {
//             nonLaborAcctDetailsMap.set(accountId, {
//                 id: accountId,
//                 description: accName,
//                 orgId: orgId,
//                 glcPlc: glcPlc,
//                 total: 0, // Total for this account across all periods
//                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}), // Total for this account per month
//                 employees: new Map(), // New: Map to hold employee-level data within this account
//                 // Removed costComponentTotalsByMonth as it's no longer displayed
//             });
//             console.log(`  New non-labor account group created: ${accountId}`);
//         }
//         const acctGroup = nonLaborAcctDetailsMap.get(accountId);

//         // Group schedules by employee within the account group
//         const employeeId = nonLaborSummary.emplId || 'N/A_Employee'; // Use a default if emplId is missing
//         const employeeName = nonLaborSummary.name || `Employee ${employeeId}`;

//         if (!acctGroup.employees.has(employeeId)) {
//             acctGroup.employees.set(employeeId, {
//                 id: employeeId,
//                 name: `${employeeName} (${employeeId})`,
//                 total: 0,
//                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
//                 entries: [], // These are the original DCT-level entries for this specific employee
//             });
//         }
//         const employeeGroup = acctGroup.employees.get(employeeId);


//         schedules.forEach(scheduleEntry => {
//             const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//             if (monthRange) {
//                 const entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
//                 console.log(`  Schedule entry for ${monthRange}: cost=${scheduleEntry.cost}, fringe=${scheduleEntry.fringe}, overhead=${scheduleEntry.overhead}, gna=${scheduleEntry.gna}, materials=${scheduleEntry.materials}. Calculated entryCost: ${entryCost}`);

//                 // Add the individual schedule entry to the employee's entries array
//                 employeeGroup.entries.push({
//                     id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`, // Unique ID for this specific monthly entry
//                     dctId: scheduleEntry.dctId,
//                     forecastid: scheduleEntry.forecastid,
//                     monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
//                     total: entryCost, // Total for this specific entry (for that month)
//                     monthlyValues: { [monthRange]: entryCost } // This will populate the correct month column for this specific entry
//                 });

//                 // Aggregate totals for the employee group
//                 employeeGroup.monthlyData[monthRange] += entryCost;
//                 employeeGroup.total += entryCost;

//                 // Aggregate totals for the account group (still at account level)
//                 acctGroup.monthlyData[monthRange] += entryCost;
//                 acctGroup.total += entryCost;

//                 // Removed aggregation for cost components as they are no longer displayed
//                 // acctGroup.costComponentTotalsByMonth['Raw Cost'][monthRange] += (scheduleEntry.cost || 0);
//                 // acctGroup.costComponentTotalsByMonth['Fringe Benefits'][monthRange] += (scheduleEntry.fringe || 0);
//                 // acctGroup.costComponentTotalsByMonth['Overhead'][monthRange] += (scheduleEntry.overhead || 0);
//                 // acctGroup.costComponentTotalsByMonth['General & Admin'][monthRange] += (scheduleEntry.gna || 0);
//                 // acctGroup.costComponentTotalsByMonth['Materials'][monthRange] += (scheduleEntry.materials || 0);

//                 totalNonLaborCostByMonth[monthRange] = (totalNonLaborCostByMonth[monthRange] || 0) + entryCost;
//                 totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + entryCost;
//             }
//         });
//     });

//     Array.from(uniqueEmployeesMap.values()).forEach(employee => {
//       employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
//     });

//     Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
//         // Recalculate total for acctGroup in case it wasn't fully accumulated (though it should be)
//         acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
//         // Convert employee maps to arrays for rendering
//         acctGroup.employees = Array.from(acctGroup.employees.values());
//     });

//     totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
//     console.log("transformApiDataToFinancialRows: totalNonLaborCostOverall", totalNonLaborCostOverall);
//     console.log("transformApiDataToFinancialRows: totalNonLaborCostByMonth", totalNonLaborCostByMonth);
//     console.log("transformApiDataToFinancialRows: nonLaborAcctDetailsMap contents (after processing)", Array.from(nonLaborAcctDetailsMap.values()));


//     let overallRevenueForProfit = apiResponse.revenue || 0; // Use the top-level API revenue for overall profit calculation
//     totalRevenueOverall = apiResponse.revenue || 0;


//     totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
//     const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
//     const totalStaffHoursOverall = Object.values(totalStaffHoursByMonth).reduce((sum, val) => sum + val, 0);

//     totalProfitOverall = overallRevenueForProfit - totalExpenseOverall;
//     overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
//     overallProfitOnRevenue = overallRevenueForProfit !== 0
//       ? (totalProfitOverall / overallRevenueForProfit)
//       : 0;

//     financialRows.push({
//       id: `revenue-${currentOrgId}`,
//       description: 'Revenue',
//       total: totalRevenueOverall,
//       data: revenueData,
//       tnmRevenueData: tnmRevenueData,
//       cpffRevenueData: cpffRevenueData,
//       type: 'summary',
//       orgId: currentOrgId,
//     });

//     financialRows.push({
//       id: `total-staff-cost-${currentOrgId}`,
//       description: 'Total Staff Cost',
//       total: totalStaffCostOverall,
//       totalHours: totalStaffHoursOverall,
//       data: totalStaffCostByMonth,
//       type: 'expandable',
//       employees: Array.from(uniqueEmployeesMap.values()),
//       orgId: currentOrgId,
//     });

//     // New Non-Labor Staff Cost row
//     financialRows.push({
//         id: `non-labor-staff-cost-${currentOrgId}`,
//         description: 'Non-Labor Staff Cost',
//         total: totalNonLaborCostOverall,
//         data: totalNonLaborCostByMonth,
//         type: 'expandable',
//         nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()), // Attach processed non-labor data
//         orgId: currentOrgId,
//     });


//     financialRows.push({
//       id: `total-expense-${currentOrgId}`,
//       description: 'Total Expense',
//       total: totalExpenseOverall,
//       data: totalExpenseData,
//       type: 'summary',
//       orgId: currentOrgId,
//     });

//     financialRows.push({
//       id: `profit-${currentOrgId}`,
//       description: 'Profit',
//       total: totalProfitOverall,
//       data: profitData,
//       type: 'summary',
//       orgId: currentOrgId,
//     });

//     dynamicDateRanges.forEach(range => {
//       let revenueForMonth = 0;
//       if (selectedRevenueView === 't&m') {
//         revenueForMonth = (tnmRevenueData[range] || 0);
//       } else if (selectedRevenueView === 'cpff') {
//         revenueForMonth = (cpffRevenueData[range] || 0);
//       }
//       const expenseForMonth = (totalExpenseData[range] || 0);
//       profitData[range] = revenueForMonth - expenseForMonth;
//     });

//     dynamicDateRanges.forEach(range => {
//       const profit = (profitData[range] || 0);
//       const expense = (totalExpenseData[range] || 0);
//       profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
//     });

//     financialRows.push({
//       id: `profit-cost-${currentOrgId}`,
//       description: 'Profit % on Cost',
//       total: overallProfitOnCost, // Store as decimal, format for display
//       data: profitOnCostData,
//       type: 'summary',
//       orgId: currentOrgId,
//     });

//     dynamicDateRanges.forEach(range => {
//       const profit = (profitData[range] || 0);
//       let revenueForPercentage = 0;
//       if (selectedRevenueView === 't&m') {
//         revenueForPercentage = (tnmRevenueData[range] || 0);
//       } else if (selectedRevenueView === 'cpff') {
//         revenueForPercentage = (cpffRevenueData[range] || 0);
//       }
//       profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
//     });

//     financialRows.push({
//       id: `profit-revenue-${currentOrgId}`,
//       description: 'Profit % on Revenue',
//       total: overallProfitOnRevenue, // Store as decimal, format for display
//       data: profitOnRevenueData,
//       type: 'summary',
//       orgId: currentOrgId,
//     });

//     console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
//     return financialRows;
//   }, [selectedRevenueView]);


//   // This useEffect now processes the initialApiData received from props
//   useEffect(() => {
//     console.log("useEffect: initialApiData received", initialApiData);
//     if (isLoading) {
//       console.log("useEffect: Data is still loading.");
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     if (error) {
//       console.log("useEffect: Error received:", error);
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     if (initialApiData) {
//       console.log("useEffect: Processing initialApiData...");
//       setAllApiData(initialApiData);

//       const uniqueOrgIds = new Set();
//       const uniqueDateRangesSet = new Set();

//       (initialApiData.employeeForecastSummary || []).forEach(summary => {
//         if (summary.emplSchedule && Array.isArray(summary.emplSchedule.payrollSalary)) {
//           uniqueOrgIds.add(summary.orgID);

//           summary.emplSchedule.payrollSalary.forEach(salaryEntry => {
//               const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
//               uniqueDateRangesSet.add(monthRangeKey);
//           });
//         }
//       });

//       // Add non-labor dates to dynamicDateRanges from direct and indirect cost summaries
//       const allNonLaborSummaries = [
//         ...(initialApiData.directCOstForecastSummary || []), // Corrected casing here
//         ...(initialApiData.indirectCostForecastSummary || [])
//       ];
//       console.log("useEffect: allNonLaborSummaries for date/org collection", allNonLaborSummaries);

//       allNonLaborSummaries.forEach(nonLaborSummary => {
//         const schedules = (nonLaborSummary.directCostSchedule && nonLaborSummary.directCostSchedule.forecasts) ||
//                           (nonLaborSummary.indirectCostSchedule && nonLaborSummary.indirectCostSchedule.forecasts) || [];
//         schedules.forEach(scheduleEntry => {
//             const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//             uniqueDateRangesSet.add(monthRangeKey);
//         });
//         uniqueOrgIds.add(nonLaborSummary.orgID);
//       });


//       const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
//           const [, , yearAStr] = a.split('_');
//           const [monthAStr,] = a.split('/')[0].split('-');
//           const yearA = parseInt(yearAStr);
//           const monthA = parseInt(monthAStr);

//           const [, , yearBStr] = b.split('_');
//           const [monthBStr,] = b.split('/')[0].split('-');
//           const yearB = parseInt(yearBStr);
//           const monthB = parseInt(monthBStr);

//           if (yearA !== yearB) return yearA - yearB;
//           return monthA - monthB;
//       });

//       setDynamicDateRanges(sortedDateRanges);
//       console.log("useEffect: dynamicDateRanges set to", sortedDateRanges);

//       const orgs = Array.from(uniqueOrgIds).sort();
//       setAvailableOrgIds(orgs);
//       console.log("useEffect: availableOrgIds set to", orgs);

//       if (orgs.length > 0) {
//         setSelectedOrgId(orgs[0]);
//         console.log("useEffect: selectedOrgId set to", orgs[0]);
//       } else {
//         setSelectedOrgId('');
//         console.log("useEffect: selectedOrgId set to empty (no orgs found)");
//       }
//     } else {
//       console.log("useEffect: initialApiData is null or undefined.");
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//     }
//   }, [initialApiData, isLoading, error]); // Depend on initialApiData, isLoading, error props

//   useEffect(() => {
//     if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
//       console.log("useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data...");
//       const transformedData = transformApiDataToFinancialRows(
//         allApiData,
//         selectedOrgId,
//         dynamicDateRanges,
//         selectedRevenueView
//       );
//       console.log("Transformed Data (after filter & transform):", transformedData);
//       setFinancialData(transformedData);
//     } else {
//       console.log("useEffect (transform trigger): Waiting for allApiData, selectedOrgId, or dynamicDateRanges to be ready.");
//       setFinancialData([]);
//     }
//     setExpandedStaffRows([]);
//     setExpandedEmployeeDetails([]);
//     setExpandedNonLaborAcctRows([]); // Reset non-labor expansions
//     // Removed reset for expandedNonLaborEmployeeRows
//   }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows]);

//   const toggleStaffRow = (id) => {
//     setExpandedStaffRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const toggleEmployeeDetail = (id) => {
//     setExpandedEmployeeDetails(prev =>
//       prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
//     );
//   };

//   // New toggle function for non-labor account rows
//   const toggleNonLaborAcctRow = (id) => {
//     setExpandedNonLaborAcctRows(prev =>
//         prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   // Removed toggleNonLaborEmployeeRow as it's no longer needed for dropdown

//   const formatValue = (value, isHours = false, isPercentage = false) => {
//     if (typeof value === 'number') {
//       let formatted;
//       if (isPercentage) {
//         formatted = (value * 100).toLocaleString('en-US', {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         });
//         return `${formatted}%`;
//       }
//       formatted = value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//       return isHours ? `${formatted} hrs` : formatted;
//     }
//     return isHours ? '0.00 hrs' : (isPercentage ? '0.00%' : '0.00');
//   };

//   // Adjusted for more transparency
//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   if (isLoading) { // Use prop for loading
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading data...
//       </div>
//     );
//   }

//   if (error) { // Use prop for error
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
//       {/* New container for the main content with glassmorphism */}
//       <div className={`p-6 ${getGlassmorphismClasses()}`}>
//         {/* Page Title - Hidden */}
//         {/* <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg text-gray-900">Analysis by Period</h1> */}

//         {/* Dropdown Selectors and Buttons - Hidden */}
//         <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden">
//           {/* Org ID Dropdown - Still commented out as per previous instruction */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="orgId-select" className="text-lg font-semibold mr-4">Select Org:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="orgId-select"
//                 value={selectedOrgId}
//                 onChange={(e) => setSelectedOrgId(e.target.value)}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//               >
//                 <option value="" className="bg-gray-800 text-white">-- Select Org --</option>
//                 {availableOrgIds.map(orgId => (
//                   <option key={orgId} value={orgId} className="bg-gray-800 text-white">
//                     {orgId}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}

//           {/* Plan ID Dropdown (Fixed/Disabled) - Commented Out */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="planId-select" className="text-lg font-semibold mr-4">Plan:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="planId-select"
//                 value={planID}
//                 onChange={() => {}}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//                 disabled
//               >
//                 <option value={planID} className="bg-gray-800 text-white">{planID}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}
//           {/* Template ID Dropdown (Fixed/Disabled) - Commented Out */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="templateId-select" className="text-lg font-semibold mr-4">Template:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="templateId-select"
//                 value={templateId}
//                 onChange={() => {}}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//                 disabled
//               >
//                 <option value={templateId} className="bg-gray-800 text-white">{templateId}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}
//           {/* Type Dropdown (Fixed/Disabled) - Commented Out */}
//           {/*
//           <div className="flex items-center">
//             <label htmlFor="type-select" className="text-lg font-semibold mr-4">Type:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="type-select"
//                 value={type}
//                 onChange={() => {}}
//                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//                 disabled
//               >
//                 <option value={type} className="bg-gray-800 text-white">{type}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           */}

//           {/* Revenue Type Selector */}
//           {/* <div className="flex items-center">
//             <label htmlFor="revenue-view-select" className="text-lg font-semibold mr-4 text-gray-800">Revenue View:</label>
//             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
//               <select
//                 id="revenue-view-select"
//                 value={selectedRevenueView}
//                 onChange={(e) => setSelectedRevenueView(e.target.value)}
//                 className="block w-48 py-2 px-3 bg-transparent text-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
//               >
//                 <option value="t&m" className="bg-gray-100 text-gray-800">T&M Revenue</option>
//                 <option value="cpff" className="bg-gray-100 text-gray-800">CPFF Revenue</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
//                 </svg>
//               </div>
//             </div>
//           </div> */}

//           {/* Cancel Button for Pop-out */}
//           {/* <button
//               onClick={onCancel}
//               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
//           >
//               Cancel
//           </button> */}
//         </div>

//         {/* Main table container - Removed redundant getGlassmorphismClasses() here */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//             {/* Table Header */}
//             <thead>
//               <tr className="bg-gray-100 bg-opacity-50">
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
//                 {dynamicDateRanges.map((range) => {
//                   const parts = range.split('_');
//                   const monthPart = parts[0].split('/')[0];
//                   const yearPart = parts[1];
//                   return (
//                     <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
//                       {`${monthPart}/${yearPart}`}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
//             {/* Table Body */}
//             <tbody className="divide-y divide-gray-300 divide-opacity-10">
//               {financialData.length === 0 ? (
//                   <tr>
//                       <td colSpan={dynamicDateRanges.length + 7} className="py-8 text-center text-gray-600 text-lg">
//                           {isLoading ? 'Loading data...' : 'No data available for the selected criteria.'}
//                       </td>
//                   </tr>
//               ) : (
//                   financialData.map((row) => (
//                   <React.Fragment key={row.id}>
//                       <tr
//                       className={`
//                           group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
//                           ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
//                           ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
//                       `}
//                       onClick={() => (row.type === 'expandable' && row.id.startsWith('total-staff-cost')) ? toggleStaffRow(row.id) : (row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') ? toggleNonLaborAcctRow(row.id) : null)}
//                       >
//                       <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                           {row.type === 'expandable' && (
//                           <span className="mr-2">
//                               {/* Conditional rendering for chevron icon based on row type */}
//                               {(row.id.startsWith('total-staff-cost') && expandedStaffRows.includes(row.id)) ||
//                                (row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id)) ? (
//                               <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                               ) : (
//                               <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                               )}
//                           </span>
//                           )}
//                           {row.description}
//                       </td>
//                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.accountId || ''}</td>
//                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.orgId || ''}</td>
//                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.glcPlc || ''}</td>
//                       <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.hrlyRate)}</td>
//                       <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${
//                           typeof row.total === 'number' && row.total < 0 ? 'text-red-600' :
//                           (typeof row.total === 'number' && row.total > 0 && row.description === 'Profit' ? 'text-green-600' : '')
//                       }`}>
//                            {/* Apply percentage formatting for Profit % rows in Total column */}
//                           {row.description.includes('Profit %') ? formatValue(row.total, false, true) : formatValue(row.total)}
//                       </td>
//                       {dynamicDateRanges.map((range) => {
//                           let dataForRange;

//                           if (row.description === 'Revenue') {
//                               if (selectedRevenueView === 't&m' && row.tnmRevenueData) {
//                                   dataForRange = row.tnmRevenueData[range];
//                               } else if (selectedRevenueView === 'cpff' && row.cpffRevenueData) {
//                                   dataForRange = row.cpffRevenueData[range];
//                               } else {
//                                   dataForRange = row.data[range];
//                               }
//                           } else {
//                               dataForRange = row.data[range];
//                           }

//                           const isProfitRow = row.id.startsWith('profit-');
//                           const isNegative = typeof dataForRange === 'number' && dataForRange < 0;
//                           const isPositive = typeof dataForRange === 'number' && dataForRange > 0;
//                           let textColorClass = '';
//                           if (isProfitRow) {
//                               if (isNegative) {
//                                   textColorClass = 'text-red-600';
//                               } else if (isPositive) {
//                                   textColorClass = 'text-green-600';
//                               }
//                           }
//                           return (
//                           <td key={range} className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${textColorClass}`}>
//                               {/* Apply percentage formatting for Profit % rows in monthly data */}
//                               {row.description.includes('Profit %') ? formatValue(dataForRange, false, true) : formatValue(dataForRange)}
//                           </td>
//                           );
//                       })}
//                       </tr>

//                       {/* Render expanded employees for Total Staff Cost row */}
//                       {row.type === 'expandable' && expandedStaffRows.includes(row.id) && row.employees && row.employees.length > 0 && (
//                         <>
//                           {row.employees.map((employee) => (
//                             <React.Fragment key={`${row.id}-${employee.id}`}>
//                               {/* Individual Employee Row */}
//                               <tr
//                                   className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                                   onClick={() => toggleEmployeeDetail(`${row.id}-${employee.id}`)}
//                               >
//                                   <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                   <span className="mr-2">
//                                       {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) ? (
//                                       <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                       ) : (
//                                       <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                       )}
//                                   </span>
//                                   {employee.name}
//                                   </td>
//                                   {/* Display Account ID for the employee */}
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.accountId || ''}</td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.orgId || ''}</td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.glcPlc || ''}</td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td>
//                                   {/* This cell now correctly displays the total cost for the employee */}
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                   {formatValue(employee.cost)}
//                                   </td>
//                                   {dynamicDateRanges.map((currentRange) => (
//                                       <td key={`${employee.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                           {formatValue(employee.monthlyCost[currentRange] || 0)}
//                                       </td>
//                                   ))}
//                               </tr>

//                               {/* Employee Hours Row (nested detail) */}
//                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && (
//                                 <tr key={`${employee.id}-hours-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
//                                   <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
//                                     --- Employee Hours
//                                   </td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap"></td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                     {/* This is the correct place for total hours in detail */}
//                                     {formatValue(Object.values(employee.monthlyHours).reduce((sum, val) => sum + val, 0))}
//                                   </td>
//                                   {dynamicDateRanges.map((currentRange) => (
//                                     <td key={`${employee.id}-hours-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                       {formatValue(employee.monthlyHours[currentRange] || 0, true)}
//                                     </td>
//                                   ))}
//                                 </tr>
//                               )}

//                               {/* Nested Employee Cost Details (Raw Cost, Fringe, Overhead, G&A) as horizontal rows */}
//                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && Object.keys(employee.detailSummary).length > 0 && (
//                                   <>
//                                     {Object.keys(employee.detailSummary).map(detailDescription => {
//                                       const detailTotal = Object.values(employee.detailSummary[detailDescription]).reduce((sum, val) => sum + val, 0);

//                                       return (
//                                       <tr key={`${employee.id}-${detailDescription}-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
//                                         <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
//                                           --- {detailDescription}
//                                         </td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-700">{employee.accountId || ''}</td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
//                                         {/* Removed the extra empty <td> here */}
//                                         <td className="py-2 px-4 text-right whitespace-nowrap"></td> {/* This was the extra td */}
//                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                           {formatValue(detailTotal)}
//                                         </td>
//                                         {dynamicDateRanges.map((currentRange) => (
//                                             <td key={`${employee.id}-${detailDescription}-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                               {formatValue(employee.detailSummary[detailDescription][currentRange] || 0)}
//                                             </td>
//                                         ))}
//                                       </tr>
//                                     );})}
//                                   </>
//                               )}
//                             </React.Fragment>
//                           ))}
//                         </>
//                       )}

//                     {/* Render expanded Non-Labor Staff Cost rows */}
//                     {row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id) && row.nonLaborAccts && row.nonLaborAccts.length > 0 && (
//                         <>
//                             {row.nonLaborAccts.map((acctGroup) => (
//                                 <React.Fragment key={`${row.id}-${acctGroup.id}`}>
//                                     {/* Account Group Row for Non-Labor (e.g., "Account: 647-002-140 - Airfare") */}
//                                     <tr
//                                         className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                                         onClick={() => toggleNonLaborAcctRow(`${row.id}-${acctGroup.id}`)} // Toggle for sub-level expansion
//                                     >
//                                         <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                             <span className="mr-2">
//                                                 {expandedNonLaborAcctRows.includes(`${acctGroup.id}`) ? ( // Check for acctGroup.id directly
//                                                     <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                                 ) : (
//                                                     <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                                 )}
//                                             </span>
//                                             {acctGroup.description}
//                                         </td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.id || ''}</td> {/* Account ID */}
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.orgId || ''}</td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.glcPlc || ''}</td>
//                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* No Hrly Rate for Non-Labor */}
//                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.total)}</td>
//                                         {dynamicDateRanges.map((currentRange) => (
//                                             <td key={`${acctGroup.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                                 {formatValue(acctGroup.monthlyData[currentRange] || 0)}
//                                             </td>
//                                         ))}
//                                     </tr>

//                                     {/* Employee Grouping within Account Group - Now always visible if account is expanded */}
//                                     {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) && acctGroup.employees && acctGroup.employees.length > 0 && (
//                                         <>
//                                             <tr className="bg-gray-100 bg-opacity-30">
//                                                 <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase" colSpan="5">Employee</td>
//                                                 <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td>
//                                                 {dynamicDateRanges.map((range) => (
//                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
//                                                         {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`}
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                             {acctGroup.employees.map((employeeGroup) => (
//                                                 <React.Fragment key={`${acctGroup.id}-${employeeGroup.id}`}>
//                                                     <tr
//                                                         className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs" // Removed cursor-pointer and group
//                                                         // Removed onClick handler here
//                                                     >
//                                                         <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                                             {/* Removed chevron icon */}
//                                                             {employeeGroup.name}
//                                                         </td>
//                                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800"></td> {/* Empty for alignment */}
//                                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800"></td> {/* Empty for alignment */}
//                                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800"></td> {/* Empty for alignment */}
//                                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Empty for alignment */}
//                                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(employeeGroup.total)}</td>
//                                                         {dynamicDateRanges.map((currentRange) => (
//                                                             <td key={`${employeeGroup.id}-${currentRange}-monthly-total`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                                                 {formatValue(employeeGroup.monthlyData[currentRange] || 0)}
//                                                             </td>
//                                                         ))}
//                                                     </tr>

//                                                     {/* Individual DCT entries under the employee group - Removed Period sub-table */}
//                                                     {/* The individual entries are now directly shown if the employee group is present and has entries */}
//                                                     {/* Removed the entire <tr> block that displayed nonLaborEntry.monthLabel vertically */}
//                                                 </React.Fragment>
//                                             ))}
//                                         </>
//                                     )}

//                                     {/* Removed Nested Non-Labor Cost Details (Raw Cost, Fringe, Overhead, G&A, Materials) aggregated by account and month */}
//                                 </React.Fragment>
//                             ))}
//                         </>
//                     )}
//                   </React.Fragment>
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisByPeriodContent;

'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error }) => {
  const [expandedStaffRows, setExpandedStaffRows] = useState([]);
  const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
  const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
  const [financialData, setFinancialData] = useState([]);

  const [allApiData, setAllApiData] = useState(null);
  const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [availableOrgIds, setAvailableOrgIds] = useState([]);

  const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');

  /**
   * Helper to map month and year to a date range string (e.g., "05/01-05/31_2025")
   * Uses Date object to accurately determine the last day of the month, accounting for leap years.
   */
  const getMonthRangeKey = (month, year) => {
    // Month is 1-indexed for input, but 0-indexed for Date constructor (month - 1)
    // Day 0 of the *next* month gives the last day of the *current* month
    const lastDay = new Date(year, month, 0).getDate();
    const monthString = month.toString().padStart(2, '0');
    return `${monthString}/01-${monthString}/${lastDay}_${year}`;
  };

  /**
   * Transforms the raw API response into the FinancialRow structure expected by the frontend.
   * This function filters the provided apiResponse based on currentOrgId.
   * It also dynamically calculates profit based on the selected revenue view.
   */
  const transformApiDataToFinancialRows = useCallback((
    apiResponse,
    currentOrgId,
    dynamicDateRanges,
    selectedRevenueView,
    planType // Added planType here
  ) => {
    console.log("transformApiDataToFinancialRows: apiResponse", apiResponse);
    console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
    console.log("transformApiDataToFinancialRows: dynamicDateRanges", dynamicDateRanges);
    console.log("transformApiDataToFinancialRows: planType", planType);

    const financialRows = [];

    const revenueData = {};
    const tnmRevenueData = {};
    const cpffRevenueData = {};
    const totalExpenseData = {};
    const profitData = {};
    const profitOnCostData = {};
    const profitOnRevenueData = {};

    let totalRevenueOverall = 0;
    let totalExpenseOverall = 0;
    let totalProfitOverall = 0;
    let overallProfitOnCost = 0;
    let overallProfitOnRevenue = 0;

    dynamicDateRanges.forEach(range => {
      revenueData[range] = 0;
      tnmRevenueData[range] = 0;
      cpffRevenueData[range] = 0;
      totalExpenseData[range] = 0;
      profitData[range] = 0;
      profitOnCostData[range] = 0;
      profitOnRevenueData[range] = 0;
    });

    const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {});

    const totalStaffHoursByMonth = dynamicDateRanges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {});

    const uniqueEmployeesMap = new Map();
    const nonLaborAcctDetailsMap = new Map(); // Map to group non-labor details by account ID and then by month

    const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
      // Filter only by selected Org ID.
      return currentOrgId ? empSummary.orgID === currentOrgId : true;
    });

    if (filteredEmployeeSummaries.length > 0) {
      filteredEmployeeSummaries.forEach(empSummary => {
        // Use emplId as the unique key for the employee map
        if (!uniqueEmployeesMap.has(empSummary.emplId)) {
          uniqueEmployeesMap.set(empSummary.emplId, {
            id: empSummary.emplId,
            name: `${empSummary.name} (${empSummary.emplId})`, // Format name (EMPLID)
            cost: 0,
            accountId: empSummary.accID || '', // Use accID from empSummary
            orgId: empSummary.orgId || '',
            glcPlc: empSummary.plcCode || '',
            hrlyRate: empSummary.perHourRate || 0,
            monthlyHours: {},
            monthlyCost: {},
            detailSummary: {},
          });
        }
        const employee = uniqueEmployeesMap.get(empSummary.emplId);

        if (empSummary.emplSchedule && Array.isArray(empSummary.emplSchedule.payrollSalary)) {
          empSummary.emplSchedule.payrollSalary.forEach(salaryEntry => {
            const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

            if (monthRange) {
              tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
              revenueData[monthRange] = (revenueData[monthRange] || 0) + (salaryEntry.revenue || 0);

              totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
              totalStaffCostByMonth[monthRange] = (totalStaffCostByMonth[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
              totalStaffHoursByMonth[monthRange] = (totalStaffHoursByMonth[monthRange] || 0) + (salaryEntry.hours || 0);

              employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
              employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

              if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
              employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

              if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
              employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

              if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
              employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

              if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
              employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
            }
          });
        }
      });
    }

    // Process direct and indirect cost data for Non-Labor Staff Cost
    let totalNonLaborCostOverall = 0;
    const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {});

    // Combine direct and indirect costs, using the correct casing for directCOstForecastSummary
    const allNonLaborSummaries = [
      ...(apiResponse.directCOstForecastSummary || []), // Corrected casing here
      ...(apiResponse.indirectCostForecastSummary || [])
    ];
    console.log("transformApiDataToFinancialRows: allNonLaborSummaries (before filter)", allNonLaborSummaries);


    allNonLaborSummaries.filter(nonLaborSummary => {
        const shouldInclude = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
        console.log(`Filtering non-labor summary for orgID ${nonLaborSummary.orgID}. Current selectedOrgId: ${currentOrgId}. Include: ${shouldInclude}`);
        return shouldInclude;
    }).forEach(nonLaborSummary => {
        // Correctly access the 'forecasts' array within directCostSchedule or indirectCostSchedule
        const schedules = (nonLaborSummary.directCostSchedule && nonLaborSummary.directCostSchedule.forecasts) ||
                          (nonLaborSummary.indirectCostSchedule && nonLaborSummary.indirectCostSchedule.forecasts) || [];
        console.log(`Processing non-labor summary for accID: ${nonLaborSummary.accID}, orgID: ${nonLaborSummary.orgID}. Forecast schedules found:`, schedules);

        const accountId = nonLaborSummary.accID;
        const orgId = nonLaborSummary.orgID;
        const glcPlc = nonLaborSummary.plcCode || '';
        const accName = nonLaborSummary.accName || `Account: ${accountId}`;

        if (!nonLaborAcctDetailsMap.has(accountId)) {
            nonLaborAcctDetailsMap.set(accountId, {
                id: accountId,
                description: accName,
                orgId: orgId,
                glcPlc: glcPlc,
                total: 0, // Total for this account across all periods
                monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}), // Total for this account per month
                employees: new Map(), // New: Map to hold employee-level data within this account
            });
            console.log(`  New non-labor account group created: ${accountId}`);
        }
        const acctGroup = nonLaborAcctDetailsMap.get(accountId);

        // Group schedules by employee within the account group
        const employeeId = nonLaborSummary.emplId || 'N/A_Employee'; // Use a default if emplId is missing
        const employeeName = nonLaborSummary.name || `Employee ${employeeId}`;

        if (!acctGroup.employees.has(employeeId)) {
            acctGroup.employees.set(employeeId, {
                id: employeeId,
                name: `${employeeName} (${employeeId})`,
                total: 0,
                monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
                entries: [], // These are the original DCT-level entries for this specific employee
            });
        }
        const employeeGroup = acctGroup.employees.get(employeeId);


        schedules.forEach(scheduleEntry => {
            const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
            if (monthRange) {
                let entryCost = 0;
                if (planType === 'EAC') {
                    entryCost = scheduleEntry.actualamt || 0;
                } else if (planType === 'BUD') {
                    entryCost = scheduleEntry.forecastedamt || 0;
                } else {
                    // Fallback to original calculation if planType is not EAC or BUD
                    entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
                }

                console.log(`  Schedule entry for ${monthRange}: planType=${planType}, actualamt=${scheduleEntry.actualamt}, forecastedamt=${scheduleEntry.forecastedamt}. Calculated entryCost: ${entryCost}`);

                // Add the individual schedule entry to the employee's entries array
                employeeGroup.entries.push({
                    id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`, // Unique ID for this specific monthly entry
                    dctId: scheduleEntry.dctId,
                    forecastid: scheduleEntry.forecastid,
                    monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
                    total: entryCost, // Total for this specific entry (for that month)
                    monthlyValues: { [monthRange]: entryCost } // This will populate the correct month column for this specific entry
                });

                // Aggregate totals for the employee group
                employeeGroup.monthlyData[monthRange] += entryCost;
                employeeGroup.total += entryCost;

                // Aggregate totals for the account group (still at account level)
                acctGroup.monthlyData[monthRange] += entryCost;
                acctGroup.total += entryCost;

                totalNonLaborCostByMonth[monthRange] = (totalNonLaborCostByMonth[monthRange] || 0) + entryCost;
                totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + entryCost;
            }
        });
    });

    Array.from(uniqueEmployeesMap.values()).forEach(employee => {
      employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
    });

    Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
        // Recalculate total for acctGroup in case it wasn't fully accumulated (though it should be)
        acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
        // Convert employee maps to arrays for rendering
        acctGroup.employees = Array.from(acctGroup.employees.values());
    });

    totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
    console.log("transformApiDataToFinancialRows: totalNonLaborCostOverall", totalNonLaborCostOverall);
    console.log("transformApiDataToFinancialRows: totalNonLaborCostByMonth", totalNonLaborCostByMonth);
    console.log("transformApiDataToFinancialRows: nonLaborAcctDetailsMap contents (after processing)", Array.from(nonLaborAcctDetailsMap.values()));


    let overallRevenueForProfit = apiResponse.revenue || 0; // Use the top-level API revenue for overall profit calculation
    totalRevenueOverall = apiResponse.revenue || 0;


    totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
    const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
    const totalStaffHoursOverall = Object.values(totalStaffHoursByMonth).reduce((sum, val) => sum + val, 0);

    totalProfitOverall = overallRevenueForProfit - totalExpenseOverall;
    overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
    overallProfitOnRevenue = overallRevenueForProfit !== 0
      ? (totalProfitOverall / overallRevenueForProfit)
      : 0;

    financialRows.push({
      id: `revenue-${currentOrgId}`,
      description: 'Revenue',
      total: totalRevenueOverall,
      data: revenueData,
      tnmRevenueData: tnmRevenueData,
      cpffRevenueData: cpffRevenueData,
      type: 'summary',
      orgId: currentOrgId,
    });

    financialRows.push({
      id: `total-staff-cost-${currentOrgId}`,
      description: 'Total Staff Cost',
      total: totalStaffCostOverall,
      totalHours: totalStaffHoursOverall,
      data: totalStaffCostByMonth,
      type: 'expandable',
      employees: Array.from(uniqueEmployeesMap.values()),
      orgId: currentOrgId,
    });

    // New Non-Labor Staff Cost row
    financialRows.push({
        id: `non-labor-staff-cost-${currentOrgId}`,
        description: 'Non-Labor Staff Cost',
        total: totalNonLaborCostOverall,
        data: totalNonLaborCostByMonth,
        type: 'expandable',
        nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()), // Attach processed non-labor data
        orgId: currentOrgId,
    });


    financialRows.push({
      id: `total-expense-${currentOrgId}`,
      description: 'Total Expense',
      total: totalExpenseOverall,
      data: totalExpenseData,
      type: 'summary',
      orgId: currentOrgId,
    });

    financialRows.push({
      id: `profit-${currentOrgId}`,
      description: 'Profit',
      total: totalProfitOverall,
      data: profitData,
      type: 'summary',
      orgId: currentOrgId,
    });

    dynamicDateRanges.forEach(range => {
      const profit = (profitData[range] || 0);
      const expense = (totalExpenseData[range] || 0);
      profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
    });

    financialRows.push({
      id: `profit-cost-${currentOrgId}`,
      description: 'Profit % on Cost',
      total: overallProfitOnCost, // Store as decimal, format for display
      data: profitOnCostData,
      type: 'summary',
      orgId: currentOrgId,
    });

    dynamicDateRanges.forEach(range => {
      const profit = (profitData[range] || 0);
      let revenueForPercentage = 0;
      if (selectedRevenueView === 't&m') {
        revenueForPercentage = (tnmRevenueData[range] || 0);
      } else if (selectedRevenueView === 'cpff') {
        revenueForPercentage = (cpffRevenueData[range] || 0);
      }
      profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
    });

    financialRows.push({
      id: `profit-revenue-${currentOrgId}`,
      description: 'Profit % on Revenue',
      total: overallProfitOnRevenue, // Store as decimal, format for display
      data: profitOnRevenueData,
      type: 'summary',
      orgId: currentOrgId,
    });

    console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
    return financialRows;
  }, [selectedRevenueView]);


  // This useEffect now processes the initialApiData received from props
  useEffect(() => {
    console.log("useEffect: initialApiData received", initialApiData);
    if (isLoading) {
      console.log("useEffect: Data is still loading.");
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId('');
      setAvailableOrgIds([]);
      setFinancialData([]);
      return;
    }

    if (error) {
      console.log("useEffect: Error received:", error);
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId('');
      setAvailableOrgIds([]);
      setFinancialData([]);
      return;
    }

    if (initialApiData) {
      console.log("useEffect: Processing initialApiData...");
      setAllApiData(initialApiData);

      const uniqueOrgIds = new Set();
      const uniqueDateRangesSet = new Set();

      (initialApiData.employeeForecastSummary || []).forEach(summary => {
        if (summary.emplSchedule && Array.isArray(summary.emplSchedule.payrollSalary)) {
          uniqueOrgIds.add(summary.orgID);

          summary.emplSchedule.payrollSalary.forEach(salaryEntry => {
              const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
              uniqueDateRangesSet.add(monthRangeKey);
          });
        }
      });

      // Add non-labor dates to dynamicDateRanges from direct and indirect cost summaries
      const allNonLaborSummaries = [
        ...(initialApiData.directCOstForecastSummary || []), // Corrected casing here
        ...(initialApiData.indirectCostForecastSummary || [])
      ];
      console.log("useEffect: allNonLaborSummaries for date/org collection", allNonLaborSummaries);

      allNonLaborSummaries.forEach(nonLaborSummary => {
        const schedules = (nonLaborSummary.directCostSchedule && nonLaborSummary.directCostSchedule.forecasts) ||
                          (nonLaborSummary.indirectCostSchedule && nonLaborSummary.indirectCostSchedule.forecasts) || [];
        schedules.forEach(scheduleEntry => {
            const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
            uniqueDateRangesSet.add(monthRangeKey);
        });
        uniqueOrgIds.add(nonLaborSummary.orgID);
      });


      const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
          const [, , yearAStr] = a.split('_');
          const [monthAStr,] = a.split('/')[0].split('-');
          const yearA = parseInt(yearAStr);
          const monthA = parseInt(monthAStr);

          const [, , yearBStr] = b.split('_');
          const [monthBStr,] = b.split('/')[0].split('-');
          const yearB = parseInt(yearBStr);
          const monthB = parseInt(monthBStr);

          if (yearA !== yearB) return yearA - yearB;
          return monthA - monthB;
      });

      setDynamicDateRanges(sortedDateRanges);
      console.log("useEffect: dynamicDateRanges set to", sortedDateRanges);

      const orgs = Array.from(uniqueOrgIds).sort();
      setAvailableOrgIds(orgs);
      console.log("useEffect: availableOrgIds set to", orgs);

      if (orgs.length > 0) {
        setSelectedOrgId(orgs[0]);
        console.log("useEffect: selectedOrgId set to", orgs[0]);
      } else {
        setSelectedOrgId('');
        console.log("useEffect: selectedOrgId set to empty (no orgs found)");
      }
    } else {
      console.log("useEffect: initialApiData is null or undefined.");
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId('');
      setAvailableOrgIds([]);
      setFinancialData([]);
    }
  }, [initialApiData, isLoading, error]); // Depend on initialApiData, isLoading, error props

  useEffect(() => {
    if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
      console.log("useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data...");
      const transformedData = transformApiDataToFinancialRows(
        allApiData,
        selectedOrgId,
        dynamicDateRanges,
        selectedRevenueView,
        type // Pass the 'type' prop (which is plType)
      );
      console.log("Transformed Data (after filter & transform):", transformedData);
      setFinancialData(transformedData);
    } else {
      console.log("useEffect (transform trigger): Waiting for allApiData, selectedOrgId, or dynamicDateRanges to be ready.");
      setFinancialData([]);
    }
    setExpandedStaffRows([]);
    setExpandedEmployeeDetails([]);
    setExpandedNonLaborAcctRows([]); // Reset non-labor expansions
  }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows, type]); // Add 'type' to dependencies

  const toggleStaffRow = (id) => {
    setExpandedStaffRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleEmployeeDetail = (id) => {
    setExpandedEmployeeDetails(prev =>
      prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
    );
  };

  // New toggle function for non-labor account rows
  const toggleNonLaborAcctRow = (id) => {
    setExpandedNonLaborAcctRows(prev =>
        prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const formatValue = (value, isHours = false, isPercentage = false) => {
    if (typeof value === 'number') {
      let formatted;
      if (isPercentage) {
        formatted = (value * 100).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return `${formatted}%`;
      }
      formatted = value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return isHours ? `${formatted} hrs` : formatted;
    }
    return isHours ? '0.00 hrs' : (isPercentage ? '0.00%' : '0.00');
  };

  // Adjusted for more transparency
  const getGlassmorphismClasses = () => `
    bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
    border border-opacity-10 border-white shadow-lg
  `;

  if (isLoading) { // Use prop for loading
    return (
      <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
        Loading data...
      </div>
    );
  }

  if (error) { // Use prop for error
    return (
      <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
      {/* New container for the main content with glassmorphism */}
      <div className={`p-6 ${getGlassmorphismClasses()}`}>
        {/* Page Title - Hidden */}
        {/* <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg text-gray-900">Analysis by Period</h1> */}

        {/* Dropdown Selectors and Buttons - Hidden */}
        <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden">
          {/* Org ID Dropdown - Still commented out as per previous instruction */}
          {/*
          <div className="flex items-center">
            <label htmlFor="orgId-select" className="text-lg font-semibold mr-4">Select Org:</label>
            <div className={`relative ${getGlassmorphismClasses()} p-2`}>
              <select
                id="orgId-select"
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
              >
                <option value="" className="bg-gray-800 text-white">-- Select Org --</option>
                {availableOrgIds.map(orgId => (
                  <option key={orgId} value={orgId} className="bg-gray-800 text-white">
                    {orgId}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                </svg>
              </div>
            </div>
          </div>
          */}

          {/* Plan ID Dropdown (Fixed/Disabled) - Commented Out */}
          {/*
          <div className="flex items-center">
            <label htmlFor="planId-select" className="text-lg font-semibold mr-4">Plan:</label>
            <div className={`relative ${getGlassmorphismClasses()} p-2`}>
              <select
                id="planId-select"
                value={planID}
                onChange={() => {}}
                className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
                disabled
              >
                <option value={planID} className="bg-gray-800 text-white">{planID}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                </svg>
              </div>
            </div>
          </div>
          */}
          {/* Template ID Dropdown (Fixed/Disabled) - Commented Out */}
          {/*
          <div className="flex items-center">
            <label htmlFor="templateId-select" className="text-lg font-semibold mr-4">Template:</label>
            <div className={`relative ${getGlassmorphismClasses()} p-2`}>
              <select
                id="templateId-select"
                value={templateId}
                onChange={() => {}}
                className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
                disabled
              >
                <option value={templateId} className="bg-gray-800 text-white">{templateId}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                </svg>
              </div>
            </div>
          </div>
          */}
          {/* Type Dropdown (Fixed/Disabled) - Commented Out */}
          {/*
          <div className="flex items-center">
            <label htmlFor="type-select" className="text-lg font-semibold mr-4">Type:</label>
            <div className={`relative ${getGlassmorphismClasses()} p-2`}>
              <select
                id="type-select"
                value={type}
                onChange={() => {}}
                className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
                disabled
              >
                <option value={type} className="bg-gray-800 text-white">{type}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                </svg>
              </div>
            </div>
          </div>
          */}

          {/* Revenue Type Selector */}
          {/* <div className="flex items-center">
            <label htmlFor="revenue-view-select" className="text-lg font-semibold mr-4 text-gray-800">Revenue View:</label>
            <div className={`relative ${getGlassmorphismClasses()} p-2`}>
              <select
                id="revenue-view-select"
                value={selectedRevenueView}
                onChange={(e) => setSelectedRevenueView(e.target.value)}
                className="block w-48 py-2 px-3 bg-transparent text-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
              >
                <option value="t&m" className="bg-gray-100 text-gray-800">T&M Revenue</option>
                <option value="cpff" className="bg-gray-100 text-gray-800">CPFF Revenue</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                </svg>
              </div>
            </div>
          </div> */}

          {/* Cancel Button for Pop-out */}
          {/* <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
          >
              Cancel
          </button> */}
        </div>

        {/* Main table container - Removed redundant getGlassmorphismClasses() here */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 bg-opacity-50">
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
                {dynamicDateRanges.map((range) => {
                  const parts = range.split('_');
                  const monthPart = parts[0].split('/')[0];
                  const yearPart = parts[1];
                  return (
                    <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                      {`${monthPart}/${yearPart}`}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-300 divide-opacity-10">
              {financialData.length === 0 ? (
                  <tr>
                      <td colSpan={dynamicDateRanges.length + 7} className="py-8 text-center text-gray-600 text-lg">
                          {isLoading ? 'Loading data...' : 'No data available for the selected criteria.'}
                      </td>
                  </tr>
              ) : (
                  financialData.map((row) => (
                  <React.Fragment key={row.id}>
                      <tr
                      className={`
                          group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
                          ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
                          ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
                      `}
                      onClick={() => (row.type === 'expandable' && row.id.startsWith('total-staff-cost')) ? toggleStaffRow(row.id) : (row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') ? toggleNonLaborAcctRow(row.id) : null)}
                      >
                      <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                          {row.type === 'expandable' && (
                          <span className="mr-2">
                              {/* Conditional rendering for chevron icon based on row type */}
                              {(row.id.startsWith('total-staff-cost') && expandedStaffRows.includes(row.id)) ||
                               (row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id)) ? (
                              <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                              ) : (
                              <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                              )}
                          </span>
                          )}
                          {row.description}
                      </td>
                      <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.accountId || ''}</td>
                      <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.orgId || ''}</td>
                      <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.glcPlc || ''}</td>
                      <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.hrlyRate)}</td>
                      <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${
                          typeof row.total === 'number' && row.total < 0 ? 'text-red-600' :
                          (typeof row.total === 'number' && row.total > 0 && row.description === 'Profit' ? 'text-green-600' : '')
                      }`}>
                           {/* Apply percentage formatting for Profit % rows in Total column */}
                          {row.description.includes('Profit %') ? formatValue(row.total, false, true) : formatValue(row.total)}
                      </td>
                      {dynamicDateRanges.map((range) => {
                          let dataForRange;

                          if (row.description === 'Revenue') {
                              if (selectedRevenueView === 't&m' && row.tnmRevenueData) {
                                  dataForRange = row.tnmRevenueData[range];
                              } else if (selectedRevenueView === 'cpff' && row.cpffRevenueData) {
                                  dataForRange = row.cpffRevenueData[range];
                              } else {
                                  dataForRange = row.data[range];
                              }
                          } else {
                              dataForRange = row.data[range];
                          }

                          const isProfitRow = row.id.startsWith('profit-');
                          const isNegative = typeof dataForRange === 'number' && dataForRange < 0;
                          const isPositive = typeof dataForRange === 'number' && dataForRange > 0;
                          let textColorClass = '';
                          if (isProfitRow) {
                              if (isNegative) {
                                  textColorClass = 'text-red-600';
                              } else if (isPositive) {
                                  textColorClass = 'text-green-600';
                              }
                          }
                          return (
                          <td key={range} className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${textColorClass}`}>
                              {/* Apply percentage formatting for Profit % rows in monthly data */}
                              {row.description.includes('Profit %') ? formatValue(dataForRange, false, true) : formatValue(dataForRange)}
                          </td>
                          );
                      })}
                      </tr>

                      {/* Render expanded employees for Total Staff Cost row */}
                      {row.type === 'expandable' && expandedStaffRows.includes(row.id) && row.employees && row.employees.length > 0 && (
                        <>
                          {row.employees.map((employee) => (
                            <React.Fragment key={`${row.id}-${employee.id}`}>
                              {/* Individual Employee Row */}
                              <tr
                                  className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
                                  onClick={() => toggleEmployeeDetail(`${row.id}-${employee.id}`)}
                              >
                                  <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                  <span className="mr-2">
                                      {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) ? (
                                      <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                      ) : (
                                      <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                      )}
                                  </span>
                                  {employee.name}
                                  </td>
                                  {/* Display Account ID for the employee */}
                                  <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.accountId || ''}</td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.orgId || ''}</td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.glcPlc || ''}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td>
                                  {/* This cell now correctly displays the total cost for the employee */}
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                  {formatValue(employee.cost)}
                                  </td>
                                  {dynamicDateRanges.map((currentRange) => (
                                      <td key={`${employee.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                          {formatValue(employee.monthlyCost[currentRange] || 0)}
                                      </td>
                                  ))}
                              </tr>

                              {/* Employee Hours Row (nested detail) */}
                              {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && (
                                <tr key={`${employee.id}-hours-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
                                  <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
                                    --- Employee Hours
                                  </td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
                                    {/* This is the correct place for total hours in detail */}
                                    {formatValue(Object.values(employee.monthlyHours).reduce((sum, val) => sum + val, 0))}
                                  </td>
                                  {dynamicDateRanges.map((currentRange) => (
                                    <td key={`${employee.id}-hours-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
                                      {formatValue(employee.monthlyHours[currentRange] || 0, true)}
                                    </td>
                                  ))}
                                </tr>
                              )}

                              {/* Nested Employee Cost Details (Raw Cost, Fringe, Overhead, G&A) as horizontal rows */}
                              {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && Object.keys(employee.detailSummary).length > 0 && (
                                  <>
                                    {Object.keys(employee.detailSummary).map(detailDescription => {
                                      const detailTotal = Object.values(employee.detailSummary[detailDescription]).reduce((sum, val) => sum + val, 0);

                                      return (
                                      <tr key={`${employee.id}-${detailDescription}-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
                                        <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
                                          --- {detailDescription}
                                        </td>
                                        <td className="py-2 px-4 text-left whitespace-nowrap text-gray-700">{employee.accountId || ''}</td>
                                        <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                        <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                        {/* Removed the extra empty <td> here */}
                                        <td className="py-2 px-4 text-right whitespace-nowrap"></td> {/* This was the extra td */}
                                        <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
                                          {formatValue(detailTotal)}
                                        </td>
                                        {dynamicDateRanges.map((currentRange) => (
                                            <td key={`${employee.id}-${detailDescription}-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
                                              {formatValue(employee.detailSummary[detailDescription][currentRange] || 0)}
                                            </td>
                                        ))}
                                      </tr>
                                    );})}
                                  </>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      )}

                    {/* Render expanded Non-Labor Staff Cost rows */}
                    {row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id) && row.nonLaborAccts && row.nonLaborAccts.length > 0 && (
                        <>
                            {row.nonLaborAccts.map((acctGroup) => (
                                <React.Fragment key={`${row.id}-${acctGroup.id}`}>
                                    {/* Account Group Row for Non-Labor (e.g., "Account: 647-002-140 - Airfare") */}
                                    <tr
                                        className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
                                        onClick={() => toggleNonLaborAcctRow(`${row.id}-${acctGroup.id}`)} // Toggle for sub-level expansion
                                    >
                                        <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                            <span className="mr-2">
                                                {expandedNonLaborAcctRows.includes(`${acctGroup.id}`) ? ( // Check for acctGroup.id directly
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                                )}
                                            </span>
                                            {acctGroup.description}
                                        </td>
                                        <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.id || ''}</td> {/* Account ID */}
                                        <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.orgId || ''}</td>
                                        <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.glcPlc || ''}</td>
                                        <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* No Hrly Rate for Non-Labor */}
                                        <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.total)}</td>
                                        {dynamicDateRanges.map((currentRange) => (
                                            <td key={`${acctGroup.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                                {formatValue(acctGroup.monthlyData[currentRange] || 0)}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Employee Grouping within Account Group - Now always visible if account is expanded */}
                                    {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) && acctGroup.employees && acctGroup.employees.length > 0 && (
                                        <React.Fragment> {/* Changed from <> to React.Fragment for consistency and clarity */}
                                            <tr className="bg-gray-100 bg-opacity-30">
                                                <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Empty cells for alignment */}
                                                <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase">Employee</td>
                                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td>
                                                {dynamicDateRanges.map((range) => (
                                                    <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
                                                        {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`}
                                                    </td>
                                                ))}
                                            </tr>
                                            {acctGroup.employees.map((employeeGroup) => (
                                                // Removed React.Fragment here as the outer React.Fragment handles it
                                                <tr key={`${acctGroup.id}-${employeeGroup.id}`}
                                                    className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs"
                                                >
                                                    <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Empty cells for alignment */}
                                                    <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                                        {employeeGroup.name}
                                                    </td>
                                                    <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(employeeGroup.total)}</td>
                                                    {dynamicDateRanges.map((currentRange) => (
                                                        <td key={`${employeeGroup.id}-${currentRange}-monthly-total`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                                            {formatValue(employeeGroup.monthlyData[currentRange] || 0)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                  </React.Fragment>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisByPeriodContent;
