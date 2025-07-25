// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// const formatDate = (dateStr, dateOnly = false) => {
//   if (!dateStr) return '';
//   const date = new Date(dateStr);
//   if (isNaN(date)) return dateStr;
//   if (dateOnly) {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//     });
//   }
//   return `${date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   })}, ${date.toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   })}`;
// };

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async (expectedVersion = null, expectedPlType = null, retries = 3, delay = 500) => {
//     if (!projectId) {
//       setError('Project ID is required');
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setPlans([]);
//       let attempts = 0;
//       let sortedPlans = [];
//       while (attempts < retries) {
//         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
//         if (!Array.isArray(response.data)) {
//           setError('Invalid response format from API');
//           setLoading(false);
//           return;
//         }
//         const transformedPlans = response.data.map((plan, idx) => ({
//           plId: plan.plId || plan.id || `temp-${idx}`,
//           projId: plan.projId || projectId,
//           plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//           source: plan.source || '',
//           type: plan.type || '',
//           version: plan.version || '',
//           versionCode: plan.versionCode || '',
//           finalVersion: !!plan.finalVersion,
//           isCompleted: !!plan.isCompleted,
//           isApproved: !!plan.isApproved,
//           status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//           closedPeriod: plan.closedPeriod || '',
//           createdAt: plan.createdAt || '',
//           updatedAt: plan.updatedAt || '',
//           modifiedBy: plan.modifiedBy || '',
//           approvedBy: plan.approvedBy || '',
//           createdBy: plan.createdBy || '',
//           templateId: plan.templateId || 0,
//         }));
//         const normalizedPlans = transformedPlans.map(plan => ({
//           ...plan,
//           status: plan.plType && plan.version && (plan.status === 'Approved' || plan.status === 'Completed') ? plan.status : plan.status,
//           isCompleted: !!plan.isCompleted,
//           finalVersion: !!plan.finalVersion,
//           isApproved: !!plan.isApproved,
//         }));
//         sortedPlans = sortPlansByVersion(normalizedPlans);
//         if (expectedVersion && expectedPlType) {
//           const planExists = sortedPlans.some(
//             p => p.version === expectedVersion && p.plType === expectedPlType && p.projId === projectId
//           );
//           if (planExists || attempts >= retries - 1) {
//             break;
//           }
//           attempts++;
//           await new Promise(resolve => setTimeout(resolve, delay));
//         } else {
//           break;
//         }
//       }
//       setPlans(sortedPlans);
//       setColumns([
//         'projId',
//         'plType',
//         'version',
//         'versionCode',
//         'source',
//         'type',
//         'isCompleted',
//         'isApproved',
//         'finalVersion',
//         'status',
//         'closedPeriod',
//         'createdAt',
//         'updatedAt',
//       ]);
//       setRefreshKey(prev => prev + 1);
//       if (expectedVersion && expectedPlType && !sortedPlans.some(p => p.version === expectedVersion && p.plType === expectedPlType)) {
//         toast.warn(`New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`, { toastId: 'fetch-warning' });
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }

//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: 'import-success-' + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }

//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'finalVersion') {
//       updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     }

//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }

//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : p
//       );
//     }

//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [...plans];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;

//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           type: plan.type || '',
//           version: (Number(plan.version)).toString(),
//           versionCode: plan.versionCode,
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           closedPeriod: new Date().toISOString().split('T')[0],
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 0,
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || '',
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//         };

//         setPlans(prevPlans => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     if (!plan.plType || !plan.version) {
//       return options; // Only 'None' for incomplete plans
//     }
//     if (plan.status === 'Working') {
//       options = ['None', 'Delete'];
//     } else if (plan.status === 'Completed') {
//       options = ['None', 'Create Budget', 'Create Blank Budget'];
//     } else if (plan.status === 'Approved') {
//       options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === 'isCompleted') {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === 'isApproved') {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xs font-bold">Project Plan Table</h2>
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//           </>
//         )}
//       </div>
//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div className="overflow-x-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId || idx}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={e => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map(opt => (
//                         <option key={opt} value={opt}>{opt}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed" ? "text-green-600 font-bold" :
//                         col === "status" && plan.status === "Working" ? "text-blue-600 font-bold" :
//                         col === "status" && plan.status === "Approved" ? "text-purple-600 font-bold" : ""
//                       } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' ? 'whitespace-nowrap' : ''}`}
//                       style={
//                         col === 'projId'
//                           ? { minWidth: '100px', maxWidth: '150px' }
//                           : col === 'createdAt' || col === 'updatedAt'
//                           ? { minWidth: '180px', maxWidth: '220px' }
//                           : {}
//                       }
//                     >
//                       {col === 'closedPeriod'
//                         ? formatDate(plan[col], true)
//                         : col === 'createdAt' || col === 'updatedAt'
//                         ? formatDate(plan[col])
//                         : col === 'versionCode'
//                         ? (
//                           <input
//                             type="text"
//                             value={plan.versionCode}
//                             onClick={e => e.stopPropagation()}
//                             onChange={e => {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(idx, e.target.value);
//                             }}
//                             className="border border-gray-300 rounded px-2 py-1 w-24"
//                             style={{ minWidth: 60, maxWidth: 120 }}
//                             disabled={!plan.plType || !plan.version}
//                           />
//                         )
//                         : typeof plan[col] === 'boolean'
//                         ? (
//                           <input
//                             type="checkbox"
//                             checked={getCheckboxProps(plan, col, idx).checked}
//                             disabled={getCheckboxProps(plan, col, idx).disabled}
//                             onClick={e => e.stopPropagation()}
//                             onChange={() => handleCheckboxChange(idx, col)}
//                             className="cursor-pointer"
//                           />
//                         )
//                         : plan[col] || ''}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => {
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//           onPlanCreated={() => {
//             fetchPlans();
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// const formatDate = (dateStr, dateOnly = false) => {
//   if (!dateStr) return '';
//   const date = new Date(dateStr);
//   if (isNaN(date)) return dateStr;
//   if (dateOnly) {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//     });
//   }
//   return `${date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   })}, ${date.toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   })}`;
// };

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);

//   // Helper function to detect if projectId is a child project ID
//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async (expectedVersion = null, expectedPlType = null, retries = 3, delay = 500) => {
//     if (!projectId) {
//       setError('Project ID is required');
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setPlans([]);
//       let attempts = 0;
//       let sortedPlans = [];
//       while (attempts < retries) {
//         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
//         if (!Array.isArray(response.data)) {
//           setError('Invalid response format from API');
//           setLoading(false);
//           return;
//         }
//         const transformedPlans = response.data.map((plan, idx) => ({
//           plId: plan.plId || plan.id || 0,
//           projId: plan.projId || projectId,
//           plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//           source: plan.source || '',
//           type: plan.type || '',
//           version: plan.version || 0,
//           versionCode: plan.versionCode || '',
//           finalVersion: !!plan.finalVersion,
//           isCompleted: !!plan.isCompleted,
//           isApproved: !!plan.isApproved,
//           status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//           closedPeriod: plan.closedPeriod || '',
//           createdAt: plan.createdAt || '',
//           updatedAt: plan.updatedAt || '',
//           modifiedBy: plan.modifiedBy || '',
//           approvedBy: plan.approvedBy || '',
//           createdBy: plan.createdBy || '',
//           templateId: plan.templateId || 0,
//         }));
//         const normalizedPlans = transformedPlans.map(plan => ({
//           ...plan,
//           status: plan.plType && plan.version && (plan.status === 'Approved' || plan.status === 'Completed') ? plan.status : plan.status,
//           isCompleted: !!plan.isCompleted,
//           finalVersion: !!plan.finalVersion,
//           isApproved: !!plan.isApproved,
//         }));
//         sortedPlans = sortPlansByVersion(normalizedPlans);
//         if (expectedVersion && expectedPlType) {
//           const planExists = sortedPlans.some(
//             p => p.version === expectedVersion && p.plType === expectedPlType && p.projId === projectId
//           );
//           if (planExists || attempts >= retries - 1) {
//             break;
//           }
//           attempts++;
//           await new Promise(resolve => setTimeout(resolve, delay));
//         } else {
//           break;
//         }
//       }

//       // If no plans are found and it's a child project ID, create a placeholder row
//       if (sortedPlans.length === 0 && isChildProjectId(projectId)) {
//         sortedPlans = [{
//           plId: `temp-${projectId}`,
//           projId: projectId,
//           plType: '',
//           source: '',
//           type: '',
//           version: '',
//           versionCode: '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: '',
//           closedPeriod: '',
//           createdAt: '',
//           updatedAt: '',
//           modifiedBy: '',
//           approvedBy: '',
//           createdBy: '',
//           templateId: 0,
//         }];
//       }

//       setPlans(sortedPlans);
//       setColumns([
//         'projId',
//         'plType',
//         'version',
//         'versionCode',
//         'source',
//         'type',
//         'isCompleted',
//         'isApproved',
//         'finalVersion',
//         'status',
//         'closedPeriod',
//         'createdAt',
//         'updatedAt',
//       ]);
//       setRefreshKey(prev => prev + 1);
//       if (expectedVersion && expectedPlType && !sortedPlans.some(p => p.version === expectedVersion && p.plType === expectedPlType)) {
//         toast.warn(`New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`, { toastId: 'fetch-warning' });
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }

//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: 'import-success-' + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }

//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'finalVersion') {
//       updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     }

//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }

//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : p
//       );
//     }

//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [ ...plans ];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;

//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           // Set type to 'system' for child project IDs
//           type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//           version: plan.version, // Increment version or start at 1
//           versionCode: plan.versionCode || '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           // closedPeriod: new Date().toISOString().split('T')[0],
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 1,
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || (isChildProjectId(projectId) ? 'system' : ''),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//         };

//         setPlans(prevPlans => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     // For child project IDs with no data (placeholder row)
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ['None', 'Create Budget', 'Create Blank Budget'];
//     }
//     if (!plan.plType || !plan.version) {
//       return options; // Only 'None' for incomplete plans
//     }
//     if (plan.status === 'Working') {
//       options = ['None', 'Delete'];
//     } else if (plan.status === 'Completed') {
//       options = ['None', 'Create Budget', 'Create Blank Budget'];
//     } else if (plan.status === 'Approved') {
//       options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === 'isCompleted') {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === 'isApproved') {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xs font-bold">Project Plan Table</h2>
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//           </>
//         )}
//       </div>
//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div className="overflow-x-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={e => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map(opt => (
//                         <option key={opt} value={opt}>{opt}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed" ? "text-green-600 font-bold" :
//                         col === "status" && plan.status === "Working" ? "text-blue-600 font-bold" :
//                         col === "status" && plan.status === "Approved" ? "text-purple-600 font-bold" : ""
//                       } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' ? 'whitespace-nowrap' : ''}`}
//                       style={
//                         col === 'projId'
//                           ? { minWidth: '100px', maxWidth: '150px' }
//                           : col === 'createdAt' || col === 'updatedAt'
//                           ? { minWidth: '180px', maxWidth: '220px' }
//                           : {}
//                       }
//                     >
//                       {col === 'closedPeriod'
//                         ? formatDate(plan[col], true)
//                         : col === 'createdAt' || col === 'updatedAt'
//                         ? formatDate(plan[col])
//                         : col === 'versionCode'
//                         ? (
//                           <input
//                             type="text"
//                             value={plan.versionCode}
//                             onClick={e => e.stopPropagation()}
//                             onChange={e => {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(idx, e.target.value);
//                             }}
//                             className="border border-gray-300 rounded px-2 py-1 w-24"
//                             style={{ minWidth: 60, maxWidth: 120 }}
//                             disabled={!plan.plType || !plan.version}
//                           />
//                         )
//                         : typeof plan[col] === 'boolean'
//                         ? (
//                           <input
//                             type="checkbox"
//                             checked={getCheckboxProps(plan, col, idx).checked}
//                             disabled={getCheckboxProps(plan, col, idx).disabled}
//                             onClick={e => e.stopPropagation()}
//                             onChange={() => handleCheckboxChange(idx, col)}
//                             className="cursor-pointer"
//                           />
//                         )
//                         : plan[col] || ''}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => {
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//           onPlanCreated={() => {
//             fetchPlans();
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// const formatDate = (dateStr, dateOnly = false) => {
//   if (!dateStr) return '';
//   const date = new Date(dateStr);
//   if (isNaN(date)) return dateStr;
//   if (dateOnly) {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//     });
//   }
//   return `${date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   })}, ${date.toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   })}`;
// };

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const VERSION_CODE_OPTIONS = [
//   { value: '', label: 'Select Quarter' },
//   { value: 'QTR1', label: 'QTR1' },
//   { value: 'QTR2', label: 'QTR2' },
//   { value: 'QTR3', label: 'QTR3' },
//   { value: 'QTR4', label: 'QTR4' },
// ];

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);

//   // Helper function to detect if projectId is a child project ID
//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async (expectedVersion = null, expectedPlType = null, retries = 3, delay = 500) => {
//     if (!projectId) {
//       setError('Project ID is required');
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setPlans([]);
//       let attempts = 0;
//       let sortedPlans = [];
//       while (attempts < retries) {
//         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
//         if (!Array.isArray(response.data)) {
//           setError('Invalid response format from API');
//           setLoading(false);
//           return;
//         }
//         const transformedPlans = response.data.map((plan, idx) => ({
//           plId: plan.plId || plan.id || 0,
//           projId: plan.projId || projectId,
//           plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//           source: plan.source || '',
//           type: plan.type || '',
//           version: plan.version || 0,
//           versionCode: plan.versionCode || '',
//           finalVersion: !!plan.finalVersion,
//           isCompleted: !!plan.isCompleted,
//           isApproved: !!plan.isApproved,
//           status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//           closedPeriod: plan.closedPeriod || '',
//           createdAt: plan.createdAt || '',
//           updatedAt: plan.updatedAt || '',
//           modifiedBy: plan.modifiedBy || '',
//           approvedBy: plan.approvedBy || '',
//           createdBy: plan.createdBy || '',
//           templateId: plan.templateId || 0,
//         }));
//         const normalizedPlans = transformedPlans.map(plan => ({
//           ...plan,
//           status: plan.plType && plan.version && (plan.status === 'Approved' || plan.status === 'Completed') ? plan.status : plan.status,
//           isCompleted: !!plan.isCompleted,
//           finalVersion: !!plan.finalVersion,
//           isApproved: !!plan.isApproved,
//         }));
//         sortedPlans = sortPlansByVersion(normalizedPlans);
//         if (expectedVersion && expectedPlType) {
//           const planExists = sortedPlans.some(
//             p => p.version === expectedVersion && p.plType === expectedPlType && p.projId === projectId
//           );
//           if (planExists || attempts >= retries - 1) {
//             break;
//           }
//           attempts++;
//           await new Promise(resolve => setTimeout(resolve, delay));
//         } else {
//           break;
//         }
//       }

//       // If no plans are found and it's a child project ID, create a placeholder row
//       if (sortedPlans.length === 0 && isChildProjectId(projectId)) {
//         sortedPlans = [{
//           plId: `temp-${projectId}`,
//           projId: projectId,
//           plType: '',
//           source: '',
//           type: '',
//           version: '',
//           versionCode: '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: '',
//           closedPeriod: '',
//           createdAt: '',
//           updatedAt: '',
//           modifiedBy: '',
//           approvedBy: '',
//           createdBy: '',
//           templateId: 0,
//         }];
//       }

//       setPlans(sortedPlans);
//       setColumns([
//         'projId',
//         'plType',
//         'version',
//         'versionCode',
//         'source',
//         'type',
//         'isCompleted',
//         'isApproved',
//         'finalVersion',
//         'status',
//         'closedPeriod',
//         'createdAt',
//         'updatedAt',
//       ]);
//       setRefreshKey(prev => prev + 1);
//       if (expectedVersion && expectedPlType && !sortedPlans.some(p => p.version === expectedVersion && p.plType === expectedPlType)) {
//         toast.warn(`New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`, { toastId: 'fetch-warning' });
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }

//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: 'import-success-' + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }

//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'finalVersion') {
//       updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     }

//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }

//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : p
//       );
//     }

//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [ ...plans ];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;

//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//           version: plan.version,
//           versionCode: plan.versionCode || '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 1,
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || (isChildProjectId(projectId) ? 'system' : ''),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//         };

//         setPlans(prevPlans => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ['None', 'Create Budget', 'Create Blank Budget'];
//     }
//     if (!plan.plType || !plan.version) {
//       return options;
//     }
//     if (plan.status === 'Working') {
//       options = ['None', 'Delete'];
//     } else if (plan.status === 'Completed') {
//       options = ['None', 'Create Budget', 'Create Blank Budget'];
//     } else if (plan.status === 'Approved') {
//       options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === 'isCompleted') {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === 'isApproved') {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   const handleTopButtonToggle = async (field) => {
//     if (!selectedPlan) {
//       toast.error(`No plan selected to update ${field}.`, { toastId: 'no-plan-selected' });
//       return;
//     }
//     const idx = plans.findIndex(p => p.plId === selectedPlan.plId);
//     if (idx === -1) {
//       toast.error(`Selected plan not found.`, { toastId: 'plan-not-found' });
//       return;
//     }
//     setIsActionLoading(true);
//     await handleCheckboxChange(idx, field);
//     setIsActionLoading(false);
//   };

//   const getTopButtonDisabled = (field) => {
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) {
//       return true;
//     }
//     if (field === 'isCompleted') {
//       return !!selectedPlan.isApproved;
//     }
//     if (field === 'isApproved') {
//       return !selectedPlan.isCompleted;
//     }
//     if (field === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && plans[checkedFinalVersionIdx].plId !== selectedPlan.plId) {
//         return true;
//       }
//       return !selectedPlan.isApproved;
//     }
//     return false;
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xs font-bold">Project Plan Table</h2>
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isCompleted')}
//               disabled={getTopButtonDisabled('isCompleted')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isCompleted')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Completed"
//             >
//               Completed
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isApproved')}
//               disabled={getTopButtonDisabled('isApproved')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isApproved')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Approved"
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('finalVersion')}
//               disabled={getTopButtonDisabled('finalVersion')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('finalVersion')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Final Version"
//             >
//               Final Version
//             </button>
//           </>
//         )}
//       </div>
//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div className="overflow-x-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={e => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map(opt => (
//                         <option key={opt} value={opt}>{opt}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed" ? "text-green-600 font-bold" :
//                         col === "status" && plan.status === "Working" ? "text-blue-600 font-bold" :
//                         col === "status" && plan.status === "Approved" ? "text-purple-600 font-bold" : ""
//                       } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' ? 'whitespace-nowrap' : ''}`}
//                       style={
//                         col === 'projId'
//                           ? { minWidth: '100px', maxWidth: '150px' }
//                           : col === 'createdAt' || col === 'updatedAt'
//                           ? { minWidth: '180px', maxWidth: '220px' }
//                           : {}
//                       }
//                     >
//                       {col === 'closedPeriod'
//                         ? formatDate(plan[col], true)
//                         : col === 'createdAt' || col === 'updatedAt'
//                         ? formatDate(plan[col])
//                         : col === 'versionCode'
//                         ? (
//                           <select
//                             value={plan.versionCode || ''}
//                             onClick={e => e.stopPropagation()}
//                             onChange={e => {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(idx, e.target.value);
//                             }}
//                             className="border border-gray-300 rounded px-2 py-1 w-24 text-xs"
//                             style={{ minWidth: 60, maxWidth: 120 }}
//                             disabled={!plan.plType || !plan.version}
//                           >
//                             {VERSION_CODE_OPTIONS.map(opt => (
//                               <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                               </option>
//                             ))}
//                           </select>
//                         )
//                         : typeof plan[col] === 'boolean'
//                         ? (
//                           <input
//                             type="checkbox"
//                             checked={getCheckboxProps(plan, col, idx).checked}
//                             disabled={getCheckboxProps(plan, col, idx).disabled}
//                             onClick={e => e.stopPropagation()}
//                             onChange={() => handleCheckboxChange(idx, col)}
//                             className="cursor-pointer"
//                           />
//                         )
//                         : plan[col] || ''}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => {
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//           onPlanCreated={() => {
//             fetchPlans();
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProjectPlanForm from "./ProjectPlanForm";

// const BOOLEAN_FIELDS = ["finalVersion", "isCompleted", "isApproved"];

// const formatDate = (dateStr) => {
//   if (!dateStr) return "";
//   try {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr; // Return original if invalid date
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//     return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds}`;
//   } catch (e) {
//     return dateStr; // Return original if parsing fails
//   }
// };

// const COLUMN_LABELS = {
//   projId: "Project ID",
//   plType: "Plan Type",
//   version: "Version",
//   versionCode: "Version Code",
//   source: "Source",
//   type: "Type",
//   finalVersion: "Final Version",
//   isCompleted: "Completed",
//   isApproved: "Approved",
//   status: "Status",
//   closedPeriod: "Closed Period",
//   createdAt: "Created At",
//   updatedAt: "Updated At",
// };

// // const VERSION_CODE_OPTIONS = [
// //   { value: '', label: 'Select Quarter' },
// //   { value: 'QTR1', label: 'QTR1' },
// //   { value: 'QTR2', label: 'QTR2' },
// //   { value: 'QTR3', label: 'QTR3' },
// //   { value: 'QTR4', label: 'QTR4' },
// // ];

// const ProjectPlanTable = ({
//   onPlanSelect,
//   selectedPlan,
//   projectId,
//   fiscalYear,
// }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);
//   const [editingVersionCodeIdx, setEditingVersionCodeIdx] = useState(null);
//   const [editingVersionCodeValue, setEditingVersionCodeValue] = useState("");

//   // Helper function to detect if projectId is a child project ID
//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version
//         ? isNaN(Number(a.version))
//           ? a.version
//           : Number(a.version)
//         : "";
//       const bVer = b.version
//         ? isNaN(Number(b.version))
//           ? b.version
//           : Number(b.version)
//         : "";
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async (
//     expectedVersion = null,
//     expectedPlType = null,
//     retries = 3,
//     delay = 500
//   ) => {
//     if (!projectId) {
//       setError("Project ID is required");
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setPlans([]);
//       let attempts = 0;
//       let sortedPlans = [];
//       while (attempts < retries) {
//         const response = await axios.get(
//           `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`
//         );
//         if (!Array.isArray(response.data)) {
//           setError("Invalid response format from API");
//           setLoading(false);
//           return;
//         }
//         const transformedPlans = response.data.map((plan, idx) => ({
//           plId: plan.plId || plan.id || 0,
//           projId: plan.projId || projectId,
//           plType:
//             plan.plType === "Budget"
//               ? "BUD"
//               : plan.plType === "EAC"
//               ? "EAC"
//               : plan.plType || "",
//           source: plan.source || "",
//           type: plan.type || "",
//           version: plan.version || 0,
//           versionCode: plan.versionCode || "",
//           finalVersion: !!plan.finalVersion,
//           isCompleted: !!plan.isCompleted,
//           isApproved: !!plan.isApproved,
//           status: plan.plType && plan.version ? plan.status || "Working" : "",
//           closedPeriod: plan.closedPeriod || "",
//           createdAt: plan.createdAt || "",
//           updatedAt: plan.updatedAt || "",
//           modifiedBy: plan.modifiedBy || "",
//           approvedBy: plan.approvedBy || "",
//           createdBy: plan.createdBy || "",
//           templateId: plan.templateId || 0,
//         }));
//         const normalizedPlans = transformedPlans.map((plan) => ({
//           ...plan,
//           status:
//             plan.plType &&
//             plan.version &&
//             (plan.status === "Approved" || plan.status === "Completed")
//               ? plan.status
//               : plan.status,
//           isCompleted: !!plan.isCompleted,
//           finalVersion: !!plan.finalVersion,
//           isApproved: !!plan.isApproved,
//         }));
//         sortedPlans = sortPlansByVersion(normalizedPlans);
//         if (expectedVersion && expectedPlType) {
//           const planExists = sortedPlans.some(
//             (p) =>
//               p.version === expectedVersion &&
//               p.plType === expectedPlType &&
//               p.projId === projectId
//           );
//           if (planExists || attempts >= retries - 1) {
//             break;
//           }
//           attempts++;
//           await new Promise((resolve) => setTimeout(resolve, delay));
//         } else {
//           break;
//         }
//       }

//       // If no plans are found and it's a child project ID, create a placeholder row
//       if (sortedPlans.length === 0 && isChildProjectId(projectId)) {
//         sortedPlans = [
//           {
//             plId: `temp-${projectId}`,
//             projId: projectId,
//             plType: "",
//             source: "",
//             type: "",
//             version: "",
//             versionCode: "",
//             finalVersion: false,
//             isCompleted: false,
//             isApproved: false,
//             status: "",
//             closedPeriod: "",
//             createdAt: "",
//             updatedAt: "",
//             modifiedBy: "",
//             approvedBy: "",
//             createdBy: "",
//             templateId: 0,
//           },
//         ];
//       }

//       setPlans(sortedPlans);
//       setColumns([
//         "projId",
//         "plType",
//         "version",
//         "versionCode",
//         "source",
//         "type",
//         "isCompleted",
//         "isApproved",
//         "finalVersion",
//         "status",
//         "closedPeriod",
//         "createdAt",
//         "updatedAt",
//       ]);
//       setRefreshKey((prev) => prev + 1);
//       if (
//         expectedVersion &&
//         expectedPlType &&
//         !sortedPlans.some(
//           (p) => p.version === expectedVersion && p.plType === expectedPlType
//         )
//       ) {
//         toast.warn(
//           `New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`,
//           { toastId: "fetch-warning" }
//         );
//       }
//       setError(null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to fetch project plans"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error("Missing required parameters for export");
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info("Exporting plan...");
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute(
//         "download",
//         `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`
//       );
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success("Plan exported successfully!");
//     } catch (err) {
//       toast.error(
//         "Error exporting plan: " + (err.response?.data?.message || err.message)
//       );
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error("No file selected");
//       return;
//     }

//     const validExtensions = [".xlsx", ".xls"];
//     const fileExtension = file.name
//       .slice(file.name.lastIndexOf("."))
//       .toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error(
//         "Invalid file format. Please upload an Excel file (.xlsx or .xls)"
//       );
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("projId", projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info("Importing plan...");
//       const response = await axios.post(
//         "https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === "string") {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === "string"
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: "import-success-" + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         "Failed to import plan. Please check the file and project ID, or contact support.";
//       if (err.response) {
//         if (typeof err.response.data === "string" && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             "Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.";
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: "import-error", autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(
//         `Cannot update ${field}: Plan Type and Version are required.`,
//         { toastId: "checkbox-error" }
//       );
//       return;
//     }

//     if (field === "isApproved" && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", {
//         toastId: "checkbox-error",
//       });
//       return;
//     }
//     if (field === "finalVersion" && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", {
//         toastId: "checkbox-error",
//       });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === "isCompleted") {
//       updated.status = updated.isCompleted ? "Completed" : "Working";
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === "isApproved") {
//       updated.status = updated.isApproved ? "Approved" : "Completed";
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === "finalVersion") {
//       updated.status = updated.finalVersion ? "Completed" : "Approved";
//     }

//     let newPlans;
//     if (field === "isCompleted" && !updated.isCompleted) {
//       const isEAC = updated.plType === "EAC";
//       const workingCount = plans.filter(
//         (p) => p.status === "Working" && p.plType === updated.plType
//       ).length;
//       if (workingCount > 0 && updated.status === "Working") {
//         toast.error(
//           `Only one ${
//             isEAC ? "EAC" : "BUD"
//           } plan can have Working status at a time.`,
//           { toastId: "checkbox-error" }
//         );
//         return;
//       }
//     }

//     if (field === "finalVersion" && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) => (i === idx ? updated : p));
//     }

//     if (updated.status === "Working") {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === "Working" && p.plType === updated.plType
//           ? { ...p, status: "Completed", isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if (
//       (BOOLEAN_FIELDS.includes(field) || field === "status") &&
//       planId &&
//       Number(planId) > 0
//     ) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error(
//           "Error updating plan: " +
//             (err.response?.data?.message || err.message),
//           { toastId: "checkbox-error" }
//         );
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [...plans];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map((plan) =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info("Updating version code...", { toastId: "version-code-info" });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error(
//           "Error updating version code: " +
//             (err.response?.data?.message || err.message),
//           { toastId: "version-code-error" }
//         );
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === "None") return;

//     try {
//       setIsActionLoading(true);
//       if (action === "Delete") {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error("Cannot delete: Invalid plan ID.");
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info("Deleting plan...");
//         try {
//           await axios.delete(deleteUrl);
//           toast.success("Plan deleted successfully!");
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error(
//               "Plan not found on server. It may have already been deleted."
//             );
//           } else {
//             toast.error(
//               "Error deleting plan: " +
//                 (err.response?.data?.message || err.message)
//             );
//           }
//         }
//         await fetchPlans();
//       } else if (
//         action === "Create Budget" ||
//         action === "Create Blank Budget" ||
//         action === "Create EAC"
//       ) {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType:
//             action === "Create Budget" || action === "Create Blank Budget"
//               ? "BUD"
//               : "EAC",
//           source: plan.source || "",
//           type: isChildProjectId(plan.projId) ? "SYSTEM" : plan.type || "",
//           version: plan.version,
//           versionCode: plan.versionCode || "",
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: "Working",
//           createdBy: plan.createdBy || "User",
//           modifiedBy: plan.modifiedBy || "User",
//           approvedBy: "",
//           templateId: plan.templateId || 1,
//         };
//         toast.info(
//           `Creating ${
//             action === "Create Budget"
//               ? "Budget"
//               : action === "Create Blank Budget"
//               ? "Blank Budget"
//               : "EAC"
//           }...`
//         );

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${
//             action === "Create Blank Budget" ? "blank" : "actual"
//           }`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType:
//             newPlanData.plType === "Budget" ? "BUD" : newPlanData.plType || "",
//           source: newPlanData.source || "",
//           type:
//             newPlanData.type || (isChildProjectId(projectId) ? "SYSTEM" : ""),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status:
//             newPlanData.plType && newPlanData.version
//               ? newPlanData.status === "Approved" ||
//                 newPlanData.status === "Completed"
//                 ? newPlanData.status
//                 : "Working"
//               : "",
//           closedPeriod: newPlanData.closedPeriod || "",
//           createdAt: newPlanData.createdAt || "",
//           updatedAt: newPlanData.updatedAt || "",
//           modifiedBy: newPlanData.modifiedBy || "",
//           approvedBy: newPlanData.approvedBy || "",
//           createdBy: newPlanData.createdBy || "",
//           templateId: newPlanData.templateId || 0,
//         };

//         setPlans((prevPlans) => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(
//           `${
//             action === "Create Budget"
//               ? "Budget"
//               : action === "Create Blank Budget"
//               ? "Blank Budget"
//               : "EAC"
//           } created successfully!`
//         );
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error(
//         "Error performing action: " +
//           (err.response?.data?.message || err.message)
//       );
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ["None"];
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ["None", "Create Budget", "Create Blank Budget"];
//     }
//     if (!plan.plType || !plan.version) {
//       return options;
//     }
//     if (plan.status === "Working") {
//       options = ["None", "Delete"];
//     } else if (plan.status === "Completed") {
//       options = ["None", "Create Budget", "Create Blank Budget"];
//     } else if (plan.status === "Approved") {
//       options = [
//         "None",
//         "Create Budget",
//         "Create Blank Budget",
//         "Create EAC",
//         "Delete",
//       ];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex((plan) => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === "isCompleted") {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === "isApproved") {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === "finalVersion") {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   const handleTopButtonToggle = async (field) => {
//     if (!selectedPlan) {
//       toast.error(`No plan selected to update ${field}.`, {
//         toastId: "no-plan-selected",
//       });
//       return;
//     }
//     const idx = plans.findIndex((p) => p.plId === selectedPlan.plId);
//     if (idx === -1) {
//       toast.error(`Selected plan not found.`, { toastId: "plan-not-found" });
//       return;
//     }
//     setIsActionLoading(true);
//     await handleCheckboxChange(idx, field);
//     setIsActionLoading(false);
//   };

//   const getTopButtonDisabled = (field) => {
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) {
//       return true;
//     }
//     if (field === "isCompleted") {
//       return !!selectedPlan.isApproved;
//     }
//     if (field === "isApproved") {
//       return !selectedPlan.isCompleted;
//     }
//     if (field === "finalVersion") {
//       if (
//         checkedFinalVersionIdx !== -1 &&
//         plans[checkedFinalVersionIdx].plId !== selectedPlan.plId
//       ) {
//         return true;
//       }
//       return !selectedPlan.isApproved;
//     }
//     return false;
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xs font-bold">Project Plan Table</h2>
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(
//                   plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                   "Create Budget"
//                 );
//               }}
//               disabled={
//                 !selectedPlan ||
//                 !getButtonAvailability(selectedPlan, "Create Budget")
//               }
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan ||
//                 !getButtonAvailability(selectedPlan, "Create Budget")
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(
//                   plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                   "Create Blank Budget"
//                 );
//               }}
//               disabled={
//                 !selectedPlan ||
//                 !getButtonAvailability(selectedPlan, "Create Blank Budget")
//               }
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan ||
//                 !getButtonAvailability(selectedPlan, "Create Blank Budget")
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(
//                   plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                   "Create EAC"
//                 );
//               }}
//               disabled={
//                 !selectedPlan ||
//                 !getButtonAvailability(selectedPlan, "Create EAC")
//               }
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan ||
//                 !getButtonAvailability(selectedPlan, "Create EAC")
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle("isCompleted")}
//               disabled={getTopButtonDisabled("isCompleted")}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled("isCompleted")
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               }`}
//               title="Toggle Completed"
//             >
//               Completed
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle("isApproved")}
//               disabled={getTopButtonDisabled("isApproved")}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled("isApproved")
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               }`}
//               title="Toggle Approved"
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle("finalVersion")}
//               disabled={getTopButtonDisabled("finalVersion")}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled("finalVersion")
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               }`}
//               title="Toggle Final Version"
//             >
//               Final Version
//             </button>
//           </>
//         )}
//       </div>
//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div
//           className="overflow-x-auto"
//           style={{
//             maxHeight: "400px",
//             minHeight: "100px",
//             border: "1px solid #e5e7eb",
//             borderRadius: "0.5rem",
//             background: "#fff",
//           }}
//         >
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId
//                       ? "bg-blue-100 border-l-4 border-l-blue-600"
//                       : ""
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={(e) => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed"
//                           ? "text-green-600 font-bold"
//                           : col === "status" && plan.status === "Working"
//                           ? "text-blue-600 font-bold"
//                           : col === "status" && plan.status === "Approved"
//                           ? "text-purple-600 font-bold"
//                           : ""
//                       } ${col === "projId" ? "break-words" : ""} ${
//                         col === "createdAt" ||
//                         col === "updatedAt" ||
//                         col === "closedPeriod"
//                           ? "whitespace-nowrap"
//                           : ""
//                       }`}
//                       style={
//                         col === "projId"
//                           ? { minWidth: "100px", maxWidth: "150px" }
//                           : col === "closedPeriod" ||
//                             col === "createdAt" ||
//                             col === "updatedAt"
//                           ? { minWidth: "180px", maxWidth: "220px" }
//                           : {}
//                       }
//                     >
//                       {col === "closedPeriod" ||
//                       col === "createdAt" ||
//                       col === "updatedAt" ? (
//                         formatDate(plan[col])
//                       ) : col === "versionCode" ? (
//                         editingVersionCodeIdx === idx ? (
//                           <input
//                             type="text"
//                             value={editingVersionCodeValue}
//                             autoFocus
//                             onClick={(e) => e.stopPropagation()}
//                             onChange={(e) =>
//                               setEditingVersionCodeValue(e.target.value)
//                             }
//                             onBlur={() => {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(
//                                 idx,
//                                 editingVersionCodeValue
//                               );
//                               setEditingVersionCodeIdx(null);
//                             }}
//                             onKeyDown={(e) => {
//                               if (e.key === "Enter") {
//                                 setIsActionLoading(true);
//                                 handleVersionCodeChange(
//                                   idx,
//                                   editingVersionCodeValue
//                                 );
//                                 setEditingVersionCodeIdx(null);
//                               } else if (e.key === "Escape") {
//                                 setEditingVersionCodeIdx(null);
//                               }
//                             }}
//                             className="border border-gray-300 rounded px-2 py-1 w-24 text-xs"
//                             style={{ minWidth: 60, maxWidth: 120 }}
//                             disabled={!plan.plType || !plan.version}
//                             placeholder="Enter Version Code"
//                           />
//                         ) : (
//                           <div
//                             className="cursor-text min-w-[60px] max-w-[120px] px-2 py-1"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setEditingVersionCodeIdx(idx);
//                               setEditingVersionCodeValue(
//                                 plan.versionCode || ""
//                               );
//                             }}
//                             style={{ minHeight: "28px" }}
//                           >
//                             {plan.versionCode || ""}
//                           </div>
//                         )
//                       ) : typeof plan[col] === "boolean" ? (
//                         <input
//                           type="checkbox"
//                           checked={getCheckboxProps(plan, col, idx).checked}
//                           disabled={getCheckboxProps(plan, col, idx).disabled}
//                           onClick={(e) => e.stopPropagation()}
//                           onChange={() => handleCheckboxChange(idx, col)}
//                           className="cursor-pointer"
//                         />
//                       ) : (
//                         plan[col] || ""
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => {
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//           onPlanCreated={() => {
//             fetchPlans();
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// const formatDate = (dateStr) => {
//   if (!dateStr) return '';
//   try {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr; // Return original if invalid date
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//     return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds}`;
//   } catch (e) {
//     return dateStr; // Return original if parsing fails
//   }
// };

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);
//   const [editingVersionCodeIdx, setEditingVersionCodeIdx] = useState(null);
//   const [editingVersionCodeValue, setEditingVersionCodeValue] = useState('');

//   // Helper function to detect if projectId is a child project ID
//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async (expectedVersion = null, expectedPlType = null, retries = 3, delay = 500) => {
//     if (!projectId) {
//       setError('Project ID is required');
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setPlans([]);
//       let attempts = 0;
//       let sortedPlans = [];
//       while (attempts < retries) {
//         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
//         if (!Array.isArray(response.data)) {
//           setError('Invalid response format from API');
//           setLoading(false);
//           return;
//         }
//         const transformedPlans = response.data.map((plan, idx) => ({
//           plId: plan.plId || plan.id || 0,
//           projId: plan.projId || projectId,
//           plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//           source: plan.source || '',
//           type: plan.type || '',
//           version: plan.version || 0,
//           versionCode: plan.versionCode || '',
//           finalVersion: !!plan.finalVersion,
//           isCompleted: !!plan.isCompleted,
//           isApproved: !!plan.isApproved,
//           status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//           closedPeriod: plan.closedPeriod || '',
//           createdAt: plan.createdAt || '',
//           updatedAt: plan.updatedAt || '',
//           modifiedBy: plan.modifiedBy || '',
//           approvedBy: plan.approvedBy || '',
//           createdBy: plan.createdBy || '',
//           templateId: plan.templateId || 0,
//         }));
//         const normalizedPlans = transformedPlans.map(plan => ({
//           ...plan,
//           status: plan.plType && plan.version && (plan.status === 'Approved' || plan.status === 'Completed') ? plan.status : plan.status,
//           isCompleted: !!plan.isCompleted,
//           finalVersion: !!plan.finalVersion,
//           isApproved: !!plan.isApproved,
//         }));
//         sortedPlans = sortPlansByVersion(normalizedPlans);
//         if (expectedVersion && expectedPlType) {
//           const planExists = sortedPlans.some(
//             p => p.version === expectedVersion && p.plType === expectedPlType && p.projId === projectId
//           );
//           if (planExists || attempts >= retries - 1) {
//             break;
//           }
//           attempts++;
//           await new Promise(resolve => setTimeout(resolve, delay));
//         } else {
//           break;
//         }
//       }

//       // If no plans are found and it's a child project ID, create a placeholder row
//       if (sortedPlans.length === 0 && isChildProjectId(projectId)) {
//         sortedPlans = [{
//           plId: `temp-${projectId}`,
//           projId: projectId,
//           plType: '',
//           source: '',
//           type: '',
//           version: '',
//           versionCode: '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: '',
//           closedPeriod: '',
//           createdAt: '',
//           updatedAt: '',
//           modifiedBy: '',
//           approvedBy: '',
//           createdBy: '',
//           templateId: 0,
//         }];
//       }

//       setPlans(sortedPlans);
//       setColumns([
//         'projId',
//         'plType',
//         'version',
//         'versionCode',
//         'source',
//         'type',
//         'isCompleted',
//         'isApproved',
//         'finalVersion',
//         'status',
//         'closedPeriod',
//         'createdAt',
//         'updatedAt',
//       ]);
//       setRefreshKey(prev => prev + 1);
//       if (expectedVersion && expectedPlType && !sortedPlans.some(p => p.version === expectedVersion && p.plType === expectedPlType)) {
//         toast.warn(`New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`, { toastId: 'fetch-warning' });
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }

//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: 'import-success-' + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }

//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'finalVersion') {
//       updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     }

//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }

//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : p
//       );
//     }

//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [ ...plans ];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;

//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//           version: plan.version,
//           versionCode: plan.versionCode || '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 1,
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//         };

//         setPlans(prevPlans => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ['None', 'Create Budget', 'Create Blank Budget'];
//     }
//     if (!plan.plType || !plan.version) {
//       return options;
//     }
//     if (plan.status === 'Working') {
//       options = ['None', 'Delete'];
//     } else if (plan.status === 'Completed') {
//       options = ['None', 'Create Budget', 'Create Blank Budget'];
//     } else if (plan.status === 'Approved') {
//       options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === 'isCompleted') {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === 'isApproved') {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   const handleTopButtonToggle = async (field) => {
//     if (!selectedPlan) {
//       toast.error(`No plan selected to update ${field}.`, { toastId: 'no-plan-selected' });
//       return;
//     }
//     const idx = plans.findIndex(p => p.plId === selectedPlan.plId);
//     if (idx === -1) {
//       toast.error(`Selected plan not found.`, { toastId: 'plan-not-found' });
//       return;
//     }
//     setIsActionLoading(true);
//     await handleCheckboxChange(idx, field);
//     setIsActionLoading(false);
//   };

//   const getTopButtonDisabled = (field) => {
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) {
//       return true;
//     }
//     if (field === 'isCompleted') {
//       return !!selectedPlan.isApproved;
//     }
//     if (field === 'isApproved') {
//       return !selectedPlan.isCompleted;
//     }
//     if (field === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && plans[checkedFinalVersionIdx].plId !== selectedPlan.plId) {
//         return true;
//       }
//       return !selectedPlan.isApproved;
//     }
//     return false;
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xs font-bold">Project Plan Table</h2>
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isCompleted')}
//               disabled={getTopButtonDisabled('isCompleted')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isCompleted')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Completed"
//             >
//               Completed
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isApproved')}
//               disabled={getTopButtonDisabled('isApproved')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isApproved')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Approved"
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('finalVersion')}
//               disabled={getTopButtonDisabled('finalVersion')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('finalVersion')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Final Version"
//             >
//               Final Version
//             </button>
//           </>
//         )}
//       </div>
//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div className="overflow-x-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={e => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map(opt => (
//                         <option key={opt} value={opt}>{opt}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed" ? "bg-yellow-100 text-green-600 font-bold" :
//                         col === "status" && plan.status === "Working" ? "bg-red-100 text-blue-600 font-bold" :
//                         col === "status" && plan.status === "Approved" ? "bg-green-100 text-purple-600 font-bold" : ""
//                       } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''}`}
//                       style={
//                         col === 'projId'
//                           ? { minWidth: '100px', maxWidth: '150px' }
//                           : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                           ? { minWidth: '180px', maxWidth: '220px' }
//                           : {}
//                       }
//                     >
//                       {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                         ? formatDate(plan[col])
//                         : col === 'versionCode'
//                         ? (
//                           <input
//                             type="text"
//                             value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
//                             autoFocus={editingVersionCodeIdx === idx}
//                             onClick={e => {
//                               e.stopPropagation();
//                               setEditingVersionCodeIdx(idx);
//                               setEditingVersionCodeValue(plan.versionCode || '');
//                             }}
//                             onChange={e => setEditingVersionCodeValue(e.target.value)}
//                             onBlur={() => {
//                               if (editingVersionCodeIdx === idx) {
//                                 setIsActionLoading(true);
//                                 handleVersionCodeChange(idx, editingVersionCodeValue);
//                                 setEditingVersionCodeIdx(null);
//                               }
//                             }}
//                             onKeyDown={e => {
//                               if (e.key === 'Enter') {
//                                 setIsActionLoading(true);
//                                 handleVersionCodeChange(idx, editingVersionCodeValue);
//                                 setEditingVersionCodeIdx(null);
//                               } else if (e.key === 'Escape') {
//                                 setEditingVersionCodeIdx(null);
//                               }
//                             }}
//                             className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
//                               !plan.plType || !plan.version ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                             }`}
//                             style={{ minWidth: 60, maxWidth: 120 }}
//                             disabled={!plan.plType || !plan.version}
//                             placeholder="Enter Version Code"
//                           />
//                         )
//                         : typeof plan[col] === 'boolean'
//                         ? (
//                           <input
//                             type="checkbox"
//                             checked={getCheckboxProps(plan, col, idx).checked}
//                             disabled={getCheckboxProps(plan, col, idx).disabled}
//                             onClick={e => e.stopPropagation()}
//                             onChange={() => handleCheckboxChange(idx, col)}
//                             className="cursor-pointer"
//                           />
//                         )
//                         : plan[col] || ''}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => {
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//           onPlanCreated={() => {
//             fetchPlans();
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';
// import { formatDate } from './utils';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// // const formatDate = (dateStr) => {
// //   if (!dateStr) return '';
// //   try {
// //     const date = new Date(dateStr);
// //     if (isNaN(date.getTime())) return dateStr; // Return original if invalid date
// //     const month = String(date.getMonth() + 1).padStart(2, "0");
// //     const day = String(date.getDate()).padStart(2, "0");
// //     const year = date.getFullYear();
// //     const hours = String(date.getHours()).padStart(2, "0");
// //     const minutes = String(date.getMinutes()).padStart(2, "0");
// //     const seconds = String(date.getSeconds()).padStart(2, "0");
// //     return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds}`;
// //   } catch (e) {
// //     return dateStr; // Return original if parsing fails
// //   }
// // };

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);
//   const [editingVersionCodeIdx, setEditingVersionCodeIdx] = useState(null);
//   const [editingVersionCodeValue, setEditingVersionCodeValue] = useState('');

//   const rowRefs = useRef({});

//   // Helper function to detect if projectId is a child project ID
//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

// //   const fetchPlans = async (expectedVersion = null, expectedPlType = null, retries = 3, delay = 500) => {
// //     if (!projectId) {
// //       setError('Project ID is required');
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       setPlans([]);
// //       let attempts = 0;
// //       let sortedPlans = [];
// //       while (attempts < retries) {
// //         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
// //         if (!Array.isArray(response.data)) {
// //           setError('Invalid response format from API');
// //           setLoading(false);
// //           return;
// //         }
// //         // const transformedPlans = response.data.map((plan, idx) => ({
// //         //   plId: plan.plId || plan.id || 0,
// //         //   projId: plan.projId || projectId,
// //         //   plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
// //         //   source: plan.source || '',
// //         //   type: plan.type || '',
// //         //   version: plan.version || 0,
// //         //   versionCode: plan.versionCode || '',
// //         //   finalVersion: !!plan.finalVersion,
// //         //   isCompleted: !!plan.isCompleted,
// //         //   isApproved: !!plan.isApproved,
// //         //   status: plan.plType && plan.version ? (plan.status || 'Working') : '',
// //         //   closedPeriod: plan.closedPeriod || '',
// //         //   createdAt: plan.createdAt || '',
// //         //   updatedAt: plan.updatedAt || '',
// //         //   modifiedBy: plan.modifiedBy || '',
// //         //   approvedBy: plan.approvedBy || '',
// //         //   createdBy: plan.createdBy || '',
// //         //   templateId: plan.templateId || 0,
// //         // }));
// //         const transformedPlans = response.data.map((plan, idx) => ({
// //   plId: plan.plId || plan.id || 0,
// //   projId: plan.projId || projectId,
// //   plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
// //   source: plan.source || '',
// //   type: plan.type || '',
// //   version: plan.version || 0,
// //   versionCode: plan.versionCode || '',
// //   finalVersion: !!plan.finalVersion,
// //   isCompleted: !!plan.isCompleted,
// //   isApproved: !!plan.isApproved,
// //   status: plan.plType && plan.version ? (plan.status || 'Working') : '',
// //   closedPeriod: plan.closedPeriod || '',
// //   createdAt: plan.createdAt || '',
// //   updatedAt: plan.updatedAt || '',
// //   modifiedBy: plan.modifiedBy || '',
// //   approvedBy: plan.approvedBy || '',
// //   createdBy: plan.createdBy || '',
// //   templateId: plan.templateId || 0,
// //   // Title plate fields
// //   projName: plan.name || '',
// //   projTypeDc: plan.description || '',
// //   orgId: plan.orgId || '',
// //   startDate: plan.startDate || '',
// //   endDate: plan.endDate || '',
// //   fundedCost: plan.proj_f_cst_amt || '',
// //   fundedFee: plan.proj_f_fee_amt || '',
// //   fundedRev: plan.proj_f_tot_amt || '',
// //   revenueAccount: plan.revenueAccount || '',
// // }));
// //         const normalizedPlans = transformedPlans.map(plan => ({
// //           ...plan,
// //           status: plan.plType && plan.version && (plan.status === 'Approved' || plan.status === 'Completed') ? plan.status : plan.status,
// //           isCompleted: !!plan.isCompleted,
// //           finalVersion: !!plan.finalVersion,
// //           isApproved: !!plan.isApproved,
// //         }));
// //         sortedPlans = sortPlansByVersion(normalizedPlans);
// //         if (expectedVersion && expectedPlType) {
// //           const planExists = sortedPlans.some(
// //             p => p.version === expectedVersion && p.plType === expectedPlType && p.projId === projectId
// //           );
// //           if (planExists || attempts >= retries - 1) {
// //             break;
// //           }
// //           attempts++;
// //           await new Promise(resolve => setTimeout(resolve, delay));
// //         } else {
// //           break;
// //         }
// //       }

// //       // If no plans are found and it's a child project ID, create a placeholder row
// //       if (sortedPlans.length === 0 && isChildProjectId(projectId)) {
// //         sortedPlans = [{
// //           plId: `temp-${projectId}`,
// //           projId: projectId,
// //           plType: '',
// //           source: '',
// //           type: '',
// //           version: '',
// //           versionCode: '',
// //           finalVersion: false,
// //           isCompleted: false,
// //           isApproved: false,
// //           status: '',
// //           closedPeriod: '',
// //           createdAt: '',
// //           updatedAt: '',
// //           modifiedBy: '',
// //           approvedBy: '',
// //           createdBy: '',
// //           templateId: 0,
// //         }];
// //       }

// //       setPlans(sortedPlans);
// //       setColumns([
// //         'projId',
// //         'plType',
// //         'version',
// //         'versionCode',
// //         'source',
// //         'type',
// //         'isCompleted',
// //         'isApproved',
// //         'finalVersion',
// //         'status',
// //         'closedPeriod',
// //         'createdAt',
// //         'updatedAt',
// //       ]);
// //       setRefreshKey(prev => prev + 1);
// //       if (expectedVersion && expectedPlType && !sortedPlans.some(p => p.version === expectedVersion && p.plType === expectedPlType)) {
// //         toast.warn(`New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`, { toastId: 'fetch-warning' });
// //       }
// //       setError(null);
// //     } catch (err) {
// //       setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  
//   const fetchPlans = async () => {
//   if (!projectId) {
//     setPlans([]);
//     setLoading(false);
//     return;
//   }
//   setLoading(true);
//   try {
//     const response = await axios.get(
//       `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`
//     );
//     const transformedPlans = response.data.map((plan, idx) => ({
//       plId: plan.plId || plan.id || 0,
//       projId: plan.projId || projectId,
//       plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//       source: plan.source || '',
//       type: plan.type || '',
//       version: plan.version || 0,
//       versionCode: plan.versionCode || '',
//       finalVersion: !!plan.finalVersion,
//       isCompleted: !!plan.isCompleted,
//       isApproved: !!plan.isApproved,
//       status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//       closedPeriod: plan.closedPeriod || '',
//       createdAt: plan.createdAt || '',
//       updatedAt: plan.updatedAt || '',
//       modifiedBy: plan.modifiedBy || '',
//       approvedBy: plan.approvedBy || '',
//       createdBy: plan.createdBy || '',
//       templateId: plan.templateId || 0,
//       // Map API fields correctly
//       projName: plan.projName || '',
//       startDate: plan.projStartDt || '',
//       endDate: plan.projEndDt || '',
//       orgId: plan.orgId || '',
//       fundedCost: plan.proj_f_cst_amt || '',
//       fundedFee: plan.proj_f_fee_amt || '',
//       fundedRev: plan.proj_f_tot_amt || '',
//       revenueAccount: plan.revenueAccount || '',
//     }));
//     setPlans(transformedPlans);
//     // Auto-select the first plan if available
//     if (transformedPlans.length > 0 && !selectedPlan) {
//       onPlanSelect(transformedPlans[0]);
//     }
//   } catch (error) {
//     console.error('Error fetching plans:', error);
//     setPlans([]);
//     toast.error('Failed to fetch plans.');
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   useEffect(() => {
//   if (selectedPlan && rowRefs.current[selectedPlan.plId]) {
//     rowRefs.current[selectedPlan.plId].scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//   }
// }, [selectedPlan, plans]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }

//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: 'import-success-' + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }

//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'finalVersion') {
//       updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     }

//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }

//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : p
//       );
//     }

//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [ ...plans ];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;

//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//           version: plan.version,
//           versionCode: plan.versionCode || '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 1,
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//         };

//         setPlans(prevPlans => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ['None', 'Create Budget', 'Create Blank Budget'];
//     }
//     if (!plan.plType || !plan.version) {
//       return options;
//     }
//     if (plan.status === 'Working') {
//       options = ['None', 'Delete'];
//     } else if (plan.status === 'Completed') {
//       options = ['None', 'Create Budget', 'Create Blank Budget'];
//     } else if (plan.status === 'Approved') {
//       options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === 'isCompleted') {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === 'isApproved') {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   const handleTopButtonToggle = async (field) => {
//     if (!selectedPlan) {
//       toast.error(`No plan selected to update ${field}.`, { toastId: 'no-plan-selected' });
//       return;
//     }
//     const idx = plans.findIndex(p => p.plId === selectedPlan.plId);
//     if (idx === -1) {
//       toast.error(`Selected plan not found.`, { toastId: 'plan-not-found' });
//       return;
//     }
//     setIsActionLoading(true);
//     await handleCheckboxChange(idx, field);
//     setIsActionLoading(false);
//   };

//   const getTopButtonDisabled = (field) => {
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) {
//       return true;
//     }
//     if (field === 'isCompleted') {
//       return !!selectedPlan.isApproved;
//     }
//     if (field === 'isApproved') {
//       return !selectedPlan.isCompleted;
//     }
//     if (field === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && plans[checkedFinalVersionIdx].plId !== selectedPlan.plId) {
//         return true;
//       }
//       return !selectedPlan.isApproved;
//     }
//     return false;
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//  return (
//   <div className="p-4 relative z-10" key={refreshKey}>
//     {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick /> */}
//     {isActionLoading && (
//       <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//         <div className="flex items-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-sm text-gray-700">Processing...</span>
//         </div>
//       </div>
//     )}

//     {/* Combined Title Plate - Placed above buttons */}
//     {selectedPlan && (
//       <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//         <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//           <div>
//             <span className="font-semibold text-green-800">Project:</span>{" "}
//             <span className="text-gray-700">{selectedPlan.projId}</span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">Project Name:</span>{" "}
//             <span className="text-gray-700">{selectedPlan.projName}</span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">Start Date:</span>{" "}
//             <span className="text-gray-700">{formatDate(selectedPlan.projStartDt)}</span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">End Date:</span>{" "}
//             <span className="text-gray-700">{formatDate(selectedPlan.projEndDt)}</span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">Organization:</span>{" "}
//             <span className="text-gray-700">{selectedPlan.orgId}</span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
//             <span className="text-gray-700">
//               {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 0,
//               })}
//             </span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//             <span className="text-gray-700">
//               {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 0,
//               })}
//             </span>
//           </div>
//           <div>
//             <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//             <span className="text-gray-700">
//               {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 0,
//               })}
//             </span>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Buttons Section */}
//     <div className="flex justify-between items-center mb-4">
//       {/* <h2 className="text-xs font-bold">Project Plan Table</h2> */}
//       <div className="flex gap-2 items-center">
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             fileInputRef.current.click();
//           }}
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//           title="Import Plan"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//             />
//           </svg>
//           Import
//         </button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => {
//             setIsActionLoading(true);
//             handleImportPlan(e);
//           }}
//           accept=".xlsx,.xls"
//           className="hidden"
//         />
//       </div>
//     </div>

//     <div className="flex gap-2 mb-4">
//       {plans.length > 0 && (
//         <>
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//             }}
//             disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//             className={`px-3 py-1 rounded text-xs flex items-center ${
//               !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//             }`}
//             title="Create Budget"
//           >
//             Create Budget
//           </button>
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//             }}
//             disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//             className={`px-3 py-1 rounded text-xs flex items-center ${
//               !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//             }`}
//             title="Create Blank Budget"
//           >
//             Create Blank Budget
//           </button>
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//             }}
//             disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//             className={`px-3 py-1 rounded text-xs flex items-center ${
//               !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//             }`}
//             title="Create EAC"
//           >
//             Create EAC
//           </button>
//           <button
//             onClick={() => handleTopButtonToggle('isCompleted')}
//             disabled={getTopButtonDisabled('isCompleted')}
//             className={`px-3 py-1 rounded text-xs flex items-center ${
//               getTopButtonDisabled('isCompleted')
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//             }`}
//             title="Toggle Completed"
//           >
//             Completed
//           </button>
//           <button
//             onClick={() => handleTopButtonToggle('isApproved')}
//             disabled={getTopButtonDisabled('isApproved')}
//             className={`px-3 py-1 rounded text-xs flex items-center ${
//               getTopButtonDisabled('isApproved')
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//             }`}
//             title="Toggle Approved"
//           >
//             Approved
//           </button>
//           <button
//             onClick={() => handleTopButtonToggle('finalVersion')}
//             disabled={getTopButtonDisabled('finalVersion')}
//             className={`px-3 py-1 rounded text-xs flex items-center ${
//               getTopButtonDisabled('finalVersion')
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//             }`}
//             title="Toggle Final Version"
//           >
//             Final Version
//           </button>
//         </>
//       )}
//     </div>

//     {plans.length === 0 ? (
//       <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//         No project plans found for project ID: {projectId}
//       </div>
//     ) : (
//       <div className="overflow-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//         <table className="min-w-full text-xs text-left border-collapse border">
//           <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//             <tr>
//               <th className="p-2 border font-normal">Export Plan</th>
//               <th className="p-2 border font-normal">Action</th>
//               {columns.map((col) => (
//                 <th key={col} className="p-2 border font-normal">
//                   {COLUMN_LABELS[col] || col}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {plans.map((plan, idx) => (
//               <tr
//                 key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                 ref={el => { rowRefs.current[plan.plId] = el; }}
//                 className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                   selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                 }`}
//                 onClick={() => handleRowClick(plan)}
//               >
//                 <td className="p-2 border text-center">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setIsActionLoading(true);
//                       handleExportPlan(plan);
//                     }}
//                     className="text-blue-600 hover:text-blue-800"
//                     title="Export Plan"
//                     disabled={!plan.projId || !plan.version || !plan.plType}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 cursor-pointer"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
//                       />
//                     </svg>
//                   </button>
//                 </td>
//                 <td className="p-2 border">
//                   <select
//                     defaultValue="None"
//                     onClick={e => e.stopPropagation()}
//                     onChange={(e) => {
//                       setIsActionLoading(true);
//                       handleActionSelect(idx, e.target.value);
//                     }}
//                     className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                     style={{ minWidth: 140, maxWidth: 180 }}
//                   >
//                     {getActionOptions(plan).map(opt => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                 </td>
//                 {columns.map((col) => (
//                   <td
//                     key={col}
//                     className={`p-2 border font-normal ${
//                       col === "status" && plan.status === "Completed" ? "bg-yellow-100 text-black font-bold" :
//                       col === "status" && plan.status === "Working" ? "bg-red-100 text-black font-bold" :
//                       col === "status" && plan.status === "Approved" ? "bg-green-100 text-black font-bold" : ""
//                     } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''}`}
//                     style={
//                       col === 'projId'
//                         ? { minWidth: '100px', maxWidth: '150px' }
//                         : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                         ? { minWidth: '180px', maxWidth: '220px' }
//                         : {}
//                     }
//                   >
//                     {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                       ? formatDate(plan[col])
//                       : col === 'versionCode'
//                       ? (
//                         <input
//                           type="text"
//                           value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
//                           autoFocus={editingVersionCodeIdx === idx}
//                           onClick={e => {
//                             e.stopPropagation();
//                             setEditingVersionCodeIdx(idx);
//                             setEditingVersionCodeValue(plan.versionCode || '');
//                           }}
//                           onChange={e => setEditingVersionCodeValue(e.target.value)}
//                           onBlur={() => {
//                             if (editingVersionCodeIdx === idx) {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(idx, editingVersionCodeValue);
//                               setEditingVersionCodeIdx(null);
//                             }
//                           }}
//                           onKeyDown={e => {
//                             if (e.key === 'Enter') {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(idx, editingVersionCodeValue);
//                               setEditingVersionCodeIdx(null);
//                             } else if (e.key === 'Escape') {
//                               setEditingVersionCodeIdx(null);
//                             }
//                           }}
//                           className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
//                             !plan.plType || !plan.version ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                           }`}
//                           style={{ minWidth: 60, maxWidth: 120 }}
//                           disabled={!plan.plType || !plan.version}
//                         />
//                       )
//                       : typeof plan[col] === 'boolean'
//                       ? (
//                         <input
//                           type="checkbox"
//                           checked={getCheckboxProps(plan, col, idx).checked}
//                           disabled={getCheckboxProps(plan, col, idx).disabled}
//                           onClick={e => e.stopPropagation()}
//                           onChange={() => handleCheckboxChange(idx, col)}
//                           className="cursor-pointer"
//                         />
//                       )
//                       : plan[col] || ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//     {showForm && (
//       <ProjectPlanForm
//         projectId={projectId}
//         onClose={() => {
//           setShowForm(false);
//           setIsActionLoading(false);
//         }}
//         onPlanCreated={() => {
//           fetchPlans();
//           setShowForm(false);
//           setIsActionLoading(false);
//         }}
//       />
//     )}
//   </div>
// );


// };

// export default ProjectPlanTable;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// const formatDate = (dateStr) => {
//   if (!dateStr) return '';
//   try {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr;
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
//   } catch (e) {
//     return dateStr;
//   }
// };

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [projectDetails, setProjectDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);
//   const [editingVersionCodeIdx, setEditingVersionCodeIdx] = useState(null);
//   const [editingVersionCodeValue, setEditingVersionCodeValue] = useState('');
//   const rowRefs = useRef({});

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async (expectedVersion = null, expectedPlType = null, retries = 3, delay = 500) => {
//     if (!projectId) {
//       setError('Project ID is required');
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setPlans([]);
//       let attempts = 0;
//       let sortedPlans = [];
//       while (attempts < retries) {
//         const response = await axios.get(`https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`);
//         if (!Array.isArray(response.data)) {
//           setError('Invalid response format from API');
//           setLoading(false);
//           return;
//         }
//         const transformedPlans = response.data.map((plan, idx) => ({
//           plId: plan.plId || plan.id || 0,
//           projId: plan.projId || projectId,
//           plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//           source: plan.source || '',
//           type: plan.type || '',
//           version: plan.version || 0,
//           versionCode: plan.versionCode || '',
//           finalVersion: !!plan.finalVersion,
//           isCompleted: !!plan.isCompleted,
//           isApproved: !!plan.isApproved,
//           status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//           closedPeriod: plan.closedPeriod || '',
//           createdAt: plan.createdAt || '',
//           updatedAt: plan.updatedAt || '',
//           modifiedBy: plan.modifiedBy || '',
//           approvedBy: plan.approvedBy || '',
//           createdBy: plan.createdBy || '',
//           templateId: plan.templateId || 0,
//           projName: plan.name || '',
//           projTypeDc: plan.description || '',
//           orgId: plan.orgId || '',
//           startDate: plan.startDate || '',
//           endDate: plan.endDate || '',
//           fundedCost: plan.proj_f_cst_amt || '',
//           fundedRev: plan.proj_f_tot_amt || '',
//           revenueAccount: plan.revenueAccount || '',
//         }));
//         const normalizedPlans = transformedPlans.map(plan => ({
//           ...plan,
//           status: plan.plType && plan.version && (plan.status === 'Approved' || plan.status === 'Completed') ? plan.status : plan.status,
//           isCompleted: !!plan.isCompleted,
//           finalVersion: !!plan.finalVersion,
//           isApproved: !!plan.isApproved,
//         }));
//         sortedPlans = sortPlansByVersion(normalizedPlans);
//         if (expectedVersion && expectedPlType) {
//           const planExists = sortedPlans.some(
//             p => p.version === expectedVersion && p.plType === expectedPlType && p.projId === projectId
//           );
//           if (planExists || attempts >= retries - 1) {
//             break;
//           }
//           attempts++;
//           await new Promise(resolve => setTimeout(resolve, delay));
//         } else {
//           break;
//         }
//       }

//       if (sortedPlans.length === 0 && isChildProjectId(projectId)) {
//         sortedPlans = [{
//           plId: `temp-${projectId}`,
//           projId: projectId,
//           plType: '',
//           source: '',
//           type: '',
//           version: '',
//           versionCode: '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: '',
//           closedPeriod: '',
//           createdAt: '',
//           updatedAt: '',
//           modifiedBy: '',
//           approvedBy: '',
//           createdBy: '',
//           templateId: 0,
//           projName: '',
//           projTypeDc: '',
//           orgId: '',
//           startDate: '',
//           endDate: '',
//           fundedCost: '',
//           fundedRev: '',
//           revenueAccount: '',
//         }];
//       }

//       if (sortedPlans.length > 0) {
//         setProjectDetails({
//           projId: sortedPlans[0].projId,
//           projName: sortedPlans[0].projName,
//           projTypeDc: sortedPlans[0].projTypeDc,
//           orgId: sortedPlans[0].orgId,
//           startDate: sortedPlans[0].startDate,
//           endDate: sortedPlans[0].endDate,
//           fundedCost: sortedPlans[0].fundedCost,
//           fundedRev: sortedPlans[0].fundedRev,
//         });
//       }

//       setPlans(sortedPlans);
//       setColumns([
//         'projId',
//         'plType',
//         'version',
//         'versionCode',
//         'source',
//         'type',
//         'isCompleted',
//         'isApproved',
//         'finalVersion',
//         'status',
//         'closedPeriod',
//         'createdAt',
//         'updatedAt',
//       ]);
//       setRefreshKey(prev => prev + 1);
//       if (expectedVersion && expectedPlType && !sortedPlans.some(p => p.version === expectedVersion && p.plType === expectedPlType)) {
//         toast.warn(`New plan (version: ${expectedVersion}, type: ${expectedPlType}) not found in fetched plans.`, { toastId: 'fetch-warning' });
//       }
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to fetch project plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   useEffect(() => {
//     if (selectedPlan && rowRefs.current[selectedPlan.plId]) {
//       rowRefs.current[selectedPlan.plId].scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [selectedPlan, plans]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }

//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }

//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);

//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) {
//           extractedVersion = versionMatch[1];
//         }
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) {
//         setLastImportedVersion(extractedVersion);
//       }
//       setLastImportTime(Date.now());

//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         {
//           toastId: 'import-success-' + Date.now(),
//           autoClose: 5000,
//         }
//       );

//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) {
//           errorMessage = err.response.data;
//         } else if (err.response.data?.message) {
//           errorMessage = err.response.data.message;
//         } else if (err.response.data) {
//           errorMessage = JSON.stringify(err.response.data);
//         } else if (err.response.status === 500) {
//           errorMessage =
//             'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//         }
//       } else {
//         errorMessage = err.message || errorMessage;
//       }
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;

//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }

//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }

//     let updated = { ...plan };
//     updated[field] = !plan[field];

//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) {
//         updated.finalVersion = false;
//       }
//     }

//     if (field === 'finalVersion') {
//       updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     }

//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }

//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : { ...p, finalVersion: false }
//       );
//     } else {
//       newPlans = plans.map((p, i) =>
//         i === idx ? updated : p
//       );
//     }

//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }

//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);

//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [ ...plans ];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan =>
//       plan.plId === planId ? updated : plan
//     );
//     setPlans(sortPlansByVersion(newPlans));

//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;

//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//           version: plan.version,
//           versionCode: plan.versionCode || '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 1,
//           projName: plan.projName || '',
//           projTypeDc: plan.projTypeDc || '',
//           orgId: plan.orgId || '',
//           startDate: plan.startDate || '',
//           endDate: plan.endDate || '',
//           fundedCost: plan.fundedCost || '',
//           fundedRev: plan.fundedRev || '',
//           revenueAccount: plan.revenueAccount || '',
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);

//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;

//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//           projName: newPlanData.name || '',
//           projTypeDc: newPlanData.description || '',
//           orgId: newPlanData.orgId || '',
//           startDate: newPlanData.startDate || '',
//           endDate: newPlanData.endDate || '',
//           fundedCost: newPlanData.proj_f_cst_amt || '',
//           fundedRev: newPlanData.proj_f_tot_amt || '',
//           revenueAccount: newPlanData.revenueAccount || '',
//         };

//         setPlans(prevPlans => {
//           const updatedPlans = [...prevPlans, transformedNewPlan];
//           return sortPlansByVersion(updatedPlans);
//         });
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ['None', 'Create Budget', 'Create Blank Budget'];
//     }
//     if (!plan.plType || !plan.version) {
//       return options;
//     }
//     if (plan.status === 'Working') {
//       options = ['None', 'Delete'];
//     } else if (plan.status === 'Completed') {
//       options = ['None', 'Create Budget', 'Create Blank Budget'];
//     } else if (plan.status === 'Approved') {
//       options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     }
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) {
//       return { checked: false, disabled: true };
//     }
//     if (col === 'isCompleted') {
//       return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     }
//     if (col === 'isApproved') {
//       return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     }
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) {
//         return { checked: false, disabled: true };
//       }
//       return {
//         checked: plan.finalVersion,
//         disabled: !plan.isApproved,
//       };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   const handleTopButtonToggle = async (field) => {
//     if (!selectedPlan) {
//       toast.error(`No plan selected to update ${field}.`, { toastId: 'no-plan-selected' });
//       return;
//     }
//     const idx = plans.findIndex(p => p.plId === selectedPlan.plId);
//     if (idx === -1) {
//       toast.error(`Selected plan not found.`, { toastId: 'plan-not-found' });
//       return;
//     }
//     setIsActionLoading(true);
//     await handleCheckboxChange(idx, field);
//     setIsActionLoading(false);
//   };

//   const getTopButtonDisabled = (field) => {
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) {
//       return true;
//     }
//     if (field === 'isCompleted') {
//       return !!selectedPlan.isApproved;
//     }
//     if (field === 'isApproved') {
//       return !selectedPlan.isCompleted;
//     }
//     if (field === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && plans[checkedFinalVersionIdx].plId !== selectedPlan.plId) {
//         return true;
//       }
//       return !selectedPlan.isApproved;
//     }
//     return false;
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}
//       {/* {projectDetails && (
//         <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//           <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//             <div>
//               <span className="font-semibold text-green-800">Project:</span>{" "}
//               <span className="text-gray-700">{projectDetails.projId}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Project Name:</span>{" "}
//               <span className="text-gray-700">{projectDetails.projName}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Start Date:</span>{" "}
//               <span className="text-gray-700">{formatDate(projectDetails.startDate)}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">End Date:</span>{" "}
//               <span className="text-gray-700">{formatDate(projectDetails.endDate)}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Description:</span>{" "}
//               <span className="text-gray-700">{projectDetails.projTypeDc}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Organization:</span>{" "}
//               <span className="text-gray-700">{projectDetails.orgId}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//               <span className="text-gray-700">
//                 {Number(projectDetails.fundedCost).toLocaleString("en-US", {
//                   minimumFractionDigits: 0,
//                   maximumFractionDigits: 0,
//                 })}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//               <span className="text-gray-700">
//                 {Number(projectDetails.fundedRev).toLocaleString("en-US", {
//                   minimumFractionDigits: 0,
//                   maximumFractionDigits: 0,
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>
//       )} */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isCompleted')}
//               disabled={getTopButtonDisabled('isCompleted')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isCompleted')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Completed"
//             >
//               Completed
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isApproved')}
//               disabled={getTopButtonDisabled('isApproved')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isApproved')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Approved"
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('finalVersion')}
//               disabled={getTopButtonDisabled('finalVersion')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('finalVersion')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Final Version"
//             >
//               Final Version
//             </button>
//           </>
//         )}
//       </div>
//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div className="overflow-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                   ref={el => { rowRefs.current[plan.plId] = el; }}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={e => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map(opt => (
//                         <option key={opt} value={opt}>{opt}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed" ? "bg-yellow-100 text-black font-bold" :
//                         col === "status" && plan.status === "Working" ? "bg-red-100 text-black font-bold" :
//                         col === "status" && plan.status === "Approved" ? "bg-green-100 text-black font-bold" : ""
//                       } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''}`}
//                       style={
//                         col === 'projId'
//                           ? { minWidth: '100px', maxWidth: '150px' }
//                           : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                           ? { minWidth: '180px', maxWidth: '220px' }
//                           : {}
//                       }
//                     >
//                       {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                         ? formatDate(plan[col])
//                         : col === 'versionCode'
//                         ? (
//                           <input
//                             type="text"
//                             value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
//                             autoFocus={editingVersionCodeIdx === idx}
//                             onClick={e => {
//                               e.stopPropagation();
//                               setEditingVersionCodeIdx(idx);
//                               setEditingVersionCodeValue(plan.versionCode || '');
//                             }}
//                             onChange={(e) => setEditingVersionCodeValue(e.target.value)}
//                             onBlur={async () => {
//                               await handleVersionCodeChange(idx, editingVersionCodeValue);
//                               setEditingVersionCodeIdx(null);
//                             }}
//                             onKeyDown={async (e) => {
//                               if (e.key === 'Enter') {
//                                 await handleVersionCodeChange(idx, editingVersionCodeValue);
//                                 setEditingVersionCodeIdx(null);
//                               }
//                             }}
//                             className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         )
//                         : BOOLEAN_FIELDS.includes(col)
//                         ? (
//                           <input
//                             type="checkbox"
//                             {...getCheckboxProps(plan, col, idx)}
//                             onChange={(e) => {
//                               e.stopPropagation();
//                               handleCheckboxChange(idx, col);
//                             }}
//                             onClick={e => e.stopPropagation()}
//                             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                           />
//                         )
//                         : plan[col] || ''
//                       }
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => setShowForm(false)}
//           onSave={() => {
//             setShowForm(false);
//             fetchPlans();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProjectPlanForm from './ProjectPlanForm';
// import { formatDate } from './utils';

// const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

// const COLUMN_LABELS = {
//   projId: 'Project ID',
//   plType: 'Plan Type',
//   version: 'Version',
//   versionCode: 'Version Code',
//   source: 'Source',
//   type: 'Type',
//   finalVersion: 'Final Version',
//   isCompleted: 'Completed',
//   isApproved: 'Approved',
//   status: 'Status',
//   closedPeriod: 'Closed Period',
//   createdAt: 'Created At',
//   updatedAt: 'Updated At',
// };

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear }) => {
//   const [plans, setPlans] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const fileInputRef = useRef(null);
//   const [lastImportedVersion, setLastImportedVersion] = useState(null);
//   const [lastImportTime, setLastImportTime] = useState(null);
//   const [editingVersionCodeIdx, setEditingVersionCodeIdx] = useState(null);
//   const [editingVersionCodeValue, setEditingVersionCodeValue] = useState('');

//   const rowRefs = useRef({});

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   const sortPlansByVersion = (plansArr) => {
//     return [...plansArr].sort((a, b) => {
//       const aVer = a.version ? (isNaN(Number(a.version)) ? a.version : Number(a.version)) : '';
//       const bVer = b.version ? (isNaN(Number(b.version)) ? b.version : Number(b.version)) : '';
//       if (aVer < bVer) return -1;
//       if (aVer > bVer) return 1;
//       return 0;
//     });
//   };

//   const fetchPlans = async () => {
//     if (!projectId) {
//       setPlans([]);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`
//       );
//       console.log('API Response:', response.data); // Debug log
//       const transformedPlans = response.data.map((plan, idx) => ({
//         plId: plan.plId || plan.id || 0,
//         projId: plan.projId || projectId,
//         plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//         source: plan.source || '',
//         type: plan.type || '',
//         version: plan.version || 0,
//         versionCode: plan.versionCode || '',
//         finalVersion: !!plan.finalVersion,
//         isCompleted: !!plan.isCompleted,
//         isApproved: !!plan.isApproved,
//         status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//         closedPeriod: plan.closedPeriod || '',
//         createdAt: plan.createdAt || '',
//         updatedAt: plan.updatedAt || '',
//         modifiedBy: plan.modifiedBy || '',
//         approvedBy: plan.approvedBy || '',
//         createdBy: plan.createdBy || '',
//         templateId: plan.templateId || 0,
//         // Map API fields to match title plate
//         projName: plan.projName || '',
//         projStartDt: plan.projStartDt || '',
//         projEndDt: plan.projEndDt || '',
//         orgId: plan.orgId || '',
//         fundedCost: plan.proj_f_cst_amt || '',
//         fundedFee: plan.proj_f_fee_amt || '',
//         fundedRev: plan.proj_f_tot_amt || '',
//         revenueAccount: plan.revenueAccount || '',
//       }));
//       console.log('Transformed Plans:', transformedPlans); // Debug log
//       setPlans(transformedPlans);
//       setColumns([
//         'projId',
//         'plType',
//         'version',
//         'versionCode',
//         'source',
//         'type',
//         'isCompleted',
//         'isApproved',
//         'finalVersion',
//         'status',
//         'closedPeriod',
//         'createdAt',
//         'updatedAt',
//       ]);
//       if (transformedPlans.length > 0 && !selectedPlan) {
//         onPlanSelect(transformedPlans[0]);
//       }
//     } catch (error) {
//       console.error('Error fetching plans:', error.response?.data || error.message);
//       setPlans([]);
//       toast.error('Failed to fetch plans.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   useEffect(() => {
//     if (selectedPlan && rowRefs.current[selectedPlan.plId]) {
//       rowRefs.current[selectedPlan.plId].scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [selectedPlan, plans]);

//   const handleRowClick = (plan) => {
//     if (selectedPlan && selectedPlan.plId === plan.plId) {
//       onPlanSelect(null);
//     } else {
//       onPlanSelect(plan);
//     }
//   };

//   const handleExportPlan = async (plan) => {
//     if (!plan.projId || !plan.version || !plan.plType) {
//       toast.error('Missing required parameters for export');
//       return;
//     }
//     try {
//       setIsActionLoading(true);
//       toast.info('Exporting plan...');
//       const response = await axios.get(
//         `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
//         {
//           params: {
//             projId: plan.projId,
//             version: plan.version,
//             type: plan.plType,
//           },
//           responseType: 'blob',
//         }
//       );
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//       toast.success('Plan exported successfully!');
//     } catch (err) {
//       toast.error('Error exporting plan: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleImportPlan = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }
//     const validExtensions = ['.xlsx', '.xls'];
//     const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
//     if (!validExtensions.includes(fileExtension)) {
//       toast.error('Invalid file format. Please upload an Excel file (.xlsx or .xls)');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('projId', projectId);
//     try {
//       setIsActionLoading(true);
//       toast.info('Importing plan...');
//       const response = await axios.post(
//         'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );
//       let extractedVersion = null;
//       if (typeof response.data === 'string') {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) extractedVersion = versionMatch[1];
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) setLastImportedVersion(extractedVersion);
//       setLastImportTime(Date.now());
//       toast.success(
//         response.data && typeof response.data === 'string'
//           ? response.data
//           : JSON.stringify(response.data),
//         { toastId: 'import-success-' + Date.now(), autoClose: 5000 }
//       );
//       await fetchPlans();
//     } catch (err) {
//       let errorMessage = 'Failed to import plan. Please check the file and project ID, or contact support.';
//       if (err.response) {
//         if (typeof err.response.data === 'string' && err.response.data) errorMessage = err.response.data;
//         else if (err.response.data?.message) errorMessage = err.response.data.message;
//         else if (err.response.data) errorMessage = JSON.stringify(err.response.data);
//         else if (err.response.status === 500) errorMessage = 'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
//       } else errorMessage = err.message || errorMessage;
//       toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const handleCheckboxChange = async (idx, field) => {
//     const prevPlans = [...plans];
//     const plan = plans[idx];
//     const planId = plan.plId;
//     if (!plan.plType || !plan.version) {
//       toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'isApproved' && !plan.isCompleted) {
//       toast.error("You can't approve this row until Completed is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     if (field === 'finalVersion' && !plan.isApproved) {
//       toast.error("You can't set Final Version until Approved is checked", { toastId: 'checkbox-error' });
//       return;
//     }
//     let updated = { ...plan };
//     updated[field] = !plan[field];
//     if (field === 'isCompleted') {
//       updated.status = updated.isCompleted ? 'Completed' : 'Working';
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }
//     if (field === 'isApproved') {
//       updated.status = updated.isApproved ? 'Approved' : 'Completed';
//       if (!updated.isApproved) updated.finalVersion = false;
//     }
//     if (field === 'finalVersion') updated.status = updated.finalVersion ? 'Completed' : 'Approved';
//     let newPlans;
//     if (field === 'isCompleted' && !updated.isCompleted) {
//       const isEAC = updated.plType === 'EAC';
//       const workingCount = plans.filter(p => p.status === 'Working' && p.plType === updated.plType).length;
//       if (workingCount > 0 && updated.status === 'Working') {
//         toast.error(`Only one ${isEAC ? 'EAC' : 'BUD'} plan can have Working status at a time.`, { toastId: 'checkbox-error' });
//         return;
//       }
//     }
//     if (field === 'finalVersion' && updated.finalVersion) {
//       newPlans = plans.map((p, i) => (i === idx ? updated : { ...p, finalVersion: false }));
//     } else {
//       newPlans = plans.map((p, i) => (i === idx ? updated : p));
//     }
//     if (updated.status === 'Working') {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === 'Working' && p.plType === updated.plType
//           ? { ...p, status: 'Completed', isCompleted: true }
//           : p
//       );
//     }
//     setPlans(sortPlansByVersion(newPlans));
//     onPlanSelect(updated);
//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   const handleVersionCodeChange = async (idx, value) => {
//     const prevPlans = [...plans];
//     const planId = plans[idx].plId;
//     let updated = { ...plans[idx], versionCode: value };
//     const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
//     setPlans(sortPlansByVersion(newPlans));
//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info('Updating version code...', { toastId: 'version-code-info' });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(sortPlansByVersion(prevPlans));
//         toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//       } finally {
//         setIsActionLoading(false);
//       }
//     }
//   };

//   const handleActionSelect = async (idx, action) => {
//     const plan = plans[idx];
//     if (action === 'None') return;
//     try {
//       setIsActionLoading(true);
//       if (action === 'Delete') {
//         if (!plan.plId || Number(plan.plId) <= 0) {
//           toast.error('Cannot delete: Invalid plan ID.');
//           return;
//         }
//         const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//         toast.info('Deleting plan...');
//         try {
//           await axios.delete(deleteUrl);
//           toast.success('Plan deleted successfully!');
//         } catch (err) {
//           if (err.response && err.response.status === 404) {
//             toast.error('Plan not found on server. It may have already been deleted.');
//           } else {
//             toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//           }
//         }
//         await fetchPlans();
//       } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//         const payloadTemplate = {
//           projId: plan.projId,
//           plId: plan.plId || 0,
//           plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//           source: plan.source || '',
//           type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//           version: plan.version,
//           versionCode: plan.versionCode || '',
//           finalVersion: false,
//           isCompleted: false,
//           isApproved: false,
//           status: 'Working',
//           createdBy: plan.createdBy || 'User',
//           modifiedBy: plan.modifiedBy || 'User',
//           approvedBy: '',
//           templateId: plan.templateId || 1,
//         };
//         toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);
//         const response = await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//           payloadTemplate
//         );
//         const newPlanData = response.data;
//         const transformedNewPlan = {
//           ...newPlanData,
//           plId: newPlanData.plId || newPlanData.id,
//           plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//           source: newPlanData.source || '',
//           type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
//           version: newPlanData.version,
//           versionCode: newPlanData.versionCode,
//           finalVersion: !!newPlanData.finalVersion,
//           isCompleted: !!newPlanData.isCompleted,
//           isApproved: !!newPlanData.isApproved,
//           status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//           closedPeriod: newPlanData.closedPeriod || '',
//           createdAt: newPlanData.createdAt || '',
//           updatedAt: newPlanData.updatedAt || '',
//           modifiedBy: newPlanData.modifiedBy || '',
//           approvedBy: newPlanData.approvedBy || '',
//           createdBy: newPlanData.createdBy || '',
//           templateId: newPlanData.templateId || 0,
//         };
//         setPlans(prevPlans => sortPlansByVersion([...prevPlans, transformedNewPlan]));
//         toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//       } else {
//         toast.info(`Action "${action}" selected (API call not implemented)`);
//       }
//     } catch (err) {
//       toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getActionOptions = (plan) => {
//     let options = ['None'];
//     if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
//       return ['None', 'Create Budget', 'Create Blank Budget'];
//     }
//     if (!plan.plType || !plan.version) return options;
//     if (plan.status === 'Working') options = ['None', 'Delete'];
//     else if (plan.status === 'Completed') options = ['None', 'Create Budget', 'Create Blank Budget'];
//     else if (plan.status === 'Approved') options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

//   const getCheckboxProps = (plan, col, idx) => {
//     if (!plan.plType || !plan.version) return { checked: false, disabled: true };
//     if (col === 'isCompleted') return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//     if (col === 'isApproved') return { checked: plan.isApproved, disabled: !plan.isCompleted };
//     if (col === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) return { checked: false, disabled: true };
//       return { checked: plan.finalVersion, disabled: !plan.isApproved };
//     }
//     return { checked: plan[col], disabled: false };
//   };

//   const handleTopButtonToggle = async (field) => {
//     if (!selectedPlan) {
//       toast.error(`No plan selected to update ${field}.`, { toastId: 'no-plan-selected' });
//       return;
//     }
//     const idx = plans.findIndex(p => p.plId === selectedPlan.plId);
//     if (idx === -1) {
//       toast.error(`Selected plan not found.`, { toastId: 'plan-not-found' });
//       return;
//     }
//     setIsActionLoading(true);
//     await handleCheckboxChange(idx, field);
//     setIsActionLoading(false);
//   };

//   const getTopButtonDisabled = (field) => {
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) return true;
//     if (field === 'isCompleted') return !!selectedPlan.isApproved;
//     if (field === 'isApproved') return !selectedPlan.isCompleted;
//     if (field === 'finalVersion') {
//       if (checkedFinalVersionIdx !== -1 && plans[checkedFinalVersionIdx].plId !== selectedPlan.plId) return true;
//       return !selectedPlan.isApproved;
//     }
//     return false;
//   };

//   if (loading) {
//     return (
//       <div className="p-4">
//         <div className="flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2">Loading project plans...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 relative z-10" key={refreshKey}>
//       {isActionLoading && (
//         <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2 text-sm text-gray-700">Processing...</span>
//           </div>
//         </div>
//       )}

//       {selectedPlan && (
//         <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//           <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//             <div>
//               <span className="font-semibold text-green-800">Project:</span>{" "}
//               <span className="text-gray-700">{selectedPlan.projId}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Project Name:</span>{" "}
//               <span className="text-gray-700">{selectedPlan.projName}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Start Date:</span>{" "}
//               <span className="text-gray-700">{formatDate(selectedPlan.projStartDt)}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">End Date:</span>{" "}
//               <span className="text-gray-700">{formatDate(selectedPlan.projEndDt)}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Organization:</span>{" "}
//               <span className="text-gray-700">{selectedPlan.orgId}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
//               <span className="text-gray-700">
//                 {Number(selectedPlan.fundedFee).toLocaleString("en-US", {
//                   minimumFractionDigits: 0,
//                   maximumFractionDigits: 0,
//                 })}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//               <span className="text-gray-700">
//                 {Number(selectedPlan.fundedCost).toLocaleString("en-US", {
//                   minimumFractionDigits: 0,
//                   maximumFractionDigits: 0,
//                 })}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//               <span className="text-gray-700">
//                 {Number(selectedPlan.fundedRev).toLocaleString("en-US", {
//                   minimumFractionDigits: 0,
//                   maximumFractionDigits: 0,
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-2 items-center">
//           <button
//             onClick={() => {
//               setIsActionLoading(true);
//               fileInputRef.current.click();
//             }}
//             className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//             title="Import Plan"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             Import
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => {
//               setIsActionLoading(true);
//               handleImportPlan(e);
//             }}
//             accept=".xlsx,.xls"
//             className="hidden"
//           />
//         </div>
//       </div>

//       <div className="flex gap-2 mb-4">
//         {plans.length > 0 && (
//           <>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Budget"
//             >
//               Create Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create Blank Budget"
//             >
//               Create Blank Budget
//             </button>
//             <button
//               onClick={() => {
//                 setIsActionLoading(true);
//                 handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//               }}
//               disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Create EAC"
//             >
//               Create EAC
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isCompleted')}
//               disabled={getTopButtonDisabled('isCompleted')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isCompleted')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Completed"
//             >
//               Completed
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('isApproved')}
//               disabled={getTopButtonDisabled('isApproved')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('isApproved')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Approved"
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => handleTopButtonToggle('finalVersion')}
//               disabled={getTopButtonDisabled('finalVersion')}
//               className={`px-3 py-1 rounded text-xs flex items-center ${
//                 getTopButtonDisabled('finalVersion')
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//               }`}
//               title="Toggle Final Version"
//             >
//               Final Version
//             </button>
//           </>
//         )}
//       </div>

//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div className="overflow-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
//           <table className="min-w-full text-xs text-left border-collapse border">
//             <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border font-normal">Export Plan</th>
//                 <th className="p-2 border font-normal">Action</th>
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={plan.plId ? `${plan.plId}-${idx}` : idx}
//                   ref={el => { rowRefs.current[plan.plId] = el; }}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan && selectedPlan.plId === plan.plId ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
//                   }`}
//                   onClick={() => handleRowClick(plan)}
//                 >
//                   <td className="p-2 border text-center">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsActionLoading(true);
//                         handleExportPlan(plan);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Export Plan"
//                       disabled={!plan.projId || !plan.version || !plan.plType}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                   <td className="p-2 border">
//                     <select
//                       defaultValue="None"
//                       onClick={e => e.stopPropagation()}
//                       onChange={(e) => {
//                         setIsActionLoading(true);
//                         handleActionSelect(idx, e.target.value);
//                       }}
//                       className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
//                       style={{ minWidth: 140, maxWidth: 180 }}
//                     >
//                       {getActionOptions(plan).map(opt => (
//                         <option key={opt} value={opt}>{opt}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Completed" ? "bg-yellow-100 text-black font-bold" :
//                         col === "status" && plan.status === "Working" ? "bg-red-100 text-black font-bold" :
//                         col === "status" && plan.status === "Approved" ? "bg-green-100 text-black font-bold" : ""
//                       } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''}`}
//                       style={
//                         col === 'projId'
//                           ? { minWidth: '100px', maxWidth: '150px' }
//                           : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                           ? { minWidth: '180px', maxWidth: '220px' }
//                           : {}
//                       }
//                     >
//                       {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                         ? formatDate(plan[col])
//                         : col === 'versionCode'
//                         ? (
//                           <input
//                             type="text"
//                             value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
//                             autoFocus={editingVersionCodeIdx === idx}
//                             onClick={e => {
//                               e.stopPropagation();
//                               setEditingVersionCodeIdx(idx);
//                               setEditingVersionCodeValue(plan.versionCode || '');
//                             }}
//                             onChange={e => setEditingVersionCodeValue(e.target.value)}
//                             onBlur={() => {
//                               if (editingVersionCodeIdx === idx) {
//                                 setIsActionLoading(true);
//                                 handleVersionCodeChange(idx, editingVersionCodeValue);
//                                 setEditingVersionCodeIdx(null);
//                               }
//                             }}
//                             onKeyDown={e => {
//                               if (e.key === 'Enter') {
//                                 setIsActionLoading(true);
//                                 handleVersionCodeChange(idx, editingVersionCodeValue);
//                                 setEditingVersionCodeIdx(null);
//                               } else if (e.key === 'Escape') {
//                                 setEditingVersionCodeIdx(null);
//                               }
//                             }}
//                             className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
//                               !plan.plType || !plan.version ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                             }`}
//                             style={{ minWidth: 60, maxWidth: 120 }}
//                             disabled={!plan.plType || !plan.version}
//                           />
//                         )
//                         : typeof plan[col] === 'boolean'
//                         ? (
//                           <input
//                             type="checkbox"
//                             checked={getCheckboxProps(plan, col, idx).checked}
//                             disabled={getCheckboxProps(plan, col, idx).disabled}
//                             onClick={e => e.stopPropagation()}
//                             onChange={() => handleCheckboxChange(idx, col)}
//                             className="cursor-pointer"
//                           />
//                         )
//                         : plan[col] || ''}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {showForm && (
//         <ProjectPlanForm
//           projectId={projectId}
//           onClose={() => {
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//           onPlanCreated={() => {
//             fetchPlans();
//             setShowForm(false);
//             setIsActionLoading(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectPlanTable;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectPlanForm from './ProjectPlanForm';
import { formatDate } from './utils';

const BOOLEAN_FIELDS = ['finalVersion', 'isCompleted', 'isApproved'];

const COLUMN_LABELS = {
  projId: 'Project ID',
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

const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear, setFiscalYear,
  fiscalYearOptions }) => {
  const [plans, setPlans] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const fileInputRef = useRef(null);
  const [lastImportedVersion, setLastImportedVersion] = useState(null);
  const [lastImportTime, setLastImportTime] = useState(null);
  const [editingVersionCodeIdx, setEditingVersionCodeIdx] = useState(null);
  const [editingVersionCodeValue, setEditingVersionCodeValue] = useState('');

  const rowRefs = useRef({});

  const isChildProjectId = (projId) => {
    return projId && typeof projId === 'string' && projId.includes('.');
  };

  // Add this function at the top of ProjectPlanTable component
const formatDateWithTime = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    // Format: MM/DD/YYYY HH:MM:SS AM/PM
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  } catch (e) {
    return dateStr;
  }
};

  

  const fetchPlans = async () => {
    if (!projectId) {
      setPlans([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`
      );
      console.log('API Response:', response.data);
      const transformedPlans = response.data.map((plan, idx) => ({
        plId: plan.plId || plan.id || 0,
        projId: plan.projId || projectId,
        plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
        source: plan.source || '',
        type: plan.type || '',
        version: plan.version || 0,
        versionCode: plan.versionCode || '',
        finalVersion: !!plan.finalVersion,
        isCompleted: !!plan.isCompleted,
        isApproved: !!plan.isApproved,
        status: plan.plType && plan.version ? (plan.status || 'Working') : '',
        closedPeriod: plan.closedPeriod || '',
        createdAt: plan.createdAt || '',
        updatedAt: plan.updatedAt || '',
        modifiedBy: plan.modifiedBy || '',
        approvedBy: plan.approvedBy || '',
        createdBy: plan.createdBy || '',
        templateId: plan.templateId || 0,
        projName: plan.projName || '',
        projStartDt: plan.projStartDt || '',
        projEndDt: plan.projEndDt || '',
        orgId: plan.orgId || '',
        fundedCost: plan.proj_f_cst_amt || '',
        fundedFee: plan.proj_f_fee_amt || '',
        fundedRev: plan.proj_f_tot_amt || '',
        revenueAccount: plan.revenueAccount || '',
      }));
      console.log('Transformed Plans:', transformedPlans);
      setPlans(transformedPlans);
      setColumns([
        'projId',
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
      // if (transformedPlans.length > 0 && !selectedPlan) {
      //   onPlanSelect(transformedPlans[0]);
      // }
    } catch (error) {
      console.error('Error fetching plans:', error.response?.data || error.message);
      setPlans([]);
      toast.error('Failed to fetch plans.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [projectId]);

  useEffect(() => {
    if (selectedPlan && rowRefs.current[selectedPlan.plId]) {
      rowRefs.current[selectedPlan.plId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPlan, plans]);

  // const handleRowClick = (plan) => {
  //   // Toggle selection without clearing plans
  //   if (selectedPlan && selectedPlan.plId === plan.plId) {
  //     onPlanSelect(null); // Unselect without affecting plans
  //   } else {
  //     onPlanSelect(plan); // Select the new plan
  //   }
  // };
  
  const handleRowClick = (plan) => {
  // Only allow selection if clicking on a different plan
  if (selectedPlan && selectedPlan.plId === plan.plId) {
    onPlanSelect(null); // Unselect current plan
  } else {
    onPlanSelect(plan); // Select new plan
  }
};

  const handleExportPlan = async (plan) => {
    if (!plan.projId || !plan.version || !plan.plType) {
      toast.error('Missing required parameters for export');
      return;
    }
    try {
      setIsActionLoading(true);
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
    } finally {
      setIsActionLoading(false);
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
      setIsActionLoading(true);
      toast.info('Importing plan...');
      const response = await axios.post(
        'https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      let extractedVersion = null;
      if (typeof response.data === 'string') {
        const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
        if (versionMatch) extractedVersion = versionMatch[1];
      } else if (response.data?.version) {
        extractedVersion = response.data.version;
      }
      if (extractedVersion) setLastImportedVersion(extractedVersion);
      setLastImportTime(Date.now());
      toast.success(
        response.data && typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data),
        { toastId: 'import-success-' + Date.now(), autoClose: 5000 }
      );
      await fetchPlans();
    } catch (err) {
      let errorMessage = 'Failed to import plan. Please check the file and project ID, or contact support.';
      if (err.response) {
        if (typeof err.response.data === 'string' && err.response.data) errorMessage = err.response.data;
        else if (err.response.data?.message) errorMessage = err.response.data.message;
        else if (err.response.data) errorMessage = JSON.stringify(err.response.data);
        else if (err.response.status === 500) errorMessage = 'Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.';
      } else errorMessage = err.message || errorMessage;
      toast.error(errorMessage, { toastId: 'import-error', autoClose: 5000 });
    } finally {
      setIsActionLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCheckboxChange = async (idx, field) => {
    const prevPlans = [...plans];
    const plan = plans[idx];
    const planId = plan.plId;
    if (!plan.plType || !plan.version) {
      toast.error(`Cannot update ${field}: Plan Type and Version are required.`, { toastId: 'checkbox-error' });
      return;
    }
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
      if (!updated.isApproved) updated.finalVersion = false;
    }
    if (field === 'finalVersion') updated.status = updated.finalVersion ? 'Completed' : 'Approved';
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
      newPlans = plans.map((p, i) => (i === idx ? updated : { ...p, finalVersion: false }));
    } else {
      newPlans = plans.map((p, i) => (i === idx ? updated : p));
    }
    if (updated.status === 'Working') {
      newPlans = newPlans.map((p, i) =>
        i !== idx && p.status === 'Working' && p.plType === updated.plType
          ? { ...p, status: 'Completed', isCompleted: true }
          : p
      );
    }
    setPlans(newPlans);
    onPlanSelect(updated);
    if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
      const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
      try {
        await axios.put(updateUrl, updated);
      } catch (err) {
        // setPlans(sortPlansByVersion(prevPlans));
        setPlans(prevPlans);
        toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
      }
    }
  };

  // const handleVersionCodeChange = async (idx, value) => {
  //   const prevPlans = [...plans];
  //   const planId = plans[idx].plId;
  //   let updated = { ...plans[idx], versionCode: value };
  //   const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
  //   setPlans(sortPlansByVersion(newPlans));
  //   if (planId && Number(planId) > 0) {
  //     const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
  //     toast.info('Updating version code...', { toastId: 'version-code-info' });
  //     try {
  //       setIsActionLoading(true);
  //       await axios.put(updateUrl, updated);
  //     } catch (err) {
  //       setPlans(sortPlansByVersion(prevPlans));
  //       toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
  //     } finally {
  //       setIsActionLoading(false);
  //     }
  //   }
  // };
  
  const handleVersionCodeChange = async (idx, value) => {
  const prevPlans = [...plans];
  const planId = plans[idx].plId;
  let updated = { ...plans[idx], versionCode: value };
  
  // DON'T SORT - Keep original order
  const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
  setPlans(newPlans); // REMOVE sortPlansByVersion()
  
  if (planId && Number(planId) > 0) {
    const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
    toast.info('Updating version code...', { toastId: 'version-code-info' });
    try {
      setIsActionLoading(true);
      await axios.put(updateUrl, updated);
    } catch (err) {
      setPlans(prevPlans); // REMOVE sortPlansByVersion()
      toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
    } finally {
      setIsActionLoading(false);
    }
  }
};

  const handleActionSelect = async (idx, action) => {
    const plan = plans[idx];
    if (action === 'None') return;
    try {
      setIsActionLoading(true);
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
      } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
        const payloadTemplate = {
          projId: plan.projId,
          plId: plan.plId || 0,
          plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
          source: plan.source || '',
          type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
          version: plan.version,
          versionCode: plan.versionCode || '',
          finalVersion: false,
          isCompleted: false,
          isApproved: false,
          status: 'Working',
          createdBy: plan.createdBy || 'User',
          modifiedBy: plan.modifiedBy || 'User',
          approvedBy: '',
          templateId: plan.templateId || 1,
        };
        toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);
        const response = await axios.post(
          `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
          payloadTemplate
        );
        const newPlanData = response.data;
        const transformedNewPlan = {
          ...newPlanData,
          plId: newPlanData.plId || newPlanData.id,
          plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
          source: newPlanData.source || '',
          type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
          version: newPlanData.version,
          versionCode: newPlanData.versionCode,
          finalVersion: !!newPlanData.finalVersion,
          isCompleted: !!newPlanData.isCompleted,
          isApproved: !!newPlanData.isApproved,
          status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
          closedPeriod: newPlanData.closedPeriod || '',
          createdAt: newPlanData.createdAt || '',
          updatedAt: newPlanData.updatedAt || '',
          modifiedBy: newPlanData.modifiedBy || '',
          approvedBy: newPlanData.approvedBy || '',
          createdBy: newPlanData.createdBy || '',
          templateId: newPlanData.templateId || 0,
        };
        setPlans(prevPlans => sortPlansByVersion([...prevPlans, transformedNewPlan]));
        toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
      } else {
        toast.info(`Action "${action}" selected (API call not implemented)`);
      }
    } catch (err) {
      toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsActionLoading(false);
    }
  };

  const getActionOptions = (plan) => {
    let options = ['None'];
    if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
      return ['None', 'Create Budget', 'Create Blank Budget'];
    }
    if (!plan.plType || !plan.version) return options;
    if (plan.status === 'Working') options = ['None', 'Delete'];
    else if (plan.status === 'Completed') options = ['None', 'Create Budget', 'Create Blank Budget'];
    else if (plan.status === 'Approved') options = ['None', 'Create Budget', 'Create Blank Budget', 'Create EAC', 'Delete'];
    return options;
  };

  const getButtonAvailability = (plan, action) => {
    const options = getActionOptions(plan);
    return options.includes(action);
  };

  const checkedFinalVersionIdx = plans.findIndex(plan => plan.finalVersion);

  const getCheckboxProps = (plan, col, idx) => {
    if (!plan.plType || !plan.version) return { checked: false, disabled: true };
    if (col === 'isCompleted') return { checked: plan.isCompleted, disabled: !!plan.isApproved };
    if (col === 'isApproved') return { checked: plan.isApproved, disabled: !plan.isCompleted };
    if (col === 'finalVersion') {
      if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx) return { checked: false, disabled: true };
      return { checked: plan.finalVersion, disabled: !plan.isApproved };
    }
    return { checked: plan[col], disabled: false };
  };

  const handleTopButtonToggle = async (field) => {
    if (!selectedPlan) {
      toast.error(`No plan selected to update ${field}.`, { toastId: 'no-plan-selected' });
      return;
    }
    const idx = plans.findIndex(p => p.plId === selectedPlan.plId);
    if (idx === -1) {
      toast.error(`Selected plan not found.`, { toastId: 'plan-not-found' });
      return;
    }
    setIsActionLoading(true);
    await handleCheckboxChange(idx, field);
    setIsActionLoading(false);
  };

  const getTopButtonDisabled = (field) => {
    if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version) return true;
    if (field === 'isCompleted') return !!selectedPlan.isApproved;
    if (field === 'isApproved') return !selectedPlan.isCompleted;
    if (field === 'finalVersion') {
      if (checkedFinalVersionIdx !== -1 && plans[checkedFinalVersionIdx].plId !== selectedPlan.plId) return true;
      return !selectedPlan.isApproved;
    }
    return false;
  };

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

  return (
    <div className="p-4 relative z-10" key={refreshKey}>
      {isActionLoading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-20">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-700">Processing...</span>
          </div>
        </div>
      )}

      {/* {plans.length > 0 && (
  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <div>
        <span className="font-semibold text-green-800">Project:</span>{" "}
        <span className="text-gray-700">{projectId}</span>
      </div>
      <div>
        <span className="font-semibold text-green-800">Project Name:</span>{" "}
        <span className="text-gray-700">{plans[0]?.projName || ''}</span>
      </div>
      <div>
        <span className="font-semibold text-green-800">Start Date:</span>{" "}
        <span className="text-gray-700">{formatDate(plans[0]?.projStartDt) || ''}</span>
      </div>
      <div>
        <span className="font-semibold text-green-800">End Date:</span>{" "}
        <span className="text-gray-700">{formatDate(plans[0]?.projEndDt) || ''}</span>
      </div>
      <div>
        <span className="font-semibold text-green-800">Organization:</span>{" "}
        <span className="text-gray-700">{plans[0]?.orgId || ''}</span>
      </div>
      <div>
        <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
        <span className="text-gray-700">
          {Number(plans[0]?.fundedFee || 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
      <div>
        <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
        <span className="text-gray-700">
          {Number(plans[0]?.fundedCost || 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
      <div>
        <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
        <span className="text-gray-700">
          {Number(plans[0]?.fundedRev || 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </div>
  </div>
)} */}

      {/* <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setIsActionLoading(true);
              fileInputRef.current.click();
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
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
            onChange={(e) => {
              setIsActionLoading(true);
              handleImportPlan(e);
            }}
            accept=".xlsx,.xls"
            className="hidden"
          />
        </div>
      </div> */}

      {/* <div className="flex gap-2 mb-4">
        {plans.length > 0 && (
          <>
            <button
              onClick={() => {
                setIsActionLoading(true);
                handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
              }}
              disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              title="Create Budget"
            >
              Create Budget
            </button>
            <button
              onClick={() => {
                setIsActionLoading(true);
                handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
              }}
              disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              title="Create Blank Budget"
            >
              Create Blank Budget
            </button>
            <button
              onClick={() => {
                setIsActionLoading(true);
                handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
              }}
              disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              title="Create EAC"
            >
              Create EAC
            </button>
            <button
              onClick={() => handleTopButtonToggle('isCompleted')}
              disabled={getTopButtonDisabled('isCompleted')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                getTopButtonDisabled('isCompleted')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              title="Toggle Completed"
            >
              Completed
            </button>
            <button
              onClick={() => handleTopButtonToggle('isApproved')}
              disabled={getTopButtonDisabled('isApproved')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                getTopButtonDisabled('isApproved')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              title="Toggle Approved"
            >
              Approved
            </button>
            <button
              onClick={() => handleTopButtonToggle('finalVersion')}
              disabled={getTopButtonDisabled('finalVersion')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                getTopButtonDisabled('finalVersion')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              title="Toggle Final Version"
            >
              Final Version
            </button>
          </>
        )}
      </div> */}

      <div className="flex justify-between items-center mb-2">
  {/* LEFT SIDE - Action Buttons */}
  <div className="flex gap-2">
    {plans.length > 0 && (
      <>
        <button
          onClick={() => {
            setIsActionLoading(true);
            handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
          }}
          disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
          className={`px-3 py-1 rounded text-xs flex items-center ${
            !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          }`}
          title="Create Budget"
        >
          Create Budget
        </button>
        <button
          onClick={() => {
            setIsActionLoading(true);
            handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
          }}
          disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
          className={`px-3 py-1 rounded text-xs flex items-center ${
            !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          }`}
          title="Create Blank Budget"
        >
          Create Blank Budget
        </button>
        <button
          onClick={() => {
            setIsActionLoading(true);
            handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
          }}
          disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
          className={`px-3 py-1 rounded text-xs flex items-center ${
            !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          }`}
          title="Create EAC"
        >
          Create EAC
        </button>
        <button
          onClick={() => handleTopButtonToggle('isCompleted')}
          disabled={getTopButtonDisabled('isCompleted')}
          className={`px-3 py-1 rounded text-xs flex items-center ${
            getTopButtonDisabled('isCompleted')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          }`}
          title="Toggle Completed"
        >
          Completed
        </button>
        <button
          onClick={() => handleTopButtonToggle('isApproved')}
          disabled={getTopButtonDisabled('isApproved')}
          className={`px-3 py-1 rounded text-xs flex items-center ${
            getTopButtonDisabled('isApproved')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          }`}
          title="Toggle Approved"
        >
          Approved
        </button>
        <button
          onClick={() => handleTopButtonToggle('finalVersion')}
          disabled={getTopButtonDisabled('finalVersion')}
          className={`px-3 py-1 rounded text-xs flex items-center ${
            getTopButtonDisabled('finalVersion')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          }`}
          title="Toggle Final Version"
        >
          Final Version
        </button>
      </>
    )}
  </div>

  {/* RIGHT SIDE - Import and Fiscal Year */}
  <div className="flex items-center gap-4">
    {/* Import Button */}
    <button
      onClick={() => {
        setIsActionLoading(true);
        fileInputRef.current.click();
      }}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
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
      onChange={(e) => {
        setIsActionLoading(true);
        handleImportPlan(e);
      }}
      accept=".xlsx,.xls"
      className="hidden"
    />

    {/* Fiscal Year Dropdown */}
    <div className="flex items-center gap-2">
      <label
        htmlFor="fiscalYear"
        className="font-semibold text-xs sm:text-sm whitespace-nowrap"
      >
        Fiscal Year:
      </label>
      <select
        id="fiscalYear"
        value={fiscalYear}
        onChange={(e) => setFiscalYear(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={fiscalYearOptions?.length === 0}
      >
        {fiscalYearOptions?.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>

      {plans.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No project plans found for project ID: {projectId}
        </div>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: '400px', minHeight: '100px', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff' }}>
          <table className="min-w-full text-xs text-left border-collapse border">
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
                  key={`plan-${plan.plId || idx}-${plan.projId || 'unknown'}`}
                  ref={el => { rowRefs.current[plan.plId] = el; }}
                  className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
  selectedPlan && selectedPlan.plId === plan.plId && selectedPlan.projId === plan.projId 
    ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
}`}
                  onClick={() => handleRowClick(plan)}
                >
                  <td className="p-2 border text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsActionLoading(true);
                        handleExportPlan(plan);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Export Plan"
                      disabled={!plan.projId || !plan.version || !plan.plType}
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
                          d="M12 4v12m0 0l-3-3m3 3l3-3m-2 8H5a2 2 0 01-2-2V3a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="p-2 border">
                    <select
                      defaultValue="None"
                      onClick={e => e.stopPropagation()}
                      onChange={(e) => {
                        setIsActionLoading(true);
                        handleActionSelect(idx, e.target.value);
                      }}
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
                        col === "status" && plan.status === "Completed" ? "bg-yellow-100 text-black font-bold" :
                        col === "status" && plan.status === "Working" ? "bg-red-100 text-black font-bold" :
                        col === "status" && plan.status === "Approved" ? "bg-green-100 text-black font-bold" : ""
                      } ${col === 'projId' ? 'break-words' : ''} ${col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''}`}
                      style={
                        col === 'projId'
                          ? { minWidth: '100px', maxWidth: '150px' }
                          : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
                          ? { minWidth: '180px', maxWidth: '220px' }
                          : {}
                      }
                    >
                      {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
                        ? formatDateWithTime(plan[col])
                        : col === 'versionCode'
                        ? (
                          <input
                            type="text"
                            value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
                            autoFocus={editingVersionCodeIdx === idx}
                            onClick={e => {
                              e.stopPropagation();
                              setEditingVersionCodeIdx(idx);
                              setEditingVersionCodeValue(plan.versionCode || '');
                            }}
                            onChange={e => setEditingVersionCodeValue(e.target.value)}
                            onBlur={() => {
                              if (editingVersionCodeIdx === idx) {
                                setIsActionLoading(true);
                                handleVersionCodeChange(idx, editingVersionCodeValue);
                                setEditingVersionCodeIdx(null);
                              }
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                setIsActionLoading(true);
                                handleVersionCodeChange(idx, editingVersionCodeValue);
                                setEditingVersionCodeIdx(null);
                              } else if (e.key === 'Escape') {
                                setEditingVersionCodeIdx(null);
                              }
                            }}
                            className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
                              !plan.plType || !plan.version ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                            }`}
                            style={{ minWidth: 60, maxWidth: 120 }}
                            disabled={!plan.plType || !plan.version}
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
      {showForm && (
        <ProjectPlanForm
          projectId={projectId}
          onClose={() => {
            setShowForm(false);
            setIsActionLoading(false);
          }}
          onPlanCreated={() => {
            fetchPlans();
            setShowForm(false);
            setIsActionLoading(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectPlanTable;