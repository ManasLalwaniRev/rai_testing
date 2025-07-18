// import React from "react";

// const AnnualHolidays = () => {
//   return <div>Annual Holidays</div>;
// };

// export default AnnualHolidays;

// import React from "react";

// const AnnualHolidays = () => {
//   return <div>Annual Holidays</div>;
// };

// export default AnnualHolidays;

// AnnualHolidaysPage.jsx

'use client';

import React, { useState, useCallback } from 'react';

// A utility function for combining Tailwind CSS classes
const cn = (...args) => {
  return args.filter(Boolean).join(' ');
};

// Define years array outside the component to ensure it's always defined before render
const years = Array.from({ length: 2035 - 2020 + 1 }, (_, i) => 2020 + i);

// Function to generate fiscal year data for a given range
const generateFiscalYearData = (startYear, endYear) => {
  const data = {};
  for (let year = startYear; year <= endYear; year++) {
    const yearData = [];
    for (let month = 1; month <= 12; month++) {
      const lastDayOfMonth = new Date(year, month, 0).getDate(); // Get last day of previous month for 0 index
      const endDate = new Date(year, month - 1, lastDayOfMonth); // Month-1 because month is 0-indexed in Date constructor
      const formattedEndDate = `${(endDate.getMonth() + 1).toString().padStart(2, '0')}/${endDate.getDate().toString().padStart(2, '0')}/${endDate.getFullYear()}`;
      
      const quarter = Math.ceil(month / 3); // Calculate quarter (1-4)

      yearData.push({
        id: `${year}-${month}`, // Unique ID for the row
        fiscalYear: year,
        period: month,
        subPeriod: 1, // Always 1 sub-period per month
        endDate: formattedEndDate,
        quarter: quarter,
        status: 'HISTORY',
      });
    }
    data[year] = yearData;
  }
  return data;
};

const fiscalData = generateFiscalYearData(2020, 2035);


// Static Federal US Holidays data from 2020 to 2035
// Dates are placeholders and should be verified for exact year
const federalHolidays = {
  2020: [
    { date: '01/01/2020', description: 'New Year\'s Day' },
    { date: '01/20/2020', description: 'Martin Luther King, Jr. Day' },
    { date: '02/17/2020', description: 'Presidents\' Day' },
    { date: '05/25/2020', description: 'Memorial Day' },
    { date: '07/03/2020', description: 'Independence Day (Observed)' }, // 07/04/2020 is Saturday
    { date: '09/07/2020', description: 'Labor Day' },
    { date: '10/12/2020', description: 'Columbus Day' },
    { date: '11/11/2020', description: 'Veterans Day' },
    { date: '11/26/2020', description: 'Thanksgiving Day' },
    { date: '12/25/2020', description: 'Christmas Day' },
  ],
  2021: [
    { date: '01/01/2021', description: 'New Year\'s Day' },
    { date: '01/18/2021', description: 'Martin Luther King, Jr. Day' },
    { date: '02/15/2021', description: 'Presidents\' Day' },
    { date: '05/31/2021', description: 'Memorial Day' },
    { date: '06/18/2021', description: 'Juneteenth National Independence Day (Observed)' }, // 06/19/2021 is Saturday
    { date: '07/05/2021', description: 'Independence Day (Observed)' }, // 07/04/2021 is Sunday
    { date: '09/06/2021', description: 'Labor Day' },
    { date: '10/11/2021', description: 'Columbus Day' },
    { date: '11/11/2021', description: 'Veterans Day' },
    { date: '11/25/2021', description: 'Thanksgiving Day' },
    { date: '12/24/2021', description: 'Christmas Day (Observed)' }, // 12/25/2021 is Saturday
  ],
  2022: [
    { date: '01/01/2022', description: 'New Year\'s Day' },
    { date: '01/17/2022', description: 'Martin Luther King, Jr. Day' },
    { date: '02/21/2022', description: 'Presidents\' Day' },
    { date: '05/30/2022', description: 'Memorial Day' },
    { date: '06/20/2022', description: 'Juneteenth National Independence Day (Observed)' }, // 06/19/2022 is Sunday
    { date: '07/04/2022', description: 'Independence Day' },
    { date: '09/05/2022', description: 'Labor Day' },
    { date: '10/10/2022', description: 'Columbus Day' },
    { date: '11/11/2022', description: 'Veterans Day' },
    { date: '11/24/2022', description: 'Thanksgiving Day' },
    { date: '12/26/2022', description: 'Christmas Day (Observed)' }, // 12/25/2022 is Sunday
  ],
  2023: [
    { date: '01/02/2023', description: 'New Year\'s Day (Observed)' }, // 01/01/2023 is Sunday
    { date: '01/16/2023', description: 'Martin Luther King, Jr. Day' },
    { date: '02/20/2023', description: 'Presidents\' Day' },
    { date: '05/29/2023', description: 'Memorial Day' },
    { date: '06/19/2023', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2023', description: 'Independence Day' },
    { date: '09/04/2023', description: 'Labor Day' },
    { date: '10/09/2023', description: 'Columbus Day' },
    { date: '11/10/2023', description: 'Veterans Day (Observed)' }, // 11/11/2023 is Saturday
    { date: '11/23/2023', description: 'Thanksgiving Day' },
    { date: '12/25/2023', description: 'Christmas Day' },
  ],
  2024: [
    { date: '01/01/2024', description: 'New Year\'s Day' },
    { date: '01/15/2024', description: 'Martin Luther King, Jr. Day' },
    { date: '02/19/2024', description: 'Presidents\' Day' },
    { date: '05/27/2024', description: 'Memorial Day' },
    { date: '06/19/2024', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2024', description: 'Independence Day' },
    { date: '09/02/2024', description: 'Labor Day' },
    { date: '10/14/2024', description: 'Columbus Day' },
    { date: '11/11/2024', description: 'Veterans Day' },
    { date: '11/28/2024', description: 'Thanksgiving Day' },
    { date: '12/25/2024', description: 'Christmas Day' },
  ],
  2025: [
    { date: '01/01/2025', description: 'New Year\'s Day' },
    { date: '01/20/2025', description: 'Martin Luther King, Jr. Day' },
    { date: '02/17/2025', description: 'Presidents\' Day' },
    { date: '05/26/2025', description: 'Memorial Day' },
    { date: '06/19/2025', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2025', description: 'Independence Day' },
    { date: '09/01/2025', description: 'Labor Day' },
    { date: '10/13/2025', description: 'Columbus Day' },
    { date: '11/11/2025', description: 'Veterans Day' },
    { date: '11/27/2025', description: 'Thanksgiving Day' }, // Actual date for 2025
    { date: '12/25/2025', description: 'Christmas Day' },
  ],
  2026: [
    { date: '01/01/2026', description: 'New Year\'s Day' },
    { date: '01/19/2026', description: 'Martin Luther King, Jr. Day' },
    { date: '02/16/2026', description: 'Presidents\' Day' },
    { date: '05/25/2026', description: 'Memorial Day' },
    { date: '06/19/2026', description: 'Juneteenth National Independence Day' },
    { date: '07/03/2026', description: 'Independence Day (Observed)' }, // 07/04/2026 is Saturday
    { date: '09/07/2026', description: 'Labor Day' },
    { date: '10/12/2026', description: 'Columbus Day' },
    { date: '11/11/2026', description: 'Veterans Day' },
    { date: '11/26/2026', description: 'Thanksgiving Day' },
    { date: '12/25/2026', description: 'Christmas Day' },
  ],
  2027: [
    { date: '01/01/2027', description: 'New Year\'s Day' },
    { date: '01/18/2027', description: 'Martin Luther King, Jr. Day' },
    { date: '02/15/2027', description: 'Presidents\' Day' },
    { date: '05/31/2027', description: 'Memorial Day' },
    { date: '06/18/2027', description: 'Juneteenth National Independence Day (Observed)' }, // 06/19/2027 is Saturday
    { date: '07/05/2027', description: 'Independence Day (Observed)' }, // 07/04/2027 is Sunday
    { date: '09/06/2027', description: 'Labor Day' },
    { date: '10/11/2027', description: 'Columbus Day' },
    { date: '11/11/2027', description: 'Veterans Day' },
    { date: '11/25/2027', description: 'Thanksgiving Day' },
    { date: '12/24/2027', description: 'Christmas Day (Observed)' }, // 12/25/2027 is Saturday
  ],
  2028: [
    { date: '01/01/2028', description: 'New Year\'s Day' },
    { date: '01/17/2028', description: 'Martin Luther King, Jr. Day' },
    { date: '02/21/2028', description: 'Presidents\' Day' },
    { date: '05/29/2028', description: 'Memorial Day' },
    { date: '06/19/2028', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2028', description: 'Independence Day' },
    { date: '09/04/2028', description: 'Labor Day' },
    { date: '10/09/2028', description: 'Columbus Day' },
    { date: '11/10/2028', description: 'Veterans Day (Observed)' }, // 11/11/2028 is Saturday
    { date: '11/23/2028', description: 'Thanksgiving Day' },
    { date: '12/25/2028', description: 'Christmas Day' },
  ],
  2029: [
    { date: '01/01/2029', description: 'New Year\'s Day' },
    { date: '01/15/2029', description: 'Martin Luther King, Jr. Day' },
    { date: '02/19/2029', description: 'Presidents\' Day' },
    { date: '05/28/2029', description: 'Memorial Day' },
    { date: '06/19/2029', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2029', description: 'Independence Day' },
    { date: '09/03/2029', description: 'Labor Day' },
    { date: '10/08/2029', description: 'Columbus Day' },
    { date: '11/12/2029', description: 'Veterans Day (Observed)' }, // 11/11/2029 is Sunday
    { date: '11/22/2029', description: 'Thanksgiving Day' },
    { date: '12/25/2029', description: 'Christmas Day' },
  ],
  2030: [
    { date: '01/01/2030', description: 'New Year\'s Day' },
    { date: '01/21/2030', description: 'Martin Luther King, Jr. Day' },
    { date: '02/18/2030', description: 'Presidents\' Day' },
    { date: '05/27/2030', description: 'Memorial Day' },
    { date: '06/19/2030', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2030', description: 'Independence Day' },
    { date: '09/02/2030', description: 'Labor Day' },
    { date: '10/14/2030', description: 'Columbus Day' },
    { date: '11/11/2030', description: 'Veterans Day' },
    { date: '11/28/2030', description: 'Thanksgiving Day' },
    { date: '12/25/2030', description: 'Christmas Day' },
  ],
  2031: [
    { date: '01/01/2031', description: 'New Year\'s Day' },
    { date: '01/20/2031', description: 'Martin Luther King, Jr. Day' },
    { date: '02/17/2031', description: 'Presidents\' Day' },
    { date: '05/26/2031', description: 'Memorial Day' },
    { date: '06/19/2031', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2031', description: 'Independence Day' },
    { date: '09/01/2031', description: 'Labor Day' },
    { date: '10/13/2031', description: 'Columbus Day' },
    { date: '11/11/2031', description: 'Veterans Day' },
    { date: '11/27/2031', description: 'Thanksgiving Day' },
    { date: '12/25/2031', description: 'Christmas Day' },
  ],
  2032: [
    { date: '01/01/2032', description: 'New Year\'s Day' },
    { date: '01/19/2032', description: 'Martin Luther King, Jr. Day' },
    { date: '02/16/2032', description: 'Presidents\' Day' },
    { date: '05/31/2032', description: 'Memorial Day' },
    { date: '06/19/2032', description: 'Juneteenth National Independence Day' },
    { date: '07/05/2032', description: 'Independence Day (Observed)' }, // 07/04/2032 is Sunday
    { date: '09/06/2032', description: 'Labor Day' },
    { date: '10/11/2032', description: 'Columbus Day' },
    { date: '11/11/2032', description: 'Veterans Day' },
    { date: '11/25/2032', description: 'Thanksgiving Day' },
    { date: '12/24/2032', description: 'Christmas Day (Observed)' }, // 12/25/2032 is Saturday
  ],
  2033: [
    { date: '01/01/2033', description: 'New Year\'s Day' },
    { date: '01/17/2033', description: 'Martin Luther King, Jr. Day' },
    { date: '02/21/2033', description: 'Presidents\' Day' },
    { date: '05/30/2033', description: 'Memorial Day' },
    { date: '06/20/2033', description: 'Juneteenth National Independence Day (Observed)' }, // 06/19/2033 is Sunday
    { date: '07/04/2033', description: 'Independence Day' },
    { date: '09/05/2033', description: 'Labor Day' },
    { date: '10/10/2033', description: 'Columbus Day' },
    { date: '11/11/2033', description: 'Veterans Day' },
    { date: '11/24/2033', description: 'Thanksgiving Day' },
    { date: '12/26/2033', description: 'Christmas Day (Observed)' }, // 12/25/2033 is Sunday
  ],
  2034: [
    { date: '01/02/2034', description: 'New Year\'s Day (Observed)' }, // 01/01/2034 is Sunday
    { date: '01/16/2034', description: 'Martin Luther King, Jr. Day' },
    { date: '02/20/2034', description: 'Presidents\' Day' },
    { date: '05/29/2034', description: 'Memorial Day' },
    { date: '06/19/2034', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2034', description: 'Independence Day' },
    { date: '09/04/2034', description: 'Labor Day' },
    { date: '10/09/2034', description: 'Columbus Day' },
    { date: '11/10/2034', description: 'Veterans Day (Observed)' }, // 11/11/2034 is Saturday
    { date: '11/23/2034', description: 'Thanksgiving Day' },
    { date: '12/25/2034', description: 'Christmas Day' },
  ],
  2035: [
    { date: '01/01/2035', description: 'New Year\'s Day' },
    { date: '01/15/2035', description: 'Martin Luther King, Jr. Day' },
    { date: '02/19/2035', description: 'Presidents\' Day' },
    { date: '05/28/2035', description: 'Memorial Day' },
    { date: '06/19/2035', description: 'Juneteenth National Independence Day' },
    { date: '07/04/2035', description: 'Independence Day' },
    { date: '09/03/2035', description: 'Labor Day' },
    { date: '10/08/2035', description: 'Columbus Day' },
    { date: '11/12/2035', description: 'Veterans Day (Observed)' }, // 11/11/2035 is Sunday
    { date: '11/22/2035', description: 'Thanksgiving Day' },
    { date: '12/25/2035', description: 'Christmas Day' },
  ],
};


const AnnualHolidaysPage = () => {
  const currentYear = new Date().getFullYear();
  // Set default source year to a year within the expanded range, e.g., 2025
  const [sourceYear, setSourceYear] = useState('2025');
  // Set default target year to a year within the expanded range, e.g., 2026
  const [targetYear, setTargetYear] = useState('2026');
  const [targetYearHolidays, setTargetYearHolidays] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const [filteredHolidays, setFilteredHolidays] = useState([]); // New state for filtered holidays


  // Function to add a new empty row to the table
  const handleAddNewRow = useCallback(() => {
    setTargetYearHolidays(prevHolidays => [
      ...prevHolidays,
      { id: Date.now(), date: '', description: '', isNew: true } // isNew helps identify editable rows
    ]);
  }, []);

  // Function to delete a selected row
  const handleDeleteRow = useCallback((idToDelete) => {
    setTargetYearHolidays(prevHolidays =>
      prevHolidays.filter(holiday => holiday.id !== idToDelete)
    );
  }, []);

  // Handle input changes for editable rows
  const handleHolidayChange = useCallback((id, field, value) => {
    setTargetYearHolidays(prevHolidays =>
      prevHolidays.map(holiday =>
        holiday.id === id ? { ...holiday, [field]: value } : holiday
      )
    );
  }, []);

  // Function to clone holidays from source year to target year
  const handleReCloneHolidaySchedule = useCallback(() => {
    const holidaysToClone = federalHolidays[sourceYear] || [];
    // Assign a unique ID to each holiday for React keying and manipulation
    const clonedHolidays = holidaysToClone.map(holiday => ({
      ...holiday,
      id: Date.now() + Math.random() // Simple unique ID for now
    }));
    setTargetYearHolidays(clonedHolidays);
    setFilteredHolidays(clonedHolidays); // Also update filtered holidays on clone
    setSearchTerm(''); // Clear search term after cloning
  }, [sourceYear]);

  // Initial load of holidays for the target year based on its default value
  React.useEffect(() => {
    if (targetYear) {
      const initialHolidays = federalHolidays[targetYear] || [];
      const initializedHolidays = initialHolidays.map(holiday => ({
        ...holiday,
        id: Date.now() + Math.random()
      }));
      setTargetYearHolidays(initializedHolidays);
      setFilteredHolidays(initializedHolidays); // Initialize filtered holidays
    }
  }, [targetYear]); // This will run once on mount and then if targetYear changes

  // Effect to filter holidays when targetYearHolidays or searchTerm changes
  React.useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (lowerCaseSearchTerm) {
      const filtered = targetYearHolidays.filter(holiday =>
        (holiday.date && holiday.date.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (holiday.description && holiday.description.toLowerCase().includes(lowerCaseSearchTerm))
      );
      setFilteredHolidays(filtered);
    } else {
      setFilteredHolidays(targetYearHolidays); // Show all if search term is empty
    }
  }, [searchTerm, targetYearHolidays]);


  // Handle save logic (for "Save Criteria" and potentially for the table data itself)
  const handleSaveCriteria = useCallback(() => {
    console.log('Saving Criteria:');
    console.log('Source Year:', sourceYear);
    console.log('Target Year:', targetYear);
    console.log('Target Year Holidays (all, not just filtered):', targetYearHolidays); // Save all holidays
    alert('Annual Holiday settings saved (console logged)!');
    // In a real application, you would send this data to your backend API.
  }, [sourceYear, targetYear, targetYearHolidays]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
      {/* Adjusted max-w-7xl to w-full px-8 for wider display within its parent */}
      <div className="w-full px-8 bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Setup Annual Holidays</h2>
          <button
            onClick={handleSaveCriteria}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Save Criteria
          </button>
        </div>

        {/* Top Controls Section */}
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4 items-center border border-gray-300">
          {/* <div className="flex items-center space-x-2">
            <label htmlFor="sourceYear" className="text-sm font-medium whitespace-nowrap text-gray-900">Source Year <span className="text-red-500">*</span></label>
            <select
              id="sourceYear"
              value={sourceYear}
              onChange={(e) => setSourceYear(e.target.value)}
              className="w-full border border-gray-300 bg-white rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div> */}
          {/* Target year */}
          <div className="flex items-center space-x-2">
            <label htmlFor="targetYear" className="block text-sm font-medium whitespace-nowrap text-gray-900"> Year <span className="text-red-500">*</span></label> 
            <input
              id="targetYear"
              type="number"
              value={targetYear}
              onChange={(e) => setTargetYear(e.target.value)}
              className="w-full border border-gray-300 bg-white rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
            {/* <button
              onClick={handleReCloneHolidaySchedule}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 whitespace-nowrap"
            >
              Re-Clone Holiday Schedule
            </button> */}
          </div>
        </div>

        {/* Target Year Holidays Table */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Target Year Holidays</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleAddNewRow}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-md text-sm"
              >
                New
              </button>
              {/* Search input for Query */}
              <input
                type="text"
                placeholder="Search holiday..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1.5 px-3 rounded-md text-sm">
                Query
              </button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Holiday
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHolidays.length === 0 ? ( // Display filtered holidays
                  <tr>
                    <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No holidays available or matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredHolidays.map((holiday) => ( // Iterate over filtered holidays
                    <tr key={holiday.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {holiday.isNew ? (
                          <input
                            type="text"
                            value={holiday.date}
                            onChange={(e) => handleHolidayChange(holiday.id, 'date', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                            placeholder="MM/DD/YYYY"
                          />
                        ) : (
                          holiday.date
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {holiday.isNew ? (
                          <input
                            type="text"
                            value={holiday.description}
                            onChange={(e) => handleHolidayChange(holiday.id, 'description', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                            placeholder="Holiday Description"
                          />
                        ) : (
                          holiday.description
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteRow(holiday.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualHolidaysPage;

