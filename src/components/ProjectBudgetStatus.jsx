// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import FinancialDashboard from "./FinancialDashboard";
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const fundingRefs = useRef({});
//   const inputRef = useRef(null);
//   const dashboardRefs = useRef({});

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   // Auto-scroll effect: scrolls to tab content div when activeTab changes
//   // useEffect(() => {
//   //   if (!activeTab) return;

//   //   const refMap = {
//   //     hours: hoursRefs,
//   //     amounts: amountsRefs,
//   //     revenueAnalysis: revenueRefs,
//   //     analysisByPeriod: analysisRefs,
//   //     revenueSetup: revenueSetupRefs,
//   //     revenueCeiling: revenueCeilingRefs,
//   //     funding: fundingRefs,
//   //     plc: hoursRefs, // assuming PLC reuses hoursRefs or add separate ref if needed
//   //   };

//   //   const refObj = refMap[activeTab];
//   //   if (refObj && refObj.current && refObj.current[searchTerm]) {
//   //     setTimeout(() => {
//   //       refObj.current[searchTerm].scrollIntoView({
//   //         behavior: "smooth",
//   //         block: "start",
//   //       });
//   //     }, 150); // slight delay to ensure DOM is rendered
//   //   }
//   // }, [activeTab, searchTerm]);
//   useEffect(() => {
//     if (!activeTab) return;

//     const refMap = {
//       hours: hoursRefs,
//       amounts: amountsRefs,
//       revenueAnalysis: revenueRefs,
//       analysisByPeriod: analysisRefs,
//       revenueSetup: revenueSetupRefs,
//       revenueCeiling: revenueCeilingRefs,
//       funding: fundingRefs,
//       plc: hoursRefs, // or your actual ref for plc tab
//       dashboard: dashboardRefs
//     };

//     const refObj = refMap[activeTab];

//     if (refObj && refObj.current && refObj.current[searchTerm]) {
//       // Use requestAnimationFrame to wait for next paint and layout
//       requestAnimationFrame(() => {
//         refObj.current[searchTerm].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       });
//     }
//   }, [activeTab, searchTerm]);

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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")[0]
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//   };


//   //   if (!plan || (selectedPlan && selectedPlan.plId === plan.plId)) {
//   //     setSelectedPlan(null);
//   //     localStorage.removeItem("selectedPlan");
//   //     setActiveTab(null);
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //     return;
//   //   }
//   //   const project = {
//   //     projId: plan.projId || "",
//   //     projName: plan.projName || "",
//   //     projStartDt: plan.projStartDt || "",
//   //     projEndDt: plan.projEndDt || "",
//   //     orgId: plan.orgId || "",
//   //     fundedCost: plan.fundedCost || "",
//   //     fundedFee: plan.fundedFee || "",
//   //     fundedRev: plan.fundedRev || "",
//   //   };
//   //   setFilteredProjects([project]);
//   //   setRevenueAccount(plan.revenueAccount || "");
//   //   setSelectedPlan(plan);
//   //   localStorage.setItem("selectedPlan", JSON.stringify(plan));
//   //   setForecastData([]);
//   //   setIsForecastLoading(false);
//   //   setAnalysisApiData([]);
//   //   setIsAnalysisLoading(false);
//   //   setAnalysisError(null);
//   // };

//   // Updated tab click handler: only open tab if not already open; do not toggle off.

//   //   const handlePlanSelect = (plan) => {
//   //   // If no plan is selected (null/undefined), clear selection as usual
//   //   if (!plan) {
//   //     setSelectedPlan(null);
//   //     localStorage.removeItem("selectedPlan");
//   //     setActiveTab(null);
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //     return;
//   //   }

//   //   // If a different plan is selected, update state
//   //   if (!selectedPlan || selectedPlan.plId !== plan.plId) {
//   //     const project = {
//   //       projId: plan.projId || "",
//   //       projName: plan.projName || "",
//   //       projStartDt: plan.projStartDt || "",
//   //       projEndDt: plan.projEndDt || "",
//   //       orgId: plan.orgId || "",
//   //       fundedCost: plan.fundedCost || "",
//   //       fundedFee: plan.fundedFee || "",
//   //       fundedRev: plan.fundedRev || "",
//   //     };

//   //     setFilteredProjects([project]);
//   //     setRevenueAccount(plan.revenueAccount || "");
//   //     setSelectedPlan(plan);
//   //     localStorage.setItem("selectedPlan", JSON.stringify(plan));
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //   }
//   //   // If the same plan is clicked again, do nothing (don't deselect)
//   // };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       // clear selection & reset state as before
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }

//     // Update if different plan OR if the same plan but with changes (to refresh buttons on checkbox change)
//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan) // simple deep comparison; alternatively, you can check relevant fields explicitly
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }

//     // if same plan with no changes, do nothing
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//     // If clicked same tab again, do not toggle or close automatically
//   };

//   // Close tab explicitly by Close button in tab content
//   const handleCloseTab = () => {
//     setActiveTab(null);
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
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
//             {selectedPlan && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.projId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project Name:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {selectedPlan.projName}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Start Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projStartDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       End Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projEndDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Organization:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.orgId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Fee:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Cost:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Rev:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <ProjectPlanTable
//               projectId={searchTerm}
//               // projectId={selectedPlan ? selectedPlan.projId : searchTerm}
//               //  projectId={ selectedPlan.projId}
              
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
              
//             />

//             <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full">
//               {/* <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "hours"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" // No underline here
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("hours")}
//               >
//                 Labor
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "amounts"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("amounts")}
//               >
//                 Other Cost
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "revenueAnalysis"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("revenueAnalysis")}
//               >
//                 Revenue Details
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "analysisByPeriod"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("analysisByPeriod")}
//               >
//                 Forecast By Period
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "plc"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("plc")}
//               >
//                 Labor Categories
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "revenueSetup"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("revenueSetup")}
//               >
//                 Revenue Definition
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "revenueCeiling"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("revenueCeiling")}
//               >
//                 Revenue Adjustment
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "funding"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("funding")}
//               >
//                 Funding
//               </span> */}
//               <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
//               <span
//                 className={`cursor-pointer ${activeTab === "dashboard" ? "font-normal text-blue-800" : ""}`}
//                 onClick={() => handleTabClick('dashboard')}
//               >
//                 Dashboard
//               </span>
//                <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "hours"
//         ? "bg-blue-600 text-white shadow-sm" // active tab
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200" // inactive tab
//     }`}
//                 onClick={() => handleTabClick("hours")}
//               >
//                 Labor
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "amounts"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("amounts")}
//               >
//                 Other Cost
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueAnalysis"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueAnalysis")}
//               >
//                 Revenue Details
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "analysisByPeriod"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("analysisByPeriod")}
//               >
//                 Forecast By Period
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "plc"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("plc")}
//               >
//                 Labor Categories
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueSetup"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueSetup")}
//               >
//                 Revenue Definition
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueCeiling"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueCeiling")}
//               >
//                 Revenue Adjustment
//               </span>
 
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "funding"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("funding")}
//               >
//                 Funding
//               </span>
 
//             </div>

//                {activeTab === "dashboard" && selectedPlan && (
//               <div className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16" ref={el => dashboardRefs.current[searchTerm] = el}>
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span><span className="font-semibold">Project ID: </span>{selectedPlan.projId}</span>
//                     <span><span className="font-semibold">Type: </span>{selectedPlan.plType || "N/A"}</span>
//                     <span><span className="font-semibold">Version: </span>{selectedPlan.version || "N/A"}</span>
//                     <span><span className="font-semibold">Status: </span>{selectedPlan.status || "N/A"}</span>
//                   </div>
//                 </div>
//                 <FinancialDashboard
//                   planId={selectedPlan.plId}
//                   templateId={selectedPlan.templateId}
//                   type={selectedPlan.plType}
//                 />
//               </div>
//             )}
 
 

//             {activeTab === "hours" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 overflow-x-auto"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <div className="w-full bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   projectId={selectedPlan.projId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={() => {}}
//                 />
//               </div>
//             )}

//             {activeTab === "amounts" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (amountsRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectAmountsTable
//                   initialData={selectedPlan}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   planType={selectedPlan.plType}
//                   fiscalYear={fiscalYear}
//                   refreshKey={refreshKey}
//                   onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueAnalysis" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueAnalysisTable
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "analysisByPeriod" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (analysisRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <AnalysisByPeriodContent
//                   onCancel={handleCloseTab}
//                   planID={selectedPlan.plId}
//                   templateId={selectedPlan.templateId || 1}
//                   type={selectedPlan.plType || "TARGET"}
//                   initialApiData={analysisApiData}
//                   isLoading={isAnalysisLoading}
//                   error={analysisError}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "plc" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <button
//                   className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
//                   onClick={handleCloseTab}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//                 <PLCComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                   showPLC={activeTab === "plc"}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueSetup" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueSetupComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueCeiling" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueCeilingComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "funding" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (fundingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <FundingComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);
  
//   // Add this to store the initial project ID for ProjectPlanTable
//   const [initialProjectId, setInitialProjectId] = useState("");

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const fundingRefs = useRef({});
//   const inputRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   useEffect(() => {
//     if (!activeTab) return;

//     const refMap = {
//       hours: hoursRefs,
//       amounts: amountsRefs,
//       revenueAnalysis: revenueRefs,
//       analysisByPeriod: analysisRefs,
//       revenueSetup: revenueSetupRefs,
//       revenueCeiling: revenueCeilingRefs,
//       funding: fundingRefs,
//       plc: hoursRefs, // or your actual ref for plc tab
//     };

//     const refObj = refMap[activeTab];

//     if (refObj && refObj.current && refObj.current[searchTerm]) {
//       // Use requestAnimationFrame to wait for next paint and layout
//       requestAnimationFrame(() => {
//         refObj.current[searchTerm].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       });
//     }
//   }, [activeTab, searchTerm]);

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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       setInitialProjectId(""); // Reset initial project ID
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//         ? project.projId.split("T")
//         : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//       setInitialProjectId(term); // Set the initial project ID here
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           setInitialProjectId(term); // Set the initial project ID here
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         setInitialProjectId(""); // Reset initial project ID
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//     setInitialProjectId(""); // Reset when input changes
//   };

//   // FIXED: Updated handlePlanSelect to NOT update filteredProjects
//   // const handlePlanSelect = (plan) => {
//   //   if (!plan) {
//   //     // clear selection & reset state as before
//   //     setSelectedPlan(null);
//   //     localStorage.removeItem("selectedPlan");
//   //     setActiveTab(null);
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //     return;
//   //   }

//   //   // Update selectedPlan without changing filteredProjects or other project data
//   //   if (
//   //     !selectedPlan ||
//   //     selectedPlan.plId !== plan.plId ||
//   //     selectedPlan.projId !== plan.projId ||
//   //     JSON.stringify(selectedPlan) !== JSON.stringify(plan)
//   //   ) {
//   //     setSelectedPlan(plan);
//   //     localStorage.setItem("selectedPlan", JSON.stringify(plan));
      
//   //     // Only update revenue account if it's different
//   //     if (plan.revenueAccount && plan.revenueAccount !== revenueAccount) {
//   //       setRevenueAccount(plan.revenueAccount);
//   //     }
      
//   //     // Reset analysis data when switching plans
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //   }

//   //   // Don't modify filteredProjects here - this was causing the issue
//   // };

//   const handlePlanSelect = useCallback((plan) => {
//   if (!plan) {
//     setSelectedPlan(null);
//     localStorage.removeItem("selectedPlan");
//     setActiveTab(null);
//     setForecastData([]);
//     setIsForecastLoading(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//     return;
//   }

//   const isSamePlan = selectedPlan && 
//     selectedPlan.plId === plan.plId && 
//     selectedPlan.projId === plan.projId;

//   if (!isSamePlan) {
//     setSelectedPlan(plan);
//     localStorage.setItem("selectedPlan", JSON.stringify(plan));
    
//     if (plan.revenueAccount && plan.revenueAccount !== revenueAccount) {
//       setRevenueAccount(plan.revenueAccount);
//     }
    
//     setForecastData([]);
//     setIsForecastLoading(false);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);
//   }
// }, [selectedPlan, revenueAccount]); // Add dependencies


//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//     // If clicked same tab again, do not toggle or close automatically
//   };

//   // Close tab explicitly by Close button in tab content
//   const handleCloseTab = () => {
//     setActiveTab(null);
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
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
//             {selectedPlan && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.projId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project Name:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {selectedPlan.projName}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Start Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projStartDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       End Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projEndDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Organization:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.orgId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Fee:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Cost:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Rev:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <ProjectPlanTable
//               // projectId={initialProjectId} // Use the initial project ID instead of selectedPlan.projId
//               // projectId={searchTerm} // Pass the original search term which contains the full project ID
//               projectId={selectedPlan ? selectedPlan.projId : searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />

//             <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full">
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "hours"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" // No underline here
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("hours")}
//               >
//                 Labor
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "amounts"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("amounts")}
//               >
//                 Other Cost
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "revenueAnalysis"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("revenueAnalysis")}
//               >
//                 Revenue Details
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "analysisByPeriod"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("analysisByPeriod")}
//               >
//                 Forecast By Period
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "plc"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("plc")}
//               >
//                 Labor Categories
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "revenueSetup"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("revenueSetup")}
//               >
//                 Revenue Definition
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "revenueCeiling"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("revenueCeiling")}
//               >
//                 Revenue Adjustment
//               </span>
//               <span
//                 className={`cursor-pointer px-2 py-1 rounded-t 
//       ${
//         activeTab === "funding"
//           ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//           : "underline hover:bg-gray-50"
//       }`}
//                 onClick={() => handleTabClick("funding")}
//               >
//                 Funding
//               </span>
//             </div>

//             {activeTab === "hours" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 overflow-x-auto"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <div className="w-full bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   projectId={selectedPlan.projId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={() => {}}
//                 />
//               </div>
//             )}

//             {activeTab === "amounts" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (amountsRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectAmountsTable
//                   initialData={selectedPlan}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   planType={selectedPlan.plType}
//                   fiscalYear={fiscalYear}
//                   refreshKey={refreshKey}
//                   onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueAnalysis" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueAnalysisTable
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "analysisByPeriod" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (analysisRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <AnalysisByPeriodContent
//                   onCancel={handleCloseTab}
//                   planID={selectedPlan.plId}
//                   templateId={selectedPlan.templateId || 1}
//                   type={selectedPlan.plType || "TARGET"}
//                   initialApiData={analysisApiData}
//                   isLoading={isAnalysisLoading}
//                   error={analysisError}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "plc" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <button
//                   className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
//                   onClick={handleCloseTab}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//                 <PLCComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                   showPLC={activeTab === "plc"}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueSetup" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueSetupComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueCeiling" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueCeilingComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "funding" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (fundingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <FundingComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;



// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const fundingRefs = useRef({});
//   const inputRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setActiveTab(null); // Close any open tabs

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//         ? project.projId.split("T")
//         : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//     setActiveTab(null); // Close any open tabs
//   };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       // clear selection & reset state as before
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }

//     // Update if different plan OR if the same plan but with changes (to refresh buttons on checkbox change)
//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan) // simple deep comparison; alternatively, you can check relevant fields explicitly
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }

//     // if same plan with no changes, do nothing
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//     // If clicked same tab again, do not toggle or close automatically
//   };

//   // Close tab explicitly by Close button in tab content
//   const handleCloseTab = () => {
//     setActiveTab(null);
//   };

//   // Render tab content as popup
//   const renderTabPopup = () => {
//     if (!activeTab || !selectedPlan) return null;

//     const tabContentMap = {
//       hours: (
//         <ProjectHoursDetails
//           planId={selectedPlan.plId}
//           projectId={selectedPlan.projId}
//           status={selectedPlan.status}
//           planType={selectedPlan.plType}
//           closedPeriod={selectedPlan.closedPeriod}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           fiscalYear={fiscalYear}
//           onSaveSuccess={() => {}}
//         />
//       ),
//       amounts: (
//         <ProjectAmountsTable
//           initialData={selectedPlan}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           planType={selectedPlan.plType}
//           fiscalYear={fiscalYear}
//           refreshKey={refreshKey}
//           onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//         />
//       ),
//       revenueAnalysis: (
//         <RevenueAnalysisTable
//           planId={selectedPlan.plId}
//           status={selectedPlan.status}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       analysisByPeriod: (
//         <AnalysisByPeriodContent
//           onCancel={handleCloseTab}
//           planID={selectedPlan.plId}
//           templateId={selectedPlan.templateId || 1}
//           type={selectedPlan.plType || "TARGET"}
//           initialApiData={analysisApiData}
//           isLoading={isAnalysisLoading}
//           error={analysisError}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       plc: (
//         <PLCComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//           showPLC={activeTab === "plc"}
//         />
//       ),
//       revenueSetup: (
//         <RevenueSetupComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects[0]?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       revenueCeiling: (
//         <RevenueCeilingComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects[0]?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       funding: (
//         <FundingComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//         />
//       ),
//     };

//     const tabTitles = {
//       hours: "Labor",
//       amounts: "Other Cost",
//       revenueAnalysis: "Revenue Details",
//       analysisByPeriod: "Forecast By Period",
//       plc: "Labor Categories",
//       revenueSetup: "Revenue Definition",
//       revenueCeiling: "Revenue Adjustment",
//       funding: "Funding",
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white rounded-lg shadow-xl max-w-7xl max-h-[90vh] w-full mx-4 overflow-hidden">
//           <div className="flex justify-between items-center p-4 border-b bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {tabTitles[activeTab]}
//             </h3>
//             <button
//               onClick={handleCloseTab}
//               className="text-gray-500 hover:text-red-500 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
          
//           <div className="p-4">
//             <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//               <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                 <span>
//                   <span className="font-semibold">Project ID: </span>
//                   {selectedPlan.projId}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Type: </span>
//                   {selectedPlan.plType || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Version: </span>
//                   {selectedPlan.version || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Status: </span>
//                   {selectedPlan.status || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Period of Performance: </span>
//                   Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                   Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 max-h-[70vh] overflow-y-auto">
//             {tabContentMap[activeTab]}
//           </div>
//         </div>
//       </div>
//     );
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
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
//             {selectedPlan && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.projId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project Name:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {selectedPlan.projName}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Start Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projStartDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       End Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projEndDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Organization:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.orgId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Fee:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Cost:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Rev:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />

//             {/* Only show tabs if a plan is selected */}
//             {selectedPlan && (
//               <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full">
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "hours"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("hours")}
//                 >
//                   Labor
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "amounts"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("amounts")}
//                 >
//                   Other Cost
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "revenueAnalysis"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("revenueAnalysis")}
//                 >
//                   Revenue Details
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "analysisByPeriod"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("analysisByPeriod")}
//                 >
//                   Forecast By Period
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "plc"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("plc")}
//                 >
//                   Labor Categories
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "revenueSetup"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("revenueSetup")}
//                 >
//                   Revenue Definition
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "revenueCeiling"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("revenueCeiling")}
//                 >
//                   Revenue Adjustment
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "funding"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("funding")}
//                 >
//                   Funding
//                 </span>
//               </div>
//             )}
//           </div>
//         )
//       )}

//       {/* Render popup for tab content */}
//       {renderTabPopup()}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const fundingRefs = useRef({});
//   const inputRef = useRef(null);
//   const projectContainerRef = useRef(null); // New ref for project container

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   useEffect(() => {
//     if (!activeTab) return;

//     const refMap = {
//       hours: hoursRefs,
//       amounts: amountsRefs,
//       revenueAnalysis: revenueRefs,
//       analysisByPeriod: analysisRefs,
//       revenueSetup: revenueSetupRefs,
//       revenueCeiling: revenueCeilingRefs,
//       funding: fundingRefs,
//       plc: hoursRefs,
//     };

//     const refObj = refMap[activeTab];

//     if (refObj && refObj.current && refObj.current[searchTerm]) {
//       requestAnimationFrame(() => {
//         refObj.current[searchTerm].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       });
//     }
//   }, [activeTab, searchTerm]);

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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setActiveTab(null); // Close any open tabs

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//         ? project.projId.split("T")
//         : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//     setActiveTab(null);
//   };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }

//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan)
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//   };

//   const handleCloseTab = () => {
//     setActiveTab(null);
//   };

//   // Render tab content as popup positioned over ProjectPlanTable
//   const renderTabPopup = () => {
//     if (!activeTab || !selectedPlan) return null;

//     const tabContentMap = {
//       hours: (
//         <ProjectHoursDetails
//           planId={selectedPlan.plId}
//           projectId={selectedPlan.projId}
//           status={selectedPlan.status}
//           planType={selectedPlan.plType}
//           closedPeriod={selectedPlan.closedPeriod}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           fiscalYear={fiscalYear}
//           onSaveSuccess={() => {}}
//         />
//       ),
//       amounts: (
//         <ProjectAmountsTable
//           initialData={selectedPlan}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           planType={selectedPlan.plType}
//           fiscalYear={fiscalYear}
//           refreshKey={refreshKey}
//           onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//         />
//       ),
//       revenueAnalysis: (
//         <RevenueAnalysisTable
//           planId={selectedPlan.plId}
//           status={selectedPlan.status}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       analysisByPeriod: (
//         <AnalysisByPeriodContent
//           onCancel={handleCloseTab}
//           planID={selectedPlan.plId}
//           templateId={selectedPlan.templateId || 1}
//           type={selectedPlan.plType || "TARGET"}
//           initialApiData={analysisApiData}
//           isLoading={isAnalysisLoading}
//           error={analysisError}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       plc: (
//         <PLCComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//           showPLC={activeTab === "plc"}
//         />
//       ),
//       revenueSetup: (
//         <RevenueSetupComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects[0]?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       revenueCeiling: (
//         <RevenueCeilingComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects[0]?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       funding: (
//         <FundingComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//         />
//       ),
//     };

//     const tabTitles = {
//       hours: "Labor",
//       amounts: "Other Cost",
//       revenueAnalysis: "Revenue Details",
//       analysisByPeriod: "Forecast By Period",
//       plc: "Labor Categories",
//       revenueSetup: "Revenue Definition",
//       revenueCeiling: "Revenue Adjustment",
//       funding: "Funding",
//     };

//     return (
//       <div className="absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-start pt-4 z-50">
//         <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[80vh] overflow-hidden border border-gray-300">
//           <div className="flex justify-between items-center p-4 border-b bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {tabTitles[activeTab]}
//             </h3>
//             <button
//               onClick={handleCloseTab}
//               className="text-gray-500 hover:text-red-500 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
          
//           <div className="p-4">
//             <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//               <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                 <span>
//                   <span className="font-semibold">Project ID: </span>
//                   {selectedPlan.projId}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Type: </span>
//                   {selectedPlan.plType || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Version: </span>
//                   {selectedPlan.version || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Status: </span>
//                   {selectedPlan.status || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Period of Performance: </span>
//                   Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                   Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 max-h-[60vh] overflow-y-auto">
//             {tabContentMap[activeTab]}
//           </div>
//         </div>
//       </div>
//     );
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
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
//             className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8 relative"
//             ref={projectContainerRef}
//           >
//             {selectedPlan && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.projId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project Name:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {selectedPlan.projName}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Start Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projStartDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       End Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projEndDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Organization:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.orgId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Fee:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Cost:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Rev:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />

//             {/* Only show tabs if a plan is selected */}
//             {selectedPlan && (
//               <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full">
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "hours"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("hours")}
//                 >
//                   Labor
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "amounts"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("amounts")}
//                 >
//                   Other Cost
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "revenueAnalysis"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("revenueAnalysis")}
//                 >
//                   Revenue Details
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "analysisByPeriod"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("analysisByPeriod")}
//                 >
//                   Forecast By Period
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "plc"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("plc")}
//                 >
//                   Labor Categories
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "revenueSetup"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("revenueSetup")}
//                 >
//                   Revenue Definition
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "revenueCeiling"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("revenueCeiling")}
//                 >
//                   Revenue Adjustment
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t 
//                     ${
//                       activeTab === "funding"
//                         ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600"
//                         : "underline hover:bg-gray-50"
//                     }`}
//                   onClick={() => handleTabClick("funding")}
//                 >
//                   Funding
//                 </span>
//               </div>
//             )}

//             {/* Render popup for tab content positioned over the project container */}
//             {renderTabPopup()}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;


// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const projectTableRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   // Track tab popup overlay rect
//   const [popupRect, setPopupRect] = useState(null);
//   useEffect(() => {
//     if (activeTab && projectTableRef.current) {
//       const rect = projectTableRef.current.getBoundingClientRect();
//       setPopupRect({
//         left: rect.left + window.scrollX,
//         top: rect.top + window.scrollY,
//         width: rect.width,
//         height: rect.height,
//       });
//     } else {
//       setPopupRect(null);
//     }
//   }, [activeTab, selectedPlan, filteredProjects]);

//   // Analysis effect
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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   // UI handlers (as before)
//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setActiveTab(null);

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//         ? project.projId.split("T")
//         : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//     setActiveTab(null);
//   };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }

//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan)
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       setActiveTab(null);
//     }
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//   };

//   const handleCloseTab = () => {
//     setActiveTab(null);
//   };

//   const renderTabPopup = () => {
//     if (!activeTab || !selectedPlan || !popupRect) return null;
//     const tabContentMap = {
//       hours: (
//         <ProjectHoursDetails
//           planId={selectedPlan.plId}
//           projectId={selectedPlan.projId}
//           status={selectedPlan.status}
//           planType={selectedPlan.plType}
//           closedPeriod={selectedPlan.closedPeriod}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           fiscalYear={fiscalYear}
//           onSaveSuccess={() => {}}
//         />
//       ),
//       amounts: (
//         <ProjectAmountsTable
//           initialData={selectedPlan}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           planType={selectedPlan.plType}
//           fiscalYear={fiscalYear}
//           refreshKey={refreshKey}
//           onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//         />
//       ),
//       revenueAnalysis: (
//         <RevenueAnalysisTable
//           planId={selectedPlan.plId}
//           status={selectedPlan.status}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       analysisByPeriod: (
//         <AnalysisByPeriodContent
//           onCancel={handleCloseTab}
//           planID={selectedPlan.plId}
//           templateId={selectedPlan.templateId || 1}
//           type={selectedPlan.plType || "TARGET"}
//           initialApiData={analysisApiData}
//           isLoading={isAnalysisLoading}
//           error={analysisError}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       plc: (
//         <PLCComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//           showPLC={activeTab === "plc"}
//         />
//       ),
//       revenueSetup: (
//         <RevenueSetupComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects[0]?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       revenueCeiling: (
//         <RevenueCeilingComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       funding: (
//         <FundingComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//         />
//       ),
//     };
//     const tabTitles = {
//       hours: "Labor",
//       amounts: "Other Cost",
//       revenueAnalysis: "Revenue Details",
//       analysisByPeriod: "Forecast By Period",
//       plc: "Labor Categories",
//       revenueSetup: "Revenue Definition",
//       revenueCeiling: "Revenue Adjustment",
//       funding: "Funding",
//     };
//     return (
//       <div
//         style={{
//           position: "fixed",
//           left: popupRect.left,
//           top: popupRect.top,
//           width: popupRect.width,
//           height: popupRect.height,
//           zIndex: 1000,
//         }}
//         className="flex items-stretch justify-center pointer-events-auto"
//       >
//         <div
//           className="absolute inset-0 backdrop-blur-md bg-white/10"
//           style={{ zIndex: 1 }}
//         ></div>
//         <div
//           className="relative rounded-lg shadow-2xl max-w-full w-full max-h-full m-0 overflow-hidden border border-gray-300 flex flex-col"
//           style={{
//             zIndex: 2,
//             background: "#fff",
//           }}
//         >
//           <div className="flex justify-between items-center p-4 border-b bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {tabTitles[activeTab]}
//             </h3>
//             <button
//               onClick={handleCloseTab}
//               className="text-gray-500 hover:text-red-500 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="p-4 overflow-y-auto flex-1 min-h-0">
//             <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//               <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                 <span>
//                   <span className="font-semibold">Project ID: </span>
//                   {selectedPlan.projId}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Type: </span>
//                   {selectedPlan.plType || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Version: </span>
//                   {selectedPlan.version || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Status: </span>
//                   {selectedPlan.status || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Period of Performance: </span>
//                   Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                   Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                 </span>
//               </div>
//             </div>
//             <div style={{ minHeight: "200px" }}>{tabContentMap[activeTab]}</div>
//           </div>
//         </div>
//       </div>
//     );
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
//       {/* Hide Project ID search when tab popup is open */}
//       {!activeTab && (
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
//             <label className="font-semibold text-xs sm:text-sm">
//               Project ID:
//             </label>
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 value={searchTerm}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyPress}
//                 autoComplete="off"
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       )}

//       {searched && !activeTab && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">{errorMessage}</div>
//       ) : searched && !activeTab && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           No project found with that ID.
//         </div>
//       ) : filteredProjects.length > 0 && (
//         <div
//           key={searchTerm}
//           className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//         >
//           {/* Hide project info section when tab popup is open */}
//           {selectedPlan && !activeTab && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//               <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                 <div>
//                   <span className="font-semibold text-green-800">Project:</span>{" "}
//                   <span className="text-gray-700">{selectedPlan.projId}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Project Name:</span>{" "}
//                   <span className="text-gray-700">
//                     {selectedPlan.projName}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Start Date:</span>{" "}
//                   <span className="text-gray-700">
//                     {formatDate(selectedPlan.projStartDt)}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">End Date:</span>{" "}
//                   <span className="text-gray-700">
//                     {formatDate(selectedPlan.projEndDt)}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Organization:</span>{" "}
//                   <span className="text-gray-700">{selectedPlan.orgId}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
//                   <span className="text-gray-700">
//                     {Number(selectedPlan.fundedFee).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//                   <span className="text-gray-700">
//                     {Number(selectedPlan.fundedCost).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//                   <span className="text-gray-700">
//                     {Number(selectedPlan.fundedRev).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={projectTableRef} style={{ position: "relative" }}>
//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />
//             {/* Tabs row is always present but popup overlays if open */}
//             {selectedPlan && (
//               <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full mt-2">
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "hours" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("hours")}
//                 >
//                   Labor
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "amounts" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("amounts")}
//                 >
//                   Other Cost
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "revenueAnalysis" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("revenueAnalysis")}
//                 >
//                   Revenue Details
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "analysisByPeriod" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("analysisByPeriod")}
//                 >
//                   Forecast By Period
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "plc" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("plc")}
//                 >
//                   Labor Categories
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "revenueSetup" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("revenueSetup")}
//                 >
//                   Revenue Definition
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "revenueCeiling" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("revenueCeiling")}
//                 >
//                   Revenue Adjustment
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "funding" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("funding")}
//                 >
//                   Funding
//                 </span>
//               </div>
//             )}
//             {/* Popup if tab is open */}
//             {activeTab && renderTabPopup()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const projectTableRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   // Track tab popup overlay rect
//   const [popupRect, setPopupRect] = useState(null);
//   useEffect(() => {
//     if (activeTab && projectTableRef.current) {
//       const rect = projectTableRef.current.getBoundingClientRect();
//       setPopupRect({
//         left: rect.left + window.scrollX,
//         top: rect.top + window.scrollY,
//         width: rect.width,
//         height: rect.height,
//       });
//     } else {
//       setPopupRect(null);
//     }
//   }, [activeTab, selectedPlan, filteredProjects]);

//   // Analysis effect
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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   // UI handlers (as before)
//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");
//     setActiveTab(null);

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//         ? project.projId.split("T")
//         : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//     setActiveTab(null);
//   };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }

//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan)
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       setActiveTab(null);
//     }
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//   };

//   const handleCloseTab = () => {
//     setActiveTab(null);
//   };

//   const renderTabPopup = () => {
//     if (!activeTab || !selectedPlan || !popupRect) return null;
//     const tabContentMap = {
//       hours: (
//         <ProjectHoursDetails
//           planId={selectedPlan.plId}
//           projectId={selectedPlan.projId}
//           status={selectedPlan.status}
//           planType={selectedPlan.plType}
//           closedPeriod={selectedPlan.closedPeriod}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           fiscalYear={fiscalYear}
//           onSaveSuccess={() => {}}
//         />
//       ),
//       amounts: (
//         <ProjectAmountsTable
//           initialData={selectedPlan}
//           startDate={selectedPlan.projStartDt}
//           endDate={selectedPlan.projEndDt}
//           planType={selectedPlan.plType}
//           fiscalYear={fiscalYear}
//           refreshKey={refreshKey}
//           onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//         />
//       ),
//       revenueAnalysis: (
//         <RevenueAnalysisTable
//           planId={selectedPlan.plId}
//           status={selectedPlan.status}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       analysisByPeriod: (
//         <AnalysisByPeriodContent
//           onCancel={handleCloseTab}
//           planID={selectedPlan.plId}
//           templateId={selectedPlan.templateId || 1}
//           type={selectedPlan.plType || "TARGET"}
//           initialApiData={analysisApiData}
//           isLoading={isAnalysisLoading}
//           error={analysisError}
//           fiscalYear={fiscalYear}
//         />
//       ),
//       plc: (
//         <PLCComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//           showPLC={activeTab === "plc"}
//         />
//       ),
//       revenueSetup: (
//         <RevenueSetupComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects[0]?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       revenueCeiling: (
//         <RevenueCeilingComponent
//           selectedPlan={{
//             ...selectedPlan,
//             startDate: selectedPlan.startDate,
//             endDate: selectedPlan.endDate,
//             orgId: filteredProjects?.orgId,
//           }}
//           revenueAccount={revenueAccount}
//         />
//       ),
//       funding: (
//         <FundingComponent
//           selectedProjectId={selectedPlan.projId}
//           selectedPlan={selectedPlan}
//         />
//       ),
//     };
//     const tabTitles = {
//       hours: "Labor",
//       amounts: "Other Cost",
//       revenueAnalysis: "Revenue Details",
//       analysisByPeriod: "Forecast By Period",
//       plc: "Labor Categories",
//       revenueSetup: "Revenue Definition",
//       revenueCeiling: "Revenue Adjustment",
//       funding: "Funding",
//     };
//     return (
//       <div
//         style={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           width: "100%",
//           height: "600px",
//           zIndex: 1000,
//         }}
//         className="flex items-stretch justify-center pointer-events-auto"
//       >
//         <div
//           className="absolute inset-0 backdrop-blur-md bg-white/90"
//           style={{ zIndex: 1 }}
//         ></div>
//         <div
//           className="relative rounded-lg shadow-2xl max-w-full w-full max-h-full m-0 overflow-hidden border border-gray-300 flex flex-col"
//           style={{
//             zIndex: 2,
//             background: "#fff",
//           }}
//         >
//           <div className="flex justify-between items-center p-4 border-b bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {tabTitles[activeTab]}
//             </h3>
//             <button
//               onClick={handleCloseTab}
//               className="text-gray-500 hover:text-red-500 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="p-4 overflow-y-auto flex-1 min-h-0">
//             <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//               <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                 <span>
//                   <span className="font-semibold">Project ID: </span>
//                   {selectedPlan.projId}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Type: </span>
//                   {selectedPlan.plType || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Version: </span>
//                   {selectedPlan.version || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Status: </span>
//                   {selectedPlan.status || "N/A"}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Period of Performance: </span>
//                   Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                   Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                 </span>
//               </div>
//             </div>
//             <div style={{ minHeight: "450px" }}>
//               {tabContentMap[activeTab]}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
//       {/* Hide Project ID search when tab popup is open */}
//       {!activeTab && (
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
//             <label className="font-semibold text-xs sm:text-sm">
//               Project ID:
//             </label>
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 value={searchTerm}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyPress}
//                 autoComplete="off"
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-xs sm:text-sm font-normal hover:bg-blue-700 transition w-full sm:w-auto"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       )}

//       {searched && !activeTab && errorMessage ? (
//         <div className="text-red-500 italic text-xs sm:text-sm">{errorMessage}</div>
//       ) : searched && !activeTab && filteredProjects.length === 0 ? (
//         <div className="text-gray-500 italic text-xs sm:text-sm">
//           No project found with that ID.
//         </div>
//       ) : filteredProjects.length > 0 && (
//         <div
//           key={searchTerm}
//           className="space-y-4 border p-2 sm:p-4 rounded shadow bg-white mb-8"
//         >
//           {/* Hide project info section when tab popup is open */}
//           {selectedPlan && !activeTab && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//               <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                 <div>
//                   <span className="font-semibold text-green-800">Project:</span>{" "}
//                   <span className="text-gray-700">{selectedPlan.projId}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Project Name:</span>{" "}
//                   <span className="text-gray-700">
//                     {selectedPlan.projName}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Start Date:</span>{" "}
//                   <span className="text-gray-700">
//                     {formatDate(selectedPlan.projStartDt)}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">End Date:</span>{" "}
//                   <span className="text-gray-700">
//                     {formatDate(selectedPlan.projEndDt)}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Organization:</span>{" "}
//                   <span className="text-gray-700">{selectedPlan.orgId}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
//                   <span className="text-gray-700">
//                     {Number(selectedPlan.fundedFee).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//                   <span className="text-gray-700">
//                     {Number(selectedPlan.fundedCost).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//                   <span className="text-gray-700">
//                     {Number(selectedPlan.fundedRev).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div 
//             ref={projectTableRef} 
//             style={{ 
//               position: "relative",
//               minHeight: activeTab ? "650px" : "auto",
//               overflow: activeTab ? "hidden" : "visible" // Hide content that exceeds container when popup is open
//             }}
//           >
//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />
//             {/* Tabs row is always present but popup overlays if open */}
//             {selectedPlan && (
//               <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full mt-2">
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "hours" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("hours")}
//                 >
//                   Labor
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "amounts" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("amounts")}
//                 >
//                   Other Cost
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "revenueAnalysis" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("revenueAnalysis")}
//                 >
//                   Revenue Details
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "analysisByPeriod" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("analysisByPeriod")}
//                 >
//                   Forecast By Period
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "plc" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("plc")}
//                 >
//                   Labor Categories
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "revenueSetup" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("revenueSetup")}
//                 >
//                   Revenue Definition
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "revenueCeiling" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("revenueCeiling")}
//                 >
//                   Revenue Adjustment
//                 </span>
//                 <span
//                   className={`cursor-pointer px-2 py-1 rounded-t ${activeTab === "funding" ? "bg-gray-100 text-blue-800 font-semibold border-b-2 border-blue-600" : "underline hover:bg-gray-50"}`}
//                   onClick={() => handleTabClick("funding")}
//                 >
//                   Funding
//                 </span>
//               </div>
//             )}
//             {/* Popup if tab is open */}
//             {activeTab && renderTabPopup()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;


// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import FinancialDashboard from "./FinancialDashboard";
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const fundingRefs = useRef({});
//   const inputRef = useRef(null);
//   const dashboardRefs = useRef({});

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   useEffect(() => {
//     if (!activeTab) return;

//     const refMap = {
//       hours: hoursRefs,
//       amounts: amountsRefs,
//       revenueAnalysis: revenueRefs,
//       analysisByPeriod: analysisRefs,
//       revenueSetup: revenueSetupRefs,
//       revenueCeiling: revenueCeilingRefs,
//       funding: fundingRefs,
//       plc: hoursRefs, // or your actual ref for plc tab
//       dashboard: dashboardRefs
//     };

//     const refObj = refMap[activeTab];

//     if (refObj && refObj.current && refObj.current[searchTerm]) {
//       requestAnimationFrame(() => {
//         refObj.current[searchTerm].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       });
//     }
//   }, [activeTab, searchTerm]);

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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//             const [month, day, year] = dateStr.split("/");
//             return new Date(`${year}-${month}-${day}`);
//           })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//           ? project.projId.split("T")
//           : project.projId;
//       setPrefixes(new Set([prefix]));
//       setFilteredProjects([project]);
//       setRevenueAccount(data.revenueAccount || "");
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//               ? project.projId.split("T")
//               : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//   };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }
//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan)
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }
//     // if same plan with no changes, do nothing
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//     // If clicked same tab again, do not toggle or close automatically
//   };

//   const handleCloseTab = () => {
//     setActiveTab(null);
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
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
//             {selectedPlan && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.projId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project Name:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {selectedPlan.projName}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Start Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projStartDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       End Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projEndDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Organization:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.orgId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Fee:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Cost:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Rev:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />

//             <div className="flex flex-wrap gap-2 sm:gap-4 text-blue-600 underline text-xs sm:text-sm cursor-pointer">
//               <span
//                 className={`cursor-pointer ${activeTab === "dashboard" ? "font-normal text-blue-800" : ""}`}
//                 onClick={() => handleTabClick('dashboard')}
//               >
//                 Dashboard
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "hours"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("hours")}
//               >
//                 Labor
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "amounts"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("amounts")}
//               >
//                 Other Cost
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueAnalysis"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueAnalysis")}
//               >
//                 Revenue Details
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "analysisByPeriod"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("analysisByPeriod")}
//               >
//                 Forecast By Period
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "plc"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("plc")}
//               >
//                 Labor Categories
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueSetup"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueSetup")}
//               >
//                 Revenue Definition
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueCeiling"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueCeiling")}
//               >
//                 Revenue Adjustment
//               </span>
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "funding"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("funding")}
//               >
//                 Funding
//               </span>
//             </div>

//             {activeTab === "dashboard" && selectedPlan && (
//               <div className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16" ref={el => dashboardRefs.current[searchTerm] = el}>
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span><span className="font-semibold">Project ID: </span>{selectedPlan.projId}</span>
//                     <span><span className="font-semibold">Type: </span>{selectedPlan.plType || "N/A"}</span>
//                     <span><span className="font-semibold">Version: </span>{selectedPlan.version || "N/A"}</span>
//                     <span><span className="font-semibold">Status: </span>{selectedPlan.status || "N/A"}</span>
//                   </div>
//                 </div>
//                 <FinancialDashboard
//                   planId={selectedPlan.plId}
//                   templateId={selectedPlan.templateId}
//                   type={selectedPlan.plType}
//                 />
//               </div>
//             )}

//             {activeTab === "hours" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 overflow-x-auto"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <div className="w-full bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   projectId={selectedPlan.projId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={() => {}}
//                 />
//               </div>
//             )}

//             {activeTab === "amounts" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (amountsRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectAmountsTable
//                   initialData={selectedPlan}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   planType={selectedPlan.plType}
//                   fiscalYear={fiscalYear}
//                   refreshKey={refreshKey}
//                   onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueAnalysis" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueAnalysisTable
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "analysisByPeriod" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (analysisRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <AnalysisByPeriodContent
//                   onCancel={handleCloseTab}
//                   planID={selectedPlan.plId}
//                   templateId={selectedPlan.templateId || 1}
//                   type={selectedPlan.plType || "TARGET"}
//                   initialApiData={analysisApiData}
//                   isLoading={isAnalysisLoading}
//                   error={analysisError}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "plc" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <button
//                   className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
//                   onClick={handleCloseTab}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//                 <PLCComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                   showPLC={activeTab === "plc"}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueSetup" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueSetupComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueCeiling" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueCeilingComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}
//             {activeTab === "funding" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (fundingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <FundingComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;


// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
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
// import { formatDate } from "./utils";

// const ProjectBudgetStatus = () => {
//   const [projects, setProjects] = useState([]);
//   const [prefixes, setPrefixes] = useState(new Set());
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [revenueAccount, setRevenueAccount] = useState("");
//   const [activeTab, setActiveTab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [forecastData, setForecastData] = useState([]);
//   const [isForecastLoading, setIsForecastLoading] = useState(false);
//   const [fiscalYear, setFiscalYear] = useState("All");
//   const [fiscalYearOptions, setFiscalYearOptions] = useState([]);
//   const [analysisApiData, setAnalysisApiData] = useState([]);
//   const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
//   const [analysisError, setAnalysisError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const hoursRefs = useRef({});
//   const amountsRefs = useRef({});
//   const revenueRefs = useRef({});
//   const analysisRefs = useRef({});
//   const revenueSetupRefs = useRef({});
//   const revenueCeilingRefs = useRef({});
//   const fundingRefs = useRef({});
//   const inputRef = useRef(null);

//   const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
//   const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   // Auto-scroll effect: scrolls to tab content div when activeTab changes
//   // useEffect(() => {
//   //   if (!activeTab) return;

//   //   const refMap = {
//   //     hours: hoursRefs,
//   //     amounts: amountsRefs,
//   //     revenueAnalysis: revenueRefs,
//   //     analysisByPeriod: analysisRefs,
//   //     revenueSetup: revenueSetupRefs,
//   //     revenueCeiling: revenueCeilingRefs,
//   //     funding: fundingRefs,
//   //     plc: hoursRefs, // assuming PLC reuses hoursRefs or add separate ref if needed
//   //   };

//   //   const refObj = refMap[activeTab];
//   //   if (refObj && refObj.current && refObj.current[searchTerm]) {
//   //     setTimeout(() => {
//   //       refObj.current[searchTerm].scrollIntoView({
//   //         behavior: "smooth",
//   //         block: "start",
//   //       });
//   //     }, 150); // slight delay to ensure DOM is rendered
//   //   }
//   // }, [activeTab, searchTerm]);
//   useEffect(() => {
//     if (!activeTab) return;

//     const refMap = {
//       hours: hoursRefs,
//       amounts: amountsRefs,
//       revenueAnalysis: revenueRefs,
//       analysisByPeriod: analysisRefs,
//       revenueSetup: revenueSetupRefs,
//       revenueCeiling: revenueCeilingRefs,
//       funding: fundingRefs,
//       plc: hoursRefs, // or your actual ref for plc tab
//     };

//     const refObj = refMap[activeTab];

//     if (refObj && refObj.current && refObj.current[searchTerm]) {
//       // Use requestAnimationFrame to wait for next paint and layout
//       requestAnimationFrame(() => {
//         refObj.current[searchTerm].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       });
//     }
//   }, [activeTab, searchTerm]);

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
//       if (activeTab !== "analysisByPeriod") return;

//       setIsAnalysisLoading(true);
//       setAnalysisError(null);
//       try {
//         const params = new URLSearchParams({
//           planID: selectedPlan.plId.toString(),
//           templateId: selectedPlan.templateId.toString(),
//           type: selectedPlan.plType,
//         });
//         const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
//         setAnalysisError(
//           `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
//         );
//         setAnalysisApiData([]);
//       } finally {
//         setIsAnalysisLoading(false);
//       }
//     };
//     fetchAnalysisData();
//   }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

//   useEffect(() => {
//     if (filteredProjects.length > 0) {
//       const project = filteredProjects[0];
//       const startDate = project.startDate || project.projStartDt;
//       const endDate = project.endDate || project.projEndDt;

//       const parseDate = (dateStr) => {
//         if (!dateStr) return null;
//         const date = dateStr.includes("/")
//           ? (() => {
//               const [month, day, year] = dateStr.split("/");
//               return new Date(`${year}-${month}-${day}`);
//             })()
//           : new Date(dateStr);

//         return isNaN(date.getTime()) ? null : date;
//       };

//       const start = parseDate(startDate);
//       const end = parseDate(endDate);

//       if (start && end) {
//         const startYear = start.getFullYear();
//         const endYear = end.getFullYear();
//         const currentYear = new Date().getFullYear();

//         if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
//           const years = [];
//           for (let year = startYear; year <= endYear; year++) {
//             years.push(year.toString());
//           }
//           setFiscalYearOptions(["All", ...years]);
//           if (years.includes(currentYear.toString())) {
//             setFiscalYear(currentYear.toString());
//           } else {
//             setFiscalYear("All");
//           }
//         } else {
//           setFiscalYearOptions(["All"]);
//           setFiscalYear("All");
//         }
//       } else {
//         setFiscalYearOptions(["All"]);
//         setFiscalYear("All");
//       }
//     } else {
//       setFiscalYearOptions(["All"]);
//       setFiscalYear("All");
//     }
//   }, [filteredProjects]);

//   const handleSearch = async () => {
//     const term = searchTerm.trim();
//     setSearched(true);
//     setErrorMessage("");

//     if (!term) {
//       setFilteredProjects([]);
//       setSelectedPlan(null);
//       setRevenueAccount("");
//       setPrefixes(new Set());
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetAllProjectByProjId/${term}`
//       );
//       const data = Array.isArray(response.data)
//         ? response.data[0]
//         : response.data;
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
//     } catch (error) {
//       try {
//         const planResponse = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
//         );
//         const planData = Array.isArray(planResponse.data)
//           ? planResponse.data[0]
//           : planResponse.data;
//         if (planData && planData.projId) {
//           const project = {
//             projId: planData.projId || term,
//             projName: planData.name || "",
//             projTypeDc: planData.description || "",
//             orgId: planData.orgId || "",
//             startDate: planData.startDate || "",
//             endDate: planData.endDate || "",
//             fundedCost: planData.proj_f_cst_amt || "",
//             fundedFee: planData.proj_f_fee_amt || "",
//             fundedRev: planData.proj_f_tot_amt || "",
//           };
//           const prefix = project.projId.includes(".")
//             ? project.projId.split(".")[0]
//             : project.projId.includes("T")
//             ? project.projId.split("T")[0]
//             : project.projId;
//           setPrefixes(new Set([prefix]));
//           setFilteredProjects([project]);
//           setRevenueAccount(planData.revenueAccount || "");
//           toast.info("Project data fetched from plans.", {
//             toastId: "fallback-project-fetch",
//             autoClose: 3000,
//           });
//         } else {
//           throw new Error("No valid plan data found.");
//         }
//       } catch (planError) {
//         setErrorMessage("No project or plan found with that ID.");
//         setFilteredProjects([]);
//         setSelectedPlan(null);
//         setRevenueAccount("");
//         setPrefixes(new Set());
//         toast.error("Failed to fetch project or plan data.");
//       }
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
//     setSelectedPlan(null);
//   };

//   // const handlePlanSelect = (plan) => {
//   //   if (!plan || (selectedPlan && selectedPlan.plId === plan.plId)) {
//   //     setSelectedPlan(null);
//   //     localStorage.removeItem("selectedPlan");
//   //     setActiveTab(null);
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //     return;
//   //   }
//   //   const project = {
//   //     projId: plan.projId || "",
//   //     projName: plan.projName || "",
//   //     projStartDt: plan.projStartDt || "",
//   //     projEndDt: plan.projEndDt || "",
//   //     orgId: plan.orgId || "",
//   //     fundedCost: plan.fundedCost || "",
//   //     fundedFee: plan.fundedFee || "",
//   //     fundedRev: plan.fundedRev || "",
//   //   };
//   //   setFilteredProjects([project]);
//   //   setRevenueAccount(plan.revenueAccount || "");
//   //   setSelectedPlan(plan);
//   //   localStorage.setItem("selectedPlan", JSON.stringify(plan));
//   //   setForecastData([]);
//   //   setIsForecastLoading(false);
//   //   setAnalysisApiData([]);
//   //   setIsAnalysisLoading(false);
//   //   setAnalysisError(null);
//   // };

//   // Updated tab click handler: only open tab if not already open; do not toggle off.

//   //   const handlePlanSelect = (plan) => {
//   //   // If no plan is selected (null/undefined), clear selection as usual
//   //   if (!plan) {
//   //     setSelectedPlan(null);
//   //     localStorage.removeItem("selectedPlan");
//   //     setActiveTab(null);
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //     return;
//   //   }

//   //   // If a different plan is selected, update state
//   //   if (!selectedPlan || selectedPlan.plId !== plan.plId) {
//   //     const project = {
//   //       projId: plan.projId || "",
//   //       projName: plan.projName || "",
//   //       projStartDt: plan.projStartDt || "",
//   //       projEndDt: plan.projEndDt || "",
//   //       orgId: plan.orgId || "",
//   //       fundedCost: plan.fundedCost || "",
//   //       fundedFee: plan.fundedFee || "",
//   //       fundedRev: plan.fundedRev || "",
//   //     };

//   //     setFilteredProjects([project]);
//   //     setRevenueAccount(plan.revenueAccount || "");
//   //     setSelectedPlan(plan);
//   //     localStorage.setItem("selectedPlan", JSON.stringify(plan));
//   //     setForecastData([]);
//   //     setIsForecastLoading(false);
//   //     setAnalysisApiData([]);
//   //     setIsAnalysisLoading(false);
//   //     setAnalysisError(null);
//   //   }
//   //   // If the same plan is clicked again, do nothing (don't deselect)
//   // };

//   const handlePlanSelect = (plan) => {
//     if (!plan) {
//       // clear selection & reset state as before
//       setSelectedPlan(null);
//       localStorage.removeItem("selectedPlan");
//       setActiveTab(null);
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//       return;
//     }

//     // Update if different plan OR if the same plan but with changes (to refresh buttons on checkbox change)
//     if (
//       !selectedPlan ||
//       selectedPlan.plId !== plan.plId ||
//       JSON.stringify(selectedPlan) !== JSON.stringify(plan) // simple deep comparison; alternatively, you can check relevant fields explicitly
//     ) {
//       const project = {
//         projId: plan.projId || "",
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.fundedCost || "",
//         fundedFee: plan.fundedFee || "",
//         fundedRev: plan.fundedRev || "",
//       };

//       setFilteredProjects([project]);
//       setRevenueAccount(plan.revenueAccount || "");
//       setSelectedPlan(plan);
//       localStorage.setItem("selectedPlan", JSON.stringify(plan));
//       setForecastData([]);
//       setIsForecastLoading(false);
//       setAnalysisApiData([]);
//       setIsAnalysisLoading(false);
//       setAnalysisError(null);
//     }

//     // if same plan with no changes, do nothing
//   };

//   const handleTabClick = (tabName) => {
//     if (!selectedPlan) {
//       toast.info("Please select a plan first.", {
//         toastId: "no-plan-selected",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (activeTab !== tabName) {
//       setActiveTab(tabName);
//     }
//     // If clicked same tab again, do not toggle or close automatically
//   };

//   // Close tab explicitly by Close button in tab content
//   const handleCloseTab = () => {
//     setActiveTab(null);
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

//   return (
//     <div className="p-2 sm:p-4 space-y-6 text-sm sm:text-base text-gray-800 font-inter">
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
//             {selectedPlan && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.projId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Project Name:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {selectedPlan.projName}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Start Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projStartDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       End Date:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {formatDate(selectedPlan.projEndDt)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Organization:
//                     </span>{" "}
//                     <span className="text-gray-700">{selectedPlan.orgId}</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Fee:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Cost:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-green-800">
//                       Funded Rev:
//                     </span>{" "}
//                     <span className="text-gray-700">
//                       {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                         minimumFractionDigits: 0,
//                         maximumFractionDigits: 0,
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <ProjectPlanTable
//               projectId={searchTerm}
//               onPlanSelect={handlePlanSelect}
//               selectedPlan={selectedPlan}
//               fiscalYear={fiscalYear}
//               setFiscalYear={setFiscalYear}
//               fiscalYearOptions={fiscalYearOptions}
//             />

//             {/* <div className="flex flex-nowrap gap-2 sm:gap-4 text-blue-600 text-xs sm:text-sm cursor-pointer w-full">
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "hours"
//           ? "bg-blue-600 text-white shadow-sm" // active tab
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200" // inactive tab
//       }`}
//                 onClick={() => handleTabClick("hours")}
//               >
//                 Labor
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "amounts"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("amounts")}
//               >
//                 Other Cost
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueAnalysis"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueAnalysis")}
//               >
//                 Revenue Details
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "analysisByPeriod"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("analysisByPeriod")}
//               >
//                 Forecast By Period
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "plc"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("plc")}
//               >
//                 Labor Categories
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueSetup"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueSetup")}
//               >
//                 Revenue Definition
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "revenueCeiling"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("revenueCeiling")}
//               >
//                 Revenue Adjustment
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//     ${
//       activeTab === "funding"
//         ? "bg-blue-600 text-white shadow-sm"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`}
//                 onClick={() => handleTabClick("funding")}
//               >
//                 Funding
//               </span>
//             </div> */}
//             <div className="flex flex-col gap-2 text-blue-600 text-xs sm:text-sm cursor-pointer w-fit">
//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "hours"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("hours")}
//               >
//                 Labor
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "amounts"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("amounts")}
//               >
//                 Other Cost
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "revenueAnalysis"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("revenueAnalysis")}
//               >
//                 Revenue Details
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "analysisByPeriod"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("analysisByPeriod")}
//               >
//                 Forecast By Period
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "plc"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("plc")}
//               >
//                 Labor Categories
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "revenueSetup"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("revenueSetup")}
//               >
//                 Revenue Definition
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "revenueCeiling"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("revenueCeiling")}
//               >
//                 Revenue Adjustment
//               </span>

//               <span
//                 className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
//       ${
//         activeTab === "funding"
//           ? "bg-blue-600 text-white shadow-sm"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//                 onClick={() => handleTabClick("funding")}
//               >
//                 Funding
//               </span>
//             </div>
//             {activeTab === "hours" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 overflow-x-auto"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <div className="w-full bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectHoursDetails
//                   planId={selectedPlan.plId}
//                   projectId={selectedPlan.projId}
//                   status={selectedPlan.status}
//                   planType={selectedPlan.plType}
//                   closedPeriod={selectedPlan.closedPeriod}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   fiscalYear={fiscalYear}
//                   onSaveSuccess={() => {}}
//                 />
//               </div>
//             )}

//             {activeTab === "amounts" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (amountsRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <ProjectAmountsTable
//                   initialData={selectedPlan}
//                   startDate={selectedPlan.projStartDt}
//                   endDate={selectedPlan.projEndDt}
//                   planType={selectedPlan.plType}
//                   fiscalYear={fiscalYear}
//                   refreshKey={refreshKey}
//                   onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueAnalysis" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueAnalysisTable
//                   planId={selectedPlan.plId}
//                   status={selectedPlan.status}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "analysisByPeriod" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (analysisRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <AnalysisByPeriodContent
//                   onCancel={handleCloseTab}
//                   planID={selectedPlan.plId}
//                   templateId={selectedPlan.templateId || 1}
//                   type={selectedPlan.plType || "TARGET"}
//                   initialApiData={analysisApiData}
//                   isLoading={isAnalysisLoading}
//                   error={analysisError}
//                   fiscalYear={fiscalYear}
//                 />
//               </div>
//             )}

//             {activeTab === "plc" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (hoursRefs.current[searchTerm] = el)}
//               >
//                 <button
//                   className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
//                   onClick={handleCloseTab}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//                 <PLCComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                   showPLC={activeTab === "plc"}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueSetup" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueSetupComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "revenueCeiling" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <RevenueCeilingComponent
//                   selectedPlan={{
//                     ...selectedPlan,
//                     startDate: selectedPlan.startDate,
//                     endDate: selectedPlan.endDate,
//                     orgId: filteredProjects[0]?.orgId,
//                   }}
//                   revenueAccount={revenueAccount}
//                 />
//               </div>
//             )}

//             {activeTab === "funding" && selectedPlan && (
//               <div
//                 className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
//                 ref={(el) => (fundingRefs.current[searchTerm] = el)}
//               >
//                 <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
//                   <button
//                     className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
//                     onClick={handleCloseTab}
//                     title="Close project details"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                   <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
//                     <span>
//                       <span className="font-semibold">Project ID: </span>
//                       {selectedPlan.projId}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Type: </span>
//                       {selectedPlan.plType || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Version: </span>
//                       {selectedPlan.version || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">Status: </span>
//                       {selectedPlan.status || "N/A"}
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         Period of Performance:{" "}
//                       </span>
//                       Start Date:{" "}
//                       {formatDate(selectedPlan.projStartDt) || "N/A"} | End
//                       Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//                 <FundingComponent
//                   selectedProjectId={selectedPlan.projId}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             )}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProjectBudgetStatus;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
import { formatDate } from "./utils";
import FinancialDashboard from "./FinancialDashboard";

const ProjectBudgetStatus = () => {
  const [projects, setProjects] = useState([]);
  const [prefixes, setPrefixes] = useState(new Set());
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [revenueAccount, setRevenueAccount] = useState("");
  const [activeTab, setActiveTab] = useState(null);
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
  const [refreshKey, setRefreshKey] = useState(0);

  const hoursRefs = useRef({});
  const amountsRefs = useRef({});
  const revenueRefs = useRef({});
  const analysisRefs = useRef({});
  const revenueSetupRefs = useRef({});
  const revenueCeilingRefs = useRef({});
  const fundingRefs = useRef({});
  const inputRef = useRef(null);
  const dashboardRefs = useRef({});

  const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
  const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

  const isChildProjectId = (projId) => {
    return projId && typeof projId === "string" && projId.includes(".");
  };

  useEffect(() => {
    if (!activeTab) return;

    const refMap = {
      hours: hoursRefs,
      amounts: amountsRefs,
      revenueAnalysis: revenueRefs,
      analysisByPeriod: analysisRefs,
      revenueSetup: revenueSetupRefs,
      revenueCeiling: revenueCeilingRefs,
      funding: fundingRefs,
      plc: hoursRefs,
      dashboard: dashboardRefs,
    };

    const refObj = refMap[activeTab];

    if (refObj && refObj.current && refObj.current[searchTerm]) {
      requestAnimationFrame(() => {
        refObj.current[searchTerm].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [activeTab, searchTerm]);

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
      if (activeTab !== "analysisByPeriod") return;

      setIsAnalysisLoading(true);
      setAnalysisError(null);
      try {
        const params = new URLSearchParams({
          planID: selectedPlan.plId.toString(),
          templateId: selectedPlan.templateId.toString(),
          type: selectedPlan.plType,
        });
        const externalApiUrl = `${EXTERNAL_API_BASE_URL}${CALCULATE_COST_ENDPOINT}?${params.toString()}`;

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
        setAnalysisError(
          `Failed to load Analysis By Period data. ${err.message}. Please ensure the external API is running and accepts GET request with planID, templateId, and type parameters.`
        );
        setAnalysisApiData([]);
      } finally {
        setIsAnalysisLoading(false);
      }
    };
    fetchAnalysisData();
  }, [selectedPlan, activeTab, EXTERNAL_API_BASE_URL, CALCULATE_COST_ENDPOINT]);

  useEffect(() => {
    if (filteredProjects.length > 0) {
      const project = filteredProjects[0];
      const startDate = project.startDate || project.projStartDt;
      const endDate = project.endDate || project.projEndDt;

      const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const date = dateStr.includes("/")
          ? (() => {
              const [month, day, year] = dateStr.split("/");
              return new Date(`${year}-${month}-${day}`);
            })()
          : new Date(dateStr);

        return isNaN(date.getTime()) ? null : date;
      };

      const start = parseDate(startDate);
      const end = parseDate(endDate);

      if (start && end) {
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        const currentYear = new Date().getFullYear();

        if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
          const years = [];
          for (let year = startYear; year <= endYear; year++) {
            years.push(year.toString());
          }
          setFiscalYearOptions(["All", ...years]);
          if (years.includes(currentYear.toString())) {
            setFiscalYear(currentYear.toString());
          } else {
            setFiscalYear("All");
          }
        } else {
          setFiscalYearOptions(["All"]);
          setFiscalYear("All");
        }
      } else {
        setFiscalYearOptions(["All"]);
        setFiscalYear("All");
      }
    } else {
      setFiscalYearOptions(["All"]);
      setFiscalYear("All");
    }
  }, [filteredProjects]);

  const handleSearch = async () => {
    const term = searchTerm.trim();
    setSearched(true);
    setErrorMessage("");

    if (!term) {
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
      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;
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
      try {
        const planResponse = await axios.get(
          `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${term}`
        );
        const planData = Array.isArray(planResponse.data)
          ? planResponse.data[0]
          : planResponse.data;
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
    if (!plan) {
      setSelectedPlan(null);
      localStorage.removeItem("selectedPlan");
      setActiveTab(null);
      setForecastData([]);
      setIsForecastLoading(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
      return;
    }

    if (
      !selectedPlan ||
      selectedPlan.plId !== plan.plId ||
      JSON.stringify(selectedPlan) !== JSON.stringify(plan)
    ) {
      const project = {
        projId: plan.projId || "",
        projName: plan.projName || "",
        projStartDt: plan.projStartDt || "",
        projEndDt: plan.projEndDt || "",
        orgId: plan.orgId || "",
        fundedCost: plan.fundedCost || "",
        fundedFee: plan.fundedFee || "",
        fundedRev: plan.fundedRev || "",
      };

      setFilteredProjects([project]);
      setRevenueAccount(plan.revenueAccount || "");
      setSelectedPlan(plan);
      localStorage.setItem("selectedPlan", JSON.stringify(plan));
      setForecastData([]);
      setIsForecastLoading(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
    }
  };

  const handleTabClick = (tabName) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (activeTab !== tabName) {
      setActiveTab(tabName);
    }
  };

  const handleCloseTab = () => {
    setActiveTab(null);
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
            {selectedPlan && (
              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-green-800">
                      Project:
                    </span>{" "}
                    <span className="text-gray-700">{selectedPlan.projId}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      Project Name:
                    </span>{" "}
                    <span className="text-gray-700">
                      {selectedPlan.projName}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      Start Date:
                    </span>{" "}
                    <span className="text-gray-700">
                      {formatDate(selectedPlan.projStartDt)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      End Date:
                    </span>{" "}
                    <span className="text-gray-700">
                      {formatDate(selectedPlan.projEndDt)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      Organization:
                    </span>{" "}
                    <span className="text-gray-700">{selectedPlan.orgId}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      Funded Fee:
                    </span>{" "}
                    <span className="text-gray-700">
                      {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      Funded Cost:
                    </span>{" "}
                    <span className="text-gray-700">
                      {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">
                      Funded Rev:
                    </span>{" "}
                    <span className="text-gray-700">
                      {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Flex container to keep buttons on the left of ProjectPlanTable */}
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2 text-blue-600 text-xs sm:text-sm cursor-pointer w-fit min-w-[150px]">
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "dashboard"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  Dashboard
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "hours"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("hours")}
                >
                  Hours
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "amounts"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("amounts")}
                >
                  Other Cost
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "revenueAnalysis"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("revenueAnalysis")}
                >
                  Revenue Details
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "analysisByPeriod"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("analysisByPeriod")}
                >
                  Monthly Forecast
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer ${
                    activeTab === "plc"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handleTabClick("plc")}
                >
                  Labor Categories
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "revenueSetup"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("revenueSetup")}
                >
                  Revenue Definition
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "revenueCeiling"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("revenueCeiling")}
                >
                  Adjustment
                </span>
                <span
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer
                    ${
                      activeTab === "funding"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => handleTabClick("funding")}
                >
                  Funding
                </span>
              </div>
              <div className="flex-1">
                <ProjectPlanTable
                  projectId={searchTerm}
                  onPlanSelect={handlePlanSelect}
                  selectedPlan={selectedPlan}
                  fiscalYear={fiscalYear}
                  setFiscalYear={setFiscalYear}
                  fiscalYearOptions={fiscalYearOptions}
                />
              </div>
            </div>

            {activeTab === "dashboard" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (dashboardRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                  </div>
                </div>
                <FinancialDashboard
                  planId={selectedPlan.plId}
                  templateId={selectedPlan.templateId}
                  type={selectedPlan.plType}
                />
              </div>
            )}

            {activeTab === "hours" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 overflow-x-auto"
                ref={(el) => (hoursRefs.current[searchTerm] = el)}
              >
                <div className="w-full bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <ProjectHoursDetails
                  planId={selectedPlan.plId}
                  projectId={selectedPlan.projId}
                  status={selectedPlan.status}
                  planType={selectedPlan.plType}
                  closedPeriod={selectedPlan.closedPeriod}
                  startDate={selectedPlan.projStartDt}
                  endDate={selectedPlan.projEndDt}
                  fiscalYear={fiscalYear}
                  onSaveSuccess={() => {}}
                />
              </div>
            )}

            {activeTab === "amounts" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (amountsRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <ProjectAmountsTable
                  initialData={selectedPlan}
                  startDate={selectedPlan.projStartDt}
                  endDate={selectedPlan.projEndDt}
                  planType={selectedPlan.plType}
                  fiscalYear={fiscalYear}
                  refreshKey={refreshKey}
                  onSaveSuccess={() => setRefreshKey((prev) => prev + 1)}
                />
              </div>
            )}

            {activeTab === "revenueAnalysis" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (revenueRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <RevenueAnalysisTable
                  planId={selectedPlan.plId}
                  status={selectedPlan.status}
                  fiscalYear={fiscalYear}
                />
              </div>
            )}

            {activeTab === "analysisByPeriod" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (analysisRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <AnalysisByPeriodContent
                  onCancel={handleCloseTab}
                  planID={selectedPlan.plId}
                  templateId={selectedPlan.templateId || 1}
                  type={selectedPlan.plType || "TARGET"}
                  initialApiData={analysisApiData}
                  isLoading={isAnalysisLoading}
                  error={analysisError}
                  fiscalYear={fiscalYear}
                />
              </div>
            )}

            {activeTab === "plc" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (hoursRefs.current[searchTerm] = el)}
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                  onClick={handleCloseTab}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <PLCComponent
                  selectedProjectId={selectedPlan.projId}
                  selectedPlan={selectedPlan}
                  showPLC={activeTab === "plc"}
                />
              </div>
            )}

            {activeTab === "revenueSetup" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (revenueSetupRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <RevenueSetupComponent
                  selectedPlan={{
                    ...selectedPlan,
                    startDate: selectedPlan.startDate,
                    endDate: selectedPlan.endDate,
                    orgId: filteredProjects[0]?.orgId,
                  }}
                  revenueAccount={revenueAccount}
                />
              </div>
            )}

            {activeTab === "revenueCeiling" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <RevenueCeilingComponent
                  selectedPlan={{
                    ...selectedPlan,
                    startDate: selectedPlan.startDate,
                    endDate: selectedPlan.endDate,
                    orgId: filteredProjects[0]?.orgId,
                  }}
                  revenueAccount={revenueAccount}
                />
              </div>
            )}

            {activeTab === "funding" && selectedPlan && (
              <div
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                ref={(el) => (fundingRefs.current[searchTerm] = el)}
              >
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4 relative">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-red-500 text-xl z-20 cursor-pointer bg-white bg-opacity-80 rounded-full p-0.5 transition-shadow shadow"
                    onClick={handleCloseTab}
                    title="Close project details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                    <span>
                      <span className="font-semibold">Project ID: </span>
                      {selectedPlan.projId}
                    </span>
                    <span>
                      <span className="font-semibold">Type: </span>
                      {selectedPlan.plType || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Version: </span>
                      {selectedPlan.version || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Status: </span>
                      {selectedPlan.status || "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">
                        Period of Performance:{" "}
                      </span>
                      Start Date:{" "}
                      {formatDate(selectedPlan.projStartDt) || "N/A"} | End
                      Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                    </span>
                  </div>
                </div>
                <FundingComponent
                  selectedProjectId={selectedPlan.projId}
                  selectedPlan={selectedPlan}
                />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ProjectBudgetStatus;
