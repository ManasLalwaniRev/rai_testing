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

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear, setFiscalYear,
//   fiscalYearOptions }) => {
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

//   // const rowRefs = useRef({});

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   // Add this function at the top of ProjectPlanTable component
// const formatDateWithTime = (dateStr) => {
//   if (!dateStr) return "";
//   try {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr;

//     // Format: MM/DD/YYYY HH:MM:SS AM/PM
//     return date.toLocaleString("en-US", {
//       month: "2-digit",
//       day: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true
//     });
//   } catch (e) {
//     return dateStr;
//   }
// };

// // const sortPlansByProjIdPlTypeVersion = (plansArray) => {
// //   return [...plansArray].sort((a, b) => {
// //     if (a.projId < b.projId) return -1;
// //     if (a.projId > b.projId) return 1;
// //     if (a.plType < b.plType) return -1;
// //     if (a.plType > b.plType) return 1;
// //     return (a.version || 0) - (b.version || 0);
// //   });
// // };

// // const sortPlansByProjIdPlTypeVersion = (plansArray) => {
// //   return [...plansArray].sort((a, b) => {
// //     if (a.projId < b.projId) return -1;
// //     if (a.projId > b.projId) return 1;
// //     if (a.plType < b.plType) return -1;
// //     if (a.plType > b.plType) return 1;
// //     return (a.version || 0) - (b.version || 0);
// //   });
// // };

//   const sortPlansByProjIdPlTypeVersion = (plansArray) => {
//   return [...plansArray].sort((a, b) => {
//     if (a.projId < b.projId) return -1;
//     if (a.projId > b.projId) return 1;

//     if (a.plType < b.plType) return -1;
//     if (a.plType > b.plType) return 1;

//     // Explicit numeric compare for version
//     const aVersion = Number(a.version) || 0;
//     const bVersion = Number(b.version) || 0;
//     return aVersion - bVersion;
//   });
// };

//   // const fetchPlans = async () => {
//   //   if (!projectId) {
//   //     setPlans([]);
//   //     setLoading(false);
//   //     return;
//   //   }
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.get(
//   //       `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`
//   //     );
//   //     console.log('API Response:', response.data);
//   //     const transformedPlans = response.data.map((plan, idx) => ({
//   //       plId: plan.plId || plan.id || 0,
//   //       projId: plan.projId || projectId,
//   //       plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//   //       source: plan.source || '',
//   //       type: plan.type || '',
//   //       version: plan.version || 0,
//   //       versionCode: plan.versionCode || '',
//   //       finalVersion: !!plan.finalVersion,
//   //       isCompleted: !!plan.isCompleted,
//   //       isApproved: !!plan.isApproved,
//   //       status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//   //       closedPeriod: plan.closedPeriod || '',
//   //       createdAt: plan.createdAt || '',
//   //       updatedAt: plan.updatedAt || '',
//   //       modifiedBy: plan.modifiedBy || '',
//   //       approvedBy: plan.approvedBy || '',
//   //       createdBy: plan.createdBy || '',
//   //       templateId: plan.templateId || 0,
//   //       projName: plan.projName || '',
//   //       projStartDt: plan.projStartDt || '',
//   //       projEndDt: plan.projEndDt || '',
//   //       orgId: plan.orgId || '',
//   //       fundedCost: plan.proj_f_cst_amt || '',
//   //       fundedFee: plan.proj_f_fee_amt || '',
//   //       fundedRev: plan.proj_f_tot_amt || '',
//   //       revenueAccount: plan.revenueAccount || '',
//   //     }));
//   //     console.log('Transformed Plans:', transformedPlans);
//   //     setPlans(transformedPlans);
//   //     setColumns([
//   //       'projId',
//   //       'plType',
//   //       'version',
//   //       'versionCode',
//   //       'source',
//   //       'type',
//   //       'isCompleted',
//   //       'isApproved',
//   //       'finalVersion',
//   //       'status',
//   //       'closedPeriod',
//   //       'createdAt',
//   //       'updatedAt',
//   //     ]);
//   //     // if (transformedPlans.length > 0 && !selectedPlan) {
//   //     //   onPlanSelect(transformedPlans[0]);
//   //     // }
//   //   } catch (error) {
//   //     console.error('Error fetching plans:', error.response?.data || error.message);
//   //     setPlans([]);
//   //     toast.error('Failed to fetch plans.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

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
//     console.log('API Response:', response.data);
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
//       projName: plan.projName || '',
//       projStartDt: plan.projStartDt || '',
//       projEndDt: plan.projEndDt || '',
//       orgId: plan.orgId || '',
//       fundedCost: plan.proj_f_cst_amt || '',
//       fundedFee: plan.proj_f_fee_amt || '',
//       fundedRev: plan.proj_f_tot_amt || '',
//       revenueAccount: plan.revenueAccount || '',
//     }));

//     const sortedPlans = sortPlansByProjIdPlTypeVersion(transformedPlans);  // <-- Sort here before setting state
//     console.log('Transformed & Sorted Plans:', sortedPlans);

//     setPlans(sortedPlans);
//     setColumns([
//       'projId',
//       'plType',
//       'version',
//       'versionCode',
//       'source',
//       'type',
//       'isCompleted',
//       'isApproved',
//       'finalVersion',
//       'status',
//       'closedPeriod',
//       // 'createdAt',
//       // 'updatedAt',
//     ]);
//   } catch (error) {
//     console.error('Error fetching plans:', error.response?.data || error.message);
//     setPlans([]);
//     toast.error('Failed to fetch plans.');
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   // useEffect(() => {
//   //   if (selectedPlan && rowRefs.current[selectedPlan.plId]) {
//   //     rowRefs.current[selectedPlan.plId].scrollIntoView({
//   //       behavior: "smooth",
//   //       block: "center",
//   //     });
//   //   }
//   // }, [selectedPlan, plans]);

//   // const handleRowClick = (plan) => {
//   //   // Toggle selection without clearing plans
//   //   if (selectedPlan && selectedPlan.plId === plan.plId) {
//   //     onPlanSelect(null); // Unselect without affecting plans
//   //   } else {
//   //     onPlanSelect(plan); // Select the new plan
//   //   }
//   // };

// //   const handleRowClick = (plan) => {
// //   // Only allow selection if clicking on a different plan
// //   if (selectedPlan && selectedPlan.plId === plan.plId) {
// //     onPlanSelect(null); // Unselect current plan
// //   } else {
// //     onPlanSelect(plan); // Select new plan
// //   }
// // };

//   const handleRowClick = (plan) => {
//   if (!selectedPlan || selectedPlan.plId !== plan.plId) {
//     onPlanSelect(plan);
//   }
// };

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
//     setPlans(newPlans);
//     onPlanSelect(updated);
//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         // setPlans(sortPlansByVersion(prevPlans));
//         setPlans(prevPlans);
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   // const handleVersionCodeChange = async (idx, value) => {
//   //   const prevPlans = [...plans];
//   //   const planId = plans[idx].plId;
//   //   let updated = { ...plans[idx], versionCode: value };
//   //   const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
//   //   setPlans(sortPlansByVersion(newPlans));
//   //   if (planId && Number(planId) > 0) {
//   //     const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//   //     toast.info('Updating version code...', { toastId: 'version-code-info' });
//   //     try {
//   //       setIsActionLoading(true);
//   //       await axios.put(updateUrl, updated);
//   //     } catch (err) {
//   //       setPlans(sortPlansByVersion(prevPlans));
//   //       toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//   //     } finally {
//   //       setIsActionLoading(false);
//   //     }
//   //   }
//   // };

//   const handleVersionCodeChange = async (idx, value) => {
//   const prevPlans = [...plans];
//   const planId = plans[idx].plId;
//   let updated = { ...plans[idx], versionCode: value };

//   // DON'T SORT - Keep original order
//   const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
//   setPlans(newPlans); // REMOVE sortPlansByVersion()

//   if (planId && Number(planId) > 0) {
//     const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//     toast.info('Updating version code...', { toastId: 'version-code-info' });
//     try {
//       setIsActionLoading(true);
//       await axios.put(updateUrl, updated);
//     } catch (err) {
//       setPlans(prevPlans); // REMOVE sortPlansByVersion()
//       toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//     } finally {
//       setIsActionLoading(false);
//     }
//   }
// };

//   // const handleActionSelect = async (idx, action) => {
//   //   const plan = plans[idx];
//   //   if (action === 'None') return;
//   //   try {
//   //     setIsActionLoading(true);
//   //     if (action === 'Delete') {
//   //       if (!plan.plId || Number(plan.plId) <= 0) {
//   //         toast.error('Cannot delete: Invalid plan ID.');
//   //         return;
//   //       }
//   //       const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//   //       toast.info('Deleting plan...');
//   //       try {
//   //         await axios.delete(deleteUrl);
//   //         toast.success('Plan deleted successfully!');
//   //       } catch (err) {
//   //         if (err.response && err.response.status === 404) {
//   //           toast.error('Plan not found on server. It may have already been deleted.');
//   //         } else {
//   //           toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//   //         }
//   //       }
//   //       await fetchPlans();
//   //     } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//   //       const payloadTemplate = {
//   //         projId: plan.projId,
//   //         plId: plan.plId || 0,
//   //         plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//   //         source: plan.source || '',
//   //         type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//   //         version: plan.version,
//   //         versionCode: plan.versionCode || '',
//   //         finalVersion: false,
//   //         isCompleted: false,
//   //         isApproved: false,
//   //         status: 'Working',
//   //         createdBy: plan.createdBy || 'User',
//   //         modifiedBy: plan.modifiedBy || 'User',
//   //         approvedBy: '',
//   //         templateId: plan.templateId || 1,
//   //       };
//   //       toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);
//   //       const response = await axios.post(
//   //         `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//   //         payloadTemplate
//   //       );
//   //       const newPlanData = response.data;
//   //       const transformedNewPlan = {
//   //         ...newPlanData,
//   //         plId: newPlanData.plId || newPlanData.id,
//   //         plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//   //         source: newPlanData.source || '',
//   //         type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
//   //         version: newPlanData.version,
//   //         versionCode: newPlanData.versionCode,
//   //         finalVersion: !!newPlanData.finalVersion,
//   //         isCompleted: !!newPlanData.isCompleted,
//   //         isApproved: !!newPlanData.isApproved,
//   //         status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//   //         closedPeriod: newPlanData.closedPeriod || '',
//   //         createdAt: newPlanData.createdAt || '',
//   //         updatedAt: newPlanData.updatedAt || '',
//   //         modifiedBy: newPlanData.modifiedBy || '',
//   //         approvedBy: newPlanData.approvedBy || '',
//   //         createdBy: newPlanData.createdBy || '',
//   //         templateId: newPlanData.templateId || 0,
//   //       };
//   //       // setPlans(prevPlans => sortPlansByVersion([...prevPlans, transformedNewPlan]));
//   //       setPlans(prevPlans => sortPlansByProjIdAndVersion([...prevPlans, transformedNewPlan]));

//   //       toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//   //     } else {
//   //       toast.info(`Action "${action}" selected (API call not implemented)`);
//   //     }
//   //   } catch (err) {
//   //     toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//   //   } finally {
//   //     setIsActionLoading(false);
//   //   }
//   // };

// //   const handleActionSelect = async (idx, action) => {
// //   const plan = plans[idx];
// //   if (action === 'None') return;
// //   try {
// //     setIsActionLoading(true);
// //     if (action === 'Delete') {
// //       if (!plan.plId || Number(plan.plId) <= 0) {
// //         toast.error('Cannot delete: Invalid plan ID.');
// //         setIsActionLoading(false);
// //         return;
// //       }
// //       toast.info('Deleting plan...');
// //       try {
// //         await axios.delete(`https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`);
// //         toast.success('Plan deleted successfully!');
// //       } catch (err) {
// //         if (err.response && err.response.status === 404) {
// //           toast.error('Plan not found on server. It may have already been deleted.');
// //         } else {
// //           toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
// //         }
// //         setIsActionLoading(false);
// //         return;
// //       }
// //       // Fetch fresh after deletion
// //       await fetchPlans();
// //     } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
// //       const payloadTemplate = {
// //         projId: plan.projId,
// //         plId: plan.plId || 0,
// //         plType: (action === 'Create Budget' || action === 'Create Blank Budget') ? 'BUD' : 'EAC',
// //         source: plan.source || '',
// //         type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
// //         version: plan.version,
// //         versionCode: plan.versionCode || '',
// //         finalVersion: false,
// //         isCompleted: false,
// //         isApproved: false,
// //         status: 'Working',
// //         createdBy: plan.createdBy || 'User',
// //         modifiedBy: plan.modifiedBy || 'User',
// //         approvedBy: '',
// //         templateId: plan.templateId || 1,
// //       };
// //       toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);
// //       const response = await axios.post(
// //         `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
// //         payloadTemplate
// //       );
// //       const newPlanData = response.data;
// //       const transformedNewPlan = {
// //         ...newPlanData,
// //         plId: newPlanData.plId || newPlanData.id,
// //         plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
// //         source: newPlanData.source || '',
// //         type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
// //         version: newPlanData.version,
// //         versionCode: newPlanData.versionCode,
// //         finalVersion: !!newPlanData.finalVersion,
// //         isCompleted: !!newPlanData.isCompleted,
// //         isApproved: !!newPlanData.isApproved,
// //         status: newPlanData.plType && newPlanData.version
// //           ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working')
// //           : '',
// //         closedPeriod: newPlanData.closedPeriod || '',
// //         createdAt: newPlanData.createdAt || '',
// //         updatedAt: newPlanData.updatedAt || '',
// //         modifiedBy: newPlanData.modifiedBy || '',
// //         approvedBy: newPlanData.approvedBy || '',
// //         createdBy: newPlanData.createdBy || '',
// //         templateId: newPlanData.templateId || 0,
// //       };
// //       // Insert new plan and sort immediately for instant UI update
// //       setPlans((prevPlans) =>
// //         sortPlansByProjIdPlTypeVersion([...prevPlans, transformedNewPlan])
// //       );
// //       toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
// //     } else {
// //       toast.info(`Action "${action}" selected (API call not implemented)`);
// //     }
// //   } catch (err) {
// //     toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
// //   } finally {
// //     setIsActionLoading(false);
// //   }
// // };

// const handleActionSelect = async (idx, action) => {
//   const plan = plans[idx];
//   if (action === 'None') return;
//   try {
//     setIsActionLoading(true);
//     if (action === 'Delete') {
//       if (!plan.plId || Number(plan.plId) <= 0) {
//         toast.error('Cannot delete: Invalid plan ID.');
//         setIsActionLoading(false);
//         return;
//       }
//       toast.info('Deleting plan...');
//       try {
//         await axios.delete(`https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`);
//         toast.success('Plan deleted successfully!');
//       } catch (err) {
//         if (err.response && err.response.status === 404) {
//           toast.error('Plan not found on server. It may have already been deleted.');
//         } else {
//           toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//         }
//         setIsActionLoading(false);
//         return;
//       }
//       await fetchPlans();               // <-- keep this after delete
//     } else if (
//       action === 'Create Budget' ||
//       action === 'Create Blank Budget' ||
//       action === 'Create EAC'
//     ) {
//       const payloadTemplate = {
//         projId: plan.projId,
//         plId: plan.plId || 0,
//         plType: (action === 'Create Budget' || action === 'Create Blank Budget') ? 'BUD' : 'EAC',
//         source: plan.source || '',
//         type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//         version: plan.version,
//         versionCode: plan.versionCode || '',
//         finalVersion: false,
//         isCompleted: false,
//         isApproved: false,
//         status: 'Working',
//         createdBy: plan.createdBy || 'User',
//         modifiedBy: plan.modifiedBy || 'User',
//         approvedBy: '',
//         templateId: plan.templateId || 1,
//       };
//       toast.info(
//         `Creating ${
//           action === 'Create Budget'
//             ? 'Budget'
//             : action === 'Create Blank Budget'
//             ? 'Blank Budget'
//             : 'EAC'
//         }...`
//       );
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//         payloadTemplate
//       );
//       // Instead of manually adding to plans,
//       // REFETCH from backend so all fields and summary panel update correctly:
//       await fetchPlans();
//       toast.success(
//         `${action === 'Create Budget'
//           ? 'Budget'
//           : action === 'Create Blank Budget'
//           ? 'Blank Budget'
//           : 'EAC'} created successfully!`
//       );
//     } else {
//       toast.info(`Action "${action}" selected (API call not implemented)`);
//     }
//   } catch (err) {
//     toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//   } finally {
//     setIsActionLoading(false);
//   }
// };

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

//       {/* {plans.length > 0 && (
//   <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//     <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//       <div>
//         <span className="font-semibold text-green-800">Project:</span>{" "}
//         <span className="text-gray-700">{projectId}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Project Name:</span>{" "}
//         <span className="text-gray-700">{plans[0]?.projName || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Start Date:</span>{" "}
//         <span className="text-gray-700">{formatDate(plans[0]?.projStartDt) || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">End Date:</span>{" "}
//         <span className="text-gray-700">{formatDate(plans[0]?.projEndDt) || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Organization:</span>{" "}
//         <span className="text-gray-700">{plans[0]?.orgId || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
//         <span className="text-gray-700">
//           {Number(plans[0]?.fundedFee || 0).toLocaleString("en-US", {
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//           })}
//         </span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//         <span className="text-gray-700">
//           {Number(plans[0]?.fundedCost || 0).toLocaleString("en-US", {
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//           })}
//         </span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//         <span className="text-gray-700">
//           {Number(plans[0]?.fundedRev || 0).toLocaleString("en-US", {
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//           })}
//         </span>
//       </div>
//     </div>
//   </div>
// )} */}

//       {/* <div className="flex justify-between items-center mb-4">
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
//       </div> */}

//       {/* <div className="flex gap-2 mb-4">
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
//       </div> */}

//       <div className="flex justify-between items-center mb-2">
//   {/* LEFT SIDE - Action Buttons */}
//   <div className="flex gap-2">
//     {plans.length > 0 && (
//       <>
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//           }}
//           disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Create Budget"
//         >
//           Create Budget
//         </button>
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//           }}
//           disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Create Blank Budget"
//         >
//           Create Blank Budget
//         </button>
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//           }}
//           disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Create EAC"
//         >
//           Create EAC
//         </button>
//         <button
//           onClick={() => handleTopButtonToggle('isCompleted')}
//           disabled={getTopButtonDisabled('isCompleted')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             getTopButtonDisabled('isCompleted')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Toggle Completed"
//         >
//           Completed
//         </button>
//         <button
//           onClick={() => handleTopButtonToggle('isApproved')}
//           disabled={getTopButtonDisabled('isApproved')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             getTopButtonDisabled('isApproved')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Toggle Approved"
//         >
//           Approved
//         </button>
//         <button
//           onClick={() => handleTopButtonToggle('finalVersion')}
//           disabled={getTopButtonDisabled('finalVersion')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             getTopButtonDisabled('finalVersion')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Toggle Final Version"
//         >
//           Final Version
//         </button>
//       </>
//     )}
//   </div>

//   {/* RIGHT SIDE - Import and Fiscal Year */}
//   <div className="flex items-center gap-4">
//     {/* Import Button */}
//     <button
//       onClick={() => {
//         setIsActionLoading(true);
//         fileInputRef.current.click();
//       }}
//       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//       title="Import Plan"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-4 w-4 mr-2"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//         />
//       </svg>
//       Import
//     </button>
//     <input
//       type="file"
//       ref={fileInputRef}
//       onChange={(e) => {
//         setIsActionLoading(true);
//         handleImportPlan(e);
//       }}
//       accept=".xlsx,.xls"
//       className="hidden"
//     />

//     {/* Fiscal Year Dropdown */}
//     <div className="flex items-center gap-2">
//       <label
//         htmlFor="fiscalYear"
//         className="font-semibold text-xs sm:text-sm whitespace-nowrap"
//       >
//         Fiscal Year:
//       </label>
//       <select
//         id="fiscalYear"
//         value={fiscalYear}
//         onChange={(e) => setFiscalYear(e.target.value)}
//         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         disabled={fiscalYearOptions?.length === 0}
//       >
//         {fiscalYearOptions?.map((year) => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>
// </div>

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
//                 {/* <th className="p-2 border font-normal">Action</th> */}
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
//                   key={`plan-${plan.plId || idx}-${plan.projId || 'unknown'}`}
//                   // ref={el => { rowRefs.current[plan.plId] = el; }}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//   selectedPlan && selectedPlan.plId === plan.plId && selectedPlan.projId === plan.projId
//     ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
// }`}
//                    onClick={() => handleRowClick(plan)}

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
//                   {/* <td className="p-2 border">
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
//                   </td> */}
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
//                         ? formatDateWithTime(plan[col])
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
//                             onClick={(e) => e.stopPropagation()}
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

// const ProjectPlanTable = ({ onPlanSelect, selectedPlan, projectId, fiscalYear, setFiscalYear,
//   fiscalYearOptions }) => {
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

//   // const rowRefs = useRef({});

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === 'string' && projId.includes('.');
//   };

//   // Add this function at the top of ProjectPlanTable component
// const formatDateWithTime = (dateStr) => {
//   if (!dateStr) return "";
//   try {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr;

//     // Format: MM/DD/YYYY HH:MM:SS AM/PM
//     return date.toLocaleString("en-US", {
//       month: "2-digit",
//       day: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true
//     });
//   } catch (e) {
//     return dateStr;
//   }
// };

// // const sortPlansByProjIdPlTypeVersion = (plansArray) => {
// //   return [...plansArray].sort((a, b) => {
// //     if (a.projId < b.projId) return -1;
// //     if (a.projId > b.projId) return 1;
// //     if (a.plType < b.plType) return -1;
// //     if (a.plType > b.plType) return 1;
// //     return (a.version || 0) - (b.version || 0);
// //   });
// // };

// // const sortPlansByProjIdPlTypeVersion = (plansArray) => {
// //   return [...plansArray].sort((a, b) => {
// //     if (a.projId < b.projId) return -1;
// //     if (a.projId > b.projId) return 1;
// //     if (a.plType < b.plType) return -1;
// //     if (a.plType > b.plType) return 1;
// //     return (a.version || 0) - (b.version || 0);
// //   });
// // };

//   const sortPlansByProjIdPlTypeVersion = (plansArray) => {
//   return [...plansArray].sort((a, b) => {
//     if (a.projId < b.projId) return -1;
//     if (a.projId > b.projId) return 1;

//     if (a.plType < b.plType) return -1;
//     if (a.plType > b.plType) return 1;

//     // Explicit numeric compare for version
//     const aVersion = Number(a.version) || 0;
//     const bVersion = Number(b.version) || 0;
//     return aVersion - bVersion;
//   });
// };

//   // const fetchPlans = async () => {
//   //   if (!projectId) {
//   //     setPlans([]);
//   //     setLoading(false);
//   //     return;
//   //   }
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.get(
//   //       `https://test-api-3tmq.onrender.com/Project/GetProjectPlans/${projectId}`
//   //     );
//   //     console.log('API Response:', response.data);
//   //     const transformedPlans = response.data.map((plan, idx) => ({
//   //       plId: plan.plId || plan.id || 0,
//   //       projId: plan.projId || projectId,
//   //       plType: plan.plType === 'Budget' ? 'BUD' : plan.plType === 'EAC' ? 'EAC' : plan.plType || '',
//   //       source: plan.source || '',
//   //       type: plan.type || '',
//   //       version: plan.version || 0,
//   //       versionCode: plan.versionCode || '',
//   //       finalVersion: !!plan.finalVersion,
//   //       isCompleted: !!plan.isCompleted,
//   //       isApproved: !!plan.isApproved,
//   //       status: plan.plType && plan.version ? (plan.status || 'Working') : '',
//   //       closedPeriod: plan.closedPeriod || '',
//   //       createdAt: plan.createdAt || '',
//   //       updatedAt: plan.updatedAt || '',
//   //       modifiedBy: plan.modifiedBy || '',
//   //       approvedBy: plan.approvedBy || '',
//   //       createdBy: plan.createdBy || '',
//   //       templateId: plan.templateId || 0,
//   //       projName: plan.projName || '',
//   //       projStartDt: plan.projStartDt || '',
//   //       projEndDt: plan.projEndDt || '',
//   //       orgId: plan.orgId || '',
//   //       fundedCost: plan.proj_f_cst_amt || '',
//   //       fundedFee: plan.proj_f_fee_amt || '',
//   //       fundedRev: plan.proj_f_tot_amt || '',
//   //       revenueAccount: plan.revenueAccount || '',
//   //     }));
//   //     console.log('Transformed Plans:', transformedPlans);
//   //     setPlans(transformedPlans);
//   //     setColumns([
//   //       'projId',
//   //       'plType',
//   //       'version',
//   //       'versionCode',
//   //       'source',
//   //       'type',
//   //       'isCompleted',
//   //       'isApproved',
//   //       'finalVersion',
//   //       'status',
//   //       'closedPeriod',
//   //       'createdAt',
//   //       'updatedAt',
//   //     ]);
//   //     // if (transformedPlans.length > 0 && !selectedPlan) {
//   //     //   onPlanSelect(transformedPlans[0]);
//   //     // }
//   //   } catch (error) {
//   //     console.error('Error fetching plans:', error.response?.data || error.message);
//   //     setPlans([]);
//   //     toast.error('Failed to fetch plans.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

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
//     console.log('API Response:', response.data);
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
//       projName: plan.projName || '',
//       projStartDt: plan.projStartDt || '',
//       projEndDt: plan.projEndDt || '',
//       orgId: plan.orgId || '',
//       fundedCost: plan.proj_f_cst_amt || '',
//       fundedFee: plan.proj_f_fee_amt || '',
//       fundedRev: plan.proj_f_tot_amt || '',
//       revenueAccount: plan.revenueAccount || '',
//     }));

//     const sortedPlans = sortPlansByProjIdPlTypeVersion(transformedPlans);  // <-- Sort here before setting state
//     console.log('Transformed & Sorted Plans:', sortedPlans);

//     setPlans(sortedPlans);
//     setColumns([
//       'projId',
//       'plType',
//       'version',
//       'versionCode',
//       'source',
//       'type',
//       'isCompleted',
//       'isApproved',
//       'finalVersion',
//       'status',
//       'closedPeriod',
//       // 'createdAt',
//       // 'updatedAt',
//     ]);
//   } catch (error) {
//     console.error('Error fetching plans:', error.response?.data || error.message);
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
//   if (selectedPlan && plans.length > 0) {
//     const latest = plans.find(p => p.plId === selectedPlan.plId && p.projId === selectedPlan.projId);
//     // Only update if the plan has changed
//     if (latest && (latest.status !== selectedPlan.status || latest.isCompleted !== selectedPlan.isCompleted || latest.isApproved !== selectedPlan.isApproved || latest.finalVersion !== selectedPlan.finalVersion)) {
//       onPlanSelect(latest);
//     }
//   }
// }, [plans]);

//   // useEffect(() => {
//   //   if (selectedPlan && rowRefs.current[selectedPlan.plId]) {
//   //     rowRefs.current[selectedPlan.plId].scrollIntoView({
//   //       behavior: "smooth",
//   //       block: "center",
//   //     });
//   //   }
//   // }, [selectedPlan, plans]);

//   // const handleRowClick = (plan) => {
//   //   // Toggle selection without clearing plans
//   //   if (selectedPlan && selectedPlan.plId === plan.plId) {
//   //     onPlanSelect(null); // Unselect without affecting plans
//   //   } else {
//   //     onPlanSelect(plan); // Select the new plan
//   //   }
//   // };

// //   const handleRowClick = (plan) => {
// //   // Only allow selection if clicking on a different plan
// //   if (selectedPlan && selectedPlan.plId === plan.plId) {
// //     onPlanSelect(null); // Unselect current plan
// //   } else {
// //     onPlanSelect(plan); // Select new plan
// //   }
// // };

//   const handleRowClick = (plan) => {
//   if (!selectedPlan || selectedPlan.plId !== plan.plId) {
//     onPlanSelect(plan);
//   }
// };

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
//     setPlans(newPlans);
//     onPlanSelect(updated);
//     if ((BOOLEAN_FIELDS.includes(field) || field === 'status') && planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       try {
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         // setPlans(sortPlansByVersion(prevPlans));
//         setPlans(prevPlans);
//         toast.error('Error updating plan: ' + (err.response?.data?.message || err.message), { toastId: 'checkbox-error' });
//       }
//     }
//   };

//   // const handleVersionCodeChange = async (idx, value) => {
//   //   const prevPlans = [...plans];
//   //   const planId = plans[idx].plId;
//   //   let updated = { ...plans[idx], versionCode: value };
//   //   const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
//   //   setPlans(sortPlansByVersion(newPlans));
//   //   if (planId && Number(planId) > 0) {
//   //     const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//   //     toast.info('Updating version code...', { toastId: 'version-code-info' });
//   //     try {
//   //       setIsActionLoading(true);
//   //       await axios.put(updateUrl, updated);
//   //     } catch (err) {
//   //       setPlans(sortPlansByVersion(prevPlans));
//   //       toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//   //     } finally {
//   //       setIsActionLoading(false);
//   //     }
//   //   }
//   // };

//   const handleVersionCodeChange = async (idx, value) => {
//   const prevPlans = [...plans];
//   const planId = plans[idx].plId;
//   let updated = { ...plans[idx], versionCode: value };

//   // DON'T SORT - Keep original order
//   const newPlans = plans.map(plan => (plan.plId === planId ? updated : plan));
//   setPlans(newPlans); // REMOVE sortPlansByVersion()

//   if (planId && Number(planId) > 0) {
//     const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//     toast.info('Updating version code...', { toastId: 'version-code-info' });
//     try {
//       setIsActionLoading(true);
//       await axios.put(updateUrl, updated);
//     } catch (err) {
//       setPlans(prevPlans); // REMOVE sortPlansByVersion()
//       toast.error('Error updating version code: ' + (err.response?.data?.message || err.message), { toastId: 'version-code-error' });
//     } finally {
//       setIsActionLoading(false);
//     }
//   }
// };

//   // const handleActionSelect = async (idx, action) => {
//   //   const plan = plans[idx];
//   //   if (action === 'None') return;
//   //   try {
//   //     setIsActionLoading(true);
//   //     if (action === 'Delete') {
//   //       if (!plan.plId || Number(plan.plId) <= 0) {
//   //         toast.error('Cannot delete: Invalid plan ID.');
//   //         return;
//   //       }
//   //       const deleteUrl = `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`;
//   //       toast.info('Deleting plan...');
//   //       try {
//   //         await axios.delete(deleteUrl);
//   //         toast.success('Plan deleted successfully!');
//   //       } catch (err) {
//   //         if (err.response && err.response.status === 404) {
//   //           toast.error('Plan not found on server. It may have already been deleted.');
//   //         } else {
//   //           toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//   //         }
//   //       }
//   //       await fetchPlans();
//   //     } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
//   //       const payloadTemplate = {
//   //         projId: plan.projId,
//   //         plId: plan.plId || 0,
//   //         plType: action === 'Create Budget' || action === 'Create Blank Budget' ? 'BUD' : 'EAC',
//   //         source: plan.source || '',
//   //         type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//   //         version: plan.version,
//   //         versionCode: plan.versionCode || '',
//   //         finalVersion: false,
//   //         isCompleted: false,
//   //         isApproved: false,
//   //         status: 'Working',
//   //         createdBy: plan.createdBy || 'User',
//   //         modifiedBy: plan.modifiedBy || 'User',
//   //         approvedBy: '',
//   //         templateId: plan.templateId || 1,
//   //       };
//   //       toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);
//   //       const response = await axios.post(
//   //         `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//   //         payloadTemplate
//   //       );
//   //       const newPlanData = response.data;
//   //       const transformedNewPlan = {
//   //         ...newPlanData,
//   //         plId: newPlanData.plId || newPlanData.id,
//   //         plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
//   //         source: newPlanData.source || '',
//   //         type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
//   //         version: newPlanData.version,
//   //         versionCode: newPlanData.versionCode,
//   //         finalVersion: !!newPlanData.finalVersion,
//   //         isCompleted: !!newPlanData.isCompleted,
//   //         isApproved: !!newPlanData.isApproved,
//   //         status: newPlanData.plType && newPlanData.version ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working') : '',
//   //         closedPeriod: newPlanData.closedPeriod || '',
//   //         createdAt: newPlanData.createdAt || '',
//   //         updatedAt: newPlanData.updatedAt || '',
//   //         modifiedBy: newPlanData.modifiedBy || '',
//   //         approvedBy: newPlanData.approvedBy || '',
//   //         createdBy: newPlanData.createdBy || '',
//   //         templateId: newPlanData.templateId || 0,
//   //       };
//   //       // setPlans(prevPlans => sortPlansByVersion([...prevPlans, transformedNewPlan]));
//   //       setPlans(prevPlans => sortPlansByProjIdAndVersion([...prevPlans, transformedNewPlan]));

//   //       toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
//   //     } else {
//   //       toast.info(`Action "${action}" selected (API call not implemented)`);
//   //     }
//   //   } catch (err) {
//   //     toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//   //   } finally {
//   //     setIsActionLoading(false);
//   //   }
//   // };

// //   const handleActionSelect = async (idx, action) => {
// //   const plan = plans[idx];
// //   if (action === 'None') return;
// //   try {
// //     setIsActionLoading(true);
// //     if (action === 'Delete') {
// //       if (!plan.plId || Number(plan.plId) <= 0) {
// //         toast.error('Cannot delete: Invalid plan ID.');
// //         setIsActionLoading(false);
// //         return;
// //       }
// //       toast.info('Deleting plan...');
// //       try {
// //         await axios.delete(`https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`);
// //         toast.success('Plan deleted successfully!');
// //       } catch (err) {
// //         if (err.response && err.response.status === 404) {
// //           toast.error('Plan not found on server. It may have already been deleted.');
// //         } else {
// //           toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
// //         }
// //         setIsActionLoading(false);
// //         return;
// //       }
// //       // Fetch fresh after deletion
// //       await fetchPlans();
// //     } else if (action === 'Create Budget' || action === 'Create Blank Budget' || action === 'Create EAC') {
// //       const payloadTemplate = {
// //         projId: plan.projId,
// //         plId: plan.plId || 0,
// //         plType: (action === 'Create Budget' || action === 'Create Blank Budget') ? 'BUD' : 'EAC',
// //         source: plan.source || '',
// //         type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
// //         version: plan.version,
// //         versionCode: plan.versionCode || '',
// //         finalVersion: false,
// //         isCompleted: false,
// //         isApproved: false,
// //         status: 'Working',
// //         createdBy: plan.createdBy || 'User',
// //         modifiedBy: plan.modifiedBy || 'User',
// //         approvedBy: '',
// //         templateId: plan.templateId || 1,
// //       };
// //       toast.info(`Creating ${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'}...`);
// //       const response = await axios.post(
// //         `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
// //         payloadTemplate
// //       );
// //       const newPlanData = response.data;
// //       const transformedNewPlan = {
// //         ...newPlanData,
// //         plId: newPlanData.plId || newPlanData.id,
// //         plType: newPlanData.plType === 'Budget' ? 'BUD' : newPlanData.plType || '',
// //         source: newPlanData.source || '',
// //         type: newPlanData.type || (isChildProjectId(projectId) ? 'SYSTEM' : ''),
// //         version: newPlanData.version,
// //         versionCode: newPlanData.versionCode,
// //         finalVersion: !!newPlanData.finalVersion,
// //         isCompleted: !!newPlanData.isCompleted,
// //         isApproved: !!newPlanData.isApproved,
// //         status: newPlanData.plType && newPlanData.version
// //           ? (newPlanData.status === 'Approved' || newPlanData.status === 'Completed' ? newPlanData.status : 'Working')
// //           : '',
// //         closedPeriod: newPlanData.closedPeriod || '',
// //         createdAt: newPlanData.createdAt || '',
// //         updatedAt: newPlanData.updatedAt || '',
// //         modifiedBy: newPlanData.modifiedBy || '',
// //         approvedBy: newPlanData.approvedBy || '',
// //         createdBy: newPlanData.createdBy || '',
// //         templateId: newPlanData.templateId || 0,
// //       };
// //       // Insert new plan and sort immediately for instant UI update
// //       setPlans((prevPlans) =>
// //         sortPlansByProjIdPlTypeVersion([...prevPlans, transformedNewPlan])
// //       );
// //       toast.success(`${action === 'Create Budget' ? 'Budget' : action === 'Create Blank Budget' ? 'Blank Budget' : 'EAC'} created successfully!`);
// //     } else {
// //       toast.info(`Action "${action}" selected (API call not implemented)`);
// //     }
// //   } catch (err) {
// //     toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
// //   } finally {
// //     setIsActionLoading(false);
// //   }
// // };

// const handleActionSelect = async (idx, action) => {
//   const plan = plans[idx];
//   if (action === 'None') return;
//   try {
//     setIsActionLoading(true);
//     if (action === 'Delete') {
//       if (!plan.plId || Number(plan.plId) <= 0) {
//         toast.error('Cannot delete: Invalid plan ID.');
//         setIsActionLoading(false);
//         return;
//       }
//       toast.info('Deleting plan...');
//       try {
//         await axios.delete(`https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`);
//         toast.success('Plan deleted successfully!');
//       } catch (err) {
//         if (err.response && err.response.status === 404) {
//           toast.error('Plan not found on server. It may have already been deleted.');
//         } else {
//           toast.error('Error deleting plan: ' + (err.response?.data?.message || err.message));
//         }
//         setIsActionLoading(false);
//         return;
//       }
//       await fetchPlans();               // <-- keep this after delete
//     } else if (
//       action === 'Create Budget' ||
//       action === 'Create Blank Budget' ||
//       action === 'Create EAC'
//     ) {
//       const payloadTemplate = {
//         projId: plan.projId,
//         plId: plan.plId || 0,
//         plType: (action === 'Create Budget' || action === 'Create Blank Budget') ? 'BUD' : 'EAC',
//         source: plan.source || '',
//         type: isChildProjectId(plan.projId) ? 'SYSTEM' : plan.type || '',
//         version: plan.version,
//         versionCode: plan.versionCode || '',
//         finalVersion: false,
//         isCompleted: false,
//         isApproved: false,
//         status: 'Working',
//         createdBy: plan.createdBy || 'User',
//         modifiedBy: plan.modifiedBy || 'User',
//         approvedBy: '',
//         templateId: plan.templateId || 1,
//       };
//       toast.info(
//         `Creating ${
//           action === 'Create Budget'
//             ? 'Budget'
//             : action === 'Create Blank Budget'
//             ? 'Blank Budget'
//             : 'EAC'
//         }...`
//       );
//       await axios.post(
//         `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${action === 'Create Blank Budget' ? 'blank' : 'actual'}`,
//         payloadTemplate
//       );
//       // Instead of manually adding to plans,
//       // REFETCH from backend so all fields and summary panel update correctly:
//       await fetchPlans();
//       toast.success(
//         `${action === 'Create Budget'
//           ? 'Budget'
//           : action === 'Create Blank Budget'
//           ? 'Blank Budget'
//           : 'EAC'} created successfully!`
//       );
//     } else {
//       toast.info(`Action "${action}" selected (API call not implemented)`);
//     }
//   } catch (err) {
//     toast.error('Error performing action: ' + (err.response?.data?.message || err.message));
//   } finally {
//     setIsActionLoading(false);
//   }
// };

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

//       {/* {plans.length > 0 && (
//   <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow-sm mb-4">
//     <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//       <div>
//         <span className="font-semibold text-green-800">Project:</span>{" "}
//         <span className="text-gray-700">{projectId}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Project Name:</span>{" "}
//         <span className="text-gray-700">{plans[0]?.projName || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Start Date:</span>{" "}
//         <span className="text-gray-700">{formatDate(plans[0]?.projStartDt) || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">End Date:</span>{" "}
//         <span className="text-gray-700">{formatDate(plans[0]?.projEndDt) || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Organization:</span>{" "}
//         <span className="text-gray-700">{plans[0]?.orgId || ''}</span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Funded Fee:</span>{" "}
//         <span className="text-gray-700">
//           {Number(plans[0]?.fundedFee || 0).toLocaleString("en-US", {
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//           })}
//         </span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Funded Cost:</span>{" "}
//         <span className="text-gray-700">
//           {Number(plans[0]?.fundedCost || 0).toLocaleString("en-US", {
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//           })}
//         </span>
//       </div>
//       <div>
//         <span className="font-semibold text-green-800">Funded Rev:</span>{" "}
//         <span className="text-gray-700">
//           {Number(plans[0]?.fundedRev || 0).toLocaleString("en-US", {
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//           })}
//         </span>
//       </div>
//     </div>
//   </div>
// )} */}

//       {/* <div className="flex justify-between items-center mb-4">
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
//       </div> */}

//       {/* <div className="flex gap-2 mb-4">
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
//       </div> */}

//       <div className="flex justify-between items-center mb-2">
//   {/* LEFT SIDE - Action Buttons */}
//   <div className="flex gap-2">
//     {plans.length > 0 && (
//       <>
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Budget');
//           }}
//           disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Budget')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Create Budget"
//         >
//           Create Budget
//         </button>
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create Blank Budget');
//           }}
//           disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             !selectedPlan || !getButtonAvailability(selectedPlan, 'Create Blank Budget')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Create Blank Budget"
//         >
//           Create Blank Budget
//         </button>
//         <button
//           onClick={() => {
//             setIsActionLoading(true);
//             handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Create EAC');
//           }}
//           disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             !selectedPlan || !getButtonAvailability(selectedPlan, 'Create EAC')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Create EAC"
//         >
//           Create EAC
//         </button>
//         <button
//   onClick={() => {
//     setIsActionLoading(true);
//     handleActionSelect(plans.findIndex(p => p.plId === selectedPlan?.plId), 'Delete');
//   }}
//   disabled={!selectedPlan || !getButtonAvailability(selectedPlan, 'Delete')}
//   className={`px-3 py-1 rounded text-xs flex items-center ${
//     !selectedPlan || !getButtonAvailability(selectedPlan, 'Delete')
//       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//       : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
//   }`}
//   title="Delete Selected Plan"
// >
//   Delete
// </button>

//         <button
//           onClick={() => handleTopButtonToggle('isCompleted')}
//           disabled={getTopButtonDisabled('isCompleted')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             getTopButtonDisabled('isCompleted')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Toggle Completed"
//         >
//           Completed
//         </button>
//         <button
//           onClick={() => handleTopButtonToggle('isApproved')}
//           disabled={getTopButtonDisabled('isApproved')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             getTopButtonDisabled('isApproved')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Toggle Approved"
//         >
//           Approved
//         </button>
//         <button
//           onClick={() => handleTopButtonToggle('finalVersion')}
//           disabled={getTopButtonDisabled('finalVersion')}
//           className={`px-3 py-1 rounded text-xs flex items-center ${
//             getTopButtonDisabled('finalVersion')
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
//           }`}
//           title="Toggle Final Version"
//         >
//           Final Version
//         </button>
//       </>
//     )}
//   </div>

//   {/* RIGHT SIDE - Import and Fiscal Year */}
//   <div className="flex items-center gap-4">
//     {/* Import Button */}
//     <button
//       onClick={() => {
//         setIsActionLoading(true);
//         fileInputRef.current.click();
//       }}
//       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer"
//       title="Import Plan"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-4 w-4 mr-2"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//         />
//       </svg>
//       Import
//     </button>
//     <input
//       type="file"
//       ref={fileInputRef}
//       onChange={(e) => {
//         setIsActionLoading(true);
//         handleImportPlan(e);
//       }}
//       accept=".xlsx,.xls"
//       className="hidden"
//     />

//     {/* Fiscal Year Dropdown */}
//     <div className="flex items-center gap-2">
//       <label
//         htmlFor="fiscalYear"
//         className="font-semibold text-xs sm:text-sm whitespace-nowrap"
//       >
//         Fiscal Year:
//       </label>
//       <select
//         id="fiscalYear"
//         value={fiscalYear}
//         onChange={(e) => setFiscalYear(e.target.value)}
//         className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         disabled={fiscalYearOptions?.length === 0}
//       >
//         {fiscalYearOptions?.map((year) => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>
// </div>

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
//                 {/* <th className="p-2 border font-normal">Action</th> */}
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
//                   key={`plan-${plan.plId || idx}-${plan.projId || 'unknown'}`}
//                   // ref={el => { rowRefs.current[plan.plId] = el; }}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//   selectedPlan && selectedPlan.plId === plan.plId && selectedPlan.projId === plan.projId
//     ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
// }`}
//                    onClick={() => handleRowClick(plan)}

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
//                   {/* <td className="p-2 border">
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
//                   </td> */}
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
//                         ? formatDateWithTime(plan[col])
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
//                             onClick={(e) => e.stopPropagation()}
//                             onMouseDown={(e) => e.stopPropagation()}
//                             onDoubleClick={(e) => e.stopPropagation()}
//                             onKeyDown={(e) => e.stopPropagation()}
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
// import { formatDate } from "./utils";

// const BOOLEAN_FIELDS = ["finalVersion", "isCompleted", "isApproved"];

// const COLUMN_LABELS = {
//   projId: "Project ID",
//   plType: "Plan Type",
//   version: "Version",
//   versionCode: "Version Code",
//   source: "Source",
//   type: "Type",
//   finalVersion: "Conclude",
//   isCompleted: "Submitted",
//   isApproved: "Approved",
//   status: "Status",
//   closedPeriod: "Closed Period",
//   createdAt: "Created At",
//   updatedAt: "Updated At",
// };

// const ProjectPlanTable = ({
//   onPlanSelect,
//   selectedPlan,
//   projectId,
//   fiscalYear,
//   setFiscalYear,
//   fiscalYearOptions,
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

//   const isChildProjectId = (projId) => {
//     return projId && typeof projId === "string" && projId.includes(".");
//   };

//   const formatDateWithTime = (dateStr) => {
//     if (!dateStr) return "";
//     try {
//       const date = new Date(dateStr);
//       if (isNaN(date.getTime())) return dateStr;
//       return date.toLocaleString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       });
//     } catch (e) {
//       return dateStr;
//     }
//   };

//   const sortPlansByProjIdPlTypeVersion = (plansArray) => {
//     return [...plansArray].sort((a, b) => {
//       if (a.projId < b.projId) return -1;
//       if (a.projId > b.projId) return 1;
//       if (a.plType < b.plType) return -1;
//       if (a.plType > b.plType) return 1;
//       // Explicit numeric compare for version
//       const aVersion = Number(a.version) || 0;
//       const bVersion = Number(b.version) || 0;
//       return aVersion - bVersion;
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
//       const transformedPlans = response.data.map((plan, idx) => ({
//         plId: plan.plId || plan.id || 0,
//         projId: plan.projId || projectId,
//         plType:
//           plan.plType === "Budget"
//             ? "BUD"
//             : plan.plType === "EAC"
//             ? "EAC"
//             : plan.plType || "",
//         source: plan.source || "",
//         type: plan.type || "",
//         version: plan.version || 0,
//         versionCode: plan.versionCode || "",
//         finalVersion: !!plan.finalVersion,
//         isCompleted: !!plan.isCompleted,
//         isApproved: !!plan.isApproved,
//         status:
//           plan.plType && plan.version
//             ? (plan.status || "In Progress")
//                 .replace("Working", "In Progress")
//                 .replace("Completed", "Submitted")
//             : "",
//         closedPeriod: plan.closedPeriod || "",
//         createdAt: plan.createdAt || "",
//         updatedAt: plan.updatedAt || "",
//         modifiedBy: plan.modifiedBy || "",
//         approvedBy: plan.approvedBy || "",
//         createdBy: plan.createdBy || "",
//         templateId: plan.templateId || 0,
//         projName: plan.projName || "",
//         projStartDt: plan.projStartDt || "",
//         projEndDt: plan.projEndDt || "",
//         orgId: plan.orgId || "",
//         fundedCost: plan.proj_f_cst_amt || "",
//         fundedFee: plan.proj_f_fee_amt || "",
//         fundedRev: plan.proj_f_tot_amt || "",
//         revenueAccount: plan.revenueAccount || "",
//       }));
//       const sortedPlans = sortPlansByProjIdPlTypeVersion(transformedPlans);
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
//       ]);
//     } catch (error) {
//       setPlans([]);
//       toast.error("Failed to fetch plans.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [projectId]);

//   useEffect(() => {
//     if (selectedPlan && plans.length > 0) {
//       const latest = plans.find(
//         (p) => p.plId === selectedPlan.plId && p.projId === selectedPlan.projId
//       );
//       if (
//         latest &&
//         (latest.status !== selectedPlan.status ||
//           latest.isCompleted !== selectedPlan.isCompleted ||
//           latest.isApproved !== selectedPlan.isApproved ||
//           latest.finalVersion !== selectedPlan.finalVersion)
//       ) {
//         onPlanSelect(latest);
//       }
//     }
//   }, [plans]);

//   const handleRowClick = (plan) => {
//     if (!selectedPlan || selectedPlan.plId !== plan.plId) {
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
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       let extractedVersion = null;
//       if (typeof response.data === "string") {
//         const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
//         if (versionMatch) extractedVersion = versionMatch[1];
//       } else if (response.data?.version) {
//         extractedVersion = response.data.version;
//       }
//       if (extractedVersion) setLastImportedVersion(extractedVersion);
//       setLastImportTime(Date.now());
//       toast.success(
//         response.data && typeof response.data === "string"
//           ? response.data
//           : JSON.stringify(response.data),
//         { toastId: "import-success-" + Date.now(), autoClose: 5000 }
//       );
//       await fetchPlans();
//     } catch (err) {
//       let errorMessage =
//         "Failed to import plan. Please check the file and project ID, or contact support.";
//       if (err.response) {
//         if (typeof err.response.data === "string" && err.response.data)
//           errorMessage = err.response.data;
//         else if (err.response.data?.message)
//           errorMessage = err.response.data.message;
//         else if (err.response.data)
//           errorMessage = JSON.stringify(err.response.data);
//         else if (err.response.status === 500)
//           errorMessage =
//             "Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.";
//       } else errorMessage = err.message || errorMessage;
//       toast.error(errorMessage, { toastId: "import-error", autoClose: 5000 });
//     } finally {
//       setIsActionLoading(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
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
//       toast.error("You can't approve this row until Submitted is checked", {
//         toastId: "checkbox-error",
//       });
//       return;
//     }
//     if (field === "finalVersion" && !plan.isApproved) {
//       toast.error("You can't set Conclude until Approved is checked", {
//         toastId: "checkbox-error",
//       });
//       return;
//     }
//     let updated = { ...plan };
//     updated[field] = !plan[field];
//     if (field === "isCompleted") {
//       updated.status = updated.isCompleted ? "Submitted" : "In Progress";
//       if (!updated.isCompleted) {
//         updated.isApproved = false;
//         updated.finalVersion = false;
//       }
//     }
//     if (field === "isApproved") {
//       updated.status = updated.isApproved ? "Approved" : "Submitted";
//       if (!updated.isApproved) updated.finalVersion = false;
//     }
//     if (field === "finalVersion")
//       updated.status = updated.finalVersion ? "Submitted" : "Approved";
//     let newPlans;
//     // Your referenced line, but updated from "Working" to "In Progress" and "Completed" to "Submitted"
//     if (field === "isCompleted" && !updated.isCompleted) {
//       const isEAC = updated.plType === "EAC";
//       const inProgressCount = plans.filter(
//         (p) => p.status === "In Progress" && p.plType === updated.plType
//       ).length;
//       if (inProgressCount > 0 && updated.status === "In Progress") {
//         toast.error(
//           `Only one ${
//             isEAC ? "EAC" : "BUD"
//           } plan can have In Progress status at a time.`,
//           { toastId: "checkbox-error" }
//         );
//         return;
//       }
//     }
//     if (field === "finalVersion" && updated.finalVersion) {
//   newPlans = plans.map((p, i) =>
//     i === idx
//       ? updated
//       : p.plType === updated.plType
//       ? { ...p, finalVersion: false }
//       : p
//   );
// } else {
//   newPlans = plans.map((p, i) => (i === idx ? updated : p));
// }

//     // if (field === "finalVersion" && updated.finalVersion) {
//     //   newPlans = plans.map((p, i) =>
//     //     i === idx ? updated : { ...p, finalVersion: false }
//     //   );
//     // } else {
//     //   newPlans = plans.map((p, i) => (i === idx ? updated : p));
//     // }
//     // "In Progress" handling for exclusivity
//     if (updated.status === "In Progress") {
//       newPlans = newPlans.map((p, i) =>
//         i !== idx && p.status === "In Progress" && p.plType === updated.plType
//           ? { ...p, status: "Submitted", isCompleted: true }
//           : p
//       );
//     }
//     setPlans(newPlans);
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
//         setPlans(prevPlans);
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
//     setPlans(newPlans);
//     if (planId && Number(planId) > 0) {
//       const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
//       toast.info("Updating version code...", { toastId: "version-code-info" });
//       try {
//         setIsActionLoading(true);
//         await axios.put(updateUrl, updated);
//       } catch (err) {
//         setPlans(prevPlans);
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
//           setIsActionLoading(false);
//           return;
//         }
//         const confirmed = window.confirm(
//           `Are you sure you want to delete this plan`
//         );
//         if (!confirmed) {
//           setIsActionLoading(false);
//           return;
//         }
//         toast.info("Deleting plan...");
//         try {
//           await axios.delete(
//             `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`
//           );
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
//           setIsActionLoading(false);
//           return;
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
//           status: "In Progress",
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
//         await axios.post(
//           `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${
//             action === "Create Blank Budget" ? "blank" : "actual"
//           }`,
//           payloadTemplate
//         );
//         await fetchPlans();
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
//     if (!plan.plType || !plan.version) return options;
//     if (plan.status === "In Progress") options = ["None", "Delete"];
//     else if (plan.status === "Submitted")
//       options = ["None", "Create Budget", "Create Blank Budget"];
//     else if (plan.status === "Approved")
//       options = [
//         "None",
//         "Create Budget",
//         "Create Blank Budget",
//         "Create EAC",
//         "Delete",
//       ];
//     return options;
//   };

//   const getButtonAvailability = (plan, action) => {
//     const options = getActionOptions(plan);
//     return options.includes(action);
//   };

//   const checkedFinalVersionIdx = plans.findIndex((plan) => plan.finalVersion);

//   // const getCheckboxProps = (plan, col, idx) => {
//   //   if (!plan.plType || !plan.version)
//   //     return { checked: false, disabled: true };
//   //   if (col === "isCompleted")
//   //     return { checked: plan.isCompleted, disabled: !!plan.isApproved };
//   //   if (col === "isApproved")
//   //     return { checked: plan.isApproved, disabled: !plan.isCompleted };
//   //   if (col === "finalVersion") {
//   //     if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx)
//   //       return { checked: false, disabled: true };
//   //     return { checked: plan.finalVersion, disabled: !plan.isApproved };
//   //   }
//   //   return { checked: plan[col], disabled: false };
//   // };
//   const getCheckboxProps = (plan, col, idx) => {
//   if (!plan.plType || !plan.version) return { checked: false, disabled: true };

//   if (col === "isCompleted")
//     return { checked: plan.isCompleted, disabled: !!plan.isApproved };

//   if (col === "isApproved")
//     return { checked: plan.isApproved, disabled: !plan.isCompleted };

//   if (col === "finalVersion") {
//     // Find if any other plan with same plType has finalVersion checked
//     const anotherFinalVersionIdx = plans.findIndex(
//       (p, i) => i !== idx && p.plType === plan.plType && p.finalVersion
//     );

//     // Disable finalVersion checkbox for this row only if another finalVersion in the same plType is checked
//     return {
//       checked: plan.finalVersion,
//       disabled: anotherFinalVersionIdx !== -1, // disable if any other finalVersion for same plType
//     };
//   }

//   return { checked: plan[col], disabled: false };
// };

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
//     if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version)
//       return true;
//     if (field === "isCompleted") return !!selectedPlan.isApproved;
//     if (field === "isApproved") return !selectedPlan.isCompleted;
//     if (field === "finalVersion") {
//       if (
//         checkedFinalVersionIdx !== -1 &&
//         plans[checkedFinalVersionIdx].plId !== selectedPlan.plId
//       )
//         return true;
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

//       <div className="flex justify-between items-center mb-2">
//         <div className="flex gap-2">
//           {plans.length > 0 && (
//             <>
//               <button
//                 onClick={() => {
//                   setIsActionLoading(true);
//                   handleActionSelect(
//                     plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                     "Create Budget"
//                   );
//                 }}
//                 disabled={
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Create Budget")
//                 }
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Create Budget")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 }`}
//                 title="Create Budget"
//               >
//                 Create Budget
//               </button>
//               <button
//                 onClick={() => {
//                   setIsActionLoading(true);
//                   handleActionSelect(
//                     plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                     "Create Blank Budget"
//                   );
//                 }}
//                 disabled={
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Create Blank Budget")
//                 }
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Create Blank Budget")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 }`}
//                 title="Create Blank Budget"
//               >
//                 Create Blank Budget
//               </button>
//               <button
//                 onClick={() => {
//                   setIsActionLoading(true);
//                   handleActionSelect(
//                     plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                     "Create EAC"
//                   );
//                 }}
//                 disabled={
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Create EAC")
//                 }
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Create EAC")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 }`}
//                 title="Create EAC"
//               >
//                 Create EAC
//               </button>
//               <button
//                 onClick={() => {
//                   setIsActionLoading(true);
//                   handleActionSelect(
//                     plans.findIndex((p) => p.plId === selectedPlan?.plId),
//                     "Delete"
//                   );
//                 }}
//                 disabled={
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Delete")
//                 }
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   !selectedPlan ||
//                   !getButtonAvailability(selectedPlan, "Delete")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
//                 }`}
//                 title="Delete Selected Plan"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleTopButtonToggle("isCompleted")}
//                 disabled={getTopButtonDisabled("isCompleted")}
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   getTopButtonDisabled("isCompleted")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 }`}
//                 title="Toggle Submitted"
//               >
//                 Submitted
//               </button>
//               <button
//                 onClick={() => handleTopButtonToggle("isApproved")}
//                 disabled={getTopButtonDisabled("isApproved")}
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   getTopButtonDisabled("isApproved")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 }`}
//                 title="Toggle Approved"
//               >
//                 Approved
//               </button>
//               <button
//                 onClick={() => handleTopButtonToggle("finalVersion")}
//                 disabled={getTopButtonDisabled("finalVersion")}
//                 className={`px-3 py-1 rounded text-xs flex items-center ${
//                   getTopButtonDisabled("finalVersion")
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                 }`}
//                 title="Toggle Conclude"
//               >
//                 Conclude
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex items-center gap-4">
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

//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="fiscalYear"
//               className="font-semibold text-xs sm:text-sm whitespace-nowrap"
//             >
//               Fiscal Year:
//             </label>
//             <select
//               id="fiscalYear"
//               value={fiscalYear}
//               onChange={(e) => setFiscalYear(e.target.value)}
//               className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={fiscalYearOptions?.length === 0}
//             >
//               {fiscalYearOptions?.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {plans.length === 0 ? (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           No project plans found for project ID: {projectId}
//         </div>
//       ) : (
//         <div
//           className="overflow-auto"
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
//                 {columns.map((col) => (
//                   <th key={col} className="p-2 border font-normal text-center">
//                     {COLUMN_LABELS[col] || col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, idx) => (
//                 <tr
//                   key={`plan-${plan.plId || idx}-${plan.projId || "unknown"}`}
//                   className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
//                     selectedPlan &&
//                     selectedPlan.plId === plan.plId &&
//                     selectedPlan.projId === plan.projId
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
//                   {columns.map((col) => (
//                     // <td
//                     //   key={col}
//                     //   className={`p-2 border font-normal ${
//                     //     col === 'status' && plan.status === 'Submitted'
//                     //       ? 'bg-yellow-100 text-black font-bold'
//                     //       : col === 'status' && plan.status === 'In Progress'
//                     //       ? 'bg-red-100 text-black font-bold'
//                     //       : col === 'status' && plan.status === 'Approved'
//                     //       ? 'bg-green-100 text-black font-bold'
//                     //       : ''
//                     //   } ${col === 'projId' ? 'break-words' : ''} ${
//                     //     col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''
//                     //   }`}
//                     //   style={
//                     //     col === 'projId'
//                     //       ? { minWidth: '100px', maxWidth: '150px' }
//                     //       : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                     //       ? { minWidth: '180px', maxWidth: '220px' }
//                     //       : {}
//                     //   }
//                     // >
//                     //   {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
//                     //     ? formatDateWithTime(plan[col])
//                     //     : col === 'versionCode'
//                     //     ? (
//                     //       <input
//                     //         type="text"
//                     //         value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
//                     //         autoFocus={editingVersionCodeIdx === idx}
//                     //         onClick={e => {
//                     //           e.stopPropagation();
//                     //           setEditingVersionCodeIdx(idx);
//                     //           setEditingVersionCodeValue(plan.versionCode || '');
//                     //         }}
//                     //         onChange={e => setEditingVersionCodeValue(e.target.value)}
//                     //         onBlur={() => {
//                     //           if (editingVersionCodeIdx === idx) {
//                     //             setIsActionLoading(true);
//                     //             handleVersionCodeChange(idx, editingVersionCodeValue);
//                     //             setEditingVersionCodeIdx(null);
//                     //           }
//                     //         }}
//                     //         onKeyDown={e => {
//                     //           if (e.key === 'Enter') {
//                     //             setIsActionLoading(true);
//                     //             handleVersionCodeChange(idx, editingVersionCodeValue);
//                     //             setEditingVersionCodeIdx(null);
//                     //           } else if (e.key === 'Escape') {
//                     //             setEditingVersionCodeIdx(null);
//                     //           }
//                     //         }}
//                     //         className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
//                     //           !plan.plType || !plan.version ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     //         }`}
//                     //         style={{ minWidth: 60, maxWidth: 120 }}
//                     //         disabled={!plan.plType || !plan.version}
//                     //       />
//                     //     )
//                     //     : typeof plan[col] === 'boolean'
//                     //     ? (
//                     //       <input
//                     //         type="checkbox"
//                     //         checked={getCheckboxProps(plan, col, idx).checked}
//                     //         disabled={getCheckboxProps(plan, col, idx).disabled}
//                     //         onClick={(e) => e.stopPropagation()}
//                     //         onMouseDown={(e) => e.stopPropagation()}
//                     //         onDoubleClick={(e) => e.stopPropagation()}
//                     //         onKeyDown={(e) => e.stopPropagation()}
//                     //         onChange={() => handleCheckboxChange(idx, col)}
//                     //         className="cursor-pointer"
//                     //       />
//                     //     )
//                     //     : plan[col] || ''}
//                     // </td>
//                     <td
//                       key={col}
//                       className={`p-2 border font-normal ${
//                         col === "status" && plan.status === "Submitted"
//                           ? "bg-yellow-100 text-black font-bold"
//                           : col === "status" && plan.status === "In Progress"
//                           ? "bg-red-100 text-black font-bold"
//                           : col === "status" && plan.status === "Approved"
//                           ? "bg-green-100 text-black font-bold"
//                           : ""
//                       }
//   ${col === "status" ? "whitespace-nowrap text-center" : ""}
//   ${col === "projId" ? "break-words" : ""}
//   ${
//     col === "createdAt" || col === "updatedAt" || col === "closedPeriod"
//       ? "whitespace-nowrap"
//       : ""
//   }`}
//                       style={
//                         col === "status"
//                           ? { minWidth: "120px", maxWidth: "170px" }
//                           : col === "projId"
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
//                         formatDateWithTime(plan[col])
//                       ) : col === "versionCode" ? (
//                         <input
//                           type="text"
//                           value={
//                             editingVersionCodeIdx === idx
//                               ? editingVersionCodeValue
//                               : plan.versionCode || ""
//                           }
//                           autoFocus={editingVersionCodeIdx === idx}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setEditingVersionCodeIdx(idx);
//                             setEditingVersionCodeValue(plan.versionCode || "");
//                           }}
//                           onChange={(e) =>
//                             setEditingVersionCodeValue(e.target.value)
//                           }
//                           onBlur={() => {
//                             if (editingVersionCodeIdx === idx) {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(
//                                 idx,
//                                 editingVersionCodeValue
//                               );
//                               setEditingVersionCodeIdx(null);
//                             }
//                           }}
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               setIsActionLoading(true);
//                               handleVersionCodeChange(
//                                 idx,
//                                 editingVersionCodeValue
//                               );
//                               setEditingVersionCodeIdx(null);
//                             } else if (e.key === "Escape") {
//                               setEditingVersionCodeIdx(null);
//                             }
//                           }}
//                           className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
//                             !plan.plType || !plan.version
//                               ? "bg-gray-100 cursor-not-allowed"
//                               : "bg-white"
//                           }`}
//                           style={{ minWidth: 60, maxWidth: 120 }}
//                           disabled={!plan.plType || !plan.version}
//                         />
//                       ) : typeof plan[col] === "boolean" ? (
//                         <input
//     type="checkbox"
//     checked={getCheckboxProps(plan, col, idx).checked}
//     disabled={getCheckboxProps(plan, col, idx).disabled}
//     onClick={(e) => e.stopPropagation()}
//     onMouseDown={(e) => e.stopPropagation()}
//     onDoubleClick={(e) => e.stopPropagation()}
//     onKeyDown={(e) => e.stopPropagation()}
//     onChange={(e) => {
//       e.stopPropagation();
//       handleCheckboxChange(idx, col);
//     }}
//     className="cursor-pointer"
//   />
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


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectPlanForm from "./ProjectPlanForm";
import { formatDate } from "./utils";

const BOOLEAN_FIELDS = ["finalVersion", "isCompleted", "isApproved"];

const COLUMN_LABELS = {
  projId: "Project ID",
  plType: "Plan Type",
  version: "Version",
  versionCode: "Version Code",
  source: "Source",
  type: "Type",
  finalVersion: "Conclude",
  isCompleted: "Submitted",
  isApproved: "Approved",
  status: "Status",
  closedPeriod: "Closed Period",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

const ProjectPlanTable = ({
  onPlanSelect,
  selectedPlan,
  projectId,
  fiscalYear,
  setFiscalYear,
  fiscalYearOptions,
}) => {
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
  const [editingVersionCodeValue, setEditingVersionCodeValue] = useState("");

  const isChildProjectId = (projId) => {
    return projId && typeof projId === "string" && projId.includes(".");
  };

  const formatDateWithTime = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return dateStr;
    }
  };

  const sortPlansByProjIdPlTypeVersion = (plansArray) => {
    return [...plansArray].sort((a, b) => {
      if (a.projId < b.projId) return -1;
      if (a.projId > b.projId) return 1;
      if (a.plType < b.plType) return -1;
      if (a.plType > b.plType) return 1;
      // Explicit numeric compare for version
      const aVersion = Number(a.version) || 0;
      const bVersion = Number(b.version) || 0;
      return aVersion - bVersion;
    });
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
      const transformedPlans = response.data.map((plan, idx) => ({
        plId: plan.plId || plan.id || 0,
        projId: plan.projId || projectId,
        plType:
          plan.plType === "Budget"
            ? "BUD"
            : plan.plType === "EAC"
            ? "EAC"
            : plan.plType || "",
        source: plan.source || "",
        type: plan.type || "",
        version: plan.version || 0,
        versionCode: plan.versionCode || "",
        finalVersion: !!plan.finalVersion,
        isCompleted: !!plan.isCompleted,
        isApproved: !!plan.isApproved,
        status:
          plan.plType && plan.version
            ? (plan.status || "In Progress")
                .replace("Working", "In Progress")
                .replace("Completed", "Submitted")
            : "",
        closedPeriod: plan.closedPeriod || "",
        createdAt: plan.createdAt || "",
        updatedAt: plan.updatedAt || "",
        modifiedBy: plan.modifiedBy || "",
        approvedBy: plan.approvedBy || "",
        createdBy: plan.createdBy || "",
        templateId: plan.templateId || 0,
        projName: plan.projName || "",
        projStartDt: plan.projStartDt || "",
        projEndDt: plan.projEndDt || "",
        orgId: plan.orgId || "",
        fundedCost: plan.proj_f_cst_amt || "",
        fundedFee: plan.proj_f_fee_amt || "",
        fundedRev: plan.proj_f_tot_amt || "",
        revenueAccount: plan.revenueAccount || "",
      }));
      const sortedPlans = sortPlansByProjIdPlTypeVersion(transformedPlans);
      setPlans(sortedPlans);
      setColumns([
        "projId",
        "plType",
        "version",
        "versionCode",
        "source",
        "type",
        "isCompleted",
        "isApproved",
        "finalVersion",
        "status",
        "closedPeriod",
      ]);
    } catch (error) {
      setPlans([]);
      toast.error("Failed to fetch plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [projectId]);

  useEffect(() => {
    if (selectedPlan && plans.length > 0) {
      const latest = plans.find(
        (p) => p.plId === selectedPlan.plId && p.projId === selectedPlan.projId
      );
      if (
        latest &&
        (latest.status !== selectedPlan.status ||
          latest.isCompleted !== selectedPlan.isCompleted ||
          latest.isApproved !== selectedPlan.isApproved ||
          latest.finalVersion !== selectedPlan.finalVersion)
      ) {
        onPlanSelect(latest);
      }
    }
  }, [plans]);

  const handleRowClick = (plan) => {
    if (!selectedPlan || selectedPlan.plId !== plan.plId) {
      onPlanSelect(plan);
    }
  };

  const handleExportPlan = async (plan) => {
    if (!plan.projId || !plan.version || !plan.plType) {
      toast.error("Missing required parameters for export");
      return;
    }
    try {
      setIsActionLoading(true);
      toast.info("Exporting plan...");
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Forecast/ExportPlanDirectCost`,
        {
          params: {
            projId: plan.projId,
            version: plan.version,
            type: plan.plType,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Plan_${plan.projId}_${plan.version}_${plan.plType}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Plan exported successfully!");
    } catch (err) {
      toast.error(
        "Error exporting plan: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleImportPlan = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const validExtensions = [".xlsx", ".xls"];
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      toast.error(
        "Invalid file format. Please upload an Excel file (.xlsx or .xls)"
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projId", projectId);
    try {
      setIsActionLoading(true);
      toast.info("Importing plan...");
      const response = await axios.post(
        "https://test-api-3tmq.onrender.com/Forecast/ImportDirectCostPlan",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      let extractedVersion = null;
      if (typeof response.data === "string") {
        const versionMatch = response.data.match(/version\s*-\s*'([^']+)'/i);
        if (versionMatch) extractedVersion = versionMatch[1];
      } else if (response.data?.version) {
        extractedVersion = response.data.version;
      }
      if (extractedVersion) setLastImportedVersion(extractedVersion);
      setLastImportTime(Date.now());
      toast.success(
        response.data && typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data),
        { toastId: "import-success-" + Date.now(), autoClose: 5000 }
      );
      await fetchPlans();
    } catch (err) {
      let errorMessage =
        "Failed to import plan. Please check the file and project ID, or contact support.";
      if (err.response) {
        if (typeof err.response.data === "string" && err.response.data)
          errorMessage = err.response.data;
        else if (err.response.data?.message)
          errorMessage = err.response.data.message;
        else if (err.response.data)
          errorMessage = JSON.stringify(err.response.data);
        else if (err.response.status === 500)
          errorMessage =
            "Server error occurred. Please verify the file format, project ID, and ensure type is EXCEL.";
      } else errorMessage = err.message || errorMessage;
      toast.error(errorMessage, { toastId: "import-error", autoClose: 5000 });
    } finally {
      setIsActionLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCheckboxChange = async (idx, field) => {
    const prevPlans = [...plans];
    const plan = plans[idx];
    const planId = plan.plId;
    if (!plan.plType || !plan.version) {
      toast.error(
        `Cannot update ${field}: Plan Type and Version are required.`,
        { toastId: "checkbox-error" }
      );
      return;
    }
    if (field === "isApproved" && !plan.isCompleted) {
      toast.error("You can't approve this row until Submitted is checked", {
        toastId: "checkbox-error",
      });
      return;
    }
    if (field === "finalVersion" && !plan.isApproved) {
      toast.error("You can't set Conclude until Approved is checked", {
        toastId: "checkbox-error",
      });
      return;
    }
    let updated = { ...plan };
    updated[field] = !plan[field];
    if (field === "isCompleted") {
      updated.status = updated.isCompleted ? "Submitted" : "In Progress";
      if (!updated.isCompleted) {
        updated.isApproved = false;
        updated.finalVersion = false;
      }
    }
    if (field === "isApproved") {
      updated.status = updated.isApproved ? "Approved" : "Submitted";
      if (!updated.isApproved) updated.finalVersion = false;
    }
    if (field === "finalVersion")
      updated.status = updated.finalVersion ? "Submitted" : "Approved";
    let newPlans;
    // Your referenced line, but updated from "Working" to "In Progress" and "Completed" to "Submitted"
    if (field === "isCompleted" && !updated.isCompleted) {
      const isEAC = updated.plType === "EAC";
      const inProgressCount = plans.filter(
        (p) => p.status === "In Progress" && p.plType === updated.plType
      ).length;
      if (inProgressCount > 0 && updated.status === "In Progress") {
        toast.error(
          `Only one ${
            isEAC ? "EAC" : "BUD"
          } plan can have In Progress status at a time.`,
          { toastId: "checkbox-error" }
        );
        return;
      }
    }
    if (field === "finalVersion" && updated.finalVersion) {
  newPlans = plans.map((p, i) =>
    i === idx
      ? updated
      : p.plType === updated.plType
      ? { ...p, finalVersion: false }
      : p
  );
} else {
  newPlans = plans.map((p, i) => (i === idx ? updated : p));
}

    // if (field === "finalVersion" && updated.finalVersion) {
    //   newPlans = plans.map((p, i) =>
    //     i === idx ? updated : { ...p, finalVersion: false }
    //   );
    // } else {
    //   newPlans = plans.map((p, i) => (i === idx ? updated : p));
    // }
    // "In Progress" handling for exclusivity
    if (updated.status === "In Progress") {
      newPlans = newPlans.map((p, i) =>
        i !== idx && p.status === "In Progress" && p.plType === updated.plType
          ? { ...p, status: "Submitted", isCompleted: true }
          : p
      );
    }
    setPlans(newPlans);
    onPlanSelect(updated);
    if (
      (BOOLEAN_FIELDS.includes(field) || field === "status") &&
      planId &&
      Number(planId) > 0
    ) {
      const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
      try {
        await axios.put(updateUrl, updated);
      } catch (err) {
        setPlans(prevPlans);
        toast.error(
          "Error updating plan: " +
            (err.response?.data?.message || err.message),
          { toastId: "checkbox-error" }
        );
      }
    }
  };

  const handleVersionCodeChange = async (idx, value) => {
    const prevPlans = [...plans];
    const planId = plans[idx].plId;
    let updated = { ...plans[idx], versionCode: value };
    const newPlans = plans.map((plan) =>
      plan.plId === planId ? updated : plan
    );
    setPlans(newPlans);
    if (planId && Number(planId) > 0) {
      const updateUrl = `https://test-api-3tmq.onrender.com/Project/UpdateProjectPlan`;
      toast.info("Updating version code...", { toastId: "version-code-info" });
      try {
        setIsActionLoading(true);
        await axios.put(updateUrl, updated);
      } catch (err) {
        setPlans(prevPlans);
        toast.error(
          "Error updating version code: " +
            (err.response?.data?.message || err.message),
          { toastId: "version-code-error" }
        );
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const handleActionSelect = async (idx, action) => {
    const plan = plans[idx];
    if (action === "None") return;
    try {
      setIsActionLoading(true);
      if (action === "Delete") {
        if (!plan.plId || Number(plan.plId) <= 0) {
          toast.error("Cannot delete: Invalid plan ID.");
          setIsActionLoading(false);
          return;
        }
        const confirmed = window.confirm(
          `Are you sure you want to delete this plan`
        );
        if (!confirmed) {
          setIsActionLoading(false);
          return;
        }
        toast.info("Deleting plan...");
        try {
          await axios.delete(
            `https://test-api-3tmq.onrender.com/Project/DeleteProjectPlan/${plan.plId}`
          );
          toast.success("Plan deleted successfully!");
        } catch (err) {
          if (err.response && err.response.status === 404) {
            toast.error(
              "Plan not found on server. It may have already been deleted."
            );
          } else {
            toast.error(
              "Error deleting plan: " +
                (err.response?.data?.message || err.message)
            );
          }
          setIsActionLoading(false);
          return;
        }
        await fetchPlans();
      } else if (
        action === "Create Budget" ||
        action === "Create Blank Budget" ||
        action === "Create EAC"
      ) {
        const payloadTemplate = {
          projId: plan.projId,
          plId: plan.plId || 0,
          plType:
            action === "Create Budget" || action === "Create Blank Budget"
              ? "BUD"
              : "EAC",
          source: plan.source || "",
          type: isChildProjectId(plan.projId) ? "SYSTEM" : plan.type || "",
          version: plan.version,
          versionCode: plan.versionCode || "",
          finalVersion: false,
          isCompleted: false,
          isApproved: false,
          status: "In Progress",
          createdBy: plan.createdBy || "User",
          modifiedBy: plan.modifiedBy || "User",
          approvedBy: "",
          templateId: plan.templateId || 1,
        };
        toast.info(
          `Creating ${
            action === "Create Budget"
              ? "Budget"
              : action === "Create Blank Budget"
              ? "Blank Budget"
              : "EAC"
          }...`
        );
        await axios.post(
          `https://test-api-3tmq.onrender.com/Project/AddProjectPlan?type=${
            action === "Create Blank Budget" ? "blank" : "actual"
          }`,
          payloadTemplate
        );
        await fetchPlans();
        toast.success(
          `${
            action === "Create Budget"
              ? "Budget"
              : action === "Create Blank Budget"
              ? "Blank Budget"
              : "EAC"
          } created successfully!`
        );
      } else {
        toast.info(`Action "${action}" selected (API call not implemented)`);
      }
    } catch (err) {
      toast.error(
        "Error performing action: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const getActionOptions = (plan) => {
    let options = ["None"];
    if (isChildProjectId(plan.projId) && !plan.plType && !plan.version) {
      return ["None", "Create Budget", "Create Blank Budget"];
    }
    if (!plan.plType || !plan.version) return options;
    if (plan.status === "In Progress") options = ["None", "Delete"];
    else if (plan.status === "Submitted")
      options = ["None", "Create Budget", "Create Blank Budget"];
    else if (plan.status === "Approved")
      options = [
        "None",
        "Create Budget",
        "Create Blank Budget",
        "Create EAC",
        "Delete",
      ];
    return options;
  };

  const getButtonAvailability = (plan, action) => {
    const options = getActionOptions(plan);
    return options.includes(action);
  };

  const checkedFinalVersionIdx = plans.findIndex((plan) => plan.finalVersion);

  // const getCheckboxProps = (plan, col, idx) => {
  //   if (!plan.plType || !plan.version)
  //     return { checked: false, disabled: true };
  //   if (col === "isCompleted")
  //     return { checked: plan.isCompleted, disabled: !!plan.isApproved };
  //   if (col === "isApproved")
  //     return { checked: plan.isApproved, disabled: !plan.isCompleted };
  //   if (col === "finalVersion") {
  //     if (checkedFinalVersionIdx !== -1 && checkedFinalVersionIdx !== idx)
  //       return { checked: false, disabled: true };
  //     return { checked: plan.finalVersion, disabled: !plan.isApproved };
  //   }
  //   return { checked: plan[col], disabled: false };
  // };
  const getCheckboxProps = (plan, col, idx) => {
  if (!plan.plType || !plan.version) return { checked: false, disabled: true };

  if (col === "isCompleted")
    return { checked: plan.isCompleted, disabled: !!plan.isApproved };

  if (col === "isApproved")
    return { checked: plan.isApproved, disabled: !plan.isCompleted };

  if (col === "finalVersion") {
    // Find if any other plan with same plType has finalVersion checked
    const anotherFinalVersionIdx = plans.findIndex(
      (p, i) => i !== idx && p.plType === plan.plType && p.finalVersion
    );

    // Disable finalVersion checkbox for this row only if another finalVersion in the same plType is checked
    return {
      checked: plan.finalVersion,
      disabled: anotherFinalVersionIdx !== -1, // disable if any other finalVersion for same plType
    };
  }

  return { checked: plan[col], disabled: false };
};

  const handleTopButtonToggle = async (field) => {
    if (!selectedPlan) {
      toast.error(`No plan selected to update ${field}.`, {
        toastId: "no-plan-selected",
      });
      return;
    }
    const idx = plans.findIndex((p) => p.plId === selectedPlan.plId);
    if (idx === -1) {
      toast.error(`Selected plan not found.`, { toastId: "plan-not-found" });
      return;
    }
    setIsActionLoading(true);
    await handleCheckboxChange(idx, field);
    setIsActionLoading(false);
  };

  const handleCalc = async () => {
    if (!selectedPlan) {
      toast.error("No plan selected for calculation.", {
        toastId: "no-plan-selected",
      });
      return;
    }
    if (!selectedPlan.plId || !selectedPlan.templateId) {
      toast.error("Cannot calculate: Missing required parameters (planID or templateId).", {
        toastId: "missing-params",
      });
      return;
    }
    setIsActionLoading(true);
    try {
      const response = await axios.get(
        `https://test-api-3tmq.onrender.com/Forecast/CalculateRevenueCost?planID=${selectedPlan.plId}&templateId=${selectedPlan.templateId}&type=actual`
      );
      // Assuming the response body is a message or has a 'message' field
      const message = typeof response.data === 'string' ? response.data : response.data?.message || "Revenue Calculation successful!";
      toast.success(message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Error during calculation.";
      toast.error(errorMessage);
    } finally {
      setIsActionLoading(false);
    }
  };

  const getTopButtonDisabled = (field) => {
    if (!selectedPlan || !selectedPlan.plType || !selectedPlan.version)
      return true;
    if (field === "isCompleted") return !!selectedPlan.isApproved;
    if (field === "isApproved") return !selectedPlan.isCompleted;
    if (field === "finalVersion") {
      if (
        checkedFinalVersionIdx !== -1 &&
        plans[checkedFinalVersionIdx].plId !== selectedPlan.plId
      )
        return true;
      return !selectedPlan.isApproved;
    }
    return false;
  };

  const getCalcButtonDisabled = () => {
    return !selectedPlan || !selectedPlan.plId || !selectedPlan.templateId;
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
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 flex-wrap">
          {plans.length > 0 && (
            <>
              <button
                onClick={() => {
                  setIsActionLoading(true);
                  handleActionSelect(
                    plans.findIndex((p) => p.plId === selectedPlan?.plId),
                    "Create Budget"
                  );
                }}
                disabled={
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Create Budget")
                }
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Create Budget")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Create Budget"
              >
                Create Budget
              </button>
              <button
                onClick={() => {
                  setIsActionLoading(true);
                  handleActionSelect(
                    plans.findIndex((p) => p.plId === selectedPlan?.plId),
                    "Create Blank Budget"
                  );
                }}
                disabled={
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Create Blank Budget")
                }
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Create Blank Budget")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Create Blank Budget"
              >
                Create Blank Budget
              </button>
              <button
                onClick={() => {
                  setIsActionLoading(true);
                  handleActionSelect(
                    plans.findIndex((p) => p.plId === selectedPlan?.plId),
                    "Create EAC"
                  );
                }}
                disabled={
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Create EAC")
                }
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Create EAC")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Create EAC"
              >
                Create EAC
              </button>
              <button
                onClick={() => {
                  setIsActionLoading(true);
                  handleActionSelect(
                    plans.findIndex((p) => p.plId === selectedPlan?.plId),
                    "Delete"
                  );
                }}
                disabled={
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Delete")
                }
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  !selectedPlan ||
                  !getButtonAvailability(selectedPlan, "Delete")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                }`}
                title="Delete Selected Plan"
              >
                Delete
              </button>
              <button
                onClick={() => handleTopButtonToggle("isCompleted")}
                disabled={getTopButtonDisabled("isCompleted")}
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  getTopButtonDisabled("isCompleted")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Toggle Submitted"
              >
                Submitted
              </button>
              <button
                onClick={() => handleTopButtonToggle("isApproved")}
                disabled={getTopButtonDisabled("isApproved")}
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  getTopButtonDisabled("isApproved")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Toggle Approved"
              >
                Approved
              </button>
              <button
                onClick={() => handleTopButtonToggle("finalVersion")}
                disabled={getTopButtonDisabled("finalVersion")}
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  getTopButtonDisabled("finalVersion")
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Toggle Conclude"
              >
                Conclude
              </button>
              <button
                onClick={() => {
                  setIsActionLoading(true);
                  handleCalc();
                }}
                disabled={getCalcButtonDisabled()}
                className={`px-2 py-1 rounded text-xs flex items-center whitespace-nowrap ${
                  getCalcButtonDisabled()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                title="Calculate"
              >
                Calc
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsActionLoading(true);
              fileInputRef.current.click();
            }}
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center text-xs cursor-pointer whitespace-nowrap"
            title="Import Plan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
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
        <div
          className="overflow-auto"
          style={{
            maxHeight: "400px",
            minHeight: "100px",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            background: "#fff",
          }}
        >
          <table className="min-w-full text-xs text-left border-collapse border">
            <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
              <tr>
                <th className="p-2 border font-normal">Export Plan</th>
                {columns.map((col) => (
                  <th key={col} className="p-2 border font-normal text-center">
                    {COLUMN_LABELS[col] || col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, idx) => (
                <tr
                  key={`plan-${plan.plId || idx}-${plan.projId || "unknown"}`}
                  className={`even:bg-gray-50 hover:bg-blue-50 transition-all duration-200 cursor-pointer ${
                    selectedPlan &&
                    selectedPlan.plId === plan.plId &&
                    selectedPlan.projId === plan.projId
                      ? "bg-blue-100 border-l-4 border-l-blue-600"
                      : ""
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
                  {columns.map((col) => (
                    // <td
                    //   key={col}
                    //   className={`p-2 border font-normal ${
                    //     col === 'status' && plan.status === 'Submitted'
                    //       ? 'bg-yellow-100 text-black font-bold'
                    //       : col === 'status' && plan.status === 'In Progress'
                    //       ? 'bg-red-100 text-black font-bold'
                    //       : col === 'status' && plan.status === 'Approved'
                    //       ? 'bg-green-100 text-black font-bold'
                    //       : ''
                    //   } ${col === 'projId' ? 'break-words' : ''} ${
                    //     col === 'createdAt' || col === 'updatedAt' || col === 'closedPeriod' ? 'whitespace-nowrap' : ''
                    //   }`}
                    //   style={
                    //     col === 'projId'
                    //       ? { minWidth: '100px', maxWidth: '150px' }
                    //       : col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
                    //       ? { minWidth: '180px', maxWidth: '220px' }
                    //       : {}
                    //   }
                    // >
                    //   {col === 'closedPeriod' || col === 'createdAt' || col === 'updatedAt'
                    //     ? formatDateWithTime(plan[col])
                    //     : col === 'versionCode'
                    //     ? (
                    //       <input
                    //         type="text"
                    //         value={editingVersionCodeIdx === idx ? editingVersionCodeValue : plan.versionCode || ''}
                    //         autoFocus={editingVersionCodeIdx === idx}
                    //         onClick={e => {
                    //           e.stopPropagation();
                    //           setEditingVersionCodeIdx(idx);... //           setEditingVersionCodeValue(plan.versionCode || '');
                    //         }}
                    //         onChange={e => setEditingVersionCodeValue(e.target.value)}
                    //         onBlur={() => {
                    //           if (editingVersionCodeIdx === idx) {
                    //             setIsActionLoading(true);
                    //             handleVersionCodeChange(idx, editingVersionCodeValue);
                    //             setEditingVersionCodeIdx(null);
                    //           }
                    //         }}
                    //         onKeyDown={e => {
                    //           if (e.key === 'Enter') {
                    //             setIsActionLoading(true);
                    //             handleVersionCodeChange(idx, editingVersionCodeValue);
                    //             setEditingVersionCodeIdx(null);
                    //           } else if (e.key === 'Escape') {
                    //             setEditingVersionCodeIdx(null);
                    //           }
                    //         }}
                    //         className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
                    //           !plan.plType || !plan.version ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    //         }`}
                    //         style={{ minWidth: 60, maxWidth: 120 }}
                    //         disabled={!plan.plType || !plan.version}
                    //       />
                    //     )
                    //     : typeof plan[col] === 'boolean'
                    //     ? (
                    //       <input
                    //         type="checkbox"
                    //         checked={getCheckboxProps(plan, col, idx).checked}
                    //         disabled={getCheckboxProps(plan, col, idx).disabled}
                    //         onClick={(e) => e.stopPropagation()}
                    //         onMouseDown={(e) => e.stopPropagation()}
                    //         onDoubleClick={(e) => e.stopPropagation()}
                    //         onKeyDown={(e) => e.stopPropagation()}
                    //         onChange={() => handleCheckboxChange(idx, col)}
                    //         className="cursor-pointer"
                    //       />
                    //     )
                    //     : plan[col] || ''}
                    // </td>
                    <td
                      key={col}
                      className={`p-2 border font-normal ${
                        col === "status" && plan.status === "Submitted"
                          ? "bg-yellow-100 text-black font-bold"
                          : col === "status" && plan.status === "In Progress"
                          ? "bg-red-100 text-black font-bold"
                          : col === "status" && plan.status === "Approved"
                          ? "bg-green-100 text-black font-bold"
                          : ""
                      }
  ${col === "status" ? "whitespace-nowrap text-center" : ""}
  ${col === "projId" ? "break-words" : ""}
  ${
    col === "createdAt" || col === "updatedAt" || col === "closedPeriod"
      ? "whitespace-nowrap"
      : ""
  }`}
                      style={
                        col === "status"
                          ? { minWidth: "120px", maxWidth: "170px" }
                          : col === "projId"
                          ? { minWidth: "100px", maxWidth: "150px" }
                          : col === "closedPeriod" ||
                            col === "createdAt" ||
                            col === "updatedAt"
                          ? { minWidth: "180px", maxWidth: "220px" }
                          : {}
                      }
                    >
                      {col === "closedPeriod" ||
                      col === "createdAt" ||
                      col === "updatedAt" ? (
                        formatDateWithTime(plan[col])
                      ) : col === "versionCode" ? (
                        <input
                          type="text"
                          value={
                            editingVersionCodeIdx === idx
                              ? editingVersionCodeValue
                              : plan.versionCode || ""
                          }
                          autoFocus={editingVersionCodeIdx === idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingVersionCodeIdx(idx);
                            setEditingVersionCodeValue(plan.versionCode || "");
                          }}
                          onChange={(e) =>
                            setEditingVersionCodeValue(e.target.value)
                          }
                          onBlur={() => {
                            if (editingVersionCodeIdx === idx) {
                              setIsActionLoading(true);
                              handleVersionCodeChange(
                                idx,
                                editingVersionCodeValue
                              );
                              setEditingVersionCodeIdx(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setIsActionLoading(true);
                              handleVersionCodeChange(
                                idx,
                                editingVersionCodeValue
                              );
                              setEditingVersionCodeIdx(null);
                            } else if (e.key === "Escape") {
                              setEditingVersionCodeIdx(null);
                            }
                          }}
                          className={`border border-gray-300 rounded px-2 py-1 w-24 text-xs hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
                            !plan.plType || !plan.version
                              ? "bg-gray-100 cursor-not-allowed"
                              : "bg-white"
                          }`}
                          style={{ minWidth: 60, maxWidth: 120 }}
                          disabled={!plan.plType || !plan.version}
                        />
                      ) : typeof plan[col] === "boolean" ? (
                        <input
    type="checkbox"
    checked={getCheckboxProps(plan, col, idx).checked}
    disabled={getCheckboxProps(plan, col, idx).disabled}
    onClick={(e) => e.stopPropagation()}
    onMouseDown={(e) => e.stopPropagation()}
    onDoubleClick={(e) => e.stopPropagation()}
    onKeyDown={(e) => e.stopPropagation()}
    onChange={(e) => {
      e.stopPropagation();
      handleCheckboxChange(idx, col);
    }}
    className="cursor-pointer"
  />
                      ) : (
                        plan[col] || ""
                      )}
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
