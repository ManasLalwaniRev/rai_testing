import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RevenueSetupComponent = ({ selectedPlan, revenueAccount }) => {
  const [atRiskValue, setAtRiskValue] = useState("");
  const [revenueType, setRevenueType] = useState("");
  const [revenueAccountState, setRevenueAccountState] = useState("");
  const [labFeeRt, setLabFeeRt] = useState("");
  const [nonLabFeeRt, setNonLabFeeRt] = useState("");
  const [revenueFormula, setRevenueFormula] = useState("");
  const [formulaOptions, setFormulaOptions] = useState([]);
  const [labCostFl, setLabCostFl] = useState(false);
  const [labBurdFl, setLabBurdFl] = useState(false);
  const [labFeeCostFl, setLabFeeCostFl] = useState(false);
  const [labFeeHrsFl, setLabFeeHrsFl] = useState(false);
  const [labTmFl, setLabTmFl] = useState(false);
  const [nonLabCostFl, setNonLabCostFl] = useState(false);
  const [nonLabBurdFl, setNonLabBurdFl] = useState(false);
  const [nonLabFeeCostFl, setNonLabFeeCostFl] = useState(false);
  const [nonLabFeeHrsFl, setNonLabFeeHrsFl] = useState(false);
  const [nonLabTmFl, setNonLabTmFl] = useState(false);
  const [overrideFundingCeilingFl, setOverrideFundingCeilingFl] =
    useState(false);
  const [overrideSettingsFl, setOverrideSettingsFl] = useState(false);
  const [overrideRevAdjustmentsFl, setOverrideRevAdjustmentsFl] =
    useState(false);
  const [useFixedRevenueFl, setUseFixedRevenueFl] = useState(false);
  const [setupId, setSetupId] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-CA");
    } catch (e) {
      return "Invalid Date";
    }
  };

  useEffect(() => {
    setRevenueAccountState(revenueAccount || "");

    axios
      .get("https://test-api-3tmq.onrender.com/RevFormula")
      .then((response) => {
        console.log("RevFormula API response:", response.data);
        setFormulaOptions(response.data);
        // if (response.data.length > 0) {
        //   setRevenueFormula(response.data[0].formulaCd);
        //   setRevenueType(response.data[0].formulaCd); // Modified: Set revenueType to keep in sync
        // }
      })
      .catch((error) =>
        console.error("Error fetching revenue formulas:", error)
      );

    if (selectedPlan?.projId && selectedPlan?.version && selectedPlan?.plType) {
      axios
        .get(
          `https://test-api-3tmq.onrender.com/ProjBgtRevSetup/GetByProjectId/${selectedPlan.projId}/${selectedPlan.version}/${selectedPlan.plType}`
        )
        .then((response) => {
          const data = response.data;
          console.log("ProjBgtRevSetup GET response:", data);
          setSetupId(data.id || 0);
          setRevenueFormula(data.revType || ""); // Modified: Set revenueFormula from revType
          setRevenueType(data.revType || ""); // Modified: Also set revenueType to keep in sync
          setAtRiskValue(data.atRiskAmt.toString());
          setRevenueAccountState(data.revAcctId || revenueAccount || "");
          setLabFeeRt(data.labFeeRt.toString());
          setNonLabFeeRt(data.nonLabFeeRt.toString());
          setLabCostFl(data.labCostFl || false);
          setLabBurdFl(data.labBurdFl || false);
          setLabFeeCostFl(data.labFeeCostFl || false);
          setLabFeeHrsFl(data.labFeeHrsFl || false);
          setLabTmFl(data.labTmFl || false);
          setNonLabCostFl(data.labCostFl || false);
          setNonLabBurdFl(data.labBurdFl || false);
          setNonLabFeeCostFl(data.labFeeCostFl || false);
          setNonLabFeeHrsFl(data.labFeeHrsFl || false);
          setNonLabTmFl(data.nonLabTmFl || false);
          setOverrideFundingCeilingFl(data.overrideFundingCeilingFl || false);
          setOverrideSettingsFl(data.overrideRevSettingFl || false);
          setOverrideRevAdjustmentsFl(data.useBillBurdenRates || false);
          setUseFixedRevenueFl(data.overrideRevAmtFl || false);
        })
        .catch((error) =>
          console.error("Error fetching project budget revenue setup:", error)
        );
    }
  }, [selectedPlan, revenueAccount]);

  const handleSave = () => {
    const payload = {
      id: setupId,
      projId: selectedPlan?.projId || "",
      revType: revenueFormula, // Modified: Use revenueFormula instead of revenueType
      revAcctId: revenueAccountState,
      dfltFeeRt: parseFloat(labFeeRt) || 0,
      labCostFl,
      labBurdFl,
      labFeeCostFl,
      labFeeHrsFl,
      labFeeRt: parseFloat(labFeeRt) || 0,
      labTmFl,
      nonLabCostFl,
      nonLabBurdFl,
      nonLabFeeCostFl,
      nonLabFeeHrsFl,
      nonLabFeeRt: parseFloat(nonLabFeeRt) || 0,
      nonLabTmFl,
      useBillBurdenRates: overrideRevAdjustmentsFl,
      overrideFundingCeilingFl,
      overrideRevAmtFl: useFixedRevenueFl,
      overrideRevAdjFl: true,
      overrideRevSettingFl: overrideSettingsFl,
      rowVersion: 0,
      modifiedBy: "user",
      timeStamp: new Date().toISOString(),
      companyId: "company",
      atRiskAmt: parseFloat(atRiskValue) || 0,
      versionNo: selectedPlan?.version || 0,
      bgtType: selectedPlan?.plType || "",
    };

    axios
      .post(
        "https://test-api-3tmq.onrender.com/ProjBgtRevSetup/upsert",
        payload
      )
      .then((response) => {
        console.log("Save successful:", response.data);
        toast.success("Data saved successfully!", {
          toastId: "revenue-setup-save-success",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        toast.error(
          "Failed to save data: " +
            (error.response?.data?.message || error.message),
          {
            toastId: "revenue-setup-save-error",
            autoClose: 3000,
          }
        );
      });
  };

  const projectDetails = selectedPlan ? (
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
  ) : null;

  return (
    <div className="border p-2 sm:p-4 bg-gray-50 rounded shadow min-h-[150px] scroll-mt-16">
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
      {projectDetails}
      <div className="flex flex-col space-y-4">
        <div>
          <label className="text-sm font-normal">Revenue Formula</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 w-full text-sm font-normal mt-1"
            value={revenueFormula}
            onChange={(e) => {
              setRevenueFormula(e.target.value);
              setRevenueType(e.target.value); // Modified: Update revenueType to keep in sync
            }}
          >
            {formulaOptions.map((option) => (
              <option key={option.formulaCd} value={option.formulaCd}>
                {option.formulaDesc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-normal mr-2">
            Override Funding Ceiling
          </label>
          <input
            type="checkbox"
            className="text-sm font-normal"
            checked={overrideFundingCeilingFl}
            onChange={(e) => setOverrideFundingCeilingFl(e.target.checked)}
          />
        </div>
        <div>
          <label className="text-sm font-normal mr-2">Override Settings</label>
          <input
            type="checkbox"
            className="text-sm font-normal"
            checked={overrideSettingsFl}
            onChange={(e) => setOverrideSettingsFl(e.target.checked)}
          />
        </div>
        {/* <div>
          <label className="text-sm font-normal mr-2">Override Revenue Adjustments from Accounting System</label>
          <input
            type="checkbox"
            className="text-sm font-normal"
            checked={overrideRevAdjustmentsFl}
            onChange={(e) => setOverrideRevAdjustmentsFl(e.target.checked)}
          />
        </div>
        <div>
          <label className="text-sm font-normal mr-2">Use Fixed Revenue Amount as Total Revenue</label>
          <input
            type="checkbox"
            className="text-sm font-normal"
            checked={useFixedRevenueFl}
            onChange={(e) => setUseFixedRevenueFl(e.target.checked)}
          />
        </div> */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
          <div className="flex-1">
            <label className="text-sm font-normal mr-2">At Risk Value</label>
            <input
              type="text"
              className={`border border-gray-300 rounded px-2 py-1 w-full sm:w-24 text-sm font-normal ${
                !overrideFundingCeilingFl
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
              value={atRiskValue}
              onChange={(e) => setAtRiskValue(e.target.value)}
              disabled={!overrideFundingCeilingFl}
            />
          </div>
         <div className="flex-1">
  <label className="text-sm font-normal mr-2">Revenue Account:</label>
  <span className="text-sm font-normal">{revenueAccountState}</span>
</div>
          {/* <div className="flex-1">
            <label className="text-sm font-normal mr-2">At Risk Value</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full sm:w-24 text-sm font-normal"
              value={atRiskValue}
              onChange={(e) => setAtRiskValue(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-normal mr-2">Revenue Account</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 wフル sm:w-24 text-sm font-normal"
              value={revenueAccountState}
              onChange={(e) => setRevenueAccountState(e.target.value)}
            />
          </div> */}
        </div>
        <table className="w-full text-sm border-collapse sm:w-auto">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border p-2 font-normal"></td>
              <td className="border p-2 font-normal">Rev on Cost</td>
              <td className="border p-2 font-normal">Rev on Burden</td>
              <td className="border p-2 font-normal">Fee on Cost/Burden</td>
              <td className="border p-2 font-normal">Fee on Hours</td>
              <td className="border p-2 font-normal">Fee Rate %</td>
              <td className="border p-2 font-normal">Use T&M Rates</td>
            </tr>
            <tr>
              <td className="border p-2 text-sm font-normal">Labor</td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={labCostFl}
                  onChange={(e) => setLabCostFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={labBurdFl}
                  onChange={(e) => setLabBurdFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={labFeeCostFl}
                  onChange={(e) => setLabFeeCostFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={labFeeHrsFl}
                  onChange={(e) => setLabFeeHrsFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  step="any"
                  className="w-full p-1 border rounded text-sm font-normal"
                  style={{ appearance: "none" }}
                  value={labFeeRt}
                  onChange={(e) => setLabFeeRt(e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={labTmFl}
                  onChange={(e) => setLabTmFl(e.target.checked)}
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-sm font-normal">Non-Labor</td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={nonLabCostFl}
                  onChange={(e) => setNonLabCostFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={nonLabBurdFl}
                  onChange={(e) => setNonLabBurdFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={nonLabFeeCostFl}
                  onChange={(e) => setNonLabFeeCostFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={nonLabFeeHrsFl}
                  onChange={(e) => setNonLabFeeHrsFl(e.target.checked)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  step="any"
                  className="w-full p-1 border rounded text-sm font-normal"
                  style={{ appearance: "none" }}
                  value={nonLabFeeRt}
                  onChange={(e) => setNonLabFeeRt(e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  className="text-sm font-normal"
                  checked={nonLabTmFl}
                  onChange={(e) => setNonLabTmFl(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-normal mt-4 cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RevenueSetupComponent;
