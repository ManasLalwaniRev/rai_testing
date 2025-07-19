// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// const INTERNAL_FINANCIAL_API_URL = 'https://test-api-3tmq.onrender.com/Forecast/CalculateCost';

// /**
//  * Transforms the raw CalculateCostAPIResponse into the RevenueAnalysisRow structure.
//  * This function now aggregates all data into overall totals, without monthly breakdowns or hours.
//  */
// function transformApiResponseToRevenueAnalysisRows(
//   apiResponse
// ) {
//   console.time('transformApiResponse'); // Start timer for transformation
//   const rows = [];

//   let totalRevenueOverall = 0;
//   let totalLaborCostRaw = 0; // Raw cost (base salary) for all labor
//   let totalBurdenedLaborCost = 0; // Total burdened cost for all labor
//   let totalLaborRevenue = 0; // Total labor revenue (sum of revenue + revenue from payrollSalary)
//   // Removed aggregation for these, will use top-level API response values directly
//   // let totalFringeAggregated = 0;
//   // let totalOverheadAggregated = 0;
//   // let totalGnaAggregated = 0;

//   // Map to group employees by PLC
//   const plcMap = new Map();

//   console.log(`Revenue Analysis: Transforming data for all projects/orgs from API response.`);

//   if (!apiResponse.employeeForecastSummary || apiResponse.employeeForecastSummary.length === 0) {
//     console.warn(`Revenue Analysis: No employee data found in API response. Returning empty rows.`);
//     console.timeEnd('transformApiResponse'); // End timer
//     return [];
//   }

//   apiResponse.employeeForecastSummary.forEach(empSummary => {
//     const emplId = empSummary.emplId;
//     const plcCode = empSummary.plcCode || 'Unknown PLC';

//     // Get or create PLC entry
//     let plcDetail = plcMap.get(plcCode);
//     if (!plcDetail) {
//       plcDetail = {
//         id: `plc-${plcCode}`,
//         plcName: plcCode,
//         rawCost: 0, // Initialize rawCost for PLC
//         cost: 0, // Initialize burdenedCost for PLC
//         burdenedCost: 0, // Initialize burdenedCost for PLC
//         employees: [], // Initialize employees array within PLC
//       };
//       plcMap.set(plcCode, plcDetail);
//     }

//     // Get or create Employee entry within the current PLC
//     let employee = plcDetail.employees.find(e => e.id === emplId);
//     if (!employee) {
//       employee = {
//         id: emplId,
//         // Updated to show Name (EMPLID)
//         name: empSummary.name ? `${empSummary.name} (${empSummary.emplId})` : `${empSummary.emplId} (${empSummary.orgID})`,
//         rawCost: 0, // Initialize rawCost for employee
//         cost: 0, // Will be summed up later as total burdened cost for employee
//         accountId: empSummary.acctId || '',
//         orgId: empSummary.orgID || '',
//         glcPlc: empSummary.plcCode || '',
//         hrlyRate: empSummary.perHourRate || 0,
//         revenue: 0, // Initialize employee revenue
//         profit: 0, // Initialize employee profit
//         profitOnCost: '0.00%', // Initialize profitOnCost
//         profitOnRevenue: '0.00%', // Initialize profitOnRevenue
//         // detailSummary: {}, // Removed as per request
//       };
//       plcDetail.employees.push(employee); // Add employee to PLC's list
//     }

//     empSummary.emplSchedule?.payrollSalary.forEach(salaryEntry => {
//       // Aggregate overall totals for the main summary rows
//       totalRevenueOverall += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0);
//       totalLaborCostRaw += (salaryEntry.cost || 0); // Accumulate raw cost
//       totalBurdenedLaborCost += (salaryEntry.totalBurdenCost || 0); // Accumulate burdened cost
//       totalLaborRevenue += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0);

//       // Aggregate for current PLC detail (overall totals)
//       plcDetail.rawCost += (salaryEntry.cost || 0); // PLC raw cost
//       plcDetail.cost += (salaryEntry.totalBurdenCost || 0); // PLC burdened cost
//       plcDetail.burdenedCost += (salaryEntry.totalBurdenCost || 0); // PLC burdened cost (redundant but kept for clarity)


//       // Aggregate employee's overall totals (no monthly breakdown)
//       employee.rawCost += (salaryEntry.cost || 0); // Employee raw cost
//       employee.cost += (salaryEntry.totalBurdenCost || 0); // Employee burdened cost
//       employee.revenue += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0); // Aggregate employee revenue
//     });
//   });

//   // Calculate employee profit and profit percentages after all payroll entries are processed
//   plcMap.forEach(plc => {
//     plc.employees?.forEach(employee => {
//       employee.profit = employee.revenue - employee.cost; // employee.cost is burdened cost
//       employee.profitOnCost = employee.cost !== 0 ? `${((employee.profit / employee.cost) * 100).toFixed(2)}%` : '0.00%';
//       employee.profitOnRevenue = employee.revenue !== 0 ? `${((employee.profit / employee.revenue) * 100).toFixed(2)}%` : '0.00%';
//     });
//   });


//   const totalExpense = totalBurdenedLaborCost; // Total burdened cost from all labor entries
//   const totalProfit = totalRevenueOverall - totalExpense;
//   const profitOnCost = totalExpense !== 0 ? (totalProfit / totalExpense) * 100 : 0;
//   const profitOnRevenue = totalRevenueOverall !== 0 ? (totalProfit / totalRevenueOverall) * 100 : 0;

//   // --- Construct Rows ---

//   // 1. Total Revenue Row
//   rows.push({
//     id: 'total-revenue',
//     description: 'Total Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: undefined,
//     cost: totalExpense, // Total expense (burdened) for context
//     burdenedCost: totalExpense,
//     revenue: totalRevenueOverall,
//     profit: totalProfit,
//     profitOnCost: `${profitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${profitOnRevenue.toFixed(2)}%`,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 2. Labor Revenue Row (Expandable) - now expands to PLCs
//   const laborProfit = totalLaborRevenue - totalBurdenedLaborCost;
//   const laborProfitOnCost = totalBurdenedLaborCost !== 0 ? (laborProfit / totalBurdenedLaborCost * 100) : 0;
//   const laborProfitOnRevenue = totalLaborRevenue !== 0 ? (laborProfit / totalLaborRevenue * 100) : 0;

//   rows.push({
//     id: 'labor-revenue',
//     description: 'Labor Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: totalLaborCostRaw,
//     cost: totalBurdenedLaborCost,
//     burdenedCost: totalBurdenedLaborCost,
//     revenue: totalLaborRevenue,
//     profit: laborProfit,
//     profitOnCost: `${laborProfitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${laborProfitOnRevenue.toFixed(2)}%`,
//     type: 'expandable',
//     plcDetails: Array.from(plcMap.values()),
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 3. Total Fringe Row (New) - using top-level apiResponse.totalFringe
//   rows.push({
//     id: 'total-fringe',
//     description: 'Total Fringe',
//     billRate: undefined, // Keep undefined for summary row
//     rawCost: apiResponse.totalFringe, // Directly use totalFringe from API response
//     cost: apiResponse.totalFringe, // Fringe is typically a cost
//     burdenedCost: apiResponse.totalFringe,
//     revenue: 0, // Fringe is not revenue
//     profit: undefined,
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 4. Total Overhead Row (aggregated from payrollSalary entries) - using top-level apiResponse.total1Overhead
//   rows.push({
//     id: 'total-overhead',
//     description: 'Total Overhead',
//     billRate: undefined, // Keep undefined for summary row
//     rawCost: apiResponse.totalOverhead, // Directly use total1Overhead from API response
//     cost: apiResponse.totalOverhead,
//     burdenedCost: apiResponse.totalOverhead,
//     revenue: 0,
//     profit: undefined, // Set profit to undefined as requested
//     profitOnCost: undefined, // Set profitOnCost to undefined as requested
//     profitOnRevenue: undefined, // Set profitOnRevenue to undefined as requested
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 5. General & Admin Row (aggregated from payrollSalary entries) - using top-level apiResponse.totalGna
//   rows.push({
//     id: 'general-admin',
//     description: 'General & Admin',
//     billRate: undefined, // Keep undefined for summary row
//     rawCost: apiResponse.totalGna, // Directly use totalGna from API response
//     cost: apiResponse.totalGna,
//     burdenedCost: apiResponse.totalGna,
//     revenue: 0,
//     profit: undefined, // Set profit to undefined as requested
//     profitOnCost: undefined, // Set profitOnCost to undefined as requested
//     profitOnRevenue: undefined, // Set profitOnRevenue to undefined as requested
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   console.log("Revenue Analysis: Final transformed rows (aggregated):", rows);
//   console.timeEnd('transformApiResponse'); // End timer for transformation
//   return rows;
// }


// const RevenueAnalysisPage = ({ onCancel, planId, templateId, type, projId, budVersion, status, periodOfPerformance }) => {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [expandedPlcRows, setExpandedPlcRows] = useState([]);
//   // const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]); // Removed as per request

//   const [revenueData, setRevenueData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use props instead of internal state for these values
//   // const [selectedPlanId] = useState(107);
//   // const [selectedTemplateId] = useState(1);
//   // const [selectedType] = useState('TARGET');

//   // Use props for display values, or fallback to defaults
//   const currentProjIdDisplay = projId || "Aggregated";
//   const currentBudVersion = budVersion || "1";
//   const currentStatus = status || "Approved";
//   const currentPeriodOfPerformance = periodOfPerformance || "Aggregated Period";


//   const toggleRow = (id) => {
//     setExpandedRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const togglePlcRow = (id) => {
//     setExpandedPlcRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   // Removed as per request
//   // const toggleEmployeeDetail = (id) => {
//   //   setExpandedEmployeeDetails(prev =>
//   //     prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
//   //   );
//   // };

//   const expandAll = () => {
//     setExpandedRows(revenueData.filter(row => row.type === 'expandable').map(row => row.id));

//     const allPlcIds = [];
//     revenueData.forEach(row => {
//       if (row.id === 'labor-revenue' && row.plcDetails) {
//         row.plcDetails.forEach(plc => allPlcIds.push(plc.id));
//       }
//     });
//     setExpandedPlcRows(allPlcIds);

//     // Removed as per request
//     // const allEmployeeDetailIds = [];
//     // revenueData.forEach(row => {
//     //   if (row.id === 'labor-revenue' && row.plcDetails) {
//     //     row.plcDetails.forEach(plc => {
//     //       plc.employees?.forEach(emp => {
//     //         // ID format: plcId-employeeId
//     //         allEmployeeDetailIds.push(`${plc.id}-${emp.id}`);
//     //       });
//     //     });
//     //   }
//     // });
//     // setExpandedEmployeeDetails(allEmployeeDetailIds);
//   };

//   const collapseAll = () => {
//     setExpandedRows([]);
//     setExpandedPlcRows([]);
//     // setExpandedEmployeeDetails([]); // Removed as per request
//   };

//   // Modified formatValue to return empty string for undefined/null/empty string values
//   const formatValue = (value) => {
//     if (typeof value === 'number') {
//       const formatted = value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//       return formatted;
//     }
//     return value === undefined || value === null || value === '' ? '' : value; // Return empty string for blank display
//   };

//   // Glassmorphism classes for a lighter, more transparent effect
//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   useEffect(() => {
//     const fetchFinancialData = async () => {
//       setLoading(true);
//       setError(null);
//       // Ensure planId is provided before making the API call
//       if (!planId) {
//         setError("No planId provided to Revenue Analysis Page.");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.time('fetchData'); // Start timer for overall fetch operation
//         const params = new URLSearchParams({
//           planID: planId.toString(),
//           templateId: (templateId || 1).toString(), // Default to 1 if not provided
//           type: type || 'TARGET' // Default to 'TARGET' if not provided
//         });
//         const apiFetchUrl = `${INTERNAL_FINANCIAL_API_URL}?${params.toString()}`;
//         console.log(`Revenue Analysis: Fetching data from API (GET): ${apiFetchUrl}`);

//         const response = await fetch(apiFetchUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
//         }

//         const apiResponse = await response.json();
//         console.log("Revenue Analysis: Full API Raw Response:", apiResponse);
        
//         const transformedData = transformApiResponseToRevenueAnalysisRows(apiResponse);
//         setRevenueData(transformedData);
//         console.timeEnd('fetchData'); // End timer for overall fetch operation

//       } catch (err) {
//         console.error("Failed to fetch financial data for Revenue Analysis:", err);
//         setError(`Failed to load financial data. ${err.message}. Please ensure the API is running and returning valid JSON.`);
//         setRevenueData([]);
//         console.timeEnd('fetchData'); // End timer even on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinancialData();
//   }, [planId, templateId, type]); // Dependencies now include props


//   if (loading) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading Revenue Analysis...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
//       {/* Header Section */}
//       <div className={`mb-6 p-6 ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here */}
//         <h1 className="text-xl font-semibold text-gray-900">Project Budgets / EACs {'>'} Revenue Analysis</h1>
//         <p className="text-sm text-gray-700 mt-2">
//           Project ID: {currentProjIdDisplay} Type: BUD Version: {currentBudVersion} Status: {currentStatus} Period of Performance: {currentPeriodOfPerformance}
//         </p>
//       </div>

//       {/* Control Buttons including Cancel */}
//       <div className="mb-4 flex gap-4">
//         <button
//           onClick={expandAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Expand All
//         </button>
//         <button
//           onClick={collapseAll}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
//         >
//           Collapse All
//         </button>
//         <button
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
//         >
//           Cancel
//         </button>
//       </div>

//       {/* Main table container */}
//       <div className={`overflow-x-auto ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here too */}
//         <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//           {/* Table Header */}
//           <thead>
//             <tr className="bg-gray-100 bg-opacity-50">
//               <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Bill Rate</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Burdened Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Revenue</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Revenue</th>
//             </tr>
//           </thead>
//           {/* Table Body */}
//           <tbody className="divide-y divide-gray-300 divide-opacity-10">
//             {revenueData.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="py-8 text-center text-gray-600 text-lg"> {/* colSpan adjusted to 8 (description + 7 metrics) */}
//                   {loading ? 'Loading data...' : 'No revenue analysis data available based on PlanID, Template, and Type parameters. Please check console for API response or data transformation issues.'}
//                 </td>
//               </tr>
//             ) : (
//               revenueData.map((row) => (
//                 <React.Fragment key={row.id}>
//                   {/* Main row */}
//                   <tr
//                     className={`
//                       group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
//                       ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
//                       ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
//                     `}
//                     onClick={() => row.type === 'expandable' && toggleRow(row.id)}
//                   >
//                     <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                       {row.type === 'expandable' && (
//                         <span className="mr-2">
//                           {expandedRows.includes(row.id) ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           )}
//                         </span>
//                       )}
//                       {row.description}
//                     </td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.billRate)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.rawCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.burdenedCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.revenue)}</td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${typeof row.profit === 'number' && row.profit < 0 ? 'text-red-600' : ''}`}>
//                       {formatValue(row.profit)}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnCost && parseFloat(row.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnCost}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnRevenue && parseFloat(row.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnRevenue}
//                     </td>
//                   </tr>

//                   {/* Nested details for Labor Revenue row (PLCs) */}
//                   {row.id === 'labor-revenue' && expandedRows.includes(row.id) && row.plcDetails && row.plcDetails.length > 0 && (
//                     <>
//                       {row.plcDetails.map((plc) => (
//                         <React.Fragment key={`${row.id}-${plc.id}`}>
//                           {/* Individual PLC Row (expandable) */}
//                           <tr
//                             className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                             onClick={() => togglePlcRow(`${row.id}-${plc.id}`)}
//                           >
//                             <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                               <span className="mr-2">
//                                 {expandedPlcRows.includes(`${row.id}-${plc.id}`) ? (
//                                   <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 ) : (
//                                   <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 )}
//                               </span>
//                               {plc.plcName}
//                             </td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.rawCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.burdenedCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Revenue (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Revenue (empty for PLC) */}
//                           </tr>

//                           {/* Nested Employee Details within PLC */}
//                           {expandedPlcRows.includes(`${row.id}-${plc.id}`) && plc.employees && plc.employees.length > 0 && (
//                             <>
//                               {plc.employees.map((employee) => (
//                                 <React.Fragment key={`${plc.id}-${employee.id}`}>
//                                   {/* Individual Employee Row (NOT expandable now) */}
//                                   <tr
//                                     className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs group" // Removed cursor-pointer and onClick
//                                   >
//                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                       {/* Removed Chevron icons as it's no longer expandable */}
//                                       {employee.name}
//                                     </td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td> {/* Display Bill Rate here */}
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.rawCost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.cost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.revenue)}</td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${typeof employee.profit === 'number' && employee.profit < 0 ? 'text-red-600' : ''}`}>
//                                       {formatValue(employee.profit)}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnCost && parseFloat(employee.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnCost}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnRevenue && parseFloat(employee.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnRevenue}
//                                     </td>
//                                   </tr>
//                                 </React.Fragment>
//                               ))}
//                             </>
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RevenueAnalysisPage;

//  At Risk Working 
// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// const INTERNAL_FINANCIAL_API_URL = 'https://test-api-3tmq.onrender.com/Forecast/CalculateCost';

// /**
//  * Transforms the raw CalculateCostAPIResponse into the RevenueAnalysisRow structure.
//  * This function now aggregates all data into overall totals, without monthly breakdowns or hours.
//  */
// function transformApiResponseToRevenueAnalysisRows(
//   apiResponse
// ) {
//   console.time('transformApiResponse'); // Start timer for transformation
//   const rows = [];

//   let totalRevenueOverall = 0;
//   let totalLaborCostRaw = 0; // Raw cost (base salary) for all labor
//   let totalBurdenedLaborCost = 0; // Total burdened cost for all labor
//   let totalLaborRevenue = 0; // Total labor revenue (sum of revenue + revenue from payrollSalary)

//   // Map to group employees by PLC
//   const plcMap = new Map();

//   console.log(`Revenue Analysis: Transforming data for all projects/orgs from API response.`);

//   if (!apiResponse.employeeForecastSummary || apiResponse.employeeForecastSummary.length === 0) {
//     console.warn(`Revenue Analysis: No employee data found in API response. Returning empty rows.`);
//     console.timeEnd('transformApiResponse'); // End timer
//     return [];
//   }

//   apiResponse.employeeForecastSummary.forEach(empSummary => {
//     const emplId = empSummary.emplId;
//     const plcCode = empSummary.plcCode || 'Unknown PLC';

//     // Get or create PLC entry
//     let plcDetail = plcMap.get(plcCode);
//     if (!plcDetail) {
//       plcDetail = {
//         id: `plc-${plcCode}`,
//         plcName: plcCode,
//         rawCost: 0, // Initialize rawCost for PLC
//         cost: 0, // Initialize burdenedCost for PLC
//         burdenedCost: 0, // Initialize burdenedCost for PLC
//         employees: [], // Initialize employees array within PLC
//       };
//       plcMap.set(plcCode, plcDetail);
//     }

//     // Get or create Employee entry within the current PLC
//     let employee = plcDetail.employees.find(e => e.id === emplId);
//     if (!employee) {
//       employee = {
//         id: emplId,
//         // Updated to show Name (EMPLID)
//         name: empSummary.name ? `${empSummary.name} (${empSummary.emplId})` : `${empSummary.emplId} (${empSummary.orgID})`,
//         rawCost: 0, // Initialize rawCost for employee
//         cost: 0, // Will be summed up later as total burdened cost for employee
//         accountId: empSummary.acctId || '',
//         orgId: empSummary.orgID || '',
//         glcPlc: empSummary.plcCode || '',
//         hrlyRate: empSummary.perHourRate || 0,
//         revenue: 0, // Initialize employee revenue
//         profit: 0, // Initialize employee profit
//         profitOnCost: '0.00%', // Initialize profitOnCost
//         profitOnRevenue: '0.00%', // Initialize profitOnRevenue
//       };
//       plcDetail.employees.push(employee); // Add employee to PLC's list
//     }

//     empSummary.emplSchedule?.payrollSalary.forEach(salaryEntry => {
//       // Aggregate overall totals for the main summary rows
//       totalRevenueOverall += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0);
//       totalLaborCostRaw += (salaryEntry.cost || 0); // Accumulate raw cost
//       totalBurdenedLaborCost += (salaryEntry.totalBurdenCost || 0); // Accumulate burdened cost
//       totalLaborRevenue += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0);

//       // Aggregate for current PLC detail (overall totals)
//       plcDetail.rawCost += (salaryEntry.cost || 0); // PLC raw cost
//       plcDetail.cost += (salaryEntry.totalBurdenCost || 0); // PLC burdened cost
//       plcDetail.burdenedCost += (salaryEntry.totalBurdenCost || 0); // PLC burdened cost (redundant but kept for clarity)


//       // Aggregate employee's overall totals (no monthly breakdown)
//       employee.rawCost += (salaryEntry.cost || 0); // Employee raw cost
//       employee.cost += (salaryEntry.totalBurdenCost || 0); // Employee burdened cost
//       employee.revenue += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0); // Aggregate employee revenue
//     });
//   });

//   // Calculate employee profit and profit percentages after all payroll entries are processed
//   plcMap.forEach(plc => {
//     plc.employees?.forEach(employee => {
//       employee.profit = employee.revenue - employee.cost; // employee.cost is burdened cost
//       employee.profitOnCost = employee.cost !== 0 ? `${((employee.profit / employee.cost) * 100).toFixed(2)}%` : '0.00%';
//       employee.profitOnRevenue = employee.revenue !== 0 ? `${((employee.profit / employee.revenue) * 100).toFixed(2)}%` : '0.00%';
//     });
//   });


//   const totalExpense = totalBurdenedLaborCost; // Total burdened cost from all labor entries
//   const totalProfit = totalRevenueOverall - totalExpense;
//   const profitOnCost = totalExpense !== 0 ? (totalProfit / totalExpense) * 100 : 0;
//   const profitOnRevenue = totalRevenueOverall !== 0 ? (totalProfit / totalRevenueOverall) * 100 : 0;

//   // --- Construct Rows ---

//   // 1. Total Revenue Row
//   rows.push({
//     id: 'total-revenue',
//     description: 'Total Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: undefined,
//     cost: totalExpense, // Total expense (burdened) for context
//     burdenedCost: totalExpense,
//     revenue: totalRevenueOverall,
//     profit: totalProfit,
//     profitOnCost: `${profitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${profitOnRevenue.toFixed(2)}%`,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 2. Labor Revenue Row (Expandable) - now expands to PLCs
//   const laborProfit = totalLaborRevenue - totalBurdenedLaborCost;
//   const laborProfitOnCost = totalBurdenedLaborCost !== 0 ? (laborProfit / totalBurdenedLaborCost * 100) : 0;
//   const laborProfitOnRevenue = totalLaborRevenue !== 0 ? (laborProfit / totalLaborRevenue * 100) : 0;

//   rows.push({
//     id: 'labor-revenue',
//     description: 'Labor Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: totalLaborCostRaw,
//     cost: totalBurdenedLaborCost,
//     burdenedCost: totalBurdenedLaborCost,
//     revenue: totalLaborRevenue,
//     profit: laborProfit,
//     profitOnCost: `${laborProfitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${laborProfitOnRevenue.toFixed(2)}%`,
//     type: 'expandable',
//     plcDetails: Array.from(plcMap.values()),
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 3. Total Fringe Row (New) - using top-level apiResponse.totalFringe
//   rows.push({
//     id: 'total-fringe',
//     description: 'Total Fringe',
//     billRate: undefined, // Keep undefined for summary row
//     rawCost: apiResponse.totalFringe, // Directly use totalFringe from API response
//     cost: apiResponse.totalFringe, // Fringe is typically a cost
//     burdenedCost: apiResponse.totalFringe,
//     revenue: 0, // Fringe is not revenue
//     profit: undefined,
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 4. Total Overhead Row (aggregated from payrollSalary entries) - using top-level apiResponse.total1Overhead
//   rows.push({
//     id: 'total-overhead',
//     description: 'Total Overhead',
//     billRate: undefined, // Keep undefined for summary row
//     rawCost: apiResponse.totalOverhead, // Directly use total1Overhead from API response
//     cost: apiResponse.totalOverhead,
//     burdenedCost: apiResponse.totalOverhead,
//     revenue: 0,
//     profit: undefined, // Set profit to undefined as requested
//     profitOnCost: undefined, // Set profitOnCost to undefined as requested
//     profitOnRevenue: undefined, // Set profitOnRevenue to undefined as requested
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 5. General & Admin Row (aggregated from payrollSalary entries) - using top-level apiResponse.totalGna
//   rows.push({
//     id: 'general-admin',
//     description: 'General & Admin',
//     billRate: undefined, // Keep undefined for summary row
//     rawCost: apiResponse.totalGna, // Directly use totalGna from API response
//     cost: apiResponse.totalGna,
//     burdenedCost: apiResponse.totalGna,
//     revenue: 0,
//     profit: undefined, // Set profit to undefined as requested
//     profitOnCost: undefined, // Set profitOnCost to undefined as requested
//     profitOnRevenue: undefined, // Set profitOnRevenue to undefined as requested
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   console.log("Revenue Analysis: Final transformed rows (aggregated):", rows);
//   console.timeEnd('transformApiResponse'); // End timer for transformation
//   return rows;
// }


// const RevenueAnalysisPage = ({ onCancel, planId, templateId, type, projId, budVersion, status, periodOfPerformance }) => {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [expandedPlcRows, setExpandedPlcRows] = useState([]);
//   const [revenueData, setRevenueData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [atRiskAmount, setAtRiskAmount] = useState("$0.00 - Placeholder"); // State for At risk Amount
//   const [atRiskFundedAmount, setAtRiskFundedAmount] = useState("$0.00 - Placeholder"); // New state for At risk + Funded
//   const [fundedAmount, setFundedAmount] = useState("$0.00 - Placeholder"); // New state for Funded

//   // Use props for display values, or fallback to defaults
//   const currentProjIdDisplay = projId || "Aggregated";
//   const currentBudVersion = budVersion || "1";
//   const currentStatus = status || "Approved";
//   const currentPeriodOfPerformance = periodOfPerformance || "Aggregated Period";


//   const toggleRow = (id) => {
//     setExpandedRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const togglePlcRow = (id) => {
//     setExpandedPlcRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const expandAll = () => {
//     setExpandedRows(revenueData.filter(row => row.type === 'expandable').map(row => row.id));

//     const allPlcIds = [];
//     revenueData.forEach(row => {
//       if (row.id === 'labor-revenue' && row.plcDetails) {
//         row.plcDetails.forEach(plc => allPlcIds.push(`${row.id}-${plc.id}`)); // Corrected PLC ID for expansion
//       }
//     });
//     setExpandedPlcRows(allPlcIds);
//   };

//   const collapseAll = () => {
//     setExpandedRows([]);
//     setExpandedPlcRows([]);
//   };

//   // Modified formatValue to return empty string for undefined/null/empty string values
//   const formatValue = (value) => {
//     if (typeof value === 'number') {
//       const formatted = value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//       return formatted;
//     }
//     return value === undefined || value === null || value === '' ? '' : value; // Return empty string for blank display
//   };

//   // Glassmorphism classes for a lighter, more transparent effect
//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   useEffect(() => {
//     const fetchFinancialData = async () => {
//       setLoading(true);
//       setError(null);
//       // Ensure planId is provided before making the API call
//       if (!planId) {
//         setError("No planId provided to Revenue Analysis Page.");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.time('fetchData'); // Start timer for overall fetch operation
//         const params = new URLSearchParams({
//           planID: planId.toString(),
//           templateId: (templateId || 1).toString(), // Default to 1 if not provided
//           type: type || 'TARGET' // Default to 'TARGET' if not provided
//         });
//         const apiFetchUrl = `${INTERNAL_FINANCIAL_API_URL}?${params.toString()}`;
//         console.log(`Revenue Analysis: Fetching data from API (GET): ${apiFetchUrl}`);

//         const response = await fetch(apiFetchUrl, {
//           method: 'GET', // Reverted to GET
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("API Error Response (Raw Text):", errorText);
//           try {
//             const errorData = JSON.parse(errorText);
//             console.error("API Error Response (Parsed JSON):", errorData);
//             throw new Error(`HTTP error! status: ${response.status}. Details: ${JSON.stringify(errorData.errors || errorData)}`);
//           } catch (jsonError) {
//             throw new Error(`HTTP error! status: ${response.status}. Raw response: ${errorText}`);
//           }
//         }

//         const apiResponse = await response.json();
//         console.log("Revenue Analysis: Full API Raw Response:", apiResponse);
        
//         // Check for 'atRiskamt' in the API response and update state
//         if (apiResponse.atRiskAmt !== undefined && apiResponse.atRiskAmt !== null) {
//           setAtRiskAmount(formatValue(apiResponse.atRiskAmt));
//         } else {
//           setAtRiskAmount("$0.00 - Not Found"); // Indicate if not found
//         }

//         // Set Funded Amount
//         if (apiResponse.fundingValue !== undefined && apiResponse.fundingValue !== null) {
//           setFundedAmount(formatValue(apiResponse.fundingValue));
//         } else {
//           setFundedAmount("$0.00 - Not Found");
//         }

//         // Calculate and set At risk + Funded Amount
//         const atRisk = typeof apiResponse.atRiskAmt === 'number' ? apiResponse.atRiskAmt : 0;
//         const funded = typeof apiResponse.fundingValue === 'number' ? apiResponse.fundingValue : 0;
//         setAtRiskFundedAmount(formatValue(atRisk + funded));


//         const transformedData = transformApiResponseToRevenueAnalysisRows(apiResponse);
//         setRevenueData(transformedData);
//         console.timeEnd('fetchData'); // End timer for overall fetch operation

//       } catch (err) {
//         console.error("Failed to fetch financial data for Revenue Analysis:", err);
//         setError(`Failed to load financial data. ${err.message}. Please ensure the API is running and returning valid JSON.`);
//         setRevenueData([]);
//         console.timeEnd('fetchData'); // End timer even on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinancialData();
//   }, [planId, templateId, type]); // Dependencies now include props


//   if (loading) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading Revenue Analysis...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
//       {/* Header Section */}
//       <div className={`mb-6 p-6 ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here */}
//         <h1 className="text-xl font-semibold text-gray-900">Project Budgets / EACs {'>'} Revenue Analysis</h1>
//         <p className="text-sm text-gray-700 mt-2">
//           Project ID: {currentProjIdDisplay} Type: BUD Version: {currentBudVersion} Status: {currentStatus} Period of Performance: {currentPeriodOfPerformance}
//         </p>
//       </div>

//       {/* Control Buttons including Cancel and At Risk Amount */}
//       <div className="mb-4 flex gap-4 items-center">
//         <button
//           onClick={expandAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Expand All
//         </button>
//         <button
//           onClick={collapseAll}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
//         >
//           Collapse All
//         </button>
//         {/* START: New wrapper for the three amount boxes */}
//         <div className="flex-grow flex justify-center gap-4">
//           {/* At Risk Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">At risk Amount: </span>
//             <span className="text-red-600 font-bold">{atRiskAmount}</span>
//           </div>
//           {/* Funded Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">Funded: </span>
//             <span className="text-green-600 font-bold">{fundedAmount}</span>
//           </div>
//           {/* At risk + Funded Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">At risk + Funded: </span>
//             <span className="text-purple-600 font-bold">{atRiskFundedAmount}</span>
//           </div>
//         </div>
//         {/* END: New wrapper for the three amount boxes */}
//         {/* <button
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
//         >
//           Cancel
//         </button> */}
//       </div>

//       {/* Main table container */}
//       <div className={`overflow-x-auto ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here too */}
//         <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//           {/* Table Header */}
//           <thead>
//             <tr className="bg-gray-100 bg-opacity-50">
//               <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Bill Rate</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Burdened Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Revenue</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Revenue</th>
//             </tr>
//           </thead>
//           {/* Table Body */}
//           <tbody className="divide-y divide-gray-300 divide-opacity-10">
//             {revenueData.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="py-8 text-center text-gray-600 text-lg"> {/* colSpan adjusted to 8 (description + 7 metrics) */}
//                   {loading ? 'Loading data...' : 'No revenue analysis data available based on PlanID, Template, and Type parameters. Please check console for API response or data transformation issues.'}
//                 </td>
//               </tr>
//             ) : (
//               revenueData.map((row) => (
//                 <React.Fragment key={row.id}>
//                   {/* Main row */}
//                   <tr
//                     className={`
//                       group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
//                       ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
//                       ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
//                     `}
//                     onClick={() => row.type === 'expandable' && toggleRow(row.id)}
//                   >
//                     <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                       {row.type === 'expandable' && (
//                         <span className="mr-2">
//                           {expandedRows.includes(row.id) ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           )}
//                         </span>
//                       )}
//                       {row.description}
//                     </td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.billRate)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.rawCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.burdenedCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.revenue)}</td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${typeof row.profit === 'number' && row.profit < 0 ? 'text-red-600' : ''}`}>
//                       {formatValue(row.profit)}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnCost && parseFloat(row.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnCost}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnRevenue && parseFloat(row.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnRevenue}
//                     </td>
//                   </tr>

//                   {/* Nested details for Labor Revenue row (PLCs) */}
//                   {row.id === 'labor-revenue' && expandedRows.includes(row.id) && row.plcDetails && row.plcDetails.length > 0 && (
//                     <>
//                       {row.plcDetails.map((plc) => (
//                         <React.Fragment key={`${row.id}-${plc.id}`}>
//                           {/* Individual PLC Row (expandable) */}
//                           <tr
//                             className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                             onClick={() => togglePlcRow(`${row.id}-${plc.id}`)}
//                           >
//                             <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                               <span className="mr-2">
//                                 {expandedPlcRows.includes(`${row.id}-${plc.id}`) ? (
//                                   <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 ) : (
//                                   <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 )}
//                               </span>
//                               {plc.plcName}
//                             </td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.rawCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.burdenedCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Revenue (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Revenue (empty for PLC) */}
//                           </tr>

//                           {/* Nested Employee Details within PLC */}
//                           {expandedPlcRows.includes(`${row.id}-${plc.id}`) && plc.employees && plc.employees.length > 0 && (
//                             <>
//                               {plc.employees.map((employee) => (
//                                 <React.Fragment key={`${plc.id}-${employee.id}`}>
//                                   {/* Individual Employee Row (NOT expandable now) */}
//                                   <tr
//                                     className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs group" // Removed cursor-pointer and onClick
//                                   >
//                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                       {/* Removed Chevron icons as it's no longer expandable */}
//                                       {employee.name}
//                                     </td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td> {/* Display Bill Rate here */}
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.rawCost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.cost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.revenue)}</td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${typeof employee.profit === 'number' && employee.profit < 0 ? 'text-red-600' : ''}`}>
//                                       {formatValue(employee.profit)}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnCost && parseFloat(employee.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnCost}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnRevenue && parseFloat(employee.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnRevenue}
//                                     </td>
//                                   </tr>
//                                 </React.Fragment>
//                               ))}
//                             </>
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RevenueAnalysisPage;

//// At Risk Working - End

// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// const INTERNAL_FINANCIAL_API_URL = 'https://test-api-3tmq.onrender.com/Forecast/CalculateCost';

// /**
//  * Transforms the raw CalculateCostAPIResponse into the RevenueAnalysisRow structure.
//  * This function now aggregates all data into overall totals, without monthly breakdowns or hours.
//  * It also extracts actual monthly non-labor data from the API response for a separate breakdown view.
//  */
// function transformApiResponseToRevenueAnalysisRows(
//   apiResponse
// ) {
//   console.time('transformApiResponse'); // Start timer for transformation
//   const rows = [];
//   const monthlyNonLaborAggregates = new Map(); // Map to store aggregated fringe, overhead, gna per month

//   let totalRevenueOverall = 0;
//   let totalLaborCostRaw = 0; // Raw cost (base salary) for all labor
//   let totalBurdenedLaborCost = 0; // Total burdened cost for all labor
//   let totalLaborRevenue = 0; // Total labor revenue (sum of revenue + revenue from payrollSalary)

//   // Map to group employees by PLC
//   const plcMap = new Map();

//   console.log(`Revenue Analysis: Transforming data for all projects/orgs from API response.`);

//   if (!apiResponse.employeeForecastSummary || apiResponse.employeeForecastSummary.length === 0) {
//     console.warn(`Revenue Analysis: No employee data found in API response.`);
//   } else {
//     apiResponse.employeeForecastSummary.forEach(empSummary => {
//       const emplId = empSummary.emplId;
//       const plcCode = empSummary.plcCode || 'Unknown PLC';

//       // Get or create PLC entry
//       let plcDetail = plcMap.get(plcCode);
//       if (!plcDetail) {
//         plcDetail = {
//           id: `plc-${plcCode}`,
//           plcName: plcCode,
//           rawCost: 0, // Initialize rawCost for PLC
//           cost: 0, // Initialize burdenedCost for PLC
//           burdenedCost: 0, // Initialize burdenedCost for PLC
//           employees: [], // Initialize employees array within PLC
//         };
//         plcMap.set(plcCode, plcDetail);
//       }

//       // Get or create Employee entry within the current PLC
//       let employee = plcDetail.employees.find(e => e.id === emplId);
//       if (!employee) {
//         employee = {
//           id: emplId,
//           // Updated to show Name (EMPLID)
//           name: empSummary.name ? `${empSummary.name} (${empSummary.emplId})` : `${empSummary.emplId} (${empSummary.orgID})`,
//           rawCost: 0, // Initialize rawCost for employee
//           cost: 0, // Will be summed up later as total burdened cost for employee
//           accountId: empSummary.acctId || '',
//           orgId: empSummary.orgID || '',
//           glcPlc: empSummary.plcCode || '',
//           hrlyRate: empSummary.perHourRate || 0,
//           revenue: 0, // Initialize employee revenue
//           profit: 0, // Initialize employee profit
//           profitOnCost: '0.00%', // Initialize profitOnCost
//           profitOnRevenue: '0.00%', // Initialize profitOnRevenue
//         };
//         plcDetail.employees.push(employee); // Add employee to PLC's list
//       }

//       empSummary.emplSchedule?.payrollSalary.forEach(salaryEntry => {
//         // Aggregate overall totals for the main summary rows
//         totalLaborCostRaw += (salaryEntry.cost || 0);
//         totalBurdenedLaborCost += (salaryEntry.totalBurdenCost || 0);
//         totalLaborRevenue += (salaryEntry.revenue || 0);

//         // Aggregate for current PLC detail (overall totals)
//         plcDetail.rawCost += (salaryEntry.cost || 0);
//         plcDetail.cost += (salaryEntry.totalBurdenCost || 0);
//         plcDetail.burdenedCost += (salaryEntry.totalBurdenCost || 0);

//         // Aggregate employee's overall totals (no monthly breakdown)
//         employee.rawCost += (salaryEntry.cost || 0);
//         employee.cost += (salaryEntry.totalBurdenCost || 0);
//         employee.revenue += (salaryEntry.revenue || 0);

//         // Aggregate monthly non-labor costs
//         const monthKey = `${salaryEntry.year}-${String(salaryEntry.month).padStart(2, '0')}`;
//         if (!monthlyNonLaborAggregates.has(monthKey)) {
//           monthlyNonLaborAggregates.set(monthKey, { fringe: 0, overhead: 0, gna: 0 });
//         }
//         const currentMonthData = monthlyNonLaborAggregates.get(monthKey);
//         currentMonthData.fringe += (salaryEntry.fringe || 0);
//         currentMonthData.overhead += (salaryEntry.overhead || 0);
//         currentMonthData.gna += (salaryEntry.gna || 0);
//       });
//     });

//     // Calculate employee profit and profit percentages after all payroll entries are processed
//     plcMap.forEach(plc => {
//       plc.employees?.forEach(employee => {
//         employee.profit = employee.revenue - employee.cost; // employee.cost is burdened cost
//         employee.profitOnCost = employee.cost !== 0 ? `${((employee.profit / employee.cost) * 100).toFixed(2)}%` : '0.00%';
//         employee.profitOnRevenue = employee.revenue !== 0 ? `${((employee.profit / employee.revenue) * 100).toFixed(2)}%` : '0.00%';
//       });
//     });
//   }

//   // Convert monthlyNonLaborAggregates map to a sorted array
//   const nonLaborMonthlyData = Array.from(monthlyNonLaborAggregates.entries())
//     .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort by YYYY-MM
//     .map(([monthKey, data]) => {
//       const [year, month] = monthKey.split('-').map(Number);
//       const date = new Date(year, month - 1);
//       const monthLabel = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().slice(-2);
//       return {
//         monthLabel,
//         fringe: data.fringe,
//         overhead: data.overhead,
//         gna: data.gna,
//         total: data.fringe + data.overhead + data.gna,
//       };
//     });

//   const totalFringeCost = apiResponse.totalFringe || 0;
//   const totalOverheadCost = apiResponse.totalOverhead || 0;
//   const totalGnaCost = apiResponse.totalGna || 0;

//   const totalNonLaborCost = totalFringeCost + totalOverheadCost + totalGnaCost;

//   const totalExpense = totalBurdenedLaborCost + totalNonLaborCost; // Include non-labor costs in total expense
//   // Use apiResponse.totalRevenue for totalRevenueOverall if it's the source of truth
//   const finalTotalRevenueOverall = apiResponse.totalRevenue || totalLaborRevenue; // Use API total revenue if available, else calculated labor revenue
//   const totalProfit = finalTotalRevenueOverall - totalExpense;
//   const profitOnCost = totalExpense !== 0 ? (totalProfit / totalExpense) * 100 : 0;
//   const profitOnRevenue = finalTotalRevenueOverall !== 0 ? (totalProfit / finalTotalRevenueOverall) * 100 : 0;

//   // --- Construct Rows ---

//   // 1. Total Revenue Row
//   rows.push({
//     id: 'total-revenue',
//     description: 'Total Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: undefined,
//     cost: totalExpense, // Total expense (burdened) for context
//     burdenedCost: totalExpense,
//     revenue: finalTotalRevenueOverall,
//     profit: totalProfit,
//     profitOnCost: `${profitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${profitOnRevenue.toFixed(2)}%`,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 2. Labor Revenue Row (Expandable) - now expands to PLCs
//   const laborProfit = totalLaborRevenue - totalBurdenedLaborCost;
//   const laborProfitOnCost = totalBurdenedLaborCost !== 0 ? (laborProfit / totalBurdenedLaborCost * 100) : 0;
//   const laborProfitOnRevenue = totalLaborRevenue !== 0 ? (laborProfit / totalLaborRevenue * 100) : 0;

//   rows.push({
//     id: 'labor-revenue',
//     description: 'Labor Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: totalLaborCostRaw,
//     cost: totalBurdenedLaborCost,
//     burdenedCost: totalBurdenedLaborCost,
//     revenue: totalLaborRevenue,
//     profit: laborProfit,
//     profitOnCost: `${laborProfitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${laborProfitOnRevenue.toFixed(2)}%`,
//     type: 'expandable',
//     plcDetails: Array.from(plcMap.values()),
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // New: Non-Labor Details (View Monthly) row - triggers modal
//   // This row displays the total non-labor cost but opens a modal for monthly breakdown.
//   rows.push({
//     id: 'non-labor-view-monthly',
//     description: 'Non-Labor Details (View Monthly)',
//     billRate: undefined,
//     rawCost: totalNonLaborCost, // Display total non-labor cost in this row
//     cost: totalNonLaborCost,
//     burdenedCost: totalNonLaborCost,
//     revenue: 0,
//     profit: -totalNonLaborCost,
//     profitOnCost: totalNonLaborCost !== 0 ? `${((-totalNonLaborCost / totalNonLaborCost) * 100).toFixed(2)}%` : '0.00%',
//     profitOnRevenue: '0.00%',
//     type: 'action-button', // Custom type to handle click action
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // Existing Total Fringe, Total Overhead, General & Admin as separate summary rows
//   rows.push({
//     id: 'total-fringe',
//     description: 'Total Fringe',
//     billRate: undefined,
//     rawCost: totalFringeCost,
//     cost: totalFringeCost,
//     burdenedCost: totalFringeCost,
//     revenue: 0,
//     profit: undefined, // As per previous request, profit/percentages are undefined for these
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   rows.push({
//     id: 'total-overhead',
//     description: 'Total Overhead',
//     billRate: undefined,
//     rawCost: totalOverheadCost,
//     cost: totalOverheadCost,
//     burdenedCost: totalOverheadCost,
//     revenue: 0,
//     profit: undefined,
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   rows.push({
//     id: 'general-admin',
//     description: 'General & Admin',
//     billRate: undefined,
//     rawCost: totalGnaCost,
//     cost: totalGnaCost,
//     burdenedCost: totalGnaCost,
//     revenue: 0,
//     profit: undefined,
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   console.log("Revenue Analysis: Final transformed rows (aggregated):", rows);
//   console.timeEnd('transformApiResponse');
//   return { rows, nonLaborMonthlyData }; // Return monthly data
// }


// const RevenueAnalysisPage = ({ onCancel, planId, templateId, type, projId, budVersion, status, periodOfPerformance }) => {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [expandedPlcRows, setExpandedPlcRows] = useState([]);
//   const [revenueData, setRevenueData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [atRiskAmount, setAtRiskAmount] = useState("$0.00 - Placeholder"); // State for At risk Amount
//   const [atRiskFundedAmount, setAtRiskFundedAmount] = useState("$0.00 - Placeholder"); // New state for At risk + Funded
//   const [fundedAmount, setFundedAmount] = useState("$0.00 - Placeholder"); // New state for Funded
//   const [nonLaborMonthlyData, setNonLaborMonthlyData] = useState([]); // State for monthly non-labor breakdown
//   const [showNonLaborModal, setShowNonLaborModal] = useState(false); // State to control modal visibility


//   // Use props for display values, or fallback to defaults
//   const currentProjIdDisplay = projId || "Aggregated";
//   const currentBudVersion = budVersion || "1";
//   const currentStatus = status || "Approved";
//   const currentPeriodOfPerformance = periodOfPerformance || "Aggregated Period";


//   const toggleRow = (id) => {
//     setExpandedRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   // This function is now only used for PLC children expansion
//   const toggleChildRow = (parentId, childId) => {
//     const fullId = `${parentId}-${childId}`;
//     setExpandedPlcRows(prev =>
//       prev.includes(fullId) ? prev.filter(rowId => rowId !== fullId) : [...prev, fullId]
//     );
//   };

//   const expandAll = () => {
//     // Expand Labor Revenue row
//     setExpandedRows(revenueData.filter(row => row.id === 'labor-revenue').map(row => row.id));

//     const allPlcIds = [];
//     revenueData.forEach(row => {
//       if (row.id === 'labor-revenue' && row.plcDetails) {
//         row.plcDetails.forEach(plc => allPlcIds.push(`${row.id}-${plc.id}`));
//       }
//     });
//     setExpandedPlcRows(allPlcIds); // Using expandedPlcRows for PLC expansions
//   };

//   const collapseAll = () => {
//     setExpandedRows([]);
//     setExpandedPlcRows([]);
//   };

//   // Modified formatValue to return empty string for undefined/null/empty string values
//   const formatValue = (value) => {
//     if (typeof value === 'number') {
//       const formatted = value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//       return formatted;
//     }
//     return value === undefined || value === null || value === '' ? '' : value; // Return empty string for blank display
//   };

//   // Glassmorphism classes for a lighter, more transparent effect
//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   useEffect(() => {
//     const fetchFinancialData = async () => {
//       setLoading(true);
//       setError(null);
//       // Ensure planId is provided before making the API call
//       if (!planId) {
//         setError("No planId provided to Revenue Analysis Page.");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.time('fetchData'); // Start timer for overall fetch operation
//         const params = new URLSearchParams({
//           planID: planId.toString(),
//           templateId: (templateId || 1).toString(), // Default to 1 if not provided
//           type: type || 'TARGET' // Default to 'TARGET' if not provided
//         });
//         const apiFetchUrl = `${INTERNAL_FINANCIAL_API_URL}?${params.toString()}`;
//         console.log(`Revenue Analysis: Fetching data from API (GET): ${apiFetchUrl}`);

//         const response = await fetch(apiFetchUrl, {
//           method: 'GET', // Reverted to GET
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("API Error Response (Raw Text):", errorText);
//           try {
//             const errorData = JSON.parse(errorText);
//             console.error("API Error Response (Parsed JSON):", errorData);
//             throw new Error(`HTTP error! status: ${response.status}. Details: ${JSON.stringify(errorData.errors || errorData)}`);
//           } catch (jsonError) {
//             throw new Error(`HTTP error! status: ${response.status}. Raw response: ${errorText}`);
//           }
//         }

//         const apiResponse = await response.json();
//         console.log("Revenue Analysis: Full API Raw Response:", apiResponse);
        
//         // Check for 'atRiskamt' in the API response and update state
//         if (apiResponse.atRiskAmt !== undefined && apiResponse.atRiskAmt !== null) {
//           setAtRiskAmount(formatValue(apiResponse.atRiskAmt));
//         } else {
//           setAtRiskAmount("$0.00 - Not Found"); // Indicate if not found
//         }

//         // Set Funded Amount
//         if (apiResponse.fundingValue !== undefined && apiResponse.fundingValue !== null) {
//           setFundedAmount(formatValue(apiResponse.fundingValue));
//         } else {
//           setFundedAmount("$0.00 - Not Found");
//         }

//         // Calculate and set At risk + Funded Amount
//         const atRisk = typeof apiResponse.atRiskAmt === 'number' ? apiResponse.atRiskAmt : 0;
//         const funded = typeof apiResponse.fundingValue === 'number' ? apiResponse.fundingValue : 0;
//         setAtRiskFundedAmount(formatValue(atRisk + funded));

//         // Call transformApiResponseToRevenueAnalysisRows without startDate and endDate
//         const { rows, nonLaborMonthlyData } = transformApiResponseToRevenueAnalysisRows(apiResponse);
//         setRevenueData(rows);
//         setNonLaborMonthlyData(nonLaborMonthlyData); // Set the monthly non-labor data
//         console.timeEnd('fetchData'); // End timer for overall fetch operation

//       } catch (err) {
//         console.error("Failed to fetch financial data for Revenue Analysis:", err);
//         setError(`Failed to load financial data. ${err.message}. Please ensure the API is running and returning valid JSON.`);
//         setRevenueData([]);
//         setNonLaborMonthlyData([]);
//         console.timeEnd('fetchData'); // End timer even on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinancialData();
//   }, [planId, templateId, type]); // Dependencies no longer include startDate and endDate


//   if (loading) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading Revenue Analysis...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
//       {/* Header Section */}
//       <div className={`mb-6 p-6 ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here */}
//         <h1 className="text-xl font-semibold text-gray-900">Project Budgets / EACs {'>'} Revenue Analysis</h1>
//         <p className="text-sm text-gray-700 mt-2">
//           Project ID: {currentProjIdDisplay} Type: BUD Version: {currentBudVersion} Status: {currentStatus} Period of Performance: {currentPeriodOfPerformance}
//         </p>
//       </div>

//       {/* Control Buttons including Cancel and At Risk Amount */}
//       <div className="mb-4 flex gap-4 items-center">
//         <button
//           onClick={expandAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Expand All
//         </button>
//         <button
//           onClick={collapseAll}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
//         >
//           Collapse All
//         </button>
//         {/* START: New wrapper for the three amount boxes */}
//         <div className="flex-grow flex justify-center gap-4">
//           {/* At Risk Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">At risk Amount: </span>
//             <span className="text-red-600 font-bold">{atRiskAmount}</span>
//           </div>
//           {/* Funded Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">Funded: </span>
//             <span className="text-green-600 font-bold">{fundedAmount}</span>
//           </div>
//           {/* At risk + Funded Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">At risk + Funded: </span>
//             <span className="text-purple-600 font-bold">{atRiskFundedAmount}</span>
//           </div>
//         </div>
//         {/* END: New wrapper for the three amount boxes */}
//       </div>

//       {/* Main table container */}
//       <div className={`overflow-x-auto ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here too */}
//         <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//           {/* Table Header */}
//           <thead>
//             <tr className="bg-gray-100 bg-opacity-50">
//               <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Bill Rate</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Burdened Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Revenue</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Revenue</th>
//             </tr>
//           </thead>
//           {/* Table Body */}
//           <tbody className="divide-y divide-gray-300 divide-opacity-10">
//             {revenueData.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="py-8 text-center text-gray-600 text-lg"> {/* colSpan adjusted to 8 (description + 7 metrics) */}
//                   {loading ? 'Loading data...' : 'No revenue analysis data available based on PlanID, Template, and Type parameters. Please check console for API response or data transformation issues.'}
//                 </td>
//               </tr>
//             ) : (
//               revenueData.map((row) => (
//                 <React.Fragment key={row.id}>
//                   {/* Main row */}
//                   <tr
//                     className={`
//                       group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
//                       ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
//                       ${row.type === 'expandable' || row.type === 'action-button' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
//                     `}
//                     onClick={() => {
//                         if (row.type === 'expandable') toggleRow(row.id);
//                         if (row.id === 'non-labor-view-monthly') setShowNonLaborModal(true);
//                     }}
//                   >
//                     <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                       {(row.type === 'expandable' && row.id !== 'non-labor-view-monthly') && ( // Only show chevron for actual expandable rows
//                         <span className="mr-2">
//                           {expandedRows.includes(row.id) ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           )}
//                         </span>
//                       )}
//                       {row.description}
//                       {row.id === 'non-labor-view-monthly' && (
//                         <span className="ml-2">
//                           <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                         </span>
//                       )}
//                     </td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.billRate)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.rawCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.burdenedCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.revenue)}</td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${typeof row.profit === 'number' && row.profit < 0 ? 'text-red-600' : ''}`}>
//                       {formatValue(row.profit)}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnCost && parseFloat(row.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnCost}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnRevenue && parseFloat(row.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnRevenue}
//                     </td>
//                   </tr>

//                   {/* Nested details for Labor Revenue row (PLCs) */}
//                   {row.id === 'labor-revenue' && expandedRows.includes(row.id) && row.plcDetails && row.plcDetails.length > 0 && (
//                     <>
//                       {row.plcDetails.map((plc) => (
//                         <React.Fragment key={`${row.id}-${plc.id}`}>
//                           {/* Individual PLC Row (expandable) */}
//                           <tr
//                             className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                             onClick={() => toggleChildRow(row.id, plc.id)} // Use toggleChildRow
//                           >
//                             <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                               <span className="mr-2">
//                                 {expandedPlcRows.includes(`${row.id}-${plc.id}`) ? (
//                                   <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 ) : (
//                                   <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 )}
//                               </span>
//                               {plc.plcName}
//                             </td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.rawCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.burdenedCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Revenue (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Revenue (empty for PLC) */}
//                           </tr>

//                           {/* Nested Employee Details within PLC */}
//                           {expandedPlcRows.includes(`${row.id}-${plc.id}`) && plc.employees && plc.employees.length > 0 && (
//                             <>
//                               {plc.employees.map((employee) => (
//                                 <React.Fragment key={`${plc.id}-${employee.id}`}>
//                                   {/* Individual Employee Row (NOT expandable now) */}
//                                   <tr
//                                     className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs group" // Removed cursor-pointer and onClick
//                                   >
//                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                       {/* Removed Chevron icons as it's no longer expandable */}
//                                       {employee.name}
//                                     </td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td> {/* Display Bill Rate here */}
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.rawCost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.cost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.revenue)}</td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${typeof employee.profit === 'number' && employee.profit < 0 ? 'text-red-600' : ''}`}>
//                                       {formatValue(employee.profit)}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnCost && parseFloat(employee.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnCost}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnRevenue && parseFloat(employee.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnRevenue}
//                                     </td>
//                                   </tr>
//                                 </React.Fragment>
//                               ))}
//                             </>
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Non-Labor Monthly Breakdown Modal */}
//       {showNonLaborModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className={`p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${getGlassmorphismClasses()}`}>
//             <h3 className="text-xl font-semibold mb-4 text-gray-900">Non-Labor Monthly Breakdown</h3>
//             {nonLaborMonthlyData.length === 0 ? (
//               <p className="text-gray-700">No monthly non-labor data available for the specified period.</p>
//             ) : (
//               <table className="min-w-full divide-y divide-gray-300 divide-opacity-30 mb-4">
//                 <thead>
//                   <tr className="bg-gray-100 bg-opacity-50">
//                     <th className="py-2 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Month</th>
//                     <th className="py-2 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Fringe</th>
//                     <th className="py-2 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Overhead</th>
//                     <th className="py-2 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">G&A</th>
//                     <th className="py-2 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total Non-Labor</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-300 divide-opacity-10">
//                   {nonLaborMonthlyData.map((data, index) => (
//                     <tr key={index} className="hover:bg-gray-100 hover:bg-opacity-50">
//                       <td className="py-2 px-4 whitespace-nowrap text-gray-800">{data.monthLabel}</td>
//                       <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(data.fringe)}</td>
//                       <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(data.overhead)}</td>
//                       <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(data.gna)}</td>
//                       <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(data.total)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
            
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setShowNonLaborModal(false)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RevenueAnalysisPage;

// Pop-up modal component for non-labor monthly breakdown

// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// const INTERNAL_FINANCIAL_API_URL = 'https://test-api-3tmq.onrender.com/Forecast/CalculateCost';

// /**
//  * Transforms the raw CalculateCostAPIResponse into the RevenueAnalysisRow structure.
//  * This function now aggregates all data into overall totals, without monthly breakdowns or hours.
//  * It also extracts individual non-labor data entries from the API response for a detailed breakdown view,
//  * including them regardless of dctId presence, but skipping entries where Fringe, Overhead, and G&A are all zero.
//  */
// function transformApiResponseToRevenueAnalysisRows(
//   apiResponse
// ) {
//   console.time('transformApiResponse'); // Start timer for transformation
//   const rows = [];
//   const allNonLaborIndividualEntries = []; // To store each individual payrollSalary and directCostSchedule entry's non-labor data

//   let totalRevenueOverall = 0;
//   let totalLaborCostRaw = 0; // Raw cost (base salary) for all labor
//   let totalBurdenedLaborCost = 0; // Total burdened cost for all labor
//   let totalLaborRevenue = 0; // Total labor revenue (sum of revenue + revenue from payrollSalary)

//   // Map to group employees by PLC
//   const plcMap = new Map();

//   console.log(`Revenue Analysis: Transforming data for all projects/orgs from API response.`);

//   // Process employeeForecastSummary for labor and payroll-related non-labor costs
//   if (!apiResponse.employeeForecastSummary || apiResponse.employeeForecastSummary.length === 0) {
//     console.warn(`Revenue Analysis: No employee data found in employeeForecastSummary.`);
//   } else {
//     apiResponse.employeeForecastSummary.forEach(empSummary => {
//       const emplId = empSummary.emplId;
//       const plcCode = empSummary.plcCode || 'Unknown PLC';

//       // Get or create PLC entry
//       let plcDetail = plcMap.get(plcCode);
//       if (!plcDetail) {
//         plcDetail = {
//           id: `plc-${plcCode}`,
//           plcName: plcCode,
//           rawCost: 0, // Initialize rawCost for PLC
//           cost: 0, // Initialize burdenedCost for PLC
//           burdenedCost: 0, // Initialize burdenedCost for PLC
//           employees: [], // Initialize employees array within PLC
//         };
//         plcMap.set(plcCode, plcDetail);
//       }

//       // Get or create Employee entry within the current PLC
//       let employee = plcDetail.employees.find(e => e.id === emplId);
//       if (!employee) {
//         employee = {
//           id: emplId,
//           // Updated to show Name (EMPLID)
//           name: empSummary.name ? `${empSummary.name} (${empSummary.emplId})` : `${empSummary.emplId} (${empSummary.orgID})`,
//           rawCost: 0, // Initialize rawCost for employee
//           cost: 0, // Will be summed up later as total burdened cost for employee
//           accountId: empSummary.acctId || '', // Ensure acctId is captured here
//           orgId: empSummary.orgID || '',
//           glcPlc: empSummary.plcCode || '',
//           hrlyRate: empSummary.perHourRate || 0,
//           revenue: 0, // Initialize employee revenue
//           profit: 0, // Initialize employee profit
//           profitOnCost: '0.00%', // Initialize profitOnCost
//           profitOnRevenue: '0.00%', // Initialize profitOnRevenue
//         };
//         plcDetail.employees.push(employee); // Add employee to PLC's list
//       }

//       empSummary.emplSchedule?.payrollSalary.forEach(salaryEntry => {
//         // Aggregate overall totals for the main summary rows
//         totalLaborCostRaw += (salaryEntry.cost || 0);
//         totalBurdenedLaborCost += (salaryEntry.totalBurdenCost || 0);
//         totalLaborRevenue += (salaryEntry.revenue || 0);

//         // Aggregate for current PLC detail (overall totals)
//         plcDetail.rawCost += (salaryEntry.cost || 0);
//         plcDetail.cost += (salaryEntry.totalBurdenCost || 0);
//         plcDetail.burdenedCost += (salaryEntry.totalBurdenCost || 0);

//         // Aggregate employee's overall totals (no monthly breakdown)
//         employee.rawCost += (salaryEntry.cost || 0);
//         employee.cost += (salaryEntry.totalBurdenCost || 0);
//         employee.revenue += (salaryEntry.revenue || 0);

//         // Collect individual non-labor costs ONLY if at least one of Fringe, Overhead, or G&A is not zero AND dctId is present
//         const fringe = salaryEntry.fringe || 0;
//         const overhead = salaryEntry.overhead || 0;
//         const gna = salaryEntry.gna || 0;

//         if ((fringe !== 0 || overhead !== 0 || gna !== 0) && salaryEntry.dctId !== null && salaryEntry.dctId !== undefined) {
//           const date = new Date(salaryEntry.year, salaryEntry.month - 1);
//           const monthLabel = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().slice(-2);
//           allNonLaborIndividualEntries.push({
//             id: `nonlabor-payroll-${salaryEntry.year}-${salaryEntry.month}-${empSummary.emplId}-${Date.now() + Math.random()}`, // Unique ID for each entry
//             monthLabel: monthLabel,
//             fringe: fringe,
//             overhead: overhead,
//             gna: gna,
//             cost: 0, // Payroll salary entries typically don't have a 'cost' field for non-labor direct costs
//             materials: 0, // Payroll salary entries typically don't have a 'materials' field
//             total: fringe + overhead + gna,
//             emplId: empSummary.emplId, // Employee ID from the employee summary
//             orgId: empSummary.orgID,
//             projId: salaryEntry.projId,
//             dctId: salaryEntry.dctId, // Include dctId for display if needed
//             acctId: salaryEntry.acctId, // Account ID from the salary entry
//             type: 'payroll-non-labor' // Differentiate type
//           });
//         }
//       });
//     });

//     // Calculate employee profit and profit percentages after all payroll entries are processed
//     plcMap.forEach(plc => {
//       plc.employees?.forEach(employee => {
//         employee.profit = employee.revenue - employee.cost; // employee.cost is burdened cost
//         employee.profitOnCost = employee.cost !== 0 ? `${((employee.profit / employee.cost) * 100).toFixed(2)}%` : '0.00%';
//         employee.profitOnRevenue = employee.revenue !== 0 ? `${((employee.profit / employee.revenue) * 100).toFixed(2)}%` : '0.00%';
//       });
//     });
//   }

//   // Process directCOstForecastSummary for other direct costs
//   if (apiResponse.directCOstForecastSummary && apiResponse.directCOstForecastSummary.length > 0) {
//     apiResponse.directCOstForecastSummary.forEach(directCostSummary => {
//       directCostSummary.directCostSchedule?.forecasts.forEach(forecast => {
//         const fringe = forecast.fringe || 0;
//         const overhead = forecast.overhead || 0;
//         const gna = forecast.gna || 0;
//         const cost = forecast.cost || 0; // This is the direct cost amount
//         const materials = forecast.materials || 0;

//         // Include all direct cost entries from this section if any value is non-zero AND dctId is present
//         if ((fringe !== 0 || overhead !== 0 || gna !== 0 || cost !== 0 || materials !== 0) && forecast.dctId !== null && forecast.dctId !== undefined) {
//           const date = new Date(forecast.year, forecast.month - 1);
//           const monthLabel = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().slice(-2);
//           allNonLaborIndividualEntries.push({
//             id: `nonlabor-directcost-${forecast.year}-${forecast.month}-${directCostSummary.emplId}-${forecast.dctId}-${Date.now() + Math.random()}`, // Unique ID
//             monthLabel: monthLabel,
//             fringe: fringe,
//             overhead: overhead,
//             gna: gna,
//             cost: cost, // Direct cost amount
//             materials: materials,
//             total: fringe + overhead + gna + cost + materials, // Sum all relevant direct cost components
//             emplId: directCostSummary.emplId, // Employee ID from the direct cost summary
//             orgId: directCostSummary.orgID,
//             projId: forecast.projId,
//             dctId: forecast.dctId,
//             acctId: forecast.acctId, // Account ID from the individual forecast
//             type: 'direct-cost' // Differentiate type
//           });
//         }
//       });
//     });
//   }


//   const totalFringeCost = apiResponse.totalFringe || 0;
//   const totalOverheadCost = apiResponse.totalOverhead || 0;
//   const totalGnaCost = apiResponse.totalGna || 0;

//   // The totalNonLaborCost should be the sum of all non-labor components reported by the API.
//   // Assuming totalFringe, totalOverhead, totalGna already aggregate correctly across all sources.
//   const totalNonLaborCost = totalFringeCost + totalOverheadCost + totalGnaCost;

//   const totalExpense = totalBurdenedLaborCost + totalNonLaborCost; // Include non-labor costs in total expense
//   // Use apiResponse.totalRevenue for totalRevenueOverall if it's the source of truth
//   const finalTotalRevenueOverall = apiResponse.totalRevenue || totalLaborRevenue; // Use API total revenue if available, else calculated labor revenue
//   const totalProfit = finalTotalRevenueOverall - totalExpense;
//   const profitOnCost = totalExpense !== 0 ? (totalProfit / totalExpense) * 100 : 0;
//   const profitOnRevenue = finalTotalRevenueOverall !== 0 ? (totalProfit / finalTotalRevenueOverall) * 100 : 0;

//   // --- Construct Rows ---

//   // 1. Total Revenue Row
//   rows.push({
//     id: 'total-revenue',
//     description: 'Total Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: undefined,
//     cost: totalExpense, // Total expense (burdened) for context
//     burdenedCost: totalExpense,
//     revenue: finalTotalRevenueOverall,
//     profit: totalProfit,
//     profitOnCost: `${profitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${profitOnRevenue.toFixed(2)}%`,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // 2. Labor Revenue Row (Expandable) - now expands to PLCs
//   const laborProfit = totalLaborRevenue - totalBurdenedLaborCost;
//   const laborProfitOnCost = totalBurdenedLaborCost !== 0 ? (laborProfit / totalBurdenedLaborCost * 100) : 0;
//   const laborProfitOnRevenue = totalLaborRevenue !== 0 ? (laborProfit / totalLaborRevenue * 100) : 0;

//   rows.push({
//     id: 'labor-revenue',
//     description: 'Labor Revenue',
//     billRate: undefined, // Keep undefined for main summary row
//     rawCost: totalLaborCostRaw,
//     cost: totalBurdenedLaborCost,
//     burdenedCost: totalBurdenedLaborCost,
//     revenue: totalLaborRevenue,
//     profit: laborProfit,
//     profitOnCost: `${laborProfitOnCost.toFixed(2)}%`,
//     profitOnRevenue: `${laborProfitOnRevenue.toFixed(2)}%`,
//     type: 'expandable',
//     plcDetails: Array.from(plcMap.values()),
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // New: Non-Labor Details (Expandable) row - shows individual entries directly
//   // This row's total reflects the overall non-labor costs from the API,
//   // and its expanded details now include only non-zero entries.
//   rows.push({
//     id: 'non-labor-details', // Renamed ID for clarity
//     description: 'Non-Labor Details',
//     billRate: undefined,
//     rawCost: totalNonLaborCost, // Display total non-labor cost in this row
//     cost: totalNonLaborCost,
//     burdenedCost: totalNonLaborCost,
//     revenue: 0,
//     profit: -totalNonLaborCost,
//     profitOnCost: totalNonLaborCost !== 0 ? `${((-totalNonLaborCost / totalNonLaborCost) * 100).toFixed(2)}%` : '0.00%',
//     profitOnRevenue: '0.00%',
//     type: 'expandable', // Now an expandable row
//     nonLaborEntries: allNonLaborIndividualEntries, // Pass filtered individual entries here
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   // Existing Total Fringe, Total Overhead, General & Admin as separate summary rows
//   rows.push({
//     id: 'total-fringe',
//     description: 'Total Fringe',
//     billRate: undefined,
//     rawCost: totalFringeCost,
//     cost: totalFringeCost,
//     burdenedCost: totalFringeCost,
//     revenue: 0,
//     profit: undefined, // As per previous request, profit/percentages are undefined for these
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   rows.push({
//     id: 'total-overhead',
//     description: 'Total Overhead',
//     billRate: undefined,
//     rawCost: totalOverheadCost,
//     cost: totalOverheadCost,
//     burdenedCost: totalOverheadCost,
//     revenue: 0,
//     profit: undefined,
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   rows.push({
//     id: 'general-admin',
//     description: 'General & Admin',
//     billRate: undefined,
//     rawCost: totalGnaCost,
//     cost: totalGnaCost,
//     burdenedCost: totalGnaCost,
//     revenue: 0,
//     profit: undefined,
//     profitOnCost: undefined,
//     profitOnRevenue: undefined,
//     type: 'summary',
//     projId: 'Aggregated',
//     orgId: 'Aggregated',
//   });

//   console.log("Revenue Analysis: Final transformed rows (aggregated):", rows);
//   console.timeEnd('transformApiResponse');
//   return { rows }; // Only return rows
// }


// const RevenueAnalysisPage = ({ onCancel, planId, templateId, type, projId, budVersion, status, periodOfPerformance }) => {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [expandedPlcRows, setExpandedPlcRows] = useState([]);
//   const [revenueData, setRevenueData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [atRiskAmount, setAtRiskAmount] = useState("$0.00 - Placeholder"); // State for At risk Amount
//   const [atRiskFundedAmount, setAtRiskFundedAmount] = useState("$0.00 - Placeholder"); // New state for At risk + Funded
//   const [fundedAmount, setFundedAmount] = useState("$0.00 - Placeholder"); // New state for Funded


//   // Use props for display values, or fallback to defaults
//   const currentProjIdDisplay = projId || "Aggregated";
//   const currentBudVersion = budVersion || "1";
//   const currentStatus = status || "Approved";
//   const currentPeriodOfPerformance = periodOfPerformance || "Aggregated Period";


//   const toggleRow = (id) => {
//     setExpandedRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   // This function is now only used for PLC children expansion
//   const toggleChildRow = (parentId, childId) => {
//     const fullId = `${parentId}-${childId}`;
//     setExpandedPlcRows(prev =>
//       prev.includes(fullId) ? prev.filter(rowId => rowId !== fullId) : [...prev, fullId]
//     );
//   };

//   const expandAll = () => {
//     // Expand Labor Revenue row and Non-Labor Details row
//     setExpandedRows(revenueData.filter(row => row.id === 'labor-revenue' || row.id === 'non-labor-details').map(row => row.id));

//     const allPlcIds = [];
//     revenueData.forEach(row => {
//       if (row.id === 'labor-revenue' && row.plcDetails) {
//         row.plcDetails.forEach(plc => allPlcIds.push(`${row.id}-${plc.id}`));
//       }
//     });
//     setExpandedPlcRows(allPlcIds); // Using expandedPlcRows for PLC expansions
//   };

//   const collapseAll = () => {
//     setExpandedRows([]);
//     setExpandedPlcRows([]);
//   };

//   // Modified formatValue to return empty string for undefined/null/empty string values
//   const formatValue = (value) => {
//     if (typeof value === 'number') {
//       const formatted = value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//       return formatted;
//     }
//     return value === undefined || value === null || value === '' ? '' : value; // Return empty string for blank display
//   };

//   // Glassmorphism classes for a lighter, more transparent effect
//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   useEffect(() => {
//     const fetchFinancialData = async () => {
//       setLoading(true);
//       setError(null);
//       // Ensure planId is provided before making the API call
//       if (!planId) {
//         setError("No planId provided to Revenue Analysis Page.");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.time('fetchData'); // Start timer for overall fetch operation
//         const params = new URLSearchParams({
//           planID: planId.toString(),
//           templateId: (templateId || 1).toString(), // Default to 1 if not provided
//           type: type || 'TARGET', // Default to 'TARGET' if not provided
//         });
//         const apiFetchUrl = `${INTERNAL_FINANCIAL_API_URL}?${params.toString()}`;
//         console.log(`Revenue Analysis: Fetching data from API (GET): ${apiFetchUrl}`);

//         const response = await fetch(apiFetchUrl, {
//           method: 'GET', // Reverted to GET
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("API Error Response (Raw Text):", errorText);
//           try {
//             const errorData = JSON.parse(errorText);
//             console.error("API Error Response (Parsed JSON):", errorData);
//             throw new Error(`HTTP error! status: ${response.status}. Details: ${JSON.stringify(errorData.errors || errorData)}`);
//           } catch (jsonError) {
//             throw new Error(`HTTP error! status: ${response.status}. Raw response: ${errorText}`);
//           }
//         }

//         const apiResponse = await response.json();
//         console.log("Revenue Analysis: Full API Raw Response:", apiResponse);
        
//         // Check for 'atRiskamt' in the API response and update state
//         if (apiResponse.atRiskAmt !== undefined && apiResponse.atRiskAmt !== null) {
//           setAtRiskAmount(formatValue(apiResponse.atRiskAmt));
//         } else {
//           setAtRiskAmount("$0.00 - Not Found"); // Indicate if not found
//         }

//         // Set Funded Amount
//         if (apiResponse.fundingValue !== undefined && apiResponse.fundingValue !== null) {
//           setFundedAmount(formatValue(apiResponse.fundingValue));
//         } else {
//           setFundedAmount("$0.00 - Not Found");
//         }

//         // Calculate and set At risk + Funded Amount
//         const atRisk = typeof apiResponse.atRiskAmt === 'number' ? apiResponse.atRiskAmt : 0;
//         const funded = typeof apiResponse.fundingValue === 'number' ? apiResponse.fundingValue : 0;
//         setAtRiskFundedAmount(formatValue(atRisk + funded));

//         // Call transformApiResponseToRevenueAnalysisRows
//         const { rows } = transformApiResponseToRevenueAnalysisRows(apiResponse);
//         setRevenueData(rows);
//         console.timeEnd('fetchData'); // End timer for overall fetch operation

//       } catch (err) {
//         console.error("Failed to fetch financial data for Revenue Analysis:", err);
//         setError(`Failed to load financial data. ${err.message}. Please ensure the API is running and returning valid JSON.`);
//         setRevenueData([]);
//         console.timeEnd('fetchData'); // End timer even on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinancialData();
//   }, [planId, templateId, type]);


//   if (loading) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading Revenue Analysis...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
//       {/* Header Section */}
//       <div className={`mb-6 p-6 ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here */}
//         <h1 className="text-xl font-semibold text-gray-900">Project Budgets / EACs {'>'} Revenue Analysis</h1>
//         <p className="text-sm text-gray-700 mt-2">
//           Project ID: {currentProjIdDisplay} Type: BUD Version: {currentBudVersion} Status: {currentStatus} Period of Performance: {currentPeriodOfPerformance}
//         </p>
//       </div>

//       {/* Control Buttons including Cancel and At Risk Amount */}
//       <div className="mb-4 flex gap-4 items-center">
//         <button
//           onClick={expandAll}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Expand All
//         </button>
//         <button
//           onClick={collapseAll}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
//         >
//           Collapse All
//         </button>
//         {/* START: New wrapper for the three amount boxes */}
//         <div className="flex-grow flex justify-center gap-4">
//           {/* At Risk Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">At risk Amount: </span>
//             <span className="text-red-600 font-bold">{atRiskAmount}</span>
//           </div>
//           {/* Funded Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">Funded: </span>
//             <span className="text-green-600 font-bold">{fundedAmount}</span>
//           </div>
//           {/* At risk + Funded Amount Box */}
//           <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
//             <span className="font-semibold text-gray-700">At risk + Funded: </span>
//             <span className="text-purple-600 font-bold">{atRiskFundedAmount}</span>
//           </div>
//         </div>
//         {/* END: New wrapper for the three amount boxes */}
//       </div>

//       {/* Main table container */}
//       <div className={`overflow-x-auto ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here too */}
//         <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//           {/* Table Header */}
//           <thead>
//             <tr className="bg-gray-100 bg-opacity-50">
//               <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Bill Rate</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Burdened Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Revenue</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Cost</th>
//               <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Revenue</th>
//             </tr>
//           </thead>
//           {/* Table Body */}
//           <tbody className="divide-y divide-gray-300 divide-opacity-10">
//             {revenueData.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="py-8 text-center text-gray-600 text-lg"> {/* colSpan adjusted to 8 (description + 7 metrics) */}
//                   {loading ? 'Loading data...' : 'No revenue analysis data available based on PlanID, Template, and Type parameters. Please check console for API response or data transformation issues.'}
//                 </td>
//               </tr>
//             ) : (
//               revenueData.map((row) => (
//                 <React.Fragment key={row.id}>
//                   {/* Main row */}
//                   <tr
//                     className={`
//                       group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
//                       ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
//                       ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
//                     `}
//                     onClick={() => row.type === 'expandable' && toggleRow(row.id)}
//                   >
//                     <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                       {row.type === 'expandable' && (
//                         <span className="mr-2">
//                           {expandedRows.includes(row.id) ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                           )}
//                         </span>
//                       )}
//                       {row.description}
//                     </td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.billRate)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.rawCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.burdenedCost)}</td>
//                     <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.revenue)}</td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${typeof row.profit === 'number' && row.profit < 0 ? 'text-red-600' : ''}`}>
//                       {formatValue(row.profit)}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnCost && parseFloat(row.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnCost}
//                     </td>
//                     <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnRevenue && parseFloat(row.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                       {row.profitOnRevenue}
//                     </td>
//                   </tr>

//                   {/* Nested details for Labor Revenue row (PLCs) */}
//                   {row.id === 'labor-revenue' && expandedRows.includes(row.id) && row.plcDetails && row.plcDetails.length > 0 && (
//                     <>
//                       {row.plcDetails.map((plc) => (
//                         <React.Fragment key={`${row.id}-${plc.id}`}>
//                           {/* Individual PLC Row (expandable) */}
//                           <tr
//                             className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                             onClick={() => toggleChildRow(row.id, plc.id)} // Use toggleChildRow
//                           >
//                             <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                               <span className="mr-2">
//                                 {expandedPlcRows.includes(`${row.id}-${plc.id}`) ? (
//                                   <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 ) : (
//                                   <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                 )}
//                               </span>
//                               {plc.plcName}
//                             </td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.rawCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.burdenedCost)}</td>
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Revenue (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty for PLC) */}
//                             <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Revenue (empty for PLC) */}
//                           </tr>

//                           {/* Nested Employee Details within PLC */}
//                           {expandedPlcRows.includes(`${row.id}-${plc.id}`) && plc.employees && plc.employees.length > 0 && (
//                             <>
//                               {plc.employees.map((employee) => (
//                                 <React.Fragment key={`${plc.id}-${employee.id}`}>
//                                   {/* Individual Employee Row (NOT expandable now) */}
//                                   <tr
//                                     className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs group" // Removed cursor-pointer and onClick
//                                   >
//                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                       {/* Removed Chevron icons as it's no longer expandable */}
//                                       {employee.name}
//                                     </td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td> {/* Display Bill Rate here */}
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.rawCost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.cost)}</td>
//                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.revenue)}</td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${typeof employee.profit === 'number' && employee.profit < 0 ? 'text-red-600' : ''}`}>
//                                       {formatValue(employee.profit)}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnCost && parseFloat(employee.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnCost}
//                                     </td>
//                                     <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnRevenue && parseFloat(employee.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
//                                       {employee.profitOnRevenue}
//                                     </td>
//                                   </tr>
//                                 </React.Fragment>
//                               ))}
//                             </>
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </>
//                   )}

//                   {/* Nested details for Non-Labor Details row (individual entries) */}
//                   {row.id === 'non-labor-details' && expandedRows.includes(row.id) && row.nonLaborEntries && row.nonLaborEntries.length > 0 && (
//                     <>
//                       <tr className="bg-gray-100 bg-opacity-20">
//                         <td className="py-2 pl-8 pr-4 text-left text-sm font-semibold text-gray-700 uppercase" colSpan="2">Account ID (Employee ID) - Period</td> {/* Updated header */}
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Fringe</td>
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Overhead</td>
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">G&A</td>
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Cost</td> {/* Added Cost column */}
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Materials</td> {/* Added Materials column */}
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td>
//                         <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase" colSpan="2"></td> {/* Placeholder for remaining columns */}
//                       </tr>
//                       {row.nonLaborEntries.map((nonLaborEntry) => (
//                         <tr key={nonLaborEntry.id} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
//                           <td className="py-2 pl-8 pr-4 whitespace-nowrap text-gray-800">
//                             Account: {nonLaborEntry.acctId || 'N/A'} (Emp ID: {nonLaborEntry.emplId || 'N/A'}) - {nonLaborEntry.monthLabel} {/* Display both acctId, emplId, and monthLabel */}
//                             {nonLaborEntry.dctId ? ` (DCT: ${nonLaborEntry.dctId})` : ''} {/* Keep DCT ID display if present */}
//                           </td>
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty) */}
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.fringe)}</td>
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.overhead)}</td>
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.gna)}</td>
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.cost)}</td> {/* Display Cost */}
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.materials)}</td> {/* Display Materials */}
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(nonLaborEntry.total)}</td>
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty) */}
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty) */}
//                           <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Revenue (empty) */}
//                         </tr>
//                       ))}
//                     </>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RevenueAnalysisPage;


'use client';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const INTERNAL_FINANCIAL_API_URL = 'https://test-api-3tmq.onrender.com/Forecast/CalculateCost';

/**
 * Transforms the raw CalculateCostAPIResponse into the RevenueAnalysisRow structure.
 * This function now aggregates all data into overall totals, without monthly breakdowns or hours.
 * It also extracts individual non-labor data entries from the API response for a detailed breakdown view,
 * including them regardless of dctId presence, but skipping entries where Fringe, Overhead, and G&A are all zero.
 * Non-labor entries are now grouped by Account ID.
 */
function transformApiResponseToRevenueAnalysisRows(
  apiResponse
) {
  console.time('transformApiResponse'); // Start timer for transformation
  const rows = [];
  const nonLaborAcctMap = new Map(); // To group non-labor entries by acctId

  let totalRevenueOverall = 0;
  let totalLaborCostRaw = 0; // Raw cost (base salary) for all labor
  let totalBurdenedLaborCost = 0; // Total burdened cost for all labor
  let totalLaborRevenue = 0; // Total labor revenue (sum of revenue + revenue from payrollSalary)

  // Map to group employees by PLC
  const plcMap = new Map();

  console.log(`Revenue Analysis: Transforming data for all projects/orgs from API response.`);

  // Process employeeForecastSummary for labor and payroll-related non-labor costs
  if (!apiResponse.employeeForecastSummary || apiResponse.employeeForecastSummary.length === 0) {
    console.warn(`Revenue Analysis: No employee data found in employeeForecastSummary.`);
  } else {
    apiResponse.employeeForecastSummary.forEach(empSummary => {
      const emplId = empSummary.emplId;
      const plcCode = empSummary.plcCode || 'Unknown PLC';

      // Get or create PLC entry
      let plcDetail = plcMap.get(plcCode);
      if (!plcDetail) {
        plcDetail = {
          id: `plc-${plcCode}`,
          plcName: plcCode,
          rawCost: 0, // Initialize rawCost for PLC
          cost: 0, // Initialize burdenedCost for PLC
          burdenedCost: 0, // Initialize burdenedCost for PLC
          employees: [], // Initialize employees array within PLC
        };
        plcMap.set(plcCode, plcDetail);
      }

      // Get or create Employee entry within the current PLC
      let employee = plcDetail.employees.find(e => e.id === emplId);
      if (!employee) {
        employee = {
          id: emplId,
          // Updated to show Name (EMPLID)
          name: empSummary.name ? `${empSummary.name} (${empSummary.emplId})` : `${empSummary.emplId} (${empSummary.orgID})`,
          rawCost: 0, // Initialize rawCost for employee
          cost: 0, // Will be summed up later as total burdened cost for employee
          accountId: empSummary.acctId || '', // Ensure acctId is captured here
          orgId: empSummary.orgID || '',
          glcPlc: empSummary.plcCode || '',
          hrlyRate: empSummary.perHourRate || 0,
          revenue: 0, // Initialize employee revenue
          profit: 0, // Initialize employee profit
          profitOnCost: '0.00%', // Initialize profitOnCost
          profitOnRevenue: '0.00%', // Initialize profitOnRevenue
        };
        plcDetail.employees.push(employee); // Add employee to PLC's list
      }

      empSummary.emplSchedule?.payrollSalary.forEach(salaryEntry => {
        // Aggregate overall totals for the main summary rows
        totalLaborCostRaw += (salaryEntry.cost || 0);
        totalBurdenedLaborCost += (salaryEntry.totalBurdenCost || 0);
        totalLaborRevenue += (salaryEntry.revenue || 0);

        // Aggregate for current PLC detail (overall totals)
        plcDetail.rawCost += (salaryEntry.cost || 0);
        plcDetail.cost += (salaryEntry.totalBurdenCost || 0);
        plcDetail.burdenedCost += (salaryEntry.totalBurdenCost || 0);

        // Aggregate employee's overall totals (no monthly breakdown)
        employee.rawCost += (salaryEntry.cost || 0);
        employee.cost += (salaryEntry.totalBurdenCost || 0);
        employee.revenue += (salaryEntry.revenue || 0);

        // Collect individual non-labor costs ONLY if at least one of Fringe, Overhead, or G&A is not zero AND dctId is present
        const fringe = salaryEntry.fringe || 0;
        const overhead = salaryEntry.overhead || 0;
        const gna = salaryEntry.gna || 0;

        if ((fringe !== 0 || overhead !== 0 || gna !== 0) && salaryEntry.dctId !== null && salaryEntry.dctId !== undefined) {
          const date = new Date(salaryEntry.year, salaryEntry.month - 1);
          const monthLabel = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().slice(-2);
          const acctId = salaryEntry.acctId || 'N/A Account'; // Get acctId from salaryEntry

          if (!nonLaborAcctMap.has(acctId)) {
            nonLaborAcctMap.set(acctId, {
              id: `nonlabor-acct-${acctId}`,
              acctId: acctId,
              totalFringe: 0,
              totalOverhead: 0,
              totalGna: 0,
              totalCost: 0,
              totalMaterials: 0,
              total: 0,
              entries: [],
            });
          }
          const acctGroup = nonLaborAcctMap.get(acctId);
          const entryTotal = fringe + overhead + gna; // Only these for payroll non-labor

          acctGroup.totalFringe += fringe;
          acctGroup.totalOverhead += overhead;
          acctGroup.totalGna += gna;
          acctGroup.total += entryTotal;

          acctGroup.entries.push({
            id: `nonlabor-payroll-${salaryEntry.year}-${salaryEntry.month}-${empSummary.emplId}-${Date.now() + Math.random()}`, // Unique ID for each entry
            monthLabel: monthLabel,
            fringe: fringe,
            overhead: overhead,
            gna: gna,
            cost: 0, // Payroll salary entries typically don't have a 'cost' field for non-labor direct costs
            materials: 0, // Payroll salary entries typically don't have a 'materials' field
            total: entryTotal,
            emplId: empSummary.emplId, // Employee ID from the employee summary
            orgId: empSummary.orgID,
            projId: salaryEntry.projId,
            dctId: salaryEntry.dctId, // Include dctId for display if needed
            acctId: acctId, // Account ID from the salary entry
            type: 'payroll-non-labor' // Differentiate type
          });
        }
      });
    });

    // Calculate employee profit and profit percentages after all payroll entries are processed
    plcMap.forEach(plc => {
      plc.employees?.forEach(employee => {
        employee.profit = employee.revenue - employee.cost; // employee.cost is burdened cost
        employee.profitOnCost = employee.cost !== 0 ? `${((employee.profit / employee.cost) * 100).toFixed(2)}%` : '0.00%';
        employee.profitOnRevenue = employee.revenue !== 0 ? `${((employee.profit / employee.revenue) * 100).toFixed(2)}%` : '0.00%';
      });
    });
  }

  // Process directCOstForecastSummary for other direct costs
  if (apiResponse.directCOstForecastSummary && apiResponse.directCOstForecastSummary.length > 0) {
    apiResponse.directCOstForecastSummary.forEach(directCostSummary => {
      directCostSummary.directCostSchedule?.forecasts.forEach(forecast => {
        const fringe = forecast.fringe || 0;
        const overhead = forecast.overhead || 0;
        const gna = forecast.gna || 0;
        const cost = forecast.cost || 0; // This is the direct cost amount
        const materials = forecast.materials || 0;

        // Include all direct cost entries from this section if any value is non-zero AND dctId is present
        if ((fringe !== 0 || overhead !== 0 || gna !== 0 || cost !== 0 || materials !== 0) && forecast.dctId !== null && forecast.dctId !== undefined) {
          const date = new Date(forecast.year, forecast.month - 1);
          const monthLabel = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().slice(-2);
          const acctId = forecast.acctId || 'N/A Account'; // Get acctId from forecast

          if (!nonLaborAcctMap.has(acctId)) {
            nonLaborAcctMap.set(acctId, {
              id: `nonlabor-acct-${acctId}`,
              acctId: acctId,
              totalFringe: 0,
              totalOverhead: 0,
              totalGna: 0,
              totalCost: 0,
              totalMaterials: 0,
              total: 0,
              entries: [],
            });
          }
          const acctGroup = nonLaborAcctMap.get(acctId);
          const entryTotal = fringe + overhead + gna + cost + materials;

          acctGroup.totalFringe += fringe;
          acctGroup.totalOverhead += overhead;
          acctGroup.totalGna += gna;
          acctGroup.totalCost += cost;
          acctGroup.totalMaterials += materials;
          acctGroup.total += entryTotal;

          acctGroup.entries.push({
            id: `nonlabor-directcost-${forecast.year}-${forecast.month}-${directCostSummary.emplId}-${forecast.dctId}-${Date.now() + Math.random()}`, // Unique ID
            monthLabel: monthLabel,
            fringe: fringe,
            overhead: overhead,
            gna: gna,
            cost: cost, // Direct cost amount
            materials: materials,
            total: entryTotal, // Sum all relevant direct cost components
            emplId: directCostSummary.emplId, // Employee ID from the direct cost summary
            orgId: directCostSummary.orgID,
            projId: forecast.projId,
            dctId: forecast.dctId,
            acctId: acctId, // Account ID from the individual forecast
            type: 'direct-cost' // Differentiate type
          });
        }
      });
    });
  }

  // Convert the map of non-labor account groups into an array
  const nonLaborAcctDetails = Array.from(nonLaborAcctMap.values());


  const totalFringeCost = apiResponse.totalFringe || 0;
  const totalOverheadCost = apiResponse.totalOverhead || 0;
  const totalGnaCost = apiResponse.totalGna || 0;

  // The totalNonLaborCost should be the sum of all non-labor components reported by the API.
  // Assuming totalFringe, totalOverhead, totalGna already aggregate correctly across all sources.
  const totalNonLaborCost = totalFringeCost + totalOverheadCost + totalGnaCost;

  const totalExpense = totalBurdenedLaborCost + totalNonLaborCost; // Include non-labor costs in total expense
  // Use apiResponse.totalRevenue for totalRevenueOverall if it's the source of truth
  const finalTotalRevenueOverall = apiResponse.totalRevenue || totalLaborRevenue; // Use API total revenue if available, else calculated labor revenue
  const totalProfit = finalTotalRevenueOverall - totalExpense;
  const profitOnCost = totalExpense !== 0 ? (totalProfit / totalExpense) * 100 : 0;
  const profitOnRevenue = finalTotalRevenueOverall !== 0 ? (totalProfit / finalTotalRevenueOverall) * 100 : 0;

  // --- Construct Rows ---

  // 1. Total Revenue Row
  rows.push({
    id: 'total-revenue',
    description: 'Total Revenue',
    billRate: undefined, // Keep undefined for main summary row
    rawCost: undefined,
    cost: totalExpense, // Total expense (burdened) for context
    burdenedCost: totalExpense,
    revenue: finalTotalRevenueOverall,
    profit: totalProfit,
    profitOnCost: `${profitOnCost.toFixed(2)}%`,
    profitOnRevenue: `${profitOnRevenue.toFixed(2)}%`,
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  // 2. Labor Revenue Row (Expandable) - now expands to PLCs
  const laborProfit = totalLaborRevenue - totalBurdenedLaborCost;
  const laborProfitOnCost = totalBurdenedLaborCost !== 0 ? (laborProfit / totalBurdenedLaborCost * 100) : 0;
  const laborProfitOnRevenue = totalLaborRevenue !== 0 ? (laborProfit / totalLaborRevenue * 100) : 0;

  rows.push({
    id: 'labor-revenue',
    description: 'Labor Revenue',
    billRate: undefined, // Keep undefined for main summary row
    rawCost: totalLaborCostRaw,
    cost: totalBurdenedLaborCost,
    burdenedCost: totalBurdenedLaborCost,
    revenue: totalLaborRevenue,
    profit: laborProfit,
    profitOnCost: `${laborProfitOnCost.toFixed(2)}%`,
    profitOnRevenue: `${laborProfitOnRevenue.toFixed(2)}%`,
    type: 'expandable',
    plcDetails: Array.from(plcMap.values()),
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  // New: Non-Labor Details (Expandable) row - now uses grouped data
  rows.push({
    id: 'non-labor-details', // Renamed ID for clarity
    description: 'Non-Labor Details',
    billRate: undefined,
    rawCost: totalNonLaborCost, // Display total non-labor cost in this row
    cost: totalNonLaborCost,
    burdenedCost: totalNonLaborCost,
    revenue: 0,
    profit: -totalNonLaborCost,
    profitOnCost: totalNonLaborCost !== 0 ? `${((-totalNonLaborCost / totalNonLaborCost) * 100).toFixed(2)}%` : '0.00%',
    profitOnRevenue: '0.00%',
    type: 'expandable', // Now an expandable row
    nonLaborAcctDetails: nonLaborAcctDetails, // Pass grouped individual entries here
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  // Existing Total Fringe, Total Overhead, General & Admin as separate summary rows
  rows.push({
    id: 'total-fringe',
    description: 'Total Fringe',
    billRate: undefined,
    rawCost: totalFringeCost,
    cost: totalFringeCost,
    burdenedCost: totalFringeCost,
    revenue: 0,
    profit: undefined, // As per previous request, profit/percentages are undefined for these
    profitOnCost: undefined,
    profitOnRevenue: undefined,
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  rows.push({
    id: 'total-overhead',
    description: 'Total Overhead',
    billRate: undefined,
    rawCost: totalOverheadCost,
    cost: totalOverheadCost,
    burdenedCost: totalOverheadCost,
    revenue: 0,
    profit: undefined,
    profitOnCost: undefined,
    profitOnRevenue: undefined,
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  rows.push({
    id: 'general-admin',
    description: 'General & Admin',
    billRate: undefined,
    rawCost: totalGnaCost,
    cost: totalGnaCost,
    burdenedCost: totalGnaCost,
    revenue: 0,
    profit: undefined,
    profitOnCost: undefined,
    profitOnRevenue: undefined,
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  console.log("Revenue Analysis: Final transformed rows (aggregated):", rows);
  console.timeEnd('transformApiResponse');
  return { rows }; // Only return rows
}


const RevenueAnalysisPage = ({ onCancel, planId, templateId, type, projId, budVersion, status, periodOfPerformance }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedPlcRows, setExpandedPlcRows] = useState([]);
  const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // New state for non-labor account expansion
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [atRiskAmount, setAtRiskAmount] = useState("$0.00 - Placeholder"); // State for At risk Amount
  const [atRiskFundedAmount, setAtRiskFundedAmount] = useState("$0.00 - Placeholder"); // New state for At risk + Funded
  const [fundedAmount, setFundedAmount] = useState("$0.00 - Placeholder"); // New state for Funded


  // Use props for display values, or fallback to defaults
  const currentProjIdDisplay = projId || "Aggregated";
  const currentBudVersion = budVersion || "1";
  const currentStatus = status || "Approved";
  const currentPeriodOfPerformance = periodOfPerformance || "Aggregated Period";


  const toggleRow = (id) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // This function is now only used for PLC children expansion
  const toggleChildRow = (parentId, childId) => {
    const fullId = `${parentId}-${childId}`;
    setExpandedPlcRows(prev =>
      prev.includes(fullId) ? prev.filter(rowId => rowId !== fullId) : [...prev, fullId]
    );
  };

  // New toggle function for non-labor account rows
  const toggleNonLaborAcctRow = (parentId, acctId) => {
    const fullId = `${parentId}-${acctId}`;
    setExpandedNonLaborAcctRows(prev =>
      prev.includes(fullId) ? prev.filter(rowId => rowId !== fullId) : [...prev, fullId]
    );
  };

  const expandAll = () => {
    // Expand Labor Revenue row and Non-Labor Details row
    setExpandedRows(revenueData.filter(row => row.id === 'labor-revenue' || row.id === 'non-labor-details').map(row => row.id));

    const allPlcIds = [];
    revenueData.forEach(row => {
      if (row.id === 'labor-revenue' && row.plcDetails) {
        row.plcDetails.forEach(plc => allPlcIds.push(`${row.id}-${plc.id}`));
      }
    });
    setExpandedPlcRows(allPlcIds); // Using expandedPlcRows for PLC expansions

    const allNonLaborAcctIds = [];
    revenueData.forEach(row => {
      if (row.id === 'non-labor-details' && row.nonLaborAcctDetails) {
        row.nonLaborAcctDetails.forEach(acct => allNonLaborAcctIds.push(`${row.id}-${acct.id}`));
      }
    });
    setExpandedNonLaborAcctRows(allNonLaborAcctIds); // Using expandedNonLaborAcctRows for non-labor account expansions
  };

  const collapseAll = () => {
    setExpandedRows([]);
    setExpandedPlcRows([]);
    setExpandedNonLaborAcctRows([]); // Collapse non-labor account rows
  };

  // Modified formatValue to return empty string for undefined/null/empty string values
  const formatValue = (value) => {
    if (typeof value === 'number') {
      const formatted = value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatted;
    }
    return value === undefined || value === null || value === '' ? '' : value; // Return empty string for blank display
  };

  // Glassmorphism classes for a lighter, more transparent effect
  const getGlassmorphismClasses = () => `
    bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
    border border-opacity-10 border-white shadow-lg
  `;

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      setError(null);
      // Ensure planId is provided before making the API call
      if (!planId) {
        setError("No planId provided to Revenue Analysis Page.");
        setLoading(false);
        return;
      }

      try {
        console.time('fetchData'); // Start timer for overall fetch operation
        const params = new URLSearchParams({
          planID: planId.toString(),
          templateId: (templateId || 1).toString(), // Default to 1 if not provided
          type: type || 'TARGET', // Default to 'TARGET' if not provided
        });
        const apiFetchUrl = `${INTERNAL_FINANCIAL_API_URL}?${params.toString()}`;
        console.log(`Revenue Analysis: Fetching data from API (GET): ${apiFetchUrl}`);

        const response = await fetch(apiFetchUrl, {
          method: 'GET', // Reverted to GET
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error Response (Raw Text):", errorText);
          try {
            const errorData = JSON.parse(errorText);
            console.error("API Error Response (Parsed JSON):", errorData);
            throw new Error(`HTTP error! status: ${response.status}. Details: ${JSON.stringify(errorData.errors || errorData)}`);
          } catch (jsonError) {
            throw new Error(`HTTP error! status: ${response.status}. Raw response: ${errorText}`);
          }
        }

        const apiResponse = await response.json();
        console.log("Revenue Analysis: Full API Raw Response:", apiResponse);
        
        // Check for 'atRiskamt' in the API response and update state
        if (apiResponse.atRiskAmt !== undefined && apiResponse.atRiskAmt !== null) {
          setAtRiskAmount(formatValue(apiResponse.atRiskAmt));
        } else {
          setAtRiskAmount("$0.00 - Not Found"); // Indicate if not found
        }

        // Set Funded Amount
        if (apiResponse.fundingValue !== undefined && apiResponse.fundingValue !== null) {
          setFundedAmount(formatValue(apiResponse.fundingValue));
        } else {
          setFundedAmount("$0.00 - Not Found");
        }

        // Calculate and set At risk + Funded Amount
        const atRisk = typeof apiResponse.atRiskAmt === 'number' ? apiResponse.atRiskAmt : 0;
        const funded = typeof apiResponse.fundingValue === 'number' ? apiResponse.fundingValue : 0;
        setAtRiskFundedAmount(formatValue(atRisk + funded));

        // Call transformApiResponseToRevenueAnalysisRows
        const { rows } = transformApiResponseToRevenueAnalysisRows(apiResponse);
        setRevenueData(rows);
        console.timeEnd('fetchData'); // End timer for overall fetch operation

      } catch (err) {
        console.error("Failed to fetch financial data for Revenue Analysis:", err);
        setError(`Failed to load financial data. ${err.message}. Please ensure the API is running and returning valid JSON.`);
        setRevenueData([]);
        console.timeEnd('fetchData'); // End timer even on error
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, [planId, templateId, type]);


  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
        Loading Revenue Analysis...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
      {/* Header Section */}
      <div className={`mb-6 p-6 ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here */}
        <h1 className="text-xl font-semibold text-gray-900">Project Budgets / EACs {'>'} Revenue Analysis</h1>
        <p className="text-sm text-gray-700 mt-2">
          Project ID: {currentProjIdDisplay} Type: BUD Version: {currentBudVersion} Status: {currentStatus} Period of Performance: {currentPeriodOfPerformance}
        </p>
      </div>

      {/* Control Buttons including Cancel and At Risk Amount */}
      <div className="mb-4 flex gap-4 items-center">
        <button
          onClick={expandAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Collapse All
        </button>
        {/* START: New wrapper for the three amount boxes */}
        <div className="flex-grow flex justify-center gap-4">
          {/* At Risk Amount Box */}
          <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
            <span className="font-semibold text-gray-700">At risk Amount: </span>
            <span className="text-red-600 font-bold">{atRiskAmount}</span>
          </div>
          {/* Funded Amount Box */}
          <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
            <span className="font-semibold text-gray-700">Funded: </span>
            <span className="text-green-600 font-bold">{fundedAmount}</span>
          </div>
          {/* At risk + Funded Amount Box */}
          <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
            <span className="font-semibold text-gray-700">At risk + Funded: </span>
            <span className="text-purple-600 font-bold">{atRiskFundedAmount}</span>
          </div>
        </div>
        {/* END: New wrapper for the three amount boxes */}
      </div>

      {/* Main table container */}
      <div className={`overflow-x-auto ${getGlassmorphismClasses()}`}> {/* Applied glassmorphism here too */}
        <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 bg-opacity-50">
              <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Bill Rate</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Cost</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Burdened Cost</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Revenue</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Cost</th>
              <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Profit % on Revenue</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-300 divide-opacity-10">
            {revenueData.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-600 text-lg"> {/* colSpan adjusted to 8 (description + 7 metrics) */}
                  {loading ? 'Loading data...' : 'No revenue analysis data available based on PlanID, Template, and Type parameters. Please check console for API response or data transformation issues.'}
                </td>
              </tr>
            ) : (
              revenueData.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Main row */}
                  <tr
                    className={`
                      group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
                      ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
                      ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
                    `}
                    onClick={() => row.type === 'expandable' && toggleRow(row.id)}
                  >
                    <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                      {row.type === 'expandable' && (
                        <span className="mr-2">
                          {expandedRows.includes(row.id) ? (
                            <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                          )}
                        </span>
                      )}
                      {row.description}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.billRate)}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.rawCost)}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.burdenedCost)}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.revenue)}</td>
                    <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${typeof row.profit === 'number' && row.profit < 0 ? 'text-red-600' : ''}`}>
                      {formatValue(row.profit)}
                    </td>
                    <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnCost && parseFloat(row.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
                      {row.profitOnCost}
                    </td>
                    <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${row.profitOnRevenue && parseFloat(row.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
                      {row.profitOnRevenue}
                    </td>
                  </tr>

                  {/* Nested details for Labor Revenue row (PLCs) */}
                  {row.id === 'labor-revenue' && expandedRows.includes(row.id) && row.plcDetails && row.plcDetails.length > 0 && (
                    <>
                      {row.plcDetails.map((plc) => (
                        <React.Fragment key={`${row.id}-${plc.id}`}>
                          {/* Individual PLC Row (expandable) */}
                          <tr
                            className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
                            onClick={() => toggleChildRow(row.id, plc.id)} // Use toggleChildRow
                          >
                            <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                              <span className="mr-2">
                                {expandedPlcRows.includes(`${row.id}-${plc.id}`) ? (
                                  <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                )}
                              </span>
                              {plc.plcName}
                            </td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty for PLC) */}
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.rawCost)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(plc.burdenedCost)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Revenue (empty for PLC) */}
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty for PLC) */}
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty for PLC) */}
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Revenue (empty for PLC) */}
                          </tr>

                          {/* Nested Employee Details within PLC */}
                          {expandedPlcRows.includes(`${row.id}-${plc.id}`) && plc.employees && plc.employees.length > 0 && (
                            <>
                              {plc.employees.map((employee) => (
                                <React.Fragment key={`${plc.id}-${employee.id}`}>
                                  {/* Individual Employee Row (NOT expandable now) */}
                                  <tr
                                    className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs group" // Removed cursor-pointer and onClick
                                  >
                                    <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                      {/* Removed Chevron icons as it's no longer expandable */}
                                      {employee.name}
                                    </td>
                                    <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td> {/* Display Bill Rate here */}
                                    <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.rawCost)}</td>
                                    <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.cost)}</td>
                                    <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.revenue)}</td>
                                    <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${typeof employee.profit === 'number' && employee.profit < 0 ? 'text-red-600' : ''}`}>
                                      {formatValue(employee.profit)}
                                    </td>
                                    <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnCost && parseFloat(employee.profitOnCost) < 0 ? 'text-red-600' : ''}`}>
                                      {employee.profitOnCost}
                                    </td>
                                    <td className={`py-2 px-4 text-right whitespace-nowrap text-gray-800 ${employee.profitOnRevenue && parseFloat(employee.profitOnRevenue) < 0 ? 'text-red-600' : ''}`}>
                                      {employee.profitOnRevenue}
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ))}
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  )}

                  {/* Nested details for Non-Labor Details row (Account Grouping) */}
                  {row.id === 'non-labor-details' && expandedRows.includes(row.id) && row.nonLaborAcctDetails && row.nonLaborAcctDetails.length > 0 && (
                    <>
                      {row.nonLaborAcctDetails.map((acctGroup) => (
                        <React.Fragment key={`${row.id}-${acctGroup.id}`}>
                          {/* Account Group Row (expandable) */}
                          <tr
                            className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
                            onClick={() => toggleNonLaborAcctRow(row.id, acctGroup.id)} // Use new toggle for account groups
                          >
                            <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                              <span className="mr-2">
                                {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) ? (
                                  <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                )}
                              </span>
                              Account: {acctGroup.acctId} (Total Entries: {acctGroup.entries.length})
                            </td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty) */}
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.totalFringe)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.totalOverhead)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.totalGna)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.totalCost)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.totalMaterials)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(acctGroup.total)}</td>
                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800" colSpan="2"></td> {/* Placeholder */}
                          </tr>

                          {/* Individual Non-Labor Entries within Account Group */}
                          {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) && acctGroup.entries && acctGroup.entries.length > 0 && (
                            <>
                              <tr className="bg-gray-100 bg-opacity-30">
                                <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase" colSpan="2">Employee ID - Period</td> {/* Updated header */}
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Fringe</td>
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Overhead</td>
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">G&A</td>
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Cost</td>
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Materials</td>
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td>
                                <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase" colSpan="2"></td> {/* Placeholder */}
                              </tr>
                              {acctGroup.entries.map((nonLaborEntry) => (
                                <tr key={nonLaborEntry.id} className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs">
                                  <td className="py-2 pl-16 pr-4 whitespace-nowrap text-gray-800">
                                    Emp ID: {nonLaborEntry.emplId || 'N/A'} - {nonLaborEntry.monthLabel}
                                    {nonLaborEntry.dctId ? ` (DCT: ${nonLaborEntry.dctId})` : ''}
                                  </td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Bill Rate (empty) */}
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.fringe)}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.overhead)}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.gna)}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.cost)}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(nonLaborEntry.materials)}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(nonLaborEntry.total)}</td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit (empty) */}
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* Profit % on Cost (empty) */}
                                </tr>
                              ))}
                            </>
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
  );
};

export default RevenueAnalysisPage;
