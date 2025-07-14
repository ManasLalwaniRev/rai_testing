// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ProjectHoursDetails from "./ProjectHoursDetails";
// // import ProjectPlanTable from "./ProjectPlanTable";
// // import RevenueAnalysisTable from "./RevenueAnalysisTable";
// // import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// // import ProjectAmountsTable from "./ProjectAmountsTable";
// // import PLCComponent from "./PLCComponent";
// // import FundingComponent from "./FundingComponent";
// // import RevenueSetupComponent from "./RevenueSetupComponent";
// // import RevenueCeilingComponent from "./RevenueCeilingComponent";

// // const ProjectBudgetStatus = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [prefixes, setPrefixes] = useState(new Set());
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showHours, setShowHours] = useState(false);
// //   const [showAmounts, setShowAmounts] = useState(false);
// //   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
// //   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
// //   const [hoursProjectId, setHoursProjectId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searched, setSearched] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [forecastData, setForecastData] = useState([]);
// //   const [isForecastLoading, setIsForecastLoading] = useState(false);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [fiscalYear, setFiscalYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [analysisApiData, setAnalysisApiData] = useState([]);
// //   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
// //   const [analysisError, setAnalysisError] = useState(null);
// //   const [showPLC, setShowPLC] = useState(false);
// //   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
// //   const [showFunding, setShowFunding] = useState(false);
// //   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);

// //   const hoursRefs = useRef({});
// //   const amountsRefs = useRef({});
// //   const revenueRefs = useRef({});
// //   const analysisRefs = useRef({});
// //   const revenueSetupRefs = useRef({});
// //   const revenueCeilingRefs = useRef({});
// //   const inputRef = useRef(null);
// //   const suggestionsRef = useRef(null);

// //   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
// //   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

// //   useEffect(() => {
// //     setLoading(true);
// //     axios
// //       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
// //       .then((res) => {
// //         const transformedData = res.data.map((project) => ({
// //           projId: project.projectId,
// //           projName: project.name,
// //           projTypeDc: project.description,
// //           orgId: project.orgId,
// //           startDate: project.startDate,
// //           endDate: project.endDate,
// //         }));
// //         const prefixSet = new Set(
// //           transformedData.map((project) => {
// //             const { projId } = project;
// //             if (projId.includes(".")) return projId.split(".")[0];
// //             else if (projId.includes("T")) return projId.split("T")[0];
// //             return projId;
// //           })
// //         );
// //         setPrefixes(prefixSet);
// //         setProjects(transformedData);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setProjects([]);
// //         setPrefixes(new Set());
// //         setFilteredProjects([]);
// //         setLoading(false);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     const fetchAnalysisData = async () => {
// //       if (
// //         !selectedPlan ||
// //         !selectedPlan.plId ||
// //         !selectedPlan.templateId ||
// //         !selectedPlan.plType
// //       ) {
// //         setAnalysisApiData([]);
// //         setIsAnalysisLoading(false);
// //         setAnalysisError("Please select a plan to view Analysis By Period.");
// //         return;
// //       }
// //       if (!showAnalysisByPeriod) return;

// //       setIsAnalysisLoading(true);
// //       setAnalysisError(null);
// //       try {
// //         const params = new URLSearchParams({
// //           planID: selectedPlan.plId.toString(),
// //           templateId: selectedPlan.templateId.toString(),
// //           type: selectedPlan.plType,
// //         });
// //         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
// //         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

// //         const response = await fetch(externalApiUrl, {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //           cache: "no-store",
// //         });

// //         if (!response.ok) {
// //           let errorText = "Unknown error";
// //           try {
// //             errorText =
// //               (await response.json()).message ||
// //               JSON.stringify(await response.json());
// //           } catch (e) {
// //             errorText = await response.text();
// //           }
// //           throw new Error(
// //             `HTTP error! status: ${response.status}. Details: ${errorText}`
// //           );
// //         }

// //         const apiResponse = await response.json();
// //         setAnalysisApiData(apiResponse);
// //       } catch (err) {
// //         console.error("Analysis By Period fetch error:", err);
// //         setAnalysisError(
// //           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
// //         );
// //         setAnalysisApiData([]);
// //       } finally {
// //         setIsAnalysisLoading(false);
// //       }
// //     };
// //     fetchAnalysisData();
// //   }, [
// //     selectedPlan,
// //     showAnalysisByPeriod,
// //     EXTERNAL_API_BASE_URL,
// //     CALCULATE_COST_ENDPOINT,
// //   ]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current &&
// //         !suggestionsRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") setShowSuggestions(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current &&
// //         !suggestionsRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") setShowSuggestions(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[hoursProjectId].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAmounts && amountsRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           amountsRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           analysisRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueSetupRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueCeilingRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showPLC && hoursRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     }
// //   }, [
// //     showHours,
// //     showAmounts,
// //     showRevenueAnalysis,
// //     showAnalysisByPeriod,
// //     showRevenueSetup,
// //     showRevenueCeiling,
// //     showPLC,
// //     hoursProjectId,
// //     searchTerm,
// //   ]);

// //   const handleSearch = () => {
// //     const term = searchTerm.trim();
// //     setSearched(true);
// //     setErrorMessage("");
// //     setShowSuggestions(false);

// //     if (term === "") {
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     if (
// //       !Array.from(prefixes).some(
// //         (prefix) => prefix.toLowerCase() === term.toLowerCase()
// //       )
// //     ) {
// //       setErrorMessage("Search valid project ID");
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(term.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") handleSearch();
// //   };
// //   const handleInputChange = (e) => {
// //     setSearchTerm(e.target.value);
// //     setErrorMessage("");
// //     setSearched(false);
// //     setFilteredProjects([]);
// //     setShowSuggestions(e.target.value.trim().length > 0);
// //   };

// //   const handleSuggestionClick = (prefix) => {
// //     setSearchTerm(prefix);
// //     setShowSuggestions(false);
// //     setSearched(true);
// //     setErrorMessage("");

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handlePlanSelect = (plan) => {
// //     setSelectedPlan(plan);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setHoursProjectId(null);
// //     setShowRevenueAnalysis(false);
// //     setShowAnalysisByPeriod(false);
// //     setShowPLC(false);
// //     setShowRevenueSetup(false);
// //     setShowFunding(false);
// //     setShowRevenueCeiling(false);
// //     setForecastData([]);
// //     setIsForecastLoading(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleHoursTabClick = async (projId) => {
// //     if (!selectedPlan) {
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showHours && hoursProjectId === projId) {
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowHours(true);
// //       setShowAmounts(false);
// //       setHoursProjectId(projId);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setIsForecastLoading(true);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);

// //       try {
// //         const employeeApi =
// //           selectedPlan.plType === "EAC"
// //             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
// //             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
// //         const response = await axios.get(employeeApi);
// //         if (!Array.isArray(response.data)) {
// //           setForecastData([]);
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           setForecastData(response.data);
// //         }
// //       } catch (err) {
// //         setForecastData([]);
// //         if (err.response && err.response.status === 500) {
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           toast.error(
// //             "Failed to load forecast data: " +
// //               (err.response?.data?.message || err.message),
// //             {
// //               toastId: "forecast-error",
// //               autoClose: 3000,
// //             }
// //           );
// //         }
// //       } finally {
// //         setIsForecastLoading(false);
// //       }
// //     }
// //   };

// //   const handleAmountsTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAmounts(false);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAmounts) {
// //       setShowAmounts(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAmounts(true);
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleRevenueAnalysisTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showRevenueAnalysis) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowRevenueAnalysis(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleAnalysisByPeriodTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAnalysisByPeriod) {
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAnalysisByPeriod(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handlePLCTabClick = (projId) => {
// //     if (showPLC) {
// //       setShowPLC(false);
// //     } else {
// //       setShowPLC(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueSetupTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueSetup(false);
// //       return;
// //     }
// //     if (showRevenueSetup) {
// //       setShowRevenueSetup(false);
// //     } else {
// //       setShowRevenueSetup(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleFundingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowFunding(false);
// //       return;
// //     }
// //     if (showFunding) {
// //       setShowFunding(false);
// //     } else {
// //       setShowFunding(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueCeilingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueCeiling(false);
// //       return;
// //     }
// //     if (showRevenueCeiling) {
// //       setShowRevenueCeiling(false);
// //     } else {
// //       setShowRevenueCeiling(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //     }
// //   };

// //   const onAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setShowRevenueAnalysis(false);
// //     setHoursProjectId(null);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //     toast.info("Analysis By Period cancelled.", {
// //       toastId: "analysis-cancel",
// //       autoClose: 3000,
// //     });
// //   };

// //   if (loading && projects.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64 font-inter">
// //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm sm:text-base">
// //           Loading...
// //         </span>
// //       </div>
// //     );
// //   }

// //   const suggestions = Array.from(prefixes).filter((prefix) =>
// //     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
// //   );

// //   return (
// //     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         closeOnClick
// //         pauseOnHover
// //         draggable
// //         closeButton
// //       />
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
// //           <label className="font-semibold text-xs sm:text-sm">
// //             Project ID:
// //           </label>
// //           <div className="relative w-full sm:w-64">
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               value={searchTerm}
// //               onChange={handleInputChange}
// //               onKeyDown={handleKeyPress}
// //               ref={inputRef}
// //               autoComplete="off"
// //             />
// //             {showSuggestions && suggestions.length > 0 && (
// //               <div
// //                 ref={suggestionsRef}
// //                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
// //               >
// //                 {suggestions.map((prefix) => (
// //                   <div
// //                     key={prefix}
// //                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
// //                     onClick={() => handleSuggestionClick(prefix)}
// //                   >
// //                     {prefix}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //           <button
// //             onClick={handleSearch}
// //             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           Loading...
// //         </div>
// //       ) : searched && errorMessage ? (
// //         <div className="text-red-500 italic text-xs sm:text-sm">
// //           {errorMessage}
// //         </div>
// //       ) : searched && filteredProjects.length === 0 ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           No project found with that ID.
// //         </div>
// //       ) : (
// //         filteredProjects.length > 0 && (
// //           <div
// //             key={searchTerm}
// //             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
// //           >
// //             <h2 className="font-normal text-sm sm:text-base text-blue-600">
// //               Project: {searchTerm}
// //             </h2>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
// //               <Field label="Project" value={searchTerm} />
// //               <Field
// //                 label="Project Name"
// //                 value={filteredProjects[0].projName}
// //               />
// //               <Field
// //                 label="Description"
// //                 value={filteredProjects[0].projTypeDc}
// //               />
// //               <Field label="Organization" value={filteredProjects[0].orgId} />
// //               <Field label="Start Date" value={filteredProjects[0].startDate} />
// //               <Field label="End Date" value={filteredProjects[0].endDate} />
// //             </div>

// //             <ProjectPlanTable
// //               projectId={searchTerm}
// //               onPlanSelect={handlePlanSelect}
// //               selectedPlan={selectedPlan}
// //               fiscalYear={fiscalYear}
// //               setFiscalYear={setFiscalYear}
// //             />

// //             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
// //               <span
// //                 className={`cursor-pointer ${
// //                   showHours && hoursProjectId === searchTerm
// //                     ? "font-normal text-blue-800"
// //                     : ""
// //                 }`}
// //                 onClick={() => handleHoursTabClick(searchTerm)}
// //               >
// //                 Hours
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAmounts ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAmountsTabClick(searchTerm)}
// //               >
// //                 Amounts
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
// //               >
// //                 Revenue Analysis
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
// //               >
// //                 Analysis By Period
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showPLC ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handlePLCTabClick(searchTerm)}
// //               >
// //                 PLC
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueSetup ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
// //               >
// //                 Revenue Setup
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueCeiling ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
// //               >
// //                 Revenue Ceiling
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showFunding ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleFundingTabClick(searchTerm)}
// //               >
// //                 Funding
// //               </span>
// //             </div>

// //             {showHours && selectedPlan && hoursProjectId === searchTerm && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                   <span className="font-normal">Project ID:</span>{" "}
// //                   {selectedPlan.projId},{" "}
// //                   <span className="font-normal">Type:</span>{" "}
// //                   {selectedPlan.plType || "N/A"},{" "}
// //                   <span className="font-normal">Version:</span>{" "}
// //                   {selectedPlan.version || "N/A"},{" "}
// //                   <span className="font-normal">Status:</span>{" "}
// //                   {selectedPlan.status || "N/A"}
// //                 </div>
// //                 <ProjectHoursDetails
// //                   planId={selectedPlan.plId}
// //                   status={selectedPlan.status}
// //                   planType={selectedPlan.plType}
// //                   closedPeriod={selectedPlan.closedPeriod}
// //                   startDate={filteredProjects[0].startDate}
// //                   endDate={filteredProjects[0].endDate}
// //                   employees={forecastData}
// //                   isForecastLoading={isForecastLoading}
// //                   fiscalYear={fiscalYear}
// //                 />
// //               </div>
// //             )}

// //             {showAmounts &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <ProjectAmountsTable
// //                     initialData={selectedPlan}
// //                     startDate={filteredProjects[0].startDate}
// //                     endDate={filteredProjects[0].endDate}
// //                     planType={selectedPlan.plType}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showRevenueAnalysis &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <RevenueAnalysisTable
// //                     planId={selectedPlan.plId}
// //                     status={selectedPlan.status}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showAnalysisByPeriod &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <AnalysisByPeriodContent
// //                     onCancel={onAnalysisCancel}
// //                     planID={selectedPlan.plId}
// //                     templateId={selectedPlan.templateId || 1}
// //                     type={selectedPlan.plType || "TARGET"}
// //                     initialApiData={analysisApiData}
// //                     isLoading={isAnalysisLoading}
// //                     error={analysisError}
// //                   />
// //                 </div>
// //               )}

// //             {showPLC && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <PLCComponent selectedProjectId={searchTerm} />
// //               </div>
// //             )}

// //             {showRevenueSetup &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueSetupComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showRevenueCeiling &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueCeilingComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showFunding &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <FundingComponent />
// //                 </div>
// //               )}
// //           </div>
// //         )
// //       )}
// //     </div>
// //   );
// // };

// // const Field = ({ label, value }) => (
// //   <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
// //     <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
// //       {label}:
// //     </label>
// //     <input
// //       type="text"
// //       className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
// //       defaultValue={value || ""}
// //       readOnly
// //     />
// //   </div>
// // );

// // export default ProjectBudgetStatus;

// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ProjectHoursDetails from "./ProjectHoursDetails";
// // import ProjectPlanTable from "./ProjectPlanTable";
// // import RevenueAnalysisTable from "./RevenueAnalysisTable";
// // import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// // import ProjectAmountsTable from "./ProjectAmountsTable";
// // import PLCComponent from "./PLCComponent";
// // import FundingComponent from "./FundingComponent";
// // import RevenueSetupComponent from "./RevenueSetupComponent";
// // import RevenueCeilingComponent from "./RevenueCeilingComponent";

// // const ProjectBudgetStatus = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [prefixes, setPrefixes] = useState(new Set());
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showHours, setShowHours] = useState(false);
// //   const [showAmounts, setShowAmounts] = useState(false);
// //   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
// //   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
// //   const [hoursProjectId, setHoursProjectId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searched, setSearched] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [forecastData, setForecastData] = useState([]);
// //   const [isForecastLoading, setIsForecastLoading] = useState(false);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [fiscalYear, setFiscalYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [analysisApiData, setAnalysisApiData] = useState([]);
// //   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
// //   const [analysisError, setAnalysisError] = useState(null);
// //   const [showPLC, setShowPLC] = useState(false);
// //   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
// //   const [showFunding, setShowFunding] = useState(false);
// //   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);

// //   const hoursRefs = useRef({});
// //   const amountsRefs = useRef({});
// //   const revenueRefs = useRef({});
// //   const analysisRefs = useRef({});
// //   const revenueSetupRefs = useRef({});
// //   const revenueCeilingRefs = useRef({});
// //   const inputRef = useRef(null);
// //   const suggestionsRef = useRef(null);

// //   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
// //   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

// //   useEffect(() => {
// //     setLoading(true);
// //     axios
// //       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
// //       .then((res) => {
// //         const transformedData = res.data.map((project) => ({
// //           projId: project.projectId,
// //           projName: project.name,
// //           projTypeDc: project.description,
// //           orgId: project.orgId,
// //           startDate: project.startDate,
// //           endDate: project.endDate,
// //           fundedCost: project.proj_f_cst_amt || "",
// //           fundedFee: project.proj_f_fee_amt || "",
// //           fundedRev: project.proj_f_tot_amt || "",
// //         }));
// //         const prefixSet = new Set(
// //           transformedData.map((project) => {
// //             const { projId } = project;
// //             if (projId.includes(".")) return projId.split(".")[0];
// //             else if (projId.includes("T")) return projId.split("T")[0];
// //             return projId;
// //           })
// //         );
// //         setPrefixes(prefixSet);
// //         setProjects(transformedData);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setProjects([]);
// //         setPrefixes(new Set());
// //         setFilteredProjects([]);
// //         setLoading(false);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     const fetchAnalysisData = async () => {
// //       if (
// //         !selectedPlan ||
// //         !selectedPlan.plId ||
// //         !selectedPlan.templateId ||
// //         !selectedPlan.plType
// //       ) {
// //         setAnalysisApiData([]);
// //         setIsAnalysisLoading(false);
// //         setAnalysisError("Please select a plan to view Analysis By Period.");
// //         return;
// //       }
// //       if (!showAnalysisByPeriod) return;

// //       setIsAnalysisLoading(true);
// //       setAnalysisError(null);
// //       try {
// //         const params = new URLSearchParams({
// //           planID: selectedPlan.plId.toString(),
// //           templateId: selectedPlan.templateId.toString(),
// //           type: selectedPlan.plType,
// //         });
// //         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
// //         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

// //         const response = await fetch(externalApiUrl, {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //           cache: "no-store",
// //         });

// //         if (!response.ok) {
// //           let errorText = "Unknown error";
// //           try {
// //             errorText =
// //               (await response.json()).message ||
// //               JSON.stringify(await response.json());
// //           } catch (e) {
// //             errorText = await response.text();
// //           }
// //           throw new Error(
// //             `HTTP error! status: ${response.status}. Details: ${errorText}`
// //           );
// //         }

// //         const apiResponse = await response.json();
// //         setAnalysisApiData(apiResponse);
// //       } catch (err) {
// //         console.error("Analysis By Period fetch error:", err);
// //         setAnalysisError(
// //           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
// //         );
// //         setAnalysisApiData([]);
// //       } finally {
// //         setIsAnalysisLoading(false);
// //       }
// //     };
// //     fetchAnalysisData();
// //   }, [
// //     selectedPlan,
// //     showAnalysisByPeriod,
// //     EXTERNAL_API_BASE_URL,
// //     CALCULATE_COST_ENDPOINT,
// //   ]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current &&
// //         !suggestionsRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") setShowSuggestions(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[hoursProjectId].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAmounts && amountsRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           amountsRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           analysisRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueSetupRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueCeilingRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showPLC && hoursRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     }
// //   }, [
// //     showHours,
// //     showAmounts,
// //     showRevenueAnalysis,
// //     showAnalysisByPeriod,
// //     showRevenueSetup,
// //     showRevenueCeiling,
// //     showPLC,
// //     hoursProjectId,
// //     searchTerm,
// //   ]);

// //   const handleSearch = () => {
// //     const term = searchTerm.trim();
// //     setSearched(true);
// //     setErrorMessage("");
// //     setShowSuggestions(false);

// //     if (term === "") {
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     if (
// //       !Array.from(prefixes).some(
// //         (prefix) => prefix.toLowerCase() === term.toLowerCase()
// //       )
// //     ) {
// //       setErrorMessage("Search valid project ID");
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(term.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") handleSearch();
// //   };
// //   const handleInputChange = (e) => {
// //     setSearchTerm(e.target.value);
// //     setErrorMessage("");
// //     setSearched(false);
// //     setFilteredProjects([]);
// //     setShowSuggestions(e.target.value.trim().length > 0);
// //   };

// //   const handleSuggestionClick = (prefix) => {
// //     setSearchTerm(prefix);
// //     setShowSuggestions(false);
// //     setSearched(true);
// //     setErrorMessage("");

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handlePlanSelect = (plan) => {
// //     setSelectedPlan(plan);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setHoursProjectId(null);
// //     setShowRevenueAnalysis(false);
// //     setShowAnalysisByPeriod(false);
// //     setShowPLC(false);
// //     setShowRevenueSetup(false);
// //     setShowFunding(false);
// //     setShowRevenueCeiling(false);
// //     setForecastData([]);
// //     setIsForecastLoading(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleHoursTabClick = async (projId) => {
// //     if (!selectedPlan) {
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showHours && hoursProjectId === projId) {
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowHours(true);
// //       setShowAmounts(false);
// //       setHoursProjectId(projId);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setIsForecastLoading(true);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);

// //       try {
// //         const employeeApi =
// //           selectedPlan.plType === "EAC"
// //             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
// //             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
// //         const response = await axios.get(employeeApi);
// //         if (!Array.isArray(response.data)) {
// //           setForecastData([]);
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           setForecastData(response.data);
// //         }
// //       } catch (err) {
// //         setForecastData([]);
// //         if (err.response && err.response.status === 500) {
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           toast.error(
// //             "Failed to load forecast data: " +
// //               (err.response?.data?.message || err.message),
// //             {
// //               toastId: "forecast-error",
// //               autoClose: 3000,
// //             }
// //           );
// //         }
// //       } finally {
// //         setIsForecastLoading(false);
// //       }
// //     }
// //   };

// //   const handleAmountsTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAmounts(false);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAmounts) {
// //       setShowAmounts(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAmounts(true);
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleRevenueAnalysisTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showRevenueAnalysis) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowRevenueAnalysis(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleAnalysisByPeriodTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAnalysisByPeriod) {
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAnalysisByPeriod(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handlePLCTabClick = (projId) => {
// //     if (showPLC) {
// //       setShowPLC(false);
// //     } else {
// //       setShowPLC(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueSetupTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueSetup(false);
// //       return;
// //     }
// //     if (showRevenueSetup) {
// //       setShowRevenueSetup(false);
// //     } else {
// //       setShowRevenueSetup(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleFundingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowFunding(false);
// //       return;
// //     }
// //     if (showFunding) {
// //       setShowFunding(false);
// //     } else {
// //       setShowFunding(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueCeilingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueCeiling(false);
// //       return;
// //     }
// //     if (showRevenueCeiling) {
// //       setShowRevenueCeiling(false);
// //     } else {
// //       setShowRevenueCeiling(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //     }
// //   };

// //   const onAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setShowRevenueAnalysis(false);
// //     setHoursProjectId(null);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //     toast.info("Analysis By Period cancelled.", {
// //       toastId: "analysis-cancel",
// //       autoClose: 3000,
// //     });
// //   };

// //   if (loading && projects.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64 font-inter">
// //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm sm:text-base">
// //           Loading...
// //         </span>
// //       </div>
// //     );
// //   }

// //   const suggestions = Array.from(prefixes).filter((prefix) =>
// //     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
// //   );

// //   return (
// //     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         closeOnClick
// //         pauseOnHover
// //         draggable
// //         closeButton
// //       />
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
// //           <label className="font-semibold text-xs sm:text-sm">
// //             Project ID:
// //           </label>
// //           <div className="relative w-full sm:w-64">
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               value={searchTerm}
// //               onChange={handleInputChange}
// //               onKeyDown={handleKeyPress}
// //               ref={inputRef}
// //               autoComplete="off"
// //             />
// //             {showSuggestions && suggestions.length > 0 && (
// //               <div
// //                 ref={suggestionsRef}
// //                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
// //               >
// //                 {suggestions.map((prefix) => (
// //                   <div
// //                     key={prefix}
// //                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
// //                     onClick={() => handleSuggestionClick(prefix)}
// //                   >
// //                     {prefix}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //           <button
// //             onClick={handleSearch}
// //             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           Loading...
// //         </div>
// //       ) : searched && errorMessage ? (
// //         <div className="text-red-500 italic text-xs sm:text-sm">
// //           {errorMessage}
// //         </div>
// //       ) : searched && filteredProjects.length === 0 ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           No project found with that ID.
// //         </div>
// //       ) : (
// //         filteredProjects.length > 0 && (
// //           <div
// //             key={searchTerm}
// //             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
// //           >
// //             <h2 className="font-normal text-sm sm:text-base text-blue-600">
// //               Project: {searchTerm}
// //             </h2>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
// //               <Field label="Project" value={searchTerm} />
// //               <Field
// //                 label="Project Name"
// //                 value={filteredProjects[0].projName}
// //               />
// //               <Field
// //                 label="Funded Cost"
// //                 value={filteredProjects[0].fundedCost}
// //                 isCurrency
// //               />
// //               <Field label="Organization" value={filteredProjects[0].orgId} />
// //               <Field
// //                 label="Description"
// //                 value={filteredProjects[0].projTypeDc}
// //               />
// //               <Field
// //                 label="Funded Fee"
// //                 value={filteredProjects[0].fundedFee}
// //                 isCurrency
// //               />
// //               <Field label="Start Date" value={filteredProjects[0].startDate} />
// //               <Field label="End Date" value={filteredProjects[0].endDate} />
// //               <Field
// //                 label="Funded Rev"
// //                 value={filteredProjects[0].fundedRev}
// //                 isCurrency
// //               />
// //             </div>

// //             <ProjectPlanTable
// //               projectId={searchTerm}
// //               onPlanSelect={handlePlanSelect}
// //               selectedPlan={selectedPlan}
// //               fiscalYear={fiscalYear}
// //               setFiscalYear={setFiscalYear}
// //             />

// //             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
// //               <span
// //                 className={`cursor-pointer ${
// //                   showHours && hoursProjectId === searchTerm
// //                     ? "font-normal text-blue-800"
// //                     : ""
// //                 }`}
// //                 onClick={() => handleHoursTabClick(searchTerm)}
// //               >
// //                 Hours
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAmounts ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAmountsTabClick(searchTerm)}
// //               >
// //                 Amounts
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
// //               >
// //                 Revenue Analysis
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
// //               >
// //                 Analysis By Period
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showPLC ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handlePLCTabClick(searchTerm)}
// //               >
// //                 PLC
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueSetup ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
// //               >
// //                 Revenue Setup
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueCeiling ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
// //               >
// //                 Revenue Ceiling
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showFunding ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleFundingTabClick(searchTerm)}
// //               >
// //                 Funding
// //               </span>
// //             </div>

// //             {showHours && selectedPlan && hoursProjectId === searchTerm && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                   <span className="font-normal">Project ID:</span>{" "}
// //                   {selectedPlan.projId},{" "}
// //                   <span className="font-normal">Type:</span>{" "}
// //                   {selectedPlan.plType || "N/A"},{" "}
// //                   <span className="font-normal">Version:</span>{" "}
// //                   {selectedPlan.version || "N/A"},{" "}
// //                   <span className="font-normal">Status:</span>{" "}
// //                   {selectedPlan.status || "N/A"}
// //                 </div>
// //                 <ProjectHoursDetails
// //                   planId={selectedPlan.plId}
// //                   status={selectedPlan.status}
// //                   planType={selectedPlan.plType}
// //                   closedPeriod={selectedPlan.closedPeriod}
// //                   startDate={filteredProjects[0].startDate}
// //                   endDate={filteredProjects[0].endDate}
// //                   employees={forecastData}
// //                   isForecastLoading={isForecastLoading}
// //                   fiscalYear={fiscalYear}
// //                 />
// //               </div>
// //             )}

// //             {showAmounts &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <ProjectAmountsTable
// //                     initialData={selectedPlan}
// //                     startDate={filteredProjects[0].startDate}
// //                     endDate={filteredProjects[0].endDate}
// //                     planType={selectedPlan.plType}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showRevenueAnalysis &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <RevenueAnalysisTable
// //                     planId={selectedPlan.plId}
// //                     status={selectedPlan.status}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showAnalysisByPeriod &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <AnalysisByPeriodContent
// //                     onCancel={onAnalysisCancel}
// //                     planID={selectedPlan.plId}
// //                     templateId={selectedPlan.templateId || 1}
// //                     type={selectedPlan.plType || "TARGET"}
// //                     initialApiData={analysisApiData}
// //                     isLoading={isAnalysisLoading}
// //                     error={analysisError}
// //                   />
// //                 </div>
// //               )}

// //             {showPLC && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <PLCComponent selectedProjectId={searchTerm} />
// //               </div>
// //             )}

// //             {showRevenueSetup &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueSetupComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showRevenueCeiling &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueCeilingComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showFunding &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <FundingComponent />
// //                 </div>
// //               )}
// //           </div>
// //         )
// //       )}
// //     </div>
// //   );
// // };

// // const Field = ({ label, value, isCurrency }) => {
// //   const formattedValue = isCurrency && value !== ""
// //     ? Number(value).toLocaleString("en-US", {
// //         minimumFractionDigits: 0,
// //         maximumFractionDigits: 0,
// //       })
// //     : value || "";
// //   return (
// //     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
// //       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
// //         {label}:
// //       </label>
// //       <input
// //         type="text"
// //         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
// //         value={formattedValue}
// //         readOnly
// //       />
// //     </div>
// //   );
// // };

// // export default ProjectBudgetStatus;

// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ProjectHoursDetails from "./ProjectHoursDetails";
// // import ProjectPlanTable from "./ProjectPlanTable";
// // import RevenueAnalysisTable from "./RevenueAnalysisTable";
// // import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// // import ProjectAmountsTable from "./ProjectAmountsTable";
// // import PLCComponent from "./PLCComponent";
// // import FundingComponent from "./FundingComponent";
// // import RevenueSetupComponent from "./RevenueSetupComponent";
// // import RevenueCeilingComponent from "./RevenueCeilingComponent";

// // const ProjectBudgetStatus = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [prefixes, setPrefixes] = useState(new Set());
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showHours, setShowHours] = useState(false);
// //   const [showAmounts, setShowAmounts] = useState(false);
// //   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
// //   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
// //   const [hoursProjectId, setHoursProjectId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searched, setSearched] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [forecastData, setForecastData] = useState([]);
// //   const [isForecastLoading, setIsForecastLoading] = useState(false);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [fiscalYear, setFiscalYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [analysisApiData, setAnalysisApiData] = useState([]);
// //   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
// //   const [analysisError, setAnalysisError] = useState(null);
// //   const [showPLC, setShowPLC] = useState(false);
// //   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
// //   const [showFunding, setShowFunding] = useState(false);
// //   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);

// //   const hoursRefs = useRef({});
// //   const amountsRefs = useRef({});
// //   const revenueRefs = useRef({});
// //   const analysisRefs = useRef({});
// //   const revenueSetupRefs = useRef({});
// //   const revenueCeilingRefs = useRef({});
// //   const inputRef = useRef(null);
// //   const suggestionsRef = useRef(null);

// //   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
// //   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

// //   useEffect(() => {
// //     setLoading(true);
// //     axios
// //       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
// //       .then((res) => {
// //         const transformedData = res.data.map((project) => ({
// //           projId: project.projectId,
// //           projName: project.name,
// //           projTypeDc: project.description,
// //           orgId: project.orgId,
// //           startDate: project.startDate,
// //           endDate: project.endDate,
// //           fundedCost: project.proj_f_cst_amt || "",
// //           fundedFee: project.proj_f_fee_amt || "",
// //           fundedRev: project.proj_f_tot_amt || "",
// //         }));
// //         const prefixSet = new Set(
// //           transformedData.map((project) => {
// //             const { projId } = project;
// //             if (projId.includes(".")) return projId.split(".")[0];
// //             else if (projId.includes("T")) return projId.split("T")[0];
// //             return projId;
// //           })
// //         );
// //         setPrefixes(prefixSet);
// //         setProjects(transformedData);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setProjects([]);
// //         setPrefixes(new Set());
// //         setFilteredProjects([]);
// //         setLoading(false);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     const fetchAnalysisData = async () => {
// //       if (
// //         !selectedPlan ||
// //         !selectedPlan.plId ||
// //         !selectedPlan.templateId ||
// //         !selectedPlan.plType
// //       ) {
// //         setAnalysisApiData([]);
// //         setIsAnalysisLoading(false);
// //         setAnalysisError("Please select a plan to view Analysis By Period.");
// //         return;
// //       }
// //       if (!showAnalysisByPeriod) return;

// //       setIsAnalysisLoading(true);
// //       setAnalysisError(null);
// //       try {
// //         const params = new URLSearchParams({
// //           planID: selectedPlan.plId.toString(),
// //           templateId: selectedPlan.templateId.toString(),
// //           type: selectedPlan.plType,
// //         });
// //         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
// //         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

// //         const response = await fetch(externalApiUrl, {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //           cache: "no-store",
// //         });

// //         if (!response.ok) {
// //           let errorText = "Unknown error";
// //           try {
// //             errorText =
// //               (await response.json()).message ||
// //               JSON.stringify(await response.json());
// //           } catch (e) {
// //             errorText = await response.text();
// //           }
// //           throw new Error(
// //             `HTTP error! status: ${response.status}. Details: ${errorText}`
// //           );
// //         }

// //         const apiResponse = await response.json();
// //         setAnalysisApiData(apiResponse);
// //       } catch (err) {
// //         console.error("Analysis By Period fetch error:", err);
// //         setAnalysisError(
// //           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
// //         );
// //         setAnalysisApiData([]);
// //       } finally {
// //         setIsAnalysisLoading(false);
// //       }
// //     };
// //     fetchAnalysisData();
// //   }, [
// //     selectedPlan,
// //     showAnalysisByPeriod,
// //     EXTERNAL_API_BASE_URL,
// //     CALCULATE_COST_ENDPOINT,
// //   ]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current &&
// //         !suggestionsRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") setShowSuggestions(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[hoursProjectId].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAmounts && amountsRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           amountsRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           analysisRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueSetupRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueCeilingRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showPLC && hoursRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     }
// //   }, [
// //     showHours,
// //     showAmounts,
// //     showRevenueAnalysis,
// //     showAnalysisByPeriod,
// //     showRevenueSetup,
// //     showRevenueCeiling,
// //     showPLC,
// //     hoursProjectId,
// //     searchTerm,
// //   ]);

// //   const handleSearch = () => {
// //     const term = searchTerm.trim();
// //     setSearched(true);
// //     setErrorMessage("");
// //     setShowSuggestions(false);

// //     if (term === "") {
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     if (
// //       !Array.from(prefixes).some(
// //         (prefix) => prefix.toLowerCase() === term.toLowerCase()
// //       )
// //     ) {
// //       setErrorMessage("Search valid project ID");
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(term.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") handleSearch();
// //   };

// //   const handleInputChange = (e) => {
// //     setSearchTerm(e.target.value);
// //     setErrorMessage("");
// //     setSearched(false);
// //     setFilteredProjects([]);
// //     setShowSuggestions(e.target.value.trim().length > 0);
// //   };

// //   const handleSuggestionClick = (prefix) => {
// //     setSearchTerm(prefix);
// //     setShowSuggestions(false);
// //     setSearched(true);
// //     setErrorMessage("");

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handlePlanSelect = (plan) => {
// //     setSelectedPlan(plan);
// //     setSearchTerm(plan.projId); // Ensure searchTerm matches selected plan's projId
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setHoursProjectId(null);
// //     setShowRevenueAnalysis(false);
// //     setShowAnalysisByPeriod(false);
// //     setShowPLC(false);
// //     setShowRevenueSetup(false);
// //     setShowFunding(false);
// //     setShowRevenueCeiling(false);
// //     setForecastData([]);
// //     setIsForecastLoading(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleHoursTabClick = async (projId) => {
// //     if (!selectedPlan) {
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showHours && hoursProjectId === projId) {
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowHours(true);
// //       setShowAmounts(false);
// //       setHoursProjectId(projId);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setIsForecastLoading(true);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);

// //       try {
// //         const employeeApi =
// //           selectedPlan.plType === "EAC"
// //             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
// //             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
// //         const response = await axios.get(employeeApi);
// //         if (!Array.isArray(response.data)) {
// //           setForecastData([]);
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           setForecastData(response.data);
// //         }
// //       } catch (err) {
// //         setForecastData([]);
// //         if (err.response && err.response.status === 500) {
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           toast.error(
// //             "Failed to load forecast data: " +
// //               (err.response?.data?.message || err.message),
// //             {
// //               toastId: "forecast-error",
// //               autoClose: 3000,
// //             }
// //           );
// //         }
// //       } finally {
// //         setIsForecastLoading(false);
// //       }
// //     }
// //   };

// //   const handleAmountsTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAmounts(false);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAmounts) {
// //       setShowAmounts(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAmounts(true);
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleRevenueAnalysisTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showRevenueAnalysis) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowRevenueAnalysis(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleAnalysisByPeriodTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAnalysisByPeriod) {
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAnalysisByPeriod(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handlePLCTabClick = (projId) => {
// //     if (showPLC) {
// //       setShowPLC(false);
// //     } else {
// //       setShowPLC(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueSetupTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueSetup(false);
// //       return;
// //     }
// //     if (showRevenueSetup) {
// //       setShowRevenueSetup(false);
// //     } else {
// //       setShowRevenueSetup(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleFundingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowFunding(false);
// //       return;
// //     }
// //     if (showFunding) {
// //       setShowFunding(false);
// //     } else {
// //       setShowFunding(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueCeilingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueCeiling(false);
// //       return;
// //     }
// //     if (showRevenueCeiling) {
// //       setShowRevenueCeiling(false);
// //     } else {
// //       setShowRevenueCeiling(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //     }
// //   };

// //   const onAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setShowRevenueAnalysis(false);
// //     setHoursProjectId(null);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //     toast.info("Analysis By Period cancelled.", {
// //       toastId: "analysis-cancel",
// //       autoClose: 3000,
// //     });
// //   };

// //   if (loading && projects.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64 font-inter">
// //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm sm:text-base">
// //           Loading...
// //         </span>
// //       </div>
// //     );
// //   }

// //   const suggestions = Array.from(prefixes).filter((prefix) =>
// //     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
// //   );

// //   return (
// //     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         closeOnClick
// //         pauseOnHover
// //         draggable
// //         closeButton
// //       />
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
// //           <label className="font-semibold text-xs sm:text-sm">
// //             Project ID:
// //           </label>
// //           <div className="relative w-full sm:w-64">
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               value={searchTerm}
// //               onChange={handleInputChange}
// //               onKeyDown={handleKeyPress}
// //               ref={inputRef}
// //               autoComplete="off"
// //             />
// //             {showSuggestions && suggestions.length > 0 && (
// //               <div
// //                 ref={suggestionsRef}
// //                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
// //               >
// //                 {suggestions.map((prefix) => (
// //                   <div
// //                     key={prefix}
// //                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
// //                     onClick={() => handleSuggestionClick(prefix)}
// //                   >
// //                     {prefix}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //           <button
// //             onClick={handleSearch}
// //             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           Loading...
// //         </div>
// //       ) : searched && errorMessage ? (
// //         <div className="text-red-500 italic text-xs sm:text-sm">
// //           {errorMessage}
// //         </div>
// //       ) : searched && filteredProjects.length === 0 ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           No project found with that ID.
// //         </div>
// //       ) : (
// //         filteredProjects.length > 0 && (
// //           <div
// //             key={searchTerm}
// //             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
// //           >
// //             <h2 className="font-normal text-sm sm:text-base text-blue-600">
// //               Project: {searchTerm}
// //             </h2>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
// //               <Field label="Project" value={searchTerm} />
// //               <Field
// //                 label="Project Name"
// //                 value={filteredProjects[0].projName}
// //               />
// //               <Field
// //                 label="Funded Cost"
// //                 value={filteredProjects[0].fundedCost}
// //                 isCurrency
// //               />
// //               <Field label="Organization" value={filteredProjects[0].orgId} />
// //               <Field
// //                 label="Description"
// //                 value={filteredProjects[0].projTypeDc}
// //               />
// //               <Field
// //                 label="Funded Fee"
// //                 value={filteredProjects[0].fundedFee}
// //                 isCurrency
// //               />
// //               <Field label="Start Date" value={filteredProjects[0].startDate} />
// //               <Field label="End Date" value={filteredProjects[0].endDate} />
// //               <Field
// //                 label="Funded Rev"
// //                 value={filteredProjects[0].fundedRev}
// //                 isCurrency
// //               />
// //             </div>

// //             <ProjectPlanTable
// //               projectId={searchTerm}
// //               onPlanSelect={handlePlanSelect}
// //               selectedPlan={selectedPlan}
// //               fiscalYear={fiscalYear}
// //               setFiscalYear={setFiscalYear}
// //             />

// //             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
// //               <span
// //                 className={`cursor-pointer ${
// //                   showHours && hoursProjectId === searchTerm
// //                     ? "font-normal text-blue-800"
// //                     : ""
// //                 }`}
// //                 onClick={() => handleHoursTabClick(searchTerm)}
// //               >
// //                 Hours
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAmounts ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAmountsTabClick(searchTerm)}
// //               >
// //                 Amounts
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
// //               >
// //                 Revenue Analysis
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
// //               >
// //                 Analysis By Period
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showPLC ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handlePLCTabClick(searchTerm)}
// //               >
// //                 PLC
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueSetup ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
// //               >
// //                 Revenue Setup
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueCeiling ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
// //               >
// //                 Revenue Ceiling
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${showFunding ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleFundingTabClick(searchTerm)}
// //               >
// //                 Funding
// //               </span>
// //             </div>

// //             {showHours && selectedPlan && hoursProjectId === searchTerm && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                   <span className="font-normal">Project ID:</span>{" "}
// //                   {selectedPlan.projId},{" "}
// //                   <span className="font-normal">Type:</span>{" "}
// //                   {selectedPlan.plType || "N/A"},{" "}
// //                   <span className="font-normal">Version:</span>{" "}
// //                   {selectedPlan.version || "N/A"},{" "}
// //                   <span className="font-normal">Status:</span>{" "}
// //                   {selectedPlan.status || "N/A"}
// //                 </div>
// //                 <ProjectHoursDetails
// //                   planId={selectedPlan.plId}
// //                   status={selectedPlan.status}
// //                   planType={selectedPlan.plType}
// //                   closedPeriod={selectedPlan.closedPeriod}
// //                   startDate={filteredProjects[0].startDate}
// //                   endDate={filteredProjects[0].endDate}
// //                   employees={forecastData}
// //                   isForecastLoading={isForecastLoading}
// //                   fiscalYear={fiscalYear}
// //                 />
// //               </div>
// //             )}

// //             {showAmounts &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <ProjectAmountsTable
// //                     initialData={selectedPlan}
// //                     startDate={filteredProjects[0].startDate}
// //                     endDate={filteredProjects[0].endDate}
// //                     planType={selectedPlan.plType}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showRevenueAnalysis &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <RevenueAnalysisTable
// //                     planId={selectedPlan.plId}
// //                     status={selectedPlan.status}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showAnalysisByPeriod &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <AnalysisByPeriodContent
// //                     onCancel={onAnalysisCancel}
// //                     planID={selectedPlan.plId}
// //                     templateId={selectedPlan.templateId || 1}
// //                     type={selectedPlan.plType || "TARGET"}
// //                     initialApiData={analysisApiData}
// //                     isLoading={isAnalysisLoading}
// //                     error={analysisError}
// //                   />
// //                 </div>
// //               )}

// //             {showPLC && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <PLCComponent selectedProjectId={searchTerm} />
// //               </div>
// //             )}

// //             {showRevenueSetup &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueSetupComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showRevenueCeiling &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueCeilingComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showFunding &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <FundingComponent />
// //                 </div>
// //               )}
// //           </div>
// //         )
// //       )}
// //     </div>
// //   );
// // };

// // const Field = ({ label, value, isCurrency }) => {
// //   const formattedValue = isCurrency && value !== ""
// //     ? Number(value).toLocaleString("en-US", {
// //         minimumFractionDigits: 0,
// //         maximumFractionDigits: 0,
// //       })
// //     : value || "";
// //   return (
// //     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
// //       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
// //         {label}:
// //       </label>
// //       <input
// //         type="text"
// //         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
// //         value={formattedValue}
// //         readOnly
// //       />
// //     </div>
// //   );
// // };

// // export default ProjectBudgetStatus;

// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ProjectHoursDetails from "./ProjectHoursDetails";
// // import ProjectPlanTable from "./ProjectPlanTable";
// // import RevenueAnalysisTable from "./RevenueAnalysisTable";
// // import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// // import ProjectAmountsTable from "./ProjectAmountsTable";
// // import PLCComponent from "./PLCComponent";
// // import FundingComponent from "./FundingComponent";
// // import RevenueSetupComponent from "./RevenueSetupComponent";
// // import RevenueCeilingComponent from "./RevenueCeilingComponent";

// // const ProjectBudgetStatus = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [prefixes, setPrefixes] = useState(new Set());
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showHours, setShowHours] = useState(false);
// //   const [showAmounts, setShowAmounts] = useState(false);
// //   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
// //   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
// //   const [hoursProjectId, setHoursProjectId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searched, setSearched] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [forecastData, setForecastData] = useState([]);
// //   const [isForecastLoading, setIsForecastLoading] = useState(false);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [fiscalYear, setFiscalYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [analysisApiData, setAnalysisApiData] = useState([]);
// //   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
// //   const [analysisError, setAnalysisError] = useState(null);
// //   const [showPLC, setShowPLC] = useState(false);
// //   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
// //   const [showFunding, setShowFunding] = useState(false);
// //   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);

// //   const hoursRefs = useRef({});
// //   const amountsRefs = useRef({});
// //   const revenueRefs = useRef({});
// //   const analysisRefs = useRef({});
// //   const revenueSetupRefs = useRef({});
// //   const revenueCeilingRefs = useRef({});
// //   const inputRef = useRef(null);
// //   const suggestionsRef = useRef(null);

// //   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
// //   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

// //   // Load selectedPlan from localStorage on mount
// //   useEffect(() => {
// //     const savedPlan = localStorage.getItem("selectedPlan");
// //     if (savedPlan) {
// //       try {
// //         const parsedPlan = JSON.parse(savedPlan);
// //         setSelectedPlan(parsedPlan);
// //         setSearchTerm(parsedPlan.projId || "");
// //       } catch (error) {
// //         console.error("Error parsing saved plan from localStorage:", error);
// //         localStorage.removeItem("selectedPlan");
// //       }
// //     }
// //   }, []);

// //   useEffect(() => {
// //     setLoading(true);
// //     axios
// //       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
// //       .then((res) => {
// //         const transformedData = res.data.map((project) => ({
// //           projId: project.projectId,
// //           projName: project.name,
// //           projTypeDc: project.description,
// //           orgId: project.orgId,
// //           startDate: project.startDate,
// //           endDate: project.endDate,
// //           fundedCost: project.proj_f_cst_amt || "",
// //           fundedFee: project.proj_f_fee_amt || "",
// //           fundedRev: project.proj_f_tot_amt || "",
// //         }));
// //         const prefixSet = new Set(
// //           transformedData.map((project) => {
// //             const { projId } = project;
// //             if (projId.includes(".")) return projId.split(".")[0];
// //             else if (projId.includes("T")) return projId.split("T")[0];
// //             return projId;
// //           })
// //         );
// //         setPrefixes(prefixSet);
// //         setProjects(transformedData);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setProjects([]);
// //         setPrefixes(new Set());
// //         setFilteredProjects([]);
// //         setLoading(false);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     const fetchAnalysisData = async () => {
// //       if (
// //         !selectedPlan ||
// //         !selectedPlan.plId ||
// //         !selectedPlan.templateId ||
// //         !selectedPlan.plType
// //       ) {
// //         setAnalysisApiData([]);
// //         setIsAnalysisLoading(false);
// //         setAnalysisError("Please select a plan to view Analysis By Period.");
// //         return;
// //       }
// //       if (!showAnalysisByPeriod) return;

// //       setIsAnalysisLoading(true);
// //       setAnalysisError(null);
// //       try {
// //         const params = new URLSearchParams({
// //           planID: selectedPlan.plId.toString(),
// //           templateId: selectedPlan.templateId.toString(),
// //           type: selectedPlan.plType,
// //         });
// //         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
// //         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

// //         const response = await fetch(externalApiUrl, {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //           cache: "no-store",
// //         });

// //         if (!response.ok) {
// //           let errorText = "Unknown error";
// //           try {
// //             errorText =
// //               (await response.json()).message ||
// //               JSON.stringify(await response.json());
// //           } catch (e) {
// //             errorText = await response.text();
// //           }
// //           throw new Error(
// //             `HTTP error! status: ${response.status}. Details: ${errorText}`
// //           );
// //         }

// //         const apiResponse = await response.json();
// //         setAnalysisApiData(apiResponse);
// //       } catch (err) {
// //         console.error("Analysis By Period fetch error:", err);
// //         setAnalysisError(
// //           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
// //         );
// //         setAnalysisApiData([]);
// //       } finally {
// //         setIsAnalysisLoading(false);
// //       }
// //     };
// //     fetchAnalysisData();
// //   }, [
// //     selectedPlan,
// //     showAnalysisByPeriod,
// //     EXTERNAL_API_BASE_URL,
// //     CALCULATE_COST_ENDPOINT,
// //   ]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current &&
// //         !suggestionsRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") setShowSuggestions(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[hoursProjectId].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAmounts && amountsRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           amountsRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           analysisRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueSetupRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueCeilingRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showPLC && hoursRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     }
// //   }, [
// //     showHours,
// //     showAmounts,
// //     showRevenueAnalysis,
// //     showAnalysisByPeriod,
// //     showRevenueSetup,
// //     showRevenueCeiling,
// //     showPLC,
// //     hoursProjectId,
// //     searchTerm,
// //   ]);

// //   const handleSearch = () => {
// //     const term = searchTerm.trim();
// //     setSearched(true);
// //     setErrorMessage("");
// //     setShowSuggestions(false);

// //     if (term === "") {
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     if (
// //       !Array.from(prefixes).some(
// //         (prefix) => prefix.toLowerCase() === term.toLowerCase()
// //       )
// //     ) {
// //       setErrorMessage("Search valid project ID");
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(term.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") handleSearch();
// //   };

// //   const handleInputChange = (e) => {
// //     setSearchTerm(e.target.value);
// //     setErrorMessage("");
// //     setSearched(false);
// //     setFilteredProjects([]);
// //     setShowSuggestions(e.target.value.trim().length > 0);
// //   };

// //   const handleSuggestionClick = (prefix) => {
// //     setSearchTerm(prefix);
// //     setShowSuggestions(false);
// //     setSearched(true);
// //     setErrorMessage("");

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handlePlanSelect = (plan) => {
// //     setSelectedPlan(plan);
// //     localStorage.setItem("selectedPlan", JSON.stringify(plan)); // Persist selectedPlan
// //     // setSearchTerm(plan.projId);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setHoursProjectId(null);
// //     setShowRevenueAnalysis(false);
// //     setShowAnalysisByPeriod(false);
// //     setShowPLC(false);
// //     setShowRevenueSetup(false);
// //     setShowFunding(false);
// //     setShowRevenueCeiling(false);
// //     setForecastData([]);
// //     setIsForecastLoading(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleHoursTabClick = async (projId) => {
// //     if (!selectedPlan) {
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showHours && hoursProjectId === projId) {
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowHours(true);
// //       setShowAmounts(false);
// //       setHoursProjectId(projId);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setIsForecastLoading(true);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);

// //       try {
// //         const employeeApi =
// //           selectedPlan.plType === "EAC"
// //             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
// //             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
// //         const response = await axios.get(employeeApi);
// //         if (!Array.isArray(response.data)) {
// //           setForecastData([]);
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           setForecastData(response.data);
// //         }
// //       } catch (err) {
// //         setForecastData([]);
// //         if (err.response && err.response.status === 500) {
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           toast.error(
// //             "Failed to load forecast data: " +
// //               (err.response?.data?.message || err.message),
// //             {
// //               toastId: "forecast-error",
// //               autoClose: 3000,
// //             }
// //           );
// //         }
// //       } finally {
// //         setIsForecastLoading(false);
// //       }
// //     }
// //   };

// //   const handleAmountsTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAmounts(false);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAmounts) {
// //       setShowAmounts(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAmounts(true);
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleRevenueAnalysisTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showRevenueAnalysis) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowRevenueAnalysis(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleAnalysisByPeriodTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAnalysisByPeriod) {
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAnalysisByPeriod(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handlePLCTabClick = (projId) => {
// //     if (showPLC) {
// //       setShowPLC((prev) => !prev);
// //     } else {
// //       setShowPLC((prev) => !prev);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueSetupTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueSetup(false);
// //       return;
// //     }
// //     if (showRevenueSetup) {
// //       setShowRevenueSetup(false);
// //     } else {
// //       setShowRevenueSetup(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleFundingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowFunding(false);
// //       return;
// //     }
// //     if (showFunding) {
// //       setShowFunding(false);
// //     } else {
// //       setShowFunding(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueCeilingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueCeiling(false);
// //       return;
// //     }
// //     if (showRevenueCeiling) {
// //       setShowRevenueCeiling(false);
// //     } else {
// //       setShowRevenueCeiling(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //     }
// //   };

// //   const onAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setShowRevenueAnalysis(false);
// //     setHoursProjectId(null);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //     toast.info("Analysis By Period cancelled.", {
// //       toastId: "analysis-cancel",
// //       autoClose: 3000,
// //     });
// //   };

// //   if (loading && projects.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64 font-inter">
// //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm sm:text-base">
// //           Loading...
// //         </span>
// //       </div>
// //     );
// //   }

// //   const suggestions = Array.from(prefixes).filter((prefix) =>
// //     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
// //   );

// //   return (
// //     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         closeOnClick
// //         pauseOnHover
// //         draggable
// //         closeButton
// //       />
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
// //           <label className="font-semibold text-xs sm:text-sm">
// //             Project ID:
// //           </label>
// //           <div className="relative w-full sm:w-64">
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               value={searchTerm}
// //               onChange={handleInputChange}
// //               onKeyDown={handleKeyPress}
// //               ref={inputRef}
// //               autoComplete="off"
// //             />
// //             {showSuggestions && suggestions.length > 0 && (
// //               <div
// //                 ref={suggestionsRef}
// //                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
// //               >
// //                 {suggestions.map((prefix) => (
// //                   <div
// //                     key={prefix}
// //                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
// //                     onClick={() => handleSuggestionClick(prefix)}
// //                   >
// //                     {prefix}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //           <button
// //             onClick={handleSearch}
// //             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           Loading...
// //         </div>
// //       ) : searched && errorMessage ? (
// //         <div className="text-red-500 italic text-xs sm:text-sm">
// //           {errorMessage}
// //         </div>
// //       ) : searched && filteredProjects.length === 0 ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           No project found with that ID.
// //         </div>
// //       ) : (
// //         filteredProjects.length > 0 && (
// //           <div
// //             key={searchTerm}
// //             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
// //           >
// //             <h2 className="font-normal text-sm sm:text-base text-blue-600">
// //               Project: {searchTerm}
// //             </h2>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
// //               <Field label="Project" value={searchTerm} />
// //               <Field
// //                 label="Project Name"
// //                 value={filteredProjects[0].projName}
// //               />
// //               <Field
// //                 label="Funded Cost"
// //                 value={filteredProjects[0].fundedCost}
// //                 isCurrency
// //               />
// //               <Field label="Organization" value={filteredProjects[0].orgId} />
// //               <Field
// //                 label="Description"
// //                 value={filteredProjects[0].projTypeDc}
// //               />
// //               <Field
// //                 label="Funded Fee"
// //                 value={filteredProjects[0].fundedFee}
// //                 isCurrency
// //               />
// //               <Field label="Start Date" value={filteredProjects[0].startDate} />
// //               <Field label="End Date" value={filteredProjects[0].endDate} />
// //               <Field
// //                 label="Funded Rev"
// //                 value={filteredProjects[0].fundedRev}
// //                 isCurrency
// //               />
// //             </div>

// //             <ProjectPlanTable
// //               projectId={searchTerm}
// //               onPlanSelect={handlePlanSelect}
// //               selectedPlan={selectedPlan}
// //               fiscalYear={fiscalYear}
// //               setFiscalYear={setFiscalYear}
// //             />

// //             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
// //               <span
// //                 className={`cursor-pointer ${
// //                   showHours && hoursProjectId === searchTerm
// //                     ? "font-normal text-blue-800"
// //                     : ""
// //                 }`}
// //                 onClick={() => handleHoursTabClick(searchTerm)}
// //               >
// //                 Hours
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAmounts ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAmountsTabClick(searchTerm)}
// //               >
// //                 Amounts
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
// //               >
// //                 Revenue Analysis
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
// //               >
// //                 Analysis By Period
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showPLC ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handlePLCTabClick(searchTerm)}
// //               >
// //                 PLC
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${showRevenueSetup ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
// //               >
// //                 Revenue Setup
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${showRevenueCeiling ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
// //               >
// //                 Revenue Ceiling
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${showFunding ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleFundingTabClick(searchTerm)}
// //               >
// //                 Funding
// //               </span>
// //             </div>

// //             {showHours && selectedPlan && hoursProjectId === searchTerm && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                   <span className="font-normal">Project ID:</span>{" "}
// //                   {selectedPlan.projId},{" "}
// //                   <span className="font-normal">Type:</span>{" "}
// //                   {selectedPlan.plType || "N/A"},{" "}
// //                   <span className="font-normal">Version:</span>{" "}
// //                   {selectedPlan.version || "N/A"},{" "}
// //                   <span className="font-normal">Status:</span>{" "}
// //                   {selectedPlan.status || "N/A"}
// //                 </div>
// //                 <ProjectHoursDetails
// //                   planId={selectedPlan.plId}
// //                   status={selectedPlan.status}
// //                   planType={selectedPlan.plType}
// //                   closedPeriod={selectedPlan.closedPeriod}
// //                   startDate={filteredProjects[0].startDate}
// //                   endDate={filteredProjects[0].endDate}
// //                   employees={forecastData}
// //                   isForecastLoading={isForecastLoading}
// //                   fiscalYear={fiscalYear}
// //                 />
// //               </div>
// //             )}

// //             {showAmounts &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <ProjectAmountsTable
// //                     initialData={selectedPlan}
// //                     startDate={filteredProjects[0].startDate}
// //                     endDate={filteredProjects[0].endDate}
// //                     planType={selectedPlan.plType}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showRevenueAnalysis &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <RevenueAnalysisTable
// //                     planId={selectedPlan.plId}
// //                     status={selectedPlan.status}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showAnalysisByPeriod &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <AnalysisByPeriodContent
// //                     onCancel={onAnalysisCancel}
// //                     planID={selectedPlan.plId}
// //                     templateId={selectedPlan.templateId || 1}
// //                     type={selectedPlan.plType || "TARGET"}
// //                     initialApiData={analysisApiData}
// //                     isLoading={isAnalysisLoading}
// //                     error={analysisError}
// //                   />
// //                 </div>
// //               )}

// //             {showPLC && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <PLCComponent selectedProjectId={selectedPlan?.projId} selectedPlan={selectedPlan} />
// //               </div>
// //             )}

// //             {showRevenueSetup &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueSetupComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showRevenueCeiling &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueCeilingComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showFunding &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <FundingComponent />
// //                 </div>
// //               )}
// //           </div>
// //         )
// //       )}
// //     </div>
// //   );
// // };

// // const Field = ({ label, value, isCurrency }) => {
// //   const formattedValue = isCurrency && value !== ""
// //     ? Number(value).toLocaleString("en-US", {
// //         minimumFractionDigits: 0,
// //         maximumFractionDigits: 0,
// //       })
// //     : value || "";
// //   return (
// //     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
// //       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
// //         {label}:
// //       </label>
// //       <input
// //         type="text"
// //         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
// //         value={formattedValue}
// //         readOnly
// //       />
// //     </div>
// //   );
// // };

// // export default ProjectBudgetStatus;

// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ProjectHoursDetails from "./ProjectHoursDetails";
// // import ProjectPlanTable from "./ProjectPlanTable";
// // import RevenueAnalysisTable from "./RevenueAnalysisTable";
// // import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// // import ProjectAmountsTable from "./ProjectAmountsTable";
// // import PLCComponent from "./PLCComponent";
// // import FundingComponent from "./FundingComponent";
// // import RevenueSetupComponent from "./RevenueSetupComponent";
// // import RevenueCeilingComponent from "./RevenueCeilingComponent";

// // const ProjectBudgetStatus = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [prefixes, setPrefixes] = useState(new Set());
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showHours, setShowHours] = useState(false);
// //   const [showAmounts, setShowAmounts] = useState(false);
// //   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
// //   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
// //   const [hoursProjectId, setHoursProjectId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searched, setSearched] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [forecastData, setForecastData] = useState([]);
// //   const [isForecastLoading, setIsForecastLoading] = useState(false);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [fiscalYear, setFiscalYear] = useState("All");
// //   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
// //   const [analysisApiData, setAnalysisApiData] = useState([]);
// //   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
// //   const [analysisError, setAnalysisError] = useState(null);
// //   const [showPLC, setShowPLC] = useState(false);
// //   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
// //   const [showFunding, setShowFunding] = useState(false);
// //   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);

// //   const hoursRefs = useRef({});
// //   const amountsRefs = useRef({});
// //   const revenueRefs = useRef({});
// //   const analysisRefs = useRef({});
// //   const revenueSetupRefs = useRef({});
// //   const revenueCeilingRefs = useRef({});
// //   const inputRef = useRef(null);
// //   const suggestionsRef = useRef(null);

// //   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
// //   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

// //   // Load selectedPlan from localStorage on mount
// //   useEffect(() => {
// //     const savedPlan = localStorage.getItem("selectedPlan");
// //     if (savedPlan) {
// //       try {
// //         const parsedPlan = JSON.parse(savedPlan);
// //         setSelectedPlan(parsedPlan);
// //         setSearchTerm(parsedPlan.projId || "");
// //       } catch (error) {
// //         console.error("Error parsing saved plan from localStorage:", error);
// //         localStorage.removeItem("selectedPlan");
// //       }
// //     }
// //   }, []);

// //   useEffect(() => {
// //     setLoading(true);
// //     axios
// //       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
// //       .then((res) => {
// //         const transformedData = res.data.map((project) => ({
// //           projId: project.projectId,
// //           projName: project.name,
// //           projTypeDc: project.description,
// //           orgId: project.orgId,
// //           startDate: project.startDate,
// //           endDate: project.endDate,
// //           fundedCost: project.proj_f_cst_amt || "",
// //           fundedFee: project.proj_f_fee_amt || "",
// //           fundedRev: project.proj_f_tot_amt || "",
// //         }));
// //         const prefixSet = new Set(
// //           transformedData.map((project) => {
// //             const { projId } = project;
// //             if (projId.includes(".")) return projId.split(".")[0];
// //             else if (projId.includes("T")) return projId.split("T")[0];
// //             return projId;
// //           })
// //         );
// //         setPrefixes(prefixSet);
// //         setProjects(transformedData);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setProjects([]);
// //         setPrefixes(new Set());
// //         setFilteredProjects([]);
// //         setLoading(false);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     const fetchAnalysisData = async () => {
// //       if (
// //         !selectedPlan ||
// //         !selectedPlan.plId ||
// //         !selectedPlan.templateId ||
// //         !selectedPlan.plType
// //       ) {
// //         setAnalysisApiData([]);
// //         setIsAnalysisLoading(false);
// //         setAnalysisError("Please select a plan to view Analysis By Period.");
// //         return;
// //       }
// //       if (!showAnalysisByPeriod) return;

// //       setIsAnalysisLoading(true);
// //       setAnalysisError(null);
// //       try {
// //         const params = new URLSearchParams({
// //           planID: selectedPlan.plId.toString(),
// //           templateId: selectedPlan.templateId.toString(),
// //           type: selectedPlan.plType,
// //         });
// //         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
// //         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

// //         const response = await fetch(externalApiUrl, {
// //           method: "GET",
// //           headers: { "Content-Type": "application/json" },
// //           cache: "no-store",
// //         });

// //         if (!response.ok) {
// //           let errorText = "Unknown error";
// //           try {
// //             errorText =
// //               (await response.json()).message ||
// //               JSON.stringify(await response.json());
// //           } catch (e) {
// //             errorText = await response.text();
// //           }
// //           throw new Error(
// //             `HTTP error! status: ${response.status}. Details: ${errorText}`
// //           );
// //         }

// //         const apiResponse = await response.json();
// //         setAnalysisApiData(apiResponse);
// //       } catch (err) {
// //         console.error("Analysis By Period fetch error:", err);
// //         setAnalysisError(
// //           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
// //         );
// //         setAnalysisApiData([]);
// //       } finally {
// //         setIsAnalysisLoading(false);
// //       }
// //     };
// //     fetchAnalysisData();
// //   }, [
// //     selectedPlan,
// //     showAnalysisByPeriod,
// //     EXTERNAL_API_BASE_URL,
// //     CALCULATE_COST_ENDPOINT,
// //   ]);

// //   useEffect(() => {
// //     if (filteredProjects.length > 0) {
// //       const project = filteredProjects[0];
// //       const { startDate, endDate } = project;

// //       if (startDate && endDate) {
// //         try {
// //             const startYear = new Date(startDate).getFullYear();
// //             const endYear = new Date(endDate).getFullYear();

// //             if (!isNaN(startYear) && !isNaN(endYear)) {
// //                 const years = [];
// //                 for (let year = startYear; year <= endYear; year++) {
// //                     years.push(year.toString());
// //                 }
// //                 setFiscalYearOptions(["All", ...years]);
// //                 if (fiscalYear !== "All" && !years.includes(fiscalYear)) {
// //                     setFiscalYear("All");
// //                 }
// //             } else {
// //                  setFiscalYearOptions([]);
// //             }
// //         } catch (e) {
// //             setFiscalYearOptions([]);
// //         }
// //       } else {
// //         setFiscalYearOptions([]);
// //       }
// //     } else {
// //       setFiscalYearOptions([]);
// //     }
// //   }, [filteredProjects, fiscalYear]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current &&
// //         !suggestionsRef.current.contains(event.target) &&
// //         inputRef.current &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     const handleKeyDown = (event) => {
// //       if (event.key === "Escape") setShowSuggestions(false);
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleKeyDown);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[hoursProjectId].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAmounts && amountsRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           amountsRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           analysisRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueSetupRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           revenueCeilingRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     } else if (showPLC && hoursRefs.current[searchTerm]) {
// //       setTimeout(
// //         () =>
// //           hoursRefs.current[searchTerm].scrollIntoView({
// //             behavior: "smooth",
// //             block: "start",
// //           }),
// //         150
// //       );
// //     }
// //   }, [
// //     showHours,
// //     showAmounts,
// //     showRevenueAnalysis,
// //     showAnalysisByPeriod,
// //     showRevenueSetup,
// //     showRevenueCeiling,
// //     showPLC,
// //     hoursProjectId,
// //     searchTerm,
// //   ]);

// //   const handleSearch = () => {
// //     const term = searchTerm.trim();
// //     setSearched(true);
// //     setErrorMessage("");
// //     setShowSuggestions(false);

// //     if (term === "") {
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     if (
// //       !Array.from(prefixes).some(
// //         (prefix) => prefix.toLowerCase() === term.toLowerCase()
// //       )
// //     ) {
// //       setErrorMessage("Search valid project ID");
// //       setFilteredProjects([]);
// //       return;
// //     }

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(term.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") handleSearch();
// //   };

// //   const handleInputChange = (e) => {
// //     setSearchTerm(e.target.value);
// //     setErrorMessage("");
// //     setSearched(false);
// //     setFilteredProjects([]);
// //     setShowSuggestions(e.target.value.trim().length > 0);
// //   };

// //   const handleSuggestionClick = (prefix) => {
// //     setSearchTerm(prefix);
// //     setShowSuggestions(false);
// //     setSearched(true);
// //     setErrorMessage("");

// //     const filtered = projects.filter((p) =>
// //       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const handlePlanSelect = (plan) => {
// //     setSelectedPlan(plan);
// //     localStorage.setItem("selectedPlan", JSON.stringify(plan)); // Persist selectedPlan
// //     // setSearchTerm(plan.projId);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setHoursProjectId(null);
// //     setShowRevenueAnalysis(false);
// //     setShowAnalysisByPeriod(false);
// //     setShowPLC(false);
// //     setShowRevenueSetup(false);
// //     setShowFunding(false);
// //     setShowRevenueCeiling(false);
// //     setForecastData([]);
// //     setIsForecastLoading(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleHoursTabClick = async (projId) => {
// //     if (!selectedPlan) {
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showHours && hoursProjectId === projId) {
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setForecastData([]);
// //       setIsForecastLoading(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowHours(true);
// //       setShowAmounts(false);
// //       setHoursProjectId(projId);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setIsForecastLoading(true);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);

// //       try {
// //         const employeeApi =
// //           selectedPlan.plType === "EAC"
// //             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
// //             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
// //         const response = await axios.get(employeeApi);
// //         if (!Array.isArray(response.data)) {
// //           setForecastData([]);
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           setForecastData(response.data);
// //         }
// //       } catch (err) {
// //         setForecastData([]);
// //         if (err.response && err.response.status === 500) {
// //           toast.info(
// //             'No forecast data available for this plan. Click "New" to add entries.',
// //             {
// //               toastId: "no-forecast-data",
// //               autoClose: 3000,
// //             }
// //           );
// //         } else {
// //           toast.error(
// //             "Failed to load forecast data: " +
// //               (err.response?.data?.message || err.message),
// //             {
// //               toastId: "forecast-error",
// //               autoClose: 3000,
// //             }
// //           );
// //         }
// //       } finally {
// //         setIsForecastLoading(false);
// //       }
// //     }
// //   };

// //   const handleAmountsTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAmounts(false);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAmounts) {
// //       setShowAmounts(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAmounts(true);
// //       setShowHours(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleRevenueAnalysisTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showRevenueAnalysis) {
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowRevenueAnalysis(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     }
// //   };

// //   const handleAnalysisByPeriodTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //       return;
// //     }
// //     if (showAnalysisByPeriod) {
// //       setShowAnalysisByPeriod(false);
// //       setAnalysisApiData([]);
// //       setIsAnalysisLoading(false);
// //       setAnalysisError(null);
// //     } else {
// //       setShowAnalysisByPeriod(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handlePLCTabClick = (projId) => {
// //     if (showPLC) {
// //       setShowPLC((prev) => !prev);
// //     } else {
// //       setShowPLC((prev) => !prev);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueSetupTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueSetup(false);
// //       return;
// //     }
// //     if (showRevenueSetup) {
// //       setShowRevenueSetup(false);
// //     } else {
// //       setShowRevenueSetup(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowFunding(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleFundingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowFunding(false);
// //       return;
// //     }
// //     if (showFunding) {
// //       setShowFunding(false);
// //     } else {
// //       setShowFunding(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowRevenueCeiling(false);
// //     }
// //   };

// //   const handleRevenueCeilingTabClick = (projId) => {
// //     if (!selectedPlan) {
// //       setShowRevenueCeiling(false);
// //       return;
// //     }
// //     if (showRevenueCeiling) {
// //       setShowRevenueCeiling(false);
// //     } else {
// //       setShowRevenueCeiling(true);
// //       setShowHours(false);
// //       setShowAmounts(false);
// //       setHoursProjectId(null);
// //       setShowRevenueAnalysis(false);
// //       setShowAnalysisByPeriod(false);
// //       setShowPLC(false);
// //       setShowRevenueSetup(false);
// //       setShowFunding(false);
// //     }
// //   };

// //   const onAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //   };

// //   const handleAnalysisCancel = () => {
// //     setShowAnalysisByPeriod(false);
// //     setShowHours(false);
// //     setShowAmounts(false);
// //     setShowRevenueAnalysis(false);
// //     setHoursProjectId(null);
// //     setAnalysisApiData([]);
// //     setIsAnalysisLoading(false);
// //     setAnalysisError(null);
// //     toast.info("Analysis By Period cancelled.", {
// //       toastId: "analysis-cancel",
// //       autoClose: 3000,
// //     });
// //   };

// //   if (loading && projects.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64 font-inter">
// //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// //         <span className="ml-2 text-gray-600 text-sm sm:text-base">
// //           Loading...
// //         </span>
// //       </div>
// //     );
// //   }

// //   const suggestions = Array.from(prefixes).filter((prefix) =>
// //     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
// //   );

// //   return (
// //     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         closeOnClick
// //         pauseOnHover
// //         draggable
// //         closeButton
// //       />
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
// //           <label className="font-semibold text-xs sm:text-sm">
// //             Project ID:
// //           </label>
// //           <div className="relative w-full sm:w-64">
// //             <input
// //               type="text"
// //               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
// //               value={searchTerm}
// //               onChange={handleInputChange}
// //               onKeyDown={handleKeyPress}
// //               ref={inputRef}
// //               autoComplete="off"
// //             />
// //             {showSuggestions && suggestions.length > 0 && (
// //               <div
// //                 ref={suggestionsRef}
// //                 className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg max-h-40 overflow-y-auto mt-1"
// //               >
// //                 {suggestions.map((prefix) => (
// //                   <div
// //                     key={prefix}
// //                     className="px-3 py-2 text-xs sm:text-sm hover:bg-blue-100 cursor-pointer"
// //                     onClick={() => handleSuggestionClick(prefix)}
// //                   >
// //                     {prefix}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //           <button
// //             onClick={handleSearch}
// //             className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           Loading...
// //         </div>
// //       ) : searched && errorMessage ? (
// //         <div className="text-red-500 italic text-xs sm:text-sm">
// //           {errorMessage}
// //         </div>
// //       ) : searched && filteredProjects.length === 0 ? (
// //         <div className="text-gray-500 italic text-xs sm:text-sm">
// //           No project found with that ID.
// //         </div>
// //       ) : (
// //         filteredProjects.length > 0 && (
// //           <div
// //             key={searchTerm}
// //             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
// //           >
// //             <h2 className="font-normal text-sm sm:text-base text-blue-600">
// //               Project: {searchTerm}
// //             </h2>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
// //               <Field label="Project" value={searchTerm} />
// //               <Field
// //                 label="Project Name"
// //                 value={filteredProjects[0].projName}
// //               />
// //               <Field
// //                 label="Funded Cost"
// //                 value={filteredProjects[0].fundedCost}
// //                 isCurrency
// //               />
// //               <Field label="Organization" value={filteredProjects[0].orgId} />
// //               <Field
// //                 label="Description"
// //                 value={filteredProjects[0].projTypeDc}
// //               />
// //               <Field
// //                 label="Funded Fee"
// //                 value={filteredProjects[0].fundedFee}
// //                 isCurrency
// //               />
// //               <Field label="Start Date" value={filteredProjects[0].startDate} />
// //               <Field label="End Date" value={filteredProjects[0].endDate} />
// //               <Field
// //                 label="Funded Rev"
// //                 value={filteredProjects[0].fundedRev}
// //                 isCurrency
// //               />
// //             </div>

// //             <div className="flex items-center gap-2 pt-2">
// //                 <label htmlFor="fiscalYear" className="font-semibold text-xs sm:text-sm">Fiscal Year:</label>
// //                 <select
// //                     id="fiscalYear"
// //                     value={fiscalYear}
// //                     onChange={(e) => setFiscalYear(e.target.value)}
// //                     className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     disabled={fiscalYearOptions.length === 0}
// //                 >
// //                     {fiscalYearOptions.map(year => (
// //                         <option key={year} value={year}>{year}</option>
// //                     ))}
// //                 </select>
// //             </div>

// //             <ProjectPlanTable
// //               projectId={searchTerm}
// //               onPlanSelect={handlePlanSelect}
// //               selectedPlan={selectedPlan}
// //               fiscalYear={fiscalYear}
// //               setFiscalYear={setFiscalYear}
// //             />

// //             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
// //               <span
// //                 className={`cursor-pointer ${
// //                   showHours && hoursProjectId === searchTerm
// //                     ? "font-normal text-blue-800"
// //                     : ""
// //                 }`}
// //                 onClick={() => handleHoursTabClick(searchTerm)}
// //               >
// //                 Hours
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAmounts ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAmountsTabClick(searchTerm)}
// //               >
// //                 Amounts
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
// //               >
// //                 Revenue Analysis
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
// //               >
// //                 Analysis By Period
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${
// //                   showPLC ? "font-normal text-blue-800" : ""
// //                 }`}
// //                 onClick={() => handlePLCTabClick(searchTerm)}
// //               >
// //                 PLC
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${showRevenueSetup ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
// //               >
// //                 Revenue Setup
// //               </span>
// //                <span
// //                 className={`cursor-pointer ${showRevenueCeiling ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
// //               >
// //                 Revenue Ceiling
// //               </span>
// //               <span
// //                 className={`cursor-pointer ${showFunding ? "font-normal text-blue-800" : ""}`}
// //                 onClick={() => handleFundingTabClick(searchTerm)}
// //               >
// //                 Funding
// //               </span>
// //             </div>

// //             {showHours && selectedPlan && hoursProjectId === searchTerm && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                   <span className="font-normal">Project ID:</span>{" "}
// //                   {selectedPlan.projId},{" "}
// //                   <span className="font-normal">Type:</span>{" "}
// //                   {selectedPlan.plType || "N/A"},{" "}
// //                   <span className="font-normal">Version:</span>{" "}
// //                   {selectedPlan.version || "N/A"},{" "}
// //                   <span className="font-normal">Status:</span>{" "}
// //                   {selectedPlan.status || "N/A"}
// //                 </div>
// //                 <ProjectHoursDetails
// //                   planId={selectedPlan.plId}
// //                   status={selectedPlan.status}
// //                   planType={selectedPlan.plType}
// //                   closedPeriod={selectedPlan.closedPeriod}
// //                   startDate={filteredProjects[0].startDate}
// //                   endDate={filteredProjects[0].endDate}
// //                   employees={forecastData}
// //                   isForecastLoading={isForecastLoading}
// //                   fiscalYear={fiscalYear}
// //                 />
// //               </div>
// //             )}

// //             {showAmounts &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <ProjectAmountsTable
// //                     initialData={selectedPlan}
// //                     startDate={filteredProjects[0].startDate}
// //                     endDate={filteredProjects[0].endDate}
// //                     planType={selectedPlan.plType}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showRevenueAnalysis &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <RevenueAnalysisTable
// //                     planId={selectedPlan.plId}
// //                     status={selectedPlan.status}
// //                     fiscalYear={fiscalYear}
// //                   />
// //                 </div>
// //               )}

// //             {showAnalysisByPeriod &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
// //                     <span className="font-normal">Project ID:</span>{" "}
// //                     {selectedPlan.projId},{" "}
// //                     <span className="font-normal">Type:</span>{" "}
// //                     {selectedPlan.plType || "N/A"},{" "}
// //                     <span className="font-normal">Version:</span>{" "}
// //                     {selectedPlan.version || "N/A"},{" "}
// //                     <span className="font-normal">Status:</span>{" "}
// //                     {selectedPlan.status || "N/A"}
// //                   </div>
// //                   <AnalysisByPeriodContent
// //                     onCancel={onAnalysisCancel}
// //                     planID={selectedPlan.plId}
// //                     templateId={selectedPlan.templateId || 1}
// //                     type={selectedPlan.plType || "TARGET"}
// //                     initialApiData={analysisApiData}
// //                     isLoading={isAnalysisLoading}
// //                     error={analysisError}
// //                   />
// //                 </div>
// //               )}

// //             {showPLC && (
// //               <div
// //                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //               >
// //                 <PLCComponent selectedProjectId={selectedPlan?.projId} selectedPlan={selectedPlan} />
// //               </div>
// //             )}

// //             {showRevenueSetup &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueSetupComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showRevenueCeiling &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <RevenueCeilingComponent selectedPlan={selectedPlan} />
// //                 </div>
// //               )}

// //             {showFunding &&
// //               selectedPlan &&
// //               selectedPlan.projId.startsWith(searchTerm) && (
// //                 <div
// //                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
// //                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
// //                 >
// //                   <FundingComponent />
// //                 </div>
// //               )}
// //           </div>
// //         )
// //       )}
// //     </div>
// //   );
// // };

// // const Field = ({ label, value, isCurrency }) => {
// //   const formattedValue = isCurrency && value !== ""
// //     ? Number(value).toLocaleString("en-US", {
// //         minimumFractionDigits: 0,
// //         maximumFractionDigits: 0,
// //       })
// //     : value || "";
// //   return (
// //     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
// //       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
// //         {label}:
// //       </label>
// //       <input
// //         type="text"
// //         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
// //         value={formattedValue}
// //         readOnly
// //       />
// //     </div>
// //   );
// // };

// // export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProjectHoursDetails from "./ProjectHoursDetails";
// import ProjectPlanTable from "./ProjectPlanTable";
// import RevenueAnalysisTable from "./RevenueAnalysisTable";
// import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// import ProjectAmountsTable from "./ProjectAmountsTable";
// import PLCComponent from "./PLCComponent";
// import FundingComponent from "./FundingComponent";
// import RevenueSetupComponent from "./RevenueSetupComponent";
// import RevenueCeilingComponent from "./RevenueCeilingComponent";

// const ProjectBudgetStatus = () => {
//   // ... (all existing state declarations remain the same)
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [showHours, setShowHours] = useState(false);
//   const [showAmounts, setShowAmounts] = useState(false);
//   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
//   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
//   const [hoursProjectId, setHoursProjectId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [showPLC, setShowPLC] = useState(false);
//   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
//   const [showFunding, setShowFunding] = useState(false);
//   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);

//   // ... (all refs and constants remain the same)
//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   // ... (all existing useEffect hooks remain the same)
//   useEffect(() => {
//     const savedPlan = localStorage.getItem("selectedPlan");
//     if (savedPlan) {
//       try {
//         const parsedPlan = JSON.parse(savedPlan);
//         setSelectedPlan(parsedPlan);
//         setSearchTerm(parsedPlan.projId || "");
//       } catch (error) {
//         console.error("Error parsing saved plan from localStorage:", error);
//         localStorage.removeItem("selectedPlan");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
//       .then((res) => {
//         const transformedData = res.data.map((project) => ({
//           projId: project.projectId,
//           projName: project.name,
//           projTypeDc: project.description,
//           orgId: project.orgId,
//           startDate: project.startDate,
//           endDate: project.endDate,
//           fundedCost: project.proj_f_cst_amt || "",
//           fundedFee: project.proj_f_fee_amt || "",
//           fundedRev: project.proj_f_tot_amt || "",
//         }));
//         const prefixSet = new Set(
//           transformedData.map((project) => {
//             const { projId } = project;
//             if (projId.includes(".")) return projId.split(".")[0];
//             else if (projId.includes("T")) return projId.split("T")[0];
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
//     const fetchAnalysisData = async () => {
//       if (
//         !selectedPlan ||
//         !selectedPlan.plId ||
//         !selectedPlan.templateId ||
//         !selectedPlan.plType
//       ) {
//         setAnalysisApiData([]);
//         setIsAnalysisLoading(false);
//         setAnalysisError("Please select a plan to view Analysis By Period.");
//         return;
//       }
//       if (!showAnalysisByPeriod) return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
//         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

//         const response = await fetch(externalApiUrl, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           cache: "no-store",
//         });

//         if (!response.ok) {
//           let errorText = "Unknown error";
//           try {
//             errorText =
//               (await response.json()).message ||
//               JSON.stringify(await response.json());
//           } catch (e) {
//             errorText = await response.text();
//           }
//           throw new Error(
//             `HTTP error! status: ${response.status}. Details: ${errorText}`
//           );
//         }

//         const apiResponse = await response.json();
//         setAnalysisApiData(apiResponse);
//       } catch (err) {
//         console.error("Analysis By Period fetch error:", err);
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [
//     selectedPlan,
//     showAnalysisByPeriod,
//     EXTERNAL_API_BASE_URL,
//     CALCULATE_COST_ENDPOINT,
//   ]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const { startDate, endDate } = project;

//       if (startDate && endDate) {
//         try {
//           const startYear = new Date(startDate).getFullYear();
//           const endYear = new Date(endDate).getFullYear();

//           if (!isNaN(startYear) && !isNaN(endYear)) {
//             const years = [];
//             for (let year = startYear; year <= endYear; year++) {
//               years.push(year.toString());
//             }
//             setFiscalYearOptions(["All", ...years]);
//             if (fiscalYear !== "All" && !years.includes(fiscalYear)) {
//               setFiscalYear("All");
//             }
//           } else {
//             setFiscalYearOptions([]);
//           }
//         } catch (e) {
//           setFiscalYearOptions([]);
//         }
//       } else {
//         setFiscalYearOptions([]);
//       }
//     } else {
//       setFiscalYearOptions([]);
//     }
//   }, [filteredProjects, fiscalYear]);

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
//       if (event.key === "Escape") setShowSuggestions(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
//       setTimeout(
//         () =>
//           hoursRefs.current[hoursProjectId].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showAmounts && amountsRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           amountsRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           analysisRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueSetupRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueCeilingRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showPLC && hoursRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           hoursRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     }
//   }, [
//     showHours,
//     showAmounts,
//     showRevenueAnalysis,
//     showAnalysisByPeriod,
//     showRevenueSetup,
//     showRevenueCeiling,
//     showPLC,
//     hoursProjectId,
//     searchTerm,
//   ]);

//   const handleSearch = () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setShowSuggestions(false);

//     if (term === "") {
//       setFilteredProjects([]);
//       return;
//     }

//     if (
//       !Array.from(prefixes).some(
//         (prefix) => prefix.toLowerCase() === term.toLowerCase()
//       )
//     ) {
//       setErrorMessage("Search valid project ID");
//       setFilteredProjects([]);
//       return;
//     }

//     const filtered = projects.filter((p) =>
//       p.projId.toLowerCase().startsWith(term.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//     setErrorMessage("");
//     setSearched(false);
//     setFilteredProjects([]);
//     setShowSuggestions(e.target.value.trim().length > 0);
//   };

//   const handleSuggestionClick = (prefix) => {
//     setSearchTerm(prefix);
//     setShowSuggestions(false);
//     setSearched(true);
//     setErrorMessage("");

//     const filtered = projects.filter((p) =>
//       p.projId.toLowerCase().startsWith(prefix.toLowerCase())
//     );
//     setFilteredProjects(filtered);
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     localStorage.setItem("selectedPlan", JSON.stringify(plan)); // Persist selectedPlan
//     // setSearchTerm(plan.projId);
//     setShowHours(false);
//     setShowAmounts(false);
//     setHoursProjectId(null);
//     setShowRevenueAnalysis(false);
//     setShowAnalysisByPeriod(false);
//     setShowPLC(false);
//     setShowRevenueSetup(false);
//     setShowFunding(false);
//     setShowRevenueCeiling(false);
//     setForecastData([]);
//     setIsForecastLoading(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//   };

//   /**
//    * Fetches the forecast data for the currently selected plan.
//    * This function can be passed to child components to trigger a data refresh.
//    */
//   const fetchForecastData = async () => {
//     if (!selectedPlan) {
//       setForecastData([]);
//       return;
//     }

//     setIsForecastLoading(true);
//     try {
//       const employeeApi = `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//       const response = await axios.get(employeeApi);
//       if (!Array.isArray(response.data)) {
//         setForecastData([]);
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           { toastId: "no-forecast-data-refresh", autoClose: 3000 }
//         );
//       } else {
//         setForecastData(response.data);
//       }
//     } catch (err) {
//       setForecastData([]);
//       if (err.response && err.response.status === 500) {
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           { toastId: "no-forecast-data-refresh", autoClose: 3000 }
//         );
//       } else {
//         toast.error(
//           "Failed to refresh forecast data: " +
//             (err.response?.data?.message || err.message),
//           { toastId: "forecast-refresh-error", autoClose: 3000 }
//         );
//       }
//     } finally {
//       setIsForecastLoading(false);
//     }
//   };

//   const handleHoursTabClick = async (projId) => {
//     if (!selectedPlan) {
//       setShowHours(false);
//       // ... (reset other states)
//       return;
//     }
//     if (showHours && hoursProjectId === projId) {
//       setShowHours(false);
//       setHoursProjectId(null);
//     } else {
//       setShowHours(true);
//       setShowAmounts(false);
//       setHoursProjectId(projId);
//       // ... (reset other irrelevant states)
//       fetchForecastData(); // Call the extracted function
//     }
//   };

//   // ... (all other handler functions remain the same)
//   const handleAmountsTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAmounts(false);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleRevenueAnalysisTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleAnalysisByPeriodTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAnalysisByPeriod(false);
//       setShowRevenueAnalysis(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }
//     if (showAnalysisByPeriod) {
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     } else {
//       setShowAnalysisByPeriod(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handlePLCTabClick = (projId) => {
//     if (showPLC) {
//       setShowPLC((prev) => !prev);
//     } else {
//       setShowPLC((prev) => !prev);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleRevenueSetupTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueSetup(false);
//       return;
//     }
//     if (showRevenueSetup) {
//       setShowRevenueSetup(false);
//     } else {
//       setShowRevenueSetup(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleFundingTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowFunding(false);
//       return;
//     }
//     if (showFunding) {
//       setShowFunding(false);
//     } else {
//       setShowFunding(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleRevenueCeilingTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueCeiling(false);
//       return;
//     }
//     if (showRevenueCeiling) {
//       setShowRevenueCeiling(false);
//     } else {
//       setShowRevenueCeiling(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//     }
//   };

//   const onAnalysisCancel = () => {
//     setShowAnalysisByPeriod(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
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
//     toast.info("Analysis By Period cancelled.", {
//       toastId: "analysis-cancel",
//       autoClose: 3000,
//     });
//   };

//   // ... (JSX rendering logic)
//   if (loading && projects.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64 font-inter">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm sm:text-base">
//           Loading...
//         </span>
//       </div>
//     );
//   }

//   const suggestions = Array.from(prefixes).filter((prefix) =>
//     prefix.toLowerCase().startsWith(searchTerm.toLowerCase().trim())
//   );

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
//       {/* ... (ToastContainer and search bar JSX are unchanged) */}
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
//           <label className="font-semibold text-xs sm:text-sm">
//             Project ID:
//           </label>
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
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           Loading...
//         </div>
//       ) : searched && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">
//           {errorMessage}
//         </div>
//       ) : searched && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           No project found with that ID.
//         </div>
//       ) : (
//         filteredProjects.length > 0 && (
//           <div
//             key={searchTerm}
//             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//           >
//             {/* ... (Project details grid, fiscal year dropdown, and ProjectPlanTable are unchanged) */}
//             <h2 className="font-normal text-sm sm:text-base text-blue-600">
//               Project: {searchTerm}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
//               <Field label="Project" value={searchTerm} />
//               <Field
//                 label="Project Name"
//                 value={filteredProjects[0].projName}
//               />
//               <Field
//                 label="Funded Cost"
//                 value={filteredProjects[0].fundedCost}
//                 isCurrency
//               />
//               <Field label="Organization" value={filteredProjects[0].orgId} />
//               <Field
//                 label="Description"
//                 value={filteredProjects[0].projTypeDc}
//               />
//               <Field
//                 label="Funded Fee"
//                 value={filteredProjects[0].fundedFee}
//                 isCurrency
//               />
//               <Field label="Start Date" value={filteredProjects[0].startDate} />
//               <Field label="End Date" value={filteredProjects[0].endDate} />
//               <Field
//                 label="Funded Rev"
//                 value={filteredProjects[0].fundedRev}
//                 isCurrency
//               />
//             </div>

//             <div className="flex items-center gap-2 pt-2">
//               <label
//                 htmlFor="fiscalYear"
//                 className="font-semibold text-xs sm:text-sm"
//               >
//                 Fiscal Year:
//               </label>
//               <select
//                 id="fiscalYear"
//                 value={fiscalYear}
//                 onChange={(e) => setFiscalYear(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={fiscalYearOptions.length === 0}
//               >
//                 {fiscalYearOptions.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
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
//                 className={`cursor-pointer ${
//                   showHours && hoursProjectId === searchTerm
//                     ? "font-normal text-blue-800"
//                     : ""
//                 }`}
//                 onClick={() => handleHoursTabClick(searchTerm)}
//               >
//                 Hours
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showAmounts ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleAmountsTabClick(searchTerm)}
//               >
//                 Amounts
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
//               >
//                 Revenue Analysis
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
//               >
//                 Analysis By Period
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showPLC ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handlePLCTabClick(searchTerm)}
//               >
//                 PLC
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueSetup ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
//               >
//                 Revenue Setup
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueCeiling ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
//               >
//                 Revenue Ceiling
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showFunding ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleFundingTabClick(searchTerm)}
//               >
//                 Funding
//               </span>
//             </div>

//             {showHours && selectedPlan && hoursProjectId === searchTerm && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span>{" "}
//                   {selectedPlan.projId},{" "}
//                   <span className="font-normal">Type:</span>{" "}
//                   {selectedPlan.plType || "N/A"},{" "}
//                   <span className="font-normal">Version:</span>{" "}
//                   {selectedPlan.version || "N/A"},{" "}
//                   <span className="font-normal">Status:</span>{" "}
//                   {selectedPlan.status || "N/A"}
//                 </div>
//                 {/* Pass the projectId and the refresh function (onSaveSuccess) 
//                   as props to the ProjectHoursDetails component.
//                 */}
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   projectId={searchTerm}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   employees={forecastData}
//                   isForecastLoading={isForecastLoading}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={fetchForecastData}
//                 />
//               </div>
//             )}

//             {/* ... (all other conditional component renderings are unchanged) */}
//             {showAmounts &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <ProjectAmountsTable
//                     initialData={selectedPlan}
//                     startDate={filteredProjects[0].startDate}
//                     endDate={filteredProjects[0].endDate}
//                     planType={selectedPlan.plType}
//                     fiscalYear={fiscalYear}
//                   />
//                 </div>
//               )}

//             {showRevenueAnalysis &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <RevenueAnalysisTable
//                     planId={selectedPlan.plId}
//                     status={selectedPlan.status}
//                     fiscalYear={fiscalYear}
//                   />
//                 </div>
//               )}

//             {showAnalysisByPeriod &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <AnalysisByPeriodContent
//                     onCancel={onAnalysisCancel}
//                     planID={selectedPlan.plId}
//                     templateId={selectedPlan.templateId || 1}
//                     type={selectedPlan.plType || "TARGET"}
//                     initialApiData={analysisApiData}
//                     isLoading={isAnalysisLoading}
//                     error={analysisError}
//                   />
//                 </div>
//               )}

//             {showPLC && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <PLCComponent
//                   selectedProjectId={selectedPlan?.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}

//             {showRevenueSetup &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <RevenueSetupComponent  selectedPlan={{
//                       ...selectedPlan,
//                       startDate: filteredProjects[0]?.startDate,
//                       endDate: filteredProjects[0]?.endDate
                      
//                     }} />
//                 </div>
//               )}

//             {showRevenueCeiling &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   {/* This now includes the project's dates and orgId */}
//                   <RevenueCeilingComponent
//                     selectedPlan={{
//                       ...selectedPlan,
//                       startDate: filteredProjects[0]?.startDate,
//                       endDate: filteredProjects[0]?.endDate,
//                       orgId: filteredProjects[0]?.orgId,
//                     }}
//                   />
//                 </div>
//               )}

//             {showFunding &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <FundingComponent />
//                 </div>
//               )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// const Field = ({ label, value, isCurrency }) => {
//   const formattedValue =
//     isCurrency && value !== ""
//       ? Number(value).toLocaleString("en-US", {
//           minimumFractionDigits: 0,
//           maximumFractionDigits: 0,
//         })
//       : value || "";
//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
//       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
//         {label}:
//       </label>
//       <input
//         type="text"
//         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//         value={formattedValue}
//         readOnly
//       />
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProjectHoursDetails from "./ProjectHoursDetails";
// import ProjectPlanTable from "./ProjectPlanTable";
// import RevenueAnalysisTable from "./RevenueAnalysisTable";
// import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// import ProjectAmountsTable from "./ProjectAmountsTable";
// import PLCComponent from "./PLCComponent";
// import FundingComponent from "./FundingComponent";
// import RevenueSetupComponent from "./RevenueSetupComponent";
// import RevenueCeilingComponent from "./RevenueCeilingComponent";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [showHours, setShowHours] = useState(false);
//   const [showAmounts, setShowAmounts] = useState(false);
//   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
//   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
//   const [showPLC, setShowPLC] = useState(false);
//   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
//   const [showFunding, setShowFunding] = useState(false);
//   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);
//   const [hoursProjectId, setHoursProjectId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   useEffect(() => {
//     const savedPlan = localStorage.getItem("selectedPlan");
//     if (savedPlan) {
//       try {
//         const parsedPlan = JSON.parse(savedPlan);
//         setSelectedPlan(parsedPlan);
//         setSearchTerm(parsedPlan.projId || "");
//       } catch (error) {
//         console.error("Error parsing saved plan from localStorage:", error);
//         localStorage.removeItem("selectedPlan");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("https://test-api-3tmq.onrender.com/Project/GetAllProjects")
//       .then((res) => {
//         const transformedData = res.data.map((project) => ({
//           projId: project.projectId,
//           projName: project.name,
//           projTypeDc: project.description,
//           orgId: project.orgId,
//           startDate: project.startDate,
//           endDate: project.endDate,
//           fundedCost: project.proj_f_cst_amt || "",
//           fundedFee: project.proj_f_fee_amt || "",
//           fundedRev: project.proj_f_tot_amt || "",
//         }));
//         const prefixSet = new Set(
//           transformedData.map((project) => {
//             const { projId } = project;
//             if (projId.includes(".")) return projId.split(".")[0];
//             else if (projId.includes("T")) return projId.split("T")[0];
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
//     const fetchAnalysisData = async () => {
//       if (
//         !selectedPlan ||
//         !selectedPlan.plId ||
//         !selectedPlan.templateId ||
//         !selectedPlan.plType
//       ) {
//         setAnalysisApiData([]);
//         setIsAnalysisLoading(false);
//         setAnalysisError("Please select a plan to view Analysis By Period.");
//         return;
//       }
//       if (!showAnalysisByPeriod) return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
//         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

//         const response = await fetch(externalApiUrl, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           cache: "no-store",
//         });

//         if (!response.ok) {
//           let errorText = "Unknown error";
//           try {
//             errorText =
//               (await response.json()).message ||
//               JSON.stringify(await response.json());
//           } catch (e) {
//             errorText = await response.text();
//           }
//           throw new Error(
//             `HTTP error! status: ${response.status}. Details: ${errorText}`
//           );
//         }

//         const apiResponse = await response.json();
//         setAnalysisApiData(apiResponse);
//       } catch (err) {
//         console.error("Analysis By Period fetch error:", err);
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [
//     selectedPlan,
//     showAnalysisByPeriod,
//     EXTERNAL_API_BASE_URL,
//     CALCULATE_COST_ENDPOINT,
//   ]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const { startDate, endDate } = project;

//       if (startDate && endDate) {
//         try {
//           const startYear = new Date(startDate).getFullYear();
//           const endYear = new Date(endDate).getFullYear();

//           if (!isNaN(startYear) && !isNaN(endYear)) {
//             const years = [];
//             for (let year = startYear; year <= endYear; year++) {
//               years.push(year.toString());
//             }
//             setFiscalYearOptions(["All", ...years]);
//             if (fiscalYear !== "All" && !years.includes(fiscalYear)) {
//               setFiscalYear("All");
//             }
//           } else {
//             setFiscalYearOptions([]);
//           }
//         } catch (e) {
//           setFiscalYearOptions([]);
//         }
//       } else {
//         setFiscalYearOptions([]);
//       }
//     } else {
//       setFiscalYearOptions([]);
//     }
//   }, [filteredProjects, fiscalYear]);

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
//       if (event.key === "Escape") setShowSuggestions(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
//       setTimeout(
//         () =>
//           hoursRefs.current[hoursProjectId].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showAmounts && amountsRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           amountsRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           analysisRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueSetupRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueCeilingRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showPLC && hoursRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           hoursRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     }
//   }, [
//     showHours,
//     showAmounts,
//     showRevenueAnalysis,
//     showAnalysisByPeriod,
//     showRevenueSetup,
//     showRevenueCeiling,
//     showPLC,
//     hoursProjectId,
//     searchTerm,
//   ]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setShowSuggestions(false);

//     if (term === "") {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       return;
//     }

//     if (
//       !Array.from(prefixes).some(
//         (prefix) => prefix.toLowerCase() === term.toLowerCase()
//       )
//     ) {
//       setErrorMessage("Search valid project ID");
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data) ? response.data[0] : response.data;
//       const project = {
//         projId: data.projectId || term,
//         projName: data.name || "",
//         projTypeDc: data.description || "",
//         orgId: data.orgId || "",
//         startDate: data.startDate || "",
//         endDate: data.endDate || "",
//         fundedCost: data.proj_f_cst_amt || "",
//         fundedFee: data.proj_f_fee_amt || "",
//         fundedRev: data.proj_f_tot_amt || "",
//       };
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//       const defaultPlan = {
//         projId: project.projId,
//         plId: data.plId || 1,
//         templateId: data.templateId || 1,
//         plType: data.bgtType || "EAC",
//         version: data.versionNo || 1,
//         status: data.status || "Working",
//         startDate: project.startDate,
//         endDate: project.endDate,
//         orgId: project.orgId,
//       };
//       setSelectedPlan(defaultPlan);
//       localStorage.setItem("selectedPlan", JSON.stringify(defaultPlan));
//     } catch (error) {
//       console.error("Error fetching project:", error);
//       setErrorMessage("No project found with that ID.");
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       toast.error("Failed to fetch project data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

  
//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//     setErrorMessage("");
//     setSearched(false);
//     setFilteredProjects([]);
//     setShowSuggestions(e.target.value.trim().length > 0);
//   };

//   const handleSuggestionClick = (prefix) => {
//     setSearchTerm(prefix);
//     setShowSuggestions(false);
//     handleSearch();
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     localStorage.setItem("selectedPlan", JSON.stringify(plan));
//     setShowHours(false);
//     setShowAmounts(false);
//     setHoursProjectId(null);
//     setShowRevenueAnalysis(false);
//     setShowAnalysisByPeriod(false);
//     setShowPLC(false);
//     setShowRevenueSetup(false);
//     setShowFunding(false);
//     setShowRevenueCeiling(false);
//     setForecastData([]);
//     setIsForecastLoading(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//   };

//   const fetchForecastData = async () => {
//     if (!selectedPlan) {
//       setForecastData([]);
//       return;
//     }

//     setIsForecastLoading(true);
//     try {
//       const employeeApi = `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//       const response = await axios.get(employeeApi);
//       if (!Array.isArray(response.data)) {
//         setForecastData([]);
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           { toastId: "no-forecast-data-refresh", autoClose: 3000 }
//         );
//       } else {
//         setForecastData(response.data);
//       }
//     } catch (err) {
//       setForecastData([]);
//       if (err.response && err.response.status === 500) {
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           { toastId: "no-forecast-data-refresh", autoClose: 3000 }
//         );
//       } else {
//         toast.error(
//           "Failed to refresh forecast data: " +
//             (err.response?.data?.message || err.message),
//           { toastId: "forecast-refresh-error", autoClose: 3000 }
//         );
//       }
//     } finally {
//       setIsForecastLoading(false);
//     }
//   };

//   // const handleHoursTabClick = async (projId) => {
//   //   if (!selectedPlan) {
//   //     setShowHours(false);
//   //     return;
//   //   }
//   //   if (showHours && hoursProjectId === projId) {
//   //     setShowHours(false);
//   //     setHoursProjectId(null);
//   //   } else {
//   //     setShowHours(true);
//   //     setShowAmounts(false);
//   //     setHoursProjectId(projId);
//   //     setShowRevenueAnalysis(false);
//   //     setShowAnalysisByPeriod(false);
//   //     setShowPLC(false);
//   //     setShowRevenueSetup(false);
//   //     setShowFunding(false);
//   //     setShowRevenueCeiling(false);
//   //     fetchForecastData();
//   //   }
//   // };
//    const handleHoursTabClick = async (projId) => {
//     if (!selectedPlan) {
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setIsForecastLoading(true);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);

//       try {
//         const employeeApi =
//           selectedPlan.plType === "EAC"
//             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//         const response = await axios.get(employeeApi);
//         if (!Array.isArray(response.data)) {
//           setForecastData([]);
//           toast.info(
//             'No forecast data available for this plan. Click "New" to add entries.',
//             {
//               toastId: "no-forecast-data",
//               autoClose: 3000,
//             }
//           );
//         } else {
//           setForecastData(response.data);
//         }
//       } catch (err) {
//         setForecastData([]);
//         if (err.response && err.response.status === 500) {
//           toast.info(
//             'No forecast data available for this plan. Click "New" to add entries.',
//             {
//               toastId: "no-forecast-data",
//               autoClose: 3000,
//             }
//           );
//         } else {
//           toast.error(
//             "Failed to load forecast data: " +
//               (err.response?.data?.message || err.message),
//             {
//               toastId: "forecast-error",
//               autoClose: 3000,
//             }
//           );
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleRevenueAnalysisTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleAnalysisByPeriodTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowAnalysisByPeriod(false);
//       setShowRevenueAnalysis(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }
//     if (showAnalysisByPeriod) {
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     } else {
//       setShowAnalysisByPeriod(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handlePLCTabClick = (projId) => {
//     if (showPLC) {
//       setShowPLC(false);
//     } else {
//       setShowPLC(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleRevenueSetupTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueSetup(false);
//       return;
//     }
//     if (showRevenueSetup) {
//       setShowRevenueSetup(false);
//     } else {
//       setShowRevenueSetup(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleFundingTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowFunding(false);
//       return;
//     }
//     if (showFunding) {
//       setShowFunding(false);
//     } else {
//       setShowFunding(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleRevenueCeilingTabClick = (projId) => {
//     if (!selectedPlan) {
//       setShowRevenueCeiling(false);
//       return;
//     }
//     if (showRevenueCeiling) {
//       setShowRevenueCeiling(false);
//     } else {
//       setShowRevenueCeiling(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//     }
//   };

//   const onAnalysisCancel = () => {
//     setShowAnalysisByPeriod(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
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
//     toast.info("Analysis By Period cancelled.", {
//       toastId: "analysis-cancel",
//       autoClose: 3000,
//     });
//   };

//   if (loading && projects.length === 0 && !searched) {
//     return (
//       <div className="flex justify-center items-center h-64 font-inter">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm sm:text-base">
//           Loading...
//         </span>
//       </div>
//     );
//   }

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
//           <label className="font-semibold text-xs sm:text-sm">
//             Project ID:
//           </label>
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
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           Loading...
//         </div>
//       ) : searched && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">
//           {errorMessage}
//         </div>
//       ) : searched && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           No project found with that ID.
//         </div>
//       ) : (
//         filteredProjects.length > 0 && (
//           <div
//             key={searchTerm}
//             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//           >
//             <h2 className="font-normal text-sm sm:text-base text-blue-600">
//               Project: {searchTerm}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
//               <Field label="Project" value={searchTerm} />
//               <Field
//                 label="Project Name"
//                 value={filteredProjects[0].projName}
//               />
//               <Field
//                 label="Funded Cost"
//                 value={filteredProjects[0].fundedCost}
//                 isCurrency
//               />
//               <Field label="Organization" value={filteredProjects[0].orgId} />
//               <Field
//                 label="Description"
//                 value={filteredProjects[0].projTypeDc}
//               />
//               <Field
//                 label="Funded Fee"
//                 value={filteredProjects[0].fundedFee}
//                 isCurrency
//               />
//               <Field label="Start Date" value={filteredProjects[0].startDate} />
//               <Field label="End Date" value={filteredProjects[0].endDate} />
//               <Field
//                 label="Funded Rev"
//                 value={filteredProjects[0].fundedRev}
//                 isCurrency
//               />
//             </div>

//             <div className="flex items-center gap-2 pt-2">
//               <label
//                 htmlFor="fiscalYear"
//                 className="font-semibold text-xs sm:text-sm"
//               >
//                 Fiscal Year:
//               </label>
//               <select
//                 id="fiscalYear"
//                 value={fiscalYear}
//                 onChange={(e) => setFiscalYear(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={fiscalYearOptions.length === 0}
//               >
//                 {fiscalYearOptions.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
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
//                 className={`cursor-pointer ${
//                   showHours && hoursProjectId === searchTerm
//                     ? "font-normal text-blue-800"
//                     : ""
//                 }`}
//                 onClick={() => handleHoursTabClick(searchTerm)}
//               >
//                 Hours
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showAmounts ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleAmountsTabClick(searchTerm)}
//               >
//                 Amounts
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
//               >
//                 Revenue Analysis
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
//               >
//                 Analysis By Period
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showPLC ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handlePLCTabClick(searchTerm)}
//               >
//                 PLC
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueSetup ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
//               >
//                 Revenue Setup
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueCeiling ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
//               >
//                 Revenue Ceiling
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showFunding ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleFundingTabClick(searchTerm)}
//               >
//                 Funding
//               </span>
//             </div>

//             {showHours && selectedPlan && hoursProjectId === searchTerm && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span>{" "}
//                   {selectedPlan.projId},{" "}
//                   <span className="font-normal">Type:</span>{" "}
//                   {selectedPlan.plType || "N/A"},{" "}
//                   <span className="font-normal">Version:</span>{" "}
//                   {selectedPlan.version || "N/A"},{" "}
//                   <span className="font-normal">Status:</span>{" "}
//                   {selectedPlan.status || "N/A"}
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   // projectId={searchTerm}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   employees={forecastData}
//                   isForecastLoading={isForecastLoading}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={fetchForecastData}
//                 />
//               </div>
//             )}

//             {showAmounts &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <ProjectAmountsTable
//                     initialData={selectedPlan}
//                     startDate={filteredProjects[0].startDate}
//                     endDate={filteredProjects[0].endDate}
//                     planType={selectedPlan.plType}
//                     fiscalYear={fiscalYear}
//                   />
//                 </div>
//               )}

//             {showRevenueAnalysis &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <RevenueAnalysisTable
//                     planId={selectedPlan.plId}
//                     status={selectedPlan.status}
//                     fiscalYear={fiscalYear}
//                   />
//                 </div>
//               )}

//             {showAnalysisByPeriod &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <AnalysisByPeriodContent
//                     onCancel={onAnalysisCancel}
//                     planID={selectedPlan.plId}
//                     templateId={selectedPlan.templateId || 1}
//                     type={selectedPlan.plType || "TARGET"}
//                     initialApiData={analysisApiData}
//                     isLoading={isAnalysisLoading}
//                     error={analysisError}
//                   />
//                 </div>
//               )}

//             {showPLC && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <PLCComponent
//                   selectedProjectId={selectedPlan?.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}

//             {showRevenueSetup &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <RevenueSetupComponent
//                     selectedPlan={{
//                       ...selectedPlan,
//                       startDate: filteredProjects[0]?.startDate,
//                       endDate: filteredProjects[0]?.endDate,
//                       orgId: filteredProjects[0]?.orgId,
//                     }}
//                     revenueAccount={revenueAccount}
//                   />
//                 </div>
//               )}

//             {showRevenueCeiling &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <RevenueCeilingComponent
//                     selectedPlan={{
//                       ...selectedPlan,
//                       startDate: filteredProjects[0]?.startDate,
//                       endDate: filteredProjects[0]?.endDate,
//                       orgId: filteredProjects[0]?.orgId,
//                     }}
//                     revenueAccount={revenueAccount}
//                   />
//                 </div>
//               )}

//             {showFunding &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <FundingComponent />
//                 </div>
//               )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// const Field = ({ label, value, isCurrency }) => {
//   const formattedValue =
//     isCurrency && value !== ""
//       ? Number(value).toLocaleString("en-US", {
//           minimumFractionDigits: 0,
//           maximumFractionDigits: 0,
//         })
//       : value || "";
//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
//       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
//         {label}:
//       </label>
//       <input
//         type="text"
//         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//         value={formattedValue}
//         readOnly
//       />
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProjectHoursDetails from "./ProjectHoursDetails";
// import ProjectPlanTable from "./ProjectPlanTable";
// import RevenueAnalysisTable from "./RevenueAnalysisTable";
// import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
// import ProjectAmountsTable from "./ProjectAmountsTable";
// import PLCComponent from "./PLCComponent";
// import FundingComponent from "./FundingComponent";
// import RevenueSetupComponent from "./RevenueSetupComponent";
// import RevenueCeilingComponent from "./RevenueCeilingComponent";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [showHours, setShowHours] = useState(false);
//   const [showAmounts, setShowAmounts] = useState(false);
//   const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
//   const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
//   const [showPLC, setShowPLC] = useState(false);
//   const [showRevenueSetup, setShowRevenueSetup] = useState(false);
//   const [showFunding, setShowFunding] = useState(false);
//   const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);
//   const [hoursProjectId, setHoursProjectId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   useEffect(() => {
//     const savedPlan = localStorage.getItem("selectedPlan");
//     if (savedPlan) {
//       try {
//         const parsedPlan = JSON.parse(savedPlan);
//         setSelectedPlan(parsedPlan);
//         setSearchTerm(parsedPlan.projId || "");
//       } catch (error) {
//         console.error("Error parsing saved plan from localStorage:", error);
//         localStorage.removeItem("selectedPlan");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchAnalysisData = async () => {
//       if (
//         !selectedPlan ||
//         !selectedPlan.plId ||
//         !selectedPlan.templateId ||
//         !selectedPlan.plType
//       ) {
//         setAnalysisApiData([]);
//         setIsAnalysisLoading(false);
//         setAnalysisError("Please select a plan to view Analysis By Period.");
//         return;
//       }
//       if (!showAnalysisByPeriod) return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;
//         console.log(`Fetching Analysis By Period data from: ${externalApiUrl}`);

//         const response = await fetch(externalApiUrl, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           cache: "no-store",
//         });

//         if (!response.ok) {
//           let errorText = "Unknown error";
//           try {
//             errorText =
//               (await response.json()).message ||
//               JSON.stringify(await response.json());
//           } catch (e) {
//             errorText = await response.text();
//           }
//           throw new Error(
//             `HTTP error! status: ${response.status}. Details: ${errorText}`
//           );
//         }

//         const apiResponse = await response.json();
//         setAnalysisApiData(apiResponse);
//       } catch (err) {
//         console.error("Analysis By Period fetch error:", err);
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [
//     selectedPlan,
//     showAnalysisByPeriod,
//     EXTERNAL_API_BASE_URL,
//     CALCULATE_COST_ENDPOINT,
//   ]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const { startDate, endDate } = project;

//       if (startDate && endDate) {
//         try {
//           const startYear = new Date(startDate).getFullYear();
//           const endYear = new Date(endDate).getFullYear();

//           if (!isNaN(startYear) && !isNaN(endYear)) {
//             const years = [];
//             for (let year = startYear; year <= endYear; year++) {
//               years.push(year.toString());
//             }
//             setFiscalYearOptions(["All", ...years]);
//             if (fiscalYear !== "All" && !years.includes(fiscalYear)) {
//               setFiscalYear("All");
//             }
//           } else {
//             setFiscalYearOptions([]);
//           }
//         } catch (e) {
//           setFiscalYearOptions([]);
//         }
//       } else {
//         setFiscalYearOptions([]);
//       }
//     } else {
//       setFiscalYearOptions([]);
//     }
//   }, [filteredProjects, fiscalYear]);

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
//       if (event.key === "Escape") setShowSuggestions(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
//       setTimeout(
//         () =>
//           hoursRefs.current[hoursProjectId].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showAmounts && amountsRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           amountsRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           analysisRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueSetupRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           revenueCeilingRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     } else if (showPLC && hoursRefs.current[searchTerm]) {
//       setTimeout(
//         () =>
//           hoursRefs.current[searchTerm].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           }),
//         150
//       );
//     }
//   }, [
//     showHours,
//     showAmounts,
//     showRevenueAnalysis,
//     showAnalysisByPeriod,
//     showRevenueSetup,
//     showRevenueCeiling,
//     showPLC,
//     hoursProjectId,
//     searchTerm,
//   ]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setShowSuggestions(false);

//     if (term.length < 2) { // Only search for 2+ characters
//   setFilteredProjects([]);
//   setSelectedPlan(null);
//   setRevenueAccount("");
//   setPrefixes(new Set());
//   return;
//   }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data) ? response.data[0] : response.data;
//       const project = {
//         projId: data.projectId || term,
//         projName: data.name || "",
//         projTypeDc: data.description || "",
//         orgId: data.orgId || "",
//         startDate: data.startDate || "",
//         endDate: data.endDate || "",
//         fundedCost: data.proj_f_cst_amt || "",
//         fundedFee: data.proj_f_fee_amt || "",
//         fundedRev: data.proj_f_tot_amt || "",
//       };
//       const prefix = project.projId.includes(".")
//         ? project.projId.split(".")[0]
//         : project.projId.includes("T")
//         ? project.projId.split("T")[0]
//         : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//       // const defaultPlan = {
//       //   projId: project.projId,
//       //   plId: data.plId,
//       //   templateId: data.templateId || 1,
//       //   plType: data.bgtType || "EAC",
//       //   version: data.versionNo || 1,
//       //   status: data.status || "Working",
//       //   startDate: project.startDate,
//       //   endDate: project.endDate,
//       //   orgId: project.orgId,
//       // };
//       // setSelectedPlan(defaultPlan);
//       // localStorage.setItem("selectedPlan", JSON.stringify(defaultPlan));
//     } catch (error) {
//       console.error("Error fetching project:", error);
//       setErrorMessage("No project found with that ID.");
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       toast.error("Failed to fetch project data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   const handleInputChange = (e) => {
//   setSearchTerm(e.target.value);
//   setErrorMessage("");
//   setSearched(false);
//   setFilteredProjects([]);
//   setSelectedPlan(null); // <-- Add this line!
//   setShowSuggestions(e.target.value.trim().length > 0);
// };

//   // const handleInputChange = (e) => {
//   //   setSearchTerm(e.target.value);
//   //   setErrorMessage("");
//   //   setSearched(false);
//   //   setFilteredProjects([]);
//   //   setShowSuggestions(e.target.value.trim().length > 0);
//   // };

//   const handleSuggestionClick = (prefix) => {
//     setSearchTerm(prefix);
//     setShowSuggestions(false);
//     handleSearch();
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     localStorage.setItem("selectedPlan", JSON.stringify(plan));
//     setShowHours(false);
//     setShowAmounts(false);
//     setHoursProjectId(null);
//     setShowRevenueAnalysis(false);
//     setShowAnalysisByPeriod(false);
//     setShowPLC(false);
//     setShowRevenueSetup(false);
//     setShowFunding(false);
//     setShowRevenueCeiling(false);
//     setForecastData([]);
//     setIsForecastLoading(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//   };

//   const fetchForecastData = async () => {
//     if (!selectedPlan) {
//       setForecastData([]);
//       return;
//     }

//     setIsForecastLoading(true);
//     try {
//       const employeeApi = `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//       const response = await axios.get(employeeApi);
//       if (!Array.isArray(response.data)) {
//         setForecastData([]);
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           { toastId: "no-forecast-data-refresh", autoClose: 3000 }
//         );
//       } else {
//         setForecastData(response.data);
//       }
//     } catch (err) {
//       setForecastData([]);
//       if (err.response && err.response.status === 500) {
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           { toastId: "no-forecast-data-refresh", autoClose: 3000 }
//         );
//       } else {
//         toast.error(
//           "Failed to refresh forecast data: " +
//             (err.response?.data?.message || err.message),
//           { toastId: "forecast-refresh-error", autoClose: 3000 }
//         );
//       }
//     } finally {
//       setIsForecastLoading(false);
//     }
//   };

//   const handleHoursTabClick = async (projId) => {
    
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setIsForecastLoading(true);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);

//       try {
//         const employeeApi =
//           selectedPlan.plType === "EAC"
//             ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
//             : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//         const response = await axios.get(employeeApi);
//         if (!Array.isArray(response.data)) {
//           setForecastData([]);
//           toast.info(
//             'No forecast data available for this plan. Click "New" to add entries.',
//             {
//               toastId: "no-forecast-data",
//               autoClose: 3000,
//             }
//           );
//         } else {
//           setForecastData(response.data);
//         }
//       } catch (err) {
//         setForecastData([]);
//         if (err.response && err.response.status === 500) {
//           toast.info(
//             'No forecast data available for this plan. Click "New" to add entries.',
//             {
//               toastId: "no-forecast-data",
//               autoClose: 3000,
//             }
//           );
//         } else {
//           toast.error(
//             "Failed to load forecast data: " +
//               (err.response?.data?.message || err.message),
//             {
//               toastId: "forecast-error",
//               autoClose: 3000,
//             }
//           );
//         }
//       } finally {
//         setIsForecastLoading(false);
//       }
//     }
//   };

//   const handleAmountsTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleRevenueAnalysisTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
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
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleAnalysisByPeriodTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (showAnalysisByPeriod) {
//       setShowAnalysisByPeriod(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     } else {
//       setShowAnalysisByPeriod(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handlePLCTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (showPLC) {
//       setShowPLC(false);
//     } else {
//       setShowPLC(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleRevenueSetupTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (showRevenueSetup) {
//       setShowRevenueSetup(false);
//     } else {
//       setShowRevenueSetup(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowFunding(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleFundingTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (showFunding) {
//       setShowFunding(false);
//     } else {
//       setShowFunding(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowRevenueCeiling(false);
//     }
//   };

//   const handleRevenueCeilingTabClick = (projId) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (showRevenueCeiling) {
//       setShowRevenueCeiling(false);
//     } else {
//       setShowRevenueCeiling(true);
//       setShowHours(false);
//       setShowAmounts(false);
//       setHoursProjectId(null);
//       setShowRevenueAnalysis(false);
//       setShowAnalysisByPeriod(false);
//       setShowPLC(false);
//       setShowRevenueSetup(false);
//       setShowFunding(false);
//     }
//   };

//   const onAnalysisCancel = () => {
//     setShowAnalysisByPeriod(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
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
//     toast.info("Analysis By Period cancelled.", {
//       toastId: "analysis-cancel",
//       autoClose: 3000,
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64 font-inter">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600 text-sm sm:text-base">
//           Loading...
//         </span>
//       </div>
//     );
//   }

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
//           <label className="font-semibold text-xs sm:text-sm">
//             Project ID:
//           </label>
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

//       {searched && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">
//           {errorMessage}
//         </div>
//       ) : searched && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           No project found with that ID.
//         </div>
//       ) : (
//         filteredProjects.length > 0 && (
//           <div
//             key={searchTerm}
//             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//           >
//             <h2 className="font-normal text-sm sm:text-base text-blue-600">
//               Project: {searchTerm}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
//               <Field label="Project" value={searchTerm} />
//               <Field
//                 label="Project Name"
//                 value={filteredProjects[0].projName}
//               />
//               <Field
//                 label="Funded Cost"
//                 value={filteredProjects[0].fundedCost}
//                 isCurrency
//               />
//               <Field label="Organization" value={filteredProjects[0].orgId} />
//               <Field
//                 label="Description"
//                 value={filteredProjects[0].projTypeDc}
//               />
//               <Field
//                 label="Funded Fee"
//                 value={filteredProjects[0].fundedFee}
//                 isCurrency
//               />
//               <Field label="Start Date" value={filteredProjects[0].startDate} />
//               <Field label="End Date" value={filteredProjects[0].endDate} />
//               <Field
//                 label="Funded Rev"
//                 value={filteredProjects[0].fundedRev}
//                 isCurrency
//               />
//             </div>

//             <div className="flex items-center gap-2 pt-2">
//               <label
//                 htmlFor="fiscalYear"
//                 className="font-semibold text-xs sm:text-sm"
//               >
//                 Fiscal Year:
//               </label>
//               <select
//                 id="fiscalYear"
//                 value={fiscalYear}
//                 onChange={(e) => setFiscalYear(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={fiscalYearOptions.length === 0}
//               >
//                 {fiscalYearOptions.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
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
//                 className={`cursor-pointer ${
//                   showHours && hoursProjectId === searchTerm
//                     ? "font-normal text-blue-800"
//                     : ""
//                 }`}
//                 onClick={() => handleHoursTabClick(searchTerm)}
//               >
//                 Hours
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showAmounts ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleAmountsTabClick(searchTerm)}
//               >
//                 Amounts
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueAnalysis ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
//               >
//                 Revenue Analysis
//               </span>
              
//               <span
//                 className={`cursor-pointer ${
//                   showAnalysisByPeriod ? "font-normal text-blue-800" : ""
//                 }`}
                
//                 onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
//               >
//                 Analysis By Period
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showPLC ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handlePLCTabClick(searchTerm)}
//               >
//                 PLC
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueSetup ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueSetupTabClick(searchTerm)}
//               >
//                 Revenue Setup
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showRevenueCeiling ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleRevenueCeilingTabClick(searchTerm)}
//               >
//                 Revenue Ceiling
//               </span>
//               <span
//                 className={`cursor-pointer ${
//                   showFunding ? "font-normal text-blue-800" : ""
//                 }`}
//                 onClick={() => handleFundingTabClick(searchTerm)}
//               >
//                 Funding
//               </span>
//             </div>

//             {showHours && selectedPlan && hoursProjectId === searchTerm && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                   <span className="font-normal">Project ID:</span>{" "}
//                   {selectedPlan.projId},{" "}
//                   <span className="font-normal">Type:</span>{" "}
//                   {selectedPlan.plType || "N/A"},{" "}
//                   <span className="font-normal">Version:</span>{" "}
//                   {selectedPlan.version || "N/A"},{" "}
//                   <span className="font-normal">Status:</span>{" "}
//                   {selectedPlan.status || "N/A"}
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   projectId={selectedPlan.projId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={filteredProjects[0].startDate}
//                   endDate={filteredProjects[0].endDate}
//                   employees={forecastData}
//                   isForecastLoading={isForecastLoading}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={fetchForecastData}
//                 />
//               </div>
//             )}

//             {showAmounts &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (amountsRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <ProjectAmountsTable
//                     initialData={selectedPlan}
//                     startDate={filteredProjects[0].startDate}
//                     endDate={filteredProjects[0].endDate}
//                     planType={selectedPlan.plType}
//                     fiscalYear={fiscalYear}
//                   />
//                 </div>
//               )}

//             {showRevenueAnalysis &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <RevenueAnalysisTable
//                     planId={selectedPlan.plId}
//                     status={selectedPlan.status}
//                     fiscalYear={fiscalYear}
//                   />
//                 </div>
//               )}

//             {showAnalysisByPeriod &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (analysisRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <div className="mb-4 text-xs sm:text-sm text-gray-800">
//                     <span className="font-normal">Project ID:</span>{" "}
//                     {selectedPlan.projId},{" "}
//                     <span className="font-normal">Type:</span>{" "}
//                     {selectedPlan.plType || "N/A"},{" "}
//                     <span className="font-normal">Version:</span>{" "}
//                     {selectedPlan.version || "N/A"},{" "}
//                     <span className="font-normal">Status:</span>{" "}
//                     {selectedPlan.status || "N/A"}
//                   </div>
//                   <AnalysisByPeriodContent
//                     onCancel={onAnalysisCancel}
//                     planID={selectedPlan.plId}
//                     templateId={selectedPlan.templateId || 1}
//                     type={selectedPlan.plType || "TARGET"}
//                     initialApiData={analysisApiData}
//                     isLoading={isAnalysisLoading}
//                     error={analysisError}
//                   />
//                 </div>
//               )}

//             {showPLC && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
//               <div
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                 className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//               >
//                 <PLCComponent
//                   selectedProjectId={selectedPlan?.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}

//             {showRevenueSetup &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <RevenueSetupComponent
//                     selectedPlan={{
//                       ...selectedPlan,
//                       startDate: filteredProjects[0]?.startDate,
//                       endDate: filteredProjects[0]?.endDate,
//                       orgId: filteredProjects[0]?.orgId,
//                     }}
//                     revenueAccount={revenueAccount}
//                   />
//                 </div>
//               )}

//             {showRevenueCeiling &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <RevenueCeilingComponent
//                     selectedPlan={{
//                       ...selectedPlan,
//                       startDate: filteredProjects[0]?.startDate,
//                       endDate: filteredProjects[0]?.endDate,
//                       orgId: filteredProjects[0]?.orgId,
//                     }}
//                     revenueAccount={revenueAccount}
//                   />
//                 </div>
//               )}

//             {showFunding &&
//               selectedPlan &&
//               selectedPlan.projId.startsWith(searchTerm) && (
//                 <div
//                   ref={(el) => (hoursRefs.current[searchTerm] = el)}
//                   className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 >
//                   <FundingComponent />
//                 </div>
//               )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// const Field = ({ label, value, isCurrency }) => {
//   const formattedValue =
//     isCurrency && value !== ""
//       ? Number(value).toLocaleString("en-US", {
//           minimumFractionDigits: 0,
//           maximumFractionDigits: 0,
//         })
//       : value || "";
//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
//       <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
//         {label}:
//       </label>
//       <input
//         type="text"
//         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//         value={formattedValue}
//         readOnly
//       />
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectHoursDetails from "./ProjectHoursDetails";
import ProjectPlanTable from "./ProjectPlanTable";
import RevenueAnalysisTable from "./RevenueAnalysisTable";
import AnalysisByPeriodContent from "./AnalysisByPeriodContent";
import ProjectAmountsTable from "./ProjectAmountsTable";
import PLCComponent from "./PLCComponent";
import FundingComponent from "./FundingComponent";
import RevenueSetupComponent from "./RevenueSetupComponent";
import RevenueCeilingComponent from "./RevenueCeilingComponent";

const ProjectBudgetStatus = () => {
  const [projects, setProjects] = useState([]);
  const [prefixes, setPrefixes] = useState(new Set());
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [revenueAccount, setRevenueAccount] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
  const [showAnalysisByPeriod, setShowAnalysisByPeriod] = useState(false);
  const [showPLC, setShowPLC] = useState(false);
  const [showRevenueSetup, setShowRevenueSetup] = useState(false);
  const [showFunding, setShowFunding] = useState(false);
  const [showRevenueCeiling, setShowRevenueCeiling] = useState(false);
  const [hoursProjectId, setHoursProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [isForecastLoading, setIsForecastLoading] = useState(false);
  const [fiscalYear, setFiscalYear] = useState("All");
  const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
  const [analysisApiData, setAnalysisApiData] = useState([]);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const hoursRefs = useRef({});
  const amountsRefs = useRef({});
  const revenueRefs = useRef({});
  const analysisRefs = useRef({});
  const revenueSetupRefs = useRef({});
  const revenueCeilingRefs = useRef({});
  const inputRef = useRef(null);

  const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
  const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan);
        setSelectedPlan(parsedPlan);
        setSearchTerm(parsedPlan.projId || "");
      } catch (error) {
        console.error("Error parsing saved plan from localStorage:", error);
        localStorage.removeItem("selectedPlan");
      }
    }
  }, []);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (
        !selectedPlan ||
        !selectedPlan.plId ||
        !selectedPlan.templateId ||
        !selectedPlan.plType
      ) {
        setAnalysisApiData([]);
        setIsAnalysisLoading(false);
        setAnalysisError("Please select a plan to view Analysis By Period.");
        return;
      }
      if (!showAnalysisByPeriod) return;

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
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          let errorText = "Unknown error";
          try {
            errorText =
              (await response.json()).message ||
              JSON.stringify(await response.json());
          } catch (e) {
            errorText = await response.text();
          }
          throw new Error(
            `HTTP error! status: ${response.status}. Details: ${errorText}`
          );
        }

        const apiResponse = await response.json();
        setAnalysisApiData(apiResponse);
      } catch (err) {
        console.error("Analysis By Period fetch error:", err);
        setAnalysisError(
          `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
        );
        setAnalysisApiData([]);
      } finally {
        setIsAnalysisLoading(false);
      }
    };
    fetchAnalysisData();
  }, [
    selectedPlan,
    showAnalysisByPeriod,
    EXTERNAL_API_BASE_URL,
    CALCULATE_COST_ENDPOINT,
  ]);

  useEffect(() => {
    if (filteredProjects.length > 0) {
      const project = filteredProjects[0];
      const { startDate, endDate } = project;

      if (startDate && endDate) {
        try {
          const startYear = new Date(startDate).getFullYear();
          const endYear = new Date(endDate).getFullYear();

          if (!isNaN(startYear) && !isNaN(endYear)) {
            const years = [];
            for (let year = startYear; year <= endYear; year++) {
              years.push(year.toString());
            }
            setFiscalYearOptions(["All", ...years]);
            if (fiscalYear !== "All" && !years.includes(fiscalYear)) {
              setFiscalYear("All");
            }
          } else {
            setFiscalYearOptions([]);
          }
        } catch (e) {
          setFiscalYearOptions([]);
        }
      } else {
        setFiscalYearOptions([]);
      }
    } else {
      setFiscalYearOptions([]);
    }
  }, [filteredProjects, fiscalYear]);

  useEffect(() => {
    if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
      setTimeout(
        () =>
          hoursRefs.current[hoursProjectId].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    } else if (showAmounts && amountsRefs.current[searchTerm]) {
      setTimeout(
        () =>
          amountsRefs.current[searchTerm].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    } else if (showRevenueAnalysis && revenueRefs.current[searchTerm]) {
      setTimeout(
        () =>
          revenueRefs.current[searchTerm].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    } else if (showAnalysisByPeriod && analysisRefs.current[searchTerm]) {
      setTimeout(
        () =>
          analysisRefs.current[searchTerm].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    } else if (showRevenueSetup && revenueSetupRefs.current[searchTerm]) {
      setTimeout(
        () =>
          revenueSetupRefs.current[searchTerm].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    } else if (showRevenueCeiling && revenueCeilingRefs.current[searchTerm]) {
      setTimeout(
        () =>
          revenueCeilingRefs.current[searchTerm].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    } else if (showPLC && hoursRefs.current[searchTerm]) {
      setTimeout(
        () =>
          hoursRefs.current[searchTerm].scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150
      );
    }
  }, [
    showHours,
    showAmounts,
    showRevenueAnalysis,
    showAnalysisByPeriod,
    showRevenueSetup,
    showRevenueCeiling,
    showPLC,
    hoursProjectId,
    searchTerm,
  ]);

  const handleSearch = async () => {
    const term = searchTerm.trim();
    setSearched(true);
    setErrorMessage("");

    if (term.length < 2) {
      setFilteredProjects([]);
      setSelectedPlan(null);
      setRevenueAccount("");
      setPrefixes(new Set());
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
      );
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      const project = {
        projId: data.projectId || term,
        projName: data.name || "",
        projTypeDc: data.description || "",
        orgId: data.orgId || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        fundedCost: data.proj_f_cst_amt || "",
        fundedFee: data.proj_f_fee_amt || "",
        fundedRev: data.proj_f_tot_amt || "",
      };
      const prefix = project.projId.includes(".")
        ? project.projId.split(".")[0]
        : project.projId.includes("T")
        ? project.projId.split("T")[0]
        : project.projId;
      setPrefixes(new Set([prefix]));
      setFilteredProjects([project]);
      setRevenueAccount(data.revenueAccount || "");
    } catch (error) {
      console.error("Error fetching project from GetAllProjectByProjId:", error);
      try {
        const planResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
        );
        const planData = Array.isArray(planResponse.data) ? planResponse.data[0] : planResponse.data;
        if (planData && planData.projId) {
          const project = {
            projId: planData.projId || term,
            projName: planData.name || "",
            projTypeDc: planData.description || "",
            orgId: planData.orgId || "",
            startDate: planData.startDate || "",
            endDate: planData.endDate || "",
            fundedCost: planData.proj_f_cst_amt || "",
            fundedFee: planData.proj_f_fee_amt || "",
            fundedRev: planData.proj_f_tot_amt || "",
          };
          const prefix = project.projId.includes(".")
            ? project.projId.split(".")[0]
            : project.projId.includes("T")
            ? project.projId.split("T")[0]
            : project.projId;
          setPrefixes(new Set([prefix]));
          setFilteredProjects([project]);
          setRevenueAccount(planData.revenueAccount || "");
          toast.info("Project data fetched from plans.", {
            toastId: "fallback-project-fetch",
            autoClose: 3000,
          });
        } else {
          throw new Error("No valid plan data found.");
        }
      } catch (planError) {
        console.error("Error fetching project from GetProjectPlans:", planError);
        setErrorMessage("No project or plan found with that ID.");
        setFilteredProjects([]);
        setSelectedPlan(null);
        setRevenueAccount("");
        setPrefixes(new Set());
        toast.error("Failed to fetch project or plan data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage("");
    setSearched(false);
    setFilteredProjects([]);
    setSelectedPlan(null);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowAnalysisByPeriod(false);
    setShowPLC(false);
    setShowRevenueSetup(false);
    setShowFunding(false);
    setShowRevenueCeiling(false);
    setForecastData([]);
    setIsForecastLoading(false);
    setAnalysisApiData([]);
    setIsAnalysisLoading(false);
    setAnalysisError(null);
  };

  const fetchForecastData = async () => {
    if (!selectedPlan) {
      setForecastData([]);
      return;
    }

    setIsForecastLoading(true);
    try {
      const employeeApi = `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
      const response = await axios.get(employeeApi);
      if (!Array.isArray(response.data)) {
        setForecastData([]);
        toast.info(
          'No forecast data available for this plan. Click "New" to add entries.',
          { toastId: "no-forecast-data-refresh", autoClose: 3000 }
        );
      } else {
        setForecastData(response.data);
      }
    } catch (err) {
      setForecastData([]);
      if (err.response && err.response.status === 500) {
        toast.info(
          'No forecast data available for this plan. Click "New" to add entries.',
          { toastId: "no-forecast-data-refresh", autoClose: 3000 }
        );
      } else {
        toast.error(
          "Failed to refresh forecast data: " +
            (err.response?.data?.message || err.message),
          { toastId: "forecast-refresh-error", autoClose: 3000 }
        );
      }
    } finally {
      setIsForecastLoading(false);
    }
  };

  const handleHoursTabClick = async (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
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
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
      setIsForecastLoading(true);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);

      try {
        const employeeApi =
          selectedPlan.plType === "EAC"
            ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
            : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
        const response = await axios.get(employeeApi);
        if (!Array.isArray(response.data)) {
          setForecastData([]);
          toast.info(
            'No forecast data available for this plan. Click "New" to add entries.',
            {
              toastId: "no-forecast-data",
              autoClose: 3000,
            }
          );
        } else {
          setForecastData(response.data);
        }
      } catch (err) {
        setForecastData([]);
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
        setIsForecastLoading(false);
      }
    }
  };

  const handleAmountsTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
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
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    }
  };

  const handleRevenueAnalysisTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
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
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    }
  };

  const handleAnalysisByPeriodTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
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
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
    }
  };

  const handlePLCTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showPLC) {
      setShowPLC(false);
    } else {
      setShowPLC(true);
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
    }
  };

  const handleRevenueSetupTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showRevenueSetup) {
      setShowRevenueSetup(false);
    } else {
      setShowRevenueSetup(true);
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setShowPLC(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
    }
  };

  const handleFundingTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showFunding) {
      setShowFunding(false);
    } else {
      setShowFunding(true);
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowRevenueCeiling(false);
    }
  };

  const handleRevenueCeilingTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showRevenueCeiling) {
      setShowRevenueCeiling(false);
    } else {
      setShowRevenueCeiling(true);
      setShowHours(false);
      setShowAmounts(false);
      setHoursProjectId(null);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
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
    toast.info("Analysis By Period cancelled.", {
      toastId: "analysis-cancel",
      autoClose: 3000,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-inter">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600 text-sm sm:text-base">
          Loading...
        </span>
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
          <label className="font-semibold text-xs sm:text-sm">
            Project ID:
          </label>
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
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {searched && errorMessage ? (
        <div className="text-red-500 italic text-xs sm:text-sm">
          {errorMessage}
        </div>
      ) : searched && filteredProjects.length === 0 ? (
        <div className="text-gray-500 italic text-xs sm:text-sm">
          No project found with that ID.
        </div>
      ) : (
        filteredProjects.length > 0 && (
          <div
            key={searchTerm}
            className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
          >
            <h2 className="font-normal text-sm sm:text-base text-blue-600">
              Project: {searchTerm}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              <Field label="Project" value={searchTerm} />
              <Field
                label="Project Name"
                value={filteredProjects[0].projName}
              />
              <Field
                label="Funded Cost"
                value={filteredProjects[0].fundedCost}
                isCurrency
              />
              <Field label="Organization" value={filteredProjects[0].orgId} />
              <Field
                label="Description"
                value={filteredProjects[0].projTypeDc}
              />
              <Field
                label="Funded Fee"
                value={filteredProjects[0].fundedFee}
                isCurrency
              />
              <Field label="Start Date" value={filteredProjects[0].startDate} />
              <Field label="End Date" value={filteredProjects[0].endDate} />
              <Field
                label="Funded Rev"
                value={filteredProjects[0].fundedRev}
                isCurrency
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <label
                htmlFor="fiscalYear"
                className="font-semibold text-xs sm:text-sm"
              >
                Fiscal Year:
              </label>
              <select
                id="fiscalYear"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={fiscalYearOptions.length === 0}
              >
                {fiscalYearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
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
                className={`cursor-pointer ${
                  showHours && hoursProjectId === searchTerm
                    ? "font-normal text-blue-800"
                    : ""
                }`}
                onClick={() => handleHoursTabClick(searchTerm)}
              >
                Hours
              </span>
              <span
                className={`cursor-pointer ${
                  showAmounts ? "font-normal text-blue-800" : ""
                }`}
                onClick={() => handleAmountsTabClick(searchTerm)}
              >
                Amounts
              </span>
              <span
                className={`cursor-pointer ${
                  showRevenueAnalysis ? "font-normal text-blue-800" : ""
                }`}
                onClick={() => handleRevenueAnalysisTabClick(searchTerm)}
              >
                Revenue Analysis
              </span>
              
              <span
                className={`cursor-pointer ${
                  showAnalysisByPeriod ? "font-normal text-blue-800" : ""
                }`}
                
                onClick={() => handleAnalysisByPeriodTabClick(searchTerm)}
              >
                Analysis By Period
              </span>
              <span
                className={`cursor-pointer ${
                  showPLC ? "font-normal text-blue-800" : ""
                }`}
                onClick={() => handlePLCTabClick(searchTerm)}
              >
                PLC
              </span>
              <span
                className={`cursor-pointer ${
                  showRevenueSetup ? "font-normal text-blue-800" : ""
                }`}
                onClick={() => handleRevenueSetupTabClick(searchTerm)}
              >
                Revenue Setup
              </span>
              <span
                className={`cursor-pointer ${
                  showRevenueCeiling ? "font-normal text-blue-800" : ""
                }`}
                onClick={() => handleRevenueCeilingTabClick(searchTerm)}
              >
                Revenue Ceiling
              </span>
              <span
                className={`cursor-pointer ${
                  showFunding ? "font-normal text-blue-800" : ""
                }`}
                onClick={() => handleFundingTabClick(searchTerm)}
              >
                Funding
              </span>
            </div>

            {showHours && selectedPlan && hoursProjectId === searchTerm && (
              <div
                ref={(el) => (hoursRefs.current[searchTerm] = el)}
                className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
              >
                <div className="mb-4 text-xs sm:text-sm text-gray-800">
                  <span className="font-normal">Project ID:</span>{" "}
                  {selectedPlan.projId},{" "}
                  <span className="font-normal">Type:</span>{" "}
                  {selectedPlan.plType || "N/A"},{" "}
                  <span className="font-normal">Version:</span>{" "}
                  {selectedPlan.version || "N/A"},{" "}
                  <span className="font-normal">Status:</span>{" "}
                  {selectedPlan.status || "N/A"}
                </div>
                <ProjectHoursDetails
                  planId={selectedPlan.plId}
                  projectId={selectedPlan.projId}
                  status={selectedPlan.status}
                  planType={selectedPlan.plType}
                  closedPeriod={selectedPlan.closedPeriod}
                  startDate={filteredProjects[0].startDate}
                  endDate={filteredProjects[0].endDate}
                  employees={forecastData}
                  isForecastLoading={isForecastLoading}
                  fiscalYear={fiscalYear}
                  onSaveSuccess={fetchForecastData}
                />
              </div>
            )}

            {showAmounts &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (amountsRefs.current[searchTerm] = el)}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <div className="mb-4 text-xs sm:text-sm text-gray-800">
                    <span className="font-normal">Project ID:</span>{" "}
                    {selectedPlan.projId},{" "}
                    <span className="font-normal">Type:</span>{" "}
                    {selectedPlan.plType || "N/A"},{" "}
                    <span className="font-normal">Version:</span>{" "}
                    {selectedPlan.version || "N/A"},{" "}
                    <span className="font-normal">Status:</span>{" "}
                    {selectedPlan.status || "N/A"}
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

            {showRevenueAnalysis &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (revenueRefs.current[searchTerm] = el)}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <div className="mb-4 text-xs sm:text-sm text-gray-800">
                    <span className="font-normal">Project ID:</span>{" "}
                    {selectedPlan.projId},{" "}
                    <span className="font-normal">Type:</span>{" "}
                    {selectedPlan.plType || "N/A"},{" "}
                    <span className="font-normal">Version:</span>{" "}
                    {selectedPlan.version || "N/A"},{" "}
                    <span className="font-normal">Status:</span>{" "}
                    {selectedPlan.status || "N/A"}
                  </div>
                  <RevenueAnalysisTable
                    planId={selectedPlan.plId}
                    status={selectedPlan.status}
                    fiscalYear={fiscalYear}
                  />
                </div>
              )}

            {showAnalysisByPeriod &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (analysisRefs.current[searchTerm] = el)}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <div className="mb-4 text-xs sm:text-sm text-gray-800">
                    <span className="font-normal">Project ID:</span>{" "}
                    {selectedPlan.projId},{" "}
                    <span className="font-normal">Type:</span>{" "}
                    {selectedPlan.plType || "N/A"},{" "}
                    <span className="font-normal">Version:</span>{" "}
                    {selectedPlan.version || "N/A"},{" "}
                    <span className="font-normal">Status:</span>{" "}
                    {selectedPlan.status || "N/A"}
                  </div>
                  <AnalysisByPeriodContent
                    onCancel={onAnalysisCancel}
                    planID={selectedPlan.plId}
                    templateId={selectedPlan.templateId || 1}
                    type={selectedPlan.plType || "TARGET"}
                    initialApiData={analysisApiData}
                    isLoading={isAnalysisLoading}
                    error={analysisError}
                  />
                </div>
              )}

            {showPLC && selectedPlan && selectedPlan.projId.startsWith(searchTerm) && (
              <div
                ref={(el) => (hoursRefs.current[searchTerm] = el)}
                className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
              >
                <PLCComponent
                  selectedProjectId={selectedPlan?.projId}
                  selectedPlan={selectedPlan}
                />
              </div>
            )}

            {showRevenueSetup &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <RevenueSetupComponent
                    selectedPlan={{
                      ...selectedPlan,
                      startDate: filteredProjects[0]?.startDate,
                      endDate: filteredProjects[0]?.endDate,
                      orgId: filteredProjects[0]?.orgId,
                    }}
                    revenueAccount={revenueAccount}
                  />
                </div>
              )}

            {showRevenueCeiling &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <RevenueCeilingComponent
                    selectedPlan={{
                      ...selectedPlan,
                      startDate: filteredProjects[0]?.startDate,
                      endDate: filteredProjects[0]?.endDate,
                      orgId: filteredProjects[0]?.orgId,
                    }}
                    revenueAccount={revenueAccount}
                  />
                </div>
              )}

            {showFunding &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (hoursRefs.current[searchTerm] = el)}
                  className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <FundingComponent />
                </div>
              )}
          </div>
        )
      )}
    </div>
  );
};

const Field = ({ label, value, isCurrency }) => {
  const formattedValue =
    isCurrency && value !== ""
      ? Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : value || "";
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
      <label className="font-semibold text-xs sm:text-sm w-full sm:w-32">
        {label}:
      </label>
      <input
        type="text"
        className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        value={formattedValue}
        readOnly
      />
    </div>
  );
};

export default ProjectBudgetStatus;