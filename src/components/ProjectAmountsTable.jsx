import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EMPLOYEE_COLUMNS = [
  { key: "emplId", label: "ID" },
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "idType", label: "ID Type" },
  { key: "isRev", label: "Rev" },
  { key: "isBrd", label: "Brd" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total" },
];

const ID_TYPE_OPTIONS = [
  { value: "", label: "None" },
  { value: "Employee", label: "Employee" },
  { value: "Vendor", label: "Vendor" },
  { value: "Other", label: "Other" },
];

const ROW_HEIGHT_DEFAULT = 64;

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

const ProjectAmountsTable = ({ initialData, startDate, endDate, planType, fiscalYear: propFiscalYear }) => {
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
    plcGlcCode: "",
    perHourRate: "",
    status: "Act",
  });
  const [newEntryPeriodAmounts, setNewEntryPeriodAmounts] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [localFiscalYear, setLocalFiscalYear] = useState(propFiscalYear);
  const [fiscalYears, setFiscalYears] = useState([]);
  const [hiddenRows, setHiddenRows] = useState({});

  const isEditable = initialData.status === "Working";
  const planId = initialData.plId;
  const closedPeriod = initialData.closedPeriod;

  useEffect(() => {
    setLocalFiscalYear(propFiscalYear);
  }, [propFiscalYear]);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate || !planId) {
        setDurations([]);
        setFiscalYears([]);
        setEmployees([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch durations
        const durationResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
        );
        if (!Array.isArray(durationResponse.data)) {
          throw new Error("Invalid duration response format");
        }
        const fetchedDurations = durationResponse.data;
        setDurations(fetchedDurations);
        const years = [...new Set(fetchedDurations.map(d => d.year))].sort();
        setFiscalYears(["All", ...years]);

        // Fetch project data
        let apiData = [];
        if (localFiscalYear === "All") {
          // Fetch data for all fiscal years
          const fetchPromises = years.map(year =>
            axios.get(
              `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}/${year}`
            )
          );
          const responses = await Promise.all(fetchPromises);
          apiData = responses
            .flatMap(response => (Array.isArray(response.data) ? response.data : [response.data]))
            .filter(item => item !== null && item !== undefined);
        } else {
          // Fetch data for the selected fiscal year
          const response = await axios.get(
            `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}/${localFiscalYear}`
          );
          apiData = Array.isArray(response.data) ? response.data : [response.data];
        }

        if (apiData.length === 0) {
          setEmployees([]);
          toast.info('No forecast data available for this plan. Click "New" to add entries.', {
            toastId: 'no-forecast-data',
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
              plcGlcCode: item.empl?.plcGlc || "",
              perHourRate: item.empl?.hrRate || "",
              isRev: item.empl?.isRev || false,
              isBrd: item.empl?.isBrd || false,
              status: item.empl?.status || "Act",
              plForecasts: item.empl?.plForecasts || [],
              idType: item.empl?.idType || "Employee",
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
          toast.info('No forecast data available for this plan. Click "New" to add entries.', {
            toastId: 'no-forecast-data',
            autoClose: 3000,
          });
        } else {
          toast.error('Failed to load forecast data: ' + (err.response?.data?.message || err.message), {
            toastId: 'forecast-error',
            autoClose: 3000,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, planId, localFiscalYear]);

  // Rest of the component remains unchanged
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
      idType: emp.emple.idType || "Employee",
      emplId: emp.emple.emplId || "-",
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
        const value = forecast.forecastedamt ?? 0;
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
      toast.warn('Cannot edit amounts for a closed period.', {
        toastId: 'closed-period-warning',
        autoClose: 3000,
      });
      return;
    }
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: newValue,
      }));
    }
  };

  const handleForecastAmountBlur = async (empIdx, uniqueKey, value) => {
    if (!isEditable) return;
    const currentDuration = sortedDurations.find(
      (d) => `${d.monthNo}_${d.year}` === uniqueKey
    );
    if (!isMonthEditable(currentDuration, closedPeriod, planType)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(getMonthAmounts(employees[empIdx])[uniqueKey]?.forecastedamt ?? 0),
      }));
      toast.warn('Cannot edit amounts for a closed period.', {
        toastId: 'closed-period-warning',
        autoClose: 3000,
      });
      return;
    }

    const newValue = value === "" ? 0 : Number(value);
    const emp = employees[empIdx];
    const monthAmounts = getMonthAmounts(emp);
    const forecast = monthAmounts[uniqueKey];
    const originalForecastedAmount = forecast?.forecastedamt ?? 0;

    if (newValue === originalForecastedAmount) {
      return;
    }

    const payload = {
      forecastedamt: Number(newValue) || 0,
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
      forecastedhours: forecast.forecastedhours ?? 0,
      createdat: forecast.createdat ?? new Date(0).toISOString(),
      updatedat: new Date().toISOString().split("T")[0],
      displayText: forecast.displayText ?? "",
    };

    try {
      await axios.put(
        "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccessMessageText("Forecast updated!");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
      toast.success('Forecast amount updated successfully!', {
        toastId: 'forecast-update-success',
        autoClose: 3000,
      });
    } catch (err) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedAmount),
      }));
      setSuccessMessageText("Failed to update forecast.");
      setShowSuccessMessage(true);
      toast.error('Failed to update forecast amount: ' + (err.response?.data?.message || err.message), {
        toastId: 'forecast-update-error',
        autoClose: 3000,
      });
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

    setIsLoading(true);

    // Construct forecasts for each duration
    const payloadForecasts = sortedDurations.map((duration) => ({
      forecastedamt: Number(newEntryPeriodAmounts[`${duration.monthNo}_${duration.year}`]) || 0,
      forecastid: 0,
      projId: '22003.T.0069.00', // Hardcoded as per your provided code
      plId: planId,
      emplId: newEntry.id,
      dctId: 0,
      month: duration.monthNo,
      year: duration.year,
      forecastedhours: 0,
      acctId: newEntry.acctId,
      orgId: newEntry.orgId,
      plc: newEntry.plcGlcCode || "",
      hrlyRate: Number(newEntry.perHourRate) || 0,
    }));

    // Construct payload for the new entry
    const payload = {
      dctId: 0,
      plId: planId,
      acctId: newEntry.acctId || "",
      orgId: newEntry.orgId || "",
      notes: "",
      category: "",
      amountType: "",
      id: newEntry.id,
      idType: newEntry.idType || "Employee",
      isRev: newEntry.isRev || false,
      isBrd: newEntry.isBrd || false,
      plcGlc: (newEntry.plcGlcCode || "").substring(0, 20),
      firstName: newEntry.firstName || "",
      lastName: newEntry.lastName || "",
      perHourRate: Number(newEntry.perHourRate) || 0,
      status: newEntry.status || "Act",
      createdBy: "System",
      lastModifiedBy: "System",
      plForecasts: payloadForecasts,
      plDct: {},
    };

    try {
      // Send POST request to save new entry
      const response = await axios.post(
        "https://test-api-3tmq.onrender.com/DirectCost/AddNewDirectCost",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Log the response for debugging
      console.log("Save response:", response.status, response.data);

      // Reset form and show success message
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
      setNewEntryPeriodAmounts({});

      // Refetch data to update UI
      let apiData = [];
      if (localFiscalYear === "All") {
        // Fetch data for all fiscal years
        const fetchPromises = fiscalYears
          .filter(year => year !== "All")
          .map(year =>
            axios.get(
              `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}/${year}`
            )
          );
        const responses = await Promise.all(fetchPromises);
        apiData = responses
          .flatMap(response => (Array.isArray(response.data) ? response.data : [response.data]))
          .filter(item => item !== null && item !== undefined);
      } else {
        // Fetch data for the selected fiscal year
        const fetchResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetDirectCostForecastDataByPlanId/${planId}/${localFiscalYear}`
        );
        apiData = Array.isArray(fetchResponse.data) ? fetchResponse.data : [fetchResponse.data];
      }

      if (apiData.length === 0) {
        setEmployees([]);
        toast.info('No forecast data available after saving. Click "New" to add more entries.', {
          toastId: 'no-forecast-data-post-save',
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
            plcGlcCode: item.empl?.plcGlc || "",
            perHourRate: item.empl?.hrRate || "",
            isRev: item.empl?.isRev || false,
            isBrd: item.empl?.isBrd || false,
            status: item.empl?.status || "Act",
            plForecasts: item.empl?.plForecasts || [],
            idType: item.empl?.idType || "Employee",
          },
        }));
        setEmployees(updatedEmployees);
      }

      setInputValues({});
      toast.success('New entry saved successfully!', {
        toastId: 'save-entry-success',
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
        toastId: 'save-entry-error',
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  const handleRowClick = (actualEmpIdx) => {
    if (!isEditable) return;
    setSelectedRowIndex(actualEmpIdx === selectedRowIndex ? null : actualEmpIdx);
    setSelectedColumnKey(null);
    setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
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
        const displayedValue =
          inputValues[currentInputKey] !== undefined
            ? String(inputValues[currentInputKey])
            : String(getMonthAmounts(emp)[uniqueKey]?.value ?? '');

        const findValueNormalized = findValue.trim();
        const displayedValueNormalized = displayedValue.trim();
        const isMatch =
          findValueNormalized === ""
            ? displayedValueNormalized === "" || displayedValueNormalized === "0"
            : displayedValueNormalized === findValueNormalized;

        if (isMatch) {
          const newNumericValue = replaceValue === "" ? 0 : Number(replaceValue);

          if (!isNaN(newNumericValue) || replaceValue === "") {
            const forecast = getMonthAmounts(emp)[uniqueKey];
            const originalForecastedAmount = forecast?.forecastedamt ?? 0;

            if (forecast && forecast.forecastid && newNumericValue !== originalForecastedAmount) {
              updatedInputValues[currentInputKey] = replaceValue;
              replacementsCount++;

              const payload = {
                forecastedamt: Number(newNumericValue) || 0,
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
                forecastedhours: forecast.forecastedhours ?? 0,
                createdat: forecast.createdat ?? new Date(0).toISOString(),
                updatedat: new Date().toISOString().split("T")[0],
                displayText: forecast.displayText ?? "",
              };
              updates.push(
                axios.put(
                  "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
                  payload,
                  { headers: { "Content-Type": "application/json" } }
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
      toast.success(`Replaced ${replacementsCount} cells successfully!`, {
        toastId: 'find-replace-success',
        autoClose: 3000,
      });
    } catch (err) {
      setSuccessMessageText("Failed to replace some values.");
      setShowSuccessMessage(true);
      toast.error('Failed to replace values: ' + (err.response?.data?.message || err.message), {
        toastId: 'find-replace-error',
        autoClose: 3000,
      });
    } finally {
      setShowFindReplace(false);
      setFindValue("");
      setReplaceValue("");
      setSelectedRowIndex(null);
      setSelectedColumnKey(null);
      setReplaceScope("all");
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
  const showHiddenRows = () => setHiddenRows({});

  const sortedDurations = [...durations]
    .filter(d => localFiscalYear === "All" || d.year === parseInt(localFiscalYear))
    .sort((a, b) => new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1));

  if (isLoading) {
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

  return (
    <div className="relative p-4 font-inter w-full synchronized-tables-outer">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      {showSuccessMessage && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${successMessageText.includes("successfully") || successMessageText.includes("Replaced") ? "bg-green-500" : "bg-red-500"} text-white text-xs`}>
          {successMessageText}
        </div>
      )}

      <h2 className="text-xs font-semibold mb-3 text-gray-800">Amounts</h2>
      <div className="w-full flex justify-between mb-4 gap-2">
        <div>
          <label className="text-xs font-medium mr-2">Fiscal Year:</label>
          <select
            value={localFiscalYear}
            onChange={(e) => setLocalFiscalYear(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
          >
            {fiscalYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          {hasHiddenRows && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium" onClick={showHiddenRows}>
              Show Hidden Rows
            </button>
          )}
          <button
            onClick={() => setShowNewForm((prev) => !prev)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
          >
            {showNewForm ? "Cancel" : "New"}
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
          No forecast amount data available for this plan. Click "New" to add a new entry.
        </div>
      ) : (
        <div className="synchronized-tables-container">
          <div className="synchronized-table-scroll">
            <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
              <thead className="sticky-thead">
                <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
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
                  <tr key="new-entry" className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
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
                      <select
                        name="idType"
                        value={newEntry.idType || ""}
                        onChange={(e) => setNewEntry({ ...newEntry, idType: e.target.value })}
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                      >
                        {ID_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
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
                      {Object.values(newEntryPeriodAmounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                )}
                {employees.filter((_, idx) => !hiddenRows[idx]).map((emp, index) => {
                  const actualEmpIdx = employees.findIndex((e) => e === emp);
                  const row = getEmployeeRow(emp, actualEmpIdx);
                  return (
                    <tr
                      key={`${emp.emple.empleId}_${actualEmpIdx}`}
                      className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${selectedRowIndex === actualEmpIdx ? "bg-yellow-100" : "even:bg-gray-50"}`}
                      style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal", cursor: isEditable ? "pointer" : "default" }}
                      onClick={() => handleRowClick(actualEmpIdx)}
                    >
                      {EMPLOYEE_COLUMNS.map((col) => (
                        <td key={col.key} className="p-2 border-r border-gray-200 text-xs text-gray-700 min-w-[80px]">
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
                <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                  {sortedDurations.map((duration) => {
                    const uniqueKey = `${duration.monthNo}_${duration.year}`;
                    return (
                      <th
                        key={uniqueKey}
                        className={`py-2 px-3 border border-gray-200 text-center min-w-[100px] text-xs text-gray-900 font-normal ${selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""}`}
                        style={{ cursor: isEditable ? "pointer" : "default" }}
                        onClick={() => handleColumnHeaderClick(uniqueKey)}
                      >
                        <span className="whitespace-nowrap">{duration.month}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {showNewForm && (
                  <tr key="new-entry" className="bg-gray-50" style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                    {sortedDurations.map((duration) => {
                      const uniqueKey = `${duration.monthNo}_${duration.year}`;
                      const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
                      return (
                        <td key={`new-${uniqueKey}`} className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={newEntryPeriodAmounts[uniqueKey] || ""}
                            onChange={(e) => isInputEditable && setNewEntryPeriodAmounts((prev) => ({ ...prev, [uniqueKey]: e.target.value.replace(/[^0-9.]/g, "") }))}
                            className={`text-center border border-gray-300 bg-white text-xs w-[55px] h-[20px] p-[2px] ${!isInputEditable ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
                            disabled={!isInputEditable}
                            placeholder={isInputEditable ? "Enter Amount" : "Closed"}
                          />
                        </td>
                      );
                    })}
                  </tr>
                )}
                {employees.filter((_, idx) => !hiddenRows[idx]).map((emp, index) => {
                  const actualEmpIdx = employees.findIndex((e) => e === emp);
                  const monthAmounts = getMonthAmounts(emp);
                  return (
                    <tr
                      key={`${emp.emple.empleId}_${actualEmpIdx}`}
                      className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${selectedRowIndex === actualEmpIdx ? "bg-yellow-100" : "even:bg-gray-50"}`}
                      style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal", cursor: isEditable ? "pointer" : "default" }}
                      onClick={() => handleRowClick(actualEmpIdx)}
                    >
                      {sortedDurations.map((duration) => {
                        const uniqueKey = `${duration.monthNo}_${duration.year}`;
                        const forecast = monthAmounts[uniqueKey];
                        const forecastValue = forecast?.value ?? 0;
                        const value = inputValues[`${actualEmpIdx}_${uniqueKey}`] ?? (forecastValue !== undefined && forecastValue !== null ? forecastValue.toString() : "");
                        const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
                        const isZeroAndClosed = forecastValue === 0 && !isInputEditable;
                        return (
                          <td
                            key={uniqueKey}
                            className={`py-2 px-3 border-r border-gray-200 text-center min-w-[100px] ${selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""}`}
                          >
                            <input
                              type="text"
                              inputMode="numeric"
                              className={`text-center border border-gray-300 bg-white text-xs w-[55px] h-[20px] p-[2px] ${!isInputEditable || isZeroAndClosed ? "cursor-not-allowed text-gray-400" : "text-gray-700"}`}
                              value={value}
                              onChange={(e) => handleInputChange(actualEmpIdx, uniqueKey, e.target.value.replace(/[^0-9.]/g, ""))}
                              onBlur={(e) => handleForecastAmountBlur(actualEmpIdx, uniqueKey, e.target.value)}
                              disabled={!isInputEditable || isZeroAndClosed}
                              placeholder={isInputEditable ? "Enter Amount" : "Closed"}
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
            <h3 className="text-lg font-semibold mb-4">Find and Replace Amounts</h3>
            <div className="mb-3">
              <label htmlFor="findValue" className="block text-gray-700 text-xs font-medium mb-1">Find:</label>
              <input
                type="text"
                id="findValue"
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
                value={findValue}
                onChange={(e) => setFindValue(e.target.value)}
                placeholder="Value to find (e.g., 1000 or empty)"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="replaceValue" className="block text-gray-700 text-xs font-medium mb-1">Replace with:</label>
              <input
                type="text"
                id="replaceValue"
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
                value={replaceValue}
                onChange={(e) => setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="New value (e.g., 1200 or empty)"
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
                  <span className="ml-2">Selected Row ({selectedRowIndex !== null ? employees[selectedRowIndex]?.emple.emplId : "N/A"})</span>
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
                  <span className="ml-2">Selected Column ({selectedColumnKey ? sortedDurations.find((d) => `${d.monthNo}_${d.year}` === selectedColumnKey)?.month : "N/A"})</span>
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

export default ProjectAmountsTable;