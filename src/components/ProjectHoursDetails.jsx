import React, { useEffect, useState } from "react";
import axios from "axios";

const EMPLOYEE_COLUMNS = [
  { key: "idType", label: "ID Type" },
  { key: "emplId", label: "ID" },
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "glcPlc", label: "Plc" },
  { key: "perHourRate", label: "Hr Rate" },
  { key: "isRev", label: "Rev" },
  { key: "isBrd", label: "Brd" },
  { key: "total", label: "Total" },
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
  return durationYear > closedYear || (durationYear === closedYear && durationMonth >= closedMonth);
}

const ProjectHoursDetails = ({ planId, status, planType, closedPeriod, startDate, endDate, employees, isForecastLoading }) => {
  const [durations, setDurations] = useState([]);
  const [isDurationLoading, setIsDurationLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenRows, setHiddenRows] = useState({});
  const [inputValues, setInputValues] = useState({});

  const isEditable = status === "Working";

  useEffect(() => {
    console.log("ProjectHoursDetails useEffect triggered with props:", { planId, planType, status, closedPeriod, startDate, endDate, employees, isForecastLoading });
    const fetchDurations = async () => {
      if (!startDate || !endDate) {
        console.log("Missing startDate or endDate, exiting fetchDurations");
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
          throw new Error("Invalid duration response format");
        }

        setDurations(durationResponse.data);
      } catch (err) {
        console.error("Duration API call failed:", err.message, err.response?.data);
        setError("Failed to load duration data. Please try again.");
      } finally {
        setIsDurationLoading(false);
      }
    };

    fetchDurations();
  }, [startDate, endDate]);

  const getEmployeeRow = (emp, idx) => {
    const monthHours = getMonthHours(emp);
    const totalHours = sortedDurations.reduce((sum, duration) => {
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      const inputValue = inputValues[`${idx}_${uniqueKey}`];
      const forecastValue = monthHours[uniqueKey]?.value;
      const value = inputValue !== undefined ? inputValue : forecastValue;
      return sum + (value && !isNaN(value) ? Number(value) : 0);
    }, 0);

    return {
      idType: "Employee",
      emplId: emp.empl.emplId,
      name: `${emp.empl.lastName}, ${emp.empl.firstName}`,
      status: emp.empl.sEmplStatusCd || emp.empl.status || "IN",
      acctId: emp.empl.accId || "-",
      orgId: emp.empl.orgId || "-",
      glcPlc: emp.empl.plcGlcCode || "-",
      perHourRate: emp.empl.perHourRate || "-",
      isRev: emp.empl.isRev ? (
        <span className="text-green-600 font-medium text-xl">✓</span>
      ) : (
        "-"
      ),
      isBrd: emp.empl.isBrd ? (
        <span className="text-green-600 font-medium text-xl">✓</span>
      ) : (
        "-"
      ),
      total: totalHours || "-",
    };
  };

  const getMonthHours = (emp) => {
    const monthHours = {};
    if (emp.empl && Array.isArray(emp.empl.plForecasts)) {
      emp.empl.plForecasts.forEach((forecast) => {
        const uniqueKey = `${forecast.month}_${forecast.year}`;
        const value = forecast.forecastedhours ?? 0;
        monthHours[uniqueKey] = {
          value,
          ...forecast,
        };
      });
    }
    return monthHours;
  };

  const handleInputChange = (empIdx, uniqueKey, newValue) => {
    if (!isEditable) return;
    if (!/^\d*\.?\d*$/.test(newValue)) return;
    setInputValues((prev) => ({
      ...prev,
      [`${empIdx}_${uniqueKey}`]: newValue,
    }));
  };

  const handleForecastHoursBlur = async (empIdx, uniqueKey) => {
    if (!isEditable) return;
    const newValue = inputValues[`${empIdx}_${uniqueKey}`];
    if (newValue === undefined) return;

    const emp = employees[empIdx];
    const monthHours = getMonthHours(emp);
    const forecast = monthHours[uniqueKey];

    if (!forecast || !forecast.forecastid) {
      console.warn(`Forecast ID not found for employee ${emp.empl.emplId}, key ${uniqueKey}`);
      return;
    }

    const prevEmployees = [...employees];
    const updatedEmployees = [...employees];
    const updatedForecasts = updatedEmployees[empIdx].empl.plForecasts.map((f) =>
      f.forecastid === forecast.forecastid
        ? { ...f, forecastedhours: newValue === "" ? 0 : Number(newValue) }
        : f
    );
    updatedEmployees[empIdx] = {
      ...updatedEmployees[empIdx],
      empl: {
        ...updatedEmployees[empIdx].empl,
        plForecasts: updatedForecasts,
      },
    };

    const payload = {
      forecastedamt: forecast.forecastedamt ?? 0,
      forecastid: Number(forecast.forecastid),
      projId: forecast.projId,
      plId: forecast.plId,
      emplId: forecast.emplId,
      month: forecast.month,
      year: forecast.year,
      forecastedhours: newValue === "" ? 0 : Number(newValue),
      createdat: forecast.createdat,
      updatedat: new Date().toISOString(),
      displayText: forecast.displayText,
    };

    try {
      await axios.put(
        "https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      updatedEmployees[empIdx] = prevEmployees[empIdx];
      window.alert(
        "Failed to update forecasted hours: " +
          (err.response?.data?.message || JSON.stringify(err.response?.data) || err.message)
      );
    }
  };

  const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
  const showHiddenRows = () => setHiddenRows([]);

  const sortedDurations = [...durations].sort(
    (a, b) => new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1)
  );

  // Show loading state if either forecast or duration data is still loading
  if (isForecastLoading || isDurationLoading) {
    return (
      <div className="p-4 font-inter">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading forecast data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
          <strong className="font-bold text-sm">Error: </strong>
          <span className="block sm:inline text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-4 py-3 rounded">
          <span className="text-sm">No forecast data found for this plan.</span>
        </div>
      </div>
    );
  }

  const visibleEmployees = employees.filter((_, idx) => !hiddenRows[idx]);

  return (
    <div className="p-4 font-inter">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Hours</h2>
      {hasHiddenRows && (
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
          onClick={showHiddenRows}
        >
          Show Hidden Rows
        </button>
      )}
      <div className="flex w-full">
        <div className="w-1/2 overflow-x-auto border-r border-gray-300">
          <table className="table-fixed text-sm text-left min-w-max border border-gray-300 bg-white rounded-lg">
            <thead className="bg-blue-100 text-gray-700 font-normal">
              <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                {EMPLOYEE_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="p-2 border border-gray-200 whitespace-nowrap font-medium text-xs text-gray-900"
                    style={{ boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleEmployees.map((emp, vIdx) => {
                const row = getEmployeeRow(emp, employees.findIndex((e) => e === emp));
                return (
                  <tr
                    key={emp.empl.emplId}
                    className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
                    style={{ height: `${ROW_HEIGHT_DEFAULT}px`, boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    {EMPLOYEE_COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className="p-2 border-r border-gray-200 text-sm text-gray-700"
                        style={{ boxSizing: "border-box", lineHeight: "normal" }}
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

        <div className="w-1/2 overflow-x-auto">
          <table className="min-w-full text-sm text-center border-collapse border border-gray-300 bg-white rounded-lg">
            <thead className="bg-blue-100 text-gray-700 font-normal">
              <tr style={{ height: `${ROW_HEIGHT_DEFAULT}px`, lineHeight: "normal" }}>
                {sortedDurations.map((duration) => (
                  <th
                    key={`${duration.year}-${duration.monthNo}`}
                    className="py-2 px-3 border border-gray-200 text-center min-w-[100px] font-medium text-xs text-gray-900"
                    style={{ boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="whitespace-nowrap">
                        {duration.month} 
                      </span>
                      <span className="text-xs text-gray-600">
                        {duration.workingHours || 0} hrs
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleEmployees.map((emp) => {
                const monthHours = getMonthHours(emp);
                return (
                  <tr
                    key={emp.empl.emplId}
                    className="even:bg-gray-50 whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200"
                    style={{ height: `${ROW_HEIGHT_DEFAULT}px`, boxSizing: "border-box", lineHeight: "normal" }}
                  >
                    {sortedDurations.map((duration) => {
                      const uniqueKey = `${duration.monthNo}_${duration.year}`;
                      const forecast = monthHours[uniqueKey];
                      const value =
                        inputValues[`${employees.findIndex((e) => e === emp)}_${uniqueKey}`] ??
                        (forecast && forecast.value !== undefined ? forecast.value : "");
                      const isInputEditable = isEditable && isMonthEditable(duration, closedPeriod, planType);
                      return (
                        <td
                          key={`${duration.year}-${duration.monthNo}`}
                          className="py-2 px-3 border-r border-gray-200 text-center min-w-[100px]"
                          style={{ boxSizing: "border-box", lineHeight: "normal" }}
                        >
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`text-center outline-none bg-transparent focus:outline focus:outline-blue-500 transition text-sm text-gray-700 ${
                              !isInputEditable ? "cursor-not-allowed text-gray-400" : ""
                            }`}
                            style={{
                              width: "55px",
                              padding: "0px 2px",
                              height: "20px",
                              boxSizing: "border-box",
                              lineHeight: "normal",
                            }}
                            value={value}
                            onChange={(e) =>
                              handleInputChange(
                                employees.findIndex((e2) => e2 === emp),
                                uniqueKey,
                                e.target.value.replace(/[^0-9.]/g, "")
                              )
                            }
                            onBlur={() =>
                              handleForecastHoursBlur(
                                employees.findIndex((e2) => e2 === emp),
                                uniqueKey
                              )
                            }
                            disabled={!isInputEditable}
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
    </div>
  );
};

export default ProjectHoursDetails;