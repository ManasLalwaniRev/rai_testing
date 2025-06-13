import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

const formatDate = (dateStr, dateOnly = false) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return dateOnly
    ? date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
};

const COLUMN_LABELS = {
  plType: 'Plan Type',
  version: 'Version',
  versionCode: 'Version Code',
  source: 'Source',
  type: 'Type',
  finalVersion: 'Final Version',
  isCompleted: 'Completed',
  isApproved: 'Approved',
  status: 'Status',
  closedPeriod: 'Closed Period',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
};

const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId }) => {
  const [plans, setPlans] = useState([]);
  const [columns, setColumns] = useState([]);
  // const [hiddenRows, setHiddenRows] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortPlansByVersion = (plansArr) => {
    return [...plansArr].sort((a, b) => {
      const aVer = isNaN(Number(a.version)) ? a.version : Number(a.version);
      const bVer = isNaN(Number(b.version)) ? b.version : Number(b.version);
      if (aVer < bVer) return -1;
      if (aVer > bVer) return 1;
      return 0;
    });
  };

  const fetchPlans = async () => {
    if (!projectId) {
      setError('Project ID is required');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setPlans([]);
      const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
      console.log('GetProjectPlans API response:', response.data);
      if (!Array.isArray(response.data)) {
        setError('Invalid response format from API');
        setLoading(false);
        return;
      }
      const transformedPlans = response.data.map(plan => ({
        ...plan,
        plId: plan.plId || plan.id,
        plType: plan.plType === 'Budget' ? 'BUD' : plan.plType || 'Unknown',
        source: plan.source || '',
        type: plan.type || '',
        version: plan.version || '1',
        versionCode: plan.versionCode || 'QTR1',
        finalVersion: !!plan.finalVersion,
        isCompleted: !!plan.isCompleted,
        isApproved: !!plan.isApproved,
        status: plan.status || 'Working',
        closedPeriod: plan.closedPeriod || new Date().toISOString(),
        createdAt: plan.createdAt || new Date().toISOString(),
        updatedAt: plan.updatedAt || new Date().toISOString(),
        modifiedBy: plan.modifiedBy || '',
        approvedBy: plan.approvedBy || '',
        createdBy: plan.createdBy || '',
      }));
      const normalizedPlans = transformedPlans.map(plan => ({
        ...plan,
        status: plan.status === "Approved" || plan.status === "Completed" ? plan.status : "Working",
        isCompleted: !!plan.isCompleted,
        finalVersion: !!plan.finalVersion,
        isApproved: !!plan.isApproved,
      }));
      const sortedPlans = sortPlansByVersion(normalizedPlans);
      setPlans(sortedPlans);
      setColumns([
        'plType',
        'version',
        'versionCode',
        'source',
        'type',
        'isCompleted',
        'isApproved',
        'finalVersion',
        'status',
        'closedPeriod',
        'createdAt',
        'updatedAt',
      ]);
      setError(null);
      // setHiddenRows({});
    } catch (err) {
      console.error('Fetch plans error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [projectId]);

  const handleRowClick = (plan) => {
    if (selectedPlan && selectedPlan.plId === plan.plId) {
      onPlanSelect(null);
    } else {
      onPlanSelect(plan);
    }
  };

  // const toggleRowVisibility = (idx) => {
  //   setHiddenRows((prev) => ({
  //     ...prev,
  //     [idx]: !prev[idx],
  //   }));
  // };

  // const unhideRow = (idx) => {
  //   setHiddenRows((prev) => {
  //     const updated = {};
  //     Object.entries(prev).forEach(([key, value]) => {
  //       if (Number(key) !== idx) updated[key] = value;
  //     });
  //     return updated;
  //   });
  // };

  const handleExportPlan = async (plan) => {
    if (!plan.projId || !plan.version || !plan.plType) {
      toast.error('Missing required parameters for export');
      return;
    }

    try {
      toast.info('Exporting plan...');
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Forecast/ExportPlan`,
        {
          params: {
            projId: plan.projId,
            version: plan.version,
            type: plan.plType,
          },
          responseType: 'blob', // Expect a file response
        }
      );

      // Create a downloadable file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Plan exported successfully!');
    } catch (err) {
      console.error('Export plan error:', err);
      toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCheckboxChange = async (idx, field) => {
    const prevPlans = [...plans];
    const plan = plans[idx];
    const planId = plan.plId;

    if (field === 'isApproved' && !plan.isCompleted) {
      toast.error("You can't approve this row until Completed is checked");
      return;
    }
    if (field === 'finalVersion' && !plan.isApproved) {
      toast.error("You can't set Final Version until Approved is checked");
      return;
    }

    let updated = { ...plan };
    updated[field] = !plan[field];

    if (field === 'isCompleted') {
      updated.status = updated.isCompleted ? 'Completed' : 'Working';
      if (!updated.isCompleted) {
        updated.isApproved = false;
        updated.finalVersion = false;
      }
    }

    if (field === 'isApproved') {
      updated.status = updated.isApproved ? 'Approved' : 'Completed';
      if (!updated.isApproved) {
        updated.finalVersion = false;
      }
    }

    if (field === 'finalVersion') {
      updated.status = updated.finalVersion ? 'Completed' : 'Approved';
    }

    let newPlans;
    if (field === 'isCompleted' && !updated.isCompleted) {
      const isEAC = updated.plType === 'EAC';
      const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
      if (workingCount > 0 && updated.status === 'Working') {
        toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`);
        return;
      }
    }

    if (field === 'finalVersion' && updated.finalVersion) {
      newPlans = plans.map((p, i) =>
        i === idx ? updated : { ...p, finalVersion: false }
      );
    } else {
      newPlans = plans.map((p, i) =>
        i === idx ? updated : p
      );
    }

    if (updated.status === 'Working') {
      newPlans = newPlans.map((p, i) =>
        i !== idx && p.status === 'Working' && p.plType === updated.plType
          ? { ...p, status: 'Completed', isCompleted: true }
          : p
      );
    }

    setPlans(sortPlansByVersion(newPlans));
    onPlanSelect(updated);

    if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
      const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
      toast.info('Updating plan...');
      try {
        await axios.put(updateUrl, updated);
      } catch (err) {
        setPlans(sortPlansByVersion(prevPlans));
        toast.error('Error updating plan: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleVersionCodeChange = async (idx, value) => {
    const prevPlans = [...plans];
    const planId = plans[idx].plId;
    let updated = { ...plans[idx], versionCode: value };
    const newPlans = plans.map(plan =>
      plan.plId === planId ? updated : plan
    );
    setPlans(sortPlansByVersion(newPlans));

    if (planId && Number(planId) > 0) {
      const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
      toast.info('Updating version code...');
      try {
        await axios.put(updateUrl, updated);
      } catch (err) {
        setPlans(sortPlansByVersion(prevPlans));
        toast.error('Error updating version code: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleActionSelect = async (idx, action) => {
    const plan = plans[idx];
    if (action === 'None') return;

    try {
      if (action === 'Delete') {
        if (!plan.plId || Number(plan.plId) <= 0) {
          toast.error('Cannot delete: Invalid plan ID.');
          return;
        }
        const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
        toast.info('Deleting plan...');
        try {
          await axios.delete(deleteUrl);
          toast.success('Plan deleted successfully!');
        } catch (err) {
          if (err.response && err.response.status === 404) {
            toast.error('Plan not found on server. It may have already been deleted.');
          } else {
            toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
          }
        }
        await fetchPlans();
      } else if (action === 'Create Budget' || action === 'Create EAC') {
        const {
          closedPeriod, createdAt, updatedAt,
          ...body
        } = {
          plId: plan.plId,
          projId: projectId,
          plType: action === 'Create Budget' ? 'BUD' : 'EAC',
          source: plan.source || '',
          type: plan.type || '',
          version: (Number(plan.version)).toString(),
          versionCode: plan.versionCode || 'QTR1',
          finalVersion: false,
          isCompleted: false,
          isApproved: false,
          status: 'Working',
          closedPeriod: new Date().toISOString(),
          createdBy: plan.createdBy || 'User',
          modifiedBy: plan.modifiedBy || 'User',
          approvedBy: '',
        };
        console.log(`${action} payload:`, body);
        toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : 'EAC'}...`);
        const response = await axios.post('https://test-api-3tmq.onrender.com/Project/AddProjectPlan', body);
        console.log('AddProjectPlan API response:', response.data);
        setPlans(prevPlans => {
          const updatedPlans = prevPlans.map((p, i) =>
            i === idx && p.status === 'Working' && p.plType === body.plType
              ? { ...p, status: 'Completed', isCompleted: true }
              : p
          );
          return sortPlansByVersion(updatedPlans);
        });
        await fetchPlans();
        toast.success(`${action === 'Create Budget' ? 'Budget' : 'EAC'} created successfully!`);
      } else {
        toast.info(`Action "${action}" selected (API call not implemented)`);
      }
    } catch (err) {
      console.error('Error performing action:', err);
      toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
    }
  };

  const getActionOptions = (plan) => {
    let options = ['None'];
    if (plan.status === "Working") {
      options = [
        'None',
        'Delete',
      ];
    } else if (plan.status === "Completed") {
      options = ['None', 'Create Budget'];
    } else if (plan.status === "Approved") {
      options = ['None', 'Create Budget', 'Create EAC', 'Delete'];
    }
    return options;
  };

  // const canHideRow = (plan) => {
  //   return !!plan.isApproved;
  // };

  const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

  const getCheckboxProps = (plan, col, idx) => {
    if (!plan.plType) return { checked: false, disabled: true };

    if (col === "isCompleted") {
      return { checked: plan.isCompleted, disabled: !!plan.isApproved };
    }
    if (col === "isApproved") {
      return { checked: plan.isApproved, disabled: !plan.isCompleted };
    }
    if (col === "finalVersion") {
      if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
        return { checked: false, disabled: true };
      }
      return {
        checked: plan.finalVersion,
        disabled: !plan.isApproved,
      };
    }
    return { checked: plan[col], disabled: false };
  };

  // const hiddenRowsArray = Object.entries(hiddenRows)
  //   .filter(([idx, isHidden]) => isHidden)
  //   .map(([idx]) => [parseInt(idx, 10), plans[parseInt(idx, 10)]])
  //   .sort((a, b) => a[0] - b[0]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading project plans...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No project plans found for project ID: {projectId}
        </div>
      </div>
    );
  }

  // const visibleRows = plans.map((plan, idx) => ({ plan, idx }))
  //   .filter(({ idx }) => !hiddenRows[idx]);

  return (
    <div className="p-4 relative z-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      <h2 className="text-lg font-bold mb-4">Project Plan Table</h2>
      {/* {hiddenRowsArray.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Hidden Rows</h3>
          <div className="overflow-x-auto" style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#f9fafb' }}>
            <table className="min-w-full text-sm text-left border-collapse border border-gray-300">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="p-2 border font-normal">Unhide</th>
                  {columns.map((col) => (
                    <th key={col} className="p-2 border font-normal">
                      {COLUMN_LABELS[col] || col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hiddenRowsArray.map(([idx, plan]) => (
                  <tr key={plan.plId || idx} className="even:bg-gray-50">
                    <td className="p-2 border text-center">
                      <button
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                        onClick={() => unhideRow(idx)}
                      >
                        Unhide
                      </button>
                    </td>
                    {columns.map((col) => (
                      <td key={col} className="p-2 border font-normal">
                        {col === 'closedPeriod'
                          ? formatDate(plan[col], true)
                          : col === 'createdAt' || col === 'updatedAt'
                          ? formatDate(plan[col])
                          : typeof plan[col] === 'boolean'
                          ? (
                            <input
                              type="checkbox"
                              checked={plan[col]}
                              readOnly
                              className="cursor-not-allowed"
                            />
                          )
                          : plan[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
      <div className="overflow-x-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
        <table className="min-w-full text-sm text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-2 border font-normal">Export Plan</th>
              <th className="p-2 border font-normal">Action</th>
              {columns.map((col) => (
                <th key={col} className="p-2 border font-normal">
                  {COLUMN_LABELS[col] || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, idx) => (
              <tr
                key={plan.plId || idx}
                className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
                }`}
                onClick={() => handleRowClick(plan)}
              >
                <td className="p-2 border text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExportPlan(plan);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    title="Export Plan"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </td>
                <td className="p-2 border">
                  <select
                    defaultValue="None"
                    onClick={e => e.stopPropagation()}
                    onChange={(e) => handleActionSelect(idx, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
                    style={{ minWidth: 140, maxWidth: 180 }}
                  >
                    {getActionOptions(plan).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                {columns.map((col) => (
                  <td
                    key={col}
                    className={`p-2 border font-normal ${
                      col === "status" && plan.status === "Completed" ? "text-green-600 font-bold" :
                      col === "status" && plan.status === "Working" ? "text-blue-600 font-bold" :
                      col === "status" && plan.status === "Approved" ? "text-purple-600 font-bold" : ""
                    }`}
                  >
                    {col === 'closedPeriod'
                      ? formatDate(plan[col], true)
                      : col === 'createdAt' || col === 'updatedAt'
                      ? formatDate(plan[col])
                      : col === 'versionCode'
                      ? (
                        <input
                          type="text"
                          value={plan.versionCode}
                          onClick={e => e.stopPropagation()}
                          onChange={e => handleVersionCodeChange(idx, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-24"
                          style={{ minWidth: 60, maxWidth: 120 }}
                        />
                      )
                      : typeof plan[col] === 'boolean'
                      ? (
                        <input
                          type="checkbox"
                          checked={getCheckboxProps(plan, col, idx).checked}
                          disabled={getCheckboxProps(plan, col, idx).disabled}
                          onClick={e => e.stopPropagation()}
                          onChange={() => handleCheckboxChange(idx, col)}
                          className="cursor-pointer"
                        />
                      )
                      : plan[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectPlanTable;