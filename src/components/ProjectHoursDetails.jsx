import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMPLOYEE_COLUMNS = [
  { key: "idType", label: "ID Type" },
  { key: "emplId", label: "ID" },
  { key: "name", label: "Name" },
  { key: "acctId", label: "Account" },
  { key: "orgId", label: "Organization" },
  { key: "glcPlc", label: "Plc" },
  { key: "isRev", label: "Rev" },
  { key: "isBrd", label: "Brd" },
  { key: "status", label: "Status" },
  { key: "perHourRate", label: "Hour Rate" },
  { key: "total", label: "Total" },
];

const ID_TYPE_OPTIONS = [
  { value: "", label: "Select ID Type" },
  { value: "Employee", label: "Employee" },
  { value: "Vendor", label: "Vendor Employee" },
  { value: "PLC", label: "PLC" },
  { value: "Other", label: "Other" },
];

const ROW_HEIGHT_DEFAULT = 48;

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

const ProjectHoursDetails = ({
  planId,
  projectId,
  status,
  planType,
  closedPeriod,
  startDate,
  endDate,
  fiscalYear,
  onSaveSuccess,
}) => {
  const [durations, setDurations] = useState([]);
  const [isDurationLoading, setIsDurationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hiddenRows, setHiddenRows] = useState({});
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
  const [newEntryPeriodHours, setNewEntryPeriodHours] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState("");
  const [employeeSuggestions, setEmployeeSuggestions] = useState([]);
  const [laborAccounts, setLaborAccounts] = useState([]);
  const [plcOptions, setPlcOptions] = useState([]);
  const [plcSearch, setPlcSearch] = useState("");
  const [showFillValues, setShowFillValues] = useState(false);
  const [fillMethod, setFillMethod] = useState("None");
  const [fillHours, setFillHours] = useState(0.0);
  const [sourceRowIndex, setSourceRowIndex] = useState(null);
  const [editedEmployeeData, setEditedEmployeeData] = useState({});
  const [localEmployees, setLocalEmployees] = useState([]);
  const [fillStartDate, setFillStartDate] = useState(startDate);
  const [fillEndDate, setFillEndDate] = useState(endDate);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef(null);
  // inside your component definition
  const verticalScrollRef = useRef(null);
  const firstTableRef = useRef(null);
  const lastTableRef = useRef(null);

  const isEditable = status === "In Progress";
  const isBudPlan = planType === "BUD";

  useEffect(() => {
  const container = verticalScrollRef.current;
  const firstScroll = firstTableRef.current;
  const lastScroll = lastTableRef.current;

  if (!container || !firstScroll || !lastScroll) return;

  // Sync vertical scroll on container scroll event
  const handleVerticalScroll = () => {
    // scrollTop for the container
    const scrollTop = container.scrollTop;
    // Set scrollTop for both inner scroll containers vertically
    firstScroll.scrollTop = scrollTop;
    lastScroll.scrollTop = scrollTop;
  };

  container.addEventListener('scroll', handleVerticalScroll);

  return () => {
    container.removeEventListener('scroll', handleVerticalScroll);
  };
}, []);

   const fetchEmployees = async () => {
      if (!planId) return;
      setIsLoading(true);
      try {
        const employeeApi =
          planType === "EAC"
            ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
            : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
        const response = await axios.get(employeeApi);
        setLocalEmployees(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setLocalEmployees([]);
        if (err.response && err.response.status === 500) {
          toast.info(
            'No forecast data available for this plan. Click "New" to add entries.',
            {
              toastId: "no-forecast-data",
              autoClose: 3000,
            }
          );
        } else {
          toast.error(
            "Failed to load forecast data: " +
              (err.response?.data?.message || err.message),
            {
              toastId: "forecast-error",
              autoClose: 3000,
            }
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

  // Fetch employees locally on planId change
  useEffect(() => {
    // const fetchEmployees = async () => {
    //   if (!planId) return;
    //   setIsLoading(true);
    //   try {
    //     const employeeApi =
    //       planType === "EAC"
    //         ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`
    //         : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
    //     const response = await axios.get(employeeApi);
    //     setLocalEmployees(Array.isArray(response.data) ? response.data : []);
    //   } catch (err) {
    //     setLocalEmployees([]);
    //     if (err.response && err.response.status === 500) {
    //       toast.info(
    //         'No forecast data available for this plan. Click "New" to add entries.',
    //         {
    //           toastId: "no-forecast-data",
    //           autoClose: 3000,
    //         }
    //       );
    //     } else {
    //       toast.error(
    //         "Failed to load forecast data: " +
    //           (err.response?.data?.message || err.message),
    //         {
    //           toastId: "forecast-error",
    //           autoClose: 3000,
    //         }
    //       );
    //     }
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    fetchEmployees();
  }, [planId, planType]);

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
          throw new Error("Invalid duration response format");
        }
        setDurations(durationResponse.data);
      } catch (err) {
        setError("Failed to load duration data. Please try again.");
        toast.error(
          "Failed to load duration data: " +
            (err.response?.data?.message || err.message),
          {
            toastId: "duration-error",
            autoClose: 3000,
          }
        );
      } finally {
        setIsDurationLoading(false);
      }
    };
    fetchDurations();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchEmployeesSuggestions = async () => {
      if (!projectId || !showNewForm) return;
      try {
        const endpoint =
          newEntry.idType === "Vendor"
            ? `https://test-api-3tmq.onrender.com/Project/GetVenderEmployeesByProject/${projectId}`
            : `https://test-api-3tmq.onrender.com/Project/GetEmployeesByProject/${projectId}`;
        const response = await axios.get(endpoint);
        const suggestions = Array.isArray(response.data)
          ? response.data.map((emp) => {
              if (newEntry.idType === "Vendor") {
                return {
                  emplId: emp.empId,
                  firstName: "",
                  lastName: emp.employeeName || "",
                  perHourRate: emp.perHourRate || "",
                };
              } else {
                const [lastName, firstName] = (emp.employeeName || "")
                  .split(", ")
                  .map((str) => str.trim());
                return {
                  emplId: emp.empId,
                  firstName: firstName || "",
                  lastName: lastName || "",
                  perHourRate: emp.perHourRate || "",
                };
              }
            })
          : [];
        setEmployeeSuggestions(suggestions);
      } catch (err) {
        setEmployeeSuggestions([]);
        toast.error(`Failed to fetch employee suggestions`, {
          toastId: "employee-fetch-error",
          autoClose: 3000,
        });
      }
    };

    const fetchLaborAccounts = async () => {
      if (!projectId || !showNewForm) return;
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${projectId}`
        );
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        const accounts = Array.isArray(data.laborAccounts)
          ? data.laborAccounts.map((account) => ({ id: account }))
          : [];
        setLaborAccounts(accounts);
      } catch (err) {
        setLaborAccounts([]);
        toast.error(`Failed to fetch labor accounts`, {
          toastId: "labor-accounts-error",
          autoClose: 3000,
        });
      }
    };

    const fetchPlcOptions = async (searchTerm) => {
      if (!projectId || !showNewForm) return;
      try {
        const response = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetAllPlcs/${encodeURIComponent(searchTerm)}`
        );
        const options = Array.isArray(response.data)
          ? response.data.map((plc) => ({
              value: plc.laborCategoryCode,
              label: `${plc.laborCategoryCode} - ${plc.description}`,
            }))
          : [];
        setPlcOptions(options);
      } catch (err) {
        setPlcOptions([]);
        toast.error(`Failed to fetch PLC options for search '${searchTerm}'`, {
          toastId: "plc-fetch-error",
          autoClose: 3000,
        });
      }
    };

    if (showNewForm) {
      fetchEmployeesSuggestions();
      fetchLaborAccounts();
      if (plcSearch) {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
          fetchPlcOptions(plcSearch);
        }, 300);
      } else {
        setPlcOptions([]);
      }
    } else {
      setEmployeeSuggestions([]);
      setLaborAccounts([]);
      setPlcOptions([]);
      setPlcSearch("");
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [projectId, showNewForm, plcSearch, newEntry.idType]);

  const handlePlcInputChange = (value) => {
    setPlcSearch(value);
    setNewEntry((prev) => ({ ...prev, plcGlcCode: value }));
  };

  const handleIdChange = (value) => {
    const selectedEmployee = employeeSuggestions.find(
      (emp) => emp.emplId === value
    );
    setNewEntry((prev) => ({
      ...prev,
      id: value,
      firstName: selectedEmployee ? selectedEmployee.firstName || "" : "",
      lastName: selectedEmployee ? selectedEmployee.lastName || "" : "",
      perHourRate: selectedEmployee ? selectedEmployee.perHourRate || "" : "",
      acctId: laborAccounts.length > 0 ? laborAccounts[0].id : "",
      plcGlcCode: "",
    }));
    setPlcSearch("");
  };

  const getEmployeeRow = (emp, idx) => {
    if (!emp || !emp.emple) {
      return {
        idType: "-",
        emplId: "-",
        name: "-",
        acctId: "-",
        orgId: "-",
        glcPlc: "-",
        isRev: "-",
        isBrd: "-",
        status: "-",
        perHourRate: "0",
        total: "0",
      };
    }
    const monthHours = getMonthHours(emp);
    const totalHours = sortedDurations.reduce((sum, duration) => {
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      const inputValue = inputValues[`${idx}_${uniqueKey}`];
      const forecastValue = monthHours[uniqueKey]?.value;
      const value =
        inputValue !== undefined && inputValue !== ""
          ? inputValue
          : forecastValue;
      return sum + (value && !isNaN(value) ? Number(value) : 0);
    }, 0);
    return {
      idType:
        ID_TYPE_OPTIONS.find(
          (opt) => opt.value === (emp.emple.type || "Employee")
        )?.label ||
        emp.emple.type ||
        "Employee",
      emplId: emp.emple.emplId,
      name:
        emp.emple.idType === "Vendor"
          ? emp.emple.lastName || emp.emple.firstName || "-"
          : `${emp.emple.firstName || ""} ${emp.emple.lastName || ""}`.trim() ||
            "-",
      acctId:
        emp.emple.accId ||
        (laborAccounts.length > 0 ? laborAccounts[0].id : "-"),
      orgId: emp.emple.orgId || "-",
      glcPlc: emp.emple.plcGlcCode || "-",
      isRev: emp.emple.isRev ? (
        <span className="text-green-600 font-sm text-lg">✓</span>
      ) : (
        "-"
      ),
      isBrd: emp.emple.isBrd ? (
        <span className="text-green-600 font-sm text-lg">✓</span>
      ) : (
        "-"
      ),
      status: emp.emple.status || "Act",
      perHourRate:
        emp.emple.perHourRate !== undefined && emp.emple.perHourRate !== null
          ? Number(emp.emple.perHourRate).toFixed(2)
          : "0",
      total: totalHours.toFixed(2) || "-",
    };
  };

  const getMonthHours = (emp) => {
    const monthHours = {};
    if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
      emp.emple.plForecasts.forEach((forecast) => {
        const uniqueKey = `${forecast.month}_${forecast.year}`;
        const value =
          planType === "EAC" && forecast.actualhours !== undefined
            ? forecast.actualhours
            : forecast.forecastedhours ?? 0;
        monthHours[uniqueKey] = { value, ...forecast };
      });
    }
    return monthHours;
  };

  const handleInputChange = (empIdx, uniqueKey, newValue) => {
    if (!isEditable) return;
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: newValue,
      }));
    }
  };

  const handleEmployeeDataChange = (empIdx, field, value) => {
    if (!isEditable || !isBudPlan) return;
    setEditedEmployeeData((prev) => ({
      ...prev,
      [empIdx]: {
        ...prev[empIdx],
        [field]: value,
      },
    }));
  };

  const handleEmployeeDataBlur = async (empIdx, emp) => {
    if (!isEditable || !isBudPlan) return;
    const editedData = editedEmployeeData[empIdx] || {};
    const originalData = getEmployeeRow(emp, empIdx);
    if (
      !editedData ||
      ((editedData.acctId === undefined ||
        editedData.acctId === originalData.acctId) &&
        (editedData.orgId === undefined ||
          editedData.orgId === originalData.orgId) &&
        (editedData.glcPlc === undefined ||
          editedData.glcPlc === originalData.glcPlc) &&
        (editedData.perHourRate === undefined ||
          editedData.perHourRate === originalData.perHourRate) &&
        (editedData.isRev === undefined ||
          editedData.isRev === emp.emple.isRev) &&
        (editedData.isBrd === undefined ||
          editedData.isBrd === emp.emple.isBrd))
    ) {
      return;
    }

    const payload = {
      id: emp.emple.id || 0,
      emplId: emp.emple.emplId,
      firstName: emp.emple.firstName || "",
      lastName: emp.emple.lastName || "",
      type: emp.emple.type || "Employee",
      isRev:
        editedData.isRev !== undefined ? editedData.isRev : emp.emple.isRev,
      isBrd:
        editedData.isBrd !== undefined ? editedData.isBrd : emp.emple.isBrd,
      plcGlcCode: (editedData.glcPlc || emp.emple.plcGlcCode || "")
        .split("-")[0]
        .substring(0, 20),
      perHourRate: Number(editedData.perHourRate || emp.emple.perHourRate || 0),
      status: emp.emple.status || "Act",
      accId:
        editedData.acctId ||
        emp.emple.accId ||
        (laborAccounts.length > 0 ? laborAccounts[0].id : ""),
      orgId: editedData.orgId || emp.emple.orgId || "",
      plId: planId,
      plForecasts: emp.emple.plForecasts || [],
    };

    try {
      await axios.put(
        "https://test-api-3tmq.onrender.com/Employee/UpdateEmployee",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setEditedEmployeeData((prev) => {
        const newData = { ...prev };
        delete newData[empIdx];
        return newData;
      });
      setLocalEmployees((prev) => {
        const updated = [...prev];
        updated[empIdx] = {
          ...updated[empIdx],
          emple: {
            ...updated[empIdx].emple,
            ...payload,
          },
        };
        return updated;
      });

      toast.success("Employee updated successfully!", {
        toastId: `employee-update-${empIdx}`,
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Failed to update employee:", err);
    }
  };

  const handleForecastHoursBlur = async (empIdx, uniqueKey, value) => {
    if (!isEditable) return;
    const newValue = value === "" ? 0 : Number(value);
    const emp = localEmployees[empIdx];
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
      toast.warn("Cannot edit hours for a closed period.", {
        toastId: "closed-period-warning",
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      forecastedamt: forecast.forecastedamt ?? 0,
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
      ...(planType === "EAC"
        ? { actualhours: Number(newValue) || 0 }
        : { forecastedhours: Number(newValue) || 0 }),
      createdat: forecast.createdat ?? new Date(0).toISOString(),
      updatedat: new Date().toISOString().split("T")[0],
      displayText: forecast.displayText ?? "",
    };

    try {
      await axios.put(
        `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Employee updated successfully!", {
        toastId: `employee-update-${empIdx}`,
        autoClose: 2000,
      });
    } catch (err) {
      setInputValues((prev) => ({
        ...prev,
        [`${empIdx}_${uniqueKey}`]: String(originalForecastedHours),
      }));
      toast.error(
        "Failed to update forecast: " +
          (err.response?.data?.message || err.message),
        {
          toastId: "forecast-update-error",
          autoClose: 3000,
        }
      );
    }
  };

  // const handleFillValues = async () => {
  //   if (!showNewForm || !isEditable) return;
  //   const newHours = {};
  //   if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
  //     const sourceEmp = localEmployees[sourceRowIndex];
  //     const sourceMonthHours = getMonthHours(sourceEmp);
  //     sortedDurations.forEach((duration) => {
  //       const uniqueKey = `${duration.monthNo}_${duration.year}`;
  //       if (
  //         planType === "EAC" &&
  //         !isMonthEditable(duration, closedPeriod, planType)
  //       ) {
  //         newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
  //       } else {
  //         newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
  //       }
  //     });
  //   } else if (fillMethod === "Specify Hours") {
  //     sortedDurations.forEach((duration) => {
  //       const uniqueKey = `${duration.monthNo}_${duration.year}`;
  //       if (
  //         planType === "EAC" &&
  //         !isMonthEditable(duration, closedPeriod, planType)
  //       ) {
  //         newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
  //       } else if (isMonthEditable(duration, closedPeriod, planType)) {
  //         newHours[uniqueKey] = fillHours.toString();
  //       }
  //     });
  //   } else if (fillMethod === "Use Available Hours") {
  //     try {
  //       const response = await axios.get(
  //         `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
  //       );
  //       const availableHours = response.data.reduce((acc, d) => {
  //         const uniqueKey = `${d.monthNo}_${d.year}`;
  //         acc[uniqueKey] = d.workingHours || 0;
  //         return acc;
  //       }, {});
  //       sortedDurations.forEach((duration) => {
  //         const uniqueKey = `${duration.monthNo}_${duration.year}`;
  //         if (
  //           planType === "EAC" &&
  //           !isMonthEditable(duration, closedPeriod, planType)
  //         ) {
  //           newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
  //         } else if (isMonthEditable(duration, closedPeriod, planType)) {
  //           newHours[uniqueKey] = availableHours[uniqueKey] || "0";
  //         }
  //       });
  //     } catch (err) {
  //       toast.error("Failed to fetch available hours.", {
  //         toastId: "available-hours-error",
  //         autoClose: 3000,
  //       });
  //       return;
  //     }
  //   } else if (
  //     fillMethod === "Use Start Period Hours" &&
  //     sortedDurations.length > 0
  //   ) {
  //     const firstDuration = sortedDurations[0];
  //     const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
  //     const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
  //     sortedDurations.forEach((duration) => {
  //       const uniqueKey = `${duration.monthNo}_${duration.year}`;
  //       if (
  //         planType === "EAC" &&
  //         !isMonthEditable(duration, closedPeriod, planType)
  //       ) {
  //         newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
  //       } else if (isMonthEditable(duration, closedPeriod, planType)) {
  //         newHours[uniqueKey] = firstValue;
  //       }
  //     });
  //   }

  //   setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
  //   setShowFillValues(false);
  //   setFillMethod("None");
  //   setFillHours(0.0);
  //   setSourceRowIndex(null);
  // };
  
  const handleFillValues = async () => {
  if (!showNewForm || !isEditable) return;

  // Validate date range - simple string to Date
  if (new Date(fillEndDate) < new Date(fillStartDate)) {
    toast.error("End Period cannot be before Start Period.");
    return;
  }

  const startDateObj = new Date(fillStartDate);
  const endDateObj = new Date(fillEndDate);

  const newHours = {};

  const isDurationInRange = (duration) => {
    const durationValue = duration.year * 100 + duration.monthNo;

    const startYear = startDateObj.getFullYear();
    const startMonth = startDateObj.getMonth() + 1;
    const startValue = startYear * 100 + startMonth;

    const endYear = endDateObj.getFullYear();
    const endMonth = endDateObj.getMonth() + 1;
    const endValue = endYear * 100 + endMonth;

    return durationValue >= startValue && durationValue <= endValue;
  };

  if (fillMethod === "Copy From Source Record" && sourceRowIndex !== null) {
    const sourceEmp = localEmployees[sourceRowIndex];
    const sourceMonthHours = getMonthHours(sourceEmp);
    sortedDurations.forEach((duration) => {
      if (!isDurationInRange(duration)) return;
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
        newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
      } else {
        newHours[uniqueKey] = sourceMonthHours[uniqueKey]?.value || "0";
      }
    });
  } else if (fillMethod === "Specify Hours") {
    sortedDurations.forEach((duration) => {
      if (!isDurationInRange(duration)) return;
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
        newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
      } else if (isMonthEditable(duration, closedPeriod, planType)) {
        newHours[uniqueKey] = fillHours.toString();
      }
    });
  } else if (fillMethod === "Use Available Hours") {
    try {
      // Important: API still uses startDate and endDate variables - keep them as is
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Orgnization/GetWorkingDaysForDuration/${startDate}/${endDate}`
      );

      const availableHours = response.data.reduce((acc, d) => {
        const uniqueKey = `${d.monthNo}_${d.year}`;
        acc[uniqueKey] = d.workingHours || 0;
        return acc;
      }, {});
      sortedDurations.forEach((duration) => {
        if (!isDurationInRange(duration)) return;
        const uniqueKey = `${duration.monthNo}_${duration.year}`;
        if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
          newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
        } else if (isMonthEditable(duration, closedPeriod, planType)) {
          newHours[uniqueKey] = availableHours[uniqueKey] || "0";
        }
      });
    } catch (err) {
      toast.error("Failed to fetch available hours.", {
        toastId: "available-hours-error",
        autoClose: 3000,
      });
      return;
    }
  } else if (fillMethod === "Use Start Period Hours" && sortedDurations.length > 0) {
    const firstDuration = sortedDurations[0];
    if (!isDurationInRange(firstDuration)) {
      toast.error("Start Period hours are outside the selected duration range.");
      return;
    }
    const firstUniqueKey = `${firstDuration.monthNo}_${firstDuration.year}`;
    const firstValue = newEntryPeriodHours[firstUniqueKey] || "0";
    sortedDurations.forEach((duration) => {
      if (!isDurationInRange(duration)) return;
      const uniqueKey = `${duration.monthNo}_${duration.year}`;
      if (planType === "EAC" && !isMonthEditable(duration, closedPeriod, planType)) {
        newHours[uniqueKey] = newEntryPeriodHours[uniqueKey] || "0";
      } else if (isMonthEditable(duration, closedPeriod, planType)) {
        newHours[uniqueKey] = firstValue;
      }
    });
  }

  setNewEntryPeriodHours((prev) => ({ ...prev, ...newHours }));
  setShowFillValues(false);
  setFillMethod("None");
  setFillHours(0.0);
  setSourceRowIndex(null);
};


  const handleSaveNewEntry = async () => {
    if (!planId) {
      toast.error("Plan ID is required to save a new entry.", {
        toastId: "no-plan-id",
        autoClose: 3000,
      });
      return;
    }
    setIsDurationLoading(true);

    const payloadForecasts = sortedDurations.map((duration) => ({
      forecastedhours:
        Number(newEntryPeriodHours[`${duration.monthNo}_${duration.year}`]) ||
        0,
      projId: projectId,
      plId: planId,
      emplId: newEntry.id,
      month: duration.monthNo,
      year: duration.year,
      acctId: newEntry.acctId,
      orgId: newEntry.orgId,
      plc: newEntry.plcGlcCode || "",
      hrlyRate: Number(newEntry.perHourRate) || 0,
      // effectDt: new Date().toISOString(),
      effectDt: null,
      plEmployee: null,
    }));

    const payload = {
      id: 0,
      emplId: newEntry.id,
      firstName: newEntry.firstName,
      lastName: newEntry.lastName,
      type: newEntry.idType,
      isRev: newEntry.isRev,
      isBrd: newEntry.isBrd,
      plcGlcCode: (newEntry.plcGlcCode || "").substring(0, 20),
      perHourRate: Number(newEntry.perHourRate) || 0,
      status: newEntry.status || "Act",
      accId: newEntry.acctId,
      orgId: newEntry.orgId || "",
      plId: planId,
      plForecasts: payloadForecasts,
    };

    try {
      await axios.post(
        "https://test-api-3tmq.onrender.com/Employee/AddNewEmployee",
        payload
      );

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
      setNewEntryPeriodHours({});
      setEmployeeSuggestions([]);
      setLaborAccounts([]);
      setPlcOptions([]);
      setPlcSearch("");

      if (onSaveSuccess) {
        onSaveSuccess();
      }
      // Re-fetch to update UI with new entry
      fetchEmployees();
    } catch (err) {
      setSuccessMessageText("Failed to save entry.");
      setShowSuccessMessage(true);
      toast.error(
        "Failed to save new entry: " +
          (err.response?.data?.message ||
            JSON.stringify(err.response?.data?.errors) ||
            err.message),
        {
          toastId: "save-entry-error",
          autoClose: 5000,
        }
      );
    } finally {
      setIsDurationLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

//   const handleFindReplace = async () => {
//     if (
//       !isEditable ||
//       findValue === "" ||
//       (replaceScope === "row" && selectedRowIndex === null) ||
//       (replaceScope === "column" && selectedColumnKey === null)
//     ) {
//       toast.warn("Please select a valid scope and enter a value to find.", {
//         toastId: "find-replace-warning",
//         autoClose: 3000,
//       });
//       return;
//     }

//     // Show loading state
//     setIsLoading(true);

//     const updates = [];
//     const updatedInputValues = { ...inputValues };
//     let replacementsCount = 0;
//     let skippedCount = 0;

//     for (const empIdx in localEmployees) {
//       const emp = localEmployees[empIdx];
//       const actualEmpIdx = parseInt(empIdx, 10);

//       if (replaceScope === "row" && actualEmpIdx !== selectedRowIndex) {
//         continue;
//       }

//       for (const duration of sortedDurations) {
//         const uniqueKey = `${duration.monthNo}_${duration.year}`;

//         if (replaceScope === "column" && uniqueKey !== selectedColumnKey) {
//           continue;
//         }

//         if (!isMonthEditable(duration, closedPeriod, planType)) {
//           continue;
//         }

//         const currentInputKey = `${actualEmpIdx}_${uniqueKey}`;
        
//         // Get the actual displayed value
//         let displayedValue;
//         if (inputValues[currentInputKey] !== undefined) {
//           displayedValue = String(inputValues[currentInputKey]);
//         } else {
//           const monthHours = getMonthHours(emp);
//           const forecast = monthHours[uniqueKey];
//           if (forecast && forecast.value !== undefined) {
//             displayedValue = String(forecast.value);
//           } else {
//             displayedValue = "0";
//           }
//         }

//         const findValueTrimmed = findValue.trim();
//         const displayedValueTrimmed = displayedValue.trim();
        
//         // Matching logic
//         let isMatch = false;
        
//         // if (findValueTrimmed === "0") {
//         //   const numValue = parseFloat(displayedValueTrimmed);
//         //   isMatch = displayedValueTrimmed === "" || 
//         //            displayedValueTrimmed === "0" || 
//         //            (!isNaN(numValue) && numValue === 0);
//         // } else {
//         //   isMatch = displayedValueTrimmed === findValueTrimmed;
          
//         //   if (!isMatch) {
//         //     const findNum = parseFloat(findValueTrimmed);
//         //     const displayNum = parseFloat(displayedValueTrimmed);
//         //     if (!isNaN(findNum) && !isNaN(displayNum)) {
//         //       isMatch = findNum === displayNum;
//         //     }
//         //   }
//         // }

//         // Helper
// function isZeroLike(val) {
//   if (typeof val === "number") return val === 0;
//   if (typeof val === "string") {
//     return (
//       val.trim() === "" ||
//       val.trim() === "0" ||
//       val.trim() === "0.0" ||
//       val.trim() === "0.00" ||
//       (!isNaN(Number(val)) && Number(val) === 0)
//     );
//   }
//   return false;
// }

// if (!isNaN(Number(findValueTrimmed)) && Number(findValueTrimmed) === 0) {
//   isMatch = isZeroLike(displayedValueTrimmed);
// } else {
//   isMatch = displayedValueTrimmed === findValueTrimmed;
//   if (!isMatch) {
//     const findNum = parseFloat(findValueTrimmed);
//     const displayNum = parseFloat(displayedValueTrimmed);
//     if (!isNaN(findNum) && !isNaN(displayNum)) {
//       isMatch = findNum === displayNum;
//     }
//   }
// }


//         if (isMatch) {
//           const newValue = replaceValue.trim();
//           const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

//           const forecast = getMonthHours(emp)[uniqueKey];
          
//           // Only proceed if we have a valid forecast with forecastid
//           if (forecast && forecast.forecastid) {
//             const originalValue = planType === "EAC" ? 
//               (forecast.actualhours ?? 0) : 
//               (forecast.forecastedhours ?? 0);

//             if (newNumericValue !== originalValue) {
//               updatedInputValues[currentInputKey] = newValue;
//               replacementsCount++;

//               const payload = {
//                 forecastedamt: forecast.forecastedamt ?? 0,
//                 forecastid: Number(forecast.forecastid),
//                 projId: forecast.projId,
//                 plId: forecast.plId,
//                 emplId: forecast.emplId,
//                 dctId: forecast.dctId ?? 0,
//                 month: forecast.month,
//                 year: forecast.year,
//                 totalBurdenCost: forecast.totalBurdenCost ?? 0,
//                 burden: forecast.burden ?? 0,
//                 ccffRevenue: forecast.ccffRevenue ?? 0,
//                 tnmRevenue: forecast.tnmRevenue ?? 0,
//                 cost: forecast.cost ?? 0,
//                 fringe: forecast.fringe ?? 0,
//                 overhead: forecast.overhead ?? 0,
//                 gna: forecast.gna ?? 0,
//                 [planType === "EAC" ? "actualhours" : "forecastedhours"]: newNumericValue,
//                 updatedat: new Date().toISOString().split("T")[0],
//                 displayText: forecast.displayText ?? "",
//               };
              
//               updates.push(
//                 axios
//                   .put(
//                     `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
//                     payload,
//                     { headers: { "Content-Type": "application/json" } }
//                   )
//                   .catch((err) => {
//                     console.error(
//                       "Failed update for payload:",
//                       payload,
//                       err?.response?.data || err.message
//                     );
//                   })
//               );
//             }
//           } else {
//             // Skip cells without existing forecasts and count them
//             console.log(`Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`);
//             skippedCount++;
//           }
//         }
//       }
//     }

//     console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

//     setInputValues(updatedInputValues);
//     try {
//       if (updates.length > 0) {
//         await Promise.all(updates);
//       }
      
//       // Update local state only for cells that were actually updated
//       setLocalEmployees((prev) => {
//         const updated = [...prev];
//         for (const empIdx in updated) {
//           const emp = updated[empIdx];
//           for (const duration of sortedDurations) {
//             const uniqueKey = `${duration.monthNo}_${duration.year}`;
//             const currentInputKey = `${empIdx}_${uniqueKey}`;
//             if (updatedInputValues[currentInputKey] !== undefined) {
//               if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
//                 const forecast = emp.emple.plForecasts.find(
//                   (f) => f.month === duration.monthNo && f.year === duration.year
//                 );
//                 if (forecast) {
//                   const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
//                   if (planType === "EAC") {
//                     forecast.actualhours = newValue;
//                   } else {
//                     forecast.forecastedhours = newValue;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         return updated;
//       });
      
//       if (replacementsCount > 0) {
//         toast.success(`Successfully replaced ${replacementsCount} cells.`, {
//           autoClose: 2000,
//         });
//       }
      
//       // if (skippedCount > 0) {
//       //   toast.warn(`Skipped ${skippedCount} cells - forecast records must be created first before they can be edited.`, {
//       //     autoClose: 4000,
//       //   });
//       // }
      
//       if (replacementsCount === 0 && skippedCount === 0) {
//         toast.info("No cells replaced.", { autoClose: 2000 });
//       }
      
//     } catch (err) {
//       toast.error(
//         "Failed to replace values: " + (err.response?.data?.message || err.message),
//         {
//           toastId: "replace-error",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       // Hide loading state
//       setIsLoading(false);
//       setShowFindReplace(false);
//       setFindValue("");
//       setReplaceValue("");
//       setSelectedRowIndex(null);
//       setSelectedColumnKey(null);
//       setReplaceScope("all");
//     }
//   };

const handleFindReplace = async () => {
  if (
    !isEditable ||
    findValue === "" ||
    (replaceScope === "row" && selectedRowIndex === null) ||
    (replaceScope === "column" && selectedColumnKey === null)
  ) {
    toast.warn("Please select a valid scope and enter a value to find.", {
      toastId: "find-replace-warning",
      autoClose: 3000,
    });
    return;
  }

  // Show loading state
  setIsLoading(true);

  const updates = [];
  const updatedInputValues = { ...inputValues };
  let replacementsCount = 0;
  let skippedCount = 0;

  for (const empIdx in localEmployees) {
    const emp = localEmployees[empIdx];
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
      
      // Get the actual displayed value
      let displayedValue;
      if (inputValues[currentInputKey] !== undefined) {
        displayedValue = String(inputValues[currentInputKey]);
      } else {
        const monthHours = getMonthHours(emp);
        const forecast = monthHours[uniqueKey];
        if (forecast && forecast.value !== undefined) {
          displayedValue = String(forecast.value);
        } else {
          displayedValue = "0";
        }
      }

      const findValueTrimmed = findValue.trim();
      const displayedValueTrimmed = displayedValue.trim();
      
      // Matching logic
      let isMatch = false;
      
      // Helper
     function isZeroLike(val) {
  // Accept undefined and null as zero-like too
  if (val === undefined || val === null) return true;
  
  if (typeof val === "number") return val === 0;
  
  if (typeof val === "string") {
    const trimmed = val.trim();
    return (
      trimmed === "" ||
      trimmed === "0" ||
      trimmed === "0.0" ||
      trimmed === "0.00" ||
      (!isNaN(Number(trimmed)) && Number(trimmed) === 0)
    );
  }
  return false;
}


      if (!isNaN(Number(findValueTrimmed)) && Number(findValueTrimmed) === 0) {
  // If searching for 0, match if displayedValue is zero-like
  isMatch = isZeroLike(displayedValueTrimmed);
} else {
  // Normal match: exact string or numeric equality
  isMatch = displayedValueTrimmed === findValueTrimmed;
  if (!isMatch) {
    const findNum = parseFloat(findValueTrimmed);
    const displayNum = parseFloat(displayedValueTrimmed);
    if (!isNaN(findNum) && !isNaN(displayNum)) {
      isMatch = findNum === displayNum;
    }
  }
}

      if (isMatch) {
        const newValue = replaceValue.trim();
        const newNumericValue = newValue === "" ? 0 : (parseFloat(newValue) || 0);

        const forecast = getMonthHours(emp)[uniqueKey];
        
        // Only proceed if we have a valid forecast with forecastid
        if (forecast && forecast.forecastid) {
          // Don't check against API value; check if a change is required for what's currently displayed
          if (displayedValueTrimmed !== newValue) {
            updatedInputValues[currentInputKey] = newValue;
            replacementsCount++;

            const payload = {
              forecastedamt: forecast.forecastedamt ?? 0,
              forecastid: Number(forecast.forecastid),
              projId: forecast.projId,
              plId: forecast.plId,
              emplId: forecast.emplId,
              dctId: forecast.dctId ?? 0,
              month: forecast.month,
              year: forecast.year,
              totalBurdenCost: forecast.totalBurdenCost ?? 0,
              burden: forecast.burden ?? 0,
              ccffRevenue: forecast.ccffRevenue ?? 0,
              tnmRevenue: forecast.tnmRevenue ?? 0,
              cost: forecast.cost ?? 0,
              fringe: forecast.fringe ?? 0,
              overhead: forecast.overhead ?? 0,
              gna: forecast.gna ?? 0,
              [planType === "EAC" ? "actualhours" : "forecastedhours"]: newNumericValue,
              updatedat: new Date().toISOString().split("T")[0],
              displayText: forecast.displayText ?? "",
            };
            
            updates.push(
              axios
                .put(
                  `https://test-api-3tmq.onrender.com/Forecast/UpdateForecastHours/${planType}`,
                  payload,
                  { headers: { "Content-Type": "application/json" } }
                )
                .catch((err) => {
                  console.error(
                    "Failed update for payload:",
                    payload,
                    err?.response?.data || err.message
                  );
                })
            );
          }
        } else {
          // Skip cells without existing forecasts and count them
          console.log(`Skipping cell without forecast: employee ${emp.emple?.emplId} for ${duration.monthNo}/${duration.year}`);
          skippedCount++;
        }
      }
    }
  }

  console.log(`Total replacements to make: ${replacementsCount}, Skipped: ${skippedCount}`);

  setInputValues(updatedInputValues);
  try {
    if (updates.length > 0) {
      await Promise.all(updates);
    }
    
    // Update local state only for cells that were actually updated
    setLocalEmployees((prev) => {
      const updated = [...prev];
      for (const empIdx in updated) {
        const emp = updated[empIdx];
        for (const duration of sortedDurations) {
          const uniqueKey = `${duration.monthNo}_${duration.year}`;
          const currentInputKey = `${empIdx}_${uniqueKey}`;
          if (updatedInputValues[currentInputKey] !== undefined) {
            if (emp.emple && Array.isArray(emp.emple.plForecasts)) {
              const forecast = emp.emple.plForecasts.find(
                (f) => f.month === duration.monthNo && f.year === duration.year
              );
              if (forecast) {
                const newValue = parseFloat(updatedInputValues[currentInputKey]) || 0;
                if (planType === "EAC") {
                  forecast.actualhours = newValue;
                } else {
                  forecast.forecastedhours = newValue;
                }
              }
            }
          }
        }
      }
      return updated;
    });
    
    if (replacementsCount > 0) {
      toast.success(`Successfully replaced ${replacementsCount} cells.`, {
        autoClose: 2000,
      });
    }
    
    // if (skippedCount > 0) {
    //   toast.warn(`Skipped ${skippedCount} cells - forecast records must be created first before they can be edited.`, {
    //     autoClose: 4000,
    //   });
    // }
    
    if (replacementsCount === 0 && skippedCount === 0) {
      toast.info("No cells replaced.", { autoClose: 2000 });
    }
    
  } catch (err) {
    toast.error(
      "Failed to replace values: " + (err.response?.data?.message || err.message),
      {
        toastId: "replace-error",
        autoClose: 3000,
      }
    );
  } finally {
    // Hide loading state
    setIsLoading(false);
    setShowFindReplace(false);
    setFindValue("");
    setReplaceValue("");
    setSelectedRowIndex(null);
    setSelectedColumnKey(null);
    setReplaceScope("all");
  }
};

 

const handleRowClick = (actualEmpIdx) => {
    if (!isEditable) return;
    setSelectedRowIndex(
      actualEmpIdx === selectedRowIndex ? null : actualEmpIdx
    );
    setSelectedColumnKey(null);
    setReplaceScope(actualEmpIdx === selectedRowIndex ? "all" : "row");
    if (showNewForm) setSourceRowIndex(actualEmpIdx);
  };

  const handleColumnHeaderClick = (uniqueKey) => {
    if (!isEditable) return;
    setSelectedColumnKey(uniqueKey === selectedColumnKey ? null : uniqueKey);
    setSelectedRowIndex(null);
    setReplaceScope(uniqueKey === selectedColumnKey ? "all" : "column");
  };

  const hasHiddenRows = Object.values(hiddenRows).some(Boolean);
  const showHiddenRows = () => setHiddenRows({});

  const sortedDurations = [...durations]
    .filter((d) => fiscalYear === "All" || d.year === parseInt(fiscalYear))
    .sort(
      (a, b) =>
        new Date(a.year, a.monthNo - 1, 1) - new Date(b.year, b.monthNo - 1, 1)
    );

  if (isLoading || isDurationLoading) {
    return (
      <div className="p-4 font-inter flex justify-center items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-xs text-gray-600">
          Loading forecast data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 font-inter">
        <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded">
          <strong className="font-bold text-xs">Error: </strong>
          <span className="block sm:inline text-xs">{error}</span>
        </div>
      </div>
    );
  }

  const rowCount = Math.max(
    localEmployees.filter((_, idx) => !hiddenRows[idx]).length +
      (showNewForm ? 1 : 0),
    2
  );

  return (
    <div className="relative p-4 font-inter w-full synchronized-tables-outer">
      {showSuccessMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
            successMessageText.includes("successfully") ||
            successMessageText.includes("Replaced")
              ? "bg-green-500"
              : "bg-red-500"
          } text-white text-xs`}
        >
          {successMessageText}
        </div>
      )}

      <div className="w-full flex justify-between mb-4 gap-2">
        <div className="flex-grow"></div>
        <div className="flex gap-2 ">
          {hasHiddenRows && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
              onClick={showHiddenRows}
            >
              Show Hidden Rows
            </button>
          )}
          {isEditable && (
            <>
              <button
                onClick={() => setShowNewForm((prev) => !prev)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
              >
                {showNewForm ? "Cancel" : "New"}
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
                onClick={() => isEditable && setShowFindReplace(true)}
              >
                Find / Replace
              </button>
              {showNewForm && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium"
                  onClick={() => isEditable && setShowFillValues(true)}
                >
                  Fill Values
                </button>
              )}
            </>
          )}
          {showNewForm && (
            <button
              onClick={handleSaveNewEntry}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-medium"
            >
              Save Entry
            </button>
          )}
        </div>
      </div>

      

             {showFillValues && (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
             <h3 className="text-lg font-semibold mb-4">
               Fill Values to selected record/s
             </h3>
             <div className="mb-4">
               <label className="block text-gray-700 text-xs font-medium mb-1">
                 Select Fill Method
               </label>
               <select
                value={fillMethod}
                onChange={(e) => setFillMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
              >
                <option value="None">None</option>
                <option value="Copy From Source Record">
                  Copy from source record
                </option>
                <option value="Specify Hours">Specify Hours</option>
                <option value="Use Available Hours">Use Available Hours</option>
                 <option value="Use Start Period Hours">
                   Use Start Period Hours
                </option>
              </select>
            </div>
            {fillMethod === "Specify Hours" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-xs font-medium mb-1">
                  Hours
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={fillHours}
                  onChange={(e) =>
                    setFillHours(parseFloat(e.target.value) || 0)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                       (e.target.value === "0" || e.target.value === "")
                     ) {
                       e.preventDefault();
                       setFillHours("");
                     }
                   }}
                   className="w-full border border-gray-300 rounded-md p-2 text-xs"
                   placeholder="0.00"
                 />
               </div>
             )}
             <div className="mb-4">
               <label className="block text-gray-700 text-xs font-medium mb-1">
                Start Period
              </label>
              {/* <input
                type="text"
                value={startDate}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
              /> */}
              <input
                type="date"
                value={fillStartDate}
                onChange={(e) => setFillStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                End Period
              </label>
              {/* <input
                type="text"
                value={endDate}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 text-xs bg-gray-100 cursor-not-allowed"
              /> */}
              <input
                type="date"
                value={fillEndDate}
                onChange={(e) => setFillEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-xs"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowFillValues(false);
                  setFillMethod("None");
                  setFillHours(0.0);
                  setSourceRowIndex(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-xs"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleFillValues}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
              >
                Fill
              </button>
            </div>
          </div>
         </div>
       )}


      {localEmployees.length === 0 &&
      !showNewForm &&
      sortedDurations.length > 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-xs">
          No forecast data available for this plan.
        </div>
      ) : (
        // <div className="synchronized-tables-container flex">
        //   <div className="synchronized-table-scroll first ">
        //     <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
        //       <thead className="sticky-thead">
        //         <tr
        //           style={{
        //             height: `${ROW_HEIGHT_DEFAULT}px`,
        //             lineHeight: "normal",
        //           }}
        //         >
        //           {EMPLOYEE_COLUMNS.map((col) => (
        //             <th
        //               key={col.key}
        //               className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Reduced padding and min-width
        //             >
        //               {col.label}
        //             </th>
        //           ))}
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {showNewForm && (
        //           <tr
        //             key="new-entry"
        //             className="bg-gray-50"
        //             style={{
        //               height: `${ROW_HEIGHT_DEFAULT}px`,
        //               lineHeight: "normal",
        //             }}
        //           >
        //             {console.log("Rendering new entry form with:", {
        //               employeeSuggestions,
        //               laborAccounts,
        //               plcOptions,
        //               plcSearch,
        //             })}
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <select
        //                 name="idType"
        //                 value={newEntry.idType || ""}
        //                 onChange={(e) =>
        //                   setNewEntry({ ...newEntry, idType: e.target.value })
        //                 }
        //                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //               >
        //                 {ID_TYPE_OPTIONS.map((opt) => (
        //                   <option key={opt.value} value={opt.value}>
        //                     {opt.label}
        //                   </option>
        //                 ))}
        //               </select>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="id"
        //                 value={newEntry.id}
        //                 onChange={(e) => handleIdChange(e.target.value)}
        //                 className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
        //                 list="employee-id-list"
        //                 placeholder="Enter ID"
        //               />
        //               <datalist id="employee-id-list">
        //                 {employeeSuggestions
        //                   .filter(
        //                     (emp) =>
        //                       emp.emplId && typeof emp.emplId === "string"
        //                   )
        //                   .map((emp, index) => (
        //                     <option
        //                       key={`${emp.emplId}-${index}`}
        //                       value={emp.emplId}
        //                     >
        //                       {emp.lastName && emp.firstName
        //                         ? `${emp.lastName}, ${emp.firstName}`
        //                         : emp.lastName || emp.firstName || emp.emplId}
        //                     </option>
        //                   ))}
        //               </datalist>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="name"
        //                 value={
        //                   newEntry.idType === "Vendor"
        //                     ? newEntry.lastName || newEntry.firstName || ""
        //                     : newEntry.lastName && newEntry.firstName
        //                     ? `${newEntry.lastName}, ${newEntry.firstName}`
        //                     : newEntry.lastName || newEntry.firstName || ""
        //                 }
        //                 readOnly
        //                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
        //                 placeholder="Name (auto-filled)"
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="acctId"
        //                 value={newEntry.acctId}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, acctId: e.target.value })
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 list="account-list"
        //                 placeholder="Enter Account"
        //                 disabled={!isBudPlan}
        //               />
        //               <datalist id="account-list">
        //                 {laborAccounts.map((account, index) => (
        //                   <option
        //                     key={`${account.id}-${index}`}
        //                     value={account.id}
        //                   >
        //                     {account.id}
        //                   </option>
        //                 ))}
        //               </datalist>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="orgId"
        //                 value={newEntry.orgId}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, orgId: e.target.value })
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 placeholder="Enter Organization"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="plcGlcCode"
        //                 value={newEntry.plcGlcCode}
        //                 onChange={(e) =>
        //                   isBudPlan && handlePlcInputChange(e.target.value)
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 list="plc-list"
        //                 placeholder="Enter Plc"
        //                 disabled={!isBudPlan}
        //               />
        //               <datalist id="plc-list">
        //                 {plcOptions.map((plc, index) => (
        //                   <option
        //                     key={`${plc.value}-${index}`}
        //                     value={plc.value}
        //                   >
        //                     {plc.label}
        //                   </option>
        //                 ))}
        //               </datalist>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5 text-center">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="checkbox"
        //                 name="isRev"
        //                 checked={newEntry.isRev}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, isRev: e.target.checked })
        //                 }
        //                 className="w-4 h-4"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5 text-center">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="checkbox"
        //                 name="isBrd"
        //                 checked={newEntry.isBrd}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, isBrd: e.target.checked })
        //                 }
        //                 className="w-4 h-4"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="status"
        //                 value={newEntry.status}
        //                 onChange={(e) =>
        //                   setNewEntry({ ...newEntry, status: e.target.value })
        //                 }
        //                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                 placeholder="Enter Status"
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="perHourRate"
        //                 value={newEntry.perHourRate}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({
        //                     ...newEntry,
        //                     perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
        //                   })
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 placeholder="Enter Hour Rate"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               {Object.values(newEntryPeriodHours)
        //                 .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
        //                 .toFixed(2)}
        //             </td>
        //           </tr>
        //         )}
        //         {localEmployees
        //           .filter((_, idx) => !hiddenRows[idx])
        //           .map((emp, idx) => {
        //             const actualEmpIdx = localEmployees.findIndex(
        //               (e) => e === emp
        //             );
        //             const row = getEmployeeRow(emp, actualEmpIdx);
        //             const editedData = editedEmployeeData[actualEmpIdx] || {};
        //             return (
        //               <tr
        //                 key={`employee-${actualEmpIdx}`}
        //                 className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
        //                   selectedRowIndex === actualEmpIdx
        //                     ? "bg-yellow-100"
        //                     : "even:bg-gray-50"
        //                 }`}
        //                 style={{
        //                   height: `${ROW_HEIGHT_DEFAULT}px`,
        //                   lineHeight: "normal",
        //                   cursor: isEditable ? "pointer" : "default",
        //                 }}
        //                 onClick={() => handleRowClick(actualEmpIdx)}
        //               >
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.idType}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.emplId}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.name}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.acctId !== undefined
        //                           ? editedData.acctId
        //                           : row.acctId
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "acctId",
        //                           e.target.value
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                       list="account-list"
        //                     />
        //                   ) : (
        //                     row.acctId
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.orgId !== undefined
        //                           ? editedData.orgId
        //                           : row.orgId
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "orgId",
        //                           e.target.value
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                     />
        //                   ) : (
        //                     row.orgId
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.glcPlc !== undefined
        //                           ? editedData.glcPlc
        //                           : row.glcPlc
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "glcPlc",
        //                           e.target.value
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                       list="plc-list"
        //                     />
        //                   ) : (
        //                     row.glcPlc
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="checkbox"
        //                       checked={
        //                         editedData.isRev !== undefined
        //                           ? editedData.isRev
        //                           : emp.emple.isRev
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "isRev",
        //                           e.target.checked
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-4 h-4"
        //                     />
        //                   ) : (
        //                     row.isRev
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="checkbox"
        //                       checked={
        //                         editedData.isBrd !== undefined
        //                           ? editedData.isBrd
        //                           : emp.emple.isBrd
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "isBrd",
        //                           e.target.checked
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-4 h-4"
        //                     />
        //                   ) : (
        //                     row.isBrd
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.status}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.perHourRate !== undefined
        //                           ? editedData.perHourRate
        //                           : row.perHourRate
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "perHourRate",
        //                           e.target.value.replace(/[^0-9.]/g, "")
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                     />
        //                   ) : (
        //                     row.perHourRate
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.total}
        //                 </td>
        //               </tr>
        //             );
        //           })}
        //       </tbody>
        //     </table>
        //   </div>


        //   <div className="synchronized-table-scroll last">
        //     <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
        //       <thead className="sticky-thead">
        //         <tr
        //           style={{
        //             height: `${ROW_HEIGHT_DEFAULT}px`,
        //             lineHeight: "normal",
        //           }}
        //         >
        //           {sortedDurations.map((duration) => {
        //             const uniqueKey = `${duration.monthNo}_${duration.year}`;
        //             return (
        //               <th
        //                 key={uniqueKey}
        //                 className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
        //                   selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
        //                 }`}
        //                 style={{ cursor: isEditable ? "pointer" : "default" }}
        //                 onClick={() => handleColumnHeaderClick(uniqueKey)}
        //               >
        //                 <div className="flex flex-col items-center justify-center h-full">
        //                   <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
        //                     {duration.month}
        //                   </span>
        //                   <span className="text-xs text-gray-600 font-normal">
        //                     {duration.workingHours || 0} hrs
        //                   </span>
        //                 </div>
        //               </th>
        //             );
        //           })}
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {showNewForm && (
        //           <tr
        //             key="new-entry"
        //             className="bg-gray-50"
        //             style={{
        //               height: `${ROW_HEIGHT_DEFAULT}px`,
        //               lineHeight: "normal",
        //             }}
        //           >
        //             {sortedDurations.map((duration) => {
        //               const uniqueKey = `${duration.monthNo}_${duration.year}`;
        //               const isInputEditable =
        //                 isEditable &&
        //                 isMonthEditable(duration, closedPeriod, planType);
        //               return (
        //                 <td
        //                   key={`new-${uniqueKey}`}
        //                   className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
        //                     planType === "EAC"
        //                       ? isInputEditable
        //                         ? "bg-green-50"
        //                         : "bg-gray-200"
        //                       : ""
        //                   }`}
        //                 >
        //                   <input
        //                     type="text"
        //                     inputMode="numeric"
        //                     value={newEntryPeriodHours[uniqueKey] || ""}
        //                     onChange={(e) =>
        //                       isInputEditable &&
        //                       setNewEntryPeriodHours((prev) => ({
        //                         ...prev,
        //                         [uniqueKey]: e.target.value.replace(
        //                           /[^0-9.]/g,
        //                           ""
        //                         ),
        //                       }))
        //                     }
        //                     className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
        //                       !isInputEditable
        //                         ? "cursor-not-allowed text-gray-400"
        //                         : "text-gray-700"
        //                     }`}
        //                     disabled={!isInputEditable}
        //                     placeholder="Enter Hours"
        //                   />
        //                 </td>
        //               );
        //             })}
        //           </tr>
        //         )}
        //         {localEmployees
        //           .filter((_, idx) => !hiddenRows[idx])
        //           .map((emp, idx) => {
        //             const actualEmpIdx = localEmployees.findIndex(
        //               (e) => e === emp
        //             );
        //             const monthHours = getMonthHours(emp);
        //             return (
        //               <tr
        //                 key={`hours-${actualEmpIdx}`}
        //                 className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
        //                   selectedRowIndex === actualEmpIdx
        //                     ? "bg-yellow-100"
        //                     : "even:bg-gray-50"
        //                 }`}
        //                 style={{
        //                   height: `${ROW_HEIGHT_DEFAULT}px`,
        //                   lineHeight: "normal",
        //                   cursor: isEditable ? "pointer" : "default",
        //                 }}
        //                 onClick={() => handleRowClick(actualEmpIdx)}
        //               >
        //                 {sortedDurations.map((duration) => {
        //                   const uniqueKey = `${duration.monthNo}_${duration.year}`;
        //                   const forecast = monthHours[uniqueKey];
        //                   const value =
        //                     inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
        //                     (forecast?.value !== undefined
        //                       ? forecast.value
        //                       : "0");
        //                   const isInputEditable =
        //                     isEditable &&
        //                     isMonthEditable(duration, closedPeriod, planType);
        //                   return (
        //                     <td
        //                       key={`hours-${actualEmpIdx}-${uniqueKey}`}
        //                       className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
        //                         selectedColumnKey === uniqueKey
        //                           ? "bg-yellow-100"
        //                           : ""
        //                       } ${
        //                         planType === "EAC"
        //                           ? isInputEditable
        //                             ? "bg-green-50"
        //                             : "bg-gray-200"
        //                           : ""
        //                       }`}
        //                     >
        //                       <input
        //                         type="text"
        //                         inputMode="numeric"
        //                         className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
        //                           !isInputEditable
        //                             ? "cursor-not-allowed text-gray-400"
        //                             : "text-gray-700"
        //                         }`}
        //                         value={value}
        //                         onChange={(e) =>
        //                           handleInputChange(
        //                             actualEmpIdx,
        //                             uniqueKey,
        //                             e.target.value.replace(/[^0-9.]/g, "")
        //                           )
        //                         }
        //                         onBlur={(e) =>
        //                           handleForecastHoursBlur(
        //                             actualEmpIdx,
        //                             uniqueKey,
        //                             e.target.value
        //                           )
        //                         }
        //                         disabled={!isInputEditable}
        //                         placeholder="Enter Hours"
        //                       />
        //                     </td>
        //                   );
        //                 })}
        //               </tr>
        //             );
        //           })}
        //       </tbody>
        //     </table>
        //   </div>
        // </div>

         <div className="synchronized-tables-container ">
          <div className="vertical-scroll-wrapper flex"
    style={{ maxHeight: '400px', overflowY: 'auto' }}
    ref={verticalScrollRef}>
          <div className="synchronized-table-scroll first " ref={firstTableRef} style={{ overflowY: 'hidden' }}>
            <table className="table-fixed text-xs text-left min-w-max border border-gray-300 rounded-lg">
              <thead className="sticky-thead">
                <tr
                  style={{
                    height: `${ROW_HEIGHT_DEFAULT}px`,
                    lineHeight: "normal",
                  }}
                >
                  {EMPLOYEE_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Reduced padding and min-width
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
                    style={{
                      height: `${ROW_HEIGHT_DEFAULT}px`,
                      lineHeight: "normal",
                    }}
                  >
                    {console.log("Rendering new entry form with:", {
                      employeeSuggestions,
                      laborAccounts,
                      plcOptions,
                      plcSearch,
                    })}
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <select
                        name="idType"
                        value={newEntry.idType || ""}
                        onChange={(e) =>
                          setNewEntry({ ...newEntry, idType: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                      >
                        {ID_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="id"
                        value={newEntry.id}
                        onChange={(e) => handleIdChange(e.target.value)}
                        className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
                        list="employee-id-list"
                        placeholder="Enter ID"
                      />
                      <datalist id="employee-id-list">
                        {employeeSuggestions
                          .filter(
                            (emp) =>
                              emp.emplId && typeof emp.emplId === "string"
                          )
                          .map((emp, index) => (
                            <option
                              key={`${emp.emplId}-${index}`}
                              value={emp.emplId}
                            >
                              {emp.lastName && emp.firstName
                                ? `${emp.lastName}, ${emp.firstName}`
                                : emp.lastName || emp.firstName || emp.emplId}
                            </option>
                          ))}
                      </datalist>
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="name"
                        value={
                          newEntry.idType === "Vendor"
                            ? newEntry.lastName || newEntry.firstName || ""
                            : newEntry.lastName && newEntry.firstName
                            ? `${newEntry.lastName}, ${newEntry.firstName}`
                            : newEntry.lastName || newEntry.firstName || ""
                        }
                        readOnly
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
                        placeholder="Name (auto-filled)"
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="acctId"
                        value={newEntry.acctId}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, acctId: e.target.value })
                        }
                        className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                          !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        list="account-list"
                        placeholder="Enter Account"
                        disabled={!isBudPlan}
                      />
                      <datalist id="account-list">
                        {laborAccounts.map((account, index) => (
                          <option
                            key={`${account.id}-${index}`}
                            value={account.id}
                          >
                            {account.id}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="orgId"
                        value={newEntry.orgId}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, orgId: e.target.value })
                        }
                        className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                          !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        placeholder="Enter Organization"
                        disabled={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="plcGlcCode"
                        value={newEntry.plcGlcCode}
                        onChange={(e) =>
                          isBudPlan && handlePlcInputChange(e.target.value)
                        }
                        className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                          !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        list="plc-list"
                        placeholder="Enter Plc"
                        disabled={!isBudPlan}
                      />
                      <datalist id="plc-list">
                        {plcOptions.map((plc, index) => (
                          <option
                            key={`${plc.value}-${index}`}
                            value={plc.value}
                          >
                            {plc.label}
                          </option>
                        ))}
                      </datalist>
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5 text-center">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="checkbox"
                        name="isRev"
                        checked={newEntry.isRev}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, isRev: e.target.checked })
                        }
                        className="w-4 h-4"
                        disabled={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5 text-center">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="checkbox"
                        name="isBrd"
                        checked={newEntry.isBrd}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({ ...newEntry, isBrd: e.target.checked })
                        }
                        className="w-4 h-4"
                        disabled={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="status"
                        value={newEntry.status}
                        onChange={(e) =>
                          setNewEntry({ ...newEntry, status: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                        placeholder="Enter Status"
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      <input
                        type="text"
                        name="perHourRate"
                        value={newEntry.perHourRate}
                        onChange={(e) =>
                          isBudPlan &&
                          setNewEntry({
                            ...newEntry,
                            perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
                          })
                        }
                        className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
                          !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        placeholder="Enter Hour Rate"
                        disabled={!isBudPlan}
                      />
                    </td>
                    <td className="border border-gray-300 px-1.5 py-0.5">
                      {" "}
                      {/* Reduced padding */}
                      {Object.values(newEntryPeriodHours)
                        .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                )}
                {localEmployees
                  .filter((_, idx) => !hiddenRows[idx])
                  .map((emp, idx) => {
                    const actualEmpIdx = localEmployees.findIndex(
                      (e) => e === emp
                    );
                    const row = getEmployeeRow(emp, actualEmpIdx);
                    const editedData = editedEmployeeData[actualEmpIdx] || {};
                    return (
                      <tr
                        key={`employee-${actualEmpIdx}`}
                        className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
                          selectedRowIndex === actualEmpIdx
                            ? "bg-yellow-100"
                            : "even:bg-gray-50"
                        }`}
                        style={{
                          height: `${ROW_HEIGHT_DEFAULT}px`,
                          lineHeight: "normal",
                          cursor: isEditable ? "pointer" : "default",
                        }}
                        onClick={() => handleRowClick(actualEmpIdx)}
                      >
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {row.idType}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {row.emplId}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {row.name}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {isBudPlan && isEditable ? (
                            <input
                              type="text"
                              value={
                                editedData.acctId !== undefined
                                  ? editedData.acctId
                                  : row.acctId
                              }
                              onChange={(e) =>
                                handleEmployeeDataChange(
                                  actualEmpIdx,
                                  "acctId",
                                  e.target.value
                                )
                              }
                              onBlur={() =>
                                handleEmployeeDataBlur(actualEmpIdx, emp)
                              }
                              className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                              list="account-list"
                            />
                          ) : (
                            row.acctId
                          )}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {isBudPlan && isEditable ? (
                            <input
                              type="text"
                              value={
                                editedData.orgId !== undefined
                                  ? editedData.orgId
                                  : row.orgId
                              }
                              onChange={(e) =>
                                handleEmployeeDataChange(
                                  actualEmpIdx,
                                  "orgId",
                                  e.target.value
                                )
                              }
                              onBlur={() =>
                                handleEmployeeDataBlur(actualEmpIdx, emp)
                              }
                              className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                            />
                          ) : (
                            row.orgId
                          )}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {isBudPlan && isEditable ? (
                            <input
                              type="text"
                              value={
                                editedData.glcPlc !== undefined
                                  ? editedData.glcPlc
                                  : row.glcPlc
                              }
                              onChange={(e) =>
                                handleEmployeeDataChange(
                                  actualEmpIdx,
                                  "glcPlc",
                                  e.target.value
                                )
                              }
                              onBlur={() =>
                                handleEmployeeDataBlur(actualEmpIdx, emp)
                              }
                              className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                              list="plc-list"
                            />
                          ) : (
                            row.glcPlc
                          )}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {isBudPlan && isEditable ? (
                            <input
                              type="checkbox"
                              checked={
                                editedData.isRev !== undefined
                                  ? editedData.isRev
                                  : emp.emple.isRev
                              }
                              onChange={(e) =>
                                handleEmployeeDataChange(
                                  actualEmpIdx,
                                  "isRev",
                                  e.target.checked
                                )
                              }
                              onBlur={() =>
                                handleEmployeeDataBlur(actualEmpIdx, emp)
                              }
                              className="w-4 h-4"
                            />
                          ) : (
                            row.isRev
                          )}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {isBudPlan && isEditable ? (
                            <input
                              type="checkbox"
                              checked={
                                editedData.isBrd !== undefined
                                  ? editedData.isBrd
                                  : emp.emple.isBrd
                              }
                              onChange={(e) =>
                                handleEmployeeDataChange(
                                  actualEmpIdx,
                                  "isBrd",
                                  e.target.checked
                                )
                              }
                              onBlur={() =>
                                handleEmployeeDataBlur(actualEmpIdx, emp)
                              }
                              className="w-4 h-4"
                            />
                          ) : (
                            row.isBrd
                          )}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {row.status}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {isBudPlan && isEditable ? (
                            <input
                              type="text"
                              value={
                                editedData.perHourRate !== undefined
                                  ? editedData.perHourRate
                                  : row.perHourRate
                              }
                              onChange={(e) =>
                                handleEmployeeDataChange(
                                  actualEmpIdx,
                                  "perHourRate",
                                  e.target.value.replace(/[^0-9.]/g, "")
                                )
                              }
                              onBlur={() =>
                                handleEmployeeDataBlur(actualEmpIdx, emp)
                              }
                              className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
                            />
                          ) : (
                            row.perHourRate
                          )}
                        </td>
                        <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
                          {" "}
                          {/* Reduced padding and min-width */}
                          {row.total}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>


          <div className="synchronized-table-scroll last" ref={lastTableRef} style={{ overflowY: 'hidden' }}>
            <table className="min-w-full text-xs text-center border-collapse border border-gray-300 rounded-lg">
              <thead className="sticky-thead">
                <tr
                  style={{
                    height: `${ROW_HEIGHT_DEFAULT}px`,
                    lineHeight: "normal",
                  }}
                >
                  {sortedDurations.map((duration) => {
                    const uniqueKey = `${duration.monthNo}_${duration.year}`;
                    return (
                      <th
                        key={uniqueKey}
                        className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
                          selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
                        }`}
                        style={{ cursor: isEditable ? "pointer" : "default" }}
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
                    style={{
                      height: `${ROW_HEIGHT_DEFAULT}px`,
                      lineHeight: "normal",
                    }}
                  >
                    {sortedDurations.map((duration) => {
                      const uniqueKey = `${duration.monthNo}_${duration.year}`;
                      const isInputEditable =
                        isEditable &&
                        isMonthEditable(duration, closedPeriod, planType);
                      return (
                        <td
                          key={`new-${uniqueKey}`}
                          className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
                            planType === "EAC"
                              ? isInputEditable
                                ? "bg-green-50"
                                : "bg-gray-200"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            inputMode="numeric"
                            value={newEntryPeriodHours[uniqueKey] || ""}
                            onChange={(e) =>
                              isInputEditable &&
                              setNewEntryPeriodHours((prev) => ({
                                ...prev,
                                [uniqueKey]: e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                ),
                              }))
                            }
                            className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
                              !isInputEditable
                                ? "cursor-not-allowed text-gray-400"
                                : "text-gray-700"
                            }`}
                            disabled={!isInputEditable}
                            placeholder="Enter Hours"
                          />
                        </td>
                      );
                    })}
                  </tr>
                )}
                {localEmployees
                  .filter((_, idx) => !hiddenRows[idx])
                  .map((emp, idx) => {
                    const actualEmpIdx = localEmployees.findIndex(
                      (e) => e === emp
                    );
                    const monthHours = getMonthHours(emp);
                    return (
                      <tr
                        key={`hours-${actualEmpIdx}`}
                        className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
                          selectedRowIndex === actualEmpIdx
                            ? "bg-yellow-100"
                            : "even:bg-gray-50"
                        }`}
                        style={{
                          height: `${ROW_HEIGHT_DEFAULT}px`,
                          lineHeight: "normal",
                          cursor: isEditable ? "pointer" : "default",
                        }}
                        onClick={() => handleRowClick(actualEmpIdx)}
                      >
                        {sortedDurations.map((duration) => {
                          const uniqueKey = `${duration.monthNo}_${duration.year}`;
                          const forecast = monthHours[uniqueKey];
                          const value =
                            inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
                            (forecast?.value !== undefined
                              ? forecast.value
                              : "0");
                          const isInputEditable =
                            isEditable &&
                            isMonthEditable(duration, closedPeriod, planType);
                          return (
                            <td
                              key={`hours-${actualEmpIdx}-${uniqueKey}`}
                              className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
                                selectedColumnKey === uniqueKey
                                  ? "bg-yellow-100"
                                  : ""
                              } ${
                                planType === "EAC"
                                  ? isInputEditable
                                    ? "bg-green-50"
                                    : "bg-gray-200"
                                  : ""
                              }`}
                            >
                              <input
                                type="text"
                                inputMode="numeric"
                                className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
                                  !isInputEditable
                                    ? "cursor-not-allowed text-gray-400"
                                    : "text-gray-700"
                                }`}
                                value={value}
                                onChange={(e) =>
                                  handleInputChange(
                                    actualEmpIdx,
                                    uniqueKey,
                                    e.target.value.replace(/[^0-9.]/g, "")
                                  )
                                }
                                onBlur={(e) =>
                                  handleForecastHoursBlur(
                                    actualEmpIdx,
                                    uniqueKey,
                                    e.target.value
                                  )
                                }
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
        </div>

        //  <div className="synchronized-tables-container max-h-[500px] overflow-y-auto flex">
        //   <div className="synchronized-table-scroll first min-h-0 overflow-x-auto ">
        //     <table className="table-fixed text-xs text-left min-w-[350px] border border-gray-300 rounded-lg">
        //       <thead className="sticky-thead">
        //         <tr
        //           style={{
        //             height: `${ROW_HEIGHT_DEFAULT}px`,
        //             lineHeight: "normal",
        //           }}
        //         >
        //           {EMPLOYEE_COLUMNS.map((col) => (
        //             <th
        //               key={col.key}
        //               className="p-1.5 border border-gray-200 whitespace-nowrap text-xs text-gray-900 font-normal min-w-[70px]" // Reduced padding and min-width
        //             >
        //               {col.label}
        //             </th>
        //           ))}
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {showNewForm && (
        //           <tr
        //             key="new-entry"
        //             className="bg-gray-50"
        //             style={{
        //               height: `${ROW_HEIGHT_DEFAULT}px`,
        //               lineHeight: "normal",
        //             }}
        //           >
        //             {console.log("Rendering new entry form with:", {
        //               employeeSuggestions,
        //               laborAccounts,
        //               plcOptions,
        //               plcSearch,
        //             })}
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <select
        //                 name="idType"
        //                 value={newEntry.idType || ""}
        //                 onChange={(e) =>
        //                   setNewEntry({ ...newEntry, idType: e.target.value })
        //                 }
        //                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //               >
        //                 {ID_TYPE_OPTIONS.map((opt) => (
        //                   <option key={opt.value} value={opt.value}>
        //                     {opt.label}
        //                   </option>
        //                 ))}
        //               </select>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="id"
        //                 value={newEntry.id}
        //                 onChange={(e) => handleIdChange(e.target.value)}
        //                 className="w-full rounded px-1 py-0.5 text-xs outline-none focus:ring-0 no-datalist-border"
        //                 list="employee-id-list"
        //                 placeholder="Enter ID"
        //               />
        //               <datalist id="employee-id-list">
        //                 {employeeSuggestions
        //                   .filter(
        //                     (emp) =>
        //                       emp.emplId && typeof emp.emplId === "string"
        //                   )
        //                   .map((emp, index) => (
        //                     <option
        //                       key={`${emp.emplId}-${index}`}
        //                       value={emp.emplId}
        //                     >
        //                       {emp.lastName && emp.firstName
        //                         ? `${emp.lastName}, ${emp.firstName}`
        //                         : emp.lastName || emp.firstName || emp.emplId}
        //                     </option>
        //                   ))}
        //               </datalist>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="name"
        //                 value={
        //                   newEntry.idType === "Vendor"
        //                     ? newEntry.lastName || newEntry.firstName || ""
        //                     : newEntry.lastName && newEntry.firstName
        //                     ? `${newEntry.lastName}, ${newEntry.firstName}`
        //                     : newEntry.lastName || newEntry.firstName || ""
        //                 }
        //                 readOnly
        //                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs bg-gray-100 cursor-not-allowed"
        //                 placeholder="Name (auto-filled)"
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="acctId"
        //                 value={newEntry.acctId}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, acctId: e.target.value })
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 list="account-list"
        //                 placeholder="Enter Account"
        //                 disabled={!isBudPlan}
        //               />
        //               <datalist id="account-list">
        //                 {laborAccounts.map((account, index) => (
        //                   <option
        //                     key={`${account.id}-${index}`}
        //                     value={account.id}
        //                   >
        //                     {account.id}
        //                   </option>
        //                 ))}
        //               </datalist>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="orgId"
        //                 value={newEntry.orgId}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, orgId: e.target.value })
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 placeholder="Enter Organization"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="plcGlcCode"
        //                 value={newEntry.plcGlcCode}
        //                 onChange={(e) =>
        //                   isBudPlan && handlePlcInputChange(e.target.value)
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 list="plc-list"
        //                 placeholder="Enter Plc"
        //                 disabled={!isBudPlan}
        //               />
        //               <datalist id="plc-list">
        //                 {plcOptions.map((plc, index) => (
        //                   <option
        //                     key={`${plc.value}-${index}`}
        //                     value={plc.value}
        //                   >
        //                     {plc.label}
        //                   </option>
        //                 ))}
        //               </datalist>
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5 text-center">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="checkbox"
        //                 name="isRev"
        //                 checked={newEntry.isRev}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, isRev: e.target.checked })
        //                 }
        //                 className="w-4 h-4"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5 text-center">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="checkbox"
        //                 name="isBrd"
        //                 checked={newEntry.isBrd}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({ ...newEntry, isBrd: e.target.checked })
        //                 }
        //                 className="w-4 h-4"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="status"
        //                 value={newEntry.status}
        //                 onChange={(e) =>
        //                   setNewEntry({ ...newEntry, status: e.target.value })
        //                 }
        //                 className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                 placeholder="Enter Status"
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               <input
        //                 type="text"
        //                 name="perHourRate"
        //                 value={newEntry.perHourRate}
        //                 onChange={(e) =>
        //                   isBudPlan &&
        //                   setNewEntry({
        //                     ...newEntry,
        //                     perHourRate: e.target.value.replace(/[^0-9.]/g, ""),
        //                   })
        //                 }
        //                 className={`w-full border border-gray-300 rounded px-1 py-0.5 text-xs ${
        //                   !isBudPlan ? "bg-gray-100 cursor-not-allowed" : ""
        //                 }`}
        //                 placeholder="Enter Hour Rate"
        //                 disabled={!isBudPlan}
        //               />
        //             </td>
        //             <td className="border border-gray-300 px-1.5 py-0.5">
        //               {" "}
        //               {/* Reduced padding */}
        //               {Object.values(newEntryPeriodHours)
        //                 .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
        //                 .toFixed(2)}
        //             </td>
        //           </tr>
        //         )}
        //         {localEmployees
        //           .filter((_, idx) => !hiddenRows[idx])
        //           .map((emp, idx) => {
        //             const actualEmpIdx = localEmployees.findIndex(
        //               (e) => e === emp
        //             );
        //             const row = getEmployeeRow(emp, actualEmpIdx);
        //             const editedData = editedEmployeeData[actualEmpIdx] || {};
        //             return (
        //               <tr
        //                 key={`employee-${actualEmpIdx}`}
        //                 className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
        //                   selectedRowIndex === actualEmpIdx
        //                     ? "bg-yellow-100"
        //                     : "even:bg-gray-50"
        //                 }`}
        //                 style={{
        //                   height: `${ROW_HEIGHT_DEFAULT}px`,
        //                   lineHeight: "normal",
        //                   cursor: isEditable ? "pointer" : "default",
        //                 }}
        //                 onClick={() => handleRowClick(actualEmpIdx)}
        //               >
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.idType}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.emplId}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.name}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.acctId !== undefined
        //                           ? editedData.acctId
        //                           : row.acctId
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "acctId",
        //                           e.target.value
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                       list="account-list"
        //                     />
        //                   ) : (
        //                     row.acctId
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.orgId !== undefined
        //                           ? editedData.orgId
        //                           : row.orgId
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "orgId",
        //                           e.target.value
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                     />
        //                   ) : (
        //                     row.orgId
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.glcPlc !== undefined
        //                           ? editedData.glcPlc
        //                           : row.glcPlc
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "glcPlc",
        //                           e.target.value
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                       list="plc-list"
        //                     />
        //                   ) : (
        //                     row.glcPlc
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="checkbox"
        //                       checked={
        //                         editedData.isRev !== undefined
        //                           ? editedData.isRev
        //                           : emp.emple.isRev
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "isRev",
        //                           e.target.checked
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-4 h-4"
        //                     />
        //                   ) : (
        //                     row.isRev
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px] text-center">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="checkbox"
        //                       checked={
        //                         editedData.isBrd !== undefined
        //                           ? editedData.isBrd
        //                           : emp.emple.isBrd
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "isBrd",
        //                           e.target.checked
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-4 h-4"
        //                     />
        //                   ) : (
        //                     row.isBrd
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.status}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {isBudPlan && isEditable ? (
        //                     <input
        //                       type="text"
        //                       value={
        //                         editedData.perHourRate !== undefined
        //                           ? editedData.perHourRate
        //                           : row.perHourRate
        //                       }
        //                       onChange={(e) =>
        //                         handleEmployeeDataChange(
        //                           actualEmpIdx,
        //                           "perHourRate",
        //                           e.target.value.replace(/[^0-9.]/g, "")
        //                         )
        //                       }
        //                       onBlur={() =>
        //                         handleEmployeeDataBlur(actualEmpIdx, emp)
        //                       }
        //                       className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs"
        //                     />
        //                   ) : (
        //                     row.perHourRate
        //                   )}
        //                 </td>
        //                 <td className="p-1.5 border-r border-gray-200 text-xs text-gray-700 min-w-[70px]">
        //                   {" "}
        //                   {/* Reduced padding and min-width */}
        //                   {row.total}
        //                 </td>
        //               </tr>
        //             );
        //           })}
        //       </tbody>
        //     </table>
        //   </div>


        //   <div className="synchronized-table-scroll last min-h-0 overflow-x-auto">
        //     <table className="min-w-[900px] text-xs text-center border-collapse border border-gray-300 rounded-lg">
        //       <thead className="sticky-thead">
        //         <tr
        //           style={{
        //             height: `${ROW_HEIGHT_DEFAULT}px`,
        //             lineHeight: "normal",
        //           }}
        //         >
        //           {sortedDurations.map((duration) => {
        //             const uniqueKey = `${duration.monthNo}_${duration.year}`;
        //             return (
        //               <th
        //                 key={uniqueKey}
        //                 className={`px-2 py-1.5 border border-gray-200 text-center min-w-[80px] text-xs text-gray-900 font-normal ${
        //                   selectedColumnKey === uniqueKey ? "bg-yellow-100" : ""
        //                 }`}
        //                 style={{ cursor: isEditable ? "pointer" : "default" }}
        //                 onClick={() => handleColumnHeaderClick(uniqueKey)}
        //               >
        //                 <div className="flex flex-col items-center justify-center h-full">
        //                   <span className="whitespace-nowrap text-xs text-gray-900 font-normal">
        //                     {duration.month}
        //                   </span>
        //                   <span className="text-xs text-gray-600 font-normal">
        //                     {duration.workingHours || 0} hrs
        //                   </span>
        //                 </div>
        //               </th>
        //             );
        //           })}
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {showNewForm && (
        //           <tr
        //             key="new-entry"
        //             className="bg-gray-50"
        //             style={{
        //               height: `${ROW_HEIGHT_DEFAULT}px`,
        //               lineHeight: "normal",
        //             }}
        //           >
        //             {sortedDurations.map((duration) => {
        //               const uniqueKey = `${duration.monthNo}_${duration.year}`;
        //               const isInputEditable =
        //                 isEditable &&
        //                 isMonthEditable(duration, closedPeriod, planType);
        //               return (
        //                 <td
        //                   key={`new-${uniqueKey}`}
        //                   className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
        //                     planType === "EAC"
        //                       ? isInputEditable
        //                         ? "bg-green-50"
        //                         : "bg-gray-200"
        //                       : ""
        //                   }`}
        //                 >
        //                   <input
        //                     type="text"
        //                     inputMode="numeric"
        //                     value={newEntryPeriodHours[uniqueKey] || ""}
        //                     onChange={(e) =>
        //                       isInputEditable &&
        //                       setNewEntryPeriodHours((prev) => ({
        //                         ...prev,
        //                         [uniqueKey]: e.target.value.replace(
        //                           /[^0-9.]/g,
        //                           ""
        //                         ),
        //                       }))
        //                     }
        //                     className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
        //                       !isInputEditable
        //                         ? "cursor-not-allowed text-gray-400"
        //                         : "text-gray-700"
        //                     }`}
        //                     disabled={!isInputEditable}
        //                     placeholder="Enter Hours"
        //                   />
        //                 </td>
        //               );
        //             })}
        //           </tr>
        //         )}
        //         {localEmployees
        //           .filter((_, idx) => !hiddenRows[idx])
        //           .map((emp, idx) => {
        //             const actualEmpIdx = localEmployees.findIndex(
        //               (e) => e === emp
        //             );
        //             const monthHours = getMonthHours(emp);
        //             return (
        //               <tr
        //                 key={`hours-${actualEmpIdx}`}
        //                 className={`whitespace-nowrap hover:bg-blue-50 transition border-b border-gray-200 ${
        //                   selectedRowIndex === actualEmpIdx
        //                     ? "bg-yellow-100"
        //                     : "even:bg-gray-50"
        //                 }`}
        //                 style={{
        //                   height: `${ROW_HEIGHT_DEFAULT}px`,
        //                   lineHeight: "normal",
        //                   cursor: isEditable ? "pointer" : "default",
        //                 }}
        //                 onClick={() => handleRowClick(actualEmpIdx)}
        //               >
        //                 {sortedDurations.map((duration) => {
        //                   const uniqueKey = `${duration.monthNo}_${duration.year}`;
        //                   const forecast = monthHours[uniqueKey];
        //                   const value =
        //                     inputValues[`${actualEmpIdx}_${uniqueKey}`] ??
        //                     (forecast?.value !== undefined
        //                       ? forecast.value
        //                       : "0");
        //                   const isInputEditable =
        //                     isEditable &&
        //                     isMonthEditable(duration, closedPeriod, planType);
        //                   return (
        //                     <td
        //                       key={`hours-${actualEmpIdx}-${uniqueKey}`}
        //                       className={`px-2 py-1.5 border-r border-gray-200 text-center min-w-[80px] ${
        //                         selectedColumnKey === uniqueKey
        //                           ? "bg-yellow-100"
        //                           : ""
        //                       } ${
        //                         planType === "EAC"
        //                           ? isInputEditable
        //                             ? "bg-green-50"
        //                             : "bg-gray-200"
        //                           : ""
        //                       }`}
        //                     >
        //                       <input
        //                         type="text"
        //                         inputMode="numeric"
        //                         className={`text-center border border-gray-300 bg-white text-xs w-[50px] h-[18px] p-[2px] ${
        //                           !isInputEditable
        //                             ? "cursor-not-allowed text-gray-400"
        //                             : "text-gray-700"
        //                         }`}
        //                         value={value}
        //                         onChange={(e) =>
        //                           handleInputChange(
        //                             actualEmpIdx,
        //                             uniqueKey,
        //                             e.target.value.replace(/[^0-9.]/g, "")
        //                           )
        //                         }
        //                         onBlur={(e) =>
        //                           handleForecastHoursBlur(
        //                             actualEmpIdx,
        //                             uniqueKey,
        //                             e.target.value
        //                           )
        //                         }
        //                         disabled={!isInputEditable}
        //                         placeholder="Enter Hours"
        //                       />
        //                     </td>
        //                   );
        //                 })}
        //               </tr>
        //             );
        //           })}
        //       </tbody>
        //     </table>
        //   </div>
        // </div>

      )}

      {showFindReplace && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
            <h3 className="text-lg font-semibold mb-4">
              Find and Replace Hours
            </h3>
            <div className="mb-3">
              <label
                htmlFor="findValue"
                className="block text-gray-700 text-xs font-medium mb-1"
              >
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
                onChange={(e) =>
                  setReplaceValue(e.target.value.replace(/[^0-9.]/g, ""))
                }
                placeholder="New value (e.g., 120 or empty)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Scope:
              </label>
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
                  <span className="ml-2">
                    Selected Row (
                    {selectedRowIndex !== null
                      ? localEmployees[selectedRowIndex]?.emple.emplId
                      : "N/A"}
                    )
                  </span>
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
                  <span className="ml-2">
                    Selected Column (
                    {selectedColumnKey
                      ? sortedDurations.find(
                          (d) => `${d.monthNo}_${d.year}` === selectedColumnKey
                        )?.month
                      : "N/A"}
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

export default ProjectHoursDetails;


