// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectHoursDetails from './ProjectHoursDetails';
// import ProjectPlanTable from './ProjectPlanTable';
// import RevenueAnalysisTable from './RevenueAnalysisTable';
// import AnalysisByPeriodContent from './AnalysisByPeriodContent';
// import ProjectAmountsTable from './ProjectAmountsTable';

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [showHours, setShowHours] = useState(false);
//   const [showAmounts, setShowAmounts] = useState(false);
//   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
//   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
//   const [hoursProjectId, setHoursProjectId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString());

//   // Refs for scrolling and suggestions
//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   // Fetch projects and extract prefixes
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('https://test-api-3tmq.onrender.com/Project/GetAllProjects')
//       .then((res) => {
//         const transformedData = res.data.map((project) => ({
//           projId: project.projectId,
//           projName: project.name,
//           projTypeDc: project.description,
//           orgId: project.orgId,
//           startDate: project.startDate,
//           endDate: project.endDate,
//         }));
//         const prefixSet = new Set(
//           transformedData.map((project) => {
//             const { projId } = project;
//             if (projId.includes('.')) {
//               return projId.split('.')[0];
//             } else if (projId.includes('T')) {
//               return projId.split('T')[0];
//             }
//             return projId;
//           })
//         );
//         setPrefixes(prefixSet);
//         setProjects(transformedData);
//         setLoading(false);
//       })
//       .catch(() => {
//         setProjects([]);
//         setPrefixes(new Set());
//         setFilteredProjects([]);
//         setLoading(false);
//       });
//   }, []);

//   // Handle click outside and Escape key to close suggestions
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         suggestionsRef.current &&
//         !suggestionsRef.current.contains(event.target) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target)
//       ) {
//         setShowSuggestions(false);
//       }
//     };
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   // Scroll to the active tab section when show* state changes
//   useEffect(() => {
//     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
//       setTimeout(() => {
//         hoursRefs.current[hoursProjectId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     } else if (showAmounts && amountsRefs.current[searchTerm]) {
//       setTimeout(() => {
//         amountsRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
//       setTimeout(() => {
//         revenueRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
//       setTimeout(() => {
//         analysisRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     }
//   }, [showHours, showAmounts, showRevenueAnalysis, showAnalysisByPeriod, hoursProjectId, searchTerm]);

//   const handleSearch = () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage('');
//     setShowSuggestions(false);

//     if (term === '') {
//       setFilteredProjects([]);
//       return;
//     }

//     if (!Array.from(prefixes).some((prefix) => prefix.toLowerCase() === term.toLowerCase())) {
//       setErrorMessage('Search valid project ID');
//       setFilteredProjects([]);
//       return;
//     }

//     const filtered = projects.filter((p) =>
//       p.projId.toLowerCase().startsWith(term.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//     setErrorMessage('');
//     setSearched(false);
//     setFilteredProjects([]);
//     setShowSuggestions(e.target.value.trim().length > 0);
//   };

//   const handleSuggestionClick = (prefix) => {
//     setSearchTerm(prefix);
//     setShowSuggestions(false);
//     setSearched(true);
//     setErrorMessage('');

//     const filtered = projects.filter((p) =>
//       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setShowHours(false);
//     setShowAmounts(false);
//     setHoursProjectId(null);
//     setShowRevenueAnalysis(false);
//     setShowAnalysisByPeriod(false);
//     setForecastData([]);
//     setIsForecastLoading(false);
//   };

//   const handleHoursTabClick = async (projId) => {
//     if (!selectedPlan) {
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       return;
//     }
//     if (showHours && hoursProjectId === projId) {
//       setShowHours(false);
//       setHoursProjectId(null);
//       setShowAnalysisByPeriod(false);
//       setForecastData([]);
//       setIsForecastLoading(false);
//     } else {
//       setShowHours(true);
//       setShowAmounts(false);
//       setHoursProjectId(projId);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setIsForecastLoading(true);

//       try {
//         const employeeApi =
//           selectedPlan.plType === 'EAC'
//             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//         const response = await axios.get(employeeApi);
//         if (!Array.isArray(response.data)) {
//           setForecastData([]);
//           toast.info('No forecast data available for this plan. Click "New" to add entries.', {
//             toastId: 'no-forecast-data',
//             autoClose: 3000,
//           });
//         } else {
//           setForecastData(response.data);
//         }
//       } catch (err) {
//         setForecastData([]);
//         if (err.response && err.response.status === 500) {
//           toast.info('No forecast data available for this plan. Click "New" to add entries.', {
//             toastId: 'no-forecast-data',
//             autoClose: 3000,
//           });
//         } else {
//           toast.error('Failed to load forecast data: ' + (err.response?.data?.message || err.message), {
//             toastId: 'forecast-error',
//             autoClose: 3000,
//           });
//         }
//       } finally {
//         setIsForecastLoading(false);
//       }
//     }
//   };

//   const handleAmountsTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAmounts(false);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       return;
//     }
//     if (showAmounts) {
//       setShowAmounts(false);
//     } else {
//       setShowAmounts(true);
//       setShowHours(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//     }
//   };

//   const handleRevenueAnalysisTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       return;
//     }
//     if (showRevenueAnalysis) {
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//     } else {
//       setShowRevenueAnalysis(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowAnalysisByPeriod(false);
//     }
//   };

//   const handleAnalysisByPeriodTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAnalysisByPeriod(false);
//       setShowRevenueAnalysis(false);
//       return;
//     }
//     if (showAnalysisByPeriod) {
//       setShowAnalysisByPeriod(false);
//     } else {
//       setShowAnalysisByPeriod(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//     }
//   };

//   const handleAnalysisCancel = () => {
//     setShowAnalysisByPeriod(false);
//     setShowHours(false);
//     setShowAmounts(false);
//     setShowRevenueAnalysis(false);
//     setHoursProjectId(null);
//     toast.info('Analysis By Period cancelled.', {
//       toastId: 'analysis-cancel',
//       autoClose: 3000,
//     });
//   };

//   if (loading && projects.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64 font-inter">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm sm:text-base">Loading...</span>
//       </div>
//     );
//   }

//   // Filter suggestions based on searchTerm
//   const suggestions = Array.from(prefixes).filter((prefix) =>
//     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
//   );

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         closeButton
//       />
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
//           <label className="font-semibold text-xs sm:text-sm">Project ID:</label>
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               value={searchTerm}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyPress}
//               ref={inputRef}
//               autoComplete="off"
//             />
//             {showSuggestions && suggestions.length > 0 && (
//               <div
//                 ref={suggestionsRef}
//                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
//               >
//                 {suggestions.map((prefix) => (
//                   <div
//                     key={prefix}
//                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
//                     onClick={() => handleSuggestionClick(prefix)}
//                   >
//                     {prefix}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             onClick={handleSearch}
//             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">Loading...</div>
//       ) : searched && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">{errorMessage}</div>
//       ) : searched && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">No project found with that ID.</div>
//       ) : (
//         filteredProjects.length > 0 && (
//           <div
//             key={searchTerm}
//             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//           >
//             <h2 className="font-normal text-sm sm:text-base text-blue-600">Project: {searchTerm}</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
//               <Field label="Project" value={searchTerm} />
//               <Field label="Project Name" value={filteredProjects[0].projName} />
//               <Field label="Description" value={filteredProjects[0].projTypeDc} />
//               <Field label="Organization" value={filteredProjects[0].orgId} />
//               <Field label="Start Date" value={filteredProjects[0].startDate} />
//               <Field label="End Date" value={filteredProjects[0].endDate} />
//             </div>

//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//             />

//             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
//               <span
//                 className={`cursor-pointer ${showHours && hoursProjectId === searchTerm ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleHoursTabClick(searchTerm)}
//               >
//                 Hours
//               </span>
//               <span
//                 className={`cursor-pointer ${showAmounts ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleAmountsTabClick(searchTerm)}
//               >
//                 Amounts
//               </span>
//               <span
//                 className={`cursor-pointer ${showRevenueAnalysis ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
//               >
//                 Revenue Analysis
//               </span>
//               <span
//                 className={`cursor-pointer ${showAnalysisByPeriod ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
//               >
//                 Analysis By Period
//               </span>
//             </div>

//             {showHours && selectedPlan && hoursProjectId === searchTerm && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   employees={forecastData}
//                   isForecastLoading={isForecastLoading}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {showAmounts && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (amountsRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <ProjectAmountsTable
//                   initialData={selectedPlan}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   planType={selectedPlan.plType}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {showRevenueAnalysis && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (revenueRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <RevenueAnalysisTable
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {showAnalysisByPeriod && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (analysisRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 {/* <AnalysisByPeriodContent
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                   onAnalysisCancel={handleAnalysisCancel}
//                 /> */}
//                   <AnalysisByPeriodContent
//                     onAnalysisCancel={handleAnalysisCancel}
//                     planID={selectedPlan.plId}
//                     templateId={selectedPlan.templateId || 1} // Assuming templateId defaults to 1 if not present
//                     type={selectedPlan.plType || 'TARGET'} // Assuming 'TARGET' as a default type
//                     initialApiData={analysisApiData} // Pass the fetched data
//                     isLoading={isAnalysisLoading} // Pass loading state
//                     error={analysisError} // Pass error state
//                   />
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// const Field = ({ label, value }) => (
//   <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
//     <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">{label}:</label>
//     <input
//       type="text"
//       className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//       defaultValue={value || ''}
//       readOnly
//     />
//   </div>
// );

// export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectHoursDetails from './ProjectHoursDetails';
// import ProjectPlanTable from './ProjectPlanTable';
// import RevenueAnalysisTable from './RevenueAnalysisTable';
// import AnalysisByPeriodContent from './AnalysisByPeriodContent';
// import ProjectAmountsTable from './ProjectAmountsTable';

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [showHours, setShowHours] = useState(false);
//   const [showAmounts, setShowAmounts] = useState(false);
//   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
//   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
//   const [hoursProjectId, setHoursProjectId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString());
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
  
  

//   // Refs for scrolling and suggestions
//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   // Constants for external API (moved from route.ts)
//   const EXTERNAL_API_BASE_URL = 'https://test-api-3tmq.onrender.com';
//   const CALCULATE_COST_ENDPOINT = '/Forecast/CalculateCost';

//   // Fetch projects and extract prefixes
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('https://test-api-3tmq.onrender.com/Project/GetAllProjects')
//       .then((res) => {
//         const transformedData = res.data.map((project) => ({
//           projId: project.projectId,
//           projName: project.name,
//           projTypeDc: project.description,
//           orgId: project.orgId,
//           startDate: project.startDate,
//           endDate: project.endDate,
//         }));
//         const prefixSet = new Set(
//           transformedData.map((project) => {
//             const { projId } = project;
//             if (projId.includes('.')) {
//               return projId.split('.')[0];
//             } else if (projId.includes('T')) {
//               return projId.split('T')[0];
//             }
//             return projId;
//           })
//         );
//         setPrefixes(prefixSet);
//         setProjects(transformedData);
//         setLoading(false);
//       })
//       .catch(() => {
//         setProjects([]);
//         setPrefixes(new Set());
//         setFilteredProjects([]);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//       const fetchAnalysisData = async () => {
//         if (!selectedPlan || !selectedPlan.plId || !selectedPlan.templateId || !selectedPlan.plType) {
//           setAnalysisApiData(null);
//           setIsAnalysisLoading(false);
//           setAnalysisError('Please select a plan to view Analysis By Period.');
//           return;
//         }
  
//         setIsAnalysisLoading(true);
//         setAnalysisError(null);
//         try {
//           const params = new URLSearchParams({
//             planID: selectedPlan.plId.toString(),
//             templateId: selectedPlan.templateId.toString(),
//             type: selectedPlan.plType
//           });
//           const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
//           console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);
  
//           const response = await fetch(externalApiUrl, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             cache: 'no-store',
//           });
  
//           if (!response.ok) {
//             let errorText = 'Unknown error';
//             try {
//               const errorJson = await response.json();
//               errorText = errorJson.message || JSON.stringify(errorJson);
//             } catch (e) {
//               errorText = await response.text();
//             }
//             throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
//           }
  
//           const apiResponse = await response.json();
//           setAnalysisApiData(apiResponse);
//         } catch (err) {
//           console.error("Analysis By Period fetch error:", err);
//           setAnalysisError(`Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`);
//           setAnalysisApiData(null);
//         } finally {
//           setIsAnalysisLoading(false);
//         }
//       };
  
//       fetchAnalysisData();
//     }, [selectedPlan, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   // Handle click outside and Escape key to close suggestions
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         suggestionsRef.current &&
//         !suggestionsRef.current.contains(event.target) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target)
//       ) {
//         setShowSuggestions(false);
//       }
//     };
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   // Scroll to the active tab section when show* state changes
//   useEffect(() => {
//     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
//       setTimeout(() => {
//         hoursRefs.current[hoursProjectId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     } else if (showAmounts && amountsRefs.current[searchTerm]) {
//       setTimeout(() => {
//         amountsRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
//       setTimeout(() => {
//         revenueRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
//       setTimeout(() => {
//         analysisRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }, 150);
//     }
//   }, [showHours, showAmounts, showRevenueAnalysis, showAnalysisByPeriod, hoursProjectId, searchTerm]);

//   const handleSearch = () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage('');
//     setShowSuggestions(false);

//     if (term === '') {
//       setFilteredProjects([]);
//       return;
//     }

//     if (!Array.from(prefixes).some((prefix) => prefix.toLowerCase() === term.toLowerCase())) {
//       setErrorMessage('Search valid project ID');
//       setFilteredProjects([]);
//       return;
//     }

//     const filtered = projects.filter((p) =>
//       p.projId.toLowerCase().startsWith(term.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//     setErrorMessage('');
//     setSearched(false);
//     setFilteredProjects([]);
//     setShowSuggestions(e.target.value.trim().length > 0);
//   };

//   const handleSuggestionClick = (prefix) => {
//     setSearchTerm(prefix);
//     setShowSuggestions(false);
//     setSearched(true);
//     setErrorMessage('');

//     const filtered = projects.filter((p) =>
//       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setShowHours(false);
//     setShowAmounts(false);
//     setHoursProjectId(null);
//     setShowRevenueAnalysis(false);
//     setShowAnalysisByPeriod(false);
//     setForecastData([]);
//     setIsForecastLoading(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//   };

  

//   const handleHoursTabClick = async (projId) => {
//     if (!selectedPlan) {
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }
//     if (showHours && hoursProjectId === projId) {
//       setShowHours(false);
//       setHoursProjectId(null);
//       setShowAnalysisByPeriod(false);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     } else {
//       setShowHours(true);
//       setShowAmounts(false);
//       setHoursProjectId(projId);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setIsForecastLoading(true);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);

//       try {
//         const employeeApi =
//           selectedPlan.plType === 'EAC'
//             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//         const response = await axios.get(employeeApi);
//         if (!Array.isArray(response.data)) {
//           setForecastData([]);
//           toast.info('No forecast data available for this plan. Click "New" to add entries.', {
//             toastId: 'no-forecast-data',
//             autoClose: 3000,
//           });
//         } else {
//           setForecastData(response.data);
//         }
//       } catch (err) {
//         setForecastData([]);
//         if (err.response && err.response.status === 500) {
//           toast.info('No forecast data available for this plan. Click "New" to add entries.', {
//             toastId: 'no-forecast-data',
//             autoClose: 3000,
//           });
//         } else {
//           toast.error('Failed to load forecast data: ' + (err.response?.data?.message || err.message), {
//             toastId: 'forecast-error',
//             autoClose: 3000,
//           });
//         }
//       } finally {
//         setIsForecastLoading(false);
//       }
//     }
//   };

//   const handleAmountsTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAmounts(false);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }
//     if (showAmounts) {
//       setShowAmounts(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     } else {
//       setShowAmounts(true);
//       setShowHours(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleRevenueAnalysisTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }
//     if (showRevenueAnalysis) {
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     } else {
//       setShowRevenueAnalysis(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   // const handleAnalysisByPeriodTabClick = async (projId) => {
//   //   if (!selectedPlan) {
//   //     setShowAnalysisByPeriod(false);
//   //     setShowRevenueAnalysis(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //     return;
//   //   }
//   //   if (showAnalysisByPeriod) {
//   //     setShowAnalysisByPeriod(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //   } else {
//   //     setShowAnalysisByPeriod(true);
//   //     setShowHours(false);
//   //     setShowAmounts(false);
//   //     setHoursProjectId(null);
//   //     setShowRevenueAnalysis(false);
//   //     setIsAnalysisLoading(true);

//   //     try {
//   //       const response = await axios.get(
//   //         `https://test-api-3tmq.onrender.com/Analysis/GetAnalysisByPeriod?planId=${selectedPlan.plId}&fiscalYear=${fiscalYear}`,
//   //         { headers: { "Cache-Control": "no-cache" } }
//   //       );
//   //       console.log("Analysis By Period API Response:", response.data); // Debug log
//   //       if (!Array.isArray(response.data)) {
//   //         setAnalysisApiData([]);
//   //         toast.info('No analysis data available for this plan.', {
//   //           toastId: 'no-analysis-data',
//   //           autoClose: 3000,
//   //         });
//   //       } else {
//   //         setAnalysisApiData(response.data);
//   //       }
//   //     } catch (err) {
//   //       setAnalysisApiData([]);
//   //       setAnalysisError('Failed to load analysis data. Please try again.');
//   //       toast.error(`Failed to load analysis data: ${err.response?.data?.message || err.message}`, {
//   //         toastId: 'analysis-fetch-error',
//   //         autoClose: 3000,
//   //       });
//   //     } finally {
//   //       setIsAnalysisLoading(false);
//   //     }
//   //   }
//   // };
  
//   const handleAnalysisByPeriodTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAnalysisByPeriod(false);
//       setShowRevenueAnalysis(false);
//       return;
//     }
//     if (showAnalysisByPeriod) {
//       setShowAnalysisByPeriod(false);
//     } else {
//       setShowAnalysisByPeriod(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setTimeout(() => {
//         const ref = analysisRefs.current[projId];
//         if (ref && ref.current) {
//           ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       }, 100);
//     }
//   };

//   const onAnalysisCancel = () => {
//     setShowAnalysisByPeriod(false);
//   };

//   const handleAnalysisCancel = () => {
//     setShowAnalysisByPeriod(false);
//     setShowHours(false);
//     setShowAmounts(false);
//     setShowRevenueAnalysis(false);
//     setHoursProjectId(null);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//     toast.info('Analysis By Period cancelled.', {
//       toastId: 'analysis-cancel',
//       autoClose: 3000,
//     });
//   };

//   if (loading && projects.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64 font-inter">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm sm:text-base">Loading...</span>
//       </div>
//     );
//   }

//   // Filter suggestions based on searchTerm
//   const suggestions = Array.from(prefixes).filter((prefix) =>
//     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
//   );

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         closeButton
//       />
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
//           <label className="font-semibold text-xs sm:text-sm">Project ID:</label>
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//               value={searchTerm}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyPress}
//               ref={inputRef}
//               autoComplete="off"
//             />
//             {showSuggestions && suggestions.length > 0 && (
//               <div
//                 ref={suggestionsRef}
//                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
//               >
//                 {suggestions.map((prefix) => (
//                   <div
//                     key={prefix}
//                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
//                     onClick={() => handleSuggestionClick(prefix)}
//                   >
//                     {prefix}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             onClick={handleSearch}
//             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">Loading...</div>
//       ) : searched && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">{errorMessage}</div>
//       ) : searched && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">No project found with that ID.</div>
//       ) : (
//         filteredProjects.length > 0 && (
//           <div
//             key={searchTerm}
//             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//           >
//             <h2 className="font-normal text-sm sm:text-base text-blue-600">Project: {searchTerm}</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
//               <Field label="Project" value={searchTerm} />
//               <Field label="Project Name" value={filteredProjects[0].projName} />
//               <Field label="Description" value={filteredProjects[0].projTypeDc} />
//               <Field label="Organization" value={filteredProjects[0].orgId} />
//               <Field label="Start Date" value={filteredProjects[0].startDate} />
//               <Field label="End Date" value={filteredProjects[0].endDate} />
//             </div>

//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//             />

//             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
//               <span
//                 className={`cursor-pointer ${showHours && hoursProjectId === searchTerm ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleHoursTabClick(searchTerm)}
//               >
//                 Hours
//               </span>
//               <span
//                 className={`cursor-pointer ${showAmounts ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleAmountsTabClick(searchTerm)}
//               >
//                 Amounts
//               </span>
//               <span
//                 className={`cursor-pointer ${showRevenueAnalysis ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
//               >
//                 Revenue Analysis
//               </span>
//               <span
//                 className={`cursor-pointer ${showAnalysisByPeriod ? 'font-normal text-blue-800' : ''}`}
//                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
//               >
//                 Analysis By Period
//               </span>
//             </div>

//             {showHours && selectedPlan && hoursProjectId === searchTerm && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   employees={forecastData}
//                   isForecastLoading={isForecastLoading}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {showAmounts && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (amountsRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <ProjectAmountsTable
//                   initialData={selectedPlan}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   planType={selectedPlan.plType}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {showRevenueAnalysis && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (revenueRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <RevenueAnalysisTable
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {showAnalysisByPeriod && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (analysisRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
//                   <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
//                   <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
//                   <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
//                 </div>
//                 <AnalysisByPeriodContent
//                     onCancel={onAnalysisCancel}
//                     planID={selectedPlan.plId}
//                     templateId={selectedPlan.templateId || 1} // Assuming templateId defaults to 1 if not present
//                     type={selectedPlan.plType || 'TARGET'} // Assuming 'TARGET' as a default type
//                     initialApiData={analysisApiData} // Pass the fetched data
//                     isLoading={isAnalysisLoading} // Pass loading state
//                     error={analysisError} // Pass error state
//                   />
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// const Field = ({ label, value }) => (
//   <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
//     <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">{label}:</label>
//     <input
//       type="text"
//       className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//       defaultValue={value || ''}
//       readOnly
//     />
//   </div>
// );

// export default ProjectBudgetStatus;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectHoursDetails from './ProjectHoursDetails';
import ProjectPlanTable from './ProjectPlanTable';
import RevenueAnalysisTable from './RevenueAnalysisTable';
import AnalysisByPeriodContent from './AnalysisByPeriodContent';
import ProjectAmountsTable from './ProjectAmountsTable';

const ProjectBudgetStatus = () => {
  const [projects, setProjects] = useState([]);
  const [prefixes, setPrefixes] = useState(new Set());
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showHours, setShowHours] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
  const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
  const [hoursProjectId, setHoursProjectId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [isForecastLoading, setIsForecastLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString());
  const [analysisApiData, setAnalysisApiData] = useState([]);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  // Refs for scrolling and suggestions
  const hoursRefs = useRef({});
  const amountsRefs = useRef({});
  const revenueRefs = useRef({});
  const analysisRefs = useRef({});
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Constants for external API
  const EXTERNAL_API_BASE_URL = 'https://test-api-3tmq.onrender.com';
  const CALCULATE_COST_ENDPOINT = '/Forecast/CalculateCost';

  // Fetch projects and extract prefixes
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
          startDate: project.startDate,
          endDate: project.endDate,
        }));
        const prefixSet = new Set(
          transformedData.map((project) => {
            const { projId } = project;
            if (projId.includes('.')) {
              return projId.split('.')[0];
            } else if (projId.includes('T')) {
              return projId.split('T')[0];
            }
            return projId;
          })
        );
        setPrefixes(prefixSet);
        setProjects(transformedData);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setPrefixes(new Set());
        setFilteredProjects([]);
        setLoading(false);
      });
  }, []);

  // Fetch analysis data when selectedPlan changes or Analysis By Period tab is activated
  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!selectedPlan || !selectedPlan.plId || !selectedPlan.templateId || !selectedPlan.plType) {
        setAnalysisApiData([]);
        setIsAnalysisLoading(false);
        setAnalysisError('Please select a plan to view Analysis By Period.');
        return;
      }

      if (!showAnalysisByPeriod) return; // Only fetch if Analysis By Period tab is active

      setIsAnalysisLoading(true);
      setAnalysisError(null);
      try {
        const params = new URLSearchParams({
          planID: selectedPlan.plId.toString(),
          templateId: selectedPlan.templateId.toString(),
          type: selectedPlan.plType,
        });
        const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
        console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

        const response = await fetch(externalApiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          let errorText = 'Unknown error';
          try {
            const errorJson = await response.json();
            errorText = errorJson.message || JSON.stringify(errorJson);
          } catch (e) {
            errorText = await response.text();
          }
          throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
        }

        const apiResponse = await response.json();
        setAnalysisApiData(apiResponse);
      } catch (err) {
        console.error('Analysis By Period fetch error:', err);
        setAnalysisError(
          `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
        );
        setAnalysisApiData([]);
      } finally {
        setIsAnalysisLoading(false);
      }
    };

    fetchAnalysisData();
  }, [selectedPlan, showAnalysisByPeriod, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

  // Handle click outside and Escape key to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Scroll to the active tab section when show* state changes
  useEffect(() => {
    if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
      setTimeout(() => {
        hoursRefs.current[hoursProjectId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else if (showAmounts && amountsRefs.current[searchTerm]) {
      setTimeout(() => {
        amountsRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
      setTimeout(() => {
        revenueRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
      setTimeout(() => {
        analysisRefs.current[searchTerm]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [showHours, showAmounts, showRevenueAnalysis, showAnalysisByPeriod, hoursProjectId, searchTerm]);

  const handleSearch = () => {
    const term = searchTerm.trim();
    setSearched(true);
    setErrorMessage('');
    setShowSuggestions(false);

    if (term === '') {
      setFilteredProjects([]);
      return;
    }

    if (!Array.from(prefixes).some((prefix) => prefix.toLowerCase() === term.toLowerCase())) {
      setErrorMessage('Search valid project ID');
      setFilteredProjects([]);
      return;
    }

    const filtered = projects.filter((p) =>
      p.projId.toLowerCase().startsWith(term.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage('');
    setSearched(false);
    setFilteredProjects([]);
    setShowSuggestions(e.target.value.trim().length > 0);
  };

  const handleSuggestionClick = (prefix) => {
    setSearchTerm(prefix);
    setShowSuggestions(false);
    setSearched(true);
    setErrorMessage('');

    const filtered = projects.filter((p) =>
      p.projId.toLowerCase().startsWith(prefix.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowAnalysisByPeriod(false);
    setForecastData([]);
    setIsForecastLoading(false);
    setAnalysisApiData([]);
    setIsAnalysisLoading(false);
    setAnalysisError(null);
  };

  const handleHoursTabClick = async (projId) => {
    if (!selectedPlan) {
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setForecastData([]);
      setIsForecastLoading(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
      return;
    }
    if (showHours && hoursProjectId === projId) {
      setShowHours(false);
      setHoursProjectId(null);
      setShowAnalysisByPeriod(false);
      setForecastData([]);
      setIsForecastLoading(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    } else {
      setShowHours(true);
      setShowAmounts(false);
      setHoursProjectId(projId);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setIsForecastLoading(true);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);

      try {
        const employeeApi =
          selectedPlan.plType === 'EAC'
            ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
            : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
        const response = await axios.get(employeeApi);
        if (!Array.isArray(response.data)) {
          setForecastData([]);
          toast.info('No forecast data available for this plan. Click "New" to add entries.', {
            toastId: 'no-forecast-data',
            autoClose: 3000,
          });
        } else {
          setForecastData(response.data);
        }
      } catch (err) {
        setForecastData([]);
        if (err.response && err.response.status === 500) {
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
        setIsForecastLoading(false);
      }
    }
  };

  const handleAmountsTabClick = (projId) => {
    if (!selectedPlan) {
      setShowAmounts(false);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
      return;
    }
    if (showAmounts) {
      setShowAmounts(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    } else {
      setShowAmounts(true);
      setShowHours(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    }
  };

  const handleRevenueAnalysisTabClick = (projId) => {
    if (!selectedPlan) {
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
      return;
    }
    if (showRevenueAnalysis) {
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    } else {
      setShowRevenueAnalysis(true);
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowAnalysisByPeriod(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    }
  };

  const handleAnalysisByPeriodTabClick = (projId) => {
    if (!selectedPlan) {
      setShowAnalysisByPeriod(false);
      setShowRevenueAnalysis(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
      return;
    }
    if (showAnalysisByPeriod) {
      setShowAnalysisByPeriod(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    } else {
      setShowAnalysisByPeriod(true);
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      // Data fetch is handled by useEffect, no need to reset analysisApiData here
      setTimeout(() => {
        const ref = analysisRefs.current[projId];
        if (ref) {
          ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const onAnalysisCancel = () => {
    setShowAnalysisByPeriod(false);
    setAnalysisApiData([]);
    setIsAnalysisLoading(false);
    setAnalysisError(null);
  };

  const handleAnalysisCancel = () => {
    setShowAnalysisByPeriod(false);
    setShowHours(false);
    setShowAmounts(false);
    setShowRevenueAnalysis(false);
    setHoursProjectId(null);
    setAnalysisApiData([]);
    setIsAnalysisLoading(false);
    setAnalysisError(null);
    toast.info('Analysis By Period cancelled.', {
      toastId: 'analysis-cancel',
      autoClose: 3000,
    });
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 font-inter">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600 text-sm sm:text-base">Loading...</span>
      </div>
    );
  }

  // Filter suggestions based on searchTerm
  const suggestions = Array.from(prefixes).filter((prefix) =>
    prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
  );

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
              className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
              >
                {suggestions.map((prefix) => (
                  <div
                    key={prefix}
                    className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(prefix)}
                  >
                    {prefix}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-500 italic text-xs sm:text-sm">Loading...</div>
      ) : searched && errorMessage ? (
        <div className="text-red-500 italic text-xs sm:text-sm">{errorMessage}</div>
      ) : searched && filteredProjects.length === 0 ? (
        <div className="text-gray-500 italic text-xs sm:text-sm">No project found with that ID.</div>
      ) : (
        filteredProjects.length > 0 && (
          <div
            key={searchTerm}
            className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
          >
            <h2 className="font-normal text-sm sm:text-base text-blue-600">Project: {searchTerm}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              <Field label="Project" value={searchTerm} />
              <Field label="Project Name" value={filteredProjects[0].projName} />
              <Field label="Description" value={filteredProjects[0].projTypeDc} />
              <Field label="Organization" value={filteredProjects[0].orgId} />
              <Field label="Start Date" value={filteredProjects[0].startDate} />
              <Field label="End Date" value={filteredProjects[0].endDate} />
            </div>

            <ProjectPlanTable
              projectId={searchTerm}
              onPlanSelect={handlePlanSelect}
              selectedPlan={selectedPlan}
              fiscalYear={fiscalYear}
              setFiscalYear={setFiscalYear}
            />

            <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
              <span
                className={`cursor-pointer ${showHours && hoursProjectId === searchTerm ? 'font-normal text-blue-800' : ''}`}
                onClick={() => handleHoursTabClick(searchTerm)}
              >
                Hours
              </span>
              <span
                className={`cursor-pointer ${showAmounts ? 'font-normal text-blue-800' : ''}`}
                onClick={() => handleAmountsTabClick(searchTerm)}
              >
                Amounts
              </span>
              <span
                className={`cursor-pointer ${showRevenueAnalysis ? 'font-normal text-blue-800' : ''}`}
                onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
              >
                Revenue Analysis
              </span>
              <span
                className={`cursor-pointer ${showAnalysisByPeriod ? 'font-normal text-blue-800' : ''}`}
                onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
              >
                Analysis By Period
              </span>
            </div>

            {showHours && selectedPlan && hoursProjectId === searchTerm && (
              <div
                ref={(el) => (hoursRefs.current[searchTerm] = el)}
                className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
              >
                <div className="mb-4 text-xs sm:text-sm text-gray-800">
                  <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
                  <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
                  <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
                  <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
                </div>
                <ProjectHoursDetails
                  planId={selectedPlan.plId}
                  status={selectedPlan.status}
                  planType={selectedPlan.plType}
                  closedPeriod={selectedPlan.closedPeriod}
                  startDate={filteredProjects[0].startDate}
                  endDate={filteredProjects[0].endDate}
                  employees={forecastData}
                  isForecastLoading={isForecastLoading}
                  fiscalYear={fiscalYear}
                />
              </div>
            )}

            {showAmounts && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
              <div
                ref={(el) => (amountsRefs.current[searchTerm] = el)}
                className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
              >
                <div className="mb-4 text-xs sm:text-sm text-gray-800">
                  <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
                  <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
                  <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
                  <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
                </div>
                <ProjectAmountsTable
                  initialData={selectedPlan}
                  startDate={filteredProjects[0].startDate}
                  endDate={filteredProjects[0].endDate}
                  planType={selectedPlan.plType}
                  fiscalYear={fiscalYear}
                />
              </div>
            )}

            {showRevenueAnalysis && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
              <div
                ref={(el) => (revenueRefs.current[searchTerm] = el)}
                className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
              >
                <div className="mb-4 text-xs sm:text-sm text-gray-800">
                  <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
                  <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
                  <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
                  <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
                </div>
                <RevenueAnalysisTable
                  planId={selectedPlan.plId}
                  status={selectedPlan.status}
                  fiscalYear={fiscalYear}
                />
              </div>
            )}

            {showAnalysisByPeriod && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
              <div
                ref={(el) => (analysisRefs.current[searchTerm] = el)}
                className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
              >
                <div className="mb-4 text-xs sm:text-sm text-gray-800">
                  <span className="font-normal">Project ID:</span> {selectedPlan.projId},{' '}
                  <span className="font-normal">Type:</span> {selectedPlan.plType || 'N/A'},{' '}
                  <span className="font-normal">Version:</span> {selectedPlan.version || 'N/A'},{' '}
                  <span className="font-normal">Status:</span> {selectedPlan.status || 'N/A'}
                </div>
                <AnalysisByPeriodContent
                  onCancel={onAnalysisCancel}
                  planID={selectedPlan.plId}
                  templateId={selectedPlan.templateId || 1}
                  type={selectedPlan.plType || 'TARGET'}
                  initialApiData={analysisApiData}
                  isLoading={isAnalysisLoading}
                  error={analysisError}
                />
              </div>
            )}
          </div>
        )
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