import React, { useState, useEffect } from "react";

const BurdenCostCeilingDetails = ({ projectId, isSearched }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountDescription, setAccountDescription] = useState("");
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState("");
  const [rateCeiling, setRateCeiling] = useState("");
  const [costOfMoneyCeiling, setCostOfMoneyCeiling] = useState("");
  const [ceilingMethod, setCeilingMethod] = useState("");
  const [applyToRBA, setApplyToRBA] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const ceilingMethods = ["Ceiling", "Override", "Fixed"];
  const applyToRBAOptions = ["Revenue", "Billing", "All", "None"];

  useEffect(() => {
    const fetchAccounts = async () => {
      if (projectId && isSearched) {
        try {
          const response = await fetch(
            `https://test-api-3tmq.onrender.com/Project/GetAccountsByProjectId/${projectId}`
          );
          const data = await response.json();
          setAccounts(data || []);
          setIsDataFetched(true);
        } catch (error) {
          console.error("Error fetching accounts:", error);
          setAccounts([]);
          setIsDataFetched(true);
        }
      }
    };

    fetchAccounts();
  }, [projectId, isSearched]);

  const handleAccountChange = async (e) => {
    const selectedAcctId = e.target.value;
    setSelectedAccount(selectedAcctId);

    const selectedAccountData = accounts.find(
      (account) => account.acctId === selectedAcctId
    );
    setAccountDescription(selectedAccountData?.acctName || "");

    if (selectedAcctId) {
      try {
        const response = await fetch(
          `https://test-api-3tmq.onrender.com/Orgnization/GetPoolsByOrgAccount?accountId=${selectedAcctId}&orgId=1.02`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Pools data:", data);
        setPools(data || []);
      } catch (error) {
        console.error("Error fetching pools:", error);
        setPools([]);
      }
    } else {
      setPools([]);
      setAccountDescription("");
      setSelectedPool("");
    }
  };

  if (!isSearched) {
    return <div className="text-gray-600">Please search for a project to view details.</div>;
  }

  return (
    <div className="animate-fade-in">
      {isDataFetched && accounts.length === 0 ? (
        <p className="text-gray-600">
          No data available for this project ID.
        </p>
      ) : (
        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Burden Cost Ceilings
            </h2>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">
                Project:
              </label>
              <span className="text-sm text-gray-600">{projectId}</span>
              <span className="ml-4 text-sm text-gray-600">
                Org ID: 1.02
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Ceilings
              </label>    
              <select
                value={selectedAccount}
                onChange={handleAccountChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 origin-top"
              >
                <option value="">-- Select --</option>
                {accounts.map((account) => (
                  <option key={account.acctId} value={account.acctId}>
                    {account.acctId}
                  </option>
                ))}
              </select>
              {selectedAccount && (
                <div className="mt-2 p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">{accountDescription}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pool
              </label>            
              <select
                value={selectedPool}
                onChange={(e) => setSelectedPool(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 origin-top"
                disabled={!selectedAccount}
              >
                <option value="">-- Select --</option>
                {pools.map((pool) => (
                  <option key={pool.poolId} value={pool.poolId}>
                    {pool.poolId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className = "block text-sm font-medium text-gray-700 mb-2">
                Rate Ceiling
              </label>
              <input
                type="text"
                value={rateCeiling}
                onChange={(e) => setRateCeiling(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost of Money Ceiling
              </label>
              <input
                type="text"
                value={costOfMoneyCeiling}
                onChange={(e) => setCostOfMoneyCeiling(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ceiling Method
              </label>
              <select
                value={ceilingMethod}
                onChange={(e) => setCeilingMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 origin-top"
              >
                <option value="">-- Select --</option>
                {ceilingMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply to R/B/A
              </label>
              <select
                value={applyToRBA}
                onChange={(e) => setApplyToRBA(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-200 origin-top"
              >
                <option value="">-- Select --</option>
                {applyToRBAOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurdenCostCeilingDetails;