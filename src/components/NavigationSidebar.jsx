import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Plus } from "lucide-react";

const NavigationSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [generalMenuOpen, setGeneralMenuOpen] = useState(
    pathname.includes("/dashboard/project-budget-status") ||
    pathname.includes("/dashboard/new-business") ||
    pathname.includes("/dashboard/pool-rate") ||
    pathname.includes("/dashboard/pool-configuration") ||
    pathname.includes("/dashboard/template-pool-mapping") ||
    pathname.includes("/dashboard/template") ||
    pathname.includes("/dashboard/ceiling-configuration") ||
    pathname.includes("/dashboard/global-configuration") ||
    pathname.includes("/dashboard/prospective-id-setup") ||
    pathname.includes("/dashboard/display-settings") ||
    pathname.includes("/dashboard/annual-holidays") ||
    pathname.includes("/dashboard/maintain-fiscal-year-periods")
  );
  const [planningOpen, setPlanningOpen] = useState(
    pathname.includes("/dashboard/project-budget-status") ||
    pathname.includes("/dashboard/new-business")
  );
  const [configurationOpen, setConfigurationOpen] = useState(
    pathname.includes("/dashboard/pool-rate") ||
    pathname.includes("/dashboard/pool-configuration") ||
    pathname.includes("/dashboard/template-pool-mapping") ||
    pathname.includes("/dashboard/template") ||
    pathname.includes("/dashboard/ceiling-configuration") ||
    pathname.includes("/dashboard/global-configuration") ||
    pathname.includes("/dashboard/prospective-id-setup") ||
    pathname.includes("/dashboard/display-settings") ||
    pathname.includes("/dashboard/annual-holidays") ||
    pathname.includes("/dashboard/maintain-fiscal-year-periods")
  );
  const [poolMappingOpen, setPoolMappingOpen] = useState(
    pathname.includes("/dashboard/pool-configuration") ||
    pathname.includes("/dashboard/template-pool-mapping")
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(pathname);

  useEffect(() => {
    setSelectedPage(pathname);
    setGeneralMenuOpen(
      pathname.includes("/dashboard/project-budget-status") ||
      pathname.includes("/dashboard/new-business") ||
      pathname.includes("/dashboard/pool-rate") ||
      pathname.includes("/dashboard/pool-configuration") ||
      pathname.includes("/dashboard/template-pool-mapping") ||
      pathname.includes("/dashboard/template") ||
      pathname.includes("/dashboard/ceiling-configuration") ||
      pathname.includes("/dashboard/global-configuration") ||
      pathname.includes("/dashboard/prospective-id-setup") ||
      pathname.includes("/dashboard/display-settings") ||
      pathname.includes("/dashboard/annual-holidays") ||
      pathname.includes("/dashboard/maintain-fiscal-year-periods")
    );
    setPlanningOpen(
      pathname.includes("/dashboard/project-budget-status") ||
      pathname.includes("/dashboard/new-business")
    );
    setConfigurationOpen(
      pathname.includes("/dashboard/pool-rate") ||
      pathname.includes("/dashboard/pool-configuration") ||
      pathname.includes("/dashboard/template-pool-mapping") ||
      pathname.includes("/dashboard/template") ||
      pathname.includes("/dashboard/ceiling-configuration") ||
      pathname.includes("/dashboard/global-configuration") ||
      pathname.includes("/dashboard/prospective-id-setup") ||
      pathname.includes("/dashboard/display-settings") ||
      pathname.includes("/dashboard/annual-holidays") ||
      pathname.includes("/dashboard/maintain-fiscal-year-periods")
    );
    setPoolMappingOpen(
      pathname.includes("/dashboard/pool-configuration") ||
      pathname.includes("/dashboard/template-pool-mapping")
    );
  }, [pathname]);

  const handleLinkClick = (pagePath) => {
    if (selectedPage === pagePath) {
      setSelectedPage(null);
      navigate("/dashboard");
    } else {
      setSelectedPage(pagePath);
      navigate(pagePath);
    }
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleCloseSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen font-inter">
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-1 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-48 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-3 sm:p-4 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-48 z-40`}
      >
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <h2 className="text-base sm:text-lg md:text-xl tracking-wide">R-AI</h2>
          <button
            className="md:hidden text-white hover:text-gray-300 p-1 rounded"
            onClick={handleCloseSidebar}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
          onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
        >
          <span className="text-xs sm:text-sm">General Menu</span>
          <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
        </div>

        {generalMenuOpen && (
          <div className="ml-1 mt-2 space-y-1">
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
              onClick={() => setPlanningOpen(!planningOpen)}
            >
              <span className="text-xs sm:text-sm">Planning</span>
              {planningOpen ? (
                <ChevronDown className="w-3 sm:w-3 h-3 sm:h-3" />
              ) : (
                <ChevronRight className="w-3 sm:w-3 h-3 sm:h-3" />
              )}
            </div>

            {planningOpen && (
              <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
                <Link
                  to="/dashboard/project-budget-status"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/project-budget-status" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/project-budget-status");
                  }}
                >
                  Project Planning
                </Link>
                <Link
                  to="/dashboard/new-business"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/new-business" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/new-business");
                  }}
                >
                  New Business
                </Link>
              </div>
            )}

            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
              onClick={() => setConfigurationOpen(!configurationOpen)}
            >
              <span className="text-xs sm:text-sm">Configuration</span>
              {configurationOpen ? (
                <ChevronDown className="w-3 sm:w-3 h-3 sm:h-3" />
              ) : (
                <ChevronRight className="w-3 sm:w-3 h-3 sm:h-3" />
              )}
            </div>

            {configurationOpen && (
              <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
                <Link
                  to="/dashboard/pool-rate"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded whitespace-nowrap transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/pool-rate" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/pool-rate");
                  }}
                >
                  Pool Rate Configuration
                </Link>
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
                  onClick={() => setPoolMappingOpen(!poolMappingOpen)}
                >
                  <span className="text-xs sm:text-sm">Pool Mapping</span>
                  {poolMappingOpen ? (
                    <ChevronDown className="w-3 sm:w-3 h-3 sm:h-3" />
                  ) : (
                    <ChevronRight className="w-3 sm:w-3 h-3 sm:h-3" />
                  )}
                </div>

                {poolMappingOpen && (
                  <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
                    <Link
                      to="/dashboard/pool-configuration"
                      className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                        selectedPage === "/dashboard/pool-configuration" ? "bg-gray-800 underline" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick("/dashboard/pool-configuration");
                      }}
                    >
                      Org Account
                    </Link>
                    <Link
                      to="/dashboard/template-pool-mapping"
                      className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                        selectedPage === "/dashboard/template-pool-mapping" ? "bg-gray-800 underline" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick("/dashboard/template-pool-mapping");
                      }}
                    >
                      Template Pool Mapping
                    </Link>
                  </div>
                )}
                {/* <Link
                  to="/dashboard/ceiling-configuration"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/ceiling-configuration" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/ceiling-configuration");
                  }}
                >
                  Ceiling Configuration
                </Link> */}
                <Link
                  to="/dashboard/template"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/template" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/template");
                  }}
                >
                  Template
                </Link>
                <Link
                  to="/dashboard/global-configuration"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/global-configuration" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/global-configuration");
                  }}
                >
                  Global Configuration
                </Link>
                <Link
                  to="/dashboard/prospective-id-setup"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/prospective-id-setup" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/prospective-id-setup");
                  }}
                >
                  Prospective ID Setup
                </Link>
                <Link
                  to="/dashboard/display-settings"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/display-settings" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/display-settings");
                  }}
                >
                  Display Settings
                </Link>
                <Link
                  to="/dashboard/annual-holidays"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/annual-holidays" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/annual-holidays");
                  }}
                >
                  Annual Holidays
                </Link>
                <Link
                  to="/dashboard/maintain-fiscal-year-periods"
                  className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/maintain-fiscal-year-periods" ? "bg-gray-800 underline" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/maintain-fiscal-year-periods");
                  }}
                >
                  Maintain Fiscal Year Periods
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={handleCloseSidebar}
        ></div>
      )}
    </div>
  );
};

export default NavigationSidebar;