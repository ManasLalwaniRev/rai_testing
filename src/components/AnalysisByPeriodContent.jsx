// // 'use client';

// // import { useState, useEffect, useCallback } from 'react';
// // import React from 'react';
// // import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
// // import { data } from 'react-router-dom';

// // const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error, fiscalYear }) => {
// //   // Added console.log for fiscalYear prop at the very top
// //   console.log("AnalysisByPeriodContent: Received fiscalYear prop:", fiscalYear);
// //   console.log("AnalysisByPeriodContent: Received initialApiData prop:", initialApiData);


// //   const [expandedStaffRows, setExpandedStaffRows] = useState([]);
// //   const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
// //   const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
// //   const [financialData, setFinancialData] = useState([]);

// //   const [allApiData, setAllApiData] = useState(null); // This will now hold the fiscalYear-filtered data
// //   const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

// //   const [selectedOrgId, setSelectedOrgId] = useState('');
// //   const [availableOrgIds, setAvailableOrgIds] = useState([]);

// //   const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');

// //   /**
// //    * Helper to map month and year to a date range string (e.g., "05/01-05/31_2025")
// //    * Uses Date object to accurately determine the last day of the month, accounting for leap years.
// //    */
// //   // const getMonthRangeKey = (month, year) => {
// //   //   // Month is 1-indexed for input, but 0-indexed for Date constructor (month - 1)
// //   //   // Day 0 of the *next* month gives the last day of the *current* month
// //   //   const lastDay = new Date(year, month, 0).getDate();
// //   //   const monthString = month.toString().padStart(2, '0');
// //   //   return `${monthString}/01-${monthString}/${lastDay}_${year}`;
// //   // };

// //   // Replace your existing getMonthRangeKey function with this one
// // function getMonthRangeKey(period, year) {
// //   // Add this check to prevent crashes if period or year are missing
// //   if (period === undefined || year === undefined) {
// //     return null;
// //   }
// //   const month = String(period).padStart(2, '0');
// //   const monthRange = `${month}/${year}`;
// //   return monthRange;
// // }

// //   /**
// //    * Transforms the raw API response (which is now pre-filtered by fiscal year)
// //    * into the FinancialRow structure expected by the frontend.
// //    * This function filters the provided apiResponse based on currentOrgId.
// //    * It also dynamically calculates profit based on the selected revenue view.
// //    * 
// //    * 

// //    */

// //   // Old code //
// // //   const transformApiDataToFinancialRows = useCallback((
// // //     apiResponse, // This apiResponse is now the pre-filtered allApiData
// // //     currentOrgId,
// // //     dynamicDateRanges,
// // //     selectedRevenueView,
// // //     planType,
// // //     apiTotalRevenue // Added planType here
    
// // //     // selectedFiscalYear is implicitly handled by apiResponse being pre-filtered
// // //   ) => {
// // //     console.log("transformApiDataToFinancialRows: apiResponse (already fiscalYear-filtered)", apiResponse);
// // //     console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
// // //     console.log("transformApiDataToFinancialRows: dynamicDateRanges (columns)", dynamicDateRanges);
// // //     console.log("transformApiDataToFinancialRows: planType", planType);


// // //     const financialRows = [];

// // //     const revenueData = {};
// // //     const tnmRevenueData = {};
// // //     const cpffRevenueData = {};
// // //     const totalExpenseData = {};
// // //     const profitData = {};
// // //     const profitOnCostData = {};
// // //     const profitOnRevenueData = {};

// // //     // Initialize monthly data accumulators for all dynamicDateRanges
// // //     dynamicDateRanges.forEach(range => {
// // //       revenueData[range] = 0;
// // //       tnmRevenueData[range] = 0;
// // //       cpffRevenueData[range] = 0;
// // //       totalExpenseData[range] = 0;
// // //       profitData[range] = 0;
// // //       profitOnCostData[range] = 0;
// // //       profitOnRevenueData[range] = 0;
// // //     });

// // //     const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => {
// // //       acc[range] = 0;
// // //       return acc;
// // //     }, {});

// // //     const totalStaffHoursByMonth = dynamicDateRanges.reduce((acc, range) => {
// // //       acc[range] = 0;
// // //       return acc;
// // //     }, {});

// // //     const uniqueEmployeesMap = new Map();
// // //     const nonLaborAcctDetailsMap = new Map(); // Map to group non-labor details by account ID and then by month

// // //     // Filter employee summaries based on orgId (fiscal year already handled by parent useEffect)
// // //     const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
// // //       const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
// // //       return isOrgMatch;
// // //     });
// // //     console.log("transformApiDataToFinancialRows: filteredEmployeeSummaries (after org filter, fiscal year already applied)", filteredEmployeeSummaries);

// // //     // const [totalRevenueFromApi, setTotalRevenueFromApi] = useState(0); //

// // //    if (apiResponse && apiResponse.monthlyRevenueSummary) {
// // //   apiResponse.monthlyRevenueSummary.forEach(monthSummary => {
// // //     // Find the corresponding month range directly from the dynamicDateRanges array
// // //     const matchingRange = dynamicDateRanges.find(
// // //       (range) => range.period === monthSummary.period && range.year === monthSummary.year
// // //     );

// // //     if (matchingRange) {
// // //       // Use the exact monthRange key from the dynamicDateRanges array to populate the data
// // //       revenueData[matchingRange.monthRange] = monthSummary.revenue || 0;
// // //     } else {
// // //       console.warn(`No matching month range found for period ${monthSummary.period} and year ${monthSummary.year}`);
// // //     }
// // //   });
// // // }
// // //     if (filteredEmployeeSummaries.length > 0) {
// // //       filteredEmployeeSummaries.forEach(empSummary => {
// // //         // Use emplId as the unique key for the employee map
// // //         if (!uniqueEmployeesMap.has(empSummary.emplId)) {
// // //           uniqueEmployeesMap.set(empSummary.emplId, {
// // //             id: empSummary.emplId,
// // //             name: `${empSummary.name} (${empSummary.emplId})`, // Format name (EMPLID)
// // //             cost: 0,
// // //             accountId: empSummary.accID || '', // Use accID from empSummary
// // //             orgId: empSummary.orgId || '',
// // //             glcPlc: empSummary.plcCode || '',
// // //             hrlyRate: empSummary.perHourRate || 0,
// // //             monthlyHours: {},
// // //             monthlyCost: {},
// // //             detailSummary: {},
// // //           });
// // //         }
// // //         const employee = uniqueEmployeesMap.get(empSummary.emplId);

// // //         // New Lines to ADD before the forEach loop
// // //         const totalEmployeeRevenue = empSummary.revenue || 0;
// // //         const totalEmployeeBurdenCost = empSummary.totalBurdonCost || 0; 


// // //         if (empSummary.emplSchedule && Array.isArray(empSummary.emplSchedule.payrollSalary)) {
// // //           empSummary.emplSchedule.payrollSalary.forEach(salaryEntry => {
// // //             // No need for fiscalYear check here, as data is already pre-filtered
// // //             const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);


// // //             if (monthRange) {
// // //               tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
// // //               cpffRevenueData[monthRange] = (cpffRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0); // Assuming cpffRevenue exists  
// // //               // revenueData[monthRange] = (revenueData[monthRange] || 0) + (salaryEntry.revenue || 0); // Total revenue for display
            
        
// // //               totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// // //               totalStaffCostByMonth[monthRange] = (totalStaffCostByMonth[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// // //               totalStaffHoursByMonth[monthRange] = (totalStaffHoursByMonth[monthRange] || 0) + (salaryEntry.hours || 0);

// // //               employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// // //               employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

// // //               if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
// // //               employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

// // //               if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
// // //               employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

// // //               if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
// // //               employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

// // //               if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
// // //               employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
// // //             }
// // //           });
// // //         }
// // //       });
// // //     }

// // //     // Process direct and indirect cost data for Non-Labor Staff Cost
// // //     let totalNonLaborCostOverall = 0;
// // //     const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => {
// // //       acc[range] = 0;
// // //       return acc;
// // //     }, {});

// // //     // Filter non-labor summaries based on orgId (fiscal year already handled by parent useEffect)
// // //     const allNonLaborSummariesFiltered = [
// // //       ...(apiResponse.directCOstForecastSummary || []),
// // //       ...(apiResponse.indirectCostForecastSummary || [])
// // //     ].filter(nonLaborSummary => {
// // //       const isOrgMatch = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
// // //       return isOrgMatch;
// // //     });

// // //       console.log("transformApiDataToFinancialRows: apiResponse", apiResponse);
// // //     console.log("transformApiDataToFinancialRows: allNonLaborSummariesFiltered (after org filter, fiscal year already applied)", allNonLaborSummariesFiltered);


// // //     allNonLaborSummariesFiltered.forEach(nonLaborSummary => { // Use the already filtered list
// // //         const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
// // //                           (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
// // //         console.log(`Processing non-labor summary for accID: ${nonLaborSummary.accID}, orgID: ${nonLaborSummary.orgID}. Forecast schedules found:`, schedules);

// // //         const accountId = nonLaborSummary.accID;
// // //         const orgId = nonLaborSummary.orgID;
// // //         const glcPlc = nonLaborSummary.plcCode || '';
// // //         const accName = nonLaborSummary.accName || `Account: ${accountId}`;

// // //         if (!nonLaborAcctDetailsMap.has(accountId)) {
// // //             nonLaborAcctDetailsMap.set(accountId, {
// // //                 id: accountId,
// // //                 description: accName,
// // //                 orgId: orgId,
// // //                 glcPlc: glcPlc,
// // //                 total: 0, // Total for this account across all periods
// // //                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}), // Total for this account per month
// // //                 employees: new Map(), // Map to hold employee-level data within this account (even for non-labor, to group DCTs)
// // //             });
// // //             console.log(`  New non-labor account group created: ${accountId}`);
// // //         }
// // //         const acctGroup = nonLaborAcctDetailsMap.get(accountId);

// // //         // Group schedules by employee within the account group (even if it's a single DCT entry, it needs a 'group')
// // //         const employeeId = nonLaborSummary.emplId || 'N/A_Employee'; // Use a default if emplId is missing
// // //         const employeeName = nonLaborSummary.name || ` ${accountId}`; // More generic name

// // //         if (!acctGroup.employees.has(employeeId)) {
// // //             acctGroup.employees.set(employeeId, {
// // //                 id: employeeId,
// // //                 name: `${employeeName} (${employeeId})`,
// // //                 total: 0,
// // //                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// // //                 entries: [], // These are the original DCT-level entries for this specific employee/group
// // //             });
// // //         }
// // //         const employeeGroup = acctGroup.employees.get(employeeId);


// // //         schedules.forEach(scheduleEntry => {
// // //             // No need for fiscalYear check here, as data is already pre-filtered
// // //             const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// // //             if (monthRange) {
// // //                 let entryCost = 0;
// // //                 if (planType === 'EAC') {
// // //                     entryCost = scheduleEntry.actualamt || 0;
// // //                 } else if (planType === 'BUD') {
// // //                     entryCost = scheduleEntry.forecastedamt || 0;
// // //                 } else {
// // //                     // Fallback to original calculation if planType is not EAC or BUD
// // //                     entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
// // //                 }

// // //                 console.log(`  Schedule entry for ${monthRange}: planType=${planType}, actualamt=${scheduleEntry.actualamt}, forecastedamt=${scheduleEntry.forecastedamt}. Calculated entryCost: ${entryCost}`);

// // //                 // Add the individual schedule entry to the employee's entries array
// // //                 employeeGroup.entries.push({
// // //                     id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`, // Unique ID for this specific monthly entry
// // //                     dctId: scheduleEntry.dctId,
// // //                     forecastid: scheduleEntry.forecastid,
// // //                     monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
// // //                     total: entryCost, // Total for this specific entry (for that month)
// // //                     monthlyValues: { [monthRange]: entryCost } // This will populate the correct month column for this specific entry
// // //                 });

// // //                 // Aggregate totals for the employee group
// // //                 employeeGroup.monthlyData[monthRange] += entryCost;
// // //                 employeeGroup.total += entryCost;

// // //                 // Aggregate totals for the account group (still at account level)
// // //                 acctGroup.monthlyData[monthRange] += entryCost;
// // //                 acctGroup.total += entryCost;

// // //                 totalNonLaborCostByMonth[monthRange] = (totalNonLaborCostByMonth[monthRange] || 0) + entryCost;
// // //                 totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + entryCost; // Ensure this is current month's totalExpenseData
// // //             }
// // //         });
// // //     });

// // //     Array.from(uniqueEmployeesMap.values()).forEach(employee => {
// // //       employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
// // //     });

// // //     Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
// // //         // Recalculate total for acctGroup in case it wasn't fully accumulated (though it should be)
// // //         acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
// // //         // Convert employee maps to arrays for rendering
// // //         acctGroup.employees = Array.from(acctGroup.employees.values());
// // //     });

// // //     totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
// // //     console.log("transformApiDataToFinancialRows: totalNonLaborCostOverall", totalNonLaborCostOverall);
// // //     console.log("transformApiDataToFinancialRows: totalNonLaborCostByMonth", totalNonLaborCostByMonth);
// // //     console.log("transformApiDataToFinancialRows: nonLaborAcctDetailsMap contents (after processing)", Array.from(nonLaborAcctDetailsMap.values()));

// // //     // Recalculate overall totals AFTER all filtering and monthly aggregation
// // //     // This ensures overall totals reflect only the selected fiscal year
// // //     const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
// // //     const totalStaffHoursOverall = Object.values(totalStaffHoursByMonth).reduce((sum, val) => sum + val, 0);

// // //     const totalRevenueOverall = Object.values(revenueData).reduce((sum, val) => sum + val, 0); // Calculate from aggregated monthly data
// // //     const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
// // //     const totalProfitOverall = totalRevenueOverall - totalExpenseOverall; // Calculate from newly aggregated revenue and expense

// // //     // Populate profitData for each month based on monthly revenue and expense
// // //     dynamicDateRanges.forEach(range => {
// // //       profitData[range] = (revenueData[range] || 0) - (totalExpenseData[range] || 0);
// // //     });
    
// // //     const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
// // //     const overallProfitOnRevenue = totalRevenueOverall !== 0 // Use totalRevenueOverall here
// // //       ? (totalProfitOverall / totalRevenueOverall)
// // //       : 0;

// // //     financialRows.push({
// // //       id: `revenue-${currentOrgId}`,
// // //       description: 'Revenue',
// // //       total: apiTotalRevenue,
// // //       data: revenueData,
// // //       tnmRevenueData: tnmRevenueData,
// // //       cpffRevenueData: cpffRevenueData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     financialRows.push({
// // //       id: `total-staff-cost-${currentOrgId}`,
// // //       description: 'Total Staff Cost',
// // //       total: totalStaffCostOverall,
// // //       totalHours: totalStaffHoursOverall,
// // //       data: totalStaffCostByMonth,
// // //       type: 'expandable',
// // //       employees: Array.from(uniqueEmployeesMap.values()),
// // //       orgId: currentOrgId,
// // //     });

// // //     // New Non-Labor Staff Cost row
// // //     financialRows.push({
// // //         id: `non-labor-staff-cost-${currentOrgId}`,
// // //         description: 'Non-Labor Staff Cost',
// // //         total: totalNonLaborCostOverall,
// // //         data: totalNonLaborCostByMonth,
// // //         type: 'expandable',
// // //         nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()), // Attach processed non-labor data
// // //         orgId: currentOrgId,
// // //     });


// // //     financialRows.push({
// // //       id: `total-expense-${currentOrgId}`,
// // //       description: 'Total Expense',
// // //       total: totalExpenseOverall,
// // //       data: totalExpenseData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     financialRows.push({
// // //       id: `profit-${currentOrgId}`,
// // //       description: 'Profit',
// // //       total: totalProfitOverall,
// // //       data: profitData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     dynamicDateRanges.forEach(range => {
// // //       const profit = (profitData[range] || 0);
// // //       const expense = (totalExpenseData[range] || 0);
// // //       profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
// // //     });

// // //     financialRows.push({
// // //       id: `profit-cost-${currentOrgId}`,
// // //       description: 'Profit % on Cost',
// // //       total: overallProfitOnCost, // Store as decimal, format for display
// // //       data: profitOnCostData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     dynamicDateRanges.forEach(range => {
// // //       const profit = (profitData[range] || 0);
// // //       let revenueForPercentage = 0;
// // //       if (selectedRevenueView === 't&m') {
// // //         revenueForPercentage = (tnmRevenueData[range] || 0);
// // //       } else if (selectedRevenueView === 'cpff') {
// // //         revenueForPercentage = (cpffRevenueData[range] || 0);
// // //       }
// // //       profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
// // //     });

// // //     financialRows.push({
// // //       id: `profit-revenue-${currentOrgId}`,
// // //       description: 'Profit % on Revenue',
// // //       total: overallProfitOnRevenue, // Store as decimal, format for display
// // //       data: profitOnRevenueData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
// // //     return financialRows;
// // //   }, [selectedRevenueView]);

// // // Old code ends //

// // const transformApiDataToFinancialRows = useCallback((
// //   apiResponse,
// //   currentOrgId,
// //   dynamicDateRanges,
// //   selectedRevenueView,
// //   planType
// // ) => {
// //   console.log("transformApiDataToFinancialRows: RAW apiResponse", apiResponse);
// //   console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
// //   console.log("transformApiDataToFinancialRows: dynamicDateRanges (columns)", dynamicDateRanges);
// //   console.log("transformApiDataToFinancialRows: planType", planType);

// //   const financialRows = [];

// //   // Initialize all data objects to ensure all date ranges are covered
// //   const monthlyRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const totalExpenseData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const profitData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const profitOnCostData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const profitOnRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
  
// //   // Use the top-level 'revenue' field for the overall total, as confirmed by the user
// //   const totalRevenueOverall = apiResponse.revenue || 0;

// //   // Process monthly data from the monthlyRevenueSummary array as requested
// //   const monthlyRevenueSummary = apiResponse.monthlyRevenueSummary || [];
// //   monthlyRevenueSummary.forEach(monthData => {
// //     const monthRange = getMonthRangeKey(monthData.month, monthData.year);
// //     if (monthRange && dynamicDateRanges.includes(monthRange)) {
// //       // Populate Revenue data
// //       monthlyRevenueData[monthRange] = monthData.revenue || 0;
      
// //       // Populate Staff Cost and Non-Labor Cost data as requested
// //       const staffCost = monthData.cost || 0;
// //       const nonLaborCost = monthData.otherDifrectCost || 0;

// //       totalStaffCostByMonth[monthRange] = staffCost;
// //       totalNonLaborCostByMonth[monthRange] = nonLaborCost;
      
// //       // Calculate total expense for the month
// //       totalExpenseData[monthRange] = staffCost + nonLaborCost;
// //     }
// //   });

// //   // Calculate overall totals from the monthly data
// //   const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
// //   const totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
// //   const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
// //   const totalProfitOverall = totalRevenueOverall - totalExpenseOverall;

// //   // The rest of the function remains the same, but the cost calculations are now based on monthlyRevenueSummary
  
// //   const uniqueEmployeesMap = new Map();
// //   const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
// //     const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
// //     return isOrgMatch;
// //   });
  
// //   if (filteredEmployeeSummaries.length > 0) {
// //     filteredEmployeeSummaries.forEach(empSummary => {
// //       // Use emplId as the unique key for the employee map
// //       if (!uniqueEmployeesMap.has(empSummary.emplId)) {
// //         uniqueEmployeesMap.set(empSummary.emplId, {
// //           id: empSummary.emplId,
// //           name: `${empSummary.name} (${empSummary.emplId})`,
// //           cost: 0,
// //           accountId: empSummary.accID || '',
// //           orgId: empSummary.orgId || '',
// //           glcPlc: empSummary.plcCode || '',
// //           hrlyRate: empSummary.perHourRate || 0,
// //           monthlyHours: {},
// //           monthlyCost: {},
// //           detailSummary: {},
// //         });
// //       }
// //       const employee = uniqueEmployeesMap.get(empSummary.emplId);

// //       const payrollSalaries = empSummary.emplSchedule?.payrollSalary || [];
// //       payrollSalaries.forEach(salaryEntry => {
// //         const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

// //         if (monthRange && dynamicDateRanges.includes(monthRange)) {
// //           const monthlyBurdenCost = salaryEntry.totalBurdenCost || salaryEntry.cost || 0;
// //           employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + monthlyBurdenCost;
// //           employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

// //           // Populate employee details
// //           if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
// //           employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

// //           if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
// //           employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

// //           if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
// //           employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

// //           if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
// //           employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
// //         }
// //       });
// //     });
// //   }
  
// //   // The non-labor cost summary loop is no longer needed for monthly totals, but is kept to get detailed data
// //   const nonLaborAcctDetailsMap = new Map();
// //   const allNonLaborSummariesFiltered = [
// //     ...(apiResponse.directCOstForecastSummary || []),
// //     ...(apiResponse.indirectCostForecastSummary || [])
// //   ].filter(nonLaborSummary => {
// //     const isOrgMatch = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
// //     return isOrgMatch;
// //   });

// //   allNonLaborSummariesFiltered.forEach(nonLaborSummary => {
// //     const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
// //                       (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
// //     const accountId = nonLaborSummary.accID;
// //     const orgId = nonLaborSummary.orgID;
// //     const glcPlc = nonLaborSummary.plcCode || '';
// //     const accName = nonLaborSummary.accName || `Account: ${accountId}`;

// //     if (!nonLaborAcctDetailsMap.has(accountId)) {
// //       nonLaborAcctDetailsMap.set(accountId, {
// //         id: accountId,
// //         description: accName,
// //         orgId: orgId,
// //         glcPlc: glcPlc,
// //         total: 0,
// //         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// //         employees: new Map(),
// //       });
// //     }
// //     const acctGroup = nonLaborAcctDetailsMap.get(accountId);
// //     const employeeId = nonLaborSummary.emplId || 'N/A_Employee';
// //     const employeeName = nonLaborSummary.name || ` ${accountId}`;

// //     if (!acctGroup.employees.has(employeeId)) {
// //       acctGroup.employees.set(employeeId, {
// //         id: employeeId,
// //         name: `${employeeName} (${employeeId})`,
// //         total: 0,
// //         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// //         entries: [],
// //       });
// //     }
// //     const employeeGroup = acctGroup.employees.get(employeeId);

// //     schedules.forEach(scheduleEntry => {
// //       const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //       if (monthRange && dynamicDateRanges.includes(monthRange)) {
// //         let entryCost = 0;
// //         if (planType === 'EAC') {
// //           entryCost = scheduleEntry.actualamt || 0;
// //         } else if (planType === 'BUD') {
// //           entryCost = scheduleEntry.forecastedamt || 0;
// //         } else {
// //           entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
// //         }
// //         employeeGroup.entries.push({
// //           id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`,
// //           dctId: scheduleEntry.dctId,
// //           forecastid: scheduleEntry.forecastid,
// //           monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
// //           total: entryCost,
// //           monthlyValues: { [monthRange]: entryCost }
// //         });
// //         employeeGroup.monthlyData[monthRange] += entryCost;
// //         employeeGroup.total += entryCost;
// //         acctGroup.monthlyData[monthRange] += entryCost;
// //         acctGroup.total += entryCost;
// //       }
// //     });
// //   });

// //   Array.from(uniqueEmployeesMap.values()).forEach(employee => {
// //     employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
// //   });
// //   Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
// //     acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
// //     acctGroup.employees = Array.from(acctGroup.employees.values());
// //   });

// //   const selectedRevenueData = selectedRevenueView === 't&m' ? monthlyRevenueData : monthlyRevenueData;
  
// //   dynamicDateRanges.forEach(range => {
// //     profitData[range] = (selectedRevenueData[range] || 0) - (totalExpenseData[range] || 0);
// //   });
  
// //   const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
// //   const overallProfitOnRevenue = totalRevenueOverall !== 0
// //     ? (totalProfitOverall / totalRevenueOverall)
// //     : 0;

// //   financialRows.push({
// //     id: `revenue-${currentOrgId}`,
// //     description: 'Revenue',
// //     total: totalRevenueOverall,
// //     data: selectedRevenueData,
// //     tnmRevenueData: monthlyRevenueData,
// //     cpffRevenueData: monthlyRevenueData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `total-staff-cost-${currentOrgId}`,
// //     description: 'Total Staff Cost',
// //     total: totalStaffCostOverall,
// //     data: totalStaffCostByMonth,
// //     type: 'expandable',
// //     employees: Array.from(uniqueEmployeesMap.values()),
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `non-labor-staff-cost-${currentOrgId}`,
// //     description: 'Non-Labor Staff Cost',
// //     total: totalNonLaborCostOverall,
// //     data: totalNonLaborCostByMonth,
// //     type: 'expandable',
// //     nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()),
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `total-expense-${currentOrgId}`,
// //     description: 'Total Expense',
// //     total: totalExpenseOverall,
// //     data: totalExpenseData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `profit-${currentOrgId}`,
// //     description: 'Profit',
// //     total: totalProfitOverall,
// //     data: profitData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   dynamicDateRanges.forEach(range => {
// //     const profit = (profitData[range] || 0);
// //     const expense = (totalExpenseData[range] || 0);
// //     profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
// //   });

// //   financialRows.push({
// //     id: `profit-cost-${currentOrgId}`,
// //     description: 'Profit % on Cost',
// //     total: overallProfitOnCost,
// //     data: profitOnCostData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   dynamicDateRanges.forEach(range => {
// //     const profit = (profitData[range] || 0);
// //     let revenueForPercentage = (selectedRevenueData[range] || 0);
// //     profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
// //   });

// //   financialRows.push({
// //     id: `profit-revenue-${currentOrgId}`,
// //     description: 'Profit % on Revenue',
// //     total: overallProfitOnRevenue,
// //     data: profitOnRevenueData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
// //   return financialRows;
// // }, [selectedRevenueView]);

// // function getMonthRangeKey(period, year) {
// //   if (period === undefined || year === undefined) {
// //     return null;
// //   }
// //   const month = String(period).padStart(2, '0');
// //   return `${month}/${year}`;
// // }
// // // You will still need to ensure your existing `getMonthRangeKey` helper function is correctly defined elsewhere in the file.
// // // Note: The getMonthRangeKey function is assumed to be defined elsewhere in your file.
// // // function getMonthRangeKey(period, year) {
// // //   // This helper function must also be updated to match the format from getMonthlyDateRanges
// // //   const month = String(period).padStart(2, '0');
// // //   const monthRange = `${month}/${year}`;
// // //   return monthRange;
// // // }



// //   // This useEffect now processes the initialApiData received from props
// //   useEffect(() => {
// //     console.log("useEffect [initialApiData, isLoading, error, fiscalYear]: Effect triggered.");
// //     if (isLoading) {
// //       console.log("useEffect: Data is still loading.");
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //       return;
// //     }

// //     // This error prop is from the parent component.
// //     // If there's an error from the parent, we should display it.
// //     if (error) {
// //       console.log("useEffect: Error received from parent:", error);
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //       return;
// //     }

// //     if (!initialApiData || Object.keys(initialApiData).length === 0) {
// //       console.log("useEffect: initialApiData is null, undefined, or empty.");
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //       return;
// //     }

// //     try {
// //       console.log("useEffect: Processing initialApiData for deep fiscal year filtering...");
      
// //       const processedApiData = { ...initialApiData }; // Start with a copy

// //       // Filter employee summaries and their internal payrollSalary
// //       processedApiData.employeeForecastSummary = (initialApiData.employeeForecastSummary || [])
// //         .map(empSummary => {
// //           const filteredPayrollSalary = (empSummary.emplSchedule?.payrollSalary || []).filter(salaryEntry => {
// //             return !fiscalYear || fiscalYear === "All" || String(salaryEntry.year) === fiscalYear;
// //           });

// //           if (filteredPayrollSalary.length > 0) {
// //             return {
// //               ...empSummary,
// //               emplSchedule: {
// //                 ...empSummary.emplSchedule,
// //                 payrollSalary: filteredPayrollSalary,
// //               },
// //             };
// //           }
// //           return null; // Mark for removal if no relevant data
// //         })
// //         .filter(Boolean); // Remove null entries

// //       console.log("useEffect: employeeForecastSummary after deep fiscalYear filter:", processedApiData.employeeForecastSummary);

// //   //     processedApiData.employeeForecastSummary =
// //   // processedApiData.employeeForecastSummary.map(emp => ({
// //   //   ...emp,
// //   //   // orgID: emp.orgID && emp.orgID.trim() ? emp.orgID : "Corporate"
// //   //   orgID: "Test1"
// //   // }));

// //       // Filter direct cost summaries and their internal forecasts
// //       processedApiData.directCOstForecastSummary = (initialApiData.directCOstForecastSummary || [])
// //         .map(nonLaborSummary => {
// //           const filteredForecasts = (nonLaborSummary.directCostSchedule?.forecasts || []).filter(f => {
// //             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
// //           });
// //           if (filteredForecasts.length > 0) {
// //             return {
// //               ...nonLaborSummary,
// //               directCostSchedule: {
// //                 ...nonLaborSummary.directCostSchedule,
// //                 forecasts: filteredForecasts,
// //               },
// //             };
// //           }
// //           return null;
// //         })
// //         .filter(Boolean);
// //       console.log("useEffect: directCOstForecastSummary after deep fiscalYear filter:", processedApiData.directCOstForecastSummary);

// //       // Filter indirect cost summaries and their internal forecasts
// //       processedApiData.indirectCostForecastSummary = (initialApiData.indirectCostForecastSummary || [])
// //         .map(nonLaborSummary => {
// //           const filteredForecasts = (nonLaborSummary.indirectCostSchedule?.forecasts || []).filter(f => {
// //             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
// //           });
// //           if (filteredForecasts.length > 0) {
// //             return {
// //               ...nonLaborSummary,
// //               indirectCostSchedule: {
// //                 ...nonLaborSummary.indirectCostSchedule,
// //                 forecasts: filteredForecasts,
// //               },
// //             };
// //           }
// //           return null;
// //         })
// //         .filter(Boolean);
// //       console.log("useEffect: indirectCostSummariesFiltered after deep fiscalYear filter:", processedApiData.indirectCostForecastSummary);


// //       setAllApiData(processedApiData); // Set the fiscalYear-filtered data to allApiData

// //       const uniqueOrgIds = new Set();
// //       const uniqueDateRangesSet = new Set();

// //       // Collect org IDs and date ranges from the NOW FULLY FILTERED employee data
// //       (processedApiData.employeeForecastSummary || []).forEach(summary => {
// //         uniqueOrgIds.add(summary.orgID);
// //         summary.emplSchedule?.payrollSalary?.forEach(salaryEntry => {
// //           const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
// //           uniqueDateRangesSet.add(monthRangeKey);
// //         });
// //       });

// //       // Collect org IDs and date ranges from the NOW FULLY FILTERED non-labor data
// //       (processedApiData.directCOstForecastSummary || []).forEach(nonLaborSummary => {
// //         uniqueOrgIds.add(nonLaborSummary.orgID);
// //         nonLaborSummary.directCostSchedule?.forecasts?.forEach(scheduleEntry => {
// //           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //           uniqueDateRangesSet.add(monthRangeKey);
// //         });
// //       });

// //       (processedApiData.indirectCostForecastSummary || []).forEach(nonLaborSummary => {
// //         uniqueOrgIds.add(nonLaborSummary.orgID);
// //         nonLaborSummary.indirectCostSchedule?.forecasts?.forEach(scheduleEntry => {
// //           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //           uniqueDateRangesSet.add(monthRangeKey);
// //         });
// //       });


// //       const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
// //           const [, , yearAStr] = a.split('_');
// //           const [monthAStr,] = a.split('/')[0].split('-');
// //           const yearA = parseInt(yearAStr, 10);
// //           const monthA = parseInt(monthAStr, 10);

// //           const [, , yearBStr] = b.split('_');
// //           const [monthBStr,] = b.split('/')[0].split('-');
// //           const yearB = parseInt(yearBStr, 10);
// //           const monthB = parseInt(monthBStr, 10);

// //           if (yearA !== yearB) return yearA - yearB;
// //           return monthA - monthB;
// //       });

// //       setDynamicDateRanges(sortedDateRanges);
// //       console.log("useEffect: dynamicDateRanges set to", sortedDateRanges);

// //       const orgs = Array.from(uniqueOrgIds).sort();
// //       setAvailableOrgIds(orgs);
// //       console.log("useEffect: availableOrgIds set to", orgs);

// //       if (orgs.length > 0) {
// //         setSelectedOrgId(orgs[0]);
// //         console.log("useEffect: selectedOrgId set to", orgs[0]);
// //       } else {
// //         setSelectedOrgId('');
// //         console.log("useEffect: selectedOrgId set to empty (no orgs found)");
// //       }
// //     } catch (e) {
// //       console.error("Error during initial API data processing:", e);
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //     }
// //   }, [initialApiData, isLoading, error, fiscalYear]); // Depend on initialApiData, isLoading, error, and fiscalYear props

// //   useEffect(() => {
// //     console.log("useEffect [allApiData, selectedOrgId, dynamicDateRanges, ...]: Transform trigger effect.");
// //     if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
// //       console.log("useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data...");
// //       const transformedData = transformApiDataToFinancialRows(
// //         allApiData, // allApiData is now pre-filtered by fiscal year
// //         selectedOrgId,
// //         dynamicDateRanges,
// //         selectedRevenueView,
// //         type,
// //         initialApiData.revenue // Pass the 'type' prop (which is plType)
// //       );
// //       console.log("Transformed Data (after filter & transform):", transformedData);
// //       setFinancialData(transformedData);
// //     } else {
// //       console.log("useEffect (transform trigger): Waiting for allApiData, selectedOrgId, or dynamicDateRanges to be ready.");
// //       setFinancialData([]);
// //     }
// //     setExpandedStaffRows([]);
// //     setExpandedEmployeeDetails([]);
// //     setExpandedNonLaborAcctRows([]); // Reset non-labor expansions
// //   }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows, type]); // Removed fiscalYear from dependencies as it's handled by allApiData now

// //   const toggleStaffRow = (id) => {
// //     setExpandedStaffRows(prev =>
// //       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
// //     );
// //   };

// //   const toggleEmployeeDetail = (id) => {
// //     setExpandedEmployeeDetails(prev =>
// //       prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
// //     );
// //   };

// //   // New toggle function for non-labor account rows
// //   const toggleNonLaborAcctRow = (id) => {
// //     setExpandedNonLaborAcctRows(prev =>
// //         prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
// //     );
// //   };

// //   const formatValue = (value, isHours = false, isPercentage = false) => {
// //     if (typeof value === 'number') {
// //       let formatted;
// //       if (isPercentage) {
// //         formatted = (value * 100).toLocaleString('en-US', {
// //           minimumFractionDigits: 2,
// //           maximumFractionDigits: 2,
// //         });
// //         return `${formatted}%`;
// //       }
// //       formatted = value.toLocaleString('en-US', {
// //         minimumFractionDigits: 2,
// //         maximumFractionDigits: 2,
// //       });
// //       return isHours ? `${formatted} hrs` : formatted;
// //     }
// //     return isHours ? '0.00 hrs' : (isPercentage ? '0.00%' : '0.00');
// //   };

// //   // Adjusted for more transparency
// //   const getGlassmorphismClasses = () => `
// //     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
// //     border border-opacity-10 border-white shadow-lg
// //   `;

// //   if (isLoading) { // Use prop for loading
// //     return (
// //       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
// //         Loading data...
// //       </div>
// //     );
// //   }

// //   if (error) { // Use prop for error
// //     return (
// //       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
// //         Error: {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
// //       {/* New container for the main content with glassmorphism */}
// //       <div className={`p-6 ${getGlassmorphismClasses()}`}>
// //         {/* Page Title - Hidden */}
// //         {/* <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg text-gray-900">Analysis by Period</h1> */}

// //         {/* Dropdown Selectors and Buttons - Hidden */}
// //         <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden">
// //           {/* Org ID Dropdown - Still commented out as per previous instruction */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="orgId-select" className="text-lg font-semibold mr-4">Select Org:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="orgId-select"
// //                 value={selectedOrgId}
// //                 onChange={(e) => setSelectedOrgId(e.target.value)}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //               >
// //                 <option value="" className="bg-gray-800 text-white">-- Select Org --</option>
// //                 {availableOrgIds.map(orgId => (
// //                   <option key={orgId} value={orgId} className="bg-gray-800 text-white">
// //                     {orgId}
// //                   </option>
// //                 ))}
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}

// //           {/* Plan ID Dropdown (Fixed/Disabled) - Commented Out */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="planId-select" className="text-lg font-semibold mr-4">Plan:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="planId-select"
// //                 value={planID}
// //                 onChange={() => {}}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //                 disabled
// //               >
// //                 <option value={planID} className="bg-gray-800 text-white">{planID}</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}
// //           {/* Template ID Dropdown (Fixed/Disabled) - Commented Out */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="templateId-select" className="text-lg font-semibold mr-4">Template:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="templateId-select"
// //                 value={templateId}
// //                 onChange={() => {}}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //                 disabled
// //               >
// //                 <option value={templateId} className="bg-gray-800 text-white">{templateId}</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}
// //           {/* Type Dropdown (Fixed/Disabled) - Commented Out */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="type-select" className="text-lg font-semibold mr-4">Type:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="type-select"
// //                 value={type}
// //                 onChange={() => {}}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //                 disabled
// //               >
// //                 <option value={type} className="bg-gray-800 text-white">{type}</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}

// //           {/* Revenue Type Selector */}
// //           {/* <div className="flex items-center">
// //             <label htmlFor="revenue-view-select" className="text-lg font-semibold mr-4 text-gray-800">Revenue View:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="revenue-view-select"
// //                 value={selectedRevenueView}
// //                 onChange={(e) => setSelectedRevenueView(e.target.value)}
// //                 className="block w-48 py-2 px-3 bg-transparent text-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //               >
// //                 <option value="t&m" className="bg-gray-100 text-gray-800">T&M Revenue</option>
// //                 <option value="cpff" className="bg-gray-100 text-gray-800">CPFF Revenue</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div> */}

// //           {/* Cancel Button for Pop-out */}
// //           {/* <button
// //               onClick={onCancel}
// //               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
// //           >
// //               Cancel
// //           </button> */}
// //         </div>

// //         {/* Main table container - Removed redundant getGlassmorphismClasses() here */}
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
// //             {/* Table Header */}
// //             {/* <thead>
// //               <tr className="bg-gray-100 bg-opacity-50">
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
// //                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
// //                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
// //                 {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
// //                   const parts = range.split('_');
// //                   const monthPart = parts[0].split('/')[0];
// //                   const yearPart = parts[1];
// //                   return (
// //                     <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
// //                       {`${monthPart}/${yearPart}`}
// //                     </th>
// //                   );
// //                 })}
// //               </tr>
// //             </thead> */}
// //             <thead>
// //   <tr className="bg-gray-100 bg-opacity-50">
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
// //     <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
// //     <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
// //     {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
// //       // The `range` variable is a string like "01/2025"
// //       // Split the string into two parts: month and year
// //       const [monthPart, yearPart] = range.split('/');
      
// //       return (
// //         <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
// //           {`${monthPart}/${yearPart}`}
// //         </th>
// //       );
// //     })}
// //   </tr>
// // </thead>
// //             {/* Table Body */}
// //             <tbody className="divide-y divide-gray-300 divide-opacity-10">
// //               {financialData.length === 0 ? (
// //                   <tr>
// //                       <td colSpan={dynamicDateRanges.length + 7} className="py-8 text-center text-gray-600 text-lg">
// //                           {isLoading ? 'Loading data...' : 'No data available for the selected criteria.'}
// //                       </td>
// //                   </tr>
// //               ) : (
// //                   financialData.map((row) => (
// //                   <React.Fragment key={row.id}>
// //                       <tr
// //                       className={`
// //                           group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
// //                           ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
// //                           ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
// //                       `}
// //                       onClick={() => (row.type === 'expandable' && row.id.startsWith('total-staff-cost')) ? toggleStaffRow(row.id) : (row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') ? toggleNonLaborAcctRow(row.id) : null)}
// //                       >
// //                       <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                           {row.type === 'expandable' && (
// //                           <span className="mr-2">
// //                               {/* Conditional rendering for chevron icon based on row type */}
// //                               {(row.id.startsWith('total-staff-cost') && expandedStaffRows.includes(row.id)) ||
// //                                (row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id)) ? (
// //                               <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                               ) : (
// //                               <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                               )}
// //                           </span>
// //                           )}
// //                           {row.description}
// //                       </td>
// //                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.accountId || ''}</td>
// //                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.orgId || ''}</td>
// //                        {/* <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800"></td> */}
// //                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.glcPlc || ''}</td>
// //                       <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.hrlyRate)}</td>
// //                       <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${
// //                           typeof row.total === 'number' && row.total < 0 ? 'text-red-600' :
// //                           (typeof row.total === 'number' && row.total > 0 && row.description === 'Profit' ? 'text-green-600' : '')
// //                       }`}>
// //                            {/* Apply percentage formatting for Profit % rows in Total column */}
// //                           {row.description.includes('Profit %') ? formatValue(row.total, false, true) : formatValue(row.total)}
// //                       </td>
// //                       {dynamicDateRanges.map((range) => {
// //                           let dataForRange;

// //                           if (row.description === 'Revenue') {
// //                               if (selectedRevenueView === 't&m' && row.tnmRevenueData) {
// //                                   dataForRange = row.tnmRevenueData[range];
// //                               } else if (selectedRevenueView === 'cpff' && row.cpffRevenueData) {
// //                                   dataForRange = row.cpffRevenueData[range];
// //                               } else {
// //                                   dataForRange = row.data[range];
// //                               }
// //                           } else {
// //                               dataForRange = row.data[range];
// //                           }
// //                           console.log(`  Rendering cell for row: ${row.description}, range: ${range}, data: ${dataForRange}`); // Added log

// //                           const isProfitRow = row.id.startsWith('profit-');
// //                           const isNegative = typeof dataForRange === 'number' && dataForRange < 0;
// //                           const isPositive = typeof dataForRange === 'number' && dataForRange > 0;
// //                           let textColorClass = '';
// //                           if (isProfitRow) {
// //                               if (isNegative) {
// //                                   textColorClass = 'text-red-600';
// //                               } else if (isPositive) {
// //                                   textColorClass = 'text-green-600';
// //                               }
// //                           }
// //                           return (
// //                           <td key={range} className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${textColorClass}`}>
// //                               {/* Apply percentage formatting for Profit % rows in monthly data */}
// //                               {row.description.includes('Profit %') ? formatValue(dataForRange, false, true) : formatValue(dataForRange)}
// //                           </td>
// //                           );
// //                       })}
// //                       </tr>

// //                       {/* Render expanded employees for Total Staff Cost row */}
// //                       {row.type === 'expandable' && expandedStaffRows.includes(row.id) && row.employees && row.employees.length > 0 && (
// //                         <>
// //                           {row.employees.map((employee) => (
// //                             <React.Fragment key={`${row.id}-${employee.id}`}>
// //                               {/* Individual Employee Row */}
// //                               <tr
// //                                   className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
// //                                   onClick={() => toggleEmployeeDetail(`${row.id}-${employee.id}`)}
// //                               >
// //                                   <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                                   <span className="mr-2">
// //                                       {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) ? (
// //                                       <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                       ) : (
// //                                       <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                       )}
// //                                   </span>
// //                                   {employee.name}
// //                                   </td>
// //                                   {/* Display Account ID for the employee */}
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.accountId || ''}</td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.orgId || ''}</td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.glcPlc || ''}</td>
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td>
// //                                   {/* This cell now correctly displays the total cost for the employee */}
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                   {formatValue(employee.cost)}
// //                                   </td>
// //                                   {dynamicDateRanges.map((currentRange) => (
// //                                       <td key={`${employee.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                           {formatValue(employee.monthlyCost[currentRange] || 0)}
// //                                       </td>
// //                                   ))}
// //                               </tr>

// //                               {/* Employee Hours Row (nested detail) */}
// //                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && (
// //                                 <tr key={`${employee.id}-hours-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
// //                                   <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
// //                                     --- Employee Hours
// //                                   </td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                     {/* This is the correct place for total hours in detail */}
// //                                     {formatValue(Object.values(employee.monthlyHours).reduce((sum, val) => sum + val, 0))}
// //                                   </td>
// //                                   {dynamicDateRanges.map((currentRange) => (
// //                                     <td key={`${employee.id}-hours-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                       {formatValue(employee.monthlyHours[currentRange] || 0, true)}
// //                                     </td>
// //                                   ))}
// //                                 </tr>
// //                               )}

// //                               {/* Nested Employee Cost Details (Raw Cost, Fringe, Overhead, G&A) as horizontal rows */}
// //                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && Object.keys(employee.detailSummary).length > 0 && (
// //                                   <>
// //                                     {Object.keys(employee.detailSummary).map(detailDescription => {
// //                                       const detailTotal = Object.values(employee.detailSummary[detailDescription]).reduce((sum, val) => sum + val, 0);

// //                                       return (
// //                                       <tr key={`${employee.id}-${detailDescription}-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
// //                                         <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
// //                                           --- {detailDescription}
// //                                         </td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-700">{employee.accountId || ''}</td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                         {/* Removed the extra empty <td> here */}
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap"></td> {/* This was the extra td */}
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                           {formatValue(detailTotal)}
// //                                         </td>
// //                                         {dynamicDateRanges.map((currentRange) => (
// //                                             <td key={`${employee.id}-${detailDescription}-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                               {formatValue(employee.detailSummary[detailDescription][currentRange] || 0)}
// //                                             </td>
// //                                         ))}
// //                                       </tr>
// //                                     );})}
// //                                   </>
// //                               )}
// //                             </React.Fragment>
// //                           ))}
// //                         </>
// //                       )}

// //                     {/* Render expanded Non-Labor Staff Cost rows */}
// //                     {row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id) && row.nonLaborAccts && row.nonLaborAccts.length > 0 && (
// //                         <>
// //                             {row.nonLaborAccts.map((acctGroup) => (
// //                                 <React.Fragment key={`${row.id}-${acctGroup.id}`}>
// //                                     {/* Account Group Row for Non-Labor (e.g., "Account: 647-004-140 - Hotel") */}
// //                                     <tr
// //                                         className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
// //                                         onClick={() => toggleNonLaborAcctRow(`${row.id}-${acctGroup.id}`)} // Toggle for sub-level expansion
// //                                     >
// //                                         <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                                             <span className="mr-2">
// //                                                 {expandedNonLaborAcctRows.includes(`${acctGroup.id}`) ? ( // Check for acctGroup.id directly
// //                                                     <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                                 ) : (
// //                                                     <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                                 )}
// //                                             </span>
// //                                             {acctGroup.description}
// //                                         </td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.id || ''}</td> {/* Account ID */}
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.orgId || ''}</td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.glcPlc || ''}</td>
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* No Hrly Rate for Non-Labor */}
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.total)}</td>
// //                                         {dynamicDateRanges.map((currentRange) => (
// //                                             <td key={`${acctGroup.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                                 {formatValue(acctGroup.monthlyData[currentRange] || 0)}
// //                                             </td>
// //                                         ))}
// //                                     </tr>

// //                                     {/* Employee Grouping within Account Group - Now always visible if account is expanded */}
// //                                     {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) && acctGroup.employees && acctGroup.employees.length > 0 && (
// //                                         <React.Fragment> {/* Changed from <> to React.Fragment for consistency and clarity */}
// //                                             <tr className="bg-gray-100 bg-opacity-30">
// //                                                 {/* Adjusted colSpan to align 'Employee' with 'Description' in the main table */}
// //                                                 <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase sticky left-0 z-10 bg-inherit">Employee</td>
// //                                                 <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Span remaining header columns before Total */}
// //                                                 <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase"></td>
// //                                                  {/* <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td> */}
// //                                                 {/* {dynamicDateRanges.map((range) => (
// //                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
// //                                                         {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`}
// //                                                     </td>
// //                                                 ))} */}
// //                                                 {dynamicDateRanges.map((range) => (
// //                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
// //                                                         {/* {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`} */}
// //                                                     </td>
// //                                                 ))}
// //                                             </tr>
// //                                             {acctGroup.employees.map((employeeGroup) => (
// //                                                 // Removed React.Fragment here as the outer React.Fragment handles it
// //                                                 <tr key={`${acctGroup.id}-${employeeGroup.id}`}
// //                                                     className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs"
// //                                                 >
// //                                                     {/* Adjusted empty cell for alignment */}
// //                                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                                                         {employeeGroup.name}
// //                                                     </td>
// //                                                     <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Span remaining header columns before Total */}
// //                                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(employeeGroup.total)}</td>
// //                                                     {dynamicDateRanges.map((currentRange) => (
// //                                                         <td key={`${employeeGroup.id}-${currentRange}-monthly-total`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                                             {formatValue(employeeGroup.monthlyData[currentRange] || 0)}
// //                                                         </td>
// //                                                     ))}
// //                                                 </tr>
// //                                             ))}
// //                                         </React.Fragment>
// //                                     )}
// //                                 </React.Fragment>
// //                             ))}
// //                         </>
// //                     )}
// //                   </React.Fragment>
// //                   ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnalysisByPeriodContent;


// // 'use client';

// // import { useState, useEffect, useCallback } from 'react';
// // import React from 'react';
// // import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
// // import { data } from 'react-router-dom';

// // const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error, fiscalYear }) => {
// //   // Added console.log for fiscalYear prop at the very top
// //   console.log("AnalysisByPeriodContent: Received fiscalYear prop:", fiscalYear);
// //   console.log("AnalysisByPeriodContent: Received initialApiData prop:", initialApiData);


// //   const [expandedStaffRows, setExpandedStaffRows] = useState([]);
// //   const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
// //   const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
// //   const [financialData, setFinancialData] = useState([]);

// //   const [allApiData, setAllApiData] = useState(null); // This will now hold the fiscalYear-filtered data
// //   const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

// //   const [selectedOrgId, setSelectedOrgId] = useState('');
// //   const [availableOrgIds, setAvailableOrgIds] = useState([]);

// //   const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');

// //   /**
// //    * Helper to map month and year to a date range string (e.g., "05/01-05/31_2025")
// //    * Uses Date object to accurately determine the last day of the month, accounting for leap years.
// //    */
// //   // const getMonthRangeKey = (month, year) => {
// //   //   // Month is 1-indexed for input, but 0-indexed for Date constructor (month - 1)
// //   //   // Day 0 of the *next* month gives the last day of the *current* month
// //   //   const lastDay = new Date(year, month, 0).getDate();
// //   //   const monthString = month.toString().padStart(2, '0');
// //   //   return `${monthString}/01-${monthString}/${lastDay}_${year}`;
// //   // };

// //   // Replace your existing getMonthRangeKey function with this one
// // function getMonthRangeKey(period, year) {
// //   // Add this check to prevent crashes if period or year are missing
// //   if (period === undefined || year === undefined) {
// //     return null;
// //   }
// //   const month = String(period).padStart(2, '0');
// //   const monthRange = `${month}/${year}`;
// //   return monthRange;
// // }

// //   /**
// //    * Transforms the raw API response (which is now pre-filtered by fiscal year)
// //    * into the FinancialRow structure expected by the frontend.
// //    * This function filters the provided apiResponse based on currentOrgId.
// //    * It also dynamically calculates profit based on the selected revenue view.
// //    * 
// //    * 

// //    */

// //   // Old code //
// // //   const transformApiDataToFinancialRows = useCallback((
// // //     apiResponse, // This apiResponse is now the pre-filtered allApiData
// // //     currentOrgId,
// // //     dynamicDateRanges,
// // //     selectedRevenueView,
// // //     planType,
// // //     apiTotalRevenue // Added planType here
    
// // //     // selectedFiscalYear is implicitly handled by apiResponse being pre-filtered
// // //   ) => {
// // //     console.log("transformApiDataToFinancialRows: apiResponse (already fiscalYear-filtered)", apiResponse);
// // //     console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
// // //     console.log("transformApiDataToFinancialRows: dynamicDateRanges (columns)", dynamicDateRanges);
// // //     console.log("transformApiDataToFinancialRows: planType", planType);


// // //     const financialRows = [];

// // //     const revenueData = {};
// // //     const tnmRevenueData = {};
// // //     const cpffRevenueData = {};
// // //     const totalExpenseData = {};
// // //     const profitData = {};
// // //     const profitOnCostData = {};
// // //     const profitOnRevenueData = {};

// // //     // Initialize monthly data accumulators for all dynamicDateRanges
// // //     dynamicDateRanges.forEach(range => {
// // //       revenueData[range] = 0;
// // //       tnmRevenueData[range] = 0;
// // //       cpffRevenueData[range] = 0;
// // //       totalExpenseData[range] = 0;
// // //       profitData[range] = 0;
// // //       profitOnCostData[range] = 0;
// // //       profitOnRevenueData[range] = 0;
// // //     });

// // //     const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => {
// // //       acc[range] = 0;
// // //       return acc;
// // //     }, {});

// // //     const totalStaffHoursByMonth = dynamicDateRanges.reduce((acc, range) => {
// // //       acc[range] = 0;
// // //       return acc;
// // //     }, {});

// // //     const uniqueEmployeesMap = new Map();
// // //     const nonLaborAcctDetailsMap = new Map(); // Map to group non-labor details by account ID and then by month

// // //     // Filter employee summaries based on orgId (fiscal year already handled by parent useEffect)
// // //     const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
// // //       const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
// // //       return isOrgMatch;
// // //     });
// // //     console.log("transformApiDataToFinancialRows: filteredEmployeeSummaries (after org filter, fiscal year already applied)", filteredEmployeeSummaries);

// // //     // const [totalRevenueFromApi, setTotalRevenueFromApi] = useState(0); //

// // //    if (apiResponse && apiResponse.monthlyRevenueSummary) {
// // //   apiResponse.monthlyRevenueSummary.forEach(monthSummary => {
// // //     // Find the corresponding month range directly from the dynamicDateRanges array
// // //     const matchingRange = dynamicDateRanges.find(
// // //       (range) => range.period === monthSummary.period && range.year === monthSummary.year
// // //     );

// // //     if (matchingRange) {
// // //       // Use the exact monthRange key from the dynamicDateRanges array to populate the data
// // //       revenueData[matchingRange.monthRange] = monthSummary.revenue || 0;
// // //     } else {
// // //       console.warn(`No matching month range found for period ${monthSummary.period} and year ${monthSummary.year}`);
// // //     }
// // //   });
// // // }
// // //     if (filteredEmployeeSummaries.length > 0) {
// // //       filteredEmployeeSummaries.forEach(empSummary => {
// // //         // Use emplId as the unique key for the employee map
// // //         if (!uniqueEmployeesMap.has(empSummary.emplId)) {
// // //           uniqueEmployeesMap.set(empSummary.emplId, {
// // //             id: empSummary.emplId,
// // //             name: `${empSummary.name} (${empSummary.emplId})`, // Format name (EMPLID)
// // //             cost: 0,
// // //             accountId: empSummary.accID || '', // Use accID from empSummary
// // //             orgId: empSummary.orgId || '',
// // //             glcPlc: empSummary.plcCode || '',
// // //             hrlyRate: empSummary.perHourRate || 0,
// // //             monthlyHours: {},
// // //             monthlyCost: {},
// // //             detailSummary: {},
// // //           });
// // //         }
// // //         const employee = uniqueEmployeesMap.get(empSummary.emplId);

// // //         // New Lines to ADD before the forEach loop
// // //         const totalEmployeeRevenue = empSummary.revenue || 0;
// // //         const totalEmployeeBurdenCost = empSummary.totalBurdonCost || 0; 


// // //         if (empSummary.emplSchedule && Array.isArray(empSummary.emplSchedule.payrollSalary)) {
// // //           empSummary.emplSchedule.payrollSalary.forEach(salaryEntry => {
// // //             // No need for fiscalYear check here, as data is already pre-filtered
// // //             const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);


// // //             if (monthRange) {
// // //               tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
// // //               cpffRevenueData[monthRange] = (cpffRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0); // Assuming cpffRevenue exists  
// // //               // revenueData[monthRange] = (revenueData[monthRange] || 0) + (salaryEntry.revenue || 0); // Total revenue for display
            
        
// // //               totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// // //               totalStaffCostByMonth[monthRange] = (totalStaffCostByMonth[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// // //               totalStaffHoursByMonth[monthRange] = (totalStaffHoursByMonth[monthRange] || 0) + (salaryEntry.hours || 0);

// // //               employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// // //               employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

// // //               if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
// // //               employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

// // //               if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
// // //               employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

// // //               if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
// // //               employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

// // //               if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
// // //               employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
// // //             }
// // //           });
// // //         }
// // //       });
// // //     }

// // //     // Process direct and indirect cost data for Non-Labor Staff Cost
// // //     let totalNonLaborCostOverall = 0;
// // //     const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => {
// // //       acc[range] = 0;
// // //       return acc;
// // //     }, {});

// // //     // Filter non-labor summaries based on orgId (fiscal year already handled by parent useEffect)
// // //     const allNonLaborSummariesFiltered = [
// // //       ...(apiResponse.directCOstForecastSummary || []),
// // //       ...(apiResponse.indirectCostForecastSummary || [])
// // //     ].filter(nonLaborSummary => {
// // //       const isOrgMatch = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
// // //       return isOrgMatch;
// // //     });

// // //       console.log("transformApiDataToFinancialRows: apiResponse", apiResponse);
// // //     console.log("transformApiDataToFinancialRows: allNonLaborSummariesFiltered (after org filter, fiscal year already applied)", allNonLaborSummariesFiltered);


// // //     allNonLaborSummariesFiltered.forEach(nonLaborSummary => { // Use the already filtered list
// // //         const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
// // //                           (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
// // //         console.log(`Processing non-labor summary for accID: ${nonLaborSummary.accID}, orgID: ${nonLaborSummary.orgID}. Forecast schedules found:`, schedules);

// // //         const accountId = nonLaborSummary.accID;
// // //         const orgId = nonLaborSummary.orgID;
// // //         const glcPlc = nonLaborSummary.plcCode || '';
// // //         const accName = nonLaborSummary.accName || `Account: ${accountId}`;

// // //         if (!nonLaborAcctDetailsMap.has(accountId)) {
// // //             nonLaborAcctDetailsMap.set(accountId, {
// // //                 id: accountId,
// // //                 description: accName,
// // //                 orgId: orgId,
// // //                 glcPlc: glcPlc,
// // //                 total: 0, // Total for this account across all periods
// // //                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}), // Total for this account per month
// // //                 employees: new Map(), // Map to hold employee-level data within this account (even for non-labor, to group DCTs)
// // //             });
// // //             console.log(`  New non-labor account group created: ${accountId}`);
// // //         }
// // //         const acctGroup = nonLaborAcctDetailsMap.get(accountId);

// // //         // Group schedules by employee within the account group (even if it's a single DCT entry, it needs a 'group')
// // //         const employeeId = nonLaborSummary.emplId || 'N/A_Employee'; // Use a default if emplId is missing
// // //         const employeeName = nonLaborSummary.name || ` ${accountId}`; // More generic name

// // //         if (!acctGroup.employees.has(employeeId)) {
// // //             acctGroup.employees.set(employeeId, {
// // //                 id: employeeId,
// // //                 name: `${employeeName} (${employeeId})`,
// // //                 total: 0,
// // //                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// // //                 entries: [], // These are the original DCT-level entries for this specific employee/group
// // //             });
// // //         }
// // //         const employeeGroup = acctGroup.employees.get(employeeId);


// // //         schedules.forEach(scheduleEntry => {
// // //             // No need for fiscalYear check here, as data is already pre-filtered
// // //             const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// // //             if (monthRange) {
// // //                 let entryCost = 0;
// // //                 if (planType === 'EAC') {
// // //                     entryCost = scheduleEntry.actualamt || 0;
// // //                 } else if (planType === 'BUD') {
// // //                     entryCost = scheduleEntry.forecastedamt || 0;
// // //                 } else {
// // //                     // Fallback to original calculation if planType is not EAC or BUD
// // //                     entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
// // //                 }

// // //                 console.log(`  Schedule entry for ${monthRange}: planType=${planType}, actualamt=${scheduleEntry.actualamt}, forecastedamt=${scheduleEntry.forecastedamt}. Calculated entryCost: ${entryCost}`);

// // //                 // Add the individual schedule entry to the employee's entries array
// // //                 employeeGroup.entries.push({
// // //                     id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`, // Unique ID for this specific monthly entry
// // //                     dctId: scheduleEntry.dctId,
// // //                     forecastid: scheduleEntry.forecastid,
// // //                     monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
// // //                     total: entryCost, // Total for this specific entry (for that month)
// // //                     monthlyValues: { [monthRange]: entryCost } // This will populate the correct month column for this specific entry
// // //                 });

// // //                 // Aggregate totals for the employee group
// // //                 employeeGroup.monthlyData[monthRange] += entryCost;
// // //                 employeeGroup.total += entryCost;

// // //                 // Aggregate totals for the account group (still at account level)
// // //                 acctGroup.monthlyData[monthRange] += entryCost;
// // //                 acctGroup.total += entryCost;

// // //                 totalNonLaborCostByMonth[monthRange] = (totalNonLaborCostByMonth[monthRange] || 0) + entryCost;
// // //                 totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + entryCost; // Ensure this is current month's totalExpenseData
// // //             }
// // //         });
// // //     });

// // //     Array.from(uniqueEmployeesMap.values()).forEach(employee => {
// // //       employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
// // //     });

// // //     Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
// // //         // Recalculate total for acctGroup in case it wasn't fully accumulated (though it should be)
// // //         acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
// // //         // Convert employee maps to arrays for rendering
// // //         acctGroup.employees = Array.from(acctGroup.employees.values());
// // //     });

// // //     totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
// // //     console.log("transformApiDataToFinancialRows: totalNonLaborCostOverall", totalNonLaborCostOverall);
// // //     console.log("transformApiDataToFinancialRows: totalNonLaborCostByMonth", totalNonLaborCostByMonth);
// // //     console.log("transformApiDataToFinancialRows: nonLaborAcctDetailsMap contents (after processing)", Array.from(nonLaborAcctDetailsMap.values()));

// // //     // Recalculate overall totals AFTER all filtering and monthly aggregation
// // //     // This ensures overall totals reflect only the selected fiscal year
// // //     const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
// // //     const totalStaffHoursOverall = Object.values(totalStaffHoursByMonth).reduce((sum, val) => sum + val, 0);

// // //     const totalRevenueOverall = Object.values(revenueData).reduce((sum, val) => sum + val, 0); // Calculate from aggregated monthly data
// // //     const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
// // //     const totalProfitOverall = totalRevenueOverall - totalExpenseOverall; // Calculate from newly aggregated revenue and expense

// // //     // Populate profitData for each month based on monthly revenue and expense
// // //     dynamicDateRanges.forEach(range => {
// // //       profitData[range] = (revenueData[range] || 0) - (totalExpenseData[range] || 0);
// // //     });
    
// // //     const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
// // //     const overallProfitOnRevenue = totalRevenueOverall !== 0 // Use totalRevenueOverall here
// // //       ? (totalProfitOverall / totalRevenueOverall)
// // //       : 0;

// // //     financialRows.push({
// // //       id: `revenue-${currentOrgId}`,
// // //       description: 'Revenue',
// // //       total: apiTotalRevenue,
// // //       data: revenueData,
// // //       tnmRevenueData: tnmRevenueData,
// // //       cpffRevenueData: cpffRevenueData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     financialRows.push({
// // //       id: `total-staff-cost-${currentOrgId}`,
// // //       description: 'Total Staff Cost',
// // //       total: totalStaffCostOverall,
// // //       totalHours: totalStaffHoursOverall,
// // //       data: totalStaffCostByMonth,
// // //       type: 'expandable',
// // //       employees: Array.from(uniqueEmployeesMap.values()),
// // //       orgId: currentOrgId,
// // //     });

// // //     // New Non-Labor Staff Cost row
// // //     financialRows.push({
// // //         id: `non-labor-staff-cost-${currentOrgId}`,
// // //         description: 'Non-Labor Staff Cost',
// // //         total: totalNonLaborCostOverall,
// // //         data: totalNonLaborCostByMonth,
// // //         type: 'expandable',
// // //         nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()), // Attach processed non-labor data
// // //         orgId: currentOrgId,
// // //     });


// // //     financialRows.push({
// // //       id: `total-expense-${currentOrgId}`,
// // //       description: 'Total Expense',
// // //       total: totalExpenseOverall,
// // //       data: totalExpenseData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     financialRows.push({
// // //       id: `profit-${currentOrgId}`,
// // //       description: 'Profit',
// // //       total: totalProfitOverall,
// // //       data: profitData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     dynamicDateRanges.forEach(range => {
// // //       const profit = (profitData[range] || 0);
// // //       const expense = (totalExpenseData[range] || 0);
// // //       profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
// // //     });

// // //     financialRows.push({
// // //       id: `profit-cost-${currentOrgId}`,
// // //       description: 'Profit % on Cost',
// // //       total: overallProfitOnCost, // Store as decimal, format for display
// // //       data: profitOnCostData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     dynamicDateRanges.forEach(range => {
// // //       const profit = (profitData[range] || 0);
// // //       let revenueForPercentage = 0;
// // //       if (selectedRevenueView === 't&m') {
// // //         revenueForPercentage = (tnmRevenueData[range] || 0);
// // //       } else if (selectedRevenueView === 'cpff') {
// // //         revenueForPercentage = (cpffRevenueData[range] || 0);
// // //       }
// // //       profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
// // //     });

// // //     financialRows.push({
// // //       id: `profit-revenue-${currentOrgId}`,
// // //       description: 'Profit % on Revenue',
// // //       total: overallProfitOnRevenue, // Store as decimal, format for display
// // //       data: profitOnRevenueData,
// // //       type: 'summary',
// // //       orgId: currentOrgId,
// // //     });

// // //     console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
// // //     return financialRows;
// // //   }, [selectedRevenueView]);

// // // Old code ends //

// // // Current Code //
// // const transformApiDataToFinancialRows = useCallback((
// //   apiResponse,
// //   currentOrgId,
// //   dynamicDateRanges,
// //   selectedRevenueView,
// //   planType
// // ) => {
// //   console.log("transformApiDataToFinancialRows: RAW apiResponse", apiResponse);
// //   console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
// //   console.log("transformApiDataToFinancialRows: dynamicDateRanges (columns)", dynamicDateRanges);
// //   console.log("transformApiDataToFinancialRows: planType", planType);

// //   const financialRows = [];

// //   // Initialize all data objects to ensure all date ranges are covered
// //   const monthlyRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const totalExpenseData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const profitData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const profitOnCostData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const profitOnRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
// //   const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
  
// //   // Use the top-level 'revenue' field for the overall total, as confirmed by the user
// //   const totalRevenueOverall = apiResponse.revenue || 0;

// //   // Process monthly data from the monthlyRevenueSummary array as requested
// //   const monthlyRevenueSummary = apiResponse.monthlyRevenueSummary || [];
// //   monthlyRevenueSummary.forEach(monthData => {
// //     const monthRange = getMonthRangeKey(monthData.month, monthData.year);
// //     if (monthRange && dynamicDateRanges.includes(monthRange)) {
// //       // Populate Revenue data
// //       monthlyRevenueData[monthRange] = monthData.revenue || 0;
      
// //       // Populate Staff Cost and Non-Labor Cost data as requested
// //       const staffCost = monthData.cost || 0;
// //       const nonLaborCost = monthData.otherDifrectCost || 0;

// //       totalStaffCostByMonth[monthRange] = staffCost;
// //       totalNonLaborCostByMonth[monthRange] = nonLaborCost;
      
// //       // Calculate total expense for the month
// //       totalExpenseData[monthRange] = staffCost + nonLaborCost;
// //     }
// //   });

// //   // Calculate overall totals from the monthly data
// //   const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
// //   const totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
// //   const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
// //   const totalProfitOverall = totalRevenueOverall - totalExpenseOverall;

// //   // The rest of the function remains the same, but the cost calculations are now based on monthlyRevenueSummary
  
// //   const uniqueEmployeesMap = new Map();
// //   const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
// //     const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
// //     return isOrgMatch;
// //   });
  
// //   if (filteredEmployeeSummaries.length > 0) {
// //     filteredEmployeeSummaries.forEach(empSummary => {
// //       // Use emplId as the unique key for the employee map
// //       if (!uniqueEmployeesMap.has(empSummary.emplId)) {
// //         uniqueEmployeesMap.set(empSummary.emplId, {
// //           id: empSummary.emplId,
// //           name: `${empSummary.name} (${empSummary.emplId})`,
// //           cost: 0,
// //           accountId: empSummary.accID || '',
// //           orgId: empSummary.orgId || '',
// //           glcPlc: empSummary.plcCode || '',
// //           hrlyRate: empSummary.perHourRate || 0,
// //           monthlyHours: {},
// //           monthlyCost: {},
// //           detailSummary: {},
// //         });
// //       }
// //       const employee = uniqueEmployeesMap.get(empSummary.emplId);

// //       const payrollSalaries = empSummary.emplSchedule?.payrollSalary || [];
// //       payrollSalaries.forEach(salaryEntry => {
// //         const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

// //         if (monthRange && dynamicDateRanges.includes(monthRange)) {
// //           const monthlyBurdenCost = salaryEntry.totalBurdenCost || salaryEntry.cost || 0;
// //           employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + monthlyBurdenCost;
// //           employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

// //           // Populate employee details
// //           if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
// //           employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

// //           if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
// //           employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

// //           if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
// //           employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

// //           if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
// //           employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
// //         }
// //       });
// //     });
// //   }
  
// //   // The non-labor cost summary loop is no longer needed for monthly totals, but is kept to get detailed data
// //   const nonLaborAcctDetailsMap = new Map();
// //   const allNonLaborSummariesFiltered = [
// //     ...(apiResponse.directCOstForecastSummary || []),
// //     ...(apiResponse.indirectCostForecastSummary || [])
// //   ].filter(nonLaborSummary => {
// //     const isOrgMatch = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
// //     return isOrgMatch;
// //   });

// //   allNonLaborSummariesFiltered.forEach(nonLaborSummary => {
// //     const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
// //                       (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
// //     const accountId = nonLaborSummary.accID;
// //     const orgId = nonLaborSummary.orgID;
// //     const glcPlc = nonLaborSummary.plcCode || '';
// //     const accName = nonLaborSummary.accName || `Account: ${accountId}`;

// //     if (!nonLaborAcctDetailsMap.has(accountId)) {
// //       nonLaborAcctDetailsMap.set(accountId, {
// //         id: accountId,
// //         description: accName,
// //         orgId: orgId,
// //         glcPlc: glcPlc,
// //         total: 0,
// //         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// //         employees: new Map(),
// //       });
// //     }
// //     const acctGroup = nonLaborAcctDetailsMap.get(accountId);
// //     const employeeId = nonLaborSummary.emplId || 'N/A_Employee';
// //     const employeeName = nonLaborSummary.name || ` ${accountId}`;

// //     if (!acctGroup.employees.has(employeeId)) {
// //       acctGroup.employees.set(employeeId, {
// //         id: employeeId,
// //         name: `${employeeName} (${employeeId})`,
// //         total: 0,
// //         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// //         entries: [],
// //       });
// //     }
// //     const employeeGroup = acctGroup.employees.get(employeeId);

// //     schedules.forEach(scheduleEntry => {
// //       const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //       if (monthRange && dynamicDateRanges.includes(monthRange)) {
// //         let entryCost = 0;
// //         if (planType === 'EAC') {
// //           entryCost = scheduleEntry.actualamt || 0;
// //         } else if (planType === 'BUD') {
// //           entryCost = scheduleEntry.forecastedamt || 0;
// //         } else {
// //           entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
// //         }
// //         employeeGroup.entries.push({
// //           id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`,
// //           dctId: scheduleEntry.dctId,
// //           forecastid: scheduleEntry.forecastid,
// //           monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
// //           total: entryCost,
// //           monthlyValues: { [monthRange]: entryCost }
// //         });
// //         employeeGroup.monthlyData[monthRange] += entryCost;
// //         employeeGroup.total += entryCost;
// //         acctGroup.monthlyData[monthRange] += entryCost;
// //         acctGroup.total += entryCost;
// //       }
// //     });
// //   });

// //   Array.from(uniqueEmployeesMap.values()).forEach(employee => {
// //     employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
// //   });
// //   Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
// //     acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
// //     acctGroup.employees = Array.from(acctGroup.employees.values());
// //   });

// //   const selectedRevenueData = selectedRevenueView === 't&m' ? monthlyRevenueData : monthlyRevenueData;
  
// //   dynamicDateRanges.forEach(range => {
// //     profitData[range] = (selectedRevenueData[range] || 0) - (totalExpenseData[range] || 0);
// //   });
  
// //   const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
// //   const overallProfitOnRevenue = totalRevenueOverall !== 0
// //     ? (totalProfitOverall / totalRevenueOverall)
// //     : 0;

// //   financialRows.push({
// //     id: `revenue-${currentOrgId}`,
// //     description: 'Revenue',
// //     total: totalRevenueOverall,
// //     data: selectedRevenueData,
// //     tnmRevenueData: monthlyRevenueData,
// //     cpffRevenueData: monthlyRevenueData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `total-staff-cost-${currentOrgId}`,
// //     description: 'Total Staff Cost',
// //     total: totalStaffCostOverall,
// //     data: totalStaffCostByMonth,
// //     type: 'expandable',
// //     employees: Array.from(uniqueEmployeesMap.values()),
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `non-labor-staff-cost-${currentOrgId}`,
// //     description: 'Non-Labor Staff Cost',
// //     total: totalNonLaborCostOverall,
// //     data: totalNonLaborCostByMonth,
// //     type: 'expandable',
// //     nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()),
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `total-expense-${currentOrgId}`,
// //     description: 'Total Expense',
// //     total: totalExpenseOverall,
// //     data: totalExpenseData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   financialRows.push({
// //     id: `profit-${currentOrgId}`,
// //     description: 'Profit',
// //     total: totalProfitOverall,
// //     data: profitData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   dynamicDateRanges.forEach(range => {
// //     const profit = (profitData[range] || 0);
// //     const expense = (totalExpenseData[range] || 0);
// //     profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
// //   });

// //   financialRows.push({
// //     id: `profit-cost-${currentOrgId}`,
// //     description: 'Profit % on Cost',
// //     total: overallProfitOnCost,
// //     data: profitOnCostData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   dynamicDateRanges.forEach(range => {
// //     const profit = (profitData[range] || 0);
// //     let revenueForPercentage = (selectedRevenueData[range] || 0);
// //     profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
// //   });

// //   financialRows.push({
// //     id: `profit-revenue-${currentOrgId}`,
// //     description: 'Profit % on Revenue',
// //     total: overallProfitOnRevenue,
// //     data: profitOnRevenueData,
// //     type: 'summary',
// //     orgId: currentOrgId,
// //   });

// //   console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
// //   return financialRows;
// // }, [selectedRevenueView]);

// // function getMonthRangeKey(period, year) {
// //   if (period === undefined || year === undefined) {
// //     return null;
// //   }
// //   const month = String(period).padStart(2, '0');
// //   return `${month}/${year}`;
// // }
// // // You will still need to ensure your existing `getMonthRangeKey` helper function is correctly defined elsewhere in the file.
// // // Note: The getMonthRangeKey function is assumed to be defined elsewhere in your file.
// // // function getMonthRangeKey(period, year) {
// // //   // This helper function must also be updated to match the format from getMonthlyDateRanges
// // //   const month = String(period).padStart(2, '0');
// // //   const monthRange = `${month}/${year}`;
// // //   return monthRange;
// // // }



// //   // This useEffect now processes the initialApiData received from props
// //   useEffect(() => {
// //     console.log("useEffect [initialApiData, isLoading, error, fiscalYear]: Effect triggered.");
// //     if (isLoading) {
// //       console.log("useEffect: Data is still loading.");
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //       return;
// //     }

// //     // This error prop is from the parent component.
// //     // If there's an error from the parent, we should display it.
// //     if (error) {
// //       console.log("useEffect: Error received from parent:", error);
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //       return;
// //     }

// //     if (!initialApiData || Object.keys(initialApiData).length === 0) {
// //       console.log("useEffect: initialApiData is null, undefined, or empty.");
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //       return;
// //     }

// //     try {
// //       console.log("useEffect: Processing initialApiData for deep fiscal year filtering...");
      
// //       const processedApiData = { ...initialApiData }; // Start with a copy

// //       // Filter employee summaries and their internal payrollSalary
// //       processedApiData.employeeForecastSummary = (initialApiData.employeeForecastSummary || [])
// //         .map(empSummary => {
// //           const filteredPayrollSalary = (empSummary.emplSchedule?.payrollSalary || []).filter(salaryEntry => {
// //             return !fiscalYear || fiscalYear === "All" || String(salaryEntry.year) === fiscalYear;
// //           });

// //           if (filteredPayrollSalary.length > 0) {
// //             return {
// //               ...empSummary,
// //               emplSchedule: {
// //                 ...empSummary.emplSchedule,
// //                 payrollSalary: filteredPayrollSalary,
// //               },
// //             };
// //           }
// //           return null; // Mark for removal if no relevant data
// //         })
// //         .filter(Boolean); // Remove null entries

// //       console.log("useEffect: employeeForecastSummary after deep fiscalYear filter:", processedApiData.employeeForecastSummary);

// //       // Filter direct cost summaries and their internal forecasts
// //       processedApiData.directCOstForecastSummary = (initialApiData.directCOstForecastSummary || [])
// //         .map(nonLaborSummary => {
// //           const filteredForecasts = (nonLaborSummary.directCostSchedule?.forecasts || []).filter(f => {
// //             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
// //           });
// //           if (filteredForecasts.length > 0) {
// //             return {
// //               ...nonLaborSummary,
// //               directCostSchedule: {
// //                 ...nonLaborSummary.directCostSchedule,
// //                 forecasts: filteredForecasts,
// //               },
// //             };
// //           }
// //           return null;
// //         })
// //         .filter(Boolean);
// //       console.log("useEffect: directCOstForecastSummary after deep fiscalYear filter:", processedApiData.directCOstForecastSummary);

// //       // Filter indirect cost summaries and their internal forecasts
// //       processedApiData.indirectCostForecastSummary = (initialApiData.indirectCostForecastSummary || [])
// //         .map(nonLaborSummary => {
// //           const filteredForecasts = (nonLaborSummary.indirectCostSchedule?.forecasts || []).filter(f => {
// //             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
// //           });
// //           if (filteredForecasts.length > 0) {
// //             return {
// //               ...nonLaborSummary,
// //               indirectCostSchedule: {
// //                 ...nonLaborSummary.indirectCostSchedule,
// //                 forecasts: filteredForecasts,
// //               },
// //             };
// //           }
// //           return null;
// //         })
// //         .filter(Boolean);
// //       console.log("useEffect: indirectCostSummariesFiltered after deep fiscalYear filter:", processedApiData.indirectCostForecastSummary);


// //       setAllApiData(processedApiData); // Set the fiscalYear-filtered data to allApiData

// //       const uniqueOrgIds = new Set();
// //       const uniqueDateRangesSet = new Set();

// //       // Collect org IDs and date ranges from the NOW FULLY FILTERED employee data
// //       (processedApiData.employeeForecastSummary || []).forEach(summary => {
// //         uniqueOrgIds.add(summary.orgID);
// //         summary.emplSchedule?.payrollSalary?.forEach(salaryEntry => {
// //           const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
// //           uniqueDateRangesSet.add(monthRangeKey);
// //         });
// //       });

// //       // Collect org IDs and date ranges from the NOW FULLY FILTERED non-labor data
// //       (processedApiData.directCOstForecastSummary || []).forEach(nonLaborSummary => {
// //         uniqueOrgIds.add(nonLaborSummary.orgID);
// //         nonLaborSummary.directCostSchedule?.forecasts?.forEach(scheduleEntry => {
// //           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //           uniqueDateRangesSet.add(monthRangeKey);
// //         });
// //       });

// //       (processedApiData.indirectCostForecastSummary || []).forEach(nonLaborSummary => {
// //         uniqueOrgIds.add(nonLaborSummary.orgID);
// //         nonLaborSummary.indirectCostSchedule?.forecasts?.forEach(scheduleEntry => {
// //           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //           uniqueDateRangesSet.add(monthRangeKey);
// //         });
// //       });


// //       const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
// //           const [, , yearAStr] = a.split('_');
// //           const [monthAStr,] = a.split('/')[0].split('-');
// //           const yearA = parseInt(yearAStr, 10);
// //           const monthA = parseInt(monthAStr, 10);

// //           const [, , yearBStr] = b.split('_');
// //           const [monthBStr,] = b.split('/')[0].split('-');
// //           const yearB = parseInt(yearBStr, 10);
// //           const monthB = parseInt(monthBStr, 10);

// //           if (yearA !== yearB) return yearA - yearB;
// //           return monthA - monthB;
// //       });

// //       setDynamicDateRanges(sortedDateRanges);
// //       console.log("useEffect: dynamicDateRanges set to", sortedDateRanges);

// //       const orgs = Array.from(uniqueOrgIds).sort();
// //       setAvailableOrgIds(orgs);
// //       console.log("useEffect: availableOrgIds set to", orgs);

// //       if (orgs.length > 0) {
// //         setSelectedOrgId(orgs[0]);
// //         console.log("useEffect: selectedOrgId set to", orgs[0]);
// //       } else {
// //         setSelectedOrgId('');
// //         console.log("useEffect: selectedOrgId set to empty (no orgs found)");
// //       }
// //     } catch (e) {
// //       console.error("Error during initial API data processing:", e);
// //       setAllApiData(null);
// //       setDynamicDateRanges([]);
// //       setSelectedOrgId('');
// //       setAvailableOrgIds([]);
// //       setFinancialData([]);
// //     }
// //   }, [initialApiData, isLoading, error, fiscalYear]); // Depend on initialApiData, isLoading, error, and fiscalYear props

// //   useEffect(() => {
// //     console.log("useEffect [allApiData, selectedOrgId, dynamicDateRanges, ...]: Transform trigger effect.");
// //     if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
// //       console.log("useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data...");
// //       const transformedData = transformApiDataToFinancialRows(
// //         allApiData, // allApiData is now pre-filtered by fiscal year
// //         selectedOrgId,
// //         dynamicDateRanges,
// //         selectedRevenueView,
// //         type,
// //         initialApiData.revenue // Pass the 'type' prop (which is plType)
// //       );
// //       console.log("Transformed Data (after filter & transform):", transformedData);
// //       setFinancialData(transformedData);
// //     } else {
// //       console.log("useEffect (transform trigger): Waiting for allApiData, selectedOrgId, or dynamicDateRanges to be ready.");
// //       setFinancialData([]);
// //     }
// //     setExpandedStaffRows([]);
// //     setExpandedEmployeeDetails([]);
// //     setExpandedNonLaborAcctRows([]); // Reset non-labor expansions
// //   }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows, type]); // Removed fiscalYear from dependencies as it's handled by allApiData now

// //   const toggleStaffRow = (id) => {
// //     setExpandedStaffRows(prev =>
// //       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
// //     );
// //   };

// //   const toggleEmployeeDetail = (id) => {
// //     setExpandedEmployeeDetails(prev =>
// //       prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
// //     );
// //   };

// //   // New toggle function for non-labor account rows
// //   const toggleNonLaborAcctRow = (id) => {
// //     setExpandedNonLaborAcctRows(prev =>
// //         prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
// //     );
// //   };

// //   const formatValue = (value, isHours = false, isPercentage = false) => {
// //     if (typeof value === 'number') {
// //       let formatted;
// //       if (isPercentage) {
// //         formatted = (value * 100).toLocaleString('en-US', {
// //           minimumFractionDigits: 2,
// //           maximumFractionDigits: 2,
// //         });
// //         return `${formatted}%`;
// //       }
// //       formatted = value.toLocaleString('en-US', {
// //         minimumFractionDigits: 2,
// //         maximumFractionDigits: 2,
// //       });
// //       return isHours ? `${formatted} hrs` : formatted;
// //     }
// //     return isHours ? '0.00 hrs' : (isPercentage ? '0.00%' : '0.00');
// //   };

// //   // Adjusted for more transparency
// //   const getGlassmorphismClasses = () => `
// //     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
// //     border border-opacity-10 border-white shadow-lg
// //   `;

// //   if (isLoading) { // Use prop for loading
// //     return (
// //       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
// //         Loading data...
// //       </div>
// //     );
// //   }

// //   if (error) { // Use prop for error
// //     return (
// //       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-red-600 text-2xl">
// //         Error: {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">
// //       {/* New container for the main content with glassmorphism */}
// //       <div className={`p-6 ${getGlassmorphismClasses()}`}>
// //         {/* Page Title - Hidden */}
// //         {/* <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg text-gray-900">Analysis by Period</h1> */}

// //         {/* Dropdown Selectors and Buttons - Hidden */}
// //         <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden">
// //           {/* Org ID Dropdown - Still commented out as per previous instruction */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="orgId-select" className="text-lg font-semibold mr-4">Select Org:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="orgId-select"
// //                 value={selectedOrgId}
// //                 onChange={(e) => setSelectedOrgId(e.target.value)}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //               >
// //                 <option value="" className="bg-gray-800 text-white">-- Select Org --</option>
// //                 {availableOrgIds.map(orgId => (
// //                   <option key={orgId} value={orgId} className="bg-gray-800 text-white">
// //                     {orgId}
// //                   </option>
// //                 ))}
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}

// //           {/* Plan ID Dropdown (Fixed/Disabled) - Commented Out */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="planId-select" className="text-lg font-semibold mr-4">Plan:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="planId-select"
// //                 value={planID}
// //                 onChange={() => {}}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //                 disabled
// //               >
// //                 <option value={planID} className="bg-gray-800 text-white">{planID}</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}
// //           {/* Template ID Dropdown (Fixed/Disabled) - Commented Out */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="templateId-select" className="text-lg font-semibold mr-4">Template:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="templateId-select"
// //                 value={templateId}
// //                 onChange={() => {}}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //                 disabled
// //               >
// //                 <option value={templateId} className="bg-gray-800 text-white">{templateId}</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}
// //           {/* Type Dropdown (Fixed/Disabled) - Commented Out */}
// //           {/*
// //           <div className="flex items-center">
// //             <label htmlFor="type-select" className="text-lg font-semibold mr-4">Type:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="type-select"
// //                 value={type}
// //                 onChange={() => {}}
// //                 className="block w-48 py-2 px-3 bg-transparent text-white border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //                 disabled
// //               >
// //                 <option value={type} className="bg-gray-800 text-white">{type}</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //           */}

// //           {/* Revenue Type Selector */}
// //           {/* <div className="flex items-center">
// //             <label htmlFor="revenue-view-select" className="text-lg font-semibold mr-4 text-gray-800">Revenue View:</label>
// //             <div className={`relative ${getGlassmorphismClasses()} p-2`}>
// //               <select
// //                 id="revenue-view-select"
// //                 value={selectedRevenueView}
// //                 onChange={(e) => setSelectedRevenueView(e.target.value)}
// //                 className="block w-48 py-2 px-3 bg-transparent text-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer"
// //               >
// //                 <option value="t&m" className="bg-gray-100 text-gray-800">T&M Revenue</option>
// //                 <option value="cpff" className="bg-gray-100 text-gray-800">CPFF Revenue</option>
// //               </select>
// //               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
// //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
// //                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div> */}

// //           {/* Cancel Button for Pop-out */}
// //           {/* <button
// //               onClick={onCancel}
// //               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
// //           >
// //               Cancel
// //           </button> */}
// //         </div>

// //         {/* Main table container - Removed redundant getGlassmorphismClasses() here */}
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
// //             {/* Table Header */}
// //             {/* <thead>
// //               <tr className="bg-gray-100 bg-opacity-50">
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
// //                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
// //                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
// //                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
// //                 {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
// //                   const parts = range.split('_');
// //                   const monthPart = parts[0].split('/')[0];
// //                   const yearPart = parts[1];
// //                   return (
// //                     <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
// //                       {`${monthPart}/${yearPart}`}
// //                     </th>
// //                   );
// //                 })}
// //               </tr>
// //             </thead> */}
// //             <thead>
// //   <tr className="bg-gray-100 bg-opacity-50">
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
// //     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
// //     <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
// //     <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
// //     {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
// //       // The `range` variable is a string like "01/2025"
// //       // Split the string into two parts: month and year
// //       const [monthPart, yearPart] = range.split('/');
      
// //       return (
// //         <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
// //           {`${monthPart}/${yearPart}`}
// //         </th>
// //       );
// //     })}
// //   </tr>
// // </thead>
// //             {/* Table Body */}
// //             <tbody className="divide-y divide-gray-300 divide-opacity-10">
// //               {financialData.length === 0 ? (
// //                   <tr>
// //                       <td colSpan={dynamicDateRanges.length + 7} className="py-8 text-center text-gray-600 text-lg">
// //                           {isLoading ? 'Loading data...' : 'No data available for the selected criteria.'}
// //                       </td>
// //                   </tr>
// //               ) : (
// //                   financialData.map((row) => (
// //                   <React.Fragment key={row.id}>
// //                       <tr
// //                       className={`
// //                           group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
// //                           ${row.type === 'summary' ? 'bg-gray-100 bg-opacity-20' : ''}
// //                           ${row.type === 'expandable' ? 'cursor-pointer bg-blue-100 bg-opacity-30' : ''}
// //                       `}
// //                       onClick={() => (row.type === 'expandable' && row.id.startsWith('total-staff-cost')) ? toggleStaffRow(row.id) : (row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') ? toggleNonLaborAcctRow(row.id) : null)}
// //                       >
// //                       <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                           {row.type === 'expandable' && (
// //                           <span className="mr-2">
// //                               {/* Conditional rendering for chevron icon based on row type */}
// //                               {(row.id.startsWith('total-staff-cost') && expandedStaffRows.includes(row.id)) ||
// //                                (row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id)) ? (
// //                               <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                               ) : (
// //                               <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                               )}
// //                           </span>
// //                           )}
// //                           {row.description}
// //                       </td>
// //                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.accountId || ''}</td>
// //                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.orgId || ''}</td>
// //                       <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">{row.glcPlc || ''}</td>
// //                       <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(row.hrlyRate)}</td>
// //                       <td className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${
// //                           typeof row.total === 'number' && row.total < 0 ? 'text-red-600' :
// //                           (typeof row.total === 'number' && row.total > 0 && row.description === 'Profit' ? 'text-green-600' : '')
// //                       }`}>
// //                            {/* Apply percentage formatting for Profit % rows in Total column */}
// //                           {row.description.includes('Profit %') ? formatValue(row.total, false, true) : formatValue(row.total)}
// //                       </td>
// //                       {dynamicDateRanges.map((range) => {
// //                           let dataForRange;

// //                           if (row.description === 'Revenue') {
// //                               if (selectedRevenueView === 't&m' && row.tnmRevenueData) {
// //                                   dataForRange = row.tnmRevenueData[range];
// //                               } else if (selectedRevenueView === 'cpff' && row.cpffRevenueData) {
// //                                   dataForRange = row.cpffRevenueData[range];
// //                               } else {
// //                                   dataForRange = row.data[range];
// //                               }
// //                           } else {
// //                               dataForRange = row.data[range];
// //                           }
// //                           console.log(`  Rendering cell for row: ${row.description}, range: ${range}, data: ${dataForRange}`); // Added log

// //                           const isProfitRow = row.id.startsWith('profit-');
// //                           const isNegative = typeof dataForRange === 'number' && dataForRange < 0;
// //                           const isPositive = typeof dataForRange === 'number' && dataForRange > 0;
// //                           let textColorClass = '';
// //                           if (isProfitRow) {
// //                               if (isNegative) {
// //                                   textColorClass = 'text-red-600';
// //                               } else if (isPositive) {
// //                                   textColorClass = 'text-green-600';
// //                               }
// //                           }
// //                           return (
// //                           <td key={range} className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${textColorClass}`}>
// //                               {/* Apply percentage formatting for Profit % rows in monthly data */}
// //                               {row.description.includes('Profit %') ? formatValue(dataForRange, false, true) : formatValue(dataForRange)}
// //                           </td>
// //                           );
// //                       })}
// //                       </tr>

// //                       {/* Render expanded employees for Total Staff Cost row */}
// //                       {row.type === 'expandable' && expandedStaffRows.includes(row.id) && row.employees && row.employees.length > 0 && (
// //                         <>
// //                           {row.employees.map((employee) => (
// //                             <React.Fragment key={`${row.id}-${employee.id}`}>
// //                               {/* Individual Employee Row */}
// //                               <tr
// //                                   className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
// //                                   onClick={() => toggleEmployeeDetail(`${row.id}-${employee.id}`)}
// //                               >
// //                                   <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                                   <span className="mr-2">
// //                                       {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) ? (
// //                                       <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                       ) : (
// //                                       <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                       )}
// //                                   </span>
// //                                   {employee.name}
// //                                   </td>
// //                                   {/* Display Account ID for the employee */}
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.accountId || ''}</td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.orgId || ''}</td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.glcPlc || ''}</td>
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td>
// //                                   {/* This cell now correctly displays the total cost for the employee */}
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                   {formatValue(employee.cost)}
// //                                   </td>
// //                                   {dynamicDateRanges.map((currentRange) => (
// //                                       <td key={`${employee.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                           {formatValue(employee.monthlyCost[currentRange] || 0)}
// //                                       </td>
// //                                   ))}
// //                               </tr>

// //                               {/* Employee Hours Row (nested detail) */}
// //                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && (
// //                                 <tr key={`${employee.id}-hours-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
// //                                   <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
// //                                     --- Employee Hours
// //                                   </td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap"></td>
// //                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                     {/* This is the correct place for total hours in detail */}
// //                                     {formatValue(Object.values(employee.monthlyHours).reduce((sum, val) => sum + val, 0))}
// //                                   </td>
// //                                   {dynamicDateRanges.map((currentRange) => (
// //                                     <td key={`${employee.id}-hours-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                       {formatValue(employee.monthlyHours[currentRange] || 0, true)}
// //                                     </td>
// //                                   ))}
// //                                 </tr>
// //                               )}

// //                               {/* Nested Employee Cost Details (Raw Cost, Fringe, Overhead, G&A) as horizontal rows */}
// //                               {expandedEmployeeDetails.includes(`${row.id}-${employee.id}`) && Object.keys(employee.detailSummary).length > 0 && (
// //                                   <>
// //                                     {Object.keys(employee.detailSummary).map(detailDescription => {
// //                                       const detailTotal = Object.values(employee.detailSummary[detailDescription]).reduce((sum, val) => sum + val, 0);

// //                                       return (
// //                                       <tr key={`${employee.id}-${detailDescription}-detail-row`} className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs">
// //                                         <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
// //                                           --- {detailDescription}
// //                                         </td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-700">{employee.accountId || ''}</td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap"></td>
// //                                         {/* Removed the extra empty <td> here */}
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap"></td> {/* This was the extra td */}
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                           {formatValue(detailTotal)}
// //                                         </td>
// //                                         {dynamicDateRanges.map((currentRange) => (
// //                                             <td key={`${employee.id}-${detailDescription}-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
// //                                               {formatValue(employee.detailSummary[detailDescription][currentRange] || 0)}
// //                                             </td>
// //                                         ))}
// //                                       </tr>
// //                                     );})}
// //                                   </>
// //                               )}
// //                             </React.Fragment>
// //                           ))}
// //                         </>
// //                       )}

// //                     {/* Render expanded Non-Labor Staff Cost rows */}
// //                     {row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id) && row.nonLaborAccts && row.nonLaborAccts.length > 0 && (
// //                         <>
// //                             {row.nonLaborAccts.map((acctGroup) => (
// //                                 <React.Fragment key={`${row.id}-${acctGroup.id}`}>
// //                                     {/* Account Group Row for Non-Labor (e.g., "Account: 647-004-140 - Hotel") */}
// //                                     <tr
// //                                         className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
// //                                         onClick={() => toggleNonLaborAcctRow(`${row.id}-${acctGroup.id}`)} // Toggle for sub-level expansion
// //                                     >
// //                                         <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                                             <span className="mr-2">
// //                                                 {expandedNonLaborAcctRows.includes(`${acctGroup.id}`) ? ( // Check for acctGroup.id directly
// //                                                     <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                                 ) : (
// //                                                     <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
// //                                                 )}
// //                                             </span>
// //                                             {acctGroup.description}
// //                                         </td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.id || ''}</td> {/* Account ID */}
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.orgId || ''}</td>
// //                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.glcPlc || ''}</td>
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td> {/* No Hrly Rate for Non-Labor */}
// //                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.total)}</td>
// //                                         {dynamicDateRanges.map((currentRange) => (
// //                                             <td key={`${acctGroup.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                                 {formatValue(acctGroup.monthlyData[currentRange] || 0)}
// //                                             </td>
// //                                         ))}
// //                                     </tr>

// //                                     {/* Employee Grouping within Account Group - Now always visible if account is expanded */}
// //                                     {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) && acctGroup.employees && acctGroup.employees.length > 0 && (
// //                                         <React.Fragment> {/* Changed from <> to React.Fragment for consistency and clarity */}
// //                                             <tr className="bg-gray-100 bg-opacity-30">
// //                                                 {/* Adjusted colSpan to align 'Employee' with 'Description' in the main table */}
// //                                                 <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase sticky left-0 z-10 bg-inherit">Employee</td>
// //                                                 <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Span remaining header columns before Total */}
// //                                                 <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase"></td>
// //                                                  {/* <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td> */}
// //                                                 {/* {dynamicDateRanges.map((range) => (
// //                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
// //                                                         {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`}
// //                                                     </td>
// //                                                 ))} */}
// //                                                 {dynamicDateRanges.map((range) => (
// //                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
// //                                                         {/* {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`} */}
// //                                                     </td>
// //                                                 ))}
// //                                             </tr>
// //                                             {acctGroup.employees.map((employeeGroup) => (
// //                                                 // Removed React.Fragment here as the outer React.Fragment handles it
// //                                                 <tr key={`${acctGroup.id}-${employeeGroup.id}`}
// //                                                     className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs"
// //                                                 >
// //                                                     {/* Adjusted empty cell for alignment */}
// //                                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
// //                                                         {employeeGroup.name}
// //                                                     </td>
// //                                                     <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Span remaining header columns before Total */}
// //                                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(employeeGroup.total)}</td>
// //                                                     {dynamicDateRanges.map((currentRange) => (
// //                                                         <td key={`${employeeGroup.id}-${currentRange}-monthly-total`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
// //                                                             {formatValue(employeeGroup.monthlyData[currentRange] || 0)}
// //                                                         </td>
// //                                                     ))}
// //                                                 </tr>
// //                                             ))}
// //                                         </React.Fragment>
// //                                     )}
// //                                 </React.Fragment>
// //                             ))}
// //                         </>
// //                     )}
// //                   </React.Fragment>
// //                   ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnalysisByPeriodContent;

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
// import { data } from 'react-router-dom';

// const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error, fiscalYear }) => {
//   // Added console.log for fiscalYear prop at the very top
//   console.log("AnalysisByPeriodContent: Received fiscalYear prop:", fiscalYear);
//   console.log("AnalysisByPeriodContent: Received initialApiData prop:", initialApiData);


//   const [expandedStaffRows, setExpandedStaffRows] = useState([]);
//   const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
//   const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
//   const [financialData, setFinancialData] = useState([]);

//   const [allApiData, setAllApiData] = useState(null); // This will now hold the fiscalYear-filtered data
//   const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

//   const [selectedOrgId, setSelectedOrgId] = useState('');
//   const [availableOrgIds, setAvailableOrgIds] = useState([]);

//   const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');

//   // Replace your existing getMonthRangeKey function with this one
// function getMonthRangeKey(period, year) {
//   // Add this check to prevent crashes if period or year are missing
//   if (period === undefined || year === undefined) {
//     return null;
//   }
//   const month = String(period).padStart(2, '0');
//   const monthRange = `${month}/${year}`;
//   return monthRange;
// }

// const transformApiDataToFinancialRows = useCallback((
//   apiResponse,
//   currentOrgId,
//   dynamicDateRanges,
//   selectedRevenueView,
//   planType
// ) => {
//   console.log("transformApiDataToFinancialRows: RAW apiResponse", apiResponse);

//   const financialRows = [];
//   const monthlyRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const totalExpenseData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const profitData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const profitOnCostData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const profitOnRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});

//   const totalRevenueOverall = apiResponse.revenue || 0;

//   const monthlyRevenueSummary = apiResponse.monthlyRevenueSummary || [];
//   monthlyRevenueSummary.forEach(monthData => {
//     const monthRange = getMonthRangeKey(monthData.month, monthData.year);
//     if (monthRange && dynamicDateRanges.includes(monthRange)) {
//       monthlyRevenueData[monthRange] = monthData.revenue || 0;
//       const staffCost = monthData.cost || 0;
//       const nonLaborCost = monthData.otherDifrectCost || 0;
//       totalStaffCostByMonth[monthRange] = staffCost;
//       totalNonLaborCostByMonth[monthRange] = nonLaborCost;
//       totalExpenseData[monthRange] = staffCost + nonLaborCost;
//     }
//   });

//   // ====================================================================
//   // PRORATION LOGIC STARTS HERE
//   // ====================================================================

//   const uniqueEmployeesMap = new Map();
//   const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
//     const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
//     return isOrgMatch;
//   });

//   // STEP 1: Pre-process data to get overall monthly totals for each cost component for each employee.
//   const employeeOverallTotals = new Map();
//   filteredEmployeeSummaries.forEach(empSummary => {
//     if (!employeeOverallTotals.has(empSummary.emplId)) {
//       const totals = {
//         grandTotalHours: 0,
//         monthlyHours: {},
//         monthlyRawCost: {},
//         monthlyFringe: {},
//         monthlyOverhead: {},
//         monthlyGNA: {},
//       };
      
//       (empSummary.emplSchedule?.payrollSalary || []).forEach(salaryEntry => {
//         const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
//         if (monthRange && dynamicDateRanges.includes(monthRange)) {
//           totals.monthlyHours[monthRange] = (totals.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);
//           totals.monthlyRawCost[monthRange] = (totals.monthlyRawCost[monthRange] || 0) + (salaryEntry.cost || 0);
//           totals.monthlyFringe[monthRange] = (totals.monthlyFringe[monthRange] || 0) + (salaryEntry.fringe || 0);
//           totals.monthlyOverhead[monthRange] = (totals.monthlyOverhead[monthRange] || 0) + (salaryEntry.overhead || 0);
//           totals.monthlyGNA[monthRange] = (totals.monthlyGNA[monthRange] || 0) + (salaryEntry.gna || 0);
//         }
//       });
      
//       totals.grandTotalHours = Object.values(totals.monthlyHours).reduce((sum, hours) => sum + hours, 0);
//       employeeOverallTotals.set(empSummary.emplId, totals);
//     }
//   });

//   // STEP 2: Process each assignment summary to create distinct, prorated rows.
//   if (filteredEmployeeSummaries.length > 0) {
//     filteredEmployeeSummaries.forEach(empSummary => {
//       // Use the composite key to uniquely identify each employee assignment
//       const compositeKey = `${empSummary.emplId}-${empSummary.plcCode}-${empSummary.orgID}-${empSummary.accID}`;
      
//       if (!uniqueEmployeesMap.has(compositeKey)) {
//         const employeeData = {
//           id: compositeKey,
//           name: `${empSummary.name} (${empSummary.plcCode})`,
//           // Use the accurate total cost and hours directly from the summary object
//           cost: empSummary.totalForecastedCost,
//           totalHours: empSummary.totalForecastedHours,
//           accountId: empSummary.accID || '',
//           orgId: empSummary.orgID || '',
//           glcPlc: empSummary.plcCode || '',
//           hrlyRate: empSummary.perHourRate || 0,
//           monthlyHours: {},
//           monthlyCost: {},
//           detailSummary: {
//             'Raw Cost': {},
//             'Fringe Benefits': {},
//             'Overhead': {},
//             'General & Admin': {}
//           },
//         };

//         const overallTotals = employeeOverallTotals.get(empSummary.emplId);
        
//         // Calculate the proration factor for this specific assignment.
//         const prorationFactor = (overallTotals && overallTotals.grandTotalHours > 0)
//           ? (empSummary.totalForecastedHours / overallTotals.grandTotalHours)
//           : 0;

//         // Reconstruct all monthly data for this assignment using the proration factor.
//         dynamicDateRanges.forEach(monthRange => {
//           // Prorate hours
//           const totalMonthlyHoursForEmployee = overallTotals?.monthlyHours[monthRange] || 0;
//           employeeData.monthlyHours[monthRange] = totalMonthlyHoursForEmployee * prorationFactor;

//           // Prorate detailed cost components
//           const proratedRawCost = (overallTotals?.monthlyRawCost[monthRange] || 0) * prorationFactor;
//           const proratedFringe = (overallTotals?.monthlyFringe[monthRange] || 0) * prorationFactor;
//           const proratedOverhead = (overallTotals?.monthlyOverhead[monthRange] || 0) * prorationFactor;
//           const proratedGNA = (overallTotals?.monthlyGNA[monthRange] || 0) * prorationFactor;
          
//           employeeData.detailSummary['Raw Cost'][monthRange] = proratedRawCost;
//           employeeData.detailSummary['Fringe Benefits'][monthRange] = proratedFringe;
//           employeeData.detailSummary['Overhead'][monthRange] = proratedOverhead;
//           employeeData.detailSummary['General & Admin'][monthRange] = proratedGNA;

//           // The total monthly cost is the sum of its prorated components.
//           employeeData.monthlyCost[monthRange] = proratedRawCost + proratedFringe + proratedOverhead + proratedGNA;
//         });

//         uniqueEmployeesMap.set(compositeKey, employeeData);
//       }
//     });
//   }
  
//   // ====================================================================
//   // END OF PRORATION LOGIC
//   // ====================================================================

//   const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
//   const totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
//   const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
//   const totalProfitOverall = totalRevenueOverall - totalExpenseOverall;
  
//   const nonLaborAcctDetailsMap = new Map();
//   const allNonLaborSummariesFiltered = [
//     ...(apiResponse.directCOstForecastSummary || []),
//     ...(apiResponse.indirectCostForecastSummary || [])
//   ].filter(nonLaborSummary => currentOrgId ? nonLaborSummary.orgID === currentOrgId : true);

//   allNonLaborSummariesFiltered.forEach(nonLaborSummary => {
//     const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
//                       (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
//     const accountId = nonLaborSummary.accID;
//     if (!nonLaborAcctDetailsMap.has(accountId)) {
//       nonLaborAcctDetailsMap.set(accountId, {
//         id: accountId,
//         description: nonLaborSummary.accName || `Account: ${accountId}`,
//         orgId: nonLaborSummary.orgID,
//         glcPlc: nonLaborSummary.plcCode || '',
//         total: 0,
//         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
//         employees: new Map(),
//       });
//     }
//     const acctGroup = nonLaborAcctDetailsMap.get(accountId);
//     schedules.forEach(scheduleEntry => {
//       const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//       if (monthRange && dynamicDateRanges.includes(monthRange)) {
//         let entryCost = 0;
//         if (planType === 'EAC') {
//             entryCost = scheduleEntry.actualamt || 0;
//         } else if (planType === 'BUD') {
//             entryCost = scheduleEntry.forecastedamt || 0;
//         } else {
//             entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
//         }
//         acctGroup.monthlyData[monthRange] += entryCost;
//       }
//     });
//   });
  
//   Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
//     acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
//   });

//   dynamicDateRanges.forEach(range => {
//     profitData[range] = (monthlyRevenueData[range] || 0) - (totalExpenseData[range] || 0);
//   });
  
//   const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
//   const overallProfitOnRevenue = totalRevenueOverall !== 0
//     ? (totalProfitOverall / totalRevenueOverall)
//     : 0;

//   financialRows.push({
//     id: `revenue-${currentOrgId}`,
//     description: 'Revenue',
//     total: totalRevenueOverall,
//     data: monthlyRevenueData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `total-staff-cost-${currentOrgId}`,
//     description: 'Total Staff Cost',
//     total: totalStaffCostOverall,
//     data: totalStaffCostByMonth,
//     type: 'expandable',
//     employees: Array.from(uniqueEmployeesMap.values()),
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `non-labor-staff-cost-${currentOrgId}`,
//     description: 'Non-Labor Staff Cost',
//     total: totalNonLaborCostOverall,
//     data: totalNonLaborCostByMonth,
//     type: 'expandable',
//     nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()),
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `total-expense-${currentOrgId}`,
//     description: 'Total Expense',
//     total: totalExpenseOverall,
//     data: totalExpenseData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `profit-${currentOrgId}`,
//     description: 'Profit',
//     total: totalProfitOverall,
//     data: profitData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   dynamicDateRanges.forEach(range => {
//     const profit = (profitData[range] || 0);
//     const expense = (totalExpenseData[range] || 0);
//     profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
//   });

//   financialRows.push({
//     id: `profit-cost-${currentOrgId}`,
//     description: 'Profit % on Cost',
//     total: overallProfitOnCost,
//     data: profitOnCostData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   dynamicDateRanges.forEach(range => {
//     const profit = (profitData[range] || 0);
//     let revenueForPercentage = (monthlyRevenueData[range] || 0);
//     profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
//   });

//   financialRows.push({
//     id: `profit-revenue-${currentOrgId}`,
//     description: 'Profit % on Revenue',
//     total: overallProfitOnRevenue,
//     data: profitOnRevenueData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
//   return financialRows;
// }, [selectedRevenueView]);

//   // This useEffect now processes the initialApiData received from props
//   useEffect(() => {
//     console.log("useEffect [initialApiData, isLoading, error, fiscalYear]: Effect triggered.");
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
//       console.log("useEffect: Error received from parent:", error);
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     if (!initialApiData || Object.keys(initialApiData).length === 0) {
//       console.log("useEffect: initialApiData is null, undefined, or empty.");
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     try {
//       console.log("useEffect: Processing initialApiData for deep fiscal year filtering...");
      
//       const processedApiData = { ...initialApiData }; // Start with a copy

//       processedApiData.employeeForecastSummary = (initialApiData.employeeForecastSummary || [])
//         .map(empSummary => {
//           const filteredPayrollSalary = (empSummary.emplSchedule?.payrollSalary || []).filter(salaryEntry => {
//             return !fiscalYear || fiscalYear === "All" || String(salaryEntry.year) === fiscalYear;
//           });

//           if (filteredPayrollSalary.length > 0) {
//             return {
//               ...empSummary,
//               emplSchedule: {
//                 ...empSummary.emplSchedule,
//                 payrollSalary: filteredPayrollSalary,
//               },
//             };
//           }
//           return null; 
//         })
//         .filter(Boolean); 

//       console.log("useEffect: employeeForecastSummary after deep fiscalYear filter:", processedApiData.employeeForecastSummary);

//       processedApiData.directCOstForecastSummary = (initialApiData.directCOstForecastSummary || [])
//         .map(nonLaborSummary => {
//           const filteredForecasts = (nonLaborSummary.directCostSchedule?.forecasts || []).filter(f => {
//             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
//           });
//           if (filteredForecasts.length > 0) {
//             return {
//               ...nonLaborSummary,
//               directCostSchedule: {
//                 ...nonLaborSummary.directCostSchedule,
//                 forecasts: filteredForecasts,
//               },
//             };
//           }
//           return null;
//         })
//         .filter(Boolean);
//       console.log("useEffect: directCOstForecastSummary after deep fiscalYear filter:", processedApiData.directCOstForecastSummary);

//       processedApiData.indirectCostForecastSummary = (initialApiData.indirectCostForecastSummary || [])
//         .map(nonLaborSummary => {
//           const filteredForecasts = (nonLaborSummary.indirectCostSchedule?.forecasts || []).filter(f => {
//             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
//           });
//           if (filteredForecasts.length > 0) {
//             return {
//               ...nonLaborSummary,
//               indirectCostSchedule: {
//                 ...nonLaborSummary.indirectCostSchedule,
//                 forecasts: filteredForecasts,
//               },
//             };
//           }
//           return null;
//         })
//         .filter(Boolean);
//       console.log("useEffect: indirectCostSummariesFiltered after deep fiscalYear filter:", processedApiData.indirectCostForecastSummary);


//       setAllApiData(processedApiData);

//       const uniqueOrgIds = new Set();
//       const uniqueDateRangesSet = new Set();

//       (processedApiData.employeeForecastSummary || []).forEach(summary => {
//         uniqueOrgIds.add(summary.orgID);
//         summary.emplSchedule?.payrollSalary?.forEach(salaryEntry => {
//           const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
//           uniqueDateRangesSet.add(monthRangeKey);
//         });
//       });

//       (processedApiData.directCOstForecastSummary || []).forEach(nonLaborSummary => {
//         uniqueOrgIds.add(nonLaborSummary.orgID);
//         nonLaborSummary.directCostSchedule?.forecasts?.forEach(scheduleEntry => {
//           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//           uniqueDateRangesSet.add(monthRangeKey);
//         });
//       });

//       (processedApiData.indirectCostForecastSummary || []).forEach(nonLaborSummary => {
//         uniqueOrgIds.add(nonLaborSummary.orgID);
//         nonLaborSummary.indirectCostSchedule?.forecasts?.forEach(scheduleEntry => {
//           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//           uniqueDateRangesSet.add(monthRangeKey);
//         });
//       });


//       const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
//           const [monthAStr, yearAStr] = a.split('/');
//           const yearA = parseInt(yearAStr, 10);
//           const monthA = parseInt(monthAStr, 10);

//           const [monthBStr, yearBStr] = b.split('/');
//           const yearB = parseInt(yearBStr, 10);
//           const monthB = parseInt(monthBStr, 10);

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
//     } catch (e) {
//       console.error("Error during initial API data processing:", e);
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//     }
//   }, [initialApiData, isLoading, error, fiscalYear]);

//   useEffect(() => {
//     console.log("useEffect [allApiData, selectedOrgId, dynamicDateRanges, ...]: Transform trigger effect.");
//     if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
//       console.log("useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data...");
//       const transformedData = transformApiDataToFinancialRows(
//         allApiData,
//         selectedOrgId,
//         dynamicDateRanges,
//         selectedRevenueView,
//         type,
//         initialApiData.revenue
//       );
//       console.log("Transformed Data (after filter & transform):", transformedData);
//       setFinancialData(transformedData);
//     } else {
//       console.log("useEffect (transform trigger): Waiting for allApiData, selectedOrgId, or dynamicDateRanges to be ready.");
//       setFinancialData([]);
//     }
//     setExpandedStaffRows([]);
//     setExpandedEmployeeDetails([]);
//     setExpandedNonLaborAcctRows([]); 
//   }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows, type]);

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

//   const toggleNonLaborAcctRow = (id) => {
//     setExpandedNonLaborAcctRows(prev =>
//         prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
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

//   const getGlassmorphismClasses = () => `
//     bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
//     border border-opacity-10 border-white shadow-lg
//   `;

//   if (isLoading) { 
//     return (
//       <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
//         Loading data...
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
//       <div className={`p-6 ${getGlassmorphismClasses()}`}>
//         <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden">
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
//             <thead>
//               <tr className="bg-gray-100 bg-opacity-50">
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
//                 {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
//                   const [monthPart, yearPart] = range.split('/');
                  
//                   return (
//                     <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
//                       {`${monthPart}/${yearPart}`}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
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
//                           console.log(`  Rendering cell for row: ${row.description}, range: ${range}, data: ${dataForRange}`); 

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
//                               {row.description.includes('Profit %') ? formatValue(dataForRange, false, true) : formatValue(dataForRange)}
//                           </td>
//                           );
//                       })}
//                       </tr>

//                       {row.type === 'expandable' && expandedStaffRows.includes(row.id) && row.employees && row.employees.length > 0 && (
//                         <>
//                           {row.employees.map((employee) => (
//                             <React.Fragment key={`${row.id}-${employee.id}`}>
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
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.accountId || ''}</td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.orgId || ''}</td>
//                                   <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{employee.glcPlc || ''}</td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(employee.hrlyRate)}</td>
//                                   <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                   {formatValue(employee.cost)}
//                                   </td>
//                                   {dynamicDateRanges.map((currentRange) => (
//                                       <td key={`${employee.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                           {formatValue(employee.monthlyCost[currentRange] || 0)}
//                                       </td>
//                                   ))}
//                               </tr>

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
//                                     {formatValue(Object.values(employee.monthlyHours).reduce((sum, val) => sum + val, 0))}
//                                   </td>
//                                   {dynamicDateRanges.map((currentRange) => (
//                                     <td key={`${employee.id}-hours-${currentRange}-amount`} className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
//                                       {formatValue(employee.monthlyHours[currentRange] || 0, true)}
//                                     </td>
//                                   ))}
//                                 </tr>
//                               )}

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
//                                         <td className="py-2 px-4 text-right whitespace-nowrap"></td> 
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

//                     {row.type === 'expandable' && row.id.startsWith('non-labor-staff-cost') && expandedNonLaborAcctRows.includes(row.id) && row.nonLaborAccts && row.nonLaborAccts.length > 0 && (
//                         <>
//                             {row.nonLaborAccts.map((acctGroup) => (
//                                 <React.Fragment key={`${row.id}-${acctGroup.id}`}>
//                                     <tr
//                                         className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
//                                         onClick={() => toggleNonLaborAcctRow(`${row.id}-${acctGroup.id}`)}
//                                     >
//                                         <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                             <span className="mr-2">
//                                                 {expandedNonLaborAcctRows.includes(`${acctGroup.id}`) ? ( 
//                                                     <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                                 ) : (
//                                                     <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
//                                                 )}
//                                             </span>
//                                             {acctGroup.description}
//                                         </td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.id || ''}</td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.orgId || ''}</td>
//                                         <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">{acctGroup.glcPlc || ''}</td>
//                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td>
//                                         <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">{formatValue(acctGroup.total)}</td>
//                                         {dynamicDateRanges.map((currentRange) => (
//                                             <td key={`${acctGroup.id}-${currentRange}-cost`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                                 {formatValue(acctGroup.monthlyData[currentRange] || 0)}
//                                             </td>
//                                         ))}
//                                     </tr>

//                                     {expandedNonLaborAcctRows.includes(`${row.id}-${acctGroup.id}`) && acctGroup.employees && acctGroup.employees.length > 0 && (
//                                         <React.Fragment>
//                                             <tr className="bg-gray-100 bg-opacity-30">
//                                                 <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase sticky left-0 z-10 bg-inherit">Employee</td>
//                                                 <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td>
//                                                 <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase"></td>
//                                                 {dynamicDateRanges.map((range) => (
//                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                             {acctGroup.employees.map((employeeGroup) => (
//                                                 <tr key={`${acctGroup.id}-${employeeGroup.id}`}
//                                                     className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs"
//                                                 >
//                                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                                         {employeeGroup.name}
//                                                     </td>
//                                                     <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td>
//                                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(employeeGroup.total)}</td>
//                                                     {dynamicDateRanges.map((currentRange) => (
//                                                         <td key={`${employeeGroup.id}-${currentRange}-monthly-total`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                                             {formatValue(employeeGroup.monthlyData[currentRange] || 0)}
//                                                         </td>
//                                                     ))}
//                                                 </tr>
//                                             ))}
//                                         </React.Fragment>
//                                     )}
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

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
// import { data } from 'react-router-dom';

// const AnalysisByPeriodContent = ({ onCancel, planID, templateId, type, initialApiData, isLoading, error, fiscalYear }) => {
//   // Added console.log for fiscalYear prop at the very top
//   console.log("AnalysisByPeriodContent: Received fiscalYear prop:", fiscalYear);
//   console.log("AnalysisByPeriodContent: Received initialApiData prop:", initialApiData);

//   const [expandedStaffRows, setExpandedStaffRows] = useState([]);
//   const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
//   const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
//   const [financialData, setFinancialData] = useState([]);

//   const [allApiData, setAllApiData] = useState(null); // This will now hold the fiscalYear-filtered data
//   const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

//   const [selectedOrgId, setSelectedOrgId] = useState('');
//   const [availableOrgIds, setAvailableOrgIds] = useState([]);

//   const [selectedRevenueView, setSelectedRevenueView] = useState('t&m');

//   /**
//    * Helper to map month and year to a date range string (e.g., "05/01-05/31_2025")
//    * Uses Date object to accurately determine the last day of the month, accounting for leap years.
//    */
//   // const getMonthRangeKey = (month, year) => {
//   //   // Month is 1-indexed for input, but 0-indexed for Date constructor (month - 1)
//   //   // Day 0 of the *next* month gives the last day of the *current* month
//   //   const lastDay = new Date(year, month, 0).getDate();
//   //   const monthString = month.toString().padStart(2, '0');
//   //   return `${monthString}/01-${monthString}/${lastDay}_${year}`;
//   // };

//   // Replace your existing getMonthRangeKey function with this one
// function getMonthRangeKey(period, year) {
//   // Add this check to prevent crashes if period or year are missing
//   if (period === undefined || year === undefined) {
//     return null;
//   }
//   const month = String(period).padStart(2, '0');
//   const monthRange = `${month}/${year}`;
//   return monthRange;
// }

//   /**
//    * Transforms the raw API response (which is now pre-filtered by fiscal year)
//    * into the FinancialRow structure expected by the frontend.
//    * This function filters the provided apiResponse based on currentOrgId.
//    * It also dynamically calculates profit based on the selected revenue view.
//    *
//    *

//    */

//   // Old code //
// //   const transformApiDataToFinancialRows = useCallback((
// //     apiResponse, // This apiResponse is now the pre-filtered allApiData
// //     currentOrgId,
// //     dynamicDateRanges,
// //     selectedRevenueView,
// //     planType,
// //     apiTotalRevenue // Added planType here

// //     // selectedFiscalYear is implicitly handled by apiResponse being pre-filtered
// //   ) => {
// //     console.log("transformApiDataToFinancialRows: apiResponse (already fiscalYear-filtered)", apiResponse);
// //     console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
// //     console.log("transformApiDataToFinancialRows: dynamicDateRanges (columns)", dynamicDateRanges);
// //     console.log("transformApiDataToFinancialRows: planType", planType);

// //     const financialRows = [];

// //     const revenueData = {};
// //     const tnmRevenueData = {};
// //     const cpffRevenueData = {};
// //     const totalExpenseData = {};
// //     const profitData = {};
// //     const profitOnCostData = {};
// //     const profitOnRevenueData = {};

// //     // Initialize monthly data accumulators for all dynamicDateRanges
// //     dynamicDateRanges.forEach(range => {
// //       revenueData[range] = 0;
// //       tnmRevenueData[range] = 0;
// //       cpffRevenueData[range] = 0;
// //       totalExpenseData[range] = 0;
// //       profitData[range] = 0;
// //       profitOnCostData[range] = 0;
// //       profitOnRevenueData[range] = 0;
// //     });

// //     const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => {
// //       acc[range] = 0;
// //       return acc;
// //     }, {});

// //     const totalStaffHoursByMonth = dynamicDateRanges.reduce((acc, range) => {
// //       acc[range] = 0;
// //       return acc;
// //     }, {});

// //     const uniqueEmployeesMap = new Map();
// //     const nonLaborAcctDetailsMap = new Map(); // Map to group non-labor details by account ID and then by month

// //     // Filter employee summaries based on orgId (fiscal year already handled by parent useEffect)
// //     const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
// //       const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
// //       return isOrgMatch;
// //     });
// //     console.log("transformApiDataToFinancialRows: filteredEmployeeSummaries (after org filter, fiscal year already applied)", filteredEmployeeSummaries);

// //     // const [totalRevenueFromApi, setTotalRevenueFromApi] = useState(0); //

// //    if (apiResponse && apiResponse.monthlyRevenueSummary) {
// //   apiResponse.monthlyRevenueSummary.forEach(monthSummary => {
// //     // Find the corresponding month range directly from the dynamicDateRanges array
// //     const matchingRange = dynamicDateRanges.find(
// //       (range) => range.period === monthSummary.period && range.year === monthSummary.year
// //     );

// //     if (matchingRange) {
// //       // Use the exact monthRange key from the dynamicDateRanges array to populate the data
// //       revenueData[matchingRange.monthRange] = monthSummary.revenue || 0;
// //     } else {
// //       console.warn(`No matching month range found for period ${monthSummary.period} and year ${monthSummary.year}`);
// //     }
// //   });
// // }
// //     if (filteredEmployeeSummaries.length > 0) {
// //       filteredEmployeeSummaries.forEach(empSummary => {
// //         // Use emplId as the unique key for the employee map
// //         if (!uniqueEmployeesMap.has(empSummary.emplId)) {
// //           uniqueEmployeesMap.set(empSummary.emplId, {
// //             id: empSummary.emplId,
// //             name: `${empSummary.name} (${empSummary.emplId})`, // Format name (EMPLID)
// //             cost: 0,
// //             accountId: empSummary.accID || '', // Use accID from empSummary
// //             orgId: empSummary.orgId || '',
// //             glcPlc: empSummary.plcCode || '',
// //             hrlyRate: empSummary.perHourRate || 0,
// //             monthlyHours: {},
// //             monthlyCost: {},
// //             detailSummary: {},
// //           });
// //         }
// //         const employee = uniqueEmployeesMap.get(empSummary.emplId);

// //         // New Lines to ADD before the forEach loop
// //         const totalEmployeeRevenue = empSummary.revenue || 0;
// //         const totalEmployeeBurdenCost = empSummary.totalBurdonCost || 0;

// //         if (empSummary.emplSchedule && Array.isArray(empSummary.emplSchedule.payrollSalary)) {
// //           empSummary.emplSchedule.payrollSalary.forEach(salaryEntry => {
// //             // No need for fiscalYear check here, as data is already pre-filtered
// //             const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

// //             if (monthRange) {
// //               tnmRevenueData[monthRange] = (tnmRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0);
// //               cpffRevenueData[monthRange] = (cpffRevenueData[monthRange] || 0) + (salaryEntry.revenue || 0); // Assuming cpffRevenue exists
// //               // revenueData[monthRange] = (revenueData[monthRange] || 0) + (salaryEntry.revenue || 0); // Total revenue for display

// //               totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// //               totalStaffCostByMonth[monthRange] = (totalStaffCostByMonth[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// //               totalStaffHoursByMonth[monthRange] = (totalStaffHoursByMonth[monthRange] || 0) + (salaryEntry.hours || 0);

// //               employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + (salaryEntry.totalBurdenCost || 0);
// //               employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

// //               if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
// //               employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

// //               if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
// //               employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

// //               if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
// //               employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

// //               if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
// //               employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
// //             }
// //           });
// //         }
// //       });
// //     }

// //     // Process direct and indirect cost data for Non-Labor Staff Cost
// //     let totalNonLaborCostOverall = 0;
// //     const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => {
// //       acc[range] = 0;
// //       return acc;
// //     }, {});

// //     // Filter non-labor summaries based on orgId (fiscal year already handled by parent useEffect)
// //     const allNonLaborSummariesFiltered = [
// //       ...(apiResponse.directCOstForecastSummary || []),
// //       ...(apiResponse.indirectCostForecastSummary || [])
// //     ].filter(nonLaborSummary => {
// //       const isOrgMatch = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
// //       return isOrgMatch;
// //     });

// //       console.log("transformApiDataToFinancialRows: apiResponse", apiResponse);
// //     console.log("transformApiDataToFinancialRows: allNonLaborSummariesFiltered (after org filter, fiscal year already applied)", allNonLaborSummariesFiltered);

// //     allNonLaborSummariesFiltered.forEach(nonLaborSummary => { // Use the already filtered list
// //         const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
// //                           (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
// //         console.log(`Processing non-labor summary for accID: ${nonLaborSummary.accID}, orgID: ${nonLaborSummary.orgID}. Forecast schedules found:`, schedules);

// //         const accountId = nonLaborSummary.accID;
// //         const orgId = nonLaborSummary.orgID;
// //         const glcPlc = nonLaborSummary.plcCode || '';
// //         const accName = nonLaborSummary.accName || `Account: ${accountId}`;

// //         if (!nonLaborAcctDetailsMap.has(accountId)) {
// //             nonLaborAcctDetailsMap.set(accountId, {
// //                 id: accountId,
// //                 description: accName,
// //                 orgId: orgId,
// //                 glcPlc: glcPlc,
// //                 total: 0, // Total for this account across all periods
// //                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}), // Total for this account per month
// //                 employees: new Map(), // Map to hold employee-level data within this account (even for non-labor, to group DCTs)
// //             });
// //             console.log(`  New non-labor account group created: ${accountId}`);
// //         }
// //         const acctGroup = nonLaborAcctDetailsMap.get(accountId);

// //         // Group schedules by employee within the account group (even if it's a single DCT entry, it needs a 'group')
// //         const employeeId = nonLaborSummary.emplId || 'N/A_Employee'; // Use a default if emplId is missing
// //         const employeeName = nonLaborSummary.name || ` ${accountId}`; // More generic name

// //         if (!acctGroup.employees.has(employeeId)) {
// //             acctGroup.employees.set(employeeId, {
// //                 id: employeeId,
// //                 name: `${employeeName} (${employeeId})`,
// //                 total: 0,
// //                 monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
// //                 entries: [], // These are the original DCT-level entries for this specific employee/group
// //             });
// //         }
// //         const employeeGroup = acctGroup.employees.get(employeeId);

// //         schedules.forEach(scheduleEntry => {
// //             // No need for fiscalYear check here, as data is already pre-filtered
// //             const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
// //             if (monthRange) {
// //                 let entryCost = 0;
// //                 if (planType === 'EAC') {
// //                     entryCost = scheduleEntry.actualamt || 0;
// //                 } else if (planType === 'BUD') {
// //                     entryCost = scheduleEntry.forecastedamt || 0;
// //                 } else {
// //                     // Fallback to original calculation if planType is not EAC or BUD
// //                     entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
// //                 }

// //                 console.log(`  Schedule entry for ${monthRange}: planType=${planType}, actualamt=${scheduleEntry.actualamt}, forecastedamt=${scheduleEntry.forecastedamt}. Calculated entryCost: ${entryCost}`);

// //                 // Add the individual schedule entry to the employee's entries array
// //                 employeeGroup.entries.push({
// //                     id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`, // Unique ID for this specific monthly entry
// //                     dctId: scheduleEntry.dctId,
// //                     forecastid: scheduleEntry.forecastid,
// //                     monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
// //                     total: entryCost, // Total for this specific entry (for that month)
// //                     monthlyValues: { [monthRange]: entryCost } // This will populate the correct month column for this specific entry
// //                 });

// //                 // Aggregate totals for the employee group
// //                 employeeGroup.monthlyData[monthRange] += entryCost;
// //                 employeeGroup.total += entryCost;

// //                 // Aggregate totals for the account group (still at account level)
// //                 acctGroup.monthlyData[monthRange] += entryCost;
// //                 acctGroup.total += entryCost;

// //                 totalNonLaborCostByMonth[monthRange] = (totalNonLaborCostByMonth[monthRange] || 0) + entryCost;
// //                 totalExpenseData[monthRange] = (totalExpenseData[monthRange] || 0) + entryCost; // Ensure this is current month's totalExpenseData
// //             }
// //         });
// //     });

// //     Array.from(uniqueEmployeesMap.values()).forEach(employee => {
// //       employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
// //     });

// //     Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
// //         // Recalculate total for acctGroup in case it wasn't fully accumulated (though it should be)
// //         acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
// //         // Convert employee maps to arrays for rendering
// //         acctGroup.employees = Array.from(acctGroup.employees.values());
// //     });

// //     totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
// //     console.log("transformApiDataToFinancialRows: totalNonLaborCostOverall", totalNonLaborCostOverall);
// //     console.log("transformApiDataToFinancialRows: totalNonLaborCostByMonth", totalNonLaborCostByMonth);
// //     console.log("transformApiDataToFinancialRows: nonLaborAcctDetailsMap contents (after processing)", Array.from(nonLaborAcctDetailsMap.values()));

// //     // Recalculate overall totals AFTER all filtering and monthly aggregation
// //     // This ensures overall totals reflect only the selected fiscal year
// //     const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
// //     const totalStaffHoursOverall = Object.values(totalStaffHoursByMonth).reduce((sum, val) => sum + val, 0);

// //     const totalRevenueOverall = Object.values(revenueData).reduce((sum, val) => sum + val, 0); // Calculate from aggregated monthly data
// //     const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
// //     const totalProfitOverall = totalRevenueOverall - totalExpenseOverall; // Calculate from newly aggregated revenue and expense

// //     // Populate profitData for each month based on monthly revenue and expense
// //     dynamicDateRanges.forEach(range => {
// //       profitData[range] = (revenueData[range] || 0) - (totalExpenseData[range] || 0);
// //     });

// //     const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
// //     const overallProfitOnRevenue = totalRevenueOverall !== 0 // Use totalRevenueOverall here
// //       ? (totalProfitOverall / totalRevenueOverall)
// //       : 0;

// //     financialRows.push({
// //       id: `revenue-${currentOrgId}`,
// //       description: 'Revenue',
// //       total: apiTotalRevenue,
// //       data: revenueData,
// //       tnmRevenueData: tnmRevenueData,
// //       cpffRevenueData: cpffRevenueData,
// //       type: 'summary',
// //       orgId: currentOrgId,
// //     });

// //     financialRows.push({
// //       id: `total-staff-cost-${currentOrgId}`,
// //       description: 'Total Staff Cost',
// //       total: totalStaffCostOverall,
// //       totalHours: totalStaffHoursOverall,
// //       data: totalStaffCostByMonth,
// //       type: 'expandable',
// //       employees: Array.from(uniqueEmployeesMap.values()),
// //       orgId: currentOrgId,
// //     });

// //     // New Non-Labor Staff Cost row
// //     financialRows.push({
// //         id: `non-labor-staff-cost-${currentOrgId}`,
// //         description: 'Non-Labor Staff Cost',
// //         total: totalNonLaborCostOverall,
// //         data: totalNonLaborCostByMonth,
// //         type: 'expandable',
// //         nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()), // Attach processed non-labor data
// //         orgId: currentOrgId,
// //     });

// //     financialRows.push({
// //       id: `total-expense-${currentOrgId}`,
// //       description: 'Total Expense',
// //       total: totalExpenseOverall,
// //       data: totalExpenseData,
// //       type: 'summary',
// //       orgId: currentOrgId,
// //     });

// //     financialRows.push({
// //       id: `profit-${currentOrgId}`,
// //       description: 'Profit',
// //       total: totalProfitOverall,
// //       data: profitData,
// //       type: 'summary',
// //       orgId: currentOrgId,
// //     });

// //     dynamicDateRanges.forEach(range => {
// //       const profit = (profitData[range] || 0);
// //       const expense = (totalExpenseData[range] || 0);
// //       profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
// //     });

// //     financialRows.push({
// //       id: `profit-cost-${currentOrgId}`,
// //       description: 'Profit % on Cost',
// //       total: overallProfitOnCost, // Store as decimal, format for display
// //       data: profitOnCostData,
// //       type: 'summary',
// //       orgId: currentOrgId,
// //     });

// //     dynamicDateRanges.forEach(range => {
// //       const profit = (profitData[range] || 0);
// //       let revenueForPercentage = 0;
// //       if (selectedRevenueView === 't&m') {
// //         revenueForPercentage = (tnmRevenueData[range] || 0);
// //       } else if (selectedRevenueView === 'cpff') {
// //         revenueForPercentage = (cpffRevenueData[range] || 0);
// //       }
// //       profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
// //     });

// //     financialRows.push({
// //       id: `profit-revenue-${currentOrgId}`,
// //       description: 'Profit % on Revenue',
// //       total: overallProfitOnRevenue, // Store as decimal, format for display
// //       data: profitOnRevenueData,
// //       type: 'summary',
// //       orgId: currentOrgId,
// //     });

// //     console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
// //     return financialRows;
// //   }, [selectedRevenueView]);

// // Old code ends //

// // Current Code //
// const transformApiDataToFinancialRows = useCallback((
//   apiResponse,
//   currentOrgId,
//   dynamicDateRanges,
//   selectedRevenueView,
//   planType
// ) => {
//   console.log("transformApiDataToFinancialRows: RAW apiResponse", apiResponse);
//   console.log("transformApiDataToFinancialRows: currentOrgId", currentOrgId);
//   console.log("transformApiDataToFinancialRows: dynamicDateRanges (columns)", dynamicDateRanges);
//   console.log("transformApiDataToFinancialRows: planType", planType);

//   const financialRows = [];

//   // Initialize all data objects to ensure all date ranges are covered
//   const monthlyRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const totalExpenseData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const profitData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const profitOnCostData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const profitOnRevenueData = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const totalStaffCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});
//   const totalNonLaborCostByMonth = dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {});

//   // Use the top-level 'revenue' field for the overall total, as confirmed by the user
//   const totalRevenueOverall = apiResponse.revenue || 0;

//   // Process monthly data from the monthlyRevenueSummary array as requested
//   const monthlyRevenueSummary = apiResponse.monthlyRevenueSummary || [];
//   monthlyRevenueSummary.forEach(monthData => {
//     const monthRange = getMonthRangeKey(monthData.month, monthData.year);
//     if (monthRange && dynamicDateRanges.includes(monthRange)) {
//       // Populate Revenue data
//       monthlyRevenueData[monthRange] = monthData.revenue || 0;

//       // Populate Staff Cost and Non-Labor Cost data as requested
//       const staffCost = monthData.cost || 0;
//       const nonLaborCost = monthData.otherDifrectCost || 0;

//       totalStaffCostByMonth[monthRange] = staffCost;
//       totalNonLaborCostByMonth[monthRange] = nonLaborCost;

//       // Calculate total expense for the month
//       totalExpenseData[monthRange] = staffCost + nonLaborCost;
//     }
//   });

//   // Calculate overall totals from the monthly data
//   const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce((sum, val) => sum + val, 0);
//   const totalNonLaborCostOverall = Object.values(totalNonLaborCostByMonth).reduce((sum, val) => sum + val, 0);
//   const totalExpenseOverall = Object.values(totalExpenseData).reduce((sum, val) => sum + val, 0);
//   const totalProfitOverall = totalRevenueOverall - totalExpenseOverall;

//   // The rest of the function remains the same, but the cost calculations are now based on monthlyRevenueSummary

//   const uniqueEmployeesMap = new Map();
//   const filteredEmployeeSummaries = (apiResponse.employeeForecastSummary || []).filter(empSummary => {
//     const isOrgMatch = currentOrgId ? empSummary.orgID === currentOrgId : true;
//     return isOrgMatch;
//   });

//   if (filteredEmployeeSummaries.length > 0) {
//     filteredEmployeeSummaries.forEach(empSummary => {
//       // Use emplId as the unique key for the employee map
//       if (!uniqueEmployeesMap.has(empSummary.emplId)) {
//         uniqueEmployeesMap.set(empSummary.emplId, {
//           id: empSummary.emplId,
//           name: `${empSummary.name} (${empSummary.emplId})`,
//           cost: 0,
//           accountId: empSummary.accID || '',
//           orgId: empSummary.orgId || '',
//           glcPlc: empSummary.plcCode || '',
//           hrlyRate: empSummary.perHourRate || 0,
//           monthlyHours: {},
//           monthlyCost: {},
//           detailSummary: {},
//         });
//       }
//       const employee = uniqueEmployeesMap.get(empSummary.emplId);

//       const payrollSalaries = empSummary.emplSchedule?.payrollSalary || [];
//       payrollSalaries.forEach(salaryEntry => {
//         const monthRange = getMonthRangeKey(salaryEntry.month, salaryEntry.year);

//         if (monthRange && dynamicDateRanges.includes(monthRange)) {
//           const monthlyBurdenCost = salaryEntry.totalBurdenCost || salaryEntry.cost || 0;
//           employee.monthlyCost[monthRange] = (employee.monthlyCost[monthRange] || 0) + monthlyBurdenCost;
//           employee.monthlyHours[monthRange] = (employee.monthlyHours[monthRange] || 0) + (salaryEntry.hours || 0);

//           // Populate employee details
//           if (!employee.detailSummary['Raw Cost']) employee.detailSummary['Raw Cost'] = {};
//           employee.detailSummary['Raw Cost'][monthRange] = (employee.detailSummary['Raw Cost'][monthRange] || 0) + (salaryEntry.cost || 0);

//           if (!employee.detailSummary['Fringe Benefits']) employee.detailSummary['Fringe Benefits'] = {};
//           employee.detailSummary['Fringe Benefits'][monthRange] = (employee.detailSummary['Fringe Benefits'][monthRange] || 0) + (salaryEntry.fringe || 0);

//           if (!employee.detailSummary['Overhead']) employee.detailSummary['Overhead'] = {};
//           employee.detailSummary['Overhead'][monthRange] = (employee.detailSummary['Overhead'][monthRange] || 0) + (salaryEntry.overhead || 0);

//           if (!employee.detailSummary['General & Admin']) employee.detailSummary['General & Admin'] = {};
//           employee.detailSummary['General & Admin'][monthRange] = (employee.detailSummary['General & Admin'][monthRange] || 0) + (salaryEntry.gna || 0);
//         }
//       });
//     });
//   }

//   // The non-labor cost summary loop is no longer needed for monthly totals, but is kept to get detailed data
//   const nonLaborAcctDetailsMap = new Map();
//   const allNonLaborSummariesFiltered = [
//     ...(apiResponse.directCOstForecastSummary || []),
//     ...(apiResponse.indirectCostForecastSummary || [])
//   ].filter(nonLaborSummary => {
//     const isOrgMatch = currentOrgId ? nonLaborSummary.orgID === currentOrgId : true;
//     return isOrgMatch;
//   });

//   allNonLaborSummariesFiltered.forEach(nonLaborSummary => {
//     const schedules = (nonLaborSummary.directCostSchedule?.forecasts) ||
//                       (nonLaborSummary.indirectCostSchedule?.forecasts) || [];
//     const accountId = nonLaborSummary.accID;
//     const orgId = nonLaborSummary.orgID;
//     const glcPlc = nonLaborSummary.plcCode || '';
//     const accName = nonLaborSummary.accName || `Account: ${accountId}`;

//     if (!nonLaborAcctDetailsMap.has(accountId)) {
//       nonLaborAcctDetailsMap.set(accountId, {
//         id: accountId,
//         description: accName,
//         orgId: orgId,
//         glcPlc: glcPlc,
//         total: 0,
//         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
//         employees: new Map(),
//       });
//     }
//     const acctGroup = nonLaborAcctDetailsMap.get(accountId);
//     const employeeId = nonLaborSummary.emplId || 'N/A_Employee';
//     const employeeName = nonLaborSummary.name || ` ${accountId}`;

//     if (!acctGroup.employees.has(employeeId)) {
//       acctGroup.employees.set(employeeId, {
//         id: employeeId,
//         name: `${employeeName} (${employeeId})`,
//         total: 0,
//         monthlyData: dynamicDateRanges.reduce((acc, range) => ({ ...acc, [range]: 0 }), {}),
//         entries: [],
//       });
//     }
//     const employeeGroup = acctGroup.employees.get(employeeId);

//     schedules.forEach(scheduleEntry => {
//       const monthRange = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//       if (monthRange && dynamicDateRanges.includes(monthRange)) {
//         let entryCost = 0;
//         if (planType === 'EAC') {
//           entryCost = scheduleEntry.actualamt || 0;
//         } else if (planType === 'BUD') {
//           entryCost = scheduleEntry.forecastedamt || 0;
//         } else {
//           entryCost = (scheduleEntry.cost || 0) + (scheduleEntry.fringe || 0) + (scheduleEntry.overhead || 0) + (scheduleEntry.gna || 0) + (scheduleEntry.materials || 0);
//         }
//         employeeGroup.entries.push({
//           id: `${scheduleEntry.dctId || scheduleEntry.forecastid}-${monthRange}`,
//           dctId: scheduleEntry.dctId,
//           forecastid: scheduleEntry.forecastid,
//           monthLabel: `${String(scheduleEntry.month).padStart(2, '0')}/${scheduleEntry.year}`,
//           total: entryCost,
//           monthlyValues: { [monthRange]: entryCost }
//         });
//         employeeGroup.monthlyData[monthRange] += entryCost;
//         employeeGroup.total += entryCost;
//         acctGroup.monthlyData[monthRange] += entryCost;
//         acctGroup.total += entryCost;
//       }
//     });
//   });

//   Array.from(uniqueEmployeesMap.values()).forEach(employee => {
//     employee.cost = Object.values(employee.monthlyCost).reduce((sum, val) => sum + val, 0);
//   });
//   Array.from(nonLaborAcctDetailsMap.values()).forEach(acctGroup => {
//     acctGroup.total = Object.values(acctGroup.monthlyData).reduce((sum, val) => sum + val, 0);
//     acctGroup.employees = Array.from(acctGroup.employees.values());
//   });

//   const selectedRevenueData = selectedRevenueView === 't&m' ? monthlyRevenueData : monthlyRevenueData;

//   dynamicDateRanges.forEach(range => {
//     profitData[range] = (selectedRevenueData[range] || 0) - (totalExpenseData[range] || 0);
//   });

//   const overallProfitOnCost = totalExpenseOverall !== 0 ? (totalProfitOverall / totalExpenseOverall) : 0;
//   const overallProfitOnRevenue = totalRevenueOverall !== 0
//     ? (totalProfitOverall / totalRevenueOverall)
//     : 0;

//   financialRows.push({
//     id: `revenue-${currentOrgId}`,
//     description: 'Revenue',
//     total: totalRevenueOverall,
//     data: selectedRevenueData,
//     tnmRevenueData: monthlyRevenueData,
//     cpffRevenueData: monthlyRevenueData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `total-staff-cost-${currentOrgId}`,
//     description: 'Total Staff Cost',
//     total: totalStaffCostOverall,
//     data: totalStaffCostByMonth,
//     type: 'expandable',
//     employees: Array.from(uniqueEmployeesMap.values()),
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `non-labor-staff-cost-${currentOrgId}`,
//     description: 'Non-Labor Staff Cost',
//     total: totalNonLaborCostOverall,
//     data: totalNonLaborCostByMonth,
//     type: 'expandable',
//     nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()),
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `total-expense-${currentOrgId}`,
//     description: 'Total Expense',
//     total: totalExpenseOverall,
//     data: totalExpenseData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   financialRows.push({
//     id: `profit-${currentOrgId}`,
//     description: 'Profit',
//     total: totalProfitOverall,
//     data: profitData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   dynamicDateRanges.forEach(range => {
//     const profit = (profitData[range] || 0);
//     const expense = (totalExpenseData[range] || 0);
//     profitOnCostData[range] = expense !== 0 ? (profit / expense) : 0;
//   });

//   financialRows.push({
//     id: `profit-cost-${currentOrgId}`,
//     description: 'Profit % on Cost',
//     total: overallProfitOnCost,
//     data: profitOnCostData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   dynamicDateRanges.forEach(range => {
//     const profit = (profitData[range] || 0);
//     let revenueForPercentage = (selectedRevenueData[range] || 0);
//     profitOnRevenueData[range] = revenueForPercentage !== 0 ? (profit / revenueForPercentage) : 0;
//   });

//   financialRows.push({
//     id: `profit-revenue-${currentOrgId}`,
//     description: 'Profit % on Revenue',
//     total: overallProfitOnRevenue,
//     data: profitOnRevenueData,
//     type: 'summary',
//     orgId: currentOrgId,
//   });

//   console.log("transformApiDataToFinancialRows: Final financialRows", financialRows);
//   return financialRows;
// }, [selectedRevenueView]);

// function getMonthRangeKey(period, year) {
//   if (period === undefined || year === undefined) {
//     return null;
//   }
//   const month = String(period).padStart(2, '0');
//   return `${month}/${year}`;
// }
// // You will still need to ensure your existing `getMonthRangeKey` helper function is correctly defined elsewhere in the file.
// // Note: The getMonthRangeKey function is assumed to be defined elsewhere in your file.
// // function getMonthRangeKey(period, year) {
// //   // This helper function must also be updated to match the format from getMonthlyDateRanges
// //   const month = String(period).padStart(2, '0');
// //   const monthRange = `${month}/${year}`;
// //   return monthRange;
// // }

//   // This useEffect now processes the initialApiData received from props
//   useEffect(() => {
//     console.log("useEffect [initialApiData, isLoading, error, fiscalYear]: Effect triggered.");
//     if (isLoading) {
//       console.log("useEffect: Data is still loading.");
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     // This error prop is from the parent component.
//     // If there's an error from the parent, we should display it.
//     if (error) {
//       console.log("useEffect: Error received from parent:", error);
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     if (!initialApiData || Object.keys(initialApiData).length === 0) {
//       console.log("useEffect: initialApiData is null, undefined, or empty.");
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//       return;
//     }

//     try {
//       console.log("useEffect: Processing initialApiData for deep fiscal year filtering...");

//       const processedApiData = { ...initialApiData }; // Start with a copy

//       // Filter employee summaries and their internal payrollSalary
//       processedApiData.employeeForecastSummary = (initialApiData.employeeForecastSummary || [])
//         .map(empSummary => {
//           const filteredPayrollSalary = (empSummary.emplSchedule?.payrollSalary || []).filter(salaryEntry => {
//             return !fiscalYear || fiscalYear === "All" || String(salaryEntry.year) === fiscalYear;
//           });

//           if (filteredPayrollSalary.length > 0) {
//             return {
//               ...empSummary,
//               emplSchedule: {
//                 ...empSummary.emplSchedule,
//                 payrollSalary: filteredPayrollSalary,
//               },
//             };
//           }
//           return null; // Mark for removal if no relevant data
//         })
//         .filter(Boolean); // Remove null entries

//       console.log("useEffect: employeeForecastSummary after deep fiscalYear filter:", processedApiData.employeeForecastSummary);

//       // Filter direct cost summaries and their internal forecasts
//       processedApiData.directCOstForecastSummary = (initialApiData.directCOstForecastSummary || [])
//         .map(nonLaborSummary => {
//           const filteredForecasts = (nonLaborSummary.directCostSchedule?.forecasts || []).filter(f => {
//             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
//           });
//           if (filteredForecasts.length > 0) {
//             return {
//               ...nonLaborSummary,
//               directCostSchedule: {
//                 ...nonLaborSummary.directCostSchedule,
//                 forecasts: filteredForecasts,
//               },
//             };
//           }
//           return null;
//         })
//         .filter(Boolean);
//       console.log("useEffect: directCOstForecastSummary after deep fiscalYear filter:", processedApiData.directCOstForecastSummary);

//       // Filter indirect cost summaries and their internal forecasts
//       processedApiData.indirectCostForecastSummary = (initialApiData.indirectCostForecastSummary || [])
//         .map(nonLaborSummary => {
//           const filteredForecasts = (nonLaborSummary.indirectCostSchedule?.forecasts || []).filter(f => {
//             return !fiscalYear || fiscalYear === "All" || String(f.year) === fiscalYear;
//           });
//           if (filteredForecasts.length > 0) {
//             return {
//               ...nonLaborSummary,
//               indirectCostSchedule: {
//                 ...nonLaborSummary.indirectCostSchedule,
//                 forecasts: filteredForecasts,
//               },
//             };
//           }
//           return null;
//         })
//         .filter(Boolean);
//       console.log("useEffect: indirectCostSummariesFiltered after deep fiscalYear filter:", processedApiData.indirectCostForecastSummary);

//       setAllApiData(processedApiData); // Set the fiscalYear-filtered data to allApiData

//       const uniqueOrgIds = new Set();
//       const uniqueDateRangesSet = new Set();

//       // Collect org IDs and date ranges from the NOW FULLY FILTERED employee data
//       (processedApiData.employeeForecastSummary || []).forEach(summary => {
//         uniqueOrgIds.add(summary.orgID);
//         summary.emplSchedule?.payrollSalary?.forEach(salaryEntry => {
//           const monthRangeKey = getMonthRangeKey(salaryEntry.month, salaryEntry.year);
//           uniqueDateRangesSet.add(monthRangeKey);
//         });
//       });

//       // Collect org IDs and date ranges from the NOW FULLY FILTERED non-labor data
//       (processedApiData.directCOstForecastSummary || []).forEach(nonLaborSummary => {
//         uniqueOrgIds.add(nonLaborSummary.orgID);
//         nonLaborSummary.directCostSchedule?.forecasts?.forEach(scheduleEntry => {
//           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//           uniqueDateRangesSet.add(monthRangeKey);
//         });
//       });

//       (processedApiData.indirectCostForecastSummary || []).forEach(nonLaborSummary => {
//         uniqueOrgIds.add(nonLaborSummary.orgID);
//         nonLaborSummary.indirectCostSchedule?.forecasts?.forEach(scheduleEntry => {
//           const monthRangeKey = getMonthRangeKey(scheduleEntry.month, scheduleEntry.year);
//           uniqueDateRangesSet.add(monthRangeKey);
//         });
//       });

//       const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
//           const [, , yearAStr] = a.split('_');
//           const [monthAStr,] = a.split('/')[0].split('-');
//           const yearA = parseInt(yearAStr, 10);
//           const monthA = parseInt(monthAStr, 10);

//           const [, , yearBStr] = b.split('_');
//           const [monthBStr,] = b.split('/')[0].split('-');
//           const yearB = parseInt(yearBStr, 10);
//           const monthB = parseInt(monthBStr, 10);

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
//     } catch (e) {
//       console.error("Error during initial API data processing:", e);
//       setAllApiData(null);
//       setDynamicDateRanges([]);
//       setSelectedOrgId('');
//       setAvailableOrgIds([]);
//       setFinancialData([]);
//     }
//   }, [initialApiData, isLoading, error, fiscalYear]); // Depend on initialApiData, isLoading, error, and fiscalYear props

//   useEffect(() => {
//     console.log("useEffect [allApiData, selectedOrgId, dynamicDateRanges, ...]: Transform trigger effect.");
//     if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
//       console.log("useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data...");
//       const transformedData = transformApiDataToFinancialRows(
//         allApiData, // allApiData is now pre-filtered by fiscal year
//         selectedOrgId,
//         dynamicDateRanges,
//         selectedRevenueView,
//         type,
//         initialApiData.revenue // Pass the 'type' prop (which is plType)
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
//   }, [allApiData, selectedOrgId, dynamicDateRanges, selectedRevenueView, transformApiDataToFinancialRows, type]); // Removed fiscalYear from dependencies as it's handled by allApiData now

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
//             {/* <thead>
//               <tr className="bg-gray-100 bg-opacity-50">
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
//                 <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
//                 {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
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
//             </thead> */}
//             <thead>
//   <tr className="bg-gray-100 bg-opacity-50">
//     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">Description</th>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Account ID</th>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Org ID</th>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">GLC/PLC</th>
//     <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">Hrly Rate</th>
//     <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider">Total</th>
//     {dynamicDateRanges.length > 0 && dynamicDateRanges.map((range) => {
//       // The `range` variable is a string like "01/2025"
//       // Split the string into two parts: month and year
//       const [monthPart, yearPart] = range.split('/');

//       return (
//         <th key={range} className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
//           {`${monthPart}/${yearPart}`}
//         </th>
//       );
//     })}
//   </tr>
// </thead>
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
//                           console.log(`  Rendering cell for row: ${row.description}, range: ${range}, data: ${dataForRange}`); // Added log

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
//                                     {/* Account Group Row for Non-Labor (e.g., "Account: 647-004-140 - Hotel") */}
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
//                                         <React.Fragment> {/* Changed from <> to React.Fragment for consistency and clarity */}
//                                             <tr className="bg-gray-100 bg-opacity-30">
//                                                 {/* Adjusted colSpan to align 'Employee' with 'Description' in the main table */}
//                                                 <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase sticky left-0 z-10 bg-inherit">Employee</td>
//                                                 <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Span remaining header columns before Total */}
//                                                 <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase"></td>
//                                                  {/* <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase">Total</td> */}
//                                                 {/* {dynamicDateRanges.map((range) => (
//                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
//                                                         {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`}
//                                                     </td>
//                                                 ))} */}
//                                                 {dynamicDateRanges.map((range) => (
//                                                     <td key={`header-employee-group-${range}`} className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap">
//                                                         {/* {`${range.split('_')[0].split('/')[0]}/${range.split('_')[1]}`} */}
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                             {acctGroup.employees.map((employeeGroup) => (
//                                                 // Removed React.Fragment here as the outer React.Fragment handles it
//                                                 <tr key={`${acctGroup.id}-${employeeGroup.id}`}
//                                                     className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs"
//                                                 >
//                                                     {/* Adjusted empty cell for alignment */}
//                                                     <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
//                                                         {employeeGroup.name}
//                                                     </td>
//                                                     <td className="py-2 px-4 text-left whitespace-nowrap" colSpan="4"></td> {/* Span remaining header columns before Total */}
//                                                     <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">{formatValue(employeeGroup.total)}</td>
//                                                     {dynamicDateRanges.map((currentRange) => (
//                                                         <td key={`${employeeGroup.id}-${currentRange}-monthly-total`} className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
//                                                             {formatValue(employeeGroup.monthlyData[currentRange] || 0)}
//                                                         </td>
//                                                     ))}
//                                                 </tr>
//                                             ))}
//                                         </React.Fragment>
//                                     )}
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

"use client";

import { useState, useEffect, useCallback } from "react";
import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { data } from "react-router-dom";

const AnalysisByPeriodContent = ({
  onCancel,
  planID,
  templateId,
  type,
  initialApiData,
  isLoading,
  error,
  fiscalYear,
}) => {
  // Added console.log for fiscalYear prop at the very top
  console.log("AnalysisByPeriodContent: Received fiscalYear prop:", fiscalYear);
  console.log(
    "AnalysisByPeriodContent: Received initialApiData prop:",
    initialApiData
  );

  const [expandedStaffRows, setExpandedStaffRows] = useState([]);
  const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]);
  const [expandedNonLaborAcctRows, setExpandedNonLaborAcctRows] = useState([]); // State for non-labor account expansion
  const [financialData, setFinancialData] = useState([]);

  const [allApiData, setAllApiData] = useState(null); // This will now hold the fiscalYear-filtered data
  const [dynamicDateRanges, setDynamicDateRanges] = useState([]);

  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [availableOrgIds, setAvailableOrgIds] = useState([]);

  const [selectedRevenueView, setSelectedRevenueView] = useState("t&m");

  // Replace your existing getMonthRangeKey function with this one
  function getMonthRangeKey(period, year) {
    // Add this check to prevent crashes if period or year are missing
    if (period === undefined || year === undefined) {
      return null;
    }
    const month = String(period).padStart(2, "0");
    const monthRange = `${month}/${year}`;
    return monthRange;
  }

  // const transformApiDataToFinancialRows = useCallback(
  //   (
  //     apiResponse,
  //     currentOrgId,
  //     dynamicDateRanges,
  //     selectedRevenueView,
  //     planType
  //   ) => {
  //     console.log(
  //       "transformApiDataToFinancialRows: RAW apiResponse",
  //       apiResponse
  //     );

  //     const financialRows = [];
  //     const monthlyRevenueData = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );
  //     const totalExpenseData = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );
  //     const profitData = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );
  //     const profitOnCostData = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );
  //     const profitOnRevenueData = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );
  //     const totalStaffCostByMonth = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );
  //     const totalNonLaborCostByMonth = dynamicDateRanges.reduce(
  //       (acc, range) => ({ ...acc, [range]: 0 }),
  //       {}
  //     );

  //     const totalRevenueOverall = apiResponse.revenue || 0;

  //     const monthlyRevenueSummary = apiResponse.monthlyRevenueSummary || [];
  //     monthlyRevenueSummary.forEach((monthData) => {
  //       const monthRange = getMonthRangeKey(monthData.month, monthData.year);
  //       if (monthRange && dynamicDateRanges.includes(monthRange)) {
  //         monthlyRevenueData[monthRange] = monthData.revenue || 0;
  //         const staffCost = monthData.cost || 0;
  //         const nonLaborCost = monthData.otherDifrectCost || 0;
  //         totalStaffCostByMonth[monthRange] = staffCost;
  //         totalNonLaborCostByMonth[monthRange] = nonLaborCost;
  //         totalExpenseData[monthRange] = staffCost + nonLaborCost;
  //       }
  //     });

  //     // ====================================================================
  //     // PRORATION LOGIC STARTS HERE
  //     // ====================================================================

  //     const uniqueEmployeesMap = new Map();
  //     const filteredEmployeeSummaries = (
  //       apiResponse.employeeForecastSummary || []
  //     ).filter((empSummary) => {
  //       const isOrgMatch = currentOrgId
  //         ? empSummary.orgID === currentOrgId
  //         : true;
  //       return isOrgMatch;
  //     });

  //     // STEP 1: Pre-process data to get overall monthly totals for each cost component for each employee.
  //     const employeeOverallTotals = new Map();
  //     filteredEmployeeSummaries.forEach((empSummary) => {
  //       if (!employeeOverallTotals.has(empSummary.emplId)) {
  //         const totals = {
  //           grandTotalHours: 0,
  //           monthlyHours: {},
  //           monthlyRawCost: {},
  //           monthlyFringe: {},
  //           monthlyOverhead: {},
  //           monthlyGNA: {},
  //         };

  //         (empSummary.emplSchedule?.payrollSalary || []).forEach(
  //           (salaryEntry) => {
  //             const monthRange = getMonthRangeKey(
  //               salaryEntry.month,
  //               salaryEntry.year
  //             );
  //             if (monthRange && dynamicDateRanges.includes(monthRange)) {
  //               totals.monthlyHours[monthRange] =
  //                 (totals.monthlyHours[monthRange] || 0) +
  //                 (salaryEntry.hours || 0);
  //               totals.monthlyRawCost[monthRange] =
  //                 (totals.monthlyRawCost[monthRange] || 0) +
  //                 (salaryEntry.cost || 0);
  //               totals.monthlyFringe[monthRange] =
  //                 (totals.monthlyFringe[monthRange] || 0) +
  //                 (salaryEntry.fringe || 0);
  //               totals.monthlyOverhead[monthRange] =
  //                 (totals.monthlyOverhead[monthRange] || 0) +
  //                 (salaryEntry.overhead || 0);
  //               totals.monthlyGNA[monthRange] =
  //                 (totals.monthlyGNA[monthRange] || 0) + (salaryEntry.gna || 0);
  //             }
  //           }
  //         );

  //         totals.grandTotalHours = Object.values(totals.monthlyHours).reduce(
  //           (sum, hours) => sum + hours,
  //           0
  //         );
  //         employeeOverallTotals.set(empSummary.emplId, totals);
  //       }
  //     });

  //     // STEP 2: Process each assignment summary to create distinct, prorated rows.
  //     if (filteredEmployeeSummaries.length > 0) {
  //       filteredEmployeeSummaries.forEach((empSummary) => {
  //         // Use the composite key to uniquely identify each employee assignment
  //         const compositeKey = `${empSummary.emplId}-${empSummary.plcCode}-${empSummary.orgID}-${empSummary.accID}`;

  //         if (!uniqueEmployeesMap.has(compositeKey)) {
  //           const employeeData = {
  //             id: compositeKey,
  //             name: `${empSummary.name} (${empSummary.plcCode})`,
  //             // Use the accurate total cost and hours directly from the summary object
  //             cost: empSummary.totalForecastedCost,
  //             totalHours: empSummary.totalForecastedHours,
  //             accountId: empSummary.accID || "",
  //             orgId: empSummary.orgID || "",
  //             glcPlc: empSummary.plcCode || "",
  //             hrlyRate: empSummary.perHourRate || 0,
  //             monthlyHours: {},
  //             monthlyCost: {},
  //             detailSummary: {
  //               "Raw Cost": {},
  //               "Fringe Benefits": {},
  //               Overhead: {},
  //               "General & Admin": {},
  //             },
  //           };

  //           const overallTotals = employeeOverallTotals.get(empSummary.emplId);

  //           // Calculate the proration factor for this specific assignment.
  //           const prorationFactor =
  //             overallTotals && overallTotals.grandTotalHours > 0
  //               ? empSummary.totalForecastedHours /
  //                 overallTotals.grandTotalHours
  //               : 0;

  //           // Reconstruct all monthly data for this assignment using the proration factor.
  //           dynamicDateRanges.forEach((monthRange) => {
  //             // Prorate hours
  //             const totalMonthlyHoursForEmployee =
  //               overallTotals?.monthlyHours[monthRange] || 0;
  //             employeeData.monthlyHours[monthRange] =
  //               totalMonthlyHoursForEmployee * prorationFactor;

  //             // Prorate detailed cost components
  //             const proratedRawCost =
  //               (overallTotals?.monthlyRawCost[monthRange] || 0) *
  //               prorationFactor;
  //             const proratedFringe =
  //               (overallTotals?.monthlyFringe[monthRange] || 0) *
  //               prorationFactor;
  //             const proratedOverhead =
  //               (overallTotals?.monthlyOverhead[monthRange] || 0) *
  //               prorationFactor;
  //             const proratedGNA =
  //               (overallTotals?.monthlyGNA[monthRange] || 0) * prorationFactor;

  //             employeeData.detailSummary["Raw Cost"][monthRange] =
  //               proratedRawCost;
  //             employeeData.detailSummary["Fringe Benefits"][monthRange] =
  //               proratedFringe;
  //             employeeData.detailSummary["Overhead"][monthRange] =
  //               proratedOverhead;
  //             employeeData.detailSummary["General & Admin"][monthRange] =
  //               proratedGNA;

  //             // The total monthly cost is the sum of its prorated components.
  //             employeeData.monthlyCost[monthRange] =
  //               proratedRawCost +
  //               proratedFringe +
  //               proratedOverhead +
  //               proratedGNA;
  //           });

  //           uniqueEmployeesMap.set(compositeKey, employeeData);
  //         }
  //       });
  //     }

  //     // ====================================================================
  //     // END OF PRORATION LOGIC
  //     // ====================================================================

  //     const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce(
  //       (sum, val) => sum + val,
  //       0
  //     );
  //     const totalNonLaborCostOverall = Object.values(
  //       totalNonLaborCostByMonth
  //     ).reduce((sum, val) => sum + val, 0);
  //     const totalExpenseOverall = Object.values(totalExpenseData).reduce(
  //       (sum, val) => sum + val,
  //       0
  //     );
  //     const totalProfitOverall = totalRevenueOverall - totalExpenseOverall;

  //     const nonLaborAcctDetailsMap = new Map();
  //     const allNonLaborSummariesFiltered = [
  //       ...(apiResponse.directCOstForecastSummary || []),
  //       ...(apiResponse.indirectCostForecastSummary || []),
  //     ].filter((nonLaborSummary) =>
  //       currentOrgId ? nonLaborSummary.orgID === currentOrgId : true
  //     );

  //     allNonLaborSummariesFiltered.forEach((nonLaborSummary) => {
  //       const schedules =
  //         nonLaborSummary.directCostSchedule?.forecasts ||
  //         nonLaborSummary.indirectCostSchedule?.forecasts ||
  //         [];
  //       const accountId = nonLaborSummary.accID;
  //       if (!nonLaborAcctDetailsMap.has(accountId)) {
  //         nonLaborAcctDetailsMap.set(accountId, {
  //           id: accountId,
  //           description: nonLaborSummary.accName || `Account: ${accountId}`,
  //           orgId: nonLaborSummary.orgID,
  //           glcPlc: nonLaborSummary.plcCode || "",
  //           total: 0,
  //           monthlyData: dynamicDateRanges.reduce(
  //             (acc, range) => ({ ...acc, [range]: 0 }),
  //             {}
  //           ),
  //           employees: new Map(),
  //         });
  //       }
  //       const acctGroup = nonLaborAcctDetailsMap.get(accountId);
  //       schedules.forEach((scheduleEntry) => {
  //         const monthRange = getMonthRangeKey(
  //           scheduleEntry.month,
  //           scheduleEntry.year
  //         );
  //         if (monthRange && dynamicDateRanges.includes(monthRange)) {
  //           let entryCost = 0;
  //           if (planType === "EAC") {
  //             entryCost = scheduleEntry.actualamt || 0;
  //           } else if (planType === "BUD") {
  //             entryCost = scheduleEntry.forecastedamt || 0;
  //           } else {
  //             entryCost =
  //               (scheduleEntry.cost || 0) +
  //               (scheduleEntry.fringe || 0) +
  //               (scheduleEntry.overhead || 0) +
  //               (scheduleEntry.gna || 0) +
  //               (scheduleEntry.materials || 0);
  //           }
  //           acctGroup.monthlyData[monthRange] += entryCost;
  //         }
  //       });
  //     });

  //     Array.from(nonLaborAcctDetailsMap.values()).forEach((acctGroup) => {
  //       acctGroup.total = Object.values(acctGroup.monthlyData).reduce(
  //         (sum, val) => sum + val,
  //         0
  //       );
  //     });

  //     dynamicDateRanges.forEach((range) => {
  //       profitData[range] =
  //         (monthlyRevenueData[range] || 0) - (totalExpenseData[range] || 0);
  //     });

  //     const overallProfitOnCost =
  //       totalExpenseOverall !== 0
  //         ? totalProfitOverall / totalExpenseOverall
  //         : 0;
  //     const overallProfitOnRevenue =
  //       totalRevenueOverall !== 0
  //         ? totalProfitOverall / totalRevenueOverall
  //         : 0;

  //     financialRows.push({
  //       id: `revenue-${currentOrgId}`,
  //       description: "Revenue",
  //       total: totalRevenueOverall,
  //       data: monthlyRevenueData,
  //       type: "summary",
  //       orgId: currentOrgId,
  //     });

  //     financialRows.push({
  //       id: `total-staff-cost-${currentOrgId}`,
  //       description: "Total Staff Cost",
  //       total: totalStaffCostOverall,
  //       data: totalStaffCostByMonth,
  //       type: "expandable",
  //       employees: Array.from(uniqueEmployeesMap.values()),
  //       orgId: currentOrgId,
  //     });

  //     financialRows.push({
  //       id: `non-labor-staff-cost-${currentOrgId}`,
  //       description: "Non-Labor Staff Cost",
  //       total: totalNonLaborCostOverall,
  //       data: totalNonLaborCostByMonth,
  //       type: "expandable",
  //       nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()),
  //       orgId: currentOrgId,
  //     });

  //     financialRows.push({
  //       id: `total-expense-${currentOrgId}`,
  //       description: "Total Expense",
  //       total: totalExpenseOverall,
  //       data: totalExpenseData,
  //       type: "summary",
  //       orgId: currentOrgId,
  //     });

  //     financialRows.push({
  //       id: `profit-${currentOrgId}`,
  //       description: "Profit",
  //       total: totalProfitOverall,
  //       data: profitData,
  //       type: "summary",
  //       orgId: currentOrgId,
  //     });

  //     dynamicDateRanges.forEach((range) => {
  //       const profit = profitData[range] || 0;
  //       const expense = totalExpenseData[range] || 0;
  //       profitOnCostData[range] = expense !== 0 ? profit / expense : 0;
  //     });

  //     financialRows.push({
  //       id: `profit-cost-${currentOrgId}`,
  //       description: "Profit % on Cost",
  //       total: overallProfitOnCost,
  //       data: profitOnCostData,
  //       type: "summary",
  //       orgId: currentOrgId,
  //     });

  //     dynamicDateRanges.forEach((range) => {
  //       const profit = profitData[range] || 0;
  //       let revenueForPercentage = monthlyRevenueData[range] || 0;
  //       profitOnRevenueData[range] =
  //         revenueForPercentage !== 0 ? profit / revenueForPercentage : 0;
  //     });

  //     financialRows.push({
  //       id: `profit-revenue-${currentOrgId}`,
  //       description: "Profit % on Revenue",
  //       total: overallProfitOnRevenue,
  //       data: profitOnRevenueData,
  //       type: "summary",
  //       orgId: currentOrgId,
  //     });

  //     console.log(
  //       "transformApiDataToFinancialRows: Final financialRows",
  //       financialRows
  //     );
  //     return financialRows;
  //   },
  //   [selectedRevenueView]
  // );

  // This useEffect now processes the initialApiData received from props

  const transformApiDataToFinancialRows = useCallback(
    (
      apiResponse,
      currentOrgId,
      dynamicDateRanges,
      selectedRevenueView,
      planType
    ) => {
      console.log(
        "transformApiDataToFinancialRows: RAW apiResponse",
        apiResponse
      );
      console.log(
        "transformApiDataToFinancialRows: currentOrgId",
        currentOrgId
      );
      console.log(
        "transformApiDataToFinancialRows: dynamicDateRanges (columns)",
        dynamicDateRanges
      );
      console.log("transformApiDataToFinancialRows: planType", planType);

      const financialRows = [];

      // Initialize totals
      const monthlyRevenueData = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );
      const totalExpenseData = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );
      const profitData = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );
      const profitOnCostData = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );
      const profitOnRevenueData = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );
      const totalStaffCostByMonth = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );
      const totalNonLaborCostByMonth = dynamicDateRanges.reduce(
        (acc, range) => ({ ...acc, [range]: 0 }),
        {}
      );

      const totalRevenueOverall = apiResponse.revenue || 0;

      // Monthly Revenue + Staff/Non-Labor cost
      const monthlyRevenueSummary = apiResponse.monthlyRevenueSummary || [];
      monthlyRevenueSummary.forEach((monthData) => {
        const monthRange = getMonthRangeKey(monthData.month, monthData.year);
        if (monthRange && dynamicDateRanges.includes(monthRange)) {
          monthlyRevenueData[monthRange] = monthData.revenue || 0;

          const staffCost = monthData.cost || 0;
          const nonLaborCost = monthData.otherDifrectCost || 0;

          totalStaffCostByMonth[monthRange] = staffCost;
          totalNonLaborCostByMonth[monthRange] = nonLaborCost;

          totalExpenseData[monthRange] = staffCost + nonLaborCost;
        }
      });

      const totalStaffCostOverall = Object.values(totalStaffCostByMonth).reduce(
        (s, v) => s + v,
        0
      );
      const totalNonLaborCostOverall = Object.values(
        totalNonLaborCostByMonth
      ).reduce((s, v) => s + v, 0);
      const totalExpenseOverall = Object.values(totalExpenseData).reduce(
        (s, v) => s + v,
        0
      );
      const totalProfitOverall = totalRevenueOverall - totalExpenseOverall;

      // ---------- EMPLOYEES ----------
      // const uniqueEmployeesMap = new Map();
      // const filteredEmployeeSummaries = (
      //   apiResponse.employeeForecastSummary || []
      // ).filter((empSummary) => {
      //   const isOrgMatch = currentOrgId
      //     ? empSummary.orgID === currentOrgId
      //     : true;
      //   return isOrgMatch;
      // });

      // if (filteredEmployeeSummaries.length > 0) {
      //   filteredEmployeeSummaries.forEach((empSummary) => {
      //     if (!uniqueEmployeesMap.has(empSummary.emplId)) {
      //       uniqueEmployeesMap.set(empSummary.emplId, {
      //         id: empSummary.emplId,
      //         name: `${empSummary.name} (${empSummary.emplId})`,
      //         cost: 0,
      //         accountId: empSummary.accID || "",
      //         orgId: empSummary.orgId || "",
      //         glcPlc: empSummary.plcCode || "",
      //         hrlyRate: empSummary.perHourRate || 0,
      //         monthlyHours: {},
      //         monthlyCost: {},

      //         // 🔥 new breakdown fields
      //         monthlyRawCost: {},
      //         monthlyFringe: {},
      //         monthlyOverhead: {},
      //         monthlyGna: {},

      //         detailSummary: {},
      //       });
      //     }
      //     const employee = uniqueEmployeesMap.get(empSummary.emplId);

      //     const payrollSalaries = empSummary.emplSchedule?.payrollSalary || [];
      //     payrollSalaries.forEach((salaryEntry) => {
      //       const monthRange = getMonthRangeKey(
      //         salaryEntry.month,
      //         salaryEntry.year
      //       );

      //       if (monthRange && dynamicDateRanges.includes(monthRange)) {
      //         // 🔥 Changed: split into raw / fringe / overhead / gna
      //         employee.monthlyRawCost[monthRange] =
      //           (employee.monthlyRawCost[monthRange] || 0) +
      //           (salaryEntry.cost || 0);
      //         employee.monthlyFringe[monthRange] =
      //           (employee.monthlyFringe[monthRange] || 0) +
      //           (salaryEntry.fringe || 0);
      //         employee.monthlyOverhead[monthRange] =
      //           (employee.monthlyOverhead[monthRange] || 0) +
      //           (salaryEntry.overhead || 0);
      //         employee.monthlyGna[monthRange] =
      //           (employee.monthlyGna[monthRange] || 0) + (salaryEntry.gna || 0);

      //         // total burdened cost
      //         employee.monthlyCost[monthRange] =
      //           (employee.monthlyCost[monthRange] || 0) +
      //           (salaryEntry.totalBurdenCost || 0);

      //         // hours
      //         employee.monthlyHours[monthRange] =
      //           (employee.monthlyHours[monthRange] || 0) +
      //           (salaryEntry.hours || 0);

      //         // 🔥 Updated detailSummary to align with UI rows
      //         if (!employee.detailSummary["Raw Cost"])
      //           employee.detailSummary["Raw Cost"] = {};
      //         employee.detailSummary["Raw Cost"][monthRange] =
      //           (employee.detailSummary["Raw Cost"][monthRange] || 0) +
      //           (salaryEntry.cost || 0);

      //         if (!employee.detailSummary["Fringe Benefits"])
      //           employee.detailSummary["Fringe Benefits"] = {};
      //         employee.detailSummary["Fringe Benefits"][monthRange] =
      //           (employee.detailSummary["Fringe Benefits"][monthRange] || 0) +
      //           (salaryEntry.fringe || 0);

      //         if (!employee.detailSummary["Overhead"])
      //           employee.detailSummary["Overhead"] = {};
      //         employee.detailSummary["Overhead"][monthRange] =
      //           (employee.detailSummary["Overhead"][monthRange] || 0) +
      //           (salaryEntry.overhead || 0);

      //         if (!employee.detailSummary["General & Admin"])
      //           employee.detailSummary["General & Admin"] = {};
      //         employee.detailSummary["General & Admin"][monthRange] =
      //           (employee.detailSummary["General & Admin"][monthRange] || 0) +
      //           (salaryEntry.gna || 0);
      //       }
      //     });
      //   });
      // }

      // ✅ Use Map for unique employees
      const uniqueEmployeesMap = new Map();

      const filteredEmployeeSummaries = (
        apiResponse.employeeForecastSummary || []
      ).filter((empSummary) => {
        const isOrgMatch = currentOrgId
          ? empSummary.orgID === currentOrgId
          : true;
        return isOrgMatch;
      });

      if (filteredEmployeeSummaries.length > 0) {
        filteredEmployeeSummaries.forEach((empSummary) => {
          // 🔥 NEW: create composite key instead of just emplId
          const compositeKey = `${empSummary.emplId}-${empSummary.plcCode}-${empSummary.orgId}-${empSummary.accID}`;

          if (!uniqueEmployeesMap.has(compositeKey)) {
            uniqueEmployeesMap.set(compositeKey, {
              // 🔥 Changed from emplId → compositeKey
              id: compositeKey,
              // 🔥 Changed: display emplId + plcCode for clarity
              name: `${empSummary.name} (${empSummary.emplId}) (${empSummary.plcCode})`,
              cost: 0,
              accountId: empSummary.accID || "",
              orgId: empSummary.orgId || "",
              glcPlc: empSummary.plcCode || "",
              hrlyRate: empSummary.perHourRate || 0,
              monthlyHours: {},
              monthlyCost: {},

              // 🔥 new breakdown fields
              monthlyRawCost: {},
              monthlyFringe: {},
              monthlyOverhead: {},
              monthlyGna: {},

              detailSummary: {},
            });
          }

          // 🔥 Changed: get employee by compositeKey instead of emplId
          const employee = uniqueEmployeesMap.get(compositeKey);

          const payrollSalaries = empSummary.emplSchedule?.payrollSalary || [];
          payrollSalaries.forEach((salaryEntry) => {
            const monthRange = getMonthRangeKey(
              salaryEntry.month,
              salaryEntry.year
            );

            if (monthRange && dynamicDateRanges.includes(monthRange)) {
              // 🔥 Changed: split into raw / fringe / overhead / gna
              employee.monthlyRawCost[monthRange] =
                (employee.monthlyRawCost[monthRange] || 0) +
                (salaryEntry.cost || 0);
              employee.monthlyFringe[monthRange] =
                (employee.monthlyFringe[monthRange] || 0) +
                (salaryEntry.fringe || 0);
              employee.monthlyOverhead[monthRange] =
                (employee.monthlyOverhead[monthRange] || 0) +
                (salaryEntry.overhead || 0);
              employee.monthlyGna[monthRange] =
                (employee.monthlyGna[monthRange] || 0) + (salaryEntry.gna || 0);

              // total burdened cost
              employee.monthlyCost[monthRange] =
                (employee.monthlyCost[monthRange] || 0) +
                (salaryEntry.totalBurdenCost || 0);

              // hours
              employee.monthlyHours[monthRange] =
                (employee.monthlyHours[monthRange] || 0) +
                (salaryEntry.hours || 0);

              // 🔥 Updated detailSummary to align with UI rows
              if (!employee.detailSummary["Raw Cost"])
                employee.detailSummary["Raw Cost"] = {};
              employee.detailSummary["Raw Cost"][monthRange] =
                (employee.detailSummary["Raw Cost"][monthRange] || 0) +
                (salaryEntry.cost || 0);

              if (!employee.detailSummary["Fringe Benefits"])
                employee.detailSummary["Fringe Benefits"] = {};
              employee.detailSummary["Fringe Benefits"][monthRange] =
                (employee.detailSummary["Fringe Benefits"][monthRange] || 0) +
                (salaryEntry.fringe || 0);

              if (!employee.detailSummary["Overhead"])
                employee.detailSummary["Overhead"] = {};
              employee.detailSummary["Overhead"][monthRange] =
                (employee.detailSummary["Overhead"][monthRange] || 0) +
                (salaryEntry.overhead || 0);

              if (!employee.detailSummary["General & Admin"])
                employee.detailSummary["General & Admin"] = {};
              employee.detailSummary["General & Admin"][monthRange] =
                (employee.detailSummary["General & Admin"][monthRange] || 0) +
                (salaryEntry.gna || 0);
            }
          });
        });
      }

      // ---------- NON-LABOR ----------
      const nonLaborAcctDetailsMap = new Map();
      const allNonLaborSummariesFiltered = [
        ...(apiResponse.directCOstForecastSummary || []),
        ...(apiResponse.indirectCostForecastSummary || []),
      ].filter((n) => (currentOrgId ? n.orgID === currentOrgId : true));

      allNonLaborSummariesFiltered.forEach((nonLaborSummary) => {
        const schedules =
          nonLaborSummary.directCostSchedule?.forecasts ||
          nonLaborSummary.indirectCostSchedule?.forecasts ||
          [];
        const accountId = nonLaborSummary.accID;
        const orgId = nonLaborSummary.orgID;
        const glcPlc = nonLaborSummary.plcCode || "";
        const accName = nonLaborSummary.accName || `Account: ${accountId}`;

        if (!nonLaborAcctDetailsMap.has(accountId)) {
          nonLaborAcctDetailsMap.set(accountId, {
            id: accountId,
            description: accName,
            orgId: orgId,
            glcPlc: glcPlc,
            total: 0,
            monthlyData: dynamicDateRanges.reduce(
              (acc, range) => ({ ...acc, [range]: 0 }),
              {}
            ),
            employees: new Map(),
          });
        }
        const acctGroup = nonLaborAcctDetailsMap.get(accountId);
        const employeeId = nonLaborSummary.emplId || "N/A_Employee";
        const employeeName = nonLaborSummary.name || ` ${accountId}`;

        if (!acctGroup.employees.has(employeeId)) {
          acctGroup.employees.set(employeeId, {
            id: employeeId,
            name: `${employeeName} (${employeeId})`,
            total: 0,
            monthlyData: dynamicDateRanges.reduce(
              (acc, range) => ({ ...acc, [range]: 0 }),
              {}
            ),
            entries: [],
          });
        }
        const employeeGroup = acctGroup.employees.get(employeeId);

        schedules.forEach((scheduleEntry) => {
          const monthRange = getMonthRangeKey(
            scheduleEntry.month,
            scheduleEntry.year
          );
          if (monthRange && dynamicDateRanges.includes(monthRange)) {
            let entryCost = 0;
            if (planType === "EAC") {
              entryCost = scheduleEntry.actualamt || 0;
            } else if (planType === "BUD") {
              entryCost = scheduleEntry.forecastedamt || 0;
            } else {
              entryCost =
                (scheduleEntry.cost || 0) +
                (scheduleEntry.fringe || 0) +
                (scheduleEntry.overhead || 0) +
                (scheduleEntry.gna || 0) +
                (scheduleEntry.materials || 0);
            }
            employeeGroup.entries.push({
              id: `${
                scheduleEntry.dctId || scheduleEntry.forecastid
              }-${monthRange}`,
              dctId: scheduleEntry.dctId,
              forecastid: scheduleEntry.forecastid,
              monthLabel: `${String(scheduleEntry.month).padStart(2, "0")}/${
                scheduleEntry.year
              }`,
              total: entryCost,
              monthlyValues: { [monthRange]: entryCost },
            });
            employeeGroup.monthlyData[monthRange] += entryCost;
            employeeGroup.total += entryCost;
            acctGroup.monthlyData[monthRange] += entryCost;
            acctGroup.total += entryCost;
          }
        });
      });

      // ---------- FINALIZE EMPLOYEES ----------
      Array.from(uniqueEmployeesMap.values()).forEach((employee) => {
        // 🔥 recompute totals from new breakdown
        employee.rawCost = Object.values(employee.monthlyRawCost).reduce(
          (s, v) => s + v,
          0
        );
        employee.fringe = Object.values(employee.monthlyFringe).reduce(
          (s, v) => s + v,
          0
        );
        employee.overhead = Object.values(employee.monthlyOverhead).reduce(
          (s, v) => s + v,
          0
        );
        employee.gna = Object.values(employee.monthlyGna).reduce(
          (s, v) => s + v,
          0
        );
        employee.cost = Object.values(employee.monthlyCost).reduce(
          (s, v) => s + v,
          0
        );
      });

      Array.from(nonLaborAcctDetailsMap.values()).forEach((acctGroup) => {
        acctGroup.total = Object.values(acctGroup.monthlyData).reduce(
          (s, v) => s + v,
          0
        );
        acctGroup.employees = Array.from(acctGroup.employees.values());
      });

      // ---------- PROFIT ----------
      const selectedRevenueData =
        selectedRevenueView === "t&m" ? monthlyRevenueData : monthlyRevenueData;
      dynamicDateRanges.forEach((range) => {
        profitData[range] =
          (selectedRevenueData[range] || 0) - (totalExpenseData[range] || 0);
      });

      const overallProfitOnCost =
        totalExpenseOverall !== 0
          ? totalProfitOverall / totalExpenseOverall
          : 0;
      const overallProfitOnRevenue =
        totalRevenueOverall !== 0
          ? totalProfitOverall / totalRevenueOverall
          : 0;

      // ---------- BUILD ROWS ----------
      financialRows.push({
        id: `revenue-${currentOrgId}`,
        description: "Revenue",
        total: totalRevenueOverall,
        data: selectedRevenueData,
        tnmRevenueData: monthlyRevenueData,
        cpffRevenueData: monthlyRevenueData,
        type: "summary",
        orgId: currentOrgId,
      });

      financialRows.push({
        id: `total-staff-cost-${currentOrgId}`,
        description: "Total Staff Cost",
        total: totalStaffCostOverall,
        data: totalStaffCostByMonth,
        type: "expandable",
        employees: Array.from(uniqueEmployeesMap.values()),
        orgId: currentOrgId,
      });

      financialRows.push({
        id: `non-labor-staff-cost-${currentOrgId}`,
        description: "Non-Labor Staff Cost",
        total: totalNonLaborCostOverall,
        data: totalNonLaborCostByMonth,
        type: "expandable",
        nonLaborAccts: Array.from(nonLaborAcctDetailsMap.values()),
        orgId: currentOrgId,
      });

      financialRows.push({
        id: `total-expense-${currentOrgId}`,
        description: "Total Expense",
        total: totalExpenseOverall,
        data: totalExpenseData,
        type: "summary",
        orgId: currentOrgId,
      });

      financialRows.push({
        id: `profit-${currentOrgId}`,
        description: "Profit",
        total: totalProfitOverall,
        data: profitData,
        type: "summary",
        orgId: currentOrgId,
      });

      dynamicDateRanges.forEach((range) => {
        const profit = profitData[range] || 0;
        const expense = totalExpenseData[range] || 0;
        profitOnCostData[range] = expense !== 0 ? profit / expense : 0;
      });

      financialRows.push({
        id: `profit-cost-${currentOrgId}`,
        description: "Profit % on Cost",
        total: overallProfitOnCost,
        data: profitOnCostData,
        type: "summary",
        orgId: currentOrgId,
      });

      dynamicDateRanges.forEach((range) => {
        const profit = profitData[range] || 0;
        let revenueForPercentage = selectedRevenueData[range] || 0;
        profitOnRevenueData[range] =
          revenueForPercentage !== 0 ? profit / revenueForPercentage : 0;
      });

      financialRows.push({
        id: `profit-revenue-${currentOrgId}`,
        description: "Profit % on Revenue",
        total: overallProfitOnRevenue,
        data: profitOnRevenueData,
        type: "summary",
        orgId: currentOrgId,
      });

      console.log(
        "transformApiDataToFinancialRows: Final financialRows",
        financialRows
      );
      return financialRows;
    },
    [selectedRevenueView]
  );

  useEffect(() => {
    console.log(
      "useEffect [initialApiData, isLoading, error, fiscalYear]: Effect triggered."
    );
    if (isLoading) {
      console.log("useEffect: Data is still loading.");
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId("");
      setAvailableOrgIds([]);
      setFinancialData([]);
      return;
    }

    if (error) {
      console.log("useEffect: Error received from parent:", error);
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId("");
      setAvailableOrgIds([]);
      setFinancialData([]);
      return;
    }

    if (!initialApiData || Object.keys(initialApiData).length === 0) {
      console.log("useEffect: initialApiData is null, undefined, or empty.");
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId("");
      setAvailableOrgIds([]);
      setFinancialData([]);
      return;
    }

    try {
      console.log(
        "useEffect: Processing initialApiData for deep fiscal year filtering..."
      );

      const processedApiData = { ...initialApiData }; // Start with a copy

      processedApiData.employeeForecastSummary = (
        initialApiData.employeeForecastSummary || []
      )
        .map((empSummary) => {
          const filteredPayrollSalary = (
            empSummary.emplSchedule?.payrollSalary || []
          ).filter((salaryEntry) => {
            return (
              !fiscalYear ||
              fiscalYear === "All" ||
              String(salaryEntry.year) === fiscalYear
            );
          });

          if (filteredPayrollSalary.length > 0) {
            return {
              ...empSummary,
              emplSchedule: {
                ...empSummary.emplSchedule,
                payrollSalary: filteredPayrollSalary,
              },
            };
          }
          return null;
        })
        .filter(Boolean);

      console.log(
        "useEffect: employeeForecastSummary after deep fiscalYear filter:",
        processedApiData.employeeForecastSummary
      );

      processedApiData.directCOstForecastSummary = (
        initialApiData.directCOstForecastSummary || []
      )
        .map((nonLaborSummary) => {
          const filteredForecasts = (
            nonLaborSummary.directCostSchedule?.forecasts || []
          ).filter((f) => {
            return (
              !fiscalYear ||
              fiscalYear === "All" ||
              String(f.year) === fiscalYear
            );
          });
          if (filteredForecasts.length > 0) {
            return {
              ...nonLaborSummary,
              directCostSchedule: {
                ...nonLaborSummary.directCostSchedule,
                forecasts: filteredForecasts,
              },
            };
          }
          return null;
        })
        .filter(Boolean);
      console.log(
        "useEffect: directCOstForecastSummary after deep fiscalYear filter:",
        processedApiData.directCOstForecastSummary
      );

      processedApiData.indirectCostForecastSummary = (
        initialApiData.indirectCostForecastSummary || []
      )
        .map((nonLaborSummary) => {
          const filteredForecasts = (
            nonLaborSummary.indirectCostSchedule?.forecasts || []
          ).filter((f) => {
            return (
              !fiscalYear ||
              fiscalYear === "All" ||
              String(f.year) === fiscalYear
            );
          });
          if (filteredForecasts.length > 0) {
            return {
              ...nonLaborSummary,
              indirectCostSchedule: {
                ...nonLaborSummary.indirectCostSchedule,
                forecasts: filteredForecasts,
              },
            };
          }
          return null;
        })
        .filter(Boolean);
      console.log(
        "useEffect: indirectCostSummariesFiltered after deep fiscalYear filter:",
        processedApiData.indirectCostForecastSummary
      );

      setAllApiData(processedApiData);

      const uniqueOrgIds = new Set();
      const uniqueDateRangesSet = new Set();

      (processedApiData.employeeForecastSummary || []).forEach((summary) => {
        uniqueOrgIds.add(summary.orgID);
        summary.emplSchedule?.payrollSalary?.forEach((salaryEntry) => {
          const monthRangeKey = getMonthRangeKey(
            salaryEntry.month,
            salaryEntry.year
          );
          uniqueDateRangesSet.add(monthRangeKey);
        });
      });

      (processedApiData.directCOstForecastSummary || []).forEach(
        (nonLaborSummary) => {
          uniqueOrgIds.add(nonLaborSummary.orgID);
          nonLaborSummary.directCostSchedule?.forecasts?.forEach(
            (scheduleEntry) => {
              const monthRangeKey = getMonthRangeKey(
                scheduleEntry.month,
                scheduleEntry.year
              );
              uniqueDateRangesSet.add(monthRangeKey);
            }
          );
        }
      );

      (processedApiData.indirectCostForecastSummary || []).forEach(
        (nonLaborSummary) => {
          uniqueOrgIds.add(nonLaborSummary.orgID);
          nonLaborSummary.indirectCostSchedule?.forecasts?.forEach(
            (scheduleEntry) => {
              const monthRangeKey = getMonthRangeKey(
                scheduleEntry.month,
                scheduleEntry.year
              );
              uniqueDateRangesSet.add(monthRangeKey);
            }
          );
        }
      );

      const sortedDateRanges = Array.from(uniqueDateRangesSet).sort((a, b) => {
        const [monthAStr, yearAStr] = a.split("/");
        const yearA = parseInt(yearAStr, 10);
        const monthA = parseInt(monthAStr, 10);

        const [monthBStr, yearBStr] = b.split("/");
        const yearB = parseInt(yearBStr, 10);
        const monthB = parseInt(monthBStr, 10);

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
        setSelectedOrgId("");
        console.log("useEffect: selectedOrgId set to empty (no orgs found)");
      }
    } catch (e) {
      console.error("Error during initial API data processing:", e);
      setAllApiData(null);
      setDynamicDateRanges([]);
      setSelectedOrgId("");
      setAvailableOrgIds([]);
      setFinancialData([]);
    }
  }, [initialApiData, isLoading, error, fiscalYear]);

  useEffect(() => {
    console.log(
      "useEffect [allApiData, selectedOrgId, dynamicDateRanges, ...]: Transform trigger effect."
    );
    if (allApiData && selectedOrgId && dynamicDateRanges.length > 0) {
      console.log(
        "useEffect (transform trigger): allApiData, selectedOrgId, dynamicDateRanges are ready. Transforming data..."
      );
      const transformedData = transformApiDataToFinancialRows(
        allApiData,
        selectedOrgId,
        dynamicDateRanges,
        selectedRevenueView,
        type,
        initialApiData.revenue
      );
      console.log(
        "Transformed Data (after filter & transform):",
        transformedData
      );
      setFinancialData(transformedData);
    } else {
      console.log(
        "useEffect (transform trigger): Waiting for allApiData, selectedOrgId, or dynamicDateRanges to be ready."
      );
      setFinancialData([]);
    }
    setExpandedStaffRows([]);
    setExpandedEmployeeDetails([]);
    setExpandedNonLaborAcctRows([]);
  }, [
    allApiData,
    selectedOrgId,
    dynamicDateRanges,
    selectedRevenueView,
    transformApiDataToFinancialRows,
    type,
  ]);

  const toggleStaffRow = (id) => {
    setExpandedStaffRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleEmployeeDetail = (id) => {
    setExpandedEmployeeDetails((prev) =>
      prev.includes(id)
        ? prev.filter((detailId) => detailId !== id)
        : [...prev, id]
    );
  };

  const toggleNonLaborAcctRow = (id) => {
    setExpandedNonLaborAcctRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const formatValue = (value, isHours = false, isPercentage = false) => {
    if (typeof value === "number") {
      let formatted;
      if (isPercentage) {
        formatted = (value * 100).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return `${formatted}%`;
      }
      formatted = value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return isHours ? `${formatted} hrs` : formatted;
    }
    return isHours ? "0.00 hrs" : isPercentage ? "0.00%" : "0.00";
  };

  const getGlassmorphismClasses = () => `
    bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg
    border border-opacity-10 border-white shadow-lg
  `;

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 text-gray-800 text-2xl">
        Loading data...
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

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
 
 
  const expandAll = () => {
    // Expand all staff rows
    const staffRowsToExpand = financialData
      .filter(
        (row) =>
          row.type === "expandable" && row.id.startsWith("total-staff-cost")
      )
      .map((row) => row.id);
    setExpandedStaffRows((prev) => [
      ...new Set([...prev, ...staffRowsToExpand]),
    ]);
 
    // Expand all employee details
    const employeeDetailsToExpand = [];
    financialData.forEach((row) => {
      if (
        row.type === "expandable" &&
        row.id.startsWith("total-staff-cost") &&
        row.employees
      ) {
        row.employees.forEach((employee) =>
          employeeDetailsToExpand.push(`${row.id}-${employee.id}`)
        );
      }
    });
    setExpandedEmployeeDetails((prev) => [
      ...new Set([...prev, ...employeeDetailsToExpand]),
    ]);
 
    // Expand all non-labor account rows
    const nonLaborAcctRowsToExpand = [];
    financialData.forEach((row) => {
      if (
        row.type === "expandable" &&
        row.id.startsWith("non-labor-staff-cost") &&
        row.nonLaborAccts
      ) {
        row.nonLaborAccts.forEach((acct) =>
          nonLaborAcctRowsToExpand.push(`${row.id}-${acct.id}`)
        );
      }
    });
    setExpandedNonLaborAcctRows((prev) => [
      ...new Set([...prev, ...nonLaborAcctRowsToExpand]),
    ]);
  };
 
  const collapseAll = () => {
    setExpandedStaffRows([]);
    setExpandedEmployeeDetails([]);
    setExpandedNonLaborAcctRows([]);
  };
 

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-50 p-8 text-gray-800 font-inter">

      <button
        onClick={expandAll}
        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 mb-1"
      >
        Expand All
      </button>
      <button
        onClick={collapseAll}
        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 ml-2 mb-1"
      >
        Collapse All
      </button>
 
      <div className={`p-6 ${getGlassmorphismClasses()}`}>
        <div className="mb-8 flex flex-wrap justify-center items-center gap-4 hidden"></div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 divide-opacity-30">
            <thead>
              <tr className="bg-gray-100 bg-opacity-50">
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider sticky left-0 z-10 bg-inherit">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                  Account ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                  Org ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                  GLC/PLC
                </th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                  Hrly Rate
                </th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap">
                  CTD Total
                </th>
                {dynamicDateRanges.length > 0 &&
                  dynamicDateRanges.map((range) => {
                    const [monthPart, yearPart] = range.split("/");

                    return (
                      <th
                        key={range}
                        className="py-3 px-4 text-right text-sm font-semibold text-blue-700 uppercase tracking-wider whitespace-nowrap"
                      >
                        {`${monthPart}/${yearPart}`}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 divide-opacity-10">
              {financialData.length === 0 ? (
                <tr>
                  <td
                    colSpan={dynamicDateRanges.length + 7}
                    className="py-8 text-center text-gray-600 text-lg"
                  >
                    {isLoading
                      ? "Loading data..."
                      : "No data available for the selected criteria."}
                  </td>
                </tr>
              ) : (
                financialData.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className={`
                          group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200
                          ${
                            row.type === "summary"
                              ? "bg-gray-100 bg-opacity-20"
                              : ""
                          }
                          ${
                            row.type === "expandable"
                              ? "cursor-pointer bg-blue-100 bg-opacity-30"
                              : ""
                          }
                      `}
                      onClick={() =>
                        row.type === "expandable" &&
                        row.id.startsWith("total-staff-cost")
                          ? toggleStaffRow(row.id)
                          : row.type === "expandable" &&
                            row.id.startsWith("non-labor-staff-cost")
                          ? toggleNonLaborAcctRow(row.id)
                          : null
                      }
                    >
                      <td className="py-3 px-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                        {row.type === "expandable" && (
                          <span className="mr-2">
                            {(row.id.startsWith("total-staff-cost") &&
                              expandedStaffRows.includes(row.id)) ||
                            (row.id.startsWith("non-labor-staff-cost") &&
                              expandedNonLaborAcctRows.includes(row.id)) ? (
                              <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                            )}
                          </span>
                        )}
                        {row.description}
                      </td>
                      <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">
                        {row.accountId || ""}
                      </td>
                      <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">
                        {row.orgId || ""}
                      </td>
                      <td className="py-3 px-4 text-left whitespace-nowrap text-gray-800">
                        {row.glcPlc || ""}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap text-gray-800">
                        {formatValue(row.hrlyRate)}
                      </td>
                      <td
                        className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${
                          typeof row.total === "number" && row.total < 0
                            ? "text-red-600"
                            : typeof row.total === "number" &&
                              row.total > 0 &&
                              row.description === "Profit"
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {row.description.includes("Profit %")
                          ? formatValue(row.total, false, true)
                          : formatValue(row.total)}
                      </td>
                      {dynamicDateRanges.map((range) => {
                        let dataForRange;

                        if (row.description === "Revenue") {
                          if (
                            selectedRevenueView === "t&m" &&
                            row.tnmRevenueData
                          ) {
                            dataForRange = row.tnmRevenueData[range];
                          } else if (
                            selectedRevenueView === "cpff" &&
                            row.cpffRevenueData
                          ) {
                            dataForRange = row.cpffRevenueData[range];
                          } else {
                            dataForRange = row.data[range];
                          }
                        } else {
                          dataForRange = row.data[range];
                        }
                        console.log(
                          `  Rendering cell for row: ${row.description}, range: ${range}, data: ${dataForRange}`
                        );

                        const isProfitRow = row.id.startsWith("profit-");
                        const isNegative =
                          typeof dataForRange === "number" && dataForRange < 0;
                        const isPositive =
                          typeof dataForRange === "number" && dataForRange > 0;
                        let textColorClass = "";
                        if (isProfitRow) {
                          if (isNegative) {
                            textColorClass = "text-red-600";
                          } else if (isPositive) {
                            textColorClass = "text-green-600";
                          }
                        }
                        return (
                          <td
                            key={range}
                            className={`py-3 px-4 text-right whitespace-nowrap text-gray-800 ${textColorClass}`}
                          >
                            {row.description.includes("Profit %")
                              ? formatValue(dataForRange, false, true)
                              : formatValue(dataForRange)}
                          </td>
                        );
                      })}
                    </tr>

                    {row.type === "expandable" &&
                      expandedStaffRows.includes(row.id) &&
                      row.employees &&
                      row.employees.length > 0 && (
                        <>
                          {row.employees.map((employee) => (
                            <React.Fragment key={`${row.id}-${employee.id}`}>
                              <tr
                                className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
                                onClick={() =>
                                  toggleEmployeeDetail(
                                    `${row.id}-${employee.id}`
                                  )
                                }
                              >
                                <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                  <span className="mr-2">
                                    {expandedEmployeeDetails.includes(
                                      `${row.id}-${employee.id}`
                                    ) ? (
                                      <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                    ) : (
                                      <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                    )}
                                  </span>
                                  {employee.name}
                                </td>
                                <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">
                                  {employee.accountId || ""}
                                </td>
                                <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">
                                  {employee.orgId || ""}
                                </td>
                                <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">
                                  {employee.glcPlc || ""}
                                </td>
                                <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                  {formatValue(employee.hrlyRate)}
                                </td>
                                <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                  {formatValue(employee.cost)}
                                </td>
                                {dynamicDateRanges.map((currentRange) => (
                                  <td
                                    key={`${employee.id}-${currentRange}-cost`}
                                    className="py-2 px-4 text-right whitespace-nowrap text-gray-800"
                                  >
                                    {formatValue(
                                      employee.monthlyCost[currentRange] || 0
                                    )}
                                  </td>
                                ))}
                              </tr>

                              {expandedEmployeeDetails.includes(
                                `${row.id}-${employee.id}`
                              ) && (
                                <tr
                                  key={`${employee.id}-hours-detail-row`}
                                  className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs"
                                >
                                  <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
                                    --- Employee Hours
                                  </td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap"></td>
                                  <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
                                    {formatValue(
                                      Object.values(
                                        employee.monthlyHours
                                      ).reduce((sum, val) => sum + val, 0)
                                    )}
                                  </td>
                                  {dynamicDateRanges.map((currentRange) => (
                                    <td
                                      key={`${employee.id}-hours-${currentRange}-amount`}
                                      className="py-2 px-4 text-right whitespace-nowrap text-gray-700"
                                    >
                                      {formatValue(
                                        employee.monthlyHours[currentRange] ||
                                          0,
                                        true
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              )}

                              {expandedEmployeeDetails.includes(
                                `${row.id}-${employee.id}`
                              ) &&
                                Object.keys(employee.detailSummary).length >
                                  0 && (
                                  <>
                                    {Object.keys(employee.detailSummary).map(
                                      (detailDescription) => {
                                        const detailTotal = Object.values(
                                          employee.detailSummary[
                                            detailDescription
                                          ]
                                        ).reduce((sum, val) => sum + val, 0);

                                        return (
                                          <tr
                                            key={`${employee.id}-${detailDescription}-detail-row`}
                                            className="bg-gray-100 bg-opacity-30 hover:bg-gray-100 hover:bg-opacity-60 text-xs"
                                          >
                                            <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit italic text-gray-700">
                                              --- {detailDescription}
                                            </td>
                                            <td className="py-2 px-4 text-left whitespace-nowrap text-gray-700">
                                              {employee.accountId || ""}
                                            </td>
                                            <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                            <td className="py-2 px-4 text-left whitespace-nowrap"></td>
                                            <td className="py-2 px-4 text-right whitespace-nowrap"></td>
                                            <td className="py-2 px-4 text-right whitespace-nowrap text-gray-700">
                                              {formatValue(detailTotal)}
                                            </td>
                                            {dynamicDateRanges.map(
                                              (currentRange) => (
                                                <td
                                                  key={`${employee.id}-${detailDescription}-${currentRange}-amount`}
                                                  className="py-2 px-4 text-right whitespace-nowrap text-gray-700"
                                                >
                                                  {formatValue(
                                                    employee.detailSummary[
                                                      detailDescription
                                                    ][currentRange] || 0
                                                  )}
                                                </td>
                                              )
                                            )}
                                          </tr>
                                        );
                                      }
                                    )}
                                  </>
                                )}
                            </React.Fragment>
                          ))}
                        </>
                      )}

                    {row.type === "expandable" &&
                      row.id.startsWith("non-labor-staff-cost") &&
                      expandedNonLaborAcctRows.includes(row.id) &&
                      row.nonLaborAccts &&
                      row.nonLaborAccts.length > 0 && (
                        <>
                          {row.nonLaborAccts.map((acctGroup) => (
                            <React.Fragment key={`${row.id}-${acctGroup.id}`}>
                              <tr
                                className="bg-gray-100 bg-opacity-20 hover:bg-gray-100 hover:bg-opacity-50 text-sm cursor-pointer group"
                                onClick={() =>
                                  toggleNonLaborAcctRow(
                                    `${row.id}-${acctGroup.id}`
                                  )
                                }
                              >
                                <td className="py-2 pl-8 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                  <span className="mr-2">
                                    {expandedNonLaborAcctRows.includes(
                                      `${acctGroup.id}`
                                    ) ? (
                                      <ChevronUpIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                    ) : (
                                      <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                                    )}
                                  </span>
                                  {acctGroup.description}
                                </td>
                                <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">
                                  {acctGroup.id || ""}
                                </td>
                                <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">
                                  {acctGroup.orgId || ""}
                                </td>
                                <td className="py-2 px-4 text-left whitespace-nowrap text-gray-800">
                                  {acctGroup.glcPlc || ""}
                                </td>
                                <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800"></td>
                                <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800">
                                  {formatValue(acctGroup.total)}
                                </td>
                                {dynamicDateRanges.map((currentRange) => (
                                  <td
                                    key={`${acctGroup.id}-${currentRange}-cost`}
                                    className="py-2 px-4 text-right whitespace-nowrap text-gray-800"
                                  >
                                    {formatValue(
                                      acctGroup.monthlyData[currentRange] || 0
                                    )}
                                  </td>
                                ))}
                              </tr>

                              {expandedNonLaborAcctRows.includes(
                                `${row.id}-${acctGroup.id}`
                              ) &&
                                acctGroup.employees &&
                                acctGroup.employees.length > 0 && (
                                  <React.Fragment>
                                    <tr className="bg-gray-100 bg-opacity-30">
                                      <td className="py-2 pl-16 pr-4 text-left text-sm font-semibold text-gray-700 uppercase sticky left-0 z-10 bg-inherit">
                                        Employee
                                      </td>
                                      <td
                                        className="py-2 px-4 text-left whitespace-nowrap"
                                        colSpan="4"
                                      ></td>
                                      <td className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase"></td>
                                      {dynamicDateRanges.map((range) => (
                                        <td
                                          key={`header-employee-group-${range}`}
                                          className="py-2 px-4 text-right text-sm font-semibold text-gray-700 uppercase whitespace-nowrap"
                                        ></td>
                                      ))}
                                    </tr>
                                    {acctGroup.employees.map(
                                      (employeeGroup) => (
                                        <tr
                                          key={`${acctGroup.id}-${employeeGroup.id}`}
                                          className="bg-gray-100 bg-opacity-40 hover:bg-gray-100 hover:bg-opacity-70 text-xs"
                                        >
                                          <td className="py-2 pl-16 pr-4 whitespace-nowrap sticky left-0 z-10 bg-inherit flex items-center text-gray-800">
                                            {employeeGroup.name}
                                          </td>
                                          <td
                                            className="py-2 px-4 text-left whitespace-nowrap"
                                            colSpan="4"
                                          ></td>
                                          <td className="py-2 px-4 text-right whitespace-nowrap text-gray-800 font-semibold">
                                            {formatValue(employeeGroup.total)}
                                          </td>
                                          {dynamicDateRanges.map(
                                            (currentRange) => (
                                              <td
                                                key={`${employeeGroup.id}-${currentRange}-monthly-total`}
                                                className="py-2 px-4 text-right whitespace-nowrap text-gray-800"
                                              >
                                                {formatValue(
                                                  employeeGroup.monthlyData[
                                                    currentRange
                                                  ] || 0
                                                )}
                                              </td>
                                            )
                                          )}
                                        </tr>
                                      )
                                    )}
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
