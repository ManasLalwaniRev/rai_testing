import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectHoursDetails from './ProjectHoursDetails';
import ProjectPlanTable from './ProjectPlanTable';
import RevenueAnalysisTable from './RevenueAnalysisTable';

const ProjectBudgetStatus = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showHours, setShowHours] = useState(false);
  const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
  const [hoursProjectId, setHoursProjectId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [isForecastLoading, setIsForecastLoading] = useState(false);
  const hoursRefs = useRef({});
  const inputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://test-api-3tmq.onrender.com/Project/GetAllProjects')
      .then((res) => {
        const transformedData = res.data.map((project) => ({
          projId: project.projectId,
          projName: project.name,
          projTypeDc: project.description,
          orgId: project.orgId,
          projMgrName: 'Manager Name',
          startDate: project.startDate,
          endDate: project.endDate,
        }));
        setProjects(transformedData);
        setLoading(false);
      })
      .catch(() => {
        console.error('Error fetching projects');
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term === '') {
      setFilteredProjects([]);
      setSearched(true);
      return;
    }
    setLoading(true);
    const filtered = projects.filter((p) => p.projId.toLowerCase() === term);
    setFilteredProjects(filtered);
    setSearched(true);
    setLoading(false);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredProjects([]);
      setSearched(false);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matches = projects
      .filter((p) => p.projId.toLowerCase().startsWith(value.toLowerCase()))
      .map((p) => p.projId);
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSuggestionClick = (projId) => {
    setSearchTerm(projId);
    setShowSuggestions(false);
    const filtered = projects.filter((p) => p.projId.toLowerCase() === projId.toLowerCase());
    setFilteredProjects(filtered);
    setSearched(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowHours(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setForecastData([]);
    setIsForecastLoading(false);
  };

  const handleHoursTabClick = async (projId) => {
    if (!selectedPlan) {
      setShowHours(false);
      setHoursProjectId(null);
      setForecastData([]);
      setIsForecastLoading(false);
      return;
    }
    if (showHours && hoursProjectId === projId) {
      setShowHours(false);
      setHoursProjectId(null);
      setForecastData([]);
      setIsForecastLoading(false);
    } else {
      setShowHours(true);
      setHoursProjectId(projId);
      setShowRevenueAnalysis(false);
      setIsForecastLoading(true);

      try {
        const employeeApi =
          selectedPlan.plType === 'EAC'
            ? `https://test-api-3tmq.onrender.com/Project/GetEACDataByPlanId/${selectedPlan.plId}`
            : `https://test-api-3tmq.onrender.com/Project/GetForecastDataByPlanId/${selectedPlan.plId}`;
        console.log('Fetching forecast data from:', employeeApi);
        const response = await axios.get(employeeApi);
        if (!Array.isArray(response.data)) {
          console.error('Invalid forecast data format:', response.data);
          setForecastData([]);
        } else {
          setForecastData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch forecast data:', err.message, err.response?.data);
        setForecastData([]);
      } finally {
        setIsForecastLoading(false);
      }
    }
  };

  const handleRevenueAnalysisTabClick = () => {
    if (!selectedPlan) {
      setShowRevenueAnalysis(false);
      return;
    }
    if (showRevenueAnalysis) {
      setShowRevenueAnalysis(false);
    } else {
      setShowRevenueAnalysis(true);
      setShowHours(false);
      setHoursProjectId(null);
    }
  };

  useEffect(() => {
    if (showHours && hoursProjectId && selectedPlan) {
      const ref = hoursRefs.current[hoursProjectId];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [showHours, hoursProjectId, selectedPlan]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 font-inter">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600 text-sm sm:text-base">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        closeButton
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
          <label className="font-semibold text-xs sm:text-sm">Project ID:</label>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search Project ID"
              className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              autoComplete="off"
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
            />
            {showSuggestions && (
              <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto shadow">
                {suggestions.map((projId, idx) => (
                  <li
                    key={projId + idx}
                    className="px-3 py-1 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm"
                    onMouseDown={() => handleSuggestionClick(projId)}
                  >
                    {projId}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-medium hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500 italic text-xs sm:text-sm">Loading...</div>
      ) : searched && filteredProjects.length === 0 ? (
        <div className="text-gray-500 italic text-xs sm:text-sm">No project found with that ID.</div>
      ) : (
        filteredProjects.map((project) => {
          if (!hoursRefs.current[project.projId]) {
            hoursRefs.current[project.projId] = React.createRef();
          }

          return (
            <div
              key={project.projId}
              className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
            >
              <h2 className="font-semibold text-sm sm:text-base text-blue-600">Project: {project.projId}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                <Field label="Project" value={project.projId} />
                <Field label="Project Name" value={project.projName} />
                <Field label="Description" value={project.projTypeDc} />
                <Field label="Organization" value={project.orgId} />
                <Field label="Start Date" value={project.startDate} />
                <Field label="End Date" value={project.endDate} />
              </div>

              <ProjectPlanTable
                projectId={project.projId}
                onPlanSelect={handlePlanSelect}
                selectedPlan={selectedPlan}
              />

              <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
                <span
                  className={`cursor-pointer ${showHours && hoursProjectId === project.projId ? 'font-semibold text-blue-800' : ''}`}
                  onClick={() => handleHoursTabClick(project.projId)}
                >
                  Hours
                </span>
                <span
                  className={`cursor-pointer ${showRevenueAnalysis ? 'font-semibold text-blue-800' : ''}`}
                  onClick={handleRevenueAnalysisTabClick}
                >
                  Revenue Analysis
                </span>
              </div>

              {showRevenueAnalysis && selectedPlan && (
                <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
                  <div className="mb-4 text-xs sm:text-sm text-gray-800">
                    <span className="font-semibold">Project ID:</span> {selectedPlan.projId || project.projId},{' '}
                    <span className="font-semibold">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
                    <span className="font-semibold">Version:</span> {selectedPlan.version || 'N/A'},{' '}
                    <span className="font-semibold">Status:</span> {selectedPlan.status || 'N/A'}
                  </div>
                  <RevenueAnalysisTable planId={selectedPlan.plId} status={selectedPlan.status} />
                </div>
              )}

              {!showRevenueAnalysis && showHours && selectedPlan && hoursProjectId === project.projId && (
                <div
                  ref={hoursRefs.current[project.projId]}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <div className="mb-4 text-xs sm:text-sm text-gray-800">
                    <span className="font-semibold">Project ID:</span> {selectedPlan.projId || project.projId},{' '}
                    <span className="font-semibold">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
                    <span className="font-semibold">Version:</span> {selectedPlan.version || 'N/A'},{' '}
                    <span className="font-semibold">Status:</span> {selectedPlan.status || 'N/A'}
                  </div>
                  <ProjectHoursDetails
                    planId={selectedPlan.plId}
                    status={selectedPlan.status}
                    planType={selectedPlan.plType}
                    closedPeriod={selectedPlan.closedPeriod}
                    startDate={project.startDate}
                    endDate={project.endDate}
                    employees={forecastData}
                    isForecastLoading={isForecastLoading}
                  />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
    <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">{label}:</label>
    <input
      type="text"
      className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      defaultValue={value || ''}
      readOnly
    />
  </div>
);

export default ProjectBudgetStatus;