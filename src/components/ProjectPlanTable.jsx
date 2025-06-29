import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectPlanForm from './ProjectPlanForm';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);
  const [lastImportedVersion, setLastImportedVersion] = useState(null);
  const [lastImportTime, setLastImportTime] = useState(null);

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
        templateId: plan.templateId || 0,
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
    } catch (err) {
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

  const handleExportPlan = async (plan) => {
    if (!plan.projId || !plan.version || !plan.plType) {
      toast.error('Missing required parameters for export');
      return;
    }

    try {
      toast.info('Exporting plan...');
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
        {
          params: {
            projId: plan.projId,
            version: plan.version,
            type: plan.plType,
          },
          responseType: 'blob',
        }
      );

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
      toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleImportPlan = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }

    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projId', projectId);

    try {
      toast.info('Importing plan...');
      const response = await axios.post(
        'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Extract version from response
      let extractedVersion = null;
      if (typeof response.data === 'string') {
        const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
        if (versionMatch) {
          extractedVersion = versionMatch[1];
        }
      } else if (response.data?.version) {
        extractedVersion = response.data.version;
      }
      if (extractedVersion) {
        setLastImportedVersion(extractedVersion);
      }
      setLastImportTime(Date.now());


      // Show full API response in toast (success) - always show, always unique id
      toast.success(
        response.data && typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data),
        {
          toastId: 'import-success-' + Date.now(),
          autoClose: 5000,
        }
      );

      await fetchPlans();
    } catch (err) {
      // Show full API response in toast (error)
      let errorMessage =
        'Failed to import plan. Please check the file and project ID, or contact support.';
      if (err.response) {
        if (typeof err.response.data === 'string' && err.response.data) {
          errorMessage = err.response.data;
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data) {
          errorMessage = JSON.stringify(err.response.data);
        } else if (err.response.status === 500) {
          errorMessage =
            'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
        }
      } else {
        errorMessage = err.message || errorMessage;
      }
      toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCheckboxChange = async (idx, field) => {
    const prevPlans = [...plans];
    const plan = plans[idx];
    const planId = plan.plId;

    if (field === 'isApproved' && !plan.isCompleted) {
      toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
      return;
    }
    if (field === 'finalVersion' && !plan.isApproved) {
      toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
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
        toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
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
      try {
        await axios.put(updateUrl, updated);
      } catch (err) {
        setPlans(sortPlansByVersion(prevPlans));
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
      toast.info('Updating version code...', { toastId: 'version-code-info' });
      try {
        await axios.put(updateUrl, updated);
      } catch (err) {
        setPlans(sortPlansByVersion(prevPlans));
        toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
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
        await fetchPlans(); // Full reload after delete
      } else if (action === 'Create Budget' || action === 'Create EAC') {
        const payloadTemplate = {
          projId: projectId,
          plId: plan.plId,
          plType: action === 'Create Budget' ? 'BUD' : 'EAC',
          source: plan.source || '',
          type: plan.type || '',
          version: (Number(plan.version)).toString(),
          versionCode: plan.versionCode || 'QTR1',
          finalVersion: false,
          isCompleted: false,   
          isApproved: false,
          status: 'Working',
          closedPeriod: new Date().toISOString().split('T')[0],
          createdBy: plan.createdBy || 'User',
          modifiedBy: plan.modifiedBy || 'User',
          approvedBy: '',
          templateId: plan.templateId || 0, // Ensure templateId is sent
        };
        toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : 'EAC'}...`);
        
        const response = await axios.post('https://test-api-3tmq.onrender.com/Project/AddProjectPlan', payloadTemplate);
        const newPlanData = response.data;

        // Transform newPlanData to match the format of other plans in the state
        // This is crucial for consistent UI display without full reload
        const transformedNewPlan = {
          ...newPlanData,
          plId: newPlanData.plId || newPlanData.id,
          plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || 'Unknown',
          source: newPlanData.source || '',
          type: newPlanData.type || '',
          version: newPlanData.version || '1',
          versionCode: newPlanData.versionCode || 'QTR1',
          finalVersion: !!newPlanData.finalVersion,
          isCompleted: !!newPlanData.isCompleted,
          isApproved: !!newPlanData.isApproved,
          status: newPlanData.status === "Approved" || newPlanData.status === "Completed" ? newPlanData.status : "Working",
          closedPeriod: newPlanData.closedPeriod || new Date().toISOString(),
          createdAt: newPlanData.createdAt || new Date().toISOString(),
          updatedAt: newPlanData.updatedAt || new Date().toISOString(),
          modifiedBy: newPlanData.modifiedBy || '',
          approvedBy: newPlanData.approvedBy || '',
          createdBy: newPlanData.createdBy || '',
          templateId: newPlanData.templateId || 0,
        };

        setPlans(prevPlans => {
          const updatedPlans = [...prevPlans, transformedNewPlan];
          return sortPlansByVersion(updatedPlans);
        });
        toast.success(`${action === 'Create Budget' ? 'Budget' : 'EAC'} created successfully!`);
      } else {
        toast.info(`Action "${action}" selected (API call not implemented)`);
      }
    } catch (err) {
      toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
    }
  };


  const getActionOptions = (plan) => {
    let options = ['None'];
    if (plan.status === "Working") {
      options = ['None', 'Delete'];
    } else if (plan.status === "Completed") {
      options = ['None', 'Create Budget'];
    } else if (plan.status === "Approved") {
      options = ['None', 'Create Budget', 'Create EAC', 'Delete'];
    }
    return options;
  };

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

  if (loading) {
    return (
      <div className="p-4">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 relative z-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold">Project Plan Table</h2>
        <div className="flex gap-2">
          {plans.length === 0 && (
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-sm"
              title="Create New Plan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New
            </button>
          )}
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs"
            title="Import Plan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Import
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportPlan}
            accept=".xlsx,.xls"
            className="hidden"
          />
        </div>
      </div>
      {plans.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No project plans found for project ID: {projectId}
        </div>
      ) : (
        <div className="overflow-x-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
          <table className="min-w-full text-xs text-left border-collapse border ">
            <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
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
                        className="h-4 w-4 cursor-pointer"
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
                        : plan[col] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* ProjectPlanForm is only shown when plans.length is 0 and "New" button is clicked */}
      {plans.length === 0 && showForm && (
        <ProjectPlanForm
          projectId={projectId}
          onClose={() => setShowForm(false)}
          onPlanCreated={() => {
            fetchPlans(); // Fetch plans to update the table after creation
            setShowForm(false); // Close the form
          }}
        />
      )}
    </div>
  );
};

export default ProjectPlanTable;



