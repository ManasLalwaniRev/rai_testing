
'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';

const cn = (...args) => {
  return args.filter(Boolean).join(' ');
};

// --- LaborForm Tab Content (Existing Form) ---
const LaborFormContent = ({ onSave }) => {
  // State for all fields in the form
  const [projectBudgetPeriodMethod, setProjectBudgetPeriodMethod] = useState('Accounting Periods ONLY');
  const [unlockEACLastClosedPeriod, setUnlockEACLastClosedPeriod] = useState(false);
  const [projectAccountGroupCode, setProjectAccountGroupCode] = useState('');
  const [resourceBudgetCommitFlagDefault, setResourceBudgetCommitFlagDefault] = useState(false);
  const [autoPlugCalculation, setAutoPlugCalculation] = useState('On');
  const [importBudgetEACsFromExcelCommitFlagDefault, setImportBudgetEACsFromExcelCommitFlagDefault] = useState(false);
  const [timesheetImportHistory, setTimesheetImportHistory] = useState(36); // Default to 36
  const [importNewBusinessBudgetFromExcelCommitFlag, setImportNewBusinessBudgetFromExcelCommitFlag] = useState(false);
  const [timesheetScheduleCode, setTimesheetScheduleCode] = useState('');
  const [checkTheProjectBudgetEnableSubtaskRowHideOptionByDefault, setCheckTheProjectBudgetEnableSubtaskRowHideOptionByDefault] = useState(false);
  // States to connect to API
  const [laborEscalationMonth, setLaborEscalationMonth] = useState(""); // Initialize as empty for API data
  const [enableProjectHideBudEAC, setEnableProjectHideBudEAC] = useState(false);
  const [laborEscalationValue, setLaborEscalationValue] = useState(''); // Initialize as empty for API data
  const [showBudEACOnlyDefault, setShowBudEACOnlyDefault] = useState(false);
  const [projectSecurityToBeBasedOn, setProjectSecurityToBeBasedOn] = useState('Project Budget Security');
  const [enableBudgetAutoInspect, setEnableBudgetAutoInspect] = useState(false);
  const [allowBUDEACCreationPriorToPeriodClose, setAllowBUDEACCreationPriorToPeriodClose] = useState('Create BUD/EACs based on Current Period');
  const [ifLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning, setIfLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning] = useState('Yes');
  const [defaultBurdenTemplate, setDefaultBurdenTemplate] = useState('DEFAULT');
  const [projectBudgetSequentialLocking, setProjectBudgetSequentialLocking] = useState(false);
  const [workforceRule, setWorkforceRule] = useState('Enforce'); // Default value
  const [orgLevelDisplay, setOrgLevelDisplay] = useState(4); // Default value

  // New states for Project ID dropdown
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [availableProjects, setAvailableProjects] = useState([]); // To store fetched project IDs/names

  // State for API fetching status
  const [loading, setLoading] = useState(true); // Initial loading for projects and config
  const [error, setError] = useState(null);

  // Month options mapping numeric values to display text
  const monthOptions = [
    { value: "0", label: "Employee's Anniversary Month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const workforceRules = ['Enforce', 'Do Not Enforce'];

  const handleLaborEscalationValueChange = (value) => {
    // Allow only numbers and a single decimal point (up to 5 decimal places)
    const regex = /^[0-9]*(\.[0-9]{0,5})?$/;
    if (value === '' || regex.test(value)) {
      setLaborEscalationValue(value);
    }
  };

  // --- API Fetching for ALL available Project IDs ---
  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true); // Set loading to true for initial project list fetch
      setError(null);
      try {
        const apiUrl = `https://test-api-3tmq.onrender.com/Project/GetAllProjects`; // Your API endpoint to get ALL projects

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        setAvailableProjects(projects);

        // Automatically select the first project if available
        if (projects.length > 0) {
          setSelectedProjectId(projects[0].id);
        } else {
          setLoading(false); // No projects to load config for
        }
      } catch (e) {
        console.error("Failed to fetch project list:", e);
        setError("Failed to load project list. Please check your API connection.");
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []); // Runs once on component mount to get the list of projects

  // --- API Fetching for Escalation Month and Value (dependent on selectedProjectId) ---
  useEffect(() => {
    const fetchEscalationData = async () => {
      if (!selectedProjectId) {
        // No project selected yet, or no projects available
        setLoading(false);
        return;
      }

      setLoading(true); // Set loading to true when fetching config for a specific project
      setError(null);
      try {
        const apiUrl = `https://test-api-3tmq.onrender.com/Project/GetAllConfigValuesByProject/${selectedProjectId}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const configValues = await response.json(); // Assuming it returns an array of config objects

        // Find and set Labor Escalation Month and Value from the API response
        const escalationMonthConfig = configValues.find(config => config.configKey === 'LaborEscalationMonth');
        const escalationValueConfig = configValues.find(config => config.configKey === 'LaborEscalationValue');

        if (escalationMonthConfig) {
          setLaborEscalationMonth(escalationMonthConfig.configValue); // Should store numeric value (0-12)
        } else {
          setLaborEscalationMonth(""); // Reset if not found
        }
        if (escalationValueConfig) {
          setLaborEscalationValue(escalationValueConfig.configValue);
        } else {
          setLaborEscalationValue(""); // Reset if not found
        }

        // You might also want to set other states if your API returns them
        // For example:
        // const autoPlugCalculationConfig = configValues.find(config => config.configKey === 'AutoPlugCalculation');
        // if (autoPlugCalculationConfig) {
        //   setAutoPlugCalculation(autoPlugCalculationConfig.configValue);
        // }

      } catch (e) {
        console.error(`Failed to fetch config for project ${selectedProjectId}:`, e);
        setError(`Failed to load settings for project ${selectedProjectId}. Please try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchEscalationData();
  }, [selectedProjectId]); // Re-run when selectedProjectId changes

  // --- Handle Form Submission (Saving to API) ---
  const handleSaveSettings = useCallback(async () => {
    if (!selectedProjectId) {
      alert("Please select a Project ID to save settings");
      return;
    }
    console.log(`Attempting to save Project Settings for Project ID: ${selectedProjectId}...`);

    const updateApiUrl = `https://test-api-3tmq.onrender.com/Project/UpdateConfigValuesByProject/${selectedProjectId}`; // <<<<< IMPORTANT: REPLACE WITH YOUR ACTUAL PUT/POST ENDPOINT

    // Construct the data payload as per your API's PUT/POST requirement
    // Convert laborEscalationMonth to a number for the API payload
    const dataToSave = [
      { configKey: 'LaborEscalationMonth', configValue: Number(laborEscalationMonth) }, // Converted to Number
      { configKey: 'LaborEscalationValue', configValue: laborEscalationValue },
      // Add other fields from this form that you want to save
      { configKey: 'ProjectBudgetPeriodMethod', configValue: projectBudgetPeriodMethod },
      { configKey: 'UnlockEACLastClosedPeriod', configValue: unlockEACLastClosedPeriod.toString() }, // Convert boolean to string if API expects it
      { configKey: 'ProjectAccountGroupCode', configValue: projectAccountGroupCode },
      { configKey: 'ResourceBudgetCommitFlagDefault', configValue: resourceBudgetCommitFlagDefault.toString() },
      { configKey: 'AutoPlugCalculation', configValue: autoPlugCalculation },
      { configKey: 'ImportBudgetEACsFromExcelCommitFlagDefault', configValue: importBudgetEACsFromExcelCommitFlagDefault.toString() },
      { configKey: 'TimesheetImportHistory', configValue: timesheetImportHistory.toString() },
      { configKey: 'ImportNewBusinessBudgetFromExcelCommitFlag', configValue: importNewBusinessBudgetFromExcelCommitFlag.toString() },
      { configKey: 'TimesheetScheduleCode', configValue: timesheetScheduleCode },
      { configKey: 'CheckTheProjectBudgetEnableSubtaskRowHideOptionByDefault', configValue: checkTheProjectBudgetEnableSubtaskRowHideOptionByDefault.toString() },
      { configKey: 'EnableProjectHideBudEAC', configValue: enableProjectHideBudEAC.toString() },
      { configKey: 'ShowBudEACOnlyDefault', configValue: showBudEACOnlyDefault.toString() },
      { configKey: 'ProjectSecurityToBeBasedOn', configValue: projectSecurityToBeBasedOn },
      { configKey: 'EnableBudgetAutoInspect', configValue: enableBudgetAutoInspect.toString() },
      { configKey: 'AllowBUDEACCreationPriorToPeriodClose', configValue: allowBUDEACCreationPriorToPeriodClose },
      { configKey: 'IfLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning', configValue: ifLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning },
      { configKey: 'DefaultBurdenTemplate', configValue: defaultBurdenTemplate },
      { configKey: 'ProjectBudgetSequentialLocking', configValue: projectBudgetSequentialLocking.toString() },
      { configKey: 'WorkforceRule', configValue: workforceRule },
      { configKey: 'OrgLevelDisplay', configValue: orgLevelDisplay.toString() },
    ];

    console.log("Project Settings Data to Save:", dataToSave);

    try {
      const response = await fetch(updateApiUrl, {
        method: 'PUT', // Use 'PUT' or 'POST' or 'PATCH' as per your API
        headers: {
          'Content-Type': 'application/json',
          // No authentication key needed as per your current setup
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(`Failed to save settings: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Project settings saved successfully:', result);
      alert('Project settings saved successfully!'); // Provide user feedback
    } catch (e) {
      console.error("Error saving project settings:", e);
      alert(`Error saving project settings: ${e.message}`); // Provide user feedback
    }
  }, [
    selectedProjectId, projectBudgetPeriodMethod, unlockEACLastClosedPeriod, projectAccountGroupCode,
    resourceBudgetCommitFlagDefault, autoPlugCalculation, importBudgetEACsFromExcelCommitFlagDefault,
    timesheetImportHistory, importNewBusinessBudgetFromExcelCommitFlag, timesheetScheduleCode,
    checkTheProjectBudgetEnableSubtaskRowHideOptionByDefault, laborEscalationMonth,
    enableProjectHideBudEAC, laborEscalationValue, showBudEACOnlyDefault,
    projectSecurityToBeBasedOn, enableBudgetAutoInspect, allowBUDEACCreationPriorToPeriodClose,
    ifLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning, defaultBurdenTemplate,
    projectBudgetSequentialLocking, workforceRule, orgLevelDisplay
  ]);

  // Expose the save handler to the parent component via ref
  useEffect(() => {
    if (onSave) {
      onSave.current = handleSaveSettings;
    }
  }, [onSave, handleSaveSettings]);

  if (loading && availableProjects.length === 0 && !error) {
    return <div className="p-4 text-center text-blue-600">Loading available projects...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-300">
      <h3 className="text-xl mb-4">Project Settings</h3>
      {/* Changed gap-y-8 back to gap-y-5 for more compact layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Project ID Dropdown */}
          <div>
            <label htmlFor="projectId" className="block text-sm font-medium">Project ID <span className="text-red-500">*</span></label>
            <select
              id="projectId"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option key="select-project-placeholder" value="">Select a Project</option>
              {/* Ensure unique keys even if project.id is null or undefined */}
              {availableProjects.map((project, index) => (
                <option
                  key={project.id ? String(project.id) : `project-idx-${index}`}
                  value={project.id}
                >
                  {project.name ? `${project.id} - ${project.name}` : project.id}
                </option>
              ))}
            </select>
          </div>

          {/* Project Budget Period Method */}
          <div>
            <label htmlFor="projectBudgetPeriodMethod" className="block text-sm font-medium">Project Budget Period Method <span className="text-red-500">*</span></label>
            <select
              id="projectBudgetPeriodMethod"
              value={projectBudgetPeriodMethod}
              onChange={(e) => setProjectBudgetPeriodMethod(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId} // Disable if no project selected
            >
              <option key="pbp-accounting-periods-only" value="Accounting Periods ONLY">Accounting Periods ONLY</option>
            </select>
          </div>

          {/* Project Account Group Code */}
          <div>
            <label htmlFor="projectAccountGroupCode" className="block text-sm font-medium">Project Account Group Code</label>
            <input
              id="projectAccountGroupCode"
              type="text"
              value={projectAccountGroupCode}
              onChange={(e) => setProjectAccountGroupCode(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            />
          </div>

          {/* Auto Plug Calculation */}
          <div>
            <label htmlFor="autoPlugCalculation" className="block text-sm font-medium">Auto Plug Calculation <span className="text-red-500">*</span></label>
            <select
              id="autoPlugCalculation"
              value={autoPlugCalculation}
              onChange={(e) => setAutoPlugCalculation(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            >
              <option key="apc-on" value="On">On</option>
              <option key="apc-off" value="Off">Off</option>
            </select>
          </div>

          {/* Timesheet Import History */}
          <div>
            <label htmlFor="timesheetImportHistory" className="block text-sm font-medium">Timesheet Import History</label>
            <div className="flex items-center mt-1">
              <input
                id="timesheetImportHistory"
                type="number"
                value={timesheetImportHistory}
                onChange={(e) => setTimesheetImportHistory(parseInt(e.target.value, 10))}
                className="w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading || !selectedProjectId}
              />
              <span className="ml-2 text-sm text-gray-600">Months</span>
            </div>
          </div>

          {/* Timesheet Schedule Code */}
          <div>
            <label htmlFor="timesheetScheduleCode" className="block text-sm font-medium">Timesheet Schedule Code</label>
            <input
              id="timesheetScheduleCode"
              type="text"
              value={timesheetScheduleCode}
              onChange={(e) => setTimesheetScheduleCode(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            />
          </div>

          {/* Labor Escalation Month */}
          <div>
            <label htmlFor="laborEscalationMonth" className="block text-sm font-medium">Labor Escalation Month <span className="text-red-500">*</span></label>
            <select
              id="laborEscalationMonth"
              value={laborEscalationMonth}
              onChange={(e) => setLaborEscalationMonth(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            >
              <option key="lem-select-option" value="">Select Option</option>
              {monthOptions.map((option) => (
                // Ensured option.value is a string for key
                <option key={String(option.value)} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Labor Escalation Value */}
          <div>
            <label htmlFor="laborEscalationValue" className="block text-sm font-medium">Labor Escalation Value <span className="text-red-500">*</span></label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">%</span>
              <input
                id="laborEscalationValue"
                type="text"
                value={laborEscalationValue}
                onChange={(e) => handleLaborEscalationValueChange(e.target.value)}
                placeholder="0.00000"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={loading || !selectedProjectId}
              />
            </div>
          </div>

          {/* Project Security to be based on */}
          <div>
            <label htmlFor="projectSecurityToBeBasedOn" className="block text-sm font-medium">Project Security to be based on <span className="text-red-500">*</span></label>
            <select
              id="projectSecurityToBeBasedOn"
              value={projectSecurityToBeBasedOn}
              onChange={(e) => setProjectSecurityToBeBasedOn(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            >
              <option key="ps-project-budget-security" value="Project Budget Security">Project Budget Security</option>
              <option key="ps-org-id" value="Org ID">Org ID</option>
            </select>
          </div>

          {/* Allow BUD/EAC Creation Prior to Period Close */}
          <div>
            <label htmlFor="allowBUDEACCreationPriorToPeriodClose" className="block text-sm font-medium">Allow BUD/EAC creation prior to period close <span className="text-red-500">*</span></label>
            <select
              id="allowBUDEACCreationPriorToPeriodClose"
              value={allowBUDEACCreationPriorToPeriodClose}
              onChange={(e) => setAllowBUDEACCreationPriorToPeriodClose(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            >
              <option key="ace-current-period" value="Create BUD/EACs based on Current Period">Create BUD/EACs based on Current Period</option>
              <option key="ace-last-closed-period" value="Create BUD/EACs based on Last Closed Period (Standard function)">Create BUD/EACs based on Last Closed Period (Standard function)</option>
            </select>
          </div>

          {/* If Labor Suppression is off, do you want to show Employee Labor Rate Planning */}
          <div>
            <label htmlFor="ifLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning" className="block text-sm font-medium">If Labor Suppression is off, do you want to show Employee Labor Rate Planning?</label>
            <select
              id="ifLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning"
              value={ifLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning}
              onChange={(e) => setIfLaborSuppressionIsOffDoYouWantToShowEmployeeLaborRatePlanning(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            >
              <option key="slrp-yes" value="Yes">Yes</option>
              <option key="slrp-no" value="No">No</option>
            </select>
          </div>

          {/* Default Burden Template */}
          <div>
            <label htmlFor="defaultBurdenTemplate" className="block text-sm font-medium">Default Burden Template <span className="text-red-500">*</span></label>
            <input
              id="defaultBurdenTemplate"
              type="text"
              value={defaultBurdenTemplate}
              onChange={(e) => setDefaultBurdenTemplate(e.target.value)}
              readOnly
              className="w-full mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm cursor-not-allowed"
              disabled={loading || !selectedProjectId}
            />
          </div>

          {/* Workforce Rule */}
          <div>
            <label htmlFor="workforceRule" className="block text-sm font-medium">Workforce Rule <span className="text-red-500">*</span></label>
            <select
              id="workforceRule"
              value={workforceRule}
              onChange={(e) => setWorkforceRule(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            >
              {workforceRules.map((rule) => (
                <option key={rule} value={rule}>{rule}</option>
              ))}
            </select>
          </div>

          {/* Org Level Display */}
          <div>
            <label htmlFor="orgLevelDisplay" className="block text-sm font-medium">Org Level Display <span className="text-red-500">*</span></label>
            <input
              id="orgLevelDisplay"
              type="number"
              value={orgLevelDisplay}
              onChange={(e) => setOrgLevelDisplay(parseInt(e.target.value, 10))}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || !selectedProjectId}
            />
          </div>
        </div>

        {/* Right Column (Checkboxes) */}
        {/* Adjusted space-y-4 to space-y-5 to match left column if desired, or keep at space-y-4 for slightly tighter checkbox groups */}
        <div className="space-y-5 mt-8 md:mt-0"> {/* Adjusted to space-y-5 for consistency */}
          {/* Unlock EAC Last Closed Period */}
          <div className="flex items-center space-x-2">
            <input
              id="unlockEACLastClosedPeriod"
              type="checkbox"
              checked={unlockEACLastClosedPeriod}
              onChange={(e) => setUnlockEACLastClosedPeriod(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="unlockEACLastClosedPeriod" className="text-sm">Unlock EAC Last Closed Period</label>
          </div>

          {/* Resource Budget Commit Flag Default */}
          <div className="flex items-center space-x-2">
            <input
              id="resourceBudgetCommitFlagDefault"
              type="checkbox"
              checked={resourceBudgetCommitFlagDefault}
              onChange={(e) => setResourceBudgetCommitFlagDefault(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="resourceBudgetCommitFlagDefault" className="text-sm">Resource Budget Commit Flag Default</label>
          </div>

          {/* Import Budget/EACs from Excel Commit Flag Default */}
          <div className="flex items-center space-x-2">
            <input
              id="importBudgetEACsFromExcelCommitFlagDefault"
              type="checkbox"
              checked={importBudgetEACsFromExcelCommitFlagDefault}
              onChange={(e) => setImportBudgetEACsFromExcelCommitFlagDefault(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="importBudgetEACsFromExcelCommitFlagDefault" className="text-sm">Import Budget/EACs from Excel Commit Flag Default</label>
          </div>

          {/* Import New Business Budget from Excel Commit Flag */}
          <div className="flex items-center space-x-2">
            <input
              id="importNewBusinessBudgetFromExcelCommitFlag"
              type="checkbox"
              checked={importNewBusinessBudgetFromExcelCommitFlag}
              onChange={(e) => setImportNewBusinessBudgetFromExcelCommitFlag(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="importNewBusinessBudgetFromExcelCommitFlag" className="text-sm">Import New Business Budget from Excel Commit Flag</label>
          </div>

          {/* Check the Project Budget "Enable Subtask Row Hide" option by default */}
          <div className="flex items-center space-x-2">
            <input
              id="checkTheProjectBudgetEnableSubtaskRowHideOptionByDefault"
              type="checkbox"
              checked={checkTheProjectBudgetEnableSubtaskRowHideOptionByDefault}
              onChange={(e) => setCheckTheProjectBudgetEnableSubtaskRowHideOptionByDefault(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="checkTheProjectBudgetEnableSubtaskRowHideOptionByDefault" className="text-sm">Check the Project Budget "Enable Subtask Row Hide" option by default</label>
          </div>

          {/* Enable Project "Hide Bud/EAC" */}
          <div className="flex items-center space-x-2">
            <input
              id="enableProjectHideBudEAC"
              type="checkbox"
              checked={enableProjectHideBudEAC}
              onChange={(e) => setEnableProjectHideBudEAC(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="enableProjectHideBudEAC" className="text-sm">Enable Project "Hide Bud/EAC"</label>
          </div>

          {/* Show Budget/EAC Only Default */}
          <div className="flex items-center space-x-2">
            <input
              id="showBudEACOnlyDefault"
              type="checkbox"
              checked={showBudEACOnlyDefault}
              onChange={(e) => setShowBudEACOnlyDefault(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="showBudEACOnlyDefault" className="text-sm">Show Budget/EAC Only Default</label>
          </div>

          {/* Enable Budget Auto Inspect */}
          <div className="flex items-center space-x-2">
            <input
              id="enableBudgetAutoInspect"
              type="checkbox"
              checked={enableBudgetAutoInspect}
              onChange={(e) => setEnableBudgetAutoInspect(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="enableBudgetAutoInspect" className="text-sm">Enable Budget Auto Inspect</label>
          </div>

          {/* Project Budget Sequential Locking */}
          <div className="flex items-center space-x-2">
            <input
              id="projectBudgetSequentialLocking"
              type="checkbox"
              checked={projectBudgetSequentialLocking}
              onChange={(e) => setProjectBudgetSequentialLocking(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              disabled={loading || !selectedProjectId}
            />
            <label htmlFor="projectBudgetSequentialLocking" className="text-sm">Project Budget Sequential Locking</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- New Tab Content (Organization Settings) ---
const NewTabContent = ({ onSave }) => {
  const [paidTimeOffExpenseAccount, setPaidTimeOffExpenseAccount] = useState('60-100-001');
  const [updateEmployeeHomeOrg, setUpdateEmployeeHomeOrg] = useState(false);
  const [holidayExpenseAccount, setHolidayExpenseAccount] = useState('60-100-001');
  const [updateEmployeeAccrualRate, setUpdateEmployeeAccrualRate] = useState(false);
  const [ptoCalculationMethod, setPtoCalculationMethod] = useState('Hours');
  const [applyProbabilityToNewBusinessBudgets, setApplyProbabilityToNewBusinessBudgets] = useState(false);
  const [defaultPtoAccrualRate, setDefaultPtoAccrualRate] = useState('10.000000');
  const [orgBudgetSequentialLocking, setOrgBudgetSequentialLocking] = useState(false);
  const [partTimeHolidayCalculation, setPartTimeHolidayCalculation] = useState('0.500000');
  const [defaultFeeRate, setDefaultFeeRate] = useState('0.070000');
  const [defaultUtilization, setDefaultUtilization] = useState('0.820000');
  const [laborExpenseOrgLevels, setLaborExpenseOrgLevels] = useState('4');
  const [nonLaborExpenseOrgLevels, setNonLaborExpenseOrgLevels] = useState('4');
  const [orgBudgetRevenueCalculation, setOrgBudgetRevenueCalculation] = useState('Project Plus Org Revenue Adjustment');
  const [nlabHistoryMethod, setNlabHistoryMethod] = useState('Populate GL Account History');

  const handleNumericInput = (setter) => (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*(\.[0-9]*)?$/;
    if (value === '' || regex.test(value)) {
      setter(value);
    }
  };

  // --- Handle Saving for NewTabContent ---
  const handleSaveSettings = useCallback(async () => {
    console.log("Attempting to save Organization Settings...");
    // Replace with your actual API endpoint for organization settings
    // Example: const updateApiUrl = `https://test-api-3tmq.onrender.com/Organization/UpdateSettings`;
    const updateApiUrl = `/api/save-organization-settings`; // Placeholder for your Organization Settings PUT/POST API

    const formData = {
      paidTimeOffExpenseAccount,
      updateEmployeeHomeOrg,
      holidayExpenseAccount,
      updateEmployeeAccrualRate,
      ptoCalculationMethod,
      applyProbabilityToNewBusinessBudgets,
      defaultPtoAccrualRate,
      orgBudgetSequentialLocking,
      partTimeHolidayCalculation,
      defaultFeeRate,
      defaultUtilization,
      laborExpenseOrgLevels,
      nonLaborExpenseOrgLevels,
      orgBudgetRevenueCalculation,
      nlabHistoryMethod,
    };
    console.log("Organization Settings Data to Save:", formData);

    try {
      const response = await fetch(updateApiUrl, {
        method: 'PUT', // Adjust method as per your API (PUT/POST/PATCH)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(`Failed to save settings: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Organization settings saved successfully:', result);
      alert('Organization settings saved successfully!');
    } catch (e) {
      console.error("Error saving Organization settings:", e);
      alert(`Error saving Organization settings: ${e.message}`);
    }
  }, [
    paidTimeOffExpenseAccount, updateEmployeeHomeOrg, holidayExpenseAccount, updateEmployeeAccrualRate,
    ptoCalculationMethod, applyProbabilityToNewBusinessBudgets, defaultPtoAccrualRate,
    orgBudgetSequentialLocking, partTimeHolidayCalculation, defaultFeeRate, defaultUtilization,
    laborExpenseOrgLevels, nonLaborExpenseOrgLevels, orgBudgetRevenueCalculation, nlabHistoryMethod
  ]);

  // Expose the save handler to the parent component
  useEffect(() => {
    if (onSave) {
      onSave.current = handleSaveSettings;
    }
  }, [onSave, handleSaveSettings]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-300">
      <h3 className="text-xl mb-4">Organization Settings</h3>
      {/* Changed gap-y-8 back to gap-y-5 for more compact layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Paid Time Off Expense Account */}
          <div>
            <label htmlFor="paidTimeOffExpenseAccount" className="block text-sm font-medium">Paid Time Off Expense Account <span className="text-red-500">*</span></label>
            <input
              id="paidTimeOffExpenseAccount"
              type="text"
              value={paidTimeOffExpenseAccount}
              onChange={(e) => setPaidTimeOffExpenseAccount(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Holiday Expense Account */}
          <div>
            <label htmlFor="holidayExpenseAccount" className="block text-sm font-medium">Holiday Expense Account <span className="text-red-500">*</span></label>
            <input
              id="holidayExpenseAccount"
              type="text"
              value={holidayExpenseAccount}
              onChange={(e) => setHolidayExpenseAccount(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* PTO Calculation Method */}
          <div>
            <label htmlFor="ptoCalculationMethod" className="block text-sm font-medium">PTO Calculation Method <span className="text-red-500">*</span></label>
            <select
              id="ptoCalculationMethod"
              value={ptoCalculationMethod}
              onChange={(e) => setPtoCalculationMethod(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option key="pto-hours" value="Hours">Hours</option>
            </select>
          </div>

          {/* Default PTO Accrual Rate */}
          <div>
            <label htmlFor="defaultPtoAccrualRate" className="block text-sm font-medium">Default PTO Accrual Rate <span className="text-red-500">*</span></label>
            <input
              id="defaultPtoAccrualRate"
              type="text"
              value={defaultPtoAccrualRate}
              onChange={handleNumericInput(setDefaultPtoAccrualRate)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Part-Time Holiday Calculation % */}
          <div>
            <label htmlFor="partTimeHolidayCalculation" className="block text-sm font-medium">Part-Time Holiday Calculation % <span className="text-red-500">*</span></label>
            <input
              id="partTimeHolidayCalculation"
              type="text"
              value={partTimeHolidayCalculation}
              onChange={handleNumericInput(setPartTimeHolidayCalculation)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Default Fee Rate */}
          <div>
            <label htmlFor="defaultFeeRate" className="block text-sm font-medium">Default Fee Rate <span className="text-red-500">*</span></label>
            <input
              id="defaultFeeRate"
              type="text"
              value={defaultFeeRate}
              onChange={handleNumericInput(setDefaultFeeRate)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Default Utilization % */}
          <div>
            <label htmlFor="defaultUtilization" className="block text-sm font-medium">Default Utilization % <span className="text-red-500">*</span></label>
            <input
              id="defaultUtilization"
              type="text"
              value={defaultUtilization}
              onChange={handleNumericInput(setDefaultUtilization)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Labor Expense Org Level(s) */}
          <div>
            <label htmlFor="laborExpenseOrgLevels" className="block text-sm font-medium">Labor Expense Org Level(s) <span className="text-red-500">*</span></label>
            <input
              id="laborExpenseOrgLevels"
              type="text"
              value={laborExpenseOrgLevels}
              onChange={(e) => setLaborExpenseOrgLevels(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Non-Labor Expense Org Level(s) */}
          <div>
            <label htmlFor="nonLaborExpenseOrgLevels" className="block text-sm font-medium">Non-Labor Expense Org Level(s) <span className="text-red-500">*</span></label>
            <input
              id="nonLaborExpenseOrgLevels"
              type="text"
              value={nonLaborExpenseOrgLevels}
              onChange={(e) => setNonLaborExpenseOrgLevels(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Org Budget Revenue Calculation */}
          <div>
            <label htmlFor="orgBudgetRevenueCalculation" className="block text-sm font-medium">Org Budget Revenue Calculation <span className="text-red-500">*</span></label>
            <select
              id="orgBudgetRevenueCalculation"
              value={orgBudgetRevenueCalculation}
              onChange={(e) => setOrgBudgetRevenueCalculation(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option key="org-budget-revenue-project-plus-org-revenue" value="Project Plus Org Revenue Adjustment">Project Plus Org Revenue Adjustment</option>
            </select>
          </div>

          {/* NLAB $ History Method */}
          <div>
            <label htmlFor="nlabHistoryMethod" className="block text-sm font-medium">NLAB $ History Method <span className="text-red-500">*</span></label>
            <select
              id="nlabHistoryMethod"
              value={nlabHistoryMethod}
              onChange={(e) => setNlabHistoryMethod(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option key="nlab-populate-gl-account-history" value="Populate GL Account History">Populate GL Account History</option>
            </select>
          </div>
        </div>

        {/* Right Column (Checkboxes) */}
        <div className="space-y-4"> {/* Adjusted space-y to 4 for checkboxes for slightly less spacing */}
          {/* Update Employee Home Org */}
          <div className="flex items-center space-x-2">
            <input
              id="updateEmployeeHomeOrg"
              type="checkbox"
              checked={updateEmployeeHomeOrg}
              onChange={(e) => setUpdateEmployeeHomeOrg(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="updateEmployeeHomeOrg" className="text-sm">Update Employee Home Org</label>
          </div>

          {/* Update Employee Accrual Rate */}
          <div className="flex items-center space-x-2">
            <input
              id="updateEmployeeAccrualRate"
              type="checkbox"
              checked={updateEmployeeAccrualRate}
              onChange={(e) => setUpdateEmployeeAccrualRate(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="updateEmployeeAccrualRate" className="text-sm">Update Employee Accrual Rate</label>
          </div>

          {/* Apply % Probability to New Business Budgets */}
          <div className="flex items-center space-x-2">
            <input
              id="applyProbabilityToNewBusinessBudgets"
              type="checkbox"
              checked={applyProbabilityToNewBusinessBudgets}
              onChange={(e) => setApplyProbabilityToNewBusinessBudgets(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="applyProbabilityToNewBusinessBudgets" className="text-sm">Apply % Probability to New Business Budgets</label>
          </div>

          {/* Org Budget Sequential Locking */}
          <div className="flex items-center space-x-2">
            <input
              id="orgBudgetSequentialLocking"
              type="checkbox"
              checked={orgBudgetSequentialLocking}
              onChange={(e) => setOrgBudgetSequentialLocking(e.target.checked)}
              className="rounded-md h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="orgBudgetSequentialLocking" className="text-sm">Org Budget Sequential Locking</label>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main LaborForm Component with Tabs ---
const LaborForm = () => {
  const [activeTab, setActiveTab] = useState('projectSettings'); // 'projectSettings' or 'OrganizationSettings'
  const projectSettingsSaveRef = useRef(null);
  const organizationSettingsSaveRef = useRef(null);

  const handleSaveAllSettings = async () => {
    console.log("Saving all settings...");
    // Call the save function of the active tab
    if (activeTab === 'projectSettings' && projectSettingsSaveRef.current) {
      await projectSettingsSaveRef.current();
    } else if (activeTab === 'OrganizationSettings' && organizationSettingsSaveRef.current) {
      await organizationSettingsSaveRef.current(); // Corrected to use .current()
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
      {/* Retained w-full px-8 for wider display within its parent */}
      <div className="w-full px-8 bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-300">
        <h2 className="w-full  bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">Global Configuration</h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={cn(
              "py-2 px-4 text-lg font-medium focus:outline-none",
              activeTab === 'projectSettings'
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            )}
            onClick={() => setActiveTab('projectSettings')}
          >
            Project Settings
          </button>
          <button
            className={cn(
              "py-2 px-4 text-lg font-medium focus:outline-none",
              activeTab === 'OrganizationSettings'
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            )}
            onClick={() => setActiveTab('OrganizationSettings')}
          >
            Organization Settings
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'projectSettings' && <LaborFormContent onSave={projectSettingsSaveRef} />}
          {activeTab === 'OrganizationSettings' && <NewTabContent onSave={organizationSettingsSaveRef} />}
        </div>

        {/* Submit button for the whole form - can be moved inside each tab if needed */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSaveAllSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaborForm;
