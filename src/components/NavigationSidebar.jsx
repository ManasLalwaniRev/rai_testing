import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Plus } from "lucide-react";

const NavigationSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [generalMenuOpen, setGeneralMenuOpen] = useState(
    pathname.includes("/dashboard/project-budget-status") ||
    pathname.includes("/dashboard/pool-rate") ||
    pathname.includes("/dashboard/pool-configuration") ||
    pathname.includes("/dashboard/template-pool-mapping") ||
    pathname.includes("/dashboard/template") ||
    pathname.includes("/dashboard/ceiling-configuration")
  );
  const [planningOpen, setPlanningOpen] = useState(
    pathname.includes("/dashboard/project-budget-status")
  );
  const [configurationOpen, setConfigurationOpen] = useState(
    pathname.includes("/dashboard/pool-rate") ||
    pathname.includes("/dashboard/pool-configuration") ||
    pathname.includes("/dashboard/template-pool-mapping") ||
    pathname.includes("/dashboard/template") ||
    pathname.includes("/dashboard/ceiling-configuration")
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(pathname);

  useEffect(() => {
    setSelectedPage(pathname);
    setGeneralMenuOpen(
      pathname.includes("/dashboard/project-budget-status") ||
      pathname.includes("/dashboard/pool-rate") ||
      pathname.includes("/dashboard/pool-configuration") ||
      pathname.includes("/dashboard/template-pool-mapping") ||
      pathname.includes("/dashboard/template") ||
      pathname.includes("/dashboard/ceiling-configuration")
    );
    setPlanningOpen(pathname.includes("/dashboard/project-budget-status"));
    setConfigurationOpen(
      pathname.includes("/dashboard/pool-rate") ||
      pathname.includes("/dashboard/pool-configuration") ||
      pathname.includes("/dashboard/template-pool-mapping") ||
      pathname.includes("/dashboard/template") ||
      pathname.includes("/dashboard/ceiling-configuration")
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

  return (
    <div className="flex min-h-screen font-inter">
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 sm:p-6 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 z-40`}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">R-AI</h2>
        </div>

        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-md transition ease-in-out duration-200"
          onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
        >
          <span className="font-semibold text-sm sm:text-base">General Menu</span>
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
        </div>

        {generalMenuOpen && (
          <div className="ml-2 mt-3 space-y-2">
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-md transition ease-in-out duration-200"
              onClick={() => setPlanningOpen(!planningOpen)}
            >
              <span className="font-medium text-xs sm:text-sm">Planning</span>
              {planningOpen ? (
                <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4" />
              ) : (
                <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
              )}
            </div>

            {planningOpen && (
              <div className="ml-4 mt-2 pl-2 border-l border-gray-600 space-y-2">
                <Link
                  to="/dashboard/project-budget-status"
                  className={`block text-xs sm:text-sm text-gray-200 hover:text-white hover:bg-gray-800 px-3 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/project-budget-status" ? "bg-gray-800 underline font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/project-budget-status");
                  }}
                >
                  Project Planning
                </Link>
              </div>
            )}

            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-3 py-2 rounded-md transition ease-in-out duration-200"
              onClick={() => setConfigurationOpen(!configurationOpen)}
            >
              <span className="font-medium text-xs sm:text-sm">Configuration</span>
              {configurationOpen ? (
                <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4" />
              ) : (
                <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
              )}
            </div>

            {configurationOpen && (
              <div className="ml-4 mt-2 pl-2 border-l border-gray-600 space-y-2">
                <Link
                  to="/dashboard/pool-rate"
                  className={`block text-xs sm:text-sm text-gray-200 hover:text-white hover:bg-gray-800 px-3 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/pool-rate" ? "bg-gray-800 underline font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/pool-rate");
                  }}
                >
                  Pool Rate
                </Link>
                <Link
                  to="/dashboard/pool-configuration"
                  className={`block text-xs sm:text-sm text-gray-200 hover:text-white hover:bg-gray-800 px-3 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/pool-configuration" ? "bg-gray-800 underline font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/pool-configuration");
                  }}
                >
                  Pool Configuration
                </Link>
                <Link
                  to="/dashboard/template-pool-mapping"
                  className={`block text-xs sm:text-sm text-gray-200 hover:text-white hover:bg-gray-800 px-3 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/template-pool-mapping" ? "bg-gray-800 underline font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/template-pool-mapping");
                  }}
                >
                  Template Pool Mapping
                </Link>
                <Link
                  to="/dashboard/template"
                  className={`block text-xs sm:text-sm text-gray-200 hover:text-white hover:bg-gray-800 px-3 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/template" ? "bg-gray-800 underline font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/template");
                  }}
                >
                  Template
                </Link>
                <Link
                  to="/dashboard/ceiling-configuration"
                  className={`block text-xs sm:text-sm text-gray-200 hover:text-white hover:bg-gray-800 px-3 py-1 rounded transition ease-in-out duration-200 ${
                    selectedPage === "/dashboard/ceiling-configuration" ? "bg-gray-800 underline font-semibold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/dashboard/ceiling-configuration");
                  }}
                >
                  Ceiling Configuration
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default NavigationSidebar;