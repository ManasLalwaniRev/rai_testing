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
import { formatDate } from './utils';

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
  const [errorMessage, setErrorMessage] = useState(""); // Fixed state declaration
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

  const EXTERNAL_API_BASE_URL = "https://test-api-3tmq.onrender.com";
  const CALCULATE_COST_ENDPOINT = "/Forecast/CalculateCost";

//   const fetchForecastData = async (planId) => {
//   setIsForecastLoading(true);
//   try {
//     const api = `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${planId}`;
//     const res = await axios.get(api);
//     setForecastData(Array.isArray(res.data) ? res.data : []);
//   } catch {
//     setForecastData([]);
//   }
//   setIsForecastLoading(false);
// };


//   useEffect(() => {
//   if (selectedPlan && showHours) {
//     // Fetch new forecast data for new plan when hours tab is open!
//     fetchForecastData(selectedPlan.plId);
//   }
// }, [selectedPlan, showHours]); // <<== react to plan or tab open/close


  // NEW: Function to close a specific tab
  // NEW: Function to close a specific tab
   // Function to close a specific tab
  const handleCloseTab = (tabName) => {
    switch (tabName) {
      case 'hours':
        setShowHours(false);
        setHoursProjectId(null);
        setForecastData([]);
        setIsForecastLoading(false);
        break;
      case 'amounts':
        setShowAmounts(false);
        break;
      case 'revenueAnalysis':
        setShowRevenueAnalysis(false);
        break;
      case 'analysisByPeriod':
        setShowAnalysisByPeriod(false);
        setAnalysisApiData([]);
        setIsAnalysisLoading(false);
        setAnalysisError(null);
        break;
      case 'plc':
        setShowPLC(false);
        break;
      case 'revenueSetup':
        setShowRevenueSetup(false);
        break;
      case 'funding':
        setShowFunding(false);
        break;
      case 'revenueCeiling':
        setShowRevenueCeiling(false);
        break;
      default:
        break;
    }
    // Optional: If all tabs are closed, deselect the plan
    if (
      !showHours && !showAmounts && !showRevenueAnalysis &&
      !showAnalysisByPeriod && !showPLC && !showRevenueSetup &&
      !showFunding && !showRevenueCeiling
    ) {
      handlePlanSelect(selectedPlan); // Triggers deselection
    }
  };

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

//   useEffect(() => {
    
    useEffect(() => {
  if (filteredProjects.length > 0) {
    const project = filteredProjects[0];
    const startDate = project.startDate || project.projStartDt;
    const endDate = project.endDate || project.projEndDt;

    const parseDate = (dateStr) => {
  if (!dateStr) return null;
  
  const date = dateStr.includes('/') 
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
      const currentYear = new Date().getFullYear(); // GET CURRENT YEAR

      if (!isNaN(startYear) && !isNaN(endYear) && startYear <= endYear) {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
          years.push(year.toString());
        }
        setFiscalYearOptions(["All", ...years]);
        
        // SET DEFAULT TO CURRENT YEAR IF IN RANGE, OTHERWISE "All"
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
}, [filteredProjects]); // Remove fiscalYear dependency

  useEffect(() => {
     if (showFunding && fundingRefs.current[searchTerm]) {
    setTimeout(
      () =>
        fundingRefs.current[searchTerm].scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      150
    );
  } else if (showHours && hoursProjectId && hoursRefs.current[hoursProjectId]) {
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
    showFunding,
    hoursProjectId,
    searchTerm,
  ]);

  const handleSearch = async () => {
    const term = searchTerm.trim();
    setSearched(true);
    setErrorMessage("");

    if (!term) {  // Only check if the term is empty
      setFilteredProjects([]);
      setSelectedPlan(null);
      setRevenueAccount("");
      setPrefixes(new Set());
      return;
    }

    // if (term.length < 2) {
    //   setFilteredProjects([]);
    //   setSelectedPlan(null);
    //   setRevenueAccount("");
    //   setPrefixes(new Set());
    //   return;
    // }

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
      console.error(
        "Error fetching project from GetAllProjectByProjId:",
        error
      );
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
        console.error(
          "Error fetching project from GetProjectPlans:",
          planError
        );
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



 // Updated handlePlanSelect to force tab reset and refetch on plan change
 const handlePlanSelect = (plan) => {
    if (!plan || (selectedPlan && selectedPlan.plId === plan.plId)) {
      setSelectedPlan(null);
      localStorage.removeItem("selectedPlan");
      
      // Reset tab states on deselection
      setShowHours(false);
      setShowAmounts(false);
      setShowRevenueAnalysis(false);
      setShowAnalysisByPeriod(false);
      setShowPLC(false);
      setShowRevenueSetup(false);
      setShowFunding(false);
      setShowRevenueCeiling(false);
      
      // Reset data states
      setForecastData([]);
      setIsForecastLoading(false);
      setAnalysisApiData([]);
      setIsAnalysisLoading(false);
      setAnalysisError(null);
      return;
    }

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
    
    // NO tab resets here - tabs stay open, and useEffect will refetch data
    // Reset only data states to clear old data
    setForecastData([]);
    setIsForecastLoading(false);
    setAnalysisApiData([]);
    setIsAnalysisLoading(false);
    setAnalysisError(null);
  };
   

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
//     // if (showHours && hoursProjectId === projId) {
//     //   return;
//     // }

//     setShowHours(true);
//     setShowAmounts(false);
//     setHoursProjectId(projId);
//     setShowRevenueAnalysis(false);
//     setShowAnalysisByPeriod(false);
//     setShowPLC(false);
//     setShowRevenueSetup(false);
//     setShowFunding(false);
//     setShowRevenueCeiling(false);
//     setIsForecastLoading(true);
//     setAnalysisApiData([]);
//     setIsAnalysisLoading(false);
//     setAnalysisError(null);

//     try {
//       const employeeApi =
//         selectedPlan.plType === "EAC"
//           ? `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`
//           : `https://test-api-3tmq.onrender.com/Project/GetEmployeeForecastByPlanID/${selectedPlan.plId}`;
//       const response = await axios.get(employeeApi);
//       if (!Array.isArray(response.data)) {
//         setForecastData([]);
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           {
//             toastId: "no-forecast-data",
//             autoClose: 3000,
//           }
//         );
//       } else {
//         setForecastData(response.data);
//       }
//     } catch (err) {
//       setForecastData([]);
//       if (err.response && err.response.status === 500) {
//         toast.info(
//           'No forecast data available for this plan. Click "New" to add entries.',
//           {
//             toastId: "no-forecast-data",
//             autoClose: 3000,
//           }
//         );
//       } else {
//         toast.error(
//           "Failed to load forecast data: " +
//             (err.response?.data?.message || err.message),
//           {
//             toastId: "forecast-error",
//             autoClose: 3000,
//           }
//         );
//       }
//     } finally {
//       setIsForecastLoading(false);
//     }
//   };


  // Updated handleAmountsTabClick: Only open if not already open
  
  
  const handleHoursTabClick = (projId) => {
  if (!selectedPlan) {
    toast.info("Please select a plan first.", {
      toastId: "no-plan-selected",
      autoClose: 3000,
    });
    return;
  }
  if (showHours && hoursProjectId === projId) {
    return; // Optional: Keep this if you want to prevent re-opening if already open
  }

  setShowHours(true);
  setShowAmounts(false);
  setHoursProjectId(projId);
  setShowRevenueAnalysis(false);
  setShowAnalysisByPeriod(false);
  setShowPLC(false);
  setShowRevenueSetup(false);
  setShowFunding(false);
  setShowRevenueCeiling(false);
  setAnalysisApiData([]);
  setIsAnalysisLoading(false);
  setAnalysisError(null);
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
      // Do nothing on re-click if already open
      return;
    }

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
  };


   // Updated handleRevenueAnalysisTabClick: Only open if not already open
  const handleRevenueAnalysisTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showRevenueAnalysis) {
      // Do nothing on re-click if already open
      return;
    }

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
  };

  // Updated handleAnalysisByPeriodTabClick: Only open if not already open
  const handleAnalysisByPeriodTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showAnalysisByPeriod) {
      // Do nothing on re-click if already open
      return;
    }

    setShowAnalysisByPeriod(true);
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowPLC(false);
    setShowRevenueSetup(false);
    setShowFunding(false);
    setShowRevenueCeiling(false);
  };

  // Updated handlePLCTabClick: Only open if not already open
  const handlePLCTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showPLC) {
      // Do nothing on re-click if already open
      return;
    }

    setShowPLC(true);
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowAnalysisByPeriod(false);
    setShowRevenueSetup(false);
    setShowFunding(false);
    setShowRevenueCeiling(false);
  };

 // Updated handleRevenueSetupTabClick: Only open if not already open
  const handleRevenueSetupTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showRevenueSetup) {
      // Do nothing on re-click if already open
      return;
    }

    setShowRevenueSetup(true);
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowAnalysisByPeriod(false);
    setShowPLC(false);
    setShowFunding(false);
    setShowRevenueCeiling(false);
  };

  // Updated handleFundingTabClick: Only open if not already open
  const handleFundingTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showFunding) {
      // Do nothing on re-click if already open
      return;
    }

    setShowFunding(true);
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowAnalysisByPeriod(false);
    setShowPLC(false);
    setShowRevenueSetup(false);
    setShowRevenueCeiling(false);
  };

  // Updated handleRevenueCeilingTabClick: Only open if not already open
  const handleRevenueCeilingTabClick = (projId) => {
    if (!selectedPlan) {
      toast.info("Please select a plan first.", {
        toastId: "no-plan-selected",
        autoClose: 3000,
      });
      return;
    }
    if (showRevenueCeiling) {
      // Do nothing on re-click if already open
      return;
    }

    setShowRevenueCeiling(true);
    setShowHours(false);
    setShowAmounts(false);
    setHoursProjectId(null);
    setShowRevenueAnalysis(false);
    setShowAnalysisByPeriod(false);
    setShowPLC(false);
    setShowRevenueSetup(false);
    setShowFunding(false);
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
                    <span className="font-semibold text-green-800">Project:</span>{" "}
                    <span className="text-gray-700">{selectedPlan.projId}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">Project Name:</span>{" "}
                    <span className="text-gray-700">{selectedPlan.projName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">Start Date:</span>{" "}
                    <span className="text-gray-700">{formatDate(selectedPlan.projStartDt)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">End Date:</span>{" "}
                    <span className="text-gray-700">{formatDate(selectedPlan.projEndDt)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">Organization:</span>{" "}
                    <span className="text-gray-700">{selectedPlan.orgId}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
                    <span className="text-gray-700">
                      {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
                    <span className="text-gray-700">
                      {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
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

            {false && (
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
            )}

            <ProjectPlanTable
              projectId={searchTerm}
              onPlanSelect={handlePlanSelect}
              selectedPlan={selectedPlan}
              fiscalYear={fiscalYear}
              setFiscalYear={setFiscalYear}
              fiscalYearOptions={fiscalYearOptions}
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
                className={`cursor-pointer ${showPLC ? "font-normal text-blue-800" : ""}`}
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
                className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16 overflow-x-auto"
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10 cursor-pointer"
                  onClick={() => handleCloseTab('hours')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="w-full  bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
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
                      <span className="font-semibold">Period of Performance: </span>
                      Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
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
  onSaveSuccess={() => { /* Optional: Handle any parent-side refresh if needed */ }}
/>

              </div>
            )} 

           
             



            {showAmounts &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (amountsRefs.current[searchTerm] = el)}
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('amounts')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
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
                        <span className="font-semibold">Period of Performance: </span>
                        Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
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

            {showRevenueAnalysis &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (revenueRefs.current[searchTerm] = el)}
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('revenueAnalysis')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
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
                        <span className="font-semibold">Period of Performance: </span>
                        Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
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

            {showAnalysisByPeriod &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (analysisRefs.current[searchTerm] = el)}
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('analysisByPeriod')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
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
                        <span className="font-semibold">Period of Performance: </span>
                        Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                      </span>
                    </div>
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

            {showPLC &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (hoursRefs.current[searchTerm] = el)}
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('plc')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
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
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('revenueSetup')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
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

            {showRevenueCeiling &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (revenueCeilingRefs.current[searchTerm] = el)}
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('revenueCeiling')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
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

            {showFunding &&
              selectedPlan &&
              selectedPlan.projId.startsWith(searchTerm) && (
                <div
                  ref={(el) => (fundingRefs.current[searchTerm] = el)}
                  className="relative border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl z-10"
                    onClick={() => handleCloseTab('funding')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
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
                        <span className="font-semibold">Period of Performance: </span>
                        Start Date: {formatDate(selectedPlan.projStartDt) || "N/A"} | End Date: {formatDate(selectedPlan.projEndDt) || "N/A"}
                      </span>
                    </div>
                  </div>
                  <FundingComponent
                    selectedProjectId={selectedPlan?.projId}
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

