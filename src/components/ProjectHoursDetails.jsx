import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EMPLOYEE_COLUMNS = [
  { key: 'emplId', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'acctId', label: 'Account' },
  { key: 'orgId', label: 'Organization' },
  { key: 'glcPlc', label: 'Plc' },
  { key: 'idType', label: 'ID Type' },
  { key: 'isRev', label: 'Rev' },
  { key: 'isBrd', label: 'Brd' },
  { key: 'status', label: 'Status' },
  { key: 'total', label: 'Total' },
];

const ID_TYPE_OPTIONS = [
  { value: '', label: 'Select ID Type' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Vendor', label: 'Vendor' },
  { value: 'Other', label: 'Other' },
];

const ROW_HEIGHT_DEFAULT = 64;

function isMonthEditable(duration, closedPeriod, planType) {
  if (planType !== 'EAC') return true;
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
  status,
  planType,
  closedPeriod,
  startDate,
  endDate,
  employees = [],
  isForecastLoading,
  fiscalYear,
}) => {
  const [durations, setDurations] = useState([]);
  const [isDurationLoading, setIsDurationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hiddenRows, setHiddenRows] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findValue, setFindValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [replaceScope, setReplaceScope] = useState('all');
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedColumnKey, setSelectedColumnKey] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    id: '',
    firstName: '',
    lastName: '',
    isRev: false,
    isBrd: false,
    idType: '',
    acctId: '',
    orgId: '',
    plcGlcCode: '',
    perHourRate: '',
    status: 'Act',
  });
  const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');
  const [localFiscalYear, setLocalFiscalYear] = useState(fiscalYear);

  const isEditable = status === 'Working';

  useEffect(() => {
    setLocalFiscalYear(fiscalYear);
  }, [fiscalYear]);

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
          throw new Error('Invalid duration response format');
        }
        setDurations(durationResponse.data);
        const years = [...new Set(durationResponse.data.map((d) => d.year))].sort();
        setFiscalYears(['All', ...years]);
      } catch (err) {
        setError('Failed to load duration data. Please try again.');
        toast.error('Failed to load duration data: ' + (err.response?.data?.message || err.message), {
          toastId: 'duration-error',
          autoClose: 3000,
        });
      } finally {
        setIsDurationLoading(false);
      }
    };
    fetchDurations();
  }, [startDate, endDate]);

  const [fiscalYears, setFiscalYears] = useState([]);

  const getEmployeeRow = (emp, idx) => {
    const monthHours = getMonthHours(emp);
    const totalHours = sortedDurations.reduce((sum, duration) => {
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      const inputValue = inputValues[`${idx}_${uniqueKey}`];
      const forecastValue = monthHours[uniqueKey]?.value;
      const value =
        inputValue !== undefined && inputValue !== '' ? inputValue : forecastValue;
      return sum + (value && !isNaN(value) ? Number(value) : 0);
    }, 0);

    return {
      emplId: emp.emple.emplId,
      name: `${emp.emple.firstName}`,
      idType: emp.emple.idType || 'Employee',
      acctId: emp.emple.accId || '-',
      orgId: emp.emple.orgId || '-',
      glcPlc: emp.emple.plcGlcCode || '-',
      isRev: emp.emple.isRev ? (
        <span className="text-green-600 font-sm text-xl">✓</span>
      ) : (
        '-'
      ),
      isBrd: emp.emple.isBrd ? (
        <span className="text-green-600 font-sm text-xl">✓</span>
      ) : (
        '-'
      ),
      status: emp.emple.status || 'Act',
      total: totalHours.toFixed(2) || '-',
    };
  };

  const getMonthHours = (emp) => {
    const monthHours = {};
    if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
      emp.emple.plForecasts.forEach((forecast) => {
        const uniqueKey = `${forecast.month}_${forecast.year}`;
        const value = forecast.forecastedhours ?? 0;
        monthHours[uniqueKey] = { value, ...forecast };
      });
    }
    return monthHours;
  };

  const handleInputChange = (empIdx, uniqueKey, newValue) => {
    if (!isEditable) return;
    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: newValue,
      }));
    }
  };

  const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
    if (!isEditable) return;
    const newValue = value === '' ? 0 : Number(value);
    const emp = employees[empIdx];
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
      toast.warn('Cannot edit hours for a closed period.', {
        toastId: 'closed-period-warning',
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      forecastedamt: forecast.forecastedamt ?? 0,
      forecastid: Number(forecast.forecastid),
      projId: forecast.projId ?? '',
      plId: forecast.plId ?? 0,
      emplId: forecast.emplId ?? '',
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
      forecastedhours: Number(newValue) || 0,
      createdat: forecast.createdat ?? new Date(0).toISOString(),
      updatedat: new Date().toISOString().split('T')[0],
      displayText: forecast.displayText ?? '',
    };

    try {
      await axios.put(
        'https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccessMessageText('Forecast updated!');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } catch (err) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
      }));
      setSuccessMessageText('Failed to update forecast.');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  const handleSaveNewEntry = async () => {
    if (!planId) {
      toast.error('Plan ID is required to save a new entry.', {
        toastId: 'no-plan-id',
        autoClose: 3000,
      });
      return;
    }
    setIsDurationLoading(true);

    const payloadForecasts = sortedDurations.map((duration) => ({
      forecastedhours: newEntryPeriodHours[`${duration.monthNo}_${duration.year}`] || 0,
      projId: planId,
      plId: planId,
      emplId: newEntry.id,
      dctId: 0,
      month: duration.monthNo,
      year: duration.year,
      acctId: newEntry.acctId,
      orgId: newEntry.orgId,
      plc: newEntry.plcGlcCode || '',
      hrlyRate: newEntry.perHourRate || 0,
      effectDt: new Date().toISOString(),
    }));

    const payload = {
      dctId: 0,
      plId: planId,
      acctId: newEntry.acctId,
      orgId: newEntry.orgId || '',
      notes: 'Auto-updated from UI',
      category: 'Hours',
      id: newEntry.id,
      idType: newEntry.idType || '',
      isRev: newEntry.isRev,
      isBrd: newEntry.isBrd,
      plcGlc: (newEntry.plcGlcCode || '').substring(0, 20),
      firstName: newEntry.firstName,
      lastName: newEntry.lastName,
      perHourRate: newEntry.perHourRate || '',
      status: newEntry.status || 'Act',
      plForecasts: payloadForecasts,
    };

    try {
      await axios.post(
        'https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost',
        payload
      );
      setSuccessMessageText('Entry saved successfully!');
      setShowSuccessMessage(true);
      setShowNewForm(false);
      setNewEntry({
        id: '',
        firstName: '',
        lastName: '',
        isRev: false,
        isBrd: false,
        idType: '',
        acctId: '',
        orgId: '',
        plcGlcCode: '',
        perHourRate: '',
        status: 'Act',
      });
      setNewEntryPeriodHours({});
      // Trigger a refresh of employee data by notifying parent component
      window.location.reload();
    } catch (err) {
      setSuccessMessageText('Failed to save entry.');
      setShowSuccessMessage(true);
      toast.error('Failed to save new entry: ' + (err.response?.data?.message || err.message), {
        toastId: 'save-entry-error',
        autoClose: 3000,
      });
    } finally {
      setIsDurationLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  const handleFindReplace = async () => {
    if (
      !isEditable ||
      findValue === '' ||
      (replaceScope === 'row' && selectedRowIndex === null) ||
      (replaceScope === 'column' && selectedColumnKey === null)
    ) {
      toast.warn('Please select a valid scope and enter a value to find.', {
        toastId: 'find-replace-warning',
        autoClose: 3000,
      });
      return;
    }

    const updates = [];
    const updatedInputValues = { ...inputValues };
    let replacementsCount = 0;

    for (const empIdx in employees) {
      const emp = employees[empIdx];
      const actualEmpIdx = parseInt(empIdx, 10);

      if (replaceScope === 'row' && actualEmpIdx !== selectedRowIndex) {
        continue;
      }

      for (const duration of sortedDurations) {
        const uniqueKey = `${duration.monthNo}_${duration.year}`;

        if (replaceScope === 'column' && uniqueKey !== selectedColumnKey) {
          continue;
        }

        if (!isMonthEditable(duration, closedPeriod, planType)) {
          continue;
        }

        const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
        const displayedValue =
          inputValues[currentInputKey] !== undefined
            ? String(inputValues[currentInputKey])
            : String(getMonthHours(emp)[uniqueKey]?.value ?? '');

        const findValueNormalized = findValue.trim();
        const displayedValueNormalized = displayedValue.trim();
        const isMatch =
          findValueNormalized === ''
            ? displayedValueNormalized === '' || displayedValueNormalized === '0'
            : displayedValueNormalized === findValueNormalized;

        if (isMatch) {
          const newNumericValue = replaceValue === '' ? 0 : Number(replaceValue);

          if (!isNaN(newNumericValue) || replaceValue === '') {
            const forecast = getMonthHours(emp)[uniqueKey];
            const originalForecastedHours = forecast?.forecastedhours ?? 0;

            if (forecast && forecast.forecastid && newNumericValue !== originalForecastedHours) {
              updatedInputValues[currentInputKey] = replaceValue;
              replacementsCount++;

              const payload = {
                forecastedamt: forecast.forecastedamt ?? 0,
                forecastid: Number(forecast.forecastid),
                projId: forecast.projId ?? '',
                plId: forecast.plId ?? 0,
                emplId: forecast.emplId ?? '',
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
                updatedat: new Date().toISOString().split('T')[0],
                displayText: forecast.displayText ?? '',
              };
              updates.push(
                axios.put(
                  'https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours',
                  payload,
                  { headers: { 'Content-Type': 'application/json' } }
                )
              );
            }
          }
        }
      }
    }

    setInputValues(updatedInputValues);
    try {
      await Promise.all(updates);
      setSuccessMessageText(`Replaced ${replacementsCount} cells.`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } catch (err) {
      setSuccessMessageText('Failed to replace some values.');
      setShowSuccessMessage(true);
      toast.error('Failed to replace values: ' + (err.response?.data?.message || err.message), {
        toastId: 'replace-error',
        autoClose: 3000,
      });
    } finally {
      setShowFindReplace(false);
      setFindValue('');
      setReplaceValue('');
      setSelectedRowIndex(null);
      setSelectedColumnKey(null);
      setReplaceScope('all');
    }
  };

  const handleRowClick = (actualEmpIdx) => {
    if (!isEditable) return;
    setSelectedRowIndex(actualEmpIdx === selectedRowIndex ? null : actualEmpIdx);
    setSelectedColumnKey(null);
    setReplaceScope(actualEmpIdx === selectedRowIndex ? 'all' : 'row');
  };

  const handleColumnHeaderClick = (uniqueKey) => {
    if (!isEditable) return;
    setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
    setSelectedRowIndex(null);
    setReplaceScope(uniqueKey === selectedColumnKey ? 'all' : 'column');
  };

  const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
  const showHiddenRows = () => setHiddenRows({});

  const sortedDurations = [...durations]
    .filter((d) => localFiscalYear === 'All' || d.year === parseInt(localFiscalYear))
    .sort((a, b) => new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1));

  if (isForecastLoading || isDurationLoading) {
    return (
      <div className="p-4 font-inter flex justify-center items-center">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-xs text-gray-600">Loading forecast data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 font-inter">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
        <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
          <strong className="font-bold text-xs">Error: </strong>
          <span className="block sm:inline text-xs">{error}</span>
        </div>
      </div>
    );
  }

  const rowCount = Math.max(
    employees.filter((_, idx) => !hiddenRows[idx]).length + (showNewForm ? 1 : 0),
    2
  );

  return (
    <div className="relative p-4 font-inter w-full synchronized-tables-outer">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      {showSuccessMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
            successMessageText.includes('successfully') || successMessageText.includes('Replaced')
              ? 'bg-green-500'
              : 'bg-red-500'
          } text-white text-xs`}
        >
          {successMessageText}
        </div>
      )}

      <h2 className="text-xs font-semibold mb-3 text-gray-800">Hours</h2>
      <div className="w-full flex justify-between mb-4 gap-2">
        <div>
          <label className="text-xs font-medium mr-2">Fiscal Year:</label>
          <select
            value={localFiscalYear}
            onChange={(e) => setLocalFiscalYear(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
          >
            {fiscalYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          {hasHiddenRows && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
              onClick={showHiddenRows}
            >
              Show Hidden Rows
            </button>
          )}
          <button
            onClick={() => setShowNewForm((prev) => !prev)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
          >
            {showNewForm ? 'Cancel' : 'New'}
          </button>
          {showNewForm && (
            <button
              onClick={handleSaveNewEntry}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
            >
              Save Entry
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
            onClick={() => isEditable && setShowFindReplace(true)}
          >
            Find & Replace
          </button>
        </div>
      </div>

      {employees.length === 0 && !showNewForm && sortedDurations.length > 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
          No forecast data available for this plan. Click "New" to add a new entry.
        </div>
      ) : (
        <div className="synchronized-tables-container">
          <div className="synchronized-table-scroll">
            <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
              <thead className="sticky-thead">
                <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: 'normal' }}>
                  {EMPLOYEE_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="p-2 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[80px]"
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
                    style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: 'normal' }}
                  >
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="id"
                        value={newEntry.id}
                        onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter ID"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="name"
                        value={
                          newEntry.lastName && newEntry.firstName
                            ? `${newEntry.lastName}, ${newEntry.firstName}`
                            : newEntry.lastName || newEntry.firstName || ''
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          const [lastName, firstName] = value.includes(', ')
                            ? value.split(', ').map((s) => s.trim())
                            : [value, ''];
                          setNewEntry({
                            ...newEntry,
                            lastName: lastName || '',
                            firstName: firstName || '',
                          });
                        }}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter Name (Last, First)"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="acctId"
                        value={newEntry.acctId}
                        onChange={(e) => setNewEntry({ ...newEntry, acctId: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter Account"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="orgId"
                        value={newEntry.orgId}
                        onChange={(e) => setNewEntry({ ...newEntry, orgId: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter Organization"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="plcGlcCode"
                        value={newEntry.plcGlcCode}
                        onChange={(e) =>
                          setNewEntry({ ...newEntry, plcGlcCode: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter Plc"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <select
                        name="idType"
                        value={newEntry.idType || ''}
                        onChange={(e) => setNewEntry({ ...newEntry, idType: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                      >
                        {ID_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5 text-center">
                      <input
                        type="checkbox"
                        name="isRev"
                        checked={newEntry.isRev}
                        onChange={(e) => setNewEntry({ ...newEntry, isRev: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5 text-center">
                      <input
                        type="checkbox"
                        name="isBrd"
                        checked={newEntry.isBrd}
                        onChange={(e) => setNewEntry({ ...newEntry, isBrd: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      <input
                        type="text"
                        name="status"
                        value={newEntry.status}
                        onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter Status"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-0.5">
                      {Object.values(newEntryPeriodHours)
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
                    const uniqueRowKey = `${emp.emple.emplId || 'emp'}-${actualEmpIdx}`;
                    return (
                      <tr
                        key={uniqueRowKey}
                        className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
                          selectedRowIndex === actualEmpIdx ? 'bg-yellow-100' : 'even:bg-gray-50'
                        }`}
                        style={{
                          height: `${ROW_HEIGHT_DEFAULT}px`,
                          lineHeight: 'normal',
                          cursor: isEditable ? 'pointer' : 'default',
                        }}
                        onClick={() => handleRowClick(actualEmpIdx)}
                      >
                        {EMPLOYEE_COLUMNS.map((col) => (
                          <td
                            key={`${uniqueRowKey}-${col.key}`}
                            className="p-2 border-r border-gray-200 text-xs text-gray-700 min-w-[80px]"
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

          <div className="synchronized-table-scroll">
            <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
              <thead className="sticky-thead">
                <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: 'normal' }}>
                  {sortedDurations.map((duration) => {
                    const uniqueKey = `${duration.monthNo}_${duration.year}`;
                    return (
                      <th
                        key={uniqueKey}
                        className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal ${
                          selectedColumnKey === uniqueKey ? 'bg-yellow-100' : ''
                        }`}
                        style={{ cursor: isEditable ? 'pointer' : 'default' }}
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
                    style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: 'normal' }}
                  >
                    {sortedDurations.map((duration) => {
                      const uniqueKey = `${duration.monthNo}_${duration.year}`;
                      const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
                      return (
                        <td
                          key={`new-${uniqueKey}`}
                          className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
                        >
                          <input
                            type="text"
                            inputMode="numeric"
                            value={newEntryPeriodHours[uniqueKey] || ''}
                            onChange={(e) =>
                              isInputEditable &&
                              setNewEntryPeriodHours((prev) => ({
                                ...prev,
                                [uniqueKey]: e.target.value.replace(/[^0-9.]/g, ''),
                              }))
                            }
                            className={`text-center border border-gray-300 bg-white text-xs w-[55px] h-[20px] p-[2px] ${
                              !isInputEditable ? 'cursor-not-allowed text-gray-400' : 'text-gray-700'
                            }`}
                            disabled={!isInputEditable}
                            placeholder="Enter Hours"
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
                    const monthHours = getMonthHours(emp);
                    const uniqueRowKey = `${emp.emple.emplId || 'emp'}-${actualEmpIdx}`;
                    return (
                      <tr
                        key={uniqueRowKey}
                        className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
                          selectedRowIndex === actualEmpIdx ? 'bg-yellow-100' : 'even:bg-gray-50'
                        }`}
                        style={{
                          height: `${ROW_HEIGHT_DEFAULT}px`,
                          lineHeight: 'normal',
                          cursor: isEditable ? 'pointer' : 'default',
                        }}
                        onClick={() => handleRowClick(actualEmpIdx)}
                      >
                        {sortedDurations.map((duration) => {
                          const uniqueKey = `${duration.monthNo}_${duration.year}`;
                          const forecast = monthHours[uniqueKey];
                          const value =
                            inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
                            (forecast?.value !== undefined ? forecast.value : '0');
                          const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
                          return (
                            <td
                              key={`${uniqueRowKey}-${uniqueKey}`}
                              className={`py-2 px-3 border-r border-gray-200 text-center min-w-[100px] ${
                                selectedColumnKey === uniqueKey ? 'bg-yellow-100' : ''
                              }`}
                            >
                              <input
                                type="text"
                                inputMode="numeric"
                                className={`text-center border border-gray-300 bg-white text-xs w-[55px] h-[20px] p-[2px] ${
                                  !isInputEditable ? 'cursor-not-allowed text-gray-400' : 'text-gray-700'
                                }`}
                                value={value}
                                onChange={(e) =>
                                  handleInputChange(
                                    actualEmpIdx,
                                    uniqueKey,
                                    e.target.value.replace(/[^0-9.]/g, '')
                                  )
                                }
                                onBlur={(e) => handleForecastHoursBlur(actualEmpIdx, uniqueKey, e.target.value)}
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
      )}

      {showFindReplace && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
            <h3 className="text-lg font-semibold mb-4">Find and Replace Hours</h3>
            <div className="mb-3">
              <label htmlFor="findValue" className="block text-gray-700 text-xs font-medium mb-1">
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
                onChange={(e) => setReplaceValue(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="New value (e.g., 120 or empty)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">Scope:</label>
              <div className="flex gap-4 flex-wrap">
                <label className="inline-flex items-center text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="all"
                    checked={replaceScope === 'all'}
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
                    checked={replaceScope === 'row'}
                    onChange={(e) => setReplaceScope(e.target.value)}
                    disabled={selectedRowIndex === null}
                  />
                  <span className="ml-2">
                    Selected Row ({selectedRowIndex !== null ? employees[selectedRowIndex]?.emple.emplId : 'N/A'})
                  </span>
                </label>
                <label className="inline-flex items-center text-xs cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="replaceScope"
                    value="column"
                    checked={replaceScope === 'column'}
                    onChange={(e) => setReplaceScope(e.target.value)}
                    disabled={selectedColumnKey === null}
                  />
                  <span className="ml-2">
                    Selected Column (
                    {selectedColumnKey
                      ? sortedDurations.find((d) => `${d.monthNo}_${d.year}` === selectedColumnKey)?.month
                      : 'N/A'}
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
                  setReplaceScope('all');
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