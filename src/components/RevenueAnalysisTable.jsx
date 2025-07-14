'use client';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const INTERNAL_FINANCIAL_API_URL = 'https://test-api-3tmq.onrender.com/Forecast/CalculateCost';

/**
 * Transforms the raw CalculateCostAPIResponse into the RevenueAnalysisRow structure.
 * This function now aggregates all data into overall totals, without monthly breakdowns or hours.
 */
function transformApiResponseToRevenueAnalysisRows(
  apiResponse
) {
  console.time('transformApiResponse'); // Start timer for transformation
  const rows = [];

  let totalRevenueOverall = 0;
  let totalLaborCostRaw = 0; // Raw cost (base salary) for all labor
  let totalBurdenedLaborCost = 0; // Total burdened cost for all labor
  let totalLaborRevenue = 0; // Total labor revenue (sum of revenue + revenue from payrollSalary)
  // Removed aggregation for these, will use top-level API response values directly
  // let totalFringeAggregated = 0;
  // let totalOverheadAggregated = 0;
  // let totalGnaAggregated = 0;

  // Map to group employees by PLC
  const plcMap = new Map();

  console.log(`Revenue Analysis: Transforming data for all projects/orgs from API response.`);

  if (!apiResponse.employeeForecastSummary || apiResponse.employeeForecastSummary.length === 0) {
    console.warn(`Revenue Analysis: No employee data found in API response. Returning empty rows.`);
    console.timeEnd('transformApiResponse'); // End timer
    return [];
  }

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
        accountId: empSummary.accID || '',
        orgId: empSummary.orgID || '',
        glcPlc: empSummary.plcCode || '',
        hrlyRate: empSummary.perHourRate || 0,
        revenue: 0, // Initialize employee revenue
        profit: 0, // Initialize employee profit
        profitOnCost: '0.00%', // Initialize profitOnCost
        profitOnRevenue: '0.00%', // Initialize profitOnRevenue
        // detailSummary: {}, // Removed as per request
      };
      plcDetail.employees.push(employee); // Add employee to PLC's list
    }

    empSummary.emplSchedule?.payrollSalary.forEach(salaryEntry => {
      // Aggregate overall totals for the main summary rows
      totalRevenueOverall += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0);
      totalLaborCostRaw += (salaryEntry.cost || 0); // Accumulate raw cost
      totalBurdenedLaborCost += (salaryEntry.totalBurdenCost || 0); // Accumulate burdened cost
      totalLaborRevenue += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0);

      // Aggregate for current PLC detail (overall totals)
      plcDetail.rawCost += (salaryEntry.cost || 0); // PLC raw cost
      plcDetail.cost += (salaryEntry.totalBurdenCost || 0); // PLC burdened cost
      plcDetail.burdenedCost += (salaryEntry.totalBurdenCost || 0); // PLC burdened cost (redundant but kept for clarity)


      // Aggregate employee's overall totals (no monthly breakdown)
      employee.rawCost += (salaryEntry.cost || 0); // Employee raw cost
      employee.cost += (salaryEntry.totalBurdenCost || 0); // Employee burdened cost
      employee.revenue += (salaryEntry.revenue || 0) //+ (salaryEntry.revenue || 0); // Aggregate employee revenue
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


  const totalExpense = totalBurdenedLaborCost; // Total burdened cost from all labor entries
  const totalProfit = totalRevenueOverall - totalExpense;
  const profitOnCost = totalExpense !== 0 ? (totalProfit / totalExpense) * 100 : 0;
  const profitOnRevenue = totalRevenueOverall !== 0 ? (totalProfit / totalRevenueOverall) * 100 : 0;

  // --- Construct Rows ---

  // 1. Total Revenue Row
  rows.push({
    id: 'total-revenue',
    description: 'Total Revenue',
    billRate: undefined, // Keep undefined for main summary row
    rawCost: undefined,
    cost: totalExpense, // Total expense (burdened) for context
    burdenedCost: totalExpense,
    revenue: totalRevenueOverall,
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

  // 3. Total Fringe Row (New) - using top-level apiResponse.totalFringe
  rows.push({
    id: 'total-fringe',
    description: 'Total Fringe',
    billRate: undefined, // Keep undefined for summary row
    rawCost: apiResponse.totalFringe, // Directly use totalFringe from API response
    cost: apiResponse.totalFringe, // Fringe is typically a cost
    burdenedCost: apiResponse.totalFringe,
    revenue: 0, // Fringe is not revenue
    profit: undefined,
    profitOnCost: undefined,
    profitOnRevenue: undefined,
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  // 4. Total Overhead Row (aggregated from payrollSalary entries) - using top-level apiResponse.total1Overhead
  rows.push({
    id: 'total-overhead',
    description: 'Total Overhead',
    billRate: undefined, // Keep undefined for summary row
    rawCost: apiResponse.totalOverhead, // Directly use total1Overhead from API response
    cost: apiResponse.totalOverhead,
    burdenedCost: apiResponse.totalOverhead,
    revenue: 0,
    profit: undefined, // Set profit to undefined as requested
    profitOnCost: undefined, // Set profitOnCost to undefined as requested
    profitOnRevenue: undefined, // Set profitOnRevenue to undefined as requested
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  // 5. General & Admin Row (aggregated from payrollSalary entries) - using top-level apiResponse.totalGna
  rows.push({
    id: 'general-admin',
    description: 'General & Admin',
    billRate: undefined, // Keep undefined for summary row
    rawCost: apiResponse.totalGna, // Directly use totalGna from API response
    cost: apiResponse.totalGna,
    burdenedCost: apiResponse.totalGna,
    revenue: 0,
    profit: undefined, // Set profit to undefined as requested
    profitOnCost: undefined, // Set profitOnCost to undefined as requested
    profitOnRevenue: undefined, // Set profitOnRevenue to undefined as requested
    type: 'summary',
    projId: 'Aggregated',
    orgId: 'Aggregated',
  });

  console.log("Revenue Analysis: Final transformed rows (aggregated):", rows);
  console.timeEnd('transformApiResponse'); // End timer for transformation
  return rows;
}


const RevenueAnalysisPage = ({ onCancel, planId, templateId, type, projId, budVersion, status, periodOfPerformance }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedPlcRows, setExpandedPlcRows] = useState([]);
  // const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState([]); // Removed as per request

  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use props instead of internal state for these values
  // const [selectedPlanId] = useState(107);
  // const [selectedTemplateId] = useState(1);
  // const [selectedType] = useState('TARGET');

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

  const togglePlcRow = (id) => {
    setExpandedPlcRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // Removed as per request
  // const toggleEmployeeDetail = (id) => {
  //   setExpandedEmployeeDetails(prev =>
  //     prev.includes(id) ? prev.filter(detailId => detailId !== id) : [...prev, id]
  //   );
  // };

  const expandAll = () => {
    setExpandedRows(revenueData.filter(row => row.type === 'expandable').map(row => row.id));

    const allPlcIds = [];
    revenueData.forEach(row => {
      if (row.id === 'labor-revenue' && row.plcDetails) {
        row.plcDetails.forEach(plc => allPlcIds.push(plc.id));
      }
    });
    setExpandedPlcRows(allPlcIds);

    // Removed as per request
    // const allEmployeeDetailIds = [];
    // revenueData.forEach(row => {
    //   if (row.id === 'labor-revenue' && row.plcDetails) {
    //     row.plcDetails.forEach(plc => {
    //       plc.employees?.forEach(emp => {
    //         // ID format: plcId-employeeId
    //         allEmployeeDetailIds.push(`${plc.id}-${emp.id}`);
    //       });
    //     });
    //   }
    // });
    // setExpandedEmployeeDetails(allEmployeeDetailIds);
  };

  const collapseAll = () => {
    setExpandedRows([]);
    setExpandedPlcRows([]);
    // setExpandedEmployeeDetails([]); // Removed as per request
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
          type: type || 'TARGET' // Default to 'TARGET' if not provided
        });
        const apiFetchUrl = `${INTERNAL_FINANCIAL_API_URL}?${params.toString()}`;
        console.log(`Revenue Analysis: Fetching data from API (GET): ${apiFetchUrl}`);

        const response = await fetch(apiFetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
        }

        const apiResponse = await response.json();
        console.log("Revenue Analysis: Full API Raw Response:", apiResponse);
        
        const transformedData = transformApiResponseToRevenueAnalysisRows(apiResponse);
        setRevenueData(transformedData);
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
  }, [planId, templateId, type]); // Dependencies now include props


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

      {/* Control Buttons including Cancel */}
      <div className="mb-4 flex gap-4">
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
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 ml-auto"
        >
          Cancel
        </button>
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
                            onClick={() => togglePlcRow(`${row.id}-${plc.id}`)}
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
